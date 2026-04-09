import { useState, useEffect } from 'react';

/**
 * Custom hook to track which section is currently active based on scroll position
 * Uses IntersectionObserver for performance-optimized scroll tracking
 * 
 * @param {Array<string>} sectionIds - Array of section IDs to track
 * @param {number} threshold - Visibility threshold (0-1), default 0.5
 * @param {number} rootMargin - Root margin for IntersectionObserver, default '-20% 0px -35% 0px'
 * @returns {string|null} - Currently active section ID
 */
const useActiveSection = (sectionIds = [], threshold = 0.5, rootMargin = '-20% 0px -35% 0px') => {
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    // Don't run if no sections to track
    if (!sectionIds || sectionIds.length === 0) {
      return;
    }

    const observerOptions = {
      root: null, // viewport
      rootMargin, // Adjust detection zone
      threshold, // How much of the element must be visible
    };

    // Map to track all section visibility
    const visibilityMap = new Map();

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        visibilityMap.set(entry.target.id, entry.isIntersecting);
      });

      // Find the first visible section (top to bottom)
      const visibleSection = sectionIds.find((id) => visibilityMap.get(id));
      
      if (visibleSection) {
        setActiveSection(visibleSection);
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
        // Initialize visibility map
        visibilityMap.set(id, false);
      }
    });

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, [sectionIds, threshold, rootMargin]);

  return activeSection;
};

export default useActiveSection;
