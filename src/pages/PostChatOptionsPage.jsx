import React from 'react';
import { Link } from 'react-router-dom';

const PostChatOptionsPage = () => {
  return (
    <div 
      className="flex flex-col justify-center items-center min-h-screen p-6 gap-8" 
      style={{ backgroundColor: '#FBFBFE' }}
    >
      <Link 
        to="/results" 
        className="btn btn-lg h-auto py-4 rounded-2xl border-none text-black w-full max-w-xs text-center" 
        style={{ backgroundColor: '#E8F1FA' }}
      >
        Practice with <br/> another buddy
      </Link>
      
      <img src="/nervy2.svg" alt="Nervy Leveled Up" className="w-40 h-auto" />
      
      <div className="w-full max-w-xs flex flex-col gap-4">
        {/* This button is now a Link that points to /connect */}
        <Link 
          to="/connect"
          className="btn btn-lg h-auto py-4 rounded-2xl border-none text-black" 
          style={{ backgroundColor: '#E8F1FA' }}
        >
          Connect with others
        </Link>
        <Link 
          to="/chat/nervy" 
          className="btn btn-lg h-auto py-4 rounded-2xl border-none text-black text-center" 
          style={{ backgroundColor: '#E8F1FA' }}
        >
          Practice more <br/> with Nervy
        </Link>
      </div>
    </div>
  );
};

export default PostChatOptionsPage;