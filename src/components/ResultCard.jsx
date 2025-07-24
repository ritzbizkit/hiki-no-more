import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useBuddy } from '../context/BuddyContext.jsx'; // Import the buddy hook

const ResultCard = ({ buddy }) => {
  const navigate = useNavigate();
  const { setChosenBuddy } = useBuddy(); // Get the function to set the buddy

  const handleChooseBuddy = () => {
    setChosenBuddy(buddy); // Set the chosen buddy in the global state
    navigate('/chat');     // Then navigate to the chat page
  };

  return (
    <div className="flex flex-col justify-between items-center min-h-screen p-6" style={{ backgroundColor: '#FBFBFE' }}>
      <div className="w-full">
        <p className="text-left text-gray-500">{buddy.name} intro</p>
      </div>
      <div className="flex flex-col items-center w-full max-w-md">
        <Link to="/results" className="self-start text-gray-600 mb-8">&lt; Back</Link>
        <img src={buddy.imageSrc} alt={`${buddy.name} Avatar`} className="w-32 h-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-700">This is {buddy.name}</h2>
        <div className="my-6 p-4 rounded-2xl w-full text-center text-gray-700" style={{ backgroundColor: '#E8F1FA' }}>
          "{buddy.quote}"
        </div>
        <p className="text-gray-600 text-center">{buddy.description}</p>
      </div>
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