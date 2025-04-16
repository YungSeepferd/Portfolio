import { useState, useEffect, useRef, useCallback } from 'react';
import useDebounce from './useDebounce';

/**
 * Custom hook for handling tab navigation in About section
 * 
 * Encapsulates tab navigation logic including scrolling,
 * animations, and section changes.
 * 
 * @param {Object} options Configuration options
 * @param {number} options.initialSection Initial active section
 * @param {number} options.sectionCount Total number of available sections
 * @param {Function} options.onSectionChange Callback when section changes
 * @param {number} options.scrollTimeout Timeout for scroll events
 * @returns {Object} Navigation state and handlers
 */
const useAboutNavigation = ({
  initialSection = 0,
  sectionCount,
  onSectionChange,
  scrollTimeout = 350,
}) => {
  // Tab state
  const [tabIndex, setTabIndex] = useState(initialSection);
  const [previousIndex, setPreviousIndex] = useState(initialSection);
  const [fadeIn, setFadeIn] = useState(true);
  
  // Ref for scrollable container
  const scrollRef = useRef(null);
  
  // State for managing scrolling and transitions
  const [isScrolling, setIsScrolling] = useState(false);
  const [isTabSwitching, setIsTabSwitching] = useState(false);

  // Use debouncing to prevent rapid state changes
  const debouncedTabIndex = useDebounce(tabIndex, 200);

  // Handle scrolling events within the container
  const handleScroll = useCallback(() => {
    if (isTabSwitching) return; // Don't handle scroll events during tab switching
    
    setIsScrolling(true);
    
    // Use a timeout to prevent bouncing
    setTimeout(() => {
      setIsScrolling(false);
    }, scrollTimeout);
  }, [isTabSwitching, scrollTimeout]);

  // Set up scroll event listener
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll);
      };
    }
  }, [handleScroll]);

  // Notify parent when tab changes (after debounce)
  useEffect(() => {
    if (!isScrolling && !isTabSwitching && onSectionChange) {
      onSectionChange(debouncedTabIndex);
    }
  }, [debouncedTabIndex, isScrolling, isTabSwitching, onSectionChange]);

  // Handle tab change from user clicking tab
  const handleTabChange = useCallback((event, newValue) => {
    if (tabIndex === newValue || isTabSwitching) return;
    
    setIsTabSwitching(true);
    setPreviousIndex(tabIndex);
    setTabIndex(newValue);

    // Fade out current content
    setFadeIn(false);

    // Wait for fade out before scrolling
    setTimeout(() => {
      scrollRef.current?.scrollTo({
        top: newValue * scrollRef.current.offsetHeight,
        behavior: 'smooth',
      });

      // Fade in new content after a short delay
      setTimeout(() => {
        setFadeIn(true);
        
        // Reset tab switching state after animation completes
        setTimeout(() => {
          setIsTabSwitching(false);
        }, 100);
      }, 300);
    }, 200);
  }, [tabIndex, isTabSwitching]);

  // Method to programmatically scroll to a section
  const scrollToSection = useCallback((sectionIndex) => {
    if (sectionIndex >= 0 && sectionIndex < sectionCount) {
      setIsTabSwitching(true);
      setPreviousIndex(tabIndex);
      setTabIndex(sectionIndex);

      // Fade out current content
      setFadeIn(false);

      // Wait for fade out before scrolling
      setTimeout(() => {
        scrollRef.current?.scrollTo({
          top: sectionIndex * scrollRef.current.offsetHeight,
          behavior: 'smooth',
        });

        // Fade in new content after a short delay
        setTimeout(() => {
          setFadeIn(true);
          
          // Reset scrolling state after animation completes
          setTimeout(() => {
            setIsTabSwitching(false);
          }, 100);
        }, 300);
      }, 200);
    }
  }, [tabIndex, sectionCount]);

  return {
    // State
    tabIndex,
    previousIndex,
    fadeIn,
    isScrolling,
    isTabSwitching,
    
    // Refs
    scrollRef,
    
    // Methods
    setTabIndex,
    handleTabChange,
    scrollToSection
  };
};

export default useAboutNavigation;
