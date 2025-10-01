/**
 * Modal Design QA Test Suite
 * 
 * Comprehensive visual and functional testing using Selenium WebDriver
 * Tests responsiveness, design consistency, and UX guidelines compliance
 * 
 * Run with: node tests/e2e/modal-design-qa.test.js
 */

const { Builder, By, until, Key } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');
const path = require('path');

// Test configuration
const BASE_URL = 'http://localhost:3000';
const SCREENSHOT_DIR = path.join(__dirname, '../../screenshots/design-qa');
const TIMEOUT = 10000;

// Viewports to test
const VIEWPORTS = {
  mobile: { width: 375, height: 812, name: 'mobile-375' },
  tablet: { width: 768, height: 1024, name: 'tablet-768' },
  desktop: { width: 1920, height: 1080, name: 'desktop-1920' },
};

// Design guidelines
const GUIDELINES = {
  touchTargets: { minSize: 44 },
  heroHeight: {
    mobile: 400,
    tablet: 500,
    desktop: 600
  },
  contentPadding: {
    mobile: 24,
    tablet: 32,
    desktop: 32
  }
};

// Ensure screenshot directory exists
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

/**
 * Main test runner
 */
async function runDesignQA() {
  console.log('🚀 Starting Modal Design QA Tests\n');
  console.log(`📍 Base URL: ${BASE_URL}`);
  console.log(`📸 Screenshots: ${SCREENSHOT_DIR}\n`);

  const results = {
    passed: 0,
    failed: 0,
    warnings: 0,
    tests: []
  };

  let driver;

  try {
    // Test each viewport
    for (const [viewportName, viewport] of Object.entries(VIEWPORTS)) {
      console.log(`\n${'='.repeat(60)}`);
      console.log(`📱 Testing ${viewportName.toUpperCase()} (${viewport.width}x${viewport.height})`);
      console.log(`${'='.repeat(60)}\n`);

      // Create driver for this viewport
      const options = new chrome.Options();
      options.addArguments('--headless');
      options.addArguments('--no-sandbox');
      options.addArguments('--disable-dev-shm-usage');
      options.addArguments(`--window-size=${viewport.width},${viewport.height}`);

      driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

      await driver.manage().window().setRect({
        width: viewport.width,
        height: viewport.height
      });

      // Run tests for this viewport
      await testViewport(driver, viewport, results);

      await driver.quit();
    }

    // Print summary
    printSummary(results);

  } catch (error) {
    console.error('❌ Test suite failed:', error);
    if (driver) await driver.quit();
    process.exit(1);
  }

  process.exit(results.failed > 0 ? 1 : 0);
}

/**
 * Test specific viewport
 */
async function testViewport(driver, viewport, results) {
  const viewportName = viewport.name;

  try {
    // Navigate to homepage
    await driver.get(BASE_URL);
    await driver.sleep(2000);

    // Screenshot: Homepage
    await takeScreenshot(driver, `${viewportName}-01-homepage.png`);
    console.log(`✓ Captured homepage`);

    // Scroll to Work section
    await driver.executeScript(`
      const workSection = document.querySelector('#work-section, [id*="work"]');
      if (workSection) {
        workSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    `);
    await driver.sleep(1000);

    // Screenshot: Work section
    await takeScreenshot(driver, `${viewportName}-02-work-section.png`);
    console.log(`✓ Captured work section`);

    // Find and click first project card
    const projectCards = await driver.findElements(By.css('.project-card, [class*="ProjectCard"]'));
    if (projectCards.length > 0) {
      await projectCards[0].click();
      await driver.sleep(1500);
      console.log(`✓ Opened project modal`);

      // Run modal tests
      await testModalDesign(driver, viewport, results);
      await testModalResponsiveness(driver, viewport, results);
      await testModalAccessibility(driver, viewport, results);

    } else {
      recordTest(results, 'Project Card Click', 'failed', 'No project cards found', viewportName);
    }

  } catch (error) {
    recordTest(results, 'Viewport Test', 'failed', error.message, viewportName);
  }
}

/**
 * Test modal design compliance
 */
