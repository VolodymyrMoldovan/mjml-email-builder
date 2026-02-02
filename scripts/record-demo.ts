import { chromium } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEMO_URL = 'http://localhost:3002';
const OUTPUT_DIR = path.join(__dirname, '../demo-screenshots');
const FRAME_DELAY = 800; // ms between actions

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function recordDemo() {
  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Clear existing screenshots
  const files = fs.readdirSync(OUTPUT_DIR);
  for (const file of files) {
    if (file.endsWith('.png')) {
      fs.unlinkSync(path.join(OUTPUT_DIR, file));
    }
  }

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
  });
  const page = await context.newPage();

  let frameCount = 0;
  const screenshot = async (name: string) => {
    const filename = `${String(frameCount).padStart(3, '0')}-${name}.png`;
    await page.screenshot({ path: path.join(OUTPUT_DIR, filename) });
    frameCount++;
    console.log(`Captured: ${filename}`);
  };

  try {
    // Navigate to the demo page
    console.log('Opening email builder...');
    await page.goto(DEMO_URL);
    await page.waitForSelector('.email-builder');
    await sleep(1000);
    await screenshot('initial');

    // Click on Section button to add a section
    console.log('Adding first section...');
    await page.click('button:has-text("Section")');
    await sleep(FRAME_DELAY);
    await screenshot('section-added');

    // Add a Hero section
    console.log('Adding hero section...');
    await page.click('button:has-text("Hero")');
    await sleep(FRAME_DELAY);
    await screenshot('hero-added');

    // The hero is auto-selected, capture the property panel
    console.log('Property panel visible...');
    await sleep(300);
    await screenshot('property-panel');

    // Switch to Code view
    console.log('Showing code view...');
    await page.click('button:has-text("Code")');
    await sleep(FRAME_DELAY);
    await screenshot('code-view');

    // Switch to Preview view
    console.log('Showing preview...');
    await page.click('button:has-text("Preview")');
    await sleep(FRAME_DELAY);
    await screenshot('preview-desktop');

    // Switch to mobile preview
    console.log('Mobile preview...');
    await page.click('button:has-text("Mobile")');
    await sleep(FRAME_DELAY);
    await screenshot('preview-mobile');

    // Switch back to desktop
    console.log('Desktop preview...');
    await page.click('button:has-text("Desktop")');
    await sleep(FRAME_DELAY);
    await screenshot('preview-desktop-final');

    // Back to Design view
    console.log('Back to design view...');
    await page.click('button:has-text("Design")');
    await sleep(FRAME_DELAY);
    await screenshot('design-final');

    // Load a template
    console.log('Loading template...');
    const templateSelect = page.locator('select').first();
    if (await templateSelect.isVisible({ timeout: 2000 }).catch(() => false)) {
      await templateSelect.selectOption({ index: 1 });
      await sleep(FRAME_DELAY);
      await screenshot('template-loaded');
    }

    console.log(`\nDemo recording complete! ${frameCount} frames captured.`);
    console.log(`Screenshots saved to: ${OUTPUT_DIR}`);

  } catch (error) {
    console.error('Error during recording:', error);
    await page.screenshot({ path: path.join(OUTPUT_DIR, 'error.png') });
  } finally {
    await browser.close();
  }
}

recordDemo();
