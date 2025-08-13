import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Steps } from 'intro.js-react';
import { useBuddy } from '../context/BuddyContext';
import { useTheme } from '../components/ThemeProvider';
import { questData, tutorialStepsQuests } from '../data';
import Card from '../components/Card';

const ArcCard = ({ arcKey, title, buddyName }) => {
  const questLink = `/quests/${buddyName}/${arcKey}`;

  return (
    <Link to={questLink}>
      <div className="bg-white p-4 rounded-2xl shadow-sm hover:bg-gray-50 active:scale-95 transition-transform">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-gray-700">{title}</h3>
          <span className="text-sm text-blue-500 font-semibold">see quests &gt;</span>
        </div>
        <div className="relative w-full h-2.5">
          <div className="absolute top-0 left-0 w-full bg-gray-200 rounded-full h-2.5"></div>
          <div className="absolute top-0 left-0 bg-blue-400 h-2.5 rounded-full" style={{ width: '50%' }}></div>
          <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-blue-400 rounded-full" style={{ left: '50%' }}></div>
        </div>
      </div>
    </Link>
  );
};

const QuestJourneyPage = () => {
  const { buddyDetails } = useBuddy();
  const { theme } = useTheme();

  const [stepsEnabled, setStepsEnabled] = useState(false);

  useEffect(() => {
    const handle = setTimeout(() => {
      const tutorialCompleted = localStorage.getItem('tutorial_QuestJourneyPage');
      if (tutorialCompleted !== 'true') {
        setStepsEnabled(true);
      }
    }, 1000);

    return () => clearTimeout(handle);
  }, []);

  const onTutorialComplete = () => {
    localStorage.setItem('tutorial_QuestJourneyPage', 'true');
    setStepsEnabled(false);
  };

  const onExit = (stepIndex) => {
    // Check if we're on the last step (intro.js uses 0-based indexing)
    if (stepIndex === tutorialStepsQuests.length - 1) {
      onTutorialComplete();
    } else {
      setStepsEnabled(false);
    }
  };

  const replayTutorial = () => {
    setStepsEnabled(true);
  };

  if (!buddyDetails) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome to your Quest Journey!</h1>
        <p className="mb-6">First, you need to find out which buddy suits you best.</p>
        <Link to="/" className="px-6 py-3 bg-blue-500 text-white font-bold rounded-full">
          Take the Persona Quiz
        </Link>
      </div>
    );
  }

  const buddyName = buddyDetails.name.toLowerCase();
  const buddyQuestData = questData[buddyName] || {};
  const arcKeys = Object.keys(buddyQuestData);

  return (
    <div className={`p-4 min-h-dvh ${theme.background}`}>
      <Steps
        enabled={stepsEnabled}
        steps={tutorialStepsQuests}
        initialStep={0}
        onExit={onExit}
        onComplete={onTutorialComplete}
      />
      <Card className="text-center mb-6">
        <h1 className={`text-2xl font-bold ${theme.text}`}>Quest Journey</h1>
      </Card>
      
      <Card className="flex items-center gap-4 mb-8">
        <img src={buddyDetails.image} alt={buddyDetails.name} className="w-24 h-24" />
        <div className={`text-left ${theme.text}`}>
          <p className="font-bold text-lg">8/16 quests completed!</p>
          <p>Reach stage 2 on every arc to evolve {buddyDetails.name}!</p>
        </div>
      </Card>

      <div id="quest-list" className="space-y-4">
        {arcKeys.map(key => (
          <ArcCard 
            key={key}
            arcKey={key}
            title={buddyQuestData[key].title}
            buddyName={buddyName}
          />
        ))}
      </div>
      <button onClick={replayTutorial} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full shadow-lg">
        Play Tutorial
      </button>
    </div>
  );
};

export default QuestJourneyPage;
