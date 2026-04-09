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
  const stickyTop = React.useMemo(() => {
    const toolbarHeight = theme.mixins?.toolbar?.minHeight;
    if (typeof toolbarHeight === 'number') {
      return toolbarHeight;
    }
    if (toolbarHeight && typeof toolbarHeight === 'object') {
      const values = Object.values(toolbarHeight).filter(Boolean);
      if (values.length) {
        return values[0];
      }
    }
    return theme.spacing(8);
  }, [theme]);
  
  return (
    <Box 
      id="about-tab-navigation-root"
      sx={{ 
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
        position: 'sticky',
        top: stickyTop,
        zIndex: (theme.zIndex?.appBar ?? 1100) - 1,
        backdropFilter: 'blur(6px)',
        boxShadow: theme.shadows[1],
      }}
    >
      <Container 
        id="about-tab-navigation-container"
        maxWidth={false} 
        disableGutters
        sx={{ 
          px: { 
            xs: theme.spacing(2),  // Use theme spacing instead of hardcoded px
            sm: theme.spacing(4),
            md: theme.spacing(6),
          },
          width: '100%',
          display: 'flex',
          justifyContent: 'center', // Center the tabs container
        }}
      >
        <Box
          id="about-tab-navigation-tabsbox"
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
                backgroundColor: 'transparent',
                '&.Mui-selected': {
                  color: theme.palette.primary.main,
                  backgroundColor: 'rgba(150, 132, 69, 0.05)', // 5% of primary.main (#968445)
                },
                '&.Mui-selected:hover': {
                  backgroundColor: 'rgba(150, 132, 69, 0.1)', // 10% of primary.main - darker on hover
                },
                '&:hover': {
                  color: theme.palette.primary.main,
                  backgroundColor: 'rgba(150, 132, 69, 0.05)', // 5% of primary.main
                },
                transition: 'color 0.3s ease, background-color 0.3s ease',
                flex: { xs: 'none', md: 1 }, // Don't use flex on mobile
                maxWidth: { xs: 'none', md: 'none' }, // Remove max width constraint
                whiteSpace: 'nowrap', // Prevent text wrapping
              },
              '& .MuiTabs-indicator': {
                backgroundColor: theme.palette.primary.main,
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
