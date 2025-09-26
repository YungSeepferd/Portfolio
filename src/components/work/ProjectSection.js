import React from 'react';
import { Box, Typography, Grid, useTheme, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { ProjectActionButtonsBar } from './ProjectMetaBar';
import ResponsiveSection from './layout/ResponsiveSection';
import { normalizeSection } from '../../utils/sectionNormalizer';
import { analyzeSectionContent } from '../../utils/sectionAnalyzer';
import { getSpacingPreset, getTypographyPreset } from '../../theme/presets';

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

/**
 * ProjectSection Component (Schema-based, type-driven)
 *
 * Renders a project section based on its type and schema.
 */
const ProjectSection = ({
  id,
  title,
  content,
  mediaData,
  takeaways,
  outcomes,
  layout = 'textLeft',
  children,
  sectionNumber,
  sectionIndex,
  fallbackContent,
  type, 
  sx = {}
}) => {
  const theme = useTheme();
  
  // Create raw section data for processing
  const rawSectionData = {
    id,
    title,
    content,
    media: mediaData,
    takeaways,
    outcomes,
    layout,
    type,
    sectionNumber,
    sectionIndex
  };
  
  // Normalize section data to consistent format
  const normalizedSection = normalizeSection(rawSectionData, sectionIndex);
  
  // Analyze content to determine optimal rendering strategy
  const renderingStrategy = analyzeSectionContent(normalizedSection);
  
  const formattedNumber = useSectionNumber(sectionNumber, sectionIndex);
  const eyebrowPreset = getTypographyPreset(theme, 'sectionEyebrow');
  const titlePreset = getTypographyPreset(theme, 'sectionTitle');
  const sectionPadding = getSpacingPreset('pageHorizontal');
  const sectionVertical = getSpacingPreset('sectionVertical');

  // Section heading (add section number above title)
  const headingElement = (title || formattedNumber) && (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start', // Center horizontally
        justifyContent: 'center', // Center vertically if needed
        textAlign: 'left', // Center text
        width: '100%',
      }}
    >
      {formattedNumber && (
        <Typography
          variant={eyebrowPreset.variant}
          component={eyebrowPreset.component}
          sx={eyebrowPreset.sx}
        >
          {formattedNumber}
        </Typography>
      )}
      {title && (
        <Typography
          variant={titlePreset.variant}
          component={titlePreset.component}
          id={id}
          tabIndex={-1}
          sx={{
            ...titlePreset.sx,
            scrollMarginTop: '80px',
          }}
        >
          {title}
        </Typography>
      )}
    </Box>
  );

  // Helper: Render outcomes and takeaways side-by-side or stacked
  const renderOutcomesTakeaways = () => {
    if (!outcomes && !takeaways) return null;
    const isSideBySide = layout === 'sideBySide' || layout === 'outcomesTakeaways';
    return (
      <Grid container spacing={4} sx={{ mt: 3, mb: 2 }} direction={isSideBySide ? 'row' : 'column'}>
        {takeaways && takeaways.length > 0 && (
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2, color: theme.palette.text.secondary }}>
              Key Takeaways
            </Typography>
            <List dense disablePadding>
              {takeaways.map((item, idx) => (
                <ListItem key={idx} disableGutters>
                  <ListItemIcon sx={{ minWidth: '32px' }}>
                    <StarBorderIcon fontSize="small" color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={item} primaryTypographyProps={{ variant: 'body1' }} />
                </ListItem>
              ))}
            </List>
          </Grid>
        )}
        {outcomes && outcomes.points && outcomes.points.length > 0 && (
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2, color: theme.palette.text.secondary }}>
              {outcomes.title || 'Project Outcomes'}
            </Typography>
            <List dense disablePadding>
              {outcomes.points.map((point, idx) => (
                <ListItem key={idx} disableGutters>
                  <ListItemIcon sx={{ minWidth: '32px' }}>
                    <CheckCircleOutlineIcon fontSize="small" color="success" />
                  </ListItemIcon>
                  <ListItemText primary={point} primaryTypographyProps={{ variant: 'body1' }} />
                </ListItem>
              ))}
            </List>
          </Grid>
        )}
      </Grid>
    );
  };

  // Helper for full-width content box with consistent side padding
  const fullWidthBox = (children) => (
    <Box
      id={id}
      sx={{
        width: '100%',
        maxWidth: '1200px',
        mx: 'auto',
        px: sectionPadding.px,
        pt: sectionVertical.pt,
        pb: sectionVertical.pb,
        ...sx
      }}
      role="region"
      aria-labelledby={id}
    >
      {children}
    </Box>
  );


  // --- Unified Content-Driven Rendering System ---
  
  // Handle special cases that require legacy rendering
  if (renderingStrategy.requiresSpecialHandling) {
    // Legacy special section handling
    const legacyType = normalizedSection.metadata.originalType;
    
    if (legacyType === 'prototype') {
      return (
        <Box id={id} sx={{ my: 6, ...sx }} role="region" aria-labelledby={id}>
          {headingElement}
          <Typography variant="body2">[Prototype embed coming soon]</Typography>
        </Box>
      );
    }
    
    if (legacyType === 'figmaEmbed') {
      return (
        <Box sx={{ ...sx, width: '100%', textAlign: 'center' }} id={id}>
          {headingElement}
          <Box sx={{ my: 2 }}>
            <iframe
              title="Figma Prototype"
              src={typeof content === 'string' ? content : (mediaData?.src || '')}
              width="100%"
              height="500"
              style={{ border: 0, borderRadius: 8 }}
              allowFullScreen
            />
          </Box>
        </Box>
      );
    }
    
    if (legacyType === 'metrics') {
      return (
        <Box sx={{ ...sx, display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }} id={id}>
          {headingElement}
          <Box sx={{ p: 2, bgcolor: theme.palette.success.light, borderRadius: 2, minWidth: 120 }}>
            <Typography variant="h6">SUS: 75.38</Typography>
            <Typography variant="caption">Usability Score</Typography>
          </Box>
          <Box sx={{ p: 2, bgcolor: theme.palette.info.light, borderRadius: 2, minWidth: 120 }}>
            <Typography variant="h6">Trust: 5.82</Typography>
            <Typography variant="caption">Post-Interaction</Typography>
          </Box>
        </Box>
      );
    }
    
    if (legacyType === 'custom') {
      return (
        <Box id={id} sx={{ my: 6, ...sx }} role="region" aria-labelledby={id}>
          {headingElement}
          {children}
        </Box>
      );
    }
    
    // Fallback for outcomes/takeaways special handling
    if (legacyType === 'outcomes' || legacyType === 'takeaways') {
      return fullWidthBox(
        <>
          {headingElement}
          {renderOutcomesTakeaways()}
        </>
      );
    }
  }
  
  // Use unified ResponsiveSection renderer for all standard content
  return (
    <ResponsiveSection
      id={normalizedSection.id}
      title={normalizedSection.title}
      content={normalizedSection.content}
      mediaData={normalizedSection.media}
      sectionNumber={sectionNumber}
      sectionIndex={sectionIndex}
      type={renderingStrategy.primaryRenderer}
      layout={renderingStrategy.layoutHint}
      sx={{
        ...sx,
        // Apply spacing recommendations from analysis
        mb: renderingStrategy.spacing,
        // Apply priority-based styling
        ...(renderingStrategy.priority === 'primary' && {
          '& .section-heading': { fontSize: '1.2em' }
        })
      }}
    >
      {/* Render outcomes and takeaways if present */}
      {(normalizedSection.outcomes.length > 0 || normalizedSection.takeaways.length > 0) && 
        renderOutcomesTakeaways()
      }
      
      {/* Render action buttons if provided */}
      {children && (
        <Box sx={{ mt: 3 }}>
          <ProjectActionButtonsBar actions={children} layout="row" />
        </Box>
      )}
    </ResponsiveSection>
  );
};

export default ProjectSection;
