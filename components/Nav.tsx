import React, { useState } from 'react';
import { Menu, X, Network } from 'lucide-react';
import { NAV_ITEMS } from '../constants';

const Nav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-white border-b border-black">
      <div className="flex justify-between items-stretch h-14">
        {/* Logo Area - Left aligned */}
        <a href="#" className="flex items-center gap-3 px-6 border-r border-black hover:bg-black hover:text-white transition-colors">
          <img src="/zetesis-logo.png" alt="Zetesis Logo" className="h-6 w-auto" />
          <span className="text-lg font-serif font-bold tracking-tight">ZETESIS</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-stretch">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center px-6 text-xs font-mono font-medium text-black hover:bg-black hover:text-white transition-colors border-l border-black first:border-l-0"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden px-6 border-l border-black text-black hover:bg-black hover:text-white transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-black bg-white">
          <div className="flex flex-col">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-6 py-4 text-sm font-mono font-bold text-black border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;