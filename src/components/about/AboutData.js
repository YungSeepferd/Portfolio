import React from 'react';
import { Typography, Box, Grid } from '@mui/material';
// Import Material UI icons for visual enhancement
import CodeIcon from '@mui/icons-material/Code';
import EducationBento from './EducationBento';
import WhoAmIBento from './WhoAmIBento';
import SkillsBento from './SkillsBento';
import CategorizedTags from '../common/CategorizedTags';
import BrushIcon from '@mui/icons-material/Brush';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import WorkIcon from '@mui/icons-material/Work';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import SchoolIcon from '@mui/icons-material/School';

// Import images directly
import WhoamiImage from '../../assets/images/About Me/Whoami.JPG';
import ExperienceImage from '../../assets/images/About Me/Experience.jpg';
import EducationImage from '../../assets/images/About Me/Education.JPG';

// Import utility for creating image objects with positioning
import { createAboutImage } from '../../utils/mediaUtils';

const infoCardSx = (theme) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),
  height: '100%',
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius.sm,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: theme.shadows[4],
    transform: 'translateY(-2px)',
  },
});

// Centralized tag categories used in Skills & Technology tab
const skillTagCategories = [
  // Research & Testing (success)
  { title: 'Research Methods', color: 'success', items: [
    'Usability Testing',
    'SUS',
    'STS‑AD',
    'Diary Studies',
    'Contextual Inquiry',
    'Semi-Structured Interviews',
    'Thematic Analysis',
    'Digital Ethnography',
    'ATLAS.ti (AI‑assisted Thematic Analysis)'
  ] },
  { title: 'Evaluation & Workshops', color: 'success', items: ['Heuristic Reviews', 'Expert Review', 'Task Analysis', 'Workshop Facilitation', 'Design Ops'] },
  { title: 'Testing Types', color: 'success', items: ['A/B Testing', 'Tree Testing', 'Card Sorting'] },
  // Other Technologies (warning)
  { title: 'Languages', color: 'warning', items: ['JavaScript', 'TypeScript', 'C', 'C++', 'C#'] },
  { title: 'Frameworks & Libraries', color: 'warning', items: ['React', 'Three.js', 'Material UI', 'Bootstrap'] },
  { title: 'Haptics & Audio‑UX', color: 'warning', items: ['Tone.js', 'RNBO', 'Interhaptics', 'Hapticlabs'] },
  { title: 'Tools', color: 'warning', items: ['Figma', 'Adobe CC', 'Unity', 'Git', 'GitHub Copilot', 'Windsurf', 'Cursor', 'Ableton Live', 'Logic Pro', 'Pro Tools'] },
  { title: 'Hardware', color: 'warning', items: ['Arduino', 'Adafruit ItsyBitsy', 'Embedded (basics)', 'Physical Prototyping'] },
  { title: 'AI & Automation', color: 'info', items: ['Local LLM APIs', 'n8n (workflow automation)'] },
  { title: 'Data & ML', color: 'warning', items: ['TensorFlow'] },
  { title: 'Creative Coding', color: 'warning', items: ['Processing', 'Max/MSP'] },
  { title: 'Currently Improving', color: 'secondary', items: ['Golang', 'Analytical Sketching'] },
];

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
      'Mobile Development',
      'Sensor Integration',
      'Haptic Feedback'
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
      'Spatial Audio',
      'Signal Processing',
      'Audio-Visual Integration'
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
      'Mentoring',
      'Public Speaking',
      'Knowledge Transfer',
      'Documentation'
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
      'Stakeholder Management',
      'Requirements Gathering',
      'Roadmapping'
    ]
  }
];

const experienceItems = [
  {
    title: 'Project Assistant & Educational UX Designer',
    subtitle: 'MM‑Mental Motions GmbH – My Mental Mentor | 02/2025 – 08/2025',
    description: 'Supported a 4‑week training program. Built brand assets and slide kits, produced interactive workbook PDFs (QR links, print/screen layouts), edited learning videos and podcasts, and standardized the teaching stack with onboarding/run‑of‑show.',
    icon: BusinessCenterIcon,
    isFullWidth: true,
    bullets: [
      'Created reusable brand, slide kit, and Canva templates',
      'Produced interactive PDFs and standardized content workflows',
      'Edited learning videos and podcast audio with consistent publishing pipeline',
      'Localized materials (DE➝EN) with stigma‑free terminology',
      'Set up teaching stack with clear run‑of‑show, backups, and onboarding'
    ]
  },
  {
    title: 'UX Internship – Media Market Research & Prototyping',
    subtitle: 'Algoriddim GmbH – DJay | 02/2022 – 04/2022',
    description: 'Conducted market research and contributed to UX prototyping efforts in music and video media contexts.',
    icon: WorkIcon,
    isFullWidth: false,
    bullets: [
      'Researched market and user trends in media domains',
      'Supported UX prototyping and concept validation'
    ]
  },
  {
    title: 'Freelancing – Audio Engineering & Sound Design',
    subtitle: '07/2021 – Present',
    description: 'Delivered audio engineering and postproduction for advertising and streaming publications; sound design and music embedding.',
    icon: WorkIcon,
    isFullWidth: false,
    bullets: [
      'Sound design & postproduction for streaming (e.g., “Wahlcamp”, “Wahlkampfpodcast”)',
      'Music & licence research, mix improvements and embeddings'
    ]
  },
  {
    title: 'Auxiliary Scientist | IT‑Support',
    subtitle: 'University Hospital Munich (LMU) | 02/2021 – 12/2022',
    description: 'IT support and workflow improvements across accounts/devices; supported research operations.',
    icon: SchoolIcon,
    isFullWidth: false,
    bullets: [
      'Set up accounts and devices; improved daily workflows',
      'Supported research teams with timely IT assistance'
    ]
  }
];

