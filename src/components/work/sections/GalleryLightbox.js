import React, { useEffect, useCallback } from 'react';
import { Dialog, Box, IconButton, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const GalleryLightbox = ({ open, onClose, items = [], index = 0, onPrev, onNext }) => {
  const theme = useTheme();
  const total = items.length;
  const safeIndex = Math.min(Math.max(index, 0), Math.max(total - 1, 0));

  const handleKeyDown = useCallback((e) => {
    if (!open) return;
    if (e.key === 'ArrowLeft' && onPrev) {
      e.preventDefault();
      onPrev();
    } else if (e.key === 'ArrowRight' && onNext) {
      e.preventDefault();
      onNext();
    } else if (e.key === 'Escape' && onClose) {
      e.preventDefault();
      onClose();
    }
  }, [open, onPrev, onNext, onClose]);

  useEffect(() => {
    if (!open) return;
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, handleKeyDown]);

  const active = items[safeIndex];
  const src = typeof active === 'string' ? active : (active?.src || '');
  const alt = (typeof active === 'object' && active?.alt) ? active.alt : `Gallery image ${safeIndex + 1}`;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen
      BackdropProps={{
        sx: {
          backgroundColor: 'rgba(0,0,0,0.95)',
          backdropFilter: 'blur(2px)'
        }
      }}
      PaperProps={{ sx: { backgroundColor: 'transparent', boxShadow: 'none' } }}
    >
      {/* Close */}
      <IconButton
        aria-label="Close"
        onClick={onClose}
        sx={{ position: 'absolute', top: 16, right: 16, color: theme.palette.common.white }}
      >
        <CloseIcon />
      </IconButton>

      {/* Prev */}
      {onPrev && total > 1 && (
        <IconButton
          aria-label="Previous"
          onClick={onPrev}
          sx={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: theme.palette.common.white }}
        >
          <ArrowBackIcon />
        </IconButton>
      )}

      {/* Next */}
      {onNext && total > 1 && (
        <IconButton
          aria-label="Next"
          onClick={onNext}
          sx={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', color: theme.palette.common.white }}
        >
          <ArrowForwardIcon />
        </IconButton>
      )}

      {/* Image */}
      <Box sx={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img
          src={src}
          alt={alt}
          style={{ maxWidth: '95vw', maxHeight: '90vh', objectFit: 'contain' }}
          onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }}
        />
      </Box>
    </Dialog>
  );
};

export default GalleryLightbox;
