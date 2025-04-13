import React, { Suspense, useMemo, useCallback, useState } from 'react';
import { Box, Typography, Divider, CircularProgress, useTheme, Grid, List, ListItem, ListItemIcon, ListItemText, Button, Stack, Link as MuiLink } from '@mui/material';
import { motion } from 'framer-motion';
import ProjectHeader from './ProjectHeader';
import ProjectPrototypeEmbed from './ProjectPrototypeEmbed';
import ProjectSection from './ProjectSection';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';
import ProjectSectionNav from './ProjectSectionNav';
import { Element as ScrollElement } from 'react-scroll';

import { processProjectContent } from '../../utils/projectContentParser';
import ErrorBoundary from '../common/ErrorBoundary';
import ContentContainer from '../common/ContentContainer';
import { useModalContext } from '../../context/ModalContext';
const ProjectImageGallery = React.lazy(() => import('./ProjectImageGallery'));

const IntegratedKeyTakeaways = ({ takeaways, accentColor }) => {
  const theme = useTheme();
  if (!takeaways || takeaways.length === 0) return null;
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" component="h4" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
        <EmojiObjectsOutlinedIcon sx={{ mr: 1, color: accentColor }} /> Key Takeaways
      </Typography>
      <List dense>
        {takeaways.map((takeaway, index) => (
          <ListItem key={index} sx={{ alignItems: 'flex-start', pl: 0 }}>
            <ListItemIcon sx={{ minWidth: 'auto', mr: 1.5, mt: 0.5, color: accentColor }}>
              <CheckCircleOutlineIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={takeaway}
              primaryTypographyProps={{ variant: 'body1', color: 'text.secondary' }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

const ProjectFullContent = ({ project }) => {
  const theme = useTheme();
  const { closeProjectModal } = useModalContext();
  const [currentSectionId, setCurrentSectionId] = useState('');
  const { sections, outcomes, keyTakeaways: parsedKeyTakeaways, prototypeUrl } = useMemo(
    () => project?.details ? processProjectContent(project.details) : { sections: [], outcomes: [], keyTakeaways: [], prototypeUrl: null },
    [project?.details]
  );
  const sectionsWithIds = useMemo(() => sections.map((sec, index) => ({
    ...sec,
    id: sec.id || `project-section-${index}`
  })), [sections]);
  const combinedKeyTakeaways = useMemo(() => {
    const takeaways = new Set([...(parsedKeyTakeaways || [])]);
    if (project?.keyTakeaways && Array.isArray(project.keyTakeaways)) {
      project.keyTakeaways.forEach(kt => takeaways.add(kt));
    }
    return Array.from(takeaways);
  }, [parsedKeyTakeaways, project?.keyTakeaways]);
  const handleSectionChange = useCallback((sectionId) => {
    setCurrentSectionId(sectionId);
  }, []);
  if (!project) {
    return (
      <ContentContainer sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Typography>Project data not available.</Typography>
      </ContentContainer>
    );
  }
  const projectTheme = project.theme || {};
  const accentColor = projectTheme.accentColor || theme.palette.primary.main;
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };
  const scrollContainerId = "modal-scroll-container";
  return (
    <ErrorBoundary componentName={`ProjectFullContent-${project.id}`}>
      <motion.article
        key={project.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <ContentContainer sx={{ pt: { xs: 2, md: 4 }, pb: 8 }}>
          <ProjectHeader
            title={project.title}
            description={project.description}
            categories={project.categories}
            techStack={project.techStack}
            links={project.links}
            theme={projectTheme}
          />
          <ProjectSectionNav
            sections={sectionsWithIds}
            currentSectionId={currentSectionId}
            onSectionChange={handleSectionChange}
            scrollContainerId={scrollContainerId}
          />
          {sectionsWithIds && sectionsWithIds.length > 0 && (
            <Box sx={{ mt: { xs: 4, md: 6 } }}>
              {sectionsWithIds.map((section, index) => (
                <ScrollElement name={section.id} key={section.id || index}>
                  <motion.div
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={sectionVariants}
                  >
                    <ProjectSection
                      section={section}
                      sectionNumber={String(index + 1).padStart(2, '0')}
                      accentColor={accentColor}
                    />
                  </motion.div>
                </ScrollElement>
              ))}
            </Box>
          )}
          {prototypeUrl && (
            <ScrollElement name="prototype-section">
              <Divider sx={{ my: { xs: 4, md: 6 } }} />
              <ProjectPrototypeEmbed url={prototypeUrl} title={`${project.title} Prototype`} />
            </ScrollElement>
          )}
          {project.images && project.images.length > 1 && (
            <ScrollElement name="gallery-section">
              <Divider sx={{ my: { xs: 4, md: 6 } }} />
              <Typography
                variant="h3"
                component="h2"
                sx={{ mb: 4, color: theme.palette.text.primary }}
              >
                Project Gallery
              </Typography>
              <Suspense fallback={
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                  <CircularProgress />
                </Box>
              }>
                <ProjectImageGallery images={project.images} title={project.title} />
              </Suspense>
            </ScrollElement>
          )}
          {(outcomes.length > 0 || combinedKeyTakeaways.length > 0) && (
            <ScrollElement name="outcomes-section">
              <Divider sx={{ my: { xs: 4, md: 6 } }} />
              <motion.div
                custom={sections.length}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
              >
                <Box sx={{ mb: 6 }}>
                  <Typography
                    variant="overline"
                    display="block"
                    sx={{ color: accentColor, mb: 1, fontWeight: 600 }}
                  >
                    Section {String(sections.length + 1).padStart(2, '0')}
                  </Typography>
                  <Typography variant="h3" component="h2" sx={{ mb: 4 }}>
                    Outcomes & Key Takeaways
                  </Typography>
                  {outcomes && outcomes.length > 0 && (
                    <Grid container spacing={3} sx={{ mb: combinedKeyTakeaways.length > 0 ? 4 : 0 }}>
                      {outcomes.map((outcome, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                            <CheckCircleOutlineIcon sx={{ color: accentColor, mr: 1.5, mt: 0.5 }} />
                            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                              {outcome}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  )}

                  <IntegratedKeyTakeaways takeaways={combinedKeyTakeaways} accentColor={accentColor} />
                </Box>
              </motion.div>
            </ScrollElement>
          )}
        </ContentContainer>
      </motion.article>
    </ErrorBoundary>
  );
};

export default ProjectFullContent;