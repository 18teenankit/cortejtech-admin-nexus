
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  DialogTrigger 
} from '@/components/ui/dialog';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  is_featured?: boolean;
}

const ServicesManager: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [currentService, setCurrentService] = useState<Partial<Service>>({});
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
    const { error } = await supabase.from('services').insert(currentService);
    if (!error) {
      fetchServices();
      setIsDialogOpen(false);
    }
  };

  const handleDelete = async (id: number) => {
    const { error } = await supabase.from('services').delete().eq('id', id);
    if (!error) fetchServices();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Services Management</CardTitle>
        <CardDescription>Create, update, and delete services</CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add New Service</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Service</DialogTitle>
              <DialogDescription>
                <Input 
                  placeholder="Title" 
                  value={currentService.title || ''} 
                  onChange={(e) => setCurrentService({...currentService, title: e.target.value})} 
                />
                <Input 
                  placeholder="Description" 
                  value={currentService.description || ''} 
                  onChange={(e) => setCurrentService({...currentService, description: e.target.value})} 
                />
                {/* Add more input fields for other service properties */}
                <Button onClick={handleCreate}>Save</Button>
              </DialogDescription>
            </DialogHeader>
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
                <TableCell>{service.description}</TableCell>
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
