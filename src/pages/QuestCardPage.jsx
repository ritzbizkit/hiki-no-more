import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { questData } from '../data';
import { useTheme } from '../components/ThemeProvider';
import { useBuddy } from '../context/BuddyContext';

const QuestCardPage = () => {
  const { buddyName, arcName, questId } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { buddyDetails } = useBuddy();

  const currentQuest = questData[buddyName]?.[arcName]?.quests[questId];

  if (!currentQuest || !buddyDetails) {
    return (
      <div className="p-4 text-center">
        Quest or buddy not found. Please check the URL.
      </div>
    );
  }

  const nextQuestId = parseInt(questId, 10) + 1;
  const nextQuest = questData[buddyName]?.[arcName]?.quests[nextQuestId];

  return (
    <div className={`flex flex-col h-screen ${theme.background}`}>
      <div className={`flex items-center p-4 shadow-md ${theme.primary}`}>
        <span
          className={`text-2xl font-bold cursor-pointer ${theme.accentText}`}
          onClick={() => navigate(-1)}
        >
          &larr;
        </span>
        <span className={`font-bold text-lg mx-auto ${theme.accentText}`}>Back</span>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className={`p-8 rounded-xl shadow-lg w-full max-w-sm text-center ${theme.secondary}`}>
          
          {currentQuest.showAvatarOnCard && (
            <img 
              src={buddyDetails.image} 
              alt={buddyDetails.name} 
              className="w-16 h-16 mx-auto mb-4" 
            />
          )}

          <p className={`text-lg font-semibold mb-2 ${theme.text}`}>
            {currentQuest.title}
          </p>

          {currentQuest.subtitle && (
            <p className={`text-sm mb-4 ${theme.text}`}>
              {currentQuest.subtitle}
            </p>
          )}

          {currentQuest.type === 'input' && (
            <textarea
              placeholder="Type out your response..."
              className="mt-4 w-full p-2 rounded-md border text-gray-700"
              rows="5"
            ></textarea>
          )}

          {nextQuest ? (
            <Link to={`/quests/${buddyName}/${arcName}/${nextQuestId}`} className={`block mt-8 text-center text-sm ${theme.text}`}>
              <span className="text-2xl block mb-1">↑</span>
              swipe up!
            </Link>
          ) : (
            <div className={`block mt-8 text-center text-sm ${theme.text}`}>
              You've completed this arc!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestCardPage;