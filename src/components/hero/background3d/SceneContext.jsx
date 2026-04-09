import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { SHAPE_TYPES } from './constants';

// Create context with default values
const SceneContext = createContext({
  currentShapeType: SHAPE_TYPES.SPHERE,
  switchShapeType: () => {},
  isTransitioning: false,
  showParticles: true,
  toggleParticles: () => {},
  mousePosition: { x: 0, y: 0 },
  updateMousePosition: () => {},
  isDragging: false,
  updateDragging: () => {},
  isInteractionEnabled: true,
  setInteractionEnabled: () => {},
  hasInteraction: false
});

/**
 * SceneProvider Component
 */
export const SceneProvider = ({ children }) => {
  // Scene state
  const [currentShapeType, setCurrentShapeType] = useState(SHAPE_TYPES.SPHERE);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showParticles, setShowParticles] = useState(true);
  
  // Interaction state
  const [isDragging, setIsDragging] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isInteractionEnabled, setIsInteractionEnabled] = useState(true);
  const [hasInteraction, setHasInteraction] = useState(false);
  
  // Track last mouse activity time
  const lastInteractionTime = useRef(Date.now());
  const interactionTimeout = useRef(null);
  
  // Toggle particles
  const toggleParticles = useCallback(() => {
    setShowParticles(prev => !prev);
  }, []);
  
  // Function to switch between scene types with smooth transition
  const switchShapeType = useCallback(() => {
    // Don't switch during transition or if interaction is disabled
    if (isTransitioning || !isInteractionEnabled) {
      return;
    }
    setIsTransitioning(true);
    
    // First timeout lets the current scene animate out before we swap buffers
    setTimeout(() => {
      const newType = (currentShapeType + 1) % 3;
      setCurrentShapeType(newType);
      
      // Second timeout hands control back once the new scene animates in
      setTimeout(() => {
        setIsTransitioning(false);
      }, 400); // Duration based on transition animation
    }, 200);
  }, [isTransitioning, currentShapeType, isInteractionEnabled]);

  // Update mouse position for interactive elements
  const updateMousePosition = useCallback((position) => {
    if (position && typeof position.x === 'number' && typeof position.y === 'number') {
      setMousePosition(position);
      
      // Update interaction state
      setHasInteraction(true);
      lastInteractionTime.current = Date.now();
      
      // Clear any existing timeout
      if (interactionTimeout.current) {
        clearTimeout(interactionTimeout.current);
      }
      
      // Set timeout to detect when interaction stops
      interactionTimeout.current = setTimeout(() => {
        setHasInteraction(false);
      }, 2000);
    }
  }, []);
  
  // Clean up on unmount
  React.useEffect(() => {
    return () => {
      if (interactionTimeout.current) {
        clearTimeout(interactionTimeout.current);
      }
    };
  }, []);
  
  // Update dragging state
  const updateDragging = useCallback((dragging) => {
    setIsDragging(dragging);
    
    // Also consider this as interaction
    if (dragging) {
      setHasInteraction(true);
      lastInteractionTime.current = Date.now();
    }
  }, []);
  
  // Toggle interaction enabled state
  const setInteractionEnabled = useCallback((enabled) => {
    setIsInteractionEnabled(enabled);
  }, []);

  return (
    <SceneContext.Provider value={{ 
      currentShapeType, 
      switchShapeType, 
      isTransitioning,
      showParticles,
      toggleParticles,
      mousePosition,
      updateMousePosition,
      isDragging,
      updateDragging,
      isInteractionEnabled,
      setInteractionEnabled,
      hasInteraction
    }}>
      {children}
    </SceneContext.Provider>
  );
};

// Custom hook to use the scene context
export const useSceneState = () => {
  const context = useContext(SceneContext);
  if (!context) {
    throw new Error('useSceneState must be used within a SceneProvider');
  }
  return context;
};

export default SceneContext;
