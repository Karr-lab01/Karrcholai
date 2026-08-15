import React from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import UnifiedFooter from '../components/UnifiedFooter'
import MeasurementTable from '../components/manaiyadi/MeasurementTable'

const ManaiyadiDimensionGuide = () => {
 return (
 <div className="bg-[#fdfbf7] min-h-screen text-dark font-sans overflow-x-hidden">
 <Helmet>
 <title>Manaiyadi Dimension Guide &amp; Auspicious Wall Heights | Tamil Nadu | Karrcholai</title>
 <meta
 name="description"
 content="Complete Manaiyadi Sastram reference tables — auspicious and unfavourable room dimensions (6–100 ft) and ceiling heights (6–30 ft) for traditional Tamil residential construction in Tamil Nadu."
 />
 <link rel="canonical" href="https://karrcholai.com/manaiyadi/dimension-guide" />
 <meta property="og:title" content="Manaiyadi Dimension Guide &amp; Auspicious Wall Heights | Karrcholai" />
 <meta property="og:description" content="Complete Manaiyadi Sastram reference tables for auspicious room dimensions and wall heights for Tamil home construction." />
 <meta property="og:url" content="https://karrcholai.com/manaiyadi/dimension-guide" />
 <script type="application/ld+json">{JSON.stringify({
   "@context": "https://schema.org",
   "@type": "BreadcrumbList",
   "itemListElement": [
     { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://karrcholai.com/" },
     { "@type": "ListItem", "position": 2, "name": "Manaiyadi Sastram", "item": "https://karrcholai.com/manaiyadi" },
     { "@type": "ListItem", "position": 3, "name": "Dimension Guide", "item": "https://karrcholai.com/manaiyadi/dimension-guide" }
   ]
 })}</script>
 </Helmet>

 <Navbar />

 <main style={{ paddingTop: '100px' }}>
 {/* Page Header */}
 <section className="py-16 md:py-24 px-6">
 <div className="mx-auto max-w-7xl">
 <motion.div
 initial={{ opacity: 0, y: 40 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
 className="mb-16 md:mb-24"
 >
 <h3 className="text-secondary font-black tracking-[0.5em] uppercase text-[10px] mb-4">
 Reference Tables
 </h3>
 <h1 className="text-4xl md:text-8xl font-black text-dark tracking-tighter uppercase leading-none mb-6">
 Dimension Guide <br />
 <span className="text-primary">& Wall Height.</span>
 </h1>
 <div className="w-12 h-1 bg-primary mb-8"></div>
 <p className="text-dark/50 text-base md:text-lg font-light max-w-2xl leading-relaxed">
 A complete reference of favourable and unfavourable room dimensions and ceiling heights according to traditional Manaiyadi Sastram practice.
 </p>
 </motion.div>

 <motion.div
 initial={{ opacity: 0, y: 30 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
 >
 <MeasurementTable />
 </motion.div>
 </div>
 </section>
 </main>

 <UnifiedFooter />
 </div>
 )
}

export default ManaiyadiDimensionGuide
