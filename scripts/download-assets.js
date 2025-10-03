#!/usr/bin/env node

/**
 * Asset Downloader
 *
 * Downloads images and media files from crawled Wix site
 * Usage: node scripts/download-assets.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const ASSETS_FILE = './migration/assets.json';
const OUTPUT_DIR = './migration/assets';

if (!fs.existsSync(ASSETS_FILE)) {
  console.error('Error: assets.json not found. Run crawl-wix-site.js first.');
  process.exit(1);
}

const assets = JSON.parse(fs.readFileSync(ASSETS_FILE, 'utf-8'));

/**
 * Download a file
 */
function downloadFile(url, outputPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(outputPath);

    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(outputPath, () => {});
      reject(err);
    });
  });
}

/**
 * Get file extension from URL
 */
function getExtension(url) {
  const pathname = new URL(url).pathname;
  const ext = path.extname(pathname);
  return ext || '.jpg';
}

/**
 * Generate safe filename
 */
function getSafeFilename(url, index) {
  const ext = getExtension(url);
  const hash = Buffer.from(url).toString('base64').substring(0, 8);
  return `asset-${index}-${hash}${ext}`;
}

/**
 * Main execution
 */
async function main() {
  console.log('📥 Starting asset download...');
  console.log(`Total assets: ${assets.length}\n`);

  const results = {
    success: 0,
    failed: 0,
    skipped: 0,
  };

  for (let i = 0; i < assets.length; i++) {
    const asset = assets[i];
    const filename = getSafeFilename(asset.url, i);
    const outputPath = path.join(OUTPUT_DIR, filename);

    if (fs.existsSync(outputPath)) {
      console.log(`⏭️  Skipped (exists): ${filename}`);
      results.skipped++;
      continue;
    }

    try {
      await downloadFile(asset.url, outputPath);
      console.log(`✅ Downloaded: ${filename}`);
      results.success++;

      // Update asset reference with local path
      asset.localPath = outputPath;

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`❌ Failed: ${asset.url} - ${error.message}`);
      results.failed++;
    }
  }

  // Save updated assets list with local paths
  fs.writeFileSync(ASSETS_FILE, JSON.stringify(assets, null, 2));

  console.log('\n📊 Download Summary:');
  console.log(`✅ Success: ${results.success}`);
  console.log(`❌ Failed: ${results.failed}`);
  console.log(`⏭️  Skipped: ${results.skipped}`);
  console.log(`\n✨ Assets saved to ${OUTPUT_DIR}/`);
}

main().catch(console.error);
