
import AdminLayout from "@/components/layout/AdminLayout";
import { PortfolioManager } from "@/components/admin/PortfolioManager";

const AdminPortfolio = () => {
  return (
    <AdminLayout activeTab="portfolio">
      <PortfolioManager />
    </AdminLayout>
  );
};

export default AdminPortfolio;
