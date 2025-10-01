import React, { useRef, useCallback, useState, useEffect } from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import ThreadsBackground from './ThreadsBackground';

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

  // Handle mouse move
  const handlePointerMove = useCallback((event) => {
    if (!isDesktop) return;
    
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    updateCardTransform(offsetX, offsetY);
  }, [isDesktop, updateCardTransform]);

  // Handle mouse enter
  const handlePointerEnter = useCallback(() => {
    if (!isDesktop) return;
    setIsActive(true);
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

        {/* Three.js animated threads background */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            borderRadius: theme.shape.borderRadiusScale[4],
            pointerEvents: 'none',
            zIndex: 0.3,
            overflow: 'hidden',
            opacity: isActive ? 0.8 : 0.5,
            transition: 'opacity 0.3s ease',
          }}
        >
          <ThreadsBackground
            color={theme.palette.accent.main}
            amplitude={isActive ? 1.5 : 1}
            distance={0}
            enableMouseInteraction={isDesktop && isActive}
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
              WhoAmI
            </Typography>

            {/* Subtitle with pipe separators */}
            <Typography
              variant="h6"
              sx={{
                fontWeight: 500,
                fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
                color: theme.palette.text.secondary,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                opacity: 0.9,
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
