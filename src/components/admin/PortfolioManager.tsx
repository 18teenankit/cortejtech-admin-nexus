
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

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  category: string;
  image_url: string;
  tags?: string[];
}

const PortfolioManager: React.FC = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [currentItem, setCurrentItem] = useState<Partial<PortfolioItem>>({});
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
    const { error } = await supabase.from('portfolio_items').insert(currentItem);
    if (!error) {
      fetchPortfolioItems();
      setIsDialogOpen(false);
    }
  };

  const handleDelete = async (id: number) => {
    const { error } = await supabase.from('portfolio_items').delete().eq('id', id);
    if (!error) fetchPortfolioItems();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Management</CardTitle>
        <CardDescription>Create, update, and delete portfolio items</CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add New Portfolio Item</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Portfolio Item</DialogTitle>
              <DialogDescription>
                <Input 
                  placeholder="Title" 
                  value={currentItem.title || ''} 
                  onChange={(e) => setCurrentItem({...currentItem, title: e.target.value})} 
                />
                <Input 
                  placeholder="Description" 
                  value={currentItem.description || ''} 
                  onChange={(e) => setCurrentItem({...currentItem, description: e.target.value})} 
                />
                {/* Add more input fields for other portfolio item properties */}
                <Button onClick={handleCreate}>Save</Button>
              </DialogDescription>
            </DialogHeader>
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
