import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Steps } from 'intro.js-react';
import { avatars, tutorialStepsChat } from '../data';
import ChatListItem from '../components/ChatListItem.jsx';
import { useBuddy } from '../context/BuddyContext';
import { useTheme } from '../components/ThemeProvider';

const ChatHomePage = ({ activeChats }) => {
  const { buddyDetails } = useBuddy();
  const { theme } = useTheme();

  const [stepsEnabled, setStepsEnabled] = useState(false);

  useEffect(() => {
    const handle = setTimeout(() => {
      const tutorialCompleted = localStorage.getItem('tutorial_ChatHomePage');
      if (tutorialCompleted !== 'true') {
        setStepsEnabled(true);
      }
    }, 1000);

    return () => clearTimeout(handle);
  }, []);

  const onTutorialComplete = () => {
    localStorage.setItem('tutorial_ChatHomePage', 'true');
    setStepsEnabled(false);
  };

  const onExit = (stepIndex) => {
    // Check if we're on the last step (intro.js uses 0-based indexing)
    if (stepIndex === tutorialStepsChat.length - 1) {
      onTutorialComplete();
    } else {
      setStepsEnabled(false);
    }
  }

  const replayTutorial = () => {
    setStepsEnabled(true);
  };

  if (!buddyDetails) {
    return (
      <div className="p-4 text-center flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Welcome to Your Chats!</h1>
        <p className="mb-6 max-w-xs">To start chatting with your buddy, you first need to find out who suits you best.</p>
        <Link to="/quiz-intro" className="px-6 py-3 bg-blue-500 text-white font-bold rounded-full shadow-lg">
          Take the Persona Quiz
        </Link>
      </div>
    );
  }

  return (
    <div className={`p-4 min-h-screen ${theme.background}`}>
      <Steps
        enabled={stepsEnabled}
        steps={tutorialStepsChat}
        initialStep={0}
        onExit={onExit}
        onComplete={onTutorialComplete}
      />
      <div className="bg-white/50 p-4 rounded-xl text-center mb-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">Chats</h1>
      </div>

      <div id="chat-list-container" className="flex-1 p-4 space-y-4">
        <Link to={`/chat/${buddyDetails.name.toLowerCase()}`}>
          <div className="flex items-center gap-4 mb-8 p-4 bg-white/80 rounded-xl shadow-lg hover:scale-105 transition-transform">
            <img src={buddyDetails.image} alt={buddyDetails.name} className="w-20 h-20" />
            <div className="text-left text-gray-800">
              <p className="font-bold text-xl">{buddyDetails.name}</p>
              <p className="text-sm">This is the beginning of your journey with {buddyDetails.name}!</p>
            </div>
          </div>
        </Link>
        <div className="p-4 bg-white/50 rounded-xl">
          <Link id="connect-button" to="/connect" className="text-blue-600 font-bold">
            + Connect with others!
          </Link>
        </div>
      </div>
      <button onClick={replayTutorial} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full shadow-lg">
        Play Tutorial
      </button>
    </div>
  );
};

export default ChatHomePage;
