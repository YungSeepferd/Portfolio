import React, { useRef, useCallback, useState, useEffect } from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import OrbBackground from './ThreadsBackground';

/**
 * WhoAmIProfileCard
 * 
 * Interactive profile card for the WhoAmI section header.
 * Features 3D tilt, cursor-tracking gradients, and holographic effects
 * similar to the contact footer cards.
 * 
 * Displays:
 * - Title: "WhoAmI"
 * - Subtitle: "UX | PROTOTYPING | FRONTEND | AUDIO | HAPTICS"
 * 
 * Design: Broad horizontal card (wider than tall) without image
 */
const WhoAmIProfileCard = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  
  const cardRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [pointerPos, setPointerPos] = useState({ x: 50, y: 50 });
  const [isShaking, setIsShaking] = useState(false);
  const [shakeVariant, setShakeVariant] = useState(0);
  const [shakeDuration, setShakeDuration] = useState(0.6);
  const [waveScale, setWaveScale] = useState(30);
  
  // Track mouse velocity for intensity-based animation
  const lastMousePosRef = useRef({ x: 0, y: 0, time: 0 });
  const velocityRef = useRef(0);
  
  // Calculate rotation based on mouse position
  const updateCardTransform = useCallback((offsetX, offsetY) => {
    const card = cardRef.current;
    if (!card) return;

    const width = card.clientWidth;
    const height = card.clientHeight;

    // Convert to percentage (0-100)
    const percentX = Math.max(0, Math.min(100, (100 / width) * offsetX));
    const percentY = Math.max(0, Math.min(100, (100 / height) * offsetY));

    // Calculate center offsets (-50 to +50)
    const centerX = percentX - 50;
    const centerY = percentY - 50;

    // Calculate rotation angles (subtle tilt)
    const rotateX = -(centerX / 10);
    const rotateY = centerY / 8;

    setPointerPos({
      x: percentX,
      y: percentY,
      rotateX,
      rotateY,
    });
  }, []);

  // Handle mouse move and track velocity
  const handlePointerMove = useCallback((event) => {
    if (!isDesktop) return;
    
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    // Calculate velocity
    const now = Date.now();
    const deltaTime = now - lastMousePosRef.current.time;
    
    if (deltaTime > 0) {
      const deltaX = event.clientX - lastMousePosRef.current.x;
      const deltaY = event.clientY - lastMousePosRef.current.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const velocity = distance / deltaTime; // pixels per millisecond
      
      velocityRef.current = velocity;
    }
    
    lastMousePosRef.current = {
      x: event.clientX,
      y: event.clientY,
      time: now,
    };

    updateCardTransform(offsetX, offsetY);
  }, [isDesktop, updateCardTransform]);

  // Handle mouse enter with velocity-based shake animation
  const handlePointerEnter = useCallback(() => {
    if (!isDesktop) return;
    setIsActive(true);
    setIsShaking(true);
    
    // Map velocity to intensity (0-7) and duration
    // Adjusted thresholds: normal behavior is less intense
    const velocity = velocityRef.current;
    let variant;
    let duration;
    let waveScale;
    
    if (velocity < 0.5) {
      // Very slow entry: Subtle variants (6)
      variant = 6;
      duration = 1.2;
      waveScale = 15; // Smaller expansion
    } else if (velocity < 1.0) {
      // Slow/Normal entry: Gentle variants (0, 1)
      variant = Math.random() < 0.5 ? 0 : 1;
      duration = 1.0;
      waveScale = 20;
    } else if (velocity < 2.0) {
      // Medium entry: Balanced variants (2, 5)
      variant = Math.random() < 0.5 ? 2 : 5;
      duration = 0.8;
      waveScale = 30;
    } else if (velocity < 3.5) {
      // Fast entry: Dynamic variants (3, 4)
      variant = Math.random() < 0.5 ? 3 : 4;
      duration = 0.6;
      waveScale = 40;
    } else {
      // Very fast entry: Aggressive variant (7)
      variant = 7;
      duration = 0.5;
      waveScale = 50; // Maximum expansion
    }
    
    setShakeVariant(variant);
    setShakeDuration(duration);
    setWaveScale(waveScale);
    
    // Reset shake after animation
    setTimeout(() => {
      setIsShaking(false);
    }, duration * 1000);
  }, [isDesktop]);

  // Handle mouse leave - reset
  const handlePointerLeave = useCallback(() => {
    if (!isDesktop) return;
    setIsActive(false);
    setPointerPos({ x: 50, y: 50, rotateX: 0, rotateY: 0 });
  }, [isDesktop]);

  // Set up event listeners
  useEffect(() => {
    const card = cardRef.current;
    if (!card || !isDesktop) return;

    card.addEventListener('pointerenter', handlePointerEnter);
    card.addEventListener('pointermove', handlePointerMove);
    card.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      card.removeEventListener('pointerenter', handlePointerEnter);
      card.removeEventListener('pointermove', handlePointerMove);
      card.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [isDesktop, handlePointerEnter, handlePointerMove, handlePointerLeave]);

  return (
    <Box
      sx={{
        perspective: isDesktop ? '1200px' : 'none',
        transformStyle: 'preserve-3d',
        position: 'relative',
        mb: 4,
      }}
    >
      {/* Interactive Card Container */}
      <Box
        ref={cardRef}
        sx={{
          position: 'relative',
          transform: isDesktop && isActive
            ? `rotateX(${pointerPos.rotateY || 0}deg) rotateY(${pointerPos.rotateX || 0}deg) translateZ(10px)`
            : 'rotateX(0deg) rotateY(0deg) translateZ(0px)',
          transition: isActive
            ? 'none' 
            : 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
          willChange: isDesktop ? 'transform' : 'auto',
          transformStyle: 'preserve-3d',
          animation: isShaking ? `impactShake${shakeVariant} ${shakeDuration}s cubic-bezier(0.36, 0.07, 0.19, 0.97)` : 'none',
          // Variant 0: Original - balanced shake
          '@keyframes impactShake0': {
            '0%': { transform: 'scale(1)' },
            '10%': { transform: 'scale(0.95) translate(0px, 0px)' },
            '20%': { transform: 'scale(1.05) translate(2px, -1px)' },
            '30%': { transform: 'scale(1.02) translate(-2px, 1px)' },
            '40%': { transform: 'scale(1.01) translate(1px, -1px)' },
            '50%': { transform: 'scale(1.005) translate(-1px, 0px)' },
            '60%': { transform: 'scale(1.002) translate(0.5px, 0.5px)' },
            '70%': { transform: 'scale(1.001) translate(-0.5px, -0.5px)' },
            '100%': { transform: 'scale(1) translate(0px, 0px)' },
          },
          // Variant 1: Horizontal emphasis
          '@keyframes impactShake1': {
            '0%': { transform: 'scale(1)' },
            '10%': { transform: 'scale(0.96) translate(0px, 0px)' },
            '20%': { transform: 'scale(1.04) translate(3px, -0.5px)' },
            '30%': { transform: 'scale(1.02) translate(-3px, 0.5px)' },
            '40%': { transform: 'scale(1.01) translate(2px, 0px)' },
            '50%': { transform: 'scale(1.005) translate(-1.5px, 0px)' },
            '60%': { transform: 'scale(1.002) translate(0.8px, 0px)' },
            '70%': { transform: 'scale(1.001) translate(-0.4px, 0px)' },
            '100%': { transform: 'scale(1) translate(0px, 0px)' },
          },
          // Variant 2: Vertical emphasis
          '@keyframes impactShake2': {
            '0%': { transform: 'scale(1)' },
            '10%': { transform: 'scale(0.94) translate(0px, 0px)' },
            '20%': { transform: 'scale(1.06) translate(0.5px, -2.5px)' },
            '30%': { transform: 'scale(1.03) translate(-0.5px, 2px)' },
            '40%': { transform: 'scale(1.015) translate(0px, -1.5px)' },
            '50%': { transform: 'scale(1.008) translate(0px, 1px)' },
            '60%': { transform: 'scale(1.003) translate(0px, -0.5px)' },
            '70%': { transform: 'scale(1.001) translate(0px, 0.3px)' },
            '100%': { transform: 'scale(1) translate(0px, 0px)' },
          },
          // Variant 3: Quick snap
          '@keyframes impactShake3': {
            '0%': { transform: 'scale(1)' },
            '8%': { transform: 'scale(0.93) translate(0px, 0px)' },
            '18%': { transform: 'scale(1.07) translate(2.5px, -1.5px)' },
            '28%': { transform: 'scale(1.01) translate(-1.5px, 1px)' },
            '38%': { transform: 'scale(1.005) translate(1px, -0.5px)' },
            '50%': { transform: 'scale(1.002) translate(-0.5px, 0.5px)' },
            '65%': { transform: 'scale(1.001) translate(0.3px, -0.3px)' },
            '80%': { transform: 'scale(1) translate(-0.1px, 0.1px)' },
            '100%': { transform: 'scale(1) translate(0px, 0px)' },
          },
          // Variant 4: Bouncy
          '@keyframes impactShake4': {
            '0%': { transform: 'scale(1)' },
            '10%': { transform: 'scale(0.92) translate(0px, 0px)' },
            '25%': { transform: 'scale(1.08) translate(1.5px, -2px)' },
            '40%': { transform: 'scale(0.98) translate(-1.5px, 1.5px)' },
            '55%': { transform: 'scale(1.02) translate(1px, -1px)' },
            '70%': { transform: 'scale(0.99) translate(-0.5px, 0.5px)' },
            '85%': { transform: 'scale(1.005) translate(0.3px, -0.3px)' },
            '100%': { transform: 'scale(1) translate(0px, 0px)' },
          },
          // Variant 5: Diagonal emphasis
          '@keyframes impactShake5': {
            '0%': { transform: 'scale(1)' },
            '10%': { transform: 'scale(0.95) translate(0px, 0px)' },
            '20%': { transform: 'scale(1.05) translate(2.5px, -2.5px)' },
            '30%': { transform: 'scale(1.02) translate(-2px, 2px)' },
            '40%': { transform: 'scale(1.01) translate(1.5px, -1.5px)' },
            '50%': { transform: 'scale(1.005) translate(-1px, 1px)' },
            '60%': { transform: 'scale(1.002) translate(0.6px, -0.6px)' },
            '70%': { transform: 'scale(1.001) translate(-0.3px, 0.3px)' },
            '100%': { transform: 'scale(1) translate(0px, 0px)' },
          },
          // Variant 6: Subtle pulse
          '@keyframes impactShake6': {
            '0%': { transform: 'scale(1)' },
            '12%': { transform: 'scale(0.97) translate(0px, 0px)' },
            '24%': { transform: 'scale(1.03) translate(1px, -0.8px)' },
            '36%': { transform: 'scale(1.01) translate(-1px, 0.8px)' },
            '48%': { transform: 'scale(1.005) translate(0.7px, -0.5px)' },
            '60%': { transform: 'scale(1.002) translate(-0.5px, 0.3px)' },
            '75%': { transform: 'scale(1.001) translate(0.3px, -0.2px)' },
            '90%': { transform: 'scale(1) translate(-0.1px, 0.1px)' },
            '100%': { transform: 'scale(1) translate(0px, 0px)' },
          },
          // Variant 7: Aggressive snap
          '@keyframes impactShake7': {
            '0%': { transform: 'scale(1)' },
            '10%': { transform: 'scale(0.91) translate(0px, 0px)' },
            '20%': { transform: 'scale(1.09) translate(3px, -2px)' },
            '30%': { transform: 'scale(1.03) translate(-2.5px, 1.5px)' },
            '40%': { transform: 'scale(1.015) translate(2px, -1px)' },
            '50%': { transform: 'scale(1.008) translate(-1.5px, 0.8px)' },
            '60%': { transform: 'scale(1.003) translate(1px, -0.5px)' },
            '70%': { transform: 'scale(1.001) translate(-0.5px, 0.3px)' },
            '100%': { transform: 'scale(1) translate(0px, 0px)' },
          },
        }}
      >
        {/* Cursor-following radial gradient overlay */}
        {isDesktop && (
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              borderRadius: theme.shape.borderRadiusScale[4],
              pointerEvents: 'none',
              zIndex: 1,
              opacity: isActive ? 1 : 0,
              transition: 'opacity 0.3s ease',
              background: `radial-gradient(
                circle 500px at ${pointerPos.x || 50}% ${pointerPos.y || 50}%,
                ${theme.palette.accent.main}12 0%,
                ${theme.palette.accent.light}08 20%,
                ${theme.palette.primary.main}06 40%,
                transparent 70%
              )`,
              mixBlendMode: 'screen',
            }}
          />
        )}

        {/* Three.js animated orb background */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            borderRadius: theme.shape.borderRadiusScale[4],
            pointerEvents: 'none',
            zIndex: 0.3,
            overflow: 'visible', // Allow orb to expand in easter egg mode
            opacity: isActive ? 0.9 : 0.6,
            transition: 'opacity 0.4s ease',
          }}
        >
          <OrbBackground
            color={theme.palette.accent.main}
            isActive={isActive}
            enableMouseInteraction={isDesktop && isActive}
            waveDuration={shakeDuration}
            waveScale={waveScale}
          />
        </Box>

        {/* Holographic shine layer */}
        {isDesktop && (
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              borderRadius: theme.shape.borderRadiusScale[4],
              pointerEvents: 'none',
              zIndex: 0.5,
              opacity: isActive ? 0.16 : 0,
              transition: 'opacity 0.4s ease',
              background: `
                linear-gradient(
                  120deg,
                  ${theme.palette.accent.main}12 0%,
                  ${theme.palette.accent.light}09 25%,
                  transparent 45%,
                  ${theme.palette.primary.light}07 70%,
                  ${theme.palette.primary.main}10 90%,
                  transparent 100%
                )
              `,
              backgroundSize: '200% 200%',
              backgroundPosition: `${(pointerPos.x || 50) * 2}% ${(pointerPos.y || 50) * 2}%`,
              mixBlendMode: 'overlay',
              animation: isActive ? 'shimmer 6s ease-in-out infinite' : 'none',
              '@keyframes shimmer': {
                '0%, 100%': {
                  backgroundPosition: '0% 50%',
                },
                '50%': {
                  backgroundPosition: '100% 50%',
                },
              },
            }}
          />
        )}

        {/* Subtle glow effect at edges */}
        {isDesktop && isActive && (
          <Box
            sx={{
              position: 'absolute',
              inset: -2,
              borderRadius: theme.shape.borderRadiusScale[4],
              pointerEvents: 'none',
              zIndex: -1,
              background: `radial-gradient(
                circle 400px at ${pointerPos.x || 50}% ${pointerPos.y || 50}%,
                ${theme.palette.accent.main}30 0%,
                ${theme.palette.secondary.light}18 35%,
                transparent 65%
              )`,
              filter: 'blur(24px)',
              opacity: 0.7,
              transition: 'opacity 0.3s ease',
            }}
          />
        )}

        {/* Main card content */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            backgroundColor: theme.palette.mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.08)' 
              : 'rgba(255, 255, 255, 0.6)',
            backdropFilter: 'blur(12px)',
            border: `1px solid ${theme.palette.mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.15)' 
              : 'rgba(255, 255, 255, 0.4)'}`,
            borderRadius: theme.shape.borderRadiusScale[4],
            overflow: 'hidden',
            boxShadow: isActive
              ? `
                  0 24px 70px -18px rgba(0, 0, 0, 0.35),
                  0 12px 35px -12px ${theme.palette.accent.main}25
                `
              : '0 12px 45px -12px rgba(0, 0, 0, 0.25)',
            transition: 'box-shadow 0.3s ease',
            py: { xs: 3, sm: 4, md: 5 },
            px: { xs: 3, sm: 4, md: 6 },
          }}
        >
          {/* Content */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: 1.5,
            }}
          >
            {/* Title */}
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                background: `linear-gradient(135deg, 
                  ${theme.palette.primary.main}, 
                  ${theme.palette.accent.main})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em',
              }}
            >
              Vincent Göke
            </Typography>

            {/* Subtitle with pipe separators */}
            <Typography
              variant="h6"
              sx={{
                fontWeight: 500,
                fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                opacity: 0.9,
                transition: 'all 0.3s ease',
                color: isShaking ? theme.palette.accent.light : theme.palette.text.secondary,
                textShadow: isShaking 
                  ? `0 0 20px ${theme.palette.accent.main}80, 0 0 40px ${theme.palette.accent.main}40, 0 0 60px ${theme.palette.accent.main}20`
                  : 'none',
                animation: isShaking ? `textGlow ${shakeDuration}s ease-out` : 'none',
                '@keyframes textGlow': {
                  '0%': {
                    textShadow: 'none',
                    filter: 'brightness(1)',
                  },
                  '20%': {
                    textShadow: `0 0 20px ${theme.palette.accent.main}80, 0 0 40px ${theme.palette.accent.main}40`,
                    filter: 'brightness(1.5)',
                  },
                  '40%': {
                    textShadow: `0 0 15px ${theme.palette.accent.main}60, 0 0 30px ${theme.palette.accent.main}30`,
                    filter: 'brightness(1.3)',
                  },
                  '60%': {
                    textShadow: `0 0 10px ${theme.palette.accent.main}40, 0 0 20px ${theme.palette.accent.main}20`,
                    filter: 'brightness(1.15)',
                  },
                  '100%': {
                    textShadow: 'none',
                    filter: 'brightness(1)',
                  },
                },
              }}
            >
              UX | PROTOTYPING | FRONTEND | AUDIO | HAPTICS
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default WhoAmIProfileCard;
