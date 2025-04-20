
import AdminLayout from "@/components/layout/AdminLayout";
import { BlogManager } from "@/components/admin/BlogManager";

const AdminBlog = () => {
  return (
    <AdminLayout activeTab="blog">
      <BlogManager />
    </AdminLayout>
  );
};

export default AdminBlog;
