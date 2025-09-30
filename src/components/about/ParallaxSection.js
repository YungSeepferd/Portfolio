import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useSpringParallax } from '../../hooks/useParallax';
import { springPresets } from '../../theme/animations';

/**
 * ParallaxSection Component
 * 
 * Wrapper component for adding parallax effects to About section content.
 * Uses centralized parallax hooks for consistency across the app.
 * 
 * @param {React.ReactNode} children - Content to apply parallax to
 * @param {React.RefObject} containerRef - Scroll container ref
 * @param {number} intensity - Parallax distance multiplier (default: 1.0)
 * @param {boolean} enableReveal - Enable whileInView fade-in (default: true)
 * @param {object} springConfig - Spring physics config (default: smooth preset)
 */
const ParallaxSection = ({ 
  children, 
  containerRef, 
  intensity = 1.0,
  enableReveal = true,
  springConfig = springPresets.smooth
}) => {
  const targetRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  
  // Track scroll progress within container
  const { scrollYProgress } = useScroll({
    target: targetRef,
    container: containerRef,
    offset: ["start end", "end start"],
    // Avoid using layout effect so container ref can be provided from parent
    layoutEffect: false
  });
  
  // Apply parallax with spring smoothing
  const distance = 40 * intensity;
  const ySpring = useSpringParallax(scrollYProgress, distance, springConfig);
  // Subtle depth: add a very light scale effect across scroll
  const scaleTransform = useTransform(scrollYProgress, [0, 0.5, 1], [0.985, 1, 0.985]);
  // Micro tilt for visual interest
  const rotateXTransform = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 0, -0.6]);
  const y = prefersReducedMotion ? 0 : ySpring;
  const scale = prefersReducedMotion ? 1 : scaleTransform;
  
  // Fade animation based on scroll progress
  const opacityTransform = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.3, 1, 1, 0.3]
  );
  const opacity = prefersReducedMotion ? 1 : opacityTransform;
  const rotateX = prefersReducedMotion ? 0 : rotateXTransform;
  
  return (
    <motion.div
      ref={targetRef}
      style={{
        y,
        opacity,
        scale,
        rotateX,
        transformPerspective: 600,
        willChange: 'transform, opacity',
      }}
      initial={enableReveal && !prefersReducedMotion ? { opacity: 0, y: 20 } : false}
      whileInView={enableReveal && !prefersReducedMotion ? { opacity: 1, y: 0 } : undefined}
      viewport={{ 
        root: containerRef,
        once: false,
        // Use amount to control activation threshold instead of margin for predictability
        amount: 0.35
      }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0],
      }}
    >
      {children}
    </motion.div>
  );
};

export default ParallaxSection;
