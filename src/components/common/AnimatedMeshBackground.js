import { useRef, useEffect, useCallback, useMemo } from 'react';
import { Box, useTheme } from '@mui/material';

/**
 * AnimatedMeshBackground
 * 
 * Sophisticated canvas-based animated gradient mesh background.
 * Inspired by React Bits profile card patterns - creates organic, flowing
 * gradient orbs that move in smooth patterns and react to mouse position.
 * 
 * Design Philosophy:
 * - Broad, soft gradient orbs create depth and visual interest
 * - Additive blending for luminous, overlapping effects
 * - Noticeable but elegant mouse interaction
 * - Theme-aware color palette integration
 * 
 * Technical Approach:
 * - Sin/cos movement for organic elliptical paths
 * - Radial gradients with alpha transparency
 * - Lerp-based mouse attraction (responsive but smooth)
 * - Performance optimized with throttling and RAF
 * 
 * @param {number} orbCount - Number of animated gradient orbs (default: 6)
 * @param {number} baseSpeed - Animation speed multiplier (default: 0.4)
 * @param {number} mouseInfluence - Cursor attraction strength 0-1 (default: 0.12)
 */
const AnimatedMeshBackground = ({
  orbCount = 6,
  baseSpeed = 0.4,
  mouseInfluence = 0.12
}) => {
  const theme = useTheme();
  const canvasRef = useRef(null);
  const orbsRef = useRef([]);
  const animationFrameRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const timeRef = useRef(0);

  // Extract theme colors with enhanced alpha for better glassmorphism contrast
  const orbColors = useMemo(() => {
    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
        : [0, 0, 0];
    };

    return [
      {
        rgb: hexToRgb(theme.palette.secondary.light),
        name: 'secondary.light',
        alpha: 0.3 // Increased from 0.25 for more visibility
      },
      {
        rgb: hexToRgb(theme.palette.accent.main),
        name: 'accent.main',
        alpha: 0.28 // Increased from 0.2
      },
      {
        rgb: hexToRgb(theme.palette.primary.main),
        name: 'primary.main',
        alpha: 0.2 // Increased from 0.15
      },
      {
        rgb: hexToRgb(theme.palette.secondary.main),
        name: 'secondary.main',
        alpha: 0.25 // Increased from 0.18
      },
      {
        rgb: hexToRgb(theme.palette.primary.light),
        name: 'primary.light',
        alpha: 0.3 // Increased from 0.22
      },
      {
        rgb: hexToRgb(theme.palette.accent.light),
        name: 'accent.light',
        alpha: 0.22 // New color for 6th orb
      }
    ];
  }, [theme]);

  // Initialize orbs with optimized parameters for footer interaction
  const initializeOrbs = useCallback((width, height) => {
    const orbs = [];
    for (let i = 0; i < orbCount; i++) {
      const colorData = orbColors[i % orbColors.length];
      orbs.push({
        // Base position (center of movement)
        centerX: Math.random() * width,
        centerY: Math.random() * height,
        // Current rendered position
        x: 0,
        y: 0,
        // Movement parameters - increased amplitude for more dramatic motion
        amplitude: 120 + Math.random() * 180, // Increased from 100-250
        speed: (0.3 + Math.random() * 0.5) * baseSpeed, // Slightly more variation
        phaseX: Math.random() * Math.PI * 2,
        phaseY: Math.random() * Math.PI * 2,
        // Visual properties - larger orbs for better coverage
        radius: 220 + Math.random() * 280, // Increased from 200-450
        color: colorData.rgb,
        alpha: colorData.alpha
      });
    }
    return orbs;
  }, [orbCount, orbColors, baseSpeed]);

  // Set canvas size with device pixel ratio for sharp rendering
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const container = canvas.parentElement;
    if (!container) return;

    const { width, height } = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }

    // Reinitialize orbs on resize
    orbsRef.current = initializeOrbs(width, height);
  }, [initializeOrbs]);

  // Linear interpolation helper for smooth mouse following
  const lerp = useCallback((start, end, factor) => {
    return start + (end - start) * factor;
  }, []);

  // Draw a single gradient orb with enhanced gradient stops
  const drawOrb = useCallback((ctx, orb) => {
    // Create radial gradient
    const gradient = ctx.createRadialGradient(
      orb.x, orb.y, 0,
      orb.x, orb.y, orb.radius
    );

    // Enhanced color stops for more pronounced, softer glow
    const [r, g, b] = orb.color;
    gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${orb.alpha})`);
    gradient.addColorStop(0.3, `rgba(${r}, ${g}, ${b}, ${orb.alpha * 0.7})`); // Tighter core
    gradient.addColorStop(0.6, `rgba(${r}, ${g}, ${b}, ${orb.alpha * 0.4})`);
    gradient.addColorStop(0.85, `rgba(${r}, ${g}, ${b}, ${orb.alpha * 0.15})`);
    gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

    // Draw orb
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
    ctx.fill();
  }, []);

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width / (window.devicePixelRatio || 1);
    const height = canvas.height / (window.devicePixelRatio || 1);

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Set blending mode for luminous overlapping effect
    ctx.globalCompositeOperation = 'lighter';

    // Update time - slightly faster for more dynamic feel
    timeRef.current += 0.012; // Increased from 0.01
    const time = timeRef.current;

    // Update and draw each orb
    orbsRef.current.forEach((orb) => {
      // Calculate base position using sin/cos for organic movement
      let targetX = orb.centerX + Math.sin(time * orb.speed + orb.phaseX) * orb.amplitude;
      let targetY = orb.centerY + Math.cos(time * orb.speed * 0.7 + orb.phaseY) * orb.amplitude * 0.8;

      // Enhanced mouse influence with larger radius for footer section
      if (mouseRef.current.active) {
        const dx = mouseRef.current.x - targetX;
        const dy = mouseRef.current.y - targetY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const influence = 400; // Increased from 300px for wider interaction area

        if (distance < influence) {
          const factor = (1 - distance / influence) * mouseInfluence;
          targetX += dx * factor;
          targetY += dy * factor;
        }
      }

      // Smoother interpolation for more responsive feel
      orb.x = lerp(orb.x || targetX, targetX, 0.08); // Increased from 0.05 for snappier response
      orb.y = lerp(orb.y || targetY, targetY, 0.08);

      // Draw the orb
      drawOrb(ctx, orb);
    });

    // Reset composite operation
    ctx.globalCompositeOperation = 'source-over';

    // Continue animation
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [drawOrb, mouseInfluence, lerp]);

  // Initialize on mount
  useEffect(() => {
    resizeCanvas();
    
    // Start animation
    animate();

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [resizeCanvas, animate]);

  // Handle window resize
  useEffect(() => {
    let resizeObserver;

    if ('ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(resizeCanvas);
      const canvas = canvasRef.current;
      if (canvas && canvas.parentElement) {
        resizeObserver.observe(canvas.parentElement);
      }
    } else {
      window.addEventListener('resize', resizeCanvas);
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener('resize', resizeCanvas);
      }
    };
  }, [resizeCanvas]);

  // Track mouse position with optimized throttling
  useEffect(() => {
    let lastUpdate = 0;
    const throttleMs = 20; // Reduced from 32ms for more responsive tracking (~50fps)

    const handleMouseMove = (e) => {
      const now = performance.now();
      if (now - lastUpdate < throttleMs) return;
      lastUpdate = now;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none', // Allow clicks to pass through
        zIndex: 1, // Above gradient background, below content
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          mixBlendMode: 'normal',
        }}
      />
    </Box>
  );
};

export default AnimatedMeshBackground;
