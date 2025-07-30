 
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { Layout } from '@/components/layout/Layout';
import { Toaster } from 'sonner'; 
import { UserProfilePage } from './pages/userProfilePage';
import { AdminProfilePage } from './pages/AdminProfilePage';


// Pages
import { HomePage } from '@/pages/HomePage';
import { AboutPage } from '@/pages/AboutPage';
import { EventsPage } from '@/pages/EventsPage';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { UserDashboard } from '@/pages/UserDashboard';
import { MyBookingsPage } from '@/pages/MyBookingsPage';

// Admin Pages
import { AdminDashboard } from '@/pages/AdminDashboard';
import AdminEventsPage from '@/pages/AdminEventsPage';
import { AdminVenuesPage } from '@/pages/AdminVenuesPage';
import AdminUsersPage from '@/pages/AdminUsersPage';
import { AdminBookingsPage } from '@/pages/AdminBookingPage';
import { AdminReportsPage } from '@/pages/AdminReportsPage';
import { AdminSupportPage } from '@/pages/AdminSupportPage';
import { AdminPaymentsPage } from '@/pages/AdminPaymentPage';

import './App.css';
import UserSupportPage from './pages/UserSupportPage';

// 🔐 Route protection component
const ProtectedRoute: React.FC<{ children: React.ReactNode; adminOnly?: boolean }> = ({
  children,
  adminOnly = false,
}) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user?.userType !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

// 🌐 Public route wrapper
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

function AppRoutes() {
  return (
    <Layout>
      <Routes>
        {/* ✅ Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/login" element={<PublicRoute><LoginForm /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><RegisterForm /></PublicRoute>} />

        {/* ✅ User Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
        <Route path="/my-bookings" element={<ProtectedRoute><MyBookingsPage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><UserProfilePage /></ProtectedRoute>} />
        <Route path="/support" element={<UserSupportPage />} />
        <Route
          path="/support"
          element={
            <ProtectedRoute>
              <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">Support Center</h1>
                  <p className="text-gray-600">Contact support for help with your bookings</p>
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        {/* 🔐 Admin Routes */}
        <Route path="/admin/dashboard" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/events" element={<ProtectedRoute adminOnly><AdminEventsPage /></ProtectedRoute>} />
        <Route path="/admin/venues" element={<ProtectedRoute adminOnly><AdminVenuesPage /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute adminOnly><AdminUsersPage /></ProtectedRoute>} />
        <Route path="/admin/bookings" element={<ProtectedRoute adminOnly><AdminBookingsPage /></ProtectedRoute>} />
        <Route path="/admin/reports" element={<ProtectedRoute adminOnly><AdminReportsPage /></ProtectedRoute>} />
        <Route path="/admin/support" element={<ProtectedRoute adminOnly><AdminSupportPage /></ProtectedRoute>} />
        <Route path="/admin/payments" element={<ProtectedRoute adminOnly><AdminPaymentsPage /></ProtectedRoute>} />
        <Route path="/admin/profile" element={<ProtectedRoute adminOnly><AdminProfilePage /></ProtectedRoute>} />


        {/* ❌ Fallback for unknown paths */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
        <Toaster richColors position="top-center" />
      </Router>
    </AuthProvider>
  );
}

export default App;
