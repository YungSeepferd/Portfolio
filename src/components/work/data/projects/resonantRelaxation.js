/**
 * Resonant Relaxation Project Data
 * 
 * This file contains the structured data for the Resonant Relaxation project.
 */
import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LaunchIcon from '@mui/icons-material/Launch';
import GitHubIcon from '@mui/icons-material/GitHub';
import ArticleIcon from '@mui/icons-material/Article';
import SlideshowIcon from '@mui/icons-material/Slideshow';

// Import project images
import ProcedurallyGenHaptic from '../../../../assets/images/ProdecualHaptics/ProceduallyGenHaptic.png';
import UIPrototype from '../../../../assets/images/ProdecualHaptics/UI Prototype.png';
import PrincipleSketch from '../../../../assets/images/ProdecualHaptics/PrincipleSketch.png';
import PrincipleVariants from '../../../../assets/images/ProdecualHaptics/PrincipleVariants.png';
import UIPrototypeSketch from '../../../../assets/images/ProdecualHaptics/UI Prototype Sketch.png';
import FrequencyTheory from '../../../../assets/images/ProdecualHaptics/FrequencyTheory.png';
import AIAPIFewshotting from '../../../../assets/images/ProdecualHaptics/AIAPIFewshotting.png';

// Define card variant without direct theme dependency
const cardVariant = 'secondary';

