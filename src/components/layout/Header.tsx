
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <li>
              <Link to="/" className="font-medium text-gray-800 hover:text-cortejtech-purple transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="font-medium text-gray-800 hover:text-cortejtech-purple transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link to="/services" className="font-medium text-gray-800 hover:text-cortejtech-purple transition-colors">
                Services
              </Link>
            </li>
            <li>
              <Link to="/portfolio" className="font-medium text-gray-800 hover:text-cortejtech-purple transition-colors">
                Portfolio
              </Link>
            </li>
            <li>
              <Link to="/blog" className="font-medium text-gray-800 hover:text-cortejtech-purple transition-colors">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/contact" className="font-medium text-gray-800 hover:text-cortejtech-purple transition-colors">
                Contact
              </Link>
            </li>
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
                <li>
                  <Link 
                    to="/" 
                    className="block py-2 text-lg font-medium text-gray-800 hover:text-cortejtech-purple"
                    onClick={toggleMenu}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/about" 
                    className="block py-2 text-lg font-medium text-gray-800 hover:text-cortejtech-purple"
                    onClick={toggleMenu}
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/services" 
                    className="block py-2 text-lg font-medium text-gray-800 hover:text-cortejtech-purple"
                    onClick={toggleMenu}
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/portfolio" 
                    className="block py-2 text-lg font-medium text-gray-800 hover:text-cortejtech-purple"
                    onClick={toggleMenu}
                  >
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/blog" 
                    className="block py-2 text-lg font-medium text-gray-800 hover:text-cortejtech-purple"
                    onClick={toggleMenu}
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/contact" 
                    className="block py-2 text-lg font-medium text-gray-800 hover:text-cortejtech-purple"
                    onClick={toggleMenu}
                  >
                    Contact
                  </Link>
                </li>
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
