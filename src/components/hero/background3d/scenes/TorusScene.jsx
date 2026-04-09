import React, { useRef, useMemo, useEffect, useCallback } from 'react';
import { useTheme } from '@mui/material';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { useSceneState } from '../SceneContext';
import { getDynamicColor } from '../utils/sceneThemeUtils';
import { SHAPE_TYPES, DIMENSIONS } from '../constants';

/**
 * TorusScene Component - Interactive 3D Torus Geometry
 *
 * Interaction
 * - Move mouse: rotates torus and changes colors
 * - Click: spawns new torus rings with different materials
 * - Double click (or press "Enter"): cycles to next scene
 *
 * Visual
 * - Multiple torus geometries with different materials
 * - Theme-driven colors with emissive effects
 * - Smooth rotation and scaling animations
 * - Interactive hover effects
 */

const TORUS_COUNT = 8;
const ROTATION_SPEED = 0.01;
const HOVER_SCALE = 1.2;
const INTERACTION_RADIUS = 3;

const TorusScene = ({ 
  color = new THREE.Color(),
  mousePosition, 
  mouseData,
  isTransitioning,
  easterEggActive = false,
  interactionCount = 0
}) => {
  const theme = useTheme();
  const { camera, gl } = useThree();
  const { isInteractionEnabled, switchShapeType } = useSceneState();
  
  // Refs for torus meshes and animation state
  const torusGroupRef = useRef();
  const torusRefs = useRef([]);
  const mouseWorldPos = useRef(new THREE.Vector3());
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const mouse = useRef(new THREE.Vector2());
  const timeRef = useRef(0);
  
  // Responsive torus count
  const actualTorusCount = TORUS_COUNT;

  // Initialize torus data
  const torusData = useMemo(() => {
    return Array.from({ length: actualTorusCount }, (_, i) => {
      const angle = (i / actualTorusCount) * Math.PI * 2;
      const radius = 2 + Math.sin(i * 0.5) * 0.5;
      return {
        id: i,
        position: [
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          (Math.random() - 0.5) * 2
        ],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
        scale: 0.3 + Math.random() * 0.4,
        speed: 0.5 + Math.random() * 0.5,
        hovered: false,
        material: i % 3 // Different material types
      };
    });
  }, [actualTorusCount]);

  // Mouse position tracking
  const updateMousePosition = useCallback((event) => {
    // Get canvas from the WebGL renderer
    const canvas = gl.domElement;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
    mouse.current.set(x, y);
    
    // Update world position for interaction
    raycaster.setFromCamera(mouse.current, camera);
    const intersectPoint = new THREE.Vector3();
    raycaster.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), intersectPoint);
    mouseWorldPos.current.copy(intersectPoint);
  }, [camera, raycaster, gl]);

  // Create torus geometry and materials
  const torusGeometry = useMemo(() => {
    const { radius, tube, radialSegments, tubularSegments } = DIMENSIONS.torus;
    return new THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments);
  }, []);

  const materials = useMemo(() => {
    return [
      // Standard material
      new THREE.MeshStandardMaterial({
        metalness: 0.7,
        roughness: 0.2,
        transparent: true,
        opacity: 0.8
      }),
      // Emissive material
      new THREE.MeshStandardMaterial({
        metalness: 0.3,
        roughness: 0.4,
        transparent: true,
        opacity: 0.9,
        emissiveIntensity: 0.3
      }),
      // Glass-like material
      new THREE.MeshPhysicalMaterial({
        metalness: 0.1,
        roughness: 0.1,
        transmission: 0.9,
        transparent: true,
        opacity: 0.7,
        thickness: 0.5
      })
    ];
  }, []);

  // Initialize torus refs
  useEffect(() => {
    torusRefs.current = torusRefs.current.slice(0, actualTorusCount);
  }, [actualTorusCount]);

  // Interaction handlers
  const onPointerMove = useCallback((e) => {
    if (!isInteractionEnabled || isTransitioning) return;
    updateMousePosition(e);
    
    // Check for torus hover
    raycaster.setFromCamera(mouse.current, camera);
    const meshes = torusRefs.current.filter(Boolean);
    const intersects = raycaster.intersectObjects(meshes);
    
    // Reset all hover states
    torusData.forEach(data => data.hovered = false);
    
    if (intersects.length > 0) {
      const intersected = intersects[0].object;
      const index = torusRefs.current.indexOf(intersected);
      if (index !== -1) {
        torusData[index].hovered = true;
      }
    }
  }, [isInteractionEnabled, isTransitioning, updateMousePosition, camera, raycaster, torusData]);

  const onPointerDown = useCallback((e) => {
    if (!isInteractionEnabled || isTransitioning) return;
    updateMousePosition(e);
    
    // Add a new torus or trigger effect on click
    if (torusGroupRef.current) {
      const randomTorus = torusRefs.current[Math.floor(Math.random() * torusRefs.current.length)];
      if (randomTorus) {
        // Trigger a scale animation
        randomTorus.scale.setScalar(0.1);
      }
    }
  }, [isInteractionEnabled, isTransitioning, updateMousePosition]);

  // Handle keyboard for Enter to cycle
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Enter' && switchShapeType) switchShapeType();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [switchShapeType]);

  // Main animation loop
  useFrame((_, dt) => {
    if (isTransitioning) return;
    
    timeRef.current += dt;
    const t = timeRef.current;

    // Update torus group rotation
    if (torusGroupRef.current) {
      torusGroupRef.current.rotation.y += ROTATION_SPEED;
      torusGroupRef.current.rotation.x += ROTATION_SPEED * 0.5;
    }

    // Update individual torus meshes
    torusRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      
      const data = torusData[i];
      if (!data) return;

      // Individual rotation
      mesh.rotation.x += dt * data.speed;
      mesh.rotation.y += dt * data.speed * 0.7;
      mesh.rotation.z += dt * data.speed * 0.3;

      // Hover scaling
      const targetScale = data.hovered ? data.scale * HOVER_SCALE : data.scale;
      mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

      // Mouse interaction - attract/repel effect
      if (isInteractionEnabled && mouseWorldPos.current) {
        const distance = mesh.position.distanceTo(mouseWorldPos.current);
        if (distance < INTERACTION_RADIUS) {
          const force = (INTERACTION_RADIUS - distance) / INTERACTION_RADIUS;
          const direction = new THREE.Vector3()
            .subVectors(mesh.position, mouseWorldPos.current)
            .normalize()
            .multiplyScalar(force * 0.02);
          mesh.position.add(direction);
        }
      }

      // Floating animation
      mesh.position.y += Math.sin(t * data.speed + i) * 0.002;
      mesh.position.z += Math.cos(t * data.speed * 0.7 + i) * 0.001;

      // Update material colors
      if (mesh.material) {
        const dynamic = getDynamicColor(
          theme,
          t + i * 0.1,
          data.hovered ? 1 : 0.5,
          SHAPE_TYPES.TORUS,
          data.hovered
        );
        
        mesh.material.color.copy(dynamic.main);
        mesh.material.emissive.copy(dynamic.emissive);
        
        if (easterEggActive) {
          const hue = ((t * 0.5) + (i * 0.1)) % 1.0;
          mesh.material.color.setHSL(hue, 0.8, 0.6);
          mesh.material.emissive.setHSL((hue + 0.3) % 1.0, 0.9, 0.3);
          mesh.material.emissiveIntensity = 0.5;
        }
      }
    });
  });

  return (
    <group>

      {/* Main torus group with interactions */}
      <group
        ref={torusGroupRef}
        onPointerMove={onPointerMove}
        onPointerDown={onPointerDown}
        onDoubleClick={() => switchShapeType && switchShapeType()}
      >
        {/* Render torus meshes */}
        {torusData.map((data, i) => (
          <mesh
            key={data.id}
            ref={(el) => (torusRefs.current[i] = el)}
            geometry={torusGeometry}
            material={materials[data.material]}
            position={data.position}
            rotation={data.rotation}
            scale={data.scale}
          />
        ))}
      </group>
    </group>
  );
};

export default TorusScene;
