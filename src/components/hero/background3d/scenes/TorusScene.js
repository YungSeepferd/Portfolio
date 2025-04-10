import React, { useState, useRef } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import { useFrame, useThree } from '@react-three/fiber';
import { Trail, Detailed } from '@react-three/drei';
import * as THREE from 'three';
import { useSceneState } from '../SceneContext';

/**
 * TorusScene Component - With automatic motion
 */
const TorusScene = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { mouse, clock } = useThree();
  const { isTransitioning, scrollActive, themeColors } = useSceneState();
  
  // Trail of cursor positions
  const [cursorTrail, setCursorTrail] = useState([]);
  const trailMaxLength = isMobile ? 12 : 20;
  const frameCounter = useRef(0);
  const prevMousePos = useRef(new THREE.Vector2());
  
  // Auto-animation path points
  const [autoTrailPoints, setAutoTrailPoints] = useState([]);
  const autoTrailMaxPoints = isMobile ? 6 : 12;
  const autoTrailTime = useRef(0);
  
  // Add auto-animation points
  useFrame(() => {
    if (isTransitioning) return;
    
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
      
      if (shouldAddPoint) {
        // Add trail point
        setAutoTrailPoints(prev => {
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
    if (isTransitioning) return;
    
    // Update more frequently for better responsiveness
    frameCounter.current += 1;
    
    if (frameCounter.current % 2 === 0) { // Changed from 3 to 2 for more frequent updates
      const currentTime = clock.getElapsedTime();
      const cursorPos = new THREE.Vector3(
        mouse.x * 4, 
        mouse.y * 2,
        0
      );
      
      // Calculate mouse movement
      const mouseSpeed = new THREE.Vector2(mouse.x, mouse.y)
        .distanceTo(prevMousePos.current);
      
      prevMousePos.current.set(mouse.x, mouse.y);
      
      // Make trail creation more sensitive
      const shouldAddToTrail = 
        cursorTrail.length === 0 || 
        mouseSpeed > 0.005 || // Reduced threshold (was 0.01)
        cursorPos.distanceTo(new THREE.Vector3(
          cursorTrail[cursorTrail.length - 1]?.position.x || 0,
          cursorTrail[cursorTrail.length - 1]?.position.y || 0,
          0
        )) > 0.15; // Reduced threshold (was 0.2)
      
      if (shouldAddToTrail) {
        setCursorTrail(prev => {
          const newTrail = [
            ...prev, 
            { 
              position: cursorPos.clone(),
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
  const activeTrail = cursorTrail.length > 3 ? cursorTrail : autoTrailPoints;
  
  return (
    <group>
      {/* Animated torus rings - from either user movement or auto-animation */}
      {activeTrail.map((point, i) => {
        // Skip rendering some tori on mobile for performance
        if (isMobile && i % 2 !== 0 && i > 2) return null;
        
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
                color={primary}
                opacity={invertedProgress * 0.9} // Increased from 0.8
                transparent={true}
                emissive={secondary}
                emissiveIntensity={invertedProgress * 0.7} // Increased from 0.5
                metalness={0.3} // Increased from 0.2
                roughness={0.5} // Decreased from 0.6
              />
            </mesh>
          </group>
        );
      })}
      
      {/* Trail following current active position - either mouse or auto-position */}
      {activeTrail.length > 0 && (
        <Trail
          width={3} // Increased from 2
          length={activeTrail.length > 3 ? activeTrail.length * 0.7 : 0} // Increased from length/2
          color={trailColor}
          attenuation={(width) => width * 0.8} // Added attenuation for nicer trail
        >
          <mesh visible={false} position={
            cursorTrail.length > 0 
              ? [mouse.x * 4, mouse.y * 2, 0] 
              : [
                  autoTrailPoints[autoTrailPoints.length - 1]?.position.x || 0,
                  autoTrailPoints[autoTrailPoints.length - 1]?.position.y || 0,
                  0
                ]
          } />
        </Trail>
      )}
    </group>
  );
};

export default TorusScene;
