import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Typography, Button, Grid, Card, CardMedia, CardContent, IconButton, useTheme, ToggleButton, ToggleButtonGroup } from '@mui/material';
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

// ProjectCard Component - displays project thumbnail and basic info
const ProjectCard = ({ project, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      onClick={() => onClick(project)}
      style={{ cursor: 'pointer' }}
    >
      <Card className="project-card">
        <CardMedia
          component="img"
          height="200"
          image={project.media.src}
          alt={project.title}
          className="project-image"
        />
        <CardContent>
          <Typography variant="h5" className="project-title">
            {project.title}
          </Typography>
          <Typography variant="body2" className="project-description">
            {project.description}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// ProjectModal Component - popup modal displaying detailed project info,
// including an image carousel with navigation and in-modal project switching.
const ProjectModal = ({ project, projects, currentIndex, setCurrentIndex, onClose }) => {
  const [currentImg, setCurrentImg] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const theme = useTheme(); // Access theme colors

  if (!project) return null;

  // Handlers for the image carousel
  const nextImage = () => {
    setCurrentImg((prev) => (prev + 1) % project.images.length);
  };
  const prevImage = () => {
    setCurrentImg((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  // Handlers for navigating between projects, wrapping around at the boundaries
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

  // Toggle image expansion/zoom
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

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
        overflow: 'auto', // Enable scroll on the backdrop
        backgroundColor: theme.palette.background.default // Set backdrop color from theme
      }}
    >
      <motion.div 
        className="modal-content" 
        initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
        style={{ 
          position: 'relative', 
          margin: '5% auto', 
          padding: '1rem', 
          maxWidth: '1300px', 
          borderRadius: '12px',
          maxHeight: '90vh', // Limit the height of the modal content
          overflowY: 'auto' // Enable vertical scrolling within the modal
        }}
      >
        {/* In-modal Navigation Controls */}
        <div className="modal-nav">
          <IconButton onClick={prevProject} aria-label="Previous Project">&lt;</IconButton>
          <span>Project {currentIndex + 1} of {projects.length}</span>
          <IconButton onClick={nextProject} aria-label="Next Project">&gt;</IconButton>
        </div>

        {/* Image Carousel */}
        <div className="carousel" style={{ position: 'relative', textAlign:'center' }}>
          <IconButton onClick={prevImage} aria-label="Previous Image" style={{ position: 'absolute', left: '0', top: '50%', transform: 'translateY(-50%)' }}>&#8249;</IconButton>
          <img 
            src={project.images[currentImg]} 
            alt={`Screenshot ${currentImg + 1}`} 
            onDoubleClick={toggleExpand}
            style={ isExpanded 
              ? { width: '100%', maxHeight: '80vh', objectFit: 'contain', cursor: 'zoom-out' } 
              : { width: '100%', height: 'auto', cursor: 'zoom-in' } 
            }
          />
          <IconButton onClick={nextImage} aria-label="Next Image" style={{ position: 'absolute', right: '0', top: '50%', transform: 'translateY(-50%)' }}>&#8250;</IconButton>
          <div style={{ marginTop: '0.5rem' }}>Image {currentImg + 1} of {project.images.length}</div>
        </div>

        {/* Project Case Study Content */}
        <div className="project-details" style={{ marginTop: '1rem' }}>
          <Typography variant="h4">{project.title}</Typography>
          <Typography variant="subtitle1">{project.details}</Typography>
          <section>
            <h3>Problem Statement</h3>
            <p>{project.problem || "Problem statement coming soon..."}</p>
          </section>
          <section>
            <h3>Research Process</h3>
            <p>{project.research || "Details to be added..."}</p>
          </section>
          <section>
            <h3>Solution</h3>
            <p>{project.solution || "Solution details to be added..."}</p>
          </section>
          <section>
            <h3>Outcomes</h3>
            <p>{project.outcome || "Outcome details coming soon..."}</p>
          </section>
          {/* Tools/Tech Stack */}
          <section className="tool-list">
            <h3>Tools &amp; Technologies</h3>
            <ul>
              {project.tools && project.tools.map(tool => (
                <li key={tool}>
                  {/* Placeholder icon : replace with actual icon images or libraries */}
                  <span role="img" aria-label={tool}>🔧</span> {tool}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Close Button */}
        <Button 
          onClick={onClose} 
          variant="contained" 
          color="secondary" 
          style={{ position: 'absolute', top: 10, right: 10 }}
        >
          Close
        </Button>
      </motion.div>
    </motion.div>
  );
};

// Main Work Component
function Work() {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(null);

  // Filter projects: show a project if no filter is active or if it matches the selected group
  const filteredProjects = workData.filter((project) =>
    !selectedGroup ||
    categorizedFilters
      .find((filter) => filter.group === selectedGroup)
      .categories.some((cat) => project.categories.includes(cat))
  );

  // Get current project data if any is selected
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
            {/* --- FilterBar Component --- */}
            <FilterBar
              selectedGroup={selectedGroup}
              setSelectedGroup={setSelectedGroup}
            />

            {/* --- Project Gallery --- */}
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
            {/* --- Project Modal --- */}
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