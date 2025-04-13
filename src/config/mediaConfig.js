/**
 * Project Media Configuration
 * 
 * This file centralizes all project media references to ensure consistency
 * and avoid undefined references.
 */

// Base asset paths by project
const basePaths = {
  masterThesis: '/assets/images/Masterthesis',
  resonantRelaxation: '/assets/images/ProdecualHaptics',
  adhdeer: '/assets/images/ADHDeer',
  amiai: '/assets/images/AMIAI',
  greenWallet: '/assets/images/GreenWallet',
  bachelorThesis: '/assets/images/Bachelorthesis',
};

// Default placeholder image if specific one isn't available
const DEFAULT_PLACEHOLDER = '/assets/images/placeholders/project.jpg';

// Project-specific image paths
export const projectMedia = {
  masterThesis: {
    images: {
      main: `${basePaths.masterThesis}/cover.jpg`,
      overview: `${basePaths.masterThesis}/overview.jpg`,
      process: `${basePaths.masterThesis}/process.jpg`,
      toolkit: `${basePaths.masterThesis}/toolkit.jpg`,
    },
    featuredImages: {
      overview: `${basePaths.masterThesis}/overview.jpg`,
      problem: `${basePaths.masterThesis}/problem.jpg`,
      solution: `${basePaths.masterThesis}/solution.jpg`,
    },
    allImages: [
      `${basePaths.masterThesis}/cover.jpg`,
      `${basePaths.masterThesis}/overview.jpg`,
      `${basePaths.masterThesis}/process.jpg`,
      `${basePaths.masterThesis}/toolkit.jpg`,
    ]
  },
  
  resonantRelaxation: {
    images: {
      main: `${basePaths.resonantRelaxation}/ProceduallyGenHaptic.png`,
      uiPrototype: `${basePaths.resonantRelaxation}/UI Prototype.png`,
      principleSketch: `${basePaths.resonantRelaxation}/PrincipleSketch.png`,
      principleVariants: `${basePaths.resonantRelaxation}/PrincipleVariants.png`,
      uiPrototypeSketch: `${basePaths.resonantRelaxation}/UI Prototype Sketch.png`,
      frequencyTheory: `${basePaths.resonantRelaxation}/FrequencyTheory.png`,
      aiAPIFewshotting: `${basePaths.resonantRelaxation}/AIAPIFewshotting.png`
    },
    featuredImages: {
      overview: `${basePaths.resonantRelaxation}/ProceduallyGenHaptic.png`,
      problem: `${basePaths.resonantRelaxation}/FrequencyTheory.png`,
      solution: `${basePaths.resonantRelaxation}/UI Prototype.png`,
      prototypeShowcase: [
        `${basePaths.resonantRelaxation}/PrincipleVariants.png`, 
        `${basePaths.resonantRelaxation}/UI Prototype Sketch.png`, 
        `${basePaths.resonantRelaxation}/AIAPIFewshotting.png`
      ]
    },
    allImages: [
      `${basePaths.resonantRelaxation}/ProceduallyGenHaptic.png`,
      `${basePaths.resonantRelaxation}/UI Prototype.png`,
      `${basePaths.resonantRelaxation}/PrincipleSketch.png`,
      `${basePaths.resonantRelaxation}/PrincipleVariants.png`,
      `${basePaths.resonantRelaxation}/UI Prototype Sketch.png`,
      `${basePaths.resonantRelaxation}/FrequencyTheory.png`,
      `${basePaths.resonantRelaxation}/AIAPIFewshotting.png`
    ]
  },
  
  adhdeer: {
    images: {
      main: `${basePaths.adhdeer}/hero.jpg`,
      process: `${basePaths.adhdeer}/process.jpg`,
      research: `${basePaths.adhdeer}/research.jpg`,
      wireframes: `${basePaths.adhdeer}/wireframes.jpg`,
    },
    featuredImages: {
      overview: `${basePaths.adhdeer}/hero.jpg`,
      problem: `${basePaths.adhdeer}/process.jpg`,
      solution: `${basePaths.adhdeer}/research.jpg`,
    },
    allImages: [
      `${basePaths.adhdeer}/hero.jpg`,
      `${basePaths.adhdeer}/process.jpg`,
      `${basePaths.adhdeer}/research.jpg`,
      `${basePaths.adhdeer}/wireframes.jpg`
    ]
  },
  
  amiai: {
    images: {
      main: `${basePaths.amiai}/AMIAI.svg`,
      intro: `${basePaths.amiai}/Final Presentation amiai/Introduction.png`,
    },
    videos: {
      scene: `${basePaths.amiai}/Scene.mp4`,
      samiai: `${basePaths.amiai}/5samiai.mov`
    },
    featuredImages: {
      overview: `${basePaths.amiai}/Final Presentation amiai/Introduction.png`,
      problem: `${basePaths.amiai}/Final Presentation amiai/Introduction.png`,
      solution: `${basePaths.amiai}/AMIAI.svg`
    },
    allImages: [
      `${basePaths.amiai}/AMIAI.svg`,
      `${basePaths.amiai}/Final Presentation amiai/Introduction.png`
    ]
  },
  
  greenWallet: {
    images: {
      main: `${basePaths.greenWallet}/hero.jpg`,
      screens: `${basePaths.greenWallet}/screens.jpg`,
      wireframes: `${basePaths.greenWallet}/wireframes.jpg`,
      process: `${basePaths.greenWallet}/process.jpg`,
    },
    videos: {
      highlightreel: `${basePaths.greenWallet}/Highlightreel.mp4`,
      presentation: `${basePaths.greenWallet}/Presentation.mp4`
    },
    featuredImages: {
      overview: `${basePaths.greenWallet}/hero.jpg`,
      problem: `${basePaths.greenWallet}/process.jpg`,
      solution: `${basePaths.greenWallet}/screens.jpg`,
    },
    allImages: [
      `${basePaths.greenWallet}/hero.jpg`,
      `${basePaths.greenWallet}/screens.jpg`,
      `${basePaths.greenWallet}/wireframes.jpg`,
      `${basePaths.greenWallet}/process.jpg`
    ]
  },
  
  bachelorThesis: {
    images: {
      main: `${basePaths.bachelorThesis}/FT Level 2 GIF.gif`,
      prototypeFlows: `${basePaths.bachelorThesis}/3_prototype_flows_Figmabboard.png`,
      level1STUI: `${basePaths.bachelorThesis}/Level 1 ST UI.png`,
      level2FTUI: `${basePaths.bachelorThesis}/Level 2 FT UI.png`,
      level3FTUI: `${basePaths.bachelorThesis}/Level 3 FT UI.png`,
      level2STUI: `${basePaths.bachelorThesis}/Level 2 ST UI.png`,
      level3STUI: `${basePaths.bachelorThesis}/Level 3 ST UI.png`,
      endscreen: `${basePaths.bachelorThesis}/Endscreen.png`,
      routenuebersicht: `${basePaths.bachelorThesis}/Routenuebersicht.PNG`,
    },
    videos: {
      reroutingProcess: `${basePaths.bachelorThesis}/VideoPrototype_ST3.mp4`
    },
    featuredImages: {
      overview: `${basePaths.bachelorThesis}/3_prototype_flows_Figmabboard.png`,
      problem: `${basePaths.bachelorThesis}/Level 1 ST UI.png`,
      solution: `${basePaths.bachelorThesis}/Level 2 FT UI.png`,
    },
    allImages: [
      `${basePaths.bachelorThesis}/FT Level 2 GIF.gif`,
      `${basePaths.bachelorThesis}/3_prototype_flows_Figmabboard.png`,
      `${basePaths.bachelorThesis}/Level 1 ST UI.png`,
      `${basePaths.bachelorThesis}/Level 2 FT UI.png`,
      `${basePaths.bachelorThesis}/Level 3 FT UI.png`,
      `${basePaths.bachelorThesis}/Level 2 ST UI.png`,
      `${basePaths.bachelorThesis}/Level 3 ST UI.png`,
      `${basePaths.bachelorThesis}/Endscreen.png`,
      `${basePaths.bachelorThesis}/Routenuebersicht.PNG`
    ]
  }
};

// Helper functions to get media paths
export const getProjectMediaPath = (projectId, mediaType = 'images', mediaItem = 'main') => {
  if (!projectMedia[projectId]) {
    console.warn(`Project media not found for: ${projectId}`);
    return DEFAULT_PLACEHOLDER;
  }
  
  if (!projectMedia[projectId][mediaType]) {
    console.warn(`Media type "${mediaType}" not found for project: ${projectId}`);
    return DEFAULT_PLACEHOLDER;
  }
  
  if (typeof projectMedia[projectId][mediaType] === 'string') {
    return projectMedia[projectId][mediaType];
  }
  
  if (!projectMedia[projectId][mediaType][mediaItem]) {
    console.warn(`Media item "${mediaItem}" not found in ${mediaType} for project: ${projectId}`);
    return DEFAULT_PLACEHOLDER;
  }
  
  return projectMedia[projectId][mediaType][mediaItem];
};

// Helper to get all image paths for a project
export const getProjectImages = (projectId) => {
  if (!projectMedia[projectId] || !projectMedia[projectId].allImages) {
    console.warn(`Project images not found for: ${projectId}`);
    return [DEFAULT_PLACEHOLDER];
  }
  
  return projectMedia[projectId].allImages;
};

// Helper to get featured images for a project
export const getProjectFeaturedImages = (projectId) => {
  if (!projectMedia[projectId] || !projectMedia[projectId].featuredImages) {
    console.warn(`Featured images not found for: ${projectId}`);
    return { 
      overview: DEFAULT_PLACEHOLDER,
      problem: DEFAULT_PLACEHOLDER,
      solution: DEFAULT_PLACEHOLDER
    };
  }
  
  return projectMedia[projectId].featuredImages;
};

// Default export of the entire media configuration
export default projectMedia;
