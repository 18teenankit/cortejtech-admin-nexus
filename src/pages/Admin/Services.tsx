
import AdminLayout from "@/components/layout/AdminLayout";
import { ServicesManager } from "@/components/admin/ServicesManager";

const AdminServices = () => {
  return (
    <AdminLayout activeTab="services">
      <ServicesManager />
    </AdminLayout>
  );
};

export default AdminServices;
