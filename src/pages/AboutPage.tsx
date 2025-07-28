

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Target, 
  Heart, 
  Award,
  Calendar,
  MapPin,
  Ticket,
  Star,
  ArrowRight,
  CheckCircle,
  Globe,
  Shield,
  Zap,
  TrendingUp
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const stats = [
    { label: 'Events Hosted', value: '1,000+', icon: Calendar },
    { label: 'Happy Customers', value: '50,000+', icon: Users },
    { label: 'Partner Venues', value: '500+', icon: MapPin },
    { label: 'Cities Worldwide', value: '100+', icon: Globe },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Customer First',
      description: 'We put our customers at the heart of everything we do, ensuring exceptional experiences at every touchpoint.',
    },
    {
      icon: Shield,
      title: 'Trust & Security',
      description: 'Your data and transactions are protected with industry-leading security measures and encryption.',
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We continuously innovate to provide cutting-edge solutions that make event discovery effortless.',
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Connecting event enthusiasts worldwide with amazing experiences in their local communities.',
    },
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      description: 'Passionate about connecting people through amazing events. 10+ years in event management.',
      image: '👩‍💼',
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      description: 'Tech visionary focused on building scalable platforms. Former engineer at major tech companies.',
      image: '👨‍💻',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Operations',
      description: 'Ensures smooth operations and exceptional customer experiences across all touchpoints.',
      image: '👩‍🎯',
    },
    {
      name: 'David Kim',
      role: 'Head of Partnerships',
      description: 'Builds relationships with venues and event organizers to expand our platform reach.',
      image: '👨‍🤝‍👨',
    },
  ];

  const milestones = [
    {
      year: '2020',
      title: 'EventHub Founded',
      description: 'Started with a vision to revolutionize event discovery and booking.',
    },
    {
      year: '2021',
      title: '10,000 Users',
      description: 'Reached our first major milestone with 10,000 registered users.',
    },
    {
      year: '2022',
      title: 'National Expansion',
      description: 'Expanded to 50+ cities across the country with 100+ venue partners.',
    },
    {
      year: '2023',
      title: 'Global Launch',
      description: 'Launched internationally and reached 50,000+ happy customers.',
    },
    {
      year: '2024',
      title: 'Innovation Leader',
      description: 'Recognized as the leading platform for event discovery and booking.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-700 via-blue-600 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
              <Heart className="w-4 h-4 mr-2" />
              Our Story
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Connecting People Through
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                Amazing Events
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100 max-w-3xl mx-auto">
              We believe that life's most memorable moments happen when people come together. 
              EventHub makes it easy to discover and attend incredible events in your community.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4 text-purple-600 border-purple-600">
                Our Mission
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Making Event Discovery Effortless
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At EventHub, we're on a mission to transform how people discover and attend events. 
                We believe that everyone deserves access to amazing experiences, whether it's a local 
                concert, a food festival, or a professional conference.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our platform connects event enthusiasts with organizers, creating a vibrant ecosystem 
                where memorable experiences are just a click away.
              </p>
              <div className="flex items-center space-x-4">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <span className="text-gray-700">Trusted by 50,000+ users worldwide</span>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl p-8 text-white">
                <Target className="w-16 h-16 mb-6" />
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-purple-100 leading-relaxed">
                  To become the world's leading platform for event discovery, where every person 
                  can easily find and attend events that inspire, educate, and entertain them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-purple-600 border-purple-600">
              Our Values
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              What Drives Us Forward
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our core values guide every decision we make and every feature we build
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl mb-6">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-purple-600 border-purple-600">
              Our Team
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Meet the People Behind EventHub
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A passionate team dedicated to creating exceptional event experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="text-6xl mb-4">{member.image}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-purple-600 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-purple-600 border-purple-600">
              Our Journey
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Milestones That Define Us
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From a simple idea to a global platform - here's our story
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 to-blue-600 rounded-full"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                      <CardContent className="p-6">
                        <div className="text-2xl font-bold text-purple-600 mb-2">{milestone.year}</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{milestone.title}</h3>
                        <p className="text-gray-600">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
            <TrendingUp className="w-4 h-4 mr-2" />
            Join Our Growing Community
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Discover Amazing Events?
          </h2>
          <p className="text-xl mb-8 text-purple-100 max-w-2xl mx-auto">
            Join thousands of event enthusiasts who trust EventHub to discover their next great experience
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-purple-700 hover:bg-gray-50 text-lg px-8 py-4">
              <Link to="/register">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-700 text-lg px-8 py-4">
              <Link to="/events">Browse Events</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};