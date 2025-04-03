import theme from '../../theme';
// Update image imports to use proper folder structure
// Master Thesis
import WorkshopRoomSetup from '../../assets/images/Masterthesis/Workshop_Room_Setup_defaced.jpg';
import PrototypingGroupB from '../../assets/images/Masterthesis/Prototyping_Group_B_defaced.jpg';
import PrototypingGroupC from '../../assets/images/Masterthesis/Prototyping_Group_C_defaced_2.jpeg';
import AP1 from '../../assets/images/Masterthesis/AP1.png';
import AP2_2 from '../../assets/images/Masterthesis/AP2_defaced_2.png';
import AP2_3 from '../../assets/images/Masterthesis/AP2_defaced_3.png';
import CircumplexModel from '../../assets/images/Masterthesis/Circumplex Model of Affect.png';
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

// Define common card styles for each project with unique theme values
const masterThesisStyle = {
  backgroundColor: theme.palette.card.background,
  boxShadow: `0 3px 10px ${theme.palette.primary.dark}22`,
  color: theme.palette.text.primary,
  padding: theme.spacing(2.5),
  borderRadius: theme.shape.borderRadius,
  borderLeft: `4px solid ${theme.palette.primary.main}`,
};

const resonantRelaxationStyle = {
  backgroundColor: theme.palette.card.background,
  boxShadow: `0 3px 10px ${theme.palette.secondary.dark}22`,
  color: theme.palette.text.primary,
  padding: theme.spacing(2.5),
  borderRadius: theme.shape.borderRadius,
  borderLeft: `4px solid ${theme.palette.secondary.main}`,
};

const amiaiStyle = {
  backgroundColor: theme.palette.card.background,
  boxShadow: `0 3px 10px ${theme.palette.error.dark}22`,
  color: theme.palette.text.primary,
  padding: theme.spacing(2.5),
  borderRadius: theme.shape.borderRadius,
  borderLeft: `4px solid ${theme.palette.error.main}`,
};

const greenWalletStyle = {
  backgroundColor: theme.palette.card.background,
  boxShadow: `0 3px 10px ${theme.palette.success.dark}22`,
  color: theme.palette.text.primary,
  padding: theme.spacing(2.5),
  borderRadius: theme.shape.borderRadius,
  borderLeft: `4px solid ${theme.palette.success.main}`,
};

const adhdeerStyle = {
  backgroundColor: theme.palette.card.background,
  boxShadow: `0 3px 10px ${theme.palette.warning.dark}22`,
  color: theme.palette.text.primary,
  padding: theme.spacing(2.5),
  borderRadius: theme.shape.borderRadius,
  borderLeft: `4px solid ${theme.palette.warning.main}`,
};

