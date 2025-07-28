 
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Booking } from '@/types';
import { Calendar, Clock, MapPin, Users, DollarSign, Download } from 'lucide-react';

interface BookingCardProps {
  booking: Booking;
  onDownloadTicket?: (bookingId: number) => void;
  onCancelBooking?: (bookingId: number) => void;
}

export const BookingCard: React.FC<BookingCardProps> = ({ 
  booking, 
  onDownloadTicket, 
  onCancelBooking 
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'canceled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold text-gray-900">
            {booking.event?.title || 'Event'}
          </CardTitle>
          <Badge className={getStatusColor(booking.status)}>
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </Badge>
        </div>
        <p className="text-sm text-gray-600">
          Booking #{booking.bookingId}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{booking.event?.date ? formatDate(booking.event.date) : 'TBD'}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-2" />
              <span>{booking.event?.time ? formatTime(booking.event.time) : 'TBD'}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{booking.event?.venue?.name || 'TBD'}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <Users className="w-4 h-4 mr-2" />
              <span>{booking.quantity} ticket{booking.quantity !== 1 ? 's' : ''}</span>
            </div>
            
            <div className="flex items-center text-lg font-bold text-gray-900">
              <DollarSign className="w-4 h-4 mr-1" />
              <span>{booking.totalAmount}</span>
            </div>
          </div>
        </div>

        <div className="text-xs text-gray-500 border-t pt-3">
          <p>Booked on: {new Date(booking.createdAt).toLocaleDateString()}</p>
          <p>Last updated: {new Date(booking.updatedAt).toLocaleDateString()}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          {booking.status === 'confirmed' && onDownloadTicket && (
            <Button 
              onClick={() => onDownloadTicket(booking.bookingId)}
              variant="outline"
              className="flex-1"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Ticket
            </Button>
          )}
          
          {booking.status === 'pending' && onCancelBooking && (
            <Button 
              onClick={() => onCancelBooking(booking.bookingId)}
              variant="destructive"
              className="flex-1"
            >
              Cancel Booking
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};