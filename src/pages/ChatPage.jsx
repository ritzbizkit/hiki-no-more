import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { useKeyboard } from '../context/KeyboardContext.jsx';
import { useBuddy } from '../context/BuddyContext.jsx';

const ChatPage = () => {
  const { showKeyboard, hideKeyboard } = useKeyboard();
  const { chosenBuddy } = useBuddy();
  const { buddyName } = useParams();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const buddy = chosenBuddy || { name: buddyName, imageSrc: '/nervy1.svg' };
  const displayName = buddy.name.charAt(0).toUpperCase() + buddy.name.slice(1);

  const handleSendMessage = async (event) => {
    event.preventDefault();
    if (newMessage.trim() === '') return;

    const userMessage = { sender: 'user', text: newMessage };
    setMessages(currentMessages => [...currentMessages, userMessage]);
    setNewMessage('');
    setIsLoading(true);
    hideKeyboard();

    try {
      // This now correctly points to your local proxy
      const response = await fetch('/api/chat', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: newMessage,
          buddy: buddy.name 
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const buddyReply = { sender: 'buddy', text: data.reply }; 

      setMessages(currentMessages => [...currentMessages, buddyReply]);

    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      const errorReply = { sender: 'buddy', text: "Sorry, I'm having trouble connecting right now." };
      setMessages(currentMessages => [...currentMessages, errorReply]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col" style={{ backgroundColor: '#FBFBFE' }}>
      <div className="bg-blue-100 p-4 rounded-b-xl shadow-sm text-center relative">
        <Link to="/chat" className="absolute left-4 top-4"><ChevronLeftIcon className="w-6 h-6 text-gray-800" /></Link>
        <h1 className="text-xl font-bold text-gray-800">Chat with {displayName}!</h1>
        <Link to="/quests" className="flex justify-center items-center gap-2 mt-2 text-sm text-gray-600">
          <img src={buddy.imageSrc} alt={displayName} className="w-6 h-6" />
          <p>Tap to see quest progress!</p>
        </Link>
      </div>

      <div className="flex-grow p-4 space-y-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className={`chat ${msg.sender === 'user' ? 'chat-end' : 'chat-start'}`}>
            <div className={`chat-bubble ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>{msg.text}</div>
          </div>
        ))}
        {isLoading && (
          <div className="chat chat-start">
            <div className="chat-bubble bg-gray-200 text-gray-800">
              <span className="loading loading-dots loading-sm"></span>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSendMessage} className="p-4 bg-white">
        <input 
          type="text" 
          placeholder="Type your message..." 
          className="input input-bordered w-full rounded-full bg-gray-100" 
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onFocus={showKeyboard} 
          onBlur={hideKeyboard} 
        />
      </form>
    </div>
  );
};

export default ChatPage;