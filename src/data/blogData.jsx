import React from 'react';
import { motion } from 'framer-motion';
import visvesvarayaImage from '../../assets/visvesvaraya.webp';
import vis2 from '../../assets/vis2.jpg';
import vis3 from '../../assets/vis3.webp';
import vis4 from '../../assets/vis4.webp';

/* ─────────────────────────────────────────────────────────────────────────────
   WHATSAPP STORY — Arun's Dream Home
   Format: real WhatsApp-style 1:1 conversation thread
   Colors: site palette — cream / forest-green / terracotta
───────────────────────────────────────────────────────────────────────────── */

// Participants
const CLIENT   = { name: 'Arun Kumar',   avatar: '👨‍💼', color: '#2D4B37' };
const ENGINEER = { name: 'Karthik (Karrcholai)', avatar: '👷', color: '#B85C38' };

// Message types: 'client' | 'engineer' | 'date' | 'milestone' | 'photo' | 'voice' | 'docs'
const conversation = [

  { type: 'date', text: 'March 4, 2024' },

  { type: 'client', text: "Hi, I got your number from Ravi. He said you built his cousin's house in Karur? I'm looking to build in Erode — 1800 sq.ft, 2 floors. Is that something you handle?", time: '10:14 AM', read: true },

  { type: 'engineer', text: "Yes, that's exactly what we do at Karrcholai. Residential construction, full turnkey — foundation to handover. Ravi's cousin is our Karur project, completed last October ✅", time: '10:18 AM' }, 

  { type: 'engineer', text: "Happy to discuss your requirements. Can we do a free site visit this week? We come to the plot, assess, and give you a detailed estimate — same day, no cost, no obligation.", time: '10:19 AM' },

  { type: 'client', text: "That sounds good. My wife has a few Vastu requirements too — is that handled by you or do we need a separate consultant?", time: '10:23 AM', read: true },

  { type: 'engineer', text: "We have a dedicated Vastu consultant on our team. Pooja room orientation, kitchen direction, bedroom placement — all handled in the initial design phase itself. No extra cost 🙏", time: '10:25 AM' },

  { type: 'client', text: "Perfect. Let's do Thursday — 10 AM at the plot?", time: '10:27 AM', read: true },
  { type: 'engineer', text: "Thursday 10 AM confirmed. See you there 👍", time: '10:28 AM' },

  { type: 'milestone', icon: '📍', title: 'Site Visit Completed', sub: 'March 7, 2024 · Plot area surveyed · Soil test done · Vastu alignment marked', color: '#2D4B37' },

  { type: 'date', text: 'March 7, 2024 — Evening' },

  { type: 'client', text: "Karthik that was really thorough. My wife is impressed with the Vastu walkthrough. One concern — other contractors quoted ₹55–60L for this. How is your number lower?", time: '6:44 PM', read: true },

  { type: 'engineer', text: "Good question. The difference is transparency. We use controlled material procurement — no middleman markup. Our quote breakdown:\n\n• Foundation & Structure: ₹14.2L\n• Brickwork & Roofing: ₹9.8L\n• Plumbing & Electrical: ₹6.4L\n• Plastering & Flooring: ₹7.1L\n• Finishing & Paint: ₹4.5L\n\nTotal: ₹42L fixed price. We sign a contract — not a ballpark.", time: '6:52 PM' },

  { type: 'docs', label: 'Karrcholai_Quote_Arun_Erode.pdf', size: '284 KB', time: '6:53 PM' },

  { type: 'client', text: "This is very detailed. We'll review tonight and let you know tomorrow. Also — what's the timeline?", time: '6:55 PM', read: true },

  { type: 'engineer', text: "8 months from ground-breaking. We maintain a weekly WhatsApp update — photos + progress report every Sunday. You won't need to visit site every week to stay informed.", time: '6:58 PM' },

  { type: 'date', text: 'March 9, 2024' },

  { type: 'client', text: "Karthik — we're in. When do we sign?", time: '9:11 AM', read: true },
  { type: 'engineer', text: "Welcome to Karrcholai, Arun 🏠 Agreement ready. Shall we meet at our office Saturday?", time: '9:15 AM' },
  { type: 'client', text: "Saturday works 👍", time: '9:16 AM', read: true },

  { type: 'milestone', icon: '✍️', title: 'Contract Signed', sub: 'March 11, 2024 · ₹42 Lakhs · 8 Months · Vastu-aligned plan approved', color: '#B85C38' },

  { type: 'date', text: 'April 2, 2024 — Ground-Breaking' },

  { type: 'engineer', text: "Good morning Arun! Today is Day 1 🙏 Foundation work begins. We've marked the plot as per Vastu alignment. Sharing first update photo.", time: '8:02 AM' },

  { type: 'photo', caption: 'Plot marked & foundation excavation started', emoji: '🏗️', time: '8:04 AM' },

  { type: 'client', text: "Wow this is really happening 😭 Thank you Karthik. Sharing with my parents right now.", time: '8:17 AM', read: true },

  { type: 'date', text: 'April 7, 2024 — Week 1 Update' },

  { type: 'engineer', text: "Week 1 Sunday Update ✅\n\nFoundation trenching — 100%\nSoil treatment done\nFPC (Plain Cement Concrete) layer complete\n\nNext week: Footings & column base casting begins.", time: '9:00 AM' },

  { type: 'photo', caption: 'Foundation trenching complete — Week 1', emoji: '⛏️', time: '9:02 AM' },

  { type: 'client', text: "This is incredible — we had no idea we'd get weekly updates with photos. My wife made a scrapbook 😄", time: '10:31 AM', read: true },

  { type: 'date', text: 'May 12, 2024 — Month 2' },

  { type: 'engineer', text: "Month 2 complete ✅\n\nAll footings cast\nGround floor columns standing\nPlinth beam done\n\nSlab casting for ground floor scheduled next week. You're welcome to visit anytime 🙏", time: '9:00 AM' },

  { type: 'photo', caption: 'Ground floor columns and plinth beam', emoji: '🧱', time: '9:01 AM' },

  { type: 'client', text: "We visited yesterday! Everything is exactly as planned. The Vastu orientation of the main door is perfect. Priya is very happy 🙏", time: '11:45 AM', read: true },

  { type: 'date', text: 'June 23, 2024 — Month 3–4' },

  { type: 'engineer', text: "Ground floor slab cast successfully ✅ Structure is solid — tested by our engineer. First floor columns starting tomorrow.", time: '7:15 PM' },

  { type: 'voice', duration: '0:32', label: 'Site audio update — first floor framework', time: '7:18 PM' },

  { type: 'client', text: "Listened to the voice note — very clear update. One question: can we increase the height of the kitchen ceiling slightly for ventilation? Priya's request 😅", time: '8:02 PM', read: true },

  { type: 'engineer', text: "Yes — we can make it 11ft instead of 10ft. No extra cost since it's within the same slab level. I'll update the drawing and send confirmation.", time: '8:11 PM' },

  { type: 'docs', label: 'Revised_Kitchen_Drawing_v2.pdf', size: '1.1 MB', time: '8:14 PM' },

  { type: 'client', text: "Perfect. This is why I trust you — no drama, just solutions 🙏", time: '8:18 AM', read: true },

  { type: 'date', text: 'August 18, 2024 — Month 5–6' },

  { type: 'engineer', text: "Both floors complete ✅ Roofing slab poured yesterday. Brickwork starts Monday — Kalinga bricks as agreed in the contract.", time: '9:05 AM' },

  { type: 'photo', caption: 'Terrace slab complete — 2-floor structure done!', emoji: '🏠', time: '9:07 AM' },

  { type: 'client', text: "Karthik I'm speechless. Sent this to my mother and she just cried happy tears. This is the house she always wanted for us.", time: '11:22 AM', read: true },

  { type: 'engineer', text: "That message means everything to us, Arun. It's why we do what we do 🙏 Finishing phase begins now — tiles, paint, fixtures.", time: '11:35 AM' },

  { type: 'date', text: 'October 20, 2024 — Final Phase' },

  { type: 'engineer', text: "Flooring tile work done ✅ Bathroom fittings installed ✅ Electrical fixtures complete ✅\n\nPainting starts Monday. We're on track for November handover.", time: '6:30 PM' },

  { type: 'photo', caption: 'Living room tiling complete + kitchen view', emoji: '🏡', time: '6:32 PM' },

  { type: 'client', text: "The tiles look amazing!! Exactly the combination Priya chose. Can we do a quick walk-through visit this weekend?", time: '7:45 PM', read: true },

  { type: 'engineer', text: "Absolutely — Saturday 11 AM. I'll be on site. We'll walk through every room with our punch list checklist.", time: '7:50 PM' },

  { type: 'date', text: 'November 10, 2024 — Handover Week' },

  { type: 'engineer', text: "Arun — all punch list items cleared ✅ Solar panel installation done ✅ Rainwater harvesting system tested ✅\n\nYour house is ready. Shall we do official handover this Saturday?", time: '10:00 AM' },

  { type: 'client', text: "YES. 100%. Saturday it is. I don't have words Karthik. 8 months ago this was an empty plot and now it's our HOME.", time: '10:14 AM', read: true },

  { type: 'engineer', text: "Saturday November 16, 11 AM — Key Handover 🔑🏠 Congratulations Arun and Priya. It has been an honour to build your dream.", time: '10:18 AM' },

  { type: 'milestone', icon: '🔑', title: 'Keys Handed Over', sub: 'November 16, 2024 · 1800 sq.ft · 2 Floors · Erode · On Time · On Budget', color: '#2D4B37' },

  { type: 'date', text: 'November 16, 2024 — Moving Day 🎉' },

  { type: 'client', text: "We're home Karthik. We're actually home. 10 years of renting and today we slept in OUR house for the first time. Thank you for everything. Truly.", time: '9:41 PM', read: true },

  { type: 'engineer', text: "Welcome home, Arun and Priya 🏠🙏 Wishing your family nothing but joy and peace in this beautiful home. If you ever need anything — we're always here.", time: '9:48 PM' },

  { type: 'client', text: "⭐⭐⭐⭐⭐\n\nAlready recommended you to 3 colleagues. The answer will always be YES — call Karrcholai.", time: '9:51 PM', read: true },
];

