import React from 'react';
import PropTypes from 'prop-types';
import { Box, Tabs, Tab, useTheme, useMediaQuery } from '@mui/material';
import { Link as ScrollLink } from 'react-scroll'; // Use react-scroll for smooth scrolling

/**
 * ProjectSectionNav Component
 *
 * Navigation tabs for project sections that matches the visual style
 * of the AboutTabNavigation component for consistency. Scrolls to sections within the modal.
 */
const ProjectSectionNav = ({ sections = [], currentSectionId, onSectionChange, scrollContainerId }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Find the index of the currently active section based on its ID
  const currentTabIndex = sections.findIndex(sec => sec.id === currentSectionId);

  const handleTabChange = (event, newValue) => {
    // The `newValue` from Tabs corresponds to the index
    if (newValue >= 0 && newValue < sections.length) {
      const sectionId = sections[newValue].id;
      onSectionChange(sectionId); // Pass the ID back up
    }
  };

  if (!sections || sections.length <= 1) {
    return null; // Don't render tabs if there's only one section or none
  }

  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
        position: 'sticky', // Make it sticky within the modal scroll container
        top: 0, // Stick to the top of the scroll container
        zIndex: theme.zIndex.appBar - 1, // Ensure it's below the main modal header/close button
        px: { xs: 1, sm: 2 }, // Reduced padding for modal context
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Tabs
        value={currentTabIndex >= 0 ? currentTabIndex : false} // Handle case where no section is active
        onChange={handleTabChange}
        variant={isMobile ? "scrollable" : "standard"}
        scrollButtons="auto"
        allowScrollButtonsMobile
        aria-label="Project section navigation"
        sx={{
          width: '100%',
          maxWidth: 'lg',
          '& .MuiTabs-flexContainer': {
            justifyContent: { xs: 'flex-start', md: 'center' }, // Center tabs on desktop
          },
          '& .MuiTab-root': {
            px: { xs: 1.5, md: 2 }, // Slightly smaller padding
            py: 1,
            fontSize: { xs: '0.8rem', md: '0.9rem' }, // Smaller font size
            fontWeight: 500,
            color: theme.palette.text.secondary,
            minWidth: 'auto',
            textTransform: 'none', // Keep section titles as they are
            '&.Mui-selected': { color: theme.palette.primary.main },
            '&:hover': { color: theme.palette.secondary.main },
            transition: 'color 0.3s ease',
            whiteSpace: 'nowrap',
          },
          '& .MuiTabs-indicator': {
            backgroundColor: theme.palette.primary.main,
            height: 2,
            transition: 'all 0.3s ease',
          },
        }}
      >
        {sections.map((section, index) => (
          <Tab
            key={section.id || index}
            label={section.title || `Section ${index + 1}`}
            aria-controls={`project-section-panel-${section.id}`}
            id={`project-section-tab-${section.id}`}
            // Use ScrollLink for smooth scrolling *within* the modal content
            component={ScrollLink}
            to={section.id} // Target the ID of the section container
            spy={true} // Let react-scroll manage active state (optional, handled by currentTabIndex)
            smooth={true}
            duration={500}
            containerId={scrollContainerId} // IMPORTANT: Specify the scrollable container ID
            offset={-80} // Adjust offset for the sticky header height + some padding
            onClick={(e) => {
              // Prevent Tabs' default onChange while allowing ScrollLink to work
              e.preventDefault();
              handleTabChange(e, index); // Manually trigger state update
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
};

ProjectSectionNav.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    // other section properties...
  })).isRequired,
  currentSectionId: PropTypes.string, // ID of the currently visible section
  onSectionChange: PropTypes.func.isRequired, // Callback when a tab is clicked
  scrollContainerId: PropTypes.string.isRequired, // ID of the scrollable container in the modal
};

export default ProjectSectionNav;
