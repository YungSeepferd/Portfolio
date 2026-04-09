import React, { Suspense, useState, useEffect, useRef, useCallback } from 'react';
import { Box } from '@mui/material';
// Restore these crucial imports
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ActiveScene from './ActiveScene';
import { SceneProvider } from './SceneContext';
import PerformanceMonitor from './components/PerformanceMonitor';
import LoadingFallback from './components/LoadingFallback';

/**
 * ThreeJSBackground Component - Interactive 3D background for the hero section
 * 
 * Renamed from Background3D to ThreeJSBackground to avoid confusion
 * with the Canvas-based background implementation
 * 
 * Accessibility: Keyboard navigation added for WCAG 2.1 compliance
 */
const ThreeJSBackground = ({ theme, onSceneClick }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [showPerformance, setShowPerformance] = useState(false);
  const [cameraDistance, setCameraDistance] = useState(5);
  
  // Performance monitoring flag for development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setShowPerformance(true);
    }
  }, []);
  
  // Handle keyboard navigation for accessibility
  const handleKeyDown = useCallback((event) => {
    const rotateAmount = 0.3;
    const zoomAmount = 0.5;
    const minDistance = 2;
    const maxDistance = 10;
    
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        // Rotate left - dispatch to OrbitControls
        if (canvasRef.current) {
          canvasRef.current.dispatchEvent(new CustomEvent('camera-rotate', { 
            detail: { azimuth: rotateAmount, polar: 0 } 
          }));
        }
        break;
      case 'ArrowRight':
        event.preventDefault();
        // Rotate right
        if (canvasRef.current) {
          canvasRef.current.dispatchEvent(new CustomEvent('camera-rotate', { 
            detail: { azimuth: -rotateAmount, polar: 0 } 
          }));
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        // Rotate up
        if (canvasRef.current) {
          canvasRef.current.dispatchEvent(new CustomEvent('camera-rotate', { 
            detail: { azimuth: 0, polar: -rotateAmount } 
          }));
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        // Rotate down
        if (canvasRef.current) {
          canvasRef.current.dispatchEvent(new CustomEvent('camera-rotate', { 
            detail: { azimuth: 0, polar: rotateAmount } 
          }));
        }
        break;
      case '+':
      case '=':
        event.preventDefault();
        // Zoom in
        setCameraDistance(prev => Math.max(minDistance, prev - zoomAmount));
        break;
      case '-':
      case '_':
        event.preventDefault();
        // Zoom out
        setCameraDistance(prev => Math.min(maxDistance, prev + zoomAmount));
        break;
      case ' ':
        event.preventDefault();
        // Reset camera position
        setCameraDistance(5);
        if (canvasRef.current) {
          canvasRef.current.dispatchEvent(new CustomEvent('camera-reset'));
        }
        break;
      default:
        break;
    }
  }, []);
  
  // Add keyboard event listeners for accessibility
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('keydown', handleKeyDown);
      return () => {
        container.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [handleKeyDown]);
  
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
      tabIndex={0}
      role="application"
      aria-label="Interactive 3D geometric background. Use arrow keys to rotate, plus or minus to zoom, space to reset."
      aria-roledescription="3D canvas for decorative background with interactive camera controls"
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%',
        zIndex: 0,
        cursor: isDragging ? 'grabbing' : 'grab',
        overflow: 'hidden', 
        outline: 'none',
      }}
    >
      {isLoading && <LoadingFallback />}
      
      <SceneProvider>
        <Canvas 
          ref={canvasRef}
          camera={{ 
            position: [0, 0, cameraDistance], 
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
          
          {/* Add OrbitControls to enable dragging/rotation with keyboard support */}
          <OrbitControls 
            enableZoom={true}
            enablePan={false}
            rotateSpeed={0.5}
            minPolarAngle={Math.PI / 6}     // Limit vertical rotation
            maxPolarAngle={Math.PI / 1.5}   // Limit vertical rotation
            dampingFactor={0.05}            // Smooth damping effect
            enabled={true}                  // Always enabled
            minDistance={2}
            maxDistance={10}
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

// Export with both names for backward compatibility
export default ThreeJSBackground;