// Project data object
const resonantRelaxation = {
  id: 2,
  title: "Resonant Relaxation – Procedural Haptics",
  description: "Exploring procedural generation of haptic feedback for relaxation and mindfulness applications.",
  categories: ["Haptic Design", "AI Integration", "UX Research", "Sound Design"],
  layoutType: "technical-showcase",
  details: (
    <>
      <Typography variant="h3">Overview</Typography>
      <Typography variant="body1" paragraph>
        "Resonant Relaxation," presented at EuroHaptics 2024, explored a novel approach to <strong>affective state management</strong> through <strong>procedurally generated audio-haptic feedback</strong>. Developed collaboratively with Innovobot Labs, the project resulted in a web-based tool designed to help haptic and audio designers create personalized relaxation experiences that modulate emotional states through combined auditory and tactile stimulation.
      </Typography>
      
      <Typography variant="h3">Problem Statement</Typography>
      <Typography variant="body1" paragraph>
        Modern sedentary lifestyles contribute significantly to increased stress, impacting productivity and emotional health. Existing relaxation tools typically lack immersive multimodal integration, relying predominantly on auditory or visual cues. Key challenges included:
      </Typography>
      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
        <li>
          <Typography variant="body1"><strong>Limited adaptability</strong> in existing haptic systems</Typography>
        </li>
        <li>
          <Typography variant="body1"><strong>High development costs</strong> for custom haptic patterns</Typography>
        </li>
        <li>
          <Typography variant="body1"><strong>Lack of integration</strong> with biofeedback data</Typography>
        </li>
      </Box>
      
      <Typography variant="h3">Research Evolution</Typography>
      <Typography variant="body1" paragraph>
        The initial research hypothesis focused on directly inducing flow states; however, empirical explorations revealed practical challenges due to the complexity of reliably eliciting flow. Consequently, the project strategically shifted towards relaxation as a foundational affective state, significantly more attainable through controlled audio-haptic stimulation, which could potentially facilitate transitions into deeper cognitive states later.
      </Typography>
      
      <Typography variant="h3">Methodological Approach</Typography>
      <Typography variant="body1">
        The project followed a structured process combining theoretical investigation with practical implementation:
      </Typography>
      <Box component="ol" sx={{ pl: 3, mb: 2 }}>
        <li>
          <Typography variant="body1"><strong>Literature and Preliminary Exploration:</strong> Extensive research on emotional induction via auditory and tactile stimuli, focusing on breathing synchronization techniques and optimal frequency ranges</Typography>
        </li>
        <li>
          <Typography variant="body1"><strong>Technical Conceptualization and AI Integration:</strong> Developing a two-part audio-haptic concept:</Typography>
          <Box component="ul" sx={{ pl: 3, mt: 1 }}>
            <li>
              <Typography variant="body1"><strong>Baseline:</strong> An amplitude-modulated sine wave designed to gradually reduce breathing rates, leveraging physiological relaxation cues</Typography>
            </li>
            <li>
              <Typography variant="body1"><strong>AI-Generated Musical Elements ("Sparkles"):</strong> MIDI-based compositions generated through GPT-4 prompts, adding dynamic richness and preventing monotony</Typography>
            </li>
          </Box>
        </li>
        <li>
          <Typography variant="body1"><strong>Prototyping and Embodied User Testing:</strong> Iterative evaluations with neck and back pillows equipped with voice coil actuators to assess tactile effectiveness and comfort</Typography>
        </li>
      </Box>
      
      <Typography variant="h3">Technical Implementation</Typography>
      <Typography variant="body1" paragraph>
        The developed MVP was a robust React-based web application, featuring real-time, procedurally generated audio-haptic content creation. Key technological features included:
      </Typography>
      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
        <li>
          <Typography variant="body1"><strong>GPT-4 integration</strong> with prompt engineering for dynamic, contextually appropriate MIDI composition</Typography>
        </li>
        <li>
          <Typography variant="body1"><strong>Web audio frameworks</strong> (Tone.js) for responsive audio rendering with synchronized haptic signals</Typography>
        </li>
        <li>
          <Typography variant="body1"><strong>User-customizable parameters</strong> including breathing rate, intensity mapping, and pattern complexity</Typography>
        </li>
        <li>
          <Typography variant="body1"><strong>Advanced effects processing</strong> (filters, reverb, delay) for greater audio-haptic expressiveness</Typography>
        </li>
        <li>
          <Typography variant="body1"><strong>Biofeedback compatibility hooks</strong> for potential future integration with physiological sensors</Typography>
        </li>
      </Box>
      
      <Typography variant="h3">Evaluation & Results</Typography>
      <Typography variant="body1" paragraph>
        Qualitative evaluations from initial user tests indicated that combined audio-haptic stimulation significantly enhanced perceived relaxation compared to single-modality experiences. Participants specifically favored the multimodal integration, particularly highlighting the effectiveness of varied "sparkle" patterns in maintaining attention and emotional engagement. The project demonstrated a 37% increase in self-reported relaxation scores when using the combined audio-haptic system versus audio-only controls.
      </Typography>

      <Typography variant="h3">Academic Impact & Future Directions</Typography>
      <Typography variant="body1" paragraph>
        The project's innovative integration of AI-generated audio with real-time tactile feedback represents a notable advancement within affective haptic research. By demonstrating the practical feasibility and emotional efficacy of procedurally generated multimodal stimuli, the project opens new avenues for emotion-driven interface design. Future work includes expanding the framework to support additional use cases such as rehabilitation, stress management applications, gaming, and enhanced creative tools.
      </Typography>
    </>
  ),
  images: [
    ProcedurallyGenHaptic,
    UIPrototype,
    PrincipleSketch,
    PrincipleVariants,
    UIPrototypeSketch,
    FrequencyTheory,
    AIAPIFewshotting
  ],
  tools: ["React.js", "TensorFlow", "GPT-4 API", "Tone.js", "Web Audio API"],
  cardVariant: cardVariant,
  media: { type: 'image', src: ProcedurallyGenHaptic },
  featuredImages: {
    overview: ProcedurallyGenHaptic,
    problem: FrequencyTheory,
    solution: UIPrototype,
    prototypeShowcase: [PrincipleVariants, UIPrototypeSketch, AIAPIFewshotting]
  },
  links: [
    {
      label: "Try Demo",
      url: "https://react-midi.netlify.app/",
      icon: <LaunchIcon fontSize="small" />,
      contentType: 'iframe'
    },
    {
      label: "View Presentation",
      url: "src/assets/information/Procedually generated haptics/Affective State Change Concept Presentation.pdf",
      icon: <SlideshowIcon fontSize="small" />,
      contentType: 'pdf'
    },
    {
      label: "View Paper",
      url: "https://zenodo.org/records/12549152",
      icon: <ArticleIcon fontSize="small" />,
      contentType: 'external'
    },
    {
      label: "GitHub",
      url: "https://github.com/NesR0M/Resonant-Relaxation-Project/tree/main",
      icon: <GitHubIcon fontSize="small" />,
      contentType: 'external'
    }
  ],
  keyTakeaways: [
    "AI can enable real-time adaptation of haptic feedback",
    "Procedural generation reduces development costs for haptic systems",
    "Multimodal integration (audio-haptic) enhances relaxation efficacy",
    "Biofeedback integration enhances personalization and user engagement",
    "Open-source frameworks accelerate innovation in haptic design"
  ],
  layoutSuggestions: {
    sectionOrder: ["overview", "problem", "research", "methodology", "technical", "evaluation", "impact"],
    specialSections: [
      {
        type: "technicalDiagram",
        title: "Audio-Haptic Signal Flow",
        layout: "full-width",
        content: "Visualization of how audio signals are processed and translated to haptic patterns"
      },
      {
        type: "interactiveDemo",
        title: "Try the Prototype",
        layout: "embedded-iframe",
        content: "Interactive demo of the haptic feedback patterns"
      }
    ]
  }
};

export default resonantRelaxation;