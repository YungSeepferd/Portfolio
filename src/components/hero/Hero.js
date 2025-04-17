import React, { useState, useEffect, memo, useCallback, useRef } from 'react';
import { Box, useTheme, useMediaQuery, IconButton, Tooltip, Fade } from '@mui/material';
import HeroContent from './HeroContent';
import ErrorBoundary from '../common/ErrorBoundary';
import ScrollIndicator from './ScrollIndicator';
import Background3D from './background3d/Background3D';
import { SHAPE_TYPES } from './background3d/constants';
import { SceneProvider, useSceneState } from './background3d/SceneContext';
import InteractionGuide from './background3d/components/InteractionGuide';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

/**
 * HeroBackground Component - Handles the 3D background with proper context integration
 */
const HeroBackground = memo(({ onSceneClick, onToggleParticles, showParticles, easterEggActive, interactionCount }) => {
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
          easterEggActive={easterEggActive}
          interactionCount={interactionCount}
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
  showInteractionHint,
  easterEggActive,
  interactionCount
}) => {
  const theme = useTheme();
  const [showGuide, setShowGuide] = useState(false);
  const { switchShapeType } = useSceneState();
  
  // Handle background click with improved logging
  const handleBackgroundClick = useCallback(() => {
    console.log("📢 BackgroundController: Scene change button clicked");
    
    // Update scene context
    switchShapeType();
    
    // Notify parent component
    if (onSceneClick) {
      console.log("📢 BackgroundController: Calling parent onSceneClick handler");
      onSceneClick();
    }
  }, [switchShapeType, onSceneClick]);
  
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
      
      {/* Information button only - positioned in bottom right */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          zIndex: 10,
          display: 'flex',
          pointerEvents: 'auto',
        }}
      >
        {/* Info/help button to show interaction guide */}
        <Tooltip title="Show interaction guide">
          <IconButton 
            onClick={handleToggleGuide}
            sx={{
              backgroundColor: 'rgba(0,0,0,0.2)',
              color: showGuide ? theme.palette.primary.main : 'rgba(255,255,255,0.7)',
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.3)',
              }
            }}
            aria-label="Show interaction guide"
          >
            <InfoOutlinedIcon />
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
  
  // New states for enhanced interactions
  const [easterEggActive, setEasterEggActive] = useState(false);
  const [interactionCount, setInteractionCount] = useState(0);
  const [lastInteractionTime, setLastInteractionTime] = useState(0);
  const interactionSequence = useRef([]);
  
  // Track rapid interactions for combo effects
  const checkForCombo = useCallback(() => {
    const now = Date.now();
    if (now - lastInteractionTime < 1000) {
      // Increment combo counter for rapid interactions
      setInteractionCount(prev => {
        const newCount = prev + 1;
        // Trigger easter egg on 5 rapid clicks
        if (newCount >= 5 && !easterEggActive) {
          setEasterEggActive(true);
          setTimeout(() => setEasterEggActive(false), 5000);
          
          // Analytics tracking
          if (process.env.NODE_ENV === 'production') {
            try {
              window.gtag && window.gtag('event', 'easter_egg_activated', { 
                interaction_type: 'rapid_clicks'
              });
            } catch (err) {
              console.error('Analytics error:', err);
            }
          }
        }
        return newCount;
      });
    } else {
      // Reset combo if too much time has passed
      setInteractionCount(1);
    }
    setLastInteractionTime(now);
  }, [lastInteractionTime, easterEggActive]);

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
    
    // Track interaction sequence for pattern detection
    interactionSequence.current.push({
      type: 'click',
      time: Date.now()
    });
    
    // Keep sequence limited to last 10 interactions
    if (interactionSequence.current.length > 10) {
      interactionSequence.current.shift();
    }
    
    // Check for combo effects
    checkForCombo();
    
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
  }, [sceneIndex, getSceneName, checkForCombo]);

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
          easterEggActive={easterEggActive}
          interactionCount={interactionCount}
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
            borderRadius: theme.shape.borderRadius.lg,
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