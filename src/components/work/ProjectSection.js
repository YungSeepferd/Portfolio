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
 * ProjectSection Component (Schema-based, type-driven)
 *
 * Renders a project section based on its type and schema.
 */
const ProjectSection = ({ section, sectionIndex, sx = {} }) => {
  const theme = useTheme();
  if (!section) return null;

  // Destructure schema fields
  const {
    id,
    type = 'default',
    title,
    subtitle,
    content,
    media,
    layout = 'textLeft',
    takeaways,
    outcomes,
    actions,
    anchor,
    navigable = true,
    customComponent,
    ...rest
  } = section;

  // Section anchor for deep-linking
  const sectionId = anchor || id || `section-${sectionIndex}`;

  // Section heading
  const headingElement = title && (
    <Box>
      <Typography
        variant="h3"
        component="h3"
        id={sectionId}
        tabIndex={-1}
        sx={{ mb: 2, scrollMarginTop: '80px' }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>{subtitle}</Typography>
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

  // Type-based rendering
  switch (type) {
    case 'gallery':
      return (
        <Box id={sectionId} sx={{ my: 6, ...sx }} role="region" aria-labelledby={sectionId}>
          {headingElement}
          <ProjectGallery images={media} title={title} />
        </Box>
      );
    case 'outcomes':
      return (
        <Box id={sectionId} sx={{ my: 6, ...sx }} role="region" aria-labelledby={sectionId}>
          {headingElement}
          {renderOutcomesTakeaways()}
        </Box>
      );
    case 'takeaways':
      return (
        <Box id={sectionId} sx={{ my: 6, ...sx }} role="region" aria-labelledby={sectionId}>
          {headingElement}
          {renderOutcomesTakeaways()}
        </Box>
      );
    case 'prototype':
      // Placeholder: Replace with your PrototypeShowcase component if available
      return (
        <Box id={sectionId} sx={{ my: 6, ...sx }} role="region" aria-labelledby={sectionId}>
          {headingElement}
          {/* <PrototypeShowcase ... /> */}
          <Typography variant="body2">[Prototype embed coming soon]</Typography>
        </Box>
      );
    case 'custom':
      return (
        <Box id={sectionId} sx={{ my: 6, ...sx }} role="region" aria-labelledby={sectionId}>
          {headingElement}
          {customComponent}
        </Box>
      );
    case 'research':
      return (
        <Grid container spacing={4} sx={{ ...sx }} id={sectionId}>
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
      return (
        <Box sx={{ ...sx, display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }} id={sectionId}>
          {headingElement}
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
      return (
        <Box sx={{ ...sx, width: '100%', textAlign: 'center' }} id={sectionId}>
          {headingElement}
          <Box sx={{ my: 2 }}>
            <iframe
              title="Figma Prototype"
              src={typeof content === 'string' ? content : (media?.src || '')}
              width="100%"
              height="500"
              style={{ border: 0, borderRadius: 8 }}
              allowFullScreen
            />
          </Box>
        </Box>
      );
    case 'default':
    default:
      const isReverse = layout === 'textRight';
      const isTextOnly = layout === 'textOnly';
      const isMediaOnly = layout === 'mediaOnly';
      let mediaElement = null;
      if (Array.isArray(media) && media.length > 0) {
        mediaElement = <ProjectGallery images={media} title={title} />;
      } else if (media?.src) {
        const aspect = media.aspect || 'landscape';
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
            {media.type === 'video' ? (
              <VideoPlayer
                src={media.src}
                containerHeight="100%"
                containerWidth="100%"
                controls={true}
                muted={true}
              />
            ) : (
              <ContentAwareImage
                src={media.src}
                alt={media.alt || title || 'Project media'}
                containerHeight="100%"
                containerWidth="100%"
                aspect={aspect}
              />
            )}
          </Box>
        );
      }
      const textContentElement = (
        <Box
          component={motion.div}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
          id={sectionId}
        >
          {headingElement}
          {content && (React.isValidElement(content) ? content : <ProjectContentRenderer content={content} variant="body1" />)}
          {renderOutcomesTakeaways()}
          {actions && actions.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <ActionButtonGroup actions={actions} layout="row" />
            </Box>
          )}
        </Box>
      );
      if (isTextOnly) {
        return <Box id={sectionId} sx={{ ...sx }}>{textContentElement}</Box>;
      }
      if (isMediaOnly) {
        return <Box id={sectionId} sx={{ ...sx }}>{mediaElement}</Box>;
      }
      return (
        <Grid container spacing={{ xs: 4, md: 6 }} sx={{ ...sx }} alignItems="center" id={sectionId} {...rest}>
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
