/**
 * ContentAwareGrid Component
 * 
 * Intelligent grid system that adapts layout based on content analysis
 */
import React from 'react';
import { Box, Grid, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import { 
  analyzeTextContent, 
  analyzeImageContent, 
  determineOptimalLayout,
  calculateGridConfiguration,
  calculateResponsiveSpacing
} from '../../../utils/contentAnalysis';

const ContentAwareGrid = ({
  textContent,
  mediaContent,
  sectionType,
  sectionIndex = 0,
  forceLayout = null,
  children,
  enableAnimation = true,
  ...props
}) => {

  // Analyze content to determine optimal layout
  const textAnalysis = analyzeTextContent(textContent);
  const imageAnalysis = analyzeImageContent(mediaContent);
  
  // Determine layout strategy
  const optimalLayout = forceLayout || determineOptimalLayout(textAnalysis, imageAnalysis, sectionType);
  const gridConfig = calculateGridConfiguration(optimalLayout, textAnalysis, imageAnalysis);
  const spacing = calculateResponsiveSpacing(textAnalysis, imageAnalysis, sectionIndex);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  // Text-only layout
  if (optimalLayout === 'textOnly' || !mediaContent) {
    return (
      <Box
        component={enableAnimation ? motion.div : 'div'}
        {...(enableAnimation ? {
          variants: containerVariants,
          initial: "hidden",
          whileInView: "visible",
          viewport: { once: true, margin: "-100px" }
        } : {})}
        sx={{
          maxWidth: '1200px',
          mx: 'auto',
          px: { xs: 2, sm: 3, md: 4 },
          py: spacing,
          ...props.sx
        }}
        {...props}
      >
        <Grid container justifyContent="center">
          <Grid size={gridConfig.text}>
            <Box
              component={enableAnimation ? motion.div : 'div'}
              {...(enableAnimation ? { variants: itemVariants } : {})}
            >
              {children}
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  }

  // Split layout configurations
  const isReverse = optimalLayout === 'imageFirst';
  const textOrder = { xs: 1, md: isReverse ? 2 : 1 };
  const imageOrder = { xs: 2, md: isReverse ? 1 : 2 };

  // Handle image-first layouts with special spacing
  if (optimalLayout === 'imageFirst' && imageAnalysis.sizing === 'ultra-wide') {
    return (
      <Box
        component={enableAnimation ? motion.div : 'div'}
        {...(enableAnimation ? {
          variants: containerVariants,
          initial: "hidden",
          whileInView: "visible",
          viewport: { once: true, margin: "-100px" }
        } : {})}
        sx={{
          maxWidth: '1200px',
          mx: 'auto',
          px: { xs: 2, sm: 3, md: 4 },
          py: spacing,
          ...props.sx
        }}
        {...props}
      >
        <Stack spacing={spacing}>
          {/* Full-width image first */}
          <Box
            component={enableAnimation ? motion.div : 'div'}
            {...(enableAnimation ? { variants: itemVariants } : {})}
          >
            {React.Children.toArray(children).find(child => 
              child.props?.className?.includes('media') || 
              child.type?.name?.includes('Image') ||
              child.type?.name?.includes('Media')
            )}
          </Box>
          
          {/* Centered text content */}
          <Grid container justifyContent="center">
            <Grid size={{ xs: 12, md: 8, lg: 6 }}>
              <Box
                component={enableAnimation ? motion.div : 'div'}
                {...(enableAnimation ? { variants: itemVariants } : {})}
              >
                {React.Children.toArray(children).filter(child => 
                  !child.props?.className?.includes('media') && 
                  !child.type?.name?.includes('Image') &&
                  !child.type?.name?.includes('Media')
                )}
              </Box>
            </Grid>
          </Grid>
        </Stack>
      </Box>
    );
  }

  // Standard split layout
  return (
    <Box
      component={enableAnimation ? motion.div : 'div'}
      {...(enableAnimation ? {
        variants: containerVariants,
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, margin: "-100px" }
      } : {})}
      sx={{
        maxWidth: '1200px',
        mx: 'auto',
        px: { xs: 2, sm: 3, md: 4 },
        py: spacing,
        ...props.sx
      }}
      {...props}
    >
      <Grid 
        container 
        spacing={gridConfig.spacing}
        alignItems="stretch"
        sx={{
          // Ensure equal heights for content alignment (target direct Grid children)
          '& > .MuiGrid-root': {
            display: 'flex',
            flexDirection: 'column'
          }
        }}
      >
        {/* Text Content */}
        <Grid size={gridConfig.text} sx={{ order: textOrder }}>
          <Box
            component={enableAnimation ? motion.div : 'div'}
            {...(enableAnimation ? { variants: itemVariants } : {})}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: '100%',
              // Add extra padding for long content
              ...(textAnalysis.length === 'long' && {
                py: { xs: 2, md: 3 }
              })
            }}
          >
            {React.Children.toArray(children).filter(child => 
              !child.props?.className?.includes('media') && 
              !child.type?.name?.includes('Image') &&
              !child.type?.name?.includes('Media')
            )}
          </Box>
        </Grid>

        {/* Media Content */}
        {gridConfig.image && (
          <Grid size={gridConfig.image} sx={{ order: imageOrder }}>
            <Box
              component={enableAnimation ? motion.div : 'div'}
              {...(enableAnimation ? { variants: itemVariants } : {})}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                height: '100%'
              }}
            >
              {React.Children.toArray(children).find(child => 
                child.props?.className?.includes('media') || 
                child.type?.name?.includes('Image') ||
                child.type?.name?.includes('Media')
              )}
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ContentAwareGrid;
