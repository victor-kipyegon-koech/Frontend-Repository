 
//  import React, { useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Badge } from '@/components/ui/badge';
// import { useVenues } from '@/hooks/useApi';
// import {
//   Plus, Search, MapPin, Users, Building, Edit, Trash2, Eye
// } from 'lucide-react';
// import { Venue } from '@/types';
// import { toast } from 'sonner';
// import { VenueModal } from '../components/VenueModal';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

// export const AdminVenuesPage: React.FC = () => {
//   const { venues, loading, createVenue, updateVenue, deleteVenue } = useVenues();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedVenue, setSelectedVenue] = useState<Venue | undefined>();
//   const [readOnly, setReadOnly] = useState(false);
//   const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
//   const [venueToDelete, setVenueToDelete] = useState<Venue | null>(null);

//   const filteredVenues = venues.filter(venue =>
//     venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     venue.address?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleAdd = () => {
//     setSelectedVenue(undefined);
//     setReadOnly(false);
//     setModalOpen(true);
//   };

//   const handleEdit = (venue: Venue) => {
//     setSelectedVenue(venue);
//     setReadOnly(false);
//     setModalOpen(true);
//   };

//   const handleView = (venue: Venue) => {
//     setSelectedVenue(venue);
//     setReadOnly(true);
//     setModalOpen(true);
//   };

//   const handleSubmit = async (data: Partial<Venue>) => {
//     try {
//       if (selectedVenue) {
//         await updateVenue(selectedVenue.venueId, data);
//         toast.success('Venue updated');
//       } else {
//         await createVenue(data as any);
//         toast.success('Venue created');
//       }
//       setModalOpen(false);
//     } catch (err) {
//       toast.error('Failed to save venue');
//     }
//   };

//   const openDeleteDialog = (venue: Venue) => {
//     setVenueToDelete(venue);
//     setConfirmDeleteOpen(true);
//   };

//   const confirmDelete = async () => {
//     if (!venueToDelete) return;
//     try {
//       await deleteVenue(venueToDelete.venueId);
//       toast.success('Venue deleted');
//       setConfirmDeleteOpen(false);
//       setVenueToDelete(null);
//     } catch {
//       toast.error('Failed to delete venue');
//     }
//   };

//   const getCapacityCategory = (capacity: number) => {
//     if (capacity < 500) return 'Small';
//     if (capacity < 2000) return 'Medium';
//     if (capacity < 10000) return 'Large';
//     return 'Stadium';
//   };

//   const getCapacityColor = (capacity: number) => {
//     if (capacity < 500) return 'text-green-400 border-green-400';
//     if (capacity < 2000) return 'text-blue-400 border-blue-400';
//     if (capacity < 10000) return 'text-purple-400 border-purple-400';
//     return 'text-red-400 border-red-400';
//   };

//   return (
//     <div className="min-h-screen bg-gray-900">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="flex justify-between items-center mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-white mb-2">Manage Venues</h1>
//             <p className="text-gray-400">Add and manage event venues</p>
//           </div>
//           <Button onClick={handleAdd} className="bg-purple-600 hover:bg-purple-700">
//             <Plus className="w-4 h-4 mr-2" />
//             Add Venue
//           </Button>
//         </div>

//         <div className="mb-6">
//           <div className="relative max-w-md">
//             <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//             <Input
//               placeholder="Search venues..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10 bg-gray-800 border-gray-700 text-white"
//             />
//           </div>
//         </div>

//         {loading ? (
//           <div className="text-center py-12">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto mb-4"></div>
//             <p className="text-gray-400">Loading venues...</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredVenues.map((venue) => (
//               <Card key={venue.venueId} className="bg-gray-800 border-gray-700 hover:shadow-xl transition-all duration-300">
//                 <CardHeader>
//                   <div className="flex justify-between items-start">
//                     <CardTitle className="text-white text-lg">{venue.name}</CardTitle>
//                     <Badge variant="outline" className={getCapacityColor(venue.capacity)}>
//                       {getCapacityCategory(venue.capacity)}
//                     </Badge>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div className="space-y-2">
//                     <div className="flex items-center text-sm text-gray-400">
//                       <MapPin className="w-4 h-4 mr-2" />
//                       <span>{venue.address || 'Address not specified'}</span>
//                     </div>
//                     <div className="flex items-center text-sm text-gray-400">
//                       <Users className="w-4 h-4 mr-2" />
//                       <span>Capacity: {venue.capacity.toLocaleString()}</span>
//                     </div>
//                     <div className="flex items-center text-sm text-gray-400">
//                       <Building className="w-4 h-4 mr-2" />
//                       <span>Added: {new Date(venue.createdAt).toLocaleDateString()}</span>
//                     </div>
//                   </div>

//                   <div className="flex space-x-2">
//                     <Button size="sm" onClick={() => handleView(venue)} variant="outline" className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700">
//                       <Eye className="w-4 h-4 mr-1" /> View
//                     </Button>
//                     <Button size="sm" onClick={() => handleEdit(venue)} variant="outline" className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700">
//                       <Edit className="w-4 h-4 mr-1" /> Edit
//                     </Button>
//                     <Button size="sm" onClick={() => openDeleteDialog(venue)} variant="outline" className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white">
//                       <Trash2 className="w-4 h-4" />
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Venue Modal */}
//       <VenueModal
//         open={modalOpen}
//         onClose={() => setModalOpen(false)}
//         onSubmit={handleSubmit}
//         initialData={selectedVenue}
//         readOnly={readOnly}
//       />

