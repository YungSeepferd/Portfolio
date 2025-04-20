import React from 'react';
import { Box, Typography, Grid, useTheme, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { motion } from 'framer-motion';
import ContentAwareImage from '../common/ContentAwareImage';
import VideoPlayer from '../common/VideoPlayer';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ProjectContentRenderer from './ProjectContentRenderer';
import ProjectGallery from './ProjectGallery';
import { ProjectActionButtonsBar } from './ProjectMetaBar';
import PropTypes from 'prop-types';
import sectionPropTypes from './sectionPropTypes';
import { isVideo } from '../../utils/mediaUtils';

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
        minHeight: { xs: 220, sm: 320 }, // Enforce a minimum height for all sections
        boxSizing: 'border-box', // Ensure padding is included in height
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}
    >
      {children}
    </Box>
  );

  // Helper for rendering media frames
  const renderMediaContent = (media, aspectRatio = 16/9) => {
    if (!media) return null;

    // Handle case where media is direct video/image source
    const mediaObj = typeof media === 'string' ? { src: media } : media;
    const isVideoContent = isVideo(mediaObj);

    return (
      <Box
        sx={{
          width: '100%',
          aspectRatio,
          minHeight: { xs: 240, md: 320 },
          overflow: 'hidden',
          borderRadius: theme.shape.borderRadius,
          backgroundColor: theme.palette.background.default,
          position: 'relative'
        }}
      >
        {isVideoContent ? (
          <VideoPlayer
            src={mediaObj.src}
            poster={mediaObj.poster}
            containerWidth="100%"
            containerHeight="100%"
            autoplay={false}
            muted={true}
            controls={true}
            showOverlayControls={true}
          />
        ) : (
          <ContentAwareImage
            src={mediaObj.src}
            alt={mediaObj.alt || title}
            containerHeight="100%"
            containerWidth="100%"
            aspect={mediaObj.aspect || 'landscape'}
            sx={{ borderRadius: theme.shape.borderRadius }}
          />
        )}
      </Box>
    );
  };

  // Helper for full-width image/video frame
  const fullWidthImageFrame = (mediaArray) => {
    if (!mediaArray || mediaArray.length === 0) return null;

    // Single media item
    if (mediaArray.length === 1) {
      return renderMediaContent(mediaArray[0]);
    }

    // Up to 3 images in a row
    return (
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        {mediaArray.slice(0, 3).map((media, idx) => (
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
            {renderMediaContent(media)}
          </Box>
        ))}
      </Box>
    );
  };

  // --- Section type-based rendering ---
  switch (type) {
    // --- Text+Media (shared but explicit cases) ---
    case 'overview':
    case 'problem':
    case 'context':
    case 'motivation':
      return fullWidthBox(
        <>
          {headingElement}
          {Array.isArray(mediaData) && mediaData.length > 0 && fullWidthImageFrame(mediaData)}
          {mediaData && !Array.isArray(mediaData) && fullWidthImageFrame([mediaData])}
          {content && (React.isValidElement(content) ? content : <ProjectContentRenderer content={content} variant="body1" />)}
        </>
      );
    // --- Research/Methodology/Technical/Findings/Recommendations/Content/Concept/Impact/Benefits/Future ---
    case 'research':
    case 'methodology':
    case 'technical':
    case 'findings':
    case 'recommendations':
    case 'content':
    case 'concept':
    case 'impact':
    case 'benefits':
    case 'future':
      return fullWidthBox(
        <>
          {headingElement}
          {Array.isArray(mediaData) && mediaData.length > 0 && fullWidthImageFrame(mediaData)}
          {mediaData && !Array.isArray(mediaData) && fullWidthImageFrame([mediaData])}
          {content && (React.isValidElement(content) ? content : <ProjectContentRenderer content={content} variant="body1" />)}
          {renderOutcomesTakeaways()}
        </>
      );
    // --- Gallery ---
    case 'gallery':
      return fullWidthBox(
        <>
          {headingElement}
          {Array.isArray(mediaData) && mediaData.length > 0 && fullWidthImageFrame(mediaData)}
          <ProjectGallery images={mediaData} title={title} />
        </>
      );
    // --- Video ---
    case 'video':
      return fullWidthBox(
        <>
          {headingElement}
          {mediaData && mediaData.src && (
            <Box sx={{ mb: 3 }}>
              <VideoPlayer src={mediaData.src} containerHeight="100%" containerWidth="100%" controls muted />
            </Box>
          )}
          {content && (React.isValidElement(content) ? content : <ProjectContentRenderer content={content} variant="body1" />)}
        </>
      );
    // --- Outcomes/Takeaways ---
    case 'outcomes':
    case 'takeaways':
      return fullWidthBox(
        <>
          {headingElement}
          {renderOutcomesTakeaways()}
        </>
      );
    // --- Onboarding ---
    case 'onboarding':
      return fullWidthBox(
        <>
          {headingElement}
          {Array.isArray(mediaData) && mediaData.length > 0 && fullWidthImageFrame(mediaData)}
          {content && (React.isValidElement(content) ? content : <ProjectContentRenderer content={content} variant="body1" />)}
        </>
      );
    // --- Prototype ---
    case 'prototype':
      return fullWidthBox(
        <>
          {headingElement}
          {content && (React.isValidElement(content) ? content : <ProjectContentRenderer content={content} variant="body1" />)}
          {/* Optionally embed iframe or use PrototypeShowcase here */}
        </>
      );
    // --- Custom ---
    case 'custom':
      return (
        <Box id={id} sx={{ my: 6, ...sx }} role="region" aria-labelledby={id}>
          {headingElement}
          {children}
        </Box>
      );
    // --- Persona ---
    case 'persona':
      return fullWidthBox(
        <>
          {headingElement}
          <Box sx={{ py: 4, textAlign: 'center' }}>
            <Typography variant="h5" color="primary">Persona Section</Typography>
            <Typography variant="body2">(Add persona details here)</Typography>
          </Box>
        </>
      );
    // --- Testimonial ---
    case 'testimonial':
      return fullWidthBox(
        <>
          {headingElement}
          <Box sx={{ py: 4, textAlign: 'center' }}>
            <Typography variant="h5" color="secondary">Testimonial Section</Typography>
            <Typography variant="body2">(Add testimonial content here)</Typography>
          </Box>
        </>
      );
    // --- Timeline ---
    case 'timeline':
      return fullWidthBox(
        <>
          {headingElement}
          <Box sx={{ py: 4, textAlign: 'center' }}>
            <Typography variant="h5" color="info.main">Timeline Section</Typography>
            <Typography variant="body2">(Add timeline events here)</Typography>
          </Box>
        </>
      );
    // --- Research Highlight ---
    case 'researchHighlight':
      return fullWidthBox(
        <>
          {headingElement}
          <Box sx={{ py: 4, textAlign: 'center' }}>
            <Typography variant="h5" color="success.main">Research Highlight</Typography>
            <Typography variant="body2">(Add research highlight here)</Typography>
          </Box>
        </>
      );
    // --- Iteration ---
    case 'iteration':
      return fullWidthBox(
        <>
          {headingElement}
          {Array.isArray(mediaData) && mediaData.length > 0 && fullWidthImageFrame(mediaData)}
          {content && (
            <Box sx={{ mt: 3 }}>
              {React.isValidElement(content) ? content : (
                <ProjectContentRenderer content={content} variant="body1" />
              )}
            </Box>
          )}
          {takeaways && takeaways.length > 0 && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, color: theme.palette.text.secondary }}>
                Iteration Insights
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
            </Box>
          )}
          {outcomes && outcomes.points && outcomes.points.length > 0 && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, color: theme.palette.text.secondary }}>
                {outcomes.title || 'Iteration Outcomes'}
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
            </Box>
          )}
        </>
      );
    // --- Fallback: text/media split layout ---
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
          sx={{ 
            mb: 6, 
            maxWidth: '1200px', 
            mx: 'auto', 
            px: { xs: 2, sm: 3, md: 4 },
            minHeight: { xs: 220, sm: 320 }, // Enforce a minimum height for split layout
            boxSizing: 'border-box',
            alignItems: 'stretch',
            display: 'flex',
          }}
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

// Add validation against section schema
ProjectSection.propTypes = {
  ...sectionPropTypes.propTypes,
  // Additional props specific to ProjectSection component
  sectionIndex: PropTypes.number,
  sectionNumber: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  children: PropTypes.node,
  fallbackContent: PropTypes.node,
  sx: PropTypes.object
};

export default ProjectSection;
