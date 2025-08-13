import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Providers & Layouts
import { BuddyProvider } from './context/BuddyContext.jsx';
import { ChatProvider } from './context/ChatContext.jsx';
import MobileLayout from './components/MobileLayout.jsx';
import AppLayout from './components/AppLayout.jsx';
import ThemeProvider from './components/ThemeProvider.jsx';

// Pages
import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import ProfileSetup1Page from './pages/ProfileSetup1Page.jsx';
import ProfileSetup2Page from './pages/ProfileSetup2Page.jsx';
import QuizIntroPage from './pages/QuizIntroPage.jsx';
import QuizQuestionPage from './pages/QuizQuestionPage.jsx';
import ResultsPage from './pages/ResultsPage.jsx';
import QuestJourneyPage from './pages/QuestJourneyPage.jsx';
import QuestDetailPage from './pages/QuestDetailPage.jsx';
import QuestCardPage from './pages/QuestCardPage.jsx';
import ChatHomePage from './pages/ChatHomePage.jsx';
import ChatPage from './pages/ChatPage.jsx';
import CheckInPage from './pages/CheckInPage.jsx';
import CheckInFormPage from './pages/CheckInFormPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import ConnectPage from './pages/ConnectPage.jsx';
import GroupChatPage from './pages/GroupChatPage.jsx';
import LiveModePage from './pages/LiveModePage.jsx';
import TutorialPage from './pages/TutorialPage.jsx';

function App() {
  const [answers, setAnswers] = useState({});
  const [activeChats, setActiveChats] = useState([]);

  return (
    <BuddyProvider>
        <ChatProvider>
          <MobileLayout>
            <BrowserRouter>
                <ThemeProvider>
                  <Routes>
                    {/* Standalone Routes */}
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/profile-setup-1" element={<ProfileSetup1Page />} />
                    <Route path="/profile-setup-2" element={<ProfileSetup2Page />} />
                    <Route path="/quiz-intro" element={<QuizIntroPage />} />
                    <Route path="/quiz/:questionId" element={<QuizQuestionPage answers={answers} setAnswers={setAnswers} />} />
                    <Route path="/results" element={<ResultsPage answers={answers} />} />

                    {/* Protected Routes */}
                    <Route path="/quests/:buddyName/:arcName/:questId" element={<QuestCardPage />} />
                    <Route path="/group-chat/:participants" element={<GroupChatPage />} />
                    <Route path="/live-mode" element={<LiveModePage />} />
                    <Route path="/tutorial" element={<TutorialPage />} />
                    <Route element={<AppLayout />}>
                      <Route path="/chat" element={<ChatHomePage activeChats={activeChats} />} />
                      <Route path="/chat/:avatarName" element={<ChatPage />} />
                      <Route path="/quests" element={<QuestJourneyPage />} />
                      <Route path="/quests/:buddyName/:arcName" element={<QuestDetailPage />} />
                      <Route path="/check-in" element={<CheckInPage />} />
                      <Route path="/check-in/new" element={<CheckInFormPage />} />
                      <Route path="/profile" element={<ProfilePage />} />
                      <Route path="/settings" element={<SettingsPage />} />
                      <Route path="/connect" element={<ConnectPage activeChats={activeChats} setActiveChats={setActiveChats} />} />
                    </Route>
                  </Routes>
                </ThemeProvider>
            </BrowserRouter>
          </MobileLayout>
        </ChatProvider>
    </BuddyProvider>
  );
}

export default App;
