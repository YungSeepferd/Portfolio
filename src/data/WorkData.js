import theme from '../theme';
// Update image imports to use proper folder structure
// Master Thesis
import masterThesisBG from '../assets/css/images/Masterthesis/AudioHaptics.png';
import masterThesisBG2 from '../assets/css/images/Masterthesis/Workshop_Room_Setup_defaced.jpg';
import masterThesisBG3 from '../assets/css/images/Masterthesis/Prototyping_Group_B_defaced.jpg';
import masterThesisBG4 from '../assets/css/images/Masterthesis/Prototyping_Group_C_defaced_2.jpeg';
import masterThesisBG5 from '../assets/css/images/Masterthesis/AP1.png';
import masterThesisBG6 from '../assets/css/images/Masterthesis/AP2_defaced_2.png';
import masterThesisBG7 from '../assets/css/images/Masterthesis/AP2_defaced_3.png';
import masterThesisBG8 from '../assets/css/images/Masterthesis/Circumplex Model of Affect.png';
import masterThesisBG9 from '../assets/css/images/Masterthesis/Phase 2 - 2 Body maps.jpg';
import masterThesisBG10 from '../assets/css/images/Masterthesis/Guiding questions body maps.jpg';
import masterThesisBG11 from '../assets/css/images/Masterthesis/Phase 2 - 1 Embodied Metaphor Elicitation and Emotional Object Sharing.jpg'; 
import masterThesisBG12 from '../assets/css/images/Masterthesis/Phase 2 - Preperation of Templates, Documentation of the Object and Ideas and Sheets for the Prototyping Session.jpg';
import masterThesisBG13 from '../assets/css/images/Masterthesis/Phase 3 - 1 Hapticlabs Hardware Kit Setup and Explanation.jpg';
import masterThesisBG14 from '../assets/css/images/Masterthesis/Phase 3 - 3 Agenda Feedback and Prototyping Sessions.png';
// Resonant Relaxation
import resonantRelaxationBG from '../assets/css/images/ProdecualHaptics/ProceduallyGenHaptic.png';
import resonantRelaxationBG2 from '../assets/css/images/ProdecualHaptics/UI Prototype.png';
import resonantRelaxationBG3 from '../assets/css/images/ProdecualHaptics/PrincipleSketch.png';
import resonantRelaxationBG4 from '../assets/css/images/ProdecualHaptics/PrincipleVariants.png';
import resonantRelaxationBG5 from '../assets/css/images/ProdecualHaptics/UI Prototype Sketch.png';
import resonantRelaxationBG6 from '../assets/css/images/ProdecualHaptics/FrequencyTheory.png';
import resonantRelaxationBG7 from '../assets/css/images/ProdecualHaptics/AIAPIFewshotting.png';
// AMIAI
import AMIAIBG from '../assets/css/images/AMIAI/AMIAI.svg';
import AMIAIBG2 from '../assets/css/images/AMIAI/Final Presentation amiai/Introduction.png';
import AMIAIBG3 from '../assets/css/images/AMIAI/Final Presentation amiai/colour pallete.png';
import AMIAIBG4 from '../assets/css/images/AMIAI/Final Presentation amiai/Fonts TODO.png';
import AMIAIBG5 from '../assets/css/images/AMIAI/Final Presentation amiai/Welcome page (2).png';
import AMIAIBG6 from '../assets/css/images/AMIAI/Final Presentation amiai/rest posters.png';
import AMIAIBG7 from '../assets/css/images/AMIAI/5samiai.mov';
import AMIAIBG8 from '../assets/css/images/AMIAI/Scene.mp4';
// HackathonBG
import hackathonBG from '../assets/css/images/GreenWallet/Greenwallet.png';
import hackathonBG2 from '../assets/css/images/GreenWallet/#4 Cashless Payment.png';
import hackathonBG3 from '../assets/css/images/GreenWallet/1.png';
import hackathonBG4 from '../assets/css/images/GreenWallet/2.png';
import hackathonBG5 from '../assets/css/images/GreenWallet/3.png';
import hackathonBG6 from '../assets/css/images/GreenWallet/4.png';
import hackathonBG7 from '../assets/css/images/GreenWallet/5.png';
import hackathonBG8 from '../assets/css/images/GreenWallet/6.png';
import hackathonBG9 from '../assets/css/images/GreenWallet/Owner 1.png';
import hackathonBG10 from '../assets/css/images/GreenWallet/Owner 2.png';
import hackathonBG11 from '../assets/css/images/GreenWallet/Hackathon.jpeg';
import hackathonBG12 from '../assets/css/images/GreenWallet/HackathonBG.jpg';
import hackathonBG13 from '../assets/css/images/GreenWallet/Prototype UI.png';
import hackathonVideo14 from '../assets/css/images/GreenWallet/Highlightreel.mp4';
import hackathonVideo15 from '../assets/css/images/GreenWallet/Presentation.mp4';

