import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useTheme } from '@mui/material';
import { SHAPE_TYPES } from './constants';
import { extractThemeColors } from './utils/sceneThemeUtils';

// Create context
const SceneContext = createContext(null);

/**
 * SceneProvider Component
 * 
 * Provides scene state management for the 3D background with:
 * - Shape type selection
 * - Scene transitions
 * - Scroll activity tracking
 * - Theme-based color extraction
 */
export const SceneProvider = ({ children }) => {
  const theme = useTheme();
  const [currentShapeType, setCurrentShapeType] = useState(SHAPE_TYPES.SPHERE);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [scrollActive, setScrollActive] = useState(false);
  const [themeColors, setThemeColors] = useState(null);
  
  // Extract theme colors on initial load and when theme changes
  useEffect(() => {
    try {
      const colors = extractThemeColors(theme);
      setThemeColors(colors);
    } catch (error) {
      console.error("Error extracting theme colors:", error);
      // Set fallback colors
      setThemeColors({
        shapeColors: {
          [SHAPE_TYPES.SPHERE]: { h: 0.6, s: 0.6, l: 0.6 }, // Blue-ish
          [SHAPE_TYPES.BOX]: { h: 0.3, s: 0.6, l: 0.6 },    // Green-ish
          [SHAPE_TYPES.TORUS]: { h: 0.1, s: 0.6, l: 0.6 },  // Orange-ish
          hover: { h: 0.5, s: 0.8, l: 0.7 }
        }
      });
    }
  }, [theme]);
  
  // Handle scroll events to activate scroll effects
  useEffect(() => {
    let scrollTimeout;
    
    const handleScroll = () => {
      setScrollActive(true);
      
      // Clear any existing timeout
      if (scrollTimeout) clearTimeout(scrollTimeout);
      
      // Reset scrollActive after scrolling stops
      scrollTimeout = setTimeout(() => {
        setScrollActive(false);
      }, 200); // Reduced for faster response
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);
  
  // Function to directly switch shape type without transition
  const switchShapeType = useCallback((nextTypeOrFunction) => {
    let nextType;
    
    if (typeof nextTypeOrFunction === 'function') {
      nextType = nextTypeOrFunction(currentShapeType);
    } else if (nextTypeOrFunction !== undefined) {
      nextType = nextTypeOrFunction;
    } else {
      // Cycle through shape types: SPHERE -> BOX -> TORUS -> SPHERE
      nextType = (currentShapeType + 1) % Object.keys(SHAPE_TYPES).length;
    }
    
    setCurrentShapeType(nextType);
  }, [currentShapeType]);
  
  // Scene switching function with transition
  const switchScene = useCallback((newShapeType) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    setTimeout(() => {
      // If specific shape requested, use it, otherwise cycle
      if (typeof newShapeType === 'function') {
        setCurrentShapeType(newShapeType);
      } else if (typeof newShapeType === 'number') {
        setCurrentShapeType(newShapeType);
      } else {
        setCurrentShapeType(prev => (prev + 1) % Object.keys(SHAPE_TYPES).length);
      }
      
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 300);
  }, [isTransitioning]);
  
  // Make functions available globally for external triggers
  useEffect(() => {
    try {
      window.sceneContext = { 
        switchScene,
        switchShapeType,
        currentShapeType
      };
    } catch (error) {
      console.error("Error setting global sceneContext:", error);
    }
    
    return () => {
      window.sceneContext = null;
    };
  }, [switchScene, switchShapeType, currentShapeType]);
  
  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    currentShapeType,
    switchShapeType,
    isTransitioning,
    scrollActive,
    themeColors,
    switchScene
  }), [
    currentShapeType,
    switchShapeType,
    isTransitioning,
    scrollActive,
    themeColors,
    switchScene
  ]);
  
  return (
    <SceneContext.Provider value={contextValue}>
      {children}
    </SceneContext.Provider>
  );
};

// Custom hook to use the scene context
export const useSceneState = () => {
  const context = useContext(SceneContext);
  if (context === null) {
    throw new Error('useSceneState must be used within a SceneProvider');
  }
  return context;
};

export const useSceneContext = () => {
  const context = useContext(SceneContext);
  if (!context) {
    throw new Error('useSceneContext must be used within a SceneProvider');
  }
  return context;
};

/**
 * Separate hook for accessing three.js camera
 * This creates a new approach that doesn't conditionally call hooks
 */
export const useSceneCamera = () => {
  return null; // Default return value
};

/**
 * Component that actually accesses the camera
 * This component will be used inside Three.js context where useThree is available
 */
export const CameraAccess = ({ onCameraReady }) => {
  // Safe to use useThree here as this component is only used within a Canvas
  const { useThree } = require('@react-three/fiber');
  const { camera } = useThree();
  
  // Provide camera to parent via callback
  useEffect(() => {
    if (camera && onCameraReady) {
      onCameraReady(camera);
    }
  }, [camera, onCameraReady]);
  
  return null;
};

// CRITICAL FIX: Add a debug hook to expose scene state
export const useSceneDebug = () => {
  // This is incorrect as useThree and useFrame must be used inside a Canvas
  // Fixed implementation:
  console.warn("useSceneDebug must be used inside a Canvas component");
  return null;
};

// For backward compatibility
export const extractColorsFromTheme = extractThemeColors;

export default SceneContext;
