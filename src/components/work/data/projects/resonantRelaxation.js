/**
 * Resonant Relaxation Project Data
 * 
 * This file contains the structured data for the Resonant Relaxation project.
 */
import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ArticleIcon from '@mui/icons-material/Article';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import GitHubIcon from '@mui/icons-material/GitHub';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import ImageIcon from '@mui/icons-material/Image';

// Import project images
import ProcedurallyGenHaptic from '../../../../assets/images/ProdecualHaptics/ProceduallyGenHaptic.png';
import UIPrototype from '../../../../assets/images/ProdecualHaptics/UI Prototype.png';
import PrincipleSketch from '../../../../assets/images/ProdecualHaptics/PrincipleSketch.png';
import AIAPIFewshotting from '../../../../assets/images/ProdecualHaptics/AIAPIFewshotting.png';
import presentationPDF from '../../../../assets/information/Procedually generated haptics/ResonantRelaxation_Presentation.pdf';
import paperPDF from '../../../../assets/information/Procedually generated haptics/EuroHaptics_2024_Final_WIP_1077.pdf';
import posterPDF from '../../../../assets/information/Procedually generated haptics/POSTER_Resonant_Relaxation_-_Eurohaptics_24.pdf';

// Define card variant without direct theme dependency
const cardVariant = 'secondary';

// Define links array with consistent format
const links = [
  {
    label: "Try Demo",
    url: "https://react-midi.netlify.app/",
    contentType: 'iframe',
    openInPopup: true
  },
  {
    label: "View Presentation",
    url: presentationPDF,
    contentType: 'pdf',
    openInPopup: true
  },
  {
    label: "View Paper",
    url: paperPDF,
    contentType: 'pdf',
    openInPopup: true
  },
  {
    label: "View Poster",
    url: posterPDF,
    contentType: 'pdf',
    openInPopup: true
  },
  {
    label: "GitHub",
    url: "https://github.com/NesR0M/Resonant-Relaxation-Project/tree/main",
    contentType: 'external',
    openInPopup: true
  }
];

const resonantRelaxation = {
  id: 'resonantRelaxation',
  title: "Resonant Relaxation – Procedural Haptics",
  description: "Procedurally generated audio haptic feedback for relaxation applications, presented at EuroHaptics 2024.",
  categories: ["Haptic Design", "AI Integration", "UX Research", "Sound Design"],
  technologies: ["React.js", "RNBO.js", "GPT-4 API", "Tone.js", "Bootstrap"],
  cardVariant: cardVariant,
  links: links,
  sections: [
    {
      id: 'section-overview',
      type: 'default',
      title: 'Overview',
      content: (
        <>
          <Typography variant="body1" paragraph>
            The ongoing shift towards digital sedentary lifestyles has increased stress in daily life and calls for innovative approaches to improve mental and physical health. This project explores the capabilities of AI generated audio for affective haptic feedback to create experiences that induce relaxation and enhance emotional well-being and productivity.
          </Typography>
          <Typography variant="body1" paragraph>
            Presented at EuroHaptics 2024 and developed in collaboration with Innovobot Labs, the project designed a web application that allows haptic designers to create customized haptic patterns for respiration based relaxation practices. The system offers customizable parameters and leverages AI driven audio haptic composition to tailor relaxation experiences to individual user needs.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Research Question:</strong> "How could generative AI support designers in creating relaxation inducing haptic experiences to enhance emotional well-being during sedentary activities?"
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Box
              component="a"
              href="https://doi.org/10.1007/978-3-319-58628-1_23"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                fontSize: '0.75rem',
                px: 1.5,
                py: 0.5,
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 1,
                color: 'primary.light',
                textDecoration: 'none',
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  transform: 'translateY(-1px)',
                }
              }}
            >
              🔗 Bumatay & Seo (2017)
            </Box>
            <Box
              component="a"
              href="https://doi.org/10.1109/ACII.2019.8925531"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                fontSize: '0.75rem',
                px: 1.5,
                py: 0.5,
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 1,
                color: 'primary.light',
                textDecoration: 'none',
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  transform: 'translateY(-1px)',
                }
              }}
            >
              🔗 Leslie et al. (2019)
            </Box>
            <Box
              component="a"
              href="https://doi.org/10.1016/j.cobeha.2022.101113"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                fontSize: '0.75rem',
                px: 1.5,
                py: 0.5,
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 1,
                color: 'primary.light',
                textDecoration: 'none',
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  transform: 'translateY(-1px)',
                }
              }}
            >
              🔗 MacLean (2022)
            </Box>
            <Box
              component="a"
              href="https://eprints.whiterose.ac.uk/141387/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                fontSize: '0.75rem',
                px: 1.5,
                py: 0.5,
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 1,
                color: 'primary.light',
                textDecoration: 'none',
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  transform: 'translateY(-1px)',
                }
              }}
            >
              🔗 Williams et al. (2019)
            </Box>
          </Box>
        </>
      ),
      media: { type: 'image', src: ProcedurallyGenHaptic },
      layout: 'textLeft',
      anchor: 'overview',
      navigable: true
    },
    {
      id: 'section-challenges-solutions',
      type: 'cardGrid',
      title: 'Challenges & Solutions',
      content: 'Modern sedentary lifestyles contribute to increased stress, affecting productivity and emotional health. Resonant Relaxation addresses key limitations in existing relaxation technologies.',
      items: [
        {
          title: 'Limited Adaptability',
          icon: '🔒',
          color: 'error.main',
          subtitle: 'Challenge',
          description: 'Existing haptic systems lack flexibility and cannot adapt to individual user needs or preferences.',
          features: [
            'Fixed haptic patterns',
            'No personalization options',
            'Limited sensory modalities',
            'Rigid system configurations'
          ]
        },
        {
          title: 'Procedural Generation',
          icon: '🎵',
          color: 'success.main',
          subtitle: 'Solution',
          description: 'AI powered procedural generation creates infinite variations of audio haptic patterns tailored to user states.',
          features: [
            'GPT-4 API integration for MIDI composition',
            'Dynamic pattern generation',
            'Personalized relaxation experiences',
            'Adaptive to user feedback'
          ]
        },
        {
          title: 'High Development Costs',
          icon: '💰',
          color: 'error.main',
          subtitle: 'Challenge',
          description: 'Custom haptic pattern development requires expensive expertise and time intensive manual creation.',
          features: [
            'Specialist knowledge required',
            'Time-consuming manual design',
            'Limited scalability',
            'High production costs'
          ]
        },
        {
          title: 'Automated Creation',
          icon: '⚡',
          color: 'success.main',
          subtitle: 'Solution',
          description: 'Web-based tool enables rapid prototyping and testing without specialized haptic design expertise.',
          features: [
            'Browser-based interface',
            'Real-time pattern generation',
            'No specialized knowledge needed',
            'Instant iteration and testing'
          ]
        },
        {
          title: 'Integration Gaps',
          icon: '🔌',
          color: 'error.main',
          subtitle: 'Challenge',
          description: 'Few systems effectively combine biofeedback data with multisensory relaxation stimuli.',
          features: [
            'Single-channel approaches',
            'No biofeedback integration',
            'Disconnected modalities',
            'Limited effectiveness'
          ]
        },
        {
          title: 'Multi-Modal Synthesis',
          icon: '🌊',
          color: 'success.main',
          subtitle: 'Solution',
          description: 'Synchronized audio haptic feedback creates immersive relaxation experiences with breathing synchronization.',
          features: [
            'Combined auditory and tactile stimulation',
            'Breathing rate synchronization',
            'Amplitude-modulated sine waves',
            'Gradual state transition support'
          ]
        }
      ],
      columns: { xs: 1, sm: 2, md: 3, lg: 3 },
      cardVariant: 'elevation',
      anchor: 'challenges-solutions',
      navigable: true
    },
    {
      id: 'section-research',
      type: 'default',
      title: 'Research Evolution',
      content: (
        <>
          <Typography variant="body1" paragraph>
            The research initially focused on inducing flow states. However, early experiments revealed the complexity of reliably achieving flow. The project pivoted to target relaxation, a more attainable foundational state through controlled audio haptic stimulation.
          </Typography>
          <Typography variant="body1" paragraph>
            This approach could potentially facilitate transitions into deeper cognitive states in future iterations.
          </Typography>
        </>
      ),
      layout: 'textOnly',
      anchor: 'research',
      navigable: true
    },
    {
      id: 'section-methodology',
      type: 'default',
      title: 'Methodological Approach',
      content: (
        <>
          <Typography variant="body1" paragraph>
            The project combined theoretical research with practical implementation:
          </Typography>
          <Box component="ol" sx={{ pl: 3, mb: 2 }}>
            <li>
              <Typography variant="body1"><strong>Literature exploration:</strong> Research on emotional induction via auditory and tactile stimuli, focusing on breathing synchronization and optimal frequencies</Typography>
            </li>
            <li>
              <Typography variant="body1"><strong>Technical design:</strong> Two part audio haptic concept:</Typography>
              <Box component="ul" sx={{ pl: 3, mt: 1 }}>
                <li>
                  <Typography variant="body1"><strong>Baseline:</strong> Amplitude modulated sine wave that gradually reduces breathing rate</Typography>
                </li>
                <li>
                  <Typography variant="body1"><strong>AI-generated sparkles:</strong> MIDI compositions created through GPT-4 prompts, adding dynamic variation</Typography>
                </li>
              </Box>
            </li>
            <li>
              <Typography variant="body1"><strong>User testing:</strong> Iterative evaluations with neck and back pillows equipped with voice coil actuators</Typography>
            </li>
          </Box>
        </>
      ),
      media: { type: 'image', src: PrincipleSketch },
      layout: 'textLeft',
      anchor: 'methodology',
      navigable: true
    },
    {
      id: 'section-technical',
      type: 'default',
      title: 'Technical Implementation',
      content: (
        <>
          <Typography variant="body1" paragraph>
            The MVP is a React based web application featuring real time, procedurally generated audio haptic content:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li>
              <Typography variant="body1"><strong>GPT-4 integration:</strong> Prompt engineering for dynamic MIDI composition</Typography>
            </li>
            <li>
              <Typography variant="body1"><strong>Web audio:</strong> Tone.js for responsive audio with synchronized haptic signals</Typography>
            </li>
            <li>
              <Typography variant="body1"><strong>Customizable parameters:</strong> Breathing rate, intensity mapping, and pattern complexity</Typography>
            </li>
            <li>
              <Typography variant="body1"><strong>Effects processing:</strong> Filters, reverb, and delay for enhanced expressiveness</Typography>
            </li>
            <li>
              <Typography variant="body1"><strong>Biofeedback hooks:</strong> Prepared for future physiological sensor integration</Typography>
            </li>
          </Box>
        </>
      ),
      media: { type: 'image', src: UIPrototype },
      layout: 'textRight',
      anchor: 'technical',
      navigable: true
    },
    {
      id: 'section-evaluation',
      type: 'outcomes',
      title: 'Evaluation & Results',
      content: (
        <>
          <Typography variant="body1" paragraph>
            Initial user testing with 3 participants, each with different sedentary workload contexts, provided qualitative feedback for the development process. The study focused on understanding how procedurally generated audio haptic patterns affect perceived relaxation during concentrated work or relaxation sessions.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Key Results:</strong>
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant="body1"><strong>Increased calm:</strong> Participants reported increased feelings of calm after using the system</Typography></li>
            <li><Typography variant="body1"><strong>Preference for variety:</strong> Users preferred a variety of AI generated sparkles combined with the relaxing baseline over a simple haptic baseline alone</Typography></li>
            <li><Typography variant="body1"><strong>Multimodal advantage:</strong> Combined audio haptic stimulation enhanced perceived relaxation compared to single modality experiences</Typography></li>
            <li><Typography variant="body1"><strong>Engagement factor:</strong> Varied sparkle patterns maintained attention and emotional engagement during extended sessions</Typography></li>
          </Box>
          <Typography variant="body1" paragraph>
            The findings highlight the challenge posed by the highly contextual nature of haptic stimulation, affected by factors like baseline emotional state and environmental conditions, showing that intelligent and highly customizable solutions are needed to meet individual relaxation needs effectively.
          </Typography>
        </>
      ),
      media: { type: 'image', src: AIAPIFewshotting },
      layout: 'textLeft',
      anchor: 'evaluation',
      navigable: true,
      takeaways: [
        "AI enables real time haptic feedback adaptation",
        "Procedural generation reduces haptic development costs",
        "Multimodal integration enhances relaxation effectiveness",
        "Biofeedback integration improves personalization",
        "Open-source frameworks accelerate haptic design innovation"
      ],
      outcomes: {
        title: "Research Outcomes",
        points: [
          "Presented findings at EuroHaptics 2024 conference",
          "Developed functioning prototype demonstrating procedural audio haptic generation",
          "Established a framework for future affective computing applications"
        ]
      }
    },
    {
      id: 'section-impact',
      type: 'default',
      title: 'Academic Impact & Future Directions',
      content: (
        <>
          <Typography variant="body1" paragraph>
            The project advances affective haptic research by integrating AI generated audio with real time tactile feedback. Demonstrating the feasibility and efficiency of procedurally generated multimodal stimuli opens new possibilities for emotion driven interface design.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Authors:</strong> Vincent Göke, Jose Maria Santiago III, Moritz Sendner (Fachhochschule Salzburg & Paris-Lodron-Universität Salzburg), Daniel Shor (Innovobot Labs)
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Future directions:</strong> Long term studies to assess effects of regular use on emotional well-being, integration of sophisticated features like RNBO patches for adjustable virtual instruments, biofeedback loops for personalized experiences, and applications in rehabilitation, stress management, gaming, and creative tools.
          </Typography>
        </>
      ),
      layout: 'textOnly',
      anchor: 'impact',
      navigable: true
    },
    {
      id: 'section-references',
      type: 'default',
      title: 'References & Resources',
      content: (
        <>
          <Typography variant="h6" sx={{ mb: 2, color: 'text.secondary' }}>
            Academic Publication
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 3 }}>
            <li>
              <Typography variant="body2">
                Göke, V., Santiago III, J. M., Sendner, M., & Shor, D. (2024). Resonant Relaxation: Procedurally Generated Audio-Haptic Feedback for Emotional Well-being. <em>EuroHaptics 2024 Work-in-Progress</em>. Lille, France.
              </Typography>
            </li>
          </Box>

          <Typography variant="h6" sx={{ mb: 2, mt: 3, color: 'text.secondary' }}>
            Project Resources
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<ArticleIcon />}
              href={paperPDF}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                textTransform: 'none',
                borderRadius: 2,
                px: 3,
                py: 1.5,
                fontWeight: 600,
              }}
            >
              View Paper
            </Button>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<ImageIcon />}
              href={posterPDF}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                textTransform: 'none',
                borderRadius: 2,
                px: 3,
                py: 1.5,
                fontWeight: 600,
              }}
            >
              View Poster
            </Button>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<SlideshowIcon />}
              href={presentationPDF}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                textTransform: 'none',
                borderRadius: 2,
                px: 3,
                py: 1.5,
                fontWeight: 600,
              }}
            >
              View Presentation
            </Button>
            <Button
              variant="outlined"
              color="info"
              startIcon={<GitHubIcon />}
              href="https://github.com/NesR0M/Resonant-Relaxation-Project/tree/main"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                textTransform: 'none',
                borderRadius: 2,
                px: 3,
                py: 1.5,
                fontWeight: 600,
              }}
            >
              GitHub
            </Button>
            <Button
              variant="contained"
              color="success"
              startIcon={<DesignServicesIcon />}
              href="https://react-midi.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                textTransform: 'none',
                borderRadius: 2,
                px: 3,
                py: 1.5,
                fontWeight: 600,
              }}
            >
              Try Demo
            </Button>
          </Box>

          <Typography variant="h6" sx={{ mb: 2, mt: 3, color: 'text.secondary' }}>
            Key Technologies & Frameworks
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li>
              <Typography variant="body2">
                <strong>Hapticlabs DevKit:</strong> Hardware platform for haptic feedback prototyping
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                <strong>OpenAI API:</strong> AI-powered procedural audio generation
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                <strong>Tone.js:</strong> Web audio framework for real-time sound synthesis
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                <strong>React & TypeScript:</strong> Frontend framework for interactive UI
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                <strong>RNBO (Cycling '74):</strong> Audio DSP integration for Max/MSP patches
              </Typography>
            </li>
          </Box>

          <Typography variant="body2" sx={{ mt: 3, fontStyle: 'italic', color: 'text.secondary' }}>
            Industry project completed at FH Salzburg in collaboration with Innovobot Labs and Paris-Lodron-Universität Salzburg. Presented at EuroHaptics 2024, Lille, France.
          </Typography>
        </>
      ),
      layout: 'textOnly',
      anchor: 'references',
      navigable: true
    }
  ]
};

// Assign the media field after initialization to avoid ReferenceError
resonantRelaxation.media = (() => {
  const firstVideo = resonantRelaxation.sections?.find(s => s.media && s.media.type === 'video');
  if (firstVideo) return firstVideo.media;
  const firstImage = resonantRelaxation.sections?.find(s => s.media && s.media.type === 'image');
  if (firstImage) return firstImage.media;
  return undefined;
})();

export default resonantRelaxation;
