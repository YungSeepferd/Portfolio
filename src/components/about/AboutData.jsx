import React from 'react';
import { Typography, Box } from '@mui/material';
// Import Material UI icons for visual enhancement
import CodeIcon from '@mui/icons-material/Code';
import EducationBento from './EducationBento';
import WhoAmIBento from './WhoAmIBento';
import WhoAmIProfileCard from './WhoAmIProfileCard';
import CategorizedTags from '../common/CategorizedTags';
import ExperienceBento from './ExperienceBento';
import BrushIcon from '@mui/icons-material/Brush';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import WorkIcon from '@mui/icons-material/Work';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import SchoolIcon from '@mui/icons-material/School';
// Additional icons for better semantic clarity
import GroupsIcon from '@mui/icons-material/Groups';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import PersonIcon from '@mui/icons-material/Person';
import ScienceIcon from '@mui/icons-material/Science';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import BuildIcon from '@mui/icons-material/Build';
import letterOfRecommendationPDF from '../../assets/information/letterofrecommendation/Vincent_Letter_of_Recommendation.pdf';

// Import images directly
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
  { title: 'Testing Types', color: 'success', items: ['A/B Testing', 'Tree Testing', 'Card Sorting', 'User Testing', 'Usability Testing'] },
  // Other Technologies (warning)
  { title: 'Languages', color: 'warning', items: ['JavaScript', 'TypeScript', 'CSS', 'HTML', 'Java', 'C', 'C++', 'C#', 'Python', 'RegEx', 'LaTeX'] },
  { title: 'Frameworks & Libraries', color: 'warning', items: ['React', 'Three.js', 'Material UI', 'Bootstrap', 'Framer Motion', 'React Three Fiber', 'react-scroll', 'react-bits'] },
  { title: 'Haptics & Audio‑UX', color: 'warning', items: ['Tone.js', 'RNBO', 'Interhaptics', 'Hapticlabs', 'Max/MSP', 'Unity', 'SuperCollider'] },
  { title: 'Tools', color: 'warning', items: ['Figma', 'Adobe CC', 'Unity', 'Git', 'GitHub Copilot', 'VS Code', 'Windsurf', 'Cursor', 'Docker', 'N8N', 'Ableton Live', 'Logic Pro', 'Pro Tools'] },
  { title: 'Currently Improving', color: 'secondary', items: ['Golang', 'Hugo','Analytical Sketching', 'Rust', 'AI Code Prompt Engineering & Automation', 'QA Basics', 'LLM UX Design & Implementation', 'SwiftUI', 'TensorFlow', 'Playwright', 'Supabase']},
];
// Original core competency items with icons and skills (now for Skills & Technologies tab)
const coreCompetencyItems = [
  {
    title: 'Collaboration',
    description: 'Effective teamwork requires more than talent—it needs structure. I value clear processes, thorough documentation, and genuine shared ownership of outcomes.',
    icon: GroupsIcon,
    skills: [
      'Clear Processes',
      'Thorough Documentation',
      'Shared Ownership',
      'Collaborative Learning',
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
      'Diary Studies',
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
    icon: BuildIcon,
    skills: [
      'Local Ollama LLM APIs',
      '(Local) embedded n8n Automation',
      'Workflow Optimization',
      'LLM Prompt Engineering',
      'Creative Problem-Solving',
      'Tool Integration'
    ]
  }
];

// Design competencies with icons for WhoAmI tab
const designCompetencyItems = [
  {
    title: 'Design',
    description: 'I design simple, clear interfaces that help people get things done. I focus on structure, flows, and visuals that feel natural to use.',
    icon: BrushIcon,
    skills: [
      'UI/UX Design',
      'Interaction Design',
      'Wireframing',
      'Rapid Prototyping',
      'Visual Design/ Graphic Design',
      'User Flows',
      'Information Architecture',
      'Front End Handoff'
    ]
  },
  {
    title: 'Research',
    description: 'I talk to users, run tests, and review designs to learn what works and what does not. This helps the team make better choices.',
    icon: AccessibilityNewIcon,
    skills: [
      'User Research',
      'Usability Testing',
      'A/B Testing',
      'Heuristic Evaluation',
      'User Interviews',
      'Data Analysis',
      'Thematic Analysis',
      'Digital Ethnography',
      'Contextual Inquiry',
      'Literature Review',
      'Market Research'
    ]
  },
  {
    title: 'Development',
    description: 'I turn ideas into working products with clean, accessible code. I care about performance and small details that improve the experience.',
    icon: CodeIcon,
    skills: [
      'Frontend Development',
      'Responsive Design',
      'Design Systems',
      'Accessibility',
      'Mobile Development',
      'Sensor Integration',
      'Audio Feedback',
      'Haptic Feedback'
    ]
  },
  {
    title: 'Audio',
    description: 'I create sound and build audio interactions. This adds feedback, mood, and clarity to the interface when it helps people.',
    icon: HeadsetMicIcon,
    skills: [
      'Sound Design',
      'Audio Mixing',
      'Audio Programming',
      'Music Production',
      'Interactive Audio',
      'Spatial Audio',
      'Signal Processing',
      'Audio-Haptic Prototyping'
    ] 
  },
  {
    title: 'Teaching',
    description: 'I share what I know through workshops and mentoring. I like to make complex topics feel simple and useful.',
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
    description: 'I plan, align teams, and ship. I work with stakeholders, set goals, and keep work moving in the right direction.',
    icon: AccountTreeIcon,
    skills: [
      'Agile Methodologies',
      'Scrum',
      'Team Leadership',
      'Stakeholder Management',
      'Requirements Gathering',
      'Roadmapping',
      'Asana'
    ]
  },
  
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
      'Researched music technology and interaction topics for djay',
      'Designed an interactive audio-visual prototype for intuitive music control',
      'Defined personas and mapped user flows for key scenarios',
      'Built tablet UI wireframes and prototypes in Figma and Adobe XD',
      'Researched modern design tools to iterate the prototypes and explore'
    ],
    attachments: [
      { label: 'Letter of Recommendation (PDF)', url: letterOfRecommendationPDF }
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
    // No pictures - using WhoAmIProfileCard instead
    content: (
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        {/* Interactive profile card header */}
        <WhoAmIProfileCard />
        
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
      createAboutImage(SkillsImage, 'Skills background', 'center 2%', {
        objectFit: 'cover',
      }),
    ],
    content: (
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Typography variant="h4" sx={{ mb: 4 }}>Technical Stack & Tools</Typography>
        
        {/* Stack cards 1x1 for all breakpoints */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr' }, gap: 3, mb: 4 }}>
          {/* Card 1: Tools & Workflow */}
          <Box sx={{ 
            p: 3, 
            borderRadius: 2, 
            bgcolor: 'rgba(255, 152, 0, 0.05)',
            border: '1px solid rgba(255, 152, 0, 0.2)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  bgcolor: 'rgba(255, 152, 0, 0.2)',
                  color: 'warning.main',
                  mr: 2,
                  flexShrink: 0
                }}
              >
                <BuildIcon />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 600, color: 'warning.main' }}>
                Tools & Workflow Automation
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.6 }}>
              I use Figma and Adobe CC for design. For development I work with GitHub Copilot, Windsurf, and Cursor. For audio I use tools like Ableton and Logic Pro. I also automate routine work with n8n and local LLMs. The goal is to spend less time on busywork and more time solving real problems.
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
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  bgcolor: 'rgba(3, 169, 244, 0.2)',
                  color: 'info.main',
                  mr: 2,
                  flexShrink: 0
                }}
              >
                <IntegrationInstructionsIcon />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 600, color: 'info.main' }}>
                Languages & Technical Stack
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.6 }}>
              My stack covers the frontend (JS/TS, React, Three.js), some embedded work (C, C++, C#), and creative coding (Processing). I also explore audio and haptics (RNBO, Interhaptics, Max/MSP). I like building things that connect the digital and the physical.
            </Typography>
            <Box sx={{ mt: 'auto' }}>
              <CategorizedTags 
                categories={skillTagCategories
                  .filter(cat => ['Languages', 'Frameworks & Libraries', 'Haptics & Audio‑UX'].includes(cat.title))
                  .map(cat => ({ ...cat, color: 'info' }))}
              />
            </Box>
          </Box>

          {/* Card 3: Currently Improving */}
          <Box sx={{ 
            p: 3, 
            borderRadius: 2, 
            bgcolor: 'rgba(156, 39, 176, 0.05)',
            border: '1px solid rgba(156, 39, 176, 0.2)',
            gridColumn: { xs: '1', md: '1' },
            display: 'flex',
            flexDirection: 'column'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  bgcolor: 'rgba(156, 39, 176, 0.2)',
                  color: 'secondary.main',
                  mr: 2,
                  flexShrink: 0
                }}
              >
                <TrendingUpIcon />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 600, color: 'secondary.main' }}>
                Currently Improving
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.6 }}>
              I am learning Golang to get better at backend and systems work. I am also practicing analytical sketching to explain ideas faster in workshops. It helps me ship better and work better with people.
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
      createAboutImage(EducationImage, 'Academic journey photo', 'center 35%', {
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
export { coreCompetencyItems, designCompetencyItems, experienceItems };

export default aboutData;
