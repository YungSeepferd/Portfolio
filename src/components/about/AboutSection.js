import React, { useState, useRef } from 'react';
import { Box, Typography, Container, useTheme, Chip, Stack } from '@mui/material';
import SmoothTabNavigator from './SmoothTabNavigator';
import { wallsData } from './AboutData';

/**
 * AboutSection Component
 * 
 * Responsible for rendering the About section of the portfolio with tab navigation.
 * Uses SmoothTabNavigator for content and adds dot indicators at the bottom.
 */
const AboutSection = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const parallaxRef = useRef(null);
  const maxSteps = wallsData.length;

  const handleSectionChange = (sectionIndex) => {
    if (sectionIndex >= 0 && sectionIndex < maxSteps) {
      setActiveStep(sectionIndex);
    }
  };

  return (
    <Box 
      id="about" 
      component="section"
      sx={{ 
        width: '100%',
        mt: { xs: 8, md: 12 },
        mb: { xs: 8, md: 12 },
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <Container maxWidth="lg" sx={{ mb: 4 }}>
        <Typography 
          variant="h2" 
          component="h2" 
          sx={{ 
            textAlign: 'center',
            mb: { xs: 3, md: 5 },
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            fontWeight: 700,
          }}
        >
          About Me
        </Typography>
      </Container>
      
      <SmoothTabNavigator 
        ref={parallaxRef} 
        onSectionChange={handleSectionChange}
        currentSection={activeStep}
      />
      
      {/* Dot indicators */}
      <Container maxWidth="lg">
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            mt: 4, 
            pb: 2,
            gap: 1.5 
          }}
        >
          {Array.from({ length: maxSteps }).map((_, index) => (
            <Box
              key={index}
              onClick={() => {
                setActiveStep(index);
                parallaxRef.current?.scrollToSection(index);
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  setActiveStep(index);
                  parallaxRef.current?.scrollToSection(index);
                }
              }}
              tabIndex={0}
              role="button"
              sx={{
                width: theme.spacing(1.25),  // Use theme spacing for dot size
                height: theme.spacing(1.25),
                borderRadius: '50%',
                backgroundColor: index === activeStep ? theme.palette.primary.main : theme.palette.divider,
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                '&:hover': {
                  transform: 'scale(1.3)',
                  backgroundColor: index === activeStep 
                    ? theme.palette.primary.main 
                    : theme.palette.primary.light,
                },
              }}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default AboutSection;