//       {/* Delete Confirmation Dialog */}
//       <Dialog open={confirmDeleteOpen} onOpenChange={setConfirmDeleteOpen}>
//         <DialogContent className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
//           <DialogHeader>
//             <DialogTitle>Confirm Deletion</DialogTitle>
//           </DialogHeader>
//           <p className="text-sm text-gray-500 dark:text-gray-300">
//             Are you sure you want to delete{' '}
//             <strong>{venueToDelete?.name}</strong>?
//           </p>
//           <div className="flex justify-end gap-2 pt-4">
//             <Button variant="outline" onClick={() => setConfirmDeleteOpen(false)}>
//               Cancel
//             </Button>
//             <Button className="bg-red-600 text-white hover:bg-red-700" onClick={confirmDelete}>
//               Delete
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useVenues } from '@/hooks/useApi';
import {
  Plus, Search, MapPin, Users, Building, Edit, Trash2, Eye
} from 'lucide-react';
import { Venue } from '@/types';
import { toast } from 'sonner';
import { VenueModal } from '../components/VenueModal';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export const AdminVenuesPage: React.FC = () => {
  const { venues, loading, createVenue, updateVenue, deleteVenue } = useVenues();
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState<Venue | undefined>();
  const [readOnly, setReadOnly] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [venueToDelete, setVenueToDelete] = useState<Venue | null>(null);

  const filteredVenues = venues.filter(venue =>
    venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    venue.address?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    setSelectedVenue(undefined);
    setReadOnly(false);
    setModalOpen(true);
  };

  const handleEdit = (venue: Venue) => {
    setSelectedVenue(venue);
    setReadOnly(false);
    setModalOpen(true);
  };

  const handleView = (venue: Venue) => {
    setSelectedVenue(venue);
    setReadOnly(true);
    setModalOpen(true);
  };

  const handleSubmit = async (data: Partial<Venue>) => {
    try {
      if (selectedVenue) {
        await updateVenue(selectedVenue.venueId, data);
        toast.success('✅ Venue updated successfully');
      } else {
        await createVenue(data as any);
        toast.success('✅ Venue created successfully');
      }
      setModalOpen(false);
    } catch (err) {
      toast.error('❌ Failed to save venue');
    }
  };

  const openDeleteDialog = (venue: Venue) => {
    setVenueToDelete(venue);
    setConfirmDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!venueToDelete) return;
    try {
      await deleteVenue(venueToDelete.venueId);
      toast.success('✅ Venue deleted successfully');
      setConfirmDeleteOpen(false);
      setVenueToDelete(null);
    } catch {
      toast.error('❌ Failed to delete venue');
    }
  };

  const getCapacityCategory = (capacity: number) => {
    if (capacity < 500) return 'Small';
    if (capacity < 2000) return 'Medium';
    if (capacity < 10000) return 'Large';
    return 'Stadium';
  };

  const getCapacityColor = (capacity: number) => {
    if (capacity < 500) return 'text-green-400 border-green-400';
    if (capacity < 2000) return 'text-blue-400 border-blue-400';
    if (capacity < 10000) return 'text-purple-400 border-purple-400';
    return 'text-red-400 border-red-400';
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Manage Venues</h1>
            <p className="text-gray-400">Add and manage event venues</p>
          </div>
          <Button onClick={handleAdd} className="bg-purple-600 hover:bg-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Venue
          </Button>
        </div>

        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search venues..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700 text-white"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading venues...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVenues.map((venue) => (
              <Card key={venue.venueId} className="bg-gray-800 border-gray-700 hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-white text-lg">{venue.name}</CardTitle>
                    <Badge variant="outline" className={getCapacityColor(venue.capacity)}>
                      {getCapacityCategory(venue.capacity)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-400">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{venue.address || 'Address not specified'}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <Users className="w-4 h-4 mr-2" />
                      <span>Capacity: {venue.capacity.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <Building className="w-4 h-4 mr-2" />
                      <span>Added: {new Date(venue.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" onClick={() => handleView(venue)} variant="outline" className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700">
                      <Eye className="w-4 h-4 mr-1" /> View
                    </Button>
                    <Button size="sm" onClick={() => handleEdit(venue)} variant="outline" className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700">
                      <Edit className="w-4 h-4 mr-1" /> Edit
                    </Button>
                    <Button size="sm" onClick={() => openDeleteDialog(venue)} variant="outline" className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Venue Modal */}
      <VenueModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={selectedVenue}
        readOnly={readOnly}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={confirmDeleteOpen} onOpenChange={setConfirmDeleteOpen}>
        <DialogContent className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Are you sure you want to delete{' '}
            <strong>{venueToDelete?.name}</strong>?
          </p>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setConfirmDeleteOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 text-white hover:bg-red-700" onClick={confirmDelete}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};


