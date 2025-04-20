
import AdminLayout from "@/components/layout/AdminLayout";
import { AboutManager } from "@/components/admin/AboutManager";

const AdminAbout = () => {
  return (
    <AdminLayout activeTab="about">
      <AboutManager />
    </AdminLayout>
  );
};

export default AdminAbout;
