import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import { useFrame, useThree, extend } from '@react-three/fiber';
import * as THREE from 'three';
import { useSceneState } from '../SceneContext';
import Particle from '../ParticleComponent';
// If you're importing P from elsewhere, make sure it's registered first
// import P from '../particles/P'; // Example import

// If P isn't imported and is used directly, register it
// extend({ P: P });

/**
 * TorusScene Component - Completely rebuilt to fix performance issues
 * Uses individual torus meshes instead of Trail component to avoid "offset is out of bounds" errors
 */
const TorusScene = ({ isActive, ...props }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { mouse, clock } = useThree();
  const { isTransitioning, scrollActive } = useSceneState(); // FIXED: Removed the unused themeColors variable
  
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
  const handleTorusClick = (e) => {
    e.stopPropagation(); // Prevent event from reaching background
    // Change shape type only, not scene
    window.sceneContext?.switchShapeType && window.sceneContext.switchShapeType();
  };
  
  // Render the torus trail
  return (
    <group onClick={handleTorusClick}>
      {/* Main torus trail */}
      {trailPoints.map((point, i) => {
        // Calculate progress through the trail (newer points are at the beginning)
        const progress = i / Math.max(1, trailPoints.length);
        const invertedProgress = 1 - progress;
        
        // MODIFIED: More subtle scroll effect
        const time = clock.getElapsedTime();
        const scrollFactor = scrollActive ? Math.sin(time * 3) * 0.03 : 0; // Reduced from 0.1
        
        // Size and thickness calculations
        const size = (point.size || 0.15) * (0.6 + invertedProgress * 0.4) + scrollFactor;
        const thickness = 0.025 * (0.5 + invertedProgress * 0.8);
        
        // Rotation factors with subtle animation
        const rotX = point.rotation?.x || 0;
        const rotY = point.rotation?.y || 0;
        const rotZ = point.rotation?.z || 0;
        
        return (
          <mesh
            key={point.id}
            position={[
              point.position.x,
              point.position.y,
              0
            ]}
            rotation={[
              rotX + invertedProgress * time * 0.1,
              rotY + invertedProgress * time * 0.15,
              rotZ
            ]}
          >
            <torusGeometry args={[size, thickness, 16, 24]} />
            <meshStandardMaterial
              transparent={true}
              opacity={invertedProgress * 0.8}
              color={primary}
              emissive={secondary}
              emissiveIntensity={invertedProgress * 0.7}
              metalness={0.4}
              roughness={0.4}
            />
          </mesh>
        );
      })}
      
      {/* Current position indicator */}
      <mesh 
        position={trailPoints.length > 0 
          ? [trailPoints[0].position.x, trailPoints[0].position.y, 0]
          : [0, 0, 0]
        }
      >
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial 
          color={secondary}
          emissive={secondary}
          emissiveIntensity={0.7}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
};

export default TorusScene;
