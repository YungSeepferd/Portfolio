import React, { useState, useEffect, memo, useCallback, useRef, useReducer } from 'react';
import { Box, useTheme, useMediaQuery, IconButton, Tooltip, Fade } from '@mui/material';
import HeroContent from './HeroContent';
import ErrorBoundary from '../common/ErrorBoundary';
import ScrollIndicator from './ScrollIndicator';
import MobileScrollHelper from './MobileScrollHelper';
import Background3D from './background3d/Background3D';
import { SHAPE_TYPES } from './background3d/constants';
import { SceneProvider, useSceneState } from './background3d/SceneContext';
import InteractionGuide from './background3d/components/InteractionGuide';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

/**
 * HeroBackground Component - Handles the 3D background with proper context integration
 */
const HeroBackground = memo(({ onSceneClick, onToggleParticles, showParticles, easterEggActive, interactionCount }) => {
  const [showInteractionHint, setShowInteractionHint] = useState(false); // Changed to false - no auto-show
  
  // Only show hint briefly on first load, then let users discover naturally
  useEffect(() => {
    let hideTimer;
    const showTimer = setTimeout(() => {
      setShowInteractionHint(true);
      hideTimer = setTimeout(() => setShowInteractionHint(false), 1500);
    }, 1000); // Show after 1 second delay

    return () => {
      clearTimeout(showTimer);
      if (hideTimer) {
        clearTimeout(hideTimer);
      }
    };
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
  
  // Handle background click
  const handleBackgroundClick = useCallback(() => {
    // Update scene context
    switchShapeType();
    
    // Notify parent component
    if (onSceneClick) {
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
      
      {/* Information button only - positioned in top right */}
      <Box
        sx={{
          position: 'absolute',
          top: 90,
          right: 30,
          zIndex: 10,
          display: 'flex',
          pointerEvents: 'auto',
        }}
      >
        {/* Info/help button to show interaction guide */}
        <Tooltip title="Help">
          <IconButton 
            onClick={handleToggleGuide}
            sx={{
              backgroundColor: 'rgba(0,0,0,0.2)',
              color: showGuide ? theme.palette.primary.main : 'rgba(255,255,255,0.7)',
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.3)',
              }
            }}
            aria-label="Help"
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

// Hero state management with useReducer
const initialHeroState = {
  is3DVisible: false,
  hasInitialized: false,
  sceneIndex: 0,
  showParticles: true,
  sceneNameVisible: false,
  currentSceneName: 'Sphere',
  easterEggActive: false,
  interactionCount: 0,
  lastInteractionTime: 0
};

const heroReducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE':
      return { ...state, hasInitialized: true };
    case 'SHOW_3D':
      return { ...state, is3DVisible: true };
    case 'CHANGE_SCENE':
      return {
        ...state,
        sceneIndex: action.payload.newIndex,
        currentSceneName: action.payload.sceneName,
        sceneNameVisible: true
      };
    case 'HIDE_SCENE_NAME':
      return { ...state, sceneNameVisible: false };
    case 'TOGGLE_PARTICLES':
      return { ...state, showParticles: !state.showParticles };
    case 'UPDATE_INTERACTION':
      return {
        ...state,
        interactionCount: action.payload.count,
        lastInteractionTime: action.payload.time
      };
    case 'ACTIVATE_EASTER_EGG':
      return { ...state, easterEggActive: true };
    case 'DEACTIVATE_EASTER_EGG':
      return { ...state, easterEggActive: false };
    default:
      return state;
  }
};

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
  const [state, dispatch] = useReducer(heroReducer, initialHeroState);
  const interactionSequence = useRef([]);
  
  // Destructure state for easier access
  const {
    is3DVisible,
    hasInitialized,
    sceneIndex,
    showParticles,
    sceneNameVisible,
    currentSceneName,
    easterEggActive,
    interactionCount,
    lastInteractionTime
  } = state;
  
  // Track rapid interactions for combo effects
  const checkForCombo = useCallback(() => {
    const now = Date.now();
    if (now - lastInteractionTime < 1000) {
      // Increment combo counter for rapid interactions
      const newCount = interactionCount + 1;
      // Trigger easter egg on 5 rapid clicks
      if (newCount >= 5 && !easterEggActive) {
        dispatch({ type: 'ACTIVATE_EASTER_EGG' });
        setTimeout(() => dispatch({ type: 'DEACTIVATE_EASTER_EGG' }), 5000);
        
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
      dispatch({ 
        type: 'UPDATE_INTERACTION', 
        payload: { count: newCount, time: now }
      });
    } else {
      // Reset combo if too much time has passed
      dispatch({ 
        type: 'UPDATE_INTERACTION', 
        payload: { count: 1, time: now }
      });
    }
  }, [lastInteractionTime, easterEggActive, interactionCount]);

  // Two-phase initialization for better stability
  useEffect(() => {
    dispatch({ type: 'INITIALIZE' });
    
    const timer = setTimeout(() => {
      dispatch({ type: 'SHOW_3D' });
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
    const sceneName = getSceneName(newSceneIndex);
    
    dispatch({ 
      type: 'CHANGE_SCENE', 
      payload: { newIndex: newSceneIndex, sceneName }
    });

    // Hide scene name after 2 seconds
    setTimeout(() => {
      dispatch({ type: 'HIDE_SCENE_NAME' });
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
    dispatch({ type: 'TOGGLE_PARTICLES' });
    
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
          xs: 'calc(100vh - 56px)', // 56px is the height of the mobile app bar
          sm: 'calc(100vh - 64px)'  // 64px is the height of the desktop app bar
        },
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'visible',
        background: `linear-gradient(145deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
        py: { xs: theme.spacing(4), md: theme.spacing(0) },
        isolation: 'isolate',
        // Smooth transition for theme changes
        transition: theme.transitions.create(['background', 'color'], {
          duration: theme.transitions.duration.standard,
        }),
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
            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(5, 38, 45, 0.20)',
            backdropFilter: 'blur(8px)',
            color: theme.palette.common.white,
            padding: theme.spacing(1, 2),
            borderRadius: theme.shape.borderRadius,
            zIndex: theme.zIndex.tooltip,
            pointerEvents: 'none',
            typography: 'body1',
            fontWeight: theme.typography.fontWeightMedium,
            boxShadow: theme.shadows[4],
            border: `1px solid ${theme.palette.divider}`,
            transition: theme.transitions.create(['opacity', 'transform', 'background-color'], {
              duration: theme.transitions.duration.shorter,
            }),
            '&:hover': {
              backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.25)' : 'rgba(5, 38, 45, 0.30)',
            },
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
          position: 'relative',
          zIndex: zIndexes.content,
          alignItems: 'center',
          justifyContent: 'flex-start',
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
      
      {/* Mobile Scroll Helper - Mobile Only */}
      {isMobile && <MobileScrollHelper />}
    </Box>
  );
};

export default Hero;
