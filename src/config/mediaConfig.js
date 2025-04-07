/**
 * Media Configuration
 * 
 * This file centralizes all media asset imports and paths to make maintenance easier
 * and prevent path-related errors
 */

// Import project main images - these are guaranteed to exist
import MasterThesisMain from '../assets/images/Masterthesis/Workshop_Room_Setup_defaced.jpg';
import ResonantRelaxationMain from '../assets/images/ProdecualHaptics/ProceduallyGenHaptic.png';
import ADHDeerMain from '../assets/images/ADHDeer/ADHDeer.png';
import GreenWalletMain from '../assets/images/GreenWallet/Greenwallet.png';
import AMIAIMain from '../assets/images/AMIAI/AMIAI.svg';
import BachelorThesisMain from '../assets/images/Bachelorthesis/FT Level 2 GIF.gif';

// Master Thesis additional images
import PrototypingGroupB from '../assets/images/Masterthesis/Prototyping_Group_B_defaced.jpg';
import PrototypingGroupC from '../assets/images/Masterthesis/Prototyping_Group_C_defaced_2.jpeg';
import AP1 from '../assets/images/Masterthesis/AP1.png';
import AP2_2 from '../assets/images/Masterthesis/AP2_defaced_2.png';
import AP2_3 from '../assets/images/Masterthesis/AP2_defaced_3.png';
import CircumplexModel from '../assets/images/Masterthesis/Circumplex Model of Affect.png';
import Phase2_1 from '../assets/images/Masterthesis/Phase 2 - 1 Embodied Metaphor Elicitation and Emotional Object Sharing.jpg';
import Phase2 from '../assets/images/Masterthesis/Phase 2 - Preperation of Templates, Documentation of the Object and Ideas and Sheets for the Prototyping Session.jpg';
import Phase3_1 from '../assets/images/Masterthesis/Phase 3 - 1 Hapticlabs Hardware Kit Setup and Explanation.jpg';
import Phase3_3 from '../assets/images/Masterthesis/Phase 3 - 3 Agenda Feedback and Prototyping Sessions.png';

// Resonant Relaxation additional images
import UIPrototype from '../assets/images/ProdecualHaptics/UI Prototype.png';
import PrincipleSketch from '../assets/images/ProdecualHaptics/PrincipleSketch.png';
import PrincipleVariants from '../assets/images/ProdecualHaptics/PrincipleVariants.png';
import UIPrototypeSketch from '../assets/images/ProdecualHaptics/UI Prototype Sketch.png';
import FrequencyTheory from '../assets/images/ProdecualHaptics/FrequencyTheory.png';
import AIAPIFewshotting from '../assets/images/ProdecualHaptics/AIAPIFewshotting.png';

// AMIAI additional images
import AMIAIIntro from '../assets/images/AMIAI/Final Presentation amiai/Introduction.png';
import AMIAIScene from '../assets/images/AMIAI/Scene.mp4';
import SAMIAI from '../assets/images/AMIAI/5samiai.mov';

// Bachelor Thesis additional images
import PrototypeFlows from '../assets/images/Bachelorthesis/3_prototype_flows_Figmabboard.png';
import Level1STUI from '../assets/images/Bachelorthesis/Level 1 ST UI.png';
import Level2FTUI from '../assets/images/Bachelorthesis/Level 2 FT UI.png';
import Level3FTUI from '../assets/images/Bachelorthesis/Level 3 FT UI.png';
import Level2STUI from '../assets/images/Bachelorthesis/Level 2 ST UI.png';
import Level3STUI from '../assets/images/Bachelorthesis/Level 3 ST UI.png';
import Endscreen from '../assets/images/Bachelorthesis/Endscreen.png';
import Routenuebersicht from '../assets/images/Bachelorthesis/Routenuebersicht.PNG';

// Green Wallet additional images
import CashlessPayment from '../assets/images/GreenWallet/#4 Cashless Payment.png';
import GWHighlightreel from '../assets/images/GreenWallet/Highlightreel.mp4';
import GWPresentation from '../assets/images/GreenWallet/Presentation.mp4';

// Export centralized project media mapping
export const projectMedia = {
  masterThesis: {
    images: {
      main: MasterThesisMain,
      workshopRoomSetup: MasterThesisMain,
      prototypingGroupB: PrototypingGroupB,
      prototypingGroupC: PrototypingGroupC,
      ap1: AP1,
      ap2_2: AP2_2,
      ap2_3: AP2_3,
      circumplexModel: CircumplexModel,
      phase2_1: Phase2_1,
      phase2: Phase2,
      phase3_1: Phase3_1,
      phase3_3: Phase3_3
    },
    allImages: [
      MasterThesisMain,
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
    featuredImages: {
      overview: Phase2,
      problem: CircumplexModel, 
      solution: PrototypingGroupB,
      prototypeShowcase: [PrototypingGroupB, PrototypingGroupC, AP1]
    },
    documents: {
      presentation: '/src/assets/information/Master thesis/Prototyping_Emotions_Thesis_Defense_Presentation_0225.pdf',
      thesis: '/src/assets/information/Master thesis/Vincent_Master_Thesis0225.pdf',
      miroTemplate: 'https://miro.com/app/live-embed/uXjVLZy8Sr4=/?moveToViewport=-23778,-21432,70849,35904&embedId=821121874827'
    }
  },
  resonantRelaxation: {
    images: {
      main: ResonantRelaxationMain,
      uiPrototype: UIPrototype,
      principleSketch: PrincipleSketch,
      principleVariants: PrincipleVariants,
      uiPrototypeSketch: UIPrototypeSketch,
      frequencyTheory: FrequencyTheory,
      aiAPIFewshotting: AIAPIFewshotting
    },
    allImages: [
      ResonantRelaxationMain,
      UIPrototype,
      PrincipleSketch,
      PrincipleVariants,
      UIPrototypeSketch,
      FrequencyTheory,
      AIAPIFewshotting
    ],
    featuredImages: {
      overview: ResonantRelaxationMain,
      problem: FrequencyTheory,
      solution: UIPrototype,
      prototypeShowcase: [PrincipleVariants, UIPrototypeSketch, AIAPIFewshotting]
    },
    documents: {
      presentation: '/src/assets/information/Procedually generated haptics/Affective State Change Concept Presentation.pdf',
      paper: 'https://zenodo.org/records/12549152',
      demo: 'https://react-midi.netlify.app/',
      github: 'https://github.com/NesR0M/Resonant-Relaxation-Project/tree/main'
    }
  },
  adhdeer: {
    images: {
      main: ADHDeerMain
    },
    allImages: [ADHDeerMain],
    featuredImages: {
      overview: ADHDeerMain,
      problem: ADHDeerMain,
      solution: ADHDeerMain,
      prototypeShowcase: [ADHDeerMain]
    },
    documents: {
      presentation: '/src/assets/information/ADHDeer/ADHDeerPresentation.pdf',
      prototype: 'https://embed.figma.com/design/XJZe9gLj6NkgA05QERnsmD/ADHDeer---Group?node-id=0-1&embed-host=share'
    }
  },
  greenWallet: {
    images: {
      main: GreenWalletMain,
      cashlessPayment: CashlessPayment
    },
    allImages: [
      GreenWalletMain,
      CashlessPayment
    ],
    videos: {
      highlightreel: GWHighlightreel,
      presentation: GWPresentation
    },
    featuredImages: {
      overview: GreenWalletMain,
      problem: GreenWalletMain,
      solution: CashlessPayment
    },
    documents: {
      presentation: '/src/assets/information/Master thesis/Prototyping_Emotions_Thesis_Defense_Presentation_0225.pdf',
      prototype: 'https://embed.figma.com/proto/9BlQKTEFOIPKA1qSexIQMP/Mastercard-App--Copy-?node-id=89-9677&starting-point-node-id=89%3A9677&embed-host=share'
    }
  },
  amiai: {
    images: {
      main: AMIAIMain,
      intro: AMIAIIntro
    },
    allImages: [
      AMIAIMain,
      AMIAIIntro
    ],
    videos: {
      scene: AMIAIScene,
      samiai: SAMIAI
    },
    featuredImages: {
      overview: AMIAIIntro,
      problem: AMIAIIntro,
      solution: AMIAIMain
    },
    documents: {
      presentation: '/src/assets/information/AMIAI/Final Presentation.pdf'
    }
  },
  bachelorThesis: {
    images: {
      main: BachelorThesisMain,
      prototypeFlows: PrototypeFlows,
      level1STUI: Level1STUI,
      level2FTUI: Level2FTUI,
      level3FTUI: Level3FTUI,
      level2STUI: Level2STUI,
      level3STUI: Level3STUI,
      endscreen: Endscreen,
      routenuebersicht: Routenuebersicht
    },
    allImages: [
      BachelorThesisMain,
      PrototypeFlows,
      Level1STUI,
      Level2FTUI,
      Level3FTUI,
      Level2STUI,
      Level3STUI,
      Endscreen,
      Routenuebersicht
    ],
    featuredImages: {
      overview: PrototypeFlows,
      problem: Level1STUI,
      solution: Level2FTUI,
      prototypeShowcase: [Level3FTUI, Level2STUI, Level3STUI]
    },
    documents: {
      presentation: '/src/assets/information/Bachelor thesis/PassengerReroute-BachelorThesis.pdf',
      thesis: '/src/assets/information/Bachelor thesis/Vincent_Göke - Phonebased intervention in self-driving cars.pdf'
    }
  }
};

// Helper function to get media path by project and type
export const getMediaPath = (project, type, key) => {
  if (!projectMedia[project]) return null;
  if (!projectMedia[project][type]) return null;
  return projectMedia[project][type][key] || null;
};

// Helper function to get all images for a project
export const getProjectImages = (projectKey) => {
  if (!projectMedia[projectKey]) return [];
  return projectMedia[projectKey].allImages || [];
};

// Helper function to get all document links for a project
export const getProjectDocuments = (projectKey) => {
  if (!projectMedia[projectKey] || !projectMedia[projectKey].documents) return {};
  return projectMedia[projectKey].documents;
};

export default projectMedia;
