import React, { useState, useEffect, useRef } from 'react';
import { Box, CircularProgress, IconButton, Fade, useTheme } from '@mui/material';

// Scene components - now using vanilla three.js
import SphereScene from './scenes/SphereScene';
import CubeScene from './scenes/CubeScene';
import TorusScene from './scenes/TorusScene';

// Scene selector icons - replace with icons that actually exist in Material UI
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'; // Instead of SphereOutlined
import ViewInArIcon from '@mui/icons-material/ViewInAr'; // Instead of CubeOutlined 
import DonutLargeOutlinedIcon from '@mui/icons-material/DonutLargeOutlined';

/**
 * Background3D Component
 * 
 * Provides a dynamic 3D background with multiple scene options
 * that users can interact with and switch between.
 */
const Background3D = () => {
  const theme = useTheme();
  const [activeScene, setActiveScene] = useState('sphere'); // Default scene
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(() => {
    // Set mounted state after component mounts
    setIsMounted(true);
    
    // Check if user has a scene preference stored
    const savedScene = localStorage.getItem('preferredScene');
    if (savedScene && ['sphere', 'cube', 'torus'].includes(savedScene)) {
      setActiveScene(savedScene);
    }
    
    // Start with loading state
    setIsLoading(true);
    
    return () => {
      // Clean up three.js resources when component unmounts
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      if (sceneRef.current && sceneRef.current.dispose) {
        sceneRef.current.dispose();
      }
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current || !isMounted) return;
    
    // Clean up previous scene
    if (sceneRef.current && sceneRef.current.dispose) {
      sceneRef.current.dispose();
      sceneRef.current = null;
    }
    if (rendererRef.current) {
      rendererRef.current.dispose();
      rendererRef.current = null;
    }
    
    // Get container dimensions
    const container = containerRef.current;
    const { clientWidth: width, clientHeight: height } = container;
    
    // Create appropriate scene
    let scene;
    
    // Initialize new scene
    switch (activeScene) {
      case 'sphere':
        scene = new SphereScene(container, width, height);
        break;
      case 'cube':
        scene = new CubeScene(container, width, height);
        break;
      case 'torus':
        scene = new TorusScene(container, width, height);
        break;
      default:
        scene = new SphereScene(container, width, height);
    }
    
    // Store references
    sceneRef.current = scene;
    rendererRef.current = scene.renderer;
    
    // Set up loading state handler
    scene.onLoaded = () => {
      setIsLoading(false);
    };
    
    // Initialize scene
    scene.init();
    
    // Handle window resize
    const handleResize = () => {
      if (scene && scene.resize) {
        scene.resize(container.clientWidth, container.clientHeight);
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (scene && scene.dispose) {
        scene.dispose();
      }
    };
  }, [activeScene, isMounted]);

  // Handle scene change
  const handleSceneChange = (scene) => {
    if (scene === activeScene) return;
    
    // Store user preference
    localStorage.setItem('preferredScene', scene);
    
    // Reset loading state when changing scenes
    setIsLoading(true);
    setActiveScene(scene);
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: 1,
        pointerEvents: 'none', // Let events pass through to hero content by default
      }}
    >
      {/* Scene Selector Controls */}
      <Box
        sx={{
          position: 'absolute',
          bottom: theme.spacing(4),
          right: theme.spacing(4),
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          pointerEvents: 'auto', // Enable interaction with controls
        }}
      >
        <IconButton
          aria-label="Switch to sphere scene"
          onClick={() => handleSceneChange('sphere')}
          sx={{
            backgroundColor: activeScene === 'sphere' 
              ? theme.palette.primary.main 
              : 'rgba(0, 0, 0, 0.3)',
            color: activeScene === 'sphere' 
              ? theme.palette.primary.contrastText 
              : theme.palette.common.white,
            '&:hover': {
              backgroundColor: activeScene === 'sphere' 
                ? theme.palette.primary.dark 
                : 'rgba(0, 0, 0, 0.5)',
            },
          }}
        >
          <RadioButtonUncheckedIcon />
        </IconButton>
        
        <IconButton
          aria-label="Switch to cube scene"
          onClick={() => handleSceneChange('cube')}
          sx={{
            backgroundColor: activeScene === 'cube' 
              ? theme.palette.primary.main 
              : 'rgba(0, 0, 0, 0.3)',
            color: activeScene === 'cube' 
              ? theme.palette.primary.contrastText 
              : theme.palette.common.white,
            '&:hover': {
              backgroundColor: activeScene === 'cube' 
                ? theme.palette.primary.dark 
                : 'rgba(0, 0, 0, 0.5)',
            },
          }}
        >
          <ViewInArIcon />
        </IconButton>
        
        <IconButton
          aria-label="Switch to torus scene"
          onClick={() => handleSceneChange('torus')}
          sx={{
            backgroundColor: activeScene === 'torus' 
              ? theme.palette.primary.main 
              : 'rgba(0, 0, 0, 0.3)',
            color: activeScene === 'torus' 
              ? theme.palette.primary.contrastText 
              : theme.palette.common.white,
            '&:hover': {
              backgroundColor: activeScene === 'torus' 
                ? theme.palette.primary.dark 
                : 'rgba(0, 0, 0, 0.5)',
            },
          }}
        >
          <DonutLargeOutlinedIcon />
        </IconButton>
      </Box>
      
      {/* Loading Indicator */}
      {isLoading && (
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
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(5px)',
            zIndex: 5,
          }}
        >
          <CircularProgress color="secondary" />
        </Box>
      )}
      
      {/* 3D Scene Container */}
      <Box
        ref={containerRef}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'auto', // Enable interaction with 3D scene
        }}
      />
    </Box>
  );
};

export default Background3D;
