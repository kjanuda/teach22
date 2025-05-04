import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { 
  Menu, 
  LogOut, 
  User, 
  Calendar, 
  Home as HomeIcon, 
  Settings, 
  HelpCircle, 
  ChevronDown,
  Bell,
  BookOpen,
  CheckCircle
} from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef(null);
  const profileRef = useRef(null);

  // Handle clicks outside of menus to close them
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close menus when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  }, [location.pathname]);

  const [showToast, setShowToast] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    setIsProfileOpen(false);
    
    // Show animated success toast
    setShowToast(true);
    
    // Redirect after a short delay to allow the animation to be seen
    setTimeout(() => {
      navigate('/signin');
    }, 1500);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isProfileOpen) setIsProfileOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  // Check if a link is active
  const isActive = (path) => {
    return location.pathname === path ? 'text-blue-700 font-medium' : 'text-gray-600';
  };

  // Format user initial for avatar
  const getUserInitial = () => {
    // Use first letter of username if available
    if (user?.username) return user.username.charAt(0).toUpperCase();
    // Fall back to email first letter if username is not available
    if (user?.email) return user.email.charAt(0).toUpperCase();
    return 'U';
  };

  // Get user display name
  const getDisplayName = () => {
    if (user?.username) return user.username;
    if (user?.email) return user.email.split('@')[0];
    return 'User';
  };

  return (
    <>
      {/* Success Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 flex items-center bg-white rounded-lg shadow-lg border-l-4 border-green-500 p-4 transform transition-all duration-500 animate-fade-in-down">
          <div className="flex-shrink-0 mr-3">
            <CheckCircle className="h-6 w-6 text-green-500" />
          </div>
          <div>
            <p className="font-medium text-gray-800">Sign out Successful!</p>
            <p className="text-sm text-gray-500">Redirecting to sign in page...</p>
          </div>
        </div>
      )}
    
      <nav className="bg-white shadow-md sticky top-0 z-40" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center group" aria-label="Home">
              <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <Calendar className="h-6 w-6 text-blue-600 group-hover:text-blue-700 transition-colors" />
              </div>
              <span className="ml-2 text-xl font-bold text-blue-700 group-hover:text-blue-800 transition-colors">
                Teacher Attendance
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link 
              to="/" 
              className={`${isActive('/')} hover:text-blue-700 hover:bg-blue-50 px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors`}
            >
              <HomeIcon className="w-4 h-4 mr-1.5" />
              Home
            </Link>
            <Link 
              to="/attendance" 
              className={`${isActive('/attendance')} hover:text-blue-700 hover:bg-blue-50 px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors`}
            >
              <BookOpen className="w-4 h-4 mr-1.5" />
              Attendance
            </Link>
            <Link 
              to="/classes" 
              className={`${isActive('/classes')} hover:text-blue-700 hover:bg-blue-50 px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors`}
            >
              <Calendar className="w-4 h-4 mr-1.5" />
              Classes
            </Link>
            
            {/* Notification Bell */}
            <button 
              className="text-gray-600 hover:text-blue-700 p-2 rounded-full hover:bg-blue-50 transition-colors relative ml-2"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Modern User Dropdown */}
            <div className="relative ml-3" ref={profileRef}>
              <button
                onClick={toggleProfile}
                className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 group transition-all p-1"
                aria-expanded={isProfileOpen}
                aria-haspopup="true"
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
                  {getUserInitial()}
                </div>
                <div className="ml-2 flex items-center">
                  <span className="text-gray-700 max-w-xs truncate hidden sm:block">{getDisplayName()}</span>
                  <ChevronDown className={`w-4 h-4 ml-1 text-gray-500 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {isProfileOpen && (
                <div
                  className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-1 z-10 border border-gray-100 ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                >
                  {/* User Info Section */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900 truncate">{user?.username || "User"}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email || ""}</p>
                  </div>
                  
                  {/* Menu Items */}
                  <div className="py-1">
                    <Link 
                      to="/profile" 
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                      role="menuitem"
                    >
                      <User className="w-4 h-4 mr-3 text-gray-500" />
                      <span>Your Profile</span>
                    </Link>
                    
                    <Link 
                      to="/settings" 
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                      role="menuitem"
                    >
                      <Settings className="w-4 h-4 mr-3 text-gray-500" />
                      <span>Settings</span>
                    </Link>
                    
                    <Link 
                      to="/help" 
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                      role="menuitem"
                    >
                      <HelpCircle className="w-4 h-4 mr-3 text-gray-500" />
                      <span>Help</span>
                    </Link>
                  </div>
                  
                  {/* Sign Out Button */}
                  <div className="py-1 border-t border-gray-100">
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                      role="menuitem"
                    >
                      <LogOut className="w-4 h-4 mr-3 text-gray-500" />
                      <span>Sign out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Notification Bell - Mobile */}
            <button 
              className="text-gray-600 hover:text-blue-700 p-2 rounded-full hover:bg-blue-50 transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            
            {user && (
              <button
                onClick={toggleProfile}
                className="flex items-center p-1 rounded-full"
                aria-label="User profile menu"
                aria-expanded={isProfileOpen}
                aria-haspopup="true"
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-sm">
                  {getUserInitial()}
                </div>
              </button>
            )}
            
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-blue-700 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              aria-label={isMenuOpen ? "Close main menu" : "Open main menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-60' : 'max-h-0'}`}
        id="mobile-menu"
        ref={menuRef}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link 
            to="/" 
            className={`block px-3 py-2 rounded-md text-base ${isActive('/')} hover:text-blue-700 hover:bg-blue-50 transition-colors flex items-center`}
          >
            <HomeIcon className="w-5 h-5 mr-3 text-gray-500" />
            Home
          </Link>
          <Link 
            to="/attendance" 
            className={`block px-3 py-2 rounded-md text-base ${isActive('/attendance')} hover:text-blue-700 hover:bg-blue-50 transition-colors flex items-center`}
          >
            <BookOpen className="w-5 h-5 mr-3 text-gray-500" />
            Attendance
          </Link>
          <Link 
            to="/classes" 
            className={`block px-3 py-2 rounded-md text-base ${isActive('/classes')} hover:text-blue-700 hover:bg-blue-50 transition-colors flex items-center`}
          >
            <Calendar className="w-5 h-5 mr-3 text-gray-500" />
            Classes
          </Link>
        </div>
      </div>

      {/* Mobile profile dropdown */}
      <div 
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${isProfileOpen ? 'max-h-96' : 'max-h-0'}`}
        aria-label="User dropdown menu"
      >
        <div className="px-2 pt-2 pb-3">
          {/* User Info */}
          <div className="px-3 py-2 mb-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900 truncate">{user?.username || "User"}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email || "user@example.com"}</p>
          </div>
          
          {/* Menu Items */}
          <Link 
            to="/profile" 
            className="flex items-center px-3 py-2 rounded-md text-base text-gray-700 hover:text-blue-700 hover:bg-blue-50 transition-colors"
          >
            <User className="w-5 h-5 mr-3 text-gray-500" />
            Your Profile
          </Link>
          
          <Link 
            to="/settings" 
            className="flex items-center px-3 py-2 rounded-md text-base text-gray-700 hover:text-blue-700 hover:bg-blue-50 transition-colors"
          >
            <Settings className="w-5 h-5 mr-3 text-gray-500" />
            Settings
          </Link>
          
          <Link 
            to="/help" 
            className="flex items-center px-3 py-2 rounded-md text-base text-gray-700 hover:text-blue-700 hover:bg-blue-50 transition-colors"
          >
            <HelpCircle className="w-5 h-5 mr-3 text-gray-500" />
            Help
          </Link>
          
          {/* Sign Out Button */}
          <div className="pt-2 mt-2 border-t border-gray-100">
            <button
              onClick={handleLogout}
              className="flex w-full items-center px-3 py-2 rounded-md text-base text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-5 h-5 mr-3 text-gray-500" />
              Sign out
            </button>
          </div>
        </div>
      </div>
    </nav>
    
      {/* Add animation keyframes to the stylesheet */}
      <style jsx global>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-down {
          animation: fadeInDown 0.5s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default Navbar;