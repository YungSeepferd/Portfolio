/**
 * UI Configuration Data
 * 
 * Contains static configuration values for UI components.
 */

// Category filters for work section
export const workCategories = [
  { value: 'all', label: 'All Projects' },
  { value: 'uxResearch', label: 'UX Research' },
  { value: 'interaction', label: 'Interaction Design' },
  { value: 'haptics', label: 'Haptic Design' },
  { value: 'prototyping', label: 'Prototyping' },
];

// Section configuration for scroll navigation
export const sectionConfig = {
  home: { id: 'home', label: 'Home' },
  about: { id: 'about', label: 'About' },
  work: { id: 'work', label: 'Work' },
  contact: { id: 'contact', label: 'Contact' }
};
