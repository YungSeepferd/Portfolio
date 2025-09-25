import React, { useState, useMemo } from 'react';
import { Box, Typography, useTheme, IconButton, Dialog, DialogContent, Grid, useMediaQuery } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import ContentAwareImage from '../common/ContentAwareImage';
import VideoPlayer from '../common/VideoPlayer';
import { analyzeImage, isVideo } from '../../utils/mediaUtils';

const ProjectGallery = ({ images = [], title = '' }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [openOverlay, setOpenOverlay] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  
  const mediaInfo = useMemo(() => {
    if (!images || images.length === 0) return [];

    return images.map((media, index) => {
      const isVideoFile = isVideo(media);
      const src = typeof media === 'string' ? media : media?.src || '';
      const aspectHint = typeof media === 'object' && media.aspect ? media.aspect : undefined;

      let orientation = aspectHint;
      if (isVideoFile) {
        orientation = 'landscape';
      } else if (!orientation) {
        const analysis = analyzeImage(media);
        if (analysis?.isPortrait) {
          orientation = 'portrait';
        } else if (analysis?.aspectRatio === 1) {
          orientation = 'square';
        } else {
          orientation = 'landscape';
        }
      }

      const isPhone =
        orientation === 'portrait' ||
        src.toLowerCase().includes('phone') ||
        src.toLowerCase().includes('mobile') ||
        src.toLowerCase().includes('app');

      return {
        id: index,
        original: media,
        src,
        thumbnailSrc: src,
        isVideo: isVideoFile,
        orientation,
        aspect: aspectHint || orientation,
        isPhone,
        isDesktop: !isPhone
      };
    });
  }, [images]);

  if (!images || images.length === 0 || mediaInfo.length === 0) return null;

  // Open overlay with specific image
  const handleImageClick = (image) => {
    setSelectedImage(image);
    setOpenOverlay(true);
  };

  // Close overlay
  const handleCloseOverlay = () => {
    setOpenOverlay(false);
  };

  // Navigate to previous image in overlay
  const handlePrevious = () => {
    const currentIndex = mediaInfo.findIndex(img => img.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + mediaInfo.length) % mediaInfo.length;
    setSelectedImage(mediaInfo[prevIndex]);
  };

  // Navigate to next image in overlay
  const handleNext = () => {
    const currentIndex = mediaInfo.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % mediaInfo.length;
    setSelectedImage(mediaInfo[nextIndex]);
  };

  // Use the isMobile variable to determine grid size
  const gridItemSize = isMobile ? 6 : 3;

  return (
    <Box id="project-gallery-root" sx={{ mt: 4, mb: 4 }}>
      {/* Grid of thumbnails */}
      <Grid container spacing={2} id="project-gallery-grid">
        {mediaInfo.map((item) => (
          <Grid item xs={6} sm={4} md={gridItemSize} key={item.id}>
            <Box
              id={`project-gallery-thumb-${item.id}`}
              onClick={() => handleImageClick(item)}
              sx={{
                position: 'relative',
                width: '100%',
                aspectRatio: item.aspect === 'portrait' ? 3/4 : item.aspect === 'square' ? 1 : 16/9,
                overflow: 'hidden',
                borderRadius: theme.shape.borderRadius,
                cursor: 'pointer',
                transition: 'all 0.2s',
                background: theme.palette.grey[100],
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: theme.shadows[4]
                }
              }}
            >
              {item.isVideo ? (
                <Box 
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <VideoPlayer
                    src={item.src}
                    containerHeight="100%"
                    containerWidth="100%"
                    autoplay={false}
                    muted={true}
                    controls={false}
                  />
                  {/* Play button indicator */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      zIndex: 2,
                      '&::before': {
                        content: '""',
                        display: 'block',
                        width: 0,
                        height: 0,
                        borderTop: '10px solid transparent',
                        borderBottom: '10px solid transparent',
                        borderLeft: '16px solid white',
                        marginLeft: '4px'
                      }
                    }}
                  />
                </Box>
              ) : (
                <ContentAwareImage
                  src={item.src}
                  alt={`${title} image ${item.id + 1}`}
                  containerHeight="100%"
                  containerWidth="100%"
                  containerOrientation={item.orientation}
                  aspect={item.aspect}
                  objectFit={item.orientation === 'portrait' ? 'contain' : 'cover'}
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: theme.palette.grey[100],
                    borderRadius: theme.shape.borderRadius
                  }}
                />
              )}
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Full screen overlay for viewing images */}
      <Dialog
        fullScreen
        open={openOverlay}
        onClose={handleCloseOverlay}
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: 'rgba(0,0,0,0.9)',
            color: 'white'
          }
        }}
      >
        <Box
          id="project-gallery-overlay-header"
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 10,
            backgroundColor: 'rgba(0,0,0,0.7)'
          }}
        >
          <Typography variant="h6">{title} Gallery</Typography>
          <IconButton color="inherit" onClick={handleCloseOverlay}>
            <CloseIcon />
          </IconButton>
        </Box>

        <DialogContent id="project-gallery-overlay-content" sx={{ p: 0, display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Image viewer with navigation */}
          <Box sx={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Previous button */}
            <IconButton
              onClick={handlePrevious}
              sx={{
                position: 'absolute',
                left: 16,
                zIndex: 5,
                color: 'white',
                backgroundColor: 'rgba(0,0,0,0.3)',
                '&:hover': { backgroundColor: 'rgba(0,0,0,0.5)' }
              }}
            >
              <NavigateBeforeIcon fontSize="large" />
            </IconButton>
            
            {/* Current image/video */}
            <AnimatePresence mode="wait">
              {selectedImage && (
                <motion.div
                  key={selectedImage.id}
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
                    padding: '64px 16px'
                  }}
                >
                  <Box sx={{ maxHeight: '80vh', maxWidth: '90%', position: 'relative', width: selectedImage?.aspect === 'portrait' ? 'auto' : '100%' }}>
                    {selectedImage.isVideo ? (
                      <VideoPlayer
                        src={selectedImage.src}
                        containerHeight="auto"
                        containerWidth="100%"
                        autoplay={false}
                        muted={false}
                        controls={true}
                      />
                    ) : (
                      <ContentAwareImage
                        src={selectedImage.src}
                        alt={`${title} full view`}
                        containerHeight="80vh"
                        containerWidth={selectedImage.aspect === 'portrait' ? '60vw' : '100%'}
                        aspect={selectedImage.aspect}
                        objectFit={selectedImage.aspect === 'portrait' ? 'contain' : 'cover'}
                        sx={{
                          maxWidth: selectedImage.aspect === 'portrait' ? '60vw' : '100%',
                          maxHeight: '80vh',
                          display: 'block',
                          margin: '0 auto',
                          background: theme.palette.grey[100],
                          borderRadius: theme.shape.borderRadius
                        }}
                      />
                    )}
                  </Box>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Next button */}
            <IconButton
              onClick={handleNext}
              sx={{
                position: 'absolute',
                right: 16,
                zIndex: 5,
                color: 'white',
                backgroundColor: 'rgba(0,0,0,0.3)',
                '&:hover': { backgroundColor: 'rgba(0,0,0,0.5)' }
              }}
            >
              <NavigateNextIcon fontSize="large" />
            </IconButton>
          </Box>

          {/* Thumbnail strip for all images */}
          <Box
            id="project-gallery-overlay-thumbnails"
            sx={{
              width: '100%',
              p: 2,
              backgroundColor: 'rgba(0,0,0,0.7)',
              display: 'flex',
              overflowX: 'auto',
              gap: 1
            }}
          >
            {mediaInfo.map((item) => (
              <Box
                key={item.id}
                id={`project-gallery-overlay-thumb-${item.id}`}
                onClick={() => setSelectedImage(item)}
                sx={{
                  width: item.isPhone ? 60 : 100,
                  height: 60,
                  flexShrink: 0,
                  borderRadius: 1,
                  overflow: 'hidden',
                  border: selectedImage && selectedImage.id === item.id ? `2px solid ${theme.palette.primary.main}` : '2px solid transparent',
                  cursor: 'pointer',
                  opacity: selectedImage && selectedImage.id === item.id ? 1 : 0.7,
                  '&:hover': { opacity: 1 }
                }}
              >
                <ContentAwareImage
                  src={item.thumbnailSrc}
                  alt={`Thumbnail ${item.id + 1}`}
                  containerHeight="100%"
                  containerWidth="100%"
                  aspect={item.aspect}
                  objectFit="cover"
                  sx={{
                    borderRadius: theme.shape.borderRadius
                  }}
                />
              </Box>
            ))}
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ProjectGallery;
