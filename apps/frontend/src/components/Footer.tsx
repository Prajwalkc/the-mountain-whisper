
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-nepal-text-dark text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div>
            <h3 className="text-xl font-bold mb-4">The<span className="text-nepal-orange">Mountain</span>Whisper</h3>
            <p className="text-gray-300 mb-4">
              Your trusted partner for exploring the natural beauty and cultural richness of Nepal. We specialize in crafting unforgettable travel experiences.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="bg-white/10 hover:bg-nepal-purple p-2 rounded-full transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-nepal-purple p-2 rounded-full transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-nepal-purple p-2 rounded-full transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-nepal-purple p-2 rounded-full transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/destinations" className="text-gray-300 hover:text-white transition-colors">Destinations</Link>
              </li>
              <li>
                <Link to="/tours" className="text-gray-300 hover:text-white transition-colors">Tours & Packages</Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-white transition-colors">Travel Tips</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-white transition-colors">FAQs</Link>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Popular Destinations */}
          <div>
            <h3 className="text-lg font-bold mb-4">Popular Destinations</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/destinations/everest" className="text-gray-300 hover:text-white transition-colors">Everest Region</Link>
              </li>
              <li>
                <Link to="/destinations/annapurna" className="text-gray-300 hover:text-white transition-colors">Annapurna Region</Link>
              </li>
              <li>
                <Link to="/destinations/kathmandu" className="text-gray-300 hover:text-white transition-colors">Kathmandu Valley</Link>
              </li>
              <li>
                <Link to="/destinations/pokhara" className="text-gray-300 hover:text-white transition-colors">Pokhara</Link>
              </li>
              <li>
                <Link to="/destinations/chitwan" className="text-gray-300 hover:text-white transition-colors">Chitwan National Park</Link>
              </li>
              <li>
                <Link to="/destinations/lumbini" className="text-gray-300 hover:text-white transition-colors">Lumbini</Link>
              </li>
            </ul>
          </div>
          
          {/* Column 4: Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 text-nepal-orange" />
                <span className="text-gray-300">
                  Thamel, Kathmandu, Nepal
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-nepal-orange" />
                <span className="text-gray-300">+977-1-4xxxxx</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-nepal-orange" />
                <a href="mailto:info@themountainwhisper.com" className="text-gray-300 hover:text-white transition-colors">info@themountainwhisper.com</a>
              </li>
            </ul>
            
            <div className="mt-6">
              <h4 className="font-medium text-sm mb-2">Subscribe to our newsletter</h4>
              <form className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-4 py-2 text-nepal-text-dark rounded-l-md focus:outline-none w-full"
                />
                <button className="bg-nepal-orange hover:bg-nepal-orange/90 px-4 py-2 rounded-r-md transition-colors">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom footer */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} The Mountain Whisper. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
