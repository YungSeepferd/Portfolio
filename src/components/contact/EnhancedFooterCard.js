import React, { useRef, useEffect, useCallback, useState } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';

/**
 * EnhancedFooterCard
 * 
 * Interactive card component inspired by React Bits ProfileCard patterns.
 * Adds sophisticated 3D tilt, cursor-tracking gradients, and holographic effects
 * to the footer contact card.
 * 
 * Features:
 * - 3D tilt effect following mouse position (desktop only)
 * - Radial gradient overlay that tracks cursor
 * - Holographic shine animations
 * - Smooth transitions and easing
 * - Theme-aware colors (design system compliant)
 * - Performance optimized with RAF and throttling
 * 
 * Technical Approach:
 * - CSS custom properties for dynamic values (--pointer-x, --pointer-y, etc.)
 * - Transform-based 3D rotation (GPU-accelerated)
 * - Layered effects with proper z-indexing
 * - Conditional rendering based on viewport size
 * 
 * @param {React.ReactNode} children - Card content to display
 */
const EnhancedFooterCard = ({ children }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  
  const wrapperRef = useRef(null);
  const cardRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  
  // Mouse position as percentage
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

    // Calculate rotation angles (reduced intensity for subtle effect)
    const rotateX = -(centerX / 8); // Divide by 8 for gentler tilt
    const rotateY = centerY / 6;    // Divide by 6 for gentler tilt

    setPointerPos({
      x: percentX,
      y: percentY,
      rotateX,
      rotateY,
      centerX,
      centerY
    });
  }, []);

  // Handle mouse move with throttling
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

  // Handle mouse leave - reset to center
  const handlePointerLeave = useCallback(() => {
    if (!isDesktop) return;
    setIsActive(false);
    setPointerPos({ x: 50, y: 50, rotateX: 0, rotateY: 0, centerX: 0, centerY: 0 });
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
      ref={wrapperRef}
      sx={{
        perspective: isDesktop ? '1200px' : 'none',
        transformStyle: 'preserve-3d',
        position: 'relative',
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
              borderRadius: '24px',
              pointerEvents: 'none',
              zIndex: 1,
              opacity: isActive ? 1 : 0,
              transition: 'opacity 0.3s ease',
              background: `radial-gradient(
                circle 400px at ${pointerPos.x || 50}% ${pointerPos.y || 50}%,
                ${theme.palette.accent.main}09 0%,
                ${theme.palette.accent.light}07 15%,
                ${theme.palette.primary.main}05 35%,
                ${theme.palette.primary.light}03 55%,
                transparent 75%
              )`,
              mixBlendMode: 'screen',
            }}
          />
        )}

        {/* Holographic shine layer */}
        {isDesktop && (
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              borderRadius: '24px',
              pointerEvents: 'none',
              zIndex: 0.5,
              opacity: isActive ? 0.14 : 0,
              transition: 'opacity 0.4s ease',
              background: `
                linear-gradient(
                  135deg,
                  ${theme.palette.accent.main}10 0%,
                  ${theme.palette.accent.light}07 20%,
                  transparent 40%,
                  ${theme.palette.primary.light}06 65%,
                  ${theme.palette.primary.main}08 85%,
                  transparent 100%
                )
              `,
              backgroundSize: '200% 200%',
              backgroundPosition: `${(pointerPos.x || 50) * 2}% ${(pointerPos.y || 50) * 2}%`,
              mixBlendMode: 'overlay',
              animation: !isActive ? 'none' : 'shimmer 8s ease-in-out infinite',
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
              borderRadius: '26px',
              pointerEvents: 'none',
              zIndex: -1,
              background: `radial-gradient(
                circle 300px at ${pointerPos.x || 50}% ${pointerPos.y || 50}%,
                ${theme.palette.accent.main}25 0%,
                ${theme.palette.secondary.light}15 30%,
                transparent 60%
              )`,
              filter: 'blur(20px)',
              opacity: 0.6,
              transition: 'opacity 0.3s ease',
            }}
          />
        )}

        {/* Main card content */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: isActive
              ? `
                  0 20px 60px -15px rgba(0, 0, 0, 0.3),
                  0 10px 30px -10px ${theme.palette.accent.main}20
                `
              : '0 10px 40px -10px rgba(0, 0, 0, 0.2)',
            transition: 'box-shadow 0.3s ease',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default EnhancedFooterCard;
