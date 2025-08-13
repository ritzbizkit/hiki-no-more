/**
 * Mapping from buddy-arc-quest combinations to backend quiz routes
 * Format: "buddyName-arcName-questId" -> "quizRoute"
 * 
 * This will be filled in later with actual mappings
 */

const buddies = ['avoi','enthu','iso','nervy'];
const arcs = ['confidence', 'conversation', 'authenticity', 'anxiety'];

const anxietyRoutes = [
"Anxiety_Ground_Yourself",
"Anxiety_Name_the_fear",
"Anxiety_Setting_Boundaries",
"Anxiety_We_all_need_help",
"Anxiety_Youre_already_a_winner",
]

const authenticityRoutes = [
"Authenticity_Celebrate_Uniqueness",
"Authenticity_Drop_The_Mask",
"Authenticity_Honest_Reflection",
"Authenticity_Own_Your_Story",
"Authenticity_True_To_Myself",
]

const confidenceRoutes = [
"Confidence_Choose_what_matters",
"Confidence_Positive_Self_Talk",
"Confidence_Recognise_progress",
"Confidence_Sit_With_It",
"Confidence_Take_The_Lead",
]

const conversationRoutes = [
"Conversation_Brave_The_Awkward",
"Conversation_Give_A_Compliment",
"Conversation_Keep_It_Going",
"Conversation_Listen_Actively",
"Conversation_Start_The_Talk",
]

// Generate quest route mapping for all permutations
const generateQuestRouteMapping = () => {
  const mapping = {};
  
  // Map arc names to their corresponding route arrays
  const arcRoutes = {
    'anxiety': anxietyRoutes,
    'authenticity': authenticityRoutes,
    'confidence': confidenceRoutes,
    'conversation': conversationRoutes
  };
  
  // For each buddy-arc combination, create 5 quests (0-4) using the corresponding arc routes
  for (const buddy of buddies) {
    for (const arc of arcs) {
      const routes = arcRoutes[arc];
      for (let questId = 0; questId < 5; questId++) {
        const key = `${buddy}-${arc}-${questId}`;
        mapping[key] = routes[questId % routes.length];
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
