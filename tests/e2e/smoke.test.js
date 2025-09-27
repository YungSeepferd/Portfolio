/* eslint-disable no-console */
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

// Ensure chromedriver binary is available on PATH
require('chromedriver');

const DEFAULT_BASE_URL = 'http://localhost:3000';
const HEADLESS = process.env.HEADLESS !== 'false';

async function dismissDevOverlay(driver) {
  // CRA/webpack overlay can sporadically cover the page on warnings; hide it if present
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
    // no-op; overlay not present or cannot be manipulated
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

  // Use JS click as a fallback to avoid interception by transient overlays
  try {
    await button.click();
  } catch (err) {
    await driver.executeScript('arguments[0].click();', button);
  }
  await driver.sleep(500);
}

async function runSmokeTest() {
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

    await driver.wait(until.elementLocated(By.css('#hero')), 15000);
    const heroTitleEls = await driver.findElements(By.css('#hero h1, #hero h2'));
    if (heroTitleEls.length) {
      console.log(`[selenium] Hero heading: ${await heroTitleEls[0].getText()}`);
    }

    await clickNavButton(driver, 'Work');
    await driver.wait(until.elementLocated(By.css('#work')), 10000);
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
    // Click the inner CardActionArea to ensure the onClick handler fires
    const actionArea = await firstCard.findElement(By.css('.MuiCardActionArea-root'));
    await dismissDevOverlay(driver);
    try {
      await actionArea.click();
    } catch (err) {
      await driver.executeScript('arguments[0].click();', actionArea);
    }

    const modal = await driver.wait(
      until.elementLocated(By.css('[data-testid="project-modal"]')),
      10000
    );
    await driver.wait(until.elementIsVisible(modal), 5000);

    const modalHeadingEls = await modal.findElements(By.css('h1, h2, h3'));
    if (modalHeadingEls.length) {
      console.log(`[selenium] Opened project modal: ${await modalHeadingEls[0].getText()}`);
    }

    const closeButton = await driver.wait(
      until.elementLocated(By.css('[data-testid="project-modal-close"]')),
      5000
    );
    await closeButton.click();
    await driver.wait(until.stalenessOf(modal), 10000);

    await clickNavButton(driver, 'About');
    const aboutHeading = await driver.wait(
      until.elementLocated(By.css('#about h1, #about h2, #about h3')),
      10000
    );
    console.log(`[selenium] About section heading: ${await aboutHeading.getText()}`);

    await clickNavButton(driver, 'Contact');
    const contactSection = await driver.wait(
      until.elementLocated(By.css('#contact')),
      10000
    );
    await driver.wait(until.elementIsVisible(contactSection), 5000);
    console.log('[selenium] Contact section visible');

    console.log('[selenium] End-to-end navigation succeeded');
  } finally {
    await driver.quit();
  }
}

if (require.main === module) {
  runSmokeTest().catch((error) => {
    console.error('[selenium] Smoke test failed:', error);
    process.exitCode = 1;
  });
}

module.exports = { runSmokeTest };
