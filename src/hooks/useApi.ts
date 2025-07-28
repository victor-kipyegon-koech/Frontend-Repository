 
import { useState, useEffect } from 'react';
import { Event, Venue, Booking, DashboardStats } from '../types';

const API_BASE = 'http://localhost:5000';

// ----------------------------- EVENTS -----------------------------
export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/events`);
        if (!res.ok) throw new Error('Failed to fetch events');
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load events');
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const createEvent = async (
    eventData: Omit<Event, 'eventId' | 'createdAt' | 'updatedAt' | 'ticketsSold'>
  ) => {
    const res = await fetch(`${API_BASE}/api/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData),
    });
    if (!res.ok) throw new Error('Failed to create event');
    const newEvent = await res.json();
    setEvents((prev) => [...prev, newEvent]);
    return newEvent;
  };

  const updateEvent = async (eventId: number, eventData: Partial<Event>) => {
    const res = await fetch(`${API_BASE}/api/events/${eventId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData),
    });
    if (!res.ok) throw new Error('Failed to update event');
    setEvents((prev) =>
      prev.map((event) =>
        event.eventId === eventId ? { ...event, ...eventData } : event
      )
    );
  };

  const deleteEvent = async (eventId: number) => {
    const res = await fetch(`${API_BASE}/api/events/${eventId}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete event');
    setEvents((prev) => prev.filter((event) => event.eventId !== eventId));
  };

  return {
    events,
    loading,
    error,
    createEvent,
    updateEvent,
    deleteEvent,
  };
};

// ----------------------------- VENUES -----------------------------
export const useVenues = () => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/venues`);
        if (!res.ok) throw new Error('Failed to fetch venues');
        const data = await res.json();
        setVenues(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load venues');
      } finally {
        setLoading(false);
      }
    };
    fetchVenues();
  }, []);

  const createVenue = async (
    venueData: Omit<Venue, 'venueId' | 'createdAt'>
  ) => {
    const res = await fetch(`${API_BASE}/api/venues`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(venueData),
    });
    if (!res.ok) throw new Error('Failed to create venue');
    const newVenue = await res.json();
    setVenues((prev) => [...prev, newVenue]);
    return newVenue;
  };

  const updateVenue = async (venueId: number, venueData: Partial<Venue>) => {
    const res = await fetch(`${API_BASE}/api/venues/${venueId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(venueData),
    });
    if (!res.ok) throw new Error('Failed to update venue');
    setVenues((prev) =>
      prev.map((venue) =>
        venue.venueId === venueId ? { ...venue, ...venueData } : venue
      )
    );
  };

  const deleteVenue = async (venueId: number) => {
    const res = await fetch(`${API_BASE}/api/venues/${venueId}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete venue');
    setVenues((prev) => prev.filter((venue) => venue.venueId !== venueId));
  };

  return {
    venues,
    loading,
    error,
    createVenue,
    updateVenue,
    deleteVenue,
  };
};

// ----------------------------- BOOKINGS -----------------------------
export const useBookings = (userId?: number, status?: string) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const params = new URLSearchParams();
        if (userId) params.append('userId', userId.toString());
        if (status && status !== 'all') params.append('status', status);

        const query = params.toString() ? `?${params.toString()}` : '';
        const res = await fetch(`${API_BASE}/api/bookings${query}`);
        if (!res.ok) throw new Error('Failed to fetch bookings');
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        console.error('Failed to load bookings:', err);
        setError('Failed to load bookings');
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userId, status]);

  const createBooking = async (
    bookingData: Omit<Booking, 'bookingId' | 'createdAt' | 'updatedAt'>
  ) => {
    const res = await fetch(`${API_BASE}/api/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData),
    });
    if (!res.ok) throw new Error('Booking failed');
    const newBooking = await res.json();
    setBookings((prev) => [...prev, newBooking]);
    return newBooking;
  };

  const updateBookingStatus = async (
    bookingId: number,
    status: Booking['status']
  ) => {
    const res = await fetch(`${API_BASE}/api/bookings/${bookingId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error('Failed to update booking status');
    setBookings((prev) =>
      prev.map((booking) =>
        booking.bookingId === bookingId ? { ...booking, status } : booking
      )
    );
  };

  return {
    bookings,
    loading,
    error,
    createBooking,
    updateBookingStatus,
  };
};

// ----------------------------- DASHBOARD STATS -----------------------------
export const useDashboardStats = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/dashboard-stats`);
        if (!res.ok) throw new Error('Failed to fetch stats');
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error('Dashboard stats fetch failed:', err);
        setError('Failed to load dashboard stats');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return { stats, loading, error };
};


 