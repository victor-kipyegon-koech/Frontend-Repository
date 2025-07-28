// services/supportTickets.ts

export type SupportTicket = {
  ticketId: number;
  subject: string;
  message: string;
  status: 'pending' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
};

const API_BASE = 'http://localhost:5000/api/support-tickets';

// ✅ Fetch all support tickets
export const fetchSupportTickets = async (): Promise<SupportTicket[]> => {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error('Failed to fetch tickets');
  return await res.json();
};

// ✅ Create a new support ticket
export const createSupportTicket = async (ticket: {
  subject: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  userId: number;
}): Promise<{ message: string }> => {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ticket),
  });

  if (!res.ok) throw new Error('Failed to create ticket');
  return await res.json();
};

// ✅ Update the status of a support ticket
export const updateSupportTicketStatus = async (
  ticketId: number,
  status: 'pending' | 'in_progress' | 'resolved' | 'closed'
): Promise<{ message: string }> => {
  const res = await fetch(`${API_BASE}/${ticketId}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) throw new Error('Failed to update ticket status');
  return await res.json();
};

// ✅ Send a reply to a support ticket
export const replyToSupportTicket = async (
  ticketId: number,
  message: string
): Promise<{ message: string }> => {
  const res = await fetch(`${API_BASE}/${ticketId}/reply`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });

  if (!res.ok) throw new Error('Failed to send reply');
  return await res.json();
};
