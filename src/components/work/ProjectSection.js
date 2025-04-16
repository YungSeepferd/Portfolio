import React from 'react';
import { Box, Typography, Grid, useTheme, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { motion } from 'framer-motion';
import ContentAwareImage from '../common/ContentAwareImage';
import VideoPlayer from '../common/VideoPlayer';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ProjectContentRenderer from './ProjectContentRenderer';

/**
 * ProjectSection Component
 *
 * Displays a single section of a project, supporting alternating text/media layouts,
 * and rendering key takeaways or project outcomes.
 */
const ProjectSection = ({
  id,
  title,
  content,
  mediaData, // Expects { type: 'image'/'video', src: '...', alt: '...' }
  takeaways, // Array of strings or objects for key takeaways
  outcomes, // Object { title (optional), points: [] } for project outcomes
  layout = 'textLeft', // 'textLeft', 'textRight', 'textOnly', 'mediaOnly'
  fallbackContent,
  children,
  sectionNumber, // Section number for display (01, 02, etc.)
  sectionIndex, // Alternative: automatically generate section number from index
  sx = {}
}) => {
  const theme = useTheme();
  const isReverse = layout === 'textRight';
  const isTextOnly = layout === 'textOnly';
  const isMediaOnly = layout === 'mediaOnly';

  // Format section number (from prop or generated from index)
  const formattedNumber = useSectionNumber(sectionNumber, sectionIndex);

  // Animation variants
  const textAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  const mediaAnimation = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.1 } }
  };

  // Prepare heading element
  const headingElement = title ? (
    <Box>
      {/* Section number */}
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
      
      {/* Section title */}
      <Typography
        variant="h4"
        component="h3"
        sx={{
          mb: 3,
          fontWeight: 600,
          color: theme.palette.text.primary,
        }}
      >
        {title}
      </Typography>
    </Box>
  ) : null;

  // Prepare media element
  const mediaElement = mediaData?.src ? (
    <Box
      component={motion.div}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={mediaAnimation}
      sx={{
        width: '100%',
        height: { xs: '300px', sm: '400px', md: 'auto' }, // Adjust height for different screens
        minHeight: { md: '400px' },
        maxHeight: { md: '600px' }, // Limit max height on larger screens
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
        />
      )}
    </Box>
  ) : null;

  // Prepare text content element, including children, content, takeaways and outcomes
  const textContentElement = (
    <Box
      component={motion.div}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={textAnimation}
      id={id}
    >
      {/* Include heading */}
      {headingElement}

      {/* Direct children if provided */}
      {children && <>{children}</>}

      {/* Render content using ProjectContentRenderer if it's not already a React element */}
      {content && (
        React.isValidElement(content) 
          ? content 
          : <ProjectContentRenderer content={content} variant="body1" />
      )}

      {/* Render Key Takeaways if provided */}
      {takeaways && takeaways.length > 0 && (
        <Box sx={{ mt: content ? 3 : 0 }}>
          <Typography variant="h6" sx={{ mb: 2, color: theme.palette.text.secondary }}>
            Key Takeaways
          </Typography>
          <List dense disablePadding>
            {takeaways.map((item, index) => (
              <ListItem key={index} disableGutters>
                <ListItemIcon sx={{ minWidth: '32px' }}>
                  <StarBorderIcon fontSize="small" color="primary" />
                </ListItemIcon>
                <ListItemText primary={item} primaryTypographyProps={{ variant: 'body1' }} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {/* Render Project Outcomes if provided */}
      {outcomes && outcomes.points && outcomes.points.length > 0 && (
        <Box sx={{ mt: (content || (takeaways && takeaways.length > 0)) ? 3 : 0 }}>
          <Typography variant="h6" sx={{ mb: 2, color: theme.palette.text.secondary }}>
            {outcomes.title || "Project Outcomes"}
          </Typography>
          <List dense disablePadding>
            {outcomes.points.map((point, index) => (
              <ListItem key={index} disableGutters>
                <ListItemIcon sx={{ minWidth: '32px' }}>
                  <CheckCircleOutlineIcon fontSize="small" color="success" />
                </ListItemIcon>
                <ListItemText primary={point} primaryTypographyProps={{ variant: 'body1' }} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {/* Fallback Content */}
      {!children && !content && (!takeaways || takeaways.length === 0) && (!outcomes || !outcomes.points || outcomes.points.length === 0) && fallbackContent && (
        <>{fallbackContent}</>
      )}

      {/* Default Fallback if nothing else is provided */}
      {!children && !content && (!takeaways || takeaways.length === 0) && (!outcomes || !outcomes.points || outcomes.points.length === 0) && !fallbackContent && !isMediaOnly && (
        <Typography variant="body1" color="text.secondary">
          Details for this section are currently unavailable.
        </Typography>
      )}
    </Box>
  );

  // Render based on layout
  if (isTextOnly) {
    return <Box id={id} sx={{ ...sx }}>{textContentElement}</Box>;
  }

  if (isMediaOnly) {
    return <Box id={id} sx={{ ...sx }}>{mediaElement}</Box>;
  }

  // Default: Text and Media layout
  return (
    <Grid container spacing={{ xs: 4, md: 6 }} sx={{ ...sx }} alignItems="center" id={id}>
      {/* Text Column */}
      <Grid
        item
        xs={12}
        md={mediaElement ? 6 : 12} // Take full width if no media
        order={{ xs: 1, md: isReverse ? 2 : 1 }} // Order changes based on layout
      >
        {textContentElement}
      </Grid>

      {/* Media Column */}
      {mediaElement && (
        <Grid
          item
          xs={12}
          md={6}
          order={{ xs: 2, md: isReverse ? 1 : 2 }} // Order changes based on layout
        >
          {mediaElement}
        </Grid>
      )}
    </Grid>
  );
};

// Helper function to format section numbers
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

export default ProjectSection;
