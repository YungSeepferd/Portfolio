import { useEffect, useState, useRef, useCallback } from 'react';

/**
 * useScrollSpy Hook
 * 
 * Observes scroll position and determines which section is currently active
 * Uses IntersectionObserver for performance-optimized scroll detection
 * 
 * @param {Object} options Configuration options
 * @param {number} options.sectionCount - Total number of sections
 * @param {number} options.threshold - Intersection threshold (0-1), default 0.5
 * @param {string} options.rootMargin - Root margin for observer, default '0px'
 * @param {number} options.scrollOffset - Scroll offset in pixels (for sticky headers)
 * @returns {Object} { activeSection, sectionRefs, isAtBottom }
 */
const useScrollSpy = ({ sectionCount, threshold = 0.5, rootMargin = '-20% 0px -20% 0px', scrollOffset = 0 }) => {
  const [activeSection, setActiveSection] = useState(0);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const sectionRefs = useRef([]);
  const observerRef = useRef(null);
  const containerRef = useRef(null);

  // Initialize section refs array
  useEffect(() => {
    sectionRefs.current = sectionRefs.current.slice(0, sectionCount);
  }, [sectionCount]);

  // Check if scrolled to bottom of container
  const checkIfAtBottom = useCallback((container) => {
    if (!container) return false;
    const scrollHeight = container.scrollHeight;
    const scrollTop = container.scrollTop;
    const clientHeight = container.clientHeight;
    // Consider "at bottom" if within 50px of actual bottom
    const atBottom = scrollHeight - scrollTop - clientHeight < 50;
    setIsAtBottom(atBottom);
    return atBottom;
  }, []);

  // Setup IntersectionObserver
  useEffect(() => {
    if (typeof window === 'undefined' || !window.IntersectionObserver) {
      return;
    }

    // Calculate rootMargin accounting for scroll offset
    // Add moderate buffer (80px) below offset for balance between stability and responsiveness
    const topOffset = scrollOffset > 0 ? -(scrollOffset + 80) : 0;
    // Detection zone: top 45% of viewport
    const calculatedRootMargin = `${topOffset}px 0px -55% 0px`;
    
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the section that's most visible in the viewport
        let mostVisibleSection = null;
        let highestVisibility = 0;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Calculate how much of the section is visible
            const visibilityScore = entry.intersectionRatio;
            
            if (visibilityScore > highestVisibility) {
              highestVisibility = visibilityScore;
              mostVisibleSection = entry.target;
            }
          }
        });

        // If we found a visible section, update active section
        if (mostVisibleSection) {
          const index = sectionRefs.current.findIndex(
            (ref) => ref === mostVisibleSection
          );
          if (index !== -1) {
            setActiveSection(index);
          }
        }
      },
      {
        root: containerRef.current,
        rootMargin: calculatedRootMargin, // Account for sticky header + buffer
        threshold: threshold || [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1], // Configurable threshold
      }
    );

    observerRef.current = observer;

    // Observe all section refs
    sectionRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionCount, scrollOffset, threshold]);

  // Set ref for a specific section
  const setSectionRef = useCallback((index) => {
    return (element) => {
      if (element) {
        sectionRefs.current[index] = element;
      }
    };
  }, []);

  return {
    activeSection,
    setSectionRef,
    sectionRefs,
    containerRef,
    isAtBottom,
    checkIfAtBottom,
  };
};

export default useScrollSpy;
