 
//  import React, { useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Badge } from '@/components/ui/badge';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { useBookings } from '@/hooks/useApi';
// import {
//   Search,
//   Calendar,
//   Users,
//   DollarSign,
//   Ticket,
//   Eye,
//   Download,
// } from 'lucide-react';

// export const AdminBookingsPage: React.FC = () => {
//   const { bookings, loading } = useBookings();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
//   const [showModal, setShowModal] = useState(false);

//   const filteredBookings = bookings.filter((booking) => {
//     const matchesSearch =
//       booking.event?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       booking.user?.email.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
//     return matchesSearch && matchesStatus;
//   });

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'confirmed':
//         return 'text-green-400 border-green-400';
//       case 'pending':
//         return 'text-yellow-400 border-yellow-400';
//       case 'canceled':
//         return 'text-red-400 border-red-400';
//       case 'completed':
//         return 'text-blue-400 border-blue-400';
//       default:
//         return 'text-gray-400 border-gray-400';
//     }
//   };

//   const totalRevenue = bookings.reduce((sum, b) => sum + parseFloat(b.totalAmount), 0);
//   const confirmedBookings = bookings.filter((b) => b.status === 'confirmed').length;
//   const pendingBookings = bookings.filter((b) => b.status === 'pending').length;

//   const handleViewDetails = (booking: any) => {
//     setSelectedBooking(booking);
//     setShowModal(true);
//   };

//   // ✅ Fixed JSON Export
//   const handleExport = (booking: any) => {
//     const exportData = {
//       bookingId: booking.bookingId,
//       eventTitle: booking.event?.title ?? 'N/A',
//       user: {
//         name: `${booking.user?.firstName ?? ''} ${booking.user?.lastName ?? ''}`.trim(),
//         email: booking.user?.email ?? 'N/A',
//       },
//       status: booking.status,
//       quantity: booking.quantity,
//       totalAmount: booking.totalAmount,
//       createdAt: new Date(booking.createdAt).toISOString(),
//     };

//     const fileData = JSON.stringify(exportData, null, 2);
//     const blob = new Blob([fileData], { type: 'application/json' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = `booking-${booking.bookingId}.json`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <div className="min-h-screen bg-gray-900">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-white mb-2">View All Bookings</h1>
//           <p className="text-gray-400">Monitor and manage all event bookings</p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <Card className="bg-gray-800 border-gray-700">
//             <CardContent className="p-6 text-center">
//               <div className="text-2xl font-bold text-white">{bookings.length}</div>
//               <div className="text-sm text-gray-400">Total Bookings</div>
//             </CardContent>
//           </Card>
//           <Card className="bg-gray-800 border-gray-700">
//             <CardContent className="p-6 text-center">
//               <div className="text-2xl font-bold text-green-400">{confirmedBookings}</div>
//               <div className="text-sm text-gray-400">Confirmed</div>
//             </CardContent>
//           </Card>
//           <Card className="bg-gray-800 border-gray-700">
//             <CardContent className="p-6 text-center">
//               <div className="text-2xl font-bold text-yellow-400">{pendingBookings}</div>
//               <div className="text-sm text-gray-400">Pending</div>
//             </CardContent>
//           </Card>
//           <Card className="bg-gray-800 border-gray-700">
//             <CardContent className="p-6 text-center">
//               <div className="text-2xl font-bold text-white">${totalRevenue.toFixed(2)}</div>
//               <div className="text-sm text-gray-400">Total Revenue</div>
//             </CardContent>
//           </Card>
//         </div>

