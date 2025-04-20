
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

interface ServiceEditDialogProps {
  service: Service;
  onSave: (service: Service) => Promise<void>;
}

export const ServiceEditDialog = ({ service: initialService, onSave }: ServiceEditDialogProps) => {
  const [service, setService] = useState(initialService);

  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>Edit Service</DialogTitle>
        <DialogDescription>
          Make changes to your service.
        </DialogDescription>
      </DialogHeader>
      <ServiceForm service={service} onChange={setService} />
      <DialogFooter>
        <Button variant="outline">
          Cancel
        </Button>
        <Button
          onClick={() => onSave(service)}
          disabled={!service.title || !service.description || !service.icon}
          className="bg-cortejtech-purple hover:bg-cortejtech-purple/90"
        >
          Save Changes
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
