import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, useTheme, Button } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import ContentAwareImage from './ContentAwareImage';
import VideoPlayer from './VideoPlayer';
import { analyzeImage } from '../../utils/imageAnalyzer';
import { isVideo, createVideoThumbnail } from '../../utils/mediaHelper';

const ProjectGallery = ({ images = [], title = '' }) => {
  const theme = useTheme();
  const [selected, setSelected] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [mediaInfo, setMediaInfo] = useState([]);
  
  // Process media types on mount
  const processMedia = useCallback(async () => {
    if (!images || images.length === 0) return;
    
    const mediaData = await Promise.all(images.map(async (media) => {
      // Basic media info
      const isVideoFile = isVideo(media);
      const src = typeof media === 'string' ? media : media?.src || '';
      
      // For images, analyze orientation
      let orientation = 'landscape';
      let thumbnailSrc = src;
      
      if (isVideoFile) {
        // Try to generate thumbnail for videos
        const thumbnail = await createVideoThumbnail(media);
        if (thumbnail) thumbnailSrc = thumbnail;
        
        // Videos are typically landscape, but we could detect this better
        orientation = 'landscape';
      } else {
        // Use image analyzer for images
        const analysis = analyzeImage(media);
        orientation = analysis.orientation;
      }
      
      // Detect if it's a phone screenshot
      const isPhone = 
        orientation === 'portrait' || 
        src.toLowerCase().includes('phone') ||
        src.toLowerCase().includes('mobile') ||
        src.toLowerCase().includes('app');
      
      return {
        original: media,
        src,
        thumbnailSrc,
        isVideo: isVideoFile,
        orientation,
        isPhone,
        isDesktop: !isPhone
      };
    }));
    
    setMediaInfo(mediaData);
  }, [images]);
  
  useEffect(() => {
    processMedia();
  }, [processMedia]);
  
  if (!images || images.length === 0 || mediaInfo.length === 0) return null;
  
  const currentMedia = mediaInfo[selected] || {};
  const isPhoneMedia = currentMedia.isPhone;

  return (
    <Box 
      sx={{
        mt: 8,
        mb: 4,
        borderTop: `1px solid ${theme.palette.divider}`,
        pt: 4
      }}
    >
      <Typography 
        variant="h5" 
        sx={{ 
          mb: 3, 
          textAlign: 'center',
          color: theme.palette.text.secondary,
          fontWeight: 500
        }}
      >
        Project Gallery
      </Typography>
      
      <Box 
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 2,
          alignItems: 'flex-start'
        }}
      >
        {/* Thumbnail previews */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'row', md: 'column' },
            gap: 1,
            overflowX: { xs: 'auto', md: 'visible' },
            overflowY: { xs: 'visible', md: 'auto' },
            maxHeight: { xs: 'auto', md: '500px' },
            maxWidth: { xs: '100%', md: '120px' },
            p: 1,
            flexShrink: 0,
          }}
        >
          {mediaInfo.map((item, idx) => {
            const isPhone = item.isPhone;
            
            return (
              <Box
                key={idx}
                onClick={() => setSelected(idx)}
                sx={{
                  position: 'relative',
                  width: { xs: isPhone ? '60px' : '100px', md: '100%' },
                  height: { xs: '60px', md: isPhone ? '80px' : '60px' },
                  overflow: 'hidden',
                  borderRadius: theme.shape.borderRadius,
                  border: idx === selected 
                    ? `2px solid ${theme.palette.primary.main}` 
                    : '2px solid transparent',
                  opacity: idx === selected ? 1 : 0.7,
                  transition: theme.transitions.create(['opacity', 'border-color']),
                  cursor: 'pointer',
                  '&:hover': { opacity: 1 }
                }}
              >
                {item.isVideo && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '20px',
                      height: '20px',
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 2,
                      '&::before': {
                        content: '""',
                        display: 'block',
                        width: 0,
                        height: 0,
                        borderTop: '4px solid transparent',
                        borderBottom: '4px solid transparent',
                        borderLeft: '6px solid white',
                        marginLeft: '1px'
                      }
                    }}
                  />
                )}
                
                <ContentAwareImage
                  src={item.thumbnailSrc}
                  alt={`${title} thumbnail ${idx + 1}`}
                  containerHeight="100%"
                  containerWidth="100%"
                  containerOrientation={isPhone ? 'portrait' : 'landscape'}
                  objectFit="cover"
                />
              </Box>
            );
          })}
        </Box>
        
        {/* Main display */}
        <Box
          sx={{
            flexGrow: 1,
            position: 'relative',
            width: '100%',
            backgroundColor: theme.palette.background.paper,
            borderRadius: theme.shape.borderRadius,
            overflow: 'hidden',
            // Adjust height based on image type and fullscreen mode
            height: fullscreen 
              ? { xs: '70vh', sm: '75vh', md: '80vh' }
              : isPhoneMedia
                ? { xs: '400px', sm: '450px', md: '500px' } // Taller for phone screenshots
                : { xs: '250px', sm: '350px', md: '450px' }, // Shorter for desktop/landscape images
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transition: theme.transitions.create(['height'], { duration: 0.3 }),
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selected}-${currentMedia.isVideo}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: isPhoneMedia ? '10px' : '0px',
              }}
            >
              <Box sx={{ 
                height: '100%', 
                width: isPhoneMedia && !fullscreen ? '70%' : '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                {currentMedia.isVideo ? (
                  <VideoPlayer
                    src={currentMedia.src}
                    containerHeight="100%"
                    containerWidth="100%"
                    muted={true}
                    autoplay={false}
                    controls={true}
                  />
                ) : (
                  <ContentAwareImage
                    src={currentMedia.src}
                    alt={`${title} - Image ${selected + 1}`}
                    containerHeight="100%"
                    containerWidth="100%"
                    containerOrientation={isPhoneMedia ? 'portrait' : 'landscape'}
                    objectFit={isPhoneMedia ? 'contain' : 'contain'}
                  />
                )}
              </Box>
            </motion.div>
          </AnimatePresence>
          
          {/* Fullscreen toggle button */}
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => setFullscreen(!fullscreen)}
            sx={{
              position: 'absolute',
              bottom: 10,
              right: 10,
              minWidth: '40px',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              p: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
              }
            }}
          >
            {fullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </Button>
          
          {/* Image counter indicator */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 10,
              left: 10,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              borderRadius: '12px',
              px: 1.5,
              py: 0.5,
              fontSize: '0.85rem',
            }}
          >
            {selected + 1} / {images.length}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProjectGallery;
