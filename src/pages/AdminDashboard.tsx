import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { useDashboardStats } from '@/hooks/useApi';
import { Link } from 'react-router-dom';
import {Calendar, Users, DollarSign, Ticket, TrendingUp, ArrowRight,MapPin,Plus,BarChart3} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { stats, loading } = useDashboardStats();

  const quickActions = [
    {
      title: 'Add Event',
      description: 'Create a new event',
      icon: Plus,
      href: '/admin/events/new',
      color: 'bg-purple-500',
    },
    {
      title: 'Manage Venues',
      description: 'Add or edit venues',
      icon: MapPin,
      href: '/admin/venues',
      color: 'bg-blue-500',
    },
    {
      title: 'View Reports',
      description: 'Analytics and insights',
      icon: BarChart3,
      href: '/admin/reports',
      color: 'bg-green-500',
    },
    {
      title: 'User Management',
      description: 'Manage user accounts',
      icon: Users,
      href: '/admin/users',
      color: 'bg-orange-500',
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your events, venues, and users</p>
        </div>

        {/* stats grid  */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Events</p>
                  <p className="text-2xl font-bold text-gray-900">{stats?.totalEvents || 0}</p>
                </div>
                <div className="p-3 rounded-lg bg-purple-500">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">{stats?.totalBookings || 0}</p>
                </div>
                <div className="p-3 rounded-lg bg-blue-500">
                  <Ticket className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${stats?.totalRevenue?.toLocaleString() || '0'}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-green-500">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Users</p>
                  <p className="text-2xl font-bold text-gray-900">{stats?.totalUsers || 0}</p>
                </div>
                <div className="p-3 rounded-lg bg-orange-500">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Bookings */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <Ticket className="w-5 h-5 mr-2" />
                  Recent Bookings
                </CardTitle>
                <Button asChild variant="outline" size="sm">
                  <Link to="/admin/bookings">
                    View All
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {stats?.recentBookings && stats.recentBookings.length > 0 ? (
                <div className="space-y-4">
                  {stats.recentBookings.map((booking) => (
                    <div key={booking.bookingId} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900">{booking.event?.title}</h3>
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          {booking.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center text-sm text-gray-600">
                        <span>{booking.quantity} ticket{booking.quantity !== 1 ? 's' : ''}</span>
                        <span className="font-semibold">${booking.totalAmount}</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Ticket className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No recent bookings</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Popular Events */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Popular Events
                </CardTitle>
                <Button asChild variant="outline" size="sm">
                  <Link to="/admin/events">
                    View All
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {stats?.popularEvents && stats.popularEvents.length > 0 ? (
                <div className="space-y-4">
                  {stats.popularEvents.map((event) => (
                    <div key={event.eventId} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900">{event.title}</h3>
                        <Badge variant="outline">
                          {event.category}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center text-sm text-gray-600">
                        <span>{event.ticketsSold} sold</span>
                        <span className="font-semibold">${event.ticketPrice}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div 
                          className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full"
                          style={{ width: `${(event.ticketsSold / event.ticketsTotal) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No events created yet</p>
                  <Button asChild className="mt-4" size="sm">
                    <Link to="/admin/events/new">Create First Event</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Button
                  key={action.title}
                  asChild
                  variant="outline"
                  className="h-auto p-4 hover:shadow-lg transition-shadow"
                >
                  <Link to={action.href} className="flex flex-col items-center">
                    <div className={`p-3 rounded-lg ${action.color} mb-3`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-medium text-center">{action.title}</span>
                    <span className="text-sm text-gray-500 text-center">{action.description}</span>
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
// import React from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import { useDashboardStats } from '@/hooks/useApi';
// import { Link } from 'react-router-dom';
// import { 
//   Calendar, 
//   Users, 
//   DollarSign, 
//   Ticket, 
//   TrendingUp, 
//   ArrowRight,
//   MapPin,
//   BarChart3,
//   Plus,
//   Building,
//   TicketCheck,
//   CalendarDays,
//   UserCheck,
//   HeadphonesIcon,
//   FileText,
//   CreditCard
// } from 'lucide-react';

// export const AdminDashboard: React.FC = () => {
//   const { stats, loading } = useDashboardStats();

//   const dashboardStats = [
//     {
//       title: 'Total Users',
//       value: stats?.totalUsers || 1234,
//       icon: Users,
//       color: 'from-blue-500 to-blue-600',
//       bgColor: 'bg-gray-800',
//       change: '+12%',
//       changeType: 'positive'
//     },
//     {
//       title: 'Total Venues',
//       value: 25,
//       icon: Building,
//       color: 'from-purple-500 to-purple-600',
//       bgColor: 'bg-gray-800',
//       change: '+3%',
//       changeType: 'positive'
//     },
//     {
//       title: 'Total Events',
//       value: stats?.totalEvents || 156,
//       icon: CalendarDays,
//       color: 'from-green-500 to-green-600',
//       bgColor: 'bg-gray-800',
//       change: '+8%',
//       changeType: 'positive'
//     },
//     {
//       title: 'Total Bookings',
//       value: stats?.totalBookings || 2847,
//       icon: Ticket,
//       color: 'from-orange-500 to-orange-600',
//       bgColor: 'bg-gray-800',
//       change: '+15%',
//       changeType: 'positive'
//     },
//     {
//       title: 'Total Revenue',
//       value: `$${(stats?.totalRevenue || 125430).toLocaleString()}`,
//       icon: DollarSign,
//       color: 'from-emerald-500 to-emerald-600',
//       bgColor: 'bg-gray-800',
//       change: '+22%',
//       changeType: 'positive'
//     },
//     {
//       title: 'Support Tickets',
//       value: 43,
//       icon: HeadphonesIcon,
//       color: 'from-red-500 to-red-600',
//       bgColor: 'bg-gray-800',
//       change: '-5%',
//       changeType: 'negative'
//     },
//   ];

//   const quickActions = [
//     {
//       title: 'Create Event',
//       description: 'Add a new event to the platform',
//       icon: Plus,
//       color: 'from-blue-500 to-blue-600',
//       link: '/admin/events/create'
//     },
//     {
//       title: 'Add Venue',
//       description: 'Register a new venue',
//       icon: Building,
//       color: 'from-purple-500 to-purple-600',
//       link: '/admin/venues/create'
//     },
//     {
//       title: 'Sales Report',
//       description: 'Generate sales analytics',
//       icon: FileText,
//       color: 'from-green-500 to-green-600',
//       link: '/admin/reports'
//     },
//     {
//       title: 'Payment Settings',
//       description: 'Configure Stripe integration',
//       icon: CreditCard,
//       color: 'from-orange-500 to-orange-600',
//       link: '/admin/payments'
//     },
//   ];

//   const recentActivities = [
//     {
//       type: 'booking',
//       message: 'New booking for Summer Music Festival',
//       time: '2 minutes ago',
//       user: 'John Doe',
//       amount: '$179.98'
//     },
//     {
//       type: 'event',
//       message: 'Tech Conference 2024 updated',
//       time: '15 minutes ago',
//       user: 'Admin',
//       amount: null
//     },
//     {
//       type: 'user',
//       message: 'New user registration',
//       time: '1 hour ago',
//       user: 'Sarah Johnson',
//       amount: null
//     },
//     {
//       type: 'support',
//       message: 'Support ticket resolved',
//       time: '2 hours ago',
//       user: 'Support Team',
//       amount: null
//     },
//   ];

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-900 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
//           <p className="text-gray-400">Loading admin dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-900">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
//           <p className="text-gray-400">Complete overview of your event management platform</p>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//           {dashboardStats.map((stat) => {
//             const Icon = stat.icon;
//             return (
//               <Card key={stat.title} className={`${stat.bgColor} border-gray-700 hover:shadow-xl transition-all duration-300`}>
//                 <CardContent className="p-6">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm font-medium text-gray-400">{stat.title}</p>
//                       <p className="text-2xl font-bold text-white mt-2">{stat.value}</p>
//                       <div className="flex items-center mt-2">
//                         <span className={`text-sm ${stat.changeType === 'positive' ? 'text-green-400' : 'text-red-400'}`}>
//                           {stat.change}
//                         </span>
//                         <span className="text-xs text-gray-500 ml-1">vs last month</span>
//                       </div>
//                     </div>
//                     <div className={`p-4 rounded-xl bg-gradient-to-r ${stat.color}`}>
//                       <Icon className="w-8 h-8 text-white" />
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </div>

//         {/* Charts and Quick Actions */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
//           {/* Revenue Chart */}
//           <Card className="lg:col-span-2 bg-gray-800 border-gray-700">
//             <CardHeader>
//               <CardTitle className="flex items-center text-white">
//                 <TrendingUp className="w-5 h-5 mr-2" />
//                 Revenue Analytics
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="h-64 flex items-center justify-center">
//                 <div className="text-center">
//                   <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
//                     <BarChart3 className="w-16 h-16 text-white" />
//                   </div>
//                   <p className="text-gray-400">Revenue chart visualization</p>
//                   <p className="text-sm text-gray-500 mt-2">Monthly revenue trends and projections</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Quick Actions */}
//           <Card className="bg-gray-800 border-gray-700">
//             <CardHeader>
//               <CardTitle className="text-white">Quick Actions</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               {quickActions.map((action) => {
//                 const Icon = action.icon;
//                 return (
//                   <Button
//                     key={action.title}
//                     asChild
//                     variant="ghost"
//                     className="w-full justify-start h-auto p-4 hover:bg-gray-700"
//                   >
//                     <Link to={action.link}>
//                       <div className="flex items-center space-x-3">
//                         <div className={`p-2 rounded-lg bg-gradient-to-r ${action.color}`}>
//                           <Icon className="w-4 h-4 text-white" />
//                         </div>
//                         <div className="text-left">
//                           <p className="text-sm font-medium text-white">{action.title}</p>
//                           <p className="text-xs text-gray-400">{action.description}</p>
//                         </div>
//                       </div>
//                     </Link>
//                   </Button>
//                 );
//               })}
//             </CardContent>
//           </Card>
//         </div>

//         {/* Event Distribution and Recent Activity */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
//           {/* Event Distribution */}
//           <Card className="bg-gray-800 border-gray-700">
//             <CardHeader>
//               <CardTitle className="flex items-center text-white">
//                 <BarChart3 className="w-5 h-5 mr-2" />
//                 Event Distribution
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="h-64 flex items-center justify-center">
//                 <div className="text-center">
//                   <div className="w-32 h-32 bg-gradient-to-r from-green-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
//                     <Calendar className="w-16 h-16 text-white" />
//                   </div>
//                   <p className="text-gray-400">Event category distribution</p>
//                   <p className="text-sm text-gray-500 mt-2">Music, Tech, Food, Sports breakdown</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Recent Activity */}
//           <Card className="bg-gray-800 border-gray-700">
//             <CardHeader>
//               <div className="flex items-center justify-between">
//                 <CardTitle className="flex items-center text-white">
//                   <UserCheck className="w-5 h-5 mr-2" />
//                   Recent Activity
//                 </CardTitle>
//                 <Button asChild variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
//                   <Link to="/admin/activity">
//                     View All
//                     <ArrowRight className="w-4 h-4 ml-2" />
//                   </Link>
//                 </Button>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {recentActivities.map((activity, index) => (
//                   <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition-colors">
//                     <div className={`p-2 rounded-full ${
//                       activity.type === 'booking' ? 'bg-green-600' :
//                       activity.type === 'event' ? 'bg-blue-600' :
//                       activity.type === 'user' ? 'bg-purple-600' :
//                       'bg-orange-600'
//                     }`}>
//                       {activity.type === 'booking' && <Ticket className="w-4 h-4 text-white" />}
//                       {activity.type === 'event' && <Calendar className="w-4 h-4 text-white" />}
//                       {activity.type === 'user' && <Users className="w-4 h-4 text-white" />}
//                       {activity.type === 'support' && <HeadphonesIcon className="w-4 h-4 text-white" />}
//                     </div>
//                     <div className="flex-1">
//                       <p className="text-sm text-white">{activity.message}</p>
//                       <div className="flex items-center justify-between">
//                         <p className="text-xs text-gray-400">{activity.user}</p>
//                         <div className="flex items-center space-x-2">
//                           {activity.amount && (
//                             <span className="text-xs font-medium text-green-400">{activity.amount}</span>
//                           )}
//                           <span className="text-xs text-gray-500">{activity.time}</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Management Links */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           <Card className="bg-gray-800 border-gray-700 hover:shadow-xl transition-all duration-300">
//             <CardContent className="p-6 text-center">
//               <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl mb-4">
//                 <Calendar className="w-8 h-8 text-white" />
//               </div>
//               <h3 className="text-lg font-bold text-white mb-2">Manage Events</h3>
//               <p className="text-gray-400 text-sm mb-4">Create, edit, and manage all events</p>
//               <Button asChild className="w-full">
//                 <Link to="/admin/events">
//                   View Events
//                   <ArrowRight className="w-4 h-4 ml-2" />
//                 </Link>
//               </Button>
//             </CardContent>
//           </Card>

//           <Card className="bg-gray-800 border-gray-700 hover:shadow-xl transition-all duration-300">
//             <CardContent className="p-6 text-center">
//               <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl mb-4">
//                 <Building className="w-8 h-8 text-white" />
//               </div>
//               <h3 className="text-lg font-bold text-white mb-2">Manage Venues</h3>
//               <p className="text-gray-400 text-sm mb-4">Add and manage event venues</p>
//               <Button asChild className="w-full">
//                 <Link to="/admin/venues">
//                   View Venues
//                   <ArrowRight className="w-4 h-4 ml-2" />
//                 </Link>
//               </Button>
//             </CardContent>
//           </Card>

//           <Card className="bg-gray-800 border-gray-700 hover:shadow-xl transition-all duration-300">
//             <CardContent className="p-6 text-center">
//               <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl mb-4">
//                 <Users className="w-8 h-8 text-white" />
//               </div>
//               <h3 className="text-lg font-bold text-white mb-2">Manage Users</h3>
//               <p className="text-gray-400 text-sm mb-4">View and manage user accounts</p>
//               <Button asChild className="w-full">
//                 <Link to="/admin/users">
//                   View Users
//                   <ArrowRight className="w-4 h-4 ml-2" />
//                 </Link>
//               </Button>
//             </CardContent>
//           </Card>

//           <Card className="bg-gray-800 border-gray-700 hover:shadow-xl transition-all duration-300">
//             <CardContent className="p-6 text-center">
//               <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl mb-4">
//                 <HeadphonesIcon className="w-8 h-8 text-white" />
//               </div>
//               <h3 className="text-lg font-bold text-white mb-2">Support Tickets</h3>
//               <p className="text-gray-400 text-sm mb-4">Manage customer support</p>
//               <Button asChild className="w-full">
//                 <Link to="/admin/support">
//                   View Tickets
//                   <ArrowRight className="w-4 h-4 ml-2" />
//                 </Link>
//               </Button>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };
 