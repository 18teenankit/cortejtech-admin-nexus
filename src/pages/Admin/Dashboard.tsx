import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Home, 
  Users, 
  Settings, 
  FileText, 
  Image, 
  Book, 
  Briefcase, 
  MessageSquare,
  HelpCircle,
  LogOut,
  Upload,
  Edit,
  PlusCircle,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface SiteSettings {
  siteName: string;
  logo: string;
  noJobsMessage: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isLoading, setIsLoading] = useState(true);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    siteName: "CortejTech",
    logo: "/lovable-uploads/bd45910c-d0e8-4a45-a99f-6d7e6aad54ae.png",
    noJobsMessage: "No openings currently, check back later. Email careers@cortejtech.com.",
    contactEmail: "info@cortejtech.com",
    contactPhone: "+91 9868-555-0123",
    contactAddress: "123 Tech Park, Sector 42, Gurgaon, Haryana 122001, India"
  });
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>(siteSettings.logo);
  
  const [stats, setStats] = useState({
    pagesCount: 10,
    servicesCount: 8,
    portfolioCount: 12,
    blogsCount: 5,
    careersCount: 2,
    testimonialsCount: 7,
    faqCount: 15
  });

  useEffect(() => {
    const loggedIn = localStorage.getItem("adminLoggedIn") === "true";
    setIsLoggedIn(loggedIn);

    if (!loggedIn) {
      navigate("/ankit/admin");
      return;
    }

    const fetchSettings = async () => {
      try {
        setIsLoading(true);
        
        const { data, error } = await supabase
          .from('settings')
          .select('*');
        
        if (!error && data && data.length > 0) {
          const settings = data.reduce((acc, item) => {
            acc[item.key] = item.value;
            return acc;
          }, {} as Record<string, string>);
          
          setSiteSettings({
            siteName: settings.site_name || siteSettings.siteName,
            logo: settings.logo_url || siteSettings.logo,
            noJobsMessage: settings.no_jobs_message || siteSettings.noJobsMessage,
            contactEmail: settings.contact_email || siteSettings.contactEmail,
            contactPhone: settings.contact_phone || siteSettings.contactPhone,
            contactAddress: settings.contact_address || siteSettings.contactAddress
          });
          
          setLogoPreview(settings.logo_url || siteSettings.logo);
        }
        
        const fetchCounts = async () => {
          const tables = ['pages', 'services', 'portfolio', 'blogs', 'jobs', 'testimonials', 'faq'];
          const newStats = { ...stats };
          
          for (const table of tables) {
            try {
              const { count, error } = await supabase
                .from(table)
                .select('*', { count: 'exact', head: true });
                
              if (!error && count !== null) {
                switch (table) {
                  case 'pages': newStats.pagesCount = count; break;
                  case 'services': newStats.servicesCount = count; break;
                  case 'portfolio': newStats.portfolioCount = count; break;
                  case 'blogs': newStats.blogsCount = count; break;
                  case 'jobs': newStats.careersCount = count; break;
                  case 'testimonials': newStats.testimonialsCount = count; break;
                  case 'faq': newStats.faqCount = count; break;
                }
              }
            } catch (error) {
              console.error(`Error fetching count for ${table}:`, error);
            }
          }
          
          setStats(newStats);
        };
        
        await fetchCounts();
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, [navigate, siteSettings.logo, stats]);

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/ankit/admin");
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogo(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          setLogoPreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveSettings = async () => {
    setIsLoading(true);
    try {
      setTimeout(() => {
        setIsLoading(false);
        toast({
          title: "Settings Saved",
          description: "Your site settings have been updated successfully."
        });
      }, 1000);
    } catch (error) {
      console.error("Error saving settings:", error);
      toast({
        title: "Error",
        description: "There was an error saving your settings.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const modules = [
    { name: "Dashboard", icon: <Home className="h-6 w-6" />, tab: "dashboard" },
    { name: "Pages", icon: <FileText className="h-6 w-6" />, tab: "pages" },
    { name: "Services", icon: <Settings className="h-6 w-6" />, tab: "services" },
    { name: "Portfolio", icon: <Briefcase className="h-6 w-6" />, tab: "portfolio" },
    { name: "Blog", icon: <Book className="h-6 w-6" />, tab: "blog" },
    { name: "Career", icon: <Briefcase className="h-6 w-6" />, tab: "career" },
    { name: "Testimonials", icon: <MessageSquare className="h-6 w-6" />, tab: "testimonials" },
    { name: "FAQ", icon: <HelpCircle className="h-6 w-6" />, tab: "faq" },
    { name: "Media", icon: <Image className="h-6 w-6" />, tab: "media" },
    { name: "Settings", icon: <Settings className="h-6 w-6" />, tab: "settings" },
    { name: "Users", icon: <Users className="h-6 w-6" />, tab: "users" },
  ];

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen flex">
      <aside className="bg-cortejtech-purple text-white w-64 flex-shrink-0">
        <div className="p-6">
          <div className="flex items-center space-x-3">
            <img 
              src={siteSettings.logo} 
              alt="CortejTech Logo" 
              className="h-8 w-auto"
            />
            <h1 className="text-xl font-bold text-white">
              Admin Panel
            </h1>
          </div>
        </div>
        <nav className="mt-6">
          <ul>
            {modules.map((module, index) => (
              <li key={index}>
                <button 
                  onClick={() => setActiveTab(module.tab)}
                  className={`w-full flex items-center px-6 py-3 text-white hover:bg-cortejtech-purple/80 ${
                    activeTab === module.tab ? 'bg-cortejtech-purple/70' : ''
                  }`}
                >
                  {module.icon}
                  <span className="ml-3">{module.name}</span>
                </button>
              </li>
            ))}
            <li className="mt-6">
              <button 
                onClick={handleLogout}
                className="flex items-center w-full px-6 py-3 text-white hover:bg-cortejtech-purple/80"
              >
                <LogOut className="h-6 w-6" />
                <span className="ml-3">Log Out</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="flex-grow bg-gray-50">
        <header className="bg-white shadow-sm p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              {modules.find(m => m.tab === activeTab)?.name || "Dashboard"}
            </h2>
            <div>
              <span className="text-gray-600">Welcome, Admin</span>
            </div>
          </div>
        </header>

        <div className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsContent value="dashboard">
              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-4">Dashboard Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Total Pages</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">{stats.pagesCount}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Services</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">{stats.servicesCount}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Portfolio Items</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">{stats.portfolioCount}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Blog Posts</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">{stats.blogsCount}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {modules.slice(1, 10).map((module, index) => (
                  <Card 
                    key={index} 
                    className="hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setActiveTab(module.tab)}
                  >
                    <CardContent className="p-6 flex items-center">
                      <div className="rounded-full bg-purple-100 p-3 mr-4">
                        {module.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{module.name}</h3>
                        <p className="text-gray-500 text-sm">Manage {module.name.toLowerCase()}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Site Settings</CardTitle>
                  <CardDescription>Manage your site settings and branding elements.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input 
                      id="siteName" 
                      value={siteSettings.siteName} 
                      onChange={(e) => setSiteSettings({...siteSettings, siteName: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Logo</Label>
                    <div className="flex items-center space-x-4">
                      <div className="h-20 w-20 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                        <img 
                          src={logoPreview} 
                          alt="Logo Preview" 
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div>
                        <Label htmlFor="logo" className="cursor-pointer inline-flex items-center px-4 py-2 bg-cortejtech-purple text-white rounded-md hover:bg-cortejtech-purple/90">
                          <Upload className="mr-2 h-4 w-4" /> Upload Logo
                        </Label>
                        <Input 
                          id="logo" 
                          type="file" 
                          className="hidden" 
                          accept="image/*"
                          onChange={handleLogoChange}
                        />
                        <p className="text-xs text-gray-500 mt-1">Recommended size: 200x200 pixels</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="noJobsMessage">No Jobs Available Message</Label>
                    <Textarea 
                      id="noJobsMessage" 
                      value={siteSettings.noJobsMessage}
                      onChange={(e) => setSiteSettings({...siteSettings, noJobsMessage: e.target.value})}
                      rows={3}
                    />
                    <p className="text-xs text-gray-500">This message will be displayed when there are no job listings available.</p>
                  </div>
                  
                  <div className="space-y-4 border-t pt-4">
                    <h4 className="font-semibold">Contact Information</h4>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="contactEmail">Email Address</Label>
                        <Input 
                          id="contactEmail" 
                          value={siteSettings.contactEmail}
                          onChange={(e) => setSiteSettings({...siteSettings, contactEmail: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contactPhone">Phone Number</Label>
                        <Input 
                          id="contactPhone" 
                          value={siteSettings.contactPhone}
                          onChange={(e) => setSiteSettings({...siteSettings, contactPhone: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactAddress">Address</Label>
                      <Textarea 
                        id="contactAddress" 
                        value={siteSettings.contactAddress}
                        onChange={(e) => setSiteSettings({...siteSettings, contactAddress: e.target.value})}
                        rows={2}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2 bg-gray-50 border-t p-6">
                  <Button variant="outline" onClick={() => setActiveTab("dashboard")}>Cancel</Button>
                  <Button 
                    onClick={handleSaveSettings}
                    className="bg-cortejtech-purple hover:bg-cortejtech-purple/90"
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {["pages", "services", "portfolio", "blog", "career", "testimonials", "faq", "media", "users"].map((tab) => (
              <TabsContent key={tab} value={tab}>
                <Card className="mb-6">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl">{tab.charAt(0).toUpperCase() + tab.slice(1)}</CardTitle>
                      <CardDescription>Manage your {tab} content.</CardDescription>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-cortejtech-purple hover:bg-cortejtech-purple/90">
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Add New
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add New {tab.charAt(0).toUpperCase() + tab.slice(1, -1)}</DialogTitle>
                          <DialogDescription>
                            Create a new {tab.slice(0, -1)} item for your website.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" placeholder="Enter title" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="content">Content</Label>
                            <Textarea id="content" placeholder="Enter content" rows={5} />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline">Cancel</Button>
                          <Button className="bg-cortejtech-purple hover:bg-cortejtech-purple/90">Save</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-lg border">
                      <div className="flex items-center justify-between border-b px-4 py-3">
                        <div className="font-medium">Title</div>
                        <div className="font-medium">Actions</div>
                      </div>
                      <div className="divide-y">
                        {[1, 2, 3].map((item) => (
                          <div key={item} className="flex items-center justify-between px-4 py-3">
                            <div>Example {tab.charAt(0).toUpperCase() + tab.slice(1, -1)} {item}</div>
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
