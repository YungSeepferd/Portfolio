/**
 * DEPRECATED: This file is maintained for backward compatibility.
 * Please use the modular project files in /components/work/data/projects/ instead.
 * 
 * This file now re-exports the processed project data from the modular structure.
 */

import LaunchIcon from '@mui/icons-material/Launch';
import GitHubIcon from '@mui/icons-material/GitHub';
import ArticleIcon from '@mui/icons-material/Article';
import DesignIcon from '@mui/icons-material/DesignServices';
// Removed PictureAsPdfIcon import as it's unused

// Import and re-export from the modular structure
import { workData, skillTags } from '../work/data';

// Export for backward compatibility
export { skillTags };
export default workData;