//         <div className="flex flex-col sm:flex-row gap-4 mb-6">
//           <div className="relative flex-1">
//             <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//             <Input
//               placeholder="Search bookings..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10 bg-gray-800 border-gray-700 text-white"
//             />
//           </div>
//           <Select value={statusFilter} onValueChange={setStatusFilter}>
//             <SelectTrigger className="w-full sm:w-[180px] bg-gray-800 border-gray-700 text-white">
//               <SelectValue placeholder="Filter by status" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All Statuses</SelectItem>
//               <SelectItem value="confirmed">Confirmed</SelectItem>
//               <SelectItem value="pending">Pending</SelectItem>
//               <SelectItem value="canceled">Canceled</SelectItem>
//               <SelectItem value="completed">Completed</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         {loading ? (
//           <div className="text-center py-12">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
//             <p className="text-gray-400">Loading bookings...</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {filteredBookings.map((booking) => (
//               <Card key={booking.bookingId} className="bg-gray-800 border-gray-700 hover:shadow-xl transition-all duration-300">
//                 <CardHeader>
//                   <div className="flex justify-between items-start">
//                     <CardTitle className="text-white text-lg">
//                       {booking.event?.title || 'Event'}
//                     </CardTitle>
//                     <Badge variant="outline" className={getStatusColor(booking.status)}>
//                       {booking.status}
//                     </Badge>
//                   </div>
//                   <p className="text-sm text-gray-400">Booking #{booking.bookingId}</p>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div className="space-y-2">
//                       <div className="flex items-center text-sm text-gray-400">
//                         <Users className="w-4 h-4 mr-2" />
//                         <span>
//                           {booking.user?.firstName} {booking.user?.lastName}
//                         </span>
//                       </div>
//                       <div className="flex items-center text-sm text-gray-400">
//                         <Calendar className="w-4 h-4 mr-2" />
//                         <span>{new Date(booking.createdAt).toLocaleDateString()}</span>
//                       </div>
//                     </div>
//                     <div className="space-y-2">
//                       <div className="flex items-center text-sm text-gray-400">
//                         <Ticket className="w-4 h-4 mr-2" />
//                         <span>{booking.quantity} ticket{booking.quantity !== 1 ? 's' : ''}</span>
//                       </div>
//                       <div className="flex items-center text-lg font-bold text-white">
//                         <DollarSign className="w-4 h-4 mr-1" />
//                         <span>${booking.totalAmount}</span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex space-x-2">
//                     <Button
//                       size="sm"
//                       variant="outline"
//                       className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
//                       onClick={() => handleViewDetails(booking)}
//                     >
//                       <Eye className="w-4 h-4 mr-1" />
//                       View Details
//                     </Button>
//                     <Button
//                       size="sm"
//                       variant="outline"
//                       className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
//                       onClick={() => handleExport(booking)}
//                     >
//                       <Download className="w-4 h-4 mr-1" />
//                       Export
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Booking Detail Modal */}
//       {showModal && selectedBooking && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
//             <h2 className="text-xl font-bold mb-4">Booking #{selectedBooking.bookingId}</h2>
//             <p><strong>Event:</strong> {selectedBooking.event?.title}</p>
//             <p><strong>User:</strong> {selectedBooking.user?.firstName} {selectedBooking.user?.lastName}</p>
//             <p><strong>Email:</strong> {selectedBooking.user?.email}</p>
//             <p><strong>Status:</strong> {selectedBooking.status}</p>
//             <p><strong>Tickets:</strong> {selectedBooking.quantity}</p>
//             <p><strong>Total:</strong> ${selectedBooking.totalAmount}</p>
//             <p><strong>Date:</strong> {new Date(selectedBooking.createdAt).toLocaleString()}</p>
//             <div className="mt-4 text-right">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="bg-blue-600 text-white px-4 py-2 rounded"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

