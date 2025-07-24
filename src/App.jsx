import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Providers & Layouts
import { KeyboardProvider } from './context/KeyboardContext.jsx';
import { BuddyProvider } from './context/BuddyContext.jsx';
import { ChatProvider } from './context/ChatContext.jsx';
import MobileLayout from './components/MobileLayout.jsx';
import AppLayout from './components/AppLayout.jsx';

// Pages
import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import QuizIntroPage from './pages/QuizIntroPage.jsx';
import QuizQuestionPage from './pages/QuizQuestionPage.jsx';
import ResultsPage from './pages/ResultsPage.jsx';
import ResultDisplayPage from './pages/ResultDisplayPage.jsx';
import ChatHomePage from './pages/ChatHomePage.jsx';
import QuestJourneyPage from './pages/QuestJourneyPage.jsx';
import QuestDetailPage from './pages/QuestDetailPage.jsx';
import ChatPage from './pages/ChatPage.jsx';
import DiaryOverviewPage from './pages/DiaryOverviewPage.jsx';
import PostChatOptionsPage from './pages/PostChatOptionsPage.jsx';
import ProfileSetup1Page from './pages/ProfileSetup1Page.jsx';
import ProfileSetup2Page from './pages/ProfileSetup2Page.jsx';
import ConnectPage from './pages/ConnectPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import GroupChatPage from './pages/GroupChatPage.jsx';
import LiveModePage from './pages/LiveModePage.jsx';

function App() {
  const [answers, setAnswers] = useState({});
  const [activeChats, setActiveChats] = useState([]);

  return (
    <ChatProvider>
      <BuddyProvider>
        <KeyboardProvider>
          <MobileLayout>
            <BrowserRouter>
              <Routes>
                {/* Standalone Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/quiz-intro" element={<QuizIntroPage />} />
                <Route path="/results" element={<ResultsPage answers={answers} />} />
                <Route path="/quiz/:questionId" element={<QuizQuestionPage answers={answers} setAnswers={setAnswers} />} />
                <Route path="/result/:buddyName" element={<ResultDisplayPage />} />
                <Route path="/post-chat-options" element={<PostChatOptionsPage />} />
                <Route path="/profile-setup-1" element={<ProfileSetup1Page />} />
                <Route path="/profile-setup-2" element={<ProfileSetup2Page />} />
                <Route path="/group-chat/:participants" element={<GroupChatPage />} />
                <Route path="/live-mode" element={<LiveModePage />} />

                {/* Main App Routes with Layout */}
                <Route element={<AppLayout />}>
                  <Route path="/diary" element={<DiaryOverviewPage />} />
                  <Route path="/chat" element={<ChatHomePage activeChats={activeChats} />} />
                  <Route path="/chat/:buddyName" element={<ChatPage />} />
                  <Route path="/quests" element={<QuestJourneyPage />} />
                  <Route path="/quests/:buddyName/:arcName" element={<QuestDetailPage />} />
                  <Route path="/connect" element={<ConnectPage setActiveChats={setActiveChats} />} />
                  <Route path="/profile" element={<ProfilePage />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </MobileLayout>
        </KeyboardProvider>
      </BuddyProvider>
    </ChatProvider>
  );
}

export default App;