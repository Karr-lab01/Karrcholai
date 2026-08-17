import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  FiMapPin, FiCalendar, FiMaximize, FiArrowRight,
  FiChevronLeft, FiChevronRight, FiZap, FiDroplet,
  FiTool, FiLayers, FiAlertTriangle, FiCheckCircle,
  FiHome, FiStar
} from 'react-icons/fi'
import { FaStar, FaQuoteLeft } from 'react-icons/fa'
import Navbar from '../components/Navbar'
import UnifiedFooter from '../components/UnifiedFooter'
import FootprintMapSection from '../components/FootprintMapSection'
import { Helmet } from 'react-helmet-async'

// Image imports
import kr_3d from '../../assets/Karur Residance/3D Exterior Model.jpeg'
import kr_carportico from '../../assets/Karur Residance/Car Portico.jpeg'
import kr_footing from '../../assets/Karur Residance/Footing.jpeg'
import kr_brickwork from '../../assets/Karur Residance/Ground Floor Brick Work.jpeg'
import kr_column from '../../assets/Karur Residance/Ground Floor Column.jpeg'
import kr_roof from '../../assets/Karur Residance/Ground Floor Roof.jpeg'
import kr_groundfloor from '../../assets/Karur Residance/Ground Floor.jpeg'
import kr_kitchen from '../../assets/Karur Residance/Kitchen.jpeg'
import kr_living from '../../assets/Karur Residance/Living.jpeg'
import kr_maindoor from '../../assets/Karur Residance/Main Door.jpeg'
import kr_masterbath from '../../assets/Karur Residance/Master Bath.jpeg'
import kr_masterbedroom from '../../assets/Karur Residance/Master Bedroom.jpeg'
import kr_plinthbeam from '../../assets/Karur Residance/Plinth beam.jpeg'
import kr_pooja from '../../assets/Karur Residance/Pooja.jpeg'
import kr_vasthupooja from '../../assets/Karur Residance/Vasthu Pooja.jpeg'
import heroImg from '../../assets/img1.jpg'

// ── Palette ──────────────────────────────────────────────────────────────────
const SAGE   = '#2D4B37'
const TERRA  = '#B85C38'
const CREAM  = '#fdfbf7'
const CARD   = '#FFFFFF'
const BRONZE = '#2A2A28'
const MUTED  = '#7C7C79'
const BRASS  = '#C5A880'

