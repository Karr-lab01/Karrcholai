import React from 'react'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import UnifiedFooter from '../components/UnifiedFooter'
import FAQSection from '../components/FAQSection'
import VastuDirectionCompass from '../components/vastu/VastuDirectionCompass'

const VastuCompassPage = () => {
  return (
    <div className="min-h-screen font-sans overflow-x-hidden" style={{ background: '#F5F2EC' }}>
      <Helmet>
        <title>Free Vastu Direction Compass Tamil Nadu | Karrcholai Construction</title>
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

        {/* Topical cluster: Vastu article → Manaiyadi Calculator → Construction → Contact */}
        <section className="py-12 px-4 md:px-6" style={{ background: '#F5F2EC' }}>
          <div className="mx-auto max-w-5xl">
            <p className="text-[9px] font-black tracking-[0.5em] uppercase mb-5" style={{ color: 'rgba(0,0,0,0.25)' }}>
              Explore This Topic
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {[
                { to: '/blog/701',             emoji: '📖', label: 'Vastu Article',         title: 'Vastu Shastras',         bg: 'linear-gradient(135deg, #1a2e1a, #0d1a0d)',   accent: '#d4af37' },
                { to: '/manaiyadi/calculator', emoji: '📐', label: 'Free Tool',             title: 'Manaiyadi Calculator',   bg: 'linear-gradient(135deg, #2D4B37, #1a2e1a)',   accent: '#B85C38' },
                { to: '/karr',                 emoji: '🏗️', label: 'Construction',          title: 'Karr Division',          bg: 'linear-gradient(135deg, #3a2010, #1a1a1a)',   accent: 'rgba(255,255,255,0.45)' },
                { to: '/projects',             emoji: '🏠', label: 'Our Portfolio',         title: 'View Projects',          bg: 'linear-gradient(135deg, #2a2a2a, #1a1a1a)',   accent: 'rgba(255,255,255,0.35)' },
                { to: '/contact',              emoji: '📞', label: 'Free Consultation',      title: 'Talk to Karrcholai',     bg: '#1A1A1A',                                     accent: 'rgba(255,255,255,0.35)' },
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
                  {idx < arr.length - 1 && <span className="font-black text-xs" style={{ color: 'rgba(0,0,0,0.2)' }}>→</span>}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>

      <FAQSection
        accent="#3F5F4A"
        subtitle="Vastu Questions"
        title="Common Vastu Shastra Questions"
        faqs={[
          {
            q: 'Do you provide Vastu consultation for home construction?',
            a: 'Yes. Karrcholai integrates Vastu Shastra principles into every residential project — from plot orientation and main door placement to room positions, kitchen direction, and bedroom alignment. We ensure your home is both structurally sound and Vastu-compliant.',
          },
          {
            q: 'What is the best direction for the main door according to Vastu?',
            a: 'North and east-facing entrances are generally considered most auspicious in Vastu Shastra, as they invite sunlight and positive energy. However, the ideal direction also depends on the householder\'s birth star and the plot\'s orientation. Our compass tool helps you explore all eight directions.',
          },
          {
            q: 'Which direction should the kitchen face in Vastu?',
            a: 'The southeast direction, governed by Agni (fire), is traditionally recommended for the kitchen in Vastu Shastra. The cook should ideally face east while preparing food. Northwest is an acceptable alternative if southeast is not possible.',
          },
          {
            q: 'Where should the master bedroom be in a Vastu-compliant home?',
            a: 'The southwest corner of the house is considered ideal for the master bedroom, as it represents stability and strength (the earth element). The head of the household sleeping in the southwest promotes authority and good health according to Vastu principles.',
          },
          {
            q: 'Can Vastu be applied to an existing home or only during construction?',
            a: 'Vastu remedies can be applied to existing homes through strategic adjustments — repositioning furniture, adding mirrors, using colours, plants, or minor structural changes. However, full compliance is most effectively achieved during the design and construction stage.',
          },
          {
            q: 'What is the difference between Vastu Shastra and Manaiyadi Sastram?',
            a: 'Vastu Shastra is a pan-Indian system covering directional orientation and spatial planning. Manaiyadi Sastram is a specifically Tamil system that focuses on the numerical auspiciousness of room dimensions and wall heights. At Karrcholai, we apply both systems together for a culturally complete home.',
          },
        ]}
      />

      <UnifiedFooter />
    </div>
  )
}

export default VastuCompassPage

