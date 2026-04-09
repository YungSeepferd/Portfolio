import React, { useState, useEffect, useCallback, useRef, forwardRef, useImperativeHandle, useMemo } from 'react';
import { Box, Fade, useTheme, Tabs, Tab, Typography } from '@mui/material'; // Removed unused Container
import spacingTokens from '../../theme/spacing';
import AboutCard from './AboutCard';
import AboutTabContent from './AboutTabContent';
import useDebounce from '../../hooks/useDebounce';
import useScrollSpy from '../../hooks/useScrollSpy';

// Constants for timeout durations
const SCROLL_TIMEOUT = 350;  // Increased from 200 for smoother transitions

/**
 * AboutTabNavigator Component
 * Updated to accept aboutData as a prop
 */
const AboutTabNavigator = forwardRef((props, ref) => {
  const { onSectionChange, currentSection = 0, aboutData = [] } = props;
  const theme = useTheme();
  
  // Scroll spy hook for automatic tab switching based on scroll
  const { 
    activeSection, 
    setSectionRef, 
    containerRef,
    isAtBottom,
    checkIfAtBottom
  } = useScrollSpy({ 
    sectionCount: aboutData.length,
    threshold: 0.5,
    rootMargin: '-20% 0px -20% 0px'
  });
  
  const [isTabSwitching, setIsTabSwitching] = useState(false);
  const tabSwitchTimeoutRef = useRef(null);
  
  // Responsive layout handled via sx breakpoints; no isMobile flag needed
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
  const debouncedActiveSection = useDebounce(activeSection, 150);

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
        // Avoid clipping sticky children
        overflow: 'visible',
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
          justifyContent: 'flex-start',
          alignItems: 'stretch',
          boxSizing: 'border-box',
          // Allow sticky children to render above
          overflow: 'visible',
        }}
      >
        {/* Vertical Tabs layout (md+) and horizontal on mobile */}
        <Box
          id="about-tabs-layout"
          sx={{
            display: { xs: 'block', md: 'grid' },
            gridTemplateColumns: { md: `${spacingTokens.about.leftNavWidthPx}px minmax(0, 1fr)` },
            gap: { md: spacingTokens.about.gridGap },
            px: { xs: theme.spacing(2), sm: theme.spacing(4), md: theme.spacing(6), lg: theme.spacing(8) },
            py: { xs: 4, md: 6 },
            boxSizing: 'border-box',
            width: '100%',
          }}
        >
          {/* Left: vertical tabs (desktop) */}
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box sx={(t) => ({ position: 'sticky', top: stickyTop, alignSelf: 'start', zIndex: t.zIndex.appBar - 1, backgroundColor: t.palette.background.default, display: 'flex', flexDirection: 'column', maxHeight: `calc(100vh - ${typeof stickyTop === 'number' ? `${stickyTop}px` : stickyTop})` })}>
              <Typography variant="h1" sx={(t) => ({ mb: 3, pl: t.spacing(spacingTokens.tabs.labelPaddingLeft), fontWeight: 700, color: t.palette.text.primary })}>
                About
              </Typography>
              <Tabs
                value={tabIndex}
                onChange={handleTabChange}
                orientation="vertical"
                variant="scrollable"
                allowScrollButtonsMobile
                textColor="primary"
                indicatorColor="primary"
                sx={(t) => ({
                  borderLeft: 1,
                  borderColor: t.palette.divider,
                  // The Tabs list itself scrolls within the sticky wrapper, below the title
                  flex: 1,
                  overflowY: 'auto',
                  '& .MuiTab-root': {
                    alignItems: 'flex-start',
                    textTransform: 'none',
                    minHeight: t.spacing(spacingTokens.tabs.minHeight),
                    // left accent border using design token
                    borderLeft: `2px solid ${t.palette.divider}`,
                    color: t.palette.text.primary,
                    borderRadius: 0,
                    mr: 0,
                    pr: t.spacing(spacingTokens.tabs.labelPaddingRight),
                    pl: t.spacing(spacingTokens.tabs.labelPaddingLeft),
                    '&.Mui-selected': {
                      color: t.palette.primary.main,
                      fontWeight: 700,
                      backgroundColor: t.palette.action.selected,
                      borderLeftColor: t.palette.primary.main,
                      borderRadius: 0,
                    },
                    '&:hover': {
                      backgroundColor: t.palette.action.hover,
                    },
                  },
                  '& .MuiTabs-indicator': {
                    left: 0,
                    width: spacingTokens.tabs.indicatorThicknessPx,
                  },
                })}
              >
                {aboutData.map((tab, i) => (
                  <Tab key={i} label={tab.title} id={`about-tab-${i}`} aria-controls={`about-tabpanel-${i}`} />
                ))}
              </Tabs>
            </Box>
          </Box>

          {/* Right: content area with mobile horizontal tabs on top */}
          <Box>
            {/* Mobile horizontal tabs */}
            <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 2 }}>
              <Typography variant="h6" sx={(t) => ({ mb: 2.5, pl: t.spacing(spacingTokens.tabs.labelPaddingLeft), fontWeight: 700 })}>
                About
              </Typography>
              <Tabs
                value={tabIndex}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
                textColor="primary"
                indicatorColor="primary"
                sx={(t) => ({
                  '& .MuiTab-root': {
                    alignItems: 'flex-start',
                    textTransform: 'none',
                    minHeight: t.spacing(spacingTokens.tabs.minHeight),
                    borderLeft: `2px solid ${t.palette.divider}`,
                    color: t.palette.text.primary,
                    borderRadius: 0,
                    mr: 0,
                    pr: t.spacing(spacingTokens.tabs.labelPaddingRight),
                    pl: t.spacing(spacingTokens.tabs.labelPaddingLeft),
                    '&.Mui-selected': {
                      color: t.palette.primary.main,
                      fontWeight: 700,
                      backgroundColor: t.palette.action.selected,
                      borderLeftColor: t.palette.primary.main,
                      borderRadius: 0,
                    },
                    '&:hover': {
                      backgroundColor: t.palette.action.hover,
                    },
                  },
                })}
              >
                {aboutData.map((tab, i) => (
                  <Tab key={i} label={tab.title} id={`about-tab-${i}`} aria-controls={`about-tabpanel-${i}`} />
                ))}
              </Tabs>
            </Box>

            {/* Tab Panel */}
            <Box
              role="tabpanel"
              id={`about-tabpanel-${tabIndex}`}
              aria-labelledby={`about-tab-${tabIndex}`}
              sx={{
                backgroundColor: theme.palette.background.paper,
                borderRadius: 0,
                minHeight: '600px',
              }}
            >
              <Fade in={fadeIn} timeout={{ enter: 500, exit: 200 }} key={`tab-content-${tabIndex}`}>
                <Box>
                  <AboutCard variant="noBorder" sx={{ width: '100%', height: '100%', borderRadius: 0 }}>
                    <AboutTabContent tabData={aboutData[tabIndex]} tabIndex={tabIndex} />
                  </AboutCard>
                </Box>
              </Fade>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
});

AboutTabNavigator.displayName = 'AboutTabNavigator';

export default AboutTabNavigator;
