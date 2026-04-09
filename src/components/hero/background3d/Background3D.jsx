import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { SceneProvider, useSceneState } from './SceneContext';
import ActiveScene from './ActiveScene';
import LoadingFallback from './components/LoadingFallback';
import WebGLFallback from './components/WebGLFallback';
import { CANVAS_SETTINGS } from './constants';
import InteractiveCamera from './InteractiveCamera';
import { useTheme } from '@mui/material/styles';
import { getCachedWebGLSupport } from './utils/webglDetector';


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
        color={theme.palette.primary.light}
      />
      
      
      {/* Main scene with shapes */}
      <ActiveScene 
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
  const [isLoading, setIsLoading] = useState(true);
  const [webglSupported, setWebglSupported] = useState(true);
  const containerRef = useRef(null);
  const theme = useTheme();
  
  // Simplified mouse data - will be handled by pointer events in scenes
  const mouseData = { active: true };
  
  // Detect WebGL support on mount
  useEffect(() => {
    setWebglSupported(getCachedWebGLSupport());
  }, []);

  // Handle loading state
  const handleLoaded = useCallback(() => {
    setIsLoading(false);
  }, []);

  const dispatchCameraControl = useCallback((detail) => {
    const canvasElement = containerRef.current?.querySelector('canvas');
    if (!canvasElement) {
      return;
    }

    canvasElement.dispatchEvent(new CustomEvent('portfolio:camera-control', { detail }));
  }, []);

  const handleKeyDown = useCallback((event) => {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        dispatchCameraControl({ action: 'rotate', azimuth: 0.2 });
        break;
      case 'ArrowRight':
        event.preventDefault();
        dispatchCameraControl({ action: 'rotate', azimuth: -0.2 });
        break;
      case 'ArrowUp':
        event.preventDefault();
        dispatchCameraControl({ action: 'rotate', polar: 0.2 });
        break;
      case 'ArrowDown':
        event.preventDefault();
        dispatchCameraControl({ action: 'rotate', polar: -0.2 });
        break;
      case 'Home':
        event.preventDefault();
        dispatchCameraControl({ action: 'reset' });
        break;
      default:
        break;
    }
  }, [dispatchCameraControl]);

  const handleKeyboardActivation = useCallback((event) => {
    if (event.detail === 0) {
      onSceneClick?.();
    }
  }, [onSceneClick]);

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

  // Show fallback if WebGL is not supported
  if (!webglSupported) {
    return (
      <div style={canvasStyle}>
        <WebGLFallback />
      </div>
    );
  }

  return (
    <div style={canvasStyle}>
      {isLoading && <LoadingFallback />}
      
      <SceneProvider>
        {/* REMOVED SceneControls completely to avoid duplication and conflicts */}

        <button
          type="button"
          ref={containerRef}
          aria-label="Interactive 3D background. Use the arrow keys to rotate the scene, Home to reset the camera, and Enter or Space to switch the shape."
          aria-keyshortcuts="ArrowLeft ArrowRight ArrowUp ArrowDown Home Enter Space"
          onClick={handleKeyboardActivation}
          onKeyDown={handleKeyDown}
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
            padding: 0,
            border: 0,
            margin: 0,
            background: 'transparent',
            outline: 'none',
            cursor: 'grab',
          }}
        >
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
        </button>
      </SceneProvider>
    </div>
  );
};

export default Background3D;
