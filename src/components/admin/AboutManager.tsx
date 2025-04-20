
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Plus, Trash2, Upload } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface AboutItem {
  id: number;
  title: string;
  description: string;
  image_url: string | null;
  created_at: string | null;
}

export const AboutManager = () => {
  const { toast } = useToast();
  const [aboutItems, setAboutItems] = useState<AboutItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<AboutItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newItem, setNewItem] = useState<Partial<AboutItem>>({
    title: "",
    description: "",
    image_url: null
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    fetchAboutItems();
  }, []);

  const fetchAboutItems = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('about_us')
        .select('*')
        .order('id', { ascending: true });

      if (error) {
        throw error;
      }

      setAboutItems(data || []);
    } catch (error) {
      console.error('Error fetching about items:', error);
      toast({
        title: "Error",
        description: "Failed to load about items",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, isEditMode = false) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setImagePreview(result);
        
        if (isEditMode && selectedItem) {
          setSelectedItem({
            ...selectedItem,
            image_url: result
          });
        } else {
          setNewItem({
            ...newItem,
            image_url: result
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      if (isEditing && selectedItem) {
        const { id, ...itemData } = selectedItem;
        const { error } = await supabase
          .from('about_us')
          .update({
            title: itemData.title,
            description: itemData.description,
            image_url: itemData.image_url
          })
          .eq('id', id);

        if (error) {
          throw error;
        }

        toast({
          title: "Success",
          description: "About item updated successfully"
        });
      } else {
        // Validate required fields
        if (!newItem.title || !newItem.description) {
          toast({
            title: "Error",
            description: "Title and description are required",
            variant: "destructive"
          });
          setLoading(false);
          return;
        }

        const { error } = await supabase
          .from('about_us')
          .insert([{
            title: newItem.title,
            description: newItem.description,
            image_url: newItem.image_url
          }]);

        if (error) {
          throw error;
        }

        setNewItem({
          title: "",
          description: "",
          image_url: null
        });
        setImagePreview(null);
        setImageFile(null);

        toast({
          title: "Success",
          description: "About item created successfully"
        });
      }

      fetchAboutItems();
      setIsEditing(false);
      setSelectedItem(null);
    } catch (error) {
      console.error('Error saving about item:', error);
      toast({
        title: "Error",
        description: "Failed to save about item",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('about_us')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      setAboutItems(aboutItems.filter(item => item.id !== id));
      
      toast({
        title: "Success",
        description: "About item deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting about item:', error);
      toast({
        title: "Error",
        description: "Failed to delete about item",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-2xl">About Us</CardTitle>
          <CardDescription>Manage your about us sections</CardDescription>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-cortejtech-purple hover:bg-cortejtech-purple/90">
              <Plus className="mr-2 h-4 w-4" />
              Add Section
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add About Section</DialogTitle>
              <DialogDescription>
                Add a new about us section to your website.
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
                    placeholder="Enter section title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newItem.description}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                    placeholder="Enter section description"
                    rows={6}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Image (Optional)</Label>
                  <div className="flex items-center space-x-4">
                    {imagePreview && (
                      <div className="h-20 w-20 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                    )}
                    <div>
                      <Label htmlFor="image" className="cursor-pointer inline-flex items-center px-4 py-2 bg-cortejtech-purple text-white rounded-md hover:bg-cortejtech-purple/90">
                        <Upload className="mr-2 h-4 w-4" /> Upload Image
                      </Label>
                      <Input 
                        id="image" 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={(e) => handleImageChange(e)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setNewItem({
                  title: "",
                  description: "",
                  image_url: null
                });
                setImagePreview(null);
              }}>
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={!newItem.title || !newItem.description || loading}
                className="bg-cortejtech-purple hover:bg-cortejtech-purple/90"
              >
                {loading ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {aboutItems.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No about sections yet. Click "Add Section" to create your first about section.
            </div>
          ) : (
            aboutItems.map((item) => (
              <Card key={item.id} className="border-l-4 border-cortejtech-purple">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>{item.title}</CardTitle>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => {
                              setSelectedItem(item);
                              setIsEditing(true);
                              setImagePreview(item.image_url);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle>Edit About Section</DialogTitle>
                            <DialogDescription>
                              Make changes to your about section.
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
                                  <Label htmlFor="edit-description">Description</Label>
                                  <Textarea
                                    id="edit-description"
                                    value={selectedItem.description}
                                    onChange={(e) => setSelectedItem({
                                      ...selectedItem,
                                      description: e.target.value
                                    })}
                                    rows={6}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Image (Optional)</Label>
                                  <div className="flex items-center space-x-4">
                                    {(selectedItem.image_url || imagePreview) && (
                                      <div className="h-20 w-20 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                                        <img 
                                          src={imagePreview || selectedItem.image_url || ''} 
                                          alt="Preview" 
                                          className="max-h-full max-w-full object-contain"
                                        />
                                      </div>
                                    )}
                                    <div>
                                      <Label htmlFor="edit-image" className="cursor-pointer inline-flex items-center px-4 py-2 bg-cortejtech-purple text-white rounded-md hover:bg-cortejtech-purple/90">
                                        <Upload className="mr-2 h-4 w-4" /> Change Image
                                      </Label>
                                      <Input 
                                        id="edit-image" 
                                        type="file" 
                                        className="hidden" 
                                        accept="image/*"
                                        onChange={(e) => handleImageChange(e, true)}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                          <DialogFooter>
                            <Button 
                              variant="outline" 
                              onClick={() => {
                                setSelectedItem(null);
                                setIsEditing(false);
                                setImagePreview(null);
                              }}
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={handleSave}
                              disabled={!selectedItem?.title || !selectedItem?.description || loading}
                              className="bg-cortejtech-purple hover:bg-cortejtech-purple/90"
                            >
                              {loading ? "Saving..." : "Save Changes"}
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
                            <AlertDialogTitle>Delete About Section</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this about section? This action cannot be undone.
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
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-4">
                    {item.image_url && (
                      <div className="w-full md:w-1/3">
                        <img 
                          src={item.image_url} 
                          alt={item.title} 
                          className="rounded-md object-cover w-full h-40"
                        />
                      </div>
                    )}
                    <div className={`w-full ${item.image_url ? 'md:w-2/3' : ''}`}>
                      <p className="text-gray-700 whitespace-pre-wrap">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
