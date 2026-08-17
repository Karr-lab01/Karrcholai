import React from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import UnifiedFooter from '../components/UnifiedFooter'
import ManaiyadiCalculator from '../components/manaiyadi/ManaiyadiCalculator'

const ManaiyadiCalculatorPage = () => {
 return (
 <div className="bg-[#fdfbf7] min-h-screen text-dark font-sans overflow-x-hidden">
 <Helmet>
 <title>Free Manaiyadi Calculator Tamil Nadu | Karrcholai Construction</title>
 <meta
 name="description"
 content="Free Manaiyadi Sastram dimension calculator — enter room measurements in feet and instantly check whether they are auspicious, neutral, or unfavourable for Tamil home construction. No sign-up required."
 />
 <link rel="canonical" href="https://karrcholai.com/manaiyadi/calculator" />
 <meta property="og:title" content="Free Manaiyadi Dimension Calculator | Karrcholai Tamil Nadu" />
 <meta property="og:description" content="Free Manaiyadi Sastram calculator — check auspicious room dimensions for Tamil home construction. Instant results, no sign-up required." />
 <meta property="og:url" content="https://karrcholai.com/manaiyadi/calculator" />
 <script type="application/ld+json">{JSON.stringify({
   "@context": "https://schema.org",
   "@type": "BreadcrumbList",
   "itemListElement": [
     { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://karrcholai.com/" },
     { "@type": "ListItem", "position": 2, "name": "Manaiyadi Sastram", "item": "https://karrcholai.com/manaiyadi" },
     { "@type": "ListItem", "position": 3, "name": "Manaiyadi Calculator", "item": "https://karrcholai.com/manaiyadi/calculator" }
   ]
 })}</script>
 </Helmet>

 <Navbar />

 <main style={{ paddingTop: '100px' }}>
 {/* Page Header */}
 <section className="py-16 md:py-24 px-6 bg-[#fdfbf7]">
 <div className="mx-auto max-w-6xl">
 <motion.div
 initial={{ opacity: 0, y: 40 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
 className="text-center mb-16 md:mb-24"
 >
 <h3 className="text-secondary font-black tracking-[0.3em] md:tracking-[0.5em] uppercase text-[10px] mb-4 md:mb-6">
 Manaiyadi Calculator
 </h3>
 <h1 className="text-4xl md:text-8xl font-black text-dark mb-6 md:mb-8 tracking-tighter uppercase">
 Dimension <br className="md:hidden" />{' '}
 <span className="text-primary">Calculator.</span>
 </h1>
 <div className="w-12 h-1 bg-primary mx-auto mb-8"></div>
 <p className="text-dark/50 text-base md:text-lg font-light max-w-xl mx-auto leading-relaxed">
 Enter your room dimensions to instantly check auspiciousness based on traditional Manaiyadi Sastram formulas.
 </p>
 </motion.div>

 <motion.div
 initial={{ opacity: 0, y: 30 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
 >
 <ManaiyadiCalculator />
 </motion.div>
 </div>
 </section>

 {/* Topical cluster: Vastu Compass → Construction → Projects → Contact */}
 <section className="py-12 px-6 border-t" style={{ background: '#faf9f6', borderColor: 'rgba(0,0,0,0.05)' }}>
  <div className="mx-auto max-w-6xl">
   <p className="text-[9px] font-black tracking-[0.5em] uppercase mb-5 text-dark/25">Explore This Topic</p>
   <div className="flex flex-wrap items-center gap-3">
    {[
     { to: '/vastu-compass', emoji: '🧭', label: 'Free Tool',               title: 'Vastu Compass',       bg: 'linear-gradient(135deg, #1a2e1a, #0d1a0d)', accent: '#d4af37' },
     { to: '/blog/701',      emoji: '📖', label: 'Vastu Article',            title: 'Vastu Shastras',      bg: 'linear-gradient(135deg, #2D4B37, #1a2e1a)', accent: '#B85C38' },
     { to: '/karr',          emoji: '🏗️', label: 'Residential Construction', title: 'Karr Division',      bg: 'linear-gradient(135deg, #3a2010, #1a1a1a)', accent: 'rgba(255,255,255,0.45)' },
     { to: '/projects',      emoji: '🏠', label: 'Our Portfolio',            title: 'View Projects',       bg: 'linear-gradient(135deg, #2a2a2a, #1a1a1a)', accent: 'rgba(255,255,255,0.35)' },
     { to: '/contact',       emoji: '📞', label: 'Free Consultation',         title: 'Talk to Karrcholai', bg: '#1A1A1A', accent: 'rgba(255,255,255,0.35)' },
    ].map((cl, idx, arr) => (
     <span key={cl.to} className="flex items-center gap-3">
      <a href={cl.to}
       className="flex items-center gap-3 rounded-xl px-4 py-3 transition-opacity hover:opacity-80"
       style={{ background: cl.bg, textDecoration: 'none' }}>
       <span className="text-lg">{cl.emoji}</span>
       <span>
        <span className="block text-[7px] font-black tracking-[0.35em] uppercase mb-0.5" style={{ color: cl.accent }}>{cl.label}</span>
        <span className="block text-[12px] font-bold text-white whitespace-nowrap">{cl.title}</span>
       </span>
      </a>
      {idx < arr.length - 1 && <span className="text-dark/20 font-black text-xs">→</span>}
     </span>
    ))}
   </div>
  </div>
 </section>
 </main>

 <UnifiedFooter />
 </div>
 )
}

export default ManaiyadiCalculatorPage
