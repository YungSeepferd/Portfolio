import React, { useState, useEffect, memo, useCallback, useRef } from 'react';
import { Box, useTheme, useMediaQuery, Fade } from '@mui/material';
import HeroContent from './HeroContent';
import ErrorBoundary from '../common/ErrorBoundary';
import ScrollIndicator from './ScrollIndicator';
import Background3D from './background3d/Background3D';
import { SHAPE_TYPES } from './background3d/constants';
import { SceneProvider, useSceneState } from './background3d/SceneContext';

interface HeroBackgroundProps {
  onSceneClick: () => void;
  onToggleParticles: () => void;
  showParticles: boolean;
  easterEggActive: boolean;
  interactionCount: number;
}

/**
 * HeroBackground Component - Handles the 3D background with proper context integration
 */
const HeroBackground = memo<HeroBackgroundProps>(
  ({ onSceneClick, onToggleParticles, showParticles, easterEggActive, interactionCount }) => {
    const [showInteractionHint, setShowInteractionHint] = useState(true);

    // Hide interaction hint after 5 seconds
    useEffect(() => {
      const timer = setTimeout(() => {
        setShowInteractionHint(false);
      }, 5000);

      return () => clearTimeout(timer);
    }, []);

    return (
      <ErrorBoundary componentName="Background3D">
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
  }
);

interface BackgroundControllerProps {
  onSceneClick: () => void;
  onToggleParticles: () => void;
  showParticles: boolean;
  showInteractionHint: boolean;
  easterEggActive: boolean;
  interactionCount: number;
}

/**
 * BackgroundController - Component with access to scene context
 */
const BackgroundController = memo<BackgroundControllerProps>(
  ({
    onSceneClick,
    onToggleParticles,
    showParticles,
    showInteractionHint,
    easterEggActive,
    interactionCount,
  }) => {
    const theme = useTheme();
    const [showGuide, setShowGuide] = useState(false);
    const { switchShapeType } = useSceneState();

    // Handle background click with improved logging
    const handleBackgroundClick = useCallback(() => {
      console.log('📢 BackgroundController: Scene change button clicked');

      // Update scene context
      switchShapeType();

      // Notify parent component
      if (onSceneClick) {
        console.log('📢 BackgroundController: Calling parent onSceneClick handler');
        onSceneClick();
      }
    }, [switchShapeType, onSceneClick]);

    // Toggle interaction guide
    const handleToggleGuide = useCallback(() => {
      setShowGuide((prev) => !prev);
    }, []);

    return (
      <>
        <Background3D theme={theme} onSceneClick={handleBackgroundClick} performanceMode="medium" />
      </>
    );
  }
);

/**
 * Main Hero Component with TypeScript interfaces
 */
const Hero: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [interactionCount, setInteractionCount] = useState(0);
  const [showParticles, setShowParticles] = useState(true); // Start with particles on like the old version
  const [easterEggActive, setEasterEggActive] = useState(false);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [sceneNameVisible, setSceneNameVisible] = useState(false);
  const [currentSceneName, setCurrentSceneName] = useState('Spheres');
  const [lastInteractionTime, setLastInteractionTime] = useState(0);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);
  const interactionSequence = useRef<Array<{ type: string; time: number }>>([]);

  // Get scene name based on index - restored from old version
  const getSceneName = useCallback((index: number) => {
    switch (index) {
      case SHAPE_TYPES.SPHERE:
        return 'Spheres';
      case SHAPE_TYPES.BOX:
        return 'Boxes';
      case SHAPE_TYPES.TORUS:
        return 'Drawing';
      default:
        return 'Scene';
    }
  }, []);

  // Track rapid interactions for combo effects - restored from old version
  const checkForCombo = useCallback(() => {
    const now = Date.now();
    if (now - lastInteractionTime < 1000) {
      setInteractionCount((prev) => {
        const newCount = prev + 1;
        if (newCount >= 5 && !easterEggActive) {
          setEasterEggActive(true);
          setTimeout(() => setEasterEggActive(false), 5000);
        }
        return newCount;
      });
    } else {
      setInteractionCount(1);
    }
    setLastInteractionTime(now);
  }, [lastInteractionTime, easterEggActive]);

  // Handle scene interactions - enhanced version from old component
  const handleSceneClick = useCallback(() => {
    console.log('📢 Hero.tsx: handleSceneClick called - About to change scene');

    // Track interaction sequence for pattern detection
    interactionSequence.current.push({
      type: 'click',
      time: Date.now(),
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

    console.log(
      `📢 Hero.tsx: Scene changed to ${getSceneName(newSceneIndex)} (index: ${newSceneIndex})`
    );

    // Hide scene name after 2 seconds
    setTimeout(() => {
      setSceneNameVisible(false);
    }, 2000);
  }, [sceneIndex, getSceneName, checkForCombo]);

  // Handle particle toggle - restored functionality
  const handleToggleParticles = useCallback(() => {
    setShowParticles((prev) => !prev);
  }, []);

  // Scroll indicator logic - restored from old version
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const isVisible =
        rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.2;
      setShowScrollIndicator(isVisible);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box
      id="hero"
      component="section"
      ref={heroRef}
      aria-label="Hero section"
      sx={{
        width: '100%',
        minHeight: {
          xs: 'calc(100vh - 56px)',
          sm: 'calc(100vh - 64px)',
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
      <HeroBackground
        onSceneClick={handleSceneClick}
        onToggleParticles={handleToggleParticles}
        showParticles={showParticles}
        easterEggActive={easterEggActive}
        interactionCount={interactionCount}
      />

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
            padding: { xs: '6px 12px', sm: '8px 16px' },
            borderRadius: { xs: 1.5, sm: 2 },
            zIndex: 30,
            pointerEvents: 'none',
            fontSize: { xs: '14px', sm: '16px', md: '18px' },
            fontWeight: 500,
            backdropFilter: 'blur(4px)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          {currentSceneName}
        </Box>
      </Fade>

      {/* Content Overlay Layer - Restored left alignment */}
      <Box
        sx={{
          width: '100%',
          height: '100%',
          minHeight: { xs: '80vh', md: '100vh' }, // Less height on mobile to move content higher
          display: 'flex',
          alignItems: { xs: 'flex-start', md: 'center' }, // Top on mobile, center on desktop
          justifyContent: 'flex-start', // Left alignment restored
          position: 'relative',
          zIndex: 2,
          pointerEvents: 'none', // Allow clicks to pass through to background
          pt: { xs: 0, md: 0 }, // Remove extra padding top
        }}
      >
        <HeroContent />
      </Box>

      {/* Scroll Indicator - Enhanced from old version */}
      <Fade in={showScrollIndicator} timeout={{ enter: 600, exit: 400 }}>
        <Box
          sx={{
            position: 'fixed',
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 20,
            pointerEvents: 'none',
            display: { xs: 'flex', sm: 'flex', md: 'none' },
            justifyContent: 'center',
          }}
        >
          <Box sx={{ pointerEvents: 'auto' }}>
            <ScrollIndicator />
          </Box>
        </Box>
      </Fade>
    </Box>
  );
};

Hero.displayName = 'Hero';
HeroBackground.displayName = 'HeroBackground';
BackgroundController.displayName = 'BackgroundController';

export default Hero;
