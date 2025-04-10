import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';

/**
 * A hook to standardize animations across components and prevent animation issues
 * like duplicate animations on re-renders or page reloads
 * 
 * @param {string} componentId - Unique identifier for the component
 * @param {Object} customAnimation - Custom animation settings to override defaults
 * @param {boolean} runOncePerSession - If true, animation only runs on first page load
 * @returns {Object} Animation properties compatible with framer-motion
 */
const useAnimatedComponent = (componentId, customAnimation = {}, runOncePerSession = false) => {
  const theme = useTheme();
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const sessionKey = `animation-${componentId}-complete`;
  
  // Default animation from theme
  const defaultAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { 
      duration: theme.animations?.durations?.medium / 1000 || 0.5,
      ease: theme.animations?.easings?.motion?.standard || [0.4, 0, 0.2, 1],
      when: "beforeChildren"
    },
    exit: { opacity: 0 }
  };
  
  // Merge default and custom animation
  const animation = {
    ...defaultAnimation,
    ...customAnimation,
    transition: {
      ...defaultAnimation.transition,
      ...(customAnimation.transition || {})
    }
  };
  
  useEffect(() => {
    // Check if this animation should only run once per session
    if (runOncePerSession) {
      const hasRun = sessionStorage.getItem(sessionKey);
      
      if (hasRun) {
        // Skip animation if it has already run in this session
        setShouldAnimate(false);
      } else {
        // Mark animation as complete for this session
        sessionStorage.setItem(sessionKey, 'true');
      }
    }
    
    return () => {
      // Optional cleanup if needed
    };
  }, [componentId, runOncePerSession, sessionKey]);
  
  // If shouldAnimate is false, return without initial animation
  if (!shouldAnimate) {
    return {
      ...animation,
      initial: animation.animate
    };
  }
  
  return animation;
};

export default useAnimatedComponent;
