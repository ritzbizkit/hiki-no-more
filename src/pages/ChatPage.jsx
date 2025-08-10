import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBuddy } from '../context/BuddyContext';
import { useTheme } from '../components/ThemeProvider';
import { resultsData } from '../data.js';
import Card from '../components/Card';
import { UserCircleIcon } from '@heroicons/react/24/outline';

const ChatPage = () => {
  const navigate = useNavigate();
  const { chosenBuddy, setChosenBuddy } = useBuddy();
  const { theme } = useTheme();

  const buddyDetails = resultsData[chosenBuddy];

  if (!buddyDetails) {
    return <div>No active buddy found. Please go back and select a buddy.</div>;
  }
  
  // Dummy message for placeholder
  const dummyMessage = { sender: 'buddy', text: "Hey! I haven't heard from you in awhile. Everything ok?" };

  return (
    <div className={`flex flex-col h-screen ${theme.background}`}>
      {/* Header, using the Card component and styled like GroupChatPage */}
      <Card className={`text-center relative !rounded-t-none !rounded-b-xl ${theme.primary}`}>
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
      <div className="p-4 bg-white">
        <input type="text" placeholder="Type your message..." className="input input-bordered w-full rounded-full bg-gray-100" />
      </div>
    </div>
  );
};

export default ChatPage;