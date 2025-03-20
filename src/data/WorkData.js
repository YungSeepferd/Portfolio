import theme from '../theme';
import heroBG from '../assets/css/images/Haptics.png';
import HapticsBG from '../assets/css/images/ProceduallyGenHaptic.png';
import AMIAIBG from '../assets/css/images/AMIAI.svg';
import HackathonBG from '../assets/css/images/Hackathon.png';
import BachelorBG from '../assets/css/images/FT Level 2 GIF.gif';
import ADHDeer from '../assets/css/images/ADHDeer.png';

// Define a common card style using theme values for consistency
const cardStyle = {
  backgroundColor: theme.palette.card.background,
  boxShadow: `0 2px 8px ${theme.palette.card.shadow}`,
  color: theme.palette.text.primary,
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
};

export const workData = [
  {
    id: 1,
    title: "Prototyping Emotions - Master Thesis",
    categories: [
      "UX Research",
      "Interaction Design",
      "HCI Methodologies",
      "Haptic Design",
    ],
    details: `
Project Overview:
In my Master Thesis at FH Salzburg, I designed and evaluated a modular methodological toolkit for novice designers to create affective haptic feedback systems. The goal was to address the lack of accessible resources for translating emotional intent into tactile experiences. The project combined third-wave HCI principles with affective haptics, focusing on emotional articulation, embodied metaphors, and iterative prototyping.

Problem Statement:
Many novice designers face technical challenges when prototyping emotional and affective haptic feedback, leading to limited accessibility and creativity.

Research Foundation:
The thesis is grounded in research from multiple waves of HCI, affective computing, wearable technology, and emotional design. Key models included:
  • The Circumplex Model of Affect for emotional mapping.
  • The Emotion Typology from Delft Institute of Positive Design.
  • Insights from emerging affective haptics literature.

Methodology and Toolkit Design:
Employed a tandem design workshop structure where participants alternated roles. The toolkit incorporated:
  • Embodied Metaphor Elicitation – associating personal emotional objects with haptic sensations.
  • Body Mapping – visualizing emotional areas to guide actuator placements.
  • Tandem On-body Prototyping – using low-fidelity materials and Hapticlabs DevKit actuators.
  • Real-time Iteration – collaborative testing and refinement of prototypes.

Study Design:
Conducted with 6 participants in 3 tandem groups over approximately 4 hours divided into phases: Emotional Framework, Body Mapping & Metaphors, Prototyping, and Reflection.

Key Findings:
The integration of emotional models enhanced participants’ prototyping capabilities, though technical constraints and subjective interpretation posed challenges.

Outcomes:
Delivered a comprehensive toolkit and design insights, contributing to a work-in-progress paper presented at Interhaptics Conference 2024.

Future Work:
Plan to expand the toolkit with diverse actuators, perform longitudinal studies, and incorporate biofeedback loops.
    `,
    images: [heroBG, HapticsBG],
    tools: ["Figma", "Adobe XD"],
    cardStyle,
    media: { type: 'image', src: heroBG }
  },
  {
    id: 2,
    title: "Resonant Relaxation – AI-driven Audio-haptic Design",
    categories: [
      "UX Research",
      "Prototyping",
      "Haptic Design",
      "AI LLMs"
    ],
    details: `
Project Overview:
In collaboration with Innovobot Labs and FH Salzburg, this project developed a React-based web application that generates personalized audio-haptic feedback to induce relaxation and counteract stress from sedentary lifestyles.

Research Context:
Inspired by biofeedback, haptics, and affective computing studies, the project explored how generative AI could assist designers in crafting haptic experiences that promote emotional well-being.

Methodology and System Design:
  • Developed the application using React and Tone.js.
  • Integrated AI-generated MIDI compositions via ChatGPT API to add dynamic “sparkle” elements onto a calming baseline.
  • Designed amplitude-modulated sine tones to guide slower, relaxed breathing.
  • Enabled designers to adjust parameters like tempo reduction and sparkle density.

Prototyping and User Testing:
An early prototype connected voice coil actuators with AI-driven audio patterns. A preliminary user study (n=3) reported enhanced calmness and preference for the dynamic haptic effects.

Outcomes:
Demonstrated the potential of AI-driven procedural audio-haptics to modulate affective states and published findings at the EuroHaptics Conference 2024.

Future Work:
Planned enhancements include deeper integration with advanced haptic synthesis tools, larger-scale user studies, and exploration of localized LLM solutions.

Acknowledgments:
Special thanks to Innovobot Labs, FH Salzburg, and the project supervisors.
    `,
    images: [HapticsBG],
    tools: ["React", "ChatGPT API", "Tone.js"],
    cardStyle,
    media: { type: 'image', src: HapticsBG }
  },
  {
    id: 3,
    title: "AMIAI",
    categories: [
      "Graphic Design"
    ],
    details: `
Project Overview:
AMIAI is a graphic design campaign centered on a visual exploration of AI-generated content and its influence on credibility. The project creatively tackles the transformation from analogue to digital through a distinctive pixelation effect.

Key Design Element:
The pixelation effect—capturing the moment a photo converts analogue imagery into digital—serves as the campaign’s signature visual.

Outcomes and Future Directions:
Developed a comprehensive design concept with guiding rules applied systematically to challenge viewers about autonomy under digital influence. The project lays groundwork for future explorations in graphic and interactive design.
    `,
    images: [AMIAIBG],
    tools: ["Figma", "Adobe Photoshop", "Adobe Illustrator"],
    cardStyle,
    media: { type: 'image', src: AMIAIBG }
  },
  {
    id: 4,
    title: "Master Card's Green Wallet - TTF 2023 Hackathon",
    categories: [
      "UX Research",
      "Prototyping"
    ],
    details: `
Project Overview:
At the Tourism Technology Festival 2022, our team developed the "Green Wallet" concept to revolutionize cashless payment solutions in the gastronomy sector through gamification and user-centered design.

Research and Analysis:
Semi-structured interviews with vendors uncovered challenges such as security risks, high fees, and inconsistent adoption rates, while also highlighting benefits like automated accounting and revenue growth.

Design and Prototyping:
Developed detailed Figma prototypes for both shop owner and customer interfaces that featured clear, actionable insights and gamified elements to encourage adoption.

Outcomes and Reflections:
The project was awarded 1st place in its stream, validating our innovative approach and underscoring the importance of rapid prototyping and interdisciplinary teamwork.
    `,
    images: [HackathonBG],
    tools: ["Figma", "Adobe XD"],
    cardStyle,
    media: { type: 'image', src: HackathonBG }
  },
  {
    id: 5,
    title: "Phone-based Intervention in Self-driving Cars – Bachelor Thesis",
    categories: [
      "UX Research",
      "UI Design",
      "Prototyping",
      "UX Testing"
    ],
    details: `
Description:
A Bachelor thesis at LMU Munich focused on designing a mobile UI that enables rear-seat passengers in autonomous vehicles (AVs) to intervene during critical route selection moments, thereby addressing trust and usability challenges in high-stress scenarios.

Project Overview:
Investigated how mobile interfaces affect trust and decision-making in AV contexts, particularly during real-time rerouting.

Research Context:
  • Explored cooperative driving systems and interventions in SAE Level 4/5 scenarios.
  • Aimed to improve trust between passengers and autonomous systems through targeted UI design.

Design and Prototyping:
  • Created three mobile UI prototypes in Figma with varying information densities (minimal, balanced, and information-rich).
  • Integrated a map-based interface featuring live route suggestions, shop recommendations, and an AR traffic overlay.
  • Addressed decision-making complexity across different user scenarios.

Study Design and Key Results:
Conducted a remote study (n=30) comparing fast vs. slow decision-making. Results indicated that simpler interfaces achieved higher trust under time pressure, with a SUS score of 75.38.

Outcomes:
Provided actionable UX insights for enhancing cooperative passenger interfaces and set the stage for future improvements, such as voice assistance.
    `,
    images: [BachelorBG],
    tools: ["Figma", "Sketch", "Zoom", "Figma Mirror", "Google Forms"],
    cardStyle,
    media: { type: 'image', src: BachelorBG }
  },
  {
    id: 6,
    title: "ADHDeer",
    categories: [
      "UX Research",
      "Prototyping",
      "UI Design"
    ],
    details: `
Project Overview:
ADHDeer is aimed at assisting young adults with ADHD and their families in managing everyday challenges. Developed during a Design Thinking course at FH Salzburg, the project draws upon personal experience and interdisciplinary collaboration.

Research and Empathy:
Interviews with educators, children, and ADHD experts, along with insights from online communities, underscored the need for an intuitive and supportive self-tracking solution.

Design Process and Prototyping:
A team of UX/UI designers and HCI researchers collaborated on the project, following phases of Inspiration, Empathize, and Define. The resulting prototype features playful UI components, gamified tracking elements, and progress visualization tools.

Outcomes and Future Directions:
Initial pilot testing showed promising engagement. Comprehensive documentation of our design journey (via online collaboration tools) supports future refinements to maximize the project’s impact.
    `,
    images: [ADHDeer],
    tools: ["Figma", "Miro"],
    cardStyle,
    media: { type: 'image', src: ADHDeer }
  }
];

export default workData;
