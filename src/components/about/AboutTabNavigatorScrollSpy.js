import React, { useEffect, useCallback, useRef, forwardRef, useImperativeHandle, useMemo, useState } from 'react';
import { Box, useTheme, Tabs, Tab, Typography, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import spacingTokens from '../../theme/spacing';
import AboutCard from './AboutCard';
import AboutTabContent from './AboutTabContent';
import ParallaxSection from './ParallaxSection';
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
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
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
    // Align right viewport start with left "About" heading by increasing top offset
    scrollOffset: typeof stickyTop === 'number' ? stickyTop + 96 : 136,
    useWindowRoot: isMobile
    // Use default granular thresholds for responsive detection
  });
  
  const programmaticScrollRef = useRef(false);
  const scrollEndTimerRef = useRef(null);
  const detachScrollWatcherRef = useRef(null);
  const lastTouchYRef = useRef(0);
  // Local UI override to ensure the selected state updates immediately on click
  const [selectedTab, setSelectedTab] = useState(0);

  // Keep local selectedTab in sync with scroll-spy activeSection
  // Avoid overriding user click selection while programmatic scrolling is in progress
  useEffect(() => {
    if (programmaticScrollRef.current) return;
    if (typeof activeSection === 'number') {
      setSelectedTab(activeSection);
    }
  }, [activeSection]);
  
  // Helpers to manage programmatic scroll lifecycle (more robust than fixed timeout)
  const endProgrammaticScroll = useCallback(() => {
    programmaticScrollRef.current = false;
    if (scrollEndTimerRef.current) {
      clearTimeout(scrollEndTimerRef.current);
      scrollEndTimerRef.current = null;
    }
    if (detachScrollWatcherRef.current) {
      try { detachScrollWatcherRef.current(); } catch (_) {}
      detachScrollWatcherRef.current = null;
    }
  }, []);

  const beginProgrammaticScroll = useCallback(() => {
    // Cancel any prior watcher
    endProgrammaticScroll();
    programmaticScrollRef.current = true;
    const target = isMobile ? window : containerRef.current;
    if (!target) return;
    const onAnyScroll = () => {
      if (scrollEndTimerRef.current) clearTimeout(scrollEndTimerRef.current);
      // Consider scroll finished after quiet period
      scrollEndTimerRef.current = setTimeout(() => {
        endProgrammaticScroll();
      }, 180);
    };
    const onScrollEnd = () => endProgrammaticScroll();
    try { target.addEventListener('scroll', onAnyScroll, { passive: true }); } catch (_) {}
    try { target.addEventListener('scrollend', onScrollEnd); } catch (_) {}
    // Kick off initial timer in case there are no events
    onAnyScroll();
    detachScrollWatcherRef.current = () => {
      try { target.removeEventListener('scroll', onAnyScroll); } catch (_) {}
      try { target.removeEventListener('scrollend', onScrollEnd); } catch (_) {}
    };
  }, [containerRef, isMobile, endProgrammaticScroll]);
  
  // Helper function to scroll to element with offset for sticky header
  const scrollToElementWithOffset = useCallback((element, offset = 0) => {
    if (!element) return;
    const elementRect = element.getBoundingClientRect();
    if (isMobile) {
      const target = window.pageYOffset + elementRect.top - offset;
      window.scrollTo({ top: Math.max(0, target), behavior: 'smooth' });
      return;
    }
    if (!containerRef.current) return;
    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const currentTop = container.scrollTop;
    const relativeTop = elementRect.top - containerRect.top;
    const targetTop = currentTop + relativeTop - offset;
    container.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
  }, [containerRef, isMobile]);

  // Edge-aware scroll bridging: keep scroll in the content area until edges, then let page scroll
  const handleWheel = useCallback((e) => {
    const el = containerRef.current;
    if (!el) return;
    const atTop = el.scrollTop <= 0;
    const atBottom = Math.ceil(el.scrollTop + el.clientHeight) >= el.scrollHeight;
    const scrollingUp = e.deltaY < 0;
    const scrollingDown = e.deltaY > 0;
    // If at an edge and user scrolls beyond, allow bubbling to page
    if ((atTop && scrollingUp) || (atBottom && scrollingDown)) {
      return;
    }
    // Otherwise contain the event inside the content scroller
    e.stopPropagation();
  }, [containerRef]);

  const handleTouchStart = useCallback((e) => {
    const y = e.touches && e.touches[0] ? e.touches[0].clientY : 0;
    lastTouchYRef.current = y;
  }, []);

  const handleTouchMove = useCallback((e) => {
    const el = containerRef.current;
    if (!el) return;
    const currentY = e.touches && e.touches[0] ? e.touches[0].clientY : 0;
    const deltaY = lastTouchYRef.current - currentY; // >0 means scrolling down
    const atTop = el.scrollTop <= 0;
    const atBottom = Math.ceil(el.scrollTop + el.clientHeight) >= el.scrollHeight;
    if ((atTop && deltaY < 0) || (atBottom && deltaY > 0)) {
      return; // let page handle it
    }
    e.stopPropagation();
  }, [containerRef]);

  useEffect(() => {
    if (onSectionChange && !programmaticScrollRef.current) {
      onSectionChange(activeSection);
    }
  }, [activeSection, onSectionChange]);

  // Handle scroll lock/unlock - DISABLED for free scrolling
  useEffect(() => {
    if (onScrollLock) {
      onScrollLock(false);
    }
  }, [onScrollLock]);

  // Expose scroll control to parent
  useImperativeHandle(ref, () => ({
    scrollToTop: () => {
      if (containerRef.current) {
        beginProgrammaticScroll();
        containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    scrollToSection: (sectionIndex) => {
      if (sectionIndex >= 0 && sectionIndex < aboutData.length) {
        const targetElement = sectionRefs.current[sectionIndex];
        if (targetElement) {
          beginProgrammaticScroll();
          scrollToElementWithOffset(targetElement, typeof stickyTop === 'number' ? stickyTop + 56 : 96);
        }
      }
    }
  }), [aboutData, sectionRefs, stickyTop, scrollToElementWithOffset, beginProgrammaticScroll, containerRef]);

  // Handle tab click - pure state-based navigation (no URL hash)
  const handleTabChange = useCallback((event, newValue) => {
    // Update UI selection immediately for user feedback
    setSelectedTab(newValue);

    const targetElement = sectionRefs.current[newValue];
    if (targetElement) {
      beginProgrammaticScroll();
      const offset = typeof stickyTop === 'number' ? stickyTop + 96 : 136;
      scrollToElementWithOffset(targetElement, offset);
    }
  }, [sectionRefs, stickyTop, scrollToElementWithOffset, beginProgrammaticScroll]);

  // Cleanup on unmount
  useEffect(() => () => endProgrammaticScroll(), [endProgrammaticScroll]);

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
              background: `linear-gradient(45deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.light} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block',
            }}
          >
            About
          </Typography>
          
          <Box sx={{ borderLeft: 1, borderColor: theme.palette.divider, flex: 1, overflowY: 'auto' }}>
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              orientation="vertical"
              variant="scrollable"
              textColor="primary"
              indicatorColor="primary"
              sx={{
                '& .MuiTab-root': {
                  alignItems: 'flex-start',
                  textTransform: 'none',
                  minHeight: theme.spacing(spacingTokens.tabs.minHeight),
                  borderLeft: `3px solid ${theme.palette.divider}`,
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
                  width: '3px',
                },
              }}
            >
              {aboutData.map((tab, i) => (
                <Tab 
                  key={i}
                  value={i}
                  label={tab.title}
                  id={`about-tab-${i}`}
                  aria-controls={`about-tabpanel-${i}`}
                />
              ))}
            </Tabs>
          </Box>
        </Box>
      </Box>

      {/* Right: Scrollable content area with snap */}
      <Box
        ref={containerRef}
        onWheel={isMobile ? undefined : handleWheel}
        onTouchStart={isMobile ? undefined : handleTouchStart}
        onTouchMove={isMobile ? undefined : handleTouchMove}
        sx={{
          height: { xs: 'auto', md: '100%' },
          overflowY: { xs: 'visible', md: 'scroll' },
          position: 'relative',
          scrollSnapType: 'none', // Disabled for free scrolling
          scrollBehavior: 'smooth',
          scrollPaddingTop: { md: (typeof stickyTop === 'number' ? stickyTop + 96 : stickyTop) },
          pr: { xs: 2, sm: 4, md: 6, lg: 8 },
          pl: { xs: 2, sm: 4, md: 0 },
          // Ensure this container captures scroll events
          // Allow scroll chaining to the page at edges for seamless up/down traversal
          overscrollBehavior: 'auto',
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
        <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 3, position: 'sticky', top: stickyTop, zIndex: 10, backgroundColor: theme.palette.background.default, py: 2 }}>
          <Typography 
            variant="h4" 
            sx={{ 
              mb: 2, 
              fontWeight: 700,
              color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.text.primary
            }}
          >
            About
          </Typography>
          <Tabs
            value={selectedTab}
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
              <Tab key={i} value={i} label={tab.title} />
            ))}
          </Tabs>
        </Box>

        {/* Content sections with parallax scroll effect */}
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
              pt: { xs: 2, md: 3 },
              pb: { xs: 4, md: 6 },
              mb: { xs: 4, md: 0 },
            }}
          >
            {/* Parallax wrapper adds depth effect on desktop */}
            <ParallaxSection 
              containerRef={containerRef}
              intensity={0.8} // Subtle parallax (0.8x of default 40px = 32px range)
            >
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: activeSection === index ? 1 : 0.85, y: activeSection === index ? 0 : 8 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <AboutCard variant="transparent" sx={{ width: '100%', height: '100%', borderRadius: 0 }}>
                  <AboutTabContent tabData={tab} tabIndex={index} />
                </AboutCard>
              </Box>
            </ParallaxSection>
          </Box>
          );
        })}
      </Box>
    </Box>
  );
});

AboutTabNavigatorScrollSpy.displayName = 'AboutTabNavigatorScrollSpy';

export default AboutTabNavigatorScrollSpy;
