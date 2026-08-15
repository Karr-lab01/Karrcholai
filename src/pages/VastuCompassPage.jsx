import React from 'react'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import UnifiedFooter from '../components/UnifiedFooter'
import VastuCompass from '../components/vastu/VastuCompass'
import VastuDirectionCompass from '../components/vastu/VastuDirectionCompass'

const VastuCompassPage = () => {
  return (
    <div className="min-h-screen font-sans overflow-x-hidden" style={{ background: '#F5F2EC' }}>
      <Helmet>
        <title>Free Vastu Direction Compass Tool | Home Planning Tamil Nadu | Karrcholai</title>
        <meta
          name="description"
          content="Free online Vastu Purusha Mandala compass — check auspicious directions for main door, kitchen, bedroom, and pooja room. Upload your floor plan and get Vastu compliance scores. Free tool by Karrcholai, Tamil Nadu."
        />
        <link rel="canonical" href="https://karrcholai.com/vastu-compass" />
        <meta property="og:title" content="Free Vastu Direction Compass Tool | Karrcholai Tamil Nadu" />
        <meta property="og:description" content="Free online Vastu compass — map rooms to compass directions, score Vastu compliance, get remedy suggestions. Upload your floor plan. No sign-up required." />
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
        {/* Visually-hidden SEO H1 */}
        <h1 className="sr-only">Free Vastu Direction Compass — Check Vastu Compliance for Your Home in Tamil Nadu</h1>

        {/* ── Vastu Direction Guide (static compass, click-to-explore) ── */}
        <section style={{ background: '#F5F2EC' }} className="pt-36 pb-10 px-4 md:px-6">
          <div className="mx-auto max-w-5xl">
            <VastuDirectionCompass />
          </div>
        </section>

        {/* ── Divider ── */}
        <div className="mx-auto max-w-5xl px-4 md:px-6 py-2">
          <div className="border-t border-stone-200" />
        </div>

        {/* ── Original compass + floor plan overlay tool ── */}
        <section id="compass-tool" data-compass-tool style={{ background: '#F5F2EC' }} className="pt-8 pb-16 md:pb-24 px-4 md:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-100 border border-stone-200 mb-3">
                <span className="text-xs">📐</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-stone-500">Floor Plan Overlay Tool</span>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-2">Align Compass to Your Floor Plan</h2>
              <p className="text-sm text-slate-500 font-medium">Upload your floor plan, rotate the compass to match true North, and download</p>
            </div>
            <VastuCompass />
          </div>
        </section>
      </main>

      <UnifiedFooter />
    </div>
  )
}

export default VastuCompassPage

