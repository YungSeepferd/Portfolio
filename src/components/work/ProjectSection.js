import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import ContentAwareImage from '../common/ContentAwareImage';
import { isVideo } from '../../utils/mediaHelper';
import VideoPlayer from '../common/VideoPlayer';

/**
 * ProjectSection Component
 * 
 * Displays a section of a project with consistent formatting including:
 * - Section number
 * - Section title
 * - Content (React nodes or text)
 * - Media (image or video) with proper formatting
 * 
 * @param {Object} props
 * @param {string|number} props.sectionNumber - The section number (e.g., "01", "02")
 * @param {string} props.title - The section title
 * @param {string} props.titleVariant - MUI Typography variant for the title
 * @param {string} props.titleComponent - HTML element to use for the title
 * @param {React.ReactNode} props.content - The section content
 * @param {string|Object|Array} props.imageData - The image or video to display
 * @param {string} props.direction - Layout direction ("default" or "reverse")
 * @param {string} props.headingColor - Color for the section heading
 * @param {string} props.accentColor - Accent color for the section number
 * @param {React.ReactNode} props.fallbackContent - Content to display if no content is provided
 */
const ProjectSection = ({
  sectionNumber,
  title,
  titleVariant = 'h3',
  titleComponent = 'h3',
  content,
  imageData,
  direction = 'default',
  headingColor,
  accentColor,
  fallbackContent
}) => {
  const theme = useTheme();
  
  // Format section number
  const formattedNumber = typeof sectionNumber === 'number' 
    ? sectionNumber.toString().padStart(2, '0')
    : sectionNumber || "01";
  
  // Determine if media is a video
  const isMediaVideo = imageData && (
    (typeof imageData === 'object' && imageData.type === 'video') ||
    (typeof imageData === 'string' && isVideo(imageData))
  );
  
  // Extract video source if media is a video
  const videoSrc = isMediaVideo 
    ? (typeof imageData === 'string' ? imageData : imageData.src)
    : null;
  
  // Extract image source if media is an image
  const imageSrc = !isMediaVideo && imageData
    ? (typeof imageData === 'string' 
       ? imageData 
       : Array.isArray(imageData) 
         ? (typeof imageData[0] === 'string' ? imageData[0] : imageData[0]?.src) 
         : imageData?.src)
    : null;
  
  // Determine layout based on direction prop
  const isReverse = direction === 'reverse';
  
  return (
    <Box 
      component="section"
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        py: 4
      }}
    >
      {/* Section number */}
      <Typography 
        variant="h5" 
        sx={{ 
          color: accentColor || theme.palette.primary.main,
          fontWeight: 600,
          mb: 2
        }}
      >
        {formattedNumber}
      </Typography>
      
      {/* Section title */}
      <Typography 
        variant={titleVariant} 
        component={titleComponent} 
        sx={{ 
          mb: 3,
          color: headingColor || theme.palette.text.primary
        }}
      >
        {title}
      </Typography>
      
      {/* Content and media in responsive layout */}
      <Box 
        sx={{ 
          display: 'grid',
          gridTemplateColumns: { 
            xs: '1fr', 
            md: imageData ? '1fr 1fr' : '1fr' 
          },
          gap: 4,
          '& > *:nth-of-type(1)': {
            order: { 
              xs: 0, 
              md: isReverse && imageData ? 1 : 0 
            }
          },
          '& > *:nth-of-type(2)': {
            order: { 
              xs: 1, 
              md: isReverse && imageData ? 0 : 1 
            }
          }
        }}
      >
        {/* Text content */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {content ? (
            <>{content}</>
          ) : fallbackContent ? (
            <>{fallbackContent}</>
          ) : (
            <Typography variant="body1">
              This section provides details about {title.toLowerCase()}.
            </Typography>
          )}
        </Box>
        
        {/* Media content (if provided) */}
        {imageData && (
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            sx={{ 
              height: { xs: '250px', sm: '300px', md: '100%' },
              minHeight: { md: '300px' },
              borderRadius: theme.shape.borderRadius,
              overflow: 'hidden',
              boxShadow: theme.shadows[2]
            }}
          >
            {isMediaVideo ? (
              <VideoPlayer
                src={videoSrc}
                title={`${title} video`}
                autoplay={false}
                loop={true}
                controls={true}
                height="100%"
              />
            ) : (
              <ContentAwareImage
                imageData={imageData}
                src={imageSrc}
                alt={`${title}`}
                containerHeight="100%"
                containerOrientation="landscape"
              />
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProjectSection;
