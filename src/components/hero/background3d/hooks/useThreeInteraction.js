import { useCallback, useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';

/**
 * useThreeInteraction Hook
 *
 * Custom hook for handling interactions with Three.js objects in a more consistent way.
 * Provides click, double-click, and touch support across both mouse and touch devices.
 *
 * @param {Object} options Configuration options
 * @param {Function} options.onClick Handler for click/tap events
 * @param {Function} options.onDoubleClick Handler for double-click/double-tap events
 * @param {Function} options.onDrag Handler for drag events with pointer coordinates
 * @param {number} options.clickThreshold Time in ms to differentiate clicks from drags
 * @param {number} options.doubleClickThreshold Time in ms to identify double clicks
 * @returns {Object} Object containing bindEvents to apply to a Three.js object
 */
const useThreeInteraction = ({
  onClick,
  onDoubleClick,
  onDrag,
  clickThreshold = 200,
  doubleClickThreshold = 300,
} = {}) => {
  const { camera, gl } = useThree();
  const [isDragging, setIsDragging] = useState(false);
  const [clickStartTime, setClickStartTime] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });

  // Handle pointer down event
  const handlePointerDown = useCallback(
    (event) => {
      event.stopPropagation();
      setClickStartTime(Date.now());
      setStartPosition({ x: event.clientX, y: event.clientY });
      setCurrentPosition({ x: event.clientX, y: event.clientY });
      gl.domElement.setPointerCapture(event.pointerId);
    },
    [gl]
  );

  // Handle pointer up event
  const handlePointerUp = useCallback(
    (event) => {
      event.stopPropagation();
      const clickEndTime = Date.now();
      const clickDuration = clickEndTime - clickStartTime;

      // Release pointer capture
      gl.domElement.releasePointerCapture(event.pointerId);

      // Calculate distance moved during click
      const distX = Math.abs(event.clientX - startPosition.x);
      const distY = Math.abs(event.clientY - startPosition.y);
      const totalDist = Math.sqrt(distX * distX + distY * distY);

      // Check if this was a click or a drag
      if (totalDist < 5 && clickDuration < clickThreshold) {
        // This was a click

        // Check for double click
        if (clickEndTime - lastClickTime < doubleClickThreshold) {
          console.log('Double click detected');
          onDoubleClick && onDoubleClick(event);
          // Reset last click time to prevent triple-click
          setLastClickTime(0);
        } else {
          console.log('Click detected');
          onClick && onClick(event);
          setLastClickTime(clickEndTime);
        }
      }

      // End drag if it was happening
      if (isDragging) {
        setIsDragging(false);
      }
    },
    [
      clickStartTime,
      startPosition,
      lastClickTime,
      isDragging,
      onClick,
      onDoubleClick,
      clickThreshold,
      doubleClickThreshold,
      gl,
    ]
  );

  // Handle pointer move event
  const handlePointerMove = useCallback(
    (event) => {
      // Only process if pointer capture is active
      if (event.buttons > 0) {
        const distX = Math.abs(event.clientX - startPosition.x);
        const distY = Math.abs(event.clientY - startPosition.y);
        const totalDist = Math.sqrt(distX * distX + distY * distY);

        // Set dragging state if moved enough
        if (!isDragging && totalDist > 5) {
          setIsDragging(true);
        }

        // Update current position
        setCurrentPosition({ x: event.clientX, y: event.clientY });

        // Call drag handler if provided
        if (isDragging && onDrag) {
          onDrag({
            event,
            position: currentPosition,
            delta: {
              x: event.clientX - currentPosition.x,
              y: event.clientY - currentPosition.y,
            },
          });
        }
      }
    },
    [startPosition, isDragging, currentPosition, onDrag]
  );

  // Handle touch events specifically
  const handleTouchStart = useCallback(
    (event) => {
      if (event.touches.length === 1) {
        const touch = event.touches[0];
        handlePointerDown({
          ...event,
          clientX: touch.clientX,
          clientY: touch.clientY,
          pointerId: touch.identifier,
        });
      }
    },
    [handlePointerDown]
  );

  const handleTouchEnd = useCallback(
    (event) => {
      if (event.changedTouches.length === 1) {
        const touch = event.changedTouches[0];
        handlePointerUp({
          ...event,
          clientX: touch.clientX,
          clientY: touch.clientY,
          pointerId: touch.identifier,
        });
      }
    },
    [handlePointerUp]
  );

  const handleTouchMove = useCallback(
    (event) => {
      if (event.touches.length === 1) {
        const touch = event.touches[0];
        handlePointerMove({
          ...event,
          clientX: touch.clientX,
          clientY: touch.clientY,
          pointerId: touch.identifier,
          buttons: 1, // Simulate mouse button down
        });
      }
    },
    [handlePointerMove]
  );

  // Clean up pointerCapture on unmount if needed
  useEffect(() => {
    return () => {
      // Find any active pointers and release them
      const activePointerId = gl.domElement.getActivePointerId?.();
      if (activePointerId !== undefined) {
        gl.domElement.releasePointerCapture(activePointerId);
      }
    };
  }, [gl]);

  // Return all event handlers to be applied to a Three.js object
  const bindEvents = {
    onPointerDown: handlePointerDown,
    onPointerUp: handlePointerUp,
    onPointerMove: handlePointerMove,
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
    onTouchMove: handleTouchMove,
  };

  return {
    bindEvents,
    isDragging,
    position: currentPosition,
  };
};

export default useThreeInteraction;
