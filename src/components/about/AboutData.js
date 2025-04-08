import React from 'react';
import { Typography, Grid, Box, Stack, Chip } from '@mui/material';
import SkillTag from '../common/SkillTag';
// Import Material UI icons for visual enhancement
import CodeIcon from '@mui/icons-material/Code';
import BrushIcon from '@mui/icons-material/Brush';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import WorkIcon from '@mui/icons-material/Work';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

// Import images for each about section
import ProfileImage from '../../assets/images/About Me/Salzburg.jpg';
import SkillsImage from '../../assets/images/About Me/MusicMoritz.jpg';
import ExperienceImage from '../../assets/images/About Me/VRBrille.JPG';
import EducationImage from '../../assets/images/About Me/vincentMain.JPG';

/**
 * Contains data for the About section tabs including content and images
 */
export const aboutData = [
  // WhoAmI tab (previously About Me)
  {
    title: "WhoAmI",
    subtitle: "UX Designer & Researcher",
    pictures: [ProfileImage],
    content: (
      <>
        <Typography variant="h4" component="div" gutterBottom>
          WhoAmI
        </Typography>
        <Typography variant="body1" paragraph>
          Hi! I'm Vincent Göke, a Human-Computer Interaction Master's graduate, sound designer, and interaction technologist. My work is centered around designing <strong>emotion-driven experiences </strong> through <strong>affective haptics, UX research, and multi-sensory interaction design</strong>.
        </Typography>
        <Typography variant="body1" paragraph>
          With a background in media informatics and audio design, I transitioned into <strong>haptic interaction design</strong>—an underexplored but promising field that bridges touch, sound, and technology to create intuitive and immersive user experiences.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Beyond Work</strong>: Producing and mixing music under the aliases <em>Din-Z</em> and <em>Superior Motive</em> since 2015. I occasionally contribute to <strong>HipHop production</strong> and <strong>audio post-production</strong>.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Sports</strong>: Passionate about football, former player, and lifelong <strong>FC Schalke 04</strong> supporter.
        </Typography>
      </>
    )
  },
  // Skills & Technologies tab
  {
    title: "Skills & Technologies",
    subtitle: "My UX Toolkit",
    pictures: [SkillsImage],
    content: (
      <>
        <Typography variant="h5" sx={{ mb: 3 }}>Core Competencies</Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <BrushIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Design</Typography>
            </Box>
            <Typography variant="body2" paragraph>
              UI/UX Design, Interaction Design, Wireframing, Prototyping, Visual Design, User Flows, Information Architecture
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <AccessibilityNewIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Research</Typography>
            </Box>
            <Typography variant="body2" paragraph>
              User Research, Usability Testing, A/B Testing, Heuristic Evaluation, User Interviews, Data Analysis
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <CodeIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Development</Typography>
            </Box>
            <Typography variant="body2" paragraph>
              Frontend Development, Responsive Design, Design Systems, Accessibility Implementation
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LocalLibraryIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Methodologies</Typography>
            </Box>
            <Typography variant="body2" paragraph>
              Design Thinking, Agile/Scrum, User-Centered Design, Design Sprints, Lean UX
            </Typography>
          </Grid>
        </Grid>

        <Typography variant="h5" sx={{ mb: 3 }}>Tools & Technologies</Typography>
        <Stack direction="row" flexWrap="wrap" spacing={1} sx={{ mb: 3 }}>
          <SkillTag label="Figma" />
          <SkillTag label="Adobe XD" />
          <SkillTag label="Sketch" />
          <SkillTag label="Prototyping" />
          <SkillTag label="User Testing" />
          <SkillTag label="React.js" />
          <SkillTag label="HTML/CSS" />
        </Stack>
      </>
    )
  },
  // Professional Experience tab
  {
    title: "Experience",
    subtitle: "Professional Journey",
    pictures: [ExperienceImage],
    content: (
      <>
        <Typography variant="h5" sx={{ mb: 3 }}>Professional Experience</Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
              <BusinessCenterIcon color="primary" sx={{ mr: 2, mt: 0.5 }} />
              <Box>
                <Typography variant="h6" sx={{ color: 'primary.main' }}>UX Intern @ DJay Munich (2022)</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Conducted user research and prototyped new interaction models for music-related applications.
                </Typography>
                <Box component="ul" sx={{ paddingLeft: '1.5rem', margin: '0.5rem 0', color: 'text.secondary' }}>
                  <Box component="li"><Typography variant="body2">Designed user flows and wireframes for mobile music applications</Typography></Box>
                  <Box component="li"><Typography variant="body2">Conducted usability testing with musicians and DJs</Typography></Box>
                  <Box component="li"><Typography variant="body2">Created prototypes using Figma and Adobe XD</Typography></Box>
                </Box>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
              <WorkIcon color="primary" sx={{ mr: 2, mt: 0.5 }} />
              <Box>
                <Typography variant="h6" sx={{ color: 'primary.main' }}>IT & Podcast Production Support @ University Hospital Munich (2020–2022)</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Provided technical support and developed an audio production pipeline for podcast content.
                </Typography>
                <Box component="ul" sx={{ paddingLeft: '1.5rem', margin: '0.5rem 0', color: 'text.secondary' }}>
                  <Box component="li"><Typography variant="body2">Managed IT infrastructure for medical education department</Typography></Box>
                  <Box component="li"><Typography variant="body2">Produced and edited educational podcast content</Typography></Box>
                  <Box component="li"><Typography variant="body2">Trained staff on audio recording and editing software</Typography></Box>
                </Box>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
              <HeadsetMicIcon color="primary" sx={{ mr: 2, mt: 0.5 }} />
              <Box>
                <Typography variant="h6" sx={{ color: 'primary.main' }}>Freelance Audio Producer / Sound Designer (Since 2015)</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Created original music compositions (Superior Motive, Din-Z), mixed audio for projects, and collaborated with artists.
                </Typography>
                <Box component="ul" sx={{ paddingLeft: '1.5rem', margin: '0.5rem 0', color: 'text.secondary' }}>
                  <Box component="li"><Typography variant="body2">Produced original music for independent artists</Typography></Box>
                  <Box component="li"><Typography variant="body2">Designed sound effects and atmospheres for digital media</Typography></Box>
                  <Box component="li"><Typography variant="body2">Mixed and mastered audio for commercial release</Typography></Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </>
    )
  },
  // Education tab
  {
    title: "Education",
    subtitle: "Academic Background",
    pictures: [EducationImage],
    content: (
      <>
        <Typography variant="h5" sx={{ mb: 3 }}>Academic Qualifications</Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
              <SchoolIcon color="primary" sx={{ mr: 2, mt: 0.5 }} />
              <Box>
                <Typography variant="h6" sx={{ color: 'primary.main' }}>M.Sc. Human-Computer Interaction</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                  FH Salzburg & PLUS Salzburg | 2022 - 2024
                </Typography>
                <Typography variant="body2">
                  Specialized in haptic interaction design and multi-sensory user experience. Master's thesis on emotion-driven haptic feedback design methodologies.
                </Typography>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
              <MenuBookIcon color="primary" sx={{ mr: 2, mt: 0.5 }} />
              <Box>
                <Typography variant="h6" sx={{ color: 'primary.main' }}>B.Sc. Media Informatics</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                  LMU Munich | 2017 - 2021
                </Typography>
                <Typography variant="body2">
                  Focused on user interface design, web technologies, and interactive systems. Bachelor's thesis on trust in autonomous vehicle interfaces.
                </Typography>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
              <AutoStoriesIcon color="primary" sx={{ mr: 2, mt: 0.5 }} />
              <Box>
                <Typography variant="h6" sx={{ color: 'primary.main' }}>Diploma in Audio Design</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                  Deutsche POP, Munich | 2015 - 2017
                </Typography>
                <Typography variant="body2">
                  Professional training in audio production, sound design, and music technology with emphasis on electronic music production.
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </>
    )
  }
];

// Define the renderSkillChip function
export const renderSkillChip = (skill) => (
  <Chip
    key={skill}
    label={skill}
    sx={{ m: 0.5 }}
  />
);

export const wallsData = aboutData; // For compatibility with existing components

export default aboutData;
