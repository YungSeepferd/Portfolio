import React, { useState, useEffect, useCallback, useRef, forwardRef, useImperativeHandle, useMemo } from 'react';
import { Box, Fade, useTheme, useMediaQuery, Tabs, Tab } from '@mui/material'; // Removed unused Container
import AboutCard from './AboutCard';
import AboutTabContent from './AboutTabContent';
import useDebounce from '../../hooks/useDebounce';

// Constants for timeout durations
const SCROLL_TIMEOUT = 350;  // Increased from 200 for smoother transitions

/**
 * AboutTabNavigator Component
 * Updated to accept aboutData as a prop
 */
const AboutTabNavigator = forwardRef((props, ref) => {
  const { onSectionChange, currentSection = 0, aboutData = [] } = props;
  const [tabIndex, setTabIndex] = useState(currentSection);
  const [fadeIn, setFadeIn] = useState(true);
  const scrollRef = useRef(null);
  const theme = useTheme();
  const [isScrolling, setIsScrolling] = useState(false);
  const [isTabSwitching, setIsTabSwitching] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const stickyTop = useMemo(() => {
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
  
  // Use debouncing to prevent rapid state changes
  const debouncedTabIndex = useDebounce(tabIndex, 200);

  // Update local state when parent changes currentSection
  useEffect(() => {
    if (currentSection !== tabIndex && !isScrolling && !isTabSwitching) {
      setTabIndex(currentSection);
    }
  }, [currentSection, tabIndex, isScrolling, isTabSwitching]);

  // Handle scrolling events within the container
  const handleScroll = useCallback(() => {
    if (isTabSwitching) return; // Don't handle scroll events during tab switching
    
    setIsScrolling(true);
    
    // Use a timeout to prevent bouncing
    setTimeout(() => {
      setIsScrolling(false);
    }, SCROLL_TIMEOUT);
  }, [isTabSwitching]);

  // Set up scroll event listener
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll);
      };
    }
  }, [handleScroll]);

  // Expose scrollToSection method to parent components via ref
  useImperativeHandle(ref, () => ({
    scrollToSection: (sectionIndex) => {
      if (sectionIndex >= 0 && sectionIndex < aboutData.length) {
        setTabIndex(sectionIndex);
      }
    }
  }), [aboutData]);

  // Notify parent when tab changes (after debounce)
  useEffect(() => {
    if (!isScrolling && !isTabSwitching && onSectionChange) {
      onSectionChange(debouncedTabIndex);
    }
  }, [debouncedTabIndex, isScrolling, isTabSwitching, onSectionChange]);

  // Handle tab change from user clicking tab
  const handleTabChange = (event, newValue) => {
    if (tabIndex === newValue || isTabSwitching) return;
    
    setIsTabSwitching(true);
    setTabIndex(newValue);

    // If an external callback is provided, call it
    if (onSectionChange) {
      onSectionChange(newValue);
    }

    // Fade out current content
    setFadeIn(false);

    // Wait for fade out before scrolling
    setTimeout(() => {
      scrollRef.current?.scrollTo({
        top: newValue * scrollRef.current.offsetHeight,
        behavior: 'smooth',
      });

      // Fade in new content after a short delay
      setTimeout(() => {
        setFadeIn(true);
        
        // Reset tab switching state after animation completes
        setTimeout(() => {
          setIsTabSwitching(false);
        }, 100);
      }, 300);
    }, 200);
  };

  // Don't render if no data
  if (!aboutData || aboutData.length === 0) {
    return null;
  }

  return (
    <Box
      className="about-tabs-container"
      ref={scrollRef}
      id="about-tabs-container"
      sx={{
        width: '100%',
        overflowY: 'hidden',
        transition: 'transform 0.25s ease-out',
        scrollBehavior: 'smooth',
      }}
    >
      <Box
        className="about-tabs-section"
        id="about-tabs-section"
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          boxSizing: 'border-box',
          overflowY: 'hidden',
        }}
      >
        {/* MODIFIED: Tabs navigation - Use Box with direct control */}
        <Box 
          id="about-tabs-navigation"
          sx={{ 
            px: { 
              xs: theme.spacing(2),
              sm: theme.spacing(4),
              md: theme.spacing(6),
              lg: theme.spacing(8),
            },
            mb: 4,
            boxSizing: 'border-box',
            position: 'sticky',
            top: stickyTop,
            backgroundColor: theme.palette.background.default,
            backdropFilter: 'blur(6px)',
            borderBottom: `1px solid ${theme.palette.divider}`,
            boxShadow: isScrolling || isTabSwitching ? theme.shadows[2] : 'none',
            zIndex: 10
          }}
        >
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            variant={isMobile ? "scrollable" : "fullWidth"}
            scrollButtons={isMobile ? "auto" : false}
            allowScrollButtonsMobile
            textColor="primary"
            indicatorColor="primary"
            sx={{
              minHeight: 64,
              '& .MuiTabs-flexContainer': {
                gap: { xs: 1, sm: 2, md: 4 },
                justifyContent: 'space-around',
              },
              '& .MuiTab-root': {
                color: theme.palette.text.secondary,
                fontSize: { xs: '0.95rem', sm: '1.05rem', md: '1.1rem' },
                fontWeight: 500,
                letterSpacing: '0.03em',
                padding: { xs: '12px 8px', sm: '16px 12px', md: '20px 16px' },
                minWidth: 'fit-content',
                flex: '1 1 auto',
                maxWidth: 'none',
                '&.Mui-selected': {
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                },
                '&:hover': {
                  color: theme.palette.primary.main,
                  opacity: 0.9,
                }
              },
              '& .MuiTabs-indicator': {
                height: 3,
                borderRadius: '3px 3px 0 0',
                backgroundColor: theme.palette.primary.main,
              }
            }}
          >
            {aboutData.map((tab, index) => (
              <Tab 
                key={index}
                label={tab.title}
                sx={{
                  textTransform: 'none',
                  minHeight: 'auto',
                  '&:not(:last-child)': {
                    marginRight: { xs: 1, sm: 2, md: 3 },
                  },
                }}
              />
            ))}
          </Tabs>
        </Box>

        {/* MODIFIED: Content area - Use Box with direct styling */}
        <Box 
          id="about-tabs-content-area"
          sx={{ 
            width: '100%',
            px: { 
              xs: theme.spacing(2),
              sm: theme.spacing(4),
              md: theme.spacing(6),
              lg: theme.spacing(8),
            },
            py: { xs: 4, md: 6 },
            boxSizing: 'border-box'
          }}
        >
          <Box sx={{ pt: 2, pb: 4 }}>
            <Fade in={fadeIn} timeout={{ enter: 500, exit: 200 }} key={`tab-content-${tabIndex}`}>
              <Box
                className="about-tab-content"
                id={`about-tab-content-${tabIndex}`}
                sx={{
                  width: '100%',
                  mx: { xs: 0, sm: 'auto' },
                  backgroundColor: theme.palette.background.paper,
                  borderRadius: theme.shape.borderRadius,
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                  minHeight: '600px',
                  height: 'auto',
                }}
              >
                <AboutCard 
                  variant="noBorder" 
                  sx={{ 
                    width: '100%',
                    height: '100%',
                  }}
                >
                  <AboutTabContent 
                    tabData={aboutData[tabIndex]} 
                    tabIndex={tabIndex} 
                  />
                </AboutCard>
              </Box>
            </Fade>
          </Box>
        </Box>
      </Box>
    </Box>
  );
});

AboutTabNavigator.displayName = 'AboutTabNavigator';

export default AboutTabNavigator;
