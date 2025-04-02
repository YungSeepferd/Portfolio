import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle, useCallback, useMemo } from 'react';
import { Tabs, Tab, Box, Typography, Container, useTheme, CircularProgress } from '@mui/material';
import { aboutData } from './AboutData';
import WallCard from './AboutContent';
import useDebounce from '../../hooks/useDebounce';
import LazyImage from '../common/LazyImage';

const Slideshow = ({ pictures }) => {
  const theme = useTheme();
  const defaultPics = useMemo(() => {
    return pictures && pictures.length > 0 ? pictures : ['https://via.placeholder.com/300'];
  }, [pictures]);
  
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});
  const timerRef = useRef(null);
  
  // Pre-load all images in the slideshow to prevent loading skeletons during transitions
  useEffect(() => {
    const preloadImages = async () => {
      // Create promises for all images to load
      const imagePromises = defaultPics.map((src, index) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            setLoadedImages(prev => ({...prev, [index]: true}));
            resolve();
          };
          img.onerror = () => {
            console.error('Failed to preload image:', src);
            resolve();
          };
          img.src = src;
        });
      });
      
      // Wait for all images to be loaded
      await Promise.all(imagePromises);
    };
    
    preloadImages();
    
    return () => {
      // Cleanup function - no need to abort image loading as browser handles this
    };
  }, [defaultPics]);
  
  // Handle image loading for the current image
  const handleImageLoad = () => {
    setLoaded(true);
  };

  // Cleanup function to ensure we don't have memory leaks or race conditions
  const cleanup = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    // If we already loaded this image before, mark it as loaded immediately
    if (loadedImages[current]) {
      setLoaded(true);
    } else {
      // Otherwise reset loaded state when picture changes
      setLoaded(false);
      
      // Create a new Image object to preload the image
      const img = new Image();
      
      // Set handlers before setting src to ensure they catch all events
      img.onload = handleImageLoad;
      img.onerror = () => {
        console.error('Failed to load image:', defaultPics[current]);
        setLoaded(true); // Allow UI to proceed even if image fails
      };
      
      // Set the source to start loading
      img.src = defaultPics[current];
      
      // If the image is already cached, the onload might have fired 
      // before we set the handler, so we check here
      if (img.complete) {
        handleImageLoad();
      }
    }

    // Set up the timer for moving to the next image
    timerRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % defaultPics.length);
    }, 5000);

    // Cleanup on unmount or when dependencies change
    return cleanup;
  }, [current, defaultPics, loadedImages]);

  return (
    <Box 
      variant="slideshowContainer"
      sx={{
        position: 'relative',
        width: '100%',
        height: theme.customComponents.parallax.slideshow.height,
        overflow: 'hidden',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.default,
        boxShadow: theme.shadows[1],
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
            zIndex: 1
          }}
        >
          <CircularProgress size={40} thickness={4} />
        </Box>
      )}
      
      <Box component="div" sx={{ height: '100%' }}>
        {defaultPics.map((src, index) => (
          <LazyImage
            key={index}
            src={src}
            alt={`Slideshow image ${index + 1}`}
            style={{ display: current === index ? 'block' : 'none', width: '100%', height: '100%', objectFit: 'cover' }}
            onLoad={handleImageLoad}
          />
        ))}
      </Box>
      
      {/* Only show dots if there are multiple pictures */}
      {defaultPics.length > 1 && (
        <Box 
          sx={{
            position: 'absolute',
            bottom: '8px',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            gap: '4px',
            zIndex: 2
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
                cursor: 'pointer',
              }} 
              onClick={() => setCurrent(i)}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

const ParallaxScroll = forwardRef((props, ref) => {
  const { onSectionChange, currentSection = 0, tagStyle, fullWidth = false } = props;
  const [tabIndex, setTabIndex] = useState(currentSection);
  const scrollRef = useRef(null);
  const theme = useTheme();
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef(null); // Single timeout reference for scroll handling

  const debouncedTabIndex = useDebounce(tabIndex, 150); // Increased debounce delay for stability

  useEffect(() => {
    if (currentSection !== tabIndex && !isScrolling) {
      setTabIndex(currentSection);
    }
  }, [currentSection, tabIndex, isScrolling]);

  const handleScroll = useCallback(() => {
    setIsScrolling(true);

    // Clear any existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Use a single timeout to manage scroll state
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
      scrollTimeoutRef.current = null;

      // Optionally calculate the current tab based on scroll position
    }, 200); // Increased timeout for smoother handling
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
      if (sectionIndex >= 0 && sectionIndex < aboutData.length) {
        setIsScrolling(true); // Prevent competing updates
        setTabIndex(sectionIndex);

        // Smooth scrolling behavior
        scrollRef.current?.scrollTo({
          top: sectionIndex * scrollRef.current.offsetHeight,
          behavior: 'smooth',
        });

        // Reset scrolling state after animation completes
        setTimeout(() => {
          setIsScrolling(false);
        }, 500);
      }
    },
  }));

  useEffect(() => {
    if (!isScrolling && onSectionChange) {
      onSectionChange(debouncedTabIndex);
    }
  }, [debouncedTabIndex, isScrolling, onSectionChange]);

  const handleTabChange = (event, newValue) => {
    if (tabIndex === newValue) return; // Prevent unnecessary re-renders

    setIsScrolling(true); // Prevent competing updates during tab change
    setTabIndex(newValue);

    // Smooth scrolling behavior
    scrollRef.current?.scrollTo({
      top: newValue * scrollRef.current.offsetHeight,
      behavior: 'smooth',
    });

    // Reset scrolling state after animation completes
    setTimeout(() => {
      setIsScrolling(false);
    }, 500);
  };

  // Determine container component based on fullWidth prop
  const ContentContainer = fullWidth ? Box : Container;
  const containerProps = fullWidth 
    ? { 
        className: "full-width-container", 
        sx: { width: '100%' } 
      }
    : { maxWidth: "lg" };

  return (
    <Box
      className="parallax-container"
      ref={scrollRef}
      sx={{
        width: '100%',
        overflowY: 'hidden',
        transition: 'transform 0.25s ease-out',
        scrollBehavior: 'smooth', // Enable smooth scrolling
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
          boxSizing: 'border-box',
          overflowY: 'hidden',
          // Conditionally apply container styles based on fullWidth
          ...(fullWidth ? {} : theme.customSections.about.container),
        }}
      >
        {/* Tabs container - always full width */}
        <Box 
          className="tabs-container"
          sx={{ 
            width: '100%',
            backgroundColor: theme.palette.background.paper,
            borderBottom: `1px solid ${theme.palette.divider}`,
            position: 'relative',
            zIndex: 2,
          }}
        >
          <Container maxWidth="lg">
            <Tabs
              value={tabIndex}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                mb: 0,
                '& .MuiTabs-flexContainer': {
                  justifyContent: 'center', // Ensure tabs are centered on all screens
                },
                '& .MuiTab-root': {
                  px: 3,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 500,
                  fontFamily: `'Montserrat', 'Helvetica', 'Arial', sans-serif`, // Use Montserrat font for tabs
                  color: theme.palette.text.secondary,
                  '&.Mui-selected': {
                    color: theme.palette.primary.main,
                  },
                  '&:hover': {
                    color: theme.palette.secondary.main,
                  },
                  transition: 'color 0.3s ease', // Smooth color transition on hover/selection
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: theme.palette.secondary.main,
                  height: 3,
                },
              }}
            >
              {aboutData.map((wall, index) => (
                <Tab key={index} label={wall.title} />
              ))}
            </Tabs>
          </Container>
        </Box>

        {/* Content container - can be full width or constrained */}
        <ContentContainer {...containerProps}>
          <Box sx={{ pt: 4, pb: 2 }}>
            <Box key={tabIndex}>
              <Box
                className="tab-content"
                sx={{
                  width: '100%',
                  // Conditionally apply tab content styling
                  ...(fullWidth ? {
                    px: { xs: 2, md: 3 },
                  } : theme.customSections.about.tabContent),
                }}
              >
                <WallCard 
                  variant={fullWidth ? "transparent" : "noBorder"}
                  sx={{ 
                    width: '100%',
                    // Apply content card styling from theme
                    ...theme.customSections.about.contentCard,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column', md: 'row' },
                      gap: { xs: 3, md: 4 },
                    }}
                  >
                    <Box
                      sx={{
                        flex: { xs: '1', md: '0 0 360px' }, // Increased image container width
                        // Apply imageContainer styling from theme
                        ...theme.customSections.about.imageContainer,
                      }}
                    >
                      <Slideshow pictures={aboutData[tabIndex].pictures} />
                    </Box>
                    <Box
                      sx={{
                        flex: 1,
                        color: theme.palette.text.primary,
                        // Apply textContent styling from theme
                        ...theme.customSections.about.textContent,
                      }}
                    >
                      {/* Only show title if it's not the first tab */}
                      {tabIndex !== 0 && (
                        <Typography 
                          variant="h4" 
                          component="div" 
                          sx={{ 
                            mb: 2,
                            color: theme.palette.text.primary, // Ensure heading is white
                            fontFamily: `'Montserrat', 'Helvetica', 'Arial', sans-serif` // Use Montserrat font for headings
                          }}
                        >
                          {aboutData[tabIndex].title}
                        </Typography>
                      )}
                      <Box
                        component="div"
                        sx={{
                          '& .MuiTypography-root': { mb: 2 },
                          '& a': { color: theme.palette.primary.main },
                          // Add consistent spacing for lists
                          '& ul': { 
                            pl: 3,
                            mb: 2,
                          },
                          '& li': { 
                            mb: 0.5,
                          },
                          // Make sure any skill tags/chips use consistent styling
                          '& .MuiChip-root': tagStyle || {
                            backgroundColor: 'rgba(83, 99, 238, 0.2)',
                            color: '#FFFFFF',
                            border: '1px solid #3545D6',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            height: 28,
                            borderRadius: '14px',
                          },
                        }}
                      >
                        {aboutData[tabIndex].content}
                      </Box>
                    </Box>
                  </Box>
                </WallCard>
              </Box>
            </Box>
          </Box>
        </ContentContainer>
      </Box>
    </Box>
  );
});

ParallaxScroll.displayName = 'ParallaxScroll';

export default ParallaxScroll;