import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import ContentAwareImage from '../common/ContentAwareImage';
import ProjectCardPreview from './ProjectCardPreview';
import TagList from '../common/TagList';

/**
 * ProjectCard Component
 *
 * Displays a preview card for a project in the main grid.
 * Shows TechBar and Links on hover via ProjectCardPreview.
 */
const ProjectCard = ({ project, onClick }) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  if (!project) return null;

  const { 
    title, 
    description, 
    categories = [], 
    technologies = [], 
    links = [],
    cardVariant = 'default'
  } = project;

  // Handle links as either array or object for backward compatibility
  const linksArray = Array.isArray(links) ? links : 
                    (links && typeof links === 'object' ? Object.values(links) : []);

  // Determine image source with proper fallbacks and path resolution
  const getProjectImage = () => {
    // Try direct media object first
    if (project.media) {
      if (typeof project.media === 'string') {
        return project.media;
      }
      if (project.media.src) {
        return project.media.src;
      }
    }
    
    // Then try featuredImages.overview
    if (project.featuredImages?.overview) {
      if (typeof project.featuredImages.overview === 'string') {
        return project.featuredImages.overview;
      }
      if (typeof project.featuredImages.overview === 'object' && project.featuredImages.overview.src) {
        return project.featuredImages.overview.src;
      }
    }
    
    // Fall back to gallery image or placeholder
    if (project.galleryImages && project.galleryImages.length > 0) {
      const firstImage = project.galleryImages[0];
      if (typeof firstImage === 'string') {
        return firstImage;
      }
      if (firstImage && firstImage.src) {
        return firstImage.src;
      }
    }
    
    return 'https://via.placeholder.com/400x250?text=Project+Image+Not+Found';
  };

  const imageSrc = getProjectImage();
  
  // Animation for the card itself
  const cardVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      style={{ height: '100%' }} // Ensure motion div takes full height
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card
        onClick={() => onClick(project)}
        sx={{
          cursor: 'pointer',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative', // Needed for overlay positioning
          overflow: 'hidden', // Ensure overlay stays within bounds
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: theme.shadows[6],
          },
          // Apply variant styling if specified
          ...(cardVariant && cardVariant !== 'default' && {
            borderTop: `4px solid ${theme.palette[cardVariant]?.main || theme.palette.primary.main}`
          })
        }}
      >
        {/* Image */}
        <Box
          sx={{
            height: { xs: '200px', sm: '220px', md: '280px' }, // Increased height, responsive
            width: '100%',
            overflow: 'hidden',
          }}
        >
          <ContentAwareImage
            src={imageSrc}
            alt={`${title} preview`}
            containerHeight="100%"
            containerWidth="100%"
            objectFit="cover" // Ensure image covers the area
            onError={(e) => {
              console.error(`Failed to load image for ${title}: ${imageSrc}`, e);
              e.target.src = 'https://via.placeholder.com/400x250?text=Image+Not+Found';
            }}
          />
        </Box>

        {/* Content */}
        <CardContent
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            p: { xs: 2, md: 3 }, // Adjust padding
          }}
        >
          <Typography
            variant="h5" // Increased variant
            component="h3"
            gutterBottom
            sx={{ fontWeight: 600 }}
          >
            {title}
          </Typography>
          <Typography
            variant="body1" // Increased variant
            color="text.secondary"
            sx={{ mb: 2, flexGrow: 1 }}
          >
            {description}
          </Typography>
          {/* Display Categories as Tags */}
          {categories && categories.length > 0 && (
            <TagList tags={categories} />
          )}
        </CardContent>

        {/* Hover Overlay using ProjectCardPreview */}
        <ProjectCardPreview
          isVisible={isHovered}
          technologies={technologies}
          links={linksArray}
        />
      </Card>
    </motion.div>
  );
};

export default ProjectCard;