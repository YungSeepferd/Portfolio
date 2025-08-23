import React, { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { useTheme } from '@mui/material';
import * as THREE from 'three';
import { useAccessibility } from '../../../contexts/AccessibilityContext';
import { useSceneState } from '../contexts/SceneContext';
import { usePerformanceMonitor } from '../hooks/usePerformanceMonitor';
import { Vector2 } from '../types';

interface BaseSceneProps {
  mousePosition?: Vector2;
  onInteraction?: () => void;
  children: React.ReactNode;
}

export const BaseScene: React.FC<BaseSceneProps> = ({
  mousePosition,
  onInteraction,
  children,
}) => {
  const theme = useTheme();
  const { gl } = useThree();
  const { reducedMotion } = useAccessibility();
  const { performanceMode } = useSceneState();
  const { currentConfig } = usePerformanceMonitor();

  // Call interaction callback when mouse movement is detected
  useEffect(() => {
    if (mousePosition && onInteraction) {
      onInteraction();
    }
  }, [mousePosition, onInteraction]);
  
  const groupRef = useRef<THREE.Group>(null);

  // Apply performance optimizations
  useEffect(() => {
    if (!gl) return;

    // Apply performance mode settings
    gl.setPixelRatio(window.devicePixelRatio * (performanceMode === 'low' ? 0.75 : 1));
    gl.shadowMap.enabled = currentConfig.shadows;
    
    // Optimize for reduced motion if needed
    if (reducedMotion) {
      gl.setPixelRatio(window.devicePixelRatio * 0.75);
    }
  }, [gl, performanceMode, currentConfig.shadows, reducedMotion]);

  // Handle mouse interaction
  useEffect(() => {
    if (!mousePosition || !groupRef.current) return;

    const targetRotation = new THREE.Vector3(
      mousePosition.y * 0.1,
      mousePosition.x * 0.1,
      0
    );

    // Apply smoother rotation for reduced motion
    const rotationSpeed = reducedMotion ? 0.05 : 0.1;
    
    groupRef.current.rotation.x += (targetRotation.x - groupRef.current.rotation.x) * rotationSpeed;
    groupRef.current.rotation.y += (targetRotation.y - groupRef.current.rotation.y) * rotationSpeed;
  }, [mousePosition, reducedMotion]);

  return (
    <group ref={groupRef}>
      {/* Scene lighting adjusted for performance mode */}
      <ambientLight 
        intensity={currentConfig.shadows ? 0.5 : 0.8}
        color={theme.palette.primary.main}
      />
      {currentConfig.shadows && (
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1.5}
          castShadow={currentConfig.shadows}
          shadow-mapSize={[1024, 1024]}
        />
      )}

      {/* Main scene content */}
      {children}
    </group>
  );
};

export default BaseScene;
