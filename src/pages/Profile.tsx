import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Edit, Award, Settings, LogOut, ArrowRight, 
  Leaf, Map, ShoppingBag, Clock, Zap, Droplet 
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Sample user data
  const userData = {
    name: 'Emma Johnson',
    email: 'emma@example.com',
    location: 'Seattle, WA',
    joinDate: 'March 2025',
    avatar: 'https://images.pexels.com/photos/3771807/pexels-photo-3771807.jpeg?auto=compress&cs=tinysrgb&w=400',
    stats: {
      carbonSaved: '3.2 tons',
      activeChallenges: 2,
      completedChallenges: 7,
      ecoPoints: 1240,
      trees: 12,
      waterSaved: '2,450 gal'
    }
  };

  // Sample badges
  const badges = [
    { id: 1, name: 'Early Adopter', description: 'Joined ClimateAction in our first month', icon: '🌱' },
    { id: 2, name: 'Challenge Champion', description: 'Completed 5+ eco challenges', icon: '🏆' },
    { id: 3, name: 'Carbon Reducer', description: 'Reduced carbon footprint by 20%', icon: '🌍' },
    { id: 4, name: 'Community Leader', description: 'Organized a local climate initiative', icon: '👥' },
    { id: 5, name: 'Eco Shopper', description: 'Made 10+ purchases from sustainable brands', icon: '🛍️' }
  ];

  // Sample impact history
  const impactHistory = [
    { month: 'Jan', carbon: 420 },
    { month: 'Feb', carbon: 390 },
    { month: 'Mar', carbon: 360 },
    { month: 'Apr', carbon: 320 },
    { month: 'May', carbon: 290 },
  ];

  // Sample activity feed
  const activityFeed = [
    { 
      id: 1, 
      type: 'challenge',
      title: 'Completed "Zero Waste Week" challenge',
      date: '2 days ago',
      icon: <Award className="text-amber-500" size={18} />
    },
    { 
      id: 2, 
      type: 'footprint',
      title: 'Reduced carbon footprint by 12% this month',
      date: '1 week ago',
      icon: <Leaf className="text-emerald-500\" size={18} />
    },
    { 
      id: 3, 
      type: 'community',
      title: 'Joined Beach Cleanup event',
      date: '2 weeks ago',
      icon: <Map className="text-blue-500" size={18} />
    },
    { 
      id: 4, 
      type: 'purchase',
      title: 'Purchased Reusable Produce Bags',
      date: '3 weeks ago',
      icon: <ShoppingBag className="text-purple-500\" size={18} />
    }
  ];

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
          <div className="relative">
            <img 
              src={userData.avatar} 
              alt={userData.name}
              className="w-24 h-24 rounded-full object-cover border-2 border-emerald-500"
            />
            <button className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md border border-gray-200">
              <Edit size={16} className="text-gray-600" />
            </button>
          </div>
          
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold text-gray-800">{userData.name}</h1>
            <p className="text-gray-600">{userData.location}</p>
            <p className="text-sm text-gray-500">Member since {userData.joinDate}</p>
            
            <div className="mt-3 flex flex-wrap justify-center md:justify-start gap-2">
              <button className="px-3 py-1 text-sm bg-emerald-100 text-emerald-700 rounded-md flex items-center">
                <User size={14} className="mr-1" /> Edit Profile
              </button>
              <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md flex items-center">
                <Settings size={14} className="mr-1" /> Settings
              </button>
              <button className="px-3 py-1 text-sm bg-red-50 text-red-600 rounded-md flex items-center">
                <LogOut size={14} className="mr-1" /> Sign Out
              </button>
            </div>
          </div>
          
          <div className="md:ml-auto">
            <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-lg px-4 py-3 text-center">
              <h3 className="text-sm text-emerald-700 font-medium mb-1">Your Eco Points</h3>
              <p className="text-2xl font-bold text-emerald-800">{userData.stats.ecoPoints}</p>
              <button className="text-xs text-emerald-600 mt-1 flex items-center justify-center">
                Redeem Points <ArrowRight size={12} className="ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { title: 'Carbon Saved', value: userData.stats.carbonSaved, icon: <Leaf size={20} className="text-emerald-500" /> },
          { title: 'Active Challenges', value: userData.stats.activeChallenges, icon: <Award size={20} className="text-amber-500" /> },
          { title: 'Completed Challenges', value: userData.stats.completedChallenges, icon: <Clock size={20} className="text-blue-500" /> },
          { title: 'Trees Planted', value: userData.stats.trees, icon: <Leaf size={20} className="text-green-500" /> },
          { title: 'Energy Saved', value: '435 kWh', icon: <Zap size={20} className="text-yellow-500" /> },
          { title: 'Water Saved', value: userData.stats.waterSaved, icon: <Droplet size={20} className="text-cyan-500" /> },
        ].map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm flex items-center"
          >
            <div className="p-3 rounded-full bg-gray-50 mr-4">
              {stat.icon}
            </div>
            <div>
              <h3 className="text-sm text-gray-600">{stat.title}</h3>
              <p className="text-xl font-bold text-gray-800">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <div className="flex border-b border-gray-200">
          {['overview', 'badges', 'activity', 'settings'].map((tab) => (
            <button
              key={tab}
              className={`px-6 py-4 font-medium ${
                activeTab === tab 
                  ? 'text-emerald-600 border-b-2 border-emerald-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Impact Overview</h2>
                <div className="bg-gray-50 p-4 rounded-lg h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={impactHistory} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => [`${value} kg`, 'CO₂']}
                        contentStyle={{ borderRadius: '0.5rem', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="carbon" 
                        stroke="#2D6A4F" 
                        strokeWidth={2}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </section>
              
              <section>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800">Recent Activity</h2>
                  <button className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center">
                    View All <ArrowRight size={16} className="ml-1" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  {activityFeed.slice(0, 3).map((activity) => (
                    <div key={activity.id} className="flex items-start p-3 border border-gray-100 rounded-lg">
                      <div className="p-2 rounded-full bg-gray-50 mr-3">
                        {activity.icon}
                      </div>
                      <div>
                        <p className="text-gray-800">{activity.title}</p>
                        <p className="text-sm text-gray-500">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}
          
          {activeTab === 'badges' && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-6">Your Achievement Badges</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {badges.map((badge) => (
                  <div 
                    key={badge.id} 
                    className="border border-gray-100 rounded-lg p-4 flex items-center"
                  >
                    <div className="mr-3 text-2xl">{badge.icon}</div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{badge.name}</h3>
                      <p className="text-xs text-gray-600">{badge.description}</p>
                    </div>
                  </div>
                ))}
                
                <div className="border border-dashed border-gray-200 rounded-lg p-4 flex items-center justify-center text-center">
                  <div>
                    <div className="bg-gray-100 rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-2">
                      <Award size={24} className="text-gray-400" />
                    </div>
                    <h3 className="font-medium text-gray-600">More to unlock!</h3>
                    <p className="text-xs text-gray-500 mt-1">Complete more eco-actions to earn badges</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'activity' && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-6">Activity Feed</h2>
              
              <div className="space-y-4">
                {activityFeed.map((activity) => (
                  <div key={activity.id} className="flex items-start p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
                    <div className="p-2 rounded-full bg-gray-100 mr-4">
                      {activity.icon}
                    </div>
                    <div>
                      <p className="text-gray-800 font-medium">{activity.title}</p>
                      <p className="text-sm text-gray-500">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div className="max-w-xl mx-auto">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Account Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Profile Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input 
                        type="text" 
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
                        defaultValue={userData.name}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input 
                        type="email" 
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
                        defaultValue={userData.email}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input 
                        type="text" 
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
                        defaultValue={userData.location}
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Notifications</h3>
                  <div className="space-y-3">
                    {['Challenge updates', 'Community events', 'Environmental alerts', 'Marketplace deals'].map((item, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-gray-700">{item}</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked={i < 2} />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end">
                  <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;