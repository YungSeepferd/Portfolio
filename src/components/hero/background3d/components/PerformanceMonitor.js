import React, { useEffect, useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Typography } from '@mui/material';
import * as THREE from 'three';

/**
 * PerformanceMonitor Component
 * 
 * Monitors and displays Three.js performance metrics
 * - FPS (Frames Per Second)
 * - Draw calls
 * - Triangle count
 * - Memory usage
 * 
 * This component can be conditionally rendered in development mode
 * to help optimize performance.
 */
const PerformanceMonitor = ({ showDetails = true, position = 'bottom-right' }) => {
  const [stats, setStats] = useState({
    fps: 0,
    memory: 0,
    drawCalls: 0,
    triangles: 0
  });
  
  const frameCount = useRef(0);
  const lastFpsUpdate = useRef(Date.now());
  const infoRef = useRef({
    renderer: null,
    scene: null
  });
  
  // Position styling based on prop
  const getPositionStyle = () => {
    switch (position) {
      case 'top-left':
        return { top: 10, left: 10 };
      case 'top-right':
        return { top: 10, right: 10 };
      case 'bottom-left':
        return { bottom: 10, left: 10 };
      case 'bottom-right':
      default:
        return { bottom: 10, right: 10 };
    }
  };
  
  // Get renderer and scene info on first render
  useFrame(({ gl, scene }) => {
    if (!infoRef.current.renderer) {
      infoRef.current.renderer = gl;
    }
    
    if (!infoRef.current.scene) {
      infoRef.current.scene = scene;
    }
    
    // Update FPS counter
    frameCount.current++;
    const now = Date.now();
    
    // Update every half second
    if (now - lastFpsUpdate.current >= 500) {
      const deltaTime = (now - lastFpsUpdate.current) / 1000;
      const fps = Math.round(frameCount.current / deltaTime);
      
      // Get renderer info
      const renderer = infoRef.current.renderer;
      const memory = Math.round(performance.memory?.usedJSHeapSize / 1048576) || 0;
      const info = renderer?.info;
      
      // Get draw calls and triangle count
      const drawCalls = info?.render?.calls || 0;
      const triangles = info?.render?.triangles || 0;
      
      setStats({
        fps,
        memory,
        drawCalls,
        triangles
      });
      
      // Reset counters
      frameCount.current = 0;
      lastFpsUpdate.current = now;
    }
  });
  
  // Only render in development mode
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }
  
  return (
    <Box
      sx={{
        position: 'absolute',
        zIndex: 9999,
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 1,
        borderRadius: 1,
        color: 'white',
        fontFamily: 'monospace',
        fontSize: '12px',
        minWidth: 120,
        pointerEvents: 'none',
        ...getPositionStyle()
      }}
    >
      <Typography variant="overline" sx={{ color: '#4CAF50', display: 'block', fontSize: '10px', lineHeight: 1 }}>
        PERFORMANCE
      </Typography>
      
      <Typography variant="body2" sx={{ color: '#ffffff', fontSize: '12px', lineHeight: 1.3 }}>
        {stats.fps} FPS
      </Typography>
      
      {showDetails && (
        <>
          <Typography variant="body2" sx={{ color: '#ffffff', fontSize: '10px', opacity: 0.8, lineHeight: 1.3 }}>
            Memory: {stats.memory} MB
          </Typography>
          <Typography variant="body2" sx={{ color: '#ffffff', fontSize: '10px', opacity: 0.8, lineHeight: 1.3 }}>
            Draw calls: {stats.drawCalls}
          </Typography>
          <Typography variant="body2" sx={{ color: '#ffffff', fontSize: '10px', opacity: 0.8, lineHeight: 1.3 }}>
            Triangles: {stats.triangles}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default PerformanceMonitor;