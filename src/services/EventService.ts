 
  const API_BASE = 'http://localhost:5000/api/events';

// Attach token if available
const getAuthHeader = (): Record<string, string> => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Event types
export interface EventInput {
  title: string;
  category: string;
  description: string;
  date: string;
  venueId: number;
  ticketPrice: number;
  ticketsTotal: number;
}

export interface Venue {
  venueId: number;
  name: string;
  address?: string;
}

export interface Event {
  eventId: number;
  title: string;
  category: string;
  description: string;
  date: string;
  time?: string | null;
  venueId: number;
  venue?: Venue;
  ticketsSold: number;
  ticketsTotal: number;
  ticketPrice: number;
}

// GET all events
export const getAllEvents = async (): Promise<Event[]> => {
  const res = await fetch(API_BASE, {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to fetch events: ${res.status} ${errorText}`);
  }
  return res.json();
};

// GET event by ID
export const getEventById = async (id: number): Promise<Event> => {
  const res = await fetch(`${API_BASE}/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to fetch event with ID ${id}: ${res.status} ${errorText}`);
  }
  return res.json();
};

// POST create event
export const createEvent = async (eventData: EventInput): Promise<Event> => {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: JSON.stringify(eventData),
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to create event: ${res.status} ${errorText}`);
  }
  return res.json();
};

// PUT update event
export const updateEvent = async (id: number, updatedData: Partial<EventInput>): Promise<Event> => {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: JSON.stringify(updatedData),
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to update event ${id}: ${res.status} ${errorText}`);
  }
  return res.json();
};

// DELETE event
export const deleteEvent = async (id: number): Promise<{ message: string }> => {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
    headers: {
      ...getAuthHeader(),
    },
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to delete event ${id}: ${res.status} ${errorText}`);
  }
  return res.json();
};
