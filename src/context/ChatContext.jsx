import React, { createContext, useContext } from 'react';
import { ChatManager } from '@interpause/hikkinomore-buddy-sdk';

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

// Initialize the ChatManager. It points to our Vite proxy URL, '/api'.
const chatManager = new ChatManager('user_01', 'https://miro.interpause.dev');

export const ChatProvider = ({ children }) => {
  return (
    <ChatContext.Provider value={{ chatManager }}>
      {children}
    </ChatContext.Provider>
  );
};