 
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useVenues } from '@/hooks/useApi';
import { 
  MapPin, 
  Users, 
  Search, 
  Calendar,
  Star,
  ArrowRight,
  Building,
  Wifi,
  Car,
  Coffee,
  Music,
  Camera
} from 'lucide-react';

export const VenuesPage: React.FC = () => {
  const { venues, loading } = useVenues();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVenues = venues.filter(venue =>
    venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    venue.address?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCapacityCategory = (capacity: number) => {
    if (capacity < 500) return 'Intimate';
    if (capacity < 2000) return 'Medium';
    if (capacity < 10000) return 'Large';
    return 'Stadium';
  };

  const getCapacityColor = (capacity: number) => {
    if (capacity < 500) return 'bg-green-100 text-green-800';
    if (capacity < 2000) return 'bg-blue-100 text-blue-800';
    if (capacity < 10000) return 'bg-purple-100 text-purple-800';
    return 'bg-red-100 text-red-800';
  };

  const venueAmenities = [
    { icon: Wifi, label: 'Free WiFi' },
    { icon: Car, label: 'Parking' },
    { icon: Coffee, label: 'Catering' },
    { icon: Music, label: 'Sound System' },
    { icon: Camera, label: 'Photography' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading venues...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-700 via-blue-600 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
              <Building className="w-4 h-4 mr-2" />
              Premium Event Venues
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Discover Perfect
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                Event Venues
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100 max-w-3xl mx-auto">
              From intimate spaces to grand arenas, find the perfect venue for your next event
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Section */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search venues by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">{venues.length}</div>
              <div className="text-sm text-gray-600">Total Venues</div>
            </CardContent>
          </Card>
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {venues.reduce((sum, venue) => sum + venue.capacity, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Capacity</div>
            </CardContent>
          </Card>
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-green-600 mb-2">15+</div>
              <div className="text-sm text-gray-600">Cities</div>
            </CardContent>
          </Card>
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-orange-600 mb-2">4.8</div>
              <div className="text-sm text-gray-600">Avg Rating</div>
            </CardContent>
          </Card>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredVenues.length} venue{filteredVenues.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Venues Grid */}
        {filteredVenues.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVenues.map((venue) => (
              <Card key={venue.venueId} className="group hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-purple-500 to-blue-600 relative">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    <div className="text-center">
                      <Building className="w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                      <Badge className={`${getCapacityColor(venue.capacity)} border-0`}>
                        {getCapacityCategory(venue.capacity)}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-bold group-hover:text-purple-600 transition-colors">
                      {venue.name}
                    </CardTitle>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">4.8</span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-start text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 mt-0.5 text-purple-500 flex-shrink-0" />
                    <span>{venue.address || 'Address not specified'}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-2 text-purple-500" />
                    <span>Capacity: {venue.capacity.toLocaleString()} people</span>
                  </div>

                  {/* Amenities */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-900">Amenities:</p>
                    <div className="flex flex-wrap gap-2">
                      {venueAmenities.slice(0, 3).map((amenity, index) => {
                        const Icon = amenity.icon;
                        return (
                          <div key={index} className="flex items-center text-xs text-gray-600 bg-gray-100 rounded-full px-2 py-1">
                            <Icon className="w-3 h-3 mr-1" />
                            {amenity.label}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        Available for booking
                      </div>
                      <Button size="sm" className="group-hover:bg-purple-700 transition-colors">
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Building className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium text-gray-900 mb-2">No venues found</p>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Need Help Finding the Perfect Venue?
          </h2>
          <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
            Our venue specialists are here to help you find the ideal space for your event. 
            Get personalized recommendations based on your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-50">
              Contact Specialist
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-700">
              Browse Events
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};