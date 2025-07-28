 
import React, { useEffect, useState } from 'react';
import {
  Card, CardContent, CardHeader, CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import {
  Search, MessageSquare, Clock, CheckCircle, User, Calendar, Eye, MessageCircle,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext'; // ✅ make sure this is your actual path

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

export const AdminSupportPage: React.FC = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth(); // ✅ use dynamic user context

  const [newTicket, setNewTicket] = useState({
    subject: '',
    message: '',
    status: 'pending',
    priority: 'medium',
  });

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/supports');
        if (!response.ok) throw new Error('Failed to fetch');
        const data: SupportTicket[] = await response.json();
        setTickets(data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };
    fetchTickets();
  }, []);

  const updateTicketStatus = async (ticketId: number, newStatus: SupportTicket['status']) => {
    try {
      await fetch(`http://localhost:5000/api/supports/${ticketId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      setTickets(prev =>
        prev.map(t => t.ticketId === ticketId ? { ...t, status: newStatus } : t)
      );
      toast({ title: `Ticket marked as ${newStatus.replace('_', ' ')}` });
    } catch (error) {
      toast({ title: 'Failed to update ticket', variant: 'destructive' });
    }
  };

  const sendReply = async () => {
    if (!selectedTicket) return;
    try {
      await fetch(`http://localhost:5000/api/supports/${selectedTicket.ticketId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: replyMessage }),
      });
      toast({ title: 'Reply sent successfully' });
      setReplyMessage('');
      setIsReplyOpen(false);
    } catch (error) {
      toast({ title: 'Failed to send reply', variant: 'destructive' });
    }
  };

  const createTicket = async () => {
    if (!user?.userId) {
      toast({ title: "You must be logged in to submit a ticket", variant: "destructive" });
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/supports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newTicket, userId: user.userId }),
      });
      if (!res.ok) throw new Error("Failed to add ticket");
      toast({ title: "Ticket created successfully" });
      setIsCreateOpen(false);
      setNewTicket({
        subject: '',
        message: '',
        status: 'pending',
        priority: 'medium',
      });
    } catch {
      toast({ title: "Error creating ticket", variant: "destructive" });
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-400 border-yellow-400';
      case 'in_progress': return 'text-blue-400 border-blue-400';
      case 'resolved': return 'text-green-400 border-green-400';
      case 'closed': return 'text-gray-400 border-gray-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 border-red-400';
      case 'medium': return 'text-orange-400 border-orange-400';
      case 'low': return 'text-green-400 border-green-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const pendingTickets = tickets.filter(t => t.status === 'pending').length;
  const inProgressTickets = tickets.filter(t => t.status === 'in_progress').length;
  const resolvedTickets = tickets.filter(t => t.status === 'resolved').length;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Support Ticket Management</h1>
        <p className="text-gray-400 mb-4">Manage customer support tickets and inquiries</p>

        <Button onClick={() => setIsCreateOpen(true)} className="mb-6 bg-green-600 hover:bg-green-700">
          Create New Ticket
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800"><CardContent className="p-6 text-center"><div className="text-2xl">{tickets.length}</div><div className="text-sm text-gray-400">Total Tickets</div></CardContent></Card>
          <Card className="bg-gray-800"><CardContent className="p-6 text-center"><div className="text-2xl text-yellow-400">{pendingTickets}</div><div className="text-sm text-gray-400">Pending</div></CardContent></Card>
          <Card className="bg-gray-800"><CardContent className="p-6 text-center"><div className="text-2xl text-blue-400">{inProgressTickets}</div><div className="text-sm text-gray-400">In Progress</div></CardContent></Card>
          <Card className="bg-gray-800"><CardContent className="p-6 text-center"><div className="text-2xl text-green-400">{resolvedTickets}</div><div className="text-sm text-gray-400">Resolved</div></CardContent></Card>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search tickets..."
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
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          {filteredTickets.map(ticket => (
            <Card key={ticket.ticketId} className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <CardTitle className="text-white text-lg">#{ticket.ticketId} - {ticket.subject}</CardTitle>
                      <Badge variant="outline" className={getStatusColor(ticket.status)}>{ticket.status.replace('_', ' ')}</Badge>
                      <Badge variant="outline" className={getPriorityColor(ticket.priority)}>{ticket.priority} priority</Badge>
                    </div>
                    <p className="text-gray-400 text-sm">{ticket.message}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center text-sm text-gray-400"><User className="w-4 h-4 mr-2" />{ticket.user.firstName} {ticket.user.lastName}</div>
                  <div className="flex items-center text-sm text-gray-400"><MessageSquare className="w-4 h-4 mr-2" />{ticket.user.email}</div>
                  <div className="flex items-center text-sm text-gray-400"><Calendar className="w-4 h-4 mr-2" />Created: {new Date(ticket.createdAt).toLocaleDateString()}</div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700" onClick={() => { setSelectedTicket(ticket); setIsReplyOpen(true); }}>
                    <MessageCircle className="w-4 h-4 mr-1" /> Reply
                  </Button>
                  {ticket.status === 'pending' && (
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={() => updateTicketStatus(ticket.ticketId, 'in_progress')}>
                      <Clock className="w-4 h-4 mr-1" /> Start Progress
                    </Button>
                  )}
                  {ticket.status === 'in_progress' && (
                    <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => updateTicketStatus(ticket.ticketId, 'resolved')}>
                      <CheckCircle className="w-4 h-4 mr-1" /> Mark Resolved
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Reply Dialog */}
      <Dialog open={isReplyOpen} onOpenChange={setIsReplyOpen}>
        <DialogContent className="bg-gray-800 border border-gray-700">
          <DialogHeader><DialogTitle className="text-white">Reply to Ticket #{selectedTicket?.ticketId}</DialogTitle></DialogHeader>
          <Textarea value={replyMessage} onChange={(e) => setReplyMessage(e.target.value)} className="bg-gray-900 text-white border-gray-700" placeholder="Type your reply here..." rows={6} />
          <DialogFooter><Button onClick={sendReply} className="bg-blue-600 hover:bg-blue-700">Send Reply</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Ticket Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="bg-gray-800 border border-gray-700">
          <DialogHeader><DialogTitle className="text-white">Create New Ticket</DialogTitle></DialogHeader>
          <Input placeholder="Subject" className="bg-gray-900 text-white border-gray-700 mb-2" value={newTicket.subject} onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })} />
          <Textarea placeholder="Message" className="bg-gray-900 text-white border-gray-700 mb-2" rows={6} value={newTicket.message} onChange={(e) => setNewTicket({ ...newTicket, message: e.target.value })} />
          <Select value={newTicket.priority} onValueChange={(val) => setNewTicket({ ...newTicket, priority: val as 'low' | 'medium' | 'high' })}>
            <SelectTrigger className="bg-gray-900 text-white border-gray-700 mb-2">
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
          <DialogFooter><Button onClick={createTicket} className="bg-blue-600 hover:bg-blue-700">Submit Ticket</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
