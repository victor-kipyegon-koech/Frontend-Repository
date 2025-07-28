 
// import React, { useState } from 'react';
// import { Input } from '@/components/ui/input';

// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// import { Event } from '@/types';
// import { Search, Filter } from 'lucide-react';
// import {EventCard} from './EventCard'

// interface EventListProps {
//   events: Event[];
//   onBookEvent?: (eventId: number) => void;
// }

// export const EventList: React.FC<EventListProps> = ({ events, onBookEvent }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [categoryFilter, setCategoryFilter] = useState('all');
//   const [sortBy, setSortBy] = useState('date');

//   const categories = Array.from(new Set(events.map(event => event.category).filter(Boolean)));

//   const filteredEvents = events
//     .filter(event => {
//       const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                           event.description?.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesCategory = categoryFilter === 'all' || event.category === categoryFilter;
//       return matchesSearch && matchesCategory;
//     })
//     .sort((a, b) => {
//       switch (sortBy) {
//         case 'date':
//           return new Date(a.date).getTime() - new Date(b.date).getTime();
//         case 'price':
//           return parseFloat(a.ticketPrice) - parseFloat(b.ticketPrice);
//         case 'popularity':
//           return b.ticketsSold - a.ticketsSold;
//         default:
//           return 0;
//       }
//     });

//   return (
//     <div className="space-y-6">
//       {/* Search and Filter Controls */}
//       <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
//         <div className="flex flex-col sm:flex-row gap-4 flex-1">
//           <div className="relative flex-1">
//             <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//             <Input
//               placeholder="Search events..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10"
//             />
//           </div>
          
//           <Select value={categoryFilter} onValueChange={setCategoryFilter}>
//             <SelectTrigger className="w-full sm:w-[180px]">
//               <SelectValue placeholder="Category" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All Categories</SelectItem>
//               {categories.map(category => (
//                 <SelectItem key={category} value={category!}>
//                   {category}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>
        
//         <Select value={sortBy} onValueChange={setSortBy}>
//           <SelectTrigger className="w-full sm:w-[180px]">
//             <SelectValue placeholder="Sort by" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="date">Date</SelectItem>
//             <SelectItem value="price">Price</SelectItem>
//             <SelectItem value="popularity">Popularity</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       {/* Results Count */}
//       <div className="text-sm text-gray-600">
//         {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} found
//       </div>

//       {/* Events Grid */}
//       {filteredEvents.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredEvents.map(event => (
//             <EventCard
//               key={event.eventId}
//               event={event}
//               onBook={onBookEvent}
//             />
//           ))}
//         </div>
//       ) : (
//         <div className="text-center py-12">
//           <div className="text-gray-500 mb-4">
//             <Filter className="w-16 h-16 mx-auto mb-4 text-gray-300" />
//             <p className="text-lg font-medium">No events found</p>
//             <p className="text-sm">Try adjusting your search or filters</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
 import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Event } from '@/types';
import { Search, Filter } from 'lucide-react';
import { EventCard } from './EventCard';

interface EventListProps {
  events: Event[];
  onBookEvent?: (eventId: number) => void;
}

export const EventList: React.FC<EventListProps> = ({ events, onBookEvent }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  // Normalize category list to strings
  const categories = Array.from(
    new Set(events.map((event) => String(event.category)).filter(Boolean))
  );

  const filteredEvents = events
    .filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        categoryFilter === 'all' || String(event.category) === categoryFilter;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'price':
          return a.ticketPrice - b.ticketPrice; // ✅ ticketPrice is number
        case 'popularity':
          return b.ticketsSold - a.ticketsSold;
        default:
          return 0;
      }
    });

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={String(category)}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Date</SelectItem>
            <SelectItem value="price">Price</SelectItem>
            <SelectItem value="popularity">Popularity</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} found
      </div>

      {/* Events Grid */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.eventId}
              event={event}
              onBook={onBookEvent}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">
            <Filter className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium">No events found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        </div>
      )}
    </div>
  );
};
