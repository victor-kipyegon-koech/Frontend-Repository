 
 import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Event } from '@/types';
import { Calendar, Clock, MapPin, Users, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface EventCardProps {
  event: Event;
  onBook?: (eventId: number) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onBook }) => {
  const { isAuthenticated } = useAuth();
  
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

  const availableTickets = event.ticketsTotal - event.ticketsSold;
  const soldPercentage = (event.ticketsSold / event.ticketsTotal) * 100;

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold text-gray-900 line-clamp-2">
            {event.title}
          </CardTitle>
          {event.category && (
            <Badge variant="secondary" className="ml-2">
              {event.category}
            </Badge>
          )}
        </div>
        <p className="text-gray-600 text-sm line-clamp-2">
          {event.description}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{formatDate(event.date)}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            <span>{formatTime(event.time)}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{event.venue?.name || 'TBD'}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-600">
              <Users className="w-4 h-4 mr-2" />
              <span>{availableTickets} available</span>
            </div>
            <div className="flex items-center text-lg font-bold text-gray-900">
              <DollarSign className="w-4 h-4 mr-1" />
              <span>{event.ticketPrice}</span>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${soldPercentage}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 text-center">
            {event.ticketsSold} of {event.ticketsTotal} tickets sold
          </p>
        </div>

        <div className="flex space-x-2">
          <Button asChild variant="outline" className="flex-1">
            <Link to={`/events/${event.eventId}`}>View Details</Link>
          </Button>
          
          {availableTickets > 0 && (
            <Button 
              onClick={() => onBook && onBook(event.eventId)}
              className="flex-1"
              disabled={availableTickets === 0}
            >
              {isAuthenticated ? 'Book Now' : 'Sign In to Book'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};