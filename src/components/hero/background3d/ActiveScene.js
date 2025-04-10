import React, { useEffect } from 'react';
import { useSceneState } from './SceneContext';
import SphereScene from './scenes/SphereScene';
import TorusScene from './scenes/TorusScene';
import CubeScene from './scenes/CubeScene';

/**
 * ActiveScene - Renders the currently active scene
 * CRITICAL FIX: Simplified to always show SphereScene initially for debugging
 */
const ActiveScene = () => {
  const { currentShapeType, isTransitioning } = useSceneState();
  
  // Log scene status to help debug visibility issues
  useEffect(() => {
    console.log("ActiveScene mounted, shape type:", currentShapeType);
    
    // Make scene visible for debugging
    window.threeScene = {
      currentShapeType,
      isTransitioning,
    };
    
    return () => {
      console.log("ActiveScene unmounted");
    };
  }, [currentShapeType, isTransitioning]);
  
  // Always render at least one scene to ensure something is visible
  return (
    <group>
      {/* Show appropriate scene based on shape type, fallback to SphereScene */}
      {currentShapeType === 0 && <SphereScene />}
      {currentShapeType === 1 && <CubeScene />}
      {currentShapeType === 2 && <TorusScene />}
      
      {/* Fallback for debugging - ensure something is always visible */}
      {(currentShapeType === undefined || currentShapeType === null) && <SphereScene />}
    </group>
  );
};

export default React.memo(ActiveScene);
