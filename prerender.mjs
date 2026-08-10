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
    title: 'Karrcholai | Construction & PMC Company Tamil Nadu',
    description: 'Karrcholai Construction — residential construction & PMC company in Tamil Nadu. Custom homes, renovation, solar, rainwater harvesting. Free Vastu compass & Manaiyadi Sastram tools. Call +91-97414-16747.',
    h1: 'Residential Construction Company & Project Management Consultancy in Tamil Nadu',
    h2: 'Build Your Dream Home with Expert Planning — Karrcholai Construction',
    bodyText: 'Karrcholai is Tamil Nadu\'s trusted residential construction company and PMC. We build custom homes, villas, and residential buildings across Tamil Nadu and Chennai with quality craftsmanship, Vastu-compliant design, and transparent pricing. Over 12 years of experience, 40+ completed projects across Karur, Chennai, Coimbatore, Madurai, Trichy and Erode. Residential construction cost Rs.1800 to Rs.3500 per sq.ft. Free Vastu compass and Manaiyadi Sastram calculator available online. Services include residential construction, PMC, home renovation, solar energy installation, rainwater harvesting, landscape design, Vastu consultation, and traditional Athangudi flooring.',
  },
  {
    path: '/about',
    title: 'About Karrcholai | Construction Company Tamil Nadu',
    description: 'About Karrcholai Construction — 12+ years of residential construction excellence in Tamil Nadu. Expert architects, Vastu consultants, and construction managers. Founded by Saravanakumar B., based in Karur.',
    h1: 'About Karrcholai Construction — Tamil Nadu',
    h2: 'Our Story: 12+ Years of Building Excellence in Tamil Nadu',
    bodyText: 'Founded in 2019 by Saravanakumar B., Karrcholai Construction has delivered 40+ residential projects across Tamil Nadu. Our team of architects, Vastu consultants, and construction engineers delivers quality homes on time and on budget. Headquartered in Karur, Tamil Nadu. We serve Chennai, Coimbatore, Madurai, Trichy, Erode, and surrounding districts.',
  },
  {
    path: '/services',
    title: 'Construction Services Tamil Nadu | Karrcholai',
    description: 'Full-service residential construction & PMC in Tamil Nadu — home building, renovation, landscape, solar energy, rainwater harvesting, Vastu consultation. Karrcholai Construction.',
    h1: 'Residential Construction & PMC Services in Tamil Nadu',
    h2: 'Home Building, Renovation & Sustainable Construction — Tamil Nadu',
    bodyText: 'Karrcholai offers residential construction, PMC (Project Management Consultancy), home renovation, interior design, landscape design, solar energy installation, rainwater harvesting, Vastu consulting, smart lighting, and traditional Athangudi tile flooring across Tamil Nadu. Two core service divisions: Karr Construction and Cholai Sustainable Living.',
  },
  {
    path: '/karr',
    title: 'Karr | Residential Construction Division | Karrcholai',
    description: 'Karr — Karrcholai\'s construction division. Expert residential construction, home building, PMC, renovation, and interior design across Tamil Nadu.',
    h1: 'Karr — Premium Residential Construction Division',
    h2: 'Expert Home Building, PMC & Renovation in Tamil Nadu',
    bodyText: 'The Karr division specialises in premium residential construction, custom home building, PMC project management, and renovation services across Tamil Nadu and Chennai. Structural work, quality materials, and Vastu-compliant design on every project.',
  },
  {
    path: '/cholai',
    title: 'Cholai | Sustainable Home Solutions | Karrcholai',
    description: 'Cholai — Karrcholai\'s sustainable division. Solar energy, rainwater harvesting, landscape design, waste management in Tamil Nadu.',
    h1: 'Cholai — Sustainable & Eco-Friendly Living Division',
    h2: 'Solar Energy, Rainwater Harvesting & Landscape Design — Tamil Nadu',
    bodyText: 'Cholai focuses on sustainable residential building: rooftop solar panel installation, CMDA-compliant rainwater harvesting systems, professional landscape design, waste management, smart LED lighting, and traditional Athangudi flooring for homes in Tamil Nadu.',
  },
  {
    path: '/projects',
    title: 'Construction Projects Portfolio | Karrcholai Tamil Nadu',
    description: 'View Karrcholai completed residential construction projects across Tamil Nadu — custom homes, renovations, and sustainable buildings in Chennai, Karur, Coimbatore.',
    h1: 'Our Completed Construction Projects — Tamil Nadu',
    h2: '40+ Residential Projects Across Tamil Nadu',
    bodyText: 'Browse our portfolio of 40+ completed residential construction, renovation, and sustainable building projects across Tamil Nadu and Chennai. Each project is delivered with structural integrity, quality materials, Vastu-compliant design, and on-time handover.',
  },
  {
    path: '/blog',
    title: 'Construction Blog — Tips & Insights | Karrcholai',
    description: 'Expert articles on residential construction, Vastu Shastra, Manaiyadi Sastram, sustainable building, and home design in Tamil Nadu from Karrcholai Construction.',
    h1: 'Construction & Architecture Blog — Tamil Nadu',
    h2: 'Expert Articles on Home Building, Vastu & Sustainable Construction',
    bodyText: 'Read expert articles on residential construction tips, Vastu Shastra, Manaiyadi Sastram, house construction cost in Tamil Nadu, sustainable building practices, solar energy, rainwater harvesting, and home design insights from Karrcholai Construction.',
  },
  {
    path: '/contact',
    title: 'Contact Karrcholai | Free Consultation Tamil Nadu',
    description: 'Contact Karrcholai Construction for a free consultation on residential construction, PMC, or renovation. Call +91-97414-16747. Serving all of Tamil Nadu.',
    h1: 'Contact Karrcholai Construction — Free Consultation',
    h2: 'Book a Free Residential Construction Consultation in Tamil Nadu',
    bodyText: 'Contact us for a free consultation on home building, renovation, PMC, or Vastu planning. Call +91-97414-16747. Address: 5/20, Puliyampatti, CV Palayam, Karur, Tamil Nadu 639206. Serving Tamil Nadu including Chennai, Coimbatore, Madurai, Trichy, Erode, and Karur.',
  },
  {
    path: '/vastu-compass',
    title: 'Free Vastu Compass Tool Online | Karrcholai',
    description: 'Free online Vastu compass to determine auspicious directions for your home. Interactive Vastu Purusha Mandala tool for residential planning in Tamil Nadu by Karrcholai.',
    h1: 'Free Vastu Compass — Online Vastu Direction Tool',
    h2: 'Vastu Shastra Direction Compass for Home Planning',
    bodyText: 'Use our free Vastu compass tool to check auspicious directions for your home according to Vastu Shastra principles. Find the correct orientation for main door, kitchen, bedroom, and pooja room. Based on traditional Tamil Manaiyadi Sastram science.',
  },
  {
    path: '/manaiyadi',
    title: 'Manaiyadi Sastram — Tamil Home Planning | Karrcholai',
    description: 'Manaiyadi Sastram — traditional Tamil science of home measurement and Vastu planning. Free calculator, dimension guide, and muhurtham dates for Tamil Nadu homes.',
    h1: 'Manaiyadi Sastram — Traditional Tamil Home Science',
    h2: 'Free Manaiyadi Calculator, Dimension Guide & Vastu Tools',
    bodyText: 'Manaiyadi Sastram is the traditional Tamil science of home measurement, orientation, and planning. It provides rules for plot selection, door placement, room dimensions, wall heights, and auspicious proportions. Use our free Manaiyadi calculator and dimension guide for your residential construction project in Tamil Nadu.',
  },
  {
    path: '/manaiyadi/calculator',
    title: 'Manaiyadi Calculator | Free Tamil Vastu Tool',
    description: 'Free Manaiyadi Sastram dimension calculator. Enter room measurements to instantly check if they are auspicious for Tamil home construction. No sign-up required.',
    h1: 'Manaiyadi Dimension Calculator — Free Tamil Vastu Tool',
    h2: 'Calculate Auspicious Home Dimensions with Manaiyadi Sastram',
    bodyText: 'Free online Manaiyadi Sastram calculator to determine auspicious dimensions for doors, windows, rooms, and plots according to traditional Tamil home planning science. Instant results — no sign-up required. Based on traditional Ayadi Shadvarga calculations.',
  },
  {
    path: '/cost-estimator',
    title: 'Free Construction Cost Estimator Tamil Nadu | Karrcholai',
    description: 'Free residential construction cost estimator for Tamil Nadu. Get instant estimates by plot size, floors, and finish quality. 2026 construction rates per sq.ft.',
    h1: 'Free Residential Construction Cost Estimator — Tamil Nadu',
    h2: 'Instant Home Building Cost Calculator — 2026 Rates',
    bodyText: 'Use our free construction cost estimator to get an instant estimate for your residential building project in Tamil Nadu. Calculate costs for new homes, renovation, and extensions. Basic: Rs.1800–2200/sqft. Standard: Rs.2200–2800/sqft. Premium: Rs.2800–3500/sqft.',
  },
  {
    path: '/blog/801',
    title: 'House Construction Cost Tamil Nadu 2026 | Karrcholai',
    description: 'Complete guide to residential construction costs in Tamil Nadu 2026 — per sq.ft rates, material costs, labour rates, and what drives your final budget.',
    h1: 'How Much Does It Cost to Build a House in Tamil Nadu in 2026?',
    h2: 'Residential Construction Cost Guide — Per Sq.Ft Rates Tamil Nadu',
    bodyText: 'Residential construction costs in Tamil Nadu range from Rs.1800 to Rs.3500+ per sq.ft. A 1200 sq.ft home costs Rs.26 to Rs.42 lakhs. Costs depend on specification grade, materials, location, and finishing quality. Get a free site estimate from Karrcholai — call +91-97414-16747.',
  },
  {
    path: '/blog/802',
    title: 'Rainwater Harvesting for Homes Tamil Nadu | Karrcholai',
    description: 'Complete guide to rainwater harvesting for homes in Tamil Nadu — system types, cost, CMDA/DTCP compliance, and installation by Karrcholai Construction.',
    h1: 'Rainwater Harvesting for Homes in Tamil Nadu — Complete Guide',
    h2: 'Types, Cost & CMDA Compliance for Residential Rainwater Systems',
    bodyText: 'Tamil Nadu law requires rainwater harvesting for all new residential buildings on plots above 100 sq.m. Learn about rooftop collection systems, storage tanks, recharge pits, costs (Rs.8,000 to Rs.1,20,000), and CMDA and DTCP compliance requirements. Karrcholai integrates rainwater harvesting into every residential project.',
  },
  {
    path: '/blog/803',
    title: 'Vastu Shastra Rules for New Homes | Karrcholai',
    description: '7 most important Vastu Shastra rules for new homes — main door direction, kitchen placement, pooja room, bedroom orientation, and more. Free Vastu compass tool.',
    h1: 'Vastu Shastra for New Homes — The 7 Most Important Rules',
    h2: 'Main Door, Kitchen, Bedroom & Pooja Room Vastu Guidelines',
    bodyText: 'Key Vastu Shastra rules for Tamil Nadu homes: main door facing north or east, kitchen in southeast corner, master bedroom in southwest, pooja room in northeast. These principles are integrated with Manaiyadi Sastram for every Karrcholai residential project. Use our free Vastu compass to check your home\'s direction alignment.',
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
  const canonicalUrl = `${SITE_URL}${route.path === '/' ? '/' : route.path}`;
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
      <img src="https://karrcholai.com/og-image.png" alt="${escapeHtml(route.h1)} — Karrcholai Construction Tamil Nadu" width="1200" height="630" />
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
