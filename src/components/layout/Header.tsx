import React from 'react';
import { Bug, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSchedule = () => {
    navigate('/onboarding');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-dark-900/80 backdrop-blur-lg border-b border-dark-200/20 dark:border-dark-700/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Bug className="w-8 h-8 text-[#56e39f]" />
            <span className="text-xl font-bold">Grinnage Extermination</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-dark-600 hover:text-[#56e39f] transition-colors">Services</a>
            <a href="#about" className="text-dark-600 hover:text-[#56e39f] transition-colors">About</a>
            <a href="#contact" className="text-dark-600 hover:text-[#56e39f] transition-colors">Contact</a>
            <ThemeToggle />
            <button 
              onClick={handleLogin}
              className="px-4 py-2 text-dark-600 hover:text-[#56e39f] transition-colors"
            >
              Login
            </button>
            <button 
              onClick={handleSchedule}
              className="px-6 py-2 bg-[#56e39f] text-white rounded-lg hover:bg-[#33d789] transition-colors"
            >
              Schedule Service
            </button>
          </nav>

          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#services" className="block px-3 py-2 text-dark-600 hover:text-[#56e39f]">Services</a>
            <a href="#about" className="block px-3 py-2 text-dark-600 hover:text-[#56e39f]">About</a>
            <a href="#contact" className="block px-3 py-2 text-dark-600 hover:text-[#56e39f]">Contact</a>
            <button 
              onClick={handleLogin}
              className="block w-full text-left px-3 py-2 text-dark-600 hover:text-[#56e39f]"
            >
              Login
            </button>
            <div className="px-3 py-2">
              <ThemeToggle />
            </div>
            <button 
              onClick={handleSchedule}
              className="w-full px-6 py-2 bg-[#56e39f] text-white rounded-lg hover:bg-[#33d789] transition-colors"
            >
              Schedule Service
            </button>
          </div>
        </div>
      )}
    </header>
  );
};