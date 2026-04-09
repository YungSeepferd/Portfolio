import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, ImageList, ImageListItem, useTheme, useMediaQuery, MobileStepper, Button } from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { getSpacingPreset, getTypographyPreset } from '../../../theme/presets';
import GalleryLightbox from './GalleryLightbox';
import { validateGalleryMedia } from '../../../utils/projectGalleryValidator';

/**
 * Helper function to format section numbers
 */
function useSectionNumber(providedNumber, index) {
  // If a section number is explicitly provided, use it
  if (providedNumber) {
    // Format as 2-digit string if it's a number
    return typeof providedNumber === 'number' 
      ? providedNumber.toString().padStart(2, '0')
      : providedNumber;
  }
  
  // If no number provided but we have an index, generate a section number
  if (typeof index === 'number') {
    return (index + 1).toString().padStart(2, '0');
  }
  
  // No section number available
  return null;
}

const GallerySection = ({ id, title, items = [], content = null, sectionNumber, sectionIndex, projectColor = 'primary', sx = {} }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const horizontal = getSpacingPreset('pageHorizontal');
  const vertical = getSpacingPreset('sectionVertical');
  const eyebrowPreset = getTypographyPreset(theme, 'sectionEyebrow');
  const titlePreset = getTypographyPreset(theme, 'sectionTitle');
  const formattedNumber = useSectionNumber(sectionNumber, sectionIndex);
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const handleNext = () => setActive((prev) => Math.min(prev + 1, items.length - 1));
  const handleBack = () => setActive((prev) => Math.max(prev - 1, 0));

  const openLightboxAt = useCallback((index) => {
    setActive(index);
    setLightboxOpen(true);
  }, []);
  const closeLightbox = useCallback(() => setLightboxOpen(false), []);
  const lightboxPrev = useCallback(() => setActive((prev) => (prev - 1 + items.length) % items.length), [items.length]);
  const lightboxNext = useCallback(() => setActive((prev) => (prev + 1) % items.length), [items.length]);

  useEffect(() => {
    validateGalleryMedia(items, undefined, id);
  }, [items, id]);

  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <Box
      id={id}
      sx={{ 
        maxWidth: '1400px',
        mx: 'auto',
        px: horizontal.px,
        pt: vertical.pt,
        pb: vertical.pb,
        // Enable container queries for adaptive columns inside the dialog
        containerType: 'inline-size',
        ...sx 
      }}
      role="region"
      aria-labelledby={`${id}-title`}
    >
      {(title || formattedNumber) && (
        <Box sx={{ mb: 3 }}>
          {formattedNumber && (
            <Typography 
              variant={eyebrowPreset.variant} 
              component={eyebrowPreset.component} 
              sx={{ 
                ...eyebrowPreset.sx, 
                color: theme.palette[projectColor]?.main || theme.palette.primary.main,
                fontWeight: 700,
              }}
            >
              {formattedNumber}
            </Typography>
          )}
          {title && (
            <Typography id={`${id}-title`} variant={titlePreset.variant} component={titlePreset.component} sx={{ ...titlePreset.sx, scrollMarginTop: '80px' }}>
              {title}
            </Typography>
          )}
        </Box>
      )}

      {isMobile ? (
        <Box>
          <Box sx={{ borderRadius: theme.shape.borderRadius, overflow: 'hidden', boxShadow: theme.shadows[2], cursor: 'zoom-in' }} onClick={() => openLightboxAt(active)}>
            <img
              src={typeof items[active] === 'string' ? items[active] : (items[active]?.src || '')}
              alt={(typeof items[active] === 'object' && items[active]?.alt) ? items[active].alt : `${title || 'Gallery'} image ${active + 1}`}
              style={{ width: '100%', display: 'block' }}
              onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }}
            />
          </Box>
          <MobileStepper
            variant="dots"
            steps={items.length}
            position="static"
            activeStep={active}
            nextButton={
              <Button size="small" onClick={handleNext} disabled={active === items.length - 1}>
                Next
                <KeyboardArrowRight />
              </Button>
            }
            backButton={
              <Button size="small" onClick={handleBack} disabled={active === 0}>
                <KeyboardArrowLeft />
                Back
              </Button>
            }
            sx={{ mt: 1 }}
          />
        </Box>
      ) : (
        <ImageList 
          variant="masonry" 
          cols={3} 
          gap={8} 
          sx={{ 
            gridAutoRows: '8px', 
            // Prefer container queries over viewport breakpoints
            columnCount: '3 !important',
            '@container (max-width: 900px)': { columnCount: '2 !important' },
            '@container (max-width: 600px)': { columnCount: '1 !important' },
            m: 0 
          }}
        >
          {items.map((item, idx) => (
            <ImageListItem
              key={`${id}-img-${idx}`}
              sx={{ borderRadius: theme.shape.borderRadius, overflow: 'hidden', boxShadow: theme.shadows[2], cursor: 'zoom-in' }}
              onClick={() => openLightboxAt(idx)}
            >
              <img
                src={typeof item === 'string' ? item : (item.src || '')}
                alt={(typeof item === 'object' && item.alt) ? item.alt : `${title || 'Gallery'} image ${idx + 1}`}
                loading="lazy"
                style={{ width: '100%', display: 'block' }}
                onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      )}

      <GalleryLightbox
        open={lightboxOpen}
        onClose={closeLightbox}
        items={items}
        index={active}
        onPrev={lightboxPrev}
        onNext={lightboxNext}
      />

      {content && (
        <Box sx={{ mt: 4, maxWidth: '800px', mx: 'auto' }}>
          {React.isValidElement(content) ? content : (
            <Typography variant="body1">{String(content)}</Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default GallerySection;
