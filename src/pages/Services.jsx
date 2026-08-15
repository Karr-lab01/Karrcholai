import React, { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  FiArrowRight, FiCheck, FiHome, FiTool, FiBriefcase
} from 'react-icons/fi'
import {
  FaLeaf, FaCloudRain, FaSun, FaRecycle,
  FaLightbulb, FaTh, FaHardHat, FaBuilding
} from 'react-icons/fa'
import { MdOutlineEngineering, MdConstruction } from 'react-icons/md'
import Navbar from '../components/Navbar'
import UnifiedFooter from '../components/UnifiedFooter'
import { Helmet } from 'react-helmet-async'

// ── Assets ──────────────────────────────────────────────────────────────────
import imgRes       from '../../assets/Residential_construction.jpg'
import imgPmc       from '../../assets/Projectmanagemnt.png'
import imgReno      from '../../assets/renovation.jpg.jpeg'
import imgConstruct from '../../assets/construction.jpg'
import imgLandscape from '../../assets/lancape.jpg.jpeg'
import imgRain      from '../../assets/rainwater.jpg.jpeg'
import imgSolar     from '../../assets/solar panel.jpg.jpeg'
import imgLighting  from '../../assets/lighting.jpg'
import imgFloor     from '../../assets/red-floor.jpg'
import imgHero      from '../../assets/pexels-kawserhamid-176342.jpg'


