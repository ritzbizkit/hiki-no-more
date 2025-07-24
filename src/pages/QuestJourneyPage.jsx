import React from 'react';
import { Link } from 'react-router-dom';
import { questData } from '../data.js';
import { useBuddy } from '../context/BuddyContext.jsx';

const ArcCard = ({ buddyKey, arcKey, title }) => (
  <Link to={`/quests/${buddyKey}/${arcKey}`}>
    <div className="bg-white p-4 rounded-2xl shadow-sm hover:bg-gray-50 active:scale-95 transition-transform">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-gray-700">{title}</h3>
        <span className="text-sm text-blue-500 font-semibold">see quests &gt;</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-blue-400 h-2.5 rounded-full" style={{ width: '50%' }}></div>
      </div>
    </div>
  </Link>
);

const QuestJourneyPage = () => {
  const { chosenBuddy } = useBuddy();
  const buddyKey = chosenBuddy.name.toLowerCase();
  const buddyQuests = questData[buddyKey];

  if (!buddyQuests) {
    return <div>Quests for this buddy are not available yet.</div>
  }

  return (
    <div style={{ backgroundColor: '#FBFBFE' }} className="p-4 min-h-screen">
      <div className="bg-blue-100 p-4 rounded-xl text-center mb-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">Quest Journey</h1>
      </div>
      <div className="flex items-center gap-4 mb-8">
        <img src={chosenBuddy.imageSrc} alt={chosenBuddy.name} className="w-24 h-24" />
        <div className="text-left">
          <p className="font-bold text-lg text-gray-800">8/16 completed!</p>
          <p className="text-gray-600">Reach stage 2 on every arc to evolve {chosenBuddy.name}!</p>
        </div>
      </div>
      <div className="space-y-4">
        {Object.keys(buddyQuests.arcs).map(arcKey => (
          <ArcCard 
            key={arcKey}
            buddyKey={buddyKey}
            arcKey={arcKey} 
            title={buddyQuests.arcs[arcKey].title} 
          />
        ))}
      </div>
    </div>
  );
};

export default QuestJourneyPage;