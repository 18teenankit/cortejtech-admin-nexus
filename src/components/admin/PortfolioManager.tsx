
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

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  category: string;
  image_url: string;
  project_url?: string;
  client?: string;
  tags?: string[];
}

const PortfolioManager: React.FC = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [currentItem, setCurrentItem] = useState<PortfolioItem>({
    id: 0,
    title: '',
    description: '',
    category: '',
    image_url: ''
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchPortfolioItems();
  }, []);

  const fetchPortfolioItems = async () => {
    const { data, error } = await supabase.from('portfolio_items').select('*');
    if (data) setPortfolioItems(data);
    if (error) console.error('Error fetching portfolio items:', error);
  };

  const handleCreate = async () => {
    // Validate required fields
    if (!currentItem.title || !currentItem.description || !currentItem.category || !currentItem.image_url) {
      toast.error('Please fill all required fields');
      return;
    }

    const { title, description, category, image_url, project_url, client, tags } = currentItem;
    const { error } = await supabase.from('portfolio_items').insert({ 
      title,
      description,
      category,
      image_url,
      project_url,
      client,
      tags
    });
    
    if (error) {
      toast.error('Error creating portfolio item');
      console.error('Error creating portfolio item:', error);
    } else {
      toast.success('Portfolio item created successfully');
      fetchPortfolioItems();
      setIsDialogOpen(false);
      setCurrentItem({ id: 0, title: '', description: '', category: '', image_url: '' });
    }
  };

  const handleDelete = async (id: number) => {
    const { error } = await supabase.from('portfolio_items').delete().eq('id', id);
    if (error) {
      toast.error('Error deleting portfolio item');
      console.error('Error deleting portfolio item:', error);
    } else {
      toast.success('Portfolio item deleted successfully');
      fetchPortfolioItems();
    }
  };

  const handleReset = () => {
    setCurrentItem({ id: 0, title: '', description: '', category: '', image_url: '' });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Management</CardTitle>
        <CardDescription>Create, update, and delete portfolio items</CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) handleReset();
        }}>
          <DialogTrigger asChild>
            <Button className="mb-4">Add New Portfolio Item</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add Portfolio Item</DialogTitle>
              <DialogDescription>
                Fill in the details to add a new portfolio item.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="title">Title</label>
                <Input 
                  id="title"
                  placeholder="Project Title" 
                  value={currentItem.title} 
                  onChange={(e) => setCurrentItem({...currentItem, title: e.target.value})} 
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="category">Category</label>
                <Input 
                  id="category"
                  placeholder="Category" 
                  value={currentItem.category} 
                  onChange={(e) => setCurrentItem({...currentItem, category: e.target.value})} 
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="image_url">Image URL</label>
                <Input 
                  id="image_url"
                  placeholder="Image URL" 
                  value={currentItem.image_url} 
                  onChange={(e) => setCurrentItem({...currentItem, image_url: e.target.value})} 
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="description">Description</label>
                <Textarea 
                  id="description"
                  placeholder="Project Description" 
                  value={currentItem.description} 
                  onChange={(e) => setCurrentItem({...currentItem, description: e.target.value})} 
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
              <TableHead>Category</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {portfolioItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>
                  <Button variant="destructive" onClick={() => handleDelete(item.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PortfolioManager;
