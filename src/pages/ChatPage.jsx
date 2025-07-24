import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { useKeyboard } from '../context/KeyboardContext.jsx';
import { useBuddy } from '../context/BuddyContext.jsx';

// 1. The full, ordered conversation is stored here
const fullConversation = [
  { sender: 'user', text: "I told a joke in my friend group, and no one laughed. Now I feel so stupid." },
  { sender: 'buddy', text: "Oof, I totally get that sinking feeling! I've had that happen too. The silence is so loud!" },
  { sender: 'buddy', text: "But hey, one quiet moment doesn't define you. People might've just been distracted. It doesn't mean you're not funny or likable." },
  { sender: 'user', text: "Okay, thanks! I feel better now!" },
];

const ChatPage = () => {
  const { showKeyboard, hideKeyboard } = useKeyboard();
  const { chosenBuddy } = useBuddy();
  const { buddyName } = useParams();
  
  // 2. State to manage the sequence
  const [visibleMessages, setVisibleMessages] = useState(1);
  const [headerState, setHeaderState] = useState('default'); // 'default', 'questComplete', 'levelUp'
  
  const buddy = chosenBuddy || { name: buddyName, imageSrc: '/nervy1.svg' };
  const displayName = buddy.name.charAt(0).toUpperCase() + buddy.name.slice(1);

  // 3. This function controls the entire sequence on each click
  const handleNextStep = () => {
    // If there are more messages to show, show the next one
    if (visibleMessages < fullConversation.length) {
      setVisibleMessages(current => current + 1);
    } 
    // If all messages are shown, start the header sequence
    else if (headerState === 'default') {
      setHeaderState('questComplete');
    } 
    else if (headerState === 'questComplete') {
      setHeaderState('levelUp');
    }
  };

  const getHeaderContent = () => {
    if (headerState === 'levelUp') {
      return (
        <>
          <img src="/nervy2.svg" alt={`${displayName} Leveled Up`} className="w-16 h-16 mx-auto mb-2" />
          <h1 className="text-2xl font-bold text-gray-800">{displayName} Leveled up!</h1>
        </>
      );
    }
    if (headerState === 'questComplete') {
      return (
        <>
          <img src={buddy.imageSrc} alt={displayName} className="w-16 h-16 mx-auto mb-2" />
          <p className="text-gray-600">We all need help!</p>
          <h1 className="text-2xl font-bold text-gray-800">Quest Completed!</h1>
        </>
      );
    }
    // Default chat header
    return (
      <>
        <h1 className="text-xl font-bold text-gray-800">Chat with {displayName}!</h1>
        <Link to="/quests" className="flex justify-center items-center gap-2 mt-2 text-sm text-gray-600">
          <img src={buddy.imageSrc} alt={displayName} className="w-6 h-6" />
          <p>Tap to see quest progress!</p>
        </Link>
      </>
    );
  };

  return (
    <div className="h-screen flex flex-col" style={{ backgroundColor: '#FBFBFE' }} onClick={handleNextStep}>
      {/* Header */}
      <div className="bg-blue-100 p-4 rounded-b-xl shadow-sm text-center relative transition-all duration-500">
        <Link to="/chat" className="absolute left-4 top-4">
          <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
        </Link>
        {getHeaderContent()}
      </div>

      {/* Chat Area */}
      <div className="flex-grow p-4 space-y-4 overflow-y-auto">
        {fullConversation.slice(0, visibleMessages).map((msg, index) => (
          <div key={index} className={`chat ${msg.sender === 'user' ? 'chat-end' : 'chat-start'}`}>
            <div className={`chat-bubble ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
              {msg.text}
            </div>
            <div className="chat-footer opacity-50 text-xs">time</div>
          </div>
        ))}
      </div>

      {/* Text Input Area */}
      <div className="p-4 bg-white">
        <input 
          type="text" 
          placeholder="Type your message..." 
          className="input input-bordered w-full rounded-full bg-gray-100" 
          onFocus={showKeyboard} 
          onBlur={hideKeyboard} 
        />
      </div>
    </div>
  );
};

export default ChatPage;