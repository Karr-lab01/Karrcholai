import React from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import UnifiedFooter from '../components/UnifiedFooter'
import VastuCompass from '../components/vastu/VastuCompass'

const VastuCompassPage = () => {
  return (
    <div className="bg-[#fdfbf7] min-h-screen text-dark font-sans overflow-x-hidden">
      <Helmet>
        <title>Vastu Direction Compass | Karrcholai</title>
        <meta
          name="description"
          content="Check if your home or plot layout follows Vastu Shastra principles. Interactive compass tool with room-to-direction mapping, scoring, and plain-language remedies."
        />
        <link rel="canonical" href="https://karrcholai.com/vastu-compass" />
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
              className="text-center mb-16 md:mb-20"
            >
              <h3 className="text-secondary font-black tracking-[0.3em] md:tracking-[0.5em] uppercase text-[10px] mb-4 md:mb-6">
                Vastu Compass
              </h3>
              <h1 className="text-4xl md:text-8xl font-black text-dark mb-6 md:mb-8 tracking-tighter uppercase">
                Direction{' '}
                <span className="text-primary italic">Compass.</span>
              </h1>
              <div className="w-12 h-1 bg-primary mx-auto mb-8" />
              <p className="text-dark/50 text-base md:text-lg font-light max-w-xl mx-auto leading-relaxed">
                Align your home or plot with Vastu Shastra principles. Upload your floor plan,
                orient the compass, assign rooms to directions and get an instant compliance score.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <VastuCompass />
            </motion.div>
          </div>
        </section>
      </main>

      <UnifiedFooter />
    </div>
  )
}

export default VastuCompassPage
