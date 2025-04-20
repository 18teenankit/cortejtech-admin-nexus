
import { Service } from "../../../types/service";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";
import { ServiceForm } from "./ServiceForm";

interface ServiceCreateDialogProps {
  onSave: (service: Partial<Service>) => Promise<void>;
}

export const ServiceCreateDialog = ({ onSave }: ServiceCreateDialogProps) => {
  const [service, setService] = useState<Partial<Service>>({
    title: "",
    description: "",
    icon: "",
    is_featured: false
  });

  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>Add Service</DialogTitle>
        <DialogDescription>
          Add a new service to your offerings.
        </DialogDescription>
      </DialogHeader>
      <ServiceForm service={service} onChange={setService} />
      <DialogFooter>
        <Button variant="outline" onClick={() => {
          setService({
            title: "",
            description: "",
            icon: "",
            is_featured: false
          });
        }}>
          Cancel
        </Button>
        <Button
          onClick={() => onSave(service)}
          disabled={!service.title || !service.description || !service.icon}
          className="bg-cortejtech-purple hover:bg-cortejtech-purple/90"
        >
          Add Service
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
