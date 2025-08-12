import React from 'react';
import {
  Box,
  Typography,
  Grid,
  useTheme,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from '@mui/material';
import { motion } from 'framer-motion';
import { ResponsiveImage } from '../common/ResponsiveImage';
import VideoPlayer from '../common/VideoPlayer';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ProjectContentRenderer from './ProjectContentRenderer';
import ProjectGallery from './ProjectGallery';
import { ProjectActionButtonsBar } from './ProjectMetaBar';
import PropTypes from 'prop-types';
import sectionPropTypes from './sectionPropTypes';
import { isVideo } from '../../services/ImageService';

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
  type,
  sx = {},
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
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
        alignItems: 'flex-start', // Left align
        justifyContent: 'center', // Center vertically if needed
        textAlign: 'left',
        width: '100%',
        mb: { xs: 2.5, md: 3 }, // Increased bottom margin for better spacing
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
            fontSize: { xs: '0.95rem', sm: '1.1rem' }, // Smaller on mobile devices
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
            fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' }, // Responsive font size
            lineHeight: { xs: 1.3, sm: 1.4 }, // Tighter line height on mobile
            overflowWrap: 'break-word', // Allow long words to break
            wordWrap: 'break-word',
            hyphens: 'auto',
            maxWidth: '100%', // Ensure text doesn't overflow container
          }}
        >
          {title}
        </Typography>
      )}
    </Box>
  );

  // Helper: Render outcomes and takeaways side-by-side or stacked (always stacked on mobile)
  const renderOutcomesTakeaways = () => {
    if (!outcomes && !takeaways) return null;
    const isSideBySide = !isMobile && (layout === 'sideBySide' || layout === 'outcomesTakeaways');
    return (
      <Grid
        container
        spacing={isMobile ? 2 : 4}
        sx={{ mt: 2, mb: 2 }}
        direction={isSideBySide ? 'row' : 'column'}
      >
        {takeaways && takeaways.length > 0 && (
          <Grid item xs={12} md={isSideBySide ? 6 : 12}>
            <Typography
              variant="h6"
              sx={{
                mb: isMobile ? 1 : 2,
                color: theme.palette.text.secondary,
                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }, // Smaller on mobile
                fontWeight: 500,
              }}
            >
              Key Takeaways
            </Typography>
            <List
              dense
              disablePadding
              sx={{
                '& .MuiListItem-root': {
                  mb: isMobile ? 0.5 : 1,
                  alignItems: 'flex-start',
                },
              }}
            >
              {takeaways.map((item, idx) => (
                <ListItem key={idx} disableGutters>
                  <ListItemIcon
                    sx={{
                      minWidth: isMobile ? '24px' : '32px',
                      mt: isMobile ? '3px' : '1px',
                      '& .MuiSvgIcon-root': {
                        fontSize: isMobile ? '1.1rem' : '1.25rem',
                      },
                    }}
                  >
                    <StarBorderIcon fontSize={isMobile ? 'small' : 'medium'} color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={item}
                    primaryTypographyProps={{
                      variant: 'body1',
                      sx: {
                        fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1rem' },
                        lineHeight: { xs: 1.4, sm: 1.6 },
                        overflowWrap: 'break-word',
                        wordWrap: 'break-word',
                        hyphens: 'auto',
                      },
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
        )}

        {outcomes && outcomes.points && outcomes.points.length > 0 && (
          <Grid item xs={12} md={isSideBySide ? 6 : 12}>
            <Typography
              variant="h6"
              sx={{
                mb: isMobile ? 1 : 2,
                color: theme.palette.text.secondary,
                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }, // Smaller on mobile
                fontWeight: 500,
              }}
            >
              {outcomes.title || 'Project Outcomes'}
            </Typography>
            <List
              dense
              disablePadding
              sx={{
                '& .MuiListItem-root': {
                  mb: isMobile ? 0.5 : 1,
                  alignItems: 'flex-start',
                },
              }}
            >
              {outcomes.points.map((point, idx) => (
                <ListItem key={idx} disableGutters>
                  <ListItemIcon
                    sx={{
                      minWidth: isMobile ? '24px' : '32px',
                      mt: isMobile ? '3px' : '1px',
                      '& .MuiSvgIcon-root': {
                        fontSize: isMobile ? '1.1rem' : '1.25rem',
                      },
                    }}
                  >
                    <CheckCircleOutlineIcon
                      fontSize={isMobile ? 'small' : 'medium'}
                      color="success"
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={point}
                    primaryTypographyProps={{
                      variant: 'body1',
                      sx: {
                        fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1rem' },
                        lineHeight: { xs: 1.4, sm: 1.6 },
                        overflowWrap: 'break-word',
                        wordWrap: 'break-word',
                        hyphens: 'auto',
                      },
                    }}
                  />
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
        maxWidth: theme.breakpoints.values.lg,
        mx: 'auto',
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 3, sm: 4, md: 5 },
        mb: { xs: 4, sm: 5, md: 6 },
        background: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[2],
        minHeight: { xs: 150, sm: 280, md: 320 }, // Smaller minimum height on mobile
        boxSizing: 'border-box', // Ensure padding is included in height
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        overflow: 'hidden', // Prevent content overflow
        width: '100%', // Take full width of container
        ...sx,
      }}
    >
      {children}
    </Box>
  );

  // Helper for rendering media frames
  const renderMediaContent = (media, aspectRatio = 16 / 9) => {
    if (!media) return null;

    // Handle case where media is direct video/image source
    const mediaObj = typeof media === 'string' ? { src: media } : media;
    const isVideoContent = isVideo(mediaObj.src || mediaObj);
    const isIframeContent = mediaObj.type === 'iframe';

    return (
      <Box
        sx={{
          width: '100%',
          aspectRatio,
          minHeight: { xs: 180, sm: 220, md: 320 }, // Reduced height on mobile
          maxHeight: isIframeContent
            ? { xs: 450, sm: 500, md: 600, lg: 700 }
            : { xs: 400, md: 500, lg: 600 }, // Higher max for iframes
          overflow: 'hidden',
          borderRadius: theme.shape.borderRadius,
          backgroundColor: theme.palette.background.default,
          position: 'relative',
        }}
      >
        {isIframeContent ? (
          <Box
            component="iframe"
            src={mediaObj.src}
            title={mediaObj.alt || title || 'Embedded content'}
            allowFullScreen={true}
            frameBorder="0"
            loading="lazy"
            sx={{
              width: '100%',
              height: '100%',
              border: 'none',
              borderRadius: theme.shape.borderRadius,
              backgroundColor: theme.palette.background.default,
            }}
          />
        ) : isVideoContent ? (
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
          <ResponsiveImage
            src={mediaObj.src}
            alt={mediaObj.alt || title}
            containerHeight="100%"
            containerWidth="100%"
            aspectRatio={mediaObj.aspect === 'portrait' ? 3/4 : mediaObj.aspect === 'square' ? 1 : 16/9}
            objectFit="cover"
            fallbackSrc="/assets/images/placeholders/project.jpg"
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
      return (
        <Box
          sx={{
            mb: { xs: 2.5, md: 3 },
            maxWidth: '100%', // Ensure media never exceeds container width
            overflow: 'hidden', // Hide overflow
          }}
        >
          {renderMediaContent(mediaArray[0])}
        </Box>
      );
    }

    // Multiple images: dynamic grid that adapts to screen size
    // Reduce columns on smaller screens
    const columns = isMobile ? 1 : isTablet ? 2 : Math.min(mediaArray.length, 3);

    return (
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: { xs: 1.5, sm: 2, md: 2.5 },
          mb: { xs: 2.5, md: 3 },
          width: '100%',
          maxWidth: '100%', // Prevent overflow
          overflowX: 'hidden', // Hide horizontal overflow
        }}
      >
        {mediaArray.slice(0, 6).map((media, idx) => (
          <Box
            key={idx}
            sx={{
              overflow: 'hidden',
              borderRadius: theme.shape.borderRadius,
              boxShadow: theme.shadows[1],
              background: theme.palette.background.default,
            }}
          >
            {renderMediaContent(media, media.aspect === 'portrait' ? 3 / 4 : 16 / 9)}
          </Box>
        ))}
      </Box>
    );
  };

  // --- Specialized section layout for iframe or fullMedia content ---
  if (layout === 'fullMedia') {
    return fullWidthBox(
      <>
        {headingElement}
        {content && (
          <Box
            sx={{
              overflowWrap: 'break-word',
              wordWrap: 'break-word',
              width: '100%',
              mb: 3,
            }}
          >
            {React.isValidElement(content) ? (
              content
            ) : (
              <ProjectContentRenderer content={content} variant="body1" />
            )}
          </Box>
        )}
        {mediaData && (
          <Box
            sx={{
              width: '100%',
              height: mediaData.type === 'iframe' ? { xs: '50vh', sm: '60vh', md: '70vh' } : 'auto',
              minHeight: { xs: 300, sm: 400, md: 500 },
              maxHeight: { xs: 500, sm: 600, md: 700 },
              borderRadius: theme.shape.borderRadius,
              overflow: 'hidden',
              boxShadow: theme.shadows[2],
            }}
          >
            {renderMediaContent(mediaData, mediaData.aspect === 'portrait' ? 4 / 5 : 16 / 9)}
          </Box>
        )}
        {children && (
          <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            <ProjectActionButtonsBar actions={children} layout="row" />
          </Box>
        )}
      </>
    );
  }

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
          {content && (
            <Box
              sx={{
                overflowWrap: 'break-word',
                wordWrap: 'break-word',
                width: '100%',
              }}
            >
              {React.isValidElement(content) ? (
                content
              ) : (
                <ProjectContentRenderer content={content} variant="body1" />
              )}
            </Box>
          )}
        </>
      );

    // --- Gallery specific section ---
    case 'gallery':
      return fullWidthBox(
        <>
          {headingElement}
          {content && (
            <Box
              sx={{
                overflowWrap: 'break-word',
                wordWrap: 'break-word',
                width: '100%',
                mb: 2,
              }}
            >
              {React.isValidElement(content) ? (
                content
              ) : (
                <ProjectContentRenderer content={content} variant="body1" />
              )}
            </Box>
          )}
          {Array.isArray(mediaData) && mediaData.length > 0 && (
            <ProjectGallery images={mediaData} title={title || 'Project Gallery'} />
          )}
        </>
      );

    // --- Media Gallery showcase ---
    case 'showcase':
      return fullWidthBox(
        <>
          {headingElement}
          {Array.isArray(mediaData) && mediaData.length > 1 ? (
            <ProjectGallery images={mediaData} title={title || 'Project Showcase'} />
          ) : (
            <>
              {Array.isArray(mediaData) && mediaData.length === 1 && fullWidthImageFrame(mediaData)}
              {mediaData && !Array.isArray(mediaData) && fullWidthImageFrame([mediaData])}
            </>
          )}
          {content && (
            <Box
              sx={{
                overflowWrap: 'break-word',
                wordWrap: 'break-word',
                width: '100%',
                mt: 2,
              }}
            >
              {React.isValidElement(content) ? (
                content
              ) : (
                <ProjectContentRenderer content={content} variant="body1" />
              )}
            </Box>
          )}
        </>
      );

    // --- Fallback: text/media split layout ---
    case 'textLeft':
    case 'textRight':
    default:
      // Define the content element with proper overflow handling
      const textContentElement = (
        <Box
          component={motion.div}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
          id={id}
          sx={{
            width: '100%',
            maxWidth: '100%',
            overflowWrap: 'break-word',
            wordWrap: 'break-word',
            hyphens: 'auto',
            px: { xs: 0, sm: 0.5, md: 1 }, // Reduced padding on mobile to prevent overflow
          }}
        >
          {headingElement}
          {content && (
            <Box
              sx={{
                fontSize: { xs: '0.95rem', sm: '1rem', md: '1rem' },
                lineHeight: { xs: 1.5, sm: 1.6 },
                width: '100%',
              }}
            >
              {React.isValidElement(content) ? (
                content
              ) : (
                <ProjectContentRenderer content={content} variant="body1" />
              )}
            </Box>
          )}
          {renderOutcomesTakeaways()}
          {children && (
            <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <ProjectActionButtonsBar actions={children} layout="row" />
            </Box>
          )}
        </Box>
      );

      let mediaElement = null;
      if (Array.isArray(mediaData) && mediaData.length > 0) {
        mediaElement = (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: { xs: 1.5, md: 2 },
              width: '100%',
              height: '100%',
            }}
          >
            {mediaData.slice(0, isMobile ? 1 : 2).map((img, idx) => (
              <ResponsiveImage
                key={idx}
                src={img.src || img}
                alt={img.alt || title || 'Project media'}
                containerHeight="100%"
                containerWidth="100%"
                aspectRatio={img.aspect === 'portrait' ? 3/4 : img.aspect === 'square' ? 1 : 16/9}
                objectFit="cover"
                fallbackSrc="/assets/images/placeholders/project.jpg"
              />
            ))}
          </Box>
        );
      } else if (mediaData?.src) {
        const aspect = mediaData.aspect || 'landscape';
        const aspectRatioMap = { portrait: 3 / 4, landscape: 16 / 9, square: 1 };
        const aspectRatio = aspectRatioMap[aspect] || aspectRatioMap.landscape;
        mediaElement = (
          <Box
            component={motion.div}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.1 } },
            }}
            sx={{
              width: '100%',
              aspectRatio: aspectRatio,
              minHeight: { xs: 200, sm: 240, md: 320 },
              maxHeight: { xs: 350, md: 450, lg: 600 },
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
              <ResponsiveImage
                src={mediaData.src}
                alt={mediaData.alt || title || 'Project media'}
                containerHeight="100%"
                containerWidth="100%"
                aspectRatio={aspect === 'portrait' ? 3/4 : aspect === 'square' ? 1 : 16/9}
                objectFit="cover"
                fallbackSrc="/assets/images/placeholders/project.jpg"
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

      // On mobile, always stack content with text first, then media
      if (isMobile) {
        return fullWidthBox(
          <>
            {textContentElement}
            {mediaElement && <Box sx={{ mt: 3, width: '100%' }}>{mediaElement}</Box>}
          </>
        );
      }

      // On larger screens, use the grid layout
      return (
        <Grid
          id={`project-section-grid-${id || sectionIndex}`}
          container
          spacing={{ xs: 2, sm: 3, md: 4 }} // Reduced spacing on mobile
          sx={{
            mb: { xs: 4, sm: 5, md: 6 },
            maxWidth: '100%', // Ensure grid respects container width
            mx: 'auto',
            px: { xs: 1, sm: 2, md: 3 }, // Less padding on mobile
            minHeight: { xs: 150, sm: 280, md: 320 },
            boxSizing: 'border-box',
            alignItems: 'stretch',
            overflow: 'hidden', // Hide overflow
          }}
          alignItems="stretch"
        >
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: { xs: 'center', md: 'flex-start' },
              p: { xs: 2, sm: 2.5, md: 3 },
            }}
            order={{ xs: 1, md: isReverse ? 2 : 1 }}
          >
            {textContentElement}
          </Grid>

          {mediaElement && (
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                p: { xs: 2, sm: 2.5, md: 3 },
              }}
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
  sectionNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node,
  fallbackContent: PropTypes.node,
  sx: PropTypes.object,
};

export default ProjectSection;
