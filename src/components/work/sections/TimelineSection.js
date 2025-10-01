import React from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, 
         TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent } from '@mui/lab';
import { motion } from 'framer-motion';

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
  content 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Force left alignment on mobile for better readability
  const timelinePosition = isMobile ? 'right' : orientation;

  if (!steps || steps.length === 0) {
    return null;
  }

  return (
    <Box 
      id={id}
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      sx={{ 
        mb: 8,
        scrollMarginTop: theme.spacing(10)
      }}
    >
      {/* Section Title */}
      {title && (
        <Typography 
          variant="h4" 
          component="h3"
          sx={{ 
            mb: 4,
            fontWeight: theme.typography.fontWeightBold,
            color: theme.palette.text.primary
          }}
        >
          {title}
        </Typography>
      )}

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
          const dotColor = step.color || 'primary';
          const dotVariant = step.variant || (step.completed ? 'filled' : 'outlined');

          return (
            <TimelineItem key={step.id || index}>
              {/* Opposite content (duration/date) - hidden on mobile */}
              {!isMobile && (
                <TimelineOppositeContent 
                  color="text.secondary"
                  sx={{ 
                    py: 2,
                    px: 2,
                    flex: 0.3
                  }}
                >
                  <Typography variant="body2" fontWeight="medium">
                    {step.duration || step.date || step.timeframe}
                  </Typography>
                </TimelineOppositeContent>
              )}

              {/* Timeline separator with dot and connector */}
              <TimelineSeparator>
                <TimelineDot 
                  color={dotColor} 
                  variant={dotVariant}
                  sx={{
                    boxShadow: theme.shadows[2],
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
                      bgcolor: theme.palette.divider,
                      minHeight: isMobile ? 40 : 60
                    }} 
                  />
                )}
              </TimelineSeparator>

              {/* Timeline content */}
              <TimelineContent 
                sx={{ 
                  py: 2, 
                  px: 2,
                  flex: isMobile ? 1 : 0.7
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

                {/* Duration on mobile (moved from opposite content) */}
                {isMobile && (step.duration || step.date || step.timeframe) && (
                  <Typography 
                    variant="caption" 
                    color="text.secondary"
                    sx={{ 
                      display: 'block',
                      mb: 1,
                      fontWeight: 'medium'
                    }}
                  >
                    {step.duration || step.date || step.timeframe}
                  </Typography>
                )}

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
