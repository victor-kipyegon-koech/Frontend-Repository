 
//   import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useEvents, useBookings } from '@/hooks/useApi';
// import { useAuth } from '@/context/AuthContext';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
// import { toast } from 'sonner';
// import { Loader2 } from 'lucide-react';
// import { EventCard } from '@/components/events/EventCard';
// import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';

// export const EventsPage: React.FC = () => {
//   const { events, loading } = useEvents();
//   const { createBooking } = useBookings();
//   const { isAuthenticated, user } = useAuth();
//   const navigate = useNavigate();

//   const [bookingEvent, setBookingEvent] = useState<number | null>(null);
//   const [quantity, setQuantity] = useState(1);
//   const [isBooking, setIsBooking] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [selectedDate, setSelectedDate] = useState('');

//   const handleBookEvent = (eventId: number) => {
//     if (!isAuthenticated) {
//       navigate('/login');
//       return;
//     }
//     setBookingEvent(eventId);
//     setQuantity(1);
//   };

//   const handleBookingSubmit = async () => {
//     const selectedEvent = events.find((e) => e.eventId === bookingEvent);
//     if (!bookingEvent || !selectedEvent || !user?.userId) return;

//     setIsBooking(true);
//     try {
//       await createBooking({
//         userId: user.userId,
//         eventId: selectedEvent.eventId,
//         quantity,
//         totalAmount: (Number(selectedEvent.ticketPrice) * quantity).toFixed(2),
//         status: 'confirmed',
//       });

//       toast.success('Booking successful! Redirecting to My Bookings...');
//       setBookingEvent(null);
//       setTimeout(() => navigate('/my-bookings'), 1000);
//     } catch (error) {
//       toast.error('Booking failed. Please try again.');
//     } finally {
//       setIsBooking(false);
//     }
//   };

//   const selectedEvent = events.find((e) => e.eventId === bookingEvent);

//   const filteredEvents = events.filter((event) => {
//     const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
//     const matchesDate = selectedDate ? event.date === selectedDate : true;
//     return matchesSearch && matchesCategory && matchesDate;
//   });

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <Loader2 className="w-8 h-8 animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-10">
//       {/* Hero */}
//       <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 lg:p-8 text-white text-center mb-8">
//         <h1 className="text-3xl lg:text-4xl font-bold mb-3">Discover Amazing Events</h1>
//         <p className="text-purple-100 mb-4">Find and book tickets for exciting events in your area</p>
//         {!isAuthenticated && (
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Button asChild className="bg-white text-purple-700">
//               <Link to="/register">Sign Up</Link>
//             </Button>
//             <Button asChild variant="outline" className="border-white text-white hover:text-purple-700 hover:bg-white">
//               <Link to="/login">Login</Link>
//             </Button>
//           </div>
//         )}
//       </div>

//       {/* Filters */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//         <Input
//           placeholder="Search events..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <Select value={selectedCategory} onValueChange={setSelectedCategory}>
//           <SelectTrigger>
//             <SelectValue placeholder="Select category" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All Categories</SelectItem>
//             <SelectItem value="comedy">Comedy</SelectItem>
//             <SelectItem value="music">Music</SelectItem>
//             <SelectItem value="sports">Sports</SelectItem>
//             <SelectItem value="traditional songs">Traditional Songs</SelectItem>
//           </SelectContent>
//         </Select>
//         <Input
//           type="date"
//           value={selectedDate}
//           onChange={(e) => setSelectedDate(e.target.value)}
//           className="md:w-full"
//         />
//       </div>

//       {/* Event Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredEvents.map((event) => (
//           <EventCard key={event.eventId} event={event} onBook={() => handleBookEvent(event.eventId)} />
//         ))}
//         {filteredEvents.length === 0 && (
//           <p className="col-span-full text-center text-gray-500">No events found</p>
//         )}
//       </div>

//       {/* Booking Modal */}
//       <Dialog open={!!bookingEvent} onOpenChange={() => setBookingEvent(null)}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Book Event</DialogTitle>
//           </DialogHeader>

//           {selectedEvent && (
//             <div className="space-y-4">
//               <div>
//                 <h3 className="font-semibold">{selectedEvent.title}</h3>
//                 <p className="text-sm text-gray-600">{selectedEvent.description}</p>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="quantity">Number of Tickets</Label>
//                 <Input
//                   id="quantity"
//                   type="number"
//                   min="1"
//                   max="10"
//                   value={quantity}
//                   onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
//                 />
//               </div>

