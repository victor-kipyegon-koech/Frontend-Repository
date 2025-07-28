 
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Navbar } from './Navbar';
import { useAuth } from '@/context/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import {
  BarChart3,
  Calendar,
  Ticket,
  Users,
  Settings,
  Home,
  LogOut,
  TrendingUp,
  UserCheck,
  CreditCard,
  User,
  Building,
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const userNavItems = [
    { path: '/dashboard', label: 'Analytics', icon: TrendingUp },
    { path: '/events', label: 'Events', icon: Calendar },
    { path: '/my-bookings', label: 'My Bookings', icon: Ticket },
    { path: '/support', label: 'Support', icon: UserCheck },
    { path: '/profile', label: 'Profile', icon: User }, // user profile route
  ];

  const adminNavItems = [
    { path: '/admin/dashboard', label: 'Analytics', icon: TrendingUp },
    { path: '/admin/users', label: 'Manage Users', icon: Users },
    { path: '/admin/events', label: 'Manage Events', icon: Calendar },
    { path: '/admin/venues', label: 'Manage Venues', icon: Building },
    { path: '/admin/bookings', label: 'View Bookings', icon: Ticket },
    { path: '/admin/reports', label: 'Sales Reports', icon: BarChart3 },
    { path: '/admin/support', label: 'Support Tickets', icon: UserCheck },
    { path: '/admin/payments', label: 'Payment', icon: CreditCard },
    { path: '/admin/profile', label: 'Admin Profile', icon: User }, 
  ];

  const navItems = user?.userType === 'admin' ? adminNavItems : userNavItems;

  return (
    <div className="w-screen h-screen flex flex-col bg-white overflow-hidden">
      {/* Navbar - fixed at top */}
      <div className="fixed top-0 w-full z-50">
        <Navbar />
      </div>

      {/* Content below navbar */}
      <div className="flex flex-1 pt-16 h-full overflow-hidden">
        {/* Sidebar */}
        {isAuthenticated && (
          <aside className="hidden lg:flex flex-col w-64 bg-gray-800 border-r border-gray-700 fixed left-0 top-16 bottom-0 z-40">
            <div className="flex-grow overflow-y-auto px-4 py-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {user?.firstName?.[0]}
                  {user?.lastName?.[0]}
                </div>
                <div>
                  <p className="text-white font-medium text-sm">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-gray-400 text-xs">
                    {user?.userType === 'admin' ? 'Administrator' : 'Member'}
                  </p>
                </div>
              </div>

              <nav className="space-y-2">
                {navItems.map(({ path, label, icon: Icon }) => (
                  <Link
                    key={path}
                    to={path}
                    className={`flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive(path)
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <Icon
                      className={`mr-3 h-5 w-5 ${
                        isActive(path)
                          ? 'text-white'
                          : 'text-gray-400 group-hover:text-white'
                      }`}
                    />
                    {label}
                  </Link>
                ))}

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-3 py-3 text-sm font-medium text-red-400 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-200"
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  Logout
                </button>
              </nav>
            </div>
          </aside>
        )}

        {/* Main content */}
        <main
          className={`flex-1 overflow-y-auto p-6 ${
            isAuthenticated ? 'lg:ml-64 bg-gray-100' : 'bg-white'
          } w-full`}
        >
          {children}
        </main>
      </div>

      <Toaster />
    </div>
  );
};

