import React, { useMemo, useState, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useSceneState } from './SceneContext';
import { extractThemeColors } from './utils/sceneThemeUtils';
import SphereScene from './scenes/SphereScene';
import BoxScene from './scenes/BoxScene'; 
import TorusScene from './scenes/TorusScene';
import { SHAPE_TYPES } from './constants';

/**
 * ActiveScene - Manages which 3D scene is currently active
 * 
 * Handles transitions between scenes and passes necessary props
 */
const ActiveScene = ({ 
  mousePosition, 
  mouseData, // New: Contains both screen and world coordinates
  onClick, 
  isDragging, 
  theme 
}) => {
  // eslint-disable-next-line no-unused-vars
  const { size } = useThree();
  const { currentShapeType, switchShapeType, isTransitioning } = useSceneState();
  // eslint-disable-next-line no-unused-vars
  const [transitionProgress, setTransitionProgress] = useState(0);
  
  // Extract theme colors
  const { shapeColors } = useMemo(() => {
    return extractThemeColors(theme);
  }, [theme]);
  
  // Set transition state when scene changes
  useEffect(() => {
    if (isTransitioning) {
      let startTime = Date.now();
      const transitionDuration = 1000; // 1 second transition
      
      const updateTransition = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(1, elapsed / transitionDuration);
        
        setTransitionProgress(progress);
        
        if (progress < 1) {
          requestAnimationFrame(updateTransition);
        }
      };
      
      requestAnimationFrame(updateTransition);
    }
  }, [isTransitioning]);
  
  // Scene click handler
  const handleSceneClick = () => {
    if (onClick && !isDragging) {
      onClick();
    }
    
    if (!isTransitioning && switchShapeType) {
      // Use the switchShapeType function from context to handle scene changes
      switchShapeType();
    }
  };
  
  // Get appropriate color for current scene
  const activeColor = useMemo(() => {
    return new THREE.Color(shapeColors[currentShapeType]?.color || '#6366F1');
  }, [currentShapeType, shapeColors]);
  
  return (
    <group onClick={handleSceneClick}>
      {/* Render active scene based on type, now passing both screen coordinates and world position */}
      {currentShapeType === SHAPE_TYPES.SPHERE && (
        <SphereScene 
          color={activeColor}
          mousePosition={mousePosition}
          mouseData={mouseData}
          isTransitioning={isTransitioning}
        />
      )}
      
      {currentShapeType === SHAPE_TYPES.BOX && (
        <BoxScene 
          color={activeColor}
          mousePosition={mousePosition}
          mouseData={mouseData}
          isTransitioning={isTransitioning}
        />
      )}
      
      {currentShapeType === SHAPE_TYPES.TORUS && (
        <TorusScene 
          color={activeColor}
          mousePosition={mousePosition}
          mouseData={mouseData}
          isTransitioning={isTransitioning}
        />
      )}
    </group>
  );
};

export default ActiveScene;
