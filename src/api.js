// API base URL - hardcoded for now
const BASE_URL = 'http://localhost:8000';

// API functions for chat functionality

/**
 * Create a new chat with the specified agent
 * @param {string} agent - The agent/buddy name
 * @param {string} userId - Optional user ID
 * @returns {Promise<{chat_id: string}>}
 */
export const createNewChat = async (agent, userId = null) => {
  const params = new URLSearchParams({ agent });
  if (userId) {
    params.append('user_id', userId);
  }

  const response = await fetch(`${BASE_URL}/chat/new?${params}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to create new chat: ${response.statusText}`);
  }

  return await response.json();
};

/**
 * Get chat history by chat ID
 * @param {string} chatId - The chat ID
 * @returns {Promise<{user_id: string, chat_id: string, agent: string, history: Array}>}
 */
export const getChatHistory = async (chatId) => {
  const response = await fetch(`${BASE_URL}/chat/${chatId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to get chat history: ${response.statusText}`);
  }

  return await response.json();
};

/**
 * Send a message to the chat
 * @param {string} chatId - The chat ID
 * @param {string} message - The message to send
 * @returns {Promise<Array>} - Array of Content objects (response from AI)
 */
export const sendMessage = async (chatId, message) => {
  const response = await fetch(`${BASE_URL}/chat/${chatId}/message`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error(`Failed to send message: ${response.statusText}`);
  }

  return await response.json();
};

/**
 * Get a prompt by its name
 * @param {string} promptName - The name of the prompt
 * @returns {Promise<string>} - The prompt content
 */
export const getPrompt = async (promptName) => {
  const response = await fetch(`${BASE_URL}/chat/prompts/${promptName}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to get prompt: ${response.statusText}`);
  }

  return await response.json();
};

/**
 * Extract text content from Content parts array
 * @param {Array} parts - Array of Part objects
 * @returns {string} - Concatenated text content
 */
export const extractTextFromParts = (parts) => {
  if (!Array.isArray(parts)) return '';
  
  return parts
    .filter(part => part.text) // Only get parts with text
    .map(part => part.text)
    .join(''); // Concatenate all text parts
};

/**
 * Format chat history from API response to UI message format
 * @param {Array} history - Array of Content objects from API
 * @returns {Array} - Array of formatted message objects {sender, text}
 */
export const formatChatHistory = (history) => {
  if (!Array.isArray(history)) return [];
  
  return history
    .filter(content => content.role && content.role !== 'system') // Filter out system messages
    .map(content => ({
      sender: content.role === 'user' ? 'user' : 'buddy',
      text: extractTextFromParts(content.parts || [])
    }))
    .filter(msg => msg.text.trim()); // Filter out empty messages
};

/**
 * Format AI response from API to UI message format
 * @param {Array} response - Array of Content objects from sendMessage API
 * @returns {Array} - Array of formatted message objects {sender: 'buddy', text}
 */
export const formatAIResponse = (response) => {
  if (!Array.isArray(response)) return [];
  
  return response
    .filter(content => content.role !== 'user') // Filter out user messages
    .map(content => ({
      sender: 'buddy',
      text: extractTextFromParts(content.parts || [])
    }))
    .filter(msg => msg.text.trim()); // Filter out empty messages
};

/**
 * Chat management utilities
 */
export const ChatUtils = {
  /**
   * Get chat ID from localStorage for a specific buddy
   * @param {string} buddyKey - The buddy identifier
   * @returns {string|null} - Chat ID or null if not found
   */
  getChatId: (buddyKey) => {
    return localStorage.getItem(`chatId_${buddyKey}`);
  },

  /**
   * Store chat ID in localStorage for a specific buddy
   * @param {string} buddyKey - The buddy identifier
   * @param {string} chatId - The chat ID to store
   */
  setChatId: (buddyKey, chatId) => {
    localStorage.setItem(`chatId_${buddyKey}`, chatId);
  },

  /**
   * Remove chat ID from localStorage for a specific buddy
   * @param {string} buddyKey - The buddy identifier
   */
  removeChatId: (buddyKey) => {
    localStorage.removeItem(`chatId_${buddyKey}`);
  },

  /**
   * Initialize or load existing chat for a buddy
   * @param {string} buddyKey - The buddy identifier
   * @param {string} userId - The user ID
   * @returns {Promise<{chatId: string, messages: Array}>}
   */
  initializeChat: async (buddyKey, userId) => {
    const existingChatId = ChatUtils.getChatId(buddyKey);
    
    if (existingChatId) {
      // Load existing chat history
      try {
        const chatData = await getChatHistory(existingChatId);
        const messages = formatChatHistory(chatData.history);
        return { chatId: existingChatId, messages };
      } catch (error) {
        // If loading fails, create new chat
        console.warn('Failed to load existing chat, creating new one:', error);
      }
    }
    
    // Create new chat
    const response = await createNewChat(buddyKey, userId);
    const newChatId = response.chat_id;
    ChatUtils.setChatId(buddyKey, newChatId);
    return { chatId: newChatId, messages: [] };
  },

  /**
   * Delete chat and create a new one
   * @param {string} buddyKey - The buddy identifier
   * @param {string} userId - The user ID
   * @returns {Promise<string>} - New chat ID
   */
  resetChat: async (buddyKey, userId) => {
    ChatUtils.removeChatId(buddyKey);
    const response = await createNewChat(buddyKey, userId);
    const newChatId = response.chat_id;
    ChatUtils.setChatId(buddyKey, newChatId);
    return newChatId;
  }
};
