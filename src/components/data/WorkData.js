import theme from '../../theme';
// Update image imports to use proper folder structure
// Master Thesis
import AudioHaptics from '../../assets/images/Masterthesis/AudioHaptics.png';
import WorkshopRoomSetup from '../../assets/images/Masterthesis/Workshop_Room_Setup_defaced.jpg';
import PrototypingGroupB from '../../assets/images/Masterthesis/Prototyping_Group_B_defaced.jpg';
import PrototypingGroupC from '../../assets/images/Masterthesis/Prototyping_Group_C_defaced_2.jpeg';
import AP1 from '../../assets/images/Masterthesis/AP1.png';
import AP2_2 from '../../assets/images/Masterthesis/AP2_defaced_2.png';
import AP2_3 from '../../assets/images/Masterthesis/AP2_defaced_3.png';
import CircumplexModel from '../../assets/images/Masterthesis/Circumplex Model of Affect.png';
import BodyMaps from '../../assets/images/Masterthesis/Phase 2 - 2 Body maps.jpg';
import GuidingQuestions from '../../assets/images/Masterthesis/Guiding questions body maps.jpg';
import Phase2_1 from '../../assets/images/Masterthesis/Phase 2 - 1 Embodied Metaphor Elicitation and Emotional Object Sharing.jpg';
import Phase2 from '../../assets/images/Masterthesis/Phase 2 - Preperation of Templates, Documentation of the Object and Ideas and Sheets for the Prototyping Session.jpg';
import Phase3_1 from '../../assets/images/Masterthesis/Phase 3 - 1 Hapticlabs Hardware Kit Setup and Explanation.jpg';
import Phase3_3 from '../../assets/images/Masterthesis/Phase 3 - 3 Agenda Feedback and Prototyping Sessions.png';

// Resonant Relaxation
import ProcedurallyGenHaptic from '../../assets/images/ProdecualHaptics/ProceduallyGenHaptic.png';
import UIPrototype from '../../assets/images/ProdecualHaptics/UI Prototype.png';
import PrincipleSketch from '../../assets/images/ProdecualHaptics/PrincipleSketch.png';
import PrincipleVariants from '../../assets/images/ProdecualHaptics/PrincipleVariants.png';
import UIPrototypeSketch from '../../assets/images/ProdecualHaptics/UI Prototype Sketch.png';
import FrequencyTheory from '../../assets/images/ProdecualHaptics/FrequencyTheory.png';
import AIAPIFewshotting from '../../assets/images/ProdecualHaptics/AIAPIFewshotting.png';

// AMIAI
import AMIAI from '../../assets/images/AMIAI/AMIAI.svg';
import AMIAIIntro from '../../assets/images/AMIAI/Final Presentation amiai/Introduction.png';
import AMIAIColorPallete from '../../assets/images/AMIAI/Final Presentation amiai/colour pallete.png';
import AMIAIFonts from '../../assets/images/AMIAI/Final Presentation amiai/Fonts TODO.png';
import AMIAIWelcomePage from '../../assets/images/AMIAI/Final Presentation amiai/Welcome page (2).png';
import AMIAIrestposters from '../../assets/images/AMIAI/Final Presentation amiai/rest posters.png';
import SAMIAI from '../../assets/images/AMIAI/5samiai.mov';
import AMIAIScene from '../../assets/images/AMIAI/Scene.mp4';

// HackathonBG
import GreenWallet from '../../assets/images/GreenWallet/Greenwallet.png';
import CashlessPayment from '../../assets/images/GreenWallet/#4 Cashless Payment.png';
import GW1 from '../../assets/images/GreenWallet/1.png';
import GW2 from '../../assets/images/GreenWallet/2.png';
import GW3 from '../../assets/images/GreenWallet/3.png';
import GW4 from '../../assets/images/GreenWallet/4.png';
import GW5 from '../../assets/images/GreenWallet/5.png';
import GW6 from '../../assets/images/GreenWallet/6.png';
import Owner1 from '../../assets/images/GreenWallet/Owner 1.png';
import Owner2 from '../../assets/images/GreenWallet/Owner 2.png';
import Hackathon from '../../assets/images/GreenWallet/Hackathon.jpeg';
import HackathonBG from '../../assets/images/GreenWallet/HackathonBG.jpg';
import PrototypeUI from '../../assets/images/GreenWallet/Prototype UI.png';
import Highlightreel from '../../assets/images/GreenWallet/Highlightreel.mp4';
import Presentation from '../../assets/images/GreenWallet/Presentation.mp4';

