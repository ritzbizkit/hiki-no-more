import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Steps } from 'intro.js-react';
import { tutorialStepsPage } from '../data';
import { useTheme } from '../components/ThemeProvider';

const TutorialPage = () => {
    const navigate = useNavigate();
    const { theme } = useTheme();

    const onExit = () => {
        navigate('/chat');
    };

    return (
        <div className={`min-h-dvh ${theme.background}`}>
            <Steps
                enabled={true}
                steps={tutorialStepsPage}
                initialStep={0}
                onExit={onExit}
                onComplete={onExit}
            />
        </div>
    );
};

export default TutorialPage;