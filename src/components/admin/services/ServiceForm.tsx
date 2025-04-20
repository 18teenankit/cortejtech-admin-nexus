
import { Service } from "../../../types/service";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

interface ServiceFormProps {
  service: Partial<Service>;
  onChange: (updates: Partial<Service>) => void;
}

export const ServiceForm = ({ service, onChange }: ServiceFormProps) => {
  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={service.title || ""}
            onChange={(e) => onChange({ ...service, title: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={service.description || ""}
            onChange={(e) => onChange({ ...service, description: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="icon">Icon</Label>
          <Input
            id="icon"
            value={service.icon || ""}
            onChange={(e) => onChange({ ...service, icon: e.target.value })}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="is_featured"
            checked={service.is_featured || false}
            onCheckedChange={(checked) => onChange({ ...service, is_featured: checked })}
          />
          <Label htmlFor="is_featured">Featured Service</Label>
        </div>
      </div>
    </div>
  );
};