const bachelorThesisStyle = {
  backgroundColor: theme.palette.card.background,
  boxShadow: `0 3px 10px ${theme.palette.info.dark}22`,
  color: theme.palette.text.primary,
  padding: theme.spacing(2.5),
  borderRadius: theme.shape.borderRadius,
  borderLeft: `4px solid ${theme.palette.info.main}`,
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
  // Project 1: Master Thesis
  {
    id: 1,
    title: "Prototyping Emotions – Master Thesis",
    description: "A structured methodology for prototyping emotional haptic feedback using the Circumplex Model of Affect.",
    categories: ["UX Research", "Interaction Design", "HCI Methodologies", "Haptic Design"],
    layoutType: "image-heavy",
    details: (
      <>
        <Typography variant="h3">Overview</Typography>
        <Typography variant="body1" paragraph>
          This Master's thesis introduced a <strong>structured methodological toolkit</strong> designed to assist novice designers in crafting <strong>emotionally resonant haptic feedback systems</strong>. The research explored how <strong>emotion-driven design</strong> can be integrated into UX workflows through <strong>tactile interaction design</strong>, addressing the critical gap between theoretical emotional concepts and practical haptic design.
        </Typography>
        
        <Typography variant="h3">Problem Statement</Typography>
        <Typography variant="body1" paragraph>
          Despite advancements in affective computing, novice interaction designers frequently encounter significant difficulties in effectively translating abstract emotions into tangible tactile experiences. Key challenges included:
          <ul>
            <li><strong>Technical complexity</strong> of existing haptic prototyping tools</li>
            <li><strong>Lack of structured emotional frameworks</strong> suitable for tactile interaction design</li>
            <li><strong>Limited resources</strong> that integrate emotion theory into iterative prototyping practices</li>
          </ul>
        </Typography>
        
        <Typography variant="h3">Methodological Approach</Typography>
        <Typography variant="body1" paragraph>
          The toolkit was validated through a structured workshop consisting of clearly delineated phases:
          <ol>
            <li><strong>Emotional Framework Introduction:</strong> Participants engaged with the Circumplex Model of Affect and Delft's Emotion Typology</li>
            <li><strong>Embodied Metaphor Elicitation and Body Mapping:</strong> Utilizing emotional objects and detailed body maps to identify emotional hotspots for actuator placement</li>
            <li><strong>Tandem On-body Prototyping:</strong> Collaborative sessions with the Hapticlabs DevKit where participants alternated roles between designer and tester</li>
            <li><strong>Reflective Feedback:</strong> Surveys and group discussions to evaluate emotional resonance and effectiveness</li>
          </ol>
        </Typography>
        
        <Typography variant="h3">Toolkit Components</Typography>
        <Typography variant="body1" paragraph>
          The final methodological toolkit included:
          <ul>
            <li><strong>Visual Templates:</strong> For embodied metaphor elicitation and emotion categorization</li>
            <li><strong>Physical Prototyping Resources:</strong> The Hapticlabs DevKit with actuators (ERM, LRA, VC) and tactile materials</li>
            <li><strong>Interactive Digital Workspace:</strong> Miro boards enhancing documentation and collaboration</li>
          </ul>
        </Typography>
        
        <Typography variant="h3">Outcomes & Key Findings</Typography>
        <Typography variant="body1" paragraph>
          The research demonstrated that:
          <ul>
            <li>Participants successfully translated abstract emotional concepts into tangible, emotionally resonant haptic feedback</li>
            <li>Tandem prototyping significantly enhanced collaboration and iterative quality</li>
            <li>The toolkit successfully democratized affective haptic design within educational contexts</li>
          </ul>
        </Typography>
      </>
    ),
    images: [
      WorkshopRoomSetup,
      PrototypingGroupB,
      PrototypingGroupC,
      AP1,
      AP2_2,
      AP2_3,
      CircumplexModel,
      Phase2_1,
      Phase2,
      Phase3_1,
      Phase3_3
    ],
    tools: ["Figma", "Miro", "Hapticlabs DevKit", "Hapticlabs Studio"],
    cardStyle: masterThesisStyle,
    media: { type: 'image', src: WorkshopRoomSetup }, 
    featuredImages: {
      overview: Phase2,
      problem: CircumplexModel, 
      solution: PrototypingGroupB,
      prototypeShowcase: [PrototypingGroupB, PrototypingGroupC, AP1]
    },
    links: [
      {
        label: "Read Paper",
        url: "https://www.eurohaptics.org/2024/",
        icon: <ArticleIcon fontSize="small" sx={{ ml: 0.5 }} />
      }
    ],
    keyTakeaways: [
      "Emotions can be systematically mapped to haptic parameters using the Circumplex Model of Affect",
      "Body mapping provides essential context for placing haptic actuators effectively",
      "Tandem prototyping creates more engaging and emotionally meaningful experiences",
      "Iterative testing revealed the importance of temporal patterns in emotional haptic feedback",
      "Cross-disciplinary collaboration significantly enriches the design process"
    ]
  },
  
  // Project 2: Resonant Relaxation
  {
    id: 2,
    title: "Resonant Relaxation – Procedural Haptics",
    description: "Exploring procedural generation of haptic feedback for relaxation and mindfulness applications.",
    categories: ["Haptic Design", "AI Integration", "UX Research", "Sound Design"],
    layoutType: "video-focused",
    details: (
      <>
        <Typography variant="h3">Overview</Typography>
        <Typography variant="body1" paragraph>
          "Resonant Relaxation," presented at EuroHaptics 2024, explored a novel approach to <strong>affective state management</strong> through <strong>procedurally generated audio-haptic feedback</strong>. Developed collaboratively with Innovobot Labs, the project resulted in a web-based tool designed to help haptic and audio designers create personalized relaxation experiences that modulate emotional states.
        </Typography>
        
        <Typography variant="h3">Problem Statement</Typography>
        <Typography variant="body1" paragraph>
          Modern sedentary lifestyles contribute significantly to increased stress, impacting productivity and emotional health. Existing relaxation tools typically lack immersive multimodal integration, relying predominantly on auditory or visual cues. Key challenges included:
          <ul>
            <li><strong>Limited adaptability</strong> in existing haptic systems</li>
            <li><strong>High development costs</strong> for custom haptic patterns</li>
            <li><strong>Lack of integration</strong> with biofeedback data</li>
          </ul>
        </Typography>
        
        <Typography variant="h3">Methodological Approach</Typography>
        <Typography variant="body1" paragraph>
          The initial research hypothesis focused on directly inducing flow states; however, empirical explorations revealed practical challenges. The project shifted towards relaxation as a foundational affective state, involving:
          <ol>
            <li><strong>Literature and Preliminary Exploration:</strong> Research on emotional induction via auditory and tactile stimuli</li>
            <li><strong>Technical Conceptualization and AI Integration:</strong> Developing a two-part audio-haptic concept:
              <ul>
                <li><strong>Baseline:</strong> An amplitude-modulated sine wave to gradually reduce breathing rates</li>
                <li><strong>AI-Generated Musical Elements:</strong> MIDI-based compositions generated through GPT-4 prompts</li>
              </ul>
            </li>
            <li><strong>Prototyping and User Testing:</strong> Iterative evaluations with neck and back pillows equipped with voice coil actuators</li>
          </ol>
        </Typography>
        
        <Typography variant="h3">Technical Implementation</Typography>
        <Typography variant="body1" paragraph>
          The developed MVP was a robust React-based web application featuring:
          <ul>
            <li><strong>GPT-4 integration</strong> for dynamic, real-time MIDI composition</li>
            <li><strong>Web audio frameworks</strong> (Tone.js) for responsive audio rendering</li>
            <li><strong>User-customizable parameters</strong> for detailed tactile control</li>
            <li><strong>Advanced effects processing</strong> (filters, reverb, delay)</li>
          </ul>
        </Typography>
        
        <Typography variant="h3">Outcomes & Evaluation</Typography>
        <Typography variant="body1" paragraph>
          Qualitative evaluations indicated that combined audio-haptic stimulation significantly enhanced perceived relaxation compared to single-modality experiences. The project's innovative integration of AI-generated audio with real-time tactile feedback represents a notable advancement within affective haptic research. Future work includes expanding the framework to support additional use cases such as <strong>rehabilitation</strong> and <strong>gaming</strong>.
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
    cardStyle: resonantRelaxationStyle,
    media: { type: 'image', src: ProcedurallyGenHaptic },
    featuredImages: {
      overview: ProcedurallyGenHaptic,
      problem: FrequencyTheory,
      solution: UIPrototype,
      prototypeShowcase: [PrincipleVariants, UIPrototypeSketch, AIAPIFewshotting]
    },
    links: [
      {
        label: "View Demo",
        url: "https://www.eurohaptics.org/2024/",
        icon: <LaunchIcon fontSize="small" sx={{ ml: 0.5 }} />
      },
      {
        label: "Read Paper",
        url: "https://zenodo.org/records/12549152",
        icon: <ArticleIcon fontSize="small" sx={{ ml: 0.5 }} />
      },
      {
        label: "GitHub",
        url: "https://github.com/NesR0M/Resonant-Relaxation-Project/tree/main",
        icon: <GitHubIcon fontSize="small" sx={{ ml: 0.5 }} />
      }
    ],
    keyTakeaways: [
      "AI can enable real-time adaptation of haptic feedback",
      "Procedural generation reduces development costs for haptic systems",
      "Multimodal integration (audio-haptic) enhances relaxation efficacy",
      "Biofeedback integration enhances personalization and user engagement",
      "Open-source frameworks accelerate innovation in haptic design"
    ]
  },
  
  // Project 3: AMIAI
  {
    id: 3,
    title: "AMIAI – Critical Visual Campaign",
    description: "A visual campaign exploring AI-generated content credibility and digital literacy.",
    categories: ["Graphic Design", "UX Research", "Visual Communication"],
    layoutType: "media-rich",
    details: (
      <>
        <Typography variant="h3">Project Introduction</Typography>
        <Typography variant="body1" paragraph>
          Welcome to the "AM I AI?" exhibit. You are a human in the digital age, navigating a landscape where AI-generated content blurs the boundaries of reality. This project serves as a <strong>visual campaign</strong> designed to provoke public discourse about the <strong>reliability, authenticity, and ethical implications</strong> of AI-generated media. By leveraging design metaphors and visual storytelling, AMIAI prompts users to critically question, verify, and reflect on the digital information they consume.
        </Typography>
        
        <Typography variant="h3">Context & Motivation</Typography>
        <Typography variant="body1" paragraph>
          In an era increasingly dominated by digital content, the line between human-generated and artificially-created media becomes harder to distinguish. Misleading or altered information can rapidly influence public perceptions and decisions. AMIAI addresses this growing issue by highlighting the critical need for <strong>digital literacy and verification</strong> through impactful visual communication. The goal is not only to raise awareness but also to empower audiences to maintain autonomy over their digital interactions.
        </Typography>
        
        <Typography variant="h3">Key Design Element: Pixelation Metaphor</Typography>
        <Typography variant="body1" paragraph>
          Central to the visual identity of AMIAI is the <strong>pixelation effect</strong>, symbolizing the transformation of reality into digital representation. This intentional visual distortion serves as a metaphor for AI's potential to obscure truth, manipulate perception, and subtly alter human understanding. Pixelation effectively communicates the ambiguity and uncertainty inherent in AI-generated content, prompting viewers to pause, question, and engage critically with digital information.
        </Typography>
        
        <Typography variant="h3">Design Process & Execution</Typography>
        <Typography variant="body1" paragraph>
          The creative execution involved a multi-step approach:
          <ol>
            <li><strong>Visual Identity Creation:</strong> Developed a cohesive brand identity centered around the pixelation concept</li>
            <li><strong>Interactive and Motion Graphics:</strong> Created dynamic animations to demonstrate how easily digital content can be distorted</li>
            <li><strong>Poster and Digital Media Design:</strong> Produced materials crafted to provoke immediate emotional responses</li>
            <li><strong>Scenario and Storytelling:</strong> Implemented narrative-driven visuals demonstrating real-world implications</li>
          </ol>
        </Typography>
        
        <Typography variant="h3">Campaign Components</Typography>
        <Typography variant="body1" paragraph>
          AMIAI utilized a diverse array of designed outputs, including:
          <ul>
            <li><strong>Posters:</strong> High-impact printed visuals strategically displayed in public spaces</li>
            <li><strong>Digital Animations:</strong> Short-form motion graphics distributed through social media platforms</li>
            <li><strong>Interactive Digital Experience:</strong> Web-based interactions with pixelation effects</li>
          </ul>
        </Typography>
        
        <Typography variant="h3">Impact & Future Directions</Typography>
        <Typography variant="body1" paragraph>
          The AMIAI campaign successfully initiated conversations and critical reflections regarding digital content authenticity. For future iterations, AMIAI could expand its impact through educational workshops, AR/VR experiences, and partnerships with digital platforms to amplify the campaign's reach and effectiveness.
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
    tools: ["Adobe Photoshop", "Adobe Illustrator", "After Effects", "Cinema 4D"],
    cardStyle: amiaiStyle,
    media: { type: 'image', src: AMIAI },
    featuredImages: {
      overview: AMIAIIntro,
      problem: AMIAIWelcomePage,
      solution: AMIAIrestposters,
      prototypeShowcase: [AMIAIFonts, AMIAIColorPallete]
    },
    links: [
      {
        label: "View Project",
        url: "https://www.behance.net/",
        icon: <LaunchIcon fontSize="small" sx={{ ml: 0.5 }} />
      }
    ],
    keyTakeaways: [
      "Visual design can effectively communicate complex technological issues",
      "Metaphorical representation enhances understanding of abstract concepts",
      "Digital literacy is crucial in an era of AI-generated content",
      "Interactive experiences foster deeper engagement with critical topics",
      "Design ethics must address the implications of emerging technologies"
    ]
  },
  
  // Project 4: Green Wallet
  {
    id: 4,
    title: "Green Wallet – Sustainable Tourism",
    description: "A gamified cashless payment system for sustainable tourism developed during a hackathon.",
    categories: ["UX Research", "UI Design", "Gamification", "Prototyping"],
    layoutType: "split-vertical",
    details: (
      <>
        <Typography variant="h3">Project Overview</Typography>
        <Typography variant="body1" paragraph>
          The Green Wallet was developed during the Tourism Technology Festival 2023 Hackathon in Salzburg, as part of Mastercard's challenge to promote the adoption of <strong>cashless payments</strong> in the tourism and gastronomy sectors. Our team created an innovative <strong>gamified solution</strong> that simultaneously benefits tourists, local shop owners, Mastercard, and regional sustainability efforts.
        </Typography>
        
        <Typography variant="h3">Problem Statement</Typography>
        <Typography variant="body1" paragraph>
          Many smaller gastronomy businesses and tourist-oriented shops continue to prefer cash over cashless transactions, despite proven advantages. Our research revealed common obstacles such as:
          <ul>
            <li><strong>Perceived high transaction fees</strong></li>
            <li><strong>Security concerns</strong></li>
            <li><strong>Lack of immediate visible incentives</strong> for shop owners</li>
          </ul>
          Concurrently, tourism regions face challenges like overcrowding in popular spots, inefficient tourist distribution, and missed opportunities for eco-friendly initiatives.
        </Typography>
        
        <Typography variant="h3">Innovative Concept: Green Wallet</Typography>
        <Typography variant="body1" paragraph>
          Green Wallet addresses these multi-faceted challenges through an engaging, gamified user experience with core functionalities:
          <ul>
            <li><strong>Gamified Events:</strong> Shop owners create limited-time special events where Mastercard users receive increased reward points</li>
            <li><strong>Eco-conscious Reward System:</strong> Users accumulate points that can be redeemed for environmentally positive actions</li>
            <li><strong>Real-time Analytics & User Insights:</strong> Shop owners receive immediate insights into sales performance and customer demographics</li>
          </ul>
        </Typography>
        
        <Typography variant="h3">Research & Development Process</Typography>
        <Typography variant="body1" paragraph>
          Our team employed a robust user-centered approach during the hackathon:
          <ol>
            <li><strong>Stakeholder Interviews:</strong> We identified pain points and motivations regarding cashless payment adoption</li>
            <li><strong>Rapid Prototyping:</strong> We created detailed Figma prototypes for both tourist and shop owner journeys</li>
            <li><strong>Gamification Mechanics:</strong> The prototypes included visually appealing gamified elements</li>
            <li><strong>Interactive User Flow Presentation:</strong> We presented a live demonstration showcasing realistic usage scenarios</li>
          </ol>
        </Typography>
        
        <Typography variant="h3">Benefits & Impacts</Typography>
        <Typography variant="body1" paragraph>
          Green Wallet creates a win-win scenario for all stakeholders:
          <ul>
            <li><strong>Tourists:</strong> Enjoy financial incentives while contributing to environmental sustainability</li>
            <li><strong>Shop Owners:</strong> Experience increased customer traffic and improved brand image</li>
            <li><strong>Mastercard:</strong> Increases card usage while positioning itself as environmentally responsible</li>
            <li><strong>Tourism Regions:</strong> Achieve better visitor distribution and positive environmental impacts</li>
          </ul>
          The innovative combination of gamified financial incentives and sustainable tourism practices earned Green Wallet notable recognition at the hackathon.
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
    tools: ["Figma", "Adobe XD", "Miro", "Keynote"],
    cardStyle: greenWalletStyle,
    media: { type: 'image', src: GreenWallet },
    featuredImages: {
      overview: GreenWallet,
      problem: HackathonBG,
      solution: PrototypeUI,
      prototypeShowcase: [GW2, GW4, Owner1]
    },
    links: [
      {
        label: "View Prototype",
        url: "https://www.figma.com/proto/",
        icon: <DesignIcon fontSize="small" sx={{ ml: 0.5 }} />
      }
    ],
    keyTakeaways: [
      "Gamification can effectively drive behavioral change in financial transactions",
      "Sustainable initiatives can align with commercial interests when properly designed",
      "User research during hackathons provides critical insights for rapid prototyping",
      "Multi-stakeholder benefits are essential for adoption of new payment systems",
      "Tourism technology can address both economic and environmental challenges"
    ]
  },
  
  // Project 5: ADHDeer
  {
    id: 5,
    title: "ADHDeer – ADHD Support App",
    description: "A mobile app supporting youth with ADHD through empathic UX design and structured daily routines.",
    categories: ["UI Design", "UX Research", "Mental Health UX", "Prototyping"],
    layoutType: "single-column",
    details: (
      <>
        <Typography variant="h3">Project Overview</Typography>
        <Typography variant="body1" paragraph>
          ADHDeer is an innovative mobile app designed during a Design Thinking project at FH Salzburg. The app specifically targets young adults and children with Attention Deficit Hyperactivity Disorder (ADHD), helping them and their families <strong>manage daily life challenges</strong> associated with the condition. The team leveraged personal experiences, user-centered research, and <strong>empathic design methodologies</strong> to create a practical, supportive digital companion.
        </Typography>
        
        <Typography variant="h3">Motivation & Context</Typography>
        <Typography variant="body1" paragraph>
          ADHD, characterized by inattentiveness, hyperactivity, and impulsivity, significantly impacts everyday life, academic performance, social interactions, and emotional health. The project was motivated by an understanding that young people with ADHD often feel misunderstood, isolated, and lack effective tools to manage their condition proactively.
        </Typography>
        
        <Typography variant="h3">Problem Definition</Typography>
        <Typography variant="body1" paragraph>
          Through extensive research and empathizing phases, key challenges emerged:
          <ul>
            <li><strong>Communication Barriers:</strong> Difficulty expressing emotional needs to parents or educators</li>
            <li><strong>Underdiagnosis and Misdiagnosis:</strong> Leading to exacerbated mental health issues</li>
            <li><strong>Lack of Daily Structure and Routine:</strong> Struggles with time management and maintaining routines</li>
          </ul>
        </Typography>
        
        <Typography variant="h3">Research & Empathy</Typography>
        <Typography variant="body1" paragraph>
          The research phase incorporated diverse methods:
          <ul>
            <li><strong>Interviews & Personal Insights:</strong> In-depth conversations with ADHD experts and affected individuals</li>
            <li><strong>Digital Ethnography:</strong> Engagement with online communities and forums</li>
            <li><strong>Focus Groups and Ideation Sessions:</strong> Collaborative brainstorming techniques</li>
          </ul>
        </Typography>
        
        <Typography variant="h3">Core Functionalities</Typography>
        <Typography variant="body1" paragraph>
          Through intensive ideation, three core dimensions were identified and translated into features:
          <ul>
            <li><strong>Emotion Tracking and Management:</strong> Interactive tools for identifying and articulating emotional states</li>
            <li><strong>Routine and Task Management:</strong> Simplified scheduling with visual and gamified components</li>
            <li><strong>Educational Content:</strong> Structured resources for recognizing symptoms and coping strategies</li>
            <li><strong>Emergency Support:</strong> Integrated access to immediate mental health resources</li>
          </ul>
        </Typography>
        
        <Typography variant="h3">Prototyping & Design</Typography>
        <Typography variant="body1" paragraph>
          The prototype was crafted in Figma, with attention to accessibility, usability, and engagement for neurodiverse audiences. The design emphasized clarity, visual appeal, and simplicity, avoiding overwhelming elements while maintaining user engagement through thoughtful gamification.
        </Typography>
        
        <Typography variant="h3">Impact & Future Directions</Typography>
        <Typography variant="body1" paragraph>
          ADHDeer exemplifies how user-centric, empathetic UX design can enhance quality of life for young individuals with ADHD. Future enhancements could include AI-driven personalization, community features, and specialized modules for parents and educators.
        </Typography>
      </>
    ),
    images: [
      ADHDeer
    ],
    tools: ["Figma", "Miro", "Adobe Illustrator", "User Testing"],
    cardStyle: adhdeerStyle,
    media: { type: 'image', src: ADHDeer },
    featuredImages: {
      overview: ADHDeer,
      problem: ADHDeer,
      solution: ADHDeer,
      prototypeShowcase: [ADHDeer]
    },
    links: [
      {
        label: "View Prototype",
        url: "https://www.figma.com/proto/",
        icon: <DesignIcon fontSize="small" sx={{ ml: 0.5 }} />
      }
    ],
    keyTakeaways: [
      "Empathic design creates more effective solutions for neurodivergent users",
      "Gamification can increase engagement for users with attention challenges",
      "Visual design plays a critical role in accessibility for ADHD users",
      "User research with diverse stakeholders leads to more comprehensive solutions",
      "Digital tools can significantly improve daily functioning for individuals with ADHD"
    ]
  },
  
  // Project 6: Bachelor Thesis
  {
    id: 6,
    title: "Passenger Reroute – Bachelor Thesis",
    description: "Investigating passenger interaction with autonomous vehicle systems for spontaneous route adjustments.",
    categories: ["Automotive UX", "UI Design", "Prototyping", "UX Research"],
    layoutType: "horizontal-scroll",
    details: (
      <>
        <Typography variant="h3">Overview</Typography>
        <Typography variant="body1" paragraph>
          This Bachelor thesis investigated passenger interaction with autonomous vehicle (AV) systems, specifically focusing on <strong>rear-seat passenger cooperation</strong> in non-critical spontaneous rerouting scenarios (NCSS). As autonomous driving technologies evolve to SAE levels 4 and 5, passengers engage increasingly in non-driving related activities (NDRAs), introducing unique challenges in maintaining trust and ensuring intuitive cooperation between passengers and AV systems.
        </Typography>
        
        <Typography variant="h3">Problem Statement</Typography>
        <Typography variant="body1" paragraph>
          In a future where AVs handle driving tasks autonomously, passengers' trust in the vehicle's decisions becomes crucial. Key challenges identified include:
          <ul>
            <li><strong>Maintaining passenger trust</strong> in spontaneous rerouting scenarios</li>
            <li><strong>Balancing information density</strong> on phone-based UIs for intuitive decision-making</li>
            <li><strong>Understanding the impact of time pressure</strong> on cooperative performance</li>
          </ul>
        </Typography>
        
        <Typography variant="h3">Research Questions</Typography>
        <Typography variant="body1" paragraph>
          The thesis explored two main research questions:
          <ol>
            <li>How do varying amounts of information in an AV navigation UI affect passengers' user experience, cooperative performance, and trust?</li>
            <li>What is the optimal level of information density that supports passengers' spontaneous decision-making?</li>
          </ol>
        </Typography>
        
        <Typography variant="h3">Research Process & Methodology</Typography>
        <Typography variant="body1" paragraph>
          The research was structured into multiple phases:
          <ul>
            <li><strong>Pilot Study:</strong> Conducted with 11 participants to validate preliminary UI designs</li>
            <li><strong>Main User Study:</strong> Included 30 participants divided into two groups:
              <ul>
                <li><strong>Fast Thinking (FT):</strong> 3-minute limit, simulated moving car scenario</li>
                <li><strong>Slow Thinking (ST):</strong> 15-minute limit, simulated parked car scenario</li>
              </ul>
            </li>
            <li><strong>UI Information Density Levels:</strong>
              <ul>
                <li><strong>Level 1 (Simple):</strong> Basic perception information</li>
                <li><strong>Level 2 (Medium):</strong> Added comprehension-level details</li>
                <li><strong>Level 3 (Complex):</strong> Additional trajectory-level details</li>
              </ul>
            </li>
          </ul>
        </Typography>
        
        <Typography variant="h3">Technical Implementation</Typography>
        <Typography variant="body1" paragraph>
          Prototypes were designed in Figma and tested using the Figma Mirror app. Traffic camera simulations were created using Adobe After Effects, adding augmented reality-style overlays indicating vehicle trajectory and environmental awareness. Interaction scenarios involved shop selection for spontaneous stops categorized by complexity.
        </Typography>
        
        <Typography variant="h3">Findings & Results</Typography>
        <Typography variant="body1" paragraph>
          Significant findings from the study include:
          <ul>
            <li><strong>Trust & Usability:</strong> Post-interaction trust levels significantly increased compared to baseline trust</li>
            <li><strong>Interaction Steps & Decision Making:</strong> Fast-thinking participants completed tasks more quickly with fewer steps</li>
            <li><strong>Experience & Feedback:</strong> Users perceived high control but desired richer shop-related information</li>
          </ul>
        </Typography>
        
        <Typography variant="h3">Recommendations & Impact</Typography>
        <Typography variant="body1" paragraph>
          This study contributes to understanding passenger cooperation with autonomous vehicles, emphasizing how mobile-based UIs can effectively support spontaneous decision-making. By demonstrating that balanced information presentation enhances trust and usability, the research provides practical guidelines for designing user-centered interventions in future AV systems.
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
    tools: ["Figma", "Adobe After Effects", "Adobe Illustrator", "User Testing"],
    cardStyle: bachelorThesisStyle,
    media: { type: 'image', src: FTLevel2GIF },
    featuredImages: {
      overview: PrototypeFlows,
      problem: Level1STUI,
      solution: Level2FTUI,
      prototypeShowcase: [Level3FTUI, Level2STUI, Level3STUI]
    },
    links: [
      {
        label: "Download PDF",
        url: "/assets/documents/Bachelor_Thesis.pdf",
        icon: <ArticleIcon fontSize="small" sx={{ ml: 0.5 }} />
      },
      {
        label: "View Prototype",
        url: "https://www.figma.com/proto/",
        icon: <DesignIcon fontSize="small" sx={{ ml: 0.5 }} />
      }
    ],
    keyTakeaways: [
      "Information density significantly impacts user trust in autonomous systems",
      "Time pressure affects decision-making strategies in human-machine interactions",
      "Mobile interfaces are effective tools for passenger-AV cooperation",
      "Balanced information presentation enhances usability in complex systems",
      "User testing reveals critical insights for future autonomous vehicle interfaces"
    ]
  }
];

// Add this export for skill tags used across the portfolio
export const skillTags = [
  'UX Research', 'Interaction Design', 'Prototyping', 'UI Design',
  'Haptic Design', 'Sound Design', 'AI Integration', 'Frontend Development',
  'UX Gamification', 'HCI Methodologies', 'Mental Health UX', 'Automotive UX', 
  'Graphic Design', 'Visual Communication', 'User Testing'
];

// Export the processed data
export const workData = processWorkData(rawWorkData);

export default workData;