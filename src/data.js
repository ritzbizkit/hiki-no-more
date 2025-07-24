export const quizData = {
  1: { question: "How do you usually feel in group settings?", answers: ["I overthink everything I say and worry I'll be judged", "Groups make me feel out of place. I stay quiet unless spoken to.", "I'll talk if its work related. I prefer to skip social settings.", "I talk about what I like, but sometimes people don't care."] },
  2: { question: "What do you do when you receive an invite to a casual social event?", answers: ["I'll accept but worry and prepare myself for it.", "I usually ignore it or make an excuse to stay home.", "I politely decline if it is not work related.", "I might go if it is something that interests me. Otherwise no."] },
  3: { question: "What frustrates you most in social situations?", answers: ["I feel like I have to perform and put up a front.", "Not knowing what to say or how to without feeling forced.", "Being expected to overshare or stay too long in unstructured chats.", "When people don't see why I am so excited over my interests."] },
  4: { question: "How do you prefer to build connections with others?", answers: ["I want to make real friends, where i can say whats on my mind freely.", "I prefer close friends but I don't have many", "I prefer to keep things formal. I won't force connections.", "I usually connect with others though interest and hobbies."] }
};

export const resultsData = {
  nervy: { name: "Nervy", imageSrc: "/nervy1.svg", quote: "I'm always around people but inside, I'm anxious and afraid of saying the wrong thing.", description: "Find yourself thinking this? Pick Nervy to build confidence in group settings and learn how to relax and be true to yourself around others." },
  obli: { name: "Obli", imageSrc: "/Enthu.svg", quote: "I get excited talking about what I love, but don't always realise when others tune out.", description: "Find yourself thinking this? Pick Obli to improve your social awareness and connect with people without dimming your passion." },
  iso: { name: "Iso", imageSrc: "/iso.svg", quote: "I prefer being alone but deep down, I wish I knew how to make real friends.", description: "Find yourself thinking this? Pick Iso to take small meaningful steps towards forming meaningful friendships without burning out." },
  avoi: { name: "Avoi", imageSrc: "/Avoi.svg", quote: "I'm confident in formal settings, but casual socialising feels awkward and exhausting.", description: "Find yourself thinking this? Pick Avoi to feel more at ease in informal settings and learn to open up without losing your boundaries." }
};

