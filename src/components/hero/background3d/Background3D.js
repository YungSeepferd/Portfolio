import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { SceneProvider, useSceneState } from './SceneContext';
import ActiveScene from './ActiveScene';
import LoadingFallback from './components/LoadingFallback';
import { CANVAS_SETTINGS } from './constants';
import InteractiveCamera from './InteractiveCamera';
import useMouseTracking from './hooks/useMouseTracking';
import WorldMouseListener from './components/WorldMouseListener';
import { useTheme } from '@mui/material/styles';

/**
 * Background3DInner Component - Inner component with access to SceneContext
 */
const Background3DInner = ({ onSceneClick, performanceMode = 'medium', mouseData }) => {
  const theme = useTheme();
  const { switchShapeType, updateDragging } = useSceneState();
  const [isDragging, setIsDragging] = useState(false);
  
  // Update dragging state to context
  useEffect(() => {
    updateDragging(isDragging);
  }, [isDragging, updateDragging]);
  
  // Handle ActiveScene click with performance optimization
  const handleSceneClick = useCallback(() => {
    // Only trigger if not dragging
    if (!isDragging) {
      // Invoke context method to change shape
      switchShapeType();
      
      // Also call parent handler if provided
      if (onSceneClick) {
        onSceneClick();
      }
    }
  }, [onSceneClick, switchShapeType, isDragging]);

  return (
    <>
      {/* World coordinate transformer - must be inside Canvas */}
      <WorldMouseListener mouseData={mouseData} />
      
      {/* Advanced Camera with auto-rotation and interaction */}
      <InteractiveCamera enableAutoRotate={true} rotateSpeed={0.3} />
      
      {/* Lights - using theme colors */}
      <ambientLight 
        intensity={theme.palette.mode === 'dark' ? 0.4 : 0.6} 
        color={theme.palette.primary.contrastText}
      />
      <pointLight 
        position={[10, 10, 10]} 
        intensity={theme.palette.mode === 'dark' ? 0.7 : 0.9}
        color={theme.palette.primary.light}
      />
      <pointLight 
        position={[-10, -10, -10]} 
        intensity={0.4}
        color={theme.palette.secondary.light}
      />
      
      {/* Add OrbitControls to enable dragging/rotation */}
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.5}
        minPolarAngle={Math.PI / 6}     // Limit vertical rotation
        maxPolarAngle={Math.PI / 1.5}   // Limit vertical rotation
        dampingFactor={0.05}            // Smooth damping effect
        enabled={true}                  // Always enabled
        onChange={() => setIsDragging(true)}
        onEnd={() => setIsDragging(false)}
      />
      
      {/* Main scene with shapes */}
      <ActiveScene 
        mousePosition={mouseData ? mouseData.normalized : null} 
        onClick={handleSceneClick} 
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        isDragging={isDragging}
        theme={theme}
        performanceMode={performanceMode}
      />
    </>
  );
};

/**
 * Background3D Component - Enhanced interactive 3D background for the hero section
 */
const Background3D = ({ onSceneClick, performanceMode = 'medium' }) => {
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();
  
  // Use mouse tracking without Three.js dependencies
  const mouseData = useMouseTracking({
    domElement: containerRef.current
  });
  
  // Handle loading state
  const handleLoaded = useCallback(() => {
    setIsLoading(false);
    console.log("🎨 Background3D: Canvas loaded successfully");
  }, []);

  // Memoize canvas style to prevent unnecessary re-renders
  const canvasStyle = useMemo(() => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    zIndex: 0,
    backgroundColor: theme.palette.background.default,
    transition: theme.transitions.create('background-color', {
      duration: theme.transitions.duration.standard,
    }),
  }), [theme]);

  return (
    <div style={canvasStyle}>
      {isLoading && <LoadingFallback />}
      
      <SceneProvider>
        {/* REMOVED SceneControls completely to avoid duplication and conflicts */}
        
        <Canvas 
          camera={CANVAS_SETTINGS.camera}
          gl={CANVAS_SETTINGS.gl}
          style={{ 
            background: theme.palette.background.default,
            visibility: isLoading ? 'hidden' : 'visible',
            touchAction: 'none' // Prevents touch scrolling while interacting
          }}
          onCreated={handleLoaded}
          dpr={performanceMode === 'high' ? window.devicePixelRatio : 1}
        >
          <Background3DInner 
            onSceneClick={onSceneClick} 
            theme={theme} 
            performanceMode={performanceMode}
            mouseData={mouseData}
          />
        </Canvas>
      </SceneProvider>
    </div>
  );
};

export default Background3D;
