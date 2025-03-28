import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box, IconButton, Fade, Typography, Container, useTheme } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { wallsData } from './Walls';
import WallCard from './WallCard';
import './ParallaxScroll.css';

const Slideshow = ({ pictures }) => {
  const defaultPics = pictures && pictures.length > 0 ? pictures : ['https://via.placeholder.com/300'];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % defaultPics.length);
    }, 5000);
    return () => clearTimeout(timer);
  }, [current, defaultPics.length]);

  return (
    <Box className="slideshow-container">
      <Fade in timeout={800}>
        <Box component="div"> {/* Wrap img in a div to avoid nesting issues */}
          <img
            key={defaultPics[current]}
            src={defaultPics[current]}
            alt="Slideshow"
            className="slideshow-image"
          />
        </Box>
      </Fade>
      <Box className="dots">
        {defaultPics.map((_, i) => (
          <Box key={i} className={`dot ${i === current ? 'active' : ''}`} />
        ))}
      </Box>
    </Box>
  );
};

const ParallaxScroll = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handlePrev = () => {
    setTabIndex((prev) => (prev === 0 ? wallsData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setTabIndex((prev) => (prev === wallsData.length - 1 ? 0 : prev + 1));
  };

  return (
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
        mb: 6, // Add bottom margin
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h2" component="h2" sx={{ mb: 4, textAlign: 'center' }}>
          About Me
        </Typography>
        
        <Box className="tabs-container" sx={{ width: '100%', overflow: 'hidden' }}>
          <Tabs 
            value={tabIndex} 
            onChange={handleChange} 
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
                }
              },
              '& .MuiTabs-indicator': {
                backgroundColor: theme.palette.primary.main, 
              }
            }}
          >
            {wallsData.map((wall, index) => (
              <Tab key={index} label={wall.title} />
            ))}
          </Tabs>
          
          <Box className="tab-content-container" sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton 
              onClick={handlePrev} 
              aria-label="previous"
              sx={{ 
                display: { xs: 'none', sm: 'flex' },
                color: theme.palette.text.primary,
              }}
            >
              <ArrowBackIosNewIcon />
            </IconButton>
            
            <Fade in timeout={{ enter: 500, exit: 500 }} key={tabIndex}>
              <Box className="tab-content" sx={{ 
                width: '100%', 
                mx: { xs: 0, sm: 2 },
                backgroundColor: theme.palette.background.paper,
                borderRadius: theme.shape.borderRadius,
              }}>
                <WallCard variant="noBorder" sx={{ width: '100%' }}>
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: 3,
                  }}>
                    <Box sx={{ 
                      flex: { xs: '1', md: '0 0 300px' }, 
                      mb: { xs: 3, md: 0 },
                    }}>
                      <Slideshow pictures={wallsData[tabIndex].pictures} />
                    </Box>
                    <Box sx={{ 
                      flex: 1,
                      color: theme.palette.text.primary,
                    }}>
                      <Typography variant="h4" component="div" sx={{ mb: 2 }}>
                        {wallsData[tabIndex].title}
                      </Typography>
                      <Box component="div" sx={{
                        '& .MuiTypography-root': { mb: 2 },
                        '& a': { color: theme.palette.primary.main },
                      }}>
                        {wallsData[tabIndex].content}
                      </Box>
                    </Box>
                  </Box>
                </WallCard>
              </Box>
            </Fade>
            
            <IconButton 
              onClick={handleNext} 
              aria-label="next"
              sx={{ 
                display: { xs: 'none', sm: 'flex' },
                color: theme.palette.text.primary,
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
          
          {/* Mobile navigation buttons */}
          <Box 
            sx={{ 
              display: { xs: 'flex', sm: 'none' }, 
              justifyContent: 'center',
              gap: 2,
              mt: 2
            }}
          >
            <IconButton onClick={handlePrev} color="primary">
              <ArrowBackIosNewIcon />
            </IconButton>
            <IconButton onClick={handleNext} color="primary">
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ParallaxScroll;