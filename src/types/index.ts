// Database types based on my schema
export type UserType = "member" | "admin" | "disabled";
export type BookingStatus = "pending" | "confirmed" | "canceled" | "completed";
export type PaymentStatus = "pending" | "failed" | "canceled" | "completed";
export type TicketStatus = "pending" | "in_progress" | "resolved" | "closed";

export interface User {
  userId: number;
  firstName?: string;
  lastName?: string;
  email: string;
  contactPhone?: string;
  address?: string;
  userType: UserType;
  createdAt: Date;
  updatedAt: Date;
   avatarUrl?: string;
}

export interface Venue {
  venueId: number;
  name: string;
  address?: string;
  capacity: number;
  createdAt: Date;
}

export interface Event {
  eventId: number;
  title: string;
  description?: string;
  venueId: number;
   address: string;
  venue?: Venue;
  category: string;
  date: string;
  time: string;
  ticketPrice: number;
  ticketsTotal: number;
  ticketsSold: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Booking {
  bookingId: number;
  userId: number;
  eventId: number;
  event?: Event;
  user?: User;
  quantity: number;
  totalAmount: string;
  status: BookingStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Payment {
  paymentId: number;
  bookingId: number;
  amount: string;
  paymentStatus: PaymentStatus;
  paymentDate: Date;
  paymentMethod?: string;
  transactionId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SupportTicket {
  ticketId: number;
  userId: number;
  user?: User;
  subject: string;
  message: string;
  status: TicketStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface DashboardStats {
  totalEvents: number;
  totalBookings: number;
  totalRevenue: number;
  totalUsers: number;
  recentBookings: Booking[];
  popularEvents: Event[];
}