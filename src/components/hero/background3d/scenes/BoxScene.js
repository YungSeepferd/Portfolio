import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { useSceneState } from '../SceneContext';
import { getDynamicColor, themeColorToThreeColor } from '../utils/sceneThemeUtils';
import { SHAPE_TYPES } from '../constants';

/**
 * BoxScene Component - Enhanced with automatic motion and better mouse tracking
 * 
 * Creates an interactive 3D grid of cubes that:
 * - Responds to mouse movement with a ripple effect
 * - Features automatic wave motion when not interacted with
 * - Changes colors based on energy/activation levels
 */
const BoxScene = ({ 
  onClick, 
  onDragStart, 
  onDragEnd, 
  isDragging, 
  theme: propTheme, 
  performanceMode = 'medium' 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { clock } = useThree();
  const { isInteractionEnabled, hasInteraction } = useSceneState();
  
  // Number of cubes in the grid
  const gridSize = isMobile ? 5 : 8;
  
  // Cube references and state
  const cubeRefs = useRef([]);
  const cubeStates = useRef([]);
  
  // Simplified cursor tracking using pointer events
  const [cursorWorldPosition, setCursorWorldPosition] = useState({ x: 0, z: 0 });
  
  // State for easter egg and interaction tracking
  const [easterEggActive] = useState(false);
  const [interactionCount] = useState(0);
  const [isTransitioning] = useState(false);

  // Track previous cursor position for movement detection
  const prevCursorPosition = useRef({ x: 0, z: 0 });
  const hasCursorMoved = useRef(false);
  const lastCursorMoveTime = useRef(0);
  
  // Initialize cube grid
  const cubeGrid = useMemo(() => {
    const grid = [];
    const spacing = 1.0;
    const offset = ((gridSize - 1) * spacing) / 2;
    
    cubeRefs.current = [];
    cubeStates.current = [];
    
    console.log('📦 BoxScene Grid Setup:', { gridSize, spacing, offset });
    
    for (let x = 0; x < gridSize; x++) {
      for (let z = 0; z < gridSize; z++) {
        const index = x * gridSize + z;
        const xPos = (x * spacing) - offset;
        const zPos = (z * spacing) - offset;
        
        grid.push({
          index,
          position: new THREE.Vector3(xPos, 0, zPos),
          gridCoords: { x, z } // Add grid coordinates for debugging
        });
        
        console.log(`📦 Cube[${index}] at grid(${x},${z}) → world(${xPos.toFixed(1)}, ${zPos.toFixed(1)})`);
        
        cubeRefs.current[index] = React.createRef();
        cubeStates.current[index] = {
          targetY: 0,
          currentY: 0,
          energy: 0,
          lastActive: 0,
          // Add properties for automatic motion
          autoMovement: {
            phase: Math.random() * Math.PI * 2, // Random starting phase
            speed: 0.5 + Math.random() * 0.5,  // Random wave speed
            amplitude: 0.1 + Math.random() * 0.3 // Random height
          }
        };
      }
    }
    
    return grid;
  }, [gridSize]);
  
  // Add ref for wave origin point
  const waveOrigin = useRef(new THREE.Vector2(0, 0));
  const waveActive = useRef(false);
  const waveTime = useRef(0);
  
  // Trigger a wave effect occasionally
  useEffect(() => {
    if (easterEggActive) {
      // Generate random wave origin
      waveOrigin.current.set(
        (Math.random() * 2 - 1) * 3,
        (Math.random() * 2 - 1) * 3
      );
      waveActive.current = true;
      waveTime.current = 0;
      
      // Disable wave after a few seconds
      const timer = setTimeout(() => {
        waveActive.current = false;
      }, 4000);
      
      return () => clearTimeout(timer);
    }
  }, [easterEggActive, interactionCount]);
  
  // Animation logic for cubes with enhanced mouse interaction
  useFrame(() => {
    if (isTransitioning) return;
    
    const currentTime = clock.getElapsedTime();
    
    // Initialize ripple variables at the beginning of the function
    let rippleCenter = null;
    let rippleStrength = Math.sin(currentTime * 3) * 0.5;
    
    // Track cursor movement
    if (cursorWorldPosition) {
      const distMoved = Math.sqrt(
        Math.pow(cursorWorldPosition.x - prevCursorPosition.current.x, 2) +
        Math.pow(cursorWorldPosition.z - prevCursorPosition.current.z, 2)
      );
      
      if (distMoved > 0.05) {
        hasCursorMoved.current = true;
        lastCursorMoveTime.current = currentTime;
        
        // Create a ripple at cursor position when moving
        rippleCenter = {
          x: cursorWorldPosition.x,
          z: cursorWorldPosition.z
        };
        rippleStrength = 0.4; // Further reduced for more precise effect
        
        // Update previous position
        prevCursorPosition.current = {...cursorWorldPosition};
      } else if (currentTime - lastCursorMoveTime.current > 0.3) {
        hasCursorMoved.current = false;
      }
    }
    
    // Increment wave time if active
    if (waveActive.current) {
      waveTime.current += 0.05;
    }
    
    // Create cursor-based ripples when cursor moves
    if (hasCursorMoved.current && isInteractionEnabled) {
      rippleCenter = {
        x: cursorWorldPosition.x,
        z: cursorWorldPosition.z
      };
      rippleStrength = 0.4; // Reduced strength for more precise effect
    }
    // Create automatic ripples occasionally
    else if (easterEggActive || (currentTime % 10 < 0.1 && !hasInteraction)) {
      // Random ripple center
      rippleCenter = {
        x: (Math.random() * 2 - 1) * (gridSize * 0.4), // Reduced area
        z: (Math.random() * 2 - 1) * (gridSize * 0.4)  // Reduced area
      };
      rippleStrength = 0.6; // Reduced from 0.8
    }
    
    // Update each cube
    cubeGrid.forEach((cube) => {
      const cubeRef = cubeRefs.current[cube.index];
      const state = cubeStates.current[cube.index];
      
      if (!cubeRef.current) return;
      
      // Calculate heightmap from various influences
      let finalHeight = 0;
      
      // 1. Basic sine wave pattern
      const autoHeight = Math.sin(currentTime * state.autoMovement.speed + state.autoMovement.phase + cube.position.x + cube.position.z) * state.autoMovement.amplitude;
      finalHeight += autoHeight;
      
      // 2. Mouse/cursor influence - precise localized interaction
      if (isInteractionEnabled) {
        const dist = Math.sqrt(
          Math.pow(cube.position.x - cursorWorldPosition.x, 2) + 
          Math.pow(cube.position.z - cursorWorldPosition.z, 2)
        );
        
        // Precise interaction radius for localized effect (about 3x3 grid)
        const interactionRadius = 1.5; // Fixed radius for consistent interaction
        if (dist < interactionRadius) {
          // Sharp falloff for precise activation
          const strength = Math.pow(1 - Math.min(1, dist / interactionRadius), 2.0);
          finalHeight += 1.2 * strength;
          state.energy = Math.min(1, state.energy + 0.2 * strength);
          state.lastActive = currentTime;
          
          // Debug logging for activated cubes
          console.log(`🔥 ACTIVATED Cube[${cube.index}] grid(${cube.gridCoords.x},${cube.gridCoords.z}) world(${cube.position.x.toFixed(1)},${cube.position.z.toFixed(1)}) dist=${dist.toFixed(2)} strength=${strength.toFixed(2)}`);
        }
      }
      
      // 3. Apply ripple effect with improved parameters
      if (rippleCenter) {
        const rippleDist = Math.sqrt(
          Math.pow(cube.position.x - rippleCenter.x, 2) + 
          Math.pow(cube.position.z - rippleCenter.z, 2)
        );
        
        // Controlled ripple effect for wave propagation
        const waveFrequency = 2.0; 
        const maxRippleDistance = 4.0; // Limited distance for controlled waves
        
        if (rippleDist < maxRippleDistance) {
          // Calculate ripple wave effect with controlled propagation
          const ripplePhase = rippleDist * waveFrequency - currentTime * 5;
          const falloff = Math.pow(1 - Math.min(1, rippleDist / maxRippleDistance), 1.0);
          const rippleEffect = Math.sin(ripplePhase) * rippleStrength * falloff;
          
          finalHeight += rippleEffect * 0.8; // Reduced intensity
          
          // Add energy based on ripple for visual effects
          if (Math.abs(rippleEffect) > 0.1) {
            state.energy = Math.max(state.energy, Math.abs(rippleEffect) * 0.5);
          }
        }
      }
      
      // 4. Easter egg wave effect
      if (waveActive.current && waveTime.current < 8) {
        const distFromWave = Math.sqrt(
          Math.pow(cube.position.x - waveOrigin.current.x, 2) + 
          Math.pow(cube.position.z - waveOrigin.current.y, 2)
        );
        
        // Create an expanding circular wave
        const waveRadius = waveTime.current * 1.2;
        const waveWidth = 1.0;
        const distFromWaveEdge = Math.abs(distFromWave - waveRadius);
        
        if (distFromWaveEdge < waveWidth) {
          // Cube is in the wave front
          const waveIntensity = 1.0 - (distFromWaveEdge / waveWidth);
          finalHeight += waveIntensity * 2.0 * (1.0 - (waveTime.current / 8));
          state.energy = Math.max(state.energy, waveIntensity);
        }
      }
      
      // 5. Easter egg special effects
      if (easterEggActive) {
        // Add synchronized height patterns
        const gridX = Math.floor((cube.position.x + (gridSize/2)) / 1.0);
        const gridZ = Math.floor((cube.position.z + (gridSize/2)) / 1.0);
        
        // Checkerboard pattern
        const isEvenSquare = (gridX + gridZ) % 2 === 0;
        const checkerboardHeight = isEvenSquare ? 
          Math.sin(currentTime * 3) * 0.5 : 
          Math.sin(currentTime * 3 + Math.PI) * 0.5;
          
        finalHeight += checkerboardHeight;
        
        // Increase energy for more visual effects
        state.energy = Math.max(state.energy, 0.3);
      } else {
        // When not in Easter egg mode, reduce energy gradually
        state.energy = Math.max(0, state.energy - 0.03);
      }
      
      // Set the target height
      state.targetY = finalHeight;
      
      // Smooth movement toward target height - faster response
      state.currentY += (state.targetY - state.currentY) * 0.15; // Increased from 0.1
      
      // Update cube position and appearance
      cubeRef.current.position.y = state.currentY;
      
      // Auto-rotation based on energy level and Easter egg status
      const rotationMultiplier = easterEggActive ? 3.0 : 1.0;
      const baseRotationSpeed = 0.001 * rotationMultiplier;
      cubeRef.current.rotation.y += baseRotationSpeed + state.energy * 0.03 * rotationMultiplier;
      cubeRef.current.rotation.x += baseRotationSpeed + state.energy * 0.02 * rotationMultiplier;
      
      // Update scale based on energy in Easter egg mode
      if (easterEggActive) {
        const scalePulse = 1.0 + state.energy * 0.3 * Math.sin(currentTime * 4 + cube.index * 0.2);
        cubeRef.current.scale.set(scalePulse, scalePulse, scalePulse);
      } else {
        cubeRef.current.scale.set(1, 1, 1);
      }
      
      // Update color based on energy and mode using the unified color system
      if (cubeRef.current.material) {
        // Use the getDynamicColor helper for consistent color derivation
        const dynamicColors = getDynamicColor(
          theme,
          currentTime + (cube.index * 0.1), // Add cube index for variation
          state.energy,
          SHAPE_TYPES.CUBE,
          false // not hovered
        );
        
        // Apply colors to material
        cubeRef.current.material.color.copy(dynamicColors.main);
        cubeRef.current.material.emissive.copy(dynamicColors.emissive);
        cubeRef.current.material.emissiveIntensity = dynamicColors.emissiveIntensity;
        
        // Override with rainbow colors in Easter egg mode
        if (easterEggActive) {
          const hue = ((currentTime * 0.2) + (cube.index * 0.01)) % 1.0;
          cubeRef.current.material.color.setHSL(hue, 0.8, 0.5);
          cubeRef.current.material.emissive.setHSL(hue, 0.9, 0.3);
          cubeRef.current.material.emissiveIntensity = 0.5;
        }
        
        // Update material
        cubeRef.current.material.needsUpdate = true;
      }
    });
  });
  
  return (
    <group position={[0, -1, 0]}>
      {/* Invisible ground plane for pointer events */}
      <mesh
        position={[0, -0.5, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        onPointerMove={(event) => {
          // Update cursor position from pointer event
          setCursorWorldPosition({
            x: event.point.x,
            z: event.point.z
          });
        }}
        visible={false}
      >
        <planeGeometry args={[gridSize * 2, gridSize * 2]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      
      {/* Add central light in Easter egg mode */}
      {easterEggActive && (
        <pointLight
          position={[0, 2, 0]}
          intensity={2}
          distance={10}
          color={new THREE.Color().setHSL(0.8, 0.8, 0.6)} // Theme-derived color
        />
      )}
      
      {/* Cube meshes with theme-derived base colors */}
      {cubeGrid.map((cube, i) => {
        // Get initial color from theme
        const baseColor = themeColorToThreeColor(theme.palette.secondary.main);
        const emissiveColor = themeColorToThreeColor(theme.palette.secondary.light);
        
        return (
          <mesh
            key={i}
            ref={cubeRefs.current[i]}
            position={[cube.position.x, 0, cube.position.z]}
          >
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial 
              color={baseColor}
              emissive={emissiveColor}
              emissiveIntensity={0}
              metalness={0.3}
              roughness={0.7}
            />
          </mesh>
        );
      })}
    </group>
  );
};

export default BoxScene;