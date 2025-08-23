import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, useProgress } from '@react-three/drei';
import { Color } from 'three';
import { useSceneContext } from '../contexts';
import { Box, CircularProgress, Typography } from '@mui/material';

interface BaseSceneProps {
  children: React.ReactNode;
  cameraPosition?: [number, number, number];
  controlsEnabled?: boolean;
  backgroundColor?: string;
  environmentPreset?: 'sunset' | 'dawn' | 'night' | 'warehouse' | 'forest' | 'apartment' | 'studio' | 'city' | 'park' | 'lobby';
  showFps?: boolean;
}

// FPS Counter Component
const FpsCounter = () => {
  useThree(); // Access the three.js context
  const [fps, setFps] = React.useState(0);
  
  useFrame((_, delta) => {
    setFps(Math.round(1 / delta));
  });

  return (
    <div style={{
      position: 'absolute',
      bottom: 10,
      right: 10,
      backgroundColor: 'rgba(0,0,0,0.5)',
      color: 'white',
      padding: '4px 8px',
      borderRadius: 4,
      fontSize: 12,
      fontFamily: 'monospace'
    }}>
      {fps} FPS
    </div>
  );
};

// Loading component
const Loader = () => {
  const { progress } = useProgress();
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        zIndex: 10,
      }}
    >
      <CircularProgress variant="determinate" value={progress} color="secondary" size={60} />
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        Loading... {Math.round(progress)}%
      </Typography>
    </Box>
  );
};

const Scene = ({
  children,
  cameraPosition = [0, 0, 5],
  controlsEnabled = true,
  backgroundColor = '#000000',
  environmentPreset = 'sunset',
  showFps = false,
}: BaseSceneProps) => {
  const canvasRef = useRef<any>(null);
  const { quality, setSceneLoading, enableEffects } = useSceneContext();

  // Convert quality setting to pixel ratio
  const pixelRatio = React.useMemo(() => {
    switch (quality) {
      case 'low': return Math.min(1.0, window.devicePixelRatio);
      case 'medium': return Math.min(1.5, window.devicePixelRatio);
      case 'high': return window.devicePixelRatio;
      default: return 1.0;
    }
  }, [quality]);

  // Handle loading state
  useEffect(() => {
    const handleProgress = (event: any) => {
      if (event.detail.progress === 100) {
        setTimeout(() => setSceneLoading(false), 500); // Add slight delay for smoother transition
      } else {
        setSceneLoading(true);
      }
    };

    // Listen for loading progress events
    window.addEventListener('progress', handleProgress);
    return () => {
      window.removeEventListener('progress', handleProgress);
    };
  }, [setSceneLoading]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        ref={canvasRef}
        dpr={pixelRatio}
        gl={{ antialias: quality !== 'low' }}
        shadows={quality !== 'low'}
        style={{ background: backgroundColor }}
      >
        <color attach="background" args={[new Color(backgroundColor)]} />
        
        <PerspectiveCamera makeDefault position={cameraPosition} />
        {controlsEnabled && <OrbitControls enableDamping dampingFactor={0.05} />}
        
        {enableEffects && (
          <Environment preset={environmentPreset} background={false} />
        )}
        
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </Canvas>
      
      {showFps && <FpsCounter />}
      
      <Loader />
    </div>
  );
};

export default Scene;
