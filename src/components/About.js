import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import AboutBackground from './AboutBackground';
import { wallsData } from './Walls';
import './About.css';

const About = () => {
  const tabs = ['Skills', 'Interests', 'Motivations', 'Vision'];
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (newIndex) => {
    setActiveTab(newIndex);
  };

  return (
    <div id="about" className="about">
      <AboutBackground activeTab={tabs[activeTab]} onTabChange={handleTabChange} initialRotationY={wallsData[activeTab].defaultDirection} />
      <Container className="about-content">
        <Typography variant="h3" align="center" gutterBottom className="about-heading">
          About Me
        </Typography>
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => handleTabChange(newValue)}
          indicatorColor="primary"
          textColor="inherit"
          centered
          sx={{ mb: 3 }}
        >
          {tabs.map((label, idx) => (
            <Tab key={idx} label={label} />
          ))}
        </Tabs>
      </Container>
    </div>
  );
};

export default About;