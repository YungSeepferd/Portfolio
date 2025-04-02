import { useEffect, useState } from 'react';

/**
 * Custom hook for lazy loading elements using Intersection Observer
 * @param {React.RefObject} ref - Reference to the element to observe
 * @param {Object} options - IntersectionObserver options
 * @returns {boolean} - True if element is in viewport
 */
function useIntersectionObserver(ref, options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  
  useEffect(() => {
    if (!ref.current) return;
    
    const observerOptions = {
      root: null,
      rootMargin: '200px', // Increase the margin to load images earlier
      threshold: 0.01, // Lower threshold so images load with minimal visibility
      ...options,
    };
    
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, observerOptions);
    
    observer.observe(ref.current);
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);
  
  return isIntersecting;
}

export default useIntersectionObserver;
