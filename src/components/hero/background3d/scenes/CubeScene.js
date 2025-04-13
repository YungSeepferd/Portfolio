import React, { useRef, useMemo } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useSceneState } from '../SceneContext';

/**
 * CubeScene Component - With automatic motion
 */
const CubeScene = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { mouse, clock } = useThree();
  const { isTransitioning, scrollActive } = useSceneState();
  
  // Number of cubes in the grid
  const gridSize = isMobile ? 5 : 8;
  
  // Cube references and state
  const cubeRefs = useRef([]);
  const cubeStates = useRef([]);
  
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
  
  // Animation logic for cubes
  useFrame(() => {
    if (isTransitioning) return;
    
    // Get cursor position in world space
    const cursorX = mouse.x * 4;
    const cursorZ = -mouse.y * 4;
    
    // Apply ripple effect if scrolling
    const currentTime = clock.getElapsedTime();
    const rippleCenter = scrollActive ? { x: 0, z: 0 } : null;
    const rippleStrength = Math.sin(currentTime * 3) * 0.5;
    
    // Apply size calculations to all cube elements
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
        Math.pow(cube.position.x - cursorX, 2) + 
        Math.pow(cube.position.z - cursorZ, 2)
      );
      
      // Set target height based on cursor proximity and auto-motion
      if (dist < 1.5) {
        // Closer = higher target + auto motion
        state.targetY = Math.max(state.targetY, 1.0 * (1 - dist / 1.5) + autoHeight * 0.5);
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
      
      // Auto-rotation even when not energized - very subtle
      const baseRotationSpeed = 0.001;
      cubeRef.current.rotation.y += baseRotationSpeed + state.energy * 0.03;
      cubeRef.current.rotation.x += baseRotationSpeed + state.energy * 0.02;
      
      // Update color based on energy
      if (cubeRef.current.material) {
        const timeOffset = cube.index * 0.1;
        // Get theme colors and interpolate between them
        const primaryHue = new THREE.Color(theme.palette.primary.main).getHSL({}).h;
        const secondaryHue = new THREE.Color(theme.palette.secondary.main).getHSL({}).h;
        
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
      }
      
      // Apply size calculations
      const calculatedSize = calculateSize(0.5);
      cubeRef.current.scale.set(calculatedSize, calculatedSize, calculatedSize);
    });
  });
  
  const calculateSize = (size) => {
    // If transitioning, make it smaller
    if (isTransitioning) {
      return size * 0.8;
    }
    
    // Otherwise maintain normal size
    return size;
  };

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
            color={theme.palette.primary.main}
            emissive={theme.palette.primary.dark}
            emissiveIntensity={0}
            metalness={0.3}
            roughness={0.7}
          />
        </mesh>
      ))}
    </group>
  );
};

export default CubeScene;
