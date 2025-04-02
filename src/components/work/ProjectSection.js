import React from 'react';
import { Box, Typography, Grid, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import ContentAwareImage from '../common/ContentAwareImage';
import { renderContentSection } from '../../utils/contentParser';
import { getAnimation } from '../../utils/themeUtils';

const ProjectSection = ({
  sectionNumber,
  title,
  content,
  imageData,
  direction = 'normal',
  fallbackContent = null,
}) => {
  const theme = useTheme();
  const isReversed = direction === 'reverse';
  
  // Use theme animations instead of hardcoded values
  const textAnimation = getAnimation(theme, 'fadeIn');
  const imageAnimation = getAnimation(theme, 'slideUp');
  
  return (
    <Box component="section">
      <Grid 
        container 
        spacing={theme.spacingSizes.elementGap * 3} // Use theme spacing
        direction={isReversed ? 'row-reverse' : 'row'}
        sx={{ py: theme.spacingSizes.section * 0.75 }} // Use theme spacing
      >
        <Grid item xs={12} md={6}>
          <Box
            component={motion.div}
            initial={textAnimation.initial}
            whileInView={textAnimation.animate}
            transition={textAnimation.transition}
            viewport={{ once: true }}
          >
            <Typography 
              variant="h5" 
              sx={{ color: theme.palette.accent.main, fontWeight: 600 }}
            >
              {sectionNumber}
            </Typography>
            
            {title && (
              <Typography variant="h4" sx={{ mt: 1, mb: 3 }}>{title}</Typography>
            )}
            
            <Box className="project-content">
              {renderContentSection(content, fallbackContent)}
            </Box>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Box 
            component={motion.div}
            initial={imageAnimation.initial}
            whileInView={imageAnimation.animate}
            transition={imageAnimation.transition}
            viewport={{ once: true }}
            sx={{
              overflow: 'hidden',
              borderRadius: theme.shape.borderRadius,
              height: '100%',
              minHeight: { 
                xs: theme.customSizes.projectImageHeight || '250px',
                md: theme.customSizes.projectImageHeight || '300px' 
              },
              bgcolor: theme.palette.background.paper,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: isReversed ? theme.elevations[2] : 'none', // Use theme elevation
            }}
          >
            {imageData ? (
              <ContentAwareImage
                imageData={imageData}
                src={typeof imageData === 'string' ? imageData : imageData?.src}
                alt={title}
                containerHeight="100%"
                containerOrientation="landscape"
              />
            ) : (
              <Typography variant="body2" color="text.secondary">
                Image not available
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProjectSection;
