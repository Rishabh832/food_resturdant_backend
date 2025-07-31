import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-100 py-4 mt-10 text-sm">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        
        {/* Logo and About */}
        <div>
          <h2 className="text-xl font-bold text-orange-400 mb-2">FoodieZone</h2>
          <p className="text-xs text-gray-400">
            Fresh, fast, and flavorful food delivered to your doorstep.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-orange-300 mb-1">Quick Links</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-orange-400">Home</a></li>
            <li><a href="#" className="hover:text-orange-400">Menu</a></li>
            <li><a href="#" className="hover:text-orange-400">About</a></li>
            <li><a href="#" className="hover:text-orange-400">Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-orange-300 mb-1">Contact</h3>
          <p>📞 +91 9876543210</p>
          <p>✉️ support@foodiezone.com</p>
          <p>📍 Delhi, India</p>
        </div>

        {/* Social Icons */}
        <div>
          <h3 className="font-semibold text-orange-300 mb-1">Follow Us</h3>
          <div className="flex space-x-3 mt-1">
            <a href="#"><img src="/icons/facebook.svg" alt="Facebook" className="w-4 h-4" /></a>
            <a href="#"><img src="/icons/twitter.svg" alt="Twitter" className="w-4 h-4" /></a>
            <a href="#"><img src="/icons/instagram.svg" alt="Instagram" className="w-4 h-4" /></a>
          </div>
        </div>

      </div>

      <div className="text-center text-xs text-gray-500 mt-4 border-t border-gray-800 pt-2">
        © {new Date().getFullYear()} FoodieZone. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
