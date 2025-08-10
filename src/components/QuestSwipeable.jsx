// src/components/QuestSwipeable.jsx
import React from 'react';
import { useSpring, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import { useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeProvider';

const QuestSwipeable = ({ buddyDetails }) => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [{ y }, api] = useSpring(() => ({ y: 0 }));

  const bind = useDrag(({ down, movement: [, my], velocity, direction: [, dy] }) => {
    // If the user swipes up with enough velocity and distance, navigate to the quests page
    if (!down && dy < 0 && velocity > 0.5) {
      api.start({ y: -window.innerHeight }).then(() => navigate('/quests'));
    } else {
      // Otherwise, snap back to the original position
      api.start({ y: down ? my : 0, immediate: down });
    }
  });

  return (
    <animated.div
      {...bind()}
      style={{
        y,
        touchAction: 'none', // Prevents default browser scroll
        cursor: 'grab',
        transformOrigin: '50% 50%',
        willChange: 'transform',
      }}
      className={`block p-4 mt-4 text-center rounded-lg shadow-md ${theme.secondary} ${theme.text}`}
    >
      Tap to see quest progress!
    </animated.div>
  );
};

export default QuestSwipeable;