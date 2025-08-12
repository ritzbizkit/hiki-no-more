import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { Steps } from 'intro.js-react';

// Import our hooks and themed components
import { useTheme } from '../components/ThemeProvider';
import { useBuddy } from '../context/BuddyContext';
import Card from '../components/Card';
// This import must be correct
import { tutorialStepsGroupChat } from '../data';

const fullConversation = [
  { sender: 'user', text: "Hey! I havent heard from you in awhile. Everything ok?" },
  { sender: 'buddy', text: "Honestly, I've been feeling really burnt out lately.", showPromptIcon: true },
  { sender: 'user', text: "That sounds tough... Want to talk about it?", showPromptIcon: true },
];

const promptMessage = {
  sender: 'prompt',
  text: "They're opening up emotionally — that's a chance to show empathy. You don't have to fix it. Just acknowledge how they feel."
};

const GroupChatPage = () => {
  const { participants } = useParams();
  const { theme } = useTheme();
  const { buddyDetails } = useBuddy();
  
  const [isPromptVisible, setPromptVisible] = useState(false);
  const [stepsEnabled, setStepsEnabled] = useState(false);

  useEffect(() => {
    const handle = setTimeout(() => {
      const tutorialCompleted = localStorage.getItem('groupChatTutorialCompleted');
      if (tutorialCompleted !== 'true') {
        setStepsEnabled(true);
      }
    }, 500);

    return () => clearTimeout(handle);
  }, []);

  const onTutorialComplete = () => {
    localStorage.setItem('groupChatTutorialCompleted', 'true');
    setStepsEnabled(false);
  };

  const onExit = () => {
    setStepsEnabled(false);
  };

  const replayTutorial = () => {
    setStepsEnabled(true);
  };

  const names = participants.split('-');
  const buddyName = names[0] || 'Buddy';
  const otherPersonName = names[1] || 'Friend';
  const title = `${buddyName.charAt(0).toUpperCase() + buddyName.slice(1)}, ${otherPersonName.charAt(0).toUpperCase() + otherPersonName.slice(1)}`;

  const handlePromptClick = (event) => {
    event.stopPropagation();
    setPromptVisible(prev => !prev);
  };

  return (
    <div className={`h-screen flex flex-col ${theme.background}`}>
      <Steps
        enabled={stepsEnabled}
        steps={tutorialStepsGroupChat}
        initialStep={0}
        onExit={onExit}
        onComplete={onTutorialComplete}
      />
      <Card className={`text-center relative !rounded-t-none !rounded-b-xl ${theme.primary}`}>
        <Link id="back-button" to="/connect" className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme.text}`}>
          <ChevronLeftIcon className="w-8 h-8" />
        </Link>
        <div id="chat-header" className="flex justify-center items-center gap-2">
          {buddyDetails && <img src={buddyDetails.image} alt={buddyDetails.name} className="w-8 h-8 rounded-full" />}
          <UserCircleIcon className="w-8 h-8 text-gray-400" />
          <h1 className={`text-xl font-bold ${theme.text}`}>{title}</h1>
        </div>
      </Card>
      
      <div id="live-mode-banner" className="text-center p-2 bg-white border-b">
        <Link to="/live-mode" className="btn btn-ghost btn-sm">
          {buddyDetails && <img src={buddyDetails.image} alt="Buddy Icon" className="w-6 h-6 mr-2" />}
          Hold me for live mode!
        </Link>
      </div>

      <div className="flex-grow p-4 space-y-4 overflow-y-auto">
        {fullConversation.map((msg, index) => (
          <div key={index} className={`chat ${msg.sender === 'user' ? 'chat-end' : 'chat-start'}`}>
            <div className={`chat-bubble relative ${msg.sender === 'user' ? `${theme.primary} ${theme.accentText}` : 'bg-gray-200 text-gray-800'}`}>
              {msg.text}
              {msg.showPromptIcon && buddyDetails && (
                <button id="prompt-icon" onClick={handlePromptClick} className="absolute bottom-1 right-2">
                  <img src={buddyDetails.image} alt="prompt icon" className="w-4 h-4 opacity-50" />
                </button>
              )}
            </div>
          </div>
        ))}
        {isPromptVisible && buddyDetails && (
          <div id="prompt-message" className="my-4 p-4 bg-pink-100 text-pink-800 rounded-xl shadow-md border border-pink-200 relative">
            <div className="flex items-start gap-2">
              <img src={buddyDetails.image} alt="Nervy Icon" className="w-5 h-5 opacity-70" />
              <p className="text-sm">{promptMessage.text}</p>
            </div>
          </div>
        )}
      </div>

      <div id="message-input" className="p-4 bg-white">
        <input type="text" placeholder="Type your message..." className="input input-bordered w-full rounded-full bg-gray-100" />
      </div>
      <button onClick={replayTutorial} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full shadow-lg">
        Play Tutorial
      </button>
    </div>
  );
};

export default GroupChatPage;