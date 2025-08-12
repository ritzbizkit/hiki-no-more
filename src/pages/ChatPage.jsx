import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Steps } from 'intro.js-react';
import { useBuddy } from '../context/BuddyContext';
import { useTheme } from '../components/ThemeProvider';
import { resultsData, tutorialStepsChatPage } from '../data.js';
import Card from '../components/Card';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';

const ChatPage = () => {
  const navigate = useNavigate();
  const { chosenBuddy, setChosenBuddy } = useBuddy();
  const { theme } = useTheme();

  const buddyDetails = resultsData[chosenBuddy];
  
  const [stepsEnabled, setStepsEnabled] = useState(false);

  useEffect(() => {
    const tutorialCompleted = localStorage.getItem('chatPageTutorialCompleted');
    if (tutorialCompleted !== 'true') {
      setStepsEnabled(true);
    }
  }, []);

  const onTutorialComplete = () => {
    localStorage.setItem('chatPageTutorialCompleted', 'true');
    setStepsEnabled(false);
  };

  const onExit = () => {
    setStepsEnabled(false);
  };

  const replayTutorial = () => {
    setStepsEnabled(true);
  };

  if (!buddyDetails) {
    return <div>No active buddy found. Please go back and select a buddy.</div>;
  }
  
  // Dummy message for placeholder
  const dummyMessage = { sender: 'buddy', text: "Hey! I haven't heard from you in awhile. Everything ok?" };

  return (
    <div className={`flex flex-col h-screen ${theme.background} relative`}>
      <Steps
        enabled={stepsEnabled}
        steps={tutorialStepsChatPage}
        initialStep={0}
        onExit={onExit}
        onComplete={onTutorialComplete}
      />
      {/* Header, using the Card component and styled like GroupChatPage */}
      <Card id="chat-header" className={`text-center relative !rounded-t-none !rounded-b-xl ${theme.primary}`}>
        <span 
          className={`absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-800 ${theme.text}`}
          onClick={() => navigate(-1)}
        >
          &larr;
        </span>
        <div className="flex justify-center items-center gap-2">
          {buddyDetails && <img src={buddyDetails.image} alt={buddyDetails.name} className="w-8 h-8 rounded-full" />}
          <h1 className={`text-xl font-bold ${theme.text}`}>{buddyDetails.name}</h1>
        </div>
        <span 
          className={`absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-800 ${theme.text}`}
        >
          ...
        </span>
      </Card>
      
      {/* Chat Area */}
      <div className="flex-grow p-4 space-y-4 overflow-y-auto">
        <div className={`chat chat-start`}>
          <div className={`chat-bubble relative bg-gray-200 text-gray-800`}>
            {dummyMessage.text}
          </div>
        </div>
      </div>

      {/* Text Input */}
      <div id="message-input" className="p-4 bg-white">
        <input type="text" placeholder="Type your message..." className="input input-bordered w-full rounded-full bg-gray-100" />
      </div>

      {/* Replay Tutorial Button */}
      <button onClick={replayTutorial} className="absolute bottom-4 right-4 bg-blue-500 text-white rounded-full p-3 shadow-lg">
        Play Tutorial
      </button>
    </div>
  );
};

export default ChatPage;