async function testModalDesign(driver, viewport, results) {
  const viewportName = viewport.name;
  const deviceType = viewportName.split('-')[0];
  console.log(`\n📐 Testing Design Compliance...`);

  try {
    // Test 1: Hero section height
    const heroHeight = await driver.executeScript(`
      const hero = document.querySelector('[class*="hero"], [style*="height"]');
      return hero ? hero.offsetHeight : 0;
    `);

    const maxHeight = GUIDELINES.heroHeight[deviceType] || 600;
    if (heroHeight > 0 && heroHeight <= maxHeight) {
      recordTest(results, `Hero Height (${heroHeight}px ≤ ${maxHeight}px)`, 'passed', '', viewportName);
    } else if (heroHeight > maxHeight) {
      recordTest(results, `Hero Height (${heroHeight}px > ${maxHeight}px)`, 'warning', 'Exceeds recommended height', viewportName);
    }

    // Screenshot: Modal hero
    await takeScreenshot(driver, `${viewportName}-03-modal-hero.png`);

    // Test 2: Technology chips
    const techChipsInfo = await driver.executeScript(`
      const container = document.querySelector('[class*="TechnologyTags"], [class*="techChips"]');
      if (!container) return null;

      const chips = container.querySelectorAll('[class*="Chip"], .MuiChip-root');
      const containerStyle = window.getComputedStyle(container);
      
      return {
        count: chips.length,
        overflowX: containerStyle.overflowX,
        flexWrap: containerStyle.flexWrap,
        allSameStyle: Array.from(chips).every((chip, i) => {
          if (i === 0) return true;
          const firstBg = window.getComputedStyle(chips[0]).backgroundColor;
          const thisBg = window.getComputedStyle(chip).backgroundColor;
          return firstBg === thisBg;
        })
      };
    `);

    if (techChipsInfo) {
      if (techChipsInfo.allSameStyle) {
        recordTest(results, 'Tech Chips Consistent Styling', 'passed', 'All chips have same glassmorphic style', viewportName);
      } else {
        recordTest(results, 'Tech Chips Styling', 'warning', 'Chips have inconsistent styling', viewportName);
      }
    }

    // Scroll to action buttons
    await driver.executeScript('window.scrollBy(0, 100)');
    await driver.sleep(500);

    // Screenshot: MetaBar
    await takeScreenshot(driver, `${viewportName}-04-modal-metabar.png`);

    // Test 3: Action buttons
    const actionButtonsInfo = await driver.executeScript(`
      const buttons = document.querySelectorAll('[class*="ActionButton"] button, [class*="ProjectActionButtons"] button, .MuiButton-root');
      const visibleButtons = Array.from(buttons).filter(btn => {
        const rect = btn.getBoundingClientRect();
        const style = window.getComputedStyle(btn);
        return rect.width > 0 && rect.height > 0 && style.display !== 'none';
      });

      return {
        visible: visibleButtons.length,
        sizes: visibleButtons.map(btn => ({
          width: btn.offsetWidth,
          height: btn.offsetHeight
        }))
      };
    `);

    // Test touch target sizes
    const smallTargets = actionButtonsInfo.sizes.filter(size => 
      size.width < GUIDELINES.touchTargets.minSize || 
      size.height < GUIDELINES.touchTargets.minSize
    );

    if (smallTargets.length === 0) {
      recordTest(results, 'Touch Target Sizes (≥44px)', 'passed', '', viewportName);
    } else {
      recordTest(results, 'Touch Target Sizes', 'failed', `${smallTargets.length} buttons below 44px`, viewportName);
    }

    // Test dropdown button exists
    const hasDropdown = await driver.executeScript(`
      const dropdown = document.querySelector('button[aria-haspopup="true"]');
      return dropdown !== null;
    `);

    if (hasDropdown) {
      recordTest(results, 'Split Button Pattern', 'passed', 'Dropdown button found', viewportName);
    }

    // Scroll to content
    await driver.executeScript('window.scrollBy(0, 300)');
    await driver.sleep(500);

    // Screenshot: Content
    await takeScreenshot(driver, `${viewportName}-05-modal-content.png`);

    // Test 4: Content padding
    const contentPadding = await driver.executeScript(`
      const content = document.querySelector('[id*="content"], [class*="content"]');
      if (!content) return null;
      const style = window.getComputedStyle(content);
      return {
        paddingLeft: parseInt(style.paddingLeft),
        paddingRight: parseInt(style.paddingRight)
      };
    `);

    if (contentPadding) {
      const minPadding = GUIDELINES.contentPadding[deviceType] || 24;
      const hasAdequatePadding = 
        contentPadding.paddingLeft >= minPadding && 
        contentPadding.paddingRight >= minPadding;

      if (hasAdequatePadding) {
        recordTest(results, `Content Padding (≥${minPadding}px)`, 'passed', '', viewportName);
      } else {
        recordTest(results, `Content Padding`, 'warning', `L:${contentPadding.paddingLeft}px R:${contentPadding.paddingRight}px`, viewportName);
      }
    }

    // Scroll to footer
    await driver.executeScript('window.scrollTo(0, document.body.scrollHeight)');
    await driver.sleep(500);

    // Screenshot: Footer
    await takeScreenshot(driver, `${viewportName}-06-modal-footer.png`);

    // Full page screenshot
    await driver.executeScript('window.scrollTo(0, 0)');
    await driver.sleep(500);
    await takeScreenshot(driver, `${viewportName}-07-modal-fullpage.png`);

    console.log(`✓ Design compliance tests completed`);

  } catch (error) {
    recordTest(results, 'Design Compliance', 'failed', error.message, viewportName);
  }
}

