import { chromium, Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEMO_URL = process.env.DEMO_URL || 'http://localhost:3000';
const OUTPUT_DIR = path.join(__dirname, '../demo-screenshots');
const FRAME_DELAY = 900;

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function waitForRender(page: Page) {
  await page.waitForLoadState('networkidle').catch(() => {});
  await sleep(250);
}

async function clickToolbarElement(page: Page, label: string) {
  const btn = page.locator('button.element-item', { hasText: new RegExp(`^\\s*${label}\\s*$`) }).first();
  await btn.scrollIntoViewIfNeeded();
  await btn.click();
}

async function recordDemo() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  for (const file of fs.readdirSync(OUTPUT_DIR)) {
    if (file.endsWith('.png')) {
      fs.unlinkSync(path.join(OUTPUT_DIR, file));
    }
  }

  const browser = await chromium.launch({ headless: process.env.HEADLESS !== '0' });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  let frameCount = 0;
  const screenshot = async (name: string) => {
    const filename = `${String(frameCount).padStart(3, '0')}-${name}.png`;
    await page.screenshot({ path: path.join(OUTPUT_DIR, filename) });
    frameCount++;
    console.log(`Captured: ${filename}`);
  };

  try {
    console.log(`Opening ${DEMO_URL} ...`);
    await page.goto(DEMO_URL, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.email-builder', { timeout: 10_000 });
    await waitForRender(page);
    await screenshot('initial-empty');

    console.log('Adding Section...');
    await clickToolbarElement(page, 'Section');
    await waitForRender(page);
    await sleep(FRAME_DELAY);
    await screenshot('section-added');

    console.log('Adding Text...');
    await clickToolbarElement(page, 'Text');
    await waitForRender(page);
    await sleep(FRAME_DELAY);
    await screenshot('text-added');

    console.log('Adding Image...');
    await clickToolbarElement(page, 'Image');
    await waitForRender(page);
    await sleep(FRAME_DELAY);
    await screenshot('image-added');

    console.log('Adding Button...');
    await clickToolbarElement(page, 'Button');
    await waitForRender(page);
    await sleep(FRAME_DELAY);
    await screenshot('button-added');

    console.log('Adding Divider...');
    await clickToolbarElement(page, 'Divider');
    await waitForRender(page);
    await sleep(FRAME_DELAY);
    await screenshot('divider-added');

    console.log('Opening Code tab to show generated MJML...');
    await page.locator('button:has-text("Code")').first().click();
    await waitForRender(page);
    await page.waitForSelector('textarea.code-editor', { timeout: 10_000 });
    await sleep(FRAME_DELAY);
    await screenshot('code-view');

    console.log('Switching to Preview (desktop)...');
    await page.locator('button:has-text("Preview")').first().click();
    await page.waitForSelector('.mjml-preview iframe', { timeout: 10_000 });
    await sleep(1500);
    await screenshot('preview-desktop');

    console.log('Switching preview to Mobile...');
    await page.locator('button:has-text("Mobile")').click();
    await sleep(FRAME_DELAY);
    await screenshot('preview-mobile');

    console.log('Switching preview back to Desktop...');
    await page.locator('button:has-text("Desktop")').click();
    await sleep(FRAME_DELAY);
    await screenshot('preview-desktop-final');

    console.log('Back to Design...');
    await page.locator('button:has-text("Design")').first().click();
    await waitForRender(page);
    await sleep(FRAME_DELAY);
    await screenshot('design-final');

    console.log(`\nDemo recording complete! ${frameCount} frames captured.`);
    console.log(`Screenshots saved to: ${OUTPUT_DIR}`);
  } catch (error) {
    console.error('Error during recording:', error);
    await page.screenshot({ path: path.join(OUTPUT_DIR, 'error.png') });
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
}

recordDemo();
