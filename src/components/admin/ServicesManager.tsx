
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { toast } from 'sonner';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  is_featured?: boolean;
}

const ServicesManager: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [currentService, setCurrentService] = useState<Service>({
    id: 0,
    title: '',
    description: '',
    icon: '',
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data, error } = await supabase.from('services').select('*');
    if (data) setServices(data);
    if (error) console.error('Error fetching services:', error);
  };

  const handleCreate = async () => {
    // Validate required fields
    if (!currentService.title || !currentService.description || !currentService.icon) {
      toast.error('Please fill all required fields');
      return;
    }

    const { title, description, icon, is_featured } = currentService;
    const { error } = await supabase.from('services').insert({ 
      title, 
      description, 
      icon,
      is_featured 
    });
    
    if (error) {
      toast.error('Error creating service');
      console.error('Error creating service:', error);
    } else {
      toast.success('Service created successfully');
      fetchServices();
      setIsDialogOpen(false);
      setCurrentService({ id: 0, title: '', description: '', icon: '' });
    }
  };

  const handleDelete = async (id: number) => {
    const { error } = await supabase.from('services').delete().eq('id', id);
    if (error) {
      toast.error('Error deleting service');
      console.error('Error deleting service:', error);
    } else {
      toast.success('Service deleted successfully');
      fetchServices();
    }
  };

  const handleReset = () => {
    setCurrentService({ id: 0, title: '', description: '', icon: '' });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Services Management</CardTitle>
        <CardDescription>Create, update, and delete services</CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) handleReset();
        }}>
          <DialogTrigger asChild>
            <Button className="mb-4">Add New Service</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add Service</DialogTitle>
              <DialogDescription>
                Fill in the details to add a new service.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="title">Title</label>
                <Input 
                  id="title"
                  placeholder="Service Title" 
                  value={currentService.title} 
                  onChange={(e) => setCurrentService({...currentService, title: e.target.value})} 
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="icon">Icon</label>
                <Input 
                  id="icon"
                  placeholder="Icon Name or URL" 
                  value={currentService.icon} 
                  onChange={(e) => setCurrentService({...currentService, icon: e.target.value})} 
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="description">Description</label>
                <Textarea 
                  id="description"
                  placeholder="Service Description" 
                  value={currentService.description} 
                  onChange={(e) => setCurrentService({...currentService, description: e.target.value})} 
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreate}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell>{service.title}</TableCell>
                <TableCell className="max-w-xs truncate">{service.description}</TableCell>
                <TableCell>
                  <Button variant="destructive" onClick={() => handleDelete(service.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ServicesManager;
