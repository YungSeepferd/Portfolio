import React, { useEffect } from 'react';
import useWorldCoordinates from '../hooks/useWorldCoordinates';
import { useSceneState } from '../SceneContext';

/**
 * WorldMouseListener Component
 * 
 * This component must be used inside an R3F Canvas.
 * It converts screen coordinates to world coordinates and updates SceneContext.
 * 
 * @param {Object} props Component props
 * @param {Object} props.mouseData Mouse data from useMouseTracking hook
 */
const WorldMouseListener = ({ mouseData }) => {
  const { updateMousePosition } = useSceneState();
  const worldCoords = useWorldCoordinates(mouseData);
  
  // Update mouse position in context with world coordinates
  useEffect(() => {
    if (mouseData && worldCoords) {
      // Create complete mouse data object with screen and world coordinates
      const enhancedMouseData = {
        screen: mouseData.forThree,
        world: worldCoords.world,
        velocity: worldCoords.velocity
      };
      
      // Update context
      updateMousePosition(enhancedMouseData);
    }
  }, [mouseData, worldCoords, updateMousePosition]);
  
  // This component doesn't render anything
  return null;
};

export default WorldMouseListener;
