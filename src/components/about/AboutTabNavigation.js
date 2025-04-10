import React from 'react';
import { Box, Container, Tabs, Tab, useTheme, useMediaQuery } from '@mui/material';

/**
 * AboutTabNavigation Component
 * 
 * Renders the tab navigation for the About section with smooth animations
 * and responsive design.
 * 
 * @component
 * @param {Object} props
 * @param {number} props.tabIndex - Current active tab index
 * @param {Function} props.handleTabChange - Tab change handler
 * @param {Array} props.tabItems - Array of tab items to display
 * @param {boolean} props.isTabSwitching - Whether tabs are currently switching
 * @returns {JSX.Element} Tab navigation component
 */
const AboutTabNavigation = ({ tabIndex, handleTabChange, tabItems, isTabSwitching }) => {
  const theme = useTheme();
  // Use useMediaQuery hook to determine screen size
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
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
        maxWidth={false} 
        disableGutters
        sx={{ 
          px: { 
            xs: '24px',  // Minimal padding for readability
            sm: '32px',
            md: '40px',
          },
          width: '100%',
          display: 'flex',
          justifyContent: 'center', // Center the tabs container
        }}
      >
        <Box
          sx={{
            width: '100%', // Take full width of the container
            display: 'flex',
            justifyContent: 'center', // Center the tabs
            overflow: 'hidden', // Prevent overflow
          }}
        >
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            variant={isMobile ? "scrollable" : "fullWidth"} // Use a string based on screen size
            scrollButtons="auto" // Show scroll buttons when needed
            allowScrollButtonsMobile // Important for mobile compatibility
            aria-label="About section tabs"
            sx={{
              mb: 0,
              width: '100%', // Take full width of parent
              '& .MuiTabs-flexContainer': {
                width: '100%', // Ensure flexContainer takes full width
                justifyContent: { xs: 'flex-start', md: 'space-between' }, // Left align on mobile
              },
              '& .MuiTab-root': {
                px: { xs: 2, md: 3 }, // Reduce padding on mobile
                py: 1.5,
                fontSize: { xs: '0.95rem', md: '1.1rem' }, // Smaller font size on mobile
                fontWeight: 500,
                color: theme.palette.text.secondary,
                minWidth: { xs: 'auto', md: 0 }, // Allow tabs to be narrower on mobile
                '&.Mui-selected': {
                  color: theme.palette.primary.main,
                },
                '&:hover': {
                  color: theme.palette.secondary.main,
                },
                transition: 'color 0.3s ease',
                flex: { xs: 'none', md: 1 }, // Don't use flex on mobile
                maxWidth: { xs: 'none', md: 'none' }, // Remove max width constraint
                whiteSpace: 'nowrap', // Prevent text wrapping
              },
              '& .MuiTabs-indicator': {
                backgroundColor: theme.palette.primary.main, // UPDATED: Match selected tab color
                height: 3,
                transition: 'all 0.3s ease',
              },
              // Override scrollable behavior to prevent extending past buttons
              '& .MuiTabs-scroller': {
                width: '100%',
                overflowX: 'auto', // Allow horizontal scrolling
              }
            }}
          >
            {tabItems.map((item, index) => (
              <Tab 
                key={index} 
                label={item.title}
                disabled={isTabSwitching}
                aria-controls={`about-tabpanel-${index}`}
                id={`about-tab-${index}`}
              />
            ))}
          </Tabs>
        </Box>
      </Container>
    </Box>
  );
};

export default React.memo(AboutTabNavigation);
