import React, { useRef, useState, Suspense, useEffect, useCallback } from 'react';
import { Box } from '@mui/material';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';

import { SceneProvider } from './SceneContext';
import ActiveScene from './ActiveScene';
import LoadingFallback from './components/LoadingFallback';

// Auto-rotating camera component
const AutoRotatingCamera = ({ isUserInteracting }) => {
  const controls = useRef();
  const lastInteractionTime = useRef(Date.now());
  
  // Update the last interaction time when user interacts
  useEffect(() => {
    if (isUserInteracting) {
      lastInteractionTime.current = Date.now();
    }
  }, [isUserInteracting]);
  
  // Handle automatic camera rotation
  useFrame(() => {
    if (!controls.current) return;
    
    // Resume auto-rotation after 3 seconds of inactivity
    const timeSinceInteraction = Date.now() - lastInteractionTime.current;
    if (timeSinceInteraction > 3000) {
      controls.current.autoRotate = true;
    } else {
      controls.current.autoRotate = false;
    }
  });
  
  return (
    <OrbitControls 
      ref={controls}
      enableZoom={false} 
      enablePan={false} 
      enableRotate={true}
      rotateSpeed={0.5}
      autoRotate={true}
      autoRotateSpeed={0.5}
      target={[0, 0, 0]}
      makeDefault
    />
  );
};

/**
 * Background3D Component - COMPLETELY SIMPLIFIED VERSION
 */
const Background3D = () => {
  const [canvasError, setCanvasError] = useState(false);
  const [needsRender, setNeedsRender] = useState(true);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const canvasRef = useRef();
  const interactionTimeoutRef = useRef(null);
  
  // Check for WebGL support
  useEffect(() => {
    const canvas = document.createElement('canvas');
    const hasWebGL = !!(
      window.WebGLRenderingContext && 
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );

    if (!hasWebGL) {
      console.warn("WebGL not supported - using fallback");
      setCanvasError(true);
    }
  }, []);
  
  // Track user interaction state
  const handleUserInteraction = useCallback(() => {
    setNeedsRender(true);
    setIsUserInteracting(true);
    
    // Clear any existing timeout
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
    }
    
    // Reset user interaction state after 3 seconds
    interactionTimeoutRef.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, 3000);
  }, []);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current);
      }
    };
  }, []);
  
  if (canvasError) {
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
        zIndex: 1, // Set to a lower value than content
        pointerEvents: 'none', // Let clicks pass through to content
        margin: 0,
        padding: 0,
        overflow: 'visible',
      }}
      onClick={(e) => {
        handleUserInteraction();
        // Don't consume clicks on elements with pointerEvents: 'none'
        if (e.target === e.currentTarget) {
          window.sceneContext?.switchScene();
        }
      }}
      onMouseMove={handleUserInteraction}
      onTouchMove={handleUserInteraction}
    >
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          ref={canvasRef}
          frameloop="always"
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1,
            background: 'transparent'
          }}
          camera={{ position: [0, 0, 10], fov: 50, near: 0.1, far: 100 }}
          dpr={[1, window.devicePixelRatio > 2 ? 2 : window.devicePixelRatio]}
          gl={{
            antialias: true,
            powerPreference: "high-performance",
            preserveDrawingBuffer: false,
            logarithmicDepthBuffer: false,
            alpha: true,
            stencil: false,
            depth: true,
          }}
          onCreated={({ gl }) => {
            // Make background transparent
            gl.setClearColor(0x000000, 0);
            gl.setClearAlpha(0);
            
            // Set correct color output using updated THREE.js API
            gl.outputColorSpace = THREE.SRGBColorSpace;
          }}
        >
          <SceneProvider>
            <pointLight position={[-10, -10, -5]} intensity={0.3} />
            <ambientLight intensity={0.7} />
            <pointLight position={[10, 10, 10]} intensity={0.5} />
            <Suspense fallback={<Html><LoadingFallback /></Html>}>
              <ActiveScene />
            </Suspense>
            <AutoRotatingCamera isUserInteracting={isUserInteracting} />
            <SceneRenderer needsRender={needsRender} setNeedsRender={setNeedsRender} />
          </SceneProvider>
        </Canvas>
      </Suspense>
    </Box>
  );
};

// Utility component to handle rendering updates
const SceneRenderer = ({ needsRender, setNeedsRender }) => {
  const { invalidate } = useThree();
  
  useEffect(() => {
    if (needsRender) {
      invalidate();
      setNeedsRender(false);
    }
  }, [needsRender, invalidate, setNeedsRender]);
  
  return null;
};

export default Background3D;
