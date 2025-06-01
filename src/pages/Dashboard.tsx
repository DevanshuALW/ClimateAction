import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Zap, Droplet, Car, ShoppingBag, Leaf, ArrowRight } from 'lucide-react';
import EnvironmentalData from '../components/EnvironmentalData';
import ChallengeCard from '../components/ChallengeCard';

const Dashboard: React.FC = () => {
  // Sample data
  const carbonData = [
    { name: 'Jan', value: 280 },
    { name: 'Feb', value: 260 },
    { name: 'Mar', value: 270 },
    { name: 'Apr', value: 240 },
    { name: 'May', value: 220 },
    { name: 'Jun', value: 210 },
  ];

  const footprintData = [
    { name: 'Transport', value: 35, color: '#0284c7' },
    { name: 'Energy', value: 30, color: '#f59e0b' },
    { name: 'Food', value: 20, color: '#10b981' },
    { name: 'Shopping', value: 15, color: '#8b5cf6' },
  ];

  const challenges = [
    {
      id: 1,
      title: 'Meatless Monday',
      description: 'Skip meat for one day a week to reduce your carbon footprint',
      difficulty: 'Easy',
      impact: 'Medium',
      progress: 75,
    },
    {
      id: 2,
      title: 'Zero Waste Week',
      description: 'Minimize your waste production for one full week',
      difficulty: 'Medium',
      impact: 'High',
      progress: 40,
    },
  ];

  const statsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <div className="space-y-8">
      <section>
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Welcome back, Emma</h1>
          <p className="text-gray-600">Your sustainable journey continues. Here's your impact so far.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Carbon Saved', value: '2.4 tons', icon: <Leaf className="text-emerald-500\" size={24} />, color: 'bg-emerald-50 border-emerald-200' },
            { title: 'Energy Usage', value: '-15%', icon: <Zap className="text-amber-500" size={24} />, color: 'bg-amber-50 border-amber-200' },
            { title: 'Water Saved', value: '340 gal', icon: <Droplet className="text-blue-500\" size={24} />, color: 'bg-blue-50 border-blue-200' },
            { title: 'Eco Points', value: '1,240', icon: <Leaf className="text-purple-500" size={24} />, color: 'bg-purple-50 border-purple-200' },
          ].map((stat, i) => (
            <motion.div
              key={stat.title}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={statsVariants}
              className={`p-6 rounded-xl border ${stat.color} flex justify-between items-center`}
            >
              <div>
                <p className="text-gray-600 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
              <div className="p-3 rounded-full bg-white shadow-sm">
                {stat.icon}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Monthly Carbon Footprint</h2>
              <button className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center">
                View Details <ArrowRight size={16} className="ml-1" />
              </button>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={carbonData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`${value} kg`, 'CO₂']}
                    contentStyle={{ borderRadius: '0.5rem', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar 
                    dataKey="value" 
                    fill="#2D6A4F" 
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
          
          <EnvironmentalData />
        </div>
        
        <div className="space-y-8">
          <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Footprint Breakdown</h2>
            <div className="h-60 flex justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={footprintData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    animationDuration={1000}
                    animationBegin={200}
                  >
                    {footprintData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'of total']}
                    contentStyle={{ borderRadius: '0.5rem', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {footprintData.map((item) => (
                <div key={item.name} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-gray-600">{item.name}: {item.value}%</span>
                </div>
              ))}
            </div>
          </section>
          
          <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Active Challenges</h2>
              <button className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center">
                View All <ArrowRight size={16} className="ml-1" />
              </button>
            </div>
            <div className="space-y-4">
              {challenges.map(challenge => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;