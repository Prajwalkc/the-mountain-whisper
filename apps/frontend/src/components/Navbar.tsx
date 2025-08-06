import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, User, Globe, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-white/90 shadow-sm backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-nepal-purple">
                The<span className="text-nepal-orange">Mountain</span>Whisper
              </span>
            </Link>
          </div>

          {/* Desktop nav links */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link
              to="/"
              className="font-medium text-gray-600 hover:text-nepal-purple-dark transition-colors"
            >
              Home
            </Link>
            <div className="relative group">
              <button className="flex items-center font-medium text-gray-600 hover:text-nepal-purple-dark transition-colors">
                <span>Destinations</span>
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute -left-4 mt-2 w-48 origin-top-left bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-1">
                  <Link
                    to="/destinations/kathmandu"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-nepal-light-gray"
                  >
                    Kathmandu
                  </Link>
                  <Link
                    to="/destinations/pokhara"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-nepal-light-gray"
                  >
                    Pokhara
                  </Link>
                  <Link
                    to="/destinations/chitwan"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-nepal-light-gray"
                  >
                    Chitwan
                  </Link>
                  <Link
                    to="/destinations/everest"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-nepal-light-gray"
                  >
                    Everest Region
                  </Link>
                  <Link
                    to="/destinations"
                    className="block px-4 py-2 text-sm font-medium text-nepal-purple"
                  >
                    View All
                  </Link>
                </div>
              </div>
            </div>
            <Link
              to="/tours"
              className="font-medium text-gray-600 hover:text-nepal-purple-dark transition-colors"
            >
              Tours & Packages
            </Link>
            <Link
              to="/hotels"
              className="font-medium text-gray-600 hover:text-nepal-purple-dark transition-colors"
            >
              Hotels
            </Link>
            <Link
              to="/blog"
              className="font-medium text-gray-600 hover:text-nepal-purple-dark transition-colors"
            >
              Travel Tips
            </Link>
            <Link
              to="/contact"
              className="font-medium text-gray-600 hover:text-nepal-purple-dark transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Right section - Search, Language, Login */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <button className="text-gray-500 hover:text-nepal-purple transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <button className="text-gray-500 hover:text-nepal-purple transition-colors">
              <Globe className="h-5 w-5" />
            </button>
            <Button className="nepal-button-primary">
              <User className="h-4 w-4 mr-1" />
              <span>Sign In</span>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-nepal-purple-dark focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden h-screen bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md font-medium text-nepal-text-dark hover:bg-nepal-light-gray"
            >
              Home
            </Link>
            <Link
              to="/destinations"
              className="block px-3 py-2 rounded-md font-medium text-nepal-text-dark hover:bg-nepal-light-gray"
            >
              Destinations
            </Link>
            <Link
              to="/tours"
              className="block px-3 py-2 rounded-md font-medium text-nepal-text-dark hover:bg-nepal-light-gray"
            >
              Tours & Packages
            </Link>
            <Link
              to="/hotels"
              className="block px-3 py-2 rounded-md font-medium text-nepal-text-dark hover:bg-nepal-light-gray"
            >
              Hotels
            </Link>
            <Link
              to="/blog"
              className="block px-3 py-2 rounded-md font-medium text-nepal-text-dark hover:bg-nepal-light-gray"
            >
              Travel Tips
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-md font-medium text-nepal-text-dark hover:bg-nepal-light-gray"
            >
              Contact
            </Link>
          </div>

          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center justify-around">
              <Button className="nepal-button-primary w-full mx-4">
                <User className="h-4 w-4 mr-1" />
                <span>Sign In</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
