import React from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import UnifiedFooter from '../components/UnifiedFooter'
import VastuCompass from '../components/vastu/VastuCompass'
import VastuPurushaHero from '../components/vastu/VastuPurushaHero'

const VastuCompassPage = () => {
  return (
    <div className="min-h-screen font-sans overflow-x-hidden" style={{ background: '#0E0C08' }}>
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
        {/* ── Vastu Purusha Hero ── */}
        <VastuPurushaHero />

        {/* ── Compass Tool ── */}
        <section data-compass-tool style={{ background: '#F5F2EC' }} className="py-16 md:py-24 px-4 md:px-6">
          <div className="mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="text-center mb-12"
            >
              <p className="text-xs font-black tracking-[0.4em] uppercase mb-3"
                style={{ color: '#B85C38' }}>
                Sacred Tool
              </p>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4"
                style={{ color: '#1a1a1a' }}>
                Align Your Home with the <span style={{ color: '#2D4B37' }}>Mandala</span>
              </h2>
              <p className="text-sm md:text-base font-light max-w-lg mx-auto leading-relaxed"
                style={{ color: 'rgba(26,26,26,0.5)' }}>
                Upload your floor plan, orient the compass to True North, assign your rooms —
                and receive an instant Vastu compliance score based on the Vastu Purusha Mandala.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <VastuCompass />
            </motion.div>
          </div>
        </section>

        {/* ── The Story of Vastu Purusha ── */}
        <VastuPurushaStory />
      </main>

      <UnifiedFooter />
    </div>
  )
}

// ── The Legend Section ─────────────────────────────────────────────────────────
function VastuPurushaStory() {
  const facts = [
    {
      icon: '🌀',
      title: 'The Origin',
      text: 'Born from sweat drops of Lord Shiva during his battle with Andhakasura — a cosmic being of immense power and hunger who threatened all creation.',
    },
    {
      icon: '⚡',
      title: 'The Conquest',
      text: 'Brahma and the 45 Devatas pinned him face-down to the earth, each deity occupying a specific zone of his body — creating the sacred energy grid.',
    },
    {
      icon: '🏛️',
      title: 'The Blessing',
      text: 'Brahma granted him divinity: he became Vastu Purusha — the presiding deity of every plot and structure, whose blessings ensure harmony and prosperity.',
    },
    {
      icon: '🧭',
      title: 'The Mandala',
      text: 'His body forms the 8×8 or 9×9 grid (Paramasayika or Manduka). His head lies in the NE (Ishan), feet in the SW (Nairuta) — dictating every room placement.',
    },
  ]

  const bodyZones = [
    { zone: 'NE (Ishan)', bodyPart: 'Head', deity: 'Shiva', rule: 'Sacred — prayer rooms, water sources' },
    { zone: 'E (East)', bodyPart: 'Right Shoulder', deity: 'Indra', rule: 'Living rooms, light & air' },
    { zone: 'SE (Agneya)', bodyPart: 'Right Foot', deity: 'Agni', rule: 'Kitchen — fire zone' },
    { zone: 'S (South)', bodyPart: 'Chest / Ribs', deity: 'Yama', rule: 'Stability — avoid main rooms' },
    { zone: 'SW (Nairuta)', bodyPart: 'Feet', deity: 'Nirriti', rule: 'Master bedroom — heavy/stable' },
    { zone: 'W (West)', bodyPart: 'Left Shoulder', deity: 'Varuna', rule: 'Dining rooms — gains' },
    { zone: 'NW (Vayavya)', bodyPart: 'Left Hip', deity: 'Vayu', rule: 'Children\'s room — movement' },
    { zone: 'Centre', bodyPart: 'Navel / Brahmasthan', deity: 'Brahma', rule: 'Must remain open — no pillars' },
  ]

  return (
    <section style={{ background: '#0E0C08' }} className="py-20 md:py-32 px-4 md:px-6">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <p className="text-xs font-black tracking-[0.4em] uppercase mb-3" style={{ color: '#B85C38' }}>
            Vedic Legend
          </p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-5 text-white">
            The Story of <span style={{ color: '#C9754A' }}>Vastu Bhagavan</span>
          </h2>
          <div className="w-12 h-px mx-auto mb-5" style={{ background: '#B85C38' }} />
          <p className="text-sm font-light max-w-xl mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Every structure built on this earth rests upon the body of Vastu Purusha.
            His presence governs the cosmic energies of every room, every wall, every threshold.
          </p>
        </motion.div>

        {/* 4 story cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {facts.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl p-6 border"
              style={{
                background: 'rgba(255,255,255,0.03)',
                borderColor: 'rgba(255,255,255,0.07)',
              }}
            >
              <span className="text-2xl block mb-3">{f.icon}</span>
              <h3 className="text-sm font-black text-white mb-2 tracking-wide">{f.title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>{f.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Body Zone Table */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl overflow-hidden border"
          style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}
        >
          <div className="px-6 py-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <p className="text-xs font-black tracking-[0.3em] uppercase" style={{ color: '#B85C38' }}>Mandala Map</p>
            <p className="text-base font-black text-white mt-1">Vastu Purusha Body-to-Zone Correspondence</p>
          </div>
          <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
            {bodyZones.map((z, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-4 flex-wrap md:flex-nowrap">
                <span className="text-xs font-black w-28 shrink-0" style={{ color: '#C9754A' }}>{z.zone}</span>
                <span className="text-xs font-bold w-36 shrink-0 text-white">{z.bodyPart}</span>
                <span className="text-xs w-24 shrink-0" style={{ color: 'rgba(255,255,255,0.5)' }}>{z.deity}</span>
                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{z.rule}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Disclaimer */}
        <p className="text-center text-[10px] mt-8 leading-relaxed max-w-lg mx-auto"
          style={{ color: 'rgba(255,255,255,0.2)' }}>
          Content based on traditional Vastu Shastra references including Manasara, Mayamata, and Vishwakarma Prakash.
          This is an educational guide — consult a certified Vastu consultant for structural decisions.
        </p>
      </div>
    </section>
  )
}

export default VastuCompassPage
