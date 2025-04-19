
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { FileText, Trash2, Plus, Edit } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featured_image: string | null;
  author: string;
  is_published: boolean | null;
  published_at: string | null;
}

export const BlogManager = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newPost, setNewPost] = useState<Partial<BlogPost>>({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    featured_image: "",
    author: "",
    is_published: true
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
      return;
    }

    setPosts(data || []);
  };

  const handleSavePost = async () => {
    if (isEditing && selectedPost) {
      const { error } = await supabase
        .from('blog_posts')
        .update({
          title: selectedPost.title,
          slug: selectedPost.slug,
          content: selectedPost.content,
          excerpt: selectedPost.excerpt,
          featured_image: selectedPost.featured_image,
          author: selectedPost.author,
          is_published: selectedPost.is_published,
          updated_at: new Date().toISOString()
        })
        .eq('id', selectedPost.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update blog post",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Success",
        description: "Blog post updated successfully"
      });
    } else {
      // Ensure all required fields are present
      if (!newPost.title || !newPost.slug || !newPost.content || !newPost.author) {
        toast({
          title: "Error", 
          description: "Please fill all required fields",
          variant: "destructive"
        });
        return;
      }

      const { error } = await supabase
        .from('blog_posts')
        .insert([{
          title: newPost.title,
          slug: newPost.slug,
          content: newPost.content,
          author: newPost.author,
          excerpt: newPost.excerpt || null,
          featured_image: newPost.featured_image || null,
          is_published: newPost.is_published || true,
          published_at: new Date().toISOString()
        }]);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to create blog post",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Success",
        description: "Blog post created successfully"
      });

      setNewPost({
        title: "",
        slug: "",
        content: "",
        excerpt: "",
        featured_image: "",
        author: "",
        is_published: true
      });
    }

    setIsEditing(false);
    setSelectedPost(null);
    fetchPosts();
  };

  const handleDeletePost = async (id: number) => {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Success",
      description: "Blog post deleted successfully"
    });

    fetchPosts();
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-2xl">Blog Posts</CardTitle>
          <CardDescription>Manage your blog content</CardDescription>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-cortejtech-purple hover:bg-cortejtech-purple/90">
              <Plus className="mr-2 h-4 w-4" />
              New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Blog Post</DialogTitle>
              <DialogDescription>
                Add a new blog post to your website.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={newPost.slug}
                    onChange={(e) => setNewPost({ ...newPost, slug: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    rows={10}
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={newPost.excerpt || ""}
                    onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="featured_image">Featured Image URL</Label>
                  <Input
                    id="featured_image"
                    value={newPost.featured_image || ""}
                    onChange={(e) => setNewPost({ ...newPost, featured_image: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    value={newPost.author}
                    onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setNewPost({
                  title: "",
                  slug: "",
                  content: "",
                  excerpt: "",
                  featured_image: "",
                  author: "",
                  is_published: true
                });
              }}>
                Cancel
              </Button>
              <Button
                onClick={handleSavePost}
                disabled={!newPost.title || !newPost.slug || !newPost.content || !newPost.author}
                className="bg-cortejtech-purple hover:bg-cortejtech-purple/90"
              >
                Create Post
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="border-l-4 border-cortejtech-purple">
              <CardHeader className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{post.title}</CardTitle>
                    <CardDescription>/{post.slug}</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={() => {
                          setSelectedPost(post);
                          setIsEditing(true);
                        }}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>Edit Blog Post</DialogTitle>
                          <DialogDescription>
                            Make changes to your blog post.
                          </DialogDescription>
                        </DialogHeader>
                        {selectedPost && (
                          <div className="space-y-4 py-4">
                            <div className="grid gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="edit-title">Title</Label>
                                <Input
                                  id="edit-title"
                                  value={selectedPost.title}
                                  onChange={(e) => setSelectedPost({
                                    ...selectedPost,
                                    title: e.target.value
                                  })}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-slug">Slug</Label>
                                <Input
                                  id="edit-slug"
                                  value={selectedPost.slug}
                                  onChange={(e) => setSelectedPost({
                                    ...selectedPost,
                                    slug: e.target.value
                                  })}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-content">Content</Label>
                                <Textarea
                                  id="edit-content"
                                  rows={10}
                                  value={selectedPost.content}
                                  onChange={(e) => setSelectedPost({
                                    ...selectedPost,
                                    content: e.target.value
                                  })}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-excerpt">Excerpt</Label>
                                <Textarea
                                  id="edit-excerpt"
                                  value={selectedPost.excerpt || ""}
                                  onChange={(e) => setSelectedPost({
                                    ...selectedPost,
                                    excerpt: e.target.value
                                  })}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-featured_image">Featured Image URL</Label>
                                <Input
                                  id="edit-featured_image"
                                  value={selectedPost.featured_image || ""}
                                  onChange={(e) => setSelectedPost({
                                    ...selectedPost,
                                    featured_image: e.target.value
                                  })}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-author">Author</Label>
                                <Input
                                  id="edit-author"
                                  value={selectedPost.author}
                                  onChange={(e) => setSelectedPost({
                                    ...selectedPost,
                                    author: e.target.value
                                  })}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                        <DialogFooter>
                          <Button variant="outline" onClick={() => {
                            setSelectedPost(null);
                            setIsEditing(false);
                          }}>
                            Cancel
                          </Button>
                          <Button
                            onClick={handleSavePost}
                            disabled={!selectedPost?.title || !selectedPost?.slug || !selectedPost?.content || !selectedPost?.author}
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
                          <AlertDialogTitle>Delete Blog Post</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this blog post? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeletePost(post.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  <span>By {post.author}</span>
                  <span className="mx-2">•</span>
                  <span>{new Date(post.published_at || "").toLocaleDateString()}</span>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