export const arunWhatsAppStory = {
  clientName: 'Arun Kumar',
  clientRole: 'Software Engineer · Erode',
  engineerName: 'Karthik',
  engineerRole: 'Karrcholai · Site Engineer',
  projectSummary: { sqft: '1800', floors: '2', budget: '₹42L', duration: '8 Months', city: 'Erode, Tamil Nadu' },
  rating: 5,
  quote: "10 years of renting. 8 months of building. 1 home I'll treasure forever. Thank you, Karrcholai.",
  conversation,
};

export const blogPosts = [
  {
    id: 701,
    title: "What Was the Purpose Behind the Creation of the Vastu Shastras?",
    category: 'Land and Plot Tips',
    date: 'August 2026',
    image: null,
    heroType: 'vastu',
    author: 'Karrcholai Team',
    excerpt: "Our ancestors discovered that the movement of stars and planets creates magnetic forces that affect human life. The Vastu Shastras were created to protect humanity — and guide the building of homes that invite blessings from the lords of eight directions.",
    gallery: [
      { type: 'vastu-article' },
    ],
  },
  {
    id: 601,
    title: "Sir M. Visvesvaraya — India's Engineering Pioneer",
    category: 'Engineering Legends',
    date: 'May 17, 2024',
    image: visvesvarayaImage,
    author: 'Karrcholai Team',
    excerpt: "How Sir M. Visvesvaraya's discipline, planning, and engineering excellence continue to guide modern residential construction in India.",
    gallery: [
      { type: 'html', content: `<h2 class="text-3xl font-bold mt-10 mb-6">Sir M. Visvesvaraya — The Engineer Who Built Modern India</h2><h3 class="text-2xl font-semibold mt-8 mb-4">Introduction</h3><p class="mb-4 text-lg leading-relaxed opacity-80">India's progress in engineering and infrastructure owes much to leaders who turned careful planning into lasting public works. Sir Mokshagundam Visvesvaraya remains one of the most respected civil engineers and nation-builders in India's history. His career offers lessons still relevant today — quality, discipline, and long-term thinking.</p><h3 class="text-2xl font-semibold mt-8 mb-4">Who Was Sir M. Visvesvaraya?</h3><p class="mb-4 text-lg leading-relaxed opacity-80">Born September 15, 1861 in Karnataka, he was a civil engineer, administrator, and planner who helped shape modern India's infrastructure. His work earned him the Bharat Ratna — India's highest civilian honour. Engineers' Day is celebrated on his birthday every year.</p>` },
      { type: 'single', image: vis2 },
      { type: 'html', content: `<h3 class="text-2xl font-semibold mt-8 mb-4">Engineering Work That Changed the Country</h3><p class="mb-4 text-lg leading-relaxed opacity-80">Sir Visvesvaraya led landmark projects in water management and urban planning — including the Krishna Raja Sagara Dam in Karnataka. He introduced flood protection systems and automatic sluice gates — practical solutions to real problems.</p><h3 class="text-2xl font-semibold mt-8 mb-4">Conclusion</h3><p class="mb-4 text-lg leading-relaxed opacity-80">At Karrcholai, we draw on that same commitment — structured planning, on-site supervision, and homes built to last.</p>` },
      { type: 'double', images: [vis3, vis4] },
    ],
  },
  {
    id: 603,
    title: "The First Stone — Is This House Plan Right for My Family?",
    category: 'Single Stone Stories',
    date: 'July 2026',
    image: null,
    heroType: 'first-stone',
    author: 'Karrcholai Team',
    excerpt: "A professional room-by-room analysis of a 30' × 65' proposed ground floor plan. Karrcholai walks through every space — what works, what needs review, and why a plan should fit the family, not just the plot.",
    gallery: [
      { type: 'first-stone' },
    ],
  },
  // ── SEO Blog Posts ─────────────────────────────────────────────────────────
  {
    id: 801,
    title: "How Much Does It Cost to Build a House in Tamil Nadu in 2026?",
    category: 'Construction Tips',
    date: 'August 2026',
    image: null,
    heroType: 'text',
    author: 'Karrcholai Team',
    excerpt: "A complete, honest breakdown of residential construction costs in Tamil Nadu for 2026 — per square foot rates, material costs, labour charges, and what actually drives your final budget.",
    gallery: [
      { type: 'html', content: `
        <h2 class="text-3xl font-bold mt-10 mb-6">How Much Does It Cost to Build a House in Tamil Nadu in 2026?</h2>
        <p class="mb-4 text-lg leading-relaxed opacity-80">One of the most common questions we receive at Karrcholai is: <strong>"What will it cost to build my house?"</strong> The honest answer is — it depends. But we can give you a clear, realistic range based on our experience building homes across Tamil Nadu.</p>

        <h3 class="text-2xl font-semibold mt-8 mb-4">Average Construction Cost Per Square Foot in Tamil Nadu (2026)</h3>
        <p class="mb-4 text-lg leading-relaxed opacity-80">For a standard residential construction in Tamil Nadu in 2026, expect the following ranges:</p>
        <ul class="list-disc pl-6 mb-6 space-y-2 text-lg opacity-80">
          <li><strong>Basic construction:</strong> ₹1,800 – ₹2,200 per sq.ft</li>
          <li><strong>Standard construction:</strong> ₹2,200 – ₹2,800 per sq.ft</li>
          <li><strong>Premium construction:</strong> ₹2,800 – ₹3,500 per sq.ft</li>
          <li><strong>Luxury construction:</strong> ₹3,500 and above per sq.ft</li>
        </ul>
        <p class="mb-4 text-lg leading-relaxed opacity-80">A typical 1,200 sq.ft home in Tamil Nadu would cost approximately <strong>₹26 – ₹42 lakhs</strong> depending on the specification level.</p>

        <h3 class="text-2xl font-semibold mt-8 mb-4">What Drives Construction Costs in Tamil Nadu?</h3>
        <p class="mb-4 text-lg leading-relaxed opacity-80">Several factors influence your final construction budget:</p>
        <ul class="list-disc pl-6 mb-6 space-y-2 text-lg opacity-80">
          <li><strong>Plot location:</strong> Chennai and Coimbatore sites typically cost 15–20% more than Tier 2 cities like Karur, Erode, or Trichy</li>
          <li><strong>Soil type:</strong> Black cotton soil or soft ground requires deeper foundations — adding ₹2–4 lakhs to your foundation cost</li>
          <li><strong>Number of floors:</strong> Each additional floor adds approximately 70–80% of the ground floor cost</li>
          <li><strong>Material grades:</strong> Premium flooring, modular kitchens, and imported fixtures can add ₹5–15 lakhs</li>
          <li><strong>Vastu compliance:</strong> Minor layout adjustments for Vastu add minimal cost when planned from the beginning</li>
        </ul>

        <h3 class="text-2xl font-semibold mt-8 mb-4">Cost Breakdown for a 1,500 Sq.Ft Standard Home</h3>
        <p class="mb-4 text-lg leading-relaxed opacity-80">Here is a realistic breakdown for a 1,500 sq.ft standard residential build in Tamil Nadu:</p>
        <ul class="list-disc pl-6 mb-6 space-y-2 text-lg opacity-80">
          <li>Foundation and substructure: ₹4.5 – 6 lakhs</li>
          <li>RCC structure (columns, beams, slab): ₹9 – 11 lakhs</li>
          <li>Brickwork and plastering: ₹4 – 5.5 lakhs</li>
          <li>Flooring (vitrified tiles): ₹2.5 – 3.5 lakhs</li>
          <li>Plumbing and electrical: ₹3.5 – 4.5 lakhs</li>
          <li>Doors, windows and grills: ₹2.5 – 4 lakhs</li>
          <li>Painting (exterior + interior): ₹1.5 – 2 lakhs</li>
          <li><strong>Total estimate: ₹28 – 37 lakhs</strong></li>
        </ul>

        <h3 class="text-2xl font-semibold mt-8 mb-4">How to Get an Accurate Estimate for Your Project</h3>
        <p class="mb-4 text-lg leading-relaxed opacity-80">The most reliable way to get an accurate cost is through a site visit and detailed estimation. At Karrcholai, we offer a free consultation and same-day estimate — we visit your plot, assess the soil and access conditions, and provide a written breakdown before you commit to anything.</p>
        <p class="mb-4 text-lg leading-relaxed opacity-80">Online calculators give rough numbers. A professional site assessment gives you a number you can actually budget from.</p>

        <h3 class="text-2xl font-semibold mt-8 mb-4">Final Thoughts</h3>
        <p class="mb-4 text-lg leading-relaxed opacity-80">Building a home in Tamil Nadu in 2026 is a significant investment. Getting the cost structure right from the beginning — through detailed estimation, transparent contracts, and stage-wise billing — protects you from the budget overruns that affect most self-managed construction projects. Call Karrcholai at +91-97414-16747 for a free, no-obligation site visit and cost estimate.</p>
      ` },
    ],
  },
  {
    id: 802,
    title: "Rainwater Harvesting for Homes in Tamil Nadu — A Complete Guide",
    category: 'Construction Tips',
    date: 'August 2026',
    image: null,
    heroType: 'text',
    author: 'Karrcholai Team',
    excerpt: "Tamil Nadu law requires rainwater harvesting in all new residential construction. Here's everything you need to know — system types, cost, installation, and how to comply with Chennai CMDA and DTCP regulations.",
    gallery: [
      { type: 'html', content: `
        <h2 class="text-3xl font-bold mt-10 mb-6">Rainwater Harvesting for Homes in Tamil Nadu — A Complete Guide</h2>
        <p class="mb-4 text-lg leading-relaxed opacity-80">Tamil Nadu was one of the first states in India to make rainwater harvesting <strong>mandatory for all new buildings</strong>. If you are building a house in Tamil Nadu, you are legally required to install a rainwater harvesting system. Beyond compliance, a well-designed system can significantly reduce your household water dependency — especially important in water-stressed districts like Chennai, Karur, Madurai, and Coimbatore.</p>

        <h3 class="text-2xl font-semibold mt-8 mb-4">Why Rainwater Harvesting Matters in Tamil Nadu</h3>
        <p class="mb-4 text-lg leading-relaxed opacity-80">Tamil Nadu receives rainfall in two distinct seasons — the northeast monsoon (October to December) and the southwest monsoon (June to September). Despite this, the state faces severe water shortages in summer months. Rainwater harvesting bridges this gap by capturing and storing monsoon water for use throughout the year.</p>
        <ul class="list-disc pl-6 mb-6 space-y-2 text-lg opacity-80">
          <li>Chennai receives approximately 1,400 mm of annual rainfall — enough to fill a 10,000-litre tank several times over from a typical rooftop</li>
          <li>A 1,000 sq.ft roof can collect approximately 60,000 – 80,000 litres of water per year in Chennai</li>
          <li>Groundwater recharge through percolation pits helps replenish borewells and open wells naturally</li>
        </ul>

        <h3 class="text-2xl font-semibold mt-8 mb-4">Types of Rainwater Harvesting Systems for Homes</h3>
        <p class="mb-4 text-lg leading-relaxed opacity-80">There are two main approaches for residential rainwater harvesting in Tamil Nadu:</p>
        <ul class="list-disc pl-6 mb-6 space-y-2 text-lg opacity-80">
          <li><strong>Rooftop collection with storage tank:</strong> Rainwater from the roof is channelled through downpipes, filtered, and stored in an underground sump or overhead tank for direct use in toilets, gardening, and washing</li>
          <li><strong>Groundwater recharge (percolation pits):</strong> Filtered rainwater is directed into percolation pits or recharge wells, which replenish the groundwater table and improve borewell yield</li>
        </ul>
        <p class="mb-4 text-lg leading-relaxed opacity-80">Most homes in Tamil Nadu use a combination of both — some water stored for direct use, and the overflow directed to percolation pits.</p>

        <h3 class="text-2xl font-semibold mt-8 mb-4">CMDA and DTCP Requirements</h3>
        <p class="mb-4 text-lg leading-relaxed opacity-80">Under Tamil Nadu government regulations, all buildings on plots of 100 sq.m and above must have rainwater harvesting structures. For buildings submitted to the Chennai Metropolitan Development Authority (CMDA) or the Directorate of Town and Country Planning (DTCP), rainwater harvesting details must be included in the building plan submission. Failure to comply can result in withholding of the completion certificate.</p>

        <h3 class="text-2xl font-semibold mt-8 mb-4">Cost of Rainwater Harvesting Installation</h3>
        <p class="mb-4 text-lg leading-relaxed opacity-80">For a typical residential home in Tamil Nadu:</p>
        <ul class="list-disc pl-6 mb-6 space-y-2 text-lg opacity-80">
          <li>Basic percolation pit system: ₹8,000 – ₹15,000</li>
          <li>Rooftop collection with 5,000-litre sump: ₹25,000 – ₹45,000</li>
          <li>Full system with first-flush diverter, filter unit, and 20,000-litre storage: ₹60,000 – ₹1,20,000</li>
        </ul>
        <p class="mb-4 text-lg leading-relaxed opacity-80">When integrated during construction (rather than retrofitted), costs are lower and the system performs better because pipework and sumps are planned from the ground up.</p>

        <h3 class="text-2xl font-semibold mt-8 mb-4">How Karrcholai Integrates Rainwater Harvesting</h3>
        <p class="mb-4 text-lg leading-relaxed opacity-80">At Karrcholai, rainwater harvesting is planned from Day 1 — not added as an afterthought. Our Cholai division handles the full design, installation, and commissioning of rainwater systems as part of every residential project. The Karur Residence, one of our completed projects, features a 50,000-litre underground storage system that meets 100% of the home's non-potable water needs through the monsoon months.</p>
        <p class="mb-4 text-lg leading-relaxed opacity-80">To discuss rainwater harvesting for your new home or to add it to an existing home, contact us at +91-97414-16747.</p>
      ` },
    ],
  },
  {
    id: 803,
    title: "Vastu Shastra for New Homes — The 7 Most Important Rules",
    category: 'Land and Plot Tips',
    date: 'August 2026',
    image: null,
    heroType: 'text',
    author: 'Karrcholai Team',
    excerpt: "Vastu Shastra has guided Indian home design for thousands of years. These 7 core principles — from main door direction to kitchen placement — are the ones that matter most when planning a new home in Tamil Nadu.",
    gallery: [
      { type: 'html', content: `
        <h2 class="text-3xl font-bold mt-10 mb-6">Vastu Shastra for New Homes — The 7 Most Important Rules</h2>
        <p class="mb-4 text-lg leading-relaxed opacity-80">Vastu Shastra is one of the oldest architectural sciences in the world. Rooted in the Vedic tradition and refined through centuries of practice, it offers a framework for designing homes that align with natural energy forces — promoting health, prosperity, and peace for the people who live in them. In Tamil Nadu, Vastu principles are closely related to <strong>Manaiyadi Sastram</strong>, the traditional Tamil system of home measurement and orientation.</p>
        <p class="mb-4 text-lg leading-relaxed opacity-80">Here are the 7 Vastu rules that matter most when planning a new home.</p>

        <h3 class="text-2xl font-semibold mt-8 mb-4">1. Main Door Direction — The Most Important Factor</h3>
        <p class="mb-4 text-lg leading-relaxed opacity-80">The main entrance is the primary entry point for energy into your home. According to Vastu, the most auspicious directions for the main door are <strong>north, northeast, east, and west</strong>. South-facing entrances are generally considered less favourable, though remedies exist depending on the specific position within the south face.</p>
        <p class="mb-4 text-lg leading-relaxed opacity-80">In Tamil Nadu, the exact position is determined using the <strong>Aaya calculation in Manaiyadi Sastram</strong> — which divides each wall into specific zones, some auspicious and some not. Our free <a href="/manaiyadi/calculator" class="underline">Manaiyadi Calculator</a> can help you determine the right door position for your plot.</p>

        <h3 class="text-2xl font-semibold mt-8 mb-4">2. Kitchen Placement — Southeast is Best</h3>
        <p class="mb-4 text-lg leading-relaxed opacity-80">The kitchen represents the fire element (Agni). Vastu recommends placing the kitchen in the <strong>southeast corner</strong> of the home, which is governed by Agni in the Vastu Purusha Mandala. The cook should ideally face east while cooking. The northwest is the second-best option. Avoid placing the kitchen in the northeast (sacred space) or southwest (stability zone).</p>

        <h3 class="text-2xl font-semibold mt-8 mb-4">3. Master Bedroom — Southwest for Stability</h3>
        <p class="mb-4 text-lg leading-relaxed opacity-80">The southwest corner of a home is associated with the earth element and represents stability, strength, and groundedness. Vastu recommends the <strong>master bedroom in the southwest</strong>, with the head of the bed pointing south or west. This is said to promote deep, restful sleep and financial stability for the head of the household.</p>

        <h3 class="text-2xl font-semibold mt-8 mb-4">4. Pooja Room — Northeast is Sacred</h3>
        <p class="mb-4 text-lg leading-relaxed opacity-80">The northeast corner (Ishanya) is considered the most sacred zone in the Vastu Purusha Mandala — associated with divine energy, clarity, and spiritual connection. The <strong>pooja room should be in the northeast</strong>. The person praying should ideally face east or north. Keep this corner clean, well-lit, and free from heavy structures or plumbing.</p>

        <h3 class="text-2xl font-semibold mt-8 mb-4">5. Bathroom and Toilet Placement — Avoid Northeast</h3>
        <p class="mb-4 text-lg leading-relaxed opacity-80">Bathrooms and toilets should never be placed in the northeast corner, as this disrupts the sacred energy of that zone. The recommended positions are <strong>northwest or west for bathrooms</strong>, and <strong>south or southwest for toilets</strong>. Ensure bathrooms are well-ventilated and that water drainage flows toward the north or east.</p>

        <h3 class="text-2xl font-semibold mt-8 mb-4">6. Plot Shape and Slope</h3>
        <p class="mb-4 text-lg leading-relaxed opacity-80">Vastu favours <strong>square or rectangular plots</strong> with right angles. Irregular shapes — particularly plots with extensions in the southwest or cuts in the northeast — are considered inauspicious. For plot slope, a gentle slope toward the north or east is preferred, as it encourages the flow of positive energy inward. Southwest elevation (higher ground in the southwest) is considered very auspicious.</p>

        <h3 class="text-2xl font-semibold mt-8 mb-4">7. Open Space — More in North and East</h3>
        <p class="mb-4 text-lg leading-relaxed opacity-80">Vastu recommends leaving more open space on the <strong>north and east sides</strong> of the home, and less on the south and west. This allows morning sunlight and positive energy to enter freely from the east while the heavier, more stable elements of the southwest anchor the structure. In Tamil Nadu, this principle also helps with natural ventilation given prevailing wind patterns.</p>

        <h3 class="text-2xl font-semibold mt-8 mb-4">Vastu and Modern Construction — How We Approach It</h3>
        <p class="mb-4 text-lg leading-relaxed opacity-80">At Karrcholai, we believe Vastu is most effective when integrated from the design stage — not retrofitted after construction. Our team reviews every layout against Vastu principles and Manaiyadi Sastram during the planning phase. This adds no extra time or cost to the project when done correctly from the beginning.</p>
        <p class="mb-4 text-lg leading-relaxed opacity-80">Use our <a href="/vastu-compass" class="underline">free Vastu compass tool</a> to check the orientation of your plot, or try the <a href="/manaiyadi/calculator" class="underline">Manaiyadi calculator</a> to determine auspicious dimensions for your doors and rooms. For a detailed Vastu consultation as part of your construction project, contact us at +91-97414-16747.</p>
      ` },
    ],
  },
];

export const categories = [
  'All Insights',
  'Engineering Legends',
  'Construction Tips',
  'Single Stone Stories',
  'Land and Plot Tips',
];

