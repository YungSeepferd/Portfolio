/**
 * UI Configuration for Work Section
 * 
 * Defines configuration settings for the UI components in the Work section
 * including section layout options and work category definitions.
 */

// Define section configuration for project display
export const sectionConfig = {
  // Layout settings for different project sections
  layout: {
    default: {
      spacing: 4,
      columns: {
        xs: 12,
        sm: 6,
        md: 4
      }
    },
    featured: {
      spacing: 5,
      columns: {
        xs: 12,
        sm: 12,
        md: 6
      }
    }
  },
  
  // Animation settings for project sections
  animation: {
    staggerDelay: 0.2,
    duration: 0.6
  }
};

// Define work categories for filtering
export const workCategories = [
  { id: 'All', label: 'All Projects' },
  { id: 'UX Research', label: 'UX Research' },
  { id: 'UI/UX Design', label: 'UI/UX Design' },
  { id: 'Haptic Design', label: 'Haptic Design' },
  { id: 'Sound Design', label: 'Sound Design' },
  { id: 'Prototyping', label: 'Prototyping' },
  { id: 'Mobile App', label: 'Mobile Apps' },
  { id: 'Sustainability', label: 'Sustainability' }
];

// Default exports
export default { sectionConfig, workCategories };
