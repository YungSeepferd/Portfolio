import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

/**
 * useWorldCoordinates - ONLY USE INSIDE A CANVAS/R3F COMPONENT
 * 
 * Converts screen coordinates to world coordinates considering camera orientation
 * 
 * @param {Object} mouseData Normalized mouse coordinates from useMouseTracking 
 * @param {Object} options Additional options
 * @returns {Object} World coordinates and velocity
 */
const useWorldCoordinates = (mouseData, { distance = 10 } = {}) => {
  const { camera, raycaster } = useThree();
  const worldPosition = useRef(new THREE.Vector3());
  const velocity = useRef(new THREE.Vector3());
  const lastWorldPos = useRef(new THREE.Vector3());
  const lastUpdateTime = useRef(Date.now());
  
  // Tracking plane for intersection testing
  const trackingPlane = useRef(new THREE.Plane(new THREE.Vector3(0, 1, 0), 0));
  
  // Update world position on each frame
  useFrame(() => {
    if (!mouseData?.forThree) return;
    
    // Set raycaster from camera and normalized mouse coordinates
    raycaster.setFromCamera(mouseData.forThree, camera);
    
    // Result will hold the intersection point
    const result = new THREE.Vector3();
    
    // Try to intersect with the tracking plane
    if (raycaster.ray.intersectPlane(trackingPlane.current, result)) {
      // Store previous position for velocity calculation
      lastWorldPos.current.copy(worldPosition.current);
      
      // Update world position with intersection point
      worldPosition.current.copy(result);
      
      // Calculate velocity
      const now = Date.now();
      const deltaTime = (now - lastUpdateTime.current) / 1000; // seconds
      
      if (deltaTime > 0.01) { // Only calculate if enough time has passed
        velocity.current.subVectors(worldPosition.current, lastWorldPos.current)
          .divideScalar(deltaTime);
        lastUpdateTime.current = now;
      }
    } else {
      // Fallback - project ray to fixed distance if no intersection
      worldPosition.current.copy(raycaster.ray.at(distance, new THREE.Vector3()));
    }
  });
  
  return {
    world: worldPosition.current,
    velocity: velocity.current
  };
};

export default useWorldCoordinates;
