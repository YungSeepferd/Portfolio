import { useState, useCallback, useRef } from 'react';
import { useThree } from '@react-three/fiber';

/**
 * Custom hook to handle user interaction with Three.js objects
 * 
 * Provides mouse/touch events, dragging, and pointer position tracking
 * for interactive 3D scenes.
 * 
 * @param {Object} options - Hook configuration options
 * @param {Function} options.onDrag - Callback for drag events
 * @param {Function} options.onClick - Callback for click events
 * @returns {Object} Interaction state and event handlers
 */
const useThreeInteraction = ({ onDrag, onClick } = {}) => {
  const [pointerEvents, setPointerEvents] = useState({
    isDown: false,
    isDragging: false,
    startX: 0,
    startY: 0,
    deltaX: 0,
    deltaY: 0,
    pointerType: null
  });
  
  const { camera, size, pointer } = useThree();
  const lastPosition = useRef({ x: 0, y: 0 });
  const dragThreshold = 5; // Pixels to move before considered dragging
  
  // Track when pointer is pressed down
  const handlePointerDown = useCallback((e) => {
    e.stopPropagation();
    
    const x = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const y = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
    
    lastPosition.current = { x, y };
    
    setPointerEvents(prev => ({
      ...prev,
      isDown: true,
      isDragging: false,
      startX: x,
      startY: y,
      deltaX: 0,
      deltaY: 0,
      pointerType: e.pointerType || 'mouse'
    }));
    
    // Capture the pointer to receive events outside the canvas
    if (e.target) {
      e.target.setPointerCapture(e.pointerId);
    }
    
    // Update three.js pointer with normalized coords
    pointer.x = (x / size.width) * 2 - 1;
    pointer.y = -(y / size.height) * 2 + 1;
  }, [pointer, size]);
  
  // Track pointer movement
  const handlePointerMove = useCallback((e) => {
    if (!pointerEvents.isDown) return;
    
    e.stopPropagation();
    
    const x = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const y = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
    
    // Calculate movement deltas
    const deltaX = x - lastPosition.current.x;
    const deltaY = y - lastPosition.current.y;
    
    lastPosition.current = { x, y };
    
    // Check if moved enough to be considered dragging
    const totalMovement = Math.sqrt(
      Math.pow(x - pointerEvents.startX, 2) + 
      Math.pow(y - pointerEvents.startY, 2)
    );
    
    const isDragging = totalMovement > dragThreshold;
    
    // Update state
    setPointerEvents(prev => ({
      ...prev,
      isDragging,
      deltaX,
      deltaY
    }));
    
    // Call drag callback if dragging
    if (isDragging && onDrag) {
      onDrag({ 
        isDragging, 
        deltaX, 
        deltaY, 
        pointerType: pointerEvents.pointerType,
        pointer: { x, y }
      });
    }
    
    // Update three.js pointer with normalized coords
    pointer.x = (x / size.width) * 2 - 1;
    pointer.y = -(y / size.height) * 2 + 1;
  }, [pointerEvents, onDrag, pointer, size]);
  
  // Handle pointer release
  const handlePointerUp = useCallback((e) => {
    e?.stopPropagation();
    
    const wasDown = pointerEvents.isDown;
    const wasDragging = pointerEvents.isDragging;
    
    // Update state
    setPointerEvents(prev => ({
      ...prev,
      isDown: false,
      isDragging: false,
    }));
    
    // Release pointer capture
    if (e?.target && e?.pointerId !== undefined) {
      e.target.releasePointerCapture(e.pointerId);
    }
    
    // Handle click (pointer was down but not dragging)
    if (wasDown && !wasDragging && onClick) {
      onClick();
    }
  }, [pointerEvents, onClick]);
  
  return {
    pointerEvents,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    // Additional handler that combines move and up
    handlePointerDrag: (e) => {
      if (pointerEvents.isDown) {
        handlePointerMove(e);
      }
    }
  };
};

export default useThreeInteraction;
