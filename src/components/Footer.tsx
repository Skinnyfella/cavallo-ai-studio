import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="mt-12">
      <div className="max-w-7xl mx-auto py-6 border-t border-white/5 text-center">
        <div className="text-sm text-gray-300 mb-2">
          <Link to="/about" className="hover:underline">About</Link>
          <span className="mx-2">|</span>
          <Link to="/terms" className="hover:underline">Terms & Conditions</Link>
          <span className="mx-2">|</span>
          <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
          <span className="mx-2">|</span>
          <Link to="/refund" className="hover:underline">Refund Policy</Link>
          <span className="mx-2">|</span>
          <Link to="/support" className="hover:underline">Support</Link>
        </div>
        <div className="text-xs text-gray-400">© {new Date().getFullYear()} Cavallo — All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
