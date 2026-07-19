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
    id: 602,
    title: "How Arun Built His Dream Home — The Full Story",
    category: 'Client Stories',
    date: 'November 2024',
    image: null,
    heroType: 'whatsapp-story',
    author: 'Karrcholai Team',
    excerpt: "Follow Arun's 8-month journey — from the first site visit to moving day. Arun Kumar's 8-month journey building his family's dream home in Erode.",
    gallery: [
      { type: 'whatsapp', story: arunWhatsAppStory },
    ],
  },
];

export const categories = [
  'All Insights',
  'Engineering Legends',
  'Construction Tips',
  'Client Stories',
  'Land and Plot Tips',
];

