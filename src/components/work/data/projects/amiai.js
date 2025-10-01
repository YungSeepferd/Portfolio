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
  description: "A visual campaign that questions AI-generated content credibility and promotes critical digital literacy through design.",
  categories: ["Graphic Design", "Visual Communication", "Marketing Campaigns", "AI Ethics", "Critical Design", "Digital Literacy"],
  technologies: ["Adobe Photoshop", "Adobe Illustrator", "After Effects"],
  cardVariant: cardVariant,
  links: links,
  sections: [
    {
      id: 'section-overview',
      type: 'default',
      title: 'Project Overview',
      content: (
        <>
          <Typography variant="body1" paragraph>
            The "AM I AI?" exhibit is a critical visual campaign that challenges public understanding of AI-generated media. The project uses design metaphors and visual storytelling to prompt questions about reliability, authenticity, and ethics in digital content.
          </Typography>
          <Typography variant="body1" paragraph>
            As the line between human created and artificially generated content blurs, AMIAI encourages viewers to question, verify, and reflect on the information they encounter.
          </Typography>
        </>
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
        <>
          <Typography variant="body1" paragraph>
            Digital content now shapes public perception and decision making at unprecedented speed. Misleading or altered information spreads rapidly, making verification skills essential.
          </Typography>
          <Typography variant="body1" paragraph>
            AMIAI addresses this challenge through visual communication that promotes digital literacy. The campaign aims to raise awareness while empowering audiences to maintain autonomy over their digital interactions.
          </Typography>
        </>
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
        <>
          <Typography variant="body1" paragraph>
            The pixelation effect anchors AMIAI's visual identity, symbolizing the transformation of reality into digital representation. This intentional distortion metaphorically represents how AI can obscure truth and alter perception.
          </Typography>
          <Typography variant="body1" paragraph>
            The visual treatment communicates the ambiguity inherent in AI generated content, prompting viewers to pause and engage critically with digital information.
          </Typography>
        </>
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
          <Typography variant="body1" paragraph>
            The project's conceptual foundation drew from:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant="body1"><strong>Trend analysis:</strong> How AI generated content affects public trust</Typography></li>
            <li><Typography variant="body1"><strong>Visual metaphors:</strong> Psychological influence of design on perception and decision-making</Typography></li>
            <li><Typography variant="body1"><strong>Campaign review:</strong> Historical and contemporary visual campaigns that successfully provoked critical reflection</Typography></li>
          </Box>
          <Typography variant="body1" paragraph>
            This research guided development of a cohesive visual language that unified the campaign's messaging, tone, and presentation.
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
            The creative process followed multiple phases:
          </Typography>
          <Box component="ol" sx={{ pl: 3, mb: 2 }}>
            <li>
              <Typography variant="body1">
                <strong>Visual identity:</strong> Brand system centered on pixelation, including logo, typography, and color palette
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Motion graphics:</strong> Dynamic animations demonstrating how digital content can be distorted or artificially generated
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Campaign materials:</strong> Posters and digital assets for physical exhibits and online platforms
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Narrative visuals:</strong> Scenarios showing real-world implications of AI-generated misinformation
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
            The campaign deployed multiple formats:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li>
              <Typography variant="body1">
                <strong>Poster series:</strong> Printed visuals displayed in public spaces for maximum visibility
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Digital animations:</strong> Short motion graphics distributed through social media
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Interactive experience:</strong> Web-based interface where users engage directly with pixelation effects
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
          <Typography variant="body1" paragraph>
            Campaign outcomes:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant="body1">Sparked conversations about digital content authenticity</Typography></li>
            <li><Typography variant="body1">Raised awareness about verifying online information</Typography></li>
            <li><Typography variant="body1">Created a visual metaphor that communicates digital distortion concepts</Typography></li>
            <li><Typography variant="body1">Showed how critical design can address technological challenges</Typography></li>
          </Box>
        </>
      ),
      layout: 'textOnly',
      anchor: 'impact',
      navigable: true,
      takeaways: [
        "Visual design communicates complex ethical concepts accessibly",
        "Critical design raises questions about technology implementation",
        "Typography expresses tension between human and machine systems",
        "Public interventions stimulate dialogue about AI ethics",
        "Interdisciplinary research strengthens design project foundations"
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
          Future development opportunities include educational workshops, augmented and virtual reality experiences, and partnerships with digital platforms to expand the campaign's reach and impact on digital literacy.
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