// ── Sub-service card component ───────────────────────────────────────────────
const SubServiceCard = ({ icon, label, desc, img, accent, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -6, boxShadow: '0 24px 60px rgba(0,0,0,0.13)' }}
    style={{
      background: '#fff',
      borderRadius: '1.75rem',
      overflow: 'hidden',
      border: '1px solid rgba(26,26,26,0.07)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
      transition: 'box-shadow 0.3s',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    {/* Image or gradient placeholder */}
    <div style={{ height: 180, overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
      {img ? (
        <img src={img} alt={label} loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            transition: 'transform 0.6s ease' }} />
      ) : (
        <div style={{ width: '100%', height: '100%',
          background: `linear-gradient(135deg, ${accent}18 0%, ${accent}08 100%)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: accent, fontSize: 52, opacity: 0.5 }}>
          {icon}
        </div>
      )}
      {/* Icon badge */}
      <div style={{
        position: 'absolute', bottom: 12, left: 16,
        width: 44, height: 44, borderRadius: '14px',
        background: '#fff',
        boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: accent, fontSize: 20,
      }}>
        {icon}
      </div>
    </div>

    {/* Content */}
    <div style={{ padding: '1.5rem', flex: 1 }}>
      <h4 style={{
        fontSize: '0.95rem', fontWeight: 800, color: '#1A1A1A',
        letterSpacing: '-0.01em', marginBottom: '0.6rem',
      }}>{label}</h4>
      <div style={{ width: 32, height: 2, background: accent, borderRadius: 2, marginBottom: '0.85rem' }} />
      <p style={{
        fontSize: '0.82rem', color: 'rgba(26,26,26,0.52)',
        lineHeight: 1.75, fontWeight: 300, margin: 0,
      }}>{desc}</p>
    </div>
  </motion.div>
)


// ── Data ─────────────────────────────────────────────────────────────────────
const mainServices = [
  {
    id: 'pmc',
    tag: 'Project Management Consultancy',
    title: 'PMC Services',
    headline: ['Expert oversight,', 'end-to-end.'],
    desc: 'Our Project Management Consultancy covers the full construction lifecycle — planning, procurement, supervision, and handover. We act as your trusted representative on site, so your project finishes on time, on budget, and without compromise.',
    heroImg: imgPmc,
    accent: '#B85C38',
    num: '01',
    features: [
      'Budget & Timeline Management',
      'Contractor Coordination',
      'Quality Assurance',
      'Risk Mitigation',
      'Progress Reporting',
      'Handover & Documentation',
    ],
    subLabel: 'Services under PMC',
    subDesc: 'Everything below is handled and coordinated within our PMC engagement — one contract, one team, zero loose ends.',
    subServices: [
      { icon: <FaLeaf />, label: 'Landscape Development', img: imgLandscape,
        desc: 'We design outdoor spaces that enhance your property — native planting, green area planning, and practical garden layout to complement the architecture.' },
      { icon: <FaCloudRain />, label: 'Rainwater Harvesting', img: imgRain,
        desc: 'Site-specific rainwater collection and groundwater recharge systems integrated into your build from day one, reducing dependency on municipal water.' },
      { icon: <FaSun />, label: 'Solar Energy Solutions', img: imgSolar,
        desc: 'We design and integrate solar panel systems aligned with your roof layout and energy goals — cutting long-term electricity costs from the ground up.' },
      { icon: <FaRecycle />, label: 'Waste Management', img: null,
        desc: 'Planned waste segregation, composting systems, and debris management built into the project schedule for a cleaner, more responsible build process.' },
      { icon: <FaLightbulb />, label: 'Smart Lighting', img: imgLighting,
        desc: 'LED and smart control lighting systems planned during construction — not retrofitted — so every circuit is efficient, elegant, and right-sized for each space.' },
      { icon: <FaTh />, label: 'Traditional Flooring', img: imgFloor,
        desc: 'Athangudi tiles, oxide flooring, and natural stone selections curated and installed as part of your build — heritage underfoot, planned with the rest of your home.' },
      { icon: <FiTool />, label: 'Renovation & Expansion', img: imgReno,
        desc: 'Structural changes, modern finishes, and Vastu-compliant redesigns managed within the PMC framework — seamlessly coordinated with no disruption.' },
    ],
  },
  {
    id: 'residential',
    tag: 'Residential Construction',
    title: 'Residential Builds',
    headline: ['Your dream home,', 'built right.'],
    desc: "From independent houses to premium villas, we handle every phase of residential construction with precision craftsmanship, quality materials, and a design philosophy rooted in Tamil Nadu's architectural heritage.",
    heroImg: imgRes,
    accent: '#4A7B5E',
    num: '02',
    features: [
      'Custom Home Design & Build',
      'Luxury Villa Construction',
      'Vastu-Compliant Layout',
      'Premium Material Sourcing',
      'Structural Integrity Guarantee',
      'Interior Finishing & Handover',
    ],
    subLabel: 'Services under Residential',
    subDesc: 'These aren\'t sold separately. They are fully integrated into every residential project we deliver — planned, executed, and quality-checked by our team.',
    subServices: [
      { icon: <FaLeaf />, label: 'Landscape Development', img: imgLandscape,
        desc: 'Outdoor spaces designed to grow with your home — lawn planning, garden beds, tree placement, and hardscaping that ties the exterior together.' },
      { icon: <FaCloudRain />, label: 'Rainwater Harvesting', img: imgRain,
        desc: 'Integrated rooftop collection, storage tanks, and recharge pits that secure water availability long after move-in.' },
      { icon: <FaSun />, label: 'Solar Energy Solutions', img: imgSolar,
        desc: 'Rooftop solar systems planned at design stage — maximising generation and minimising visible clutter with smart panel placement.' },
      { icon: <FaRecycle />, label: 'Waste Management', img: null,
        desc: 'Built-in composting zones, segregation areas, and waste chutes that make sustainable living effortless from day one.' },
      { icon: <FaLightbulb />, label: 'Smart Lighting', img: imgLighting,
        desc: 'Layered lighting design — ambient, task, and accent — using energy-efficient LED systems and natural light strategies tailored to each room.' },
      { icon: <FaTh />, label: 'Traditional Flooring', img: imgFloor,
        desc: 'Timeless Athangudi tiles, lime plaster, and stone finishes that keep your home cool, beautiful, and deeply rooted in culture.' },
      { icon: <FiTool />, label: 'Renovation & Expansion', img: imgReno,
        desc: 'Phase-wise extensions, structural upgrades, and full interior remodels executed with the same quality as a new build.' },
    ],
  },
]

const whyUs = [
  { icon: <MdOutlineEngineering size={28} />, title: '12+ Years on Site', desc: 'Over a decade of residential and PMC projects across Tamil Nadu.' },
  { icon: <FiCheck size={28} />, title: 'Transparent Pricing', desc: 'Detailed estimates, milestone billing, no hidden charges.' },
  { icon: <FaBuilding size={28} />, title: 'Vastu Integrated', desc: 'Every layout reviewed against Manaiyadi and Vastu principles.' },
  { icon: <FaHardHat size={28} />, title: 'Single Point of Contact', desc: 'One dedicated manager from site visit to handover key.' },
  { icon: <MdConstruction size={28} />, title: 'Quality Assured', desc: 'Inspections at every milestone — structure, MEP, and finish.' },
  { icon: <FiBriefcase size={28} />, title: 'Full Documentation', desc: 'Approvals, drawings, and handover files — all organised.' },
]


// ── Main component ────────────────────────────────────────────────────────────
const Services = () => {
  const [activeService, setActiveService] = useState('pmc')
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  const current = mainServices.find(s => s.id === activeService)

  return (
    <div ref={containerRef} style={{ background: '#fdfbf7', minHeight: '100vh', overflowX: 'hidden', fontFamily: 'inherit' }}>
      <Helmet>
        <title>Residential Construction &amp; PMC Services in Tamil Nadu | Karrcholai</title>
        <meta name="description" content="Karrcholai offers residential construction and PMC services in Tamil Nadu — custom homes, renovation, landscape, solar, rainwater harvesting, smart lighting, traditional flooring. Serving Karur, Chennai, Coimbatore, Madurai, Trichy, Erode." />
        <link rel="canonical" href="https://karrcholai.com/services" />
        <meta property="og:title" content="Residential Construction &amp; PMC Services in Tamil Nadu | Karrcholai" />
        <meta property="og:description" content="Karrcholai offers residential construction and PMC services in Tamil Nadu — custom homes, renovation, landscape, solar, rainwater harvesting and more." />
        <meta property="og:url" content="https://karrcholai.com/services" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://karrcholai.com/" },
            { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://karrcholai.com/services" }
          ]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Residential Construction & PMC Services",
          "provider": { "@type": "Organization", "name": "Karrcholai Construction", "url": "https://karrcholai.com" },
          "areaServed": [
            { "@type": "City", "name": "Karur" },
            { "@type": "City", "name": "Chennai" },
            { "@type": "City", "name": "Coimbatore" },
            { "@type": "City", "name": "Madurai" },
            { "@type": "City", "name": "Trichy" },
            { "@type": "City", "name": "Erode" }
          ],
          "serviceType": ["Residential Construction", "Project Management Consultancy", "Home Renovation", "Solar Installation", "Rainwater Harvesting", "Landscape Design"],
          "url": "https://karrcholai.com/services"
        })}</script>
      </Helmet>

      {/* Scroll progress bar */}
      <motion.div style={{ scaleX, background: '#B85C38', position: 'fixed', top: 0, left: 0, right: 0, height: 3, zIndex: 100, transformOrigin: 'left' }} />

      <Navbar />

      {/* Visually-hidden SEO H1 — crawlers read this, UI shows the hero heading */}
      <h1 className="sr-only">Residential Construction &amp; PMC Services in Tamil Nadu — Karrcholai</h1>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', background: '#111' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${imgHero})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.35 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.7) 100%)' }} />
        <div style={{ position: 'absolute', right: '-2rem', bottom: '-4rem', fontSize: 'clamp(12rem,20vw,22rem)', fontWeight: 900, color: 'rgba(255,255,255,0.03)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none', letterSpacing: '-0.05em' }}>SVC</div>

        <div style={{ position: 'relative', zIndex: 10, maxWidth: 1280, margin: '0 auto', padding: 'clamp(120px,18vh,180px) 2rem 80px', width: '100%' }}>
          <motion.span initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            style={{ display: 'inline-block', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#B85C38', marginBottom: '1.5rem' }}>
            What We Deliver
          </motion.span>

          <motion.h1 initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.4 }}
            style={{ fontSize: 'clamp(2.8rem,7vw,6.5rem)', fontWeight: 900, color: '#fff', lineHeight: 1.0, letterSpacing: '-0.02em', margin: '0 0 2rem', maxWidth: '16ch' }}>
            We Build.<br />
            <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>You Live.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6 }}
            style={{ fontSize: 'clamp(0.9rem,1.5vw,1.15rem)', color: 'rgba(255,255,255,0.55)', maxWidth: 520, lineHeight: 1.8, marginBottom: '2.5rem', fontWeight: 300 }}>
            Two core services — PMC and Residential Construction — each covering a full suite of specialised works so your project is built right, inside and out.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }}
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {mainServices.map(s => (
              <button key={s.id} onClick={() => { setActiveService(s.id); document.getElementById('service-detail')?.scrollIntoView({ behavior: 'smooth' }) }}
                style={{ padding: '0.85rem 1.75rem', borderRadius: '6px', border: 'none', cursor: 'pointer',
                  background: activeService === s.id ? s.accent : 'rgba(255,255,255,0.08)',
                  color: '#fff', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase',
                  transition: 'background 0.3s', display: 'flex', alignItems: 'center', gap: 8, backdropFilter: 'blur(10px)' }}>
                {s.id === 'pmc' ? <MdOutlineEngineering size={14} /> : <FiHome size={14} />}
                {s.id === 'pmc' ? 'PMC Services' : 'Residential Builds'}
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
          style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.3em', textTransform: 'uppercase' }}>scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            style={{ width: 16, height: 28, border: '1px solid rgba(255,255,255,0.2)', borderRadius: 20, display: 'flex', justifyContent: 'center', paddingTop: 5 }}>
            <div style={{ width: 2, height: 8, background: 'rgba(255,255,255,0.4)', borderRadius: 4 }} />
          </motion.div>
        </motion.div>
      </section>


      {/* ── STICKY TAB NAV ───────────────────────────────────────────────── */}
      <section id="service-detail" style={{ position: 'sticky', top: 'var(--nav-height-scrolled, 84px)', zIndex: 80,
        background: '#fdfbf7', borderBottom: '1px solid rgba(26,26,26,0.07)', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', gap: '0.25rem', overflowX: 'auto' }}>
          {mainServices.map(s => (
            <button key={s.id} onClick={() => setActiveService(s.id)}
              style={{ flexShrink: 0, padding: '1.1rem 1.75rem', background: 'none', border: 'none', cursor: 'pointer',
                position: 'relative', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase',
                color: activeService === s.id ? '#1A1A1A' : 'rgba(26,26,26,0.4)', transition: 'color 0.3s',
                display: 'flex', alignItems: 'center', gap: 8 }}>
              {s.id === 'pmc' ? <MdOutlineEngineering size={14} /> : <FiHome size={14} />}
              {s.id === 'pmc' ? 'PMC Services' : 'Residential Builds'}
              {activeService === s.id && (
                <motion.span layoutId="tab-underline"
                  style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
                    height: 3, width: '80%', borderRadius: '3px 3px 0 0', background: s.accent }} />
              )}
            </button>
          ))}
        </div>
      </section>


      {/* ── SERVICE DETAIL ───────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div key={current.id}
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>

          {/* ── Service intro block ── */}
          <section style={{ padding: 'clamp(60px,8vw,120px) 2rem', background: '#fdfbf7' }}>
            <div style={{ maxWidth: 1280, margin: '0 auto',
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,480px),1fr))',
              gap: 'clamp(3rem,6vw,7rem)', alignItems: 'center' }}>

              {/* Left: text */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.5rem' }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: `${current.accent}15`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: current.accent, fontSize: 22 }}>
                    {current.id === 'pmc' ? <MdOutlineEngineering /> : <FiHome />}
                  </div>
                  <span style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.35em', textTransform: 'uppercase', color: current.accent }}>{current.tag}</span>
                </div>

                <div style={{ fontSize: 'clamp(5rem,12vw,10rem)', fontWeight: 900, color: 'rgba(26,26,26,0.04)', lineHeight: 0.85, marginBottom: '-1rem', letterSpacing: '-0.05em', pointerEvents: 'none' }}>{current.num}</div>
                <h2 style={{ fontSize: 'clamp(2.2rem,5vw,4.5rem)', fontWeight: 900, color: '#1A1A1A', lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 1.5rem' }}>
                  {current.headline[0]}<br />
                  <span style={{ color: current.accent }}>{current.headline[1]}</span>
                </h2>
                <p style={{ fontSize: 'clamp(0.9rem,1.4vw,1.05rem)', color: 'rgba(26,26,26,0.58)', lineHeight: 1.8, maxWidth: 520, marginBottom: '2.5rem', fontWeight: 300 }}>
                  {current.desc}
                </p>

                {/* Feature checklist */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem 1.5rem', marginBottom: '2.5rem' }}>
                  {current.features.map((f, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 20, height: 20, borderRadius: '50%', flexShrink: 0, background: `${current.accent}18`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: current.accent }}>
                        <FiCheck size={11} strokeWidth={3} />
                      </div>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(26,26,26,0.5)' }}>{f}</span>
                    </div>
                  ))}
                </div>

                <Link to="/contact"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '0.85rem 2rem',
                    background: current.accent, color: '#fff', borderRadius: 6, fontSize: '0.68rem',
                    fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', transition: 'opacity 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                  Get a Free Consultation <FiArrowRight size={14} />
                </Link>
              </div>

              {/* Right: hero image */}
              <div style={{ position: 'relative' }}>
                <motion.div whileHover={{ scale: 1.015 }} transition={{ duration: 0.6 }}
                  style={{ borderRadius: '2.5rem', overflow: 'hidden', aspectRatio: '4/3', boxShadow: '0 32px 80px rgba(0,0,0,0.14)', border: '1px solid rgba(26,26,26,0.06)' }}>
                  <img src={current.heroImg} alt={current.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </motion.div>
                {/* Floating badge */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                  style={{ position: 'absolute', bottom: '-1.5rem', left: '-1.5rem', background: '#fff',
                    borderRadius: 20, padding: '1.25rem 1.5rem', boxShadow: '0 16px 48px rgba(0,0,0,0.12)',
                    border: '1px solid rgba(26,26,26,0.06)', minWidth: 170 }}>
                  <p style={{ fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.25em', textTransform: 'uppercase', color: current.accent, marginBottom: 4 }}>Includes</p>
                  <p style={{ fontSize: '0.85rem', fontWeight: 900, color: '#1A1A1A', letterSpacing: '-0.01em', margin: 0 }}>
                    {current.subServices.length} Specialised Services
                  </p>
                </motion.div>
              </div>
            </div>
          </section>


          {/* ── Sub-services section ── */}
          <section style={{ padding: 'clamp(60px,8vw,100px) 2rem', background: current.id === 'pmc' ? '#fff' : '#fafaf8' }}>
            <div style={{ maxWidth: 1280, margin: '0 auto' }}>

              {/* Section header */}
              <div style={{ marginBottom: 'clamp(2.5rem,5vw,4rem)' }}>
                <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                  style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.35em', textTransform: 'uppercase',
                    color: current.accent, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ display: 'inline-block', width: 28, height: 2, background: current.accent }} />
                  {current.subLabel}
                </motion.p>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
                  <motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    style={{ fontSize: 'clamp(1.8rem,4vw,3.2rem)', fontWeight: 900, color: '#1A1A1A', lineHeight: 1.05, letterSpacing: '-0.02em', margin: 0, maxWidth: '22ch' }}>
                    Every service you need — under one roof.
                  </motion.h3>
                  <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                    style={{ fontSize: '0.9rem', color: 'rgba(26,26,26,0.45)', maxWidth: 380, lineHeight: 1.75, fontWeight: 300, margin: 0 }}>
                    {current.subDesc}
                  </motion.p>
                </div>
              </div>

              {/* ── Premium card grid ── */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
                gap: '1.5rem',
              }}>
                {current.subServices.map((sub, i) => (
                  <SubServiceCard key={i} {...sub} accent={current.accent} index={i} />
                ))}
              </div>

              {/* ── Bottom assurance banner ── */}
              <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
                style={{ marginTop: '3.5rem', borderRadius: '1.75rem', overflow: 'hidden',
                  background: `linear-gradient(120deg, #1A1A1A 0%, #2a2a2a 100%)`,
                  display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap',
                  padding: 'clamp(1.5rem,4vw,2.5rem) clamp(1.5rem,4vw,3rem)',
                  boxShadow: '0 24px 60px rgba(0,0,0,0.15)' }}>
                <div style={{ flex: '0 0 auto' }}>
                  <div style={{ width: 56, height: 56, borderRadius: '16px', background: `${current.accent}25`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: current.accent, fontSize: 26 }}>
                    {current.id === 'pmc' ? <MdOutlineEngineering /> : <FiHome />}
                  </div>
                </div>
                <div style={{ flex: 1, minWidth: 220 }}>
                  <p style={{ fontSize: 'clamp(0.9rem,1.4vw,1.1rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.01em', marginBottom: '0.4rem' }}>
                    One team. One contract. All delivered.
                  </p>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', margin: 0, fontWeight: 300, lineHeight: 1.7 }}>
                    Every service above is managed in-house — planned, coordinated, quality-checked, and handed over by Karrcholai.
                  </p>
                </div>
                <Link to="/contact"
                  style={{ flexShrink: 0, padding: '0.85rem 1.75rem', background: current.accent, color: '#fff', borderRadius: 8,
                    fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase',
                    textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8,
                    boxShadow: `0 8px 32px ${current.accent}50` }}>
                  Start a Project <FiArrowRight size={12} />
                </Link>
              </motion.div>

            </div>
          </section>
        </motion.div>
      </AnimatePresence>


      {/* ── COMPARE / CHOOSE SECTION ─────────────────────────────────────── */}
      <section style={{ padding: 'clamp(60px,8vw,120px) 2rem', background: '#1A1A1A', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          fontSize: 'clamp(10rem,20vw,22rem)', fontWeight: 900, color: 'rgba(255,255,255,0.025)',
          pointerEvents: 'none', userSelect: 'none', letterSpacing: '-0.05em', whiteSpace: 'nowrap' }}>
          KARR
        </div>
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem,5vw,5rem)' }}>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#B85C38', marginBottom: '1rem' }}>
              Which one is right for you?
            </motion.p>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
              style={{ fontSize: 'clamp(2rem,4.5vw,4rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.05, margin: 0 }}>
              PMC vs Residential
            </motion.h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,380px),1fr))', gap: '2rem' }}>
            {mainServices.map((s, i) => (
              <motion.div key={s.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.15 }}
                onClick={() => { setActiveService(s.id); document.getElementById('service-detail')?.scrollIntoView({ behavior: 'smooth' }) }}
                whileHover={{ y: -6 }}
                style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${s.accent}30`, borderRadius: '2rem',
                  padding: '2.5rem', cursor: 'pointer', position: 'relative', overflow: 'hidden', transition: 'background 0.3s' }}>
                <div style={{ position: 'absolute', top: 0, right: 0, padding: '1rem 1.5rem',
                  background: `${s.accent}20`, borderBottomLeftRadius: '1.5rem',
                  fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: s.accent }}>
                  {s.num}
                </div>
                <div style={{ width: 56, height: 56, borderRadius: '16px', background: `${s.accent}18`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.accent, fontSize: 26, marginBottom: '1.5rem' }}>
                  {s.id === 'pmc' ? <MdOutlineEngineering /> : <FiHome />}
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fff', marginBottom: '0.75rem', letterSpacing: '-0.01em' }}>{s.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, fontWeight: 300, marginBottom: '1.75rem' }}>{s.desc.slice(0, 130)}…</p>

                {/* Sub-service pills preview */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.75rem' }}>
                  {s.subServices.map((sub, j) => (
                    <span key={j} style={{ padding: '0.35rem 0.85rem', borderRadius: 100,
                      background: `${s.accent}15`, color: s.accent,
                      fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      {sub.label}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: s.accent }}>
                  Explore {s.id === 'pmc' ? 'PMC Services' : 'Residential Builds'} <FiArrowRight size={13} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ── WHY US ───────────────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(60px,8vw,120px) 2rem', background: '#fdfbf7' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem,5vw,5rem)' }}>
            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              style={{ display: 'inline-block', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.35em',
                textTransform: 'uppercase', color: '#B85C38', marginBottom: '1rem' }}>
              Our Commitment
            </motion.span>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
              style={{ fontSize: 'clamp(2rem,4.5vw,4rem)', fontWeight: 900, color: '#1A1A1A', letterSpacing: '-0.02em', lineHeight: 1.05, margin: 0 }}>
              Why Karrcholai?
            </motion.h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,280px),1fr))', gap: '1.5rem' }}>
            {whyUs.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08 }}
                whileHover={{ y: -5, boxShadow: '0 16px 48px rgba(0,0,0,0.1)' }}
                style={{ background: '#fff', borderRadius: '1.75rem', padding: '2rem',
                  border: '1px solid rgba(26,26,26,0.06)', boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                  position: 'relative', overflow: 'hidden', transition: 'transform 0.3s, box-shadow 0.3s' }}>
                <div style={{ width: 52, height: 52, borderRadius: '14px', background: 'rgba(184,92,56,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#B85C38', marginBottom: '1.5rem' }}>
                  {item.icon}
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 900, color: '#1A1A1A', marginBottom: '0.6rem', letterSpacing: '-0.01em' }}>{item.title}</h4>
                <div style={{ width: 36, height: 2, background: '#B85C38', borderRadius: 2, marginBottom: '0.75rem' }} />
                <p style={{ fontSize: '0.85rem', color: 'rgba(26,26,26,0.5)', lineHeight: 1.7, fontWeight: 300, margin: 0 }}>{item.desc}</p>
                <div style={{ position: 'absolute', bottom: -12, right: -12, opacity: 0.04, transform: 'rotate(-12deg)', color: '#1A1A1A', fontSize: 90 }}>
                  {item.icon}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(80px,10vw,140px) 2rem' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${imgConstruct})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.18)' }} />
        <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }} transition={{ duration: 10, repeat: Infinity }}
          style={{ position: 'absolute', top: '-20%', left: '-10%', width: 'clamp(300px,50vw,600px)', height: 'clamp(300px,50vw,600px)',
            background: '#B85C38', filter: 'blur(160px)', borderRadius: '50%', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            style={{ fontSize: 'clamp(2.2rem,5.5vw,5rem)', fontWeight: 900, color: '#fff', lineHeight: 1.05, letterSpacing: '-0.025em', marginBottom: '1.5rem' }}>
            Ready to start your project?
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
            style={{ fontSize: 'clamp(0.9rem,1.5vw,1.1rem)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, maxWidth: 560, margin: '0 auto 2.5rem', fontWeight: 300 }}>
            Whether it's a full PMC engagement or building your dream home from scratch — let's talk. First consultation is free.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }}
            style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact"
              style={{ padding: '1rem 2.5rem', background: '#B85C38', color: '#fff', borderRadius: 6,
                fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase',
                textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10,
                boxShadow: '0 8px 40px rgba(184,92,56,0.4)' }}>
              Book a Free Consultation <FiArrowRight size={14} />
            </Link>
            <Link to="/projects"
              style={{ padding: '1rem 2.5rem', background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)',
                color: '#fff', borderRadius: 6, border: '1px solid rgba(255,255,255,0.15)',
                fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase',
                textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
              View Our Projects
            </Link>
          </motion.div>
        </div>
      </section>

      <UnifiedFooter />
    </div>
  )
}

export default Services
