/**
 * Parallax Scroll Hooks
 * 
 * Scroll-linked motion effects using framer-motion. Compatible with motion/react patterns.
 * See docs/design-system/theme-system.md for usage guide and presets.
 * 
 * @example
 * const ref = useRef(null);
 * const { scrollYProgress } = useScroll({ target: ref });
 * const y = useParallax(scrollYProgress, parallaxPresets.medium);
 * return <motion.div ref={ref} style={{ y }}>Content</motion.div>;
 */

import { useTransform, useScroll, useSpring } from 'framer-motion';

/**
 * Creates a parallax effect by transforming scroll progress into motion value
 * 
 * @param {MotionValue<number>} value - The scroll progress value (0-1)
 * @param {number} distance - The distance (in pixels) the element should move
 * @returns {MotionValue<number>} - The transformed Y position value
 */
export function useParallax(value, distance) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

/**
 * Creates a spring-based parallax effect for smoother motion
 * 
 * @param {MotionValue<number>} value - The scroll progress value (0-1)
 * @param {number} distance - The distance (in pixels) the element should move
 * @param {object} springConfig - Spring configuration options
 * @returns {MotionValue<number>} - The spring-smoothed Y position value
 */
export function useSpringParallax(value, distance, springConfig = {}) {
  const y = useTransform(value, [0, 1], [-distance, distance]);
  return useSpring(y, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
    ...springConfig
  });
}

/**
 * Hook for creating scroll progress with spring physics
 * Useful for smooth scroll indicators or progress bars
 * 
 * @param {object} springConfig - Spring configuration options
 * @returns {object} - { scrollYProgress, scaleX, scaleY }
 */
export function useScrollProgress(springConfig = {}) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
    ...springConfig
  });
  
  return { scrollYProgress, scaleX, scaleY: scaleX };
}

/**
 * Hook for element-based parallax with automatic scroll tracking
 * Simplifies the common pattern of tracking an element's scroll progress
 * 
 * @param {RefObject} ref - React ref to the target element
 * @param {number} distance - Parallax distance in pixels
 * @param {object} options - Additional options
 * @returns {object} - { y, scrollYProgress, ref }
 */
export function useElementParallax(ref, distance, options = {}) {
  const { offset = ["start end", "end start"], ...scrollOptions } = options;
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
    ...scrollOptions
  });
  
  const y = useParallax(scrollYProgress, distance);
  
  return { y, scrollYProgress, ref };
}

/**
 * Hook for multi-layer parallax effects
 * Creates multiple parallax values at different speeds for depth
 * 
 * @param {MotionValue<number>} scrollYProgress - Scroll progress value
 * @param {array} layers - Array of distances for each layer (e.g., [100, 200, 300])
 * @returns {array} - Array of motion values for each layer
 */
export function useMultiLayerParallax(scrollYProgress, layers = [100, 200, 300]) {
  // Create all parallax transforms at once to avoid hook call in callback
  const layer1 = useTransform(scrollYProgress, [0, 1], [-layers[0], layers[0]]);
  const layer2 = useTransform(scrollYProgress, [0, 1], [-layers[1], layers[1]]);
  const layer3 = useTransform(scrollYProgress, [0, 1], [-layers[2], layers[2]]);
  
  const result = [layer1, layer2, layer3];
  return result.slice(0, layers.length);
}

/**
 * Preset parallax configurations
 */
export const parallaxPresets = {
  subtle: 50,
  medium: 150,
  strong: 300,
  extreme: 500
};

export default useParallax;
