import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * useMouseTracking Hook
 * 
 * Provides mouse/touch tracking without Three.js dependencies
 * - Normalizes coordinates (-1 to 1)
 * - Handles touch events
 * - Calculates velocity and movement
 * 
 * @param {Object} options Configuration options 
 * @param {HTMLElement} options.domElement Element to track mouse events on
 * @returns {Object} Mouse tracking data
 */
const useMouseTracking = ({ 
  domElement = null
} = {}) => {
  // Mouse position states
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [normalizedPosition, setNormalizedPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  // References for tracking movement
  const lastPosition = useRef({ x: 0, y: 0 });
  const lastUpdateTime = useRef(Date.now());
  const velocity = useRef({ x: 0, y: 0 });
  const movementTimeout = useRef(null);
  
  // Handle mouse movement
  const handleMouseMove = useCallback((event) => {
    // Clear any existing timeout
    if (movementTimeout.current) {
      clearTimeout(movementTimeout.current);
    }
    
    const element = domElement || document.documentElement;
    const rect = element.getBoundingClientRect();
    
    // Calculate basic position
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Calculate normalized coordinates (-1 to 1)
    const normalizedX = (x / rect.width) * 2 - 1;
    const normalizedY = -(y / rect.height) * 2 + 1; // Invert Y for THREE.js
    
    // Current time for velocity calculation
    const now = Date.now();
    const deltaTime = (now - lastUpdateTime.current) / 1000; // seconds
    
    // Calculate velocity (if enough time has passed to avoid jitter)
    if (deltaTime > 0.01) {
      velocity.current = {
        x: (normalizedX - lastPosition.current.x) / deltaTime,
        y: (normalizedY - lastPosition.current.y) / deltaTime
      };
      lastUpdateTime.current = now;
      lastPosition.current = { x: normalizedX, y: normalizedY };
    }
    
    // Update all state
    setNormalizedPosition({ x: normalizedX, y: normalizedY });
    setMousePosition({ x, y });
    setIsActive(true);
    
    // Set timeout to detect when movement stops
    movementTimeout.current = setTimeout(() => {
      velocity.current = { x: 0, y: 0 };
      setIsActive(false);
    }, 150);
  }, [domElement]);
  
  // Handle mouse enter/leave
  const handleMouseEnter = useCallback(() => {
    setIsActive(true);
  }, []);
  
  const handleMouseLeave = useCallback(() => {
    setIsActive(false);
    setIsDragging(false);
  }, []);
  
  // Handle mouse down/up for dragging state
  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);
  
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);
  
  // Handle touch events
  const handleTouchStart = useCallback((event) => {
    handleMouseDown();
    if (event.touches.length === 1) {
      handleMouseMove({
        clientX: event.touches[0].clientX,
        clientY: event.touches[0].clientY
      });
    }
  }, [handleMouseDown, handleMouseMove]);
  
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
  
  // Set up event listeners
  useEffect(() => {
    const element = domElement || window;
    
    // Add event listeners
    element.addEventListener('mousemove', handleMouseMove, { passive: true });
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mousedown', handleMouseDown);
    element.addEventListener('mouseup', handleMouseUp);
    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: true });
    element.addEventListener('touchend', handleTouchEnd);
    
    // Initialize with center position when no mouse activity
    handleMouseMove({
      clientX: window.innerWidth / 2,
      clientY: window.innerHeight / 2
    });
    
    // Clean up
    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mousedown', handleMouseDown);
      element.removeEventListener('mouseup', handleMouseUp);
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
      
      if (movementTimeout.current) {
        clearTimeout(movementTimeout.current);
      }
    };
  }, [
    domElement, 
    handleMouseMove, 
    handleMouseEnter, 
    handleMouseLeave,
    handleMouseDown,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  ]);
  
  return {
    position: mousePosition,
    normalized: normalizedPosition,
    isActive,
    isDragging,
    velocity: velocity.current,
    // Helper for three.js components
    forThree: {
      x: normalizedPosition.x,
      y: normalizedPosition.y
    }
  };
};

export default useMouseTracking;
