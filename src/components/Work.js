import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import './Work.css';

// Example image imports (adjust import paths as needed)
import heroBG from '../assets/css/images/Haptics.png';
import HapticsBG from '../assets/css/images/ProceduallyGenHaptic.png';
import AMIAIBG from '../assets/css/images/AMIAI.svg';
import HackathonBG from '../assets/css/images/Hackathon.png';
import BachelorBG from '../assets/css/images/FT Level 2 GIF.gif';
import ADHDeer from '../assets/css/images/ADHDeer.png';

// PROJECT DATA (case-study format)
const projects = [
  {
    id: 1,
    title: 'Master Thesis',
    description: 'Exploring novel approaches in human-computer interaction...',
    media: { type: 'image', src: heroBG },
    details: 'An in-depth exploration of haptic feedback systems for immersive experiences.',
    categories: ['UX Research', 'Prototyping', 'Haptic Design'],
    problem: "How can we create immersive haptic feedback?",
    research: "In-depth user interviews and prototype testing were conducted.",
    solution: "Developed a responsive system using novel sensors.",
    outcome: "Enhanced user immersion was observed in lab testing.",
    images: [heroBG, HapticsBG],
    tools: ['Figma', 'Adobe XD']
  },
  {
    id: 2,
    title: 'Generative AI Affective Haptics Research',
    description: 'AI-generated audio for affective haptic feedback to induce relaxation and enhance emotional well-being.',
    media: { type: 'image', src: HapticsBG },
    details: 'Explores the capabilities of AI-generated audio for affective haptic feedback to create experiences that induce relaxation and enhance emotional well-being and productivity. This project was a university collaboration with Innovobot Labs.',
    categories: ['UX Research', 'Prototyping', 'Haptic Design'],
    problem: "The ongoing shift towards digital sedentary lifestyles has increased stress in daily life and calls for innovative approaches to improve mental and physical health.",
    research: "Designed a web application that allows haptic designers to create customized haptic patterns for respiration-based relaxation practices. Used ChatGPT API call to generate initial MIDI compositions.",
    solution: "Developed a React-based web application capable of generating customized haptic patterns to induce relaxation. Converted MIDI compositions into waveforms using a browser-based synthesizer, Tone.js, and played through various voice coil actuators.",
    outcome: "Initial findings suggest that generative AI supports designers in creating personalized audio-haptic experiences, potentially reducing stress and improving relaxation.",
    images: [HapticsBG, heroBG],
    tools: ['React', 'ChatGPT API', 'Tone.js']
  },
  {
    id: 3,
    title: 'AMIAI',
    description: 'AI-driven music creation and interaction systems...',
    media: { type: 'image', src: AMIAIBG },
    details: 'A collaborative project focusing on musical expression.',
    categories: ['Prototyping', 'Graphic Design'], // Changed from ['Prototyping', 'Audio Design']
    problem: "How to empower AI-driven collaboration in music?",
    research: "Studied current music interaction interfaces and user behaviors.",
    solution: "Developed an interactive UI with real-time AI feedback.",
    outcome: "Users were delighted with the creative freedom offered.",
    images: [AMIAIBG],
    tools: ['Figma', 'Adobe Potoshop', 'Adobe Illustrator']
  },
  {
    id: 4,
    title: 'Hackathon',
    description: 'AR-based navigation system for visually impaired users...',
    media: { type: 'image', src: HackathonBG },
    details: 'A rapid prototype developed over a 48-hour hackathon.',
    categories: ['UX Research', 'Prototyping'],
    problem: "How to create an accessible AR navigation experience?",
    research: "Quick iterative testing with target users.",
    solution: "Designed a minimalistic interface paired with AR cues.",
    outcome: "Prototype validated with positive feedback.",
    images: [HackathonBG],
    tools: ['Adobe XD', 'React']
  },
  {
    id: 5,
    title: 'Bachelor Thesis',
    description: 'VR environments in educational settings...',
    media: { type: 'image', src: BachelorBG },
    details: 'User-centered design for more effective learning in VR.',
    categories: ['UX Research'],
    problem: "How can VR be used to improve educational outcomes?",
    research: "Evaluated existing VR education models.",
    solution: "Developed a tailored interface based on learning theory.",
    outcome: "Showed promising improvements in student engagement.",
    images: [BachelorBG],
    tools: ['Figma', 'Sketch', 'Zoom', 'Mobile Screenrecording', 'Google Forms']
  },
  {
    id: 6,
    title: 'ADHDeer',
    description: 'ADHD tracker in educational settings...',
    media: { type: 'image', src: ADHDeer },
    details: 'Creating a tracker for ADHD patients.',
    categories: ['Haptic Design', 'Prototyping'],
    problem: "How to engage ADHD patients into educational self-tracking experiences?",
    research: "Gathered input from educators and students.",
    solution: "Built an mobile prototype with engaging interactive elements.",
    outcome: "Positive pilot feedback; plans for further development.",
    images: [ADHDeer],
    tools: ['Figma', 'Miro']
  },
];

// FilterBar Component - allows selection of multiple categories.
const FilterBar = ({ allCategories, selectedCategories, setSelectedCategories }) => {
  const handleToggle = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(cat => cat !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <div className="filter-bar">
      {allCategories.map((cat) => (
        <FormControlLabel
          key={cat}
          control={
            <Checkbox
              checked={selectedCategories.includes(cat)}
              onChange={() => handleToggle(cat)}
              color="primary"
            />
          }
          label={cat}
        />
      ))}
      {selectedCategories.length > 0 && (
        <Button onClick={() => setSelectedCategories([])} color="secondary">
          Clear Filters
        </Button>
      )}
    </div>
  );
};

// ProjectCard Component - displays project thumbnail and basic info.
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
        backgroundColor:'rgba(0,0,0,0.7)', 
        zIndex: 1000,
        overflow: 'auto' // Enable scroll on the backdrop
      }}
    >
      <motion.div 
        className="modal-content" 
        initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
        style={{ 
          position: 'relative', 
          margin: '5% auto', 
          background: '#fff', 
          padding: '1rem', 
          maxWidth: '800px', 
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
  // Multi-select filtering using an array of selected categories (OR logic)
  const [selectedCategories, setSelectedCategories] = useState([]);
  // currentProjectIndex is used for modal navigation
  const [currentProjectIndex, setCurrentProjectIndex] = useState(null);

  // Compute unique categories from project list
  const allCategories = Array.from(new Set(projects.flatMap((p) => p.categories)));

  // Filter projects: show a project if no filter is active or if at least one category matches.
  const filteredProjects = projects.filter(project =>
    selectedCategories.length === 0 || 
    selectedCategories.some(cat => project.categories.includes(cat))
  );

  // Get current project data if any is selected
  const currentProject = currentProjectIndex !== null ? projects[currentProjectIndex] : null;

  return (
    <motion.section
      id="work"
      className="work-container"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <Container>
        <Typography variant="h3" align="center" gutterBottom color="primary">
          My Work
        </Typography>

        {/* --- FilterBar Component --- */}
        <FilterBar 
          allCategories={allCategories} 
          selectedCategories={selectedCategories} 
          setSelectedCategories={setSelectedCategories} 
        />

        {/* --- Project Gallery --- */}
        <Grid container spacing={4} justifyContent="center">
          {filteredProjects.map(project => (
            <Grid item key={project.id} xs={12} sm={6} md={4}>
              <ProjectCard 
                project={project} 
                onClick={(proj) => {
                  // Find index among all projects for modal navigation.
                  const idx = projects.findIndex(p => p.id === proj.id);
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
              projects={projects} 
              currentIndex={currentProjectIndex} 
              setCurrentIndex={setCurrentProjectIndex} 
              onClose={() => setCurrentProjectIndex(null)} 
            />
          )}
        </AnimatePresence>
      </Container>
    </motion.section>
  );
}

export default Work;