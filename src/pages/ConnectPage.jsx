import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserCircleIcon, ArrowPathIcon, ChevronLeftIcon } from '@heroicons/react/24/solid';

const mockUsers = [
  { name: 'Kumar Choo', age: 22, bio: "Hey! I am a software engineer looking to make friends!", interests: "Bookbinding, games, reading", lookingToImprove: "Confidence", status: 'connect' },
  { name: 'Rittu Lim', age: 24, bio: "hihi I am an exchange student from indonesia!", interests: "board games, Magic the Gathering", lookingToImprove: "Stop self doubt", status: 'connect_back' },
  { name: 'Cedric Sanke', age: 25, bio: "Hey! I am a software engineer looking to make friends!", interests: "Gaming, cycling", lookingToImprove: "Oversharing", status: 'connect' },
];

const UserCard = ({ user, setActiveChats }) => {
  const navigate = useNavigate();

  const handleConnectBack = () => {
    const newGroupChat = {
      name: 'Rittu and Nervy',
      message: "Rittu: Hi everyone! nice to meet yall!",
      avatarSrc: 'https://via.placeholder.com/56',
      path: '/group-chat/nervy-rittu'
    };
    
    // This function call requires setActiveChats to be defined
    setActiveChats(currentChats => {
      const chatExists = currentChats.some(chat => chat.name === newGroupChat.name);
      return chatExists ? currentChats : [...currentChats, newGroupChat];
    });

    navigate(newGroupChat.path);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <UserCircleIcon className="w-12 h-12 text-gray-300" />
          <div>
            <p className="font-bold text-gray-800">{user.name}</p>
            <p className="text-sm text-gray-500">Age: {user.age}</p>
          </div>
        </div>
        {user.status === 'connect_back' ? (
          <button onClick={handleConnectBack} className="btn btn-sm rounded-full btn-accent text-white">
            connect back
          </button>
        ) : (
          <button className="btn btn-sm rounded-full btn-primary text-white">
            +connect
          </button>
        )}
      </div>
      <div className="text-sm text-gray-700">
        <p>"{user.bio}"</p>
        <p className="mt-2"><span className="font-semibold">Interests:</span> {user.interests}</p>
        <p><span className="font-semibold">Looking to improve:</span> {user.lookingToImprove}</p>
      </div>
    </div>
  );
};

const ConnectPage = ({ setActiveChats }) => {
  return (
    <div className="p-4 min-h-screen" style={{ backgroundColor: '#FBFBFE' }}>
      <div className="bg-blue-100 p-4 rounded-xl text-center relative mb-6 shadow-sm">
        <Link to="/chat" className="absolute left-4 top-4">
          <ChevronLeftIcon className="w-6 h-6 text-gray-700" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Connect with others!</h1>
      </div>
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