import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from '@heroicons/react/24/solid';
import { questData, resultsData } from '../data.js';
import { useTheme } from '../components/ThemeProvider';

const QuestDetailPage = () => {
  const { buddyName, arcName } = useParams();
  const { theme } = useTheme();

  const buddyQuestData = questData[buddyName] || {};
  const arc = buddyQuestData[arcName];
  const buddyInfo = resultsData[buddyName];
  
  const arcKeys = Object.keys(buddyQuestData);
  const currentIndex = arcKeys.indexOf(arcName);
  const nextArcIndex = (currentIndex + 1) % arcKeys.length;
  const prevArcIndex = (currentIndex - 1 + arcKeys.length) % arcKeys.length;
  const nextArcKey = arcKeys[nextArcIndex];
  const prevArcKey = arcKeys[prevArcIndex];

  if (!arc || !buddyInfo) {
    return (
      <div className="p-4">
        <h1 className="text-red-500">Error</h1>
        <p>Could not find data for this quest page.</p>
        <Link to="/quests" className="text-blue-500">Go Back</Link>
      </div>
    );
  }
  
  const starPositions = [
    { bottom: '8%', left: '25%' },
    { bottom: '25%', right: '25%' },
    // This star has been removed as per your request
    { bottom: '59%', right: '25%' },
    { bottom: '76%', left: '25%' },
  ];
  const currentQuestIndex = 0;

  return (
    <div className={`min-h-screen p-4 flex flex-col ${theme.background}`}>
      <div className="flex items-center justify-between text-gray-800 mb-4">
        <Link to="/quests"> <ChevronLeftIcon className="w-8 h-8" /> </Link>
        <h1 className="text-3xl font-bold">Quests</h1>
        <div className="w-8"></div>
      </div>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">{arc.title}</h2>
      </div>
      <div className="relative flex-grow flex items-center justify-between mt-12">
        <Link to={`/quests/${buddyName}/${prevArcKey}`} className="h-full flex items-center px-2 z-10">
          <ChevronLeftIcon className="w-10 h-10 text-gray-400" />
        </Link>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <img src={buddyInfo.image} alt={buddyInfo.name} className="w-32 h-32 opacity-30" />
        </div>
        {starPositions.map((position, index) => (
            <Link
                key={index} to={`/quests/${buddyName}/${arcName}/${index}`}
                className="absolute w-16 h-16 bg-white/80 rounded-full flex items-center justify-center shadow-lg border-2 border-white transition-transform hover:scale-110"
                style={{ ...position }} >
                {index === currentQuestIndex ? 
                    (<StarIcon className="w-10 h-10 text-yellow-400" />) : 
                    (<StarIcon className="w-10 h-10 text-gray-400/60" />)
                }
            </Link>
        ))}
        <Link to={`/quests/${buddyName}/${nextArcKey}`} className="h-full flex items-center px-2 z-10">
          <ChevronRightIcon className="w-10 h-10 text-gray-400" />
        </Link>
      </div>
    </div>
  );
};

export default QuestDetailPage;