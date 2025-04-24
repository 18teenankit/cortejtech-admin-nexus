
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { toast } from 'sonner';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  author: string;
  is_published?: boolean;
  published_at?: string;
  tags?: string[];
}

const BlogManager: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [currentPost, setCurrentPost] = useState<BlogPost>({
    id: 0,
    title: '',
    slug: '',
    content: '',
    author: 'Admin'
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    const { data, error } = await supabase.from('blog_posts').select('*');
    if (data) setBlogPosts(data);
    if (error) console.error('Error fetching blog posts:', error);
  };

  const handleCreate = async () => {
    // Validate required fields
    if (!currentPost.title || !currentPost.slug || !currentPost.content || !currentPost.author) {
      toast.error('Please fill all required fields');
      return;
    }

    const { title, slug, content, author, is_published, published_at, tags } = currentPost;
    const { error } = await supabase.from('blog_posts').insert({ 
      title,
      slug,
      content,
      author,
      is_published,
      published_at,
      tags
    });
    
    if (error) {
      toast.error('Error creating blog post');
      console.error('Error creating blog post:', error);
    } else {
      toast.success('Blog post created successfully');
      fetchBlogPosts();
      setIsDialogOpen(false);
      setCurrentPost({ id: 0, title: '', slug: '', content: '', author: 'Admin' });
    }
  };

  const handleDelete = async (id: number) => {
    const { error } = await supabase.from('blog_posts').delete().eq('id', id);
    if (error) {
      toast.error('Error deleting blog post');
      console.error('Error deleting blog post:', error);
    } else {
      toast.success('Blog post deleted successfully');
      fetchBlogPosts();
    }
  };

  const handleReset = () => {
    setCurrentPost({ id: 0, title: '', slug: '', content: '', author: 'Admin' });
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Blog Management</CardTitle>
        <CardDescription>Create, update, and delete blog posts</CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) handleReset();
        }}>
          <DialogTrigger asChild>
            <Button className="mb-4">Add New Blog Post</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add Blog Post</DialogTitle>
              <DialogDescription>
                Fill in the details to add a new blog post.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="title">Title</label>
                <Input 
                  id="title"
                  placeholder="Post Title" 
                  value={currentPost.title} 
                  onChange={(e) => {
                    const title = e.target.value;
                    setCurrentPost({
                      ...currentPost, 
                      title,
                      slug: generateSlug(title)
                    });
                  }} 
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="slug">Slug</label>
                <Input 
                  id="slug"
                  placeholder="post-slug" 
                  value={currentPost.slug} 
                  onChange={(e) => setCurrentPost({...currentPost, slug: e.target.value})} 
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="author">Author</label>
                <Input 
                  id="author"
                  placeholder="Author name" 
                  value={currentPost.author} 
                  onChange={(e) => setCurrentPost({...currentPost, author: e.target.value})} 
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="content">Content</label>
                <Textarea 
                  id="content"
                  placeholder="Post content" 
                  value={currentPost.content} 
                  onChange={(e) => setCurrentPost({...currentPost, content: e.target.value})} 
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreate}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.slug}</TableCell>
                <TableCell>
                  <Button variant="destructive" onClick={() => handleDelete(post.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default BlogManager;
