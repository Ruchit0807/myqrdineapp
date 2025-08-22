import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useCartStore } from '../stores/cartStore';

const Layout: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { getTotalItems } = useCartStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🍽️</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">QR Dine</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/')
                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                    : 'text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400'
                }`}
              >
                Menu
              </Link>
              <Link
                to="/games"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/games')
                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                    : 'text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400'
                }`}
              >
                Games
              </Link>
              
              {/* Staff Access Dropdown */}
              <div className="relative group">
                <button className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/chef') || isActive('/owner') || isActive('/tracker')
                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                    : 'text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400'
                }`}>
                  Staff Access
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <Link
                      to="/chef"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 dark:text-gray-300 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      👨‍🍳 Chef Dashboard
                    </Link>
                    <Link
                      to="/owner"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 dark:text-gray-300 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      👑 Owner Dashboard
                    </Link>
                    <Link
                      to="/tracker"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 dark:text-gray-300 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      📍 Order Tracker
                    </Link>
                  </div>
                </div>
              </div>
            </nav>

            {/* Right side controls */}
            <div className="flex items-center space-x-4">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive('/')
                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                    : 'text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Menu
              </Link>
              <Link
                to="/games"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive('/games')
                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                    : 'text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Games
              </Link>
              
              {/* Staff Access Mobile Links */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 px-3 py-1 uppercase tracking-wider">
                  Staff Access
                </div>
                <Link
                  to="/chef"
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive('/chef')
                      ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                      : 'text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  👨‍🍳 Chef Dashboard
                </Link>
                <Link
                  to="/owner"
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive('/owner')
                      ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                      : 'text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  👑 Owner Dashboard
                </Link>
                <Link
                  to="/tracker"
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive('/tracker')
                      ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                      : 'text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  📍 Order Tracker
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>

      {/* Floating Cart Icon */}
      <Link
        to="/cart"
        className="fixed bottom-6 right-6 bg-primary-500 hover:bg-primary-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-50 group"
        aria-label="View cart"
      >
        <ShoppingCart className="w-6 h-6" />
        {getTotalItems() > 0 && (
          <span className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
            {getTotalItems() > 99 ? '99+' : getTotalItems()}
          </span>
        )}
        <div className="absolute right-full mr-3 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          View Cart
        </div>
      </Link>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p>&copy; 2024 QR Dine. All rights reserved.</p>
            <p className="mt-2 text-sm">
              Scan the QR code at your table to order delicious food!
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
