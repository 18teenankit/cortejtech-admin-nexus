
import { ReactNode, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  Home, 
  Users, 
  Settings, 
  FileText, 
  Image, 
  Book, 
  Briefcase, 
  MessageSquare,
  Info,
  LogOut
} from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
  activeTab: string;
}

const AdminLayout = ({ children, activeTab }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("adminLoggedIn") === "true";
    setIsLoggedIn(loggedIn);

    if (!loggedIn) {
      navigate("/ankit/admin");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/ankit/admin");
  };

  const modules = [
    { name: "Dashboard", icon: <Home className="h-6 w-6" />, path: "/ankit/admin/dashboard", tab: "dashboard" },
    { name: "About Us", icon: <Info className="h-6 w-6" />, path: "/ankit/admin/about", tab: "about" },
    { name: "Services", icon: <Briefcase className="h-6 w-6" />, path: "/ankit/admin/services", tab: "services" },
    { name: "Portfolio", icon: <Image className="h-6 w-6" />, path: "/ankit/admin/portfolio", tab: "portfolio" },
    { name: "Blog", icon: <Book className="h-6 w-6" />, path: "/ankit/admin/blog", tab: "blog" },
    { name: "Career", icon: <Users className="h-6 w-6" />, path: "/ankit/admin/dashboard", tab: "career" },
    { name: "Messages", icon: <MessageSquare className="h-6 w-6" />, path: "/ankit/admin/dashboard", tab: "messages" },
    { name: "Settings", icon: <Settings className="h-6 w-6" />, path: "/ankit/admin/dashboard", tab: "settings" },
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
              src="/lovable-uploads/bd45910c-d0e8-4a45-a99f-6d7e6aad54ae.png" 
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
                <Link
                  to={module.path}
                  className={`w-full flex items-center px-6 py-3 text-white hover:bg-cortejtech-purple/80 ${
                    activeTab === module.tab ? 'bg-cortejtech-purple/70' : ''
                  }`}
                >
                  {module.icon}
                  <span className="ml-3">{module.name}</span>
                </Link>
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
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
