import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import { useFrame, useThree } from '@react-three/fiber';
import { Trail, Detailed } from '@react-three/drei';
import * as THREE from 'three';
import { useSceneState } from '../SceneContext';

/**
 * TorusScene Component - With automatic motion
 */
const TorusScene = ({ 
  color = new THREE.Color(0x1976d2), 
  mousePosition, 
  mouseData,
  isTransitioning,
  easterEggActive = false,
  interactionCount = 0
}) => {
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
  
  // Add effect for Easter egg mode
  useEffect(() => {
    if (easterEggActive && isMounted.current) {
      // Create burst of trail points when Easter egg activates
      const burstPoints = [];
      const burstCount = 12;
      
      for (let i = 0; i < burstCount; i++) {
        const angle = (i / burstCount) * Math.PI * 2;
        const radius = 3;
        
        burstPoints.push({
          position: new THREE.Vector3(
            Math.cos(angle) * radius,
            Math.sin(angle) * radius,
            0
          ),
          time: clock.getElapsedTime(),
          size: 0.3,
          rotation: new THREE.Euler(0, 0, angle)
        });
      }
      
      setCursorTrail(burstPoints);
    }
  }, [easterEggActive, clock]);
  
  // Add frames-per-second counter (useful for optimizing particle effects)
  const frameCount = useRef(0);
  const lastFpsUpdate = useRef(0);
  const currentFps = useRef(0);
  
  // Update cursor trail - IMPROVED: more responsive
  useFrame(() => {
    // FPS counter
    frameCount.current++;
    const currentTime = clock.getElapsedTime();
    if (currentTime - lastFpsUpdate.current > 1) {
      currentFps.current = frameCount.current;
      frameCount.current = 0;
      lastFpsUpdate.current = currentTime;
    }
    
    if (isTransitioning || !isMounted.current) return;
    
    // Only process interactions if interaction is enabled
    const shouldProcessInteraction = isInteractionEnabled && !isTransitioning;
    
    // Special effects in Easter egg mode
    if (easterEggActive && frameCounter.current % 10 === 0 && shouldProcessInteraction) {
      // Add random trail points during Easter egg mode
      if (isMounted.current) {
        setCursorTrail(prev => {
          if (!prev || !Array.isArray(prev)) return prev;
          
          // Create a new random point
          const randomAngle = Math.random() * Math.PI * 2;
          const randomRadius = 1 + Math.random() * 4;
          const newPoint = {
            position: new THREE.Vector3(
              Math.cos(randomAngle) * randomRadius,
              Math.sin(randomAngle) * randomRadius,
              (Math.random() - 0.5) * 2
            ),
            time: currentTime,
            size: 0.2 + Math.random() * 0.3,
            rotation: new THREE.Euler(
              Math.random() * Math.PI * 2,
              Math.random() * Math.PI * 2,
              Math.random() * Math.PI * 2
            )
          };
          
          const newTrail = [...prev, newPoint];
          
          // Keep trail at max length
          while (newTrail.length > trailMaxLength * 1.5) {
            newTrail.shift();
          }
          
          return newTrail;
        });
      }
    }
    
    // Update more frequently for better responsiveness
    frameCounter.current += 1;
    
    if (frameCounter.current % 2 === 0 && shouldProcessInteraction) {
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
        mouseSpeed > 0.005 || 
        cursorPosition.current.distanceTo(new THREE.Vector3(
          (cursorTrail[cursorTrail.length - 1]?.position?.x || 0),
          (cursorTrail[cursorTrail.length - 1]?.position?.y || 0),
          0
        )) > 0.15;
      
      // Only add to trail if interaction is enabled
      if (shouldAddToTrail && mousePosition && isMounted.current && shouldProcessInteraction) {
        setCursorTrail(prev => {
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
              size: 0.2 + (mouseSpeed * 3),
              rotation: new THREE.Euler(
                Math.random() * Math.PI * 2,
                Math.random() * Math.PI * 2,
                Math.random() * Math.PI * 2
              )
            }
          ];
          
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
  
  // Get the trail to render - enhanced for Easter egg mode
  const activeTrail = useMemo(() => {
    if (easterEggActive) {
      return cursorTrail.length > 3 ? cursorTrail : autoTrailPoints;
    } else {
      return cursorTrail.length > 3 ? cursorTrail : autoTrailPoints;
    }
  }, [cursorTrail, autoTrailPoints, easterEggActive]);
  
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
      {/* Add interaction hint when interaction is enabled but no activity is happening */}
      {isInteractionEnabled && !cursorTrail.length && !easterEggActive && (
        <mesh position={[0, 0, 0]} scale={[0.5, 0.5, 0.5]}>
          <sphereGeometry args={[0.2, 8, 8]} />
          <meshBasicMaterial
            color={new THREE.Color(primary)}
            transparent
            opacity={0.5 + Math.sin(clock.getElapsedTime() * 2) * 0.3}
          />
        </mesh>
      )}
      
      {/* Add dramatic lighting for Easter egg mode */}
      {easterEggActive && (
        <>
          <pointLight 
            position={[0, 0, 3]} 
            intensity={2} 
            distance={8}
            color={new THREE.Color(1, 0.3, 0.6)}
          />
          <pointLight 
            position={[0, 0, -3]} 
            intensity={2} 
            distance={8}
            color={new THREE.Color(0.3, 0.6, 1)}
          />
        </>
      )}
    
      {/* Animated torus rings with enhanced effects */}
      {activeTrail.map((point, i) => {
        // Special rendering for Easter egg mode
        if (easterEggActive) {
          const specialEffect = i % 3 === 0;
          
          if (specialEffect) {
            return (
              <group 
                key={`special-${i}`} 
                position={point.position}
                rotation={point.rotation}
              >
                <mesh>
                  <torusGeometry args={[point.size * 1.5, 0.05, 16, 32]} />
                  <meshStandardMaterial 
                    color={new THREE.Color(1, 0.3, 0.8)}
                    emissive={new THREE.Color(1, 0.3, 0.8)}
                    emissiveIntensity={0.8}
                    metalness={0.8}
                    roughness={0.2}
                  />
                </mesh>
                <pointLight 
                  intensity={0.5} 
                  distance={3}
                  color={new THREE.Color(1, 0.3, 0.8)}
                />
              </group>
            );
          }
        }
        
        // Skip rendering some tori on mobile for performance
        if (isMobile && i % 2 !== 0 && i > 2) return null;
        
        if (!point?.position) return null;
        
        const progress = i / activeTrail.length;
        const invertedProgress = 1 - progress;
        
        const scrollInfluence = scrollActive ? Math.sin(clock.getElapsedTime() * 5) * 0.3 : 0;
        const size = point.size * (0.5 + invertedProgress) + scrollInfluence;
        const thickness = 0.03 * (0.5 + invertedProgress);
        
        const rotX = point.rotation?.x || 0;
        const rotY = point.rotation?.y || 0;
        const rotZ = point.rotation?.z || 0;
        
        if (easterEggActive) {
          const rotMultiplier = 5.0;
          const sizeMultiplier = 1.2;
          
          return (
            <group 
              key={i} 
              position={point.position}
              rotation={[
                rotX + invertedProgress * clock.getElapsedTime() * 0.2 * rotMultiplier,
                rotY + invertedProgress * clock.getElapsedTime() * 0.3 * rotMultiplier,
                rotZ * rotMultiplier
              ]}
            >
              <mesh>
                <torusGeometry args={[size * sizeMultiplier, thickness, 16, 32]} />
                <meshStandardMaterial 
                  color={new THREE.Color().setHSL((i / activeTrail.length + clock.getElapsedTime() * 0.1) % 1, 0.8, 0.6)}
                  opacity={invertedProgress * 0.9}
                  transparent={true}
                  emissive={new THREE.Color().setHSL(((i / activeTrail.length) + 0.5 + clock.getElapsedTime() * 0.1) % 1, 0.8, 0.6)}
                  emissiveIntensity={invertedProgress}
                  metalness={0.7}
                  roughness={0.3}
                />
              </mesh>
            </group>
          );
        }
        
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
                opacity={invertedProgress * 0.9}
                transparent={true}
                emissive={color || secondary}
                emissiveIntensity={invertedProgress * 0.7}
                metalness={0.3}
                roughness={0.5}
              />
            </mesh>
          </group>
        );
      })}
      
      {/* Enhanced trail for Easter egg mode */}
      {isTrailReady && activeTrail.length >= 3 && (
        <Trail
          width={easterEggActive ? 5 : 3}
          length={Math.min(15, Math.floor(activeTrail.length * 0.5))}
          color={easterEggActive ? '#ff00ff' : trailColor}
          attenuation={(width) => width * 0.8}
          decay={easterEggActive ? 0.2 : 0.5}
        >
          <mesh visible={false} position={trailPositionRef.current} />
        </Trail>
      )}
    </group>
  );
};

export default TorusScene;
