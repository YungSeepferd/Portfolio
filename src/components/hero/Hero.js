import React, { useState, useEffect, memo, useCallback } from 'react';
import { Box, useTheme, useMediaQuery, IconButton, Tooltip, Fade } from '@mui/material';
import HeroContent from './HeroContent';
import ErrorBoundary from '../common/ErrorBoundary';
import ScrollIndicator from './ScrollIndicator';
import Background3D from './background3d/Background3D';
import { SHAPE_TYPES } from './background3d/constants';
import { SceneProvider, useSceneState } from './background3d/SceneContext';
import InteractionGuide from './background3d/components/InteractionGuide';
import ParticlesIcon from '@mui/icons-material/Grain';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

/**
 * HeroBackground Component - Handles the 3D background with proper context integration
 */
const HeroBackground = memo(({ onSceneClick, onToggleParticles, showParticles }) => {
  const [showInteractionHint, setShowInteractionHint] = useState(true);
  
  // Hide interaction hint after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInteractionHint(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <ErrorBoundary 
      componentName="Background3D"
      fallback={
        <Box 
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0.6,
            background: 'radial-gradient(circle at 30% 30%, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.2) 100%)',
            pointerEvents: 'none',
          }}
        />
      }
    >
      {/* Provide SceneContext at this level to control the scene */}
      <SceneProvider>
        <BackgroundController
          onSceneClick={onSceneClick}
          onToggleParticles={onToggleParticles}
          showParticles={showParticles}
          showInteractionHint={showInteractionHint}
        />
      </SceneProvider>
    </ErrorBoundary>
  );
});

/**
 * BackgroundController - Component with access to scene context
 */
const BackgroundController = memo(({ 
  onSceneClick, 
  onToggleParticles, 
  showParticles, 
  showInteractionHint 
}) => {
  const theme = useTheme();
  const [showGuide, setShowGuide] = useState(false);
  const { toggleParticles, switchShapeType } = useSceneState();
  
  // Handle background click with context integration
  const handleBackgroundClick = useCallback(() => {
    console.log("📢 BackgroundController: Background clicked");
    // Update scene context
    switchShapeType();
    
    // Notify parent component
    if (onSceneClick) {
      onSceneClick();
    }
  }, [switchShapeType, onSceneClick]);
  
  // Handle particle toggle with context integration
  const handleToggleParticles = useCallback(() => {
    console.log("📢 BackgroundController: Toggling particles");
    // Update scene context
    toggleParticles();
    
    // Notify parent component
    if (onToggleParticles) {
      onToggleParticles();
    }
  }, [toggleParticles, onToggleParticles]);
  
  // Toggle interaction guide
  const handleToggleGuide = useCallback(() => {
    setShowGuide(prev => !prev);
  }, []);
  
  return (
    <>
      <Background3D 
        theme={theme} 
        onSceneClick={handleBackgroundClick} 
        performanceMode="medium"
      />
      
      {/* Interactive controls */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
          pointerEvents: 'auto', // Critical fix: Ensure pointer events work
        }}
      >
        {/* Info/help button to show interaction guide */}
        <Tooltip title="Show interaction guide">
          <IconButton 
            onClick={handleToggleGuide}
            sx={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              color: showGuide ? theme.palette.primary.main : theme.palette.text.secondary,
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.2)',
              }
            }}
            aria-label="Show interaction guide"
          >
            <InfoOutlinedIcon />
          </IconButton>
        </Tooltip>
        
        {/* Particle toggle button */}
        <Tooltip title={showParticles ? "Hide particles" : "Show particles"}>
          <IconButton 
            onClick={handleToggleParticles}
            sx={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              color: showParticles ? theme.palette.primary.main : theme.palette.text.secondary,
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.2)',
              }
            }}
            aria-label="Toggle particles"
          >
            <ParticlesIcon />
          </IconButton>
        </Tooltip>
        
        {/* Scene cycle button */}
        <Tooltip title="Change 3D object">
          <IconButton 
            onClick={handleBackgroundClick}
            sx={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              color: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.2)',
              }
            }}
            aria-label="Change 3D scene"
          >
            <ViewInArIcon />
          </IconButton>
        </Tooltip>
      </Box>
      
      {/* Interaction guide */}
      <InteractionGuide show={showGuide || showInteractionHint} position="bottom" />
    </>
  );
});

// Add displayNames for memo components
HeroBackground.displayName = 'HeroBackground';
BackgroundController.displayName = 'BackgroundController';

