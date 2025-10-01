import React from 'react';
import { Box, Typography, useTheme, Card } from '@mui/material';
import spacingTokens from '../../theme/spacing';
import AboutSlideshow from './AboutSlideshow';

/**
 * AboutTabContent Component
 * 
 * Renders the content for a single tab in the About section,
 * including slideshow and text content.
 * 
 * @component
 * @param {Object} props
 * @param {Object} props.tabData - Data for the current tab
 * @param {number} props.tabIndex - Index of the current tab
 * @returns {JSX.Element} Tab content component
 */
const AboutTabContent = ({ tabData, tabIndex }) => {
  const theme = useTheme();
  
  if (!tabData) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography>No content available</Typography>
      </Box>
    );
  }
  
  // Determine headline and content body
  const contentArray = tabData?.content ? React.Children.toArray(tabData.content.props.children) : [];
  // Strip any h4 heading from content to avoid duplicate headings
  const extractedHeading = contentArray.find(
    (child) => child?.type === Typography && child?.props?.variant === 'h4'
  );
  // Always mirror the tab label for the content headline
  const headingNode = (
    <Typography 
      variant="h4" 
      sx={{ 
        mb: 2,
        color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.text.primary
      }}
    >
      {tabData.title}
    </Typography>
  );
  const contentBody = contentArray.filter((child) => child !== extractedHeading);

  return (
    <Box
      role="tabpanel"
      id={`about-tabpanel-${tabIndex}`}
      aria-labelledby={`about-tab-${tabIndex}`}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: spacingTokens.content.panel.gap,
        p: spacingTokens.content.panel.padding,
        backgroundColor: 'transparent',
        borderRadius: 0,
        boxShadow: 'none',
        mb: 3,
        scrollMarginTop: { xs: theme.spacing(12), md: theme.spacing(14) },
      }}
    >
      {/* Top Row: Image and Heading (shown for all tabs with pictures, except WhoAmI which has its own card) */}
      {tabData.pictures && tabData.pictures.length > 0 && tabIndex !== 0 && (
        <Box 
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '45% 1fr' },
            gap: { xs: 4, md: 6 },
            alignItems: 'flex-start',
          }}
        >
          {/* Image Card */}
          <Card
            id={`about-tab-image-section-${tabIndex}`}
            elevation={3}
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 0,
              overflow: 'hidden',
              minHeight: { xs: 260, sm: 320, md: 280 },
              maxHeight: { xs: 360, sm: 400, md: 380 },
            }}
          >
            <AboutSlideshow pictures={tabData.pictures} />
          </Card>

          {/* Heading Section */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              minHeight: { md: '100%' },
              '& .MuiTypography-h4': {
                fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
                lineHeight: 1.2,
                mb: 2,
              },
              '& .MuiTypography-subtitle1': {
                color: 'text.secondary',
                mb: 2,
              },
            }}
          >
            {headingNode}
            {tabData.subtitle && (
              <Typography variant="subtitle1">
                {tabData.subtitle}
              </Typography>
            )}
          </Box>
        </Box>
      )}

      {/* Bottom Row: Full Width Content (per-row timelines are rendered inside bento components) */}
      <Box
        id={`about-tab-content-section-${tabIndex}`}
        sx={{
          width: '100%',
          color: theme.palette.text.primary,
          '& .MuiTypography-root': {
            marginBottom: 0,
            overflowWrap: 'break-word',
            hyphens: 'auto',
          },
          '& .MuiTypography-body1': {
            fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
            lineHeight: 1.6,
            mb: 2,
            '&:last-child': {
              mb: 0,
            },
          },
          '& ul, & ol': {
            pl: (t) => t.spacing(spacingTokens.content.listIndent),
            mb: 2,
            '& li': {
              mb: 1,
              '&:last-child': {
                mb: 0,
              },
            },
          },
        }}
      >
        {contentBody}
      </Box>
    </Box>
  );
};

export default React.memo(AboutTabContent);
