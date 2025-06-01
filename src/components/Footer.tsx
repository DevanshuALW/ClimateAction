import React from 'react';
import { Leaf, Github, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-emerald-900 text-emerald-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Leaf size={24} className="text-emerald-400" />
              <span className="text-xl font-bold">ClimateAction</span>
            </div>
            <p className="text-emerald-300 mb-4">
              Empowering individuals to take meaningful action against climate change in their daily lives.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-emerald-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-emerald-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-emerald-300 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-emerald-300 hover:text-white transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-emerald-300 hover:text-white transition-colors">Carbon Calculator</a></li>
              <li><a href="#" className="text-emerald-300 hover:text-white transition-colors">Community Map</a></li>
              <li><a href="#" className="text-emerald-300 hover:text-white transition-colors">Eco Challenges</a></li>
              <li><a href="#" className="text-emerald-300 hover:text-white transition-colors">Sustainable Market</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-emerald-300 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-emerald-300 hover:text-white transition-colors">Climate Reports</a></li>
              <li><a href="#" className="text-emerald-300 hover:text-white transition-colors">Educational Tools</a></li>
              <li><a href="#" className="text-emerald-300 hover:text-white transition-colors">API Documentation</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-emerald-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-emerald-300 hover:text-white transition-colors">Our Mission</a></li>
              <li><a href="#" className="text-emerald-300 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-emerald-300 hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-emerald-800 mt-12 pt-8 text-center text-emerald-400">
          <p>&copy; 2025 ClimateAction. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;