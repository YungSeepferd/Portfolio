import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  useTheme,
  IconButton,
  Dialog,
  DialogContent,
  Grid,
  useMediaQuery,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { ResponsiveImage } from '../common/ResponsiveImage';
import VideoPlayer from '../common/VideoPlayer';
import { analyzeImage, isVideo } from '../../services/ImageService';

const ProjectGallery = ({ images = [], title = '' }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mediaInfo, setMediaInfo] = useState([]);
  const [openOverlay, setOpenOverlay] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Process media types on mount
  const processMedia = useCallback(async () => {
    if (!images || images.length === 0) return;

    const mediaData = await Promise.all(
      images.map(async (media, index) => {
        // Basic media info
        const isVideoFile = isVideo(media);
        const src = typeof media === 'string' ? media : media?.src || '';
        // Extract aspect if present
        const aspect = typeof media === 'object' && media.aspect ? media.aspect : 'landscape';
        // For images, analyze orientation
        let orientation = aspect;
        let thumbnailSrc = src;

        if (!isVideoFile && !aspect) {
          // Only analyze images, not videos
          const analysis = analyzeImage(media);
          orientation = analysis.orientation;
        }

        return {
          id: index,
          original: media,
          src,
          thumbnailSrc,
          isVideo: isVideoFile,
          orientation: isVideoFile ? 'landscape' : orientation,
          aspect: isVideoFile ? '16/9' : aspect,
        };
      })
    );

    setMediaInfo(mediaData);
  }, [images]);

  useEffect(() => {
    processMedia();
  }, [processMedia]);

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
    const currentIndex = mediaInfo.findIndex((img) => img.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + mediaInfo.length) % mediaInfo.length;
    setSelectedImage(mediaInfo[prevIndex]);
  };

  // Navigate to next image in overlay
  const handleNext = () => {
    const currentIndex = mediaInfo.findIndex((img) => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % mediaInfo.length;
    setSelectedImage(mediaInfo[nextIndex]);
  };

  // Use the isMobile variable to determine grid size
  const gridItemSize = isMobile ? 12 : 3; // Use full width on mobile devices

  return (
    <Box sx={{ width: '100%', maxWidth: '100%', overflow: 'hidden', mb: 4 }}>
      <Typography
        variant={isMobile ? 'h5' : 'h4'}
        gutterBottom
        sx={{
          mb: 2,
          fontSize: { xs: '1.35rem', sm: '1.5rem', md: '1.75rem' }, // Smaller on mobile
        }}
      >
        {title}
      </Typography>
      <Grid
        container
        spacing={isMobile ? 1 : 2} // Reduced spacing on mobile
        sx={{
          maxWidth: '100%',
          mx: 'auto',
        }}
      >
        {mediaInfo.map((item) => (
          <Grid
            item
            xs={item.isVideo ? 12 : gridItemSize} // Videos always full width
            sm={item.isVideo ? 12 : 6} // On small screens, 2 per row for images
            md={item.isVideo ? 12 : 4} // On medium screens, 3 per row for images
            key={item.id}
            sx={{ maxWidth: '100%' }} // Ensure grid items don't overflow
          >
            <Box
              sx={{
                position: 'relative',
                cursor: 'pointer',
                borderRadius: theme.shape.borderRadius,
                overflow: 'hidden', // Contain the content within borders
                aspectRatio: item.isVideo ? '16/9' : item.aspect === 'portrait' ? '3/4' : '16/9',
                height: 'auto', // Auto height based on aspect ratio
                maxWidth: '100%', // Max width constraint
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: theme.shadows[4],
                },
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onClick={() => handleImageClick(item)}
            >
              {item.isVideo ? (
                <VideoPlayer
                  src={item.src}
                  containerWidth="100%"
                  containerHeight="100%"
                  controls={true}
                  muted={true}
                  autoplay={false}
                />
              ) : (
                <ResponsiveImage
                  src={item.src}
                  alt={item.caption || title}
                  containerHeight="100%"
                  containerWidth="100%"
                  aspectRatio={item.aspect === 'portrait' ? 3/4 : 16/9}
                  objectFit="cover"
                  expandOnHover={true}
                  fallbackSrc="/assets/images/placeholders/project.jpg"
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
            color: 'white',
          },
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
            backgroundColor: 'rgba(0,0,0,0.7)',
          }}
        >
          <Typography variant="h6">{title} Gallery</Typography>
          <IconButton color="inherit" onClick={handleCloseOverlay}>
            <CloseIcon />
          </IconButton>
        </Box>

        <DialogContent
          id="project-gallery-overlay-content"
          sx={{
            p: 0,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            maxHeight: '100vh',
            maxWidth: '100vw',
            overflow: 'hidden', // Prevent overflow
          }}
        >
          {/* Image viewer with navigation */}
          <Box
            sx={{
              flex: 1,
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Previous button */}
            <IconButton
              onClick={handlePrevious}
              sx={{
                position: 'absolute',
                left: 16,
                zIndex: 5,
                color: 'white',
                backgroundColor: 'rgba(0,0,0,0.3)',
                '&:hover': { backgroundColor: 'rgba(0,0,0,0.5)' },
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
                    padding: '64px 16px',
                  }}
                >
                  <Box
                    sx={{
                      maxHeight: '80vh',
                      maxWidth: selectedImage.isVideo
                        ? '90%'
                        : selectedImage.orientation === 'portrait'
                          ? '60vw'
                          : '90%',
                      width: selectedImage.isVideo ? '100%' : 'auto',
                      position: 'relative',
                    }}
                  >
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
                      <ResponsiveImage
                        src={selectedImage.src}
                        alt={`${title} full view`}
                        containerHeight="80vh"
                        containerWidth={selectedImage.orientation === 'portrait' ? '60vw' : '100%'}
                        aspectRatio={selectedImage.aspect === 'portrait' ? 3/4 : 16/9}
                        objectFit="contain"
                        fallbackSrc="/assets/images/placeholders/project.jpg"
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
                '&:hover': { backgroundColor: 'rgba(0,0,0,0.5)' },
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
              gap: 1,
            }}
          >
            {mediaInfo.map((item) => (
              <Box
                key={item.id}
                id={`project-gallery-overlay-thumb-${item.id}`}
                onClick={() => setSelectedImage(item)}
                sx={{
                  width: item.isVideo ? 100 : item.orientation === 'portrait' ? 60 : 100,
                  height: 60,
                  flexShrink: 0,
                  borderRadius: 1,
                  overflow: 'hidden',
                  border:
                    selectedImage && selectedImage.id === item.id
                      ? `2px solid ${theme.palette.primary.main}`
                      : '2px solid transparent',
                  cursor: 'pointer',
                  opacity: selectedImage && selectedImage.id === item.id ? 1 : 0.7,
                  '&:hover': { opacity: 1 },
                  position: 'relative',
                }}
              >
                {item.isVideo ? (
                  <VideoPlayer
                    src={item.src}
                    containerHeight="100%"
                    containerWidth="100%"
                    autoplay={false}
                    muted={true}
                    controls={false}
                    showOverlayControls={false}
                  />
                ) : (
                  <ResponsiveImage
                    src={item.thumbnailSrc}
                    alt={`Thumbnail ${item.id + 1}`}
                    containerHeight="100%"
                    containerWidth="100%"
                    aspectRatio={item.aspect === 'portrait' ? 3/4 : 16/9}
                    objectFit="cover"
                    fallbackSrc="/assets/images/placeholders/project.jpg"
                  />
                )}
              </Box>
            ))}
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ProjectGallery;
