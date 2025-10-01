import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

/**
 * OrbContext
 * 
 * Manages state for the floating orb companion
 * Similar to SceneContext but tailored for orb interactions
 */

// Orb modes
export const ORB_MODES = {
  NORMAL: 0,
  ACTIVE: 1,
  RAINBOW: 2,
};

// Create context with default values
const OrbContext = createContext({
  orbMode: ORB_MODES.NORMAL,
  setOrbMode: () => {},
  isEasterEggActive: false,
  triggerEasterEgg: () => {},
  clickCount: 0,
  registerClick: () => {},
  mousePosition: { x: 0.5, y: 0.5 },
  updateMousePosition: () => {},
  isOrbVisible: false,
  setOrbVisible: () => {},
});

/**
 * OrbProvider Component
 */
export const OrbProvider = ({ children }) => {
  // Orb state
  const [orbMode, setOrbMode] = useState(ORB_MODES.NORMAL);
  const [isEasterEggActive, setIsEasterEggActive] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [isOrbVisible, setOrbVisible] = useState(false);
  
  // Track click times for easter egg
  const clickTimesRef = useRef([]);
  const easterEggTimeoutRef = useRef(null);
  
  // Trigger easter egg mode
  const triggerEasterEgg = useCallback(() => {
    setIsEasterEggActive(true);
    setOrbMode(ORB_MODES.RAINBOW);
    
    // Clear any existing timeout
    if (easterEggTimeoutRef.current) {
      clearTimeout(easterEggTimeoutRef.current);
    }
    
    // Reset after 10 seconds
    easterEggTimeoutRef.current = setTimeout(() => {
      setIsEasterEggActive(false);
      setOrbMode(ORB_MODES.NORMAL);
      clickTimesRef.current = [];
      setClickCount(0);
    }, 10000);
  }, []);
  
  // Register a click and check for easter egg
  const registerClick = useCallback(() => {
    const now = Date.now();
    
    // Add click time
    clickTimesRef.current.push(now);
    
    // Keep only clicks from last 4 seconds
    clickTimesRef.current = clickTimesRef.current.filter(
      time => now - time < 4000
    );
    
    // Update click count
    setClickCount(clickTimesRef.current.length);
    
    // Check for easter egg (10+ clicks in 4 seconds)
    if (clickTimesRef.current.length >= 10 && !isEasterEggActive) {
      triggerEasterEgg();
    }
  }, [isEasterEggActive, triggerEasterEgg]);
  
  // Update mouse position
  const updateMousePosition = useCallback((position) => {
    if (position && typeof position.x === 'number' && typeof position.y === 'number') {
      setMousePosition(position);
    }
  }, []);
  
  // Clean up on unmount
  React.useEffect(() => {
    return () => {
      if (easterEggTimeoutRef.current) {
        clearTimeout(easterEggTimeoutRef.current);
      }
    };
  }, []);

  return (
    <OrbContext.Provider value={{ 
      orbMode,
      setOrbMode,
      isEasterEggActive,
      triggerEasterEgg,
      clickCount,
      registerClick,
      mousePosition,
      updateMousePosition,
      isOrbVisible,
      setOrbVisible,
    }}>
      {children}
    </OrbContext.Provider>
  );
};

// Custom hook to use the orb context
export const useOrbState = () => {
  const context = useContext(OrbContext);
  if (!context) {
    throw new Error('useOrbState must be used within an OrbProvider');
  }
  return context;
};

export default OrbContext;
