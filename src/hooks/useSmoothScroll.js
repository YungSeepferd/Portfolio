import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

export function useSmoothScroll(sectionCount, options = {}) {
  const { threshold = 0.5, onChange } = options;
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef([]);

  useEffect(() => {
    sectionRefs.current = Array(sectionCount).fill().map(() => ({
      ref: useInView({ threshold }),
      inView: false,
    }));
  }, [sectionCount, threshold]);

  useEffect(() => {
    const visibleSectionIndex = sectionRefs.current.findIndex(section => section.inView);
    if (visibleSectionIndex >= 0 && visibleSectionIndex !== activeSection) {
      setActiveSection(visibleSectionIndex);
      if (onChange) onChange(visibleSectionIndex);
    }
  }, [sectionRefs.current.map(section => section.inView), activeSection, onChange]);

  const scrollToSection = (index) => {
    if (index >= 0 && index < sectionCount && sectionRefs.current[index]?.ref?.current) {
      sectionRefs.current[index].ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      setActiveSection(index);
    }
  };

  return {
    activeSection,
    scrollToSection,
    sectionRefs,
  };
}
