import React, { useMemo } from 'react';
import { Box, Divider, Typography, useTheme, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { parseProjectContent, formatSectionHeading, createNumberedSection } from '../../utils/contentParser';
import { isVideo } from '../../utils/mediaHelper';
import ErrorBoundary from '../common/ErrorBoundary';

// Import modular components
import ProjectHeader from './ProjectHeader';
import ProjectNavigation from './ProjectNavigation';
import HeroVideo from './HeroVideo';
import ProjectSection from './ProjectSection';
import PrototypeShowcase from './PrototypeShowcase';
import KeyTakeaways from './KeyTakeaways';
import FooterContact from '../contact/FooterContact';
import ProjectGallery from '../common/ProjectGallery';
import ContentAwareImage from '../common/ContentAwareImage';

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
    // Parse project details
    const parsed = project?.details ? parseProjectContent(project.details) : {
      overview: null,
      problemStatement: null,
      research: null,
      solution: null,
      prototype: null,
      outcomes: null,
      fullContent: null,
      sections: [],
      sectionCount: 0
    };
    
    // If no content was categorized but we have fullContent, use it as overview
    if (
      !parsed.overview && 
      !parsed.problemStatement && 
      !parsed.research && 
      !parsed.solution && 
      !parsed.prototype && 
      !parsed.outcomes && 
      parsed.fullContent
    ) {
      parsed.overview = parsed.fullContent;
    }
    
    return parsed;
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
  
  // Determine project layout type
  const layoutType = project.layoutType || 'default';
  
  // Determine if we should show individual sections or just the full content
  const useFullContentLayout = layoutType === 'single-column' || 
                              !parsedContent.sections || 
                              parsedContent.sections.length === 0 ||
                              (parsedContent.fullContent && parsedContent.sectionCount <= 1);

  // Get project accent color for section numbering
  const projectAccentColor = project.color || theme.palette.primary.main;
  
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
          
          {!useFullContentLayout ? (
            <>
              <Divider sx={{ my: 6 }} />
              
              {/* Dynamic section rendering based on parsed content sections */}
              {parsedContent.sections.map((section, index) => (
                <React.Fragment key={index}>
                  <ProjectSection
                    sectionNumber={section.number}
                    title={section.title}
                    titleVariant="h3"
                    titleComponent="h3"
                    content={section.content}
                    imageData={project.featuredImages?.[sectionImageKeyMap(section.title)] || 
                              (index < project.images?.length ? project.images[index] : null)}
                    direction={index % 2 === 1 ? "reverse" : "default"}
                    headingColor={theme.palette.text.primary}
                    accentColor={projectAccentColor}
                    fallbackContent={getFallbackContent(section.title, project)}
                  />
                  {index < parsedContent.sections.length - 1 && (
                    <Divider sx={{ my: 6 }} />
                  )}
                </React.Fragment>
              ))}
            </>
          ) : (
            <>
              <Divider sx={{ my: 6 }} />
              
              <Box component="section" sx={{ py: 4 }}>
                {parsedContent.fullContent ? (
                  <Box 
                    component={motion.div}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {parsedContent.fullContent}
                  </Box>
                ) : (
                  <Typography variant="body1">{project.description}</Typography>
                )}
              </Box>
              
              {project.featuredImages && Object.keys(project.featuredImages).length > 0 && (
                <Box 
                  component="section" 
                  sx={{ 
                    mt: 6,
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                    gap: 4
                  }}
                >
                  {Object.entries(project.featuredImages).map(([key, imageData]) => {
                    if (!imageData || (Array.isArray(imageData) && imageData.length === 0)) return null;
                    
                    return (
                      <Box 
                        key={key}
                        sx={{ 
                          overflow: 'hidden',
                          borderRadius: theme.shape.borderRadius,
                          boxShadow: theme.shadows[2],
                          height: { xs: '250px', md: '300px' }
                        }}
                      >
                        <ContentAwareImage
                          imageData={imageData}
                          src={typeof imageData === 'string' ? imageData : 
                               Array.isArray(imageData) ? 
                                 (typeof imageData[0] === 'string' ? imageData[0] : imageData[0]?.src) : 
                                 imageData?.src}
                          alt={`${project.title} - ${key}`}
                          containerHeight="100%"
                          containerOrientation="landscape"
                        />
                      </Box>
                    );
                  })}
                </Box>
              )}
              
              <Divider sx={{ my: 6 }} />
            </>
          )}
          
          <Box component="section" sx={{ py: 6 }}>
            {/* Format the Outcomes section with consistent numbering */}
            <Typography 
              variant="h5" 
              sx={{ 
                color: projectAccentColor,
                fontWeight: 600,
                mb: 2
              }}
            >
              {parsedContent.sections.length > 0 
                ? (parsedContent.sections.length + 1).toString().padStart(2, '0')
                : "01"}
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
            
            <Grid container spacing={4}>
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
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="h4" component="h4" sx={{ mb: 2 }}>
                  Key Takeaways
                </Typography>
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
                  titleVariant="h5"
                  titleComponent="h5"
                  headingColor={theme.palette.text.primary}
                />
              </Grid>
            </Grid>
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

/**
 * Maps section titles to featuredImages keys
 * @param {string} sectionTitle - The title of the section
 * @returns {string} - The key to use for featuredImages
 */
function sectionImageKeyMap(sectionTitle) {
  const title = sectionTitle.toLowerCase();
  
  if (title.includes('overview') || title.includes('introduction') || title.includes('project')) {
    return 'overview';
  } else if (title.includes('problem') || title.includes('context') || title.includes('challenge') || title.includes('motivation')) {
    return 'problem';
  } else if (title.includes('solution') || title.includes('approach') || title.includes('implementation') || title.includes('technical')) {
    return 'solution';
  } else if (title.includes('prototype') || title.includes('component') || title.includes('toolkit') || title.includes('design')) {
    return 'prototypeShowcase';
  }
  
  // Default case
  return null;
}

/**
 * Provides fallback content for sections
 * @param {string} sectionTitle - The title of the section
 * @param {object} project - The project object
 * @returns {JSX.Element|null} - Fallback content
 */
function getFallbackContent(sectionTitle, project) {
  const title = sectionTitle.toLowerCase();
  
  if (title.includes('overview') || title.includes('introduction')) {
    return (
      <Typography variant="body1">
        {project.description || `${project.title} explores innovative approaches to ${project.categories[0]}, 
        creating solutions that address real-world challenges.`}
      </Typography>
    );
  } else if (title.includes('problem') || title.includes('challenge')) {
    return (
      <Typography variant="body1">
        {project.categories.includes('UX Research') ? (
          <>
            This project addressed key challenges within {project.categories[0]}, identifying user pain points
            through systematic research methodologies and stakeholder interviews.
          </>
        ) : project.categories.includes('Haptic Design') ? (
          <>
            The project tackled the challenge of creating intuitive tactile experiences that effectively 
            communicate information through non-visual means, addressing accessibility and engagement.
          </>
        ) : (
          <>
            This work identified critical gaps in existing approaches to {project.categories[0]},
            focusing on opportunities to enhance user experiences through innovative design solutions.
          </>
        )}
      </Typography>
    );
  } else if (title.includes('solution') || title.includes('approach')) {
    return (
      <Typography variant="body1">
        {project.categories.includes('UX Research') ? (
          <>
            The solution involved <strong>user-centered methodologies</strong> including interviews, 
            usability testing, and iterative design to ensure solutions addressed actual user needs.
          </>
        ) : project.categories.includes('Haptic Design') ? (
          <>
            Implementation involved <strong>specialized haptic hardware</strong> including tactile actuators,
            motion sensors, and signal processing to create engaging multi-sensory experiences.
          </>
        ) : project.categories.includes('AI Integration') ? (
          <>
            The approach leveraged <strong>machine learning algorithms</strong> and neural networks to create
            adaptive experiences with real-time processing capabilities.
          </>
        ) : (
          <>
            The solution implemented <strong>modern design principles</strong> and technical approaches
            to create an intuitive, efficient user experience addressing the identified challenges.
          </>
        )}
      </Typography>
    );
  }
  
  // Default case
  return null;
}

export default ProjectModal;