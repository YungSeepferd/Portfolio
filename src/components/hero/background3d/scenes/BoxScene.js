import React, { useRef, useMemo } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useSceneState } from '../SceneContext';

/**
 * BoxScene Component - Enhanced with automatic motion and better mouse tracking
 * 
 * Creates an interactive 3D grid of cubes that:
 * - Responds to mouse movement with a ripple effect
 * - Features automatic wave motion when not interacted with
 * - Changes colors based on energy/activation levels
 */
const BoxScene = ({ color = new THREE.Color(0x6366F1), mousePosition, isTransitioning }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { clock } = useThree();
  const { isInteractionEnabled, hasInteraction } = useSceneState();
  
  // Number of cubes in the grid
  const gridSize = isMobile ? 5 : 8;
  
  // Cube references and state
  const cubeRefs = useRef([]);
  const cubeStates = useRef([]);
  
  // Track cursor position in world space
  const cursorWorldPosition = useMemo(() => {
    if (!mousePosition) return { x: 0, z: 0 };
    return {
      // Scale and flip as needed for this scene
      x: mousePosition.x * 5,
      z: -mousePosition.y * 5
    };
  }, [mousePosition]);
  
  // Initialize cube grid
  const cubeGrid = useMemo(() => {
    const grid = [];
    const spacing = 1.0;
    const offset = ((gridSize - 1) * spacing) / 2;
    
    cubeRefs.current = [];
    cubeStates.current = [];
    
    for (let x = 0; x < gridSize; x++) {
      for (let z = 0; z < gridSize; z++) {
        const index = x * gridSize + z;
        const xPos = (x * spacing) - offset;
        const zPos = (z * spacing) - offset;
        
        grid.push({
          index,
          position: new THREE.Vector3(xPos, 0, zPos)
        });
        
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
  
  // Animation logic for cubes with enhanced mouse interaction
  useFrame(() => {
    if (isTransitioning) return;
    
    const currentTime = clock.getElapsedTime();
    
    // Apply ripple effect if scrolling
    const rippleCenter = null; // No specific ripple center from scrolling
    const rippleStrength = Math.sin(currentTime * 3) * 0.5;
    
    // Update each cube
    cubeGrid.forEach((cube) => {
      const cubeRef = cubeRefs.current[cube.index];
      const state = cubeStates.current[cube.index];
      
      if (!cubeRef.current) return;
      
      // AUTOMATIC MOTION: Add a gentle wave effect
      const auto = state.autoMovement;
      // Using cube's position to create varied wave patterns across the grid
      const autoHeight = Math.sin(currentTime * auto.speed + auto.phase + cube.position.x + cube.position.z) * auto.amplitude;
      
      // Calculate distance to cursor
      const dist = Math.sqrt(
        Math.pow(cube.position.x - cursorWorldPosition.x, 2) + 
        Math.pow(cube.position.z - cursorWorldPosition.z, 2)
      );
      
      // Set target height based on cursor proximity and auto-motion
      if (mousePosition && isInteractionEnabled && hasInteraction && dist < 3) {
        // Closer = higher target + auto motion
        const strength = 1 - Math.min(1, dist / 3);
        state.targetY = Math.max(
          state.targetY, 
          1.5 * strength + autoHeight * 0.5
        );
        state.energy = Math.min(1, state.energy + 0.1);
        state.lastActive = currentTime;
      } else {
        // When no cursor interaction, apply auto motion
        state.targetY = autoHeight;
        state.energy = Math.max(0, state.energy - 0.03);
      }
      
      // Apply scroll ripple effect
      if (rippleCenter) {
        const rippleDist = Math.sqrt(
          Math.pow(cube.position.x - rippleCenter.x, 2) + 
          Math.pow(cube.position.z - rippleCenter.z, 2)
        );
        
        if (rippleDist < 5) {
          const rippleEffect = Math.sin(rippleDist * 2 - currentTime * 4) * rippleStrength;
          state.targetY += rippleEffect * 0.3;
        }
      }
      
      // Smooth movement toward target height
      state.currentY += (state.targetY - state.currentY) * 0.1;
      
      // Update cube position and appearance
      cubeRef.current.position.y = state.currentY;
      
      // Auto-rotation - more noticeable when energized
      const baseRotationSpeed = 0.001;
      cubeRef.current.rotation.y += baseRotationSpeed + state.energy * 0.03;
      cubeRef.current.rotation.x += baseRotationSpeed + state.energy * 0.02;
      
      // Update color based on energy
      if (cubeRef.current.material) {
        const timeOffset = cube.index * 0.1;
        // Get theme colors and interpolate between them
        const baseColor = color.clone();
        const primaryHue = baseColor.getHSL({}).h;
        const secondaryHue = (primaryHue + 0.5) % 1; // Complementary color
        
        // Calculate hue based on time and energy
        const timeHue = ((currentTime + timeOffset) * 0.1) % 1;
        
        // Blend between primary and animated colors based on energy
        const finalHue = state.energy > 0 
          ? THREE.MathUtils.lerp(primaryHue, timeHue, state.energy)
          : primaryHue;
          
        cubeRef.current.material.color.setHSL(
          finalHue,
          0.6 + state.energy * 0.4,
          0.5 + state.energy * 0.2
        );
        
        // Add emissive glow for excited state using secondary color
        cubeRef.current.material.emissive.setHSL(
          secondaryHue,
          0.7,
          state.energy * 0.3 // Only glow when energized
        );
        
        // Update material
        cubeRef.current.material.needsUpdate = true;
      }
    });
  });
  
  return (
    <group position={[0, -1, 0]}>
      {cubeGrid.map((cube, i) => (
        <mesh
          key={i}
          ref={cubeRefs.current[i]}
          position={[cube.position.x, 0, cube.position.z]}
        >
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial 
            color={color}
            emissive={color.clone().multiplyScalar(0.5)}
            emissiveIntensity={0}
            metalness={0.3}
            roughness={0.7}
          />
        </mesh>
      ))}
    </group>
  );
};

export default BoxScene;