// ADHDeer Design Thinking
import ADHDeerBG from '../assets/css/images/ADHDeer/ADHDeer.png';

// Bachelor Thesis
import bachelorBG from '../assets/css/images/Bachelorthesis/FT Level 2 GIF.gif';
import bachelorBG2 from '../assets/css/images/Bachelorthesis/3_prototype_flows_Figmabboard.png';
import bachelorBG3 from '../assets/css/images/Bachelorthesis/Level 1 ST UI.png';
import bachelorBG4 from '../assets/css/images/Bachelorthesis/Level 2 FT UI.png';
import bachelorBG5 from '../assets/css/images/Bachelorthesis/Level 3 FT UI.png';
import bachelorBG6 from '../assets/css/images/Bachelorthesis/Level 2 ST UI.png';
import bachelorBG7 from '../assets/css/images/Bachelorthesis/Level 3 ST UI.png';
import bachelorBG8 from '../assets/css/images/Bachelorthesis/Level 3 FT UI.png';
import bachelorBG9 from '../assets/css/images/Bachelorthesis/Endscreen.png';  
import bachelorBG10 from '../assets/css/images/Bachelorthesis/Routenuebersicht.PNG';


import Typography from '@mui/material/Typography';

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
    title: "🧪 Prototyping Emotions – Master Thesis",
    description: "Methodology for prototyping emotional haptic feedback using the Circumplex Model of Affect and body mapping.",
    categories: ["UX Research", "Interaction Design", "HCI Methodologies", "Haptic Design"],
    details: (
      <>
        <Typography variant="h3">📖 Project Overview</Typography>
        <Typography variant="body1">
          This Master’s thesis introduced a <strong>structured methodology</strong> for novice designers to prototype <strong>affective haptic feedback</strong>. The research explored how <strong>emotion-driven design</strong> can be integrated into UX workflows through <strong>tactile interaction design</strong>.
        </Typography>
        <Typography variant="h3">🏆 Problem Statement</Typography>
        <Typography variant="body1">
          The project aimed to address the <strong>lack of accessible methodologies</strong> for haptic design in UX. Key challenges included:
          <ul>
            <li>🚧 <strong>Limited tools for emotion-to-haptic translation</strong></li>
            <li>💡 <strong>Difficulty in designing intuitive haptic feedback loops</strong></li>
            <li>🎛 <strong>Absence of real-time iteration in haptic UX</strong></li>
          </ul>
        </Typography>
        <Typography variant="h3">🔬 Research Process</Typography>
        <Typography variant="body1">
          The study involved <strong>tandem prototyping</strong> sessions where participants iterated on <strong>haptic interactions</strong> using the <strong>Hapticlabs DevKit</strong>. The methodology included:
          <ul>
            <li>🧠 <strong>Emotional Mapping</strong> – Using the Circumplex Model of Affect</li>
            <li>🖐 <strong>Body Mapping</strong> – Identifying where emotions manifest physically</li>
            <li>🎛 <strong>On-body Haptic Testing</strong> – Using iterative design to refine feedback</li>
          </ul>
        </Typography>
        <Typography variant="h3">🎯 Outcomes & Learnings</Typography>
        <Typography variant="body1">
          The toolkit successfully enabled designers to <strong>prototype emotional haptics</strong>, leading to its presentation at <strong>EuroHaptics 2024</strong>. Future work includes <strong>biofeedback integration</strong> for adaptive tactile experiences.
        </Typography>
      </>
    ),
    images: [
      masterThesisBG,
      masterThesisBG2,
      masterThesisBG3,
      masterThesisBG4,
      masterThesisBG5,
      masterThesisBG6,
      masterThesisBG7,
      masterThesisBG8,
      masterThesisBG9,
      masterThesisBG10,
      masterThesisBG11,
      masterThesisBG12,
      masterThesisBG13,
      masterThesisBG14
    ],
    tools: ["Figma", "Miro", "Hapticlabs DevKit", "Hapticlabs Studio"],
    cardStyle,
    media: { type: 'image', src: masterThesisBG }
  },
  {
    id: 2,
    title: "🎵 Resonant Relaxation – AI-driven Audio-Haptic Web App",
    description: "Web-based stress relief combining AI sound synthesis with real-time haptic feedback.",
    categories: ["UX Research", "Prototyping", "Haptic Design", "AI LLMs"],
    details: (
      <>
        <Typography variant="h3">📖 Project Overview</Typography>
        <Typography variant="body1">
          <strong>Resonant Relaxation</strong> is a specialized web application that creates procedurally generated audio patterns
          aimed at inducing relaxation as a foundation for achieving flow states. Developed in collaboration with <strong>Daniel Shor from Innovobot Labs</strong>,
          it combines code-generated sine waves with AI-composed musical elements to deliver a unique audio-haptic experience.
        </Typography>
        
        <Typography variant="h3">🏆 Problem Statement</Typography>
        <Typography variant="body1">
          In our fast-paced modern world, many people struggle with stress, lack of concentration, and emotional imbalance.
          Traditional stress-relief applications typically focus only on <strong>visual and auditory cues</strong>, while
          <strong>haptic integration</strong> remains largely unexplored. Our research indicated that establishing flow states is more
          achievable from an initial <strong>state of relaxation</strong>, making this an important foundation for productivity tools.
        </Typography>
        
        <Typography variant="h3">🔬 Research Process</Typography>
        <Typography variant="body1">
          Our research and development involved:
          <ul>
            <li><strong>Haptic Frequency Analysis</strong> – Investigating optimal frequency ranges (25-60Hz) for pleasant tactile vibrations</li>
            <li><strong>User Testing</strong> – Evaluating different haptic embodiments (neck and back pillows) and their effectiveness</li>
            <li><strong>Musical Theory Adaptation</strong> – Applying consonance and dissonance principles from music to vibrotactile stimuli</li>
            <li><strong>Breathing Pattern Design</strong> – Creating audio patterns that gradually reduce breathing rate from 11 to 6 breaths per minute</li>
          </ul>
        </Typography>
        
        <Typography variant="h3">🛠 Technical Solution</Typography>
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
        
        <Typography variant="h3">🎯 Outcomes & Impact</Typography>
        <Typography variant="body1">
          The project evolved from a general relaxation app to a specialized tool for haptic designers and audio professionals,
          providing a platform for procedurally generated audio-haptic experiences. Our user testing validated the relaxation-inducing
          effects of the baseline patterns, while the AI-generated sparkles added a layer of complexity and interest.
          The project demonstrates the potential of combining AI with audio-haptic design for emotional well-being applications.
        </Typography>
        
        <Typography variant="body1" sx={{ mt: 2 }}>
          <strong>🔗 Live Demo:</strong> <a href="https://react-midi.netlify.app/" target="_blank" rel="noopener noreferrer">https://react-midi.netlify.app/</a><br/>
          <strong>💻 Source Code:</strong> <a href="https://github.com/NesR0M/Industry_Project" target="_blank" rel="noopener noreferrer">GitHub Repository</a>
        </Typography>
      </>
    ),
    images: [
      resonantRelaxationBG,
      resonantRelaxationBG2, 
      resonantRelaxationBG3,
      resonantRelaxationBG4,
      resonantRelaxationBG5,
      resonantRelaxationBG6,
      resonantRelaxationBG7
    ],
    tools: ["React", "ChatGPT API", "Tone.js", "RNBO.js", "Haptic Actuators"],
    cardStyle,
    media: { type: 'image', src: resonantRelaxationBG }
  },
  {
    id: 3,
    title: "🖼️ AMIAI – Visual Campaign for AI Awareness",
    description: "Critical design campaign exploring AI-generated media credibility using pixelation metaphors.",
    categories: ["Graphic Design"],
    details: (
      <>
        <Typography variant="h3">📖 Project Overview</Typography>
        <Typography variant="body1">
          <strong>AMIAI</strong> is a <strong>critical design campaign</strong> exploring how <strong>AI-generated content affects media credibility</strong>. 
          The campaign uses <strong>pixelation metaphors</strong> to highlight <strong>digital distortion</strong> in AI-generated media.
        </Typography>
        <Typography variant="h3">🏆 Problem Statement</Typography>
        <Typography variant="body1">
          As <strong>AI-generated media</strong> grows, questions of <strong>credibility and authenticity</strong> become more relevant. <strong>AMIAI</strong> 
          aims to raise awareness and <strong>prompt critical thinking</strong> about <strong>digital trustworthiness</strong>.
        </Typography>
        <Typography variant="h3">🔬 Research Process</Typography>
        <Typography variant="body1">
          The research involved:
          <ul>
            <li>🖥 <strong>Analyzing how digital distortions impact media credibility</strong></li>
            <li>📊 <strong>Exploring the psychological effects of pixelation on trust</strong></li>
            <li>🎥 <strong>Using motion graphics to enhance AI literacy</strong></li>
          </ul>
        </Typography>
        <Typography variant="h3">🛠 Solution</Typography>
        <Typography variant="body1">
          <ul>
            <li>🖼 <strong>Pixelation-based branding system</strong> for AI-generated vs. human-created content</li>
            <li>💻 <strong>Interactive distortion effects</strong> exploring credibility perception</li>
            <li>🎞 <strong>Motion graphics animations</strong> simulating AI interference in media</li>
          </ul>
        </Typography>
        <Typography variant="h3">🎯 Outcomes & Learnings</Typography>
        <Typography variant="body1">
          The campaign <strong>sparked discussions on AI’s role in media trust</strong>. Future iterations could involve <strong>interactive web applications</strong>.
        </Typography>
      </>
    ),
    images: [
      AMIAIBG,
      AMIAIBG2,
      AMIAIBG3,
      AMIAIBG4,
      AMIAIBG5,
      AMIAIBG6,
      AMIAIBG7,
      AMIAIBG8
    ],
    tools: ["Figma", "Adobe Photoshop", "Adobe Illustrator"],
    cardStyle,
    media: { type: 'image', src: AMIAIBG }
  },
  {
    id: 4,
    title: "🏆 Green Wallet – TTF Hackathon (MasterCard Challenge)",
    description: "Gamified financial app promoting cashless payments in local tourist markets.",
    categories: ["UX Research", "Prototyping", "UX Gamification"],
    details: (
      <>
        <Typography variant="h3">📖 Project Overview</Typography>
        <Typography variant="body1">
          Green Wallet was a <strong>UX-driven financial application</strong> designed as part of the <strong>Tourism Technology Festival Hackathon 2022</strong>. 
          The challenge, set by MasterCard, focused on <strong>increasing cashless payments in local tourist markets</strong> through an engaging and 
          <strong>gamified user experience</strong>.
        </Typography>
        <Typography variant="h3">🏆 Problem Statement</Typography>
        <Typography variant="body1">
          Many <strong>small vendors in tourist hotspots</strong> hesitate to accept cashless payments due to high transaction fees and lack of incentives. 
          Tourists, however, increasingly prefer digital payments for convenience and security.  
          The core issues identified:
          <ul>
            <li>💳 <strong>Low adoption of contactless payments in local markets</strong></li>
            <li>🏞️ <strong>Sustainability initiatives often lack digital integration in tourism</strong></li>
            <li>🎮 <strong>Gamification elements could enhance engagement but were underutilized in fintech UX</strong></li>
          </ul>
        </Typography>
        <Typography variant="h3">🔬 Research & Design Process</Typography>
        <Typography variant="body1">
          The project was built <strong>under a 24-hour rapid prototyping framework</strong> using UX research and usability testing to validate 
          our concept. Key steps included:
          <ul>
            <li>📊 <strong>On-site vendor interviews</strong> – Understanding pain points for business owners</li>
            <li>🎯 <strong>User research with tourists</strong> – Identifying motivations and friction points in payment behavior</li>
            <li>📱 <strong>Iterative prototyping in Figma</strong> – Creating a mobile-first, intuitive UI</li>
            <li>🧑‍💻 <strong>Pitching to judges</strong> – Highlighting the business case and user adoption strategy</li>
          </ul>
        </Typography>
        <Typography variant="h3">🛠 Solution</Typography>
        <Typography variant="body1">
          The final prototype featured:
          <ul>
            <li>🌿 <strong>Gamified eco-rewards system</strong> – Users earn green points for choosing sustainable vendors</li>
            <li>📈 <strong>Merchant dashboard</strong> – Providing analytics on eco-conscious customers</li>
            <li>💰 <strong>Integrated MasterCard APIs</strong> – Secure, frictionless payment integration</li>
          </ul>
        </Typography>
        <Typography variant="h3">🎯 Outcomes & Learnings</Typography>
        <Typography variant="body1">
          <strong>1st Place Winner – Stream 1 at the TTF Hackathon</strong> <br />
          <strong>Designed a functional prototype within 24 hours</strong> <br />
          <strong>Demonstrated financial UX meets sustainability gamification</strong> as a viable fintech strategy.
        </Typography>
      </>
    ),
    images: [
      hackathonBG, 
      hackathonBG2, 
      hackathonBG3, 
      hackathonBG4,
      hackathonBG5,
      hackathonBG6,
      hackathonBG7,
      hackathonBG8,
      hackathonBG9,
      hackathonBG10,
      hackathonBG11,
      hackathonBG12,
      hackathonBG13,
      hackathonVideo14,  // Video file
      hackathonVideo15   // Video file
    ],
    tools: ["Figma", "Adobe Illustrator", "MasterCard API"],
    cardStyle,
    media: { type: 'image', src: hackathonBG }
  },
  {
    id: 5,
    title: "🦌 ADHDeer – Self-Tracking App for ADHD Youth",
    description: "Mobile app supporting ADHD youth in self-management and emotional regulation.",
    categories: ["UX Research", "Prototyping", "Mental Health UX"],
    details: (
      <>
        <Typography variant="h3">📖 Project Overview</Typography>
        <Typography variant="body1">
          <strong>ADHDeer</strong> is a UX-driven mobile app designed to support young adults with <strong>ADHD</strong> in <strong>self-management, emotional regulation, and daily structuring</strong>. The project was part of a <strong>Design Thinking course at FH Salzburg</strong>, aimed at bridging the gap between <strong>ADHD awareness, self-assessment, and mental health support</strong> through a <strong>gamified</strong> and <strong>intuitive UX approach</strong>.
        </Typography>
        <Typography variant="h3">🏆 Problem Statement</Typography>
        <Typography variant="body1">
          Many young adults with ADHD struggle with:
          <ul>
            <li>⏳ <strong>Time blindness</strong> – Difficulty perceiving time and sticking to routines</li>
            <li>⚡ <strong>Emotional dysregulation</strong> – Struggles with mood swings and motivation</li>
            <li>📋 <strong>Task structuring</strong> – Lack of executive function support in daily life</li>
          </ul>
          Existing solutions felt <strong>clinical, uninspiring, and lacked personalization</strong>.
        </Typography>
        <Typography variant="h3">🔬 Research Process</Typography>
        <Typography variant="body1">
          The research involved:
          <ul>
            <li>🎤 <strong>Interviews</strong> with ADHD individuals, parents, and specialists</li>
            <li>🕵️ <strong>Competitive Analysis</strong> – Reviewing ADHD tracking tools</li>
            <li>📊 <strong>Usability testing</strong> – Evaluating engagement levels</li>
          </ul>
        </Typography>
        <Typography variant="h3">🛠 Solution</Typography>
        <Typography variant="body1">
          The <strong>Figma prototype</strong> included:
          <ul>
            <li>🧠 <strong>Personalized ADHD self-assessment</strong> for customized habit-building</li>
            <li>📅 <strong>Gamified daily planner</strong> with <strong>adaptive reminders and nudging</strong></li>
            <li>📊 <strong>Mood &amp; focus tracking</strong> for self-reflection</li>
          </ul>
        </Typography>
        <Typography variant="h3">🎯 Outcomes & Learnings</Typography>
        <Typography variant="body1">
          <strong>Positive User Feedback</strong> – ADHD users found it engaging and intuitive  <br />
          <strong>Potential for future AI-powered habit-building features</strong>
        </Typography>
      </>
    ),
    images: [ADHDeerBG],
    tools: ["Figma", "Miro", "Adobe Illustrator"],
    cardStyle,
    media: { type: 'image', src: ADHDeerBG }
  },
  {
    id: 6,
    title: "🚗 Phone-based Intervention in Self-driving Cars – Bachelor Thesis",
    description: "Mobile interface for trust and decision-making in autonomous vehicle rerouting scenarios.",
    categories: ["UX Research", "Interaction Design", "Automotive UX"],
    details: (
      <>
        <Typography variant="h3">📖 Project Overview</Typography>
        <Typography variant="body1">
          This <strong>Bachelor thesis</strong> investigated <strong>trust and decision-making in autonomous vehicles</strong> by designing a mobile interface 
          that helps users <strong>intervene in critical rerouting scenarios</strong>. The project tested <strong>how different UI information densities</strong> 
          affect passenger <strong>trust in self-driving car decisions</strong>.
        </Typography>
        <Typography variant="h3">🏆 Problem Statement</Typography>
        <Typography variant="body1">
          Fully autonomous vehicles still face trust issues, particularly when the <strong>system overrides user expectations</strong>.
          The main research questions were:
          <ul>
            <li>🛣️ <strong>How much information do users need to trust AI-based rerouting decisions?</strong></li>
            <li>📲 <strong>How should mobile interfaces communicate uncertainty in AV routing?</strong></li>
            <li>🕒 <strong>Does time pressure affect user decision-making in self-driving scenarios?</strong></li>
          </ul>
        </Typography>
        <Typography variant="h3">🔬 Research Process</Typography>
        <Typography variant="body1">
          <ul>
            <li>👥 <strong>User Study (30 participants)</strong> – Simulating AV decision-making scenarios</li>
            <li>📊 <strong>3 UI Variants Tested</strong> – Minimal, Standard, and Detailed interface designs</li>
            <li>🕒 <strong>2 Time Pressure Conditions</strong> – Fast (3 seconds) vs. Slow (15 seconds) decision-making</li>
            <li>📈 <strong>Quantitative Data Analysis</strong> – Measuring trust levels via SUS (System Usability Scale)</li>
          </ul>
        </Typography>
        <Typography variant="h3">🛠 Solution</Typography>
        <Typography variant="body1">
          The study tested <strong>three mobile interface prototypes</strong> designed in <strong>Figma</strong>, each offering a different level of transparency in 
          AV rerouting decisions.
        </Typography>
        <Typography variant="h3">🎯 Outcomes & Learnings</Typography>
        <Typography variant="body1">
          <strong>Results:</strong> <strong>Simpler UI designs</strong> led to greater <strong>trust and usability</strong> (SUS Score: <strong>75.38 – Good usability rating</strong>)  <br />
          <strong>Validated that less cognitive load leads to better user confidence in AV decisions</strong>  <br />
          <strong>This research provided key insights for future trust-centered autonomous vehicle interfaces</strong>.
        </Typography>
      </>
    ),
    images: [
      bachelorBG,
      bachelorBG2,
      bachelorBG3,
      bachelorBG4,
      bachelorBG5,
      bachelorBG6,
      bachelorBG7,
      bachelorBG8,
      bachelorBG9,
      bachelorBG10
    ],
    tools: ["Figma", "Miro", "Notion"],
    cardStyle,
    media: { type: 'image', src: bachelorBG }
  }
];

export default workData;