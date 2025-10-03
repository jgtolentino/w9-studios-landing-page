#!/usr/bin/env node

/**
 * Wix Site Crawler
 *
 * Extracts content, assets, and structure from existing Wix site
 * Usage: node scripts/crawl-wix-site.js --url https://your-site.wix.com
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const { URL } = require('url');

// Configuration
const CONFIG = {
  outputDir: './migration',
  assetsDir: './migration/assets',
  maxDepth: 3,
  delay: 1000, // ms between requests to avoid rate limiting
};

// CLI Arguments
const args = process.argv.slice(2);
const urlIndex = args.indexOf('--url');
const siteUrl = urlIndex !== -1 ? args[urlIndex + 1] : null;

if (!siteUrl) {
  console.error('Error: Please provide a site URL using --url flag');
  console.error('Usage: node scripts/crawl-wix-site.js --url https://your-site.wix.com');
  process.exit(1);
}

// Ensure output directories exist
[CONFIG.outputDir, CONFIG.assetsDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// State
const visitedUrls = new Set();
const pages = [];
const assets = [];

/**
 * Sleep utility
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Fetch URL content
 */
async function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

/**
 * Extract links from HTML
 */
function extractLinks(html, baseUrl) {
  const linkRegex = /href=["']([^"']+)["']/g;
  const links = new Set();
  let match;

  while ((match = linkRegex.exec(html)) !== null) {
    try {
      const url = new URL(match[1], baseUrl);
      if (url.hostname === new URL(baseUrl).hostname) {
        links.add(url.href);
      }
    } catch (e) {
      // Invalid URL, skip
    }
  }

  return Array.from(links);
}

/**
 * Extract images from HTML
 */
function extractImages(html, baseUrl) {
  const imgRegex = /<img[^>]+src=["']([^"']+)["']/g;
  const images = new Set();
  let match;

  while ((match = imgRegex.exec(html)) !== null) {
    try {
      const url = new URL(match[1], baseUrl);
      images.add(url.href);
    } catch (e) {
      // Invalid URL, skip
    }
  }

  return Array.from(images);
}

/**
 * Extract page metadata
 */
function extractMetadata(html) {
  const metadata = {};

  // Title
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  if (titleMatch) metadata.title = titleMatch[1];

  // Meta description
  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/);
  if (descMatch) metadata.description = descMatch[1];

  // Open Graph
  const ogMatches = html.matchAll(/<meta\s+property=["'](og:[^"']+)["']\s+content=["']([^"']+)["']/g);
  for (const match of ogMatches) {
    metadata[match[1]] = match[2];
  }

  return metadata;
}

/**
 * Extract page content
 */
function extractContent(html) {
  // Remove scripts and styles
  let content = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  content = content.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');

  // Extract text from body
  const bodyMatch = content.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  if (bodyMatch) {
    content = bodyMatch[1];
  }

  // Extract headings
  const headings = [];
  const h1Regex = /<h1[^>]*>([^<]+)<\/h1>/gi;
  const h2Regex = /<h2[^>]*>([^<]+)<\/h2>/gi;

  let match;
  while ((match = h1Regex.exec(content)) !== null) {
    headings.push({ level: 1, text: match[1] });
  }
  while ((match = h2Regex.exec(content)) !== null) {
    headings.push({ level: 2, text: match[1] });
  }

  return {
    headings,
    // Store raw HTML for manual review
    html: content,
  };
}

/**
 * Crawl a single page
 */
async function crawlPage(url, depth = 0) {
  if (depth > CONFIG.maxDepth || visitedUrls.has(url)) {
    return;
  }

  console.log(`Crawling: ${url} (depth: ${depth})`);
  visitedUrls.add(url);

  try {
    const html = await fetchUrl(url);

    // Extract page data
    const metadata = extractMetadata(html);
    const content = extractContent(html);
    const images = extractImages(html, url);
    const links = extractLinks(html, url);

    // Store page data
    pages.push({
      url,
      slug: new URL(url).pathname,
      metadata,
      content,
      images,
      crawledAt: new Date().toISOString(),
    });

    // Store image references
    images.forEach(imgUrl => {
      if (!assets.find(a => a.url === imgUrl)) {
        assets.push({
          type: 'image',
          url: imgUrl,
          source: url,
        });
      }
    });

    // Wait to avoid rate limiting
    await sleep(CONFIG.delay);

    // Recursively crawl linked pages
    for (const link of links) {
      await crawlPage(link, depth + 1);
    }
  } catch (error) {
    console.error(`Error crawling ${url}:`, error.message);
  }
}

/**
 * Generate content map
 */
function generateContentMap() {
  const contentTypes = {};

  pages.forEach(page => {
    const path = page.slug;
    const parts = path.split('/').filter(Boolean);

    if (parts.length === 0) {
      contentTypes['home'] = contentTypes['home'] || [];
      contentTypes['home'].push(page);
    } else if (parts.length === 1) {
      contentTypes[parts[0]] = contentTypes[parts[0]] || [];
      contentTypes[parts[0]].push(page);
    } else {
      const category = parts[0];
      contentTypes[category] = contentTypes[category] || [];
      contentTypes[category].push(page);
    }
  });

  return contentTypes;
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 Starting Wix site crawler...');
  console.log(`Target: ${siteUrl}`);
  console.log(`Output: ${CONFIG.outputDir}\n`);

  // Start crawling
  await crawlPage(siteUrl);

  // Generate outputs
  console.log('\n📝 Generating output files...');

  // Save pages data
  fs.writeFileSync(
    path.join(CONFIG.outputDir, 'pages.json'),
    JSON.stringify(pages, null, 2)
  );
  console.log(`✅ Saved ${pages.length} pages to pages.json`);

  // Save assets data
  fs.writeFileSync(
    path.join(CONFIG.outputDir, 'assets.json'),
    JSON.stringify(assets, null, 2)
  );
  console.log(`✅ Saved ${assets.length} assets to assets.json`);

  // Generate and save content map
  const contentMap = generateContentMap();
  fs.writeFileSync(
    path.join(CONFIG.outputDir, 'content-map.json'),
    JSON.stringify(contentMap, null, 2)
  );
  console.log(`✅ Generated content map with ${Object.keys(contentMap).length} categories`);

  // Summary
  console.log('\n📊 Crawl Summary:');
  console.log(`Pages crawled: ${pages.length}`);
  console.log(`Assets found: ${assets.length}`);
  console.log(`Content types: ${Object.keys(contentMap).length}`);
  console.log(`\n✨ Migration data ready in ${CONFIG.outputDir}/`);
  console.log('\nNext steps:');
  console.log('1. Review pages.json for content structure');
  console.log('2. Check assets.json for images and media');
  console.log('3. Use content-map.json to plan Next.js page structure');
  console.log('4. Run asset download script to fetch images');
}

// Run crawler
main().catch(console.error);
