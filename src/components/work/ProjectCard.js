import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import ContentAwareImage from '../common/ContentAwareImage';
import ProjectCardPreview from './ProjectCardPreview'; // Import the preview component
import TagList from '../common/TagList'; // Import TagList

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

  const { title, description, heroMedia, tags = [], technologies = [], tools = [], links = {} } = project;

  // Determine image source from heroMedia
  const imageSrc = heroMedia?.src || 'https://via.placeholder.com/400x250?text=Project+Image+Not+Found'; // Fallback image

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
            onError={(e) => console.error(`Failed to load image for ${title}: ${imageSrc}`, e)}
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
          {/* Display Tags */}
          <TagList tags={tags} />
        </CardContent>

        {/* Hover Overlay using ProjectCardPreview */}
        <ProjectCardPreview
          isVisible={isHovered}
          technologies={technologies}
          tools={tools}
          links={links}
        />
      </Card>
    </motion.div>
  );
};

export default ProjectCard;