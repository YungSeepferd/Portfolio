/**
 * Modal Design Review Test Suite
 * 
 * Comprehensive visual and functional testing of project modals
 * Tests responsiveness, design consistency, and UX guidelines compliance
 * 
 * Run with: node tests/e2e/modal-design-review.test.js
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// Test configuration
const BASE_URL = 'http://localhost:3000';
const SCREENSHOT_DIR = path.join(__dirname, '../../screenshots/modal-review');
const VIEWPORTS = {
  mobile: { width: 375, height: 812, name: 'mobile-375' },
  tablet: { width: 768, height: 1024, name: 'tablet-768' },
  desktop: { width: 1920, height: 1080, name: 'desktop-1920' },
};

// Design guidelines from AGENTS.md and mobile-modal-ux-analysis.md
const DESIGN_GUIDELINES = {
  touchTargets: {
    minSize: 44, // Minimum 44x44px for touch targets
    description: 'All interactive elements must be at least 44x44px'
  },
  heroHeight: {
    mobile: { max: 400, target: 350 },
    tablet: { max: 500, target: 450 },
    desktop: { max: 600, target: 520 },
    description: 'Hero section should not exceed maximum heights'
  },
  techChips: {
    mobile: { layout: 'horizontal-scroll', maxVisible: 'all' },
    tablet: { layout: 'wrap', maxVisible: 'all' },
    desktop: { layout: 'wrap', maxVisible: 'all' },
    description: 'Technology chips should scroll horizontally on mobile, wrap on larger screens'
  },
  actionButtons: {
    mobile: { maxVisible: 2, layout: 'column' },
    tablet: { maxVisible: 3, layout: 'row' },
    desktop: { maxVisible: 6, layout: 'row' },
    description: 'Action buttons should be limited based on screen size'
  },
  contentPadding: {
    mobile: { min: 24 },
    tablet: { min: 32 },
    desktop: { min: 32 },
    description: 'Content should have adequate padding for readability'
  },
  glassmorphicStyle: {
    backdrop: 'blur',
    opacity: 'rgba',
    description: 'Chips and buttons should have glassmorphic styling'
  }
};

// Ensure screenshot directory exists
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

/**
 * Main test runner
 */
