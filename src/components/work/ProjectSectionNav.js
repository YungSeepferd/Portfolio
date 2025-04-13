import React from 'react';
import { Box, Tabs, Tab, useTheme, useMediaQuery } from '@mui/material';
import { scrollToSection } from '../../utils/scrollUtils'; // Import scrollToSection

/**
 * ProjectSectionNav Component
 *
 * Provides tab-based navigation for scrolling between sections within the project modal.
 */
const ProjectSectionNav = ({ sections = [], sx = {} }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [value, setValue] = React.useState(0); // Keep track of active tab

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const sectionId = sections[newValue]?.id;
    if (sectionId) {
      // Find the scrollable container (likely the Box inside the Modal in ModalContext)
      const scrollContainer = document.querySelector('.MuiModal-root > .MuiBox-root > .MuiBox-root[style*="overflow-y: auto"]');
      if (scrollContainer) {
        scrollToSection(sectionId, { // Use scrollToSection
          container: scrollContainer, // Specify the scroll container
          duration: 500,
          offset: -80, // Adjust offset for fixed headers/navbars if needed
        });
      } else {
         console.warn("Scroll container not found for ProjectSectionNav");
         // Fallback to document scrolling if container not found
         scrollToSection(sectionId, { duration: 500, offset: -80 }); // Use scrollToSection
      }
    }
  };

  if (sections.length <= 1) {
    return null; // Don't render navigation for one or zero sections
  }

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', ...sx }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant={isMobile ? "scrollable" : "standard"}
        scrollButtons="auto"
        allowScrollButtonsMobile
        aria-label="Project section navigation"
        sx={{
           minHeight: '48px', // Ensure consistent height
           '& .MuiTab-root': {
              minWidth: 0, // Allow tabs to shrink
              px: { xs: 1.5, sm: 2 },
              fontSize: '0.875rem',
           }
        }}
      >
        {sections.map((section, index) => (
          <Tab key={section.id || index} label={section.title} id={`section-tab-${index}`} aria-controls={`section-panel-${index}`} />
        ))}
      </Tabs>
    </Box>
  );
};

export default ProjectSectionNav;
