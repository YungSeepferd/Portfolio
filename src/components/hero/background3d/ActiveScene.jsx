import React, { useMemo, useState, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { useSceneState } from './SceneContext';
import { extractThemeColors, themeColorToThreeColor } from './utils/sceneThemeUtils';
import SphereScene from './scenes/SphereScene';
import BoxScene from './scenes/BoxScene';
import AudioVisualScene from './scenes/AudioVisualScene';
import { SHAPE_TYPES } from './constants';

/**
 * ActiveScene - Manages which 3D scene is currently active
 */
const ActiveScene = ({
  mousePosition,
  mouseData,
  onClick,
  isDragging,
  theme,
  easterEggActive = false,
  interactionCount = 0,
}) => {
  // eslint-disable-next-line no-unused-vars
  const { size } = useThree();
  const { currentShapeType, switchShapeType, isTransitioning } = useSceneState();
  // eslint-disable-next-line no-unused-vars
  const [transitionProgress, setTransitionProgress] = useState(0);

  // Extract theme colors and use them to determine active color
  useMemo(() => {
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

  // Get appropriate color for current scene - using theme derivation
  const activeColor = useMemo(() => {
    // Get the appropriate theme color based on scene type
    let themeColor;

    switch (currentShapeType) {
      case SHAPE_TYPES.SPHERE:
        themeColor = theme.palette.primary.main;
        break;
      case SHAPE_TYPES.BOX:
        themeColor = theme.palette.secondary.main;
        break;
      case SHAPE_TYPES.TORUS:
        themeColor = theme.palette.info?.main || theme.palette.primary.light;
        break;
      default:
        themeColor = theme.palette.primary.main;
    }

    // Convert to THREE.Color
    return themeColorToThreeColor(themeColor);
  }, [currentShapeType, theme.palette]);

  return (
    <group onClick={handleSceneClick}>
      {/* Pass both mousePosition and complete mouseData */}
      {currentShapeType === SHAPE_TYPES.SPHERE && (
        <SphereScene
          color={activeColor}
          mousePosition={mousePosition}
          mouseData={mouseData}
          isTransitioning={isTransitioning}
          easterEggActive={easterEggActive}
          interactionCount={interactionCount}
          theme={theme}
        />
      )}

      {currentShapeType === SHAPE_TYPES.BOX && (
        <BoxScene
          color={activeColor}
          mousePosition={mousePosition}
          mouseData={mouseData}
          isTransitioning={isTransitioning}
          easterEggActive={easterEggActive}
          interactionCount={interactionCount}
        />
      )}

      {currentShapeType === SHAPE_TYPES.TORUS && (
        <AudioVisualScene
          color={activeColor}
          mousePosition={mousePosition}
          isTransitioning={isTransitioning}
          easterEggActive={easterEggActive}
          interactionCount={interactionCount}
        />
      )}
    </group>
  );
};

export default ActiveScene;
