import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { SHAPE_LIMITS, SHAPE_TYPES } from '../constants';
import { useSceneState } from '../SceneContext';
import ObjectPool from '../utils/ObjectPool';

/**
 * SphereScene Component - Enhanced with automatic motion
 */
const SphereScene = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { mouse, clock, camera } = useThree();
  const { isTransitioning, scrollActive, currentShapeType, switchShapeType } = useSceneState();
  
  // Set up pools of shapes for reuse
  const [shapesPool] = useState(() => 
    new ObjectPool(SHAPE_LIMITS.SPHERE.desktop, () => ({ 
      position: new THREE.Vector3(), 
      velocity: new THREE.Vector3(),
      rotation: new THREE.Euler(),
      scale: new THREE.Vector3(1, 1, 1),
      type: SHAPE_TYPES.SPHERE,
      hovered: false,
      excitementLevel: 0,
      ref: React.createRef(),
      matrixAutoUpdate: false,
      // Add auto-movement properties with REDUCED SPEED
      autoMovement: {
        speed: Math.random() * 0.005 + 0.001, // REDUCED from 0.01 + 0.002
        direction: new THREE.Vector3(
          Math.random() * 2 - 1,
          Math.random() * 2 - 1,
          Math.random() * 2 - 1
        ).normalize(),
        rotationSpeed: {
          x: Math.random() * 0.005, // REDUCED from 0.01
          y: Math.random() * 0.005, // REDUCED from 0.01
          z: Math.random() * 0.005  // REDUCED from 0.01
        },
        timeOffset: Math.random() * 1000
      }
    }))
  );
  
  // Store active shapes
  const [activeShapes, setActiveShapes] = useState([]);
  
  // User's cursor position in 3D space - reuse this vector
  const cursorPosition = useRef(new THREE.Vector3());
  // Reusable vectors for calculations to avoid memory allocations
  const tempVector = useRef(new THREE.Vector3());
  const tempVector2 = useRef(new THREE.Vector3());
  
  // Geometry options for different shape types - memoized to prevent recreations
  const geometries = useMemo(() => [
    <sphereGeometry args={[0.2, 16, 16]} />, // SPHERE
    <boxGeometry args={[0.3, 0.3, 0.3]} />,  // BOX
    <torusGeometry args={[0.2, 0.08, 16, 32]} /> // TORUS
  ], []);

  // Get theme colors for each shape type to ensure consistent branding
  const shapeColors = useMemo(() => {
    // Helper to convert hex to HSL
    const hexToHSL = (hex) => {
      // Remove the # if present
      hex = hex.replace('#', '');
      
      // Convert hex to RGB
      const r = parseInt(hex.substr(0, 2), 16) / 255;
      const g = parseInt(hex.substr(2, 2), 16) / 255;
      const b = parseInt(hex.substr(4, 2), 16) / 255;
      
      // Find max and min values to calculate lightness
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const l = (max + min) / 2;
      
      let h, s;
      
      if (max === min) {
        h = s = 0; // achromatic
      } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
          default: h = 0;
        }
        
        h /= 6;
      }
      
      return { h, s, l };
    };
    
    // Extract colors from theme
    const primary = hexToHSL(theme.palette.primary.main);
    const secondary = hexToHSL(theme.palette.secondary.main);
    const info = hexToHSL(theme.palette.info?.main || '#29b6f6');
    
    return {
      [SHAPE_TYPES.SPHERE]: primary,
      [SHAPE_TYPES.BOX]: secondary,
      [SHAPE_TYPES.TORUS]: info,
      hover: hexToHSL(theme.palette.secondary.light), // Hover state color
    };
  }, [theme.palette]);
  
  // Initialize the shapes
  useEffect(() => {
    const count = isMobile ? SHAPE_LIMITS.SPHERE.mobile : SHAPE_LIMITS.SPHERE.desktop;
    const nextActiveShapes = [];
    
    for (let i = 0; i < count; i++) {
      const shape = shapesPool.get();
      if (shape) {
        // Random starting position
        shape.position.set(
          THREE.MathUtils.randFloatSpread(10),
          THREE.MathUtils.randFloatSpread(10),
          THREE.MathUtils.randFloatSpread(5)
        );
        
        // Random velocity - REDUCED speed range
        shape.velocity.set(
          THREE.MathUtils.randFloat(-0.002, 0.002), // REDUCED from -0.005, 0.005
          THREE.MathUtils.randFloat(-0.002, 0.002), // REDUCED from -0.005, 0.005
          THREE.MathUtils.randFloat(-0.002, 0.002)  // REDUCED from -0.005, 0.005
        );
        
        // Random rotation
        shape.rotation.set(
          THREE.MathUtils.randFloat(0, Math.PI * 2),
          THREE.MathUtils.randFloat(0, Math.PI * 2),
          THREE.MathUtils.randFloat(0, Math.PI * 2)
        );
        
        shape.type = currentShapeType;
        shape.hovered = false;
        shape.excitementLevel = 0;
        shape.scale.set(1, 1, 1);
        
        // Reset auto-movement properties with SLOWER speeds
        shape.autoMovement = {
          speed: Math.random() * 0.005 + 0.001, // REDUCED from 0.01 + 0.002
          direction: new THREE.Vector3(
            Math.random() * 2 - 1,
            Math.random() * 2 - 1,
            Math.random() * 2 - 1
          ).normalize(),
          rotationSpeed: {
            x: Math.random() * 0.005, // REDUCED from 0.01
            y: Math.random() * 0.005, // REDUCED from 0.01
            z: Math.random() * 0.005  // REDUCED from 0.01
          },
          timeOffset: Math.random() * 1000
        };
        
        nextActiveShapes.push(shape);
      }
    }
    
    setActiveShapes(nextActiveShapes);
    
    return () => {
      // Clean up - return all shapes to the pool
      nextActiveShapes.forEach(shape => {
        shapesPool.release(shape);
      });
    };
  }, [isMobile, shapesPool, currentShapeType]);
  
  // Update cursor position from mouse - reuse existing vector
  useFrame(() => {
    cursorPosition.current.set(
      (mouse.x * camera.position.z * camera.aspect),
      (mouse.y * camera.position.z),
      0
    );
  });
  
  // Animation and physics logic with optimizations
  useFrame(() => {
    if (isTransitioning) return;
    
    // Apply a wave effect if user is scrolling
    const scrollEffect = scrollActive ? Math.sin(clock.getElapsedTime() * 6) * 0.15 : 0;
    const currentTime = clock.getElapsedTime();
    
    activeShapes.forEach(shape => {
      // AUTOMATIC MOTION: Apply continuous gentle movement even when cursor is not near
      const autoMove = shape.autoMovement;
      const timeInfluence = Math.sin(currentTime + autoMove.timeOffset) * 0.5 + 0.5;
      const autoVelocity = tempVector2.current.copy(autoMove.direction).multiplyScalar(autoMove.speed * timeInfluence);
      
      // Add auto-movement to regular velocity
      tempVector.current.copy(shape.velocity).add(autoVelocity);
      shape.position.add(tempVector.current);
      
      // Auto-rotation
      shape.rotation.x += autoMove.rotationSpeed.x;
      shape.rotation.y += autoMove.rotationSpeed.y;
      shape.rotation.z += autoMove.rotationSpeed.z;
      
      // Bounce off boundaries
      ['x', 'y', 'z'].forEach(axis => {
        if (Math.abs(shape.position[axis]) > 5) {
          shape.velocity[axis] *= -1;
          // Also reverse auto-movement direction for this axis
          autoMove.direction[axis] *= -1;
        }
      });
      
      // Apply scroll effect
      if (scrollActive) {
        shape.position.y += scrollEffect;
      }
      
      // Calculate distance to cursor using our reused vector
      tempVector.current.copy(shape.position);
      const distToCursor = tempVector.current.distanceTo(cursorPosition.current);
      
      // Type-specific behavior when near cursor
      if (distToCursor < 3) {
        // Calculate interaction strength based on distance
        const strength = 1 - (distToCursor / 3);
        
        // Each shape type has different behavior
        if (shape.type === SHAPE_TYPES.SPHERE) {
          // Spheres are attracted to cursor - use temp vectors
          tempVector.current.subVectors(cursorPosition.current, shape.position)
            .normalize()
            .multiplyScalar(0.005 * strength); // REDUCED from 0.01 * strength
          
          shape.velocity.add(tempVector.current);
          shape.excitementLevel = Math.min(1, shape.excitementLevel + 0.015);
        } 
        else if (shape.type === SHAPE_TYPES.BOX) {
          // Boxes run away from cursor
          tempVector.current.subVectors(shape.position, cursorPosition.current)
            .normalize()
            .multiplyScalar(0.01 * strength); // REDUCED from 0.02 * strength
          
          shape.velocity.add(tempVector.current);
          shape.excitementLevel = Math.min(1, shape.excitementLevel + 0.015);
        }
        else if (shape.type === SHAPE_TYPES.TORUS) {
          // Toruses pulse in size
          const pulseScale = 1 + 0.4 * strength * Math.sin(clock.getElapsedTime() * 6);
          shape.scale.set(pulseScale, pulseScale, pulseScale);
          
          // Add rotation to torus when active
          shape.rotation.x += 0.04 * strength;
          shape.rotation.y += 0.06 * strength;
          
          shape.excitementLevel = Math.min(1, shape.excitementLevel + 0.04);
        }
      } else {
        // Reset when away from cursor - gentler decay
        shape.excitementLevel = Math.max(0, shape.excitementLevel - 0.008);
        
        // Reset scale for special shapes
        if (shape.type === SHAPE_TYPES.TORUS) {
          shape.scale.lerp(tempVector2.current.set(1, 1, 1), 0.08);
        }
      }
      
      // Limit velocity - REDUCED maximum speed
      const maxSpeed = 0.02; // REDUCED from 0.035
      if (shape.velocity.length() > maxSpeed) {
        shape.velocity.normalize().multiplyScalar(maxSpeed);
      }
      
      // Add a stronger dampening factor to gradually slow shapes
      shape.velocity.multiplyScalar(0.97); // INCREASED dampening from 0.99
      
      // Update the actual mesh
      if (shape.ref.current) {
        // Position and rotation updates
        shape.ref.current.position.copy(shape.position);
        shape.ref.current.rotation.copy(shape.rotation);
        shape.ref.current.scale.copy(shape.scale);
        
        // Manually update matrix for better performance since we disabled matrixAutoUpdate
        shape.ref.current.updateMatrix();
        
        // Update material color based on excitement
        if (shape.ref.current.material) {
          // Get the base color for this shape type from our theme-based colors
          const baseColor = shapeColors[shape.type];
          
          // Excitement shifts toward hover/interactive color
          const hue = shape.hovered 
            ? shapeColors.hover.h // Use hover color from theme
            : THREE.MathUtils.lerp(baseColor.h, shapeColors.hover.h, shape.excitementLevel);
            
          const saturation = THREE.MathUtils.lerp(baseColor.s, 1.0, shape.excitementLevel);
          const lightness = THREE.MathUtils.lerp(baseColor.l, 0.7, shape.excitementLevel);
          
          // Only update material color when there's a significant change
          if (Math.abs(shape.ref.current.material.emissiveIntensity - shape.excitementLevel * 0.5) > 0.05) {
            shape.ref.current.material.color.setHSL(hue, saturation, lightness);
            shape.ref.current.material.emissive.setHSL(hue, saturation, lightness + 0.2);
            shape.ref.current.material.emissiveIntensity = shape.excitementLevel * 0.5;
            shape.ref.current.material.needsUpdate = true;
          }
        }
      }
    });
  });
  
  // Switch shape type handler to ensure we cycle only through 3 shapes
  const handleSwitchShapeType = () => {
    switchShapeType((prev) => (prev + 1) % 3); // Ensure we only cycle through 3 shapes
  };

  return (
    <>
      {activeShapes.map((shape, i) => (
        <mesh
          key={i}
          ref={shape.ref}
          position={shape.position}
          onPointerOver={() => { shape.hovered = true; }}
          onPointerOut={() => { shape.hovered = false; }}
          onClick={() => handleSwitchShapeType()}
          matrixAutoUpdate={false} // Performance optimization - we'll update matrices manually
        >
          {geometries[shape.type]}
          <meshStandardMaterial 
            color={theme.palette.primary.main}
            emissive={theme.palette.primary.light}
            emissiveIntensity={0.2}
            metalness={0.2} // Add metalness for better visual quality
            roughness={0.7} // Add roughness for better visual quality
          />
        </mesh>
      ))}
    </>
  );
};

export default SphereScene;
