/**
 * Mapping from buddy-arc-quest combinations to backend quiz routes
 * Format: "buddyName-arcName-questId" -> "quizRoute"
 * 
 * This will be filled in later with actual mappings
 */
export const questRouteMapping = {
  // Example mappings (to be filled in later):
  "avoi-confidence-0": "quiz1",
  // "avoi-confidence-1": "quiz2",
  // "avoi-conversation-0": "quiz3",
  // "nervy-confidence-0": "quiz4",
};

/**
 * Get the quiz route for a specific quest
 * @param {string} buddyName - The buddy name
 * @param {string} arcName - The arc name  
 * @param {string} questId - The quest ID
 * @returns {string|null} - The quiz route or null if not found
 */
export const getQuestRoute = (buddyName, arcName, questId) => {
  const key = `${buddyName}-${arcName}-${questId}`;
  return questRouteMapping[key] || null;
};

/**
 * Check if a quest route exists
 * @param {string} buddyName - The buddy name
 * @param {string} arcName - The arc name
 * @param {string} questId - The quest ID
 * @returns {boolean} - True if quest route exists
 */
export const hasQuestRoute = (buddyName, arcName, questId) => {
  return getQuestRoute(buddyName, arcName, questId) !== null;
};
