/**
 * Master Thesis Project Data
 * 
 * This file contains the structured data for the Prototyping Emotions master thesis project.
 */
import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ArticleIcon from '@mui/icons-material/Article';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import DashboardIcon from '@mui/icons-material/Dashboard';

// Import project images directly with standardized naming
import OverviewImage from '../../../../assets/images/Masterthesis/headerimagemasterthesis.png';
import ProcessImage from '../../../../assets/images/Masterthesis/workshop_agenda.png';
import CircumplexModelImage from '../../../../assets/images/Masterthesis/circumplex_model.png';
import BodyMappingImage from '../../../../assets/images/Masterthesis/body_map_template.png';
import PrototypeImage from '../../../../assets/images/Masterthesis/prototype_session_1.jpg';
import HapticLabsImage from '../../../../assets/images/Masterthesis/haptic_labs.jpg';
import WorkshopImage from '../../../../assets/images/Masterthesis/workshop.jpg';
import MetaphorElicitationImage from '../../../../assets/images/Masterthesis/metaphor_elicitation_template.jpg';
import AudioHapticsImage from '../../../../assets/images/Masterthesis/audio_haptics.png';
import AffectivePrototype1Image from '../../../../assets/images/Masterthesis/affective_prototype_1.png';
import AffectivePrototype2Image from '../../../../assets/images/Masterthesis/affective_prototype_2.png';
import BodyMapQuestionsImage from '../../../../assets/images/Masterthesis/body_map_questions.jpg';
import WorkshopBodyMapsImage from '../../../../assets/images/Masterthesis/workshop_body_maps.jpg';

// Import project PDFs
import presentationPDF from '../../../../assets/information/Master thesis/Prototyping_Emotions_Thesis_Defense_Presentation_0225.pdf';
import thesisPDF from '../../../../assets/information/Master thesis/Vincent_Master_Thesis0225.pdf';

// Create a media object to hold all our imported media
const media = {
  images: {
    overview: OverviewImage,
    process: ProcessImage,
    circumplex: CircumplexModelImage,
    bodyMapping: BodyMappingImage,
    prototype: PrototypeImage,
    hapticLabs: HapticLabsImage,
    workshop: WorkshopImage,
    metaphorElicitation: MetaphorElicitationImage,
    audioHaptics: AudioHapticsImage,
    affectivePrototype1: AffectivePrototype1Image,
    affectivePrototype2: AffectivePrototype2Image,
    bodyMapQuestions: BodyMapQuestionsImage,
    workshopBodyMaps: WorkshopBodyMapsImage
  }
};

// Define card variant without direct theme dependency
const cardVariant = 'primary';

// Define links array with consistent format
const links = [
  {
    label: "View Presentation",
    url: presentationPDF,
    icon: <SlideshowIcon fontSize="small" />,
    contentType: 'pdf',
    openInPopup: true
  },
  {
    label: "View Thesis",
    url: thesisPDF,
    icon: <ArticleIcon fontSize="small" />,
    contentType: 'pdf',
    openInPopup: true
  },
  {
    label: "Miro Template",
    url: "https://miro.com/app/live-embed/uXjVLZy8Sr4=/?moveToViewport=-23778,-21432,70849,35904&embedId=821121874827",
    icon: <DashboardIcon fontSize="small" />,
    contentType: 'iframe',
    openInPopup: true
  }
];

// Project data object
const masterThesis = {
  id: 'masterThesis',
  title: "Prototyping Emotions – Master Thesis",
  description: "A structured methodology for prototyping emotional haptic feedback using the Circumplex Model of Affect.",
  categories: ["UX Research", "Interaction Design", "HCI Methodologies", "Haptic Design"],
  technologies: ["Figma", "Miro", "Hapticlabs DevKit", "Hapticlabs Studio"],
  cardVariant: cardVariant,
  links: links,
  sections: [
    {
      id: 'section-overview',
      type: 'default',
      title: 'Project Overview',
      content: (
        <Typography variant="body1" paragraph>
          This master thesis developed a structured methodological toolkit designed to assist novice designers in crafting emotionally resonant haptic feedback systems. The research bridges the gap between emotion theory and practical haptic design through structured workshop methodologies and technical implementations, specifically targeting accessibility and intuitive use within educational contexts.
        </Typography>
      ),
      media: { type: 'image', src: media.images.overview },
      layout: 'textLeft',
      anchor: 'overview',
      navigable: true
    },
    {
      id: 'section-problem',
      type: 'default',
      title: 'Motivation & Problem Statement',
      content: (
        <>
          <Typography variant="body1">
            Despite advancements in affective computing, novice interaction designers frequently encounter significant difficulties in effectively translating abstract emotions into tangible tactile experiences. Key challenges include:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant="body1">Technical complexity of existing haptic prototyping tools</Typography></li>
            <li><Typography variant="body1">Lack of structured emotional frameworks suitable for tactile interaction design</Typography></li>
            <li><Typography variant="body1">Limited resources that integrate emotion theory into iterative prototyping practices</Typography></li>
          </Box>
          <Typography variant="body1" paragraph>
            The thesis aimed explicitly at overcoming these obstacles through an educational, user-centered toolkit that fosters emotional awareness, iterative prototyping, and collaborative learning.
          </Typography>
        </>
      ),
      media: { type: 'image', src: media.images.circumplex },
      layout: 'textRight',
      anchor: 'problem',
      navigable: true
    },
    {
      id: 'section-methodology',
      type: 'default',
      title: 'Methodological Approach',
      content: (
        <>
          <Typography variant="body1" paragraph>
            The toolkit was validated through a structured workshop consisting of clearly delineated phases:
          </Typography>
          <Box component="ol" sx={{ pl: 3, mb: 2 }}>
            <li>
              <Typography variant="body1">
                <strong>Emotional Framework Introduction:</strong> Participants engaged with foundational emotional theories including the Circumplex Model of Affect and Delft's Emotion Typology, establishing a common conceptual basis.
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Embodied Metaphor Elicitation and Body Mapping:</strong> Utilizing personal emotional objects and detailed body maps, participants identified emotional hotspots and physical sensations, crucial for actuator placement in haptic designs.
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Tandem On-body Prototyping:</strong> Through collaborative and iterative prototyping sessions with the Hapticlabs DevKit, participants created and refined haptic prototypes in real-time, alternating roles between designer and tester.
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Reflective Feedback:</strong> Surveys and structured group discussions facilitated critical evaluation of the prototypes' emotional resonance, usability, and overall effectiveness.
              </Typography>
            </li>
          </Box>
        </>
      ),
      layout: 'textOnly',
      anchor: 'methodology',
      navigable: true
    },
    {
      id: 'section-toolkit',
      type: 'default',
      title: 'Toolkit Components',
      content: (
        <>
          <Typography variant="body1" paragraph>
            The final methodological toolkit included:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li>
              <Typography variant="body1">
                <strong>Visual Templates:</strong> For embodied metaphor elicitation and emotion categorization
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Physical Prototyping Resources:</strong> The Hapticlabs DevKit with actuators (ERM, LRA, VC) and tactile materials for rapid experimentation
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <strong>Interactive Digital Workspace (Miro):</strong> Enhancing documentation, remote collaboration, and iterative refinement
              </Typography>
            </li>
          </Box>
        </>
      ),
      media: { type: 'image', src: media.images.bodyMapping },
      layout: 'textLeft',
      anchor: 'toolkit',
      navigable: true
    },
    {
      id: 'section-outcomes',
      type: 'outcomes',
      title: 'Key Outcomes & Contributions',
      content: (
        <>
          <Typography variant="body1">
            This research contributed a practical, accessible framework for novice haptic designers, significantly democratizing affective haptic design within educational and professional contexts. Key findings include:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li>
              <Typography variant="body1">Participants successfully translated abstract emotional concepts into tangible, emotionally resonant haptic feedback</Typography>
            </li>
            <li>
              <Typography variant="body1">Tandem prototyping significantly enhanced collaboration and iterative quality, creating richer, more personally meaningful designs</Typography>
            </li>
            <li>
              <Typography variant="body1">Identified technical challenges and subjective emotional interpretations provided critical insights for future toolkit refinement</Typography>
            </li>
          </Box>
          <Typography variant="body1" paragraph>
            Emotions can be systematically mapped to haptic parameters using the Circumplex Model of Affect.
          </Typography>
          <Typography variant="body1" paragraph>
            Body mapping provides essential context for placing haptic actuators effectively.
          </Typography>
          <Typography variant="body1" paragraph>
            Tandem prototyping creates more engaging and emotionally meaningful experiences.
          </Typography>
          <Typography variant="body1" paragraph>
            Iterative testing revealed the importance of temporal patterns in emotional haptic feedback.
          </Typography>
          <Typography variant="body1" paragraph>
            Cross-disciplinary collaboration significantly enriches the design process.
          </Typography>
        </>
      ),
      media: { type: 'image', src: media.images.prototype },
      layout: 'textRight',
      anchor: 'outcomes',
      navigable: true,
      outcomes: [
        "Established design patterns for translating emotions into tactile experiences",
        "Created workshop materials and templates to facilitate emotional haptic prototyping",
        "Developed a validated methodological toolkit for emotion-driven haptic design"
      ]
    }
  ]
};

// Assign the media field after initialization to avoid ReferenceError
masterThesis.media = (() => {
  const firstVideo = masterThesis.sections?.find(s => s.media && s.media.type === 'video');
  if (firstVideo) return firstVideo.media;
  const firstImage = masterThesis.sections?.find(s => s.media && s.media.type === 'image');
  if (firstImage) return firstImage.media;
  return undefined;
})();

export default masterThesis;