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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start', // Center horizontally
        justifyContent: 'center', // Center vertically if needed
        textAlign: 'left', // Center text
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

  // Helper for full-width content box with consistent side padding
  const fullWidthBox = (children) => (
    <Box
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
    </Box>
  );

  // Helper for full-width image frame (single or up to 3 images)
  const fullWidthImageFrame = (mediaArr) => {
    if (!mediaArr || mediaArr.length === 0) return null;
    if (mediaArr.length === 1) {
      const img = mediaArr[0];
      return (
        <Box
          sx={{
            width: '100%',
            mb: 3,
            borderRadius: 3,
            overflow: 'hidden',
            boxShadow: theme.shadows[3],
            aspectRatio: '16/7',
            background: theme.palette.grey[100],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <ContentAwareImage
            src={img.src || img}
            alt={img.alt || 'Section image'}
            containerHeight="100%"
            containerWidth="100%"
            aspect={img.aspect || 'landscape'}
          />
        </Box>
      );
    }
    // Up to 3 images in a row
    return (
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        {mediaArr.slice(0, 3).map((img, idx) => (
          <Box
            key={idx}
            sx={{
              flex: 1,
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: theme.shadows[1],
              aspectRatio: '16/9',
              background: theme.palette.grey[100],
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ContentAwareImage
              src={img.src || img}
              alt={img.alt || `Section image ${idx + 1}`}
              containerHeight="100%"
              containerWidth="100%"
              aspect={img.aspect || 'landscape'}
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
                <ActionButtonGroup actions={children} layout="row" />
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
        <Grid container spacing={{ xs: 4, md: 6 }} sx={{ mb: 6, maxWidth: '1200px', mx: 'auto', px: { xs: 2, sm: 3, md: 4 } }} alignItems="stretch" id={id}>
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
