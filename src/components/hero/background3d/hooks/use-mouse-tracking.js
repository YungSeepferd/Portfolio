import { useState, useEffect, useCallback } from 'react';

/**
 * useMouseTracking Hook
 *
 * Tracks mouse position in both screen space and normalized coordinates (-1 to +1).
 * This hook works outside of the Three.js Canvas, making it suitable for
 * components that need mouse data but aren't part of the 3D scene.
 */
const useMouseTracking = ({ domElement = null } = {}) => {
  // Mouse positions in different coordinate systems
  const [screenPosition, setScreenPosition] = useState({ x: 0, y: 0 });
  const [normalizedPosition, setNormalizedPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // Get real DOM element for event handling
  const getElement = useCallback(() => {
    return domElement || document.documentElement;
  }, [domElement]);

  // Convert screen position to normalized device coordinates (-1 to +1)
  const normalizeScreenPosition = useCallback(
    (clientX, clientY) => {
      const element = getElement();
      const rect = element.getBoundingClientRect();

      // Convert to normalized device coordinates (-1 to +1)
      const x = ((clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((clientY - rect.top) / rect.height) * 2 + 1; // Y is inverted in 3D space

      return { x, y };
    },
    [getElement]
  );

  // Handle mouse movement
  const handleMouseMove = useCallback(
    (event) => {
      // Get normalized position
      const normalized = normalizeScreenPosition(event.clientX, event.clientY);
      setNormalizedPosition(normalized);
      setScreenPosition({ x: event.clientX, y: event.clientY });

      // Mark as active
      setIsActive(true);
    },
    [normalizeScreenPosition]
  );

  // Mouse down/up for drag detection
  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Touch event handlers
  const handleTouchStart = useCallback(
    (event) => {
      if (event.touches.length === 1) {
        handleMouseMove({
          clientX: event.touches[0].clientX,
          clientY: event.touches[0].clientY,
        });
        handleMouseDown();
      }
    },
    [handleMouseMove, handleMouseDown]
  );

  const handleTouchMove = useCallback(
    (event) => {
      if (event.touches.length === 1) {
        handleMouseMove({
          clientX: event.touches[0].clientX,
          clientY: event.touches[0].clientY,
        });
      }
    },
    [handleMouseMove]
  );

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
      clientY: height / 2,
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
    handleTouchEnd,
  ]);

  return {
    // Screen coordinates (pixel values)
    screen: screenPosition,

    // Normalized device coordinates (-1 to +1)
    normalized: normalizedPosition,

    // For Three.js components (same as normalized)
    forThree: normalizedPosition,

    // State flags
    isDragging,
    isActive,
  };
};

export default useMouseTracking;
