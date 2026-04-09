import React, { useState } from 'react';
import { Box, Typography, Stepper, Step, StepLabel, StepContent, useTheme, useMediaQuery, MobileStepper, Button, Paper } from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { getSpacingPreset, getTypographyPreset } from '../../../theme/presets';

/**
 * ProcessSection
 * Renders a sequence of labeled steps describing a project process.
 * - Desktop: vertical Stepper with expandable content
 * - Mobile: single-step view with MobileStepper controls
 */
const ProcessSection = ({ id, title, steps = [], sx = {}, sectionNumber, sectionIndex, projectColor = 'primary' }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeStep, setActiveStep] = useState(0);

  const vertical = getSpacingPreset('sectionVertical');
  const horizontal = getSpacingPreset('pageHorizontal');
  const titlePreset = getTypographyPreset(theme, 'sectionTitle');
  const eyebrowPreset = getTypographyPreset(theme, 'sectionEyebrow');

  if (!Array.isArray(steps) || steps.length === 0) return null;

  const handleNext = () => setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  const handleBack = () => setActiveStep((prev) => Math.max(prev - 1, 0));

  // Format section number
  const formattedNumber = sectionNumber
    ? (typeof sectionNumber === 'number' ? sectionNumber.toString().padStart(2, '0') : sectionNumber)
    : (typeof sectionIndex === 'number' ? (sectionIndex + 1).toString().padStart(2, '0') : null);

  return (
    <Box id={id} sx={{ maxWidth: '1200px', mx: 'auto', px: horizontal.px, pt: vertical.pt, pb: vertical.pb, ...sx }}>
      <Box sx={{ mb: 2 }}>
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
          <Typography variant={titlePreset.variant} component={titlePreset.component} sx={{ ...titlePreset.sx, mb: 0 }}>
            {title}
          </Typography>
        )}
      </Box>

      {!isMobile ? (
        <Stepper activeStep={activeStep} orientation="vertical" nonLinear>
          {steps.map((step, index) => (
            <Step key={step.label || index} expanded>
              <StepLabel onClick={() => setActiveStep(index)} sx={{ cursor: 'pointer' }}>
                {step.label || `Step ${index + 1}`}
              </StepLabel>
              <StepContent>
                {/* Render arrays of strings or JSX content */}
                {Array.isArray(step.content) ? (
                  <Box sx={{ mb: 2 }}>
                    {step.content.map((p, i) => (
                      <Typography key={i} variant="body1" paragraph>
                        {p}
                      </Typography>
                    ))}
                  </Box>
                ) : (
                  step.content && (
                    <Box sx={{ mb: 2 }}>
                      {React.isValidElement(step.content) ? step.content : (
                        <Typography variant="body1">{String(step.content)}</Typography>
                      )}
                    </Box>
                  )
                )}
                <Box sx={{ mb: 1, display: 'flex', gap: 1 }}>
                  <Button disabled={index === 0} onClick={handleBack} size="small" variant="outlined">Back</Button>
                  <Button disabled={index === steps.length - 1} onClick={handleNext} size="small" variant="contained">Next</Button>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      ) : (
        <Paper elevation={0} sx={{ p: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
            {steps[activeStep].label || `Step ${activeStep + 1}`}
          </Typography>
          {Array.isArray(steps[activeStep].content) ? (
            steps[activeStep].content.map((p, i) => (
              <Typography key={i} variant="body1" paragraph>
                {p}
              </Typography>
            ))
          ) : (
            steps[activeStep].content && (
              React.isValidElement(steps[activeStep].content) ? steps[activeStep].content : (
                <Typography variant="body1">{String(steps[activeStep].content)}</Typography>
              )
            )
          )}
          <MobileStepper
            variant="dots"
            steps={steps.length}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button size="small" onClick={handleNext} disabled={activeStep === steps.length - 1}>
                Next
                <KeyboardArrowRight />
              </Button>
            }
            backButton={
              <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                <KeyboardArrowLeft />
                Back
              </Button>
            }
            sx={{ mt: 1 }}
          />
        </Paper>
      )}
    </Box>
  );
};

export default ProcessSection;
