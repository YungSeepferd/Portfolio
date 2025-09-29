import React from 'react';
import { Typography, Box } from '@mui/material';
// Import Material UI icons for visual enhancement
import CodeIcon from '@mui/icons-material/Code';
import EducationBento from './EducationBento';
import WhoAmIBento from './WhoAmIBento';
import CategorizedTags from '../common/CategorizedTags';
import ExperienceBento from './ExperienceBento';
import BrushIcon from '@mui/icons-material/Brush';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import WorkIcon from '@mui/icons-material/Work';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import SchoolIcon from '@mui/icons-material/School';

// Import images directly
import WhoamiImage from '../../assets/images/About Me/Whoami.JPG';
import SkillsImage from '../../assets/images/About Me/SkillsandTechnologies.JPG';
import ExperienceImage from '../../assets/images/About Me/Experience.jpg';
import EducationImage from '../../assets/images/About Me/Education.JPG';

// Import utility for creating image objects with positioning
import { createAboutImage } from '../../utils/mediaUtils';

// infoCardSx removed; Experience now rendered via ExperienceBento

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
  { title: 'Data & ML', color: 'warning', items: ['TensorFlow'] },
  { title: 'Creative Coding', color: 'warning', items: ['Processing', 'Max/MSP'] },
  { title: 'Currently Improving', color: 'secondary', items: ['Golang', 'Analytical Sketching'] },
];
// Original core competency items with icons and skills (now for Skills & Technologies tab)
const coreCompetencyItems = [
  {
    title: 'Collaboration',
    description: 'Effective teamwork requires more than talent—it needs structure. I value clear processes, thorough documentation, and genuine shared ownership of outcomes.',
    icon: BusinessCenterIcon,
    skills: [
      'Clear Processes',
      'Thorough Documentation',
      'Shared Ownership',
      'Role Definition',
      'Handoff Management',
      'Calm Communication',
      'Respectful Teamwork'
    ]
  },
  {
    title: 'My Approach',
    description: 'I start with contextual inquiry and semi‑structured interviews to understand real user needs.',
    icon: AccessibilityNewIcon,
    skills: [
      'Contextual Inquiry',
      'Semi-Structured Interviews',
      'Thematic Analysis',
      'Digital Ethnography',
      'Expert Reviews',
      'ATLAS.ti',
      'Human Insight'
    ]
  },
  {
    title: 'Technical Craft',
    description: 'From Arduino, Raspberry Pie, and embedded systems to modern web frameworks, I learn and grow across the stack.',
    icon: CodeIcon,
    skills: [
      'Arduino',
      'Raspberry Pie',
      'Embedded Systems',
      'Web Frameworks',
      'Software Development',
      'Physical Prototyping',
    ]
  },
  {
    title: 'Workflow & Tools',
    description: 'I currently explore local LLM APIs and n8n workflow automation to streamline repetitive tasks.',
    icon: WorkIcon,
    skills: [
      'Local Ollama LLM APIs',
      '(Local) embedded n8n Automation',
      'Workflow Optimization',
      'LLM Prompt Engineering',
      'Creative Problem-Solving',
      'Process Design',
      'Tool Integration'
    ]
  },
  {
    title: 'Beyond Work',
    description: 'Outside of design, I explore electronic music production and creative coding projects.',
    icon: HeadsetMicIcon,
    skills: [
      'Cooking',
      'Creative Coding',
      'Music Production',
      'Gaming',
      'Personal Projects',
      'Football',
      'FC Schalke 04'
    ]
  }
];

