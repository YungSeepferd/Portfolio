/**
 * Manual Modal Check
 * Simple script to verify modal functionality and capture screenshots
 */

const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:3000';
const SCREENSHOT_DIR = path.join(__dirname, '../../screenshots/manual-check');

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function manualCheck() {
  console.log('🔍 Manual Modal Check\n');

  const options = new chrome.Options();
  options.addArguments('--headless');
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');
  options.addArguments('--window-size=1920,1080');

  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    await driver.get(BASE_URL);
    console.log('✓ Loaded homepage');
    await driver.sleep(3000);

    // Screenshot 1: Homepage
    let screenshot = await driver.takeScreenshot();
    fs.writeFileSync(path.join(SCREENSHOT_DIR, '01-homepage.png'), screenshot, 'base64');
    console.log('✓ Homepage screenshot saved');

    // Check page structure
    const pageInfo = await driver.executeScript(`
      return {
        title: document.title,
        sections: Array.from(document.querySelectorAll('[id]')).map(el => el.id),
        projectCards: document.querySelectorAll('.project-card, [class*="ProjectCard"], [class*="project"]').length,
        allClasses: Array.from(document.querySelectorAll('[class*="project"]')).map(el => el.className).slice(0, 10)
      };
    `);

    console.log('\n📄 Page Info:');
    console.log('  Title:', pageInfo.title);
    console.log('  Sections:', pageInfo.sections.join(', '));
    console.log('  Project cards found:', pageInfo.projectCards);
    console.log('  Sample classes:', pageInfo.allClasses);

    // Try to find Work section
    await driver.executeScript(`
      const sections = document.querySelectorAll('section, [id]');
      for (const section of sections) {
        const text = section.textContent.toLowerCase();
        if (text.includes('work') || text.includes('project')) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
          break;
        }
      }
    `);
    await driver.sleep(2000);

    // Screenshot 2: After scroll
    screenshot = await driver.takeScreenshot();
    fs.writeFileSync(path.join(SCREENSHOT_DIR, '02-after-scroll.png'), screenshot, 'base64');
    console.log('✓ After scroll screenshot saved');

    // Try multiple selectors
    const selectors = [
      '.project-card',
      '[class*="ProjectCard"]',
      '[class*="project"]',
      'article',
      '[role="article"]',
      'a[href*="project"]'
    ];

    let foundElement = null;
    for (const selector of selectors) {
      try {
        const elements = await driver.findElements(By.css(selector));
        if (elements.length > 0) {
          console.log(`\n✓ Found ${elements.length} elements with selector: ${selector}`);
          foundElement = elements[0];
          break;
        }
      } catch (e) {
        // Continue
      }
    }

    if (foundElement) {
      console.log('\n🎯 Clicking first element...');
      await foundElement.click();
      await driver.sleep(2000);

      // Screenshot 3: After click
      screenshot = await driver.takeScreenshot();
      fs.writeFileSync(path.join(SCREENSHOT_DIR, '03-after-click.png'), screenshot, 'base64');
      console.log('✓ After click screenshot saved');

      // Check modal
      const modalInfo = await driver.executeScript(`
        const modal = document.querySelector('[role="dialog"], [class*="Modal"], [class*="modal"]');
        if (!modal) return { found: false };

        const metaBar = document.querySelector('[class*="MetaBar"], [class*="metabar"]');
        const techChips = document.querySelectorAll('[class*="Chip"], .MuiChip-root');
        const buttons = document.querySelectorAll('button');

        return {
          found: true,
          modalVisible: window.getComputedStyle(modal).display !== 'none',
          metaBarFound: metaBar !== null,
          techChipsCount: techChips.length,
          buttonsCount: buttons.length,
          firstChipStyle: techChips[0] ? {
            background: window.getComputedStyle(techChips[0]).backgroundColor,
            backdropFilter: window.getComputedStyle(techChips[0]).backdropFilter
          } : null
        };
      `);

      console.log('\n📊 Modal Info:');
      console.log('  Modal found:', modalInfo.found);
      if (modalInfo.found) {
        console.log('  Modal visible:', modalInfo.modalVisible);
        console.log('  MetaBar found:', modalInfo.metaBarFound);
        console.log('  Tech chips:', modalInfo.techChipsCount);
        console.log('  Buttons:', modalInfo.buttonsCount);
        if (modalInfo.firstChipStyle) {
          console.log('  First chip background:', modalInfo.firstChipStyle.background);
          console.log('  First chip backdrop-filter:', modalInfo.firstChipStyle.backdropFilter);
        }
      }

      // Scroll in modal
      await driver.executeScript('window.scrollBy(0, 200)');
      await driver.sleep(1000);

      // Screenshot 4: Modal scrolled
      screenshot = await driver.takeScreenshot();
      fs.writeFileSync(path.join(SCREENSHOT_DIR, '04-modal-scrolled.png'), screenshot, 'base64');
      console.log('✓ Modal scrolled screenshot saved');

      // Full page
      screenshot = await driver.takeScreenshot();
      fs.writeFileSync(path.join(SCREENSHOT_DIR, '05-modal-fullpage.png'), screenshot, 'base64');
      console.log('✓ Full page screenshot saved');

    } else {
      console.log('\n❌ No clickable elements found');
    }

    console.log(`\n✅ Check complete! Screenshots in: ${SCREENSHOT_DIR}\n`);

  } catch (error) {
    console.error('\n❌ Error:', error.message);
  } finally {
    await driver.quit();
  }
}

manualCheck().catch(console.error);
