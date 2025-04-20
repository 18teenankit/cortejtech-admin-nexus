import { useEffect, useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
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
  PlusCircle,
  Edit,
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
  const { toast } = useToast();
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
  
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  
  const [stats, setStats] = useState({
    careersCount: 0,
    messagesCount: 0,
    servicesCount: 0,
    portfolioCount: 0,
    blogsCount: 0
  });

  useEffect(() => {
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
        
        const { data: jobsData, error: jobsError } = await supabase
          .from('jobs')
          .select('*');
          
        if (!jobsError && jobsData) {
          setJobs(jobsData);
          setStats(prev => ({ ...prev, careersCount: jobsData.length }));
        }
        
        const { data: messagesData, error: messagesError } = await supabase
          .from('contact_messages')
          .select('*');
          
        if (!messagesError && messagesData) {
          setContactMessages(messagesData);
          setStats(prev => ({ ...prev, messagesCount: messagesData.length }));
        }

        // Get counts for other modules
        const { count: servicesCount } = await supabase
          .from('services')
          .select('*', { count: 'exact', head: true });
          
        const { count: portfolioCount } = await supabase
          .from('portfolio_items')
          .select('*', { count: 'exact', head: true });
          
        const { count: blogsCount } = await supabase
          .from('blog_posts')
          .select('*', { count: 'exact', head: true });
        
        setStats(prev => ({
          ...prev,
          servicesCount: servicesCount || 0,
          portfolioCount: portfolioCount || 0,
          blogsCount: blogsCount || 0
        }));
        
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
  }, [toast]);

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
      const { error: siteNameError } = await supabase
        .from('settings')
        .upsert({ key: 'site_name', value: siteSettings.siteName }, { onConflict: 'key' });
      
      if (siteNameError) throw siteNameError;
      
      const { error: noJobsError } = await supabase
        .from('settings')
        .upsert({ key: 'no_jobs_message', value: siteSettings.noJobsMessage }, { onConflict: 'key' });
      
      if (noJobsError) throw noJobsError;
      
      const { error: emailError } = await supabase
        .from('settings')
        .upsert({ key: 'contact_email', value: siteSettings.contactEmail }, { onConflict: 'key' });
      
      if (emailError) throw emailError;
      
      const { error: phoneError } = await supabase
        .from('settings')
        .upsert({ key: 'contact_phone', value: siteSettings.contactPhone }, { onConflict: 'key' });
      
      if (phoneError) throw phoneError;
      
      const { error: addressError } = await supabase
        .from('settings')
        .upsert({ key: 'contact_address', value: siteSettings.contactAddress }, { onConflict: 'key' });
      
      if (addressError) throw addressError;
      
      if (logo) {
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
        
        setJobs(jobs.map(job => job.id === editingJob.id ? editingJob : job));
        setEditingJob(null);
        
        toast({
          title: "Job Updated",
          description: "The job listing has been updated successfully."
        });
      } else {
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
        
        if (data && data.length > 0) {
          setJobs([...jobs, data[0]]);
          setStats(prev => ({ ...prev, careersCount: prev.careersCount + 1 }));
        }
        
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

  return (
    <AdminLayout activeTab="dashboard">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsContent value="dashboard">
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">Dashboard Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  <CardTitle className="text-sm font-medium text-gray-500">Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{stats.servicesCount}</p>
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
            <Card 
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => window.location.href = "/ankit/admin/about"}
            >
              <CardContent className="p-6 flex items-center">
                <div className="rounded-full bg-purple-100 p-3 mr-4">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">About Us</h3>
                  <p className="text-gray-500 text-sm">Manage about us content</p>
                </div>
              </CardContent>
            </Card>
            <Card 
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => window.location.href = "/ankit/admin/services"}
            >
              <CardContent className="p-6 flex items-center">
                <div className="rounded-full bg-purple-100 p-3 mr-4">
                  <Briefcase className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Services</h3>
                  <p className="text-gray-500 text-sm">Manage service offerings</p>
                </div>
              </CardContent>
            </Card>
            <Card 
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => window.location.href = "/ankit/admin/portfolio"}
            >
              <CardContent className="p-6 flex items-center">
                <div className="rounded-full bg-purple-100 p-3 mr-4">
                  <Image className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Portfolio</h3>
                  <p className="text-gray-500 text-sm">Manage portfolio projects</p>
                </div>
              </CardContent>
            </Card>
            <Card 
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => window.location.href = "/ankit/admin/blog"}
            >
              <CardContent className="p-6 flex items-center">
                <div className="rounded-full bg-purple-100 p-3 mr-4">
                  <Book className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Blog</h3>
                  <p className="text-gray-500 text-sm">Manage blog posts</p>
                </div>
              </CardContent>
            </Card>
            <Card 
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setActiveTab("career")}
            >
              <CardContent className="p-6 flex items-center">
                <div className="rounded-full bg-purple-100 p-3 mr-4">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Career</h3>
                  <p className="text-gray-500 text-sm">Manage job listings</p>
                </div>
              </CardContent>
            </Card>
            <Card 
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setActiveTab("messages")}
            >
              <CardContent className="p-6 flex items-center">
                <div className="rounded-full bg-purple-100 p-3 mr-4">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Messages</h3>
                  <p className="text-gray-500 text-sm">View contact messages</p>
                </div>
              </CardContent>
            </Card>
          </div>
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