//               <div className="bg-gray-100 rounded-lg p-4">
//                 <div className="flex justify-between">
//                   <span>Price per ticket:</span>
//                   <span>${selectedEvent.ticketPrice}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Quantity:</span>
//                   <span>{quantity}</span>
//                 </div>
//                 <div className="flex justify-between font-bold border-t pt-2 mt-2">
//                   <span>Total:</span>
//                   <span>${(Number(selectedEvent.ticketPrice) * quantity).toFixed(2)}</span>
//                 </div>
//               </div>

//               <div className="flex gap-4">
//                 <Button variant="outline" onClick={() => setBookingEvent(null)} className="w-1/2">Cancel</Button>
//                 <Button onClick={handleBookingSubmit} disabled={isBooking} className="w-1/2">
//                   {isBooking ? (
//                     <>
//                       <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                       Processing...
//                     </>
//                   ) : 'Confirm Booking'}
//                 </Button>
//               </div>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };
 import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useEvents, useBookings } from '@/hooks/useApi';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { EventCard } from '@/components/events/EventCard';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';

export const EventsPage: React.FC = () => {
  const { events, loading } = useEvents();
  const { createBooking } = useBookings();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const [bookingEvent, setBookingEvent] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isBooking, setIsBooking] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');

  const handleBookEvent = (eventId: number) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setBookingEvent(eventId);
    setQuantity(1);
  };

  const handleBookingSubmit = async () => {
    const selectedEvent = events.find((e) => e.eventId === bookingEvent);
    if (!bookingEvent || !selectedEvent || !user?.userId) return;

    setIsBooking(true);
    try {
      await createBooking({
        userId: user.userId,
        eventId: selectedEvent.eventId,
        quantity,
        totalAmount: (Number(selectedEvent.ticketPrice) * quantity).toFixed(2),
        status: 'confirmed',
      });

      toast.success('Booking successful! Redirecting to My Bookings...');
      setBookingEvent(null);
      setTimeout(() => navigate('/my-bookings'), 1000);
    } catch (error) {
      toast.error('Booking failed. Please try again.');
    } finally {
      setIsBooking(false);
    }
  };

  const selectedEvent = events.find((e) => e.eventId === bookingEvent);

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    const matchesDate = selectedDate ? event.date === selectedDate : true;
    return matchesSearch && matchesCategory && matchesDate;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 lg:p-8 text-white text-center mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold mb-3">Discover Amazing Events</h1>
        <p className="text-purple-100 mb-4">Find and book tickets for exciting events in your area</p>
        {!isAuthenticated && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-white text-purple-700">
              <Link to="/register">Sign Up</Link>
            </Button>
            <Button asChild variant="outline" className="border-white text-white hover:text-purple-700 hover:bg-white">
              <Link to="/login">Login</Link>
            </Button>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Input
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="comedy">Comedy</SelectItem>
            <SelectItem value="music">Music</SelectItem>
            <SelectItem value="sports">Sports</SelectItem>
            <SelectItem value="traditional songs">Traditional Songs</SelectItem>
          </SelectContent>
        </Select>
        <Input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="md:w-full"
        />
      </div>

      {/* Event Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <EventCard key={event.eventId} event={event} onBook={() => handleBookEvent(event.eventId)} />
        ))}
        {filteredEvents.length === 0 && (
          <p className="col-span-full text-center text-gray-500">No events found</p>
        )}
      </div>

      {/* Booking Modal */}
      <Dialog open={!!bookingEvent} onOpenChange={() => setBookingEvent(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book Event</DialogTitle>
            <DialogDescription>
              Select the number of tickets and confirm your booking below.
            </DialogDescription>
          </DialogHeader>

          {selectedEvent && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">{selectedEvent.title}</h3>
                <p className="text-sm text-gray-600">{selectedEvent.description}</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Number of Tickets</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  max="10"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                />
              </div>

              <div className="bg-gray-100 rounded-lg p-4">
                <div className="flex justify-between">
                  <span>Price per ticket:</span>
                  <span>${selectedEvent.ticketPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Quantity:</span>
                  <span>{quantity}</span>
                </div>
                <div className="flex justify-between font-bold border-t pt-2 mt-2">
                  <span>Total:</span>
                  <span>${(Number(selectedEvent.ticketPrice) * quantity).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setBookingEvent(null)} className="w-1/2">
                  Cancel
                </Button>
                <Button onClick={handleBookingSubmit} disabled={isBooking} className="w-1/2">
                  {isBooking ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Confirm Booking'
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

