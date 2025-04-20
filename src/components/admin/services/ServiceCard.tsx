
import { Service } from "../../../types/service";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";

interface ServiceCardProps {
  service: Service;
  onEdit: (service: Service) => void;
  onOpenDeleteDialog: (service: Service) => void;
}

export const ServiceCard = ({ service, onEdit, onOpenDeleteDialog }: ServiceCardProps) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className="rounded-full bg-purple-100 p-3 mr-4">
            {/* Display service icon or a default icon */}
            <span className="text-xl">{service.icon || "🔧"}</span>
          </div>
          <div>
            <h3 className="font-semibold text-lg">{service.title}</h3>
            <p className="text-gray-500 text-sm">
              {service.description.length > 100
                ? service.description.substring(0, 100) + "..."
                : service.description}
            </p>
          </div>
        </div>
        {service.is_featured && (
          <div className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full inline-block">
            Featured
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end gap-2 p-4 bg-gray-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(service)}
            >
              <Edit className="h-4 w-4" />
            </Button>
          </SheetTrigger>
        </Sheet>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-500"
              onClick={() => onOpenDeleteDialog(service)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};
