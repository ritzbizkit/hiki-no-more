import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { questData } from '../data.js';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';

const QuestDetailPage = () => {
  const { buddyName, arcName } = useParams();
  const arc = questData[buddyName]?.arcs[arcName];

  if (!arc) {
    return <div>Arc not found!</div>;
  }

  return (
    <div style={{ backgroundColor: '#FBFBFE' }} className="p-4 min-h-screen">
      <div className="bg-blue-100 p-4 rounded-xl text-center relative mb-6 shadow-sm">
        <Link to="/quests" className="absolute left-4 top-4">
          <ChevronLeftIcon className="w-8 h-8 text-gray-800" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">{arc.title}</h1>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
        <p className="font-bold text-gray-700">Arc completion: {arc.completion}</p>
        <p className="text-sm text-gray-500 mt-1">{arc.description}</p>
      </div>
      <div className="space-y-3">
        {arc.quests.map((quest, index) => (
          <div key={index} className="bg-white p-4 rounded-xl shadow-sm">
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-gray-800">{quest.title}</h3>
              <span className="font-semibold text-green-500">{quest.points}</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{quest.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestDetailPage;