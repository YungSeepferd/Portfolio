import React, { useState } from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails,
         useTheme } from '@mui/material';
import { getSpacingPreset, getTypographyPreset } from '../../../theme/presets';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { motion } from 'framer-motion';

/**
 * AccordionSection Component
 * 
 * Renders project content as expandable accordions, ideal for:
 * - Detailed findings
 * - Research insights
 * - FAQ-style content
 * - Expandable documentation
 * - Grouped information
 * 
 * Uses MUI Accordion components with controlled expansion.
 */
const AccordionSection = ({ 
  id,
  title, 
  items = [], 
  content,
  defaultExpanded = null,
  allowMultiple = false,
  sectionNumber,
  sectionIndex,
  projectColor = 'primary'
}) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(
    defaultExpanded !== null ? defaultExpanded : (allowMultiple ? [] : false)
  );
  const horizontal = getSpacingPreset('pageHorizontal');
  const eyebrowPreset = getTypographyPreset(theme, 'sectionEyebrow');

  if (!items || items.length === 0) {
    return null;
  }

  const handleChange = (panel) => (event, isExpanded) => {
    if (allowMultiple) {
      setExpanded(prev => 
        isExpanded 
          ? [...prev, panel]
          : prev.filter(p => p !== panel)
      );
    } else {
      setExpanded(isExpanded ? panel : false);
    }
  };

  const isExpanded = (panel) => {
    if (allowMultiple) {
      return expanded.includes(panel);
    }
    return expanded === panel;
  };

  // format section number
  const formattedNumber = sectionNumber 
    ? (typeof sectionNumber === 'number' ? sectionNumber.toString().padStart(2, '0') : sectionNumber)
    : (typeof sectionIndex === 'number' ? (sectionIndex + 1).toString().padStart(2, '0') : null);

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
      {/* Section header with optional number */}
      <Box sx={{ mb: 4 }}>
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
              mb: 0,
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

      {/* Accordions */}
      <Box>
        {items.map((item, index) => {
          const panelId = item.id || `panel-${index}`;
          
          return (
            <Accordion
              key={panelId}
              expanded={isExpanded(panelId)}
              onChange={handleChange(panelId)}
              sx={{
                mb: 2,
                '&:before': {
                  display: 'none'
                },
                boxShadow: theme.shadows[1],
                '&.Mui-expanded': {
                  boxShadow: theme.shadows[3]
                }
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${panelId}-content`}
                id={`${panelId}-header`}
                sx={{
                  '& .MuiAccordionSummary-content': {
                    my: 2
                  },
                  '& .MuiAccordionSummary-expandIconWrapper': {
                    color: theme.palette.mode === 'dark' ? 'text.primary' : 'background.paper'
                  }
                }}
              >
                <Box sx={{ width: '100%' }}>
                  {/* Item Title */}
                  <Typography 
                    variant="h6" 
                    component="h4"
                    sx={{ 
                      fontWeight: theme.typography.fontWeightMedium,
                      color: theme.palette.text.primary
                    }}
                  >
                    {item.title || item.question}
                  </Typography>

                  {/* Item Subtitle/Category */}
                  {item.subtitle && (
                    <Typography 
                      variant="caption" 
                      color="text.secondary"
                      sx={{ display: 'block', mt: 0.5 }}
                    >
                      {item.subtitle}
                    </Typography>
                  )}
                </Box>
              </AccordionSummary>

              <AccordionDetails
                sx={{
                  pt: 0,
                  pb: 3
                }}
              >
                {/* Item Content/Answer */}
                {item.content && (
                  <Box sx={{ mb: 2 }}>
                    {typeof item.content === 'string' ? (
                      <Typography variant="body2" color="text.secondary">
                        {item.content}
                      </Typography>
                    ) : (
                      item.content
                    )}
                  </Box>
                )}

                {/* Item Description (alternative) */}
                {item.description && !item.content && (
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {item.description}
                  </Typography>
                )}

                {/* Item Answer (for FAQ style) */}
                {item.answer && !item.content && !item.description && (
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {item.answer}
                  </Typography>
                )}

                {/* Media content */}
                {item.media && (
                  <Box 
                    sx={{ 
                      mt: 2,
                      borderRadius: 1,
                      overflow: 'hidden',
                      boxShadow: theme.shadows[1]
                    }}
                  >
                    {item.media.type === 'image' && (
                      <img 
                        src={item.media.src} 
                        alt={item.media.alt || item.title || 'Accordion item'}
                        style={{ 
                          width: '100%', 
                          height: 'auto',
                          display: 'block'
                        }}
                      />
                    )}
                  </Box>
                )}

                {/* Key points/details */}
                {item.points && Array.isArray(item.points) && item.points.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'medium' }}>
                      Key Points:
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, m: 0 }}>
                      {item.points.map((point, idx) => (
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

                {/* Details list (alternative) */}
                {item.details && Array.isArray(item.details) && item.details.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Box component="ul" sx={{ pl: 2, m: 0 }}>
                      {item.details.map((detail, idx) => (
                        <Typography 
                          key={idx}
                          component="li" 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ mb: 0.5 }}
                        >
                          {detail}
                        </Typography>
                      ))}
                    </Box>
                  </Box>
                )}
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Box>
    </Box>
  );
};

export default AccordionSection;
