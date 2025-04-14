import React, { useState, useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { useSceneState } from './SceneContext';

/**
 * Interactive Camera System
 * 
 * Provides advanced camera controls with:
 * - Auto-rotation when idle
 * - Smooth transitions between camera positions
 * - Focus on specific scene elements
 */
const InteractiveCamera = ({ enableAutoRotate = true, rotateSpeed = 0.2 }) => {
  const { camera, gl } = useThree();
  const controlsRef = useRef();
  const { isTransitioning, isDragging, currentShapeType } = useSceneState();
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  
  // Set initial camera position
  useEffect(() => {
    camera.position.set(0, 0, 8);
    camera.lookAt(0, 0, 0);
  }, [camera]);
  
  // Handle camera target updates based on shape type
  useEffect(() => {
    if (!controlsRef.current) return;
    
    const target = new THREE.Vector3(0, 0, 0);
    
    // Different shapes can have slightly different camera focus points
    switch (currentShapeType) {
      case 0: // SPHERE
        target.set(0, 0, 0);
        break;
      case 1: // CUBE
        target.set(0, 0.5, 0);
        break;
      case 2: // TORUS
        target.set(0, 0, 0);
        break;
      default:
        target.set(0, 0, 0);
    }
    
    // Smoothly transition to new target
    const startTarget = controlsRef.current.target.clone();
    const duration = 1000; // ms
    const startTime = Date.now();
    
    function updateTarget() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = progress < 0.5 
        ? 2 * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 2) / 2; // Ease in-out quad
      
      const newTarget = new THREE.Vector3().lerpVectors(
        startTarget,
        target,
        easeProgress
      );
      
      controlsRef.current.target.copy(newTarget);
      
      if (progress < 1) {
        requestAnimationFrame(updateTarget);
      }
    }
    
    updateTarget();
  }, [currentShapeType]);

  // Auto-rotation logic when idle
  useFrame(() => {
    if (!controlsRef.current) return;
    
    const idleTime = Date.now() - lastInteraction;
    const shouldAutoRotate = enableAutoRotate && idleTime > 3000 && !isDragging;
    
    if (shouldAutoRotate !== isAutoRotating) {
      setIsAutoRotating(shouldAutoRotate);
      controlsRef.current.autoRotate = shouldAutoRotate;
    }
    
    // Adjust damping during transitions for smoother movement
    if (isTransitioning) {
      controlsRef.current.dampingFactor = 0.1;
    } else {
      controlsRef.current.dampingFactor = 0.05;
    }
  });
  
  // Reset idle timer on user interaction
  const handleInteraction = () => {
    setLastInteraction(Date.now());
    if (isAutoRotating) {
      setIsAutoRotating(false);
      controlsRef.current.autoRotate = false;
    }
  };
  
  return (
    <>
      <PerspectiveCamera 
        makeDefault 
        fov={40} 
        near={0.1} 
        far={100}
      />
      
      <OrbitControls
        ref={controlsRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={rotateSpeed}
        minPolarAngle={Math.PI / 6}   // Limit vertical rotation (up)
        maxPolarAngle={Math.PI / 1.5} // Limit vertical rotation (down)
        dampingFactor={0.05}
        autoRotate={isAutoRotating}
        autoRotateSpeed={0.5}
        domElement={gl.domElement}
        onStart={handleInteraction}
        onEnd={handleInteraction}
        onChange={handleInteraction}
      />
    </>
  );
};

export default InteractiveCamera;