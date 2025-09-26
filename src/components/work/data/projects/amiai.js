/**
 * AMIAI Project Data
 * 
 * This file contains the structured data for the AMIAI critical visual campaign project.
 */
import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// Import project image - use direct imports for consistent processing by the bundler
import AMIAILogo from '../../../../assets/images/AMIAI/AMIAI.svg';
import AMIAIIntro from '../../../../assets/images/AMIAI/Final Presentation amiai/Introduction.png';
import AMIAIScene from '../../../../assets/images/AMIAI/Scene.mp4';
import SAMIAI from '../../../../assets/images/AMIAI/5samiai.mov';
import presentationPDF from '../../../../assets/information/AMIAI/AMIAI_Presentation.pdf';

// Create a media object to hold all our imported media for cleaner code
const media = {
  images: {
    logo: AMIAILogo,
    intro: AMIAIIntro
  },
  videos: {
    scene: AMIAIScene,
    samiai: SAMIAI
  }
};

// Define card variant without direct theme dependency
const cardVariant = 'error';

// Define links array with consistent format
const links = [
  {
    label: "View Presentation",
    url: presentationPDF,
    contentType: 'pdf',
    openInPopup: true
  }
];

// Project data object
const amiai = {
  id: 'amiai',
  title: "AMIAI – Critical Visual Campaign",
  description: "A visual campaign exploring AI-generated content credibility and digital literacy.",
  categories: ["Graphic Design", "Visual Communication", "Marketing Campaigns"],
  technologies: ["Adobe Photoshop", "Adobe Illustrator", "After Effects"],
  cardVariant: cardVariant,
  links: links,
  sections: [
    {
      id: 'section-overview',
      type: 'default',
      title: 'Project Overview',
      content: (
        <Typography variant="body1" paragraph>
          The "AM I AI?" exhibit serves as a critical visual campaign designed to provoke public discourse about the reliability, authenticity, and ethical implications of AI-generated media. Through strategic design metaphors and visual storytelling, AMIAI prompts users to critically question, verify, and reflect on the digital information they consume in an era where the line between human-generated and artificially-created content becomes increasingly blurred.
        </Typography>
      ),
      media: { type: 'image', src: media.images.intro },
      layout: 'textLeft',
      anchor: 'overview',
      navigable: true
    },
    {
      id: 'section-context',
      type: 'default',
      title: 'Context & Motivation',
      content: (
        <Typography variant="body1" paragraph>
          In an era increasingly dominated by digital content, misleading or altered information can rapidly influence public perceptions and decisions. AMIAI addresses this growing issue by highlighting the critical need for digital literacy and verification through impactful visual communication. The goal is not only to raise awareness but also to empower audiences to maintain autonomy over their digital interactions.
        </Typography>
      ),
      layout: 'textOnly',
      anchor: 'context',
      navigable: true
    },
    {
      id: 'section-pixelation',
      type: 'default',
      title: 'Key Design Element: Pixelation Metaphor',
      content: (
        <Typography variant="body1" paragraph>
          Central to the visual identity of AMIAI is the pixelation effect, symbolizing the transformation of reality into digital representation. This intentional visual distortion serves as a powerful metaphor for AI's potential to obscure truth, manipulate perception, and subtly alter human understanding. Pixelation effectively communicates the ambiguity and uncertainty inherent in AI-generated content, prompting viewers to pause, question, and engage critically with digital information.
        </Typography>
      ),
      media: { type: 'image', src: media.images.logo },
      layout: 'textRight',
      anchor: 'pixelation',
      navigable: true
    },
    {
      id: 'section-research',
      type: 'default',
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
      layout: 'textOnly',
      anchor: 'research',
      navigable: true
    },
    {
      id: 'section-process',
      type: 'video',
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
      layout: 'textLeft',
      anchor: 'process',
      navigable: true
    },
    {
      id: 'section-components',
      type: 'video',
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
          </Box>
        </>
      ),
      media: { type: 'video', src: media.videos.samiai },
      layout: 'textRight',
      anchor: 'components',
      navigable: true
    },
    {
      id: 'section-impact',
      type: 'outcomes',
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
      layout: 'textOnly',
      anchor: 'impact',
      navigable: true,
      takeaways: [
        "Visual design can effectively communicate complex ethical concepts",
        "Critical design approaches raise important questions about technological implementation",
        "Typography can express tension between human and machine systems",
        "Public interventions can stimulate dialogue about AI ethics",
        "Interdisciplinary research strengthens the conceptual foundation of design projects"
      ],
      outcomes: {
        title: "Campaign Results",
        points: [
          "Successful public exhibition at university gallery space",
          "Positive feedback from design community and AI ethicists",
          "Development of a visual language for discussing AI credibility issues"
        ]
      }
    },
    {
      id: 'section-future',
      type: 'default',
      title: 'Future Directions',
      content: (
        <Typography variant="body1" paragraph>
          Future development could expand AMIAI's impact through educational workshops, AR/VR experiences, and partnerships with digital platforms to amplify the campaign's reach and effectiveness in promoting critical digital literacy.
        </Typography>
      ),
      layout: 'textOnly',
      anchor: 'future',
      navigable: true
    }
  ]
};

amiai.media = (() => {
  const firstVideo = amiai.sections?.find(s => s.media && s.media.type === 'video');
  if (firstVideo) return firstVideo.media;
  const firstImage = amiai.sections?.find(s => s.media && s.media.type === 'image');
  if (firstImage) return firstImage.media;
  return undefined;
})();

export default amiai;
