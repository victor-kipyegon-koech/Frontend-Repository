 
  import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useAuth } from '../context/AuthContext';
import { useBookings } from '../hooks/useApi';
import { Link } from 'react-router-dom';
import { Calendar, Ticket, User, DollarSign, Clock, MapPin, ArrowRight, TrendingUp } from 'lucide-react';
import { Input } from '../components/ui/input';
import { toast } from 'sonner';

export const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const { bookings, loading } = useBookings(user?.userId);

  const upcomingBookings = bookings.filter(booking => {
    const eventDate = new Date(booking.event?.date || '');
    return eventDate > new Date() && booking.status === 'confirmed';
  });

  const totalSpent = bookings.reduce((sum, booking) => {
    return sum + parseFloat(booking.totalAmount);
  }, 0);

  const stats = [
    {
      title: 'Total Bookings',
      value: bookings.length,
      icon: Ticket,
      color: 'bg-blue-500',
    },
    {
      title: 'Upcoming Events',
      value: upcomingBookings.length,
      icon: Calendar,
      color: 'bg-purple-500',
    },
    {
      title: 'Total Spent',
      value: `$${totalSpent.toFixed(2)}`,
      icon: DollarSign,
      color: 'bg-green-500',
    },
    {
      title: 'Active Bookings',
      value: bookings.filter(b => b.status === 'confirmed').length,
      icon: TrendingUp,
      color: 'bg-orange-500',
    },
  ];

  const [showProfile, setShowProfile] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleUpdateProfile = async () => {
    try {
      await fetch('/api/users/me', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      toast.success('Profile updated!');
    } catch {
      toast.error('Failed to update profile');
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      await fetch('/api/users/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });
      toast.success('Password changed!');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch {
      toast.error('Failed to change password');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-gray-600">Here's what's happening with your events</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.color}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button asChild variant="outline" className="h-auto p-4">
              <Link to="/events" className="flex flex-col items-center">
                <Calendar className="w-8 h-8 mb-2" />
                <span className="font-medium">Browse Events</span>
                <span className="text-sm text-gray-500">Discover new events</span>
              </Link>
            </Button>

            <Button asChild variant="outline" className="h-auto p-4">
              <Link to="/my-bookings" className="flex flex-col items-center">
                <Ticket className="w-8 h-8 mb-2" />
                <span className="font-medium">My Bookings</span>
                <span className="text-sm text-gray-500">View all tickets</span>
              </Link>
            </Button>

            <Button asChild variant="outline" className="h-auto p-4">
              <Link to="/support" className="flex flex-col items-center">
                <User className="w-8 h-8 mb-2" />
                <span className="font-medium">Support</span>
                <span className="text-sm text-gray-500">Get help</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Profile Section */}
        <div className="mt-10">
          <Button
            variant="outline"
            className="mb-4"
            onClick={() => setShowProfile(!showProfile)}
          >
            {showProfile ? 'Hide' : 'Edit'} Profile & Password
          </Button>

          {showProfile && (
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Update Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  />
                  <Input
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  <Button onClick={handleUpdateProfile}>Save Changes</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    type="password"
                    placeholder="Current Password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  />
                  <Input
                    type="password"
                    placeholder="New Password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  />
                  <Input
                    type="password"
                    placeholder="Confirm New Password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  />
                  <Button onClick={handleChangePassword}>Change Password</Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
