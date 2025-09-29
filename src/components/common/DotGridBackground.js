import { useRef, useEffect, useCallback, useMemo } from 'react';
import { Box, useTheme } from '@mui/material';

/**
 * DotGridBackground
 * 
 * Interactive canvas-based dot grid background that responds to mouse proximity.
 * Adapted from React Bits dot-grid pattern, simplified to avoid GSAP dependency.
 * 
 * Design system compliant:
 * - Uses theme.palette.secondary colors
 * - All styling via sx prop
 * - Responsive with ResizeObserver
 * 
 * Features:
 * - Proximity-based color interpolation (dots brighten near cursor)
 * - Canvas rendering for performance
 * - Theme-aware (adapts to light/dark mode)
 * 
 * Removed from React Bits example:
 * - GSAP InertiaPlugin (physics-based momentum)
 * - Speed-based shock waves
 * - Elastic bounce animations
 * 
 * @param {number} dotSize - Diameter of each dot in pixels
 * @param {number} gap - Space between dots in pixels
 * @param {number} proximity - Distance in pixels for color activation
 */
const DotGridBackground = ({ 
  dotSize = 16, 
  gap = 32, 
  proximity = 150 
}) => {
  const theme = useTheme();
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const dotsRef = useRef([]);
  const pointerRef = useRef({ x: 0, y: 0 });

  // Get theme colors
  const baseColor = theme.palette.secondary.dark;
  const activeColor = theme.palette.secondary.light;

  // Convert hex to RGB for interpolation
  const hexToRgb = useCallback((hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  }, []);

  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor, hexToRgb]);
  const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor, hexToRgb]);

  // Create circle path for efficient drawing
  const circlePath = useMemo(() => {
    if (typeof window === 'undefined' || !window.Path2D) return null;
    const path = new window.Path2D();
    path.arc(0, 0, dotSize / 2, 0, Math.PI * 2);
    return path;
  }, [dotSize]);

  // Build dot grid based on container size
  const buildGrid = useCallback(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    const { width, height } = wrapper.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    // Set canvas size with device pixel ratio
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(dpr, dpr);

    // Calculate grid dimensions
    const cols = Math.floor((width + gap) / (dotSize + gap));
    const rows = Math.floor((height + gap) / (dotSize + gap));
    const cellSize = dotSize + gap;

    const gridWidth = cellSize * cols - gap;
    const gridHeight = cellSize * rows - gap;

    // Center the grid
    const startX = (width - gridWidth) / 2 + dotSize / 2;
    const startY = (height - gridHeight) / 2 + dotSize / 2;

    // Create dot array
    const dots = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        dots.push({
          cx: startX + col * cellSize,
          cy: startY + row * cellSize
        });
      }
    }
    dotsRef.current = dots;
  }, [dotSize, gap]);

  // Draw loop with proximity-based color interpolation
  useEffect(() => {
    if (!circlePath) return;

    let animationFrameId;
    const proximitySquared = proximity * proximity;

    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { x: pointerX, y: pointerY } = pointerRef.current;

      for (const dot of dotsRef.current) {
        const dx = dot.cx - pointerX;
        const dy = dot.cy - pointerY;
        const distanceSquared = dx * dx + dy * dy;

        let fillColor = baseColor;

        // Interpolate color based on proximity
        if (distanceSquared <= proximitySquared) {
          const distance = Math.sqrt(distanceSquared);
          const t = 1 - distance / proximity; // 0 = far, 1 = close
          
          const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t);
          const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t);
          const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t);
          
          fillColor = `rgb(${r},${g},${b})`;
        }

        ctx.save();
        ctx.translate(dot.cx, dot.cy);
        ctx.fillStyle = fillColor;
        ctx.fill(circlePath);
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [proximity, baseColor, activeColor, baseRgb, activeRgb, circlePath]);

  // Initialize grid and handle resize
  useEffect(() => {
    buildGrid();

    let resizeObserver;
    if ('ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(buildGrid);
      if (wrapperRef.current) {
        resizeObserver.observe(wrapperRef.current);
      }
    } else {
      window.addEventListener('resize', buildGrid);
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener('resize', buildGrid);
      }
    };
  }, [buildGrid]);

  // Track mouse position with throttling
  useEffect(() => {
    let lastUpdate = 0;
    const throttleMs = 16; // ~60fps

    const handleMouseMove = (e) => {
      const now = performance.now();
      if (now - lastUpdate < throttleMs) return;
      lastUpdate = now;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      pointerRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <Box
      ref={wrapperRef}
      sx={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none', // Allow clicks to pass through to content
        zIndex: 0, // Behind content (content should have zIndex: 2)
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
        }}
      />
    </Box>
  );
};

export default DotGridBackground;
