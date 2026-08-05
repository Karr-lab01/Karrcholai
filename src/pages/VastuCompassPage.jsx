import React from 'react'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import UnifiedFooter from '../components/UnifiedFooter'
import VastuCompass from '../components/vastu/VastuCompass'

const VastuCompassPage = () => {
  return (
    <div className="min-h-screen font-sans overflow-x-hidden" style={{ background: '#F5F2EC' }}>
      <Helmet>
        <title>Vastu Direction Compass | Karrcholai</title>
        <meta
          name="description"
          content="Interactive Vastu Purusha Mandala compass — map your rooms to compass directions, score your home's Vastu compliance, and get Vedic remedy suggestions. Free tool by Karrcholai."
        />
        <link rel="canonical" href="https://karrcholai.com/vastu-compass" />
        <meta property="og:title" content="Vastu Direction Compass | Karrcholai" />
        <meta property="og:description" content="Interactive Vastu Purusha Mandala compass — map your rooms to compass directions, score your home's Vastu compliance, and get Vedic remedy suggestions. Free tool by Karrcholai." />
        <meta property="og:url" content="https://karrcholai.com/vastu-compass" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://karrcholai.com/" },
            { "@type": "ListItem", "position": 2, "name": "Vastu Compass", "item": "https://karrcholai.com/vastu-compass" }
          ]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Karrcholai Vastu Direction Compass",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "Web",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
          "description": "Free interactive Vastu Purusha Mandala compass. Map your home's rooms to compass directions, check Vastu compliance scores, and get traditional Vedic remedy suggestions for each room.",
          "provider": {
            "@type": "Organization",
            "name": "Karrcholai Construction",
            "url": "https://karrcholai.com"
          },
          "url": "https://karrcholai.com/vastu-compass",
          "keywords": "vastu compass, vastu shastra tool, vastu direction calculator, vastu purusha mandala, free vastu tool Tamil Nadu"
        })}</script>
      </Helmet>

      <Navbar />

      <main>
        <section id="compass-tool" data-compass-tool style={{ background: '#F5F2EC' }} className="pt-36 pb-16 md:pb-24 px-4 md:px-6">
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

