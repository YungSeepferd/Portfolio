import React, { useEffect } from 'react';
import { useSceneState } from './SceneContext';
import { SCENE_MODES } from './constants';
import SphereScene from './scenes/SphereScene';
import CubeScene from './scenes/CubeScene';
import TorusScene from './scenes/TorusScene';

/**
 * ActiveScene - Renders the currently active scene based on scene mode
 * Also exposes scene switching functionality to the window object
 */
const ActiveScene = () => {
  const { sceneMode, switchScene, requestRender } = useSceneState();
  
  // Store scene context in window for external access
  useEffect(() => {
    window.sceneContext = { 
      switchScene,
      requestRender
    };
    
    return () => {
      window.sceneContext = null;
    };
  }, [switchScene, requestRender]);
  
  // Render the appropriate scene based on the current mode
  return (
    <group>
      {sceneMode === SCENE_MODES.INTERACTIVE_SHAPES && <SphereScene />}
      {sceneMode === SCENE_MODES.CUBE_ELEVATION && <CubeScene />}
      {sceneMode === SCENE_MODES.TORUS_MOTION && <TorusScene />}
    </group>
  );
};

export default React.memo(ActiveScene);
