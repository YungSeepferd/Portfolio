import React from 'react';
import { Box, Typography, Grid, useTheme, List, ListItem, ListItemIcon, ListItemText, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import ContentAwareImage from '../common/ContentAwareImage';
import VideoPlayer from '../common/VideoPlayer';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ProjectContentRenderer from './ProjectContentRenderer';
import ProjectGallery from './ProjectGallery';
import { ProjectActionButtonsBar } from './ProjectMetaBar';

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

  // Responsive aspect ratio for media
  const mediaAspect = { xs: '16/9', sm: '21/9', md: '21/9' };

  // Format section number (from prop or generated from index)
  const formattedNumber = useSectionNumber(sectionNumber, sectionIndex);

  // Section heading with color highlight for important words
  const headingElement = (title || formattedNumber) && (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        textAlign: 'left',
        width: '100%',
      }}
    >
      {formattedNumber && (
        <Typography
          variant="h6"
          component="span"
          sx={{
            display: 'block',
            color: theme.palette.primary.main,
            fontWeight: 600,
            mb: 1,
            fontSize: { xs: '1.1rem', md: '1.3rem' },
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
          sx={{ mb: 2, scrollMarginTop: '80px', fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }, fontWeight: 700 }}
        >
          {/* Example: color highlight for important words */}
          {title.split(' ').map((word, i) =>
            ["ADHD", "Support", "App", "Key", "Outcomes", "Results", "Impact"].includes(word) ? (
              <Box key={i} component="span" sx={{ color: theme.palette.secondary.main, fontWeight: 800 }}>{word} </Box>
            ) : (
              word + ' '
            )
          )}
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

  // In all layouts, wrap content in a Paper for consistent card look
  const fullWidthBox = (children) => (
    <Paper
      id={`project-section-root-${id || sectionIndex}`}
      sx={{
        maxWidth: '1200px',
        mx: 'auto',
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 3, md: 5 },
        mb: 6,
        background: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[2],
      }}
    >
      {children}
    </Paper>
  );

  // Helper for full-width image frame (single or up to 3 images)
  const fullWidthImageFrame = (mediaArr) => {
    if (!mediaArr || mediaArr.length === 0) return null;
    return (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, width: '100%', justifyContent: 'center', mb: 2 }}>
        {mediaArr.map((img, idx) => (
          <Box
            key={idx}
            sx={{
              flex: '1 1 300px',
              minWidth: 220,
              maxWidth: 400,
              aspectRatio: mediaAspect,
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: theme.shadows[1],
              background: theme.palette.grey[100],
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ContentAwareImage
              src={img.src || img}
              alt={img.alt || `Section image ${idx + 1}`}
              containerHeight="100%"
              containerWidth="100%"
              aspect={img.aspect || 'landscape'}
              sx={{ borderRadius: theme.shape.borderRadius }}
            />
          </Box>
        ))}
      </Box>
    );
  };

  // --- Section type-based rendering ---
  switch (type) {
    case 'gallery':
      // Full-width gallery section
      return fullWidthBox(
        <>
          {headingElement}
          {Array.isArray(mediaData) && mediaData.length > 0 && fullWidthImageFrame(mediaData)}
          <ProjectGallery images={mediaData} title={title} />
        </>
      );
    case 'outcomes':
    case 'takeaways':
      // Full-width outcomes/takeaways
      return fullWidthBox(
        <>
          {headingElement}
          {renderOutcomesTakeaways()}
        </>
      );
    case 'textOnly':
      // Full-width text section, with optional images
      return fullWidthBox(
        <>
          {headingElement}
          {Array.isArray(mediaData) && mediaData.length > 0 && fullWidthImageFrame(mediaData)}
          {content && (React.isValidElement(content) ? content : <ProjectContentRenderer content={content} variant="body1" />)}
          {renderOutcomesTakeaways()}
        </>
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
      // Full-width research section, two-column if you want, but keep maxWidth and padding
      return fullWidthBox(
        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            {headingElement}
            {content && (
              React.isValidElement(content)
                ? content
                : <ProjectContentRenderer content={content} variant="body1" />
            )}
          </Grid>
          <Grid item xs={12} md={5}>
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
      // ...existing code for split layout...
      const textContentElement = (
        <Grid container justifyContent="center">
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
                <ProjectActionButtonsBar actions={children} layout="row" />
              </Box>
            )}
          </Box>
        </Grid>
      );
      let mediaElement = null;
      if (Array.isArray(mediaData) && mediaData.length > 0) {
        mediaElement = (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {mediaData.slice(0, 1).map((img, idx) => (
              <ContentAwareImage
                key={idx}
                src={img.src || img}
                alt={img.alt || title || 'Project media'}
                containerHeight="100%"
                containerWidth="100%"
                aspect={img.aspect || 'landscape'}
                sx={{ borderRadius: theme.shape.borderRadius }}
              />
            ))}
          </Box>
        );
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
                sx={{ borderRadius: theme.shape.borderRadius }}
              />
            )}
          </Box>
        );
      }
      if (isTextOnly) {
        return fullWidthBox(textContentElement);
      }
      if (isMediaOnly) {
        return fullWidthBox(mediaElement);
      }
      return (
        <Grid
          id={`project-section-grid-${id || sectionIndex}`}
          container
          spacing={{ xs: 4, md: 6 }}
          sx={{ mb: 6, maxWidth: '1200px', mx: 'auto', px: { xs: 2, sm: 3, md: 4 } }}
          alignItems="stretch"
        >
          <Grid
            item
            xs={12}
            md={6}
            sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'left' }}
            order={{ xs: 1, md: isReverse ? 2 : 1 }}
          >
            {textContentElement}
          </Grid>
          {mediaElement && (
            <Grid
              item
              xs={12}
              md={6}
              sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
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
