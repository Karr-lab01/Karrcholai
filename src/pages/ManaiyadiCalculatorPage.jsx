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
 <title>Free Manaiyadi Dimension Calculator | Auspicious Room Sizes Tamil Nadu | Karrcholai</title>
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
 </main>

 <UnifiedFooter />
 </div>
 )
}

export default ManaiyadiCalculatorPage
