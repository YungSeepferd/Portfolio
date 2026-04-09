import React, { useEffect, useCallback, useRef } from 'react';
import { Dialog, Box, IconButton, useTheme, Typography } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const GalleryLightbox = ({ open, onClose, items = [], index = 0, onPrev, onNext, labelId = 'gallery-lightbox-title' }) => {
  const theme = useTheme();
  const total = items.length;
  const safeIndex = Math.min(Math.max(index, 0), Math.max(total - 1, 0));
  const closeRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

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
    if (closeRef.current) {
      closeRef.current.focus();
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, handleKeyDown]);

  const active = items[safeIndex];
  const src = typeof active === 'string' ? active : (active?.src || '');
  const alt = (typeof active === 'object' && active?.alt) ? active.alt : `Gallery image ${safeIndex + 1}`;

  const onTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };
  const onTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    const delta = touchEndX.current - touchStartX.current;
    const threshold = 40; // px
    if (delta > threshold && onPrev) onPrev();
    if (delta < -threshold && onNext) onNext();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen
      aria-labelledby={labelId}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: 'rgba(0,0,0,0.95)',
            backdropFilter: 'blur(2px)'
          }
        },
        paper: {
          sx: { backgroundColor: 'transparent', boxShadow: 'none' }
        }
      }}
    >
      {/* SR-only title and live region */}
      <Typography id={labelId} component="h2" sx={visuallyHidden}>
        Gallery image {safeIndex + 1} of {total}
      </Typography>
      <Box role="status" aria-live="polite" sx={visuallyHidden}>
        Image {safeIndex + 1} of {total}
      </Box>

      {/* Close */}
      <IconButton
        aria-label="Close"
        onClick={onClose}
        sx={{ position: 'absolute', top: 16, right: 16, color: theme.palette.common.white }}
        ref={closeRef}
      >
        <CloseIcon />
      </IconButton>

      {/* Prev */}
      {onPrev && total > 1 && (
        <IconButton
          aria-label={`Previous image (${safeIndex} of ${total})`}
          onClick={onPrev}
          sx={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: theme.palette.common.white }}
        >
          <ArrowBackIcon />
        </IconButton>
      )}

      {/* Next */}
      {onNext && total > 1 && (
        <IconButton
          aria-label={`Next image (${Math.min(safeIndex + 2, total)} of ${total})`}
          onClick={onNext}
          sx={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', color: theme.palette.common.white }}
        >
          <ArrowForwardIcon />
        </IconButton>
      )}

      {/* Image */}
      <Box sx={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
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
