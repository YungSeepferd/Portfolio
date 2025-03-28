import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Typography, Button, Grid, Card, CardMedia, CardContent, IconButton, useTheme, ToggleButton, ToggleButtonGroup, Paper, Container, Divider, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import './Work.css';
import { workData } from '../data/WorkData';
import ErrorBoundary from './ErrorBoundary';

// Define category groups and their colors from theme.js
const categoryGroups = {
  "UX": {
    categories: ["UX Research", "Interaction Design", "Prototyping", "UX Testing"],
    color: "primary.main", // Dark blue
  },
  "Graphic Design": {
    categories: ["Graphic Design"],
    color: "secondary.main", // Light blue
  },
  "AI & Haptics": {
    categories: ["Haptic Design", "AI LLMs"],
    color: "accent.main", // Earthy accent
  },
};

// Flatten all categories into a single array with their group and color
const categorizedFilters = Object.entries(categoryGroups).map(([group, { categories, color }]) => ({
  group,
  categories,
  color,
}));

// FilterBar Component - allows selection of one category group at a time
const FilterBar = ({ selectedGroup, setSelectedGroup }) => {
  const theme = useTheme();

  const handleSelection = (event, newGroup) => {
    setSelectedGroup(newGroup);
  };

  return (
    <Box className="filter-bar" sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
      <ToggleButtonGroup
        value={selectedGroup}
        exclusive
        onChange={handleSelection}
        sx={{ gap: 2 }}
      >
        {categorizedFilters.map(({ group, color }) => (
          <ToggleButton
            key={group}
            value={group}
            sx={{
              color: theme.palette[color],
              borderColor: theme.palette[color],
              '&.Mui-selected': {
                backgroundColor: theme.palette[color],
                color: theme.palette.common.white,
              },
            }}
          >
            {group}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
};

// ProjectCard Component - update to ensure content stays within card bounds
const ProjectCard = ({ project, onClick }) => {
  const theme = useTheme();
  
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      onClick={() => onClick(project)}
      style={{ cursor: 'pointer' }}
    >
      <Card 
        className="project-card"
        sx={{ 
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflow: 'hidden',  // Prevents content overflow
        }}
      >
        <CardMedia
          component="img"
          height="160" // Changed from 200px to 160px to make image shorter
          image={project.media.src}
          alt={project.title}
          className="project-image"
          sx={{
            objectFit: 'cover',
          }}
        />
        <CardContent 
          sx={{ 
            flexGrow: 1,
            padding: theme.spacing(2),
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography 
            variant="h5" 
            className="project-title"
            sx={{
              mb: 1.5,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {project.title}
          </Typography>
          <Typography 
            variant="body2" 
            className="project-description"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {project.description}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// ProjectModal Component - update button positioning
const ProjectModal = ({ project, projects, currentIndex, setCurrentIndex, onClose }) => {
  const [currentImg, setCurrentImg] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const theme = useTheme();
  const videoRef = React.useRef(null);

  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0.4; // Set volume to 40%
      videoRef.current.play().catch(e => {
        console.log("Autoplay prevented:", e);
      });
    }
  }, [currentImg]);

  if (!project) return null;

  const nextImage = () => {
    setCurrentImg((prev) => (prev + 1) % project.images.length);
  };
  const prevImage = () => {
    setCurrentImg((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  const nextProject = () => {
    const nextIndex = (currentIndex + 1) % projects.length;
    setCurrentIndex(nextIndex);
    setCurrentImg(0);
  };
  const prevProject = () => {
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    setCurrentIndex(prevIndex);
    setCurrentImg(0);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const isVideo = (src) => {
    if (!src) return false;
    return src.toString().match(/\.(mp4|webm|ogg)$/i);
  };

  const extractSections = () => {
    const sections = [];
    let currentSection = { title: null, content: null };
    
    React.Children.forEach(project.details.props.children, (child) => {
      if (child.type && child.props.variant === 'h3') {
        if (currentSection.title) {
          sections.push({...currentSection});
        }
        currentSection = { title: child, content: [] };
      } else if (currentSection.title) {
        currentSection.content = currentSection.content || [];
        currentSection.content.push(child);
      }
    });
    
    if (currentSection.title) {
      sections.push(currentSection);
    }
    
    return sections;
  };
  
  const sections = extractSections();
  const heroImage = project.images[0];

  return (
    <motion.div 
      className="modal-backdrop" 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: 1000,
        overflow: 'auto',
        backgroundColor: theme.palette.background.default
      }}
    >
      <motion.div 
        className="modal-content"
        initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}
        onClick={(e) => e.stopPropagation()}
        style={{ 
          position: 'relative', 
          width: '100%',
          maxWidth: '100%',
          minHeight: '90vh',
          margin: '0',
          padding: '0',
          backgroundColor: theme.palette.background.paper,
          borderRadius: '0',
          overflowY: 'auto',
        }}
      >
        {/* Close Button - Right side */}
        <Button 
          onClick={onClose} 
          variant="contained" 
          color="secondary"
          size="small"
          sx={{ 
            position: 'fixed',
            top: 20, 
            right: 20,
            zIndex: 1200,
            minWidth: 'auto'
          }}
        >
          Close
        </Button>

        {/* Back to Projects Button - with adjusted arrow position */}
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={onClose}
          startIcon={
            <span style={{ 
              display: 'inline-block', 
              position: 'relative',
              top: '-2px' // Move the arrow up by 2px for better vertical alignment
            }}>
              ←
            </span>
          }
          sx={{
            position: 'fixed',
            top: 'auto',
            bottom: '65%',
            left: 20,
            zIndex: 1200,
            minWidth: 'auto',
            transform: 'translateY(50%)',
            borderRadius: '50px',
            paddingLeft: '16px',
            paddingRight: '16px',
            boxShadow: theme.shadows[4],
          }}
        >
          Back
        </Button>

        <Box sx={{
          position: 'relative', 
          width: '100%',
          height: '40vh',
          overflow: 'hidden',
        }}>
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundImage: `url(${heroImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.7)',
            }}
          />
          
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
              padding: theme.spacing(3),
              paddingTop: theme.spacing(6),
            }}
          >
            <Container maxWidth="lg">
              <Typography 
                variant="projectTitle"
                sx={{ 
                  color: theme.palette.common.white,
                  textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                }}
              >
                {project.title}
              </Typography>
              
              {/* Project navigation moved here */}
              <Box 
                sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  color: 'white',
                  mt: 2,
                }}
              >
                <IconButton 
                  onClick={(e) => { e.stopPropagation(); prevProject(); }} 
                  aria-label="Previous Project"
                  sx={{ color: 'white' }}
                >
                  &lt;
                </IconButton>
                <Typography sx={{ color: 'white' }}>
                  {currentIndex + 1} / {projects.length}
                </Typography>
                <IconButton 
                  onClick={(e) => { e.stopPropagation(); nextProject(); }} 
                  aria-label="Next Project"
                  sx={{ color: 'white' }}
                >
                  &gt;
                </IconButton>
              </Box>
            </Container>
          </Box>
        </Box>

        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 2, 
              mb: 4,
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between', // Space items between left and right
              gap: 1.5,
              backgroundColor: theme.palette.background.default,
              borderRadius: theme.shape.borderRadius,
            }}
          >
            {/* Left side: Tools */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
              {project.tools && project.tools.map(tool => (
                <Box 
                  key={tool}
                  sx={{ 
                    bgcolor: theme.palette.background.paper,
                    color: theme.palette.text.secondary,
                    px: 2,
                    py: 1,
                    borderRadius: theme.shape.borderRadius,
                    boxShadow: `0 1px 3px ${theme.palette.card.shadow}`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    fontSize: '0.9rem',
                    fontWeight: 500
                  }}
                >
                  <span role="img" aria-label={tool}>🔧</span>
                  {tool}
                </Box>
              ))}
            </Box>
            
            {/* Right side: Links for Procedural Haptics project only */}
            {project.id === 2 && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Link 
                  href="https://react-midi.netlify.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    color: theme.palette.primary.main,
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    '&:hover': {
                      textDecoration: 'underline',
                    }
                  }}
                >
                  <LaunchIcon fontSize="small" />
                  Demo
                </Link>
                <Link 
                  href="https://github.com/NesR0M/Industry_Project" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    color: theme.palette.primary.main,
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    '&:hover': {
                      textDecoration: 'underline',
                    }
                  }}
                >
                  <GitHubIcon fontSize="small" />
                  GitHub
                </Link>
              </Box>
            )}
          </Paper>
          
          {sections.map((section, index) => (
            <Grid 
              container 
              key={index} 
              spacing={4} 
              direction={index % 2 === 0 ? 'row' : 'row-reverse'}
              sx={{ mb: 6 }}
            >
              {/* Image Column */}
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    minHeight: '300px',
                    borderRadius: theme.shape.borderRadius,
                    overflow: 'hidden',
                    backgroundColor: theme.palette.background.default,
                  }}
                >
                  {/* Replace conditional component with separate renders for img and placeholder */}
                  {index + 1 < project.images.length ? (
                    <img
                      src={project.images[index + 1]}
                      alt={`Project visual for ${project.title}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  ) : (
                    <Box
                      sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: theme.palette.background.default,
                      }}
                    >
                      <Typography variant="body1" color="textSecondary">No image available</Typography>
                    </Box>
                  )}
                </Box>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Box sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}>
                  {section.title}
                  
                  <Box sx={{
                    '& .MuiTypography-root': {
                      mb: 2,
                      lineHeight: 1.6,
                    },
                    '& ul': {
                      pl: theme.spacing(2),
                      mb: 2,
                    },
                    '& li': {
                      mb: 1,
                    }
                  }}>
                    {section.content}
                  </Box>
                </Box>
              </Grid>
              
              {index < sections.length - 1 && (
                <Grid item xs={12}>
                  <Divider sx={{ my: 3 }} />
                </Grid>
              )}
            </Grid>
          ))}
          
          <Typography variant="h4" sx={{ mt: 6, mb: 3 }}>
            Project Gallery
          </Typography>
          
          <Paper
            elevation={0}
            sx={{
              borderRadius: theme.shape.borderRadius,
              overflow: 'hidden',
              backgroundColor: theme.palette.background.default,
              p: 2,
              mb: 4,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Box sx={{ position: 'relative', textAlign: 'center' }}>
              <Box sx={{ py: 1, fontWeight: 500 }}>
                {isVideo(project.images[currentImg]) ? 'Video' : 'Image'} {currentImg + 1} of {project.images.length}
              </Box>
              
              <Grid container spacing={2}>
                <Grid item xs={12} md={9}>
                  <Box
                    sx={{
                      width: '100%',
                      paddingTop: { xs: '75%', md: '56.25%' },
                      position: 'relative',
                      overflow: 'hidden',
                      backgroundColor: theme.palette.background.default,
                      borderRadius: 2,
                      mb: 2,
                    }}
                  >
                    {isVideo(project.images[currentImg]) ? (
                      <video 
                        ref={videoRef}
                        src={project.images[currentImg]} 
                        alt={`Video ${currentImg + 1}`}
                        controls
                        playsInline
                        preload="auto"
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          backgroundColor: theme.palette.background.paper,
                        }}
                        onClick={(e) => e.stopPropagation()}
                      />
                    ) : (
                      <img 
                        src={project.images[currentImg]} 
                        alt={`Screenshot ${currentImg + 1}`}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          backgroundColor: theme.palette.background.paper,
                        }}
                        onClick={(e) => e.stopPropagation()}
                      />
                    )}
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
                    <Button 
                      variant="outlined"
                      onClick={(e) => { e.stopPropagation(); prevImage(); }}
                      startIcon={<span>&lt;</span>}
                    >
                      Previous
                    </Button>
                    <Button 
                      variant="outlined"
                      onClick={(e) => { e.stopPropagation(); nextImage(); }}
                      endIcon={<span>&gt;</span>}
                    >
                      Next
                    </Button>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={3}>
                  <Box sx={{ 
                    maxHeight: '400px', 
                    overflowY: 'auto',
                    pr: 1,
                    '&::-webkit-scrollbar': {
                      width: '4px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      backgroundColor: theme.palette.action.hover,
                      borderRadius: '4px',
                    },
                  }}>
                    <Grid container spacing={1}>
                      {project.images.map((img, idx) => (
                        <Grid item xs={4} sm={3} md={6} key={idx}>
                          <Box
                            onClick={(e) => { e.stopPropagation(); setCurrentImg(idx); }}
                            sx={{
                              width: '100%',
                              paddingTop: '75%',
                              position: 'relative',
                              borderRadius: 1,
                              overflow: 'hidden',
                              cursor: 'pointer',
                              border: idx === currentImg ? `2px solid ${theme.palette.primary.main}` : 'none',
                              opacity: idx === currentImg ? 1 : 0.7,
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                opacity: 1,
                              }
                            }}
                          >
                            {isVideo(img) ? (
                              <Box
                                sx={{
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  width: '100%',
                                  height: '100%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  backgroundColor: 'black',
                                }}
                              >
                                <Typography sx={{ color: 'white', fontSize: '0.8rem' }}>Video</Typography>
                              </Box>
                            ) : (
                              <img
                                src={img}
                                alt={`Thumbnail ${idx + 1}`}
                                style={{
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover',
                                }}
                              />
                            )}
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Container>
      </motion.div>
    </motion.div>
  );
};

