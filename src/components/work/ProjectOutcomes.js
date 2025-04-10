import React, { useMemo } from 'react';
import { Box, Typography, Grid, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import KeyTakeaways from './KeyTakeaways';

/**
 * ProjectOutcomes Component
 * 
 * Displays project outcomes and key takeaways in a standardized format
 * Now smarter about avoiding duplicated content when project already has outcomes
 */
const ProjectOutcomes = ({ 
  project, 
  outcomes, 
  sectionNumber,
  accentColor 
}) => {
  const theme = useTheme();
  
  // Check if the project details already contain an outcomes or impact section
  const hasExistingOutcomes = useMemo(() => {
    if (!project.details) return false;
    
    // Convert details to string for easy searching if it's a React element
    const detailsString = project.details.props?.children
      ? project.details.props.children
          .map(child => {
            // Extract text from Typography components
            if (child?.type?.name === 'Typography' || child?.type === Typography) {
              return child.props?.children || '';
            }
            return '';
          })
          .join(' ')
      : '';
    
    // Check for common outcome section titles
    return (
      detailsString.includes('Impact & Outcomes') || 
      detailsString.includes('Outcomes & Results') ||
      detailsString.includes('Results & Impact')
    );
  }, [project.details]);
  
  // Determine the appropriate section title based on content
  const sectionTitle = useMemo(() => {
    if (hasExistingOutcomes) {
      return "Key Takeaways";
    }
    return "Outcomes & Key Learnings";
  }, [hasExistingOutcomes]);
  
  return (
    <Box component="section" sx={{ py: 6 }}>
      <Typography 
        variant="h5" 
        sx={{ 
          color: accentColor || theme.palette.primary.main,
          fontWeight: 600,
          mb: 2
        }}
      >
        {sectionNumber || "01"}
      </Typography>
      
      <Typography 
        variant="h3" 
        component="h3" 
        sx={{ 
          mb: 3,
          color: theme.palette.text.primary
        }}
      >
        {sectionTitle}
      </Typography>
      
      <Grid container spacing={4}>
        {/* Only show outcomes section if it doesn't already exist in project details */}
        {!hasExistingOutcomes && (
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h4" sx={{ mb: 2 }}>
              Outcomes
            </Typography>
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              {outcomes && outcomes.length > 0 ? (
                outcomes.map((content, idx) => (
                  <React.Fragment key={idx}>{content}</React.Fragment>
                ))
              ) : (
                <Typography variant="body1" paragraph>
                  This project provided valuable insights into {project.categories?.[0]} processes and methodologies.
                  {project.title.includes("Master Thesis") ? (
                    <>{" The research successfully established a framework for haptic design that bridges emotion theory with tangible prototyping."}</>
                  ) : project.title.includes("Relaxation") ? (
                    <>{" The application demonstrated how AI-driven sound generation can be effectively combined with haptic feedback for enhanced user experiences."}</>
                  ) : project.title.includes("Green Wallet") ? (
                    <>{" The first-place victory at the hackathon validated our approach to gamifying sustainable financial transactions."}</>
                  ) : (
                    <>{" The outcomes demonstrate how design thinking can address complex user needs through innovative solutions."}</>
                  )}
                </Typography>
              )}
            </Box>
          </Grid>
        )}
        
        <Grid item xs={12} md={hasExistingOutcomes ? 12 : 6}>
          <KeyTakeaways 
            takeaways={project.keyTakeaways || projectDefaultTakeaways(project)}
            // If this is the only section, use h4 to maintain hierarchy
            titleVariant={hasExistingOutcomes ? "h4" : "h5"}
            titleComponent={hasExistingOutcomes ? "h4" : "h5"}
            // Remove the title if we're already using it as the section title
            title={hasExistingOutcomes ? null : "Key Takeaways"}
            headingColor={theme.palette.text.primary}
          />
          
          {hasExistingOutcomes && (
            <Box sx={{ mt: 3, pt: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
              <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                These key takeaways summarize the main lessons and insights from this project.
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

/**
 * Generates default takeaways based on project categories
 */
const projectDefaultTakeaways = (project) => {
  return [
    project.categories.includes('UX Research') && 
      "User-centered methodologies proved essential for addressing complex design challenges",
    project.categories.includes('Prototyping') && 
      "Iterative prototyping led to refined and more user-centered outcomes",
    project.categories.includes('Haptic Design') && 
      "Multi-sensory design creates more engaging and memorable user experiences",
    project.categories.includes('AI Integration') && 
      "AI integration requires careful balance between automation and meaningful user control",
    project.categories.includes('Graphic Design') && 
      "Visual communication can effectively raise awareness about complex technological issues",
    "Cross-disciplinary collaboration significantly enriches the design process"
  ].filter(Boolean);
};

export default ProjectOutcomes;
