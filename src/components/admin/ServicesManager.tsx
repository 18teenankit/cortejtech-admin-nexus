
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Service } from "../../types/service";
import { ServiceCard } from "./services/ServiceCard";
import { ServiceCreateDialog } from "./services/ServiceCreateDialog";

export const ServicesManager = () => {
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>([]);

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

  const handleSave = async (serviceData: Partial<Service>) => {
    const { error } = await supabase
      .from('services')
      .insert([serviceData]);

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

    fetchServices();
  };

  const handleEdit = async (service: Service) => {
    const { error } = await supabase
      .from('services')
      .update({
        title: service.title,
        description: service.description,
        icon: service.icon,
        is_featured: service.is_featured
      })
      .eq('id', service.id);

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
          <ServiceCreateDialog onSave={handleSave} />
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
