import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef, useCallback, useMemo } from 'react';
import { Box, Fade, useTheme, useMediaQuery, Tabs, Tab, Typography, CircularProgress, Grid, Stack, Chip } from '@mui/material';
import { aboutData } from './AboutData';
import AboutCard from './AboutCard';
import useDebounce from '../../hooks/useDebounce';
import { SkillTag } from '../common/Tags';
import CodeIcon from '@mui/icons-material/Code';
import BrushIcon from '@mui/icons-material/Brush';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import WorkIcon from '@mui/icons-material/Work';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

const SCROLL_TIMEOUT = 350;
const SLIDESHOW_INTERVAL = 5000;

const IntegratedSlideshow = React.memo(({ pictures }) => {
  const theme = useTheme();
  const defaultPics = useMemo(() => {
    return pictures && pictures.length > 0 ? pictures : ['https://via.placeholder.com/300'];
  }, [pictures]);

  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});

  const handleImageLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  const getCurrentImageSrc = useCallback((image) => {
    return typeof image === 'string' ? image : image?.src || image;
  }, []);

  const getCurrentImagePosition = useCallback((image) => {
    if (typeof image === 'object' && image.position) {
      return image.position;
    }
    const imageSrc = getCurrentImageSrc(image);
    if (imageSrc && imageSrc.includes('Salzburg.jpg')) {
      return 'center bottom 30%';
    }
    return 'center center';
  }, [getCurrentImageSrc]);

  useEffect(() => {
    if (loadedImages[getCurrentImageSrc(defaultPics[current])]) {
      setLoaded(true);
    } else {
      setLoaded(false);
    }

    const timer = setTimeout(() => {
      setLoadedImages(prev => ({
        ...prev,
        [getCurrentImageSrc(defaultPics[current])]: true
      }));
      setCurrent(prev => (prev + 1) % defaultPics.length);
    }, SLIDESHOW_INTERVAL);

    return () => clearTimeout(timer);
  }, [current, defaultPics, loadedImages, getCurrentImageSrc]);

  return (
    <Box
      aria-label="About section slideshow"
      role="img"
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: '300px', sm: '350px', md: '450px', lg: '500px' },
        overflow: 'hidden',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.default,
        boxShadow: theme.shadows[2],
      }}
    >
      {!loaded && (
        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
          <CircularProgress size={40} thickness={4} aria-label="Loading image" />
        </Box>
      )}
      <Fade in={loaded} timeout={400} key={`fade-${current}`}>
        <Box component="div">
          <img
            src={getCurrentImageSrc(defaultPics[current])}
            alt={`About section content ${current + 1}`}
            onLoad={handleImageLoad}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: getCurrentImagePosition(defaultPics[current]),
              opacity: loaded ? 1 : 0,
            }}
          />
        </Box>
      </Fade>
      {defaultPics.length > 1 && (
        <Box sx={{ position: 'absolute', bottom: '8px', width: '100%', display: 'flex', justifyContent: 'center', gap: '4px', zIndex: 2 }} role="tablist" aria-label="Slideshow indicators">
          {defaultPics.map((_, i) => (
            <Box
              key={i}
              role="tab"
              tabIndex={i === current ? 0 : -1}
              aria-selected={i === current}
              aria-label={`Slide ${i + 1} of ${defaultPics.length}`}
              onClick={() => setCurrent(i)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setCurrent(i); } }}
              sx={{ width: '8px', height: '8px', backgroundColor: i === current ? theme.palette.primary.main : 'rgba(255,255,255,0.3)', borderRadius: '50%', transition: 'background-color 0.3s ease', cursor: 'pointer' }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
});
IntegratedSlideshow.displayName = 'IntegratedSlideshow';

const AboutTabNavigator = forwardRef((props, ref) => {
  const { onSectionChange, currentSection = 0 } = props;
  const [tabIndex, setTabIndex] = useState(currentSection);
  const [fadeIn, setFadeIn] = useState(true);
  const scrollRef = useRef(null);
  const theme = useTheme();
  const [isScrolling, setIsScrolling] = useState(false);
  const [isTabSwitching, setIsTabSwitching] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const debouncedTabIndex = useDebounce(tabIndex, 200);

  useEffect(() => {
    if (currentSection !== tabIndex && !isScrolling && !isTabSwitching) {
      setTabIndex(currentSection);
    }
  }, [currentSection, tabIndex, isScrolling, isTabSwitching]);

  const handleScroll = useCallback(() => {
    if (isTabSwitching) return;
    setIsScrolling(true);
    setTimeout(() => {
      setIsScrolling(false);
    }, SCROLL_TIMEOUT);
  }, [isTabSwitching]);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll);
      };
    }
  }, [handleScroll]);

  useImperativeHandle(ref, () => ({
    scrollToSection: (sectionIndex) => {
      if (sectionIndex >= 0 && sectionIndex < aboutData.length) {
        setTabIndex(sectionIndex);
      }
    }
  }), []);

  useEffect(() => {
    if (!isScrolling && !isTabSwitching && onSectionChange) {
      onSectionChange(debouncedTabIndex);
    }
  }, [debouncedTabIndex, isScrolling, isTabSwitching, onSectionChange]);

  const handleTabChange = (event, newValue, programmatic = false) => {
    if (tabIndex === newValue || isTabSwitching) return;

    setIsTabSwitching(true);
    setTabIndex(newValue);

    if (onSectionChange) {
      onSectionChange(newValue);
    }

    setFadeIn(false);

    setTimeout(() => {
      setFadeIn(true);
      setTimeout(() => {
        setIsTabSwitching(false);
      }, 100);
    }, 300);
  };

  const currentTabData = aboutData[tabIndex];

  return (
    <Box
      className="about-tabs-container"
      ref={scrollRef}
      sx={{
        width: '100%',
      }}
    >
      <Box
        sx={{
          width: '100%',
          backgroundColor: theme.palette.background.paper,
          borderBottom: `1px solid ${theme.palette.divider}`,
          position: 'relative',
          zIndex: 2,
          px: { xs: '20px', sm: '30px', md: '40px', lg: '50px' },
          boxSizing: 'border-box',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          variant={isMobile ? "scrollable" : "fullWidth"}
          scrollButtons="auto"
          allowScrollButtonsMobile
          aria-label="About section tabs"
          sx={{
            width: '100%',
            maxWidth: 'lg',
            '& .MuiTabs-flexContainer': {
              justifyContent: { xs: 'flex-start', md: 'space-between' },
            },
            '& .MuiTab-root': {
              px: { xs: 2, md: 3 },
              py: 1.5,
              fontSize: { xs: '0.95rem', md: '1.1rem' },
              fontWeight: 500,
              color: theme.palette.text.secondary,
              minWidth: { xs: 'auto', md: 0 },
              '&.Mui-selected': { color: theme.palette.primary.main },
              '&:hover': { color: theme.palette.secondary.main },
              transition: 'color 0.3s ease',
              flex: { xs: 'none', md: 1 },
              whiteSpace: 'nowrap',
            },
            '& .MuiTabs-indicator': {
              backgroundColor: theme.palette.primary.main,
              height: 3,
              transition: 'all 0.3s ease',
            },
          }}
        >
          {aboutData.map((tab, index) => (
            <Tab
              key={index}
              label={tab.title}
              disabled={isTabSwitching}
              aria-controls={`about-tabpanel-${index}`}
              id={`about-tab-${index}`}
            />
          ))}
        </Tabs>
      </Box>

      <Box
        sx={{
          width: '100%',
          px: { xs: '20px', sm: '30px', md: '40px', lg: '50px' },
          py: { xs: 4, md: 6 },
          boxSizing: 'border-box',
        }}
      >
        <Fade in={fadeIn} timeout={{ enter: 500, exit: 300 }} key={`tab-content-${tabIndex}`}>
          <Box
            role="tabpanel"
            id={`about-tabpanel-${tabIndex}`}
            aria-labelledby={`about-tab-${tabIndex}`}
            sx={{
              width: '100%',
              maxWidth: 'lg',
              mx: 'auto',
              backgroundColor: theme.palette.background.paper,
              borderRadius: theme.shape.borderRadius,
              minHeight: '600px',
              height: 'auto',
              overflow: 'hidden',
            }}
          >
            <AboutCard
              variant="noBorder"
              sx={{
                width: '100%',
                height: '100%',
                boxShadow: 'none',
                backgroundColor: 'transparent',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  gap: { xs: 4, md: 6 },
                  padding: { xs: 3, sm: 4, md: 5 },
                }}
              >
                <Box sx={{ flex: { xs: '1', md: '0 0 40%' }, mb: { xs: 3, md: 0 }, minHeight: { xs: '300px', md: '500px' } }}>
                  {currentTabData?.pictures && <IntegratedSlideshow pictures={currentTabData.pictures} />}
                </Box>

                <Box sx={{ flex: 1, color: theme.palette.text.primary, '& .MuiTypography-root': { mb: 3 }, pl: { md: 2 } }}>
                  {currentTabData?.content || <Typography>No content available</Typography>}
                </Box>
              </Box>
            </AboutCard>
          </Box>
        </Fade>
      </Box>
    </Box>
  );
});

AboutTabNavigator.displayName = 'AboutTabNavigator';

export default AboutTabNavigator;
