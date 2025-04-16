import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for handling tab navigation in the About section
 * 
 * @param {Object} options - Hook options
 * @param {number} options.initialSection - Initial active section
 * @param {number} options.totalSections - Total number of sections
 * @param {Function} options.onSectionChange - Callback when section changes
 * @param {number} options.scrollTimeout - Timeout for scroll events
 * @returns {Object} Hook state and methods
 */
export const useTabNavigation = ({
  initialSection = 0,
  totalSections,
  onSectionChange,
  scrollTimeout = 200
}) => {
  const [tabIndex, setTabIndex] = useState(initialSection);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef(null);
  const scrollRef = useRef(null);

  // Handle scrolling events
  const handleScroll = useCallback(() => {
    setIsScrolling(true);

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
      scrollTimeoutRef.current = null;
    }, scrollTimeout);
  }, [scrollTimeout]);

  // Handle tab change
  const handleTabChange = useCallback((event, newValue) => {
    if (tabIndex === newValue) return;
    
    setIsScrolling(true);
    setTabIndex(newValue);

    scrollRef.current?.scrollTo({
      top: newValue * scrollRef.current.offsetHeight,
      behavior: 'smooth',
    });

    setTimeout(() => {
      setIsScrolling(false);
    }, 500);
  }, [tabIndex]);

  // Scroll to a specific section
  const scrollToSection = useCallback((sectionIndex) => {
    if (sectionIndex >= 0 && sectionIndex < totalSections) {
      setIsScrolling(true);
      setTabIndex(sectionIndex);

      scrollRef.current?.scrollTo({
        top: sectionIndex * scrollRef.current.offsetHeight,
        behavior: 'smooth',
      });

      setTimeout(() => {
        setIsScrolling(false);
      }, 500);
    }
  }, [totalSections]);

  // Add scroll event listener
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
      
      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }
  }, [handleScroll]);

  // Notify parent component when section changes
  useEffect(() => {
    if (!isScrolling && onSectionChange) {
      onSectionChange(tabIndex);
    }
  }, [tabIndex, isScrolling, onSectionChange]);

  return {
    tabIndex,
    isScrolling,
    scrollRef,
    handleTabChange,
    scrollToSection,
    setTabIndex
  };
};

/**
 * Custom hook for handling image slideshows in the About section
 * 
 * @param {Object} options - Hook options
 * @param {Array} options.images - Array of image URLs
 * @param {string} options.fallbackImage - Fallback image URL
 * @param {number} options.slideshowTimeout - Timeout between slides
 * @returns {Object} Hook state and methods
 */
export const useImageSlideshow = ({
  images = [],
  fallbackImage = 'https://via.placeholder.com/300',
  slideshowTimeout = 5000
}) => {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});
  
  // Determine images to use
  const slideImages = images && images.length > 0 ? images : [fallbackImage];

  // Handle image load completion
  const handleImageLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  // Move to next image after timeout
  useEffect(() => {
    // If image is already in cache, mark as loaded
    if (loadedImages[slideImages[current]]) {
      setLoaded(true);
    } else {
      setLoaded(false);
    }

    const timer = setTimeout(() => {
      // Mark current image as loaded
      setLoadedImages(prev => ({
        ...prev,
        [slideImages[current]]: true
      }));
      
      // Move to next image
      setCurrent(prev => (prev + 1) % slideImages.length);
    }, slideshowTimeout);

    return () => clearTimeout(timer);
  }, [current, slideImages, slideshowTimeout, loadedImages]);

  // Go to specific slide
  const goToSlide = useCallback((index) => {
    if (index >= 0 && index < slideImages.length) {
      setCurrent(index);
    }
  }, [slideImages.length]);

  return {
    current,
    loaded,
    slideImages,
    handleImageLoad,
    goToSlide
  };
};
