import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { SceneProvider, useSceneState } from './SceneContext';
import SceneControls from './SceneControls';
import ActiveScene from './ActiveScene';
import LoadingFallback from './components/LoadingFallback';
import { CANVAS_SETTINGS } from './constants';
import InteractiveCamera from './InteractiveCamera';
import useMouseTracking from './hooks/useMouseTracking';
import WorldMouseListener from './components/WorldMouseListener';

/**
 * Background3DInner Component - Inner component with access to SceneContext
 */
const Background3DInner = ({ onSceneClick, theme, performanceMode = 'medium', mouseData }) => {
  const { switchShapeType, updateDragging } = useSceneState();
  const [isDragging, setIsDragging] = useState(false);
  
  // Update dragging state to context
  useEffect(() => {
    updateDragging(isDragging);
  }, [isDragging, updateDragging]);
  
  // Handle ActiveScene click
  const handleSceneClick = useCallback(() => {
    console.log("🎯 Background3DInner: ActiveScene click detected");
    
    // Only trigger if not dragging
    if (!isDragging) {
      // Invoke context method to change shape
      switchShapeType();
      
      // Also call parent handler if provided
      if (onSceneClick) {
        console.log("🎯 Background3DInner: Calling parent onSceneClick handler");
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
      
      {/* Lights */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <spotLight 
        position={[0, 10, 0]} 
        angle={0.3} 
        penumbra={1} 
        intensity={1.5} 
        castShadow 
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
        mousePosition={mouseData?.forThree}
        onClick={handleSceneClick} 
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
const Background3D = ({ theme, onSceneClick, performanceMode = 'medium' }) => {
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Use mouse tracking without Three.js dependencies
  const mouseData = useMouseTracking({
    domElement: containerRef.current
  });
  
  // Handle loading state
  const handleLoaded = useCallback(() => {
    setIsLoading(false);
    console.log("🎨 Background3D: Canvas loaded successfully");
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: 0,
        cursor: mouseData.isDragging ? 'grabbing' : 'pointer',
        overflow: 'hidden',
        pointerEvents: 'auto',
        userSelect: 'none' 
      }}
    >
      {isLoading && <LoadingFallback />}
      
      <SceneProvider>
        {/* Add SceneControls in the top right corner */}
        <SceneControls />
        
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