// ── Project Data ──────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: 'karur-residence',
    // 1. Title
    title: 'Karur Residence',
    subtitle: 'A sustainable family home — Karur, Tamil Nadu',
    category: 'Residential',
    year: '2024',

    // 2. Location
    location: 'Karur, Tamil Nadu',
    coordinates: '10.96° N / 78.08° E',

    // 3. Plot Area
    plotArea: '2,400 Sq.Ft',

    // 4. Built-up Area
    builtUpArea: '5,100 Sq.Ft',

    // First Stone
    firstStone: {
      date: 'February 14, 2023',
      event: 'Vasthu Pooja & Ground-Breaking Ceremony',
      note: 'The family performed the traditional bhoomi pooja before the first footing was dug — setting the foundation with intention.',
    },

    // 5. Scope
    scope: 'Complete design, structural planning, sustainable systems integration, and end-to-end construction of a G+1 residential home — from vastu orientation and footing through to final interior finishes and handover.',

    // 6. Construction Method
    constructionMethod: [
      { label: 'Foundation', value: 'Isolated footing with plinth beam' },
      { label: 'Frame', value: 'RCC column-beam frame with brick infill' },
      { label: 'Slab', value: 'Flat RCC slabs — conventional shuttering' },
      { label: 'Orientation', value: 'Vastu-aligned site layout' },
    ],

    // 7. Materials
    materials: [
      { icon: FiLayers, name: 'CSEB Blocks', desc: 'Compressed stabilised earth blocks — reduced embodied carbon' },
      { icon: FiZap,    name: 'Solar Panels', desc: '12.5 kWp monocrystalline roof-integrated array' },
      { icon: FiDroplet,name: 'Rainwater Tank', desc: '50,000 L underground 3-stage filtration system' },
      { icon: FiTool,   name: 'Bamboo Framing', desc: 'Structural bamboo in select secondary spans' },
    ],

    // 8. Challenges
    challenges: [
      'Rocky sub-soil requiring partial rock-cutting for footings',
      'Integrating rainwater harvesting under the plot footprint without reducing built area',
      'Client requirement for zero mechanical cooling in ground floor living spaces',
      'Managing monsoon delays during foundation and plinth beam phases',
    ],

    // 9. Solution
    solutions: [
      'Designed isolated footings sized to the actual rock bearing capacity — eliminating over-excavation cost',
      'Positioned the 50,000 L RWH tank beneath the driveway, recovering usable floor area',
      'Double-height ventilation shaft + roof vents create stack-effect cooling — no AC needed in living areas',
      'Prefabricated column cages off-site; erection completed in weather windows during monsoon breaks',
    ],

    // 10. Photos (gallery)
    gallery: [
      { src: kr_3d,           caption: '3D Exterior Model' },
      { src: kr_vasthupooja,  caption: 'Vasthu Pooja' },
      { src: kr_footing,      caption: 'Footing Work' },
      { src: kr_plinthbeam,   caption: 'Plinth Beam' },
      { src: kr_groundfloor,  caption: 'Ground Floor' },
      { src: kr_column,       caption: 'Column Work' },
      { src: kr_brickwork,    caption: 'Brick Work' },
      { src: kr_roof,         caption: 'Roof Slab' },
      { src: kr_carportico,   caption: 'Car Portico' },
      { src: kr_living,       caption: 'Living Area' },
      { src: kr_kitchen,      caption: 'Kitchen' },
      { src: kr_masterbedroom,caption: 'Master Bedroom' },
      { src: kr_masterbath,   caption: 'Master Bathroom' },
      { src: kr_pooja,        caption: 'Pooja Room' },
      { src: kr_maindoor,     caption: 'Main Door' },
    ],

    // 11. Result
    result: {
      headline: '5,100 Sq.Ft. delivered — on scope, on budget.',
      points: [
        '~60% reduction in grid electricity via solar array',
        'Natural cooling maintains 26–28 °C without AC on ground floor',
        'RWH system covers full household water needs during monsoon',
        'Completed in 14 months including all sustainability systems',
      ],
      stats: [
        { label: 'Duration', value: '14 mo.' },
        { label: 'Solar Output', value: '12.5 kWp' },
        { label: 'Water Storage', value: '50,000 L' },
      ],
    },

    // 12. Client Testimonial
    testimonial: {
      quote: 'We entrusted KARRCHOLAI with our home. The team\'s dedication to quality craftsmanship and attention to detail truly shines through in every corner. Thank you for turning our house into a haven!',
      author: 'Homeowner',
      location: 'Karur, Tamil Nadu',
      rating: 5,
    },

    // 13. Related Services
    relatedServices: [
      { to: '/karr',           emoji: '🏗️', label: 'Construction',      title: 'Karr Division' },
      { to: '/cholai',         emoji: '🌿', label: 'Sustainability',     title: 'Cholai Division' },
      { to: '/cost-estimator', emoji: '₹',  label: 'Free Tool',          title: 'Cost Estimator' },
      { to: '/vastu-compass',  emoji: '🧭', label: 'Free Tool',          title: 'Vastu Compass' },
    ],
  },
]

// ── Section label component ────────────────────────────────────────────────────
const SectionLabel = ({ number, title }) => (
  <div className="flex items-center gap-3 mb-6">
    <span
      className="text-[9px] font-black tracking-[0.35em] uppercase px-2.5 py-1 rounded-full"
      style={{ background: `${SAGE}12`, color: SAGE }}
    >
      {String(number).padStart(2, '0')}
    </span>
    <span className="text-[11px] font-black tracking-[0.3em] uppercase" style={{ color: MUTED }}>
      {title}
    </span>
    <span className="flex-1 h-px" style={{ background: `${BRONZE}10` }} />
  </div>
)

