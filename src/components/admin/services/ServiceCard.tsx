
import { Service } from "../../../types/service";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ServiceDeleteDialog } from "./ServiceDeleteDialog";
import { ServiceEditDialog } from "./ServiceEditDialog";

interface ServiceCardProps {
  service: Service;
  onDelete: (id: number) => Promise<void>;
  onEdit: (service: Service) => Promise<void>;
}

export const ServiceCard = ({ service, onDelete, onEdit }: ServiceCardProps) => {
  return (
    <Card key={service.id} className="border-l-4 border-cortejtech-purple">
      <CardHeader className="grid gap-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{service.title}</CardTitle>
            <CardDescription>
              {service.is_featured ? "Featured Service" : "Regular Service"}
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <ServiceEditDialog service={service} onSave={onEdit} />
            </Dialog>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="sm" className="text-red-500">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <ServiceDeleteDialog service={service} onConfirm={() => onDelete(service.id)} />
            </Dialog>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};
