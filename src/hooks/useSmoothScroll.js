import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

/**
 * Custom hook for smooth scrolling between sections with intersection observer
 * Properly tracks which section is currently in view
 */
export function useSmoothScroll(sectionCount, options = {}) {
  const { threshold = 0.5, onChange } = options;
  const [activeSection, setActiveSection] = useState(0);
  
  // Create refs array for all sections
  const sectionRefs = useRef(
    Array(sectionCount).fill().map(() => ({ 
      ref: null,
      inView: false 
    }))
  );
  
  // Initialize refs if they haven't been created yet
  useEffect(() => {
    sectionRefs.current = sectionRefs.current.map(section => ({
      ...section,
      ref: section.ref || React.createRef()
    }));
  }, [sectionCount]);
  
  // Setup intersection observers for each section
  useEffect(() => {
    // Create and configure intersection observers
    const observers = [];
    
    sectionRefs.current.forEach((section, index) => {
      if (!section.ref?.current) return;
      
      const observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          const isInView = entry.isIntersecting;
          
          // Update the inView status for this section
          sectionRefs.current[index].inView = isInView;
          
          // If section comes into view, update active section
          if (isInView && index !== activeSection) {
            setActiveSection(index);
            if (onChange) onChange(index);
          }
        },
        { threshold }
      );
      
      // Start observing
      observer.observe(section.ref.current);
      observers.push(observer);
    });
    
    // Cleanup observers on unmount
    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [sectionCount, threshold, activeSection, onChange]);
  
  // Function to smoothly scroll to a section
  const scrollToSection = (index) => {
    if (index >= 0 && index < sectionCount && sectionRefs.current[index]?.ref?.current) {
      sectionRefs.current[index].ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      setActiveSection(index);
      if (onChange) onChange(index);
    }
  };
  
  return {
    activeSection,
    scrollToSection,
    sectionRefs,
  };
}
