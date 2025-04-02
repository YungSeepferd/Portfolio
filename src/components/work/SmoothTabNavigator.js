import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle, useCallback } from 'react';
import { Tabs, Tab, Box, Fade, Typography, Container, useTheme, CircularProgress } from '@mui/material';
import { wallsData } from '../about/AboutData';
import WallCard from './WallCard';
import useDebounce from '../../hooks/useDebounce';

// Constants for timeout durations
const SCROLL_TIMEOUT = 200;
const SLIDESHOW_TIMEOUT = 5000;
const FADE_TIMEOUT = 800;

// Component that handles image slideshow with automatic transitions
const Slideshow = ({ pictures }) => {
  const theme = useTheme();
  const defaultPics = pictures && pictures.length > 0 ? pictures : ['https://via.placeholder.com/300'];
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const handleImageLoad = () => {
    setLoaded(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % defaultPics.length);
      setLoaded(false);
    }, SLIDESHOW_TIMEOUT);
    return () => clearTimeout(timer);
  }, [current, defaultPics.length]);

  return (
    <Box
      variant="slideshowContainer"
      sx={{
        position: 'relative',
        width: '100%',
        height: theme.customComponents.parallax.slideshow.height,
        overflow: 'hidden',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      {!loaded && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}
        >
          <CircularProgress size={40} thickness={4} />
        </Box>
      )}

      <Fade in={loaded} timeout={FADE_TIMEOUT}>
        <Box component="div">
          <img
            key={defaultPics[current]}
            src={defaultPics[current]}
            alt="Slideshow"
            onLoad={handleImageLoad}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: loaded ? 1 : 0,
            }}
          />
        </Box>
      </Fade>

      <Box
        sx={{
          position: 'absolute',
          bottom: '8px',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          gap: '4px',
          zIndex: 2,
        }}
      >
        {defaultPics.map((_, i) => (
          <Box
            key={i}
            sx={{
              width: theme.customComponents.parallax.dot.size,
              height: theme.customComponents.parallax.dot.size,
              backgroundColor: i === current ? theme.palette.dots.active : theme.palette.dots.inactive,
              borderRadius: '50%',
              transition: 'background-color 0.3s ease',
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

// Main component for the tab navigation in About section
const ParallaxScroll = forwardRef((props, ref) => {
  const { onSectionChange, currentSection = 0 } = props;
  const [tabIndex, setTabIndex] = useState(currentSection);
  const scrollRef = useRef(null);
  const theme = useTheme();
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef(null);

  const debouncedTabIndex = useDebounce(tabIndex, 150);

  useEffect(() => {
    if (currentSection !== tabIndex && !isScrolling) {
      setTabIndex(currentSection);
    }
  }, [currentSection, tabIndex, isScrolling]);

  const handleScroll = useCallback(() => {
    setIsScrolling(true);

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
      scrollTimeoutRef.current = null;
    }, SCROLL_TIMEOUT);
  }, []);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }
  }, [handleScroll]);

  useImperativeHandle(ref, () => ({
    scrollToSection: (sectionIndex) => {
      if (sectionIndex >= 0 && sectionIndex < wallsData.length) {
        setIsScrolling(true);
        setTabIndex(sectionIndex);

        scrollRef.current?.scrollTo({
          top: sectionIndex * scrollRef.current.offsetHeight,
          behavior: 'smooth',
        });

        setTimeout(() => {
          setIsScrolling(false);
        }, SCROLL_TIMEOUT);
      }
    },
  }));

  useEffect(() => {
    if (!isScrolling && onSectionChange) {
      onSectionChange(debouncedTabIndex);
    }
  }, [debouncedTabIndex, isScrolling, onSectionChange]);

  const handleTabChange = (event, newValue) => {
    setIsScrolling(true);
    setTabIndex(newValue);

    scrollRef.current?.scrollTo({
      top: newValue * scrollRef.current.offsetHeight,
      behavior: 'smooth',
    });

    setTimeout(() => {
      setIsScrolling(false);
    }, SCROLL_TIMEOUT);
  };

  return (
    <Box
      className="parallax-container"
      ref={scrollRef}
      sx={{
        width: '100%',
        overflowY: 'hidden',
        transition: 'transform 0.25s ease-out',
        scrollBehavior: 'smooth',
      }}
    >
      <Box
        className="parallax-section"
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: { xs: 2, md: 4 },
          boxSizing: 'border-box',
          overflowY: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" component="h2" sx={{ mb: 4, textAlign: 'center' }}>
            About Me
          </Typography>

          <Box className="tabs-container" sx={{ width: '100%', overflow: 'hidden' }}>
            <Tabs
              value={tabIndex}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                mb: 2,
                '& .MuiTabs-flexContainer': {
                  justifyContent: { xs: 'flex-start', md: 'center' },
                },
                '& .MuiTab-root': {
                  color: theme.palette.text.secondary,
                  '&.Mui-selected': {
                    color: theme.palette.primary.main,
                  },
                  '&:hover': {
                    color: theme.palette.secondary.main,
                  },
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: theme.palette.primary.main,
                },
              }}
            >
              {wallsData.map((wall, index) => (
                <Tab key={index} label={wall.title} />
              ))}
            </Tabs>

            <Fade in timeout={{ enter: 500, exit: 500 }} key={tabIndex}>
              <Box
                className="tab-content"
                sx={{
                  width: '100%',
                  mx: { xs: 0, sm: 2 },
                  backgroundColor: theme.palette.background.paper,
                  borderRadius: theme.shape.borderRadius,
                }}
              >
                <WallCard variant="noBorder" sx={{ width: '100%' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column', md: 'row' },
                      gap: 3,
                    }}
                  >
                    <Box
                      sx={{
                        flex: { xs: '1', md: '0 0 300px' },
                        mb: { xs: 3, md: 0 },
                      }}
                    >
                      <Slideshow pictures={wallsData[tabIndex].pictures} />
                    </Box>
                    <Box
                      sx={{
                        flex: 1,
                        color: theme.palette.text.primary,
                        overflowY: 'auto',
                        maxHeight: { xs: 'auto', md: '400px' },
                      }}
                    >
                      <Typography variant="h4" component="div" sx={{ mb: 2 }}>
                        {wallsData[tabIndex].title}
                      </Typography>
                      <Box
                        component="div"
                        sx={{
                          '& .MuiTypography-root': { mb: 2 },
                          '& a': { color: theme.palette.primary.main },
                        }}
                      >
                        {wallsData[tabIndex].content}
                      </Box>
                    </Box>
                  </Box>
                </WallCard>
              </Box>
            </Fade>
          </Box>
        </Container>
      </Box>
    </Box>
  );
});

ParallaxScroll.displayName = 'ParallaxScroll';

export default ParallaxScroll;