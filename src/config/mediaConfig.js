/**
 * Media Configuration
 * 
 * Central source for all media paths across the portfolio.
 * Ensures consistent pathing and easy updates.
 */

// Base paths - these should always point to the public directory
export const basePaths = {
  images: '/assets/images',
  documents: '/assets/information',
  videos: '/assets/videos'
};

// Map of project keys to their media assets
export const projectMedia = {
  adhdeer: {
    // Main assets
    heroImage: '/assets/images/projects/adhdeer/adhdeer_hero.jpg',
    thumbnailImage: '/assets/images/projects/adhdeer/adhdeer_thumb.jpg',
    
    // Gallery images
    gallery: [
      '/assets/images/projects/adhdeer/adhdeer_proto1.jpg',
      '/assets/images/projects/adhdeer/adhdeer_proto2.jpg',
      '/assets/images/projects/adhdeer/adhdeer_proto3.jpg'
    ],
    
    // Documents
    documents: {
      presentation: '/assets/information/ADHDeer/ADHDeerPresentation.pdf', // Fixed path format
      prototype: 'https://embed.figma.com/design/XJZe9gLj6NkgA05QERnsmD/ADHDeer---Group?node-id=0-1&embed-host=share'
    }
  },
  
  amiai: {
    // Main assets
    heroImage: '/assets/images/projects/amiai/amiai_hero.jpg',
    thumbnailImage: '/assets/images/projects/amiai/amiai_thumb.jpg',
    
    // Gallery images
    gallery: [
      '/assets/images/projects/amiai/amiai_screen1.jpg',
      '/assets/images/projects/amiai/amiai_screen2.jpg',
      '/assets/images/projects/amiai/amiai_screen3.jpg'
    ],
    
    // Documents
    documents: {
      presentation: '/assets/information/AMIAI/AMIAIPresentation.pdf', // Fixed path format
      prototype: 'https://www.figma.com/proto/JgDxGXlUlmCRJ0JOZfF3fQ/AMI-AI?node-id=323-973'
    }
  },
  
  greenWallet: {
    // Main assets
    heroImage: '/assets/images/projects/greenwallet/greenwallet_hero.jpg',
    thumbnailImage: '/assets/images/projects/greenwallet/greenwallet_thumb.jpg',
    heroVideo: '/assets/images/projects/greenwallet/greenwallet_intro.mp4',
    
    // Gallery images
    gallery: [
      '/assets/images/projects/greenwallet/greenwallet_screen1.jpg',
      '/assets/images/projects/greenwallet/greenwallet_screen2.jpg',
      '/assets/images/projects/greenwallet/greenwallet_screen3.jpg'
    ],
    
    // Documents
    documents: {
      presentation: '/assets/information/GreenWallet/GreenWalletPresentation.pdf', // Fixed path format
      prototype: 'https://www.figma.com/proto/UXFGAGwu0hGVwNtqHIKs0X/GreenWallet?node-id=101-973'
    }
  },
  
  // Additional projects with fixed path formats
  masterThesis: {
    heroImage: '/assets/images/projects/masterthesis/masterthesis_hero.jpg',
    thumbnailImage: '/assets/images/projects/masterthesis/masterthesis_thumb.jpg',
    documents: {
      paper: '/assets/information/MasterThesis/ThesisPaper.pdf', // Fixed path format
      presentation: '/assets/information/MasterThesis/ThesisPresentation.pdf'
    }
  },
  
  bachelorThesis: {
    heroImage: '/assets/images/projects/bachelorthesis/bachelorthesis_hero.jpg',
    thumbnailImage: '/assets/images/projects/bachelorthesis/bachelorthesis_thumb.jpg',
    documents: {
      paper: '/assets/information/BachelorThesis/ThesisPaper.pdf', // Fixed path format
      presentation: '/assets/information/BachelorThesis/ThesisPresentation.pdf'
    }
  },
  
  resonantRelaxation: {
    heroImage: '/assets/images/projects/resonantrelaxation/resonantrelaxation_hero.jpg',
    thumbnailImage: '/assets/images/projects/resonantrelaxation/resonantrelaxation_thumb.jpg',
    heroVideo: '/assets/images/projects/resonantrelaxation/resonantrelaxation_demo.mp4',
    documents: {
      presentation: '/assets/information/ResonantRelaxation/ResonantRelaxationPresentation.pdf' // Fixed path format
    }
  }
};

/**
 * Get media path for a specific project
 * 
 * @param {string} projectKey - The project identifier
 * @param {string} mediaType - Type of media to retrieve (heroImage, thumbnailImage, etc)
 * @returns {string|Array|Object} The requested media path(s)
 */
export const getProjectMedia = (projectKey, mediaType) => {
  const project = projectMedia[projectKey];
  
  if (!project) {
    console.warn(`Project key "${projectKey}" not found in mediaConfig`);
    return null;
  }
  
  if (mediaType && project[mediaType]) {
    return project[mediaType];
  }
  
  return project;
};

export default projectMedia;
