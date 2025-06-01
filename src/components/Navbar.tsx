import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, Map, Award, ShoppingBag, Home, User, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', name: 'Dashboard', icon: <Home size={20} /> },
    { path: '/carbon-footprint', name: 'Footprint', icon: <Leaf size={20} /> },
    { path: '/community', name: 'Community', icon: <Map size={20} /> },
    { path: '/challenges', name: 'Challenges', icon: <Award size={20} /> },
    { path: '/marketplace', name: 'Marketplace', icon: <ShoppingBag size={20} /> },
    { path: '/profile', name: 'Profile', icon: <User size={20} /> }
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-emerald-800 font-bold text-xl"
        >
          <Leaf className="text-emerald-600" />
          <span>ClimateAction</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-2 rounded-lg flex items-center space-x-1 transition-colors ${
                isActive(link.path)
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'hover:bg-emerald-50 text-gray-700 hover:text-emerald-700'
              }`}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}
        </div>

        {/* Mobile Navigation Button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden absolute w-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="container mx-auto px-4 py-2 flex flex-col">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-3 flex items-center space-x-3 ${
                isActive(link.path)
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'text-gray-700 hover:bg-emerald-50'
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;