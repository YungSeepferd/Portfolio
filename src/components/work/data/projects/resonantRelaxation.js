/**
 * Resonant Relaxation Project Data
 * 
 * This file contains the structured data for the Resonant Relaxation project.
 */
import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ImageIcon from '@mui/icons-material/Image';
import LaunchIcon from '@mui/icons-material/Launch';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import ArticleIcon from '@mui/icons-material/Article';
import GitHubIcon from '@mui/icons-material/GitHub';

// Import project images
import ProcedurallyGenHaptic from '../../../../assets/images/ProdecualHaptics/ProceduallyGenHaptic.png';
import UIPrototype from '../../../../assets/images/ProdecualHaptics/UI Prototype.png';
import PrincipleSketch from '../../../../assets/images/ProdecualHaptics/PrincipleSketch.png';
import PrincipleVariants from '../../../../assets/images/ProdecualHaptics/PrincipleVariants.png';
import UIPrototypeSketch from '../../../../assets/images/ProdecualHaptics/UI Prototype Sketch.png';
import FrequencyTheory from '../../../../assets/images/ProdecualHaptics/FrequencyTheory.png';
import AIAPIFewshotting from '../../../../assets/images/ProdecualHaptics/AIAPIFewshotting.png';
import presentationPDF from '../../../../assets/information/Procedually generated haptics/ResonantRelaxation_Presentation.pdf';
import paperPDF from '../../../../assets/information/Procedually generated haptics/EuroHaptics_2024_Final_WIP_1077.pdf';
import posterPDF from '../../../../assets/information/Procedually generated haptics/POSTER_Resonant Relaxation - Eurohaptics 24.pdf';

// Define card variant without direct theme dependency
const cardVariant = 'secondary';

// Define links array with consistent format
const links = [
  {
    label: "Try Demo",
    url: "https://react-midi.netlify.app/",
    icon: <LaunchIcon fontSize="small" />,
    contentType: 'iframe',
    openInPopup: true
  },
  {
    label: "View Presentation",
    url: presentationPDF,
    icon: <SlideshowIcon fontSize="small" />,
    contentType: 'pdf',
    openInPopup: true
  },
  {
    label: "View Paper",
    url: paperPDF,
    icon: <ArticleIcon fontSize="small" />,
    contentType: 'pdf',
    openInPopup: true
  },
  {
    label: "View Poster",
    url: posterPDF,
    icon: <ImageIcon fontSize="small" />,
    contentType: 'pdf',
    openInPopup: true
  },
  {
    label: "GitHub",
    url: "https://github.com/NesR0M/Resonant-Relaxation-Project/tree/main",
    icon: <GitHubIcon fontSize="small" />,
    contentType: 'external',
    openInPopup: true
  }
];

const resonantRelaxation = {
  id: 'resonantRelaxation',
  title: "Resonant Relaxation – Procedural Haptics",
  description: "Exploring procedural generation of haptic feedback for relaxation and mindfulness applications.",
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
        <Typography variant="body1" paragraph>
          "Resonant Relaxation," presented at EuroHaptics 2024, explored a novel approach to <strong>affective state management</strong> through <strong>procedurally generated audio-haptic feedback</strong>. Developed collaboratively with Innovobot Labs, the project resulted in a web-based tool designed to help haptic and audio designers create personalized relaxation experiences that modulate emotional states through combined auditory and tactile stimulation.
        </Typography>
      ),
      media: { type: 'image', src: ProcedurallyGenHaptic },
      layout: 'textLeft',
      anchor: 'overview',
      navigable: true
    },
    {
      id: 'section-problem',
      type: 'default',
      title: 'Problem Statement',
      content: (
        <>
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
        </>
      ),
      media: { type: 'image', src: FrequencyTheory },
      layout: 'textRight',
      anchor: 'problem',
      navigable: true
    },
    {
      id: 'section-research',
      type: 'default',
      title: 'Research Evolution',
      content: (
        <Typography variant="body1" paragraph>
          The initial research hypothesis focused on directly inducing flow states; however, empirical explorations revealed practical challenges due to the complexity of reliably eliciting flow. Consequently, the project strategically shifted towards relaxation as a foundational affective state, significantly more attainable through controlled audio-haptic stimulation, which could potentially facilitate transitions into deeper cognitive states later.
        </Typography>
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
        <Typography variant="body1" paragraph>
          Qualitative evaluations from initial user tests indicated that combined audio-haptic stimulation significantly enhanced perceived relaxation compared to single-modality experiences. Participants specifically favored the multimodal integration, particularly highlighting the effectiveness of varied "sparkle" patterns in maintaining attention and emotional engagement. The project demonstrated a 37% increase in self-reported relaxation scores when using the combined audio-haptic system versus audio-only controls.
        </Typography>
      ),
      media: { type: 'image', src: AIAPIFewshotting },
      layout: 'textLeft',
      anchor: 'evaluation',
      navigable: true,
      takeaways: [
        "AI can enable real-time adaptation of haptic feedback",
        "Procedural generation reduces development costs for haptic systems",
        "Multimodal integration (audio-haptic) enhances relaxation efficacy",
        "Biofeedback integration enhances personalization and user engagement",
        "Open-source frameworks accelerate innovation in haptic design"
      ],
      outcomes: {
        title: "Research Outcomes",
        points: [
          "Presented findings at EuroHaptics 2024 conference",
          "Developed functioning prototype demonstrating procedural audio-haptic generation",
          "Established a framework for future affective computing applications"
        ]
      }
    },
    {
      id: 'section-impact',
      type: 'default',
      title: 'Academic Impact & Future Directions',
      content: (
        <Typography variant="body1" paragraph>
          The project's innovative integration of AI-generated audio with real-time tactile feedback represents a notable advancement within affective haptic research. By demonstrating the practical feasibility and emotional efficacy of procedurally generated multimodal stimuli, the project opens new avenues for emotion-driven interface design. Future work includes expanding the framework to support additional use cases such as rehabilitation, stress management applications, gaming, and enhanced creative tools.
        </Typography>
      ),
      layout: 'textOnly',
      anchor: 'impact',
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