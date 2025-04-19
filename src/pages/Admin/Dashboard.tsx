
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContentManager } from "@/components/admin/ContentManager";
import { ServicesManager } from "@/components/admin/ServicesManager";
import { PortfolioManager } from "@/components/admin/PortfolioManager";
import { BlogManager } from "@/components/admin/BlogManager";
import { BriefcaseIcon, FileTextIcon, Book, Settings } from "lucide-react";

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("content");

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <Tabs defaultValue="content" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-4 gap-4 md:flex md:gap-2">
          <TabsTrigger value="content" className="flex items-center gap-2">
            <FileTextIcon className="h-4 w-4" />
            <span className="hidden md:inline">Content</span>
          </TabsTrigger>
          <TabsTrigger value="services" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden md:inline">Services</span>
          </TabsTrigger>
          <TabsTrigger value="portfolio" className="flex items-center gap-2">
            <BriefcaseIcon className="h-4 w-4" />
            <span className="hidden md:inline">Portfolio</span>
          </TabsTrigger>
          <TabsTrigger value="blog" className="flex items-center gap-2">
            <Book className="h-4 w-4" />
            <span className="hidden md:inline">Blog</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content">
          <ContentManager />
        </TabsContent>
        
        <TabsContent value="services">
          <ServicesManager />
        </TabsContent>

        <TabsContent value="portfolio">
          <PortfolioManager />
        </TabsContent>

        <TabsContent value="blog">
          <BlogManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
