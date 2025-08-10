import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Award, Clock, Users, ArrowRight, Search, ChevronDown,
  Leaf
} from 'lucide-react';
import { useChallenges } from '../context/ChallengeContext';

const Challenges: React.FC = () => {
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [impactFilter, setImpactFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('discover');
  
  const { challenges, activeChallenges, completedChallenges, joinChallenge } = useChallenges();

  // Filter and search challenges
  const filteredChallenges = challenges
    .filter(challenge => categoryFilter === 'all' || challenge.category === categoryFilter)
    .filter(challenge => difficultyFilter === 'all' || challenge.difficulty === difficultyFilter)
    .filter(challenge => impactFilter === 'all' || challenge.impact === impactFilter)
    .filter(challenge => 
      challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      challenge.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'food': return '#10b981';     // emerald-500
      case 'waste': return '#8b5cf6';    // violet-500
      case 'transport': return '#3b82f6'; // blue-500
      case 'energy': return '#f59e0b';   // amber-500
      case 'water': return '#0ea5e9';    // sky-500
      default: return '#6b7280';         // gray-500
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case 'low': return 'bg-blue-100 text-blue-800';
      case 'medium': return 'bg-purple-100 text-purple-800';
      case 'high': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Eco Challenges</h1>
        <p className="text-gray-600">
          Take on sustainability challenges to reduce your environmental impact and earn rewards.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`px-6 py-3 font-medium ${
              activeTab === 'discover' 
                ? 'text-emerald-600 border-b-2 border-emerald-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('discover')}
          >
            Discover Challenges
          </button>
          <button
            className={`px-6 py-3 font-medium ${
              activeTab === 'my-challenges' 
                ? 'text-emerald-600 border-b-2 border-emerald-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('my-challenges')}
          >
            My Challenges
          </button>
        </div>

        {activeTab === 'discover' && (
          <>
            <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0">
              <div className="relative w-full md:w-1/2">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search challenges..."
                  className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex space-x-2">
                <div className="relative">
                  <select
                    className="appearance-none pl-4 pr-10 py-2 border border-gray-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    <option value="all">All Categories</option>
                    <option value="food">Food</option>
                    <option value="waste">Waste</option>
                    <option value="transport">Transport</option>
                    <option value="energy">Energy</option>
                    <option value="water">Water</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500" />
                </div>
                
                <div className="relative">
                  <select
                    className="appearance-none pl-4 pr-10 py-2 border border-gray-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                    value={difficultyFilter}
                    onChange={(e) => setDifficultyFilter(e.target.value)}
                  >
                    <option value="all">All Difficulties</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500" />
                </div>
                
                <div className="relative">
                  <select
                    className="appearance-none pl-4 pr-10 py-2 border border-gray-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                    value={impactFilter}
                    onChange={(e) => setImpactFilter(e.target.value)}
                  >
                    <option value="all">All Impacts</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredChallenges.length === 0 ? (
                <div className="col-span-3 py-12 text-center text-gray-500">
                  No challenges found matching your criteria
                </div>
              ) : (
                filteredChallenges.map((challenge, index) => (
                  <Link to={`/challenges/${challenge.id}`} key={challenge.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="h-2" style={{ backgroundColor: getCategoryColor(challenge.category) }}></div>
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold text-gray-800">{challenge.title}</h3>
                        <div className="p-2 rounded-full" style={{ 
                          backgroundColor: `${getCategoryColor(challenge.category)}20`,
                          color: getCategoryColor(challenge.category)
                        }}>
                          {challenge.icon}
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{challenge.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(challenge.difficulty)}`}>
                          {challenge.difficulty}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getImpactColor(challenge.impact)}`}>
                          {challenge.impact} Impact
                        </span>
                      </div>
                      
                      <div className="flex justify-between text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <Clock size={14} className="mr-1" />
                          {challenge.duration}
                        </div>
                        <div className="flex items-center">
                          <Users size={14} className="mr-1" />
                          {challenge.participants.toLocaleString()} joined
                        </div>
                      </div>
                      
                      <button
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-medium transition-colors"
                        onClick={() => joinChallenge(challenge.id)}
                      >
                        Join Challenge
                      </button>
                    </div>
                  </motion.div>
                  </Link>
                ))
              )}
            </div>
          </>
        )}

        {activeTab === 'my-challenges' && (
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Active Challenges</h2>
              
              {activeChallenges.length === 0 ? (
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <p className="text-gray-500 mb-4">You don't have any active challenges yet.</p>
                  <button 
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    onClick={() => setActiveTab('discover')}
                  >
                    Discover Challenges
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {activeChallenges.map((challenge, index) => (
                    <Link to={`/challenges/${challenge.id}`} key={challenge.id}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="h-2" style={{ backgroundColor: getCategoryColor(challenge.category) }}></div>
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-semibold text-gray-800">{challenge.title}</h3>
                          <div className="p-2 rounded-full" style={{ 
                            backgroundColor: `${getCategoryColor(challenge.category)}20`,
                            color: getCategoryColor(challenge.category)
                          }}>
                            {challenge.icon}
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-4">{challenge.description}</p>
                        
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium">Progress</span>
                            <span>{challenge.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="h-2.5 rounded-full bg-emerald-500" 
                              style={{ width: `${challenge.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between text-sm text-gray-600 mb-4">
                          <div className="flex items-center">
                            <Clock size={14} className="mr-1" />
                            {challenge.daysLeft} days left
                          </div>
                          <div className="flex items-center">
                            <span className={`px-2 py-0.5 rounded-full ${getDifficultyColor(challenge.difficulty)}`}>
                              {challenge.difficulty}
                            </span>
                          </div>
                        </div>
                        
                        <button className="w-full bg-white border border-emerald-600 text-emerald-600 hover:bg-emerald-50 py-2 rounded-lg font-medium transition-colors">
                          Log Progress
                        </button>
                      </div>
                    </motion.div>
                    </Link>
                  ))}
                </div>
              )}
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Completed Challenges</h2>
              
              {completedChallenges.length === 0 ? (
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <p className="text-gray-500">You haven't completed any challenges yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {completedChallenges.map((challenge, index) => (
                    <Link to={`/challenges/${challenge.id}`} key={challenge.id}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm"
                    >
                      <div className="h-2" style={{ backgroundColor: getCategoryColor(challenge.category) }}></div>
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center">
                            <Award size={18} className="text-amber-500 mr-2" />
                            <h3 className="font-semibold text-gray-800">{challenge.title}</h3>
                          </div>
                          <div className="p-2 rounded-full" style={{ 
                            backgroundColor: `${getCategoryColor(challenge.category)}20`,
                            color: getCategoryColor(challenge.category)
                          }}>
                            {challenge.icon}
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-4">{challenge.description}</p>
                        
                        <div className="flex justify-between text-sm text-gray-600 mb-4">
                          <div className="flex items-center">
                            <Calendar size={14} className="mr-1" />
                            Completed on {challenge.completedDate}
                          </div>
                          <div className="flex items-center">
                            <Leaf size={14} className="mr-1" />
                            Saved {challenge.impactSaved}
                          </div>
                        </div>
                        
                        <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg font-medium transition-colors flex justify-center items-center">
                          View Certificate <ArrowRight size={16} className="ml-1" />
                        </button>
                      </div>
                    </motion.div>
                    </Link>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}
      </div>

      <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-6 border border-emerald-100">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 md:w-2/3">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Create Your Own Challenge</h2>
            <p className="text-gray-600">
              Have a unique idea for a sustainability challenge? Create and share it with the community!
            </p>
          </div>
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Create Challenge
          </button>
        </div>
      </div>
    </div>
  );
};

export default Challenges;