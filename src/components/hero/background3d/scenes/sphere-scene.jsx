import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
// Removed Tone.js dependency for better performance and stability
import { useTheme, useMediaQuery } from '@mui/material';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SHAPE_LIMITS, SHAPE_TYPES } from '../constants';
import { useSceneState } from '../SceneContext';
import ObjectPool from '../utils/ObjectPool';
import { getDynamicColor, themeColorToThreeColor } from '../utils/sceneThemeUtils';

/**
 * SphereScene Component - Enhanced with camera-aware mouse following
 */
const SphereScene = ({
  color: _color = new THREE.Color(), // Will be overridden by theme-derived colors
  mousePosition,
  mouseData,
  isTransitioning,
  easterEggActive = false,
  interactionCount: _interactionCount = 0,
}) => {
  const theme = useTheme();
  // Audio functionality removed for better performance and stability
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { isInteractionEnabled } = useSceneState();

  // Set up pools of shapes for reuse
  const [shapesPool] = useState(
    () =>
      new ObjectPool(
        () => ({
          position: new THREE.Vector3(),
          velocity: new THREE.Vector3(),
          rotation: new THREE.Euler(),
          scale: new THREE.Vector3(1, 1, 1),
          type: SHAPE_TYPES.SPHERE,
          hovered: false,
          excitementLevel: 0,
          ref: React.createRef(),
          matrixAutoUpdate: false,
          // Auto-movement properties
          autoMovement: {
            speed: Math.random() * 0.005 + 0.001,
            direction: new THREE.Vector3(
              Math.random() * 2 - 1,
              Math.random() * 2 - 1,
              Math.random() * 2 - 1
            ).normalize(),
            rotationSpeed: {
              x: Math.random() * 0.005,
              y: Math.random() * 0.005,
              z: Math.random() * 0.005,
            },
            timeOffset: Math.random() * 1000,
          },
          // Tracking last position for velocity smoothing
          lastPosition: new THREE.Vector3(),
        }),
        isMobile ? SHAPE_LIMITS.SPHERE.mobile : SHAPE_LIMITS.SPHERE.desktop
      )
  );

  // Store active shapes
  const [activeShapes, setActiveShapes] = useState([]);

  // Track if the cursor has moved recently
  const hasMouseMoved = useRef(false);
  const lastMouseMoveTime = useRef(0);

  // Use a bias vector to maintain a direction of movement
  const movementBias = useRef(new THREE.Vector3());

  // User's cursor position in 3D space
  const cursorPosition = useRef(new THREE.Vector3());
  const prevCursorPosition = useRef(new THREE.Vector3());

  // Reusable vectors for calculations
  const tempVector = useRef(new THREE.Vector3());
  const tempVector2 = useRef(new THREE.Vector3());

  // Clock for time-based animations
  const clock = useRef(new THREE.Clock()).current;

  // Get theme colors for each shape
  const shapeColors = useMemo(() => {
    // Helper to convert hex to HSL
    const hexToHSL = (hex) => {
      hex = hex.replace('#', '');

      const r = parseInt(hex.substr(0, 2), 16) / 255;
      const g = parseInt(hex.substr(2, 2), 16) / 255;
      const b = parseInt(hex.substr(4, 2), 16) / 255;

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
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
            break;
          default:
            h = 0;
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

  // Get theme colors for each shape - Use this directly in the dynamic color logic
  const getShapeColor = useCallback(
    (shapeType, isHovered = false) => {
      // Extract the proper color for the shape type from theme
      const hslColor = isHovered
        ? shapeColors.hover
        : shapeColors[shapeType] || shapeColors[SHAPE_TYPES.SPHERE];

      // Create a new THREE.Color and set HSL values
      return new THREE.Color().setHSL(hslColor.h, hslColor.s, hslColor.l);
    },
    [shapeColors]
  );

  // Initialize the shapes
  useEffect(() => {
    const count = isMobile ? SHAPE_LIMITS.SPHERE.mobile : SHAPE_LIMITS.SPHERE.desktop;
    const nextActiveShapes = [];

    for (let i = 0; i < count; i++) {
      const shape = shapesPool.get();
      if (shape) {
        // Random starting position with better distribution
        const radius = 4 + Math.random() * 3; // Distribute in a shell between radius 4 and 7
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        shape.position.set(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi)
        );

        // Random initial velocity (very small to start)
        shape.velocity.set(
          THREE.MathUtils.randFloat(-0.002, 0.002),
          THREE.MathUtils.randFloat(-0.002, 0.002),
          THREE.MathUtils.randFloat(-0.002, 0.002)
        );

        // Save initial position for reference
        shape.lastPosition.copy(shape.position);

        // Random rotation
        shape.rotation.set(
          THREE.MathUtils.randFloat(0, Math.PI * 2),
          THREE.MathUtils.randFloat(0, Math.PI * 2),
          THREE.MathUtils.randFloat(0, Math.PI * 2)
        );

        shape.type = SHAPE_TYPES.SPHERE;
        shape.hovered = false;
        shape.excitementLevel = 0;
        shape.scale.set(1, 1, 1);

        // Reset auto-movement properties with varied parameters
        shape.autoMovement = {
          speed: Math.random() * 0.004 + 0.001,
          direction: new THREE.Vector3(
            Math.random() * 2 - 1,
            Math.random() * 2 - 1,
            Math.random() * 2 - 1
          ).normalize(),
          rotationSpeed: {
            x: Math.random() * 0.005,
            y: Math.random() * 0.005,
            z: Math.random() * 0.005,
          },
          timeOffset: Math.random() * 1000,
        };

        nextActiveShapes.push(shape);
      }
    }

    setActiveShapes(nextActiveShapes);

    return () => {
      nextActiveShapes.forEach((shape) => {
        shapesPool.release(shape);
      });
    };
  }, [isMobile, shapesPool]);

  // Update cursor position from mouseData prop (world coordinates)
  useEffect(() => {
    // If we have the new mouseData with world coordinates, use that
    if (mouseData && mouseData.world) {
      // Use the world position directly since it's already in 3D space
      cursorPosition.current.copy(mouseData.world);

      // Set movement bias from world velocity if available
      if (mouseData.velocity) {
        const velocityLength = mouseData.velocity.length();
        if (velocityLength > 0.001) {
          // Create a normalized direction vector from velocity
          movementBias.current.copy(mouseData.velocity).normalize();
          hasMouseMoved.current = true;
          lastMouseMoveTime.current = clock.getElapsedTime();
        }
      }
    }
    // Fallback to old method if we don't have world coordinates
    else if (mousePosition) {
      // Store previous position before updating
      prevCursorPosition.current.copy(cursorPosition.current);

      // Convert screen coordinates to world space
      cursorPosition.current.set(mousePosition.x * 8, mousePosition.y * 8, 0);

      // Calculate cursor movement for momentum
      tempVector.current.subVectors(cursorPosition.current, prevCursorPosition.current);

      // Update bias when there's significant movement
      if (tempVector.current.lengthSq() > 0.001) {
        movementBias.current.copy(tempVector.current).normalize();
        hasMouseMoved.current = true;
        lastMouseMoveTime.current = clock.getElapsedTime();
      }
    }
  }, [mousePosition, mouseData, clock]);

  // Add cursor direction tracking for color mapping
  const cursorDirection = useRef({ angle: 0, hue: 0 });
  const prevCursorWorldPos = useRef(new THREE.Vector3());

  // Update cursor direction for hue mapping
  const updateCursorDirection = useCallback((currentPos) => {
    if (!currentPos) return;

    // Calculate direction vector (dx, dy)
    const dx = currentPos.x - prevCursorWorldPos.current.x;
    const dy = currentPos.y - prevCursorWorldPos.current.y;

    // Only update if there's significant movement
    if (dx * dx + dy * dy > 0.001) {
      // Convert direction to angle using atan2
      const angle = Math.atan2(dy, dx);

      // Map angle (-π to π) to hue (0 to 1)
      // Add 0.5 to the normalized value to create more pleasing colors (shift to greens/blues)
      const hue = (angle / (Math.PI * 2) + 0.5) % 1;

      // Store direction data
      cursorDirection.current = {
        angle,
        hue,
        intensity: Math.min(1, Math.sqrt(dx * dx + dy * dy) * 3),
      };

      // Store position for next frame
      prevCursorWorldPos.current.copy(currentPos);
    } else {
      // Gradually reduce intensity when not moving
      cursorDirection.current.intensity = Math.max(0, cursorDirection.current.intensity - 0.02);
    }
  }, []);

  // Animation and physics logic with optimizations
  useFrame(() => {
    if (isTransitioning) return;

    const currentTime = clock.getElapsedTime();
    const timeSinceLastMove = currentTime - lastMouseMoveTime.current;

    // Update cursor direction for hue mapping
    if (mouseData?.world) {
      updateCursorDirection(mouseData.world);
    } else if (mousePosition) {
      // Convert screen coordinates to world coordinates
      const worldPos = new THREE.Vector3(mousePosition.x * 8, mousePosition.y * 8, 0);
      updateCursorDirection(worldPos);
    }

    // Reset mouse movement flag after 0.5 seconds of no movement
    if (hasMouseMoved.current && timeSinceLastMove > 0.5) {
      hasMouseMoved.current = false;
    }

    // Fun Mode Special Effects - activate when Easter egg is triggered
    const funModeActive = easterEggActive;
    const funModeInfluence = funModeActive ? Math.sin(currentTime * 4) * 0.5 + 0.5 : 0;

    // Get the directional hue for color syncing
    const directionHue = cursorDirection.current.hue;
    const directionIntensity = cursorDirection.current.intensity;

    // Keep track of spheres that are interacting with cursor for spread calculations
    const interactingSpheres = [];

    // First pass: Update basic physics and collect interacting spheres
    activeShapes.forEach((shape, index) => {
      // Save last position for later reference
      shape.lastPosition.copy(shape.position);

      // AUTOMATIC MOTION: More subtle when cursor is active
      const autoMove = shape.autoMovement;
      const autoInfluence = hasMouseMoved.current ? 0.3 : 1.0; // Reduce auto-motion when cursor is active

      // Enhanced fun mode behaviors - now properly using funModeInfluence
      if (funModeActive) {
        // Apply funModeInfluence to create pulsating color and size effects
        const pulseFrequency = 2.0 + funModeInfluence * 4.0; // Faster pulse with higher influence
        const pulseAmplitude = 0.4 * (0.5 + funModeInfluence); // Stronger pulse with higher influence
        const pulsePhase = (index / activeShapes.length) * Math.PI * 2;
        const pulseFactor =
          Math.sin(currentTime * pulseFrequency + pulsePhase) * pulseAmplitude + 1.0;

        // Apply scale pulsing with funModeInfluence for added excitement
        shape.scale.set(
          pulseFactor * (1 + funModeInfluence * 0.2),
          pulseFactor * (1 + funModeInfluence * 0.2),
          pulseFactor * (1 + funModeInfluence * 0.2)
        );

        // Make spheres orbit center with funModeInfluence affecting orbit speed
        if (shape.excitementLevel > 0.5 || funModeInfluence > 0.7) {
          const orbitRadius = 4 + funModeInfluence * 2; // Larger orbit with higher influence
          const orbitSpeed = (0.5 + shape.excitementLevel) * (1 + funModeInfluence);
          const uniqueOffset = index * 0.628; // Distribute evenly, approx 2π/10

          // Create swirling orbit motion with funModeInfluence affecting pattern
          const orbitX = Math.cos(currentTime * orbitSpeed + uniqueOffset) * orbitRadius;
          const orbitY = Math.sin(currentTime * orbitSpeed + uniqueOffset) * orbitRadius;
          const orbitZ =
            Math.cos(currentTime * orbitSpeed * 0.5 + uniqueOffset * funModeInfluence) *
            orbitRadius;

          // Apply a force toward the orbit position - stronger with funModeInfluence
          const orbitForce = new THREE.Vector3(orbitX, orbitY, orbitZ)
            .sub(shape.position)
            .multiplyScalar(0.01 * (1 + funModeInfluence));

          shape.velocity.add(orbitForce);

          // Add a funModeInfluence-based rotation boost
          shape.rotation.x += autoMove.rotationSpeed.x * funModeInfluence * 2;
          shape.rotation.y += autoMove.rotationSpeed.y * funModeInfluence * 2;
        }
      } else {
        // Regular auto-movement when not in fun mode
        // Time-based influence for more dynamic movement
        const timeInfluence = Math.sin(currentTime + autoMove.timeOffset) * 0.5 + 0.5;
        const autoVelocity = tempVector2.current
          .copy(autoMove.direction)
          .multiplyScalar(autoMove.speed * timeInfluence * autoInfluence);

        // Add auto-movement to regular velocity - less when cursor is active
        tempVector.current.copy(shape.velocity).add(autoVelocity);
        shape.position.add(tempVector.current);
      }

      // Auto-rotation with enhanced speed in fun mode
      const rotationMultiplier = funModeActive ? 2.5 : 1.2;
      shape.rotation.x += autoMove.rotationSpeed.x * rotationMultiplier;
      shape.rotation.y += autoMove.rotationSpeed.y * rotationMultiplier;
      shape.rotation.z += autoMove.rotationSpeed.z * rotationMultiplier;

      // Bounce off boundaries with a soft approach
      ['x', 'y', 'z'].forEach((axis) => {
        const limit = 8; // Expanded from 5 to 8
        const position = shape.position[axis];
        const absPosition = Math.abs(position);

        // Soft boundary - start pushing back before hitting hard limit
        if (absPosition > limit - 1) {
          // Soft force pushing back toward center
          const pushbackForce = (absPosition - (limit - 1)) * 0.01 * Math.sign(position);
          shape.velocity[axis] -= pushbackForce;

          // Hard boundary - bounce
          if (absPosition > limit) {
            shape.velocity[axis] *= -0.8; // Bounce with energy loss
            shape.position[axis] = limit * Math.sign(position) * 0.95; // Pull slightly in from edge
            autoMove.direction[axis] *= -1; // Reverse auto-movement direction
          }
        }
      });

      // Mouse interaction - NOW USING WORLD COORDINATES
      if ((mouseData?.world || mousePosition) && isInteractionEnabled && !isTransitioning) {
        // Calculate distance to cursor in world space
        tempVector.current.copy(shape.position);
        const distToCursor = tempVector.current.distanceTo(cursorPosition.current);
        const interactionRadius = 5; // Increased from 3

        if (distToCursor < interactionRadius) {
          // Track this sphere for spread calculations
          interactingSpheres.push(shape);

          // Calculate interaction strength based on distance
          const strength = 1 - distToCursor / interactionRadius;

          // ENHANCED CURSOR FOLLOWING:

          // 1. Attraction force - stronger when further away
          const attractionStrength = strength * 0.015; // Increased from 0.005
          tempVector.current
            .subVectors(cursorPosition.current, shape.position)
            .normalize()
            .multiplyScalar(attractionStrength);

          shape.velocity.add(tempVector.current);

          // 2. Add cursor momentum influence for more dynamic following
          if (hasMouseMoved.current) {
            // Add a bias in the direction the cursor is moving
            shape.velocity.add(movementBias.current.clone().multiplyScalar(0.002 * strength));
          }

          // 3. Prevent bunching: Add repulsion when very close to cursor
          if (distToCursor < 0.8) {
            // Close to cursor - add repulsive force to prevent bunching
            const repulsionStrength = (1 - distToCursor / 0.8) * 0.01;
            tempVector.current
              .subVectors(shape.position, cursorPosition.current)
              .normalize()
              .multiplyScalar(repulsionStrength);

            shape.velocity.add(tempVector.current);
          }

          // Increase excitement level (affects color and glow)
          shape.excitementLevel = Math.min(1, shape.excitementLevel + 0.025); // Increased from 0.015
        } else {
          // Reset when away from cursor - gentler decay
          shape.excitementLevel = Math.max(0, shape.excitementLevel - 0.008);
        }
      } else {
        // Gradually reduce excitement when no mouse interaction
        shape.excitementLevel = Math.max(0, shape.excitementLevel - 0.008);
      }

      // Update color based on energy and mode
      if (shape.ref.current && shape.ref.current.material) {
        // Override with rainbow colors in Easter egg mode
        if (easterEggActive) {
          const hue = (currentTime * 0.2 + index * 0.01) % 1.0;
          shape.ref.current.material.color.setHSL(hue, 0.8, 0.5);
          shape.ref.current.material.emissive.setHSL(hue, 0.9, 0.3);
          shape.ref.current.material.emissiveIntensity = 0.5;
        } else {
          // Apply theme-derived colors - Now using getShapeColor for base materials when inactive
          if (shape.excitementLevel < 0.1) {
            // Use simpler color for inactive states to improve performance
            shape.ref.current.material.color = getShapeColor(SHAPE_TYPES.SPHERE, shape.hovered);
            shape.ref.current.material.emissive = getShapeColor(
              SHAPE_TYPES.SPHERE,
              false
            ).multiplyScalar(0.2);
            shape.ref.current.material.emissiveIntensity = 0.1;
          } else {
            // Use dynamic colors with directional hue influence for active/excited states
            const dynamicColors = getDynamicColor(
              theme,
              currentTime + index * 0.05,
              shape.excitementLevel,
              SHAPE_TYPES.SPHERE,
              shape.hovered
            );

            // Apply base dynamic colors
            shape.ref.current.material.color.copy(dynamicColors.main);
            shape.ref.current.material.emissive.copy(dynamicColors.emissive);
            shape.ref.current.material.emissiveIntensity = dynamicColors.emissiveIntensity;

            // Blend in direction-based hue for excited spheres
            if (directionIntensity > 0.1 && hasMouseMoved.current) {
              // Create direction-influenced color
              const dirColor = new THREE.Color().setHSL(
                directionHue,
                0.8,
                0.5 + shape.excitementLevel * 0.2
              );

              // Blend between regular color and direction color based on intensity and excitement
              const blendFactor = directionIntensity * shape.excitementLevel * 0.7;
              shape.ref.current.material.color.lerp(dirColor, blendFactor);

              // Also influence emissive color
              const emissiveDir = new THREE.Color().setHSL((directionHue + 0.1) % 1.0, 0.9, 0.4);
              shape.ref.current.material.emissive.lerp(emissiveDir, blendFactor);

              // Boost emissive intensity with direction intensity
              shape.ref.current.material.emissiveIntensity +=
                directionIntensity * 0.3 * shape.excitementLevel;
            }
          }
        }

        shape.ref.current.material.needsUpdate = true;
      }
    });

    // Second pass: Apply sphere-to-sphere repulsion to prevent bunching
    // Only do this when there are multiple spheres interacting with cursor
    if (interactingSpheres.length > 1) {
      for (let i = 0; i < interactingSpheres.length; i++) {
        const sphere1 = interactingSpheres[i];

        for (let j = i + 1; j < interactingSpheres.length; j++) {
          const sphere2 = interactingSpheres[j];

          // Calculate distance between spheres
          tempVector.current.subVectors(sphere1.position, sphere2.position);
          const distanceSq = tempVector.current.lengthSq();

          // Apply repulsion if spheres are too close (for better distribution)
          if (distanceSq < 0.3) {
            const repulsionForce = 0.002 / Math.max(0.05, distanceSq);
            const forceVector = tempVector.current.normalize().multiplyScalar(repulsionForce);

            // Apply opposing forces to both spheres
            sphere1.velocity.add(forceVector);
            sphere2.velocity.sub(forceVector);
          }
        }
      }
    }

    // Third pass: Final velocity processing and visual updates
    activeShapes.forEach((shape) => {
      // Limit velocity with higher maximum for better responsiveness
      const maxSpeed = 0.04; // Increased from 0.02
      if (shape.velocity.length() > maxSpeed) {
        shape.velocity.normalize().multiplyScalar(maxSpeed);
      }

      // Less damping for more persistent movement
      shape.velocity.multiplyScalar(0.98); // Changed from 0.97

      // Update the actual mesh visual elements
      if (shape.ref.current) {
        // Position and rotation updates
        shape.ref.current.position.copy(shape.position);
        shape.ref.current.rotation.copy(shape.rotation);

        // Scale based on excitement and velocity
        const speedFactor = shape.velocity.length() * 10;
        const scaleFactor = 1 + shape.excitementLevel * 0.2 + speedFactor * 0.1;
        shape.scale.set(scaleFactor, scaleFactor, scaleFactor);
        shape.ref.current.scale.copy(shape.scale);

        // Manually update matrix for better performance
        shape.ref.current.updateMatrix();
      }
    });
  });

  return (
    <>
      {/* Add particle burst effect when in fun mode */}
      {easterEggActive && (
        <pointLight
          position={[0, 0, 0]}
          distance={10}
          intensity={3}
          color={new THREE.Color().setHSL((clock.getElapsedTime() * 0.1) % 1, 0.8, 0.6)}
        />
      )}

      {activeShapes.map((shape, i) => {
        // Get initial colors from theme
        const baseColor = themeColorToThreeColor(theme.palette.primary.main);
        const emissiveColor = themeColorToThreeColor(theme.palette.primary.light);

        return (
          <mesh
            key={i}
            ref={shape.ref}
            position={shape.position}
            onPointerOver={() => {
              shape.hovered = true;
              try {
                // Audio feedback removed for better performance
              } catch (e) {
                // noop
              }
            }}
            onPointerOut={() => {
              shape.hovered = false;
            }}
            matrixAutoUpdate={false}
          >
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial
              color={baseColor}
              emissive={emissiveColor}
              emissiveIntensity={0.2}
              metalness={0.2}
              roughness={0.7}
            />
          </mesh>
        );
      })}
    </>
  );
};

export default SphereScene;
