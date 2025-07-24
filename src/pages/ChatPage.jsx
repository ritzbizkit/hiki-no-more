import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { useKeyboard } from '../context/KeyboardContext.jsx';
import { useBuddy } from '../context/BuddyContext.jsx';

const ChatPage = () => {
  const { showKeyboard, hideKeyboard } = useKeyboard();
  const { chosenBuddy } = useBuddy();
  const { buddyName } = useParams();

  // 1. State for the conversation history, the user's current message, and loading status
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const buddy = chosenBuddy || { name: buddyName, imageSrc: '/nervy1.svg' };
  const displayName = buddy.name.charAt(0).toUpperCase() + buddy.name.slice(1);

  // 2. This function handles sending a message
  const handleSendMessage = async (event) => {
    event.preventDefault();
    if (newMessage.trim() === '') return;

    const userMessage = { sender: 'user', text: newMessage };
    // Add the user's message to the chat history immediately
    setMessages(currentMessages => [...currentMessages, userMessage]);
    setNewMessage(''); // Clear the input field
    setIsLoading(true); // Show the "typing..." indicator
    hideKeyboard();

    try {
      // 3. Make the API call to your backend
      const response = await fetch('https://your-api-server.com/chat', { // <-- REPLACE THIS URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: newMessage,
          buddy: buddy.name // Send the buddy's name to the server
        }),
      });

      const data = await response.json();
      const buddyReply = { sender: 'buddy', text: data.reply }; // Assuming the server responds with { "reply": "..." }

      // Add the buddy's reply to the chat history
      setMessages(currentMessages => [...currentMessages, buddyReply]);

    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      const errorReply = { sender: 'buddy', text: "Sorry, I'm having trouble connecting right now." };
      setMessages(currentMessages => [...currentMessages, errorReply]);
    } finally {
      setIsLoading(false); // Hide the "typing..." indicator
    }
  };

  return (
    <div className="h-screen flex flex-col" style={{ backgroundColor: '#FBFBFE' }}>
      {/* Header */}
      <div className="bg-blue-100 p-4 rounded-b-xl shadow-sm text-center relative">
        <Link to="/chat" className="absolute left-4 top-4"><ChevronLeftIcon className="w-6 h-6 text-gray-800" /></Link>
        <h1 className="text-xl font-bold text-gray-800">Chat with {displayName}!</h1>
        <Link to="/quests" className="flex justify-center items-center gap-2 mt-2 text-sm text-gray-600">
          <img src={buddy.imageSrc} alt={displayName} className="w-6 h-6" />
          <p>Tap to see quest progress!</p>
        </Link>
      </div>

      {/* Chat Area */}
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

      {/* Text Input Area is now a form */}
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