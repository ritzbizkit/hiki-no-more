import React from 'react';
import { Link } from 'react-router-dom';
import ChatListItem from '../components/ChatListItem.jsx';
import { useKeyboard } from '../context/KeyboardContext.jsx';
import { useBuddy } from '../context/BuddyContext.jsx'; // Import the buddy hook

const ChatHomePage = ({ activeChats }) => { // activeChats is for group chats
  const { showKeyboard, hideKeyboard } = useKeyboard();
  const { chosenBuddy } = useBuddy(); // Get the chosen buddy from global state

  // Start with a chat for the chosen buddy, if one exists
  const buddyChat = chosenBuddy ? [{
    name: chosenBuddy.name,
    message: `Hi I'm ${chosenBuddy.name}! Your dedicated buddy!`,
    avatarSrc: chosenBuddy.imageSrc,
    path: `/chat/${chosenBuddy.name.toLowerCase()}`
  }] : [];
  
  // Combine the main buddy chat with any other active group chats
  const allChats = [...buddyChat, ...activeChats.filter(chat => chat.name !== chosenBuddy?.name)];

  return (
    <div className="h-screen flex flex-col" style={{ backgroundColor: '#FBFBFE' }}>
      <div className="p-4 pt-6 bg-blue-100 shadow-sm">
        <h1 className="text-2xl font-bold text-center text-gray-800">Chats</h1>
        <input 
          type="text" 
          placeholder="Search" 
          className="input input-bordered w-full rounded-lg bg-white mt-4 placeholder:text-gray-500"
          onFocus={showKeyboard}
          onBlur={hideKeyboard}
        />
      </div>
      <div className="flex-grow overflow-y-auto">
        {allChats.map((chat, index) => (
          <Link to={chat.path} key={index}>
            <ChatListItem 
              name={chat.name}
              message={chat.message}
              avatarSrc={chat.avatarSrc}
            />
          </Link>
        ))}
        <Link to="/connect" className="block p-4 text-center text-blue-500 font-semibold hover:bg-gray-100">+ Connect with others!</Link>
      </div>
    </div>
  );
};

export default ChatHomePage;