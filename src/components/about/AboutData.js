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
// Note: filename uses uppercase .JPG extension in repository
// Import with matching case to avoid module not found errors on Unix systems
import WhoamiImage from '../../assets/images/About Me/Whoami.jpg';
import SkillsImage from '../../assets/images/About Me/SkillsandTechnologies.JPG';
import ExperienceImage from '../../assets/images/About Me/Experience.jpg';
import EducationImage from '../../assets/images/About Me/Education.JPG';

// Import utility for creating image objects with positioning
import { createAboutImage } from '../../utils/mediaUtils';

/**
 * Contains data for the About section tabs including content and images
 */
export const aboutData = [
  // WhoAmI tab (previously About Me)
  {
    title: "echo $ME",
    subtitle: "UX Designer & Researcher",
    titleColor: "secondary", // This will make the tab title yellow
    // Use createAboutImage with directly imported image source
    pictures: [
      createAboutImage(WhoamiImage, "Vincent Göke", 'center bottom 30%')
    ],
    content: (
      <>
        <Typography variant="h4" component="div" gutterBottom sx={{ color: theme => theme.palette.secondary.main }}>
          echo $ME
        </Typography>
        <Typography variant="body1" paragraph>
          Hi! I'm Vincent Göke, a Human-Computer Interaction Master's graduate, sound designer, and interaction technologist. My work is centered around designing <strong>emotion-driven experiences </strong> through <strong>affective haptics, UX research, and multi-sensory interaction design</strong>.
        </Typography>
        <Typography variant="body1" paragraph>
          With a background in media informatics and audio design, I transitioned into <strong>haptic interaction design</strong>—an underexplored but promising field that bridges touch, sound, and technology to create intuitive and immersive user experiences.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Beyond Work</strong>: Outside of my professional work, I produce and mix music under the aliases <strong>Din-Z</strong> and <strong>Superior Motive</strong>, with roots in HipHop production and audio post-production since 2015.
          When I’m not designing interactions or making music, you’ll likely find me on the pitch or in the stands — I’m a lifelong <strong>football fan</strong>, former player, and dedicated FC Schalke 04 supporter.
        </Typography>
      </>
    )
  },
  // Skills & Technologies tab
  {
    title: "Skills & Technologies",
    subtitle: "My UX Toolkit",
    // Use directly imported image
    pictures: [SkillsImage],
    content: (
      <>
        <Typography variant="h5" sx={{ mb: 3 }}>Core Competencies</Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
              <BrushIcon color="primary" sx={{ mr: 1, mt: 0.5, mb: 1 }} />
              <Typography variant="h6">Design</Typography>
            </Box>
            <Typography variant="body2" paragraph>
              UI/UX Design, Interaction Design, Wireframing, Prototyping, Visual Design, User Flows, Information Architecture
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
              <AccessibilityNewIcon color="primary" sx={{ mr: 1, mt: 0.5, mb: 1 }} />
              <Typography variant="h6">Research</Typography>
            </Box>
            <Typography variant="body2" paragraph>
              User Research, Usability Testing, A/B Testing, Heuristic Evaluation, User Interviews, Data Analysis, Thematic Analysis
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
              <CodeIcon color="primary" sx={{ mr: 1, mt: 0.5, mb: 1 }} />
              <Typography variant="h6">Development</Typography>
            </Box>
            <Typography variant="body2" paragraph>
              Frontend Development, Responsive Design, Design Systems, Accessibility Implementation, Mobile Development, Sensor Integration, Haptic Feedback, Audio Programming
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
              <LocalLibraryIcon color="primary" sx={{ mr: 1, mt: 0.5, mb: 1 }} />
              <Typography variant="h6">Methodologies</Typography>
            </Box>
            <Typography variant="body2" paragraph>
              Design Thinking, Agile/Scrum, User-Centered Design, Design Sprints, Lean UX
            </Typography>
          </Grid>
        </Grid>

        <Typography variant="h5" sx={{ mb: 3 }}>Tools & Technologies</Typography>
        
        {/* Better structured Tools & Technologies section with categories and responsive design */}
        <Box sx={{ mb: 4 }}>
          {/* Design Tools Category */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" className="subheading" sx={{ mb: 1, fontWeight: 500 }}>
              Design Tools
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap',
              gap: { xs: 0.5, sm: 0.75 },
              mx: -0.5, // Offset the margin in SkillTagList
            }}>
              <SkillTagList label="Figma" size="responsive" />
              <SkillTagList label="Adobe XD" size="responsive" />
              <SkillTagList label="Sketch" size="responsive" />
              <SkillTagList label="Prototyping" size="responsive" />
            </Box>
          </Box>
          
          {/* Research Tools Category */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" className="subheading" sx={{ mb: 1, fontWeight: 500 }}>
              Research Tools
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap',
              gap: { xs: 0.5, sm: 0.75 },
              mx: -0.5, // Offset the margin in SkillTagList
            }}>
              <SkillTagList label="User Testing" size="responsive" />
              <SkillTagList label="Interviews" size="responsive" />
              <SkillTagList label="Surveys" size="responsive" />
            </Box>
          </Box>
          
          {/* Development Category */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" className="subheading" sx={{ mb: 1, fontWeight: 500 }}>
              Development
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap',
              gap: { xs: 0.5, sm: 0.75 },
              mx: -0.5, // Offset the margin in SkillTagList
            }}>
              <SkillTagList label="Javascript" size="responsive" />
              <SkillTagList label="HTML/CSS" size="responsive" />
              <SkillTagList label="Unity" size="responsive" />
              <SkillTagList label="C" size="responsive" />
              <SkillTagList label="C#" size="responsive" />
              <SkillTagList label="C++" size="responsive" />
              <SkillTagList label="Arduino" size="responsive" />
            </Box>
          </Box>
        </Box>
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
        <Typography variant="h5" sx={{ mb: 2 }}>Professional Experience</Typography>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {/* Experience 1 */}
          <Grid item xs={12} md={6}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              height: '100%',
              p: 1.5,
              borderRadius: theme => theme.shape.borderRadius.sm,
              backgroundColor: 'background.paper',
              boxShadow: 1
            }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 0 }}>
                <BusinessCenterIcon color="primary" sx={{ mr: 1, mt: 0.2, fontSize: '1.3rem' }} />
                <Box sx={{ lineHeight: 1 }}>
                  <Typography variant="h6" sx={{ color: 'primary.main', fontSize: '0.95rem', lineHeight: 1.1 }}>UX Intern</Typography>
                  <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontSize: '0.85rem', lineHeight: 1.1, mt: -0.3 }}>DJay Munich | 2022</Typography>
                </Box>
              </Box>
              <Typography variant="body2" sx={{ mt: 0, mb: 0, fontSize: '0.85rem', lineHeight: 1.1 }}>
                Conducted user research and prototyped new interaction models for music-related applications.
              </Typography>
              <Box component="ul" sx={{ paddingLeft: '1.2rem', mt: 0, mb: 0, pl: 1, flex: 1, lineHeight: 0.9 }}>
                <Box component="li" sx={{ mb: 0 }}><Typography variant="body2" sx={{ fontSize: '0.85rem', lineHeight: 1.1 }}>Designed user flows and wireframes for mobile music applications</Typography></Box>
                <Box component="li" sx={{ mb: 0 }}><Typography variant="body2" sx={{ fontSize: '0.85rem', lineHeight: 1.1 }}>Conducted usability testing with musicians and DJs</Typography></Box>
                <Box component="li"><Typography variant="body2" sx={{ fontSize: '0.85rem', lineHeight: 1.1 }}>Created prototypes using Figma and Adobe XD</Typography></Box>
              </Box>
            </Box>
          </Grid>
          
          {/* Experience 2 */}
          <Grid item xs={12} md={6}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              height: '100%',
              p: 1.5,
              borderRadius: theme => theme.shape.borderRadius.sm,
              backgroundColor: 'background.paper',
              boxShadow: 1
            }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 0 }}>
                <WorkIcon color="primary" sx={{ mr: 1, mt: 0.2, fontSize: '1.3rem' }} />
                <Box sx={{ lineHeight: 1 }}>
                  <Typography variant="h6" sx={{ color: 'primary.main', fontSize: '0.95rem', lineHeight: 1.1 }}>IT & Podcast Production Support</Typography>
                  <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontSize: '0.85rem', lineHeight: 1.1, mt: -0.3 }}>University Hospital Munich | 2020–2022</Typography>
                </Box>
              </Box>
              <Typography variant="body2" sx={{ mt: 0, mb: 0, fontSize: '0.85rem', lineHeight: 1.1 }}>
                Provided technical support and developed an audio production pipeline for podcast content.
              </Typography>
              <Box component="ul" sx={{ paddingLeft: '1.2rem', mt: 0, mb: 0, pl: 1, flex: 1, lineHeight: 0.9 }}>
                <Box component="li" sx={{ mb: 0 }}><Typography variant="body2" sx={{ fontSize: '0.85rem', lineHeight: 1.1 }}>Managed IT infrastructure for medical education department</Typography></Box>
                <Box component="li" sx={{ mb: 0 }}><Typography variant="body2" sx={{ fontSize: '0.85rem', lineHeight: 1.1 }}>Produced and edited educational podcast content</Typography></Box>
                <Box component="li"><Typography variant="body2" sx={{ fontSize: '0.85rem', lineHeight: 1.1 }}>Trained staff on audio recording and editing software</Typography></Box>
              </Box>
            </Box>
          </Grid>
          
          {/* Experience 3 */}
          <Grid item xs={12}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              height: '100%',
              p: 1.5,
              borderRadius: theme => theme.shape.borderRadius.sm,
              backgroundColor: 'background.paper',
              boxShadow: 1
            }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 0 }}>
                <HeadsetMicIcon color="primary" sx={{ mr: 1, mt: 0.2, fontSize: '1.3rem' }} />
                <Box sx={{ lineHeight: 1 }}>
                  <Typography variant="h6" sx={{ color: 'primary.main', fontSize: '0.95rem', lineHeight: 1.1 }}>Freelance Audio Producer / Sound Designer</Typography>
                  <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontSize: '0.85rem', lineHeight: 1.1, mt: -0.3 }}>Self-employed | Since 2015</Typography>
                </Box>
              </Box>
              <Typography variant="body2" sx={{ mt: 0, mb: 0, fontSize: '0.85rem', lineHeight: 1.1 }}>
                Created original music compositions (Superior Motive, Din-Z), mixed audio for projects, and collaborated with artists.
              </Typography>
              <Box component="ul" sx={{ paddingLeft: '1.2rem', mt: 0, mb: 0, pl: 1, flex: 1, lineHeight: 0.9 }}>
                <Box component="li" sx={{ mb: 0 }}><Typography variant="body2" sx={{ fontSize: '0.85rem', lineHeight: 1.1 }}>Produced original music for independent artists</Typography></Box>
                <Box component="li" sx={{ mb: 0 }}><Typography variant="body2" sx={{ fontSize: '0.85rem', lineHeight: 1.1 }}>Designed sound effects and atmospheres for digital media</Typography></Box>
                <Box component="li"><Typography variant="body2" sx={{ fontSize: '0.85rem', lineHeight: 1.1 }}>Mixed and mastered audio for commercial release</Typography></Box>
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
          {/* Education 1 */}
          <Grid item xs={12} md={6}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              height: '100%',
              p: 2,
              borderRadius: theme => theme.shape.borderRadius.sm,
              backgroundColor: 'background.paper',
              boxShadow: 1
            }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                <SchoolIcon color="primary" sx={{ mr: 2, mt: 0 }} />              <Box>
                  <Typography variant="h6" sx={{ color: 'primary.main' }}>M.Sc. Human-Computer Interaction</Typography>
                  <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>FH Salzburg & PLUS Salzburg | 2022 - 2024</Typography>
                </Box>
              </Box>
              <Typography variant="body2" sx={{ mt: 1.5 }}>
                Specialized in haptic interaction design and multi-sensory user experience. Master's thesis on emotion-driven haptic feedback design methodologies.
              </Typography>
            </Box>
          </Grid>
          
          {/* Education 2 */}
          <Grid item xs={12} md={6}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              height: '100%',
              p: 2,
              borderRadius: theme => theme.shape.borderRadius.sm,
              backgroundColor: 'background.paper',
              boxShadow: 1
            }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                <MenuBookIcon color="primary" sx={{ mr: 2, mt: 0 }} />              <Box>
                  <Typography variant="h6" sx={{ color: 'primary.main' }}>B.Sc. Media Informatics</Typography>
                  <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>LMU Munich | 2017 - 2021</Typography>
                </Box>
              </Box>
              <Typography variant="body2" sx={{ mt: 1.5 }}>
                Focused on user interface design, web technologies, and interactive systems. Bachelor's thesis on trust in autonomous vehicle interfaces.
              </Typography>
            </Box>
          </Grid>
          
          {/* Education 3 */}
          <Grid item xs={12}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              height: '100%',
              p: 2,
              borderRadius: theme => theme.shape.borderRadius.sm,
              backgroundColor: 'background.paper',
              boxShadow: 1
            }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                <AutoStoriesIcon color="primary" sx={{ mr: 2, mt: 0 }} />              <Box>
                  <Typography variant="h6" sx={{ color: 'primary.main' }}>Diploma in Audio Design</Typography>
                  <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>Deutsche POP, Munich | 2015 - 2017</Typography>
                </Box>
              </Box>
              <Typography variant="body2" sx={{ mt: 1.5 }}>
                Professional training in audio production, sound design, and music technology with emphasis on electronic music production.
              </Typography>
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

// Export function that returns the aboutData array for useDataLoader compatibility
export const getAboutData = () => {
  // Return the about data directly without promise wrapping
  // This simplifies the data flow and prevents potential issues
  console.log('About data fetched:', aboutData.length, 'items');
  return aboutData;
};

export default aboutData;
