import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-cortejtech-gray bg-white py-4 md:py-6">
      <div className="container flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-cortejtech-purple">
          CortejTech
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center space-x-8">
            {navigation.map((item, index) => (
              <li key={index}>
                <Link to={item.href} className="font-medium text-gray-800 hover:text-cortejtech-purple transition-colors">
                  {item.name}
                </Link>
              </li>
            ))}
            <li>
              <Button asChild className="bg-cortejtech-purple hover:bg-cortejtech-purple/90">
                <Link to="/contact">Get a Quote</Link>
              </Button>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="flex items-center md:hidden" 
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="fixed inset-0 top-[69px] z-50 bg-white md:hidden">
            <nav className="container py-6">
              <ul className="flex flex-col space-y-4">
                {navigation.map((item, index) => (
                  <li key={index}>
                    <Link 
                      to={item.href} 
                      className="block py-2 text-lg font-medium text-gray-800 hover:text-cortejtech-purple"
                      onClick={toggleMenu}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                <li className="pt-4">
                  <Button 
                    asChild 
                    className="w-full bg-cortejtech-purple hover:bg-cortejtech-purple/90"
                    onClick={toggleMenu}
                  >
                    <Link to="/contact">Get a Quote</Link>
                  </Button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
