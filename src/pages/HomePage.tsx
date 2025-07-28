 
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useEvents } from '@/hooks/useApi';
import { useAuth } from '@/context/AuthContext';
import { 
  Calendar, 
  Users, 
  MapPin, 
  Ticket, 
  Star, 
  ArrowRight,
  CheckCircle,
  Clock,
  DollarSign,
  Play,
  Shield,
  Zap,
  Heart
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { events, loading } = useEvents();
  const { isAuthenticated } = useAuth();
  
  const featuredEvents = events.slice(0, 3);

  const features = [
    {
      icon: Calendar,
      title: 'Easy Event Discovery',
      description: 'Browse and discover amazing events in your area with our intuitive search and filtering system.',
    },
    {
      icon: Ticket,
      title: 'Secure Booking',
      description: 'Book tickets securely with our integrated payment system and receive instant confirmation.',
    },
    {
      icon: Users,
      title: 'Community Events',
      description: 'Connect with like-minded people and attend events that match your interests.',
    },
    {
      icon: CheckCircle,
      title: 'Verified Events',
      description: 'All events are verified and managed by trusted organizers for your peace of mind.',
    },
  ];

  const stats = [
    { label: 'Events Hosted', value: '1,000+', icon: Calendar },
    { label: 'Happy Customers', value: '50,000+', icon: Users },
    { label: 'Cities Covered', value: '100+', icon: MapPin },
    { label: 'Tickets Sold', value: '500,000+', icon: Ticket },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Event Enthusiast',
      content: 'EventHub has completely transformed how I discover and attend events. The platform is so easy to use!',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Concert Lover',
      content: 'I\'ve booked over 20 events through EventHub. The booking process is seamless and secure.',
      rating: 5,
    },
    {
      name: 'Emily Davis',
      role: 'Festival Goer',
      content: 'The variety of events available is incredible. I always find something exciting to attend.',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-700 via-blue-600 to-purple-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4 mr-2" />
              Discover Amazing Events Near You
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Your Gateway to
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                Unforgettable Events
              </span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-purple-100 max-w-3xl mx-auto leading-relaxed">
              From intimate concerts to grand festivals, discover and book tickets for the most exciting events 
              in your city. Join thousands of event-goers who trust EventHub.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-purple-700 hover:bg-gray-50 px-8 py-3">
                <Link to="/login">
                  Sign In
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-700 px-8 py-3">
                <Link to="/register">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-blue-400/20 rounded-full blur-xl"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 lg:w-8 lg:h-8 text-white" />
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-purple-600 border-purple-600">
              Featured Events
            </Badge>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
              Don't Miss These Amazing Events
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Handpicked events that promise unforgettable experiences
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-64 bg-gray-200 rounded-t-lg" />
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-2" />
                    <div className="h-3 bg-gray-200 rounded w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredEvents.map((event) => (
                <Card key={event.eventId} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
                  <div className="h-48 lg:h-56 bg-gradient-to-br from-purple-500 to-blue-600 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-white">
                      <div className="text-center">
                        <Calendar className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                        <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                          {event.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-bold group-hover:text-purple-600 transition-colors">
                      {event.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 pb-6">
                    <p className="text-gray-600 mb-6 line-clamp-2">{event.description}</p>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-3 text-purple-500" />
                        <span>{new Date(event.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-3 text-purple-500" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-3 text-purple-500" />
                        <span>{event.venue?.name}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-2xl font-bold text-gray-900">
                        <DollarSign className="w-5 h-5 mr-1" />
                        <span>{event.ticketPrice}</span>
                      </div>
                      <Button asChild size="sm" className="group-hover:bg-purple-700 transition-colors">
                        <Link to="/login">
                          Sign In to Book
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
              <Link to="/login">
                Sign In to View Events
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-purple-600 border-purple-600">
              Why Choose EventHub
            </Badge>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
              The Ultimate Event Experience
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We make event discovery and booking simple, secure, and enjoyable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-purple-600 border-purple-600">
              Testimonials
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied customers who love EventHub
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mr-4">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
            <Shield className="w-4 h-4 mr-2" />
            Trusted by 50,000+ Event Enthusiasts
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Discover Your Next Adventure?
          </h2>
          <p className="text-xl mb-10 text-purple-100 max-w-2xl mx-auto leading-relaxed">
            Join the EventHub community today and never miss out on amazing events in your area
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-purple-700 hover:bg-gray-50 text-lg px-8 py-4">
              <Link to="/login">
                Sign In Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-700 text-lg px-8 py-4">
              <Link to="/register">Create Free Account</Link>
            </Button>
          </div>
        </div>
        
        Background Elements
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-yellow-400/10 rounded-full blur-xl"></div>
      </section>
    </div>
  );
};
 
 
