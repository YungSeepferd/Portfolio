import React, { useState, useCallback, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSceneContext } from './SceneContext';
import BoxScene from './scenes/BoxScene';
import SphereScene from './scenes/SphereScene';
import TorusScene from './scenes/TorusScene';
import CubeScene from './scenes/CubeScene';

// Define available scenes with their components and properties
const scenes = [
  { id: 'box', component: BoxScene },
  { id: 'sphere', component: SphereScene },
  { id: 'torus', component: TorusScene },
  { id: 'cube', component: CubeScene }
];

/**
 * ActiveScene Component
 * Manages the currently displayed 3D scene and handles transitions
 * 
 * @param {Object} props - Component props
 * @param {Object} props.mousePosition - Current mouse position {x, y}
 * @param {Function} props.onClick - Function to call when scene is clicked
 * @param {boolean} props.isDragging - Whether the user is currently dragging
 * @param {Object} props.theme - Current theme object
 */
const ActiveScene = ({ mousePosition, onClick, isDragging, theme }) => {
  const { activeSceneId, setActiveSceneId } = useSceneContext();
  const [clickable, setClickable] = useState(true);
  const [transitioning, setTransitioning] = useState(false);
  
  // Find the current scene component
  const CurrentScene = scenes.find(scene => scene.id === activeSceneId)?.component || scenes[0].component;

  // Handle click to switch scenes
  const handleObjectClick = useCallback((e) => {
    if (!clickable || isDragging) return;
    
    // Prevent event propagation to avoid multiple clicks
    e.stopPropagation();
    
    // Begin transition
    setTransitioning(true);
    
    // Call external click handler if provided
    if (onClick) {
      onClick(activeSceneId);
    }
    
    // Prevent rapid clicks
    setClickable(false);
    
    // Switch to next scene after transition delay
    setTimeout(() => {
      // Find current index
      const currentIndex = scenes.findIndex(scene => scene.id === activeSceneId);
      const nextIndex = (currentIndex + 1) % scenes.length;
      setActiveSceneId(scenes[nextIndex].id);
      
      // Allow clicking again after transition
      setTimeout(() => {
        setClickable(true);
        setTransitioning(false);
      }, 800);
    }, 300);
  }, [activeSceneId, clickable, isDragging, onClick, setActiveSceneId]);
  
  // Auto-rotate all scenes if not being dragged
  useFrame((state) => {
    if (!isDragging) {
      // Subtle auto-rotation
      state.scene.rotation.y += 0.001;
      
      // Camera movement based on mouse position (if not dragging)
      state.camera.position.x += (mousePosition.x * 0.5 - state.camera.position.x) * 0.05;
      state.camera.position.y += (mousePosition.y * 0.5 - state.camera.position.y) * 0.05;
      state.camera.lookAt(0, 0, 0);
    }
  });
  
  // Listen for key presses to change scenes (accessibility)
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        // Find current index
        const currentIndex = scenes.findIndex(scene => scene.id === activeSceneId);
        const nextIndex = (currentIndex + 1) % scenes.length;
        setActiveSceneId(scenes[nextIndex].id);
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [activeSceneId, setActiveSceneId]);
  
  return (
    <group onClick={handleObjectClick}>
      <CurrentScene 
        mousePosition={mousePosition}
        isDragging={isDragging}
        theme={theme}
        transitioning={transitioning}
      />
    </group>
  );
};

export default ActiveScene;
