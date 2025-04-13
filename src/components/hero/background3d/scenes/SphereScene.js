import React, { useEffect, useRef, useMemo } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { SHAPE_LIMITS, SHAPE_TYPES } from '../constants';
import { useSceneState } from '../SceneContext';

/**
 * SphereScene Component - Enhanced with InstancedMesh for performance
 */
const SphereScene = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { mouse, clock, camera } = useThree();
  const { isTransitioning, scrollActive, currentShapeType, switchShapeType } = useSceneState();
  
  // Get count based on device type
  const count = isMobile ? SHAPE_LIMITS.SPHERE.mobile : SHAPE_LIMITS.SPHERE.desktop;
  
  // Create instanced meshes for each shape type
  const instancedMeshRefs = useRef({
    [SHAPE_TYPES.SPHERE]: React.createRef(),
    [SHAPE_TYPES.BOX]: React.createRef(),
    [SHAPE_TYPES.TORUS]: React.createRef()
  });
  
  // Reusable dummy object for matrix calculations
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  // Shapes data - FIXING THE PARSING ERROR BY CHANGING THE IMPLEMENTATION
  const shapesDataRef = useRef([]);
  
  // Initialize shapes data on mount
  useEffect(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push({
        position: new THREE.Vector3(
          THREE.MathUtils.randFloatSpread(10),
          THREE.MathUtils.randFloatSpread(10),
          THREE.MathUtils.randFloatSpread(5)
        ),
        velocity: new THREE.Vector3(
          THREE.MathUtils.randFloat(-0.002, 0.002),
          THREE.MathUtils.randFloat(-0.002, 0.002),
          THREE.MathUtils.randFloat(-0.002, 0.002)
        ),
        rotation: new THREE.Euler(
          THREE.MathUtils.randFloat(0, Math.PI * 2),
          THREE.MathUtils.randFloat(0, Math.PI * 2),
          THREE.MathUtils.randFloat(0, Math.PI * 2)
        ),
        scale: new THREE.Vector3(1, 1, 1),
        type: currentShapeType,
        hovered: false,
        excitementLevel: 0,
        index: i,
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
            z: Math.random() * 0.005
          },
          timeOffset: Math.random() * 1000
        }
      });
    }
    shapesDataRef.current = data;
  }, [count, currentShapeType]);
  
  // User's cursor position in 3D space - reuse this vector
  const cursorPosition = useRef(new THREE.Vector3());
  // Reusable vectors for calculations
  const tempVector = useRef(new THREE.Vector3());
  const tempVector2 = useRef(new THREE.Vector3());
  
  // Geometry options for different shape types
  const geometries = useMemo(() => [
    new THREE.SphereGeometry(0.2, 16, 16), // SPHERE
    new THREE.BoxGeometry(0.3, 0.3, 0.3),  // BOX
    new THREE.TorusGeometry(0.2, 0.08, 16, 32) // TORUS
  ], []);

  // Materials with theme-based colors
  const materials = useMemo(() => {
    return [
      new THREE.MeshStandardMaterial({
        color: theme.palette.primary.main,
        emissive: theme.palette.primary.light,
        emissiveIntensity: 0.6,
        metalness: 0.4,
        roughness: 0.4
      }),
      new THREE.MeshStandardMaterial({
        color: theme.palette.secondary.main,
        emissive: theme.palette.secondary.light,
        emissiveIntensity: 0.5,
        metalness: 0.4,
        roughness: 0.4
      }),
      new THREE.MeshStandardMaterial({
        color: theme.palette.info?.main || '#29b6f6',
        emissive: theme.palette.info?.light || '#4fc3f7',
        emissiveIntensity: 0.5,
        metalness: 0.4,
        roughness: 0.4
      })
    ];
  }, [theme.palette]);

  // Update cursor position from mouse
  useFrame(() => {
    cursorPosition.current.set(
      (mouse.x * camera.position.z * camera.aspect),
      (mouse.y * camera.position.z),
      0
    );
  });
  
  // Animation and physics logic with instanced meshes
  useFrame(() => {
    if (isTransitioning) return;
    
    const currentTime = clock.getElapsedTime();
    const scrollEffect = scrollActive 
      ? Math.sin(currentTime * 3) * 0.05
      : 0;
    
    // Update each shape's data
    shapesDataRef.current.forEach((shape, index) => {
      // Auto movement
      const autoMove = shape.autoMovement;
      const timeInfluence = (Math.sin(currentTime * 0.5 + autoMove.timeOffset) * 0.5 + 0.5) * 0.7;
      
      tempVector2.current.copy(autoMove.direction).multiplyScalar(autoMove.speed * timeInfluence);
      tempVector.current.copy(shape.velocity).add(tempVector2.current);
      shape.position.add(tempVector.current);
      
      // Auto-rotation
      const rotationFactor = 0.2 + (Math.sin(currentTime * 0.2 + index * 0.5) * 0.1);
      shape.rotation.x += autoMove.rotationSpeed.x * rotationFactor;
      shape.rotation.y += autoMove.rotationSpeed.y * rotationFactor;
      shape.rotation.z += autoMove.rotationSpeed.z * rotationFactor;
      
      // Boundary checks
      ['x', 'y', 'z'].forEach(axis => {
        if (Math.abs(shape.position[axis]) > 5) {
          shape.velocity[axis] = -shape.velocity[axis] * 0.9;
          autoMove.direction[axis] = -autoMove.direction[axis] * 0.95;
        }
      });
      
      // Apply scroll effect
      if (scrollActive) {
        const scrollScaleEffect = 1 + (scrollEffect * (index % 3 === 0 ? 0.05 : 0.03));
        shape.scale.x = shape.type === SHAPE_TYPES.TORUS ? shape.scale.x : scrollScaleEffect;
        shape.scale.y = shape.type === SHAPE_TYPES.BOX ? shape.scale.y : scrollScaleEffect * 1.05;
        shape.position.y += scrollEffect * 0.02;
      }
      
      // Cursor interactions
      tempVector.current.copy(shape.position);
      const distToCursor = tempVector.current.distanceTo(cursorPosition.current);
      
      if (distToCursor < 3) {
        const strength = 1 - (distToCursor / 3);
        
        if (shape.type === SHAPE_TYPES.SPHERE) {
          tempVector.current.subVectors(cursorPosition.current, shape.position)
            .normalize()
            .multiplyScalar(0.004 * strength);
          
          shape.velocity.add(tempVector.current);
          shape.excitementLevel = Math.min(1, shape.excitementLevel + 0.015);
        } 
        else if (shape.type === SHAPE_TYPES.BOX) {
          tempVector.current.subVectors(shape.position, cursorPosition.current)
            .normalize()
            .multiplyScalar(0.008 * strength);
          
          shape.velocity.add(tempVector.current);
          shape.excitementLevel = Math.min(1, shape.excitementLevel + 0.015);
        }
        else if (shape.type === SHAPE_TYPES.TORUS) {
          const pulseScale = 1 + 0.3 * strength * Math.sin(clock.getElapsedTime() * 5);
          shape.scale.set(pulseScale, pulseScale, pulseScale);
          shape.rotation.x += 0.03 * strength;
          shape.rotation.y += 0.04 * strength;
          shape.excitementLevel = Math.min(1, shape.excitementLevel + 0.03);
        }
      } else {
        shape.excitementLevel = Math.max(0, shape.excitementLevel - 0.005);
        
        if (shape.type === SHAPE_TYPES.TORUS) {
          shape.scale.lerp(tempVector2.current.set(1, 1, 1), 0.05);
        }
      }
      
      // Limit velocity
      const maxSpeed = 0.015;
      if (shape.velocity.length() > maxSpeed) {
        shape.velocity.normalize().multiplyScalar(maxSpeed);
      }
      
      // Apply damping
      shape.velocity.multiplyScalar(0.985);

      // Apply shape calculations to instanced meshes
      const instancedMesh = instancedMeshRefs.current[shape.type].current;
      if (instancedMesh) {
        // Set transformation matrix for this instance
        dummy.position.copy(shape.position);
        dummy.rotation.copy(shape.rotation);
        dummy.scale.copy(shape.scale);
        dummy.updateMatrix();
        
        // Apply matrix to the instance
        instancedMesh.setMatrixAt(shape.index, dummy.matrix);
        
        // Update material color based on excitement
        const material = materials[shape.type];
        if (material && shape.excitementLevel > 0) {
          // Use excitementLevel directly to adjust material properties
          if (shape.excitementLevel > 0.5) {
            material.emissiveIntensity = Math.max(material.emissiveIntensity, shape.excitementLevel * 0.6);
          }
        }
      }
    });
    
    // Update all the instance matrices after all calculations
    Object.values(instancedMeshRefs.current).forEach(ref => {
      if (ref.current) {
        ref.current.instanceMatrix.needsUpdate = true;
      }
    });
  });

  // Click handler for shape type cycling
  const handleShapeClick = (e) => {
    e.stopPropagation();
    switchShapeType((prev) => (prev + 1) % 3);
  };

  // Cleanup on unmount - proper disposal of geometries and materials
  useEffect(() => {
    return () => {
      // Dispose geometries and materials when component unmounts
      geometries.forEach(geometry => geometry.dispose());
      materials.forEach(material => material.dispose());
    };
  }, [geometries, materials]);

  return (
    <group onClick={handleShapeClick}>
      {/* One instanced mesh per shape type */}
      <instancedMesh 
        ref={instancedMeshRefs.current[SHAPE_TYPES.SPHERE]}
        args={[geometries[SHAPE_TYPES.SPHERE], materials[SHAPE_TYPES.SPHERE], count]}
        visible={currentShapeType === SHAPE_TYPES.SPHERE}
      />
      <instancedMesh 
        ref={instancedMeshRefs.current[SHAPE_TYPES.BOX]}
        args={[geometries[SHAPE_TYPES.BOX], materials[SHAPE_TYPES.BOX], count]}
        visible={currentShapeType === SHAPE_TYPES.BOX}
      />
      <instancedMesh 
        ref={instancedMeshRefs.current[SHAPE_TYPES.TORUS]}
        args={[geometries[SHAPE_TYPES.TORUS], materials[SHAPE_TYPES.TORUS], count]}
        visible={currentShapeType === SHAPE_TYPES.TORUS}
      />
    </group>
  );
};

export default SphereScene;