// ── Photo Gallery sub-component ────────────────────────────────────────────────
function PhotoGallery({ gallery }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setActive(p => (p + 1) % gallery.length), 4500)
    return () => clearInterval(t)
  }, [paused, gallery.length])

  const nav = useCallback((dir) => {
    setPaused(true)
    setActive(p => (p + dir + gallery.length) % gallery.length)
    setTimeout(() => setPaused(false), 6000)
  }, [gallery.length])

  return (
    <div className="space-y-4">
      {/* Main frame */}
      <div className="relative overflow-hidden rounded-2xl aspect-[16/9] bg-stone-100 shadow-lg">
        <AnimatePresence mode="wait">
          <motion.img
            key={active}
            src={gallery[active].src}
            alt={gallery[active].caption}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>

        {/* Controls */}
        <button
          onClick={() => nav(-1)}
          aria-label="Previous"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow hover:bg-white transition-all"
        >
          <FiChevronLeft style={{ color: BRONZE }} />
        </button>
        <button
          onClick={() => nav(1)}
          aria-label="Next"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow hover:bg-white transition-all"
        >
          <FiChevronRight style={{ color: BRONZE }} />
        </button>

        {/* Caption */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-md" style={{ color: BRONZE }}>
          {String(active + 1).padStart(2, '0')} / {gallery[active].caption}
        </div>

        {/* Dots */}
        <div className="absolute bottom-3 right-3 flex gap-1.5">
          {gallery.map((_, i) => (
            <button
              key={i}
              onClick={() => { setPaused(true); setActive(i); setTimeout(() => setPaused(false), 6000) }}
              className={`rounded-full transition-all duration-300 ${active === i ? 'w-4 h-1.5' : 'w-1.5 h-1.5 bg-white/60'}`}
              style={active === i ? { background: SAGE } : {}}
              aria-label={`Image ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar snap-x">
        {gallery.map((img, i) => (
          <button
            key={i}
            onClick={() => { setPaused(true); setActive(i); setTimeout(() => setPaused(false), 6000) }}
            className={`flex-shrink-0 w-16 aspect-square rounded-xl overflow-hidden border-2 snap-center transition-all duration-200 ${
              active === i ? 'scale-105 shadow-md' : 'opacity-60 hover:opacity-90 border-transparent'
            }`}
            style={active === i ? { borderColor: SAGE } : {}}
          >
            <img src={img.src} alt={img.caption} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function Projects() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const project = PROJECTS[0]

  return (
    <div ref={containerRef} className="min-h-screen overflow-x-hidden font-sans" style={{ background: CREAM, color: BRONZE }}>
      <Helmet>
        <title>Residential Construction Projects Tamil Nadu | Karrcholai Portfolio</title>
        <meta name="description" content="Explore completed residential projects by Karrcholai — Karur Residence and more, built with structural integrity, sustainable design, and disciplined execution across Tamil Nadu." />
        <link rel="canonical" href="https://karrcholai.com/projects" />
        <meta property="og:title" content="Projects | Karrcholai" />
        <meta property="og:description" content="Residential construction portfolio — Tamil Nadu." />
        <meta property="og:url" content="https://karrcholai.com/projects" />
      </Helmet>

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] z-[200] origin-left"
        style={{ scaleX, background: `linear-gradient(90deg, ${SAGE}, ${BRASS}, ${TERRA})` }}
      />

      <Navbar />

      {/* ── HERO ── */}
      <section
        className="relative w-full flex items-end overflow-hidden"
        style={{ minHeight: '70svh', backgroundImage: `url(${heroImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/85 via-[#1a1a1a]/30 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-16 pb-16 pt-32 flex flex-col items-center text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <span className="text-[9px] font-black tracking-[0.5em] uppercase text-white/50 mb-3 block">
              Our Work
            </span>
            <h1 className="text-5xl md:text-8xl font-black text-white leading-none tracking-tighter mb-4">
              Projects.
            </h1>
            <p className="text-white/60 text-sm md:text-base max-w-md font-light mx-auto">
              Residential construction across Tamil Nadu — built with structure, clarity, and care.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent mx-auto"
          />
        </div>
      </section>

      {/* ── PROJECT CASE STUDY ── */}
      <article className="max-w-5xl mx-auto px-6 md:px-12 py-20 md:py-32 space-y-20">

        {/* ── FIRST STONE ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="flex items-center gap-3"
        >
          <div
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl"
            style={{ background: SAGE }}
          >
            <span className="text-[9px] font-black tracking-[0.45em] uppercase" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Case Study 01
            </span>
            <span className="w-px h-3 bg-white/20" />
            <span className="text-sm font-black tracking-tight text-white">
              The First <span style={{ color: BRASS }}>Stone</span>
            </span>
          </div>
        </motion.div>

        {/* ── 1. PROJECT TITLE ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
        >
          <SectionLabel number={1} title="Project Title" />
          <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-none mb-3" style={{ color: BRONZE }}>
            {project.title}
          </h2>
          <p className="text-base font-light" style={{ color: MUTED }}>{project.subtitle}</p>
          <div className="flex gap-3 mt-5">
            <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full" style={{ background: `${SAGE}15`, color: SAGE }}>
              {project.category}
            </span>
            <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full" style={{ background: `${TERRA}12`, color: TERRA }}>
              {project.year}
            </span>
          </div>
        </motion.div>

        {/* ── 2-4. LOCATION / PLOT / BUILT-UP (Metrics Row) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
        >
          <SectionLabel number={2} title="Site Metrics" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { icon: FiMapPin,   num: '02', label: 'Location',      value: project.location,    sub: project.coordinates },
              { icon: FiMaximize, num: '03', label: 'Plot Area',      value: project.plotArea,    sub: 'Total site footprint' },
              { icon: FiHome,     num: '04', label: 'Built-up Area',  value: project.builtUpArea, sub: 'Gross floor area' },
            ].map((m, i) => (
              <div
                key={i}
                className="p-5 md:p-6 rounded-2xl border flex flex-col gap-3 hover:shadow-md transition-shadow"
                style={{ background: CARD, borderColor: `${BRONZE}08` }}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${SAGE}10` }}>
                  <m.icon size={16} style={{ color: SAGE }} />
                </div>
                <div>
                  <p className="text-[8px] font-black uppercase tracking-widest mb-1" style={{ color: MUTED }}>
                    {m.num} / {m.label}
                  </p>
                  <p className="text-xl font-black" style={{ color: BRONZE }}>{m.value}</p>
                  <p className="text-[10px] mt-0.5 font-light" style={{ color: MUTED }}>{m.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── 5. SCOPE ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
        >
          <SectionLabel number={5} title="Scope of Work" />
          <div
            className="p-6 md:p-8 rounded-2xl border"
            style={{ background: CARD, borderColor: `${BRONZE}08` }}
          >
            <p className="text-base md:text-lg font-light leading-relaxed" style={{ color: BRONZE }}>
              {project.scope}
            </p>
          </div>
        </motion.div>

        {/* ── 6. CONSTRUCTION METHOD ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
        >
          <SectionLabel number={6} title="Construction Method" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {project.constructionMethod.map((m, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-5 rounded-xl border"
                style={{ background: CARD, borderColor: `${BRONZE}08` }}
              >
                <span
                  className="text-[9px] font-black tracking-widest uppercase mt-0.5 flex-shrink-0 px-2 py-1 rounded"
                  style={{ background: `${SAGE}10`, color: SAGE }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider mb-1" style={{ color: MUTED }}>{m.label}</p>
                  <p className="text-sm font-semibold" style={{ color: BRONZE }}>{m.value}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── 7. MATERIALS ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
        >
          <SectionLabel number={7} title="Key Materials" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {project.materials.map((mat, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-5 rounded-xl border group hover:shadow-sm transition-all"
                style={{ background: CARD, borderColor: `${BRONZE}08` }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${TERRA}10` }}
                >
                  <mat.icon size={16} style={{ color: TERRA }} />
                </div>
                <div>
                  <p className="text-sm font-black mb-0.5" style={{ color: BRONZE }}>{mat.name}</p>
                  <p className="text-xs font-light leading-relaxed" style={{ color: MUTED }}>{mat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── 8 & 9. CHALLENGES + SOLUTION (side by side) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Challenges */}
            <div>
              <SectionLabel number={8} title="Challenges" />
              <div
                className="p-6 rounded-2xl border h-full space-y-4"
                style={{ background: `${TERRA}06`, borderColor: `${TERRA}15` }}
              >
                {project.challenges.map((c, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <FiAlertTriangle size={14} className="flex-shrink-0 mt-0.5" style={{ color: TERRA }} />
                    <p className="text-sm font-light leading-relaxed" style={{ color: BRONZE }}>{c}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Solution */}
            <div>
              <SectionLabel number={9} title="Solution" />
              <div
                className="p-6 rounded-2xl border h-full space-y-4"
                style={{ background: `${SAGE}06`, borderColor: `${SAGE}15` }}
              >
                {project.solutions.map((s, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <FiCheckCircle size={14} className="flex-shrink-0 mt-0.5" style={{ color: SAGE }} />
                    <p className="text-sm font-light leading-relaxed" style={{ color: BRONZE }}>{s}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── 10. PHOTOS ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
        >
          <SectionLabel number={10} title="Photos" />
          <PhotoGallery gallery={project.gallery} />
        </motion.div>

        {/* ── 11. RESULT ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
        >
          <SectionLabel number={11} title="Result" />
          <div className="rounded-2xl overflow-hidden border" style={{ borderColor: `${BRONZE}08` }}>
            {/* Headline */}
            <div className="px-6 md:px-10 py-8" style={{ background: BRONZE }}>
              <p className="text-[10px] font-black tracking-[0.4em] uppercase mb-3" style={{ color: BRASS }}>
                Outcome
              </p>
              <h3 className="text-2xl md:text-3xl font-black text-white leading-tight">
                {project.result.headline}
              </h3>
            </div>

            {/* Stats bar */}
            <div
              className="grid grid-cols-3 divide-x"
              style={{ background: `${SAGE}`, divideColor: 'rgba(255,255,255,0.1)' }}
            >
              {project.result.stats.map((s, i) => (
                <div key={i} className="text-center px-4 py-5" style={{ borderColor: 'rgba(255,255,255,0.1)', borderRightWidth: i < 2 ? 1 : 0 }}>
                  <p className="text-[9px] font-black uppercase tracking-widest text-white/50 mb-1">{s.label}</p>
                  <p className="text-xl md:text-2xl font-black text-white">{s.value}</p>
                </div>
              ))}
            </div>

            {/* Points */}
            <div className="px-6 md:px-10 py-8 grid sm:grid-cols-2 gap-4" style={{ background: CARD }}>
              {project.result.points.map((pt, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: `${SAGE}15` }}
                  >
                    <FiCheckCircle size={11} style={{ color: SAGE }} />
                  </span>
                  <p className="text-sm font-light leading-relaxed" style={{ color: BRONZE }}>{pt}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── 12. CLIENT TESTIMONIAL ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
        >
          <SectionLabel number={12} title="Client Testimonial" />
          <div
            className="relative p-8 md:p-12 rounded-2xl border overflow-hidden"
            style={{ background: CARD, borderColor: `${BRONZE}08` }}
          >
            {/* Big quote mark */}
            <FaQuoteLeft
              className="absolute top-6 right-6 opacity-[0.04]"
              style={{ fontSize: '8rem', color: BRONZE }}
            />

            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {[...Array(project.testimonial.rating)].map((_, i) => (
                <FaStar key={i} size={14} style={{ color: '#F59E0B' }} />
              ))}
            </div>

            <blockquote className="text-base md:text-xl font-light leading-relaxed mb-8 relative z-10 max-w-2xl" style={{ color: BRONZE }}>
              "{project.testimonial.quote}"
            </blockquote>

            <div className="flex items-center justify-between gap-4 pt-6 border-t" style={{ borderColor: `${BRONZE}08` }}>
              <div>
                <p className="text-sm font-black" style={{ color: BRONZE }}>{project.testimonial.author}</p>
                <p className="text-[10px] font-light mt-0.5" style={{ color: MUTED }}>{project.testimonial.location}</p>
              </div>
              <span
                className="text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full"
                style={{ background: `${SAGE}12`, color: SAGE }}
              >
                Verified Review
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── 13. RELATED SERVICES ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
        >
          <SectionLabel number={13} title="Related Services" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {project.relatedServices.map((s, i) => (
              <Link
                key={i}
                to={s.to}
                className="group flex flex-col items-start gap-3 p-5 rounded-2xl border hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                style={{ background: CARD, borderColor: `${BRONZE}08` }}
              >
                <span className="text-2xl">{s.emoji}</span>
                <div>
                  <p className="text-[8px] font-black uppercase tracking-widest mb-1" style={{ color: MUTED }}>{s.label}</p>
                  <p className="text-sm font-black group-hover:underline" style={{ color: BRONZE }}>{s.title}</p>
                </div>
                <FiArrowRight size={12} className="mt-auto" style={{ color: SAGE }} />
              </Link>
            ))}
          </div>
        </motion.div>

      </article>

      {/* ── FOOTPRINT MAP ── */}
      <FootprintMapSection />

      {/* ── CTA ── */}
      <section className="relative py-28 overflow-hidden" style={{ background: SAGE }}>
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
        >
          <span className="text-[20vw] font-black opacity-[0.04] select-none whitespace-nowrap text-white">BUILD</span>
        </div>
        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-[10px] font-black tracking-[0.5em] uppercase text-white/50 mb-4"
          >
            Let's Build Together
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-black text-white leading-tight mb-6"
          >
            Have a Project<br />
            <span style={{ color: BRASS }}>in Mind?</span>
          </motion.h2>
          <p className="text-white/60 text-sm font-light mb-10 max-w-lg mx-auto">
            From initial planning through to handover — built with clarity, structure, and care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto bg-white text-[#1c1c1a] hover:bg-[#B85C38] hover:text-white text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-2 px-8 py-4 rounded-full transition-all duration-300 font-black"
              >
                Start Your Project <FiArrowRight />
              </motion.button>
            </Link>
            <Link to="/services">
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto border border-white/30 hover:border-white text-white hover:bg-white/10 text-xs tracking-[0.2em] uppercase flex items-center justify-center px-8 py-4 rounded-full transition-all duration-300 font-black bg-transparent"
              >
                View Our Services
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      <UnifiedFooter />
    </div>
  )
}
