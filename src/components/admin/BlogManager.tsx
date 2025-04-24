
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  DialogTrigger 
} from '@/components/ui/dialog';

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
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost>>({});
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
    const { error } = await supabase.from('blog_posts').insert(currentPost);
    if (!error) {
      fetchBlogPosts();
      setIsDialogOpen(false);
    }
  };

  const handleDelete = async (id: number) => {
    const { error } = await supabase.from('blog_posts').delete().eq('id', id);
    if (!error) fetchBlogPosts();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Blog Management</CardTitle>
        <CardDescription>Create, update, and delete blog posts</CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add New Blog Post</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Blog Post</DialogTitle>
              <DialogDescription>
                <Input 
                  placeholder="Title" 
                  value={currentPost.title || ''} 
                  onChange={(e) => setCurrentPost({...currentPost, title: e.target.value})} 
                />
                <Input 
                  placeholder="Slug" 
                  value={currentPost.slug || ''} 
                  onChange={(e) => setCurrentPost({...currentPost, slug: e.target.value})} 
                />
                <Input 
                  placeholder="Content" 
                  value={currentPost.content || ''} 
                  onChange={(e) => setCurrentPost({...currentPost, content: e.target.value})} 
                />
                {/* Add more input fields for other blog post properties */}
                <Button onClick={handleCreate}>Save</Button>
              </DialogDescription>
            </DialogHeader>
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
