
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Edit, Trash2, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Switch } from "@/components/ui/switch";

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  is_featured: boolean | null;
}

export const ServicesManager = () => {
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newService, setNewService] = useState<Partial<Service>>({
    title: "",
    description: "",
    icon: "",
    is_featured: false
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching services:', error);
      return;
    }

    setServices(data || []);
  };

  const handleSave = async () => {
    if (isEditing && selectedService) {
      const { error } = await supabase
        .from('services')
        .update({
          title: selectedService.title,
          description: selectedService.description,
          icon: selectedService.icon,
          is_featured: selectedService.is_featured
        })
        .eq('id', selectedService.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update service",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Success",
        description: "Service updated successfully"
      });
    } else {
      // Ensure all required fields are present
      if (!newService.title || !newService.description || !newService.icon) {
        toast({
          title: "Error", 
          description: "Please fill all required fields",
          variant: "destructive"
        });
        return;
      }

      const { error } = await supabase
        .from('services')
        .insert([{
          title: newService.title,
          description: newService.description,
          icon: newService.icon,
          is_featured: newService.is_featured || false
        }]);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to create service",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Success",
        description: "Service created successfully"
      });

      setNewService({
        title: "",
        description: "",
        icon: "",
        is_featured: false
      });
    }

    setIsEditing(false);
    setSelectedService(null);
    fetchServices();
  };

  const handleDelete = async (id: number) => {
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete service",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Success",
      description: "Service deleted successfully"
    });

    fetchServices();
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-2xl">Services</CardTitle>
          <CardDescription>Manage your services</CardDescription>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-cortejtech-purple hover:bg-cortejtech-purple/90">
              <Plus className="mr-2 h-4 w-4" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add Service</DialogTitle>
              <DialogDescription>
                Add a new service to your offerings.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newService.title}
                    onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newService.description}
                    onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="icon">Icon</Label>
                  <Input
                    id="icon"
                    value={newService.icon}
                    onChange={(e) => setNewService({ ...newService, icon: e.target.value })}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_featured"
                    checked={newService.is_featured || false}
                    onCheckedChange={(checked) => setNewService({ ...newService, is_featured: checked })}
                  />
                  <Label htmlFor="is_featured">Featured Service</Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setNewService({
                  title: "",
                  description: "",
                  icon: "",
                  is_featured: false
                });
              }}>
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={!newService.title || !newService.description || !newService.icon}
                className="bg-cortejtech-purple hover:bg-cortejtech-purple/90"
              >
                Add Service
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {services.map((service) => (
            <Card key={service.id} className="border-l-4 border-cortejtech-purple">
              <CardHeader className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.is_featured ? "Featured Service" : "Regular Service"}</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={() => {
                          setSelectedService(service);
                          setIsEditing(true);
                        }}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>Edit Service</DialogTitle>
                          <DialogDescription>
                            Make changes to your service.
                          </DialogDescription>
                        </DialogHeader>
                        {selectedService && (
                          <div className="space-y-4 py-4">
                            <div className="grid gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="edit-title">Title</Label>
                                <Input
                                  id="edit-title"
                                  value={selectedService.title}
                                  onChange={(e) => setSelectedService({
                                    ...selectedService,
                                    title: e.target.value
                                  })}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-description">Description</Label>
                                <Textarea
                                  id="edit-description"
                                  value={selectedService.description}
                                  onChange={(e) => setSelectedService({
                                    ...selectedService,
                                    description: e.target.value
                                  })}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-icon">Icon</Label>
                                <Input
                                  id="edit-icon"
                                  value={selectedService.icon}
                                  onChange={(e) => setSelectedService({
                                    ...selectedService,
                                    icon: e.target.value
                                  })}
                                />
                              </div>
                              <div className="flex items-center space-x-2">
                                <Switch
                                  id="edit-is_featured"
                                  checked={selectedService.is_featured || false}
                                  onCheckedChange={(checked) => setSelectedService({
                                    ...selectedService,
                                    is_featured: checked
                                  })}
                                />
                                <Label htmlFor="edit-is_featured">Featured Service</Label>
                              </div>
                            </div>
                          </div>
                        )}
                        <DialogFooter>
                          <Button variant="outline" onClick={() => {
                            setSelectedService(null);
                            setIsEditing(false);
                          }}>
                            Cancel
                          </Button>
                          <Button
                            onClick={handleSave}
                            disabled={!selectedService?.title || !selectedService?.description || !selectedService?.icon}
                            className="bg-cortejtech-purple hover:bg-cortejtech-purple/90"
                          >
                            Save Changes
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Service</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this service? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(service.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
