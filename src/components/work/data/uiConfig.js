/**
 * UI Configuration Data
 * 
 * Contains static configuration values for UI components.
 */

// Define categories for filtering projects
export const workCategories = [
  { label: 'All Projects', value: 'all' },
  { label: 'UX Design', value: 'UX Design' },
  { label: 'UX Research', value: 'UX Research' },
  { label: 'Haptic Design', value: 'Haptic Design' },
  { label: 'AI Integration', value: 'AI Integration' },
  // Add other relevant categories based on your projects
];

// Section configuration for scroll navigation
export const sectionConfig = {
  home: { id: 'home', label: 'Home' },
  about: { id: 'about', label: 'About' },
  work: { id: 'work', label: 'Work' },
  contact: { id: 'contact', label: 'Contact' }
};
