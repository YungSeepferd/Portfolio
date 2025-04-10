import React, { useState, useCallback } from 'react';
import { Box, ImageList, ImageListItem, IconButton, Modal, useTheme, useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { motion, AnimatePresence } from 'framer-motion';
import ContentAwareImage from '../common/ContentAwareImage';
import { isVideo } from '../../utils/mediaHelper';
import VideoPlayer from '../common/VideoPlayer';

/**
 * ProjectImageGallery Component
 * 
 * Displays project images in a responsive grid with lightbox functionality
 * for viewing images full-screen when clicked.
 */
const ProjectImageGallery = ({ images = [], title = '' }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const openLightbox = useCallback((index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  }, []);
  
  const closeLightbox = () => setLightboxOpen(false);
  
  const goToPrevious = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };
  
  const goToNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };
  
  // Filter out duplicate and empty images
  const filteredImages = images.filter(img => {
    if (!img) return false;
    return true;
  });
  
  if (!filteredImages.length) return null;
  
  // Determine how many columns based on screen size
  const columns = isMobile ? 1 : isTablet ? 2 : 3;

  const getCurrentImage = () => {
    const img = filteredImages[currentIndex];
    return typeof img === 'string' ? img : img.src || img;
  };
  
  const isCurrentVideo = () => {
    const img = filteredImages[currentIndex];
    return (typeof img === 'object' && img.type === 'video') || 
           (typeof img === 'string' && isVideo(img));
  };

  return (
    <>
      <ImageList
        cols={columns}
        gap={16}
        sx={{ 
          overflow: 'hidden',
          '& .MuiImageListItem-root': {
            overflow: 'hidden',
            borderRadius: theme.shape.borderRadius,
          }
        }}
      >
        {filteredImages.map((img, index) => {
          const isVideoItem = (typeof img === 'object' && img.type === 'video') || 
                             (typeof img === 'string' && isVideo(img));
          const itemSrc = typeof img === 'string' ? img : img.src || '';
          
          return (
            <ImageListItem 
              key={index}
              component={motion.div}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              onClick={() => openLightbox(index)}
              sx={{ 
                cursor: 'pointer',
                boxShadow: theme.shadows[2],
                height: isVideoItem ? '200px' : 'auto',
                minHeight: '150px',
                '&:hover': {
                  boxShadow: theme.shadows[8],
                }
              }}
            >
              {isVideoItem ? (
                <Box sx={{ height: '100%' }}>
                  <VideoPlayer
                    src={itemSrc}
                    title={`${title} video ${index + 1}`}
                    autoplay={false}
                    controls={true}
                    loop={true}
                    muted={true}
                    containerHeight="100%"
                    containerWidth="100%"
                  />
                </Box>
              ) : (
                <ContentAwareImage
                  imageData={img}
                  src={itemSrc}
                  alt={`${title} image ${index + 1}`}
                  containerHeight="100%"
                  containerWidth="100%"
                  loading="lazy"
                  objectFit="cover"
                />
              )}
            </ImageListItem>
          );
        })}
      </ImageList>
      
      {/* Lightbox modal */}
      <Modal
        open={lightboxOpen}
        onClose={closeLightbox}
        aria-labelledby="image-modal-title"
        aria-describedby="image-modal-description"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
          }
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '90%',
            height: '90%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={closeLightbox}
        >
          <IconButton
            onClick={closeLightbox}
            sx={{
              position: 'absolute',
              top: -10,
              right: -10,
              bgcolor: 'rgba(0, 0, 0, 0.6)',
              color: 'common.white',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.8)',
              }
            }}
          >
            <CloseIcon />
          </IconButton>
          
          <IconButton
            onClick={goToPrevious}
            sx={{
              position: 'absolute',
              left: -20,
              bgcolor: 'rgba(0, 0, 0, 0.6)',
              color: 'common.white',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.8)',
              }
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          
          <IconButton
            onClick={goToNext}
            sx={{
              position: 'absolute',
              right: -20,
              bgcolor: 'rgba(0, 0, 0, 0.6)',
              color: 'common.white',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.8)',
              }
            }}
          >
            <ArrowForwardIcon />
          </IconButton>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {isCurrentVideo() ? (
                <VideoPlayer
                  src={getCurrentImage()}
                  title={`${title} video`}
                  autoplay={true}
                  controls={true}
                  loop={true}
                  containerHeight="100%"
                  containerWidth="100%"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain'
                  }}
                />
              ) : (
                <ContentAwareImage
                  src={getCurrentImage()}
                  alt={`${title} image ${currentIndex + 1}`}
                  containerHeight="100%"
                  containerWidth="100%"
                  objectFit="contain"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                  }}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </Box>
      </Modal>
    </>
  );
};

export default ProjectImageGallery;
