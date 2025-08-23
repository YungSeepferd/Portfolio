import React, { useState, useEffect, memo, useCallback, useRef } from 'react';
import { Box, useTheme, useMediaQuery, Fade } from '@mui/material';
import HeroContent from './hero-content';
import ErrorBoundary from '../common/error-boundary';
import ScrollIndicator from './scroll-indicator';
import Background3D from './background3d/Background3D';
import { SHAPE_TYPES } from './background3d/constants';
import { SceneProvider, useSceneState } from './background3d/scene-context';

interface HeroBackgroundProps {
  onSceneClick: () => void;
  onToggleParticles: () => void;
  showParticles: boolean;
}

/**
 * HeroBackground Component - Handles the 3D background with proper context integration
 */
const HeroBackground = memo<HeroBackgroundProps>(
  ({ onSceneClick, onToggleParticles, showParticles }) => {
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
  }) => {
    const theme = useTheme();
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
  const _isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [showParticles, setShowParticles] = useState(true); // Start with particles on
  const [sceneIndex, setSceneIndex] = useState(0);
  const [sceneNameVisible, setSceneNameVisible] = useState(false);
  const [currentSceneName, setCurrentSceneName] = useState('Spheres');
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);

  // Get scene name based on index
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

  // Handle scene interactions
  const handleSceneClick = useCallback(() => {
    console.log('📢 Hero.tsx: handleSceneClick called - About to change scene');

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
  }, [sceneIndex, getSceneName]);

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
