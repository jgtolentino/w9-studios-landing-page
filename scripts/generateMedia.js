#!/usr/bin/env node

// Script to generate placeholder media assets for W9 Studios
// Run: node scripts/generateMedia.js

const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Ensure media directories exist
const dirs = [
  'public/videos',
  'public/images/portfolio',
  'public/images/clients'
];

dirs.forEach(dir => {
  const fullPath = path.join(__dirname, '..', dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

// Generate portfolio thumbnails
function generateThumbnail(title, client, filename, colors) {
  const canvas = createCanvas(1920, 1080);
  const ctx = canvas.getContext('2d');

  // Gradient background
  const gradient = ctx.createLinearGradient(0, 0, 1920, 1080);
  gradient.addColorStop(0, colors.primary);
  gradient.addColorStop(1, colors.secondary);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 1920, 1080);

  // Dark overlay
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.fillRect(0, 0, 1920, 1080);

  // Add geometric patterns
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.lineWidth = 2;
  for (let i = 0; i < 10; i++) {
    const x = Math.random() * 1920;
    const y = Math.random() * 1080;
    const size = Math.random() * 200 + 100;

    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.stroke();
  }

  // W9 Studios branding
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 32px sans-serif';
  ctx.fillText('W9 STUDIOS', 80, 80);

  // Project title
  ctx.font = 'bold 96px sans-serif';
  ctx.fillText(title.toUpperCase(), 80, 540);

  // Client name
  ctx.font = '48px sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.fillText(client, 80, 640);

  // Production badge
  ctx.fillStyle = colors.accent || '#0066FF';
  ctx.fillRect(80, 900, 300, 60);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 24px sans-serif';
  ctx.fillText('PRODUCTION 2024', 100, 938);

  // Save to file
  const buffer = canvas.toBuffer('image/jpeg', { quality: 0.9 });
  const outputPath = path.join(__dirname, '..', 'public/images/portfolio', filename);
  fs.writeFileSync(outputPath, buffer);
  console.log(`✅ Generated: ${filename}`);
}

// Project configurations
const projects = [
  {
    title: 'Summer Campaign',
    client: 'Jollibee',
    filename: 'jollibee-thumb.jpg',
    colors: { primary: '#E84141', secondary: '#FFC72C', accent: '#E84141' }
  },
  {
    title: 'Digital Transformation',
    client: 'BDO Unibank',
    filename: 'bdo-thumb.jpg',
    colors: { primary: '#003A70', secondary: '#0066CC', accent: '#0066CC' }
  },
  {
    title: 'Galaxy S24 Launch',
    client: 'Samsung Philippines',
    filename: 'samsung-thumb.jpg',
    colors: { primary: '#1428A0', secondary: '#000000', accent: '#1428A0' }
  },
  {
    title: 'Heritage Series',
    client: 'San Miguel Corporation',
    filename: 'sanmiguel-thumb.jpg',
    colors: { primary: '#C8102E', secondary: '#FFD700', accent: '#C8102E' }
  },
  {
    title: 'Healthcare Heroes',
    client: 'Makati Medical Center',
    filename: 'makati-med-thumb.jpg',
    colors: { primary: '#00A859', secondary: '#005EB8', accent: '#00A859' }
  },
  {
    title: 'Food Cinematography',
    client: 'Max\'s Restaurant',
    filename: 'maxs-thumb.jpg',
    colors: { primary: '#8B0000', secondary: '#FFD700', accent: '#8B0000' }
  }
];

// Generate all thumbnails
console.log('🎬 Generating portfolio thumbnails...');
projects.forEach(project => {
  generateThumbnail(
    project.title,
    project.client,
    project.filename,
    project.colors
  );
});

// Generate hero video placeholder frame
function generateHeroFrame() {
  const canvas = createCanvas(1920, 1080);
  const ctx = canvas.getContext('2d');

  // Dark gradient background
  const gradient = ctx.createRadialGradient(960, 540, 0, 960, 540, 1000);
  gradient.addColorStop(0, '#2A2A2A');
  gradient.addColorStop(1, '#1A1A1A');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 1920, 1080);

  // Add subtle pattern
  ctx.globalAlpha = 0.1;
  for (let i = 0; i < 1920; i += 40) {
    ctx.strokeStyle = '#0066FF';
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 1080);
    ctx.stroke();
  }
  for (let i = 0; i < 1080; i += 40) {
    ctx.strokeStyle = '#0066FF';
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(1920, i);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  // Main text
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 144px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('W9 STUDIOS', 960, 500);

  // Tagline
  ctx.font = '48px sans-serif';
  ctx.fillStyle = '#0066FF';
  ctx.fillText('CINEMATIC EXCELLENCE', 960, 600);

  // Call to action
  ctx.font = '32px sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.fillText('Premium Production Studio • Metro Manila', 960, 700);

  // Save as hero placeholder
  const buffer = canvas.toBuffer('image/jpeg', { quality: 0.9 });
  fs.writeFileSync(path.join(__dirname, '..', 'public/images/hero-placeholder.jpg'), buffer);
  console.log('✅ Generated: hero-placeholder.jpg');
}

generateHeroFrame();

// Create a simple video placeholder HTML file
const videoPlaceholderHTML = `<!DOCTYPE html>
<html>
<head>
  <style>
    body { margin: 0; background: #1A1A1A; display: flex; align-items: center; justify-content: center; height: 100vh; }
    .container { text-align: center; color: white; font-family: sans-serif; }
    h1 { font-size: 72px; margin: 0; animation: glow 2s ease-in-out infinite alternate; }
    @keyframes glow { from { text-shadow: 0 0 20px #0066FF; } to { text-shadow: 0 0 30px #0066FF, 0 0 40px #0066FF; } }
    p { font-size: 24px; color: #888; }
  </style>
</head>
<body>
  <div class="container">
    <h1>W9 STUDIOS</h1>
    <p>Showreel Coming Soon</p>
  </div>
</body>
</html>`;

fs.writeFileSync(
  path.join(__dirname, '..', 'public/videos/placeholder.html'),
  videoPlaceholderHTML
);

console.log('✅ Generated: video placeholder HTML');
console.log('✨ All media assets generated successfully!');
console.log('\nNote: For actual video files, use ffmpeg or a video editing tool to create MP4 files.');
console.log('Example: ffmpeg -loop 1 -i hero-placeholder.jpg -c:v libx264 -t 10 -pix_fmt yuv420p hero-showreel.mp4');