import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Box, Typography, Card, CardContent, useTheme, Button, Stack, CircularProgress } from '@mui/material';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import ContentAwareImage from '../common/ContentAwareImage';
import SkillTag from '../common/SkillTag';
import { useModalContext } from '../../context/ModalContext';

/**
 * Enhanced project card with lazy loading and proper animations
 * Updated to display links with popups
 */
const ProjectCard = ({ project, skillTags, onClick, showAllTags = true, gridPosition }) => {
  const theme = useTheme();
  const cardRef = useRef(null);
  const isVisible = useIntersectionObserver(cardRef, { threshold: 0.1 });
  const [isLoaded, setIsLoaded] = useState(false);
  const { openPdf, openIframe } = useModalContext();

  const handleImageLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);
  
  if (!project) return null;
  
  // Always show all tags by setting showAllTags to true for consistency
  const { tags, remaining } = { tags: project.categories, remaining: 0 };
  
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

  // Standardized heights for consistent card layout
  const imageHeight = '45%'; // Fixed percentage for image section
  const contentHeight = '55%'; // Fixed percentage for content section
  
  // Check if project has links to display
  const hasLinks = project.links && project.links.length > 0;

  // Apply consistent styling based on either cardVariant or legacy cardStyle
  const getCardStyle = () => {
    if (project.cardVariant) {
      // Use theme-based card variant
      const variantColor = 
        project.cardVariant === 'primary' ? theme.palette.primary.main :
        project.cardVariant === 'secondary' ? theme.palette.secondary.main :
        project.cardVariant === 'warning' ? theme.palette.warning.main :
        project.cardVariant === 'info' ? theme.palette.info.main :
        project.cardVariant === 'success' ? theme.palette.success.main :
        theme.palette.primary.main;
        
      return {
        borderLeft: `4px solid ${variantColor}`,
        boxShadow: `0 3px 10px ${variantColor}22`,
      };
    } else if (project.cardStyle) {
      // Fall back to legacy cardStyle if defined
      return project.cardStyle;
    }
    
    // Default style if neither is provided
    return {
      borderLeft: `4px solid ${theme.palette.primary.main}`,
      boxShadow: `0 3px 10px ${theme.palette.primary.dark}22`,
    };
  };

  // Handle link click
  const handleLinkClick = (link, e) => {
    e.stopPropagation(); // Prevent card click
    
    if (link.contentType === 'pdf') {
      openPdf(link.url, link.label);
    } else if (link.contentType === 'iframe') {
      openIframe(link.url, link.label);
    } else {
      window.open(link.url, '_blank', 'noopener,noreferrer');
    }
  };
  
  return (
    <Box 
      ref={cardRef} 
      sx={{ 
        height: '100%', // Take full height of container
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
            height: '100%', // Take full height of parent
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
              height: '100%', // Take full height
              width: '100%',
              overflow: 'hidden',
              borderRadius: theme.shape.borderRadius,
              boxShadow: `0 8px 16px ${theme.palette.shadow.light}`,
              transition: `transform ${theme.animationSettings.durations.short}ms ease, box-shadow ${theme.animationSettings.durations.short}ms ease`,
              '&:hover': {
                boxShadow: `0 20px 40px ${theme.palette.shadow.medium}`,
              },
              ...getCardStyle(), // Apply consistent card styling
            }}
          >
            <Box 
              className="project-card-media"
              sx={{
                position: 'relative',
                width: '100%',
                height: imageHeight, // Consistent percentage height
                flexShrink: 0, // Prevent shrinking
                overflow: 'hidden',
              }}
            >
              <ContentAwareImage
                imageData={coverImage}
                src={typeof coverImage === 'string' ? coverImage : coverImage?.src}
                alt={project.title}
                onLoad={handleImageLoad}
                containerHeight="100%"
                containerOrientation="landscape"
                objectFit="cover"
                loading="lazy" // Add lazy loading
                placeholder={
                  <Box sx={{ 
                    width: '100%', 
                    height: '100%', 
                    bgcolor: theme.palette.background.paper,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <CircularProgress size={40} />
                  </Box>
                }
              />
              
              {/* Add links overlay on hover */}
              {hasLinks && (
                <Box
                  className="project-links-overlay"
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0) 100%)',
                    padding: theme.spacing(2),
                    transform: 'translateY(100%)',
                    transition: 'transform 0.3s ease',
                    '.project-card:hover &': {
                      transform: 'translateY(0)',
                    },
                  }}
                >
                  <Stack 
                    direction="row" 
                    spacing={1.5} 
                    justifyContent="center"
                  >
                    {project.links.map((link, index) => (
                      <Button
                        key={index}
                        variant="outlined"
                        size="small"
                        color={
                          link.label.includes("GitHub") ? "info" :
                          link.label.includes("Paper") || link.label.includes("PDF") ? "secondary" :
                          "primary"
                        }
                        onClick={(e) => handleLinkClick(link, e)}
                        startIcon={link.icon}
                        sx={{
                          minWidth: 'auto',
                          fontWeight: 'medium',
                          fontSize: '0.75rem',
                          textTransform: 'none',
                          borderRadius: theme.shape.borderRadius,
                          backgroundColor: 'rgba(19, 31, 45, 0.6)',
                          '&:hover': {
                            boxShadow: theme.shadows[1],
                            backgroundColor: 'rgba(19, 31, 45, 0.8)',
                          }
                        }}
                      >
                        {link.label}
                      </Button>
                    ))}
                  </Stack>
                </Box>
              )}
            </Box>
            
            <CardContent 
              className="project-card-content"
              sx={{ 
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                p: { xs: 2.5, sm: 3, md: 3.5 }, 
                height: contentHeight, // Consistent percentage height
                minHeight: 'auto', // Remove any min-height that could cause uneven sizes
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
                    fontSize: { xs: '1.3rem', sm: '1.4rem', md: '1.5rem' }, 
                  }}
                >
                  {project.title}
                </Typography>
                
                <Typography 
                  variant="body1"
                  className="project-card-description"
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: 'vertical',
                    color: theme.palette.text.primary,
                    lineHeight: 1.6,
                    fontSize: { xs: '0.95rem', md: '1rem' },
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
                  gap: 1.2,
                  overflowX: { xs: 'auto', md: 'visible' },
                  padding: theme.spacing(2, 0, 0.5),
                  marginTop: 'auto',
                  borderTop: `1px solid ${theme.palette.divider}`,
                  flexShrink: 0,
                }}
              >
                {tags.map((tag, idx) => (
                  <SkillTag
                    key={idx}
                    label={tag}
                    size="small"
                    onClick={(e) => e.stopPropagation()}
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

export default React.memo(ProjectCard);