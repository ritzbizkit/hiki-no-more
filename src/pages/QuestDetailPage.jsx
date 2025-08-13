import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from '@heroicons/react/24/solid';
import { Steps } from 'intro.js-react';
import { questData, resultsData, tutorialStepsQuestDetail } from '../data.js';
import { QuestUtils } from '../api.js';
import { useTheme } from '../components/ThemeProvider';
import { questRouteMapping } from '../questRoutes.js';

const QuestDetailPage = () => {
  const { buddyName, arcName } = useParams();
  const { theme } = useTheme();

  const [stepsEnabled, setStepsEnabled] = useState(false);

  useEffect(() => {
    const handle = setTimeout(() => {
      const tutorialCompleted = localStorage.getItem('tutorial_QuestDetailPage');
      if (tutorialCompleted !== 'true') {
        setStepsEnabled(true);
      }
    }, 1000);

    return () => clearTimeout(handle);
  }, []);

  const onTutorialComplete = () => {
    localStorage.setItem('tutorial_QuestDetailPage', 'true');
    setStepsEnabled(false);
  };

  const onExit = (stepIndex) => {
    // Check if we're on the last step (intro.js uses 0-based indexing)
    if (stepIndex === tutorialStepsQuestDetail.length - 1) {
      onTutorialComplete();
    } else {
      setStepsEnabled(false);
    }
  };

  const replayTutorial = () => {
    setStepsEnabled(true);
  };
  
  const buddyQuestData = questData[buddyName] || {};
  const arc = buddyQuestData[arcName];
  const buddyInfo = resultsData[buddyName];
  
  const arcKeys = Object.keys(buddyQuestData);
  const currentIndex = arcKeys.indexOf(arcName);
  const nextArcIndex = (currentIndex + 1) % arcKeys.length;
  const prevArcIndex = (currentIndex - 1 + arcKeys.length) % arcKeys.length;
  const nextArcKey = arcKeys[nextArcIndex];
  const prevArcKey = arcKeys[prevArcIndex];

  // Get completed quests for this buddy and arc
  const completedQuests = QuestUtils.getCompletedQuests(buddyName, arcName);

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
    { bottom: '15%', right: '25%' },
    { bottom: '59%', right: '25%' },
    { bottom: '39%', right: '25%' },
    { bottom: '76%', left: '25%' },
  ];

  return (
    <div className={`min-h-dvh p-4 flex flex-col ${theme.background}`}>
      <Steps
        enabled={stepsEnabled}
        steps={tutorialStepsQuestDetail}
        initialStep={0}
        onExit={onExit}
        onComplete={onTutorialComplete}
      />
      <div className="flex items-center justify-between text-gray-800 mb-4" id="quest-detail-header">
        <Link to="/quests" id="back-to-quests"> <ChevronLeftIcon className="w-8 h-8" /> </Link>
        <h1 className="text-3xl font-bold">Quests</h1>
        <div className="w-8"></div>
      </div>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">{arc.title}</h2>
      </div>
      <div className="relative flex-grow flex items-center justify-between mt-12">
        <Link to={`/quests/${buddyName}/${prevArcKey}`} className="h-full flex items-center px-2 z-10" id="prev-arc">
          <ChevronLeftIcon className="w-10 h-10 text-gray-400" />
        </Link>
        <div id="buddy-image" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <img src={buddyInfo.image} alt={buddyInfo.name} className="w-32 h-32 opacity-30" />
        </div>
        {starPositions.map((position, index) => {
            const isCompleted = completedQuests.includes(index.toString());
            return (
              <Link
                  key={index} 
                  to={`/quests/${buddyName}/${arcName}/${index}`}
                  id={`quest-star-${index + 1}`}
                  className="absolute w-16 h-16 bg-white/80 rounded-full flex items-center justify-center shadow-lg border-2 border-white transition-transform hover:scale-110"
                  style={{ ...position }} >
                  <StarIcon className={`w-10 h-10 ${isCompleted ? 'text-yellow-400' : 'text-gray-400/60'}`} />
                  <p>{questRouteMapping[`${buddyName}-${arcName}-${index}`]}</p>
              </Link>
            );
        })}
        <Link to={`/quests/${buddyName}/${nextArcKey}`} className="h-full flex items-center px-2 z-10" id="next-arc">
          <ChevronRightIcon className="w-10 h-10 text-gray-400" />
        </Link>
      </div>
      <button onClick={replayTutorial} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full shadow-lg self-center">
        Play Tutorial
      </button>
    </div>
  );
};

export default QuestDetailPage;
