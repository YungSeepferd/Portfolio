/* eslint-disable no-console */
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

// Ensure chromedriver binary is available on PATH
require('chromedriver');

const DEFAULT_BASE_URL = 'http://localhost:3000';
const HEADLESS = process.env.HEADLESS !== 'false';

async function dismissDevOverlay(driver) {
  try {
    await driver.executeScript(`
      (function() {
        const el = document.getElementById('webpack-dev-server-client-overlay');
        if (el) {
          el.style.display = 'none';
          el.style.pointerEvents = 'none';
          el.setAttribute('aria-hidden', 'true');
        }
      })();
    `);
  } catch (e) {
    // no-op
  }
}

async function clickNavButton(driver, label) {
  const button = await driver.wait(
    until.elementLocated(By.xpath(`//button[normalize-space()='${label}']`)),
    10000
  );

  await driver.executeScript(
    'arguments[0].scrollIntoView({ block: "center", behavior: "instant" });',
    button
  );

  await dismissDevOverlay(driver);

  await driver.wait(until.elementIsVisible(button), 5000);
  await driver.wait(until.elementIsEnabled(button), 5000);

  try {
    await button.click();
  } catch (err) {
    await driver.executeScript('arguments[0].click();', button);
  }
  await driver.sleep(500);
}

async function runModalSectionPipelineTest() {
  const baseUrl = process.env.BASE_URL || DEFAULT_BASE_URL;
  const options = new chrome.Options();

  if (HEADLESS) {
    options.addArguments('--headless=new');
  }

  options.addArguments(
    '--disable-gpu',
    '--no-sandbox',
    '--window-size=1400,900'
  );

  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    await driver.get(baseUrl);
    console.log(`[selenium] Navigating to ${baseUrl}`);

    await dismissDevOverlay(driver);

    // Go to Work
    await clickNavButton(driver, 'Work');
    await driver.wait(until.elementLocated(By.css('#work')), 10000);

    // Open the first project card (Master Thesis is first in data order)
    const projectCards = await driver.wait(
      until.elementsLocated(By.css('[data-testid^="project-card-"]')),
      10000
    );
    const firstCard = projectCards[0];
    await driver.executeScript(
      'arguments[0].scrollIntoView({ block: "center", behavior: "instant" });',
      firstCard
    );
    await driver.wait(until.elementIsVisible(firstCard), 5000);

    const actionArea = await firstCard.findElement(By.css('.MuiCardActionArea-root'));
    await dismissDevOverlay(driver);
    try {
      await actionArea.click();
    } catch (err) {
      await driver.executeScript('arguments[0].click();', actionArea);
    }

    // Wait for modal
    const modal = await driver.wait(
      until.elementLocated(By.css('[data-testid="project-modal"]')),
      10000
    );
    await driver.wait(until.elementIsVisible(modal), 5000);

    // Verify Gallery section exists and has images
    const gallerySection = await driver.wait(
      until.elementLocated(By.css('#section-gallery')),
      10000
    );
    await driver.executeScript('arguments[0].scrollIntoView({ block: "center" });', gallerySection);

    // Within gallery section, expect at least one image
    const galleryImages = await driver.findElements(By.css('#section-gallery img'));
    if (!galleryImages.length) {
      throw new Error('Expected at least one image inside #section-gallery');
    }

    console.log(`[selenium] Gallery section found with ${galleryImages.length} image(s)`);

    // Verify Timeline section exists (Methodology timeline)
    const timelineSection = await driver.wait(
      until.elementLocated(By.css('#section-methodology')),
      10000
    );
    await driver.executeScript('arguments[0].scrollIntoView({ block: "center" });', timelineSection);

    // Check presence of MUI Timeline root under timeline section
    const timelineRoots = await driver.findElements(By.css('#section-methodology .MuiTimeline-root'));
    if (!timelineRoots.length) {
      console.warn('[selenium] MuiTimeline-root not found; verifying section presence only');
    } else {
      console.log('[selenium] Timeline section rendered');
    }

    // Close modal
    const closeButton = await driver.wait(
      until.elementLocated(By.css('[data-testid="project-modal-close"]')),
      5000
    );
    await closeButton.click();
    await driver.wait(until.stalenessOf(modal), 10000);

    console.log('[selenium] Modal section pipeline test passed');
  } finally {
    await driver.quit();
  }
}

if (require.main === module) {
  runModalSectionPipelineTest().catch((error) => {
    console.error('[selenium] Modal section pipeline test failed:', error);
    process.exitCode = 1;
  });
}

module.exports = { runModalSectionPipelineTest };
