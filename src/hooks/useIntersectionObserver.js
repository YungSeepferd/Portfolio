import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for intersection observer API with improved caching
 * @param {Object} options - IntersectionObserver options
 * @param {Boolean} freezeOnceVisible - If true, element stays "visible" even after leaving viewport
 * @returns {Array} [ref, isVisible, entry]
 */
const useIntersectionObserver = ({
  threshold = 0,
  root = null,
  rootMargin = '0px',
  freezeOnceVisible = true, // Default to true so that images stay loaded
} = {}) => {
  const [entry, setEntry] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);
  const frozen = useRef(false);

  const updateEntry = ([entry]) => {
    setEntry(entry);
    
    // If element has already been visible once and we're freezing, don't update state
    if (frozen.current && freezeOnceVisible) {
      return;
    }
    
    // Update visibility state
    const isCurrentlyVisible = entry?.isIntersecting;
    setIsVisible(isCurrentlyVisible);
    
    // If it's visible for the first time and we want to freeze, mark it
    if (isCurrentlyVisible && freezeOnceVisible) {
      frozen.current = true;
    }
  };

  useEffect(() => {
    const node = elementRef?.current;
    if (!node) return;
    
    const observerOptions = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(updateEntry, observerOptions);
    
    observer.observe(node);
    
    return () => {
      observer.disconnect();
    };
  }, [threshold, root, rootMargin, freezeOnceVisible]);

  return [elementRef, isVisible, entry];
};

export default useIntersectionObserver;
