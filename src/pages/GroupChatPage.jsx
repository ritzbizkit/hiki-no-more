import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { UserCircleIcon } from '@heroicons/react/24/outline';

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
  const [visibleCount, setVisibleCount] = useState(1);
  const [isPromptVisible, setPromptVisible] = useState(false);

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
    <div className="h-screen flex flex-col" style={{ backgroundColor: '#FBFBFE' }} onClick={handleScreenClick}>
      {/* Header */}
      <div className="bg-blue-100 p-4 rounded-b-xl shadow-sm text-center relative">
        <Link to="/connect" className="absolute left-4 top-5"><ChevronLeftIcon className="w-6 h-6 text-gray-700" /></Link>
        <div className="flex justify-center items-center gap-2">
            <img src="/nervy1.svg" alt="Nervy" className="w-8 h-8" />
            <UserCircleIcon className="w-8 h-8 text-gray-400" />
            <h1 className="text-xl font-bold text-gray-800">Nervy, Rittu</h1>
        </div>
      </div>
      
      <div className="text-center p-2 bg-white border-b">
        <Link to="/live-mode" className="btn btn-ghost btn-sm">
          <img src="/Nervy4.svg" alt="Nervy Icon" className="w-6 h-6 mr-2" />
          Hold me for live mode!
        </Link>
      </div>

      {/* Chat Area */}
      <div className="flex-grow p-4 space-y-4 overflow-y-auto">
        {messagesToDisplay.map((msg, index) => (
          <div key={index} className={`chat ${msg.sender === 'user' ? 'chat-end' : 'chat-start'}`}>
            <div className={`chat-bubble relative ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
              {msg.text}
              {msg.showPromptIcon && (
                <button onClick={handlePromptClick} className="absolute bottom-1 right-2">
                  <img src="/Nervy4.svg" alt="prompt icon" className="w-4 h-4 opacity-50" />
                </button>
              )}
            </div>
            <div className="chat-footer opacity-50 text-xs">time</div>
          </div>
        ))}

        {/* This is the updated prompt style */}
        {isPromptVisible && (
          <div className="my-4 p-4 bg-pink-100 text-pink-800 rounded-xl shadow-md border border-pink-200 relative">
            <div className="flex items-start gap-2">
                <img src="/Nervy4.svg" alt="Nervy Icon" className="w-5 h-5 opacity-70" />
                <p className="text-sm">{promptMessage.text}</p>
            </div>
            <span className="absolute bottom-2 right-4 text-xs text-pink-600">time</span>
          </div>
        )}
      </div>

      <div className="p-4 bg-white">
        <input type="text" placeholder="Type your message..." className="input input-bordered w-full rounded-full bg-gray-100" />
      </div>
    </div>
  );
};

export default GroupChatPage;