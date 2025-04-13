/**
 * Ensure Placeholder Images
 * 
 * This script creates placeholder image folders and files
 * in the expected locations for the media configuration.
 */

// Import required modules
const fs = require('fs');
const path = require('path');

// Define placeholder image directories
const placeholderDirs = [
  'public/assets/images/placeholders',
  'src/assets/images/placeholders',
];

// Define base placeholder files to create
const placeholderFiles = [
  'project.jpg',
  'profile.jpg',
  'hero.jpg',
];

// Main function to create directory and files
function ensurePlaceholderImages() {
  console.log('Creating placeholder image directories and files...');
  
  placeholderDirs.forEach(dir => {
    // Create directory if it doesn't exist
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Created directory: ${dir}`);
    }
    
    // Create placeholder files in the directory
    placeholderFiles.forEach(file => {
      const filePath = path.join(dir, file);
      if (!fs.existsSync(filePath)) {
        // Create a placeholder image file
        // Here we're just creating an empty file, but in a real scenario
        // you might want to copy a default placeholder image
        fs.writeFileSync(filePath, '');
        console.log(`Created placeholder file: ${filePath}`);
      }
    });
  });
  
  console.log('Placeholder images setup complete!');
}

// Run the function
ensurePlaceholderImages();