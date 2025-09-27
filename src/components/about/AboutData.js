import React from 'react';
import { Typography, Grid, Box, Chip } from '@mui/material';
import SkillTagList from '../common/SkillTagList';
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

// Import images directly
import WhoamiImage from '../../assets/images/About Me/Whoami.JPG';
import SkillsImage from '../../assets/images/About Me/SkillsandTechnologies.JPG';
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
});

const coreCompetencyItems = [
  {
    title: 'Design',
    description: 'UI/UX Design, Interaction Design, Wireframing, Prototyping, Visual Design, User Flows, Information Architecture',
    icon: BrushIcon,
  },
  {
    title: 'Research',
    description: 'User Research, Usability Testing, A/B Testing, Heuristic Evaluation, User Interviews, Data Analysis, Thematic Analysis',
    icon: AccessibilityNewIcon,
  },
  {
    title: 'Development',
    description: 'Frontend Development, Responsive Design, Design Systems, Accessibility Implementation, Mobile Development, Sensor Integration, Haptic Feedback, Audio Programming',
    icon: CodeIcon,
  },
  {
    title: 'Methodologies',
    description: 'Design Thinking, Agile/Scrum, User-Centered Design, Design Sprints, Lean UX',
    icon: LocalLibraryIcon,
  },
];

const toolGroups = [
  {
    title: 'Design Platforms',
    tags: ['Figma', 'Adobe XD', 'Miro', 'Prototyping'],
  },
  {
    title: 'Development Stack',
    tags: ['JavaScript', 'HTML/CSS', 'React', 'Unity', 'C', 'C#', 'C++', 'Python', 'Golang', 'Arduino'],
  },
];

const experienceItems = [
  {
    title: 'UX Intern',
    subtitle: 'DJay Munich | 2022',
    description: 'Conducted user research and prototyped new interaction models for music-related applications.',
    bullets: [
      'Designed user flows and wireframes for mobile music applications',
      'Conducted usability testing with musicians and DJs',
      'Created prototypes using Figma and Adobe XD',
    ],
    icon: BusinessCenterIcon,
    isFullWidth: false,
  },
  {
    title: 'IT & Podcast Production Support',
    subtitle: 'University Hospital Munich | 2020–2022',
    description: 'Provided technical support and developed an audio production pipeline for podcast content.',
    bullets: [
      'Managed IT infrastructure for medical education department',
      'Produced and edited educational podcast content',
      'Trained staff on audio recording and editing software',
    ],
    icon: WorkIcon,
    isFullWidth: false,
  },
  {
    title: 'Freelance Audio Producer / Sound Designer',
    subtitle: 'Freelancer | Since 2015',
    description: 'Created original music compositions (Superior Motive, Din-Z), mixed audio for projects, and collaborated with artists.',
    bullets: [
      'Produced original music for independent artists',
      'Designed sound effects and atmospheres for digital media',
      'Mixed and mastered audio for commercial release',
    ],
    icon: HeadsetMicIcon,
    isFullWidth: true,
  },
];

const educationItems = [
  {
    title: 'M.Sc. Human-Computer Interaction',
    subtitle: 'FH Salzburg & PLUS Salzburg | 2022 - 2025',
    description: "Specialized in haptic interaction design and multi-sensory user experience. Master's thesis on emotion-driven haptic feedback design methodologies.",
    icon: SchoolIcon,
    isFullWidth: false,
  },
  {
    title: 'B.Sc. Media Informatics',
    subtitle: 'LMU Munich | 2018 - 2021',
    description: 'Focused on HMI design, web technologies, and interactive systems. Bachelor\'s thesis on trust in autonomous vehicle interfaces.',
    icon: MenuBookIcon,
    isFullWidth: false,
  },
  {
    title: 'Diploma in Audio Design',
    subtitle: 'Deutsche POP, Munich | 2017 - 2019',
    description: 'Professional training in audio production, sound design, and music technology with emphasis on electronic music production.',
    icon: AutoStoriesIcon,
    isFullWidth: true,
  },
];

/**
 * Contains data for the About section tabs including content and images
 */
export const aboutData = [
  // WhoAmI tab (previously About Me)
  {
    title: "WhoAmI",
    subtitle: "UX Designer & Researcher",
    // Use createAboutImage with directly imported image source
    pictures: [
      createAboutImage(WhoamiImage, "Vincent Göke", 'center bottom 30%', {
        width: 1536,
        height: 1339,
        objectFit: 'cover',
      })
    ],
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
    // Use directly imported image with metadata to maintain its portrait framing
    pictures: [
      createAboutImage(SkillsImage, 'Skillset moodboard', 'center top', {
        width: 2494,
        height: 3004,
        objectFit: 'contain',
      })
    ],
    content: (
      <>
        <Typography variant="h4">Core Competencies</Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {coreCompetencyItems.map(({ title, description, icon: Icon }) => (
            <Grid item xs={12} sm={6} key={title}>
              <Box sx={(theme) => ({
                ...infoCardSx(theme),
                gap: theme.spacing(1.5),
              })}
              >
                <Box sx={(theme) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: theme.spacing(1),
                })}
                >
                  <Icon color="primary" sx={{ fontSize: '1.5rem' }} />
                  <Typography variant="h6">{title}</Typography>
                </Box>
                <Typography variant="body2">{description}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Typography variant="h5" sx={{ mt: 4, mb: 3 }}>Tools & Technologies</Typography>
        <Grid container spacing={3}>
          {toolGroups.map(({ title, tags }) => (
            <Grid item xs={12} md={4} key={title}>
              <Box sx={(theme) => ({
                ...infoCardSx(theme),
                gap: theme.spacing(1),
              })}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {title}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 0.5 }}>
                  {tags.map((tag) => (
                    <SkillTagList key={tag} label={tag} size="small" />
                  ))}
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </>
    )
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
        <Typography variant="h4">Academic Qualifications</Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {educationItems.map(({ icon: Icon, title, subtitle, description, isFullWidth }) => (
            <Grid item xs={12} md={isFullWidth ? 12 : 6} key={title}>
              <Box sx={(theme) => ({
                ...infoCardSx(theme),
                gap: theme.spacing(1.5),
              })}
              >
                <Box sx={(theme) => ({
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: theme.spacing(1.5),
                })}
                >
                  <Icon color="primary" sx={{ fontSize: '1.3rem' }} />
                  <Box>
                    <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 600 }}>{title}</Typography>
                    <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>{subtitle}</Typography>
                  </Box>
                </Box>
                <Typography variant="body2">{description}</Typography>
              </Box>
            </Grid>
          ))}
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

// Export function that returns the aboutData array for useDataLoader compatibility
export const getAboutData = () => {
  // Return the about data directly without promise wrapping
  // This simplifies the data flow and prevents potential issues
  return aboutData;
};

export default aboutData;
