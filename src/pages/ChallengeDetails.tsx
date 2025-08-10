import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useChallenges } from '../context/ChallengeContext';
import { ArrowLeft } from 'lucide-react';

const ChallengeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { challenges, activeChallenges, completedChallenges } = useChallenges();

  const allChallenges = [...challenges, ...activeChallenges, ...completedChallenges];
  const challenge = allChallenges.find(c => c.id === parseInt(id || ''));

  if (!challenge) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">Challenge not found</h1>
        <Link to="/challenges" className="text-emerald-600 hover:underline mt-4 inline-block">
          Back to Challenges
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/challenges" className="text-emerald-600 hover:underline mb-4 inline-flex items-center">
        <ArrowLeft size={16} className="mr-1" />
        Back to Challenges
      </Link>
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex justify-between items-start mb-3">
          <h1 className="text-3xl font-bold text-gray-800">{challenge.title}</h1>
          <div className="p-2 rounded-full" style={{
            backgroundColor: 'lightgray',
            color: 'black'
          }}>
            {challenge.icon}
          </div>
        </div>
        <p className="text-lg text-gray-600 mb-4">{challenge.description}</p>
        {/* Add more details here */}
      </div>
    </div>
  );
};

export default ChallengeDetails;
