import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useSceneState } from '../SceneContext';
// Remove unused Particle import
// import Particle from '../ParticleComponent';

/**
 * TorusScene Component - Completely rebuilt to fix performance issues
 * Uses individual torus meshes instead of Trail component to avoid "offset is out of bounds" errors
 */
const TorusScene = ({ isActive, ...props }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { mouse, clock } = useThree();
  // Destructure only the isTransitioning property that we use
  const { isTransitioning } = useSceneState();
  
  // Store trail points as individual meshes with position data
  const [trailPoints, setTrailPoints] = useState([]);
  const trailMaxPoints = isMobile ? 8 : 15; // Reduced from 15/30 to prevent memory issues
  
  // Refs for optimization
  const mouseRef = useRef(new THREE.Vector2());
  const prevMouseRef = useRef(new THREE.Vector2());
  const autoPathTimer = useRef(0);
  const frameCounter = useRef(0);
  const isMountedRef = useRef(true);
  
  // Track last update time for consistent frame rate
  const lastUpdateTime = useRef(Date.now());
  
  // Get theme-specific colors
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  
  // Cleanup on unmount
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Generate smooth path for automatic motion
  const getAutoPosition = (time) => {
    // Create a complex path using multiple sinusoids for more natural movement
    const x = Math.sin(time * 0.4) * Math.cos(time * 0.3) * 3;
    const y = Math.sin(time * 0.3) * Math.sin(time * 0.5) * 1.5;
    return new THREE.Vector3(x, y, 0);
  };
  
  // Add points to trail with frame rate limiting for performance
  useFrame(() => {
    if (isTransitioning) return;
    
    // Limit updates to maintain consistent frame rate
    const now = Date.now();
    const deltaTime = now - lastUpdateTime.current;
    if (deltaTime < (isMobile ? 60 : 40)) return; // 25 fps on desktop, 16 fps on mobile
    
    // Proceed with update
    lastUpdateTime.current = now;
    frameCounter.current++;
    
    // Update automatic path timer
    autoPathTimer.current += 0.01;
    
    // Update mouse reference (helps smooth motion)
    mouseRef.current.set(mouse.x, mouse.y);
    
    // Detect if mouse has moved enough to add a new point
    const mouseDelta = mouseRef.current.distanceTo(prevMouseRef.current);
    const mouseActive = mouseDelta > (isMobile ? 0.02 : 0.01);
    
    // Add points less frequently
    if (frameCounter.current % (isMobile ? 6 : 3) === 0) {
      // Decide whether to use mouse or auto-generated position
      let newPosition;
      
      if (mouseActive) {
        // Use scaled mouse position
        newPosition = new THREE.Vector3(
          mouse.x * 4,
          mouse.y * 2,
          0
        );
        
        // Update the previous mouse position
        prevMouseRef.current.copy(mouseRef.current);
      } else {
        // Use auto-generated position
        newPosition = getAutoPosition(autoPathTimer.current);
      }
      
      // Only add if mounted and not in transition
      if (isMountedRef.current && !isTransitioning) {
        setTrailPoints(prev => {
          // Create new point with unique ID and initial properties
          const newPoint = {
            id: `trail-${Date.now()}-${Math.random()}`,
            position: newPosition,
            time: clock.getElapsedTime(),
            size: mouseActive ? 0.2 + mouseDelta * 5 : 0.15,
            rotation: new THREE.Euler(
              Math.random() * Math.PI,
              Math.random() * Math.PI,
              Math.random() * Math.PI
            )
          };
          
          // Add to front and remove from end if needed
          const newPoints = [newPoint, ...prev].slice(0, trailMaxPoints);
          return newPoints;
        });
      }
    }
  });
  
  // MODIFIED: Ensure clicking torus only changes shape type, not scene
  // Wrap in useCallback to prevent recreating on every render
  const handleTorusClick = useCallback((e) => {
    e.stopPropagation(); // Prevent event from reaching background
    // Change shape type only, not scene
    window.sceneContext?.switchShapeType && window.sceneContext.switchShapeType();
  }, []);
  
  // Create actual torus meshes from trail points
  const torusMeshes = useMemo(() => {
    return trailPoints.map((point) => {
      return (
        <mesh
          key={point.id}
          position={point.position}
          rotation={point.rotation}
          scale={new THREE.Vector3(point.size, point.size, point.size)}
          onClick={handleTorusClick}
        >
          <torusGeometry args={[0.5, 0.2, 16, 32]} />
          <meshStandardMaterial
            color={primary}
            emissive={secondary}
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      );
    });
  }, [trailPoints, primary, secondary, handleTorusClick]);
  
  return (
    <group {...props}>
      {torusMeshes}
    </group>
  );
};

export default TorusScene;
