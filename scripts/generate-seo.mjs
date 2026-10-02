/**
 * Génère robots.txt et sitemap.xml à partir de l'URL du site.
 * L'URL est lue depuis la variable d'environnement VITE_SITE_URL
 * (définie dans les variables GitHub Actions) avec un repli sur le domaine
 * de production officiel.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, '..', 'public');

const raw = process.env.VITE_SITE_URL || 'https://universite-horizon.ml';
const siteUrl = raw.replace(/\/+$/, '');

const routes = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/universite', changefreq: 'monthly', priority: '0.8' },
  { path: '/formations', changefreq: 'weekly', priority: '0.9' },
  { path: '/admissions', changefreq: 'weekly', priority: '0.9' },
  { path: '/campus', changefreq: 'monthly', priority: '0.8' },
  { path: '/actualites', changefreq: 'daily', priority: '0.7' },
  { path: '/contact', changefreq: 'monthly', priority: '0.8' },
];

mkdirSync(publicDir, { recursive: true });

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    ({ path, changefreq, priority }) => `  <url>
    <loc>${siteUrl}${path}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const robots = `User-agent: *
Allow: /

# No private areas
Disallow: /dist/
Disallow: /src/

Sitemap: ${siteUrl}/sitemap.xml
`;

writeFileSync(resolve(publicDir, 'sitemap.xml'), sitemap, 'utf8');
writeFileSync(resolve(publicDir, 'robots.txt'), robots, 'utf8');

console.log(`[seo] sitemap.xml et robots.txt generes pour ${siteUrl}`);
