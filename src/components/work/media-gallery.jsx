import React, { useState } from 'react';
import {
  Box,
  ImageList,
  ImageListItem,
  Typography,
  Modal,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Close as CloseIcon, NavigateBefore, NavigateNext } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { ResponsiveImage } from '../common/ResponsiveImage';
import VideoPlayer from '../common/VideoPlayer';
import { isVideo } from '../../services/ImageService';

const MediaGallery = ({ media, title }) => {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!media || media.length === 0) return null;

  const handleMediaClick = (item, index) => {
    setSelectedMedia(item);
    setSelectedIndex(index);
  };

  const handleClose = () => {
    setSelectedMedia(null);
  };

  const handlePrevious = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev - 1 + media.length) % media.length);
    setSelectedMedia(media[(selectedIndex - 1 + media.length) % media.length]);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % media.length);
    setSelectedMedia(media[(selectedIndex + 1) % media.length]);
  };

  const renderMedia = (item) => {
    const mediaProps = typeof item === 'string' ? { src: item } : item;
    return isVideo(mediaProps.src) ? (
      <VideoPlayer {...mediaProps} controls />
    ) : (
      <ResponsiveImage
        {...mediaProps}
        objectFit="contain"
        fallbackSrc="/assets/images/placeholders/project.jpg"
      />
    );
  };

  return (
    <Box sx={{ width: '100%', mb: 4 }}>
      {title && (
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
      )}

      <ImageList
        variant="quilted"
        cols={isMobile ? 2 : 3}
        gap={16}
        sx={{
          mb: 4,
          overflow: 'visible',
        }}
      >
        {media.map((item, index) => (
          <ImageListItem
            key={index}
            component={motion.div}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            onClick={() => handleMediaClick(item, index)}
            sx={{
              cursor: 'pointer',
              overflow: 'hidden',
              borderRadius: 1,
              '& img, & video': {
                borderRadius: 1,
              },
            }}
          >
            {renderMedia(item)}
          </ImageListItem>
        ))}
      </ImageList>

      <Modal open={!!selectedMedia} onClose={handleClose} closeAfterTransition>
        <AnimatePresence>
          {selectedMedia && (
            <Box
              sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                p: 2,
              }}
              onClick={handleClose}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: 'relative',
                  maxWidth: '90vw',
                  maxHeight: '90vh',
                  width: 'auto',
                  height: 'auto',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <Box sx={{ position: 'relative' }}>
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {renderMedia(selectedMedia)}
                  </Box>

                  <IconButton
                    sx={{
                      position: 'absolute',
                      right: 8,
                      top: 8,
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      },
                    }}
                    onClick={handleClose}
                  >
                    <CloseIcon />
                  </IconButton>

                  {media.length > 1 && (
                    <>
                      <IconButton
                        sx={{
                          position: 'absolute',
                          left: 8,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          backgroundColor: 'rgba(0, 0, 0, 0.5)',
                          '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                          },
                        }}
                        onClick={handlePrevious}
                      >
                        <NavigateBefore />
                      </IconButton>

                      <IconButton
                        sx={{
                          position: 'absolute',
                          right: 8,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          backgroundColor: 'rgba(0, 0, 0, 0.5)',
                          '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                          },
                        }}
                        onClick={handleNext}
                      >
                        <NavigateNext />
                      </IconButton>
                    </>
                  )}
                </Box>
              </motion.div>
            </Box>
          )}
        </AnimatePresence>
      </Modal>
    </Box>
  );
};

export default MediaGallery;
