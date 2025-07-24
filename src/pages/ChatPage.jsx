import React, { useState, useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { useKeyboard } from '../context/KeyboardContext.jsx';
import { useBuddy } from '../context/BuddyContext.jsx';
import { useChat } from '../context/ChatContext.jsx';

const buddyToPresetMap = {
  nervy: 'NERVY_BOT',
  obli: 'ENTHU_BOT',
  iso: 'ISO_BOT',
  avoi: 'AVOI_BOT',
};

const ChatPage = () => {
  const { showKeyboard, hideKeyboard } = useKeyboard();
  const { chosenBuddy } = useBuddy();
  const { chatManager } = useChat();
  const { buddyName } = useParams();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const buddy = chosenBuddy || { name: buddyName, imageSrc: '/nervy1.svg' };
  const displayName = buddy.name.charAt(0).toUpperCase() + buddy.name.slice(1);
  const preset = buddyToPresetMap[buddy.name.toLowerCase()] || 'GENERAL_BOT';

  const chatSession = useMemo(() => {
    return chatManager.getChat(buddy.name, preset);
  }, [chatManager, buddy.name, preset]);

  useEffect(() => {
    const fetchHistory = async () => {
      setIsLoading(true);
      try {
        const history = await chatSession.getHistory();
        setMessages(history);
      } catch (error) {
        console.error("Failed to fetch history:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, [chatSession]);

  const handleSendMessage = async (event) => {
    event.preventDefault();
    if (newMessage.trim() === '' || isLoading) return;

    const userMessage = { role: 'user', content: newMessage };
    setMessages(currentMessages => [...currentMessages, userMessage]);
    setNewMessage('');
    setIsLoading(true);
    hideKeyboard();

    try {
      const response = await chatSession.chat(newMessage);
      const buddyReply = { role: 'assistant', content: response };
      setMessages(currentMessages => [...currentMessages, buddyReply]);
    } catch (error) {
      console.error("Error with SDK chat:", error);
      const errorReply = { role: 'assistant', content: "Sorry, I had an issue responding." };
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
          <div key={index} className={`chat ${msg.role === 'user' ? 'chat-end' : 'chat-start'}`}>
            <div className={`chat-bubble ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>{msg.content}</div>
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