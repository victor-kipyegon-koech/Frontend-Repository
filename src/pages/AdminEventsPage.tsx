 

  import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useEvents } from '@/hooks/useApi';
import {
  Plus, Search, Calendar, MapPin, Users, DollarSign, Edit, Trash2, Eye,
} from 'lucide-react';
import { Event } from '@/types';
import { toast } from 'sonner';
import { EventModal } from '../components/EventModal';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export const AdminEventsPage: React.FC = () => {
  const { events, loading, createEvent, updateEvent, deleteEvent } = useEvents();
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | undefined>();
  const [readOnly, setReadOnly] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<Event | null>(null);

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    setSelectedEvent(undefined);
    setReadOnly(false);
    setModalOpen(true);
  };

  const handleEdit = (event: Event) => {
    setSelectedEvent(event);
    setReadOnly(false);
    setModalOpen(true);
  };

  const handleView = (event: Event) => {
    setSelectedEvent(event);
    setReadOnly(true);
    setModalOpen(true);
  };

  const handleSubmit = async (data: Partial<Event>) => {
    try {
      if (selectedEvent) {
        await updateEvent(selectedEvent.eventId, data);
        toast.success('Event updated');
      } else {
        await createEvent(data as any);
        toast.success('Event created');
      }
      setModalOpen(false);
    } catch (err) {
      toast.error('Failed to save event');
    }
  };

  const openDeleteDialog = (event: Event) => {
    setEventToDelete(event);
    setConfirmDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!eventToDelete) return;
    try {
      await deleteEvent(eventToDelete.eventId);
      toast.success('Event deleted');
      setConfirmDeleteOpen(false);
      setEventToDelete(null);
    } catch {
      toast.error('Failed to delete event');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🎟️ Manage Events</h1>
        <Button onClick={handleAdd} className="bg-purple-600 hover:bg-purple-700">
          <Plus className="w-4 h-4 mr-2" /> Add Event
        </Button>
      </div>

      <div className="flex mb-6">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-800 border-gray-700 text-white"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center text-gray-400">⏳ Loading events...</div>
      ) : filteredEvents.length === 0 ? (
        <div className="text-center text-gray-400">No events found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Card key={event.eventId} className="bg-gray-800 border border-gray-700">
              <CardHeader>
                <div className="flex justify-between">
                  <CardTitle className="text-white text-lg">{event.title}</CardTitle>
                  <Badge variant="outline" className="text-blue-400 border-blue-400">{event.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-gray-300 space-y-2">
                <div className="line-clamp-2">{event.description}</div>
                <div className="flex items-center"><Calendar className="w-4 h-4 mr-2" /> {new Date(event.date).toLocaleDateString()}</div>
                <div className="flex items-center"><MapPin className="w-4 h-4 mr-2" /> {event.venue?.name || `Venue ID: ${event.venueId}`}</div>
                <div className="flex items-center"><Users className="w-4 h-4 mr-2" /> {event.ticketsSold}/{event.ticketsTotal} Sold</div>
                <div className="flex items-center"><DollarSign className="w-4 h-4 mr-2" /> ${event.ticketPrice}</div>
                <div className="flex justify-between gap-2 pt-2">
                  <Button onClick={() => handleView(event)} variant="outline" className="text-gray-300 flex-1">
                    <Eye className="w-4 h-4 mr-1" /> View
                  </Button>
                  <Button onClick={() => handleEdit(event)} variant="outline" className="text-gray-300 flex-1">
                    <Edit className="w-4 h-4 mr-1" /> Edit
                  </Button>
                  <Button onClick={() => openDeleteDialog(event)} variant="outline" className="text-red-500 border-red-500 hover:bg-red-600 hover:text-white">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Event Modal for Add/Edit/View */}
      <EventModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={selectedEvent}
        readOnly={readOnly}
      />

      {/* Confirm Delete Dialog */}
      <Dialog open={confirmDeleteOpen} onOpenChange={setConfirmDeleteOpen}>
        <DialogContent className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Are you sure you want to delete <strong>{eventToDelete?.title}</strong>?
          </p>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setConfirmDeleteOpen(false)}>Cancel</Button>
            <Button className="bg-red-600 text-white hover:bg-red-700" onClick={confirmDelete}>Delete</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminEventsPage;
