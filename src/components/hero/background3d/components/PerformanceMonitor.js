import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';

/**
 * PerformanceMonitor Component
 * 
 * Displays FPS and rendering stats in a corner of the screen
 * Only used during development
 */
const PerformanceMonitor = ({ position = "bottom-right" }) => {
  const [fps, setFps] = useState(0);
  const frames = useRef(0);
  const prevTime = useRef(performance.now());
  
  // Calculate FPS
  useFrame(() => {
    frames.current++;
    const time = performance.now();
    
    if (time >= prevTime.current + 1000) {
      setFps(Math.round((frames.current * 1000) / (time - prevTime.current)));
      prevTime.current = time;
      frames.current = 0;
    }
  });
  
  // Position styling
  const getPositionStyle = () => {
    switch (position) {
      case "top-left":
        return { top: '10px', left: '10px' };
      case "top-right":
        return { top: '10px', right: '10px' };
      case "bottom-left":
        return { bottom: '10px', left: '10px' };
      case "bottom-right":
      default:
        return { bottom: '10px', right: '10px' };
    }
  };
  
  return (
    <Html as="div" style={{
      position: 'absolute',
      ...getPositionStyle(),
      backgroundColor: 'rgba(0,0,0,0.5)',
      color: 'white',
      padding: '8px',
      borderRadius: '4px',
      fontSize: '12px',
      fontFamily: 'monospace',
      userSelect: 'none',
      zIndex: 1000,
    }}>
      FPS: {fps}
    </Html>
  );
};

export default PerformanceMonitor;