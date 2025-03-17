import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ProjectOverlay from './ProjectOverlay';
import ProjectFilter from './ProjectFilter';
import './Work.css';

// Import images
import heroBG from '../assets/css/images/Haptics.png';
import HapticsBG from '../assets/css/images/ProceduallyGenHaptic.png';
import AMIAIBG from '../assets/css/images/AMIAI.svg';
import HackathonBG from '../assets/css/images/Hackathon.png';
import BachelorBG from '../assets/css/images/FT Level 2 GIF.gif';
import ADHDeer from '../assets/css/images/ADHDeer.png';

function Work() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filterCategory, setFilterCategory] = useState(null);

  const projects = [
    {
      id: 1,
      title: 'Master Thesis',
      description: 'Exploring novel approaches in human-computer interaction...',
      media: { type: 'image', src: heroBG },
      details: 'My master thesis explores innovative haptic feedback systems for virtual environments, focusing on enhancing user immersion and interaction.',
      categories: ['UX Research', 'Prototyping', 'Haptic Design'],
      content: (
        <div>
          <p>Detailed content for Master Thesis project...</p>
        </div>
      ),
    },
    {
      id: 2,
      title: 'Generative AI Affective Haptics Research',
      description: 'Research on procedurally generated haptic feedback...',
      media: { type: 'image', src: HapticsBG },
      details: 'This research investigates the impact of procedurally generated haptic feedback on user experience, aiming to create more dynamic and responsive interactions.',
      categories: ['UX Research', 'Prototyping', 'Haptic Design'],
      content: (
        <div>
          <p>Detailed content for Haptics Research project...</p>
        </div>
      ),
    },
    {
      id: 3,
      title: 'AMIAI',
      description: 'AI-driven music creation and interaction systems...',
      media: { type: 'image', src: AMIAIBG },
      details: 'AMIAI is a collaborative project focused on developing AI-driven music creation and interaction systems, exploring new possibilities for musical expression.',
      categories: ['Prototyping', 'Audio Design'],
      content: (
        <div>
          <p>Detailed content for AMIAI project...</p>
        </div>
      ),
    },
    {
      id: 4,
      title: 'Hackathon',
      description: 'AR-based navigation system for visually impaired users...',
      media: { type: 'image', src: HackathonBG },
      details: 'During a 48-hour hackathon, I developed an AR-based navigation system for visually impaired users, providing real-time guidance and obstacle detection.',
      categories: ['UX Research', 'Prototyping'],
      content: (
        <div>
          <p>Detailed content for Hackathon project...</p>
        </div>
      ),
    },
    {
      id: 5,
      title: 'Bachelor Thesis',
      description: 'VR environments in educational settings...',
      media: { type: 'image', src: BachelorBG },
      details: 'My bachelor thesis investigates user-centered design methodologies for VR environments in educational settings, aiming to create engaging and effective learning experiences.',
      categories: ['UX Research'],
      content: (
        <div>
          <p>Detailed content for Bachelor Thesis project...</p>
        </div>
      ),
    },
    {
      id: 6,
      title: 'ADHDeer',
      description: 'AR environments in educational settings...',
      media: { type: 'image', src: ADHDeer },
      details: 'ADHDeer explores the use of AR environments in educational settings, creating interactive and immersive learning experiences for students.',
      categories: ['Haptic Design', 'Prototyping'],
      content: (
        <div>
          <p>Detailed content for ADHDeer project...</p>
        </div>
      ),
    },
  ];

  const allCategories = Array.from(new Set(projects.flatMap((p) => p.categories)));
  const filteredProjects = filterCategory
    ? projects.filter((project) => project.categories.includes(filterCategory))
    : projects;

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
        <ProjectFilter 
          categories={allCategories}
          selectedCategory={filterCategory}
          onSelect={(cat) => setFilterCategory(cat)}
        />
        <Grid container spacing={4} justifyContent="center">
          {filteredProjects.map((project) => (
            <Grid item key={project.id} xs={12} sm={6} md={4}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedProject(project)}
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
            </Grid>
          ))}
        </Grid>
        <AnimatePresence>
          {selectedProject && (
            <ProjectOverlay
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          )}
        </AnimatePresence>
      </Container>
    </motion.section>
  );
}

export default Work;