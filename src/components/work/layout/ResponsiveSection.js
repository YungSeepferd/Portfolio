/**
 * ResponsiveSection Component
 * 
 * Enhanced wrapper that intelligently chooses optimal layout patterns
 */
import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import ContentAwareGrid from './ContentAwareGrid';
import AdaptiveImageContainer from './AdaptiveImageContainer';
import ProjectContentRenderer from '../ProjectContentRenderer';
import { analyzeTextContent } from '../../../utils/contentAnalysis';

const ResponsiveSection = ({
  id,
  title,
  content,
  mediaData,
  sectionNumber,
  sectionIndex,
  type = 'adaptive',
  layout = null,
  children,
  sx = {},
  ...props
}) => {
  const theme = useTheme();

  // Format section number
  const formattedNumber = sectionNumber ? 
    (typeof sectionNumber === 'number' ? sectionNumber.toString().padStart(2, '0') : sectionNumber) :
    (typeof sectionIndex === 'number' ? (sectionIndex + 1).toString().padStart(2, '0') : null);

  // Analyze content for adaptive layout decisions
  const textAnalysis = content ? analyzeTextContent(content) : null;

  // Section heading component
  const SectionHeading = ({ className = '' }) => (
    <Box className={`section-heading ${className}`} sx={{ mb: 3 }}>
      {formattedNumber && (
        <Typography
          variant="h6"
          component="span"
          sx={{
            display: 'block',
            color: theme.palette.primary.main,
            fontWeight: 600,
            mb: 1,
            fontSize: '1.1rem',
          }}
        >
          {formattedNumber}
        </Typography>
      )}
      {title && (
        <Typography
          variant="h3"
          component="h3"
          id={id}
          tabIndex={-1}
          sx={{ 
            mb: 2, 
            scrollMarginTop: '80px',
            // Responsive title sizing based on content
            fontSize: {
              xs: textAnalysis.length === 'long' ? '1.75rem' : '2rem',
              md: textAnalysis.length === 'long' ? '2.25rem' : '2.5rem'
            }
          }}
        >
          {title}
        </Typography>
      )}
    </Box>
  );

  // Content component
  const ContentBlock = ({ className = '' }) => (
    <Box className={`content-block ${className}`}>
      <SectionHeading />
      {content && (
        React.isValidElement(content) ? 
          content : 
          <ProjectContentRenderer 
            content={content} 
            variant="body1"
            sx={{
              // Adjust typography for content length
              fontSize: textAnalysis.length === 'long' ? '1rem' : '1.1rem',
              lineHeight: textAnalysis.complexity === 'complex' ? 1.7 : 1.6
            }}
          />
      )}
      {children}
    </Box>
  );

  // Media component
  const MediaBlock = ({ className = '' }) => (
    mediaData ? (
      <AdaptiveImageContainer
        className={`media-block ${className}`}
        mediaData={mediaData}
        title={title}
        priority={sectionIndex === 0 ? 'primary' : 'normal'}
        enableAnimation={true}
      />
    ) : null
  );

  // Handle special section types
  switch (type) {
    case 'gallery':
      return (
        <Box
          id={id}
          sx={{
            maxWidth: '1400px',
            mx: 'auto',
            px: { xs: 2, sm: 3, md: 4 },
            py: { xs: 4, md: 6 },
            ...sx
          }}
          {...props}
        >
          <SectionHeading />
          <AdaptiveImageContainer
            mediaData={mediaData}
            title={title}
            priority="primary"
            enableAnimation={true}
          />
          {content && (
            <Box sx={{ mt: 4, maxWidth: '800px', mx: 'auto' }}>
              <ProjectContentRenderer content={content} variant="body1" />
            </Box>
          )}
        </Box>
      );

    case 'showcase':
      return (
        <Box
          id={id}
          sx={{
            width: '100%',
            py: { xs: 4, md: 6 },
            ...sx
          }}
          {...props}
        >
          {/* Full-width media first */}
          <Box sx={{ mb: 4 }}>
            <AdaptiveImageContainer
              mediaData={mediaData}
              title={title}
              priority="hero"
              enableAnimation={true}
              containerProps={{
                sx: { borderRadius: 0, boxShadow: 'none' }
              }}
            />
          </Box>
          
          {/* Centered content */}
          <Box sx={{ maxWidth: '1200px', mx: 'auto', px: { xs: 2, sm: 3, md: 4 } }}>
            <ContentBlock />
          </Box>
        </Box>
      );

    case 'textOnly':
      return (
        <Box
          id={id}
          sx={{
            maxWidth: '1000px',
            mx: 'auto',
            px: { xs: 2, sm: 3, md: 4 },
            py: { xs: 4, md: 6 },
            ...sx
          }}
          {...props}
        >
          <ContentBlock />
        </Box>
      );

    case 'magazine':
      // Magazine-style layout with sophisticated text wrapping
      return (
        <Box
          id={id}
          sx={{
            maxWidth: '1200px',
            mx: 'auto',
            px: { xs: 2, sm: 3, md: 4 },
            py: { xs: 4, md: 6 },
            ...sx
          }}
          {...props}
        >
          {textAnalysis.length === 'long' ? (
            // Long content: multi-column layout
            <Box sx={{ 
              columns: { md: 2 }, 
              columnGap: { md: 4 },
              '& .section-heading': { columnSpan: 'all', mb: 4 }
            }}>
              <SectionHeading />
              <ProjectContentRenderer content={content} variant="body1" />
              {mediaData && (
                <Box sx={{ mt: 3, breakInside: 'avoid' }}>
                  <AdaptiveImageContainer
                    mediaData={mediaData}
                    title={title}
                    priority="secondary"
                  />
                </Box>
              )}
            </Box>
          ) : (
            // Standard magazine layout
            <ContentAwareGrid
              textContent={content}
              mediaContent={mediaData}
              sectionType={type}
              sectionIndex={sectionIndex}
              forceLayout="balanced"
            >
              <ContentBlock />
              <MediaBlock className="media" />
            </ContentAwareGrid>
          )}
        </Box>
      );

    case 'adaptive':
    default:
      // Intelligent adaptive layout
      return (
        <ContentAwareGrid
          textContent={content}
          mediaContent={mediaData}
          sectionType={type}
          sectionIndex={sectionIndex}
          forceLayout={layout}
          sx={sx}
          {...props}
        >
          <ContentBlock />
          <MediaBlock className="media" />
        </ContentAwareGrid>
      );
  }
};

export default ResponsiveSection;
