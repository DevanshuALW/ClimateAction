import React from 'react';
import { motion } from 'framer-motion';

interface Challenge {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  impact: string;
  progress: number;
}

interface ChallengeCardProps {
  challenge: Challenge;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge }) => {
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
    <div className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
      <h3 className="font-semibold text-gray-800 mb-1">{challenge.title}</h3>
      <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
      
      <div className="flex space-x-2 mb-3">
        <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(challenge.difficulty)}`}>
          {challenge.difficulty}
        </span>
        <span className={`text-xs px-2 py-1 rounded-full ${getImpactColor(challenge.impact)}`}>
          {challenge.impact} Impact
        </span>
      </div>
      
      <div className="relative pt-1">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block text-emerald-800">
              Progress
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-emerald-800">
              {challenge.progress}%
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-1 text-xs flex rounded bg-emerald-100">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${challenge.progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500"
          ></motion.div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;