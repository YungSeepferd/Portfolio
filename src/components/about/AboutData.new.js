import React from 'react';
import { Typography, Box, Chip, useTheme } from '@mui/material';
import SkillTagList from '../common/SkillTagList';

// Import Material UI icons
import CodeIcon from '@mui/icons-material/Code';
import EducationBento from './EducationBento';
import SkillsBento from './SkillsBento';
import ExperienceBento from './ExperienceBento';
import BrushIcon from '@mui/icons-material/Brush';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import WorkIcon from '@mui/icons-material/Work';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import SchoolIcon from '@mui/icons-material/School';

// Import images
import WhoamiImage from '../../assets/images/About Me/Whoami.JPG';
import SkillsImage from '../../assets/images/About Me/SkillsandTechnologies.JPG';
import ExperienceImage from '../../assets/images/About Me/Experience.jpg';
import EducationImage from '../../assets/images/About Me/Education.JPG';

// Import utility for creating image objects
import { createAboutImage } from '../../utils/mediaUtils';

// Core competencies data
const coreCompetencyItems = [
  {
    title: 'Design',
    description: 'Crafting intuitive and engaging user experiences through thoughtful design',
    icon: BrushIcon,
    skills: [
      'UI/UX Design',
      'Interaction Design',
      'Wireframing',
      'Prototyping',
      'Visual Design',
      'User Flows',
      'Information Architecture'
    ]
  },
  {
    title: 'Research',
    description: 'Uncovering user needs and validating design decisions through research',
    icon: AccessibilityNewIcon,
    skills: [
      'User Research',
      'Usability Testing',
      'A/B Testing',
      'Heuristic Evaluation',
      'User Interviews',
      'Data Analysis',
      'Thematic Analysis'
    ]
  },
  {
    title: 'Development',
    description: 'Bringing designs to life with clean, accessible code',
    icon: CodeIcon,
    skills: [
      'Frontend Development',
      'Responsive Design',
      'Design Systems',
      'Accessibility',
      'Mobile Development'
    ]
  },
  {
    title: 'Audio',
    description: 'Designing immersive audio experiences and sound interactions',
    icon: HeadsetMicIcon,
    skills: [
      'Sound Design',
      'Audio Programming',
      'Music Production',
      'Interactive Audio',
      'Spatial Audio'
    ]
  },
  {
    title: 'Teaching',
    description: 'Empowering others through knowledge sharing and mentorship',
    icon: LocalLibraryIcon,
    skills: [
      'Workshop Facilitation',
      'Curriculum Development',
      'Technical Instruction',
      'Mentoring'
    ]
  },
  {
    title: 'Project Management',
    description: 'Leading projects from concept to successful delivery',
    icon: BusinessCenterIcon,
    skills: [
      'Agile Methodologies',
      'Scrum',
      'Kanban',
      'Team Leadership',
      'Stakeholder Management'
    ]
  }
];

// About data array
export const aboutData = [
  // WhoAmI tab
  {
    title: "WhoAmI",
    subtitle: "UX Designer & Researcher",
    pictures: [
      createAboutImage(WhoamiImage, 'Portrait of the author', 'center center', {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        opacity: 0.1,
        zIndex: 0,
      }),
    ],
    content: (
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '300px 1fr' },
          gap: 4,
          alignItems: 'center',
          mb: 4
        }}>
          <Box 
            component="img"
            src={WhoamiImage}
            alt="Portrait"
            sx={{
              width: '100%',
              height: 'auto',
              borderRadius: 2,
              boxShadow: 3,
            }}
          />
          <Box>
            <Typography variant="h4" sx={{ mb: 2 }}>About Me</Typography>
            <Typography variant="body1" paragraph>
              Hello! I'm a passionate UX Designer and Researcher with a background in Human-Computer Interaction.
              I specialize in creating intuitive and engaging digital experiences that bridge the gap between users and technology.
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'grid', gap: 3 }}>
          <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>Design Philosophy</Typography>
            <Typography>
              I believe in evidence-based design that balances user needs, business goals, and technical feasibility.
              I'm passionate about accessibility and creating inclusive experiences that work for everyone.
            </Typography>
          </Box>
          
          <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h6" sx={{ mb: 2, color: 'secondary.main' }}>Background</Typography>
            <Typography paragraph>
              My journey in design started with a fascination for how people interact with technology,
              leading me to pursue degrees in both Media Informatics and HCI. I've developed a strong
              foundation in user-centered design, frontend development, and audio-visual media.
            </Typography>
          </Box>
          
          <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h6" sx={{ mb: 2, color: 'success.main' }}>Beyond Work</Typography>
            <Typography paragraph>
              When I'm not designing, you can find me producing electronic music, experimenting with
              creative coding, or exploring the great outdoors. I'm also a passionate football fan and
              a lifelong supporter of FC Schalke 04.
            </Typography>
            <Typography>
              <strong>Location:</strong> Currently based in Salzburg, Austria | Open to remote opportunities worldwide.
            </Typography>
          </Box>
        </Box>
      </Box>
    )
  },
  
  // Skills & Technologies Tab
  {
    title: "Skills & Technologies",
    subtitle: "Core Competencies & Technical Skills",
    pictures: [
      createAboutImage(SkillsImage, 'Skills collage', 'center center', {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        opacity: 0.1,
        zIndex: 0,
      }),
    ],
    content: (
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Typography variant="h4" sx={{ mb: 4 }}>Core Competencies</Typography>
        <SkillsBento items={coreCompetencyItems} />
        
        <Typography variant="h4" sx={{ mt: 8, mb: 4 }}>Technical Skills</Typography>
        
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 4,
          mb: 4
        }}>
          <Box>
            <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>Design & Prototyping</Typography>
            <SkillTagList 
              skills={[
                'Figma', 'Adobe XD', 'Sketch', 'InVision', 'Framer',
                'Adobe Creative Suite', 'Blender', 'Fusion 360'
              ]}
              color="primary"
            />
          </Box>
          
          <Box>
            <Typography variant="h6" sx={{ mb: 2, color: 'secondary.main' }}>Frontend Development</Typography>
            <SkillTagList 
              skills={[
                'HTML/CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js',
                'Vue.js', 'Sass', 'Styled Components', 'Material-UI', 'Framer Motion'
              ]}
              color="secondary"
            />
          </Box>
          
          <Box>
            <Typography variant="h6" sx={{ mb: 2, color: 'success.main' }}>User Research & Testing</Typography>
            <SkillTagList 
              skills={[
                'Usability Testing', 'User Interviews', 'Surveys', 'A/B Testing',
                'Analytics', 'Heatmaps', 'Card Sorting', 'Tree Testing'
              ]}
              color="success"
            />
          </Box>
          
          <Box>
            <Typography variant="h6" sx={{ mb: 2, color: 'warning.main' }}>Other Technologies</Typography>
            <SkillTagList 
              skills={[
                'Git', 'Node.js', 'Python', 'SQL', 'MongoDB', 'Firebase',
                'Docker', 'AWS', 'TensorFlow', 'Processing', 'Max/MSP'
              ]}
              color="warning"
            />
          </Box>
        </Box>
      </Box>
    ),
  },
  
  // Experience Tab
  {
    title: "Experience",
    subtitle: "Professional Journey",
    pictures: [
      createAboutImage(ExperienceImage, 'Professional experience', 'center center', {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        opacity: 0.1,
        zIndex: 0,
      }),
    ],
    content: (
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Typography variant="h4" sx={{ mb: 4 }}>Professional Experience</Typography>
        
        <ExperienceBento 
          items={[
            {
              type: 'freelance',
              title: 'UX/UI Designer & Researcher',
              subtitle: 'Freelance',
              duration: '2021 - Present',
              description: 'Delivering end-to-end UX/UI design solutions for clients across various industries, focusing on creating intuitive and engaging digital experiences.',
              responsibilities: [
                'Conducted user research and usability testing to inform design decisions',
                'Created wireframes, prototypes, and high-fidelity designs',
                'Collaborated with developers to ensure design implementation quality',
                'Established design systems and component libraries'
              ],
              skills: ['User Research', 'UI/UX Design', 'Prototyping', 'Usability Testing', 'Figma', 'Adobe XD', 'React', 'Accessibility']
            },
            {
              type: 'education',
              title: 'Teaching Assistant - HCI & Web Development',
              subtitle: 'University of Applied Sciences Salzburg',
              duration: '2022 - 2023',
              description: 'Assisted in teaching Human-Computer Interaction and Web Development courses, providing guidance to students and helping them develop practical skills.',
              responsibilities: [
                'Conducted lab sessions and provided one-on-one support to students',
                'Graded assignments and provided constructive feedback',
                'Assisted in developing course materials and exercises'
              ],
              skills: ['Teaching', 'Mentoring', 'HTML/CSS', 'JavaScript', 'React', 'HCI Principles']
            },
            {
              type: 'work',
              title: 'Audio Engineer & Sound Designer',
              subtitle: 'Freelance',
              duration: '2017 - 2021',
              description: 'Provided audio engineering and sound design services for various media projects, including music production, sound for film, and interactive installations.',
              responsibilities: [
                'Designed and implemented sound for interactive installations',
                'Produced and mixed music for various artists and projects',
                'Created sound effects and ambiences for film and media'
              ],
              skills: ['Sound Design', 'Music Production', 'Mixing', 'Mastering', 'Ableton Live', 'Pro Tools', 'Max/MSP']
            }
          ]} 
        />
      </Box>
    ),
  },
  
  // Education Tab
  {
    title: "Education",
    subtitle: "Academic Background",
    pictures: [
      createAboutImage(EducationImage, 'Academic background', 'center center', {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        opacity: 0.1,
        zIndex: 0,
      }),
    ],
    content: (
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Typography variant="h4" sx={{ mb: 4 }}>Academic Qualifications</Typography>
        <EducationBento />
      </Box>
    )
  }
];

// Export function for useDataLoader compatibility
export const getAboutData = () => aboutData;

export default aboutData;
