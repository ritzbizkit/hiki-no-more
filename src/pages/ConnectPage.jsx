// src/pages/ConnectPage.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserCircleIcon, ArrowPathIcon, ChevronLeftIcon } from '@heroicons/react/24/solid';
import { useTheme } from '../components/ThemeProvider';
import { useBuddy } from '../context/BuddyContext'; // Import the buddy hook
import Card from '../components/Card';

const mockUsers = [
  { name: 'Kumar Choo', age: 22, bio: "Hey! I am a software engineer looking to make friends!", interests: "Bookbinding, games, reading", lookingToImprove: "Confidence", status: 'connect' },
  { name: 'Rittu Lim', age: 24, bio: "hihi I am an exchange student from indonesia!", interests: "board games, Magic the Gathering", lookingToImprove: "Stop self doubt", status: 'connect_back' },
  { name: 'Cedric Sanke', age: 25, bio: "Hey! I am a software engineer looking to make friends!", interests: "Gaming, cycling", lookingToImprove: "Oversharing", status: 'connect' },
];

const UserCard = ({ user, setActiveChats }) => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { buddyDetails } = useBuddy(); // Get the user's current buddy

  const handleConnectBack = () => {
    // If there's no buddy, we can't create a chat
    if (!buddyDetails) return; 

    // Create dynamic chat info
    const otherPersonName = user.name.split(' ')[0]; // Just use their first name
    const buddyName = buddyDetails.name;
    const chatId = `${buddyName.toLowerCase()}-${otherPersonName.toLowerCase()}`;
    const chatName = `${buddyName}, ${otherPersonName}`;

    const newGroupChat = {
      name: chatName,
      message: `${otherPersonName}: Hi! Nice to meet you!`,
      path: `/group-chat/${chatId}`
    };
    
    setActiveChats(currentChats => {
      const chatExists = currentChats.some(chat => chat.name === newGroupChat.name);
      return chatExists ? currentChats : [...currentChats, newGroupChat];
    });

    // Navigate to the new, dynamic path
    navigate(newGroupChat.path);
  };

  return (
    <Card className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <UserCircleIcon className="w-12 h-12 text-gray-300" />
          <div>
            <p className={`font-bold ${theme.text}`}>{user.name}</p>
            <p className="text-sm text-gray-500">Age: {user.age}</p>
          </div>
        </div>
        {user.status === 'connect_back' ? (
          <button onClick={handleConnectBack} className="btn btn-sm rounded-full btn-accent text-gray-800">
            connect back
          </button>
        ) : (
          <button className={`btn btn-sm rounded-full ${theme.primary} ${theme.accentText}`}>
            +connect
          </button>
        )}
      </div>
      <div className={`text-sm ${theme.text}`}>
        <p>"{user.bio}"</p>
        <p className="mt-2"><span className="font-semibold">Interests:</span> {user.interests}</p>
        <p><span className="font-semibold">Looking to improve:</span> {user.lookingToImprove}</p>
      </div>
    </Card>
  );
};

const ConnectPage = ({ setActiveChats }) => {
  const { theme } = useTheme();

  return (
    <div className={`p-4 min-h-screen ${theme.background}`}>
      <Card className="text-center relative mb-6">
        <Link to="/chat" className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme.text}`}>
          <ChevronLeftIcon className="w-6 h-6" />
        </Link>
        <h1 className={`text-2xl font-bold ${theme.text}`}>Connect with others!</h1>
      </Card>
      
      <div className="space-y-4">
        {mockUsers.map((user, index) => <UserCard key={index} user={user} setActiveChats={setActiveChats} />)}
      </div>
      
      <div className="text-center mt-6">
        <button className="btn btn-ghost text-blue-500">
          <ArrowPathIcon className="w-5 h-5 mr-2" />
          Reload for more options!
        </button>
      </div>
    </div>
  );
};

export default ConnectPage;