import React, { useState } from 'react';
import {
  Card, CardContent, CardHeader, CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { useBookings } from '@/hooks/useApi';
import {
  Search, Calendar, Users, DollarSign, Ticket, Eye, Download,
} from 'lucide-react';

export const AdminBookingsPage: React.FC = () => {
  const { bookings, loading } = useBookings();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);

  const isArray = Array.isArray(bookings);
  const filteredBookings = isArray
    ? bookings.filter((booking) => {
        const matchesSearch =
          booking.event?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.user?.email?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
        return matchesSearch && matchesStatus;
      })
    : [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-400 border-green-400';
      case 'pending':
        return 'text-yellow-400 border-yellow-400';
      case 'canceled':
        return 'text-red-400 border-red-400';
      case 'completed':
        return 'text-blue-400 border-blue-400';
      default:
        return 'text-gray-400 border-gray-400';
    }
  };

  const totalRevenue = isArray
    ? bookings.reduce((sum, b) => sum + parseFloat(b.totalAmount), 0)
    : 0;

  const confirmedBookings = isArray
    ? bookings.filter((b) => b.status === 'confirmed').length
    : 0;

  const pendingBookings = isArray
    ? bookings.filter((b) => b.status === 'pending').length
    : 0;

  const handleViewDetails = (booking: any) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleExport = (booking: any) => {
    const exportData = {
      bookingId: booking.bookingId,
      eventTitle: booking.event?.title ?? 'N/A',
      user: {
        name: `${booking.user?.firstName ?? ''} ${booking.user?.lastName ?? ''}`.trim(),
        email: booking.user?.email ?? 'N/A',
      },
      status: booking.status,
      quantity: booking.quantity,
      totalAmount: booking.totalAmount,
      createdAt: new Date(booking.createdAt).toISOString(),
    };

    const fileData = JSON.stringify(exportData, null, 2);
    const blob = new Blob([fileData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `booking-${booking.bookingId}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">View All Bookings</h1>
          <p className="text-gray-400">Monitor and manage all event bookings</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-white">{isArray ? bookings.length : 0}</div>
              <div className="text-sm text-gray-400">Total Bookings</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-400">{confirmedBookings}</div>
              <div className="text-sm text-gray-400">Confirmed</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-yellow-400">{pendingBookings}</div>
              <div className="text-sm text-gray-400">Pending</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-white">${totalRevenue.toFixed(2)}</div>
              <div className="text-sm text-gray-400">Total Revenue</div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px] bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="canceled">Canceled</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading bookings...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredBookings.map((booking) => (
              <Card key={booking.bookingId} className="bg-gray-800 border-gray-700 hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-white text-lg">
                      {booking.event?.title || 'Event'}
                    </CardTitle>
                    <Badge variant="outline" className={getStatusColor(booking.status)}>
                      {booking.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-400">Booking #{booking.bookingId}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-400">
                        <Users className="w-4 h-4 mr-2" />
                        <span>{booking.user?.firstName} {booking.user?.lastName}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-400">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{new Date(booking.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-400">
                        <Ticket className="w-4 h-4 mr-2" />
                        <span>{booking.quantity} ticket{booking.quantity !== 1 ? 's' : ''}</span>
                      </div>
                      <div className="flex items-center text-lg font-bold text-white">
                        <DollarSign className="w-4 h-4 mr-1" />
                        <span>${booking.totalAmount}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700" onClick={() => handleViewDetails(booking)}>
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700" onClick={() => handleExport(booking)}>
                      <Download className="w-4 h-4 mr-1" />
                      Export
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Booking Detail Modal */}
      {showModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Booking #{selectedBooking.bookingId}</h2>
            <p><strong>Event:</strong> {selectedBooking.event?.title}</p>
            <p><strong>User:</strong> {selectedBooking.user?.firstName} {selectedBooking.user?.lastName}</p>
            <p><strong>Email:</strong> {selectedBooking.user?.email}</p>
            <p><strong>Status:</strong> {selectedBooking.status}</p>
            <p><strong>Tickets:</strong> {selectedBooking.quantity}</p>
            <p><strong>Total:</strong> ${selectedBooking.totalAmount}</p>
            <p><strong>Date:</strong> {new Date(selectedBooking.createdAt).toLocaleString()}</p>
            <div className="mt-4 text-right">
              <button onClick={() => setShowModal(false)} className="bg-blue-600 text-white px-4 py-2 rounded">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