const aboutData = [
  // WhoAmI tab (previously About Me)
  {
    title: "WhoAmI",
    subtitle: "UX | PROTOTYPING | FRONTEND | AUDIO | HAPTICS",
    headline: "About Me",
    pictures: [
      createAboutImage(WhoamiImage, 'Portrait of the author', 'center 30%', {
        objectFit: 'cover',
      }),
    ],
    content: (
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        {/* Interactive bento cards */}
        <WhoAmIBento />
      </Box>
    ),
  },
  // Skills & Technology tab
  {
    title: "Skills & Technology",
    subtitle: "Core competencies, tools and frameworks",
    pictures: [
      createAboutImage(WhoamiImage, 'Skills background', 'center 30%', {
        objectFit: 'cover',
      }),
    ],
    content: (
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>Core Competencies</Typography>
        <SkillsBento items={coreCompetencyItems} />
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>Tooling & Frameworks</Typography>
          <CategorizedTags categories={skillTagCategories} />
        </Box>
      </Box>
    ),
  },
  // Professional Experience tab
  {
    title: "Experience",
    subtitle: "Professional Journey",
    pictures: [
      createAboutImage(ExperienceImage, 'Professional experience collage', 'center center', {
        width: 4032,
        height: 3024,
        objectFit: 'cover',
      })
    ],
    content: (
      <>
        <Typography variant="h4">Professional Experience</Typography>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {experienceItems.map(({ icon: Icon, title, subtitle, description, bullets, isFullWidth }) => (
            <Grid item xs={12} md={isFullWidth ? 12 : 6} key={title}>
              <Box sx={(theme) => ({
                ...infoCardSx(theme),
                gap: theme.spacing(1.5),
              })}
              >
                <Box sx={(theme) => ({
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: theme.spacing(1),
                })}
                >
                  <Icon color="primary" sx={{ mt: 0.2, fontSize: '1.3rem' }} />
                  <Box>
                    <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 600 }}>{title}</Typography>
                    <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>{subtitle}</Typography>
                  </Box>
                </Box>
                <Typography variant="body2">{description}</Typography>
                <Box component="ul" sx={(theme) => ({
                  pl: theme.spacing(2.5),
                  mt: 0,
                  mb: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: theme.spacing(1),
                })}
                >
                  {bullets.map((item) => (
                    <Typography key={item} component="li" variant="body2" sx={{ lineHeight: 1.4 }}>
                      {item}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </>
    )
  },
  // Education tab
  {
    title: "Education",
    subtitle: "Academic Background",
    pictures: [
      createAboutImage(EducationImage, 'Academic journey photo', 'center center', {
        width: 2624,
        height: 2436,
        objectFit: 'cover',
      })
    ],
    content: (
      <>
        <Typography variant="h4" sx={{ mb: 3 }}>Academic Qualifications</Typography>
        <EducationBento />
      </>
    )
  }
];

// Define the renderSkillChip function
export const renderSkillChip = (skill) => (
  <Box
    key={skill}
    component="span"
    sx={{
      display: 'inline-block',
      backgroundColor: 'primary.light',
      color: 'primary.contrastText',
      borderRadius: 1,
      px: 1,
      py: 0.5,
      m: 0.5,
      fontSize: '0.75rem',
      fontWeight: 500,
    }}
  >
    {skill}
  </Box>
);

// Export function that returns the aboutData array for useDataLoader compatibility
export const getAboutData = () => {
  // Return the about data directly without promise wrapping
  // This simplifies the data flow and prevents potential issues
  return aboutData;
};

// Export coreCompetencyItems for use in other components if needed
export { coreCompetencyItems };

export default aboutData;
