import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { PNG } from 'pngjs';
import GIFEncoder from 'gif-encoder-2';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SCREENSHOTS_DIR = path.join(__dirname, '../demo-screenshots');
const OUTPUT_FILE = path.join(__dirname, '../docs/demo.gif');
const FRAME_DELAY = 1500; // ms per frame in GIF

async function createGif() {
  // Ensure output directory exists
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Get all PNG files sorted by name
  const files = fs.readdirSync(SCREENSHOTS_DIR)
    .filter(f => f.endsWith('.png'))
    .sort();

  if (files.length === 0) {
    console.error('No screenshots found! Run record-demo.ts first.');
    process.exit(1);
  }

  console.log(`Found ${files.length} screenshots`);

  // Read first image to get dimensions
  const firstImagePath = path.join(SCREENSHOTS_DIR, files[0]);
  const firstImage = PNG.sync.read(fs.readFileSync(firstImagePath));
  const { width, height } = firstImage;

  console.log(`Creating GIF: ${width}x${height}`);

  // Create GIF encoder
  const encoder = new GIFEncoder(width, height, 'neuquant', true);
  encoder.setDelay(FRAME_DELAY);
  encoder.setQuality(10); // Lower = better quality, slower
  encoder.setRepeat(0); // 0 = loop forever

  // Start encoding
  encoder.start();

  // Add each frame
  for (const file of files) {
    const imagePath = path.join(SCREENSHOTS_DIR, file);
    console.log(`Adding frame: ${file}`);

    const png = PNG.sync.read(fs.readFileSync(imagePath));
    encoder.addFrame(png.data);
  }

  // Finish encoding
  encoder.finish();

  // Write to file
  const buffer = encoder.out.getData();
  fs.writeFileSync(OUTPUT_FILE, buffer);

  console.log(`\nGIF created successfully!`);
  console.log(`Output: ${OUTPUT_FILE}`);
  console.log(`Size: ${(buffer.length / 1024 / 1024).toFixed(2)} MB`);
}

createGif().catch(console.error);