/**
 * Hero Component
 * 
 * The main hero section with enhanced 3D background features:
 * - Interactive scene switching (Sphere, Cube, Torus)
 * - Particle system for ambient atmosphere
 * - Mouse-responsive animations
 */
const Hero = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [is3DVisible, setIs3DVisible] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [showParticles, setShowParticles] = useState(true);
  const [sceneNameVisible, setSceneNameVisible] = useState(false);
  const [currentSceneName, setCurrentSceneName] = useState('Sphere');
  
  // Two-phase initialization for better stability
  useEffect(() => {
    setHasInitialized(true);
    
    const timer = setTimeout(() => {
      setIs3DVisible(true);
    }, 200);
    
    return () => clearTimeout(timer);
  }, []);

  // Get scene name based on index
  const getSceneName = useCallback((index) => {
    switch (index) {
      case SHAPE_TYPES.SPHERE: return 'Sphere';
      case SHAPE_TYPES.CUBE: return 'Cube';
      case SHAPE_TYPES.TORUS: return 'Torus';
      default: return 'Shape';
    }
  }, []);

  // Handle scene click to change scene type
  const handleSceneClick = useCallback(() => {
    console.log("📢 Hero.js: handleSceneClick called - About to change scene");
    
    // Cycle to next scene
    const newSceneIndex = (sceneIndex + 1) % 3;
    setSceneIndex(newSceneIndex);
    
    // Show scene name indicator
    setCurrentSceneName(getSceneName(newSceneIndex));
    setSceneNameVisible(true);
    
    console.log(`📢 Hero.js: Scene changed to ${getSceneName(newSceneIndex)} (index: ${newSceneIndex})`);
    
    // Hide scene name after 2 seconds
    setTimeout(() => {
      setSceneNameVisible(false);
    }, 2000);
    
    // Analytics tracking
    if (process.env.NODE_ENV === 'production') {
      try {
        window.gtag && window.gtag('event', 'change_scene', { 
          scene_index: newSceneIndex,
          scene_type: getSceneName(newSceneIndex)
        });
      } catch (err) {
        console.error('Analytics error:', err);
      }
    }
  }, [sceneIndex, getSceneName]);

  // Handle particle toggle
  const handleToggleParticles = useCallback(() => {
    setShowParticles(prev => !prev);
    
    // Analytics tracking
    if (process.env.NODE_ENV === 'production') {
      try {
        window.gtag && window.gtag('event', 'toggle_particles', { 
          show_particles: !showParticles
        });
      } catch (err) {
        console.error('Analytics error:', err);
      }
    }
  }, [showParticles]);

  // Define z-index values
  const zIndexes = {
    background: theme.zIndex?.heroBackground || 5,
    content: theme.zIndex?.heroContent || 10,
    scrollIndicator: theme.zIndex?.scrollIndicator || 10
  };

  return (
    <Box
      id="hero"
      component="section"
      aria-label="Hero section"
      sx={{
        width: '100%',
        minHeight: { 
          xs: 'calc(100vh - 56px)',
          sm: 'calc(100vh - 64px)'
        },
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'visible',
        background: `linear-gradient(145deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
        py: { xs: theme.spacing(4), md: theme.spacing(0) },
        isolation: 'isolate',
      }}
    >
      {/* Background Layer with enhanced interaction */}
      {hasInitialized && is3DVisible && (
        <HeroBackground 
          onSceneClick={handleSceneClick}
          onToggleParticles={handleToggleParticles}
          showParticles={showParticles}
        />
      )}
      
      {/* Scene name indicator - visible when changing scenes */}
      <Fade in={sceneNameVisible} timeout={{ enter: 400, exit: 800 }}>
        <Box
          sx={{
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '20px',
            zIndex: 30,
            pointerEvents: 'none',
            fontSize: '16px',
            fontWeight: 500,
          }}
        >
          {currentSceneName}
        </Box>
      </Fade>
      
      {/* Content Overlay Layer */}
      <Box
        sx={{
          width: '100%',
          height: '100%',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          position: 'relative',
          zIndex: zIndexes.content,
          pointerEvents: 'none', // Allow clicks to pass through to background
          pt: { xs: 8, md: 0 },
        }}
      >
        <HeroContent />
      </Box>
      
      {/* Scroll Indicator - Desktop Only */}
      {!isMobile && (
        <Box 
          sx={{ 
            position: 'relative', 
            zIndex: zIndexes.scrollIndicator, 
            pointerEvents: 'auto',
            mt: 'auto',
          }}
        >
          <ScrollIndicator />
        </Box>
      )}
    </Box>
  );
};

export default Hero;