/**
 * ADHDeer Project Data
 *
 * This file contains the structured data for the ADHDeer ADHD support app project.
 */
import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DashboardIcon from '@mui/icons-material/Dashboard';

// Import project images and videos directly with standardized naming
import ADHDeerHeroImage from '../../../../assets/images/ADHDeer/ADHDeer.png';
import ADHDeerScreenshotImage from '../../../../assets/images/ADHDeer/Screenshot 2025-04-07 at 10.01.09.png';
import ADHDeerPrototypeVideo from '../../../../assets/images/ADHDeer/ADHDeer - Video Prototype.mp4';
import presentationPDF from '../../../../assets/information/ADHDeer/ADHDeerPresentation.pdf';

// Import utility for asset paths (only for documents)
import { getAssetPath } from '../../../../utils/mediaUtils';

// Create a media object to hold all our imported media
const media = {
  images: {
    hero: ADHDeerHeroImage,
    screenshot: ADHDeerScreenshotImage
  },
  videos: {
    prototype: ADHDeerPrototypeVideo
  },
  documents: {
    // Use getAssetPath only for documents in the public folder
    presentation: getAssetPath('ADHDeer', 'ADHDeerPresentation.pdf')
  }
};

// Define card variant without direct theme dependency
const cardVariant = 'warning';

// Project data object
const adhdeer = {
  id: 'adhdeer',
  title: "ADHDeer – ADHD Support App",
  description: "A mobile app supporting youth with ADHD through empathic UX design and structured daily routines.",
  categories: ["UI Design", "UX Research", "Mental Health UX", "Prototyping", "Design Thinking"],
  
  // Replace details with structured sections
  sections: [
    {
      id: 'section-overview',
      title: 'Project Overview',
      content: (
        <Typography variant="body1" paragraph>
          ADHDeer is an innovative mobile app designed during a Design Thinking project at FH Salzburg. The app specifically targets young adults and children with Attention Deficit Hyperactivity Disorder (ADHD), helping them and their families <strong>manage daily life challenges</strong> associated with the condition. The team leveraged personal experiences, user-centered research, and <strong>empathic design methodologies</strong> to create a practical, supportive digital companion that promotes self-awareness, emotional regulation, and structured daily routines.
        </Typography>
      ),
      media: { type: 'image', src: media.images.hero },
      layout: 'textLeft'
    },
    {
      id: 'section-motivation',
      title: 'Motivation & Team Context',
      content: (
        <Typography variant="body1" paragraph>
          ADHD, characterized by inattentiveness, hyperactivity, and impulsivity, significantly impacts everyday life, academic performance, social interactions, and emotional health. Team members Anica Hummel and Lucia Migacová brought personal and professional ADHD expertise, having first-hand experience with the challenges faced by neurodivergent individuals. This personal connection provided valuable insight into the actual needs and frustrations of the target audience.
        </Typography>
      ),
      layout: 'textOnly'
    },
    {
      id: 'section-problem',
      title: 'Defining the Problem',
      content: (
        <>
          <Typography variant="body1">
            Through extensive research and empathizing phases, key challenges emerged clearly:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant="body1"><strong>Communication Barriers:</strong> Children and young adults often find it difficult to express their emotional needs or struggles to parents, caregivers, or educators</Typography></li>
            <li><Typography variant="body1"><strong>Underdiagnosis and Misdiagnosis:</strong> A lack of accurate diagnosis leads many to face exacerbated mental health issues like anxiety or depression</Typography></li>
            <li><Typography variant="body1"><strong>Lack of Daily Structure:</strong> Individuals with ADHD frequently struggle with time management, maintaining routines, and managing emotional fluctuations</Typography></li>
            <li><Typography variant="body1"><strong>Need for age-appropriate tools:</strong> Many existing solutions don't feel engaging or accessible to younger users</Typography></li>
          </Box>
        </>
      ),
      layout: 'textRight'
    },
    {
      id: 'section-research',
      title: 'Research & Empathy Phase',
      content: (
        <>
          <Typography variant="body1" paragraph>
            The research phase incorporated diverse methods to gain comprehensive insights:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant="body1"><strong>Interviews & Personal Insights:</strong> In-depth conversations with ADHD experts, individuals diagnosed with ADHD, and their families</Typography></li>
            <li><Typography variant="body1"><strong>Digital Ethnography:</strong> Engagement with online communities (Reddit, Quora) and ADHD-specific forums</Typography></li>
            <li><Typography variant="body1"><strong>Focus Groups and Ideation Sessions:</strong> Collaborative brainstorming using Mind Mapping, Brainstorming, and Storyboarding techniques</Typography></li>
          </Box>
        </>
      ),
      layout: 'textLeft'
    },
    {
      id: 'section-dimensions',
      title: 'Core Dimensions & Functionalities',
      content: (
        <>
          <Typography variant="body1" paragraph>
            Through intensive ideation, three critical dimensions were identified:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant="body1"><strong>Mental Health and Emotional Regulation:</strong> Tools for tracking mood and managing emotional responses</Typography></li>
            <li><Typography variant="body1"><strong>Awareness and Understanding of ADHD:</strong> Educational content and self-awareness development</Typography></li>
            <li><Typography variant="body1"><strong>Daily Routine Management:</strong> Structured task planning and organization systems</Typography></li>
          </Box>
          
          <Typography variant="body1" paragraph>
            These dimensions were implemented through practical features including:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant="body1"><strong>Gamified Task Management:</strong> Converting daily routines into engaging quests and challenges</Typography></li>
            <li><Typography variant="body1"><strong>Emotion Tracking:</strong> Helping users identify emotional triggers and develop coping strategies</Typography></li>
            <li><Typography variant="body1"><strong>Parent/Child Mode:</strong> Separate interfaces with appropriate features for each user type</Typography></li>
            <li><Typography variant="body1"><strong>Reward System:</strong> Visual progress tracking and achievement badges to build confidence</Typography></li>
          </Box>
        </>
      ),
      layout: 'textOnly'
    },
    {
      id: 'section-prototype',
      title: 'Prototyping & Design',
      content: (
        <>
          <Typography variant="body1" paragraph>
            The prototype was crafted in Figma, designed with close attention to accessibility, usability, and engagement for neurodiverse audiences. The UI/UX emphasized clarity, visual appeal, and simplicity, avoiding overwhelming or distracting elements. Key prototype features included:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant="body1"><strong>Gamified Daily Planner:</strong> Encouraging active engagement with routines through rewards and progress tracking</Typography></li>
            <li><Typography variant="body1"><strong>Mood and Focus Journal:</strong> Easy logging of emotions and concentration levels with visual pattern representation</Typography></li>
            <li><Typography variant="body1"><strong>Educational Modules:</strong> User-friendly resources on ADHD management strategies and communication skills</Typography></li>
          </Box>
        </>
      ),
      media: { type: 'video', src: media.videos.prototype },
      layout: 'textRight'
    },
    {
      id: 'section-outcomes',
      title: 'Outcomes & User Feedback',
      content: (
        <Typography variant="body1" paragraph>
          The prototype received positive initial feedback from test users, who particularly appreciated the intuitive interface, playful aesthetics, and empathetic tone. Users highlighted the application's potential to significantly improve daily structure, emotional awareness, and overall self-confidence.
        </Typography>
      ),
      layout: 'textOnly'
    },
    {
      id: 'section-future',
      title: 'Future Directions',
      content: (
        <>
          <Typography variant="body1" paragraph>
            To further develop ADHDeer, recommended enhancements include:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant="body1"><strong>AI-driven Personalization:</strong> Integrating AI capabilities to provide personalized feedback based on user behavior patterns</Typography></li>
            <li><Typography variant="body1"><strong>Expanded Community Features:</strong> Developing safe, moderated peer-support forums within the app</Typography></li>
            <li><Typography variant="body1"><strong>Parent and Educator Modules:</strong> Creating specialized sections with tailored guidance for supporting ADHD children</Typography></li>
          </Box>
        </>
      ),
      layout: 'textLeft'
    }
  ],
  
  galleryImages: [
    media.images.hero,
    media.images.screenshot,
    { type: 'video', src: media.videos.prototype }
  ],
  technologies: ["Figma", "Miro", "Adobe Illustrator", "User Testing"],
  cardVariant: cardVariant,
  media: { type: 'image', src: media.images.hero }, 
  featuredImages: {
    overview: media.images.hero,
    problem: media.images.screenshot,
    solution: media.images.hero,
    prototypeShowcase: [
      media.images.hero,
      media.images.screenshot,
      { type: 'video', src: media.videos.prototype }
    ]
  },
  links: [
    {
      label: "View Presentation",
      url: presentationPDF,
      icon: <DashboardIcon fontSize="small" />,
      contentType: 'pdf',
      openInPopup: true
    },
    {
      label: "Try Prototype",
      url: "https://embed.figma.com/design/XJZe9gLj6NkgA05QERnsmD/ADHDeer---Group?node-id=0-1&embed-host=share",
      icon: <DashboardIcon fontSize="small" />,
      contentType: 'iframe',
      openInPopup: true
    }
  ],
  takeaways: [
    "Empathic design creates more effective solutions for neurodivergent users",
    "Gamification can increase engagement for users with attention challenges",
    "Visual design plays a critical role in accessibility for ADHD users",
    "User research with diverse stakeholders leads to more comprehensive solutions",
    "Digital tools can significantly improve daily functioning for individuals with ADHD"
  ],
  
  outcomes: {
    title: "Project Outcomes",
    points: [
      "Created a user-centered digital tool for ADHD management",
      "Developed a prototype that received positive feedback from test users",
      "Established design principles for neurodiverse-friendly applications"
    ]
  }
};

export default adhdeer;