// ADHDeer Design Thinking
import ADHDeer from '../../assets/images/ADHDeer/ADHDeer.png';

// Bachelor Thesis
import FTLevel2GIF from '../../assets/images/Bachelorthesis/FT Level 2 GIF.gif';
import PrototypeFlows from '../../assets/images/Bachelorthesis/3_prototype_flows_Figmabboard.png';
import Level1STUI from '../../assets/images/Bachelorthesis/Level 1 ST UI.png';
import Level2FTUI from '../../assets/images/Bachelorthesis/Level 2 FT UI.png';
import Level3FTUI from '../../assets/images/Bachelorthesis/Level 3 FT UI.png';
import Level2STUI from '../../assets/images/Bachelorthesis/Level 2 ST UI.png';
import Level3STUI from '../../assets/images/Bachelorthesis/Level 3 ST UI.png';
import Endscreen from '../../assets/images/Bachelorthesis/Endscreen.png';
import Routenuebersicht from '../../assets/images/Bachelorthesis/Routenuebersicht.PNG';

import Typography from '@mui/material/Typography';
import { analyzeImage } from '../../utils/imageAnalyzer';
import LaunchIcon from '@mui/icons-material/Launch';
import GitHubIcon from '@mui/icons-material/GitHub';
import ArticleIcon from '@mui/icons-material/Article';
import DesignIcon from '@mui/icons-material/DesignServices';

// Define a common card style using theme values for consistency
const cardStyle = {
  backgroundColor: theme.palette.card.background,
  boxShadow: `0 2px 8px ${theme.palette.card.shadow}`,
  color: theme.palette.text.primary,
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
};

// Process and enhance raw work data
const processWorkData = (rawData) => {
  return rawData.map(project => {
    // Process images array to identify videos
    const processedImages = project.images?.map(img => {
      // For strings, just return as is
      if (typeof img === 'string') return img;
      
      // For already processed objects, maintain their structure
      if (img && img.src) return img;
      
      // Video detection based on filename
      const fileStr = String(img);
      const isVideo = fileStr.endsWith('.mp4') || 
                      fileStr.endsWith('.mov') || 
                      fileStr.endsWith('.webm');
      
      return isVideo 
        ? { type: 'video', src: img } 
        : { type: 'image', src: img };
    }) || [];
    
    // Process media object
    const processedMedia = project.media 
      ? (project.media.type ? project.media : analyzeImage(project.media))
      : null;
    
    // Prioritize cover images (non-videos) for project cards
    const sortedImages = [...processedImages].sort((a, b) => {
      const aIsVideo = typeof a === 'object' && a.type === 'video';
      const bIsVideo = typeof b === 'object' && b.type === 'video';
      
      // Sort: images first, then videos
      return aIsVideo === bIsVideo ? 0 : aIsVideo ? 1 : -1;
    });
    
    return {
      ...project,
      images: sortedImages,
      media: processedMedia
    };
  });
};

const rawWorkData = [
  {
    id: 1,
    title: "Prototyping Emotions – Master Thesis",
    description: "Methodology for prototyping emotional haptic feedback using the Circumplex Model of Affect and body mapping.",
    categories: ["UX Research", "Interaction Design", "HCI Methodologies", "Haptic Design"],
    details: (
      <>
        <Typography variant="h3">Project Overview</Typography>
        <Typography variant="body1">
          This Master's thesis introduced a <strong>structured methodology</strong> for novice designers to prototype <strong>affective haptic feedback</strong>. The research explored how <strong>emotion-driven design</strong> can be integrated into UX workflows through <strong>tactile interaction design</strong>.
        </Typography>
        <Typography variant="h3">Problem Statement</Typography>
        <Typography variant="body1">
          The project aimed to address the <strong>lack of accessible methodologies</strong> for haptic design in UX. Key challenges included:
          <ul>
            <li><strong>Limited tools for emotion-to-haptic translation</strong></li>
            <li><strong>Difficulty in designing intuitive haptic feedback loops</strong></li>
            <li><strong>Absence of real-time iteration in haptic UX</strong></li>
          </ul>
        </Typography>
        <Typography variant="h3">Research Process</Typography>
        <Typography variant="body1">
          The study involved <strong>tandem prototyping</strong> sessions where participants iterated on <strong>haptic interactions</strong> using the <strong>Hapticlabs DevKit</strong>. The methodology included:
          <ul>
            <li><strong>Emotional Mapping</strong> – Using the Circumplex Model of Affect</li>
            <li><strong>Body Mapping</strong> – Identifying where emotions manifest physically</li>
            <li><strong>On-body Haptic Testing</strong> – Using iterative design to refine feedback</li>
          </ul>
        </Typography>
        <Typography variant="h3">Prototype Development</Typography>
        <Typography variant="body1">
          The prototyping process evolved through several stages:
          <ul>
            <li><strong>Initial Exploration</strong> – Mapping emotional qualities to haptic parameters</li>
            <li><strong>Iterative Testing</strong> – Refining patterns through user feedback</li>
            <li><strong>Validation Sessions</strong> – Evaluating emotional resonance of haptic patterns</li>
          </ul>
          This methodology bridges the gap between emotional theory and tangible design outputs.
        </Typography>
        <Typography variant="h3">Outcomes & Learnings</Typography>
        <Typography variant="body1">
          The toolkit successfully enabled designers to <strong>prototype emotional haptics</strong>, leading to its presentation at <strong>EuroHaptics 2024</strong>. Future work includes <strong>biofeedback integration</strong> for adaptive tactile experiences.
        </Typography>
      </>
    ),
    images: [
      AudioHaptics,
      WorkshopRoomSetup,
      PrototypingGroupB,
      PrototypingGroupC,
      AP1,
      AP2_2,
      AP2_3,
      CircumplexModel,
      BodyMaps,
      GuidingQuestions,
      Phase2_1,
      Phase2,
      Phase3_1,
      Phase3_3
    ],
    tools: ["Figma", "Miro", "Hapticlabs DevKit", "Hapticlabs Studio"],
    cardStyle,
    media: { type: 'image', src: AudioHaptics },
    featuredImages: {
      overview: WorkshopRoomSetup,
      problem: CircumplexModel, 
      solution: PrototypingGroupB,
      prototypeShowcase: [Phase2_1, Phase3_1, AP2_3]
    },
    links: [],
    keyTakeaways: [
      "Emotions can be systematically mapped to haptic parameters using the Circumplex Model of Affect",
      "Body mapping provides essential context for placing haptic actuators effectively",
      "Multi-sensory design creates more engaging and memorable user experiences",
      "Iterative testing revealed the importance of temporal patterns in emotional haptic feedback",
      "Cross-disciplinary collaboration significantly enriches the design process"
    ]
  },
  {
    id: 2,
    title: "Resonant Relaxation – AI-driven Audio-Haptic Web App",
    description: "Web-based stress relief combining AI sound synthesis with real-time haptic feedback.",
    categories: ["UX Research", "Prototyping", "Haptic Design", "AI Integration"],
    details: (
      <>
        <Typography variant="h3">Project Overview</Typography>
        <Typography variant="body1">
          <strong>Resonant Relaxation</strong> is a specialized web application that creates procedurally generated audio patterns
          aimed at inducing relaxation as a foundation for achieving flow states. Developed in collaboration with <strong>Daniel Shor from Innovobot Labs</strong>,
          it combines code-generated sine waves with AI-composed musical elements to deliver a unique audio-haptic experience.
        </Typography>
        
        <Typography variant="h3">Problem Statement</Typography>
        <Typography variant="body1">
          In our fast-paced modern world, many people struggle with stress, lack of concentration, and emotional imbalance.
          Traditional stress-relief applications typically focus only on <strong>visual and auditory cues</strong>, while
          <strong>haptic integration</strong> remains largely unexplored. Our research indicated that establishing flow states is more
          achievable from an initial <strong>state of relaxation</strong>, making this an important foundation for productivity tools.
        </Typography>
        
        <Typography variant="h3">Research Process</Typography>
        <Typography variant="body1">
          Our research and development involved:
          <ul>
            <li><strong>Haptic Frequency Analysis</strong> – Investigating optimal frequency ranges (25-60Hz) for pleasant tactile vibrations</li>
            <li><strong>User Testing</strong> – Evaluating different haptic embodiments (neck and back pillows) and their effectiveness</li>
            <li><strong>Musical Theory Adaptation</strong> – Applying consonance and dissonance principles from music to vibrotactile stimuli</li>
            <li><strong>Breathing Pattern Design</strong> – Creating audio patterns that gradually reduce breathing rate from 11 to 6 breaths per minute</li>
          </ul>
        </Typography>
        
        <Typography variant="h3">Technical Solution</Typography>
        <Typography variant="body1">
          The application architecture consists of two main components:
          <ul>
            <li>
              <strong>Baseline</strong> – A code-created amplitude-modulated sine tone that gradually decreases in frequency and tempo,
              creating a calming effect that reduces breathing rate
            </li>
            <li>
              <strong>Sparkles</strong> – AI-generated musical elements (using GPT-4 prompt engineering) that add texture and interest to the soundscape,
              available in three varieties: Chords, Ladders, and Twinkles
            </li>
          </ul>
          
          The web application includes features like:
          <ul>
            <li><strong>Customizable Parameters</strong> – Control over frequency, tempo, and duration</li>
            <li><strong>MIDI Import/Export</strong> – Support for uploading custom MIDI files and downloading compositions</li>
            <li><strong>Audio Effects</strong> – High/low-pass filters, reverb, and delay effects for richer sound design</li>
            <li><strong>Multiple Instrument Options</strong> – Implementation using both Tone.js and RNBO.js for versatile sound generation</li>
          </ul>
        </Typography>
        
        <Typography variant="h3">Prototype Development</Typography>
        <Typography variant="body1">
          The development process included several prototyping stages:
          <ul>
            <li><strong>Initial UI Sketches</strong> – Exploring interaction models and controls</li>
            <li><strong>Audio Principle Tests</strong> – Testing different auditory patterns for relaxation efficacy</li>
            <li><strong>API Integration</strong> – Building the AI generation component with the ChatGPT API</li>
          </ul>
          Each iteration was tested for both technical performance and relaxation effectiveness.
        </Typography>
        
        <Typography variant="h3">Outcomes & Impact</Typography>
        <Typography variant="body1">
          The project evolved from a general relaxation app to a specialized tool for haptic designers and audio professionals,
          providing a platform for procedurally generated audio-haptic experiences. Our user testing validated the relaxation-inducing
          effects of the baseline patterns, while the AI-generated sparkles added a layer of complexity and interest.
          The project demonstrates the potential of combining AI with audio-haptic design for emotional well-being applications.
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
    tools: ["React", "ChatGPT API", "Tone.js", "RNBO.js", "Haptic Actuators"],
    cardStyle,
    media: { type: 'image', src: ProcedurallyGenHaptic },
    featuredImages: {
      overview: UIPrototype,
      problem: FrequencyTheory,
      solution: PrincipleSketch,
      prototypeShowcase: [UIPrototypeSketch, PrincipleVariants, AIAPIFewshotting]
    },
    links: [
      {
        label: "Live Demo",
        url: "https://react-midi.netlify.app/",
        icon: <LaunchIcon fontSize="small" sx={{ ml: 0.5 }} />
      },
      {
        label: "GitHub",
        url: "https://github.com/NesR0M/Industry_Project",
        icon: <GitHubIcon fontSize="small" sx={{ ml: 0.5 }} />
      },
      {
        label: "Research Paper",
        url: "https://zenodo.org/records/12549152",
        icon: <ArticleIcon fontSize="small" sx={{ ml: 0.5 }} />
      }
    ],
    specialNote: "This project was published as a Work-in-Progress paper at CHI 2024.",
    keyTakeaways: [
      "AI integration requires careful balance between automation and meaningful user control",
      "Multi-sensory feedback enhances relaxation effects compared to audio-only solutions",
      "Procedural generation creates more engaging experiences than pre-recorded content",
      "API-driven architecture enables more flexible and adaptable sound generation",
      "Cross-modal sensory design principles can be applied to haptic-audio interfaces"
    ]
  },
  {
    id: 3,
    title: "AMIAI – Visual Campaign for AI Awareness",
    description: "Critical design campaign exploring AI-generated media credibility using pixelation metaphors.",
    categories: ["Graphic Design"],
    details: (
      <>
        <Typography variant="h3">Project Overview</Typography>
        <Typography variant="body1">
          <strong>AMIAI</strong> is a <strong>critical design campaign</strong> exploring how <strong>AI-generated content affects media credibility</strong>. 
          The campaign uses <strong>pixelation metaphors</strong> to highlight <strong>digital distortion</strong> in AI-generated media.
        </Typography>
        <Typography variant="h3">Problem Statement</Typography>
        <Typography variant="body1">
          As <strong>AI-generated media</strong> grows, questions of <strong>credibility and authenticity</strong> become more relevant. <strong>AMIAI</strong> 
          aims to raise awareness and <strong>prompt critical thinking</strong> about <strong>digital trustworthiness</strong>.
        </Typography>
        <Typography variant="h3">Research Process</Typography>
        <Typography variant="body1">
          The research involved:
          <ul>
            <li><strong>Analyzing how digital distortions impact media credibility</strong></li>
            <li><strong>Exploring the psychological effects of pixelation on trust</strong></li>
            <li><strong>Using motion graphics to enhance AI literacy</strong></li>
          </ul>
        </Typography>
        <Typography variant="h3">Prototype Development</Typography>
        <Typography variant="body1">
          The design process included:
          <ul>
            <li><strong>Brand Identity Development</strong> – Creating a visual language using pixelation</li>
            <li><strong>Motion Graphics Prototyping</strong> – Testing animations that convey AI intervention</li>
            <li><strong>Exhibition Design</strong> – Crafting immersive spaces that demonstrate AI distortion</li>
          </ul>
        </Typography>
        <Typography variant="h3">Solution</Typography>
        <Typography variant="body1">
          <ul>
            <li><strong>Pixelation-based branding system</strong> for AI-generated vs. human-created content</li>
            <li><strong>Interactive distortion effects</strong> exploring credibility perception</li>
            <li><strong>Motion graphics animations</strong> simulating AI interference in media</li>
          </ul>
        </Typography>
        <Typography variant="h3">Outcomes & Learnings</Typography>
        <Typography variant="body1">
          The campaign <strong>sparked discussions on AI's role in media trust</strong>. Future iterations could involve <strong>interactive web applications</strong>.
        </Typography>
      </>
    ),
    images: [
      AMIAI,
      AMIAIIntro,
      AMIAIColorPallete,
      AMIAIFonts,
      AMIAIWelcomePage,
      AMIAIrestposters,
      { type: 'video', src: SAMIAI },
      { type: 'video', src: AMIAIScene }
    ],
    tools: ["Figma", "Adobe Photoshop", "Adobe Illustrator"],
    cardStyle,
    media: { type: 'image', src: AMIAI },
    featuredImages: {
      overview: AMIAIIntro,
      problem: AMIAIColorPallete,
      solution: AMIAIWelcomePage,
      prototypeShowcase: [AMIAIFonts, AMIAIrestposters, AMIAI]
    },
    links: [],
    keyTakeaways: [
      "Visual communication can effectively raise awareness about complex technological issues",
      "Pixelation as a visual metaphor creates tangible representations of abstract AI concepts",
      "Critical design projects can generate meaningful dialogue about technology ethics",
      "Motion graphics can communicate technical concepts in accessible ways",
      "Design interventions can help improve digital media literacy"
    ]
  },
  {
    id: 4,
    title: "Green Wallet – TTF Hackathon (MasterCard Challenge)",
    description: "Gamified financial app promoting cashless payments in local tourist markets.",
    categories: ["UX Research", "Prototyping", "UX Gamification"],
    details: (
      <>
        <Typography variant="h3">Project Overview</Typography>
        <Typography variant="body1">
          Green Wallet was a <strong>UX-driven financial application</strong> designed as part of the <strong>Tourism Technology Festival Hackathon 2022</strong>. 
          The challenge, set by MasterCard, focused on <strong>increasing cashless payments in local tourist markets</strong> through an engaging and 
          <strong>gamified user experience</strong>.
        </Typography>
        <Typography variant="h3">Problem Statement</Typography>
        <Typography variant="body1">
          Many <strong>small vendors in tourist hotspots</strong> hesitate to accept cashless payments due to high transaction fees and lack of incentives. 
          Tourists, however, increasingly prefer digital payments for convenience and security.  
          The core issues identified:
          <ul>
            <li><strong>Low adoption of contactless payments in local markets</strong></li>
            <li><strong>Sustainability initiatives often lack digital integration in tourism</strong></li>
            <li><strong>Gamification elements could enhance engagement but were underutilized in fintech UX</strong></li>
          </ul>
        </Typography>
        <Typography variant="h3">Research & Design Process</Typography>
        <Typography variant="body1">
          The project was built <strong>under a 24-hour rapid prototyping framework</strong> using UX research and usability testing to validate 
          our concept. Key steps included:
          <ul>
            <li><strong>On-site vendor interviews</strong> – Understanding pain points for business owners</li>
            <li><strong>User research with tourists</strong> – Identifying motivations and friction points in payment behavior</li>
            <li><strong>Iterative prototyping in Figma</strong> – Creating a mobile-first, intuitive UI</li>
            <li><strong>Pitching to judges</strong> – Highlighting the business case and user adoption strategy</li>
          </ul>
        </Typography>
        <Typography variant="h3">Prototype Development</Typography>
        <Typography variant="body1">
          In this quick-paced hackathon environment, our team rapidly developed:
          <ul>
            <li><strong>User Journey Maps</strong> – Documenting the complete cashless payment experience</li>
            <li><strong>Wireframes & UI Flows</strong> – Creating a coherent navigation and information architecture</li>
            <li><strong>Interactive Prototype</strong> – Building a clickable demo for presentation and user testing</li>
          </ul>
        </Typography>
        <Typography variant="h3">Solution</Typography>
        <Typography variant="body1">
          The final prototype featured:
          <ul>
            <li><strong>Gamified eco-rewards system</strong> – Users earn green points for choosing sustainable vendors</li>
            <li><strong>Merchant dashboard</strong> – Providing analytics on eco-conscious customers</li>
            <li><strong>Integrated MasterCard APIs</strong> – Secure, frictionless payment integration</li>
          </ul>
        </Typography>
        <Typography variant="h3">Outcomes & Learnings</Typography>
        <Typography variant="body1">
          <strong>1st Place Winner – Stream 1 at the TTF Hackathon</strong> <br />
          <strong>Designed a functional prototype within 24 hours</strong> <br />
          <strong>Demonstrated financial UX meets sustainability gamification</strong> as a viable fintech strategy.
        </Typography>
      </>
    ),
    images: [
      GreenWallet, 
      CashlessPayment, 
      GW1, 
      GW2,
      GW3,
      GW4,
      GW5,
      GW6,
      Owner1,
      Owner2,
      Hackathon,
      HackathonBG,
      PrototypeUI,
      { type: 'video', src: Highlightreel },  
      { type: 'video', src: Presentation }
    ],
    tools: ["Figma", "Adobe Illustrator", "MasterCard API"],
    cardStyle,
    media: { type: 'image', src: GreenWallet },
    featuredImages: {
      overview: GreenWallet,
      problem: HackathonBG,
      solution: CashlessPayment,
      prototypeShowcase: [GW1, GW3, GW5]
    },
    links: [],
    specialNote: "1st Place Winner at the Tourism Technology Festival Hackathon 2022 - MasterCard Challenge",
    keyTakeaways: [
      "Rapid prototyping can lead to innovative solutions even under tight time constraints",
      "Gamification provides powerful incentives for behavior change in financial applications",
      "Sustainability-focused features can enhance user engagement in payment systems",
      "Cross-functional teams are essential for addressing complex challenges in short timeframes",
      "User-centered design principles remain effective even in accelerated development cycles"
    ]
  },
  {
    id: 5,
    title: "ADHDeer – Self-Tracking App for ADHD Youth",
    description: "Mobile app supporting ADHD youth in self-management and emotional regulation.",
    categories: ["UX Research", "Prototyping", "Mental Health UX"],
    details: (
      <>
        <Typography variant="h3">Project Overview</Typography>
        <Typography variant="body1">
          <strong>ADHDeer</strong> is a UX-driven mobile app designed to support young adults with <strong>ADHD</strong> in <strong>self-management, emotional regulation, and daily structuring</strong>. The project was part of a <strong>Design Thinking course at FH Salzburg</strong>, aimed at bridging the gap between <strong>ADHD awareness, self-assessment, and mental health support</strong> through a <strong>gamified</strong> and <strong>intuitive UX approach</strong>.
        </Typography>
        <Typography variant="h3">Problem Statement</Typography>
        <Typography variant="body1">
          Many young adults with ADHD struggle with:
          <ul>
            <li><strong>Time blindness</strong> – Difficulty perceiving time and sticking to routines</li>
            <li><strong>Emotional dysregulation</strong> – Struggles with mood swings and motivation</li>
            <li><strong>Task structuring</strong> – Lack of executive function support in daily life</li>
          </ul>
          Existing solutions felt <strong>clinical, uninspiring, and lacked personalization</strong>.
        </Typography>
        <Typography variant="h3">Research Process</Typography>
        <Typography variant="body1">
          The research involved:
          <ul>
            <li><strong>Interviews</strong> with ADHD individuals, parents, and specialists</li>
            <li><strong>Competitive Analysis</strong> – Reviewing ADHD tracking tools</li>
            <li><strong>Usability testing</strong> – Evaluating engagement levels</li>
          </ul>
        </Typography>
        <Typography variant="h3">Solution</Typography>
        <Typography variant="body1">
          The <strong>Figma prototype</strong> included:
          <ul>
            <li><strong>Personalized ADHD self-assessment</strong> for customized habit-building</li>
            <li><strong>Gamified daily planner</strong> with <strong>adaptive reminders and nudging</strong></li>
            <li><strong>Mood & focus tracking</strong> for self-reflection</li>
          </ul>
        </Typography>
        <Typography variant="h3">Outcomes & Learnings</Typography>
        <Typography variant="body1">
          <strong>Positive User Feedback</strong> – ADHD users found it engaging and intuitive  <br />
          <strong>Potential for future AI-powered habit-building features</strong>
        </Typography>
      </>
    ),
    images: [ADHDeer],
    tools: ["Figma", "Miro", "Adobe Illustrator"],
    cardStyle,
    media: { type: 'image', src: ADHDeer },
    links: [
      {
        label: "Figma Prototype",
        url: "https://www.figma.com/proto/XJZe9gLj6NkgA05QERnsmD/ADHDeer---Group?embed_host=share&kind=proto&node-id=366-2559&page-id=0%3A1&scaling=scale-down&starting-point-node-id=295%3A1328&type=design&viewport=347%2C376%2C0.05",
        icon: <DesignIcon fontSize="small" sx={{ ml: 0.5 }} />
      }
    ],
    specialNote: "Try the interactive prototype to experience the complete user flow designed for ADHD youth.",
    hasPrototypeEmbed: true,
    prototypeEmbedUrl: "https://embed.figma.com/proto/XJZe9gLj6NkgA05QERnsmD/ADHDeer---Group?embed_host=share&kind=proto&node-id=366-2559&page-id=0%3A1&scaling=scale-down&starting-point-node-id=295%3A1328&type=design&viewport=347%2C376%2C0.05&embed-host=share"
  },
  {
    id: 6,
    title: "Phone-based Intervention in Self-driving Cars – Bachelor Thesis",
    description: "Mobile interface for trust and decision-making in autonomous vehicle rerouting scenarios.",
    categories: ["UX Research", "Interaction Design", "Automotive UX"],
    details: (
      <>
        <Typography variant="h3">Project Overview</Typography>
        <Typography variant="body1">
          This <strong>Bachelor thesis</strong> investigated <strong>trust and decision-making in autonomous vehicles</strong> by designing a mobile interface 
          that helps users <strong>intervene in critical rerouting scenarios</strong>. The project tested <strong>how different UI information densities</strong> 
          affect passenger <strong>trust in self-driving car decisions</strong>.
        </Typography>
        <Typography variant="h3">Problem Statement</Typography>
        <Typography variant="body1">
          Fully autonomous vehicles still face trust issues, particularly when the <strong>system overrides user expectations</strong>.
          The main research questions were:
          <ul>
            <li><strong>How much information do users need to trust AI-based rerouting decisions?</strong></li>
            <li><strong>How should mobile interfaces communicate uncertainty in AV routing?</strong></li>
            <li><strong>Does time pressure affect user decision-making in self-driving scenarios?</strong></li>
          </ul>
        </Typography>
        <Typography variant="h3">Research Process</Typography>
        <Typography variant="body1">
          <ul>
            <li><strong>User Study (30 participants)</strong> – Simulating AV decision-making scenarios</li>
            <li><strong>3 UI Variants Tested</strong> – Minimal, Standard, and Detailed interface designs</li>
            <li><strong>2 Time Pressure Conditions</strong> – Fast (3 seconds) vs. Slow (15 seconds) decision-making</li>
            <li><strong>Quantitative Data Analysis</strong> – Measuring trust levels via SUS (System Usability Scale)</li>
          </ul>
        </Typography>
        <Typography variant="h3">Prototype Development</Typography>
        <Typography variant="body1">
          The design process included:
          <ul>
            <li><strong>Information Architecture</strong> – Determining critical vs. supplementary route information</li>
            <li><strong>Interface Variants</strong> – Creating three versions with increasing information density</li>
            <li><strong>Interactive Prototype</strong> – Building a functional simulation for user testing</li>
          </ul>
        </Typography>
        <Typography variant="h3">Solution</Typography>
        <Typography variant="body1">
          The study tested <strong>three mobile interface prototypes</strong> designed in <strong>Figma</strong>, each offering a different level of transparency in 
          AV rerouting decisions.
        </Typography>
        <Typography variant="h3">Outcomes & Learnings</Typography>
        <Typography variant="body1">
          <strong>Results:</strong> <strong>Simpler UI designs</strong> led to greater <strong>trust and usability</strong> (SUS Score: <strong>75.38 – Good usability rating</strong>)  <br />
          <strong>Validated that less cognitive load leads to better user confidence in AV decisions</strong>  <br />
          <strong>This research provided key insights for future trust-centered autonomous vehicle interfaces</strong>.
        </Typography>
      </>
    ),
    images: [
      FTLevel2GIF,
      PrototypeFlows,
      Level1STUI,
      Level2FTUI,
      Level3FTUI,
      Level2STUI,
      Level3STUI,
      Endscreen,
      Routenuebersicht
    ],
    tools: ["Figma", "Miro", "Notion"],
    cardStyle,
    media: { type: 'image', src: FTLevel2GIF },
    featuredImages: {
      overview: FTLevel2GIF,
      problem: PrototypeFlows,
      solution: Level2FTUI,
      prototypeShowcase: [Level1STUI, Level2STUI, Level3STUI]
    },
    links: [],
    keyTakeaways: [
      "Simplicity in UI design increases trust in autonomous systems",
      "Time pressure significantly impacts user decision-making in critical scenarios",
      "Information density should be carefully balanced in safety-critical interfaces",
      "Users prefer transparent but concise explanations for AI decisions",
      "Mobile interfaces play a crucial role in human-autonomous vehicle interaction"
    ]
  }
];

// Add this export for skill tags used across the portfolio
export const skillTags = [
  'UX Research', 'Interaction Design', 'Prototyping', 'UI Design',
  'Haptic Design', 'Sound Design', 'AI Integration', 'Frontend Development',
  'UX Gamification', 'HCI Methodologies', 'Mental Health UX', 'Automotive UX', 
  'Graphic Design'
];

// Export the processed data
export const workData = processWorkData(rawWorkData);

export default workData;