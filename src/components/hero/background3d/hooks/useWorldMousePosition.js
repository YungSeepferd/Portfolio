import { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { useThree, useFrame } from '@react-three/fiber';

/**
 * useWorldMousePosition Hook
 * 
 * Converts screen mouse coordinates to world coordinates considering camera rotation
 * Uses raycasting to determine the intersection with a virtual plane at z=0
 * Maintains consistent interaction regardless of camera orientation
 * 
 * @param {Object} options Configuration options
 * @param {HTMLElement} options.domElement DOM element to track mouse events on
 * @param {number} options.distance Distance of the plane from the camera
 * @returns {Object} Mouse position in various coordinate systems
 */
const useWorldMousePosition = ({ 
  domElement = null,
  distance = 10,
  trackingPlane = 'horizontal' // 'horizontal' or 'vertical'
} = {}) => {
  const { camera, raycaster, scene, viewport } = useThree();
  const [screenPosition, setScreenPosition] = useState({ x: 0, y: 0 });
  const [normalizedPosition, setNormalizedPosition] = useState({ x: 0, y: 0 });
  const [worldPosition, setWorldPosition] = useState(new THREE.Vector3());
  const [isActive, setIsActive] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  // Track previous values for velocity calculation
  const prevWorldPos = useRef(new THREE.Vector3());
  const velocity = useRef(new THREE.Vector3());
  const lastUpdateTime = useRef(Date.now());
  
  // Create tracking plane - reused for intersection calculations
  const trackingPlaneRef = useRef(null);
  
  // Initialize tracking plane
  useEffect(() => {
    // Create a virtual plane for intersection testing
    if (trackingPlane === 'horizontal') {
      // XZ plane (horizontal - y is up)
      trackingPlaneRef.current = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    } else {
      // XY plane (vertical - z is depth)
      trackingPlaneRef.current = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    }
  }, [trackingPlane]);
  
  // Get real DOM element for event handling
  const getElement = useCallback(() => {
    return domElement || document.documentElement;
  }, [domElement]);
  
  // Convert screen position to normalized device coordinates (-1 to +1)
  const normalizeScreenPosition = useCallback((clientX, clientY) => {
    const element = getElement();
    const rect = element.getBoundingClientRect();
    
    const x = ((clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((clientY - rect.top) / rect.height) * 2 + 1; // Y is inverted in NDC
    
    return { x, y };
  }, [getElement]);
  
  // Calculate world position using raycasting
  const calculateWorldPosition = useCallback((normalizedPos) => {
    if (!trackingPlaneRef.current) return new THREE.Vector3();
    
    // Set raycaster from camera and normalized mouse coordinates
    raycaster.setFromCamera(normalizedPos, camera);
    
    // Result holds the intersection point 
    const result = new THREE.Vector3();
    
    // Ray-plane intersection
    if (raycaster.ray.intersectPlane(trackingPlaneRef.current, result)) {
      return result;
    }
    
    // Fallback - project ray to fixed distance
    return raycaster.ray.at(distance, new THREE.Vector3());
  }, [camera, raycaster, distance]);
  
  // Handle mouse movement
  const handleMouseMove = useCallback((event) => {
    // Get normalized position
    const normalized = normalizeScreenPosition(event.clientX, event.clientY);
    setNormalizedPosition(normalized);
    setScreenPosition({ x: event.clientX, y: event.clientY });
    
    // Mark as active
    setIsActive(true);
  }, [normalizeScreenPosition]);
  
  // Mouse down/up for drag detection
  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);
  
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);
  
  // Touch event handlers
  const handleTouchStart = useCallback((event) => {
    if (event.touches.length === 1) {
      handleMouseMove({
        clientX: event.touches[0].clientX,
        clientY: event.touches[0].clientY
      });
      handleMouseDown();
    }
  }, [handleMouseMove, handleMouseDown]);
  
  const handleTouchMove = useCallback((event) => {
    if (event.touches.length === 1) {
      handleMouseMove({
        clientX: event.touches[0].clientX,
        clientY: event.touches[0].clientY
      });
    }
  }, [handleMouseMove]);
  
  const handleTouchEnd = useCallback(() => {
    handleMouseUp();
  }, [handleMouseUp]);
  
  // Setup event listeners
  useEffect(() => {
    const element = getElement();
    
    element.addEventListener('mousemove', handleMouseMove, { passive: true });
    element.addEventListener('mousedown', handleMouseDown);
    element.addEventListener('mouseup', handleMouseUp);
    element.addEventListener('mouseleave', handleMouseUp);
    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: true });
    element.addEventListener('touchend', handleTouchEnd);
    
    // Initialize with center position
    const { width, height } = element.getBoundingClientRect();
    handleMouseMove({ 
      clientX: width / 2, 
      clientY: height / 2 
    });
    
    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mousedown', handleMouseDown);
      element.removeEventListener('mouseup', handleMouseUp);
      element.removeEventListener('mouseleave', handleMouseUp);
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [
    getElement,
    handleMouseMove,
    handleMouseDown,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  ]);
  
  // Calculate world position in animation frame
  useFrame(() => {
    // Store previous position
    prevWorldPos.current.copy(worldPosition);
    
    // Calculate new world position from normalized coordinates
    const newWorldPos = calculateWorldPosition(normalizedPosition);
    setWorldPosition(newWorldPos);
    
    // Calculate velocity in world units per second
    const now = Date.now();
    const deltaTime = (now - lastUpdateTime.current) / 1000; // convert to seconds
    if (deltaTime > 0.01) { // Only calculate if enough time has passed
      velocity.current.subVectors(newWorldPos, prevWorldPos.current).divideScalar(deltaTime);
      lastUpdateTime.current = now;
    }
  });
  
  return {
    // Normalized device coordinates (-1 to 1)
    normalized: normalizedPosition,
    
    // Screen coordinates (pixel values)
    screen: screenPosition,
    
    // 3D world coordinates (THREE.Vector3)
    world: worldPosition,
    
    // Velocity (world units per second)
    velocity: velocity.current,
    
    // Whether mouse/touch is active in tracked area
    isActive,
    
    // Whether mouse button/touch is down
    isDragging,
    
    // For React Three Fiber components
    forThree: normalizedPosition
  };
};

export default useWorldMousePosition;
