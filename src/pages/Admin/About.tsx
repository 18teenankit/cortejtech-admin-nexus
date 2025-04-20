
import { useEffect } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { AboutManager } from "@/components/admin/AboutManager";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const AdminAbout = () => {
  const { toast } = useToast();

  useEffect(() => {
    // Check if the about_us table exists
    const checkTable = async () => {
      const { error } = await supabase
        .from('about_us')
        .select('id')
        .limit(1);
      
      if (error && error.code === "42P01") { // Table doesn't exist error code
        toast({
          title: "Database setup required",
          description: "The about_us table doesn't exist. Please run the required SQL setup.",
          variant: "destructive"
        });
      }
    };
    
    checkTable();
  }, [toast]);

  return (
    <AdminLayout activeTab="about">
      <AboutManager />
    </AdminLayout>
  );
};

export default AdminAbout;
