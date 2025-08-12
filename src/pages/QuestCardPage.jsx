import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { questData } from '../data';
import { sendQuizMessage, QuestUtils } from '../api';
import { getQuestRoute } from '../questRoutes';
import { useTheme } from '../components/ThemeProvider';
import { useBuddy } from '../context/BuddyContext';

const QuestCardPage = () => {
  const { buddyName, arcName, questId } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { buddyDetails } = useBuddy();

  // Simplified state management
  const [currentStageId, setCurrentStageId] = useState(null);
  const [allStages, setAllStages] = useState({});
  const [userInputs, setUserInputs] = useState({});
  const [modelReplies, setModelReplies] = useState({});
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingReply, setIsGeneratingReply] = useState(false);
  const [error, setError] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Get quest route and determine if we should use backend
  const quizRoute = getQuestRoute(buddyName, arcName, questId);
  
  // Fallback to static data
  const currentQuest = questData[buddyName]?.[arcName]?.quests[questId];

  // Get current stage data
  const currentStage = allStages[currentStageId];

  // Single function to proceed to next stage (handles both initialization and navigation)
  const proceedToNextStage = async () => {
    if (!quizRoute || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      // Update user inputs if current stage requires input
      const updatedInputs = currentStage?.has_user_input && userInput.trim()
        ? { ...userInputs, [currentStageId]: userInput.trim() }
        : userInputs;

      // Send request to backend
      const response = await sendQuizMessage(quizRoute, currentStageId, updatedInputs, modelReplies);
      
      // Update all state from backend response
      setAllStages(response.stages || {});
      setUserInputs(response.user_inputs || updatedInputs);
      setModelReplies(response.model_replies || modelReplies);
      
      // Auto-navigate to next stage
      if (response.next_stage) {
        setCurrentStageId(response.next_stage);
      } else {
        // Quest completed - mark as completed and navigate back to arc overview
        console.log('Quest completed! Navigating back to arc overview');
        QuestUtils.markQuestCompleted(buddyName, arcName, questId);
        navigate(`/quests/${buddyName}/${arcName}`);
        return;
      }
      
      setUserInput('');
      setIsInitialized(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate model reply for current stage (auto-submit to trigger backend generation)
  const generateModelReply = async () => {
    if (!quizRoute || !currentStageId || isGeneratingReply || modelReplies[currentStageId]) return;

    setIsGeneratingReply(true);
    setError(null);

    try {
      // Submit current stage to trigger model reply generation
      const response = await sendQuizMessage(quizRoute, currentStageId, userInputs, modelReplies);
      
      // Update state with generated model reply
      setAllStages(response.stages || allStages);
      setUserInputs(response.user_inputs || userInputs);
      setModelReplies(response.model_replies || modelReplies);
      
      // Check if this was the last stage (quest completed)
      if (!response.next_stage) {
        // Quest completed - mark as completed and navigate back to arc overview
        console.log('Quest completed in generateModelReply! Navigating back to arc overview');
        QuestUtils.markQuestCompleted(buddyName, arcName, questId);
        navigate(`/quests/${buddyName}/${arcName}`);
        return;
      }
      
      // Don't auto-navigate here - wait for user to press Continue
    } catch (err) {
      setError(err.message);
    } finally {
      setIsGeneratingReply(false);
    }
  };

  // Initialize quest on mount
  useEffect(() => {
    if (!isInitialized && !isLoading && quizRoute) {
      proceedToNextStage();
    }
  }, [quizRoute]);

  // Auto-generate model reply when landing on a stage that needs it
  useEffect(() => {
    if (currentStage?.has_model_reply && currentStageId && !modelReplies[currentStageId] && !isGeneratingReply && isInitialized) {
      generateModelReply();
    }
  }, [currentStageId, currentStage?.has_model_reply, modelReplies, isInitialized]);

  // Error state - still show UI but with error message
  if (!quizRoute) {
    return (
      <div className="p-4 text-center">
        <div className="mb-4 p-2 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded text-xs">
          No backend route configured for this quest.
        </div>
        {currentQuest && (
          <div>
            <h3 className="text-lg font-semibold">{currentQuest.title}</h3>
            <p className="text-sm text-gray-600">Static content available</p>
          </div>
        )}
      </div>
    );
  }

  // Determine what content to show
  const displayData = currentStage ? {
    title: currentStage.title,
    content: currentStage.content,
    hasUserInput: currentStage.has_user_input,
    hasModelReply: currentStage.has_model_reply,
    showAvatarOnCard: currentStage.has_model_reply
  } : null;

  // Check if we can proceed (either no input required, or input is provided)
  const canProceed = !displayData?.hasUserInput || userInput.trim();

  // Check if quest is completed
  const isQuestCompleted = isInitialized && !currentStageId;

  // Check if we need to show model reply loading
  const isModelReplyLoading = displayData?.hasModelReply && !modelReplies[currentStageId] && isGeneratingReply;

  // Handle Enter key for user input submission
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && canProceed && !isLoading && !isModelReplyLoading) {
      e.preventDefault();
      proceedToNextStage();
    }
  };

  return (
    <div className={`flex flex-col h-screen ${theme.background}`}>
      <div className={`flex items-center p-4 shadow-md ${theme.primary}`}>
        <span
          className={`text-2xl font-bold cursor-pointer ${theme.accentText}`}
          onClick={() => navigate(`/quests/${buddyName}/${arcName}`)}
        >
          &larr;
        </span>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className={`p-8 rounded-xl shadow-lg w-full max-w-sm text-center ${theme.secondary}`}>
          
          {/* Error message for backend issues */}
          {error && (
            <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-xs">
              Backend error: {error}
            </div>
          )}

          {/* Loading state */}
          {(isLoading || (!isInitialized && !error)) && (
            <div className={`text-sm mb-4 ${theme.text}`}>
              {isLoading ? 'Loading...' : 'Initializing quest...'}
            </div>
          )}
          
          {/* Avatar */}
          {displayData?.showAvatarOnCard && buddyDetails && (
            <img 
              src={buddyDetails.image} 
              alt={buddyDetails.name} 
              className="w-16 h-16 mx-auto mb-4" 
            />
          )}

          {/* Title */}
          {displayData?.title && (
            <p className={`text-lg font-semibold mb-2 ${theme.text}`}>
              {displayData.title}
            </p>
          )}

          {/* Content */}
          {displayData?.content && (
            <p className={`text-sm mb-4 ${theme.text}`}>
              {displayData.content}
            </p>
          )}

          {/* Model reply section - show for stages that have model replies */}
          {displayData?.hasModelReply && (
            <div className={`text-sm mb-4 p-3 bg-gray-100 rounded ${theme.text}`}>
              {isModelReplyLoading ? (
                'Loading...'
              ) : (
                modelReplies[currentStageId] || 'Loading AI response...'
              )}
            </div>
          )}

          {/* User Input Section */}
          {displayData?.hasUserInput && (
            <div className="mt-4">
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type out your response..."
                className="w-full p-2 rounded-md border text-gray-700"
                rows="5"
                disabled={isLoading}
              />
            </div>
          )}

          {/* Navigation */}
          {isQuestCompleted ? (
            <div className={`block mt-8 text-center text-sm ${theme.text}`}>
              Quest completed! 🎉
            </div>
          ) : isInitialized && displayData ? (
            !canProceed ? (
              <div className={`block mt-8 text-center text-sm ${theme.text}`}>
                Please enter your response above
              </div>
            ) : isLoading ? (
              <div className={`block mt-8 text-center text-sm ${theme.text}`}>
                <span className="text-2xl block mb-1">⏳</span>
                Loading...
              </div>
            ) : isModelReplyLoading ? (
              <div className={`block mt-8 text-center text-sm ${theme.text}`}>
                <span className="text-2xl block mb-1">⏳</span>
                Generating response...
              </div>
            ) : (
              <button
                onClick={proceedToNextStage}
                className={`block mt-8 text-center text-sm ${theme.text} mx-auto cursor-pointer`}
              >
                <span className="text-2xl block mb-1">↑</span>
                continue!
              </button>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default QuestCardPage;
