import React, { useState, useEffect } from 'react';
import { Code2, Menu, X, ArrowRight, Sparkles } from 'lucide-react';

interface NavigationProps {
  onGetStarted: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onGetStarted }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Features', href: '#features' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Docs', href: '#docs' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-neutral-950/90 backdrop-blur-xl border-b border-neutral-800/50 shadow-premium' 
        : 'bg-transparent border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Enhanced Logo */}
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-brand-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-brand-500/25 transition-all duration-300 group-hover:scale-105">
                <Code2 className="w-6 h-6 text-white" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-brand-500/50 to-purple-500/50 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10" />
            </div>
            <span className="text-2xl font-bold gradient-text">
              DevCore
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="nav-item group relative"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.querySelector(item.href);
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span className="relative z-10">{item.label}</span>
                <div className="absolute inset-0 bg-neutral-800/0 group-hover:bg-neutral-800/50 rounded-lg transition-all duration-200 -z-0" />
              </a>
            ))}
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="btn-ghost">
              Sign In
            </button>
            <button
              onClick={onGetStarted}
              className="group relative btn-primary overflow-hidden"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              
              <Sparkles className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Get Started</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="btn-icon"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass border-b border-neutral-800/50 animate-slide-in-bottom">
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block nav-item text-lg"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMenuOpen(false);
                  const element = document.querySelector(item.href);
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {item.label}
              </a>
            ))}
            
            <div className="pt-4 border-t border-neutral-800/50 space-y-3">
              <button className="w-full btn-ghost">
                Sign In
              </button>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  onGetStarted();
                }}
                className="w-full btn-primary"
              >
                <Sparkles className="w-4 h-4" />
                Get Started
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};