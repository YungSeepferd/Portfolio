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
const useScrollSpy = ({ sectionCount, threshold, rootMargin = '-20% 0px -20% 0px', scrollOffset = 0 }) => {
  // Initialize to null to indicate "not yet determined" state
  const [activeSection, setActiveSection] = useState(null);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [containerMounted, setContainerMounted] = useState(false);
  const sectionRefs = useRef([]);
  const observerRef = useRef(null);
  const containerRef = useRef(null);
  const initialDetectionRef = useRef(false);
  // Jitter control: require margin and cooldown between switches
  const lastUpdateRef = useRef(0);
  const SWITCH_MARGIN = 0.08; // require 8% score advantage to switch
  const MIN_SWITCH_INTERVAL_MS = 200; // debounce rapid toggles

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

  // Detect initial section on mount
  useEffect(() => {
    if (!containerRef.current || initialDetectionRef.current || activeSection !== null) {
      return;
    }

    // Check scroll position to determine initial section
    const container = containerRef.current;
    const scrollTop = container.scrollTop;
    
    // If at or near top (within 100px), activate first section
    if (scrollTop < 100) {
      setActiveSection(0);
      initialDetectionRef.current = true;
    }
  }, [containerMounted, activeSection]);

  // Setup IntersectionObserver
  useEffect(() => {
    if (typeof window === 'undefined' || !window.IntersectionObserver) {
      // Fallback: set first section as active
      if (activeSection === null) {
        setActiveSection(0);
      }
      return;
    }

    // Wait for container to be mounted before creating observer
    if (!containerRef.current) {
      return;
    }

    // Calculate rootMargin accounting for scroll offset
    // More generous detection zone for reliable section detection
    const topOffset = scrollOffset > 0 ? -(scrollOffset + 10) : -10; // Reduced buffer for better first-tab detection
    // Detection zone: middle 70% of viewport (15% from top, 15% from bottom) - more generous
    const calculatedRootMargin = `${topOffset}px 0px -15% 0px`;
    // Build thresholds: use provided array, otherwise a granular default for smoother updates
    const thresholds = Array.isArray(threshold)
      ? threshold
      : [
          0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45,
          0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1,
        ];
    
    const observer = new IntersectionObserver(
      (entries) => {
        // Process all entries to find the best candidate
        const visibleSections = [];

        entries.forEach((entry) => {
          const index = sectionRefs.current.findIndex(
            (ref) => ref === entry.target
          );
          
          if (index !== -1 && entry.isIntersecting) {
            // Calculate visibility score based on intersection ratio and position
            const rect = entry.boundingClientRect;
            const container = containerRef.current;
            const containerRect = container.getBoundingClientRect();
            
            // Distance from center of viewport (lower is better)
            const elementCenter = rect.top + rect.height / 2;
            const viewportCenter = containerRect.top + containerRect.height / 2;
            const distanceFromCenter = Math.abs(elementCenter - viewportCenter);
            
            // Combined score: intersection ratio + proximity to center
            const proximityScore = 1 - (distanceFromCenter / containerRect.height);
            const visibilityScore = entry.intersectionRatio * 0.6 + proximityScore * 0.4;
            
            visibleSections.push({
              index,
              score: visibilityScore,
              ratio: entry.intersectionRatio
            });
          }
        });

        // Update active section to the one with highest combined score
        if (visibleSections.length > 0) {
          visibleSections.sort((a, b) => b.score - a.score);
          const bestSection = visibleSections[0];

          // Apply hysteresis and cooldown to reduce jitter
          const now = Date.now();
          const currentEntry = visibleSections.find(v => v.index === activeSection);
          const currentScore = currentEntry ? currentEntry.score : 0;

          if (activeSection === null) {
            setActiveSection(bestSection.index);
            initialDetectionRef.current = true;
            lastUpdateRef.current = now;
          } else if (activeSection !== bestSection.index) {
            const withinCooldown = now - lastUpdateRef.current < MIN_SWITCH_INTERVAL_MS;
            const hasMargin = bestSection.score >= currentScore + SWITCH_MARGIN;
            if (!withinCooldown && hasMargin) {
              setActiveSection(bestSection.index);
              initialDetectionRef.current = true;
              lastUpdateRef.current = now;
            }
          }
        } else if (activeSection === null) {
          // Fallback: if no sections are visible and we haven't set initial, set to 0
          setActiveSection(0);
          initialDetectionRef.current = true;
        }
      },
      {
        root: containerRef.current,
        rootMargin: calculatedRootMargin, // Account for sticky header + buffer
        // More granular thresholds for better detection across scroll positions
        threshold: thresholds,
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
  }, [sectionCount, scrollOffset, threshold, containerMounted, activeSection]);

  // Set ref for a specific section
  const setSectionRef = useCallback((index) => {
    return (element) => {
      const prevEl = sectionRefs.current[index];
      // Unobserve previous element if it existed and changed
      if (prevEl && prevEl !== element && observerRef.current) {
        try { observerRef.current.unobserve(prevEl); } catch (_) {}
      }

      if (element) {
        sectionRefs.current[index] = element;
        // Ensure the element is observed even if observer was created earlier
        if (observerRef.current) {
          try { observerRef.current.observe(element); } catch (_) {}
        }
      } else {
        // On unmount, clear ref
        sectionRefs.current[index] = null;
      }
    };
  }, []);

  // Watch for container ref availability after mount and trigger observer setup
  useEffect(() => {
    if (containerMounted) return;
    const id = window.requestAnimationFrame(() => {
      if (containerRef.current && !containerMounted) {
        setContainerMounted(true);
      }
    });
    return () => window.cancelAnimationFrame(id);
  }, [containerMounted]);

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
