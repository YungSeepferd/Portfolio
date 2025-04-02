import React, { useMemo } from 'react';
import { Box, Divider, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { parseProjectContent } from '../../utils/contentParser';
import { isVideo } from '../../utils/mediaHelper';
import ErrorBoundary from '../common/ErrorBoundary';

// Import modular components
import ProjectHeader from './ProjectHeader';
import ProjectNavigation from './ProjectNavigation';
import HeroVideo from './HeroVideo';
import ProjectSection from './ProjectSection';
import PrototypeShowcase from './PrototypeShowcase';
import KeyTakeaways from './KeyTakeaways';
import FooterContact from '../contact/FooterContact'; // Updated import path to use the main FooterContact
import ProjectGallery from '../common/ProjectGallery';

/**
 * ProjectModal Component
 * 
 * Displays detailed information about a selected project.
 * Uses a consistent heading hierarchy:
 * - h2: Main project title (in ProjectHeader)
 * - h3: Main section headings (Overview, Problem, Solution, etc.)
 * - h4: Subsection headings
 * - h5: Component headings within sections
 */
const ProjectModal = ({ project, projects, currentIndex, setCurrentIndex, onClose }) => {
  const theme = useTheme();
  
  const parsedContent = useMemo(() => {
    return project?.details ? parseProjectContent(project.details) : {
      overview: null,
      problemStatement: null,
      research: null,
      solution: null,
      prototype: null,
      outcomes: null,
      fullContent: null
    };
  }, [project?.details]);
  
  const navigateProjects = (direction) => {
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % projects.length
      : (currentIndex - 1 + projects.length) % projects.length;
    setCurrentIndex(newIndex);
  };
  
  if (!project) return null;
  
  const heroVideo = project.images?.find(img => 
    (typeof img === 'object' && img.type === 'video') || 
    (typeof img === 'string' && isVideo(img))
  );
  
  const hasOverview = true;
  const hasProblemOrResearch = parsedContent.problemStatement || parsedContent.research;
  const hasSolution = !!parsedContent.solution;
  const hasPrototype = project.featuredImages?.prototypeShowcase?.length > 0 || !!parsedContent.prototype;
  
  // Calculate section numbers for consistent numbering
  const sectionNumbers = {
    overview: '01',
    problemResearch: hasOverview ? '02' : '01',
    solution: (hasOverview ? 1 : 0) + (hasProblemOrResearch ? 1 : 0) + 1,
    prototype: (hasOverview ? 1 : 0) + (hasProblemOrResearch ? 1 : 0) + (hasSolution ? 1 : 0) + 1,
    outcomes: (hasOverview ? 1 : 0) + (hasProblemOrResearch ? 1 : 0) + (hasSolution ? 1 : 0) + (hasPrototype ? 1 : 0) + 1
  };
  
  // Ensure all section numbers are properly formatted as 2-digit strings
  Object.keys(sectionNumbers).forEach(key => {
    if (typeof sectionNumbers[key] === 'number') {
      sectionNumbers[key] = sectionNumbers[key].toString().padStart(2, '0');
    }
  });
  
  return (
    <ErrorBoundary componentName="ProjectModal">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: theme.palette.background.default,
          zIndex: theme.zIndex.modal,
          overflow: 'auto',
        }}
      >
        <ProjectNavigation 
          onClose={onClose}
          onPrev={() => navigateProjects('prev')}
          onNext={() => navigateProjects('next')}
        />
        
        <Box 
          component="article"
          sx={{ 
            p: { xs: 2, sm: 4, md: 8 },
            pt: { xs: 8, sm: 10 },
            maxWidth: '1600px',
            mx: 'auto',
            width: '100%'
          }}
        >
          <ProjectHeader project={project} />
          
          {heroVideo && <HeroVideo videoSrc={heroVideo} />}
          
          {project.hasPrototypeEmbed && project.prototypeEmbedUrl && (
            <Box 
              component="section"
              sx={{ 
                my: 6,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <Typography 
                variant="h5" 
                component="h3" 
                sx={{ 
                  mb: 3, 
                  textAlign: 'center',
                  color: theme.palette.text.primary
                }}
              >
                Interactive Prototype Demo
              </Typography>
              
              <Box 
                sx={{ 
                  width: '100%', 
                  overflow: 'hidden', 
                  borderRadius: theme.shape.borderRadius,
                  border: `1px solid rgba(0, 0, 0, 0.1)`,
                  height: { xs: '300px', sm: '400px', md: '450px' },
                  maxWidth: '800px',
                  mx: 'auto'
                }}
              >
                <iframe 
                  style={{ 
                    border: 'none',
                    width: '100%',
                    height: '100%'
                  }} 
                  src={project.prototypeEmbedUrl}
                  allowFullScreen
                  title={`${project.title} Prototype`}
                />
              </Box>
              
              <Typography variant="body2" sx={{ mt: 2, color: theme.palette.text.secondary, textAlign: 'center' }}>
                Navigate through the app prototype above to see the full user experience
              </Typography>
            </Box>
          )}
          
          <Divider sx={{ my: 6 }} />
          
          <ProjectSection
            sectionNumber={sectionNumbers.overview}
            title="Project Overview"
            titleVariant="h3"
            titleComponent="h3"
            content={parsedContent.overview?.length > 0 ? parsedContent.overview.slice(1) : null}
            imageData={project.featuredImages?.overview || project.images?.[0]}
            fallbackContent={<Typography variant="body1">{project.description}</Typography>}
            headingColor={theme.palette.text.primary}
          />
          
          <Divider sx={{ my: 6 }} />
          
          {hasProblemOrResearch && (
            <>
              <ProjectSection
                sectionNumber={sectionNumbers.problemResearch}
                title={parsedContent.problemStatement ? 'Problem Statement' : 'Research Methods'}
                titleVariant="h3"
                titleComponent="h3"
                content={
                  parsedContent.problemStatement?.length > 0 
                    ? parsedContent.problemStatement.slice(1) 
                    : (parsedContent.research?.length > 0 
                      ? parsedContent.research.slice(1) 
                      : null)
                }
                imageData={project.featuredImages?.problem || project.images?.[1]}
                direction="reverse"
                headingColor={theme.palette.text.primary}
              />
              <Divider sx={{ my: 6 }} />
            </>
          )}
          
          {hasSolution && (
            <>
              <ProjectSection
                sectionNumber={sectionNumbers.solution}
                title={parsedContent.research && parsedContent.problemStatement ? 'Solution Approach' : 'Technical Solution'}
                titleVariant="h3"
                titleComponent="h3"
                content={parsedContent.solution?.length > 0 ? parsedContent.solution.slice(1) : null}
                imageData={project.featuredImages?.solution || project.images?.[2]}
                headingColor={theme.palette.text.primary}
                fallbackContent={
                  <Typography variant="body1">
                    {project.categories.includes('UX Research') ? (
                      <>
                        The project employed <strong>user-centered methodologies</strong> including interviews, 
                        usability testing, and iterative design to ensure solutions addressed actual user needs and pain points.
                      </>
                    ) : project.categories.includes('Haptic Design') ? (
                      <>
                        Implementation involved <strong>specialized haptic hardware</strong> including tactile actuators,
                        motion sensors, and signal processing. The design utilized vibration patterns mapped to emotional responses.
                      </>
                    ) : project.categories.includes('AI Integration') ? (
                      <>
                        The project leveraged <strong>machine learning algorithms</strong> and neural networks to create
                        adaptive experiences. API integration enabled real-time processing and response generation.
                      </>
                    ) : (
                      <>
                        This project implemented <strong>modern design principles</strong> and technical solutions
                        to create an intuitive, efficient user experience across multiple touchpoints.
                      </>
                    )}
                  </Typography>
                }
              />
              <Divider sx={{ my: 6 }} />
            </>
          )}
          
          {hasPrototype && (
            <>
              <PrototypeShowcase
                sectionNumber={sectionNumbers.prototype}
                title="Prototyping Showcase"
                titleVariant="h3"
                titleComponent="h3"
                content={parsedContent.prototype?.length > 0 ? parsedContent.prototype.slice(1) : null}
                prototypeImages={project.featuredImages?.prototypeShowcase || []}
                headingColor={theme.palette.text.primary}
              />
              <Divider sx={{ my: 6 }} />
            </>
          )}
          
          <Box component="section" sx={{ py: 6 }}>
            <Typography 
              variant="h5" 
              sx={{ color: theme.palette.accent.main, fontWeight: 600, mb: 2 }}
            >
              {sectionNumbers.outcomes}
            </Typography>
            
            <Typography 
              variant="h3" 
              component="h3" 
              sx={{ 
                mb: 3,
                color: theme.palette.text.primary
              }}
            >
              Outcomes & Key Learnings
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 6, mt: 4 }}>
              <Box 
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                sx={{ flex: 1 }}
              >
                {parsedContent.outcomes?.length > 0 ? (
                  parsedContent.outcomes.slice(1).map((content, idx) => (
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
              
              <Box sx={{ flex: 1 }}>
                <KeyTakeaways 
                  takeaways={project.keyTakeaways || [
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
                  ].filter(Boolean)}
                  titleVariant="h4"
                  titleComponent="h4"
                  headingColor={theme.palette.text.primary}
                />
              </Box>
            </Box>
          </Box>
          
          {project.images?.length > 1 && (
            <Box component="section">
              <Typography 
                variant="h3" 
                component="h3" 
                sx={{ 
                  mb: 4,
                  color: theme.palette.text.primary
                }}
              >
                Project Gallery
              </Typography>
              <ProjectGallery images={project.images} title={project.title} />
            </Box>
          )}
          
          <Divider sx={{ my: 6 }} />
          
          {/* Call to action section using the main FooterContact component */}
          <Box component="section" sx={{ py: 4 }}>
            <Typography 
              variant="h3" 
              component="h3" 
              sx={{ 
                mb: 4, 
                textAlign: 'center',
                color: theme.palette.text.primary
              }}
            >
              Interested in this work?
            </Typography>
            <FooterContact projectContext={project.title} />
          </Box>
        </Box>
      </motion.div>
    </ErrorBoundary>
  );
};

export default ProjectModal;