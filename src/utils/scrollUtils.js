/**
 * Utility functions for scrolling behavior in the application
 */

/**
 * Scrolls to a specific section on the page by ID
 * with smooth scrolling behavior
 * 
 * @param {string} sectionId - The ID of the section to scroll to
 * @param {Object} options - Optional scroll configuration
 * @param {number} options.offset - Offset from the top in pixels
 */
export const scrollToSection = (sectionId, options = {}) => {
  // Default options
  const { offset = -70 } = options;
  // Remove unused duration parameter
  
  try {
    const targetElement = document.getElementById(sectionId);
    if (!targetElement) {
      console.warn(`Section with ID "${sectionId}" not found`);
      return;
    }
    
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset + offset;
    
    // Use scrollTo with behavior: smooth for modern browsers
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
    
    // Track scroll events in analytics if available
    if (window.gtag) {
      window.gtag('event', 'scroll_to_section', {
        section_id: sectionId
      });
    }
  } catch (error) {
    console.error('Error scrolling to section:', error);
  }
};

/**
 * Checks if an element is in the viewport
 * 
 * @param {HTMLElement} element - The element to check
 * @param {number} offset - Optional offset to consider
 * @returns {boolean} - Whether the element is in viewport
 */
export const isInViewport = (element, offset = 0) => {
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  return (
    rect.top + offset < window.innerHeight && 
    rect.bottom > 0
  );
};

// Fix anonymous default export
const scrollUtils = {
  scrollToSection,
  isInViewport
};

export default scrollUtils;
