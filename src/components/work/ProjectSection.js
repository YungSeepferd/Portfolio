import React from 'react';
import { Box, Typography, Grid, useTheme, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { motion } from 'framer-motion';
import ContentAwareImage from '../common/ContentAwareImage';
import VideoPlayer from '../common/VideoPlayer';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ProjectContentRenderer from './ProjectContentRenderer';
import ProjectGallery from '../common/ProjectGallery';
import ActionButtonGroup from '../common/ActionButtonGroup';

/**
 * Helper function to format section numbers
 */
function useSectionNumber(providedNumber, index) {
  // If a section number is explicitly provided, use it
  if (providedNumber) {
    // Format as 2-digit string if it's a number
    return typeof providedNumber === 'number' 
      ? providedNumber.toString().padStart(2, '0') 
      : providedNumber;
  }
  
  // If no number provided but we have an index, generate a section number
  if (typeof index === 'number') {
    return (index + 1).toString().padStart(2, '0');
  }
  
  // No section number available
  return null;
}

/**
 * ProjectSection Component (Schema-based, type-driven)
 *
 * Renders a project section based on its type and schema.
 */
const ProjectSection = ({
  id,
  title,
  content,
  mediaData,
  takeaways,
  outcomes,
  layout = 'textLeft',
  children,
  sectionNumber,
  sectionIndex,
  fallbackContent,
  type, // <-- add type prop
  sx = {}
}) => {
  const theme = useTheme();
  const isReverse = layout === 'textRight';
  const isTextOnly = layout === 'textOnly';
  const isMediaOnly = layout === 'mediaOnly';

  // Format section number (from prop or generated from index)
  const formattedNumber = useSectionNumber(sectionNumber, sectionIndex);

  // Section heading (add section number above title)
  const headingElement = (title || formattedNumber) && (
    <Box>
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
          sx={{ mb: 2, scrollMarginTop: '80px' }}
        >
          {title}
        </Typography>
      )}
    </Box>
  );

  // Helper: Render outcomes and takeaways side-by-side or stacked
  const renderOutcomesTakeaways = () => {
    if (!outcomes && !takeaways) return null;
    const isSideBySide = layout === 'sideBySide' || layout === 'outcomesTakeaways';
    return (
      <Grid container spacing={4} sx={{ mt: 3, mb: 2 }} direction={isSideBySide ? 'row' : 'column'}>
        {takeaways && takeaways.length > 0 && (
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2, color: theme.palette.text.secondary }}>
              Key Takeaways
            </Typography>
            <List dense disablePadding>
              {takeaways.map((item, idx) => (
                <ListItem key={idx} disableGutters>
                  <ListItemIcon sx={{ minWidth: '32px' }}>
                    <StarBorderIcon fontSize="small" color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={item} primaryTypographyProps={{ variant: 'body1' }} />
                </ListItem>
              ))}
            </List>
          </Grid>
        )}
        {outcomes && outcomes.points && outcomes.points.length > 0 && (
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2, color: theme.palette.text.secondary }}>
              {outcomes.title || 'Project Outcomes'}
            </Typography>
            <List dense disablePadding>
              {outcomes.points.map((point, idx) => (
                <ListItem key={idx} disableGutters>
                  <ListItemIcon sx={{ minWidth: '32px' }}>
                    <CheckCircleOutlineIcon fontSize="small" color="success" />
                  </ListItemIcon>
                  <ListItemText primary={point} primaryTypographyProps={{ variant: 'body1' }} />
                </ListItem>
              ))}
            </List>
          </Grid>
        )}
      </Grid>
    );
  };

  // --- Section type-based rendering ---
  switch (type) {
    case 'gallery':
      return (
        <Box id={id} sx={{ my: 6, ...sx }} role="region" aria-labelledby={id}>
          {headingElement}
          <ProjectGallery images={mediaData} title={title} />
        </Box>
      );
    case 'outcomes':
      return (
        <Box id={id} sx={{ my: 6, ...sx }} role="region" aria-labelledby={id}>
          {headingElement}
          {renderOutcomesTakeaways()}
        </Box>
      );
    case 'takeaways':
      return (
        <Box id={id} sx={{ my: 6, ...sx }} role="region" aria-labelledby={id}>
          {headingElement}
          {renderOutcomesTakeaways()}
        </Box>
      );
    case 'prototype':
      // Placeholder: Replace with your PrototypeShowcase component if available
      return (
        <Box id={id} sx={{ my: 6, ...sx }} role="region" aria-labelledby={id}>
          {headingElement}
          {/* <PrototypeShowcase ... /> */}
          <Typography variant="body2">[Prototype embed coming soon]</Typography>
        </Box>
      );
    case 'custom':
      return (
        <Box id={id} sx={{ my: 6, ...sx }} role="region" aria-labelledby={id}>
          {headingElement}
          {children}
        </Box>
      );
    case 'research':
      // Two-column with quotes (placeholder)
      return (
        <Grid container spacing={4} sx={{ ...sx }} id={id}>
          <Grid item xs={12} md={7}>
            {/* Heading and main content */}
            {title && (
              <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, color: theme.palette.text.primary }}>
                {title}
              </Typography>
            )}
            {content && (
              React.isValidElement(content)
                ? content
                : <ProjectContentRenderer content={content} variant="body1" />
            )}
          </Grid>
          <Grid item xs={12} md={5}>
            {/* Placeholder for research quotes/personas */}
            <Box sx={{ p: 2, bgcolor: theme.palette.background.paper, borderRadius: 2 }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>Highlighted Quotes</Typography>
              <Typography variant="body2" color="text.secondary">"Empathy quote or persona card here..."</Typography>
            </Box>
          </Grid>
        </Grid>
      );
    case 'metrics':
      // Metrics/statistics cards (placeholder)
      return (
        <Box sx={{ ...sx, display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }} id={id}>
          {title && (
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, color: theme.palette.text.primary }}>
              {title}
            </Typography>
          )}
          <Box sx={{ p: 2, bgcolor: theme.palette.success.light, borderRadius: 2, minWidth: 120 }}>
            <Typography variant="h6">SUS: 75.38</Typography>
            <Typography variant="caption">Usability Score</Typography>
          </Box>
          <Box sx={{ p: 2, bgcolor: theme.palette.info.light, borderRadius: 2, minWidth: 120 }}>
            <Typography variant="h6">Trust: 5.82</Typography>
            <Typography variant="caption">Post-Interaction</Typography>
          </Box>
        </Box>
      );
    case 'figmaEmbed':
      // Figma iframe embed (placeholder)
      return (
        <Box sx={{ ...sx, width: '100%', textAlign: 'center' }} id={id}>
          {title && (
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, color: theme.palette.text.primary }}>
              {title}
            </Typography>
          )}
          <Box sx={{ my: 2 }}>
            <iframe
              title="Figma Prototype"
              src={typeof content === 'string' ? content : (mediaData?.src || '')}
              width="100%"
              height="500"
              style={{ border: 0, borderRadius: 8 }}
              allowFullScreen
            />
          </Box>
        </Box>
      );
    default:
      // ...existing code for default, textOnly, mediaOnly layouts...
      const textContentElement = (
        <Box
          component={motion.div}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
          id={id}
        >
          {headingElement}
          {content && (React.isValidElement(content) ? content : <ProjectContentRenderer content={content} variant="body1" />)}
          {renderOutcomesTakeaways()}
          {children && (
            <Box sx={{ mt: 3 }}>
              <ActionButtonGroup actions={children} layout="row" />
            </Box>
          )}
        </Box>
      );
      let mediaElement = null;
      if (Array.isArray(mediaData) && mediaData.length > 0) {
        mediaElement = <ProjectGallery images={mediaData} title={title} />;
      } else if (mediaData?.src) {
        const aspect = mediaData.aspect || 'landscape';
        const aspectRatioMap = { portrait: 3/4, landscape: 16/9, square: 1 };
        const aspectRatio = aspectRatioMap[aspect] || aspectRatioMap.landscape;
        mediaElement = (
          <Box
            component={motion.div}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.1 } } }}
            sx={{
              width: '100%',
              aspectRatio: aspectRatio,
              minHeight: { xs: 240, md: 320 },
              maxHeight: { md: 600 },
              borderRadius: theme.shape.borderRadius,
              overflow: 'hidden',
              boxShadow: theme.shadows[3],
            }}
          >
            {mediaData.type === 'video' ? (
              <VideoPlayer
                src={mediaData.src}
                containerHeight="100%"
                containerWidth="100%"
                controls={true}
                muted={true}
              />
            ) : (
              <ContentAwareImage
                src={mediaData.src}
                alt={mediaData.alt || title || 'Project media'}
                containerHeight="100%"
                containerWidth="100%"
                aspect={aspect}
              />
            )}
          </Box>
        );
      }
      if (isTextOnly) {
        return <Box id={id} sx={{ ...sx }}>{textContentElement}</Box>;
      }
      if (isMediaOnly) {
        return <Box id={id} sx={{ ...sx }}>{mediaElement}</Box>;
      }
      return (
        <Grid container spacing={{ xs: 4, md: 6 }} sx={{ ...sx }} alignItems="center" id={id}>
          <Grid
            item
            xs={12}
            md={mediaElement ? 6 : 12}
            order={{ xs: 1, md: isReverse ? 2 : 1 }}
          >
            {textContentElement}
          </Grid>
          {mediaElement && (
            <Grid
              item
              xs={12}
              md={6}
              order={{ xs: 2, md: isReverse ? 1 : 2 }}
            >
              {mediaElement}
            </Grid>
          )}
        </Grid>
      );
  }
};

export default ProjectSection;
