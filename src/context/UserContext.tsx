import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Award, Leaf, Map, ShoppingBag } from 'lucide-react';

// Types
interface User {
  name: string;
  email: string;
  location: string;
  joinDate: string;
  avatar: string;
}

interface UserStats {
  carbonSaved: string;
  activeChallenges: number;
  completedChallenges: number;
  ecoPoints: number;
  trees: number;
  waterSaved: string;
}

interface Badge {
  id: number;
  name: string;
  description: string;
  icon: React.ReactNode;
}

interface Activity {
  id: number;
  type: string;
  title: string;
  date: string;
  icon: React.ReactNode;
}

interface UserContextType {
  user: User;
  stats: UserStats;
  badges: Badge[];
  activityFeed: Activity[];
  updateUser: (newUserData: Partial<User>) => void;
}

// Initial Data
const initialUser: User = {
  name: 'Emma Johnson',
  email: 'emma@example.com',
  location: 'Seattle, WA',
  joinDate: 'March 2025',
  avatar: 'https://images.pexels.com/photos/3771807/pexels-photo-3771807.jpeg?auto=compress&cs=tinysrgb&w=400',
};

const initialStats: UserStats = {
  carbonSaved: '3.2 tons',
  activeChallenges: 2,
  completedChallenges: 7,
  ecoPoints: 1240,
  trees: 12,
  waterSaved: '2,450 gal'
};

const initialBadges: Badge[] = [
    { id: 1, name: 'Early Adopter', description: 'Joined ClimateAction in our first month', icon: '🌱' },
    { id: 2, name: 'Challenge Champion', description: 'Completed 5+ eco challenges', icon: '🏆' },
    { id: 3, name: 'Carbon Reducer', description: 'Reduced carbon footprint by 20%', icon: '🌍' },
    { id: 4, name: 'Community Leader', description: 'Organized a local climate initiative', icon: '👥' },
    { id: 5, name: 'Eco Shopper', description: 'Made 10+ purchases from sustainable brands', icon: '🛍️' }
];

const initialActivityFeed: Activity[] = [
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
      icon: <Leaf className="text-emerald-500" size={18} />
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
      icon: <ShoppingBag className="text-purple-500" size={18} />
    }
];

// Context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(initialUser);
  const [stats] = useState<UserStats>(initialStats);
  const [badges] = useState<Badge[]>(initialBadges);
  const [activityFeed] = useState<Activity[]>(initialActivityFeed);

  const updateUser = (newUserData: Partial<User>) => {
    setUser(prevUser => ({ ...prevUser, ...newUserData }));
  };

  return (
    <UserContext.Provider value={{ user, stats, badges, activityFeed, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
