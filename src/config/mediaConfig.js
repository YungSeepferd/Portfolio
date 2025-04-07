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

// Define static paths to other media that might not be imported directly
// Note: We're using relative paths for files that might not exist yet
const mediaBasePath = '/assets/images';

// Export centralized project media mapping
export const projectMedia = {
  masterThesis: {
    images: {
      main: MasterThesisMain,
      workshopRoomSetup: `${mediaBasePath}/Masterthesis/Workshop_Room_Setup_defaced.jpg`,
      prototypingGroupB: `${mediaBasePath}/Masterthesis/Prototyping_Group_B_defaced.jpg`,
      prototypingGroupC: `${mediaBasePath}/Masterthesis/Prototyping_Group_C_defaced_2.jpeg`
    },
    documents: {
      presentation: '/project/masterThesis/Prototyping_Emotions_Thesis_Defense_Presentation_0225.pdf',
      paper: '/project/masterThesis/Vincent_Master_Thesis0225.pdf'
    }
  },
  resonantRelaxation: {
    images: {
      main: ResonantRelaxationMain,
      uiPrototype: `${mediaBasePath}/ProdecualHaptics/UI Prototype.png`,
      principleSketch: `${mediaBasePath}/ProdecualHaptics/PrincipleSketch.png`
    },
    documents: {
      presentation: '/project/resonantRelaxation/Affective State Change Concept Presentation.pdf',
      poster: '/project/resonantRelaxation/POSTER_Resonant Relaxation - Eurohaptics 24.pdf',
      paper: 'https://zenodo.org/records/12549152'
    }
  },
  adhdeer: {
    images: {
      main: ADHDeerMain
    },
    videos: {
      // Use relative URL path instead of direct import to avoid errors if file doesn't exist
      prototype: `${mediaBasePath}/ADHDeer/ADHDeer-VideoPrototype.mp4`
    },
    documents: {
      presentation: '/project/adhdeer/ADHDeerPresentation.pdf'
    }
  },
  greenWallet: {
    images: {
      main: GreenWalletMain,
      // Fix the path to match actual filename or fix spaces in filename
      cashlessPayment: `${mediaBasePath}/GreenWallet/4_Cashless_Payment.png`
    },
    videos: {
      highlightreel: `${mediaBasePath}/GreenWallet/Highlightreel.mp4`,
      presentation: `${mediaBasePath}/GreenWallet/Presentation.mp4`
    },
    documents: {
      presentation: '/project/greenWallet/GreenWallet.pdf'
    }
  },
  amiai: {
    images: {
      main: AMIAIMain,
      intro: `${mediaBasePath}/AMIAI/Final Presentation amiai/Introduction.png`
    },
    videos: {
      scene: `${mediaBasePath}/AMIAI/Scene.mp4`,
      samiai: `${mediaBasePath}/AMIAI/5samiai.mov`
    },
    documents: {
      presentation: '/project/AMIAI/Final Presentation.pdf'
    }
  },
  bachelorThesis: {
    images: {
      main: BachelorThesisMain,
      prototypeFlows: `${mediaBasePath}/Bachelorthesis/3_prototype_flows_Figmabboard.png`
    },
    documents: {
      paper: '/project/bachelorThesis/Vincent_Göke - Phonebased intervention in self-driving cars.pdf',
      presentation: '/project/bachelorThesis/PassengerReroute-BachelorThesis.pdf'
    }
  }
};

// Helper function to get media path by project and type
export const getMediaPath = (project, type, key) => {
  if (!projectMedia[project]) return null;
  if (!projectMedia[project][type]) return null;
  return projectMedia[project][type][key] || null;
};

export default projectMedia;
