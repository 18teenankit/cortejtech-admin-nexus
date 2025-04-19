
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Trash2, Save, Plus } from "lucide-react";

interface Page {
  id: number;
  slug: string;
  title: string;
  content: string;
  meta_title: string | null;
  meta_description: string | null;
}

export const ContentManager = () => {
  const { toast } = useToast();
  const [pages, setPages] = useState<Page[]>([]);
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .order('id');

    if (error) {
      console.error('Error fetching pages:', error);
      return;
    }

    setPages(data || []);
  };

  const handleEdit = (page: Page) => {
    setSelectedPage(page);
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    if (!selectedPage) return;

    const { error } = await supabase
      .from('pages')
      .update({
        title: selectedPage.title,
        content: selectedPage.content,
        meta_title: selectedPage.meta_title,
        meta_description: selectedPage.meta_description,
        updated_at: new Date().toISOString()
      })
      .eq('id', selectedPage.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update page",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Success",
      description: "Page updated successfully"
    });
    
    setIsEditing(false);
    fetchPages();
  };

  const handleCancel = () => {
    setSelectedPage(null);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Content Management</CardTitle>
          <CardDescription>Manage website content and pages</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pages" className="space-y-4">
            <TabsList>
              <TabsTrigger value="pages">Pages</TabsTrigger>
            </TabsList>

            <TabsContent value="pages">
              <div className="space-y-4">
                {pages.map((page) => (
                  <Card key={page.id}>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>{page.title}</CardTitle>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(page)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                      <CardDescription>/{page.slug}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>

              {isEditing && selectedPage && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Edit {selectedPage.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={selectedPage.title}
                        onChange={(e) =>
                          setSelectedPage({
                            ...selectedPage,
                            title: e.target.value
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="content">Content</Label>
                      <Textarea
                        id="content"
                        rows={10}
                        value={selectedPage.content}
                        onChange={(e) =>
                          setSelectedPage({
                            ...selectedPage,
                            content: e.target.value
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="metaTitle">Meta Title</Label>
                      <Input
                        id="metaTitle"
                        value={selectedPage.meta_title || ""}
                        onChange={(e) =>
                          setSelectedPage({
                            ...selectedPage,
                            meta_title: e.target.value
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="metaDescription">Meta Description</Label>
                      <Textarea
                        id="metaDescription"
                        value={selectedPage.meta_description || ""}
                        onChange={(e) =>
                          setSelectedPage({
                            ...selectedPage,
                            meta_description: e.target.value
                          })
                        }
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                    <Button onClick={handleUpdate}>
                      <Save className="h-4 w-4 mr-2" /> Save Changes
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