/**
 * Test modal responsiveness
 */
async function testModalResponsiveness(driver, viewport, results) {
  const viewportName = viewport.name;
  console.log(`\n📱 Testing Responsiveness...`);

  try {
    // Test horizontal scroll
    const hasHorizontalScroll = await driver.executeScript(`
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    `);

    if (!hasHorizontalScroll) {
      recordTest(results, 'No Horizontal Scroll', 'passed', '', viewportName);
    } else {
      recordTest(results, 'Horizontal Scroll', 'failed', 'Page has horizontal overflow', viewportName);
    }

    console.log(`✓ Responsiveness tests completed`);

  } catch (error) {
    recordTest(results, 'Responsiveness', 'failed', error.message, viewportName);
  }
}

/**
 * Test modal accessibility
 */
async function testModalAccessibility(driver, viewport, results) {
  const viewportName = viewport.name;
  console.log(`\n♿ Testing Accessibility...`);

  try {
    // Test modal role
    const hasModalRole = await driver.executeScript(`
      const modal = document.querySelector('[role="dialog"]');
      return modal !== null;
    `);

    if (hasModalRole) {
      recordTest(results, 'Modal ARIA Role', 'passed', '', viewportName);
    } else {
      recordTest(results, 'Modal ARIA Role', 'warning', 'No role="dialog" found', viewportName);
    }

    // Test focusable elements
    const focusableCount = await driver.executeScript(`
      const selectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
      const elements = document.querySelectorAll(selectors);
      return elements.length;
    `);

    if (focusableCount > 0) {
      recordTest(results, `Focusable Elements (${focusableCount})`, 'passed', '', viewportName);
    }

    // Test Escape key
    await driver.actions().sendKeys(Key.ESCAPE).perform();
    await driver.sleep(500);

    const modalClosed = await driver.executeScript(`
      const modal = document.querySelector('[role="dialog"]');
      return modal === null || window.getComputedStyle(modal).display === 'none';
    `);

    if (modalClosed) {
      recordTest(results, 'Escape Key Closes Modal', 'passed', '', viewportName);
    } else {
      recordTest(results, 'Escape Key', 'warning', 'Modal did not close', viewportName);
    }

    console.log(`✓ Accessibility tests completed`);

  } catch (error) {
    recordTest(results, 'Accessibility', 'failed', error.message, viewportName);
  }
}

/**
 * Take screenshot
 */
async function takeScreenshot(driver, filename) {
  const screenshot = await driver.takeScreenshot();
  fs.writeFileSync(path.join(SCREENSHOT_DIR, filename), screenshot, 'base64');
}

/**
 * Record test result
 */
function recordTest(results, testName, status, message, viewport) {
  const result = { testName, status, message, viewport };
  results.tests.push(result);

  if (status === 'passed') {
    results.passed++;
    console.log(`  ✓ ${testName}`);
  } else if (status === 'failed') {
    results.failed++;
    console.log(`  ✗ ${testName}: ${message}`);
  } else if (status === 'warning') {
    results.warnings++;
    console.log(`  ⚠ ${testName}: ${message}`);
  }
}

/**
 * Print test summary
 */
function printSummary(results) {
  console.log(`\n${'='.repeat(60)}`);
  console.log('📊 TEST SUMMARY');
  console.log(`${'='.repeat(60)}\n`);

  console.log(`✓ Passed:   ${results.passed}`);
  console.log(`⚠ Warnings: ${results.warnings}`);
  console.log(`✗ Failed:   ${results.failed}`);
  console.log(`━ Total:    ${results.tests.length}\n`);

  if (results.failed > 0) {
    console.log('❌ FAILED TESTS:');
    results.tests
      .filter(t => t.status === 'failed')
      .forEach(t => console.log(`  - [${t.viewport}] ${t.testName}: ${t.message}`));
    console.log('');
  }

  if (results.warnings > 0) {
    console.log('⚠️  WARNINGS:');
    results.tests
      .filter(t => t.status === 'warning')
      .forEach(t => console.log(`  - [${t.viewport}] ${t.testName}: ${t.message}`));
    console.log('');
  }

  console.log(`📸 Screenshots saved to: ${SCREENSHOT_DIR}\n`);
}

// Run tests
runDesignQA().catch(console.error);
