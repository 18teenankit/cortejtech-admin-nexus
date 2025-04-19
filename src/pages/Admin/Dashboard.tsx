
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface SiteSettings {
  siteName: string;
  logo: string;
  noJobsMessage: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
}

type SettingsType = Record<string, string>;

interface Job {
  id: number;
  title: string;
  type: string;
  location: string;
  salary: string | null;
  description: string;
  requirements: string[];
  apply_link: string;
  created_at: string | null;
}

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  created_at: string | null;
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
  
  // Job state
  const [jobs, setJobs] = useState<Job[]>([]);
  const [newJob, setNewJob] = useState<Partial<Job>>({
    title: "",
    type: "",
    location: "",
    salary: "",
    description: "",
    requirements: [],
    apply_link: ""
  });
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [requirementInput, setRequirementInput] = useState("");
  
  // Contact messages state
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  
  const [stats, setStats] = useState({
    careersCount: 0,
    messagesCount: 0
  });

  // Fetch data from Supabase
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
          const settings = data.reduce((acc: SettingsType, item) => {
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
        
        // Fetch jobs
        const { data: jobsData, error: jobsError } = await supabase
          .from('jobs')
          .select('*');
          
        if (!jobsError && jobsData) {
          setJobs(jobsData);
          setStats(prev => ({ ...prev, careersCount: jobsData.length }));
        }
        
        // Fetch contact messages
        const { data: messagesData, error: messagesError } = await supabase
          .from('contact_messages')
          .select('*');
          
        if (!messagesError && messagesData) {
          setContactMessages(messagesData);
          setStats(prev => ({ ...prev, messagesCount: messagesData.length }));
        }
        
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error",
          description: "Could not fetch data from the database.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, [navigate, toast]);

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
      // Update site name
      const { error: siteNameError } = await supabase
        .from('settings')
        .upsert({ key: 'site_name', value: siteSettings.siteName }, { onConflict: 'key' });
      
      if (siteNameError) throw siteNameError;
      
      // Update no jobs message
      const { error: noJobsError } = await supabase
        .from('settings')
        .upsert({ key: 'no_jobs_message', value: siteSettings.noJobsMessage }, { onConflict: 'key' });
      
      if (noJobsError) throw noJobsError;
      
      // Update contact email
      const { error: emailError } = await supabase
        .from('settings')
        .upsert({ key: 'contact_email', value: siteSettings.contactEmail }, { onConflict: 'key' });
      
      if (emailError) throw emailError;
      
      // Update contact phone
      const { error: phoneError } = await supabase
        .from('settings')
        .upsert({ key: 'contact_phone', value: siteSettings.contactPhone }, { onConflict: 'key' });
      
      if (phoneError) throw phoneError;
      
      // Update contact address
      const { error: addressError } = await supabase
        .from('settings')
        .upsert({ key: 'contact_address', value: siteSettings.contactAddress }, { onConflict: 'key' });
      
      if (addressError) throw addressError;
      
      // Update logo if uploaded
      if (logo) {
        // In a real implementation, you would upload the logo to storage
        // For this example, we'll just update the URL
        const { error: logoError } = await supabase
          .from('settings')
          .upsert({ key: 'logo_url', value: logoPreview }, { onConflict: 'key' });
        
        if (logoError) throw logoError;
      }
      
      toast({
        title: "Settings Saved",
        description: "Your site settings have been updated successfully."
      });
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

  const handleAddRequirement = () => {
    if (!requirementInput.trim()) return;
    
    if (editingJob) {
      setEditingJob({
        ...editingJob,
        requirements: [...editingJob.requirements, requirementInput.trim()]
      });
    } else {
      setNewJob({
        ...newJob,
        requirements: [...(newJob.requirements || []), requirementInput.trim()]
      });
    }
    
    setRequirementInput("");
  };

  const handleRemoveRequirement = (index: number) => {
    if (editingJob) {
      const updatedRequirements = [...editingJob.requirements];
      updatedRequirements.splice(index, 1);
      setEditingJob({ ...editingJob, requirements: updatedRequirements });
    } else {
      const updatedRequirements = [...(newJob.requirements || [])];
      updatedRequirements.splice(index, 1);
      setNewJob({ ...newJob, requirements: updatedRequirements });
    }
  };

  const handleSaveJob = async () => {
    setIsLoading(true);
    
    try {
      if (editingJob) {
        // Update existing job
        const { error } = await supabase
          .from('jobs')
          .update({
            title: editingJob.title,
            type: editingJob.type,
            location: editingJob.location,
            salary: editingJob.salary,
            description: editingJob.description,
            requirements: editingJob.requirements,
            apply_link: editingJob.apply_link
          })
          .eq('id', editingJob.id);
          
        if (error) throw error;
        
        // Update local state
        setJobs(jobs.map(job => job.id === editingJob.id ? editingJob : job));
        setEditingJob(null);
        
        toast({
          title: "Job Updated",
          description: "The job listing has been updated successfully."
        });
      } else {
        // Add new job
        const { data, error } = await supabase
          .from('jobs')
          .insert({
            title: newJob.title || "",
            type: newJob.type || "",
            location: newJob.location || "",
            salary: newJob.salary || null,
            description: newJob.description || "",
            requirements: newJob.requirements || [],
            apply_link: newJob.apply_link || ""
          })
          .select();
          
        if (error) throw error;
        
        // Update local state
        if (data && data.length > 0) {
          setJobs([...jobs, data[0]]);
          setStats(prev => ({ ...prev, careersCount: prev.careersCount + 1 }));
        }
        
        // Reset form
        setNewJob({
          title: "",
          type: "",
          location: "",
          salary: "",
          description: "",
          requirements: [],
          apply_link: ""
        });
        
        toast({
          title: "Job Added",
          description: "The new job listing has been added successfully."
        });
      }
    } catch (error) {
      console.error("Error saving job:", error);
      toast({
        title: "Error",
        description: "There was an error saving the job listing.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditJob = (job: Job) => {
    setEditingJob(job);
    setRequirementInput("");
  };

  const handleDeleteJob = async (id: number) => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      // Update local state
      setJobs(jobs.filter(job => job.id !== id));
      setStats(prev => ({ ...prev, careersCount: prev.careersCount - 1 }));
      
      toast({
        title: "Job Deleted",
        description: "The job listing has been deleted successfully."
      });
    } catch (error) {
      console.error("Error deleting job:", error);
      toast({
        title: "Error",
        description: "There was an error deleting the job listing.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteMessage = async (id: number) => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      // Update local state
      setContactMessages(contactMessages.filter(msg => msg.id !== id));
      setStats(prev => ({ ...prev, messagesCount: prev.messagesCount - 1 }));
      
      toast({
        title: "Message Deleted",
        description: "The contact message has been deleted successfully."
      });
    } catch (error) {
      console.error("Error deleting message:", error);
      toast({
        title: "Error",
        description: "There was an error deleting the message.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const modules = [
    { name: "Dashboard", icon: <Home className="h-6 w-6" />, tab: "dashboard" },
    { name: "Career", icon: <Briefcase className="h-6 w-6" />, tab: "career" },
    { name: "Messages", icon: <MessageSquare className="h-6 w-6" />, tab: "messages" },
    { name: "Settings", icon: <Settings className="h-6 w-6" />, tab: "settings" },
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Job Listings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">{stats.careersCount}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Contact Messages</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">{stats.messagesCount}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {modules.slice(0, 3).map((module, index) => (
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

            <TabsContent value="career">
              <Card className="mb-6">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">Career Opportunities</CardTitle>
                    <CardDescription>Manage job listings for your company.</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-cortejtech-purple hover:bg-cortejtech-purple/90">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add New Job
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>Add New Job Listing</DialogTitle>
                        <DialogDescription>
                          Create a new job opportunity for your company.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="jobTitle">Job Title</Label>
                            <Input 
                              id="jobTitle" 
                              placeholder="E.g., Senior Frontend Developer"
                              value={newJob.title}
                              onChange={(e) => setNewJob({...newJob, title: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="jobType">Job Type</Label>
                            <Input 
                              id="jobType" 
                              placeholder="E.g., Full-time, Part-time"
                              value={newJob.type}
                              onChange={(e) => setNewJob({...newJob, type: e.target.value})}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="jobLocation">Location</Label>
                            <Input 
                              id="jobLocation" 
                              placeholder="E.g., Remote, New York, NY"
                              value={newJob.location}
                              onChange={(e) => setNewJob({...newJob, location: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="jobSalary">Salary (Optional)</Label>
                            <Input 
                              id="jobSalary" 
                              placeholder="E.g., $80,000 - $100,000"
                              value={newJob.salary || ""}
                              onChange={(e) => setNewJob({...newJob, salary: e.target.value})}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="jobDescription">Job Description</Label>
                          <Textarea 
                            id="jobDescription" 
                            placeholder="Detailed description of the role and responsibilities"
                            rows={5}
                            value={newJob.description}
                            onChange={(e) => setNewJob({...newJob, description: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="jobRequirements">Requirements</Label>
                          <div className="flex space-x-2">
                            <Input 
                              id="jobRequirements" 
                              placeholder="Add a requirement and press Enter"
                              value={requirementInput}
                              onChange={(e) => setRequirementInput(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  handleAddRequirement();
                                }
                              }}
                            />
                            <Button 
                              type="button" 
                              onClick={handleAddRequirement}
                              className="bg-cortejtech-purple hover:bg-cortejtech-purple/90"
                            >
                              Add
                            </Button>
                          </div>
                          {newJob.requirements && newJob.requirements.length > 0 && (
                            <ul className="mt-2 space-y-1">
                              {newJob.requirements.map((req, index) => (
                                <li key={index} className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-md">
                                  <span>{req}</span>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    onClick={() => handleRemoveRequirement(index)}
                                    className="h-6 w-6 p-0 text-red-500"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="applyLink">Apply Link/Email</Label>
                          <Input 
                            id="applyLink" 
                            placeholder="E.g., https://apply.com or email@example.com"
                            value={newJob.apply_link}
                            onChange={(e) => setNewJob({...newJob, apply_link: e.target.value})}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => {
                          setNewJob({
                            title: "",
                            type: "",
                            location: "",
                            salary: "",
                            description: "",
                            requirements: [],
                            apply_link: ""
                          });
                          setRequirementInput("");
                        }}>
                          Cancel
                        </Button>
                        <Button 
                          onClick={handleSaveJob}
                          disabled={!newJob.title || !newJob.type || !newJob.location || !newJob.description || !newJob.apply_link || isLoading}
                          className="bg-cortejtech-purple hover:bg-cortejtech-purple/90"
                        >
                          {isLoading ? "Saving..." : "Save Job"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  {jobs.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No job listings yet. Click "Add New Job" to create your first job posting.
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {jobs.map((job) => (
                          <TableRow key={job.id}>
                            <TableCell className="font-medium">{job.title}</TableCell>
                            <TableCell>{job.type}</TableCell>
                            <TableCell>{job.location}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      onClick={() => handleEditJob(job)}
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[600px]">
                                    <DialogHeader>
                                      <DialogTitle>Edit Job Listing</DialogTitle>
                                      <DialogDescription>
                                        Update the job details and requirements.
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
                                      <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                          <Label htmlFor="edit-jobTitle">Job Title</Label>
                                          <Input 
                                            id="edit-jobTitle" 
                                            value={editingJob?.title || ""}
                                            onChange={(e) => setEditingJob(editingJob ? {...editingJob, title: e.target.value} : null)}
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="edit-jobType">Job Type</Label>
                                          <Input 
                                            id="edit-jobType" 
                                            value={editingJob?.type || ""}
                                            onChange={(e) => setEditingJob(editingJob ? {...editingJob, type: e.target.value} : null)}
                                          />
                                        </div>
                                      </div>
                                      <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                          <Label htmlFor="edit-jobLocation">Location</Label>
                                          <Input 
                                            id="edit-jobLocation" 
                                            value={editingJob?.location || ""}
                                            onChange={(e) => setEditingJob(editingJob ? {...editingJob, location: e.target.value} : null)}
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="edit-jobSalary">Salary (Optional)</Label>
                                          <Input 
                                            id="edit-jobSalary" 
                                            value={editingJob?.salary || ""}
                                            onChange={(e) => setEditingJob(editingJob ? {...editingJob, salary: e.target.value} : null)}
                                          />
                                        </div>
                                      </div>
                                      <div className="space-y-2">
                                        <Label htmlFor="edit-jobDescription">Job Description</Label>
                                        <Textarea 
                                          id="edit-jobDescription" 
                                          rows={5}
                                          value={editingJob?.description || ""}
                                          onChange={(e) => setEditingJob(editingJob ? {...editingJob, description: e.target.value} : null)}
                                        />
                                      </div>
                                      <div className="space-y-2">
                                        <Label htmlFor="edit-jobRequirements">Requirements</Label>
                                        <div className="flex space-x-2">
                                          <Input 
                                            id="edit-jobRequirements" 
                                            placeholder="Add a requirement and press Enter"
                                            value={requirementInput}
                                            onChange={(e) => setRequirementInput(e.target.value)}
                                            onKeyDown={(e) => {
                                              if (e.key === 'Enter') {
                                                e.preventDefault();
                                                handleAddRequirement();
                                              }
                                            }}
                                          />
                                          <Button 
                                            type="button" 
                                            onClick={handleAddRequirement}
                                            className="bg-cortejtech-purple hover:bg-cortejtech-purple/90"
                                          >
                                            Add
                                          </Button>
                                        </div>
                                        {editingJob && editingJob.requirements.length > 0 && (
                                          <ul className="mt-2 space-y-1">
                                            {editingJob.requirements.map((req, index) => (
                                              <li key={index} className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-md">
                                                <span>{req}</span>
                                                <Button 
                                                  variant="ghost" 
                                                  size="sm" 
                                                  onClick={() => handleRemoveRequirement(index)}
                                                  className="h-6 w-6 p-0 text-red-500"
                                                >
                                                  <Trash2 className="h-4 w-4" />
                                                </Button>
                                              </li>
                                            ))}
                                          </ul>
                                        )}
                                      </div>
                                      <div className="space-y-2">
                                        <Label htmlFor="edit-applyLink">Apply Link/Email</Label>
                                        <Input 
                                          id="edit-applyLink" 
                                          value={editingJob?.apply_link || ""}
                                          onChange={(e) => setEditingJob(editingJob ? {...editingJob, apply_link: e.target.value} : null)}
                                        />
                                      </div>
                                    </div>
                                    <DialogFooter>
                                      <Button 
                                        variant="outline" 
                                        onClick={() => setEditingJob(null)}
                                      >
                                        Cancel
                                      </Button>
                                      <Button 
                                        onClick={handleSaveJob}
                                        disabled={!editingJob?.title || !editingJob?.type || !editingJob?.location || !editingJob?.description || !editingJob?.apply_link || isLoading}
                                        className="bg-cortejtech-purple hover:bg-cortejtech-purple/90"
                                      >
                                        {isLoading ? "Saving..." : "Update Job"}
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
                                      <AlertDialogTitle>Delete Job Listing</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to delete this job listing? This action cannot be undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction 
                                        onClick={() => handleDeleteJob(job.id)}
                                        className="bg-red-600 hover:bg-red-700"
                                      >
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="messages">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Contact Messages</CardTitle>
                  <CardDescription>View and manage messages received from the contact form.</CardDescription>
                </CardHeader>
                <CardContent>
                  {contactMessages.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No messages received yet.
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {contactMessages.map((msg) => (
                        <Card key={msg.id} className="border-l-4 border-cortejtech-purple">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle>{msg.subject}</CardTitle>
                                <CardDescription className="flex items-center mt-1">
                                  <span className="font-medium">{msg.name}</span>
                                  <span className="mx-2">•</span>
                                  <span className="text-blue-600">{msg.email}</span>
                                  {msg.phone && (
                                    <>
                                      <span className="mx-2">•</span>
                                      <span>{msg.phone}</span>
                                    </>
                                  )}
                                </CardDescription>
                              </div>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="sm" className="text-red-500">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Message</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete this message? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction 
                                      onClick={() => handleDeleteMessage(msg.id)}
                                      className="bg-red-600 hover:bg-red-700"
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-1">
                            <div className="whitespace-pre-wrap text-gray-700">{msg.message}</div>
                          </CardContent>
                          <CardFooter className="border-t pt-3 text-xs text-gray-500">
                            {msg.created_at && (
                              <time dateTime={msg.created_at}>
                                {new Date(msg.created_at).toLocaleString()}
                              </time>
                            )}
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
