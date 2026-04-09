import React, { useState } from 'react';
import { Box, Typography, Stepper, Step, StepLabel, StepContent, Button,
         useTheme, useMediaQuery, Paper } from '@mui/material';
import { getSpacingPreset, getTypographyPreset } from '../../../theme/presets';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * StepperSection Component
 * 
 * Renders project content as an interactive stepper, ideal for:
 * - User flows and journeys
 * - Feature walkthroughs
 * - Multi-step processes
 * - Sequential instructions
 * 
 * Uses MUI Stepper with optional interactivity and media support.
 */
const StepperSection = ({ 
  id,
  title, 
  steps = [], 
  orientation = 'vertical',
  interactive = false,
  content,
  defaultActiveStep = 0,
  sectionNumber,
  sectionIndex,
  projectColor = 'primary'
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeStep, setActiveStep] = useState(defaultActiveStep);

  // Force vertical on mobile
  const stepperOrientation = isMobile ? 'vertical' : orientation;
  const horizontal = getSpacingPreset('pageHorizontal');
  const eyebrowPreset = getTypographyPreset(theme, 'sectionEyebrow');

  // Format section number
  const formattedNumber = sectionNumber ? 
    (typeof sectionNumber === 'number' ? sectionNumber.toString().padStart(2, '0') : sectionNumber) :
    (typeof sectionIndex === 'number' ? (sectionIndex + 1).toString().padStart(2, '0') : null);

  if (!steps || steps.length === 0) {
    return null;
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box 
      id={id}
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      sx={{ 
        mb: 8,
        scrollMarginTop: theme.spacing(10),
        px: horizontal.px
      }}
    >
      {/* Section Header */}
      <Box sx={{ mb: 3 }}>
        {formattedNumber && (
          <Typography
            variant={eyebrowPreset.variant}
            component={eyebrowPreset.component}
            sx={{
              ...eyebrowPreset.sx,
              color: theme.palette[projectColor]?.main || theme.palette.primary.main,
              fontWeight: 700,
            }}
          >
            {formattedNumber}
          </Typography>
        )}
        {title && (
          <Typography 
            variant="h4" 
            component="h3"
            sx={{ 
              fontWeight: theme.typography.fontWeightBold,
              color: theme.palette.text.primary
            }}
          >
            {title}
          </Typography>
        )}
      </Box>

      {/* Optional introductory content */}
      {content && (
        <Box sx={{ mb: 4 }}>
          {typeof content === 'string' ? (
            <Typography variant="body1" paragraph>
              {content}
            </Typography>
          ) : (
            content
          )}
        </Box>
      )}

      {/* Stepper */}
      <Stepper 
        activeStep={interactive ? activeStep : steps.length} 
        orientation={stepperOrientation}
        sx={{
          '& .MuiStepLabel-root': {
            cursor: interactive ? 'pointer' : 'default'
          }
        }}
      >
        {steps.map((step, index) => {
          const isActive = interactive && index === activeStep;
          const isCompleted = interactive ? index < activeStep : true;

          return (
            <Step 
              key={step.id || index}
              completed={isCompleted}
              onClick={() => interactive && setActiveStep(index)}
            >
              <StepLabel
                optional={
                  step.optional && (
                    <Typography variant="caption">Optional</Typography>
                  )
                }
                sx={{
                  '& .MuiStepLabel-label': {
                    fontWeight: isActive ? 'bold' : 'medium',
                    fontSize: { xs: '0.95rem', sm: '1rem' }
                  }
                }}
              >
                {step.label || step.title}
              </StepLabel>

              <StepContent
                TransitionProps={{
                  unmountOnExit: false
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Step description */}
                    {step.description && (
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        {step.description}
                      </Typography>
                    )}

                    {/* Step content */}
                    {step.content && (
                      <Box sx={{ mb: 2 }}>
                        {typeof step.content === 'string' ? (
                          <Typography variant="body2" color="text.secondary">
                            {step.content}
                          </Typography>
                        ) : (
                          step.content
                        )}
                      </Box>
                    )}

                    {/* Media content */}
                    {step.media && (
                      <Paper 
                        elevation={2}
                        sx={{ 
                          mt: 2,
                          mb: 2,
                          overflow: 'hidden',
                          borderRadius: 2
                        }}
                      >
                        {step.media.type === 'image' && (
                          <img 
                            src={step.media.src} 
                            alt={step.media.alt || step.label || 'Step illustration'}
                            style={{ 
                              width: '100%', 
                              height: 'auto',
                              display: 'block'
                            }}
                          />
                        )}
                        {step.media.type === 'video' && (
                          <video 
                            src={step.media.src}
                            controls
                            style={{ 
                              width: '100%', 
                              height: 'auto',
                              display: 'block'
                            }}
                          />
                        )}
                      </Paper>
                    )}

                    {/* Key points */}
                    {step.points && Array.isArray(step.points) && step.points.length > 0 && (
                      <Box sx={{ mt: 2, mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'medium' }}>
                          Key Points:
                        </Typography>
                        <Box component="ul" sx={{ pl: 2, m: 0 }}>
                          {step.points.map((point, idx) => (
                            <Typography 
                              key={idx}
                              component="li" 
                              variant="body2" 
                              color="text.secondary"
                              sx={{ mb: 0.5 }}
                            >
                              {point}
                            </Typography>
                          ))}
                        </Box>
                      </Box>
                    )}

                    {/* Interactive navigation buttons */}
                    {interactive && (
                      <Box sx={{ mb: 2, mt: 3 }}>
                        <Button
                          variant="contained"
                          onClick={handleNext}
                          disabled={index === steps.length - 1}
                          sx={{ mr: 1 }}
                        >
                          {index === steps.length - 1 ? 'Finish' : 'Continue'}
                        </Button>
                        <Button
                          disabled={index === 0}
                          onClick={handleBack}
                        >
                          Back
                        </Button>
                      </Box>
                    )}
                  </motion.div>
                </AnimatePresence>
              </StepContent>
            </Step>
          );
        })}
      </Stepper>

      {/* Completion message for interactive mode */}
      {interactive && activeStep === steps.length && (
        <Paper 
          elevation={0} 
          sx={{ 
            p: 3, 
            mt: 3,
            bgcolor: theme.palette.action.hover,
            borderRadius: 2
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            All steps completed!
          </Typography>
          <Button onClick={handleReset} variant="outlined">
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default StepperSection;
