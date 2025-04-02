import React from 'react';
import { Box, Typography, Grid, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import ContentAwareImage from '../common/ContentAwareImage';
import { renderContentSection } from '../../utils/contentParser';

const PrototypeShowcase = ({
  sectionNumber,
  title = 'Prototyping Showcase',
  content = null,
  prototypeImages = [],
  captions = [],
  footerText = 'The prototyping process evolved through multiple iterations, each refining the user experience based on feedback and testing.'
}) => {
  const theme = useTheme();
  
  if (prototypeImages.length === 0) return null;
  
  return (
    <Box component="section" sx={{ py: 6 }}>
      <Typography variant="h5" color="text.accent" sx={{ color: theme.palette.accent.main, fontWeight: 600 }}>
        {sectionNumber}
      </Typography>
      
      <Typography variant="h4" sx={{ mt: 1, mb: 4 }}>{title}</Typography>
      
      {/* Render content if available */}
      {renderContentSection(content)}
      
      {/* Prototype Showcase */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        {prototypeImages.map((img, idx) => (
          <Grid item xs={12} sm={4} key={idx}>
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * idx }}
              viewport={{ once: true }}
              sx={{
                height: { xs: '250px', md: '300px' },
                width: '100%',
                borderRadius: theme.shape.borderRadius,
                overflow: 'hidden',
                boxShadow: `0 4px 12px ${theme.palette.shadow.light}`,
              }}
            >
              <ContentAwareImage
                imageData={img}
                src={typeof img === 'string' ? img : img?.src || '/fallback-image.jpg'}
                alt={`Prototype ${idx + 1}`}
                containerHeight="100%"
                containerWidth="100%"
                objectFit="cover"
              />
            </Box>
            
            {captions[idx] && (
              <Typography 
                variant="caption" 
                sx={{ 
                  display: 'block', 
                  textAlign: 'center', 
                  mt: 1,
                  color: theme.palette.text.secondary
                }}
              >
                {captions[idx]}
              </Typography>
            )}
          </Grid>
        ))}
      </Grid>
      
      <Typography variant="body2" sx={{ mt: 4, color: theme.palette.text.secondary, textAlign: 'center' }}>
        {footerText}
      </Typography>
    </Box>
  );
};

export default PrototypeShowcase;
