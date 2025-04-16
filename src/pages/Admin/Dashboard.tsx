
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
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
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
    { name: "Dashboard", icon: <Home className="h-6 w-6" /> },
    { name: "Pages", icon: <FileText className="h-6 w-6" /> },
    { name: "Services", icon: <Settings className="h-6 w-6" /> },
    { name: "Portfolio", icon: <Briefcase className="h-6 w-6" /> },
    { name: "Blog", icon: <Book className="h-6 w-6" /> },
    { name: "Career", icon: <Briefcase className="h-6 w-6" /> },
    { name: "Testimonials", icon: <MessageSquare className="h-6 w-6" /> },
    { name: "FAQ", icon: <HelpCircle className="h-6 w-6" /> },
    { name: "Media", icon: <Image className="h-6 w-6" /> },
    { name: "Users", icon: <Users className="h-6 w-6" /> },
  ];

  if (!isLoggedIn) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="bg-cortejtech-purple text-white w-64 flex-shrink-0">
        <div className="p-6">
          <h1 className="text-2xl font-bold">CortejTech Admin</h1>
        </div>
        <nav className="mt-6">
          <ul>
            {modules.map((module, index) => (
              <li key={index}>
                <a 
                  href="#" 
                  className="flex items-center px-6 py-3 text-white hover:bg-cortejtech-purple/80"
                >
                  {module.icon}
                  <span className="ml-3">{module.name}</span>
                </a>
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

      {/* Main Content */}
      <main className="flex-grow bg-gray-50">
        <header className="bg-white shadow-sm p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Dashboard</h2>
            <div>
              <span className="text-gray-600">Welcome, Admin</span>
            </div>
          </div>
        </header>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.slice(0, 9).map((module, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-md p-6 flex items-center hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="rounded-full bg-purple-100 p-3 mr-4">
                  {module.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{module.name}</h3>
                  <p className="text-gray-500 text-sm">Manage {module.name.toLowerCase()}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-6">Quick Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="border rounded-lg p-4">
                <p className="text-gray-500 text-sm">Total Pages</p>
                <p className="text-2xl font-bold">10</p>
              </div>
              <div className="border rounded-lg p-4">
                <p className="text-gray-500 text-sm">Services</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <div className="border rounded-lg p-4">
                <p className="text-gray-500 text-sm">Portfolio Items</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <div className="border rounded-lg p-4">
                <p className="text-gray-500 text-sm">Blog Posts</p>
                <p className="text-2xl font-bold">5</p>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center p-6">
            <p className="text-gray-500">This is a simplified admin dashboard interface. In a complete implementation, each module would have full CRUD functionality.</p>
            <Button 
              onClick={handleLogout}
              className="mt-4 bg-cortejtech-purple hover:bg-cortejtech-purple/90"
            >
              Log Out
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