export const questData = {
  nervy: {
    title: "Nervy's Quests",
    arcs: {
      confidence: { title: "Confidence Arc", completion: "43/100", description: "This arc builds inner strength...", quests: [ { title: "Speak Up!", points: "+5pts", detail: "User shares an opinion even if nervous about judgment." }, { title: "Try Again", points: "+4pts", detail: "User attempts a different reply after Nervy points out it was insensitive." }, { title: "Take the Lead", points: "+3pts", detail: "User volunteers suggests a conversation topic with Nervy." }, { title: "Positive Self-Talk", points: "+3pts", detail: "User rephrases a self-critical thought as something to work on." }, { title: "Recognize Progress", points: "+4pts", detail: "User reflects on or acknowledges their growth." }, ] },
      conversation: { title: "Conversation Arc", completion: "75/100", description: "This arc focuses on developing healthy communication...", quests: [ { title: "Start the Talk", points: "+5pts", detail: "User initiates a conversation or greeting in the app." }, { title: "Keep It Going", points: "+4pts", detail: "User asks a follow-up question in a thread or chat." }, { title: "Listen Actively", points: "+3pts", detail: "User paraphrases or acknowledges Nervy's message." }, { title: "Brave the Awkward", points: "+3pts", detail: "User addresses or stays in an uncomfortable conversation." }, { title: "Give a Compliment", points: "+4pts", detail: "User sends a positive or affirming message to someone." }, ] },
      authenticity: { title: "Authenticity Arc", completion: "25/100", description: "This arc encourages users to express their true selves...", quests: [ { title: "True to Myself!", points: "+5pts", detail: "User expresses a personal value that may be different from others." }, { title: "Honest Reflection", points: "+4pts", detail: "User shares a genuine feeling or thought, despite discomfort." }, { title: "Celebrate Uniqueness", points: "+3pts", detail: "User mentions something distinctive about themselves." }, { title: "Own Your Story", points: "+3pts", detail: "User talks about a real, personal experience without filtering." }, { title: "Drop the Mask", points: "+4pts", detail: "User resists people-pleasing or agrees to disagree." }, ] },
      anxiety: { title: "Anxiety Arc", completion: "30/100", description: "This arc targets noticing, expressing, and processing anxious thoughts...", quests: [ { title: "Be nice to yourself!", points: "+5pts", detail: "User rewrites a negative thought as something self-compassionate." }, { title: "You're already a winner!", points: "+4pts", detail: "User notices or resists comparison to others." }, { title: "We all need help!", points: "+3pts", detail: "User explicitly asks the bot for help or comfort" }, { title: "Name the fear!", points: "+3pts", detail: "User mentions a social worry or fear" }, { title: "Practice makes better!", points: "+4pts", detail: "User replays an awkward situation with nervy through roleplay" }, ] },
    }
  },
  avoi: {
    title: "Avoi's Quests",
    arcs: {
      unpolishing: { title: "Unpolishing arc", completion: "30/100", description: "This arc targets letting go of the need to always perform or impress. Reach 50pts to reach the next stage!", quests: [ { title: "Drop the act!", points: "+5pts", detail: "User shares something casual or unfiltered." }, { title: "Say the unsaid", points: "+4pts", detail: "User revisit a moment where you held back something real." }, { title: "Notice the mask", points: "+3pts", detail: "You identify a habit you use to look more 'put together'." }, { title: "Messy is okay!", points: "+3pts", detail: "User share a recent mistake or silly moment with Avoi." }, { title: "No filter, go!", points: "+4pts", detail: "You express something honest without trying to make it sound good." }, ] },
      lettinggo: { title: "Letting go Arc", completion: "25/100", description: "This arc encourages making peace with awkwardness and emotional exposure. Reach 50pts to reach the next stage!", quests: [] },
      casualconnection: { title: "Casual connection arc", completion: "75/100", description: "This arc focuses on practicing low-pressure social bonds without depth or perfection. Reach 100pts to reach the next stage!", quests: [] },
      balancing: { title: "Balancing arc", completion: "43/100", description: "This arc teaches juggling formal and informal relationships without burning out. Reach 50pts to reach the next stage!", quests: [] }
    }
  },
  iso: {
    title: "Iso's Quests",
    arcs: {
      connections: { title: "Connections arc", completion: "30/100", description: "This arc targets building the courage to initiate...", quests: [ { title: "Wave first!", points: "+5pts", detail: "User talks about wanting to reach out or say hi to someone." }, { title: "Let them in", points: "+4pts", detail: "User opens up to the iso about a small personal detail." }, { title: "That felt nice.", points: "+3pts", detail: "User reflects on a recent moment of warmth or friendliness." }, { title: "No pressure.", points: "+3pts", detail: "User admits fear of being judged or rejected, and explores what they'd say if they weren't afraid." }, { title: "Your first message", points: "+4pts", detail: "User imagines a message to someone they miss or want to get to know better." }, ] },
      assumptions: { title: "Assumptions arc", completion: "75/100", description: "This arc focuses on untangling the beliefs and worries...", quests: [ { title: "What if they don't like me?", points: "+5pts", detail: "User expresses a worry about how they come across to others." }, { title: "Not weird, just human.", points: "+4pts", detail: "User realizes a 'flaw' they worry about is actually pretty normal." }, { title: "It's just a thought.", points: "+3pts", detail: "User catches themselves making a harsh assumption about others' intentions." }, { title: "What would you tell a friend?", points: "+3pts", detail: "User rephrases a self-critical thought more kindly." }, { title: "User writes out a more positive version of a past social moment they regret.", points: "+4pts", detail: "Rewrite the script" }, ] },
      deepconversation: { title: "Deep conversation arc", completion: "20/100", description: "This arc focuses on learning how conversations grow...", quests: [ { title: "More than 'hi'!", points: "+5pts", detail: "User practices adding something small to a basic greeting." }, { title: "Curious counts.", points: "+4pts", detail: "User expresses interest in Iso's story or feelings." }, { title: "That sounds like me.", points: "+3pts", detail: "User shares a time they see themself in someone else's experience." }, { title: "Boring is okay.", points: "+3pts", detail: "User accepts that not every chat has to be exciting to be meaningful." }, { title: "The second layer.", points: "+4pts", detail: "User mutually shares a vulnerable or honest reflection in conversation." }, ] },
      selfworth: { title: "Self-worth arc", completion: "43/100", description: "This arc teaches how to feel deserving of friendship...", quests: [ { title: "You're enough.", points: "+5pts", detail: "User questions their belief that they need to 'earn' connection." }, { title: "Not a burden.", points: "+4pts", detail: "User shares a moment where they feared being 'too much' for someone." }, { title: "Warmth within.", points: "+3pts", detail: "User speaks kindly to themself." }, { title: "Tiny wins count.", points: "+3pts", detail: "User acknowledges growth, even in small or awkward moments." }, { title: "A friend to yourself.", points: "+4pts", detail: "User says something caring for themselves, like they would for a friend." }, ] }
    }
  },
  obli: {
    title: "Enthu's Quests",
    arcs: {
      listento: {
        title: "Learn to listen Arc", completion: "30/100", description: "This arc targets learning to read the room and listen with intention. Reach 70pts to reach the next stage!",
        quests: [
          { title: "Vibe check", points: "+5pts", detail: "User reflects on how someone might have felt during a past conversation." },
          { title: "Did I go too fast?", points: "+4pts", detail: "User wonders if they overwhelmed someone with their energy." },
          { title: "Their turn now.", points: "+3pts", detail: "User shifts focus to what the other person might want to say or share." },
          { title: "Two-way street.", points: "+3pts", detail: "User identifies a moment when a convo felt one-sided." },
          { title: "Listening is love.", points: "+4pts", detail: "User summaries what someone else said." },
        ]
      },
      excitement: {
        title: "Excitement Arc", completion: "75/100", description: "This arc focuses on sharing passions and interests without monologue. Reach 100pts to reach the next stage!",
        quests: [
          { title: "So cool, right?", points: "+5pts", detail: "User shares something they're excited about without monologuing." },
          { title: "Wanna know more?", points: "+4pts", detail: "User checks in with the bot or someone else before launching into detail." },
          { title: "Little sparks.", points: "+3pts", detail: "User celebrates a small joy or quirky interest in relation to Iso's conversation." },
          { title: "Tell me yours!", points: "+3pts", detail: "User asks about someone else's interests or joys." },
          { title: "Shared hype.", points: "+4pts", detail: "User finds overlap between their passion and someone else's world." },
        ]
      },
      deepconversation: {
        title: "Deep conversation Arc", completion: "25/100", description: "This arc focuses on identifying mutual or rising interest before sharing meaningful info. Reach 50pts to reach the next stage!",
        quests: [
          { title: "Oops, that was a lot.", points: "+5pts", detail: "User acknowledges they may have over-explained something." },
          { title: "Still proud.", points: "+4pts", detail: "User practices a scenario where Iso is not interested in their enthusiasm." },
          { title: "Pause + play.", points: "+3pts", detail: "User practices pausing mid-conversation to check in with the other side." },
          { title: "Not everyone gets it.", points: "+3pts", detail: "User talks about a time someone didn't 'get' their passion and accepts it." },
          { title: "Bright, not blinding.", points: "+4pts", detail: "User finds a way to express themselves that's both joyful and mindful." },
        ]
      },
      connection: {
        title: "Connection arc", completion: "43/100", description: "This arc focuses on building meaningful relationships through sharing excitement & passion. Reach 50pts to reach the next stage!",
        quests: [
          { title: "Tell me what you love.", points: "+5pts", detail: "User expresses curiosity in someone else's hobby or passion." },
          { title: "Ohhh, I see it now.", points: "+4pts", detail: "User demonstrates understanding of how someone else feels." },
          { title: "Not just noise.", points: "+3pts", detail: "User reflects on something a friend said that stuck with them." },
          { title: "Cheer squad.", points: "+3pts", detail: "User affirms or hypes someone else up genuinely." },
          { title: "The real convo.", points: "+4pts", detail: "User connects with the same level of enthusiasm on a matching topic they are passionate about." },
        ]
      }
    }
  }
};