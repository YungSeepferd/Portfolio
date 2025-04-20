import React from 'react';
import { Box, Container, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import DynamicSection from './DynamicSection';
import { processProjectContent } from '../../utils/projectContentParser';

const ProjectContentRenderer = ({ project }) => {
  const theme = useTheme();

  // Process project content using enhanced parser
  const { sections } = processProjectContent(project);

  if (!sections || sections.length === 0) {
    return null;
  }

  return (
    <Box 
      component="article" 
      sx={{
        width: '100%',
        pt: { xs: 4, md: 6 },
        pb: { xs: 6, md: 8 },
        backgroundColor: theme.palette.background.default
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {sections.map((section, index) => (
            <DynamicSection
              key={section.id || index}
              section={section}
              sx={{
                scrollMarginTop: theme.spacing(8),
                mb: index < sections.length - 1 ? { xs: 6, md: 8 } : 0
              }}
            />
          ))}
        </motion.div>
      </Container>
    </Box>
  );
};

export default ProjectContentRenderer;
