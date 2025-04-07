import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * Custom hook for tracking when an element enters or exits the viewport
 * 
 * @param {Object} options
 * @param {number} options.threshold - Value between 0 and 1 indicating visibility percentage
 * @param {string} options.root - Element that is used as viewport for checking visibility
 * @param {string} options.rootMargin - Margin around the root element
 * @param {boolean} options.freezeOnceVisible - Stop observing after element becomes visible
 * @returns {Array} [ref, isVisible, entry] - Ref to attach, visibility state, and IntersectionObserverEntry
 */
function useIntersectionObserver({
  threshold = 0,
  root = null,
  rootMargin = '0px',
  freezeOnceVisible = false
} = {}) {
  const [entry, setEntry] = useState();
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [node, setNode] = useState(null);
  
  const frozen = isIntersecting && freezeOnceVisible;
  
  // Memoize the updateEntry function to ensure consistent reference
  const updateEntry = useCallback(([entry]) => {
    setIsIntersecting(entry.isIntersecting);
    setEntry(entry);
  }, []);
  
  // Setup the intersection observer
  useEffect(() => {
    // Don't observe if frozen or no node to observe
    if (frozen || !node) return;
    
    const observer = new IntersectionObserver(updateEntry, {
      threshold,
      root,
      rootMargin,
    });
    
    observer.observe(node);
    
    // Cleanup on unmount
    return () => observer.disconnect();
  }, [node, threshold, root, rootMargin, frozen, updateEntry]); // Added updateEntry dependency
  
  // Function to obtain the ref
  const ref = useCallback(node => {
    if (node) setNode(node);
  }, []);
  
  return [ref, !!entry?.isIntersecting, entry];
}

export default useIntersectionObserver;
