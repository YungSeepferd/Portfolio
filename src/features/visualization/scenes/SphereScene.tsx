import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { BaseScene } from '../components/BaseScene';
import { useSceneState } from '../contexts/SceneContext';
import { usePerformanceMonitor } from '../hooks/usePerformanceMonitor';
import { SHAPE_LIMITS } from '../constants';
import { Vector2 } from '../types';
import { ObjectPool } from '../utils/ObjectPool';
import { themeColorToThreeColor } from '../utils/themeUtils';

interface SphereSceneProps {
  mousePosition?: Vector2;
  isTransitioning?: boolean;
  easterEggActive?: boolean;
}

interface ShapeState {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  rotation: THREE.Euler;
  scale: THREE.Vector3;
  hovered: boolean;
  excitementLevel: number;
  ref: React.RefObject<THREE.Mesh>;
  autoMovement: {
    speed: number;
    direction: THREE.Vector3;
    rotationSpeed: {
      x: number;
      y: number;
      z: number;
    };
  };
}

export const SphereScene: React.FC<SphereSceneProps> = ({
  mousePosition,
  isTransitioning = false,
  easterEggActive = false,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { currentConfig } = usePerformanceMonitor();
  const { isInteractionEnabled } = useSceneState();

  // Refs for optimization
  const shapesRef = useRef<ShapeState[]>([]);
  const tempVector = useRef(new THREE.Vector3());
  const tempVector2 = useRef(new THREE.Vector3());
  const clock = useRef(new THREE.Clock()).current;

  // Initialize shapes pool
  const shapesPool = useMemo(() => {
    return new ObjectPool<ShapeState>(() => ({
      position: new THREE.Vector3(),
      velocity: new THREE.Vector3(),
      rotation: new THREE.Euler(),
      scale: new THREE.Vector3(1, 1, 1),
      hovered: false,
      excitementLevel: 0,
      ref: React.createRef(),
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
      },
    }));
  }, []);

  // Initialize shapes
  useEffect(() => {
    const count = isMobile ? 100 : 300;
    const shapes: ShapeState[] = [];

    for (let i = 0; i < count; i++) {
      const shape = shapesPool.get();
      if (shape) {
        // Random position in a spherical shell
        const radius = 4 + Math.random() * 3;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        shape.position.set(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi)
        );

        shapes.push(shape);
      }
    }

    shapesRef.current = shapes;
    return () => shapes.forEach(shape => shapesPool.release(shape));
  }, [isMobile, shapesPool]);

  // Animation loop
  useFrame((state, delta) => {
    if (isTransitioning) return;

    const currentTime = clock.getElapsedTime();
    const shapes = shapesRef.current;
    
    // Update each shape
    shapes.forEach((shape, index) => {
      // Basic motion
      if (isInteractionEnabled) {
        shape.position.add(shape.velocity.multiplyScalar(delta));
        
        // Auto-movement when not interacting
        if (!mousePosition) {
          const autoMove = shape.autoMovement;
          shape.position.add(
            autoMove.direction
              .clone()
              .multiplyScalar(autoMove.speed * Math.sin(currentTime + index))
          );
        }
      }

      // Mouse interaction
      if (mousePosition && isInteractionEnabled) {
        const mousePosWorld = new THREE.Vector3(
          mousePosition.x * 8,
          mousePosition.y * 8,
          0
        );
        
        const distToMouse = shape.position.distanceTo(mousePosWorld);
        if (distToMouse < 5) {
          const force = 0.05 / Math.max(0.5, distToMouse);
          tempVector.current.subVectors(shape.position, mousePosWorld).normalize();
          shape.velocity.add(tempVector.current.multiplyScalar(force));
        }
      }

      // Boundary limits
      const limit = SHAPE_LIMITS.SPHERE.max;
      ['x', 'y', 'z'].forEach(axis => {
        const position = shape.position[axis];
        const absPosition = Math.abs(position);
        
        if (absPosition > limit - 1) {
          shape.velocity[axis] -= (absPosition - (limit - 1)) * 0.01 * Math.sign(position);
          
          if (absPosition > limit) {
            shape.velocity[axis] *= -0.8;
            shape.position[axis] = limit * Math.sign(position) * 0.95;
          }
        }
      });

      // Apply updates to mesh
      if (shape.ref.current) {
        shape.ref.current.position.copy(shape.position);
        
        // Easter egg effects
        if (easterEggActive) {
          const pulseScale = 1 + Math.sin(currentTime * 4 + index) * 0.2;
          shape.ref.current.scale.setScalar(pulseScale);
        }

        shape.ref.current.updateMatrix();
      }
    });
  });

  return (
    <BaseScene mousePosition={mousePosition}>
      {shapesRef.current.map((shape, i) => {
        const baseColor = themeColorToThreeColor(theme.palette.primary.main);
        const emissiveColor = themeColorToThreeColor(theme.palette.primary.light);

        return (
          <mesh
            key={i}
            ref={shape.ref}
            position={shape.position}
            onPointerOver={() => shape.hovered = true}
            onPointerOut={() => shape.hovered = false}
            matrixAutoUpdate={false}
          >
            <sphereGeometry args={[0.2, currentConfig.shadows ? 16 : 8, currentConfig.shadows ? 16 : 8]} />
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
    </BaseScene>
  );
};

export default SphereScene;
