import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { UserCircleIcon } from '@heroicons/react/24/outline';

// Import our hooks and themed components
import { useTheme } from '../components/ThemeProvider';
import { useBuddy } from '../context/BuddyContext';
import Card from '../components/Card';

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
  const { participants } = useParams(); // e.g., "nervy-rittu"
  const { theme } = useTheme();
  const { buddyDetails } = useBuddy();
  
  const [visibleCount, setVisibleCount] = useState(1);
  const [isPromptVisible, setPromptVisible] = useState(false);

  // Decode the names from the URL parameter
  const names = participants.split('-');
  const buddyName = names[0] || 'Buddy';
  const otherPersonName = names[1] || 'Friend';
  const title = `${buddyName.charAt(0).toUpperCase() + buddyName.slice(1)}, ${otherPersonName.charAt(0).toUpperCase() + otherPersonName.slice(1)}`;


  const handleScreenClick = () => {
    if (!isPromptVisible && visibleCount < fullConversation.length) {
      setVisibleCount(prevCount => prevCount + 1);
    }
  };

  const handlePromptClick = (event) => {
    event.stopPropagation();
    setPromptVisible(prev => !prev);
  };

  const messagesToDisplay = fullConversation.slice(0, visibleCount);

  return (
    <div className={`h-screen flex flex-col ${theme.background}`} onClick={handleScreenClick}>
      {/* UPDATED: Header now uses the themed Card component */}
      <Card className={`text-center relative !rounded-t-none !rounded-b-xl ${theme.primary}`}>
        <Link to="/connect" className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme.text}`}>
          <ChevronLeftIcon className="w-8 h-8" />
        </Link>
        <div className="flex justify-center items-center gap-2">
            {/* The buddy avatar is now dynamic */}
            {buddyDetails && <img src={buddyDetails.image} alt={buddyDetails.name} className="w-8 h-8 rounded-full" />}
            <UserCircleIcon className="w-8 h-8 text-gray-400" />
            <h1 className={`text-xl font-bold ${theme.text}`}>{title}</h1>
        </div>
      </Card>
      
      {/* "Hold me for live mode!" banner */}
      <div className="text-center p-2 bg-white border-b">
        <Link to="/live-mode" className="btn btn-ghost btn-sm">
          {buddyDetails && <img src={buddyDetails.image} alt="Buddy Icon" className="w-6 h-6 mr-2" />}
          Hold me for live mode!
        </Link>
      </div>

      {/* Chat Area */}
      <div className="flex-grow p-4 space-y-4 overflow-y-auto">
        {messagesToDisplay.map((msg, index) => (
          <div key={index} className={`chat ${msg.sender === 'user' ? 'chat-end' : 'chat-start'}`}>
            <div className={`chat-bubble relative ${msg.sender === 'user' ? `${theme.primary} ${theme.accentText}` : 'bg-gray-200 text-gray-800'}`}>
              {msg.text}
              {msg.showPromptIcon && buddyDetails && (
                <button onClick={handlePromptClick} className="absolute bottom-1 right-2">
                  <img src={buddyDetails.image} alt="prompt icon" className="w-4 h-4 opacity-50" />
                </button>
              )}
            </div>
          </div>
        ))}

        {isPromptVisible && buddyDetails && (
          <div className="my-4 p-4 bg-pink-100 text-pink-800 rounded-xl shadow-md border border-pink-200 relative">
            <div className="flex items-start gap-2">
              <img src={buddyDetails.image} alt="Nervy Icon" className="w-5 h-5 opacity-70" />
              <p className="text-sm">{promptMessage.text}</p>
            </div>
          </div>
        )}
      </div>

      {/* Text Input */}
      <div className="p-4 bg-white">
        <input type="text" placeholder="Type your message..." className="input input-bordered w-full rounded-full bg-gray-100" />
      </div>
    </div>
  );
};

export default GroupChatPage;