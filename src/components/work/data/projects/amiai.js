/**
 * AMIAI Project Data
 * 
 * This file contains the structured data for the AMIAI critical visual campaign project.
 */
import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SlideshowIcon from '@mui/icons-material/Slideshow';

// Import project image - use direct imports for consistent processing by the bundler
import AMIAILogo from '../../../../assets/images/AMIAI/AMIAI.svg';
import AMIAIIntro from '../../../../assets/images/AMIAI/Final Presentation amiai/Introduction.png';
import AMIAIScene from '../../../../assets/images/AMIAI/Scene.mp4';
import SAMIAI from '../../../../assets/images/AMIAI/5samiai.mov';

// Import utility for asset paths (only for documents)
import { getAssetPath } from '../../../../utils/mediaUtils';

// Create a media object to hold all our imported media for cleaner code
const media = {
  images: {
    logo: AMIAILogo,
    intro: AMIAIIntro
  },
  videos: {
    scene: AMIAIScene,
    samiai: SAMIAI
  },
  documents: {
    presentation: getAssetPath('AMIAI', 'Final Presentation.pdf')
  }
};

// Define card variant without direct theme dependency
const cardVariant = 'error';

// Project data object
const amiai = {
  id: 3,
  title: "AMIAI – Critical Visual Campaign",
  description: "A visual campaign exploring AI-generated content credibility and digital literacy.",
  categories: ["Graphic Design", "Visual Communication", "Marketing Campaigns"],
  
  // Replace details with structured sections
  sections: [
    {
      id: 'section-overview',
      title: 'Project Overview',
      content: (
        <Typography variant="body1" paragraph>
          The "AM I AI?" exhibit serves as a critical visual campaign designed to provoke public discourse about the reliability, authenticity, and ethical implications of AI-generated media. Through strategic design metaphors and visual storytelling, AMIAI prompts users to critically question, verify, and reflect on the digital information they consume in an era where the line between human-generated and artificially-created content becomes increasingly blurred.
        </Typography>
      ),
      media: { type: 'image', src: media.images.intro },
      layout: 'textLeft'
    },
    {
      id: 'section-context',
      title: 'Context & Motivation',
      content: (
        <Typography variant="body1" paragraph>
          In an era increasingly dominated by digital content, misleading or altered information can rapidly influence public perceptions and decisions. AMIAI addresses this growing issue by highlighting the critical need for digital literacy and verification through impactful visual communication. The goal is not only to raise awareness but also to empower audiences to maintain autonomy over their digital interactions.
        </Typography>
      ),
      layout: 'textOnly'
    },
    {
      id: 'section-pixelation',
      title: 'Key Design Element: Pixelation Metaphor',
      content: (
        <Typography variant="body1" paragraph>
          Central to the visual identity of AMIAI is the pixelation effect, symbolizing the transformation of reality into digital representation. This intentional visual distortion serves as a powerful metaphor for AI's potential to obscure truth, manipulate perception, and subtly alter human understanding. Pixelation effectively communicates the ambiguity and uncertainty inherent in AI-generated content, prompting viewers to pause, question, and engage critically with digital information.
        </Typography>
      ),
      media: { type: 'image', src: media.images.logo },
      layout: 'textRight'
    },
    {
      id: 'section-research',
      title: 'Research & Conceptual Development',
      content: (
        <>
          <Typography variant="body1">
            The conceptual foundation of AMIAI was informed by:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant="body1">Analysis of current AI-generated content trends and their impact on public trust</Typography></li>
            <li><Typography variant="body1">Exploration of visual metaphors and their psychological influence on perception and decision-making</Typography></li>
            <li><Typography variant="body1">Review of historical and contemporary visual campaigns that successfully leveraged design to provoke critical reflection</Typography></li>
          </Box>
          <Typography variant="body1" paragraph>
            This research phase guided the systematic development of a cohesive visual language, unifying the campaign's messaging, tone, and visual presentation.
          </Typography>
        </>
      ),
      layout: 'textOnly'
    },
    {
      id: 'section-process',
      title: 'Design Process & Execution',
      content: (
        <>
          <Typography variant="body1" paragraph>
            The creative execution involved a multi-step approach:
          </Typography>
          <Box component="ol" sx={{ pl: 3, mb: 2 }}>
            <li>
              <Typography variant="body1">
                <strong>Visual Identity Creation:</strong> Developed a cohesive brand identity centered around the pixelation concept, including logo design, typography, and a carefully curated color palette
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Interactive and Motion Graphics:</strong> Created dynamic animations and interactive graphics to visually demonstrate how easily digital content can be distorted or artificially generated
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Poster and Digital Media Design:</strong> Produced campaign materials designed for physical exhibits and digital platforms, strategically crafted to provoke immediate emotional responses
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Scenario and Storytelling:</strong> Implemented narrative-driven visuals demonstrating real-world implications of AI-generated misinformation
              </Typography>
            </li>
          </Box>
        </>
      ),
      media: { type: 'video', src: media.videos.scene },
      layout: 'textLeft'
    },
    {
      id: 'section-components',
      title: 'Campaign Components',
      content: (
        <>
          <Typography variant="body1" paragraph>
            AMIAI utilized a diverse array of designed outputs to maximize impact:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li>
              <Typography variant="body1">
                <strong>Poster Series:</strong> High-impact printed visuals strategically displayed in public spaces to maximize visibility and engagement
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Digital Animations:</strong> Short-form motion graphics distributed through social media platforms to expand audience reach
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Interactive Digital Experience:</strong> Web-based interactions prompting users to engage directly with pixelation effects, experiencing firsthand the subtle distortion of information
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>AR Experience:</strong> Augmented reality elements revealing hidden layers of information when posters are viewed through a smartphone
              </Typography>
            </li>
          </Box>
        </>
      ),
      media: { type: 'video', src: media.videos.samiai },
      layout: 'textRight'
    },
    {
      id: 'section-impact',
      title: 'Impact & Outcomes',
      content: (
        <>
          <Typography variant="body1">
            The AMIAI campaign successfully:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant="body1">Initiated conversations and critical reflections about digital content authenticity</Typography></li>
            <li><Typography variant="body1">Increased awareness of the necessity to verify online information</Typography></li>
            <li><Typography variant="body1">Established a robust visual metaphor that effectively communicates complex concepts related to digital distortion</Typography></li>
            <li><Typography variant="body1">Demonstrated how critical design approaches can address emerging technological issues</Typography></li>
          </Box>
        </>
      ),
      layout: 'textOnly'
    },
    {
      id: 'section-future',
      title: 'Future Directions',
      content: (
        <Typography variant="body1" paragraph>
          Future development could expand AMIAI's impact through educational workshops, AR/VR experiences, and partnerships with digital platforms to amplify the campaign's reach and effectiveness in promoting critical digital literacy.
        </Typography>
      ),
      layout: 'textOnly'
    }
  ],
  
  galleryImages: [
    media.images.logo,
    media.images.intro,
    { type: 'video', src: media.videos.scene },
    { type: 'video', src: media.videos.samiai }
  ],
  technologies: ["Adobe Photoshop", "Adobe Illustrator", "After Effects", "Cinema 4D"],
  cardVariant: cardVariant,
  media: { type: 'image', src: media.images.logo },
  featuredImages: {
    overview: media.images.intro,
    problem: media.images.intro,
    solution: media.images.logo
  },
  links: [
    {
      label: "View Presentation",
      url: media.documents.presentation,
      icon: <SlideshowIcon fontSize="small" />,
      contentType: 'pdf'
    }
  ],
  takeaways: [
    "Visual design can effectively communicate complex ethical concepts",
    "Critical design approaches raise important questions about technological implementation",
    "Typography can express tension between human and machine systems",
    "Public interventions can stimulate dialogue about AI ethics",
    "Interdisciplinary research strengthens the conceptual foundation of design projects"
  ],
  
  // Add outcomes object
  outcomes: {
    title: "Campaign Results",
    points: [
      "Successful public exhibition at university gallery space",
      "Positive feedback from design community and AI ethicists",
      "Development of a visual language for discussing AI credibility issues"
    ]
  }
};

export default amiai;