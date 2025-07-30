 
 import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Calendar } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
              <Calendar className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">EventHub</span>
            </Link>
          </div>


          {/* Center: Navigation Links */}
          <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600 text-sm font-medium px-3 py-2 transition duration-200">
              Home
            </Link>
            <Link to="/events" className="text-gray-700 hover:text-blue-600 text-sm font-medium px-3 py-2 transition duration-200">
              Events
            </Link>
            <Link to="/venues" className="text-gray-700 hover:text-blue-600 text-sm font-medium px-3 py-2 transition duration-200">
              Venues
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 text-sm font-medium px-3 py-2 transition duration-200">
              About Us
            </Link>
          </div>

          {/* Right: Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <>
                <Link to="/login" className="text-gray-700 hover:text-blue-600 text-sm font-medium px-3 py-2 transition duration-200">
                  Login
                </Link>
                <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition duration-200">
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 text-sm font-medium px-3 py-2 transition duration-200">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-red-600 text-sm font-medium px-3 py-2 transition duration-200"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700 hover:text-blue-600 p-2 transition duration-200">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-md mt-2 rounded-md">
            <div className="px-4 py-4 space-y-2">
              <Link to="/" onClick={closeMenu} className="block text-gray-700 hover:text-blue-600 text-base font-medium px-3 py-2">
                Home
              </Link>
              <Link to="/events" onClick={closeMenu} className="block text-gray-700 hover:text-blue-600 text-base font-medium px-3 py-2">
                Events
              </Link>
              <Link to="/venues" onClick={closeMenu} className="block text-gray-700 hover:text-blue-600 text-base font-medium px-3 py-2">
                Venues
              </Link>
              <Link to="/about" onClick={closeMenu} className="block text-gray-700 hover:text-blue-600 text-base font-medium px-3 py-2">
                About Us
              </Link>

              {!user ? (
                <div className="pt-4 border-t border-gray-200">
                  <Link to="/login" onClick={closeMenu} className="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium">
                    Login
                  </Link>
                  <Link to="/register" onClick={closeMenu} className="block bg-blue-600 text-white px-3 py-2 mt-2 rounded-md text-base font-medium hover:bg-blue-700">
                    Register
                  </Link>
                </div>
              ) : (
                <div className="pt-4 border-t border-gray-200">
                  <Link to="/dashboard" onClick={closeMenu} className="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium">
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left text-gray-700 hover:text-red-600 px-3 py-2 text-base font-medium"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

