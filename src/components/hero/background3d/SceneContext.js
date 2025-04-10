import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useThree, useFrame } from '@react-three/fiber'; // Fixed import
import { SHAPE_TYPES } from './constants';
import { extractThemeColors } from './utils/sceneThemeUtils'; // Updated to use the renamed file
import { useTheme } from '@mui/material';

// Create context
const SceneContext = createContext(null);

/**
 * SceneProvider Component
 * 
 * Provides scene state management for the 3D background.
 */
export const SceneProvider = ({ children }) => {
  const theme = useTheme();
  const [currentShapeType, setCurrentShapeType] = useState(SHAPE_TYPES.SPHERE);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [scrollActive, setScrollActive] = useState(false);
  const [themeColors, setThemeColors] = useState(null);
  const { invalidate } = useThree();
  
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
          0: { h: 0.6, s: 0.6, l: 0.6 }, // Blue-ish
          1: { h: 0.3, s: 0.6, l: 0.6 }, // Green-ish
          2: { h: 0.1, s: 0.6, l: 0.6 }, // Orange-ish
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
      invalidate(); // Force render on scroll
      
      // Clear any existing timeout
      if (scrollTimeout) clearTimeout(scrollTimeout);
      
      // Reset scrollActive after scrolling stops - REDUCED timeout for quicker reset
      scrollTimeout = setTimeout(() => {
        setScrollActive(false);
      }, 200); // Reduced from 300ms for faster response
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [invalidate]);
  
  // Function to only switch shape type without scene transition
  const switchShapeType = useCallback((nextTypeOrFunction) => {
    let nextType;
    
    if (typeof nextTypeOrFunction === 'function') {
      nextType = nextTypeOrFunction(currentShapeType);
    } else if (nextTypeOrFunction !== undefined) {
      nextType = nextTypeOrFunction;
    } else {
      nextType = (currentShapeType + 1) % 3; // Default: cycle through 3 shapes
    }
    
    setCurrentShapeType(nextType);
    invalidate(); // Force render
  }, [currentShapeType, invalidate]);
  
  // Original scene switching function
  const switchScene = useCallback((newShapeType) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    invalidate(); // Force render
    
    setTimeout(() => {
      // If specific shape requested, use it, otherwise cycle
      if (typeof newShapeType === 'function') {
        setCurrentShapeType(newShapeType);
      } else if (typeof newShapeType === 'number') {
        setCurrentShapeType(newShapeType);
      } else {
        setCurrentShapeType(prev => (prev + 1) % 3); // Cycle through 3 shapes
      }
      
      setTimeout(() => {
        setIsTransitioning(false);
        invalidate(); // Force render after transition complete
      }, 300);
    }, 300);
  }, [isTransitioning, invalidate]);
  
  // Make both functions available globally
  useEffect(() => {
    try {
      window.sceneContext = { 
        switchScene,
        switchShapeType // Add direct shape type switching
      };
    } catch (error) {
      console.error("Error setting global sceneContext:", error);
    }
    
    return () => {
      window.sceneContext = null;
    };
  }, [switchScene, switchShapeType]);
  
  const value = {
    currentShapeType,
    switchShapeType, // Use the direct shape switching function
    isTransitioning,
    scrollActive,
    themeColors,
    switchScene // Keep original for compatibility
  };
  
  return (
    <SceneContext.Provider value={value}>
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
  const { invalidate } = useThree();
  
  // Force render every frame
  useFrame(() => {
    invalidate();
  });
  
  // Output debug info to console
  useEffect(() => {
    console.log("3D Scene active - rendering");
    return () => console.log("3D Scene cleanup");
  }, []);
  
  return null;
};

// For backward compatibility
export const extractColorsFromTheme = extractThemeColors;

export default SceneContext;
