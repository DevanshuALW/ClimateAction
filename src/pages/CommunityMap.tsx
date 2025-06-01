import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Map, { Marker, Popup, NavigationControl } from 'react-map-gl';
import { Calendar, MapPin, Users, Clock, ArrowRight, Filter } from 'lucide-react';

// Note: This would normally require a Mapbox token
// For this demo, we're showing the structure without a working map

const CommunityMap: React.FC = () => {
  const [viewState, setViewState] = useState({
    latitude: 47.6062,
    longitude: -122.3321,
    zoom: 11
  });
  
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [filter, setFilter] = useState('all');

  // Sample community events data
  const communityEvents = [
    {
      id: 1,
      title: 'Beach Cleanup',
      description: 'Help clean up Golden Gardens Beach and protect marine life.',
      date: '2025-06-12',
      time: '9:00 AM - 12:00 PM',
      location: 'Golden Gardens Park',
      category: 'cleanup',
      participants: 24,
      coords: { latitude: 47.6917, longitude: -122.4032 }
    },
    {
      id: 2,
      title: 'Community Garden Planting',
      description: 'Plant vegetables and flowers in our neighborhood garden.',
      date: '2025-06-15',
      time: '10:00 AM - 2:00 PM',
      location: 'Beacon Hill Community Garden',
      category: 'gardening',
      participants: 12,
      coords: { latitude: 47.5876, longitude: -122.3109 }
    },
    {
      id: 3,
      title: 'Tree Planting Initiative',
      description: 'Help restore the local forest by planting native trees.',
      date: '2025-06-20',
      time: '8:00 AM - 1:00 PM',
      location: 'Discovery Park',
      category: 'planting',
      participants: 35,
      coords: { latitude: 47.6615, longitude: -122.4058 }
    },
    {
      id: 4,
      title: 'Sustainable Living Workshop',
      description: 'Learn about composting, urban gardening, and sustainable practices.',
      date: '2025-06-18',
      time: '6:00 PM - 8:00 PM',
      location: 'Seattle Public Library',
      category: 'education',
      participants: 18,
      coords: { latitude: 47.6067, longitude: -122.3325 }
    },
    {
      id: 5,
      title: 'Renewable Energy Fair',
      description: 'Explore solar, wind, and other renewable energy technologies.',
      date: '2025-06-25',
      time: '11:00 AM - 4:00 PM',
      location: 'Seattle Center',
      category: 'education',
      participants: 45,
      coords: { latitude: 47.6220, longitude: -122.3517 }
    },
  ];

  const filteredEvents = filter === 'all' 
    ? communityEvents 
    : communityEvents.filter(event => event.category === filter);

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'cleanup': return '#0891b2';  // cyan-600
      case 'gardening': return '#65a30d'; // lime-600
      case 'planting': return '#16a34a';  // green-600
      case 'education': return '#8b5cf6'; // violet-500
      default: return '#6b7280';          // gray-500
    }
  };

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'cleanup': return '🧹';
      case 'gardening': return '🌱';
      case 'planting': return '🌳';
      case 'education': return '📚';
      default: return '📍';
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Community Climate Initiatives</h1>
        <p className="text-gray-600">
          Discover environmental events and initiatives in your area that you can join to make a difference.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-3/5">
          <div className="bg-white rounded-xl shadow overflow-hidden h-[600px] relative">
            <div className="absolute top-4 left-4 z-10 bg-white rounded-lg shadow-md p-2">
              <div className="flex space-x-1">
                {['all', 'cleanup', 'gardening', 'planting', 'education'].map(category => (
                  <button
                    key={category}
                    onClick={() => setFilter(category)}
                    className={`px-3 py-1 text-sm rounded-md transition-colors ${
                      filter === category 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            {/* This is a placeholder for the actual map */}
            <div className="w-full h-full bg-emerald-50 flex items-center justify-center">
              <div className="text-center max-w-md p-6">
                <h3 className="text-lg font-medium mb-2">Map Visualization</h3>
                <p className="text-gray-600 mb-4">
                  This would display an interactive map showing all community events.
                  Users could click on markers to see event details.
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {['all', 'cleanup', 'gardening', 'planting', 'education'].map(category => (
                    <div key={category} className="flex items-center space-x-1">
                      <span className="inline-block w-3 h-3 rounded-full" style={{ 
                        backgroundColor: category === 'all' ? '#6b7280' : getCategoryColor(category) 
                      }}></span>
                      <span>{category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-2/5">
          <div className="bg-white rounded-xl shadow p-6 h-[600px] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Upcoming Events</h2>
              <div className="flex items-center">
                <Filter size={16} className="text-gray-400 mr-2" />
                <select 
                  className="text-sm border-0 focus:ring-0 text-gray-600 pr-8 bg-transparent"
                  value={filter}
                  onChange={e => setFilter(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  <option value="cleanup">Cleanup</option>
                  <option value="gardening">Gardening</option>
                  <option value="planting">Planting</option>
                  <option value="education">Education</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {filteredEvents.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No events found for this category
                </div>
              ) : (
                filteredEvents.map((event, index) => (
                  <motion.div 
                    key={event.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-lg border transition-colors ${
                      selectedEvent === event.id 
                        ? 'border-emerald-300 bg-emerald-50' 
                        : 'border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/50'
                    }`}
                    onClick={() => setSelectedEvent(event.id)}
                  >
                    <div className="flex justify-between">
                      <h3 className="font-semibold text-gray-800">{event.title}</h3>
                      <span 
                        className="text-sm py-1 px-2 rounded-full" 
                        style={{ 
                          backgroundColor: `${getCategoryColor(event.category)}20`,
                          color: getCategoryColor(event.category)
                        }}
                      >
                        {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mt-1 mb-3 line-clamp-2">{event.description}</p>
                    
                    <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1" /> {event.date}
                      </div>
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1" /> {event.time}
                      </div>
                      <div className="flex items-center">
                        <MapPin size={14} className="mr-1" /> {event.location}
                      </div>
                      <div className="flex items-center">
                        <Users size={14} className="mr-1" /> {event.participants} attending
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-end">
                      <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center">
                        View Details <ArrowRight size={14} className="ml-1" />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl p-6 border border-blue-100">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Start Your Own Initiative</h2>
        <p className="text-gray-600 mb-6">
          Have an idea for an environmental project in your community? Create your own initiative and invite others to join!
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-lg shadow-sm flex flex-col items-center text-center">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-full mb-4">
              <MapPin size={24} />
            </div>
            <h3 className="font-semibold mb-2">Choose Location</h3>
            <p className="text-sm text-gray-600">Select a location for your environmental initiative</p>
          </div>
          
          <div className="bg-white p-5 rounded-lg shadow-sm flex flex-col items-center text-center">
            <div className="bg-emerald-100 text-emerald-600 p-3 rounded-full mb-4">
              <Calendar size={24} />
            </div>
            <h3 className="font-semibold mb-2">Schedule Event</h3>
            <p className="text-sm text-gray-600">Set the date, time and details for your initiative</p>
          </div>
          
          <div className="bg-white p-5 rounded-lg shadow-sm flex flex-col items-center text-center">
            <div className="bg-amber-100 text-amber-600 p-3 rounded-full mb-4">
              <Users size={24} />
            </div>
            <h3 className="font-semibold mb-2">Invite Others</h3>
            <p className="text-sm text-gray-600">Share with friends and community members</p>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Create New Initiative
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityMap;