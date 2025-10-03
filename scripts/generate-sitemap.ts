import fs from 'fs';
import path from 'path';

const routes = JSON.parse(fs.readFileSync('migration_artifacts/routes-map.json', 'utf8'));
const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

const urls = routes
  .filter((r: any) => r.status === 200 || r.status === 301)
  .map((r: any) => `<url><loc>${base}${r.to}</loc></url>`)
  .join('');

const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;

fs.mkdirSync('public', { recursive: true });
fs.writeFileSync(path.join('public', 'sitemap.xml'), xml);

console.log('✅ Sitemap generated at public/sitemap.xml');
