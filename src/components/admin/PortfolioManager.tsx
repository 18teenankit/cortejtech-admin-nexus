
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

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  category: string;
  image_url: string;
  client: string | null;
  project_url: string | null;
  completion_date: string | null;
}

export const PortfolioManager = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newItem, setNewItem] = useState<Partial<PortfolioItem>>({
    title: "",
    description: "",
    category: "",
    image_url: "",
    client: "",
    project_url: "",
    completion_date: ""
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from('portfolio_items')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching portfolio items:', error);
      return;
    }

    setItems(data || []);
  };

  const handleSave = async () => {
    if (isEditing && selectedItem) {
      const { error } = await supabase
        .from('portfolio_items')
        .update({
          title: selectedItem.title,
          description: selectedItem.description,
          category: selectedItem.category,
          image_url: selectedItem.image_url,
          client: selectedItem.client,
          project_url: selectedItem.project_url,
          completion_date: selectedItem.completion_date
        })
        .eq('id', selectedItem.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update portfolio item",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Success",
        description: "Portfolio item updated successfully"
      });
    } else {
      const { error } = await supabase
        .from('portfolio_items')
        .insert([newItem]);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to create portfolio item",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Success",
        description: "Portfolio item created successfully"
      });

      setNewItem({
        title: "",
        description: "",
        category: "",
        image_url: "",
        client: "",
        project_url: "",
        completion_date: ""
      });
    }

    setIsEditing(false);
    setSelectedItem(null);
    fetchItems();
  };

  const handleDelete = async (id: number) => {
    const { error } = await supabase
      .from('portfolio_items')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete portfolio item",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Success",
      description: "Portfolio item deleted successfully"
    });

    fetchItems();
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-2xl">Portfolio</CardTitle>
          <CardDescription>Manage your portfolio items</CardDescription>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-cortejtech-purple hover:bg-cortejtech-purple/90">
              <Plus className="mr-2 h-4 w-4" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add Portfolio Item</DialogTitle>
              <DialogDescription>
                Add a new project to your portfolio.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newItem.title}
                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newItem.description}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image_url">Image URL</Label>
                  <Input
                    id="image_url"
                    value={newItem.image_url}
                    onChange={(e) => setNewItem({ ...newItem, image_url: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client">Client (Optional)</Label>
                  <Input
                    id="client"
                    value={newItem.client || ""}
                    onChange={(e) => setNewItem({ ...newItem, client: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project_url">Project URL (Optional)</Label>
                  <Input
                    id="project_url"
                    value={newItem.project_url || ""}
                    onChange={(e) => setNewItem({ ...newItem, project_url: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="completion_date">Completion Date (Optional)</Label>
                  <Input
                    id="completion_date"
                    type="date"
                    value={newItem.completion_date || ""}
                    onChange={(e) => setNewItem({ ...newItem, completion_date: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setNewItem({
                  title: "",
                  description: "",
                  category: "",
                  image_url: "",
                  client: "",
                  project_url: "",
                  completion_date: ""
                });
              }}>
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={!newItem.title || !newItem.description || !newItem.category || !newItem.image_url}
                className="bg-cortejtech-purple hover:bg-cortejtech-purple/90"
              >
                Add Project
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => (
            <Card key={item.id} className="border-l-4 border-cortejtech-purple">
              <CardHeader className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.category}</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={() => {
                          setSelectedItem(item);
                          setIsEditing(true);
                        }}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>Edit Portfolio Item</DialogTitle>
                          <DialogDescription>
                            Make changes to your portfolio item.
                          </DialogDescription>
                        </DialogHeader>
                        {selectedItem && (
                          <div className="space-y-4 py-4">
                            <div className="grid gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="edit-title">Title</Label>
                                <Input
                                  id="edit-title"
                                  value={selectedItem.title}
                                  onChange={(e) => setSelectedItem({
                                    ...selectedItem,
                                    title: e.target.value
                                  })}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-category">Category</Label>
                                <Input
                                  id="edit-category"
                                  value={selectedItem.category}
                                  onChange={(e) => setSelectedItem({
                                    ...selectedItem,
                                    category: e.target.value
                                  })}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-description">Description</Label>
                                <Textarea
                                  id="edit-description"
                                  value={selectedItem.description}
                                  onChange={(e) => setSelectedItem({
                                    ...selectedItem,
                                    description: e.target.value
                                  })}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-image_url">Image URL</Label>
                                <Input
                                  id="edit-image_url"
                                  value={selectedItem.image_url}
                                  onChange={(e) => setSelectedItem({
                                    ...selectedItem,
                                    image_url: e.target.value
                                  })}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-client">Client</Label>
                                <Input
                                  id="edit-client"
                                  value={selectedItem.client || ""}
                                  onChange={(e) => setSelectedItem({
                                    ...selectedItem,
                                    client: e.target.value
                                  })}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-project_url">Project URL</Label>
                                <Input
                                  id="edit-project_url"
                                  value={selectedItem.project_url || ""}
                                  onChange={(e) => setSelectedItem({
                                    ...selectedItem,
                                    project_url: e.target.value
                                  })}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-completion_date">Completion Date</Label>
                                <Input
                                  id="edit-completion_date"
                                  type="date"
                                  value={selectedItem.completion_date || ""}
                                  onChange={(e) => setSelectedItem({
                                    ...selectedItem,
                                    completion_date: e.target.value
                                  })}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                        <DialogFooter>
                          <Button variant="outline" onClick={() => {
                            setSelectedItem(null);
                            setIsEditing(false);
                          }}>
                            Cancel
                          </Button>
                          <Button
                            onClick={handleSave}
                            disabled={!selectedItem?.title || !selectedItem?.description || !selectedItem?.category || !selectedItem?.image_url}
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
                          <AlertDialogTitle>Delete Portfolio Item</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this portfolio item? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(item.id)}
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
