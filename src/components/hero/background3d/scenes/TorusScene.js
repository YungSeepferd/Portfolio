import React, { useState, useRef, useEffect } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import { useFrame, useThree } from '@react-three/fiber';
import { Trail, Detailed } from '@react-three/drei';
import * as THREE from 'three';
import { useSceneState } from '../SceneContext';

/**
 * TorusScene Component - With automatic motion
 */
const TorusScene = ({ color = new THREE.Color(0x1976d2), mousePosition, isTransitioning }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { clock } = useThree();
  const { isInteractionEnabled } = useSceneState();
  
  // Extract scene colors from theme
  const themeColors = {
    sceneColors: {
      torus: {
        primary: theme.palette.primary.main,
        secondary: theme.palette.secondary.main,
        trail: theme.palette.secondary.main
      }
    }
  };
  
  // Trail of cursor positions
  const [cursorTrail, setCursorTrail] = useState([]);
  const trailMaxLength = isMobile ? 12 : 20;
  const frameCounter = useRef(0);
  const prevMousePos = useRef(new THREE.Vector2());
  
  // Auto-animation path points - initialize with at least one point to prevent empty array errors
  const [autoTrailPoints, setAutoTrailPoints] = useState([{
    position: new THREE.Vector3(0, 0, 0),
    time: 0,
    size: 0.15,
    rotation: new THREE.Euler(0, 0, 0)
  }]);
  const autoTrailMaxPoints = isMobile ? 6 : 12;
  const autoTrailTime = useRef(0);
  
  // Track cursor position as a Vector3
  const cursorPosition = useRef(new THREE.Vector3());

  // Flag to track if component is mounted to prevent state updates after unmount
  const isMounted = useRef(true);
  
  // Track if trail is ready for rendering to prevent errors
  const [isTrailReady, setIsTrailReady] = useState(false);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);
  
  // Initialize auto trail with some points to prevent empty trail errors
  useEffect(() => {
    // Generate initial trail points along a circle
    const initialPoints = [];
    const count = 5;  // Start with at least 5 points
    
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      initialPoints.push({
        position: new THREE.Vector3(
          Math.sin(angle) * 3,
          Math.cos(angle) * 1.5,
          0
        ),
        time: 0,
        size: 0.15,
        rotation: new THREE.Euler(0, 0, 0)
      });
    }
    
    setAutoTrailPoints(initialPoints);
    
    // Set trail as ready after a short delay to ensure points are populated
    setTimeout(() => {
      if (isMounted.current) {
        setIsTrailReady(true);
      }
    }, 100);
  }, []);
  
  // Update cursor position from props
  useEffect(() => {
    if (mousePosition) {
      cursorPosition.current.set(
        mousePosition.x * 4,
        mousePosition.y * 2,
        0
      );
      prevMousePos.current.set(mousePosition.x, mousePosition.y);
    }
  }, [mousePosition]);

  // Track scroll activity (default to false since we don't have this in context)
  const scrollActive = false;
  
  // Add auto-animation points
  useFrame(() => {
    if (isTransitioning || !isMounted.current) return;
    
    // Update auto-trail timer
    autoTrailTime.current += 0.01;
    
    // Generate smooth circular/figure-8 path
    const t = autoTrailTime.current;
    
    // Only update every few frames
    if (frameCounter.current % 15 === 0) {
      // Create a figure-8 or circular motion when no user input
      const autoX = Math.sin(t) * 3;
      const autoY = Math.sin(t * 1.5) * 1.5;
      
      const newPosition = new THREE.Vector3(autoX, autoY, 0);
      
      // Only add new point if it's far enough from the last one
      const lastPoint = autoTrailPoints[autoTrailPoints.length - 1];
      const shouldAddPoint = !lastPoint || 
                             newPosition.distanceTo(new THREE.Vector3(
                                lastPoint.position.x, 
                                lastPoint.position.y, 
                                0
                             )) > 0.2;
      
      if (shouldAddPoint && isMounted.current) {
        setAutoTrailPoints(prev => {
          // Make sure we have a valid array to prevent errors
          if (!prev || !Array.isArray(prev)) return [{ 
            position: newPosition,
            time: clock.getElapsedTime(),
            size: 0.15 + (Math.sin(t * 2) * 0.05),
            rotation: new THREE.Euler(t * 0.3, t * 0.2, t * 0.1)
          }];
          
          const newTrail = [
            ...prev, 
            { 
              position: newPosition,
              time: clock.getElapsedTime(),
              size: 0.15 + (Math.sin(t * 2) * 0.05), // Size varies slightly
              rotation: new THREE.Euler(t * 0.3, t * 0.2, t * 0.1)
            }
          ];
          
          // Keep trail at max length
          while (newTrail.length > autoTrailMaxPoints) {
            newTrail.shift();
          }
          
          return newTrail;
        });
      }
    }
  });
  
  // Update cursor trail - IMPROVED: more responsive
  useFrame(() => {
    if (isTransitioning || !mousePosition || !isInteractionEnabled || !isMounted.current) return;
    
    // Update more frequently for better responsiveness
    frameCounter.current += 1;
    
    if (frameCounter.current % 2 === 0) { // Changed from 3 to 2 for more frequent updates
      const currentTime = clock.getElapsedTime();
      
      // Calculate mouse movement - using the mousePosition prop
      const mouseSpeed = mousePosition ? 
        new THREE.Vector2(mousePosition.x, mousePosition.y)
          .distanceTo(prevMousePos.current) : 0;
      
      if (mousePosition) {
        prevMousePos.current.set(mousePosition.x, mousePosition.y);
      }
      
      // Make trail creation more sensitive
      const shouldAddToTrail = 
        cursorTrail.length === 0 || 
        mouseSpeed > 0.005 || // Reduced threshold (was 0.01)
        cursorPosition.current.distanceTo(new THREE.Vector3(
          (cursorTrail[cursorTrail.length - 1]?.position?.x || 0),
          (cursorTrail[cursorTrail.length - 1]?.position?.y || 0),
          0
        )) > 0.15; // Reduced threshold (was 0.2)
      
      if (shouldAddToTrail && mousePosition && isMounted.current) {
        setCursorTrail(prev => {
          // Make sure we have a valid array to prevent errors
          if (!prev || !Array.isArray(prev)) return [{ 
            position: cursorPosition.current.clone(),
            time: currentTime,
            size: 0.2 + (mouseSpeed * 3),
            rotation: new THREE.Euler(
              Math.random() * Math.PI * 2,
              Math.random() * Math.PI * 2,
              Math.random() * Math.PI * 2
            )
          }];
          
          const newTrail = [
            ...prev, 
            { 
              position: cursorPosition.current.clone(),
              time: currentTime,
              size: 0.2 + (mouseSpeed * 3), // Increased size multiplier (was 2)
              rotation: new THREE.Euler(
                Math.random() * Math.PI * 2,
                Math.random() * Math.PI * 2,
                Math.random() * Math.PI * 2
              )
            }
          ];
          
          // Keep trail at max length
          while (newTrail.length > trailMaxLength) {
            newTrail.shift();
          }
          
          return newTrail;
        });
      }
    }
  });
  
  // Get theme-specific colors
  const primary = themeColors?.sceneColors?.torus?.primary || theme.palette.primary.main;
  const secondary = themeColors?.sceneColors?.torus?.secondary || theme.palette.secondary.main;
  const trailColor = themeColors?.sceneColors?.torus?.trail || theme.palette.secondary.main;
  
  // Get the trail to render - use user trail if it exists, otherwise use auto trail
  // Ensure we have at least 3 points in the trail to prevent errors
  const activeTrail = cursorTrail.length > 3 ? cursorTrail : autoTrailPoints;
  
  // Reference for trail position
  const trailPositionRef = useRef([0, 0, 0]);

  // Update trail position safely
  useEffect(() => {
    if (mousePosition && cursorTrail.length > 0) {
      trailPositionRef.current = [mousePosition.x * 4, mousePosition.y * 2, 0];
    } else if (autoTrailPoints.length > 0) {
      const lastPoint = autoTrailPoints[autoTrailPoints.length - 1];
      trailPositionRef.current = [
        lastPoint?.position?.x || 0,
        lastPoint?.position?.y || 0,
        0
      ];
    }
  }, [mousePosition, cursorTrail, autoTrailPoints]);
  
  return (
    <group>
      {/* Animated torus rings - from either user movement or auto-animation */}
      {activeTrail.map((point, i) => {
        // Skip rendering some tori on mobile for performance
        if (isMobile && i % 2 !== 0 && i > 2) return null;
        
        // Check if point has valid position to prevent errors
        if (!point?.position) return null;
        
        // Calculate size and appearance based on trail index
        const progress = i / activeTrail.length;
        const invertedProgress = 1 - progress;
        
        // Size influences - scroll creates larger rings
        const scrollInfluence = scrollActive ? Math.sin(clock.getElapsedTime() * 5) * 0.3 : 0; // Increased from 0.2
        const size = point.size * (0.5 + invertedProgress) + scrollInfluence;
        const thickness = 0.03 * (0.5 + invertedProgress);
        
        // Add rotation for more dynamic movement
        const rotX = point.rotation?.x || 0;
        const rotY = point.rotation?.y || 0;
        const rotZ = point.rotation?.z || 0;
        
        return (
          <group 
            key={i} 
            position={point.position}
            rotation={[
              rotX + invertedProgress * clock.getElapsedTime() * 0.2,
              rotY + invertedProgress * clock.getElapsedTime() * 0.3,
              rotZ
            ]}
          >
            <mesh>
              <Detailed distances={[0, 10, 20]}>
                <torusGeometry args={[size, thickness, 16, 32]} />
                <torusGeometry args={[size, thickness, 12, 24]} />
                <torusGeometry args={[size, thickness, 8, 16]} />
              </Detailed>
              <meshStandardMaterial 
                color={color || primary}
                opacity={invertedProgress * 0.9} // Increased from 0.8
                transparent={true}
                emissive={color || secondary}
                emissiveIntensity={invertedProgress * 0.7} // Increased from 0.5
                metalness={0.3} // Increased from 0.2
                roughness={0.5} // Decreased from 0.6
              />
            </mesh>
          </group>
        );
      })}
      
      {/* Trail following current active position - only render when we have enough points */}
      {isTrailReady && activeTrail.length >= 3 && (
        <Trail
          width={3} // Increased from 2
          // Use a more conservative calculation for length to prevent array overruns
          length={Math.min(15, Math.floor(activeTrail.length * 0.5))}
          color={trailColor}
          attenuation={(width) => width * 0.8} // Added attenuation for nicer trail
        >
          <mesh visible={false} position={trailPositionRef.current} />
        </Trail>
      )}
    </group>
  );
};

export default TorusScene;
