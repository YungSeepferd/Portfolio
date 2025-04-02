import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Box, Typography, Card, CardContent, useTheme } from '@mui/material';
import { formatProjectTags } from '../../utils/dataHelpers';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import ContentAwareImage from '../common/ContentAwareImage';
import SkillTag from '../common/SkillTag';

/**
 * Enhanced project card with lazy loading and proper animations
 * Updated to provide larger display and better text visibility
 */
const ProjectCard = ({ project, skillTags, onClick, showAllTags = false, isCompact = false, gridPosition }) => {
  const theme = useTheme();
  const cardRef = useRef(null);
  const isVisible = useIntersectionObserver(cardRef, { threshold: 0.1 });
  const [isLoaded, setIsLoaded] = useState(false);
  
  if (!project) return null;
  
  // Modify to show all tags if showAllTags is true
  const { tags, remaining } = showAllTags 
    ? { tags: project.categories, remaining: 0 }
    : formatProjectTags(project.categories, skillTags, isCompact ? 2 : 3);
  
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

  // Determine image height based on type
  const imageHeight = isCompact ? '45%' : '45%';
  const contentHeight = isCompact ? '55%' : '55%';
  
  return (
    <Box 
      ref={cardRef} 
      sx={{ 
        height: '100%', 
        display: 'flex',
        position: 'relative',
      }}
    >
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
              borderRadius: theme.shape.borderRadius,
              boxShadow: `0 8px 16px ${theme.palette.shadow.light}`,
              transition: `transform ${theme.animationSettings.durations.short}ms ease, box-shadow ${theme.animationSettings.durations.short}ms ease`,
              '&:hover': {
                boxShadow: `0 20px 40px ${theme.palette.shadow.medium}`,
              },
            }}
          >
            <Box 
              className="project-card-media"
              sx={{
                position: 'relative',
                width: '100%',
                height: imageHeight,
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
                p: { xs: 2.5, sm: 3, md: 3.5 }, // Responsive padding that increases with screen size
                height: 'auto',
                minHeight: contentHeight,
                justifyContent: 'space-between',
              }}
            >
              <Box>
                <Typography 
                  variant="h5" 
                  className="project-card-title"
                  sx={{
                    mb: 2.5,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    lineHeight: 1.3,
                    fontWeight: 600,
                    color: theme.palette.primary.main,
                    fontSize: { xs: '1.3rem', sm: '1.4rem', md: '1.5rem' }, // Larger text size
                  }}
                >
                  {project.title}
                </Typography>
                
                <Typography 
                  variant="body1" // Changed from body2 to body1 for better visibility
                  className="project-card-description"
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: isCompact ? 3 : 4, // Show more lines for non-compact cards
                    WebkitBoxOrient: 'vertical',
                    color: theme.palette.text.primary, // Changed from secondary to primary for better contrast
                    lineHeight: 1.6,
                    fontSize: { xs: '0.95rem', md: '1rem' }, // Slightly larger font
                    mb: 3,
                    fontWeight: 400,
                  }}
                >
                  {project.description}
                </Typography>
              </Box>
              
              <Box 
                className="project-card-tags"
                sx={{ 
                  display: 'flex', 
                  flexWrap: 'wrap',
                  gap: 1.2, // Increased gap for better spacing
                  overflowX: { xs: 'auto', md: 'visible' },
                  padding: theme.spacing(2, 0, 0.5), // Adjusted padding
                  marginTop: 'auto', // Push to bottom of container
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
                      fontSize: '0.8rem',
                      py: 0.6,
                      px: 1.2,
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