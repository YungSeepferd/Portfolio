import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Box, Typography, Card, CardContent, useTheme } from '@mui/material';
import { formatProjectTags } from '../../utils/dataHelpers';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import ContentAwareImage from '../common/ContentAwareImage';
import SkillTag from '../common/SkillTag'; // Add this import

/**
 * Enhanced project card with lazy loading and proper animations
 */
const ProjectCard = ({ project, skillTags, onClick, showAllTags = false }) => {
  const theme = useTheme();
  const cardRef = useRef(null);
  const isVisible = useIntersectionObserver(cardRef, { threshold: 0.1 });
  const [isLoaded, setIsLoaded] = useState(false);
  
  if (!project) return null;
  
  // Modify to show all tags if showAllTags is true
  const { tags, remaining } = showAllTags 
    ? { tags: project.categories, remaining: 0 }
    : formatProjectTags(project.categories, skillTags, 2);
  
  const coverImage = project.images?.[0] || project.media;
  
  // Animation variants for smooth appearance
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: 'easeOut' 
      }
    }
  };

  return (
    <Box ref={cardRef} sx={{ height: '100%', display: 'flex', aspectRatio: '1/1' }}> {/* Add aspectRatio for square shape */}
      {isVisible && (
        <motion.div
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={cardVariants}
          whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
          onClick={() => onClick(project)}
          style={{ 
            cursor: 'pointer',
            height: '100%',
            opacity: isLoaded ? 1 : 0,
            width: '100%',
            display: 'flex',
          }}
        >
          <Card 
            className="project-card"
            sx={{ 
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              width: '100%',
              overflow: 'hidden',
              borderRadius: theme.shape.borderRadius, // Fixed the typo here - removed the trailing 's'
              boxShadow: `0 8px 16px ${theme.palette.shadow.light}`,
              transition: `transform ${theme.palette.transitions.short} ease, box-shadow ${theme.palette.transitions.short} ease`,
              '&:hover': {
                boxShadow: `0 16px 32px ${theme.palette.shadow.medium}`,
              },
            }}
          >
            <Box 
              className="project-card-media"
              sx={{
                position: 'relative',
                width: '100%',
                height: '50%', // Adjusted to be 50% of the card height for better proportions
                flexShrink: 0,
                overflow: 'hidden',
              }}
            >
              <ContentAwareImage
                imageData={coverImage}
                src={typeof coverImage === 'string' ? coverImage : coverImage?.src}
                alt={project.title}
                onLoad={() => setIsLoaded(true)}
                containerHeight="100%"
                containerOrientation="landscape"
                objectFit="cover"
              />
            </Box>
            
            <CardContent 
              className="project-card-content"
              sx={{ 
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                p: 3, // Adjusted padding for better proportions
                height: 'auto',
                minHeight: '50%', // Ensure content takes at least 50% of height
              }}
            >
              <Typography 
                variant="h5" 
                className="project-card-title"
                sx={{
                  mb: 3, // Increased margin bottom from 2 to 3
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  lineHeight: 1.3,
                  height: '2.6em',
                  fontWeight: 600,
                  color: theme.palette.primary.main,
                }}
              >
                {project.title}
              </Typography>
              
              <Typography 
                variant="body2" 
                className="project-card-description"
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 3, // Reduced from 4 to 3 lines to fit square format
                  WebkitBoxOrient: 'vertical',
                  color: theme.palette.text.secondary,
                  lineHeight: 1.5,
                  flexGrow: 1,
                  fontSize: '0.95rem',
                  mb: 2, // Reduced margin bottom
                }}
              >
                {project.description}
              </Typography>
              
              <Box 
                className="project-card-tags"
                sx={{ 
                  display: 'flex', 
                  flexWrap: 'wrap',
                  gap: 1, // Increased gap between tags from 0.75 to 1
                  overflowX: { xs: 'auto', md: 'visible' },
                  padding: theme.spacing(2, 0), // Vertical padding only
                  marginTop: theme.spacing(2),
                  paddingTop: theme.spacing(2),
                  borderTop: `1px solid ${theme.palette.divider}`,
                  flexShrink: 0,
                }}
              >
                {tags.map((tag, idx) => (
                  <SkillTag
                    key={idx}
                    label={tag}
                    size="small"
                    onClick={(e) => e.stopPropagation()} // Prevent card click when clicking tag
                  />
                ))}
                
                {remaining > 0 && (
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: '0.75rem',
                      py: 0.5,
                      px: 1,
                      color: theme.palette.text.secondary,
                    }}
                  >
                    +{remaining} more
                  </Typography>
                )}
              </Box>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </Box>
  );
};

export default ProjectCard;