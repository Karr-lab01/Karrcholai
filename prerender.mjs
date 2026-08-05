/**
 * prerender.mjs — Static HTML generator for SEO
 *
 * After `vite build`, this script injects per-route SEO content
 * (title, meta description, canonical, H1/H2) into each static HTML file.
 *
 * Domain is read from src/config/site.js — change it there and
 * all canonical URLs update automatically on next build.
 *
 * Run:  node prerender.mjs
 * Or via npm: "postbuild": "node prerender.mjs"
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir   = path.join(__dirname, 'dist');

// ── Read SITE_URL from config ──────────────────────────────────────────────
// Fall back to karrcholai.com if config can't be loaded
let SITE_URL = 'https://karrcholai.com';
try {
  const configPath = pathToFileURL(path.join(__dirname, 'src/config/site.js')).href;
  const { SITE_URL: url } = await import(configPath);
  if (url) SITE_URL = url;
} catch (e) {
  console.warn('⚠  Could not load site config, using fallback URL:', SITE_URL);
}

// ── Per-route SEO data ─────────────────────────────────────────────────────
const routes = [
  {
    path: '/',
    title: 'Karrcholai | Premium Residential Construction in Tamil Nadu',
    description: 'Karrcholai Construction & Architecture — residential building, renovation, landscaping, solar energy & rainwater harvesting in Tamil Nadu. Free Vastu compass & Manaiyadi Sastram tools.',
    h1: 'Build Your Dream Home with Expert Planning',
    h2: 'Premium Residential Construction & Architecture in Tamil Nadu',
    bodyText: 'Karrcholai Construction offers custom home building, renovation, interior design, landscaping, solar energy, and rainwater harvesting across Tamil Nadu and Chennai. Vastu-compliant design with Manaiyadi Sastram tools. 12+ years, 40+ completed projects.',
  },
  {
    path: '/about',
    title: 'About Karrcholai | Construction Experts in Tamil Nadu',
    description: 'Learn about Karrcholai Construction — 12+ years of residential construction excellence in Tamil Nadu. Expert architects, Vastu consultants, and construction managers.',
    h1: 'About Karrcholai Construction',
    h2: 'Our Story — 12+ Years of Building Excellence in Tamil Nadu',
    bodyText: 'Founded with a passion for quality construction, Karrcholai has delivered 40+ residential projects across Tamil Nadu. Our team of architects, Vastu consultants, and engineers delivers excellence.',
  },
  {
    path: '/services',
    title: 'Construction Services | Karrcholai Tamil Nadu',
    description: 'Full-service construction & architecture: residential building, renovation, interior design, landscaping, solar energy, rainwater harvesting in Tamil Nadu.',
    h1: 'Our Construction & Architecture Services',
    h2: 'Residential Building, Renovation & Sustainable Construction Tamil Nadu',
    bodyText: 'We offer residential construction, PMC services, home renovation, interior design, landscape design, solar energy installation, rainwater harvesting, and Vastu consulting across Tamil Nadu.',
  },
  {
    path: '/karr',
    title: 'Karr — Residential Construction Division | Karrcholai',
    description: 'Karr division of Karrcholai — expert residential construction, home building, renovation, and interior design in Tamil Nadu.',
    h1: 'Karr — Premium Residential Construction',
    h2: 'Expert Home Building & Renovation in Tamil Nadu',
    bodyText: 'The Karr division specialises in premium residential construction, custom home building, and renovation services across Tamil Nadu and Chennai.',
  },
  {
    path: '/cholai',
    title: 'Cholai — Sustainable Living | Karrcholai',
    description: 'Cholai division — sustainable construction, solar energy, rainwater harvesting, and landscape design in Tamil Nadu.',
    h1: 'Cholai — Sustainable & Eco-Friendly Living',
    h2: 'Solar Energy, Rainwater Harvesting & Landscape Design Tamil Nadu',
    bodyText: 'Cholai focuses on sustainable building: solar panel installation, rainwater harvesting systems, landscape design, and eco-friendly construction in Tamil Nadu.',
  },
  {
    path: '/projects',
    title: 'Our Projects | Karrcholai Residential Construction Portfolio',
    description: 'Browse Karrcholai completed residential construction projects across Tamil Nadu — custom homes, renovations, and sustainable buildings.',
    h1: 'Our Construction Projects',
    h2: 'Completed Residential Projects Across Tamil Nadu',
    bodyText: 'View our portfolio of 40+ completed residential construction, renovation, and sustainable building projects across Tamil Nadu and Chennai.',
  },
  {
    path: '/blog',
    title: 'Construction & Architecture Blog | Karrcholai',
    description: 'Expert articles on residential construction, Vastu Shastra, sustainable building, and home design in Tamil Nadu.',
    h1: 'Construction & Architecture Insights',
    h2: 'Expert Blog on Home Building, Vastu & Sustainable Construction',
    bodyText: 'Read expert articles on residential construction tips, Vastu Shastra, sustainable building practices, solar energy, rainwater harvesting, and home design in Tamil Nadu.',
  },
  {
    path: '/contact',
    title: 'Contact Karrcholai | Residential Construction Tamil Nadu',
    description: 'Contact Karrcholai Construction for a free consultation. Call +91-97414-16747. Serving Tamil Nadu and Chennai.',
    h1: 'Contact Karrcholai Construction',
    h2: 'Get a Free Residential Construction Consultation',
    bodyText: 'Contact us for a free consultation on home building, renovation, or Vastu planning. Call +91-97414-16747. Serving Tamil Nadu, Chennai, and surrounding districts.',
  },
  {
    path: '/vastu-compass',
    title: 'Free Vastu Compass Tool | Karrcholai',
    description: 'Use our free online Vastu compass to determine directions for your home. Vastu Shastra tools for residential planning in Tamil Nadu.',
    h1: 'Free Vastu Compass — Online Vastu Direction Tool',
    h2: 'Vastu Shastra Compass for Home Planning',
    bodyText: 'Use our free Vastu compass tool to check directions and plan your home according to Vastu Shastra principles. Traditional Tamil home planning based on Manaiyadi Sastram.',
  },
  {
    path: '/manaiyadi',
    title: 'Manaiyadi Sastram | Traditional Tamil Home Planning',
    description: 'Manaiyadi Sastram — traditional Tamil science of home measurement and Vastu planning. Free calculator and dimension guide.',
    h1: 'Manaiyadi Sastram — Traditional Tamil Home Science',
    h2: 'Free Manaiyadi Calculator & Vastu Dimension Guide',
    bodyText: 'Manaiyadi Sastram is the traditional Tamil science of home measurement and planning. Use our free Manaiyadi calculator and dimension guide for your residential construction project.',
  },
  {
    path: '/manaiyadi/calculator',
    title: 'Manaiyadi Calculator | Free Tamil Vastu Tool',
    description: 'Free Manaiyadi Sastram calculator for Tamil home planning. Calculate auspicious dimensions for doors, rooms, and plots.',
    h1: 'Manaiyadi Calculator — Free Tamil Vastu Tool',
    h2: 'Calculate Auspicious Home Dimensions with Manaiyadi Sastram',
    bodyText: 'Free online Manaiyadi Sastram calculator to determine auspicious dimensions for doors, windows, rooms, and plots according to traditional Tamil home planning science.',
  },
  {
    path: '/cost-estimator',
    title: 'Construction Cost Estimator | Karrcholai Tamil Nadu',
    description: 'Estimate your residential construction cost in Tamil Nadu with our free online calculator. Get instant estimates for home building.',
    h1: 'Residential Construction Cost Estimator',
    h2: 'Free Home Building Cost Calculator for Tamil Nadu',
    bodyText: 'Use our free construction cost estimator to get an instant estimate for your residential building project in Tamil Nadu. Calculate costs for new homes, renovation, and more.',
  },
  {
    path: '/blog/801',
    title: 'House Construction Cost in Tamil Nadu 2026 | Karrcholai',
    description: 'Complete breakdown of residential construction costs in Tamil Nadu for 2026 — per sq.ft rates, material costs, and what drives your final budget.',
    h1: 'How Much Does It Cost to Build a House in Tamil Nadu in 2026?',
    h2: 'Residential Construction Cost Guide — Per Sq.Ft Rates Tamil Nadu',
    bodyText: 'Residential construction costs in Tamil Nadu range from ₹1,800 to ₹3,500+ per sq.ft depending on specification. A 1,200 sq.ft home costs ₹26–42 lakhs. Get a free site estimate from Karrcholai.',
  },
  {
    path: '/blog/802',
    title: 'Rainwater Harvesting for Homes Tamil Nadu | Karrcholai',
    description: 'Complete guide to rainwater harvesting for homes in Tamil Nadu — system types, cost, CMDA/DTCP compliance, and installation.',
    h1: 'Rainwater Harvesting for Homes in Tamil Nadu — A Complete Guide',
    h2: 'Types, Cost, and CMDA Compliance for Residential Rainwater Systems',
    bodyText: 'Tamil Nadu law requires rainwater harvesting for all new residential buildings. Learn about system types, costs (₹8,000 to ₹1,20,000), and how to comply with CMDA and DTCP regulations.',
  },
  {
    path: '/blog/803',
    title: 'Vastu Shastra Rules for New Homes | Karrcholai',
    description: 'The 7 most important Vastu Shastra rules for new homes — main door direction, kitchen placement, pooja room, bedroom orientation, and more.',
    h1: 'Vastu Shastra for New Homes — The 7 Most Important Rules',
    h2: 'Main Door, Kitchen, Bedroom and Pooja Room Vastu Guidelines',
    bodyText: 'Key Vastu rules: main door facing north/east, kitchen in southeast, master bedroom southwest, pooja room northeast. Integrated with Manaiyadi Sastram for Tamil Nadu homes.',
  },
];

// ── Read the built index.html as the base template ─────────────────────────
const indexPath = path.join(distDir, 'index.html');
if (!fs.existsSync(indexPath)) {
  console.error('❌  dist/index.html not found. Run `npm run build` first.');
  process.exit(1);
}

const baseHtml = fs.readFileSync(indexPath, 'utf-8');

// ── Inject per-route SEO into the HTML shell ───────────────────────────────
function buildRouteHtml(route) {
  let html = baseHtml;

  // 1. Replace <title>
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${escapeHtml(route.title)}</title>`
  );

  // 2. Replace meta description
  html = html.replace(
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${escapeHtml(route.description)}"`
  );

  // 3. Replace canonical
  const canonicalUrl = `${SITE_URL}${route.path === '/' ? '' : route.path}`;
  html = html.replace(
    /<link rel="canonical" href="[^"]*"/,
    `<link rel="canonical" href="${canonicalUrl}"`
  );

  // 4. Replace og:url
  html = html.replace(
    /<meta property="og:url" content="[^"]*"/g,
    `<meta property="og:url" content="${canonicalUrl}"`
  );

  // 5. Replace og:title
  html = html.replace(
    /<meta property="og:title" content="[^"]*"/,
    `<meta property="og:title" content="${escapeHtml(route.title)}"`
  );

  // 6. Replace og:description
  html = html.replace(
    /<meta property="og:description" content="[^"]*"/,
    `<meta property="og:description" content="${escapeHtml(route.description)}"`
  );

  // 7. Update SEO shell content — fully visible to crawlers, hidden via hidden attr after React mounts
  const navLinks = [
    ['/', 'Home'], ['/about', 'About'], ['/services', 'Services'],
    ['/projects', 'Projects'], ['/karr', 'Karr'], ['/cholai', 'Cholai'],
    ['/blog', 'Blog'], ['/contact', 'Contact'],
    ['/vastu-compass', 'Vastu Compass'], ['/cost-estimator', 'Cost Estimator'],
    ['/manaiyadi', 'Manaiyadi Sastram'], ['/manaiyadi/calculator', 'Manaiyadi Calculator'],
  ];
  const navHtml = navLinks.map(([href, label]) => `<a href="${href}">${escapeHtml(label)}</a>`).join('\n        ');

  const seoShell = `
    <!-- seo-shell-start -->
    <div id="seo-shell">
      <nav>
        ${navHtml}
      </nav>
      <h1>${escapeHtml(route.h1)}</h1>
      <h2>${escapeHtml(route.h2)}</h2>
      <p>${escapeHtml(route.bodyText)}</p>
    </div>
    <!-- seo-shell-end -->`;

  // Use sentinel comments to reliably replace the entire shell block
  html = html.replace(
    /<!-- seo-shell-start -->[\s\S]*?<!-- seo-shell-end -->/,
    seoShell
  );

  return html;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── Write each route's index.html ─────────────────────────────────────────
let generated = 0;
for (const route of routes) {
  const routeHtml = buildRouteHtml(route);
  const routeDir  = route.path === '/'
    ? distDir
    : path.join(distDir, ...route.path.split('/').filter(Boolean));

  if (!fs.existsSync(routeDir)) {
    fs.mkdirSync(routeDir, { recursive: true });
  }

  const outPath = path.join(routeDir, 'index.html');
  fs.writeFileSync(outPath, routeHtml, 'utf-8');
  console.log(`✅  ${outPath.replace(__dirname, '.')}`);
  generated++;
}

console.log(`\n🎉  Prerendered ${generated} routes into dist/`);
