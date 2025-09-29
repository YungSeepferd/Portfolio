import React, { useEffect, useCallback, useRef, forwardRef, useImperativeHandle, useMemo } from 'react';
import { Box, useTheme, Tabs, Tab, Typography } from '@mui/material';
import spacingTokens from '../../theme/spacing';
import AboutCard from './AboutCard';
import AboutTabContent from './AboutTabContent';
import useScrollSpy from '../../hooks/useScrollSpy';

/**
 * AboutTabNavigatorScrollSpy Component
 * 
 * Scroll-based parallax navigation for About section
 * - Left navigation stays fixed
 * - Right content scrolls with scroll-snap
 * - Tabs auto-switch based on scroll position
 * - Body scroll locked until last tab is scrolled through
 */
const AboutTabNavigatorScrollSpy = forwardRef((props, ref) => {
  const { onSectionChange, aboutData = [], onScrollLock } = props;
  const theme = useTheme();
  
  // Calculate sticky top position first
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
  
  // Scroll spy hook for automatic tab switching
  const { 
    activeSection, 
    setSectionRef, 
    sectionRefs,
    containerRef
  } = useScrollSpy({ 
    sectionCount: aboutData.length,
    scrollOffset: typeof stickyTop === 'number' ? stickyTop + 20 : 80 // Match scroll offset
    // Use default granular thresholds for responsive detection
  });
  
  const programmaticScrollRef = useRef(false);
  
  // Helper function to scroll to element with offset for sticky header
  const scrollToElementWithOffset = useCallback((element, offset = 0) => {
    if (!element || !containerRef.current) return;
    
    const container = containerRef.current;
    const elementTop = element.offsetTop;
    const scrollPosition = elementTop - offset;
    
    container.scrollTo({
      top: scrollPosition,
      behavior: 'smooth'
    });
  }, [containerRef]);
  
  // Removed hash navigation to prevent URL scroll interference
  // Tabs now work purely through state-based navigation

  // Notify parent of section changes
  useEffect(() => {
    if (onSectionChange && !programmaticScrollRef.current) {
      onSectionChange(activeSection);
    }
  }, [activeSection, onSectionChange]);

  // Handle scroll lock/unlock - DISABLED for free scrolling
  useEffect(() => {
    // Always keep scroll unlocked - remove aggressive lock behavior
    if (onScrollLock) {
      onScrollLock(false);
    }
  }, [onScrollLock]);

  // Expose scroll control to parent
  useImperativeHandle(ref, () => ({
    scrollToSection: (sectionIndex) => {
      if (sectionIndex >= 0 && sectionIndex < aboutData.length) {
        const targetElement = sectionRefs.current[sectionIndex];
        if (targetElement) {
          programmaticScrollRef.current = true;
          const offset = typeof stickyTop === 'number' ? stickyTop + 20 : 80;
          scrollToElementWithOffset(targetElement, offset);
          setTimeout(() => {
            programmaticScrollRef.current = false;
          }, 1000);
        }
      }
    }
  }), [aboutData, sectionRefs, stickyTop, scrollToElementWithOffset]);

  // Handle tab click - pure state-based navigation (no URL hash)
  const handleTabChange = useCallback((event, newValue) => {
    if (newValue === activeSection) return;

    const targetElement = sectionRefs.current[newValue];
    if (targetElement) {
      programmaticScrollRef.current = true;
      const offset = typeof stickyTop === 'number' ? stickyTop + 20 : 80;
      scrollToElementWithOffset(targetElement, offset);

      setTimeout(() => {
        programmaticScrollRef.current = false;
      }, 1000);
    }
  }, [activeSection, sectionRefs, stickyTop, scrollToElementWithOffset]);

  if (!aboutData || aboutData.length === 0) {
    return null;
  }

  return (
    <Box
      id="about-tabs-layout"
      sx={{
        display: { xs: 'block', md: 'grid' },
        gridTemplateColumns: { md: `${spacingTokens.about.leftNavWidthPx}px minmax(0, 1fr)` },
        gap: { md: spacingTokens.about.gridGap },
        width: '100%',
        height: { md: `calc(100vh - ${typeof stickyTop === 'number' ? `${stickyTop}px` : stickyTop})` },
        position: 'relative',
      }}
    >
      {/* Left: Fixed navigation (desktop) */}
      <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'column' }}>
        <Box 
          sx={{
            position: 'sticky',
            top: stickyTop,
            alignSelf: 'start',
            zIndex: theme.zIndex.appBar - 1,
            display: 'flex',
            flexDirection: 'column',
            maxHeight: `calc(100vh - ${typeof stickyTop === 'number' ? `${stickyTop}px` : stickyTop})`,
            pl: { xs: 2, sm: 4, md: 6, lg: 8 },
            pt: { xs: 4, md: 6 },
          }}
        >
          <Typography 
            variant="h1" 
            sx={{
              mb: 3,
              pl: theme.spacing(spacingTokens.tabs.labelPaddingLeft),
              fontWeight: 700,
              color: theme.palette.text.primary,
            }}
          >
            About
          </Typography>
          
          <Tabs
            value={activeSection}
            onChange={handleTabChange}
            orientation="vertical"
            variant="scrollable"
            textColor="primary"
            indicatorColor="primary"
            sx={{
              borderLeft: 1,
              borderColor: theme.palette.divider,
              flex: 1,
              overflowY: 'auto',
              '& .MuiTab-root': {
                alignItems: 'flex-start',
                textTransform: 'none',
                minHeight: theme.spacing(spacingTokens.tabs.minHeight),
                borderLeft: `2px solid ${theme.palette.divider}`,
                color: theme.palette.text.primary,
                borderRadius: 0,
                mr: 0,
                pr: theme.spacing(spacingTokens.tabs.labelPaddingRight),
                pl: theme.spacing(spacingTokens.tabs.labelPaddingLeft),
                whiteSpace: 'nowrap', // Prevent text wrapping
                '&.Mui-selected': {
                  color: theme.palette.primary.main,
                  fontWeight: 700,
                  backgroundColor: 'rgba(150, 132, 69, 0.05)',
                  borderLeftColor: theme.palette.primary.main,
                  borderRadius: 0,
                },
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
              },
              '& .MuiTabs-indicator': {
                left: 0,
                width: spacingTokens.tabs.indicatorThicknessPx,
              },
            }}
          >
            {aboutData.map((tab, i) => (
              <Tab 
                key={i} 
                label={tab.title}
                id={`about-tab-${i}`}
                aria-controls={`about-tabpanel-${i}`}
              />
            ))}
          </Tabs>
        </Box>
      </Box>

      {/* Right: Scrollable content area with snap */}
      <Box
        ref={containerRef}
        sx={{
          height: { xs: 'auto', md: '100%' },
          overflowY: { xs: 'visible', md: 'scroll' },
          scrollSnapType: 'none', // Disabled for free scrolling
          scrollBehavior: 'smooth',
          scrollPaddingTop: { md: stickyTop },
          pr: { xs: 2, sm: 4, md: 6, lg: 8 },
          pl: { xs: 2, sm: 4, md: 0 },
          // Ensure this container captures scroll events
          overscrollBehavior: 'contain',
          // Hide scrollbar but keep functionality
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: theme.palette.divider,
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: theme.palette.action.hover,
          },
        }}
      >
        {/* Mobile horizontal tabs */}
        <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 3, position: 'sticky', top: 0, zIndex: 10, backgroundColor: theme.palette.background.default, py: 2 }}>
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
            About
          </Typography>
          <Tabs
            value={activeSection}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            textColor="primary"
            indicatorColor="primary"
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                color: theme.palette.text.primary,
                '&.Mui-selected': {
                  color: theme.palette.primary.main,
                  fontWeight: 700,
                  backgroundColor: 'rgba(150, 132, 69, 0.05)',
                },
              },
            }}
          >
            {aboutData.map((tab, i) => (
              <Tab key={i} label={tab.title} />
            ))}
          </Tabs>
        </Box>

        {/* Content sections with scroll-snap */}
        {aboutData.map((tab, index) => {
          return (
          <Box
            key={index}
            ref={setSectionRef(index)}
            role="tabpanel"
            aria-labelledby={`about-tab-${index}`}
            sx={{
              minHeight: { xs: 'auto', md: '100vh' },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              py: { xs: 4, md: 6 },
              mb: { xs: 4, md: 0 },
            }}
          >
            <AboutCard variant="transparent" sx={{ width: '100%', height: '100%', borderRadius: 0 }}>
              <AboutTabContent tabData={tab} tabIndex={index} />
            </AboutCard>
          </Box>
          );
        })}
      </Box>
    </Box>
  );
});

AboutTabNavigatorScrollSpy.displayName = 'AboutTabNavigatorScrollSpy';

export default AboutTabNavigatorScrollSpy;
