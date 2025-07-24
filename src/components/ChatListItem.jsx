import React from 'react';

const ChatListItem = ({ avatarSrc, name, message }) => {
  return (
    <div className="flex items-center gap-4 p-4 hover:bg-gray-100 cursor-pointer">
      <div className="avatar">
        <div className="w-14 rounded-full">
          <img src={avatarSrc} alt={`${name} avatar`} />
        </div>
      </div>
      <div className="flex-grow">
        <p className="font-bold text-gray-800">{name}</p>
        <p className="text-sm text-gray-500 truncate">{message}</p>
      </div>
    </div>
  );
};

export default ChatListItem;