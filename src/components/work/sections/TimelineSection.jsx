import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, 
         TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent } from '@mui/lab';
import { motion } from 'framer-motion';
import { getTypographyPreset, getSpacingPreset } from '../../../theme/presets';
import { alpha } from '@mui/material/styles';

/**
 * TimelineSection Component
 * 
 * Renders project content in a timeline format, ideal for:
 * - Research methodologies
 * - Project phases
 * - Chronological processes
 * - Development stages
 * 
 * Uses MUI Timeline components with theme integration and responsive design.
 */
const TimelineSection = ({ 
  id,
  title, 
  steps = [], 
  orientation = 'alternate',
  content,
  sectionNumber,
  sectionIndex,
  projectColor = 'primary'
}) => {
  const theme = useTheme();
  const eyebrowPreset = getTypographyPreset(theme, 'sectionEyebrow');
  const horizontal = getSpacingPreset('pageHorizontal');
  
  // Format section number
  const formattedNumber = sectionNumber ? 
    (typeof sectionNumber === 'number' ? sectionNumber.toString().padStart(2, '0') : sectionNumber) :
    (typeof sectionIndex === 'number' ? (sectionIndex + 1).toString().padStart(2, '0') : null);
  // Enforce consistent layout: duration (left) • timeline • content (right)
  const timelinePosition = 'right';

  if (!steps || steps.length === 0) {
    return null;
  }

  return (
    <Box 
      id={id}
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      sx={{ 
        mb: 8,
        scrollMarginTop: theme.spacing(10),
        px: horizontal.px
      }}
    >
      {/* Section Header with Number */}
      <Box sx={{ mb: 4, textAlign: 'left' }}>
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
              fontWeight: theme.typography.fontWeightBold
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

      {/* Timeline */}
      <Timeline position={timelinePosition}>
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          const project = theme.palette[projectColor] || theme.palette.primary;
          const accentMain = project.main;
          const accentLight = project.light || project.main;
          const accentDark = project.dark || project.main;
          const dotVariant = step.variant || (step.completed ? 'filled' : 'outlined');
          const dotBg = [accentMain, accentLight, accentDark][index % 3];

          return (
            <TimelineItem key={step.id || index}>
              {/* Opposite content (duration/date) - always shown on the left */}
              <TimelineOppositeContent 
                color="text.secondary"
                sx={{ 
                  py: 2,
                  px: 2,
                  flex: 0.28
                }}
              >
                <Typography variant="body2" fontWeight="medium">
                  {step.duration || step.date || step.timeframe}
                </Typography>
              </TimelineOppositeContent>

              {/* Timeline separator with dot and connector */}
              <TimelineSeparator>
                <TimelineDot 
                  variant={dotVariant}
                  color="inherit"
                  sx={{
                    boxShadow: theme.shadows[2],
                    bgcolor: dotVariant === 'filled' ? dotBg : 'transparent',
                    border: `2px solid ${dotBg}`,
                    ...(step.icon && {
                      bgcolor: 'transparent',
                      border: 'none',
                      boxShadow: 'none'
                    })
                  }}
                >
                  {step.icon}
                </TimelineDot>
                {!isLast && (
                  <TimelineConnector 
                    sx={{ 
                      bgcolor: alpha(accentMain, 0.35),
                      minHeight: 60
                    }} 
                  />
                )}
              </TimelineSeparator>

              {/* Timeline content */}
              <TimelineContent 
                sx={{ 
                  py: 2, 
                  px: 2,
                  flex: 0.72
                }}
              >
                {/* Phase/Step title */}
                <Typography 
                  variant="h6" 
                  component="h4"
                  sx={{ 
                    fontWeight: theme.typography.fontWeightMedium,
                    mb: 1,
                    color: theme.palette.text.primary
                  }}
                >
                  {step.phase || step.title || step.label}
                </Typography>

                {/* Duration now stays on left; do not duplicate in content */}

                {/* Step description/content */}
                {step.content && (
                  <Box sx={{ mt: 1 }}>
                    {typeof step.content === 'string' ? (
                      <Typography variant="body2" color="text.secondary">
                        {step.content}
                      </Typography>
                    ) : (
                      step.content
                    )}
                  </Box>
                )}

                {/* Step description (alternative field) */}
                {step.description && !step.content && (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {step.description}
                  </Typography>
                )}

                {/* Media content if provided */}
                {step.media && (
                  <Box 
                    sx={{ 
                      mt: 2,
                      borderRadius: 1,
                      overflow: 'hidden',
                      boxShadow: theme.shadows[1]
                    }}
                  >
                    {step.media.type === 'image' && (
                      <img 
                        src={step.media.src} 
                        alt={step.media.alt || step.title || 'Timeline step'}
                        style={{ 
                          width: '100%', 
                          height: 'auto',
                          display: 'block'
                        }}
                      />
                    )}
                  </Box>
                )}

                {/* Key outcomes/deliverables */}
                {step.outcomes && Array.isArray(step.outcomes) && step.outcomes.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'medium' }}>
                      Key Outcomes:
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, m: 0 }}>
                      {step.outcomes.map((outcome, idx) => (
                        <Typography 
                          key={idx}
                          component="li" 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ mb: 0.5 }}
                        >
                          {outcome}
                        </Typography>
                      ))}
                    </Box>
                  </Box>
                )}
              </TimelineContent>
            </TimelineItem>
          );
        })}
      </Timeline>
    </Box>
  );
};

export default TimelineSection;
