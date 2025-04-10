import React from 'react';
import { Box, Tabs, Tab, useTheme, Container } from '@mui/material';
import PropTypes from 'prop-types';

/**
 * ProjectSectionNav Component
 * 
 * Navigation tabs for project sections that matches the visual style
 * of the AboutTabNavigation component for consistency.
 */
const ProjectSectionNav = ({ sections, currentSection, onSectionChange }) => {
  const theme = useTheme();
  
  return (
    <Box 
      sx={{ 
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
        position: 'relative',
        zIndex: 2,
      }}
    >
      <Container 
        maxWidth="lg" 
        disableGutters
        sx={{ 
          px: { xs: 2, sm: 3, md: 5 }, 
          width: '100%',
          display: 'flex',
          justifyContent: 'center', 
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <Tabs
            value={currentSection}
            onChange={(e, newValue) => onSectionChange(newValue)}
            variant="fullWidth" 
            aria-label="Project sections"
            sx={{
              mb: 0,
              width: '100%',
              '& .MuiTabs-flexContainer': {
                width: '100%',
                justifyContent: 'space-between',
              },
              '& .MuiTab-root': {
                px: 3,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 500,
                color: theme.palette.text.secondary,
                '&.Mui-selected': {
                  color: theme.palette.primary.main,
                },
                '&:hover': {
                  color: theme.palette.secondary.main,
                },
                transition: 'color 0.3s ease',
                flex: 1,
                maxWidth: 'none',
              },
              '& .MuiTabs-indicator': {
                backgroundColor: theme.palette.primary.main, // UPDATED: Match selected tab color
                height: 3,
                transition: 'all 0.3s ease',
              },
              '& .MuiTabs-scroller': {
                width: '100%',
                overflow: 'hidden !important',
              }
            }}
          >
            {sections.map((section, index) => (
              <Tab 
                key={index} 
                label={section.title || `Section ${index + 1}`} 
                aria-controls={`project-section-${index}`}
                id={`project-tab-${index}`}
              />
            ))}
          </Tabs>
        </Box>
      </Container>
    </Box>
  );
};

ProjectSectionNav.propTypes = {
  sections: PropTypes.array.isRequired,
  currentSection: PropTypes.number.isRequired,
  onSectionChange: PropTypes.func.isRequired,
};

export default ProjectSectionNav;
