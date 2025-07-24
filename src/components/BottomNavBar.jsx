import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PencilIcon, ChatBubbleOvalLeftEllipsisIcon, LinkIcon, UserIcon } from '@heroicons/react/24/solid';

const BottomNavBar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="fixed bottom-4 left-0 right-0 flex justify-center z-10">
      <div className="flex justify-around items-center gap-4 px-6 py-3 rounded-full shadow-lg" style={{ backgroundColor: '#DDEBFF' }}>
        <Link to="/diary" className={`p-2 rounded-full ${isActive('/diary') ? 'text-blue-600' : 'text-gray-500'}`}>
          <PencilIcon className="w-7 h-7" />
        </Link>
        <Link to="/chat" className={`p-2 rounded-full ${isActive('/chat') ? 'text-blue-600' : 'text-gray-500'}`}>
          <ChatBubbleOvalLeftEllipsisIcon className="w-7 h-7" />
        </Link>
        <Link to="/quests" className={`p-2 rounded-full ${isActive('/quests') ? 'text-blue-600' : 'text-gray-500'}`}>
          <LinkIcon className="w-7 h-7" />
        </Link>
        <Link to="/profile" className={`p-2 rounded-full ${isActive('/profile') ? 'text-blue-600' : 'text-gray-500'}`}>
          <UserIcon className="w-7 h-7" />
        </Link>
      </div>
    </div>
  );
};

export default BottomNavBar;