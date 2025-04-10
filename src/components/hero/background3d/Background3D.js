import React, { useRef, useState, Suspense, useEffect, useCallback } from 'react';
import { Box } from '@mui/material';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';

import { SceneProvider } from './SceneContext';
import ActiveScene from './ActiveScene';
import LoadingFallback from './components/LoadingFallback';
import PerformanceMonitor from './components/PerformanceMonitor';

// Auto-rotating camera component with improved rotation handling
const AutoRotatingCamera = ({ isUserInteracting }) => {
  const controls = useRef();
  const lastInteractionTime = useRef(Date.now());
  
  // Update the last interaction time when user interacts
  useEffect(() => {
    if (isUserInteracting) {
      lastInteractionTime.current = Date.now();
    }
  }, [isUserInteracting]);
  
  // Handle automatic camera rotation with smooth transition
  useFrame(() => {
    if (!controls.current) return;
    
    // Resume auto-rotation after 6 seconds of inactivity (increased from 4)
    const timeSinceInteraction = Date.now() - lastInteractionTime.current;
    
    // Use a smoother transition between states
    const targetAutoRotateSpeed = timeSinceInteraction > 6000 ? 0.2 : 0;
    
    // Smoothly interpolate rotation speed
    controls.current.autoRotateSpeed = THREE.MathUtils.lerp(
      controls.current.autoRotateSpeed,
      targetAutoRotateSpeed,
      0.01 // Smaller value = smoother transition
    );
    
    // Only enable auto-rotate when speed is non-zero
    controls.current.autoRotate = controls.current.autoRotateSpeed > 0.01;
  });
  
  return (
    <OrbitControls 
      ref={controls}
      enableZoom={false} 
      enablePan={false} 
      enableRotate={true}
      rotateSpeed={0.5} // Increased for better manual control
      autoRotate={true} // CHANGED: Start with auto-rotation enabled
      autoRotateSpeed={0.2} // CHANGED: Initial speed for smoother experience
      dampingFactor={0.12} // Increased for smoother camera movement
      target={[0, 0, 0]}
      makeDefault
    />
  );
};

/**
 * Background3D Component - CRITICAL FIXES to ensure visibility and interaction
 */
const Background3D = () => {
  const [canvasError, setCanvasError] = useState(false);
  const [needsRender, setNeedsRender] = useState(true);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const canvasRef = useRef();
  const interactionTimeoutRef = useRef(null);
  
  // Force re-render and cleanup on mount
  useEffect(() => {
    // Force a render cycle
    setNeedsRender(true);
    const interval = setInterval(() => {
      setNeedsRender(prev => !prev);
    }, 1000); // Force update every second to keep scene alive
    
    // Properly use setCanvasError to handle WebGL unavailability
    try {
      const canvas = document.createElement('canvas');
      const hasWebGL = !!(window.WebGLRenderingContext && 
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      
      if (!hasWebGL) {
        console.error("WebGL not available - unable to render 3D background");
        setCanvasError(true); // Actually using setCanvasError now
      }
    } catch (err) {
      console.error("Error checking WebGL support:", err);
      setCanvasError(true); // Actually using setCanvasError now
    }
    
    return () => {
      clearInterval(interval);
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current);
      }
    };
  }, []);
  
  const handleUserInteraction = useCallback(() => {
    setNeedsRender(true);
    setIsUserInteracting(true);
    
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
    }
    
    interactionTimeoutRef.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, 3000);
  }, []);
  
  // IMPORTANT: This simple click handler is enough to detect interaction
  const handleClick = useCallback(() => {
    console.log("Canvas clicked!");
    handleUserInteraction();
  }, [handleUserInteraction]);
  
  if (canvasError) {
    console.error("WebGL not available - unable to render 3D background");
    return null;
  }
  
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        margin: 0,
        padding: 0,
        overflow: 'visible',
        pointerEvents: 'auto', // CRITICAL: Enable pointer events
        '& canvas': {
          display: 'block !important',
          width: '100% !important',
          height: '100% !important',
          pointerEvents: 'auto !important' // CRITICAL FIX
        }
      }}
      onClick={handleClick}
      onMouseMove={handleUserInteraction}
      onTouchMove={handleUserInteraction}
    >
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          ref={canvasRef}
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
            position: 'absolute',
            top: 0,
            left: 0,
            background: 'transparent',
            pointerEvents: 'auto' // CRITICAL: Canvas must have pointer events
          }}
          camera={{ position: [0, 0, 10], fov: 50, near: 0.1, far: 100 }}
          dpr={[1, 2]} // Simpler DPR setting
          frameloop="always" // CRITICAL FIX: Always render frames
          onCreated={({ gl, scene }) => {
            try {
              // Make background transparent
              gl.setClearColor(0x000000, 0);
              gl.setClearAlpha(0);
              
              // Set color space
              gl.outputColorSpace = THREE.SRGBColorSpace;
              
              // Force a render
              gl.render(scene, gl.xr.enabled ? gl.xr.getCamera() : gl.xr.getBaseLayer());
              
              console.log("Three.js canvas created successfully");
            } catch (err) {
              console.error("Canvas creation error:", err);
            }
          }}
        >
          <SceneProvider>
            <ambientLight intensity={0.8} />
            <pointLight position={[10, 10, 10]} intensity={0.5} />
            <Suspense fallback={<Html><LoadingFallback /></Html>}>
              <ActiveScene />
            </Suspense>
            <AutoRotatingCamera isUserInteracting={isUserInteracting} />
            {/* Ensure continuous rendering */}
            <AnimationLoop needsRender={needsRender} setNeedsRender={setNeedsRender} />
            
            {/* Add Performance Monitor (only visible in development) */}
            {process.env.NODE_ENV === 'development' && <PerformanceMonitor position="top-right" />}
          </SceneProvider>
        </Canvas>
      </Suspense>
    </Box>
  );
};

// Utility component to keep animation loop active
const AnimationLoop = () => {
  const { invalidate } = useThree();
  
  useFrame(() => {
    // Force re-render every frame
    invalidate();
  });
  
  return null;
};

export default Background3D;
