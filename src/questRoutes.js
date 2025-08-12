/**
 * Mapping from buddy-arc-quest combinations to backend quiz routes
 * Format: "buddyName-arcName-questId" -> "quizRoute"
 * 
 * This will be filled in later with actual mappings
 */

const buddies = ['avoi','enthu','iso','nervy'];
const arcs = ['confidence', 'conversation', 'authenticity', 'anxiety'];

// Available quest routes for testing
const availableRoutes = [
  "Authenticity_Celebrate_Uniqueness",
  "Authenticity_Drop_The_Mask", 
  "Authenticity_Honest_Reflection",
  "Authenticity_Own_Your_Story",
  "Authenticity_True_To_Myself"
];

// Generate quest route mapping for all permutations
const generateQuestRouteMapping = () => {
  const mapping = {};
  let routeIndex = 0;
  
  // For each buddy-arc combination, create 5 quests (0-4) and cycle through available routes
  for (const buddy of buddies) {
    for (const arc of arcs) {
      for (let questId = 0; questId < 5; questId++) {
        const key = `${buddy}-${arc}-${questId}`;
        mapping[key] = availableRoutes[routeIndex % availableRoutes.length];
        routeIndex++;
      }
    }
  }
  
  return mapping;
};

export const questRouteMapping = generateQuestRouteMapping();

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