// Design competencies with icons for WhoAmI tab
const designCompetencyItems = [
  {
    title: 'Design',
    description: 'Crafting intuitive and engaging multimodal user experiences through thoughtful design',
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

// Map existing experienceItems to ExperienceBento items schema (must be after definition)
const experienceBentoItems = experienceItems.map((e) => ({
  type: /freelanc/i.test(e.title)
    ? 'freelance'
    : (/university|assistant|intern/i.test(`${e.title} ${e.subtitle}`) ? 'education' : 'work'),
  title: e.title,
  subtitle: e.subtitle,
  // Try to derive duration from subtitle after a '|'
  duration: e.subtitle && e.subtitle.includes('|') ? e.subtitle.split('|').pop().trim() : undefined,
  description: e.description,
  responsibilities: e.bullets,
}));

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
      createAboutImage(SkillsImage, 'Skills background', 'center 30%', {
        objectFit: 'cover',
      }),
    ],
    content: (
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Typography variant="h4" sx={{ mb: 4 }}>Technical Stack & Tools</Typography>
        
        {/* Grid of 3 comprehensive cards */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3, mb: 4 }}>
          {/* Card 1: Tools & Workflow */}
          <Box sx={{ 
            p: 3, 
            borderRadius: 2, 
            bgcolor: 'rgba(255, 152, 0, 0.05)',
            border: '1px solid rgba(255, 152, 0, 0.2)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <Typography variant="h5" sx={{ mb: 1.5, fontWeight: 600, color: 'warning.main' }}>
              Tools & Workflow Automation
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.6 }}>
              From design tools (Figma, Adobe CC) to AI-assisted development (GitHub Copilot, Windsurf, Cursor), audio production (Ableton, Logic Pro), and workflow automation (n8n, local LLM APIs)—I integrate modern tooling to eliminate repetitive tasks and create space for creative problem-solving.
            </Typography>
            <Box sx={{ mt: 'auto' }}>
              <CategorizedTags categories={skillTagCategories.filter(cat => 
                cat.title === 'Tools'
              )} />
            </Box>
          </Box>

          {/* Card 2: Languages & Stack */}
          <Box sx={{ 
            p: 3, 
            borderRadius: 2, 
            bgcolor: 'rgba(3, 169, 244, 0.05)',
            border: '1px solid rgba(3, 169, 244, 0.2)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <Typography variant="h5" sx={{ mb: 1.5, fontWeight: 600, color: 'info.main' }}>
              Languages & Technical Stack
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.6 }}>
              Multi-paradigm technical foundation spanning frontend (JS/TS, React, Three.js), embedded systems (C, C++, C#), creative coding (Processing, Max/MSP), and specialized audio-UX/haptic interfaces (Tone.js, RNBO, Interhaptics)—bridging digital and physical experiences.
            </Typography>
            <Box sx={{ mt: 'auto' }}>
              <CategorizedTags categories={skillTagCategories.filter(cat => 
                ['Languages', 'Frameworks & Libraries', 'Haptics & Audio‑UX', 'Creative Coding'].includes(cat.title)
              )} />
            </Box>
          </Box>

          {/* Card 3: Currently Improving - Full width */}
          <Box sx={{ 
            p: 3, 
            borderRadius: 2, 
            bgcolor: 'rgba(156, 39, 176, 0.05)',
            border: '1px solid rgba(156, 39, 176, 0.2)',
            gridColumn: { xs: '1', md: 'span 2' },
            display: 'flex',
            flexDirection: 'column'
          }}>
            <Typography variant="h5" sx={{ mb: 1.5, fontWeight: 600, color: 'secondary.main' }}>
              Currently Improving
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.6 }}>
              Expanding capabilities in two strategic directions: Golang for backend/systems programming (complementing frontend expertise for full-stack development) and analytical sketching for visual communication (essential for workshop facilitation and collaborative design). This reflects my commitment to both technical depth and effective human communication.
            </Typography>
            <Box sx={{ mt: 'auto' }}>
              <CategorizedTags categories={skillTagCategories.filter(cat => 
                cat.title === 'Currently Improving'
              )} />
            </Box>
          </Box>
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
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>Professional Experience</Typography>
        <ExperienceBento items={experienceBentoItems} />
      </Box>
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

// Export both competency arrays for use in other components
export { coreCompetencyItems, designCompetencyItems };

export default aboutData;