async function runModalDesignReview() {
  console.log('🚀 Starting Modal Design Review Tests\n');
  console.log(`📍 Base URL: ${BASE_URL}`);
  console.log(`📸 Screenshots: ${SCREENSHOT_DIR}\n`);

  const browser = await chromium.launch({ headless: true });
  const results = {
    passed: 0,
    failed: 0,
    warnings: 0,
    tests: []
  };

  try {
    // Test each viewport
    for (const [viewportName, viewport] of Object.entries(VIEWPORTS)) {
      console.log(`\n${'='.repeat(60)}`);
      console.log(`📱 Testing ${viewportName.toUpperCase()} (${viewport.width}x${viewport.height})`);
      console.log(`${'='.repeat(60)}\n`);

      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        deviceScaleFactor: viewportName === 'mobile' ? 2 : 1,
      });

      const page = await context.newPage();

      // Run tests for this viewport
      await testModalAtViewport(page, viewport, results);

      await context.close();
    }

    // Print summary
    printSummary(results);

  } catch (error) {
    console.error('❌ Test suite failed:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }

  // Exit with appropriate code
  process.exit(results.failed > 0 ? 1 : 0);
}

/**
 * Test modal at specific viewport
 */
async function testModalAtViewport(page, viewport, results) {
  const viewportName = viewport.name;

  try {
    // Navigate to home page
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000); // Wait for animations

    // Screenshot: Home page
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${viewportName}-01-homepage.png`),
      fullPage: false
    });
    console.log(`✓ Captured homepage screenshot`);

    // Scroll to Work section
    await page.evaluate(() => {
      const workSection = document.querySelector('#work-section, [id*="work"]');
      if (workSection) {
        workSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
    await page.waitForTimeout(1000);

    // Screenshot: Work section
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${viewportName}-02-work-section.png`),
      fullPage: false
    });
    console.log(`✓ Captured work section screenshot`);

    // Find and click first project card
    const projectCard = await page.locator('.project-card, [class*="ProjectCard"]').first();
    if (await projectCard.count() > 0) {
      await projectCard.click();
      await page.waitForTimeout(1500); // Wait for modal animation
      console.log(`✓ Opened project modal`);

      // Run modal tests
      await testModalDesign(page, viewport, results);
      await testModalResponsiveness(page, viewport, results);
      await testModalAccessibility(page, viewport, results);
      await testModalInteractivity(page, viewport, results);

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
async function testModalDesign(page, viewport, results) {
  const viewportName = viewport.name;
  console.log(`\n📐 Testing Design Compliance...`);

  try {
    // Test 1: Hero section height
    const heroHeight = await page.evaluate(() => {
      const hero = document.querySelector('[class*="hero"], [style*="height"]');
      return hero ? hero.offsetHeight : 0;
    });

    const maxHeight = DESIGN_GUIDELINES.heroHeight[viewportName.split('-')[0]]?.max || 600;
    if (heroHeight > 0 && heroHeight <= maxHeight) {
      recordTest(results, `Hero Height (${heroHeight}px ≤ ${maxHeight}px)`, 'passed', '', viewportName);
    } else if (heroHeight > maxHeight) {
      recordTest(results, `Hero Height (${heroHeight}px > ${maxHeight}px)`, 'warning', 'Exceeds recommended height', viewportName);
    }

    // Screenshot: Modal hero
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${viewportName}-03-modal-hero.png`),
      fullPage: false
    });

    // Test 2: Technology chips layout
    const techChipsInfo = await page.evaluate(() => {
      const container = document.querySelector('[class*="TechnologyTags"], [class*="techChips"]');
      if (!container) return null;

      const chips = container.querySelectorAll('[class*="Chip"], .MuiChip-root');
      const containerStyle = window.getComputedStyle(container);
      
      return {
        count: chips.length,
        overflowX: containerStyle.overflowX,
        flexWrap: containerStyle.flexWrap,
        display: containerStyle.display,
        firstChipStyle: chips[0] ? {
          background: window.getComputedStyle(chips[0]).backgroundColor,
          border: window.getComputedStyle(chips[0]).border,
          backdropFilter: window.getComputedStyle(chips[0]).backdropFilter
        } : null
      };
    });

    if (techChipsInfo) {
      const isMobile = viewportName.includes('mobile');
      const expectedOverflow = isMobile ? 'auto' : 'visible';
      
      if (techChipsInfo.overflowX === expectedOverflow || (isMobile && techChipsInfo.overflowX !== 'visible')) {
        recordTest(results, `Tech Chips Layout (${techChipsInfo.overflowX})`, 'passed', '', viewportName);
      } else {
        recordTest(results, `Tech Chips Layout`, 'warning', `Expected ${expectedOverflow}, got ${techChipsInfo.overflowX}`, viewportName);
      }

      // Check glassmorphic styling
      if (techChipsInfo.firstChipStyle?.backdropFilter && techChipsInfo.firstChipStyle.backdropFilter.includes('blur')) {
        recordTest(results, 'Glassmorphic Styling', 'passed', 'Backdrop blur detected', viewportName);
      } else {
        recordTest(results, 'Glassmorphic Styling', 'warning', 'Backdrop blur not detected', viewportName);
      }
    }

    // Scroll to see action buttons
    await page.evaluate(() => window.scrollBy(0, 100));
    await page.waitForTimeout(500);

    // Screenshot: Tech chips and action buttons
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${viewportName}-04-modal-metabar.png`),
      fullPage: false
    });

    // Test 3: Action buttons count and layout
    const actionButtonsInfo = await page.evaluate(() => {
      const buttons = document.querySelectorAll('[class*="ActionButton"], [class*="ProjectActionButtons"] button, .MuiButton-root');
      const visibleButtons = Array.from(buttons).filter(btn => {
        const rect = btn.getBoundingClientRect();
        const style = window.getComputedStyle(btn);
        return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
      });

      return {
        total: buttons.length,
        visible: visibleButtons.length,
        sizes: visibleButtons.map(btn => ({
          width: btn.offsetWidth,
          height: btn.offsetHeight
        }))
      };
    });

    const deviceType = viewportName.split('-')[0];
    const maxVisible = DESIGN_GUIDELINES.actionButtons[deviceType]?.maxVisible || 6;
    
    if (actionButtonsInfo.visible <= maxVisible) {
      recordTest(results, `Action Buttons Count (${actionButtonsInfo.visible} ≤ ${maxVisible})`, 'passed', '', viewportName);
    } else {
      recordTest(results, `Action Buttons Count`, 'warning', `${actionButtonsInfo.visible} visible, expected ≤ ${maxVisible}`, viewportName);
    }

    // Test 4: Touch target sizes
    const smallTargets = actionButtonsInfo.sizes.filter(size => 
      size.width < DESIGN_GUIDELINES.touchTargets.minSize || 
      size.height < DESIGN_GUIDELINES.touchTargets.minSize
    );

    if (smallTargets.length === 0) {
      recordTest(results, 'Touch Target Sizes (≥44px)', 'passed', '', viewportName);
    } else {
      recordTest(results, 'Touch Target Sizes', 'failed', `${smallTargets.length} buttons below 44px`, viewportName);
    }

    // Scroll to content
    await page.evaluate(() => window.scrollBy(0, 300));
    await page.waitForTimeout(500);

    // Screenshot: Modal content
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${viewportName}-05-modal-content.png`),
      fullPage: false
    });

    // Test 5: Content padding
    const contentPadding = await page.evaluate(() => {
      const content = document.querySelector('[id*="content"], [class*="content"]');
      if (!content) return null;
      const style = window.getComputedStyle(content);
      return {
        paddingLeft: parseInt(style.paddingLeft),
        paddingRight: parseInt(style.paddingRight),
        paddingTop: parseInt(style.paddingTop),
        paddingBottom: parseInt(style.paddingBottom)
      };
    });

    if (contentPadding) {
      const minPadding = DESIGN_GUIDELINES.contentPadding[deviceType]?.min || 24;
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
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    // Screenshot: Modal footer
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${viewportName}-06-modal-footer.png`),
      fullPage: false
    });

    // Full page screenshot
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${viewportName}-07-modal-fullpage.png`),
      fullPage: true
    });

    console.log(`✓ Design compliance tests completed`);

  } catch (error) {
    recordTest(results, 'Design Compliance', 'failed', error.message, viewportName);
  }
}

/**
 * Test modal responsiveness
 */
async function testModalResponsiveness(page, viewport, results) {
  const viewportName = viewport.name;
  console.log(`\n📱 Testing Responsiveness...`);

  try {
    // Test modal width
    const modalWidth = await page.evaluate(() => {
      const modal = document.querySelector('[role="dialog"], [class*="Modal"]');
      return modal ? modal.offsetWidth : 0;
    });

    const viewportWidth = viewport.width;
    const expectedMaxWidth = viewportWidth * 0.95; // 95vw max

    if (modalWidth > 0 && modalWidth <= expectedMaxWidth) {
      recordTest(results, `Modal Width (${modalWidth}px ≤ ${expectedMaxWidth}px)`, 'passed', '', viewportName);
    } else if (modalWidth > expectedMaxWidth) {
      recordTest(results, `Modal Width`, 'warning', `${modalWidth}px exceeds 95vw`, viewportName);
    }

    // Test horizontal scroll (should not exist)
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });

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
async function testModalAccessibility(page, viewport, results) {
  const viewportName = viewport.name;
  console.log(`\n♿ Testing Accessibility...`);

  try {
    // Test modal role
    const hasModalRole = await page.evaluate(() => {
      const modal = document.querySelector('[role="dialog"]');
      return modal !== null;
    });

    if (hasModalRole) {
      recordTest(results, 'Modal ARIA Role', 'passed', '', viewportName);
    } else {
      recordTest(results, 'Modal ARIA Role', 'warning', 'No role="dialog" found', viewportName);
    }

    // Test focus management
    const focusableElements = await page.evaluate(() => {
      const selectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
      const elements = document.querySelectorAll(selectors);
      return elements.length;
    });

    if (focusableElements > 0) {
      recordTest(results, `Focusable Elements (${focusableElements})`, 'passed', '', viewportName);
    }

    // Test keyboard navigation (Escape key)
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);

    const modalClosed = await page.evaluate(() => {
      const modal = document.querySelector('[role="dialog"]');
      return modal === null || window.getComputedStyle(modal).display === 'none';
    });

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
 * Test modal interactivity
 */
async function testModalInteractivity(page, viewport, results) {
  const viewportName = viewport.name;
  console.log(`\n🖱️  Testing Interactivity...`);

  try {
    // Reopen modal for interactivity tests
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    const projectCard = await page.locator('.project-card, [class*="ProjectCard"]').first();
    if (await projectCard.count() > 0) {
      await projectCard.click();
      await page.waitForTimeout(1500);

      // Test dropdown menu (if exists)
      const dropdownButton = await page.locator('button[aria-haspopup="true"], button:has-text("▼")').first();
      if (await dropdownButton.count() > 0) {
        await dropdownButton.click();
        await page.waitForTimeout(500);

        const menuVisible = await page.evaluate(() => {
          const menu = document.querySelector('[role="menu"]');
          return menu && window.getComputedStyle(menu).display !== 'none';
        });

        if (menuVisible) {
          recordTest(results, 'Dropdown Menu Opens', 'passed', '', viewportName);
          
          // Screenshot: Dropdown menu
          await page.screenshot({
            path: path.join(SCREENSHOT_DIR, `${viewportName}-08-dropdown-menu.png`),
            fullPage: false
          });

          // Close menu
          await page.keyboard.press('Escape');
          await page.waitForTimeout(300);
        }
      }

      console.log(`✓ Interactivity tests completed`);
    }

  } catch (error) {
    recordTest(results, 'Interactivity', 'failed', error.message, viewportName);
  }
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
runModalDesignReview().catch(console.error);
