
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PortfolioManager from '@/components/admin/PortfolioManager';
import ServicesManager from '@/components/admin/ServicesManager';
import BlogManager from '@/components/admin/BlogManager';

const Dashboard = () => {
  const [currentTab, setCurrentTab] = useState('portfolio');

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Admin Dashboard</CardTitle>
          <CardDescription>Manage your website content</CardDescription>
        </CardHeader>
      </Card>

      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="blog">Blog</TabsTrigger>
        </TabsList>

        <TabsContent value="portfolio">
          <PortfolioManager />
        </TabsContent>

        <TabsContent value="services">
          <ServicesManager />
        </TabsContent>

        <TabsContent value="blog">
          <BlogManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
