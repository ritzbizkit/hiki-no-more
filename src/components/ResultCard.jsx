import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useBuddy } from '../context/BuddyContext.jsx';

const ResultCard = ({ buddy }) => {
  const navigate = useNavigate();
  const { setChosenBuddy } = useBuddy();

  const handleChooseBuddy = () => {
    setChosenBuddy(buddy); // This saves the buddy choice to our global state
    navigate('/chat');     // Then navigates to the chat page
  };

  return (
    <div className="flex flex-col justify-between items-center min-h-dvh p-6" style={{ backgroundColor: '#FBFBFE' }}>
      {/* ... (rest of the component is the same) ... */}
      <div className="w-full flex flex-col items-center gap-4 mt-8 max-w-xs">
        <button onClick={handleChooseBuddy} className="btn btn-lg rounded-full border-none text-black w-full" style={{ backgroundColor: '#A8D1F5' }}>
          Choose {buddy.name} as your buddy
        </button>
        <Link to="/results" className="btn btn-ghost w-full text-gray-600 hover:text-gray-800">
          Choose another buddy
        </Link>
      </div>
    </div>
  );
};

export default ResultCard;