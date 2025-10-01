/**
 * Puppeteer Modal Screenshot Tool
 * 
 * Captures high-quality screenshots of project modals for design review
 * Complements Playwright tests with Puppeteer-specific features
 * 
 * Run with: node tests/e2e/puppeteer-modal-screenshots.js
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Configuration
const BASE_URL = 'http://localhost:3000';
const SCREENSHOT_DIR = path.join(__dirname, '../../screenshots/puppeteer-review');

// Ensure screenshot directory exists
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

/**
 * Main screenshot capture function
 */
async function captureModalScreenshots() {
  console.log('📸 Starting Puppeteer Modal Screenshot Capture\n');
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  try {
    await page.goto(BASE_URL, { waitUntil: 'networkidle2' });
    await page.waitForTimeout(2000);
    
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, 'desktop-homepage.png')
    });
    console.log('✓ Homepage captured');
    
    const projectCards = await page.$$('.project-card');
    if (projectCards.length > 0) {
      await projectCards[0].click();
      await page.waitForTimeout(2000);
      
      await page.screenshot({
        path: path.join(SCREENSHOT_DIR, 'desktop-modal.png')
      });
      console.log('✓ Modal captured');
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

captureModalScreenshots();
