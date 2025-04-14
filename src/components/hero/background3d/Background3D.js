import React, { Suspense, useState, useEffect } from 'react';
import { Box } from '@mui/material';
// Comment out imports that are causing errors
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';
import ActiveScene from './ActiveScene';
import { SceneProvider } from './SceneContext';
import PerformanceMonitor from './components/PerformanceMonitor';
import LoadingFallback from './components/LoadingFallback';

/**
 * Background3D Component - Interactive 3D background for the hero section
 * 
 * Features:
 * - Mouse position tracking for passive motion
 * - Scene switching on click
 * - Orbit controls for user rotation with mouse drag
 * - Performance monitoring and fallback for low-end devices
 */
const Background3D = ({ theme, onSceneClick }) => {
  const containerRef = useRef();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [showPerformance, setShowPerformance] = useState(false);
  
  // Performance monitoring flag for development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setShowPerformance(true);
    }
  }, []);
  
  // Handle mouse movement to update scene perspective
  const handleMouseMove = useCallback((event) => {
    if (!containerRef.current || isDragging) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
    setMousePosition({ x, y });
  }, [isDragging]);
  
  // Toggle dragging state for OrbitControls interaction
  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);
  
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);
  
  // Handle loading state
  const handleLoaded = useCallback(() => {
    setIsLoading(false);
  }, []);
  
  // Add mouse event listeners
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove, { passive: true });
      container.addEventListener('mousedown', handleMouseDown);
      container.addEventListener('mouseup', handleMouseUp);
      container.addEventListener('mouseleave', handleMouseUp);
      
      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mousedown', handleMouseDown);
        container.removeEventListener('mouseup', handleMouseUp);
        container.removeEventListener('mouseleave', handleMouseUp);
      };
    }
  }, [handleMouseMove, handleMouseDown, handleMouseUp]);
  
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
        cursor: isDragging ? 'grabbing' : 'grab',
        overflow: 'hidden', 
      }}
    >
      {isLoading && <LoadingFallback />}
      
      <SceneProvider>
        <Canvas 
          camera={{ 
            position: [0, 0, 5], 
            fov: 75, 
            near: 0.1, 
            far: 1000 
          }}
          style={{ 
            background: theme.palette.background.default,
            visibility: isLoading ? 'hidden' : 'visible' 
          }}
          onCreated={handleLoaded}
          dpr={[1, 2]} // Responsive pixel ratio for better performance
        >
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
          />
          
          {/* Active scene with mouse position and click handler */}
          <ActiveScene 
            mousePosition={mousePosition} 
            onClick={onSceneClick} 
            isDragging={isDragging}
            theme={theme}
          />
          
          {/* Performance monitoring (development only) */}
          {showPerformance && <PerformanceMonitor />}
        </Canvas>
      </SceneProvider>
    </div>
  );
};

export default Background3D;
