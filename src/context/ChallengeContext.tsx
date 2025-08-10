import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Utensils, ShoppingBag, Car, Zap, Droplet, Home } from 'lucide-react';

// Types
interface Challenge {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  impact: 'Low' | 'Medium' | 'High';
  duration: string;
  participants: number;
  icon: React.ReactNode;
}

interface ActiveChallenge extends Challenge {
  progress: number;
  daysLeft: number;
}

interface CompletedChallenge extends Challenge {
  completedDate: string;
  impactSaved: string;
}

interface ChallengeContextType {
  challenges: Challenge[];
  activeChallenges: ActiveChallenge[];
  completedChallenges: CompletedChallenge[];
  joinChallenge: (challengeId: number) => void;
}

// Initial Data
const initialChallenges: Challenge[] = [
    {
      id: 1,
      title: 'Meatless Monday',
      description: 'Skip meat for one day a week to reduce your carbon footprint',
      category: 'food',
      difficulty: 'Easy',
      impact: 'Medium',
      duration: '4 weeks',
      participants: 2458,
      icon: <Utensils size={20} />
    },
    {
      id: 2,
      title: 'Zero Waste Week',
      description: 'Minimize your waste production for one full week',
      category: 'waste',
      difficulty: 'Medium',
      impact: 'High',
      duration: '1 week',
      participants: 1245,
      icon: <ShoppingBag size={20} />
    },
    {
      id: 3,
      title: 'Public Transport Challenge',
      description: 'Use only public transportation for all your travel needs',
      category: 'transport',
      difficulty: 'Medium',
      impact: 'High',
      duration: '2 weeks',
      participants: 1876,
      icon: <Car size={20} />
    },
    {
      id: 4,
      title: 'Energy Saving Sprint',
      description: 'Reduce your home energy consumption by 20% in one month',
      category: 'energy',
      difficulty: 'Medium',
      impact: 'High',
      duration: '1 month',
      participants: 3241,
      icon: <Zap size={20} />
    },
    {
      id: 5,
      title: '5-Minute Shower',
      description: 'Limit your showers to 5 minutes to conserve water',
      category: 'water',
      difficulty: 'Easy',
      impact: 'Medium',
      duration: '2 weeks',
      participants: 4251,
      icon: <Droplet size={20} />
    },
    {
      id: 6,
      title: 'Plastic-Free Shopping',
      description: 'Avoid all single-use plastics when shopping for one month',
      category: 'waste',
      difficulty: 'Hard',
      impact: 'High',
      duration: '1 month',
      participants: 1548,
      icon: <ShoppingBag size={20} />
    },
    {
      id: 7,
      title: 'Plant Power',
      description: 'Adopt a plant-based diet for two weeks',
      category: 'food',
      difficulty: 'Medium',
      impact: 'High',
      duration: '2 weeks',
      participants: 2134,
      icon: <Utensils size={20} />
    },
    {
      id: 8,
      title: 'Home Energy Audit',
      description: 'Conduct a thorough energy audit of your home and implement changes',
      category: 'energy',
      difficulty: 'Medium',
      impact: 'High',
      duration: '1 month',
      participants: 987,
      icon: <Home size={20} />
    },
];

const initialActiveChallenges: ActiveChallenge[] = [
    {
      id: 2,
      title: 'Zero Waste Week',
      description: 'Minimize your waste production for one full week',
      category: 'waste',
      difficulty: 'Medium',
      impact: 'High',
      duration: '1 week',
      progress: 60,
      daysLeft: 3,
      icon: <ShoppingBag size={20} />,
      participants: 1245
    },
    {
      id: 5,
      title: '5-Minute Shower',
      description: 'Limit your showers to 5 minutes to conserve water',
      category: 'water',
      difficulty: 'Easy',
      impact: 'Medium',
      duration: '2 weeks',
      progress: 85,
      daysLeft: 2,
      icon: <Droplet size={20} />,
      participants: 4251
    }
];

const initialCompletedChallenges: CompletedChallenge[] = [
    {
      id: 1,
      title: 'Meatless Monday',
      description: 'Skip meat for one day a week to reduce your carbon footprint',
      category: 'food',
      difficulty: 'Easy',
      impact: 'Medium',
      duration: '4 weeks',
      completedDate: '2025-05-28',
      impactSaved: '52 kg CO₂e',
      icon: <Utensils size={20} />,
      participants: 2458
    }
];

// Context
const ChallengeContext = createContext<ChallengeContextType | undefined>(undefined);

// Provider
export const ChallengeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [challenges, setChallenges] = useState<Challenge[]>(initialChallenges.filter(c => !initialActiveChallenges.some(ac => ac.id === c.id) && !initialCompletedChallenges.some(cc => cc.id === c.id)));
  const [activeChallenges, setActiveChallenges] = useState<ActiveChallenge[]>(initialActiveChallenges);
  const [completedChallenges] = useState<CompletedChallenge[]>(initialCompletedChallenges);

  const joinChallenge = (challengeId: number) => {
    const challengeToJoin = challenges.find(c => c.id === challengeId);
    if (challengeToJoin) {
      const newActiveChallenge: ActiveChallenge = {
        ...challengeToJoin,
        progress: 0,
        daysLeft: parseInt(challengeToJoin.duration) * 7 // simplified
      };
      setChallenges(challenges.filter(c => c.id !== challengeId));
      setActiveChallenges([...activeChallenges, newActiveChallenge]);
    }
  };

  return (
    <ChallengeContext.Provider value={{ challenges, activeChallenges, completedChallenges, joinChallenge }}>
      {children}
    </ChallengeContext.Provider>
  );
};

// Hook
export const useChallenges = () => {
  const context = useContext(ChallengeContext);
  if (context === undefined) {
    throw new Error('useChallenges must be used within a ChallengeProvider');
  }
  return context;
};
