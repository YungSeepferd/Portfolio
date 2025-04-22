import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import { useFrame, useThree } from '@react-three/fiber';
import { Trail, Detailed, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useSceneState } from '../SceneContext';
import { themeColorToThreeColor, getDynamicColor } from '../utils/sceneThemeUtils';
import { SHAPE_TYPES } from '../constants';
import ObjectPool from '../utils/ObjectPool';

/**
 * TorusScene Component - With automatic motion
 */
const TorusScene = ({ 
  color = new THREE.Color(), // Will be overridden by theme colors
  mousePosition, 
  mouseData,
  isTransitioning,
  easterEggActive = false,
  interactionCount = 0,
  theme
}) => {
  const localTheme = useTheme(); // Fallback if theme prop isn't provided
  const activeTheme = theme || localTheme;
  const isMobile = useMediaQuery(activeTheme.breakpoints.down('sm'));
  const { clock } = useThree();
  const { isInteractionEnabled } = useSceneState();
  
  // Extract scene colors from theme and use them directly
  const primaryColor = themeColorToThreeColor(activeTheme.palette.primary.main);
  
  // Create a function to get the proper trail color and use it
  const getActiveTrailColor = useCallback(() => {
    if (easterEggActive) {
      // Rainbow effect for Easter egg mode
      return new THREE.Color().setHSL(
        (clock.getElapsedTime() * 0.1) % 1,
        0.9,
        0.6
      );
    } else if (directionIntensity.current > 0.2 && hasMouseMoved.current) {
      // Use direction-based color when moving significantly
      return new THREE.Color().setHSL(
        directionHue.current,
        0.8,
        0.6
      );
    } else {
      // Theme-derived color from extracted colors
      return themeColorToThreeColor(activeTheme.palette.secondary.main);
    }
  }, [activeTheme.palette.secondary.main, clock, easterEggActive]);
  
  // Trail of cursor positions
  const [cursorTrail, setCursorTrail] = useState([]);
  const trailMaxLength = isMobile ? 12 : 20;
  const frameCounter = useRef(0);
  const prevMousePos = useRef(new THREE.Vector2());
  
  // Motion direction tracking for color mapping
  const hasMouseMoved = useRef(false);
  const directionHue = useRef(0);
  const directionIntensity = useRef(0);
  const prevCursorWorldPos = useRef(new THREE.Vector3());
  
  // Auto-animation path points - initialize with at least one point to prevent empty array errors
  const [autoTrailPoints, setAutoTrailPoints] = useState([{
    position: new THREE.Vector3(0, 0, 0),
    time: 0,
    size: 0.4, // Increased from 0.15 for better visibility
    rotation: new THREE.Euler(0, 0, 0)
  }]);
  const autoTrailMaxPoints = isMobile ? 10 : 18; // Increased from 6/12 for more visible rings
  const autoTrailTime = useRef(0);
  
  // Track cursor position as a Vector3
  const cursorPosition = useRef(new THREE.Vector3());

  // Flag to track if component is mounted to prevent state updates after unmount
  const isMounted = useRef(true);
  
  // Track if trail is ready for rendering to prevent errors
  const [isTrailReady, setIsTrailReady] = useState(false);
  
  // Use ObjectPool for torus points to improve performance
  const [pointsPool] = useState(() => 
    new ObjectPool(() => ({
      position: new THREE.Vector3(),
      time: 0,
      size: 0.2,
      rotation: new THREE.Euler(),
    }), 40) // Initialize with enough points to avoid reallocations
  );
  
  // Create a pool of reusable trail points
  const getTrailPoint = useCallback(() => {
    // Use the pool instead of creating objects each time
    return pointsPool.get();
  }, [pointsPool]);
  
  // Release points back to the pool
  const releaseTrailPoint = useCallback((point) => {
    pointsPool.release(point);
  }, [pointsPool]);
  
  // Update cursor direction for hue mapping
  const updateCursorDirection = useCallback((currentPos) => {
    if (!currentPos) return;
    
    // Calculate direction vector (dx, dy)
    const dx = currentPos.x - prevCursorWorldPos.current.x;
    const dy = currentPos.y - prevCursorWorldPos.current.y;
    
    // Only update if there's significant movement
    if (dx*dx + dy*dy > 0.001) {
      // Convert direction to angle using atan2
      const angle = Math.atan2(dy, dx);
      
      // Map angle (-π to π) to hue (0 to 1)
      // Add 0.5 to the normalized value to create more pleasing colors
      const hue = ((angle / (Math.PI * 2)) + 0.5) % 1;
      
      // Store direction data
      directionHue.current = hue;
      directionIntensity.current = Math.min(1, Math.sqrt(dx*dx + dy*dy) * 4);
      hasMouseMoved.current = true;
      
      // Store position for next frame
      prevCursorWorldPos.current.copy(currentPos);
    } else {
      // Gradually reduce intensity when not moving
      directionIntensity.current = Math.max(0, directionIntensity.current - 0.02);
      if (directionIntensity.current < 0.1) {
        hasMouseMoved.current = false;
      }
    }
  }, []);
  
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
    const count = 10;  // Increased from 5 to 10 for more visible rings
    
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const point = getTrailPoint();
      point.position.set(
        Math.sin(angle) * 4, // Increased radius from 3 to 4
        Math.cos(angle) * 2, // Increased radius from 1.5 to 2
        0
      );
      point.time = 0;
      point.size = 0.4; // Increased from 0.15 for more visibility
      point.rotation.set(0, 0, 0);
      initialPoints.push(point);
    }
    
    setAutoTrailPoints(initialPoints);
    
    // Set trail as ready after a short delay to ensure points are populated
    setTimeout(() => {
      if (isMounted.current) {
        setIsTrailReady(true);
      }
    }, 100);
    
    return () => {
      // Clean up points
      initialPoints.forEach(point => releaseTrailPoint(point));
    };
  }, [getTrailPoint, releaseTrailPoint]);
  
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
    
    // Update more frequently for better visibility
    if (frameCounter.current % 5 === 0) { // Changed from 15 to 5 for more frequent updates
      // Create a figure-8 or circular motion when no user input
      const autoX = Math.sin(t) * 4; // Increased from 3 to 4
      const autoY = Math.sin(t * 1.5) * 2; // Increased from 1.5 to 2
      
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
          if (!prev || !Array.isArray(prev)) {
            const point = getTrailPoint();
            point.position.copy(newPosition);
            point.time = clock.getElapsedTime();
            point.size = 0.4 + (Math.sin(t * 2) * 0.1); // Increased base size
            point.rotation.set(t * 0.3, t * 0.2, t * 0.1);
            return [point];
          }
          
          // Get a new point from the pool
          const newPoint = getTrailPoint();
          newPoint.position.copy(newPosition);
          newPoint.time = clock.getElapsedTime();
          newPoint.size = 0.4 + (Math.sin(t * 2) * 0.1); // Increased base size
          newPoint.rotation.set(t * 0.3, t * 0.2, t * 0.1);
          
          // Create new array of points
          const newTrail = [...prev, newPoint];
          
          // Keep trail at max length and return points to pool
          while (newTrail.length > autoTrailMaxPoints) {
            const oldPoint = newTrail.shift();
            if (oldPoint) releaseTrailPoint(oldPoint);
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
        
        const point = getTrailPoint();
        point.position.set(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          0
        );
        point.time = clock.getElapsedTime();
        point.size = 0.3;
        point.rotation.set(0, 0, angle);
        
        burstPoints.push(point);
      }
      
      setCursorTrail(burstPoints);
    }
    
    return () => {
      if (easterEggActive) {
        // Clean up easter egg points when effect changes
        setCursorTrail(prev => {
          prev.forEach(point => releaseTrailPoint(point));
          return [];
        });
      }
    };
  }, [easterEggActive, clock, getTrailPoint, releaseTrailPoint]);
  
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
    
    // Update cursor direction for hue mapping
    if (mouseData?.world) {
      updateCursorDirection(mouseData.world);
    } else if (mousePosition) {
      // Convert screen coordinates to world coordinates
      const worldPos = new THREE.Vector3(mousePosition.x * 8, mousePosition.y * 8, 0);
      updateCursorDirection(worldPos);
    }
    
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
          
          const newPoint = getTrailPoint();
          newPoint.position.set(
            Math.cos(randomAngle) * randomRadius,
            Math.sin(randomAngle) * randomRadius,
            (Math.random() - 0.5) * 2
          );
          newPoint.time = currentTime;
          newPoint.size = 0.2 + Math.random() * 0.3;
          newPoint.rotation.set(
            Math.random() * Math.PI * 2,
            Math.random() * Math.PI * 2,
            Math.random() * Math.PI * 2
          );
          
          const newTrail = [...prev, newPoint];
          
          // Keep trail at max length and return points to pool
          while (newTrail.length > trailMaxLength * 1.5) {
            const oldPoint = newTrail.shift();
            if (oldPoint) releaseTrailPoint(oldPoint);
          }
          
          return newTrail;
        });
      }
    }
    
    // Update more frequently for better responsiveness
    frameCounter.current += 1;
    
    if (frameCounter.current % 2 === 0 && shouldProcessInteraction) {
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
          // Get a new point from the pool
          const newPoint = getTrailPoint();
          newPoint.position.copy(cursorPosition.current);
          newPoint.time = currentTime;
          newPoint.size = 0.2 + (mouseSpeed * 3);
          newPoint.rotation.set(
            Math.random() * Math.PI * 2,
            Math.random() * Math.PI * 2,
            Math.random() * Math.PI * 2
          );
          
          // If prev is invalid, return just the new point
          if (!prev || !Array.isArray(prev)) {
            return [newPoint];
          }
          
          const newTrail = [...prev, newPoint];
          
          // Keep trail at max length and return points to pool
          while (newTrail.length > trailMaxLength) {
            const oldPoint = newTrail.shift();
            if (oldPoint) releaseTrailPoint(oldPoint);
          }
          
          return newTrail;
        });
      }
    }
  });
  
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
      {/* Add clearer interaction hint */}
      {isInteractionEnabled && (
        <mesh position={[0, 0, 0]} scale={[0.8, 0.8, 0.8]}>
          <sphereGeometry args={[0.4, 16, 16]} />
          <meshBasicMaterial
            color={primaryColor}
            transparent
            opacity={0.5 + Math.sin(clock.getElapsedTime() * 2) * 0.3}
          />
          <pointLight 
            intensity={0.8} 
            distance={5}
            color={primaryColor}
          />
        </mesh>
      )}
      
      {/* Add clear instruction text */}
      <group position={[0, 3, 0]}>
        <mesh visible={false}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshBasicMaterial />
        </mesh>
        <Html position={[0, 0, 0]} center style={{ width: '200px', textAlign: 'center', pointerEvents: 'none' }}>
          <div style={{ 
            background: 'rgba(0,0,0,0.7)', 
            color: 'white', 
            padding: '8px 12px', 
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 'bold',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            fontFamily: 'sans-serif'
          }}>
            Move mouse here to create rings
          </div>
        </Html>
      </group>
      
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
          
          // Add return null for special effects that don't meet the condition
          return null;
        }
        
        // Skip rendering some tori on mobile for performance
        if (isMobile && i % 2 !== 0 && i > 2) return null;
        
        if (!point?.position) return null;
        
        const progress = i / activeTrail.length;
        const invertedProgress = 1 - progress;
        
        const scrollInfluence = scrollActive ? Math.sin(clock.getElapsedTime() * 5) * 0.3 : 0;
        // Larger rings for better visibility and interaction
        const size = point.size * (0.7 + invertedProgress) * 2.0 + scrollInfluence; // Increased size multipliers
        // Thicker rings for better visibility
        const thickness = 0.08 * (0.7 + invertedProgress); // Increased from 0.05
        
        // Add velocity-based thickness variation
        const velocityThickness = hasMouseMoved.current && directionIntensity.current > 0.2 ? 
          thickness * (1 + directionIntensity.current * 0.5) : thickness;
        
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
                <torusGeometry args={[size * sizeMultiplier, velocityThickness, 16, 32]} />
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
        
        // For normal mode, use theme-derived colors with direction influence
        if (!easterEggActive) {
          // Use getDynamicColor to maintain consistency with other scenes
          const dynamicColors = getDynamicColor(
            activeTheme,
            clock.getElapsedTime() + (i * 0.05),
            invertedProgress, // Use as energy value
            SHAPE_TYPES.TORUS, // Specify the shape type
            false // Not hovered
          );
          
          // Apply colors consistently with other scenes
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
              {/* Add larger invisible mesh for better click detection */}
              <mesh visible={false}>
                <torusGeometry args={[size * 1.5, thickness * 5, 8, 16]} />
                <meshBasicMaterial transparent opacity={0} />
              </mesh>
              
              {/* Add highlight glow effect for better visibility */}
              <pointLight 
                intensity={0.4 * invertedProgress} 
                distance={2}
                color={dynamicColors.emissive}
              />
              
              <mesh>
                <Detailed distances={[0, 10, 20]}>
                  <torusGeometry args={[size, thickness, 16, 32]} />
                  <torusGeometry args={[size, thickness, 12, 24]} />
                  <torusGeometry args={[size, thickness, 8, 16]} />
                </Detailed>
                <meshStandardMaterial 
                  color={hasMouseMoved.current && directionIntensity.current > 0.2 ?
                    // Use direction-based coloring when moving
                    new THREE.Color().setHSL(
                      directionHue.current,
                      0.7 + invertedProgress * 0.2,
                      0.5 + invertedProgress * 0.1
                    ) :
                    // Use dynamic colors when static
                    dynamicColors.main}
                  opacity={invertedProgress * 0.9}
                  transparent={true}
                  emissive={directionIntensity.current > 0.3 ? 
                    new THREE.Color().setHSL(
                      (directionHue.current + 0.1) % 1.0,
                      0.8,
                      0.4
                    ) : 
                    dynamicColors.emissive}
                  emissiveIntensity={
                    invertedProgress * 0.7 * (1 + (directionIntensity.current * 0.5))
                  }
                  metalness={0.3}
                  roughness={0.5}
                />
              </mesh>
            </group>
          );
        }
        
        return null;
      })}
      
      {/* Enhanced trail for Easter egg mode - make wider and more visible */}
      {isTrailReady && activeTrail.length >= 3 && (
        <Trail
          width={easterEggActive ? 9 : 6 * (1 + (directionIntensity.current * 0.5))} // Increased from 7.5/4.5
          length={Math.min(20, Math.floor(activeTrail.length * 0.7))} // Increased trail length
          color={getActiveTrailColor()}
          attenuation={(width) => width * 0.7} // Less attenuation (was 0.8)
          decay={easterEggActive ? 0.1 : 0.3} // Less decay for longer trails
        >
          <mesh visible={false} position={trailPositionRef.current} />
        </Trail>
      )}
    </group>
  );
};

export default TorusScene;
