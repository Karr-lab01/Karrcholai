import React from 'react'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import UnifiedFooter from '../components/UnifiedFooter'
import VastuCompass from '../components/vastu/VastuCompass'

const VastuCompassPage = () => {
  return (
    <div className="min-h-screen font-sans overflow-x-hidden" style={{ background: '#F5F2EC' }}>
      <Helmet>
        <title>Vastu Bhagavan — Direction Compass | Karrcholai</title>
        <meta
          name="description"
          content="Explore the sacred Vastu Purusha Mandala. Check if your home or plot follows Vastu Shastra principles with our interactive compass — room mapping, scoring, and Vedic remedies."
        />
        <link rel="canonical" href="https://karrcholai.com/vastu-compass" />
      </Helmet>

      <Navbar />

      <main>
        {/* ── Compass Tool Only ── */}
        <section data-compass-tool style={{ background: '#F5F2EC' }} className="pt-32 md:pt-36 pb-16 md:pb-24 px-4 md:px-6">
          <div className="mx-auto max-w-6xl">
            <VastuCompass />
          </div>
        </section>
      </main>

      <UnifiedFooter />
    </div>
  )
}


export default VastuCompassPage