// Main Work Component
function Work() {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(null);

  const filteredProjects = workData.filter((project) =>
    !selectedGroup ||
    categorizedFilters
      .find((filter) => filter.group === selectedGroup)
      .categories.some((cat) => project.categories.includes(cat))
  );

  const currentProject = currentProjectIndex !== null ? workData[currentProjectIndex] : null;

  return (
    <ErrorBoundary>
      <Box
        className="work-section"
        sx={{
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: { xs: 2, md: 4 },
          boxSizing: 'border-box',
        }}
      >
        <Typography variant="h2" component="h1">
          Work Section
        </Typography>
        <Box sx={{ width: '100%', mt: 4 }}>
          <motion.section
            id="work"
            className="work-container"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <FilterBar
              selectedGroup={selectedGroup}
              setSelectedGroup={setSelectedGroup}
            />

            <Grid container spacing={4} justifyContent="center">
              {filteredProjects.map((project) => (
                <Grid item key={project.id} xs={12} sm={6} md={4}>
                  <ProjectCard
                    project={project}
                    onClick={(proj) => {
                      const idx = workData.findIndex((p) => p.id === proj.id);
                      setCurrentProjectIndex(idx);
                    }}
                  />
                </Grid>
              ))}
            </Grid>
            <AnimatePresence>
              {currentProject !== null && (
                <ProjectModal 
                  project={currentProject} 
                  projects={workData} 
                  currentIndex={currentProjectIndex} 
                  setCurrentIndex={setCurrentProjectIndex} 
                  onClose={() => setCurrentProjectIndex(null)} 
                />
              )}
            </AnimatePresence>
          </motion.section>
        </Box>
      </Box>
    </ErrorBoundary>
  );
}

export default Work;