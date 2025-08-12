import React, { useState, useCallback, useRef } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  useTheme, 
  useMediaQuery, 
  Chip,
  type SxProps,
  type Theme,
  CardMedia,
  CardActionArea,
  CardActions,
  IconButton,
  Tooltip
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectData, MediaItem, ProjectLink } from '../../types/project';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import GitHubIcon from '@mui/icons-material/GitHub';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface ProjectCardProps {
  project: ProjectData;
  onClick?: (project: ProjectData) => void;
  sx?: SxProps<Theme>;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, sx = {} }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const isScrollingRef = useRef(false);

  // Get the primary media item (first image or video)
  const primaryMedia = project.media?.[0];
  const isVideo = primaryMedia?.type === 'video';
  const hasMedia = Boolean(primaryMedia?.url);

  const handleCardClick = useCallback(() => {
    if (!isScrollingRef.current && onClick) {
      onClick(project);
    }
  }, [onClick, project]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return;
    
    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };
    isScrollingRef.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isMobile || !touchStartRef.current) return;
    
    const touch = e.touches[0];
    const deltaX = Math.abs(touch.clientX - touchStartRef.current.x);
    const deltaY = Math.abs(touch.clientY - touchStartRef.current.y);
    
    // If vertical movement is detected, mark as scrolling
    if (deltaY > 10 && deltaY > deltaX) {
      isScrollingRef.current = true;
    }
  };

  const handleTouchEnd = () => {
    if (!isMobile || !touchStartRef.current) return;
    
    const touchTime = Date.now() - touchStartRef.current.time;
    
    // If touch duration is short and not scrolling, trigger click
    if (touchTime < 300 && !isScrollingRef.current) {
      handleCardClick();
    }
    
    touchStartRef.current = null;
  };

  const renderMedia = () => {
    if (!hasMedia) {
      return (
        <Box
          sx={{
            width: '100%',
            height: 200,
            bgcolor: 'background.paper',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'text.secondary',
          }}
        >
          <Typography variant="body2">No preview available</Typography>
        </Box>
      );
    }

    if (isVideo) {
      return (
        <Box
          component="video"
          src={primaryMedia.url}
          autoPlay
          loop
          muted
          playsInline
          onError={() => setImageError(true)}
          sx={{
            width: '100%',
            height: 'auto',
            maxHeight: 200,
            objectFit: 'cover',
            borderTopLeftRadius: theme.shape.borderRadius,
            borderTopRightRadius: theme.shape.borderRadius,
          }}
        />
      );
    }

    return (
      <CardMedia
        component="img"
        image={imageError ? '/assets/images/placeholders/project.jpg' : primaryMedia.url}
        alt={primaryMedia.title || project.title}
        onError={() => setImageError(true)}
        sx={{
          width: '100%',
          height: 200,
          objectFit: 'cover',
          borderTopLeftRadius: theme.shape.borderRadius,
          borderTopRightRadius: theme.shape.borderRadius,
        }}
      />
    );
  };

  const renderLinkButtons = () => {
    if (!project.links?.length) return null;

    return (
      <CardActions sx={{ pt: 0, justifyContent: 'flex-end' }}>
        {project.links.map((link: ProjectLink) => {
          let icon = <OpenInNewIcon />;
          let label = 'View';
          
          if (link.type === 'github') {
            icon = <GitHubIcon />;
            label = 'GitHub';
          } else if (link.type === 'demo') {
            icon = <VisibilityIcon />;
            label = 'Live Demo';
          }

          return (
            <Tooltip key={link.url} title={label}>
              <IconButton 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                size="small"
                sx={{ color: 'text.secondary' }}
              >
                {icon}
              </IconButton>
            </Tooltip>
          );
        })}
      </CardActions>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{ height: '100%' }}
    >
      <Card
        elevation={isHovered ? 4 : 1}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleCardClick}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'box-shadow 0.3s ease-in-out',
          cursor: 'pointer',
          ...(sx as any),
        }}
      >
        <CardActionArea
          component="div"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            alignItems: 'stretch',
            justifyContent: 'flex-start',
            p: 0,
            '&:hover': {
              backgroundColor: 'transparent',
            },
          }}
        >
          {renderMedia()}
          
          <CardContent sx={{ flexGrow: 1, pb: 1 }}>
            <Typography variant="h6" component="h3" gutterBottom>
              {project.title}
            </Typography>
            
            <Typography variant="body2" color="text.secondary" paragraph>
              {isMobile && project.shortDescription 
                ? project.shortDescription 
                : project.description}
            </Typography>
            
            {project.technologies && project.technologies.length > 0 && (
              <Box sx={{ mt: 'auto', pt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {project.technologies.slice(0, 3).map((tech) => (
                  <Chip 
                    key={tech} 
                    label={tech} 
                    size="small"
                    sx={{
                      fontSize: '0.7rem',
                      height: 24,
                      '& .MuiChip-label': {
                        px: 1,
                      },
                    }}
                  />
                ))}
                {project.technologies.length > 3 && (
                  <Chip 
                    label={`+${project.technologies.length - 3}`} 
                    size="small"
                    sx={{
                      fontSize: '0.7rem',
                      height: 24,
                      '& .MuiChip-label': {
                        px: 1,
                      },
                    }}
                  />
                )}
              </Box>
            )}
          </CardContent>
          
          {renderLinkButtons()}
        </CardActionArea>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
