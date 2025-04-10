import React, { createContext, useState, useContext, useCallback, useRef, useEffect } from 'react';
import { useTheme } from '@mui/material';
import { SCENE_MODES } from './constants';
import { extractThemeColors } from './utils/themeUtils';

const SceneContext = createContext();

export const SceneProvider = ({ children }) => {
  const theme = useTheme();
  const themeColors = extractThemeColors(theme);
  const [sceneMode, setSceneMode] = useState(SCENE_MODES.INTERACTIVE_SHAPES);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentShapeType, setCurrentShapeType] = useState(0); // 0 = sphere, 1 = box, 2 = torus
  const scrollActive = useRef(false);
  
  // Switch scenes on click
  const switchScene = useCallback(() => {
    if (isTransitioning) return;
    
    console.log("Switching scene from", sceneMode);
    setIsTransitioning(true);
    
    // Use a callback to guarantee we use the latest state value
    setSceneMode(prevMode => {
      const nextMode = (prevMode + 1) % 3;
      console.log("Switching to scene", nextMode);
      return nextMode;
    });
    
    // Reset transition lock after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 800);
  }, [isTransitioning, sceneMode]);

  // Switch shape types when clicking on shapes
  const switchShapeType = useCallback((callback) => {
    if (typeof callback === 'function') {
      setCurrentShapeType(callback);
    } else {
      setCurrentShapeType(prev => (prev + 1) % 3); // Only 3 types now
    }
  }, []);
  
  // Add requestRender function to the context
  const requestRender = useCallback(() => {
    setIsTransitioning(false); // Force a re-render
  }, []);
  
  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      if (scrollActive.current) return;
      
      scrollActive.current = true;
      
      // Reset scroll active state after a delay
      setTimeout(() => {
        scrollActive.current = false;
      }, 100);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const value = {
    sceneMode, 
    isTransitioning, 
    currentShapeType, 
    scrollActive: scrollActive.current, 
    switchScene, 
    switchShapeType,
    themeColors,
    requestRender
  };
  
  return (
    <SceneContext.Provider value={value}>
      {children}
    </SceneContext.Provider>
  );
};

/**
 * Hook to use scene state
 * Note: useThree must NOT be called conditionally, so we need a different approach
 */
export const useSceneState = () => {
  const context = useContext(SceneContext);
  if (!context) {
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

export default SceneContext;
