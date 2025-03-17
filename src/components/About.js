import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '@mui/material/Container';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import AboutBackground from './AboutBackground';
import './About.css';

// Data for Core Competences
const jobTitles = ['Sound Designer', 'Audio Engineer'];
const expertiseFields = ['UX Research', 'UI Design', 'HCI'];
const coreSkills = ['Hardware Prototyping', 'Software Prototyping', 'Coding'];

const bioSections = {
  background:
    'I studied media informatics at LMU Munich and trained as an audio designer. My work shows how audio guides perception.',
  interests:
    'I explore haptic feedback and immersive sound design, always keeping the user at the centre.',
};

const contentVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const CompetenceCard = ({ title, items }) => (
  <Card sx={{ m: 2, boxShadow: 3, borderRadius: 2 }}>
    <CardMedia
      component="img"
      height="140"
      image="https://via.placeholder.com/300x140?text=Image"
      alt={title}
    />
    <CardContent>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Box display="flex" flexWrap="wrap">
        {items.map((item, idx) => (
          <Box key={idx} className="tag">{item}</Box>
        ))}
      </Box>
    </CardContent>
  </Card>
);

const CompetenceSection = () => (
  <motion.div variants={contentVariant}>
    <Typography variant="h5" gutterBottom align="center">Core Competences</Typography>
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={6} md={4}>
        <CompetenceCard title="Roles" items={jobTitles} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CompetenceCard title="Expertise" items={expertiseFields} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CompetenceCard title="Skills" items={coreSkills} />
      </Grid>
    </Grid>
  </motion.div>
);

const InteractiveTile = () => {
  const tileData = {
    Overview: 'I bring innovation to UX design by fusing sound and visuals into cohesive experiences.',
    Collaborative: 'Teamwork and collaboration are at the core of how I build and iterate on ideas.',
  };
  const tags = Object.keys(tileData);
  const [activeTile, setActiveTile] = useState(tags[0]);

  return (
    <motion.div variants={contentVariant}>
      <Typography variant="h5" gutterBottom align="center">Highlights</Typography>
      <Box mb={2} display="flex" justifyContent="center">
        {tags.map((tag) => (
          <Button
            key={tag}
            variant={activeTile === tag ? 'contained' : 'outlined'}
            onClick={() => setActiveTile(tag)}
            sx={{ mr: 1 }}
          >
            {tag}
          </Button>
        ))}
      </Box>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardMedia
              component="img"
              height="200"
              image="https://via.placeholder.com/600x200?text=Highlight"
              alt="Highlight"
            />
            <CardContent>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTile}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.5 }}
                >
                  <Typography variant="body1">{tileData[activeTile]}</Typography>
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </motion.div>
  );
};

const BiographySection = () => {
  const [activeSubTab, setActiveSubTab] = useState('background');

  return (
    <motion.div variants={contentVariant}>
      <Typography variant="h5" gutterBottom align="center">Who Am I?</Typography>
      <Box mb={2} display="flex" justifyContent="center">
        {['background', 'interests'].map((tab) => (
          <Button
            key={tab}
            variant={activeSubTab === tab ? 'contained' : 'outlined'}
            onClick={() => setActiveSubTab(tab)}
            sx={{ mr: 1, textTransform: 'capitalize' }}
          >
            {tab}
          </Button>
        ))}
      </Box>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12} md={4}>
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardMedia
              component="img"
              height="250"
              image="https://via.placeholder.com/400x250?text=Profile"
              alt="Profile Placeholder"
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSubTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="body1">{bioSections[activeSubTab]}</Typography>
            </motion.div>
          </AnimatePresence>
        </Grid>
      </Grid>
    </motion.div>
  );
};

const About = () => {
  const tabs = ['Core', 'Highlights', 'Biography'];
  const [activeTab, setActiveTab] = useState(0);
  const handleTabChange = (event, newValue) => { setActiveTab(newValue); };

  return (
    <div id="about" style={{ position: 'relative', overflow: 'hidden' }}>
      <AboutBackground activeTab={tabs[activeTab]} />
      {/* Content container without the semi-transparent background */}
      <Container 
        className="about-content" 
        style={{ 
          position: 'relative', 
          zIndex: 1, 
          padding: '2rem'
        }}
      >
        <Typography variant="h3" align="center" gutterBottom className="about-heading">
          About Me
        </Typography>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="inherit"
          centered
          sx={{ mb: 4 }}
        >
          {tabs.map((label, idx) => (
            <Tab key={idx} label={label} />
          ))}
        </Tabs>
        <Box>
          {activeTab === 0 && <CompetenceSection />}
          {activeTab === 1 && <InteractiveTile />}
          {activeTab === 2 && <BiographySection />}
        </Box>
      </Container>
    </div>
  );
}

export default About;