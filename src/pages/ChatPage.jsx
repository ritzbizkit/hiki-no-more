import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Steps } from 'intro.js-react';
import ReactMarkdown from 'react-markdown';
import { useBuddy } from '../context/BuddyContext';
import { useTheme } from '../components/ThemeProvider';
import { resultsData, tutorialStepsChatPage } from '../data.js';
import Card from '../components/Card';
import { TrashIcon, QuestionMarkCircleIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { sendMessage, formatAIResponse, ChatUtils } from '../api.js';
import { useUserId } from '../hooks/useUserId.js';

const ChatPage = () => {
  const navigate = useNavigate();
  const { avatarName } = useParams(); // Get buddy name from URL params
  const { chosenBuddy, setChosenBuddy } = useBuddy();
  const { theme } = useTheme();
  const userId = useUserId();

  // Chat state
  const [chatId, setChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Get buddy details - try to use avatarName from params or fall back to chosenBuddy
  const buddyKey = avatarName || chosenBuddy;
  const buddyDetails = resultsData[buddyKey];
  
  const [stepsEnabled, setStepsEnabled] = useState(false);

  useEffect(() => {
    const handle = setTimeout(() => {
      const tutorialCompleted = localStorage.getItem('tutorial_ChatPage');
      if (tutorialCompleted !== 'true') {
        setStepsEnabled(true);
      }
    }, 500);

    return () => clearTimeout(handle);
  }, []);

  // Initialize chat when component mounts
  useEffect(() => {
    const initializeChat = async () => {
      if (!buddyDetails) return;

      setIsLoading(true);
      try {
        const { chatId: newChatId, messages: chatMessages } = await ChatUtils.initializeChat(buddyKey, userId);
        setChatId(newChatId);
        setMessages(chatMessages);
      } catch (error) {
        console.error('Error initializing chat:', error);
        window.alert(`Error initializing chat: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    initializeChat();
  }, [buddyKey, userId, buddyDetails]);

  const onTutorialComplete = () => {
    localStorage.setItem('tutorial_ChatPage', 'true');
    setStepsEnabled(false);
  };

  const onExit = (stepIndex) => {
    // Check if we're on the last step (intro.js uses 0-based indexing)
    if (stepIndex === tutorialStepsChatPage.length - 1) {
      onTutorialComplete();
    } else {
      setStepsEnabled(false);
    }
  };

  const replayTutorial = () => {
    setStepsEnabled(true);
  };

  const handleSendMessage = async () => {
    if (!messageInput.trim() || !chatId || isSending) return;

    const userMessage = messageInput.trim();
    setMessageInput('');
    setIsSending(true);

    // Add user message to the chat immediately
    const userMessageObj = { sender: 'user', text: userMessage };
    setMessages(prev => [...prev, userMessageObj]);

    try {
      // Send message to API
      const response = await sendMessage(chatId, userMessage);
      
      // Process AI response
      const aiResponses = formatAIResponse(response);

      // Add AI responses to chat
      setMessages(prev => [...prev, ...aiResponses]);
    } catch (error) {
      console.error('Error sending message:', error);
      window.alert(`Error sending message: ${error.message}`);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleDeleteChat = async () => {
    if (window.confirm('Are you sure you want to delete this chat?')) {
      try {
        setMessages([]);
        setChatId(null);
        
        // Reset chat using utility function
        const newChatId = await ChatUtils.resetChat(buddyKey, userId);
        setChatId(newChatId);
      } catch (error) {
        console.error('Error creating new chat:', error);
        window.alert(`Error creating new chat: ${error.message}`);
      }
    }
  };

  if (!buddyDetails) {
    return <div>No active buddy found. Please go back and select a buddy.</div>;
  }

  if (isLoading) {
    return (
      <div className={`flex flex-col h-screen ${theme.background} items-center justify-center`}>
        <div className="text-lg">Loading chat...</div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-screen ${theme.background} relative`}>
      <Steps
        enabled={stepsEnabled}
        steps={tutorialStepsChatPage}
        initialStep={0}
        onExit={onExit}
        onComplete={onTutorialComplete}
      />
      {/* Header, using the Card component and styled like GroupChatPage */}
      <Card id="chat-header" className={`text-center relative !rounded-t-none !rounded-b-xl ${theme.primary}`}>
        <span 
          className={`absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-800 ${theme.text}`}
          onClick={() => navigate(-1)}
        >
          &larr;
        </span>
        <div className="flex justify-center items-center gap-2">
          {buddyDetails && <img src={buddyDetails.image} alt={buddyDetails.name} className="w-8 h-8 rounded-full" />}
          <h1 className={`text-xl font-bold ${theme.text}`}>{buddyDetails.name}</h1>
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <button
            onClick={replayTutorial}
            className="cursor-pointer text-gray-600 hover:text-gray-800 transition-colors"
            title="Replay tutorial"
          >
            <QuestionMarkCircleIcon className="w-4 h-4" />
          </button>
          <button
            className="cursor-pointer text-gray-600 hover:text-red-600 transition-colors"
            onClick={handleDeleteChat}
            title="Delete chat"
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      </Card>
      
      {/* Chat Area */}
      <div className="flex-grow p-4 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            No messages yet. Start a conversation!
          </div>
        ) : (
          messages.map((message, index) => {
            const prevMessage = index > 0 ? messages[index - 1] : null;
            const isSameSpeaker = prevMessage && prevMessage.sender === message.sender;
            const marginClass = index === 0 ? '' : (isSameSpeaker ? 'mt-1' : 'mt-4');
            
            return (
              <div key={index} className={`chat ${message.sender === 'user' ? 'chat-end' : 'chat-start'} ${marginClass}`}>
                <div className={`chat-bubble relative ${
                  message.sender === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-800'
                }`}>
                <ReactMarkdown
                  components={{
                    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                    em: ({ children }) => <em className="italic">{children}</em>,
                    code: ({ children }) => (
                      <code className={`px-1 py-0.5 rounded text-sm font-mono ${
                        message.sender === 'user' 
                          ? 'bg-blue-600 text-blue-100' 
                          : 'bg-gray-300 text-gray-900'
                      }`}>
                        {children}
                      </code>
                    ),
                    pre: ({ children }) => (
                      <pre className={`p-2 rounded text-sm font-mono overflow-x-auto ${
                        message.sender === 'user' 
                          ? 'bg-blue-600 text-blue-100' 
                          : 'bg-gray-300 text-gray-900'
                      }`}>
                        {children}
                      </pre>
                    ),
                    ul: ({ children }) => <ul className="list-disc list-inside ml-4 mb-2">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal list-inside ml-4 mb-2">{children}</ol>,
                    li: ({ children }) => <li className="mb-1">{children}</li>,
                    blockquote: ({ children }) => (
                      <blockquote className={`border-l-4 pl-4 italic ${
                        message.sender === 'user' 
                          ? 'border-blue-300' 
                          : 'border-gray-400'
                      }`}>
                        {children}
                      </blockquote>
                    ),
                    h1: ({ children }) => <h1 className="text-lg font-bold mb-2">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-base font-bold mb-2">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-sm font-bold mb-1">{children}</h3>,
                  }}
                >
                  {message.text}
                </ReactMarkdown>
              </div>
            </div>
            );
          })
        )}
        {isSending && (
          <div className="chat chat-start">
            <div className="chat-bubble relative bg-gray-200 text-gray-800">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Text Input */}
      <div id="message-input" className="p-4 bg-white">
        <div className="relative flex items-center">
          <input 
            type="text" 
            placeholder="Type your message..." 
            className="input input-bordered w-full rounded-full bg-gray-100 pr-12"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isSending || !chatId}
          />
          <button
            onClick={handleSendMessage}
            disabled={!messageInput.trim() || isSending || !chatId}
            className="absolute right-2 btn btn-primary btn-sm rounded-full p-2 disabled:opacity-50 min-h-0 h-8 w-8"
          >
            {isSending ? (
              <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <PaperAirplaneIcon className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
