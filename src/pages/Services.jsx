import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiCheck, FiPhone, FiChevronDown } from 'react-icons/fi'
import { FaLeaf, FaCloudRain, FaSun, FaRecycle, FaLightbulb, FaTh } from 'react-icons/fa'
import { MdArchitecture, MdSolarPower, MdOutlineEngineering } from 'react-icons/md'
import { BsHouseDoor, BsBuilding, BsArrowRight } from 'react-icons/bs'
import { TbLeaf, TbDroplet } from 'react-icons/tb'
import Navbar from '../components/Navbar'
import UnifiedFooter from '../components/UnifiedFooter'
import FAQSection from '../components/FAQSection'
import { Helmet } from 'react-helmet-async'

import imgRes   from '../../assets/Residential_construction.jpg'
import imgPmc   from '../../assets/pmc.jpeg'
import imgReno  from '../../assets/renovation.jpg.jpeg'
import imgSolar from '../../assets/solar panel.jpg.jpeg'
import imgRain  from '../../assets/rainwater.jpg.jpeg'
import imgFloor from '../../assets/red-floor.jpg'
import imgLight from '../../assets/lighting.jpg'
import imgLand  from '../../assets/lancape.jpg.jpeg'
import imgHero  from '../../assets/pexels-kawserhamid-176342.jpg'
import imgConst from '../../assets/construction.jpg'

// ─── Data ─────────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    id: 'residential',
    index: '01',
    label: 'Residential Construction',
    shortLabel: 'Residential',
    tag: 'Build Your Dream',
    tagline: 'Custom homes built with precision, heritage & heart.',
    body: "From independent houses to premium villas, we handle every phase — foundation to finishing — with Vastu-compliant layouts, premium materials, and craftsmanship rooted in Tamil Nadu's architectural tradition.",
    img: imgRes,
    accent: '#C17B3E',
    accentDark: '#8B5520',
    icon: BsHouseDoor,
    features: ['Custom Home Design & Build', 'Luxury Villa Construction', 'Vastu-Compliant Layouts', 'Premium Material Sourcing', 'Structural Integrity Guarantee', 'Interior Finishing & Handover'],
    subs: [
      { icon: FaLeaf,      label: 'Landscape Development', img: imgLand,  desc: 'Lawn planning, garden beds, hardscaping — outdoor spaces designed to grow with your home.' },
      { icon: FaCloudRain, label: 'Rainwater Harvesting',  img: imgRain,  desc: 'Rooftop collection, storage tanks, recharge pits — water security built in from day one.' },
      { icon: FaSun,       label: 'Solar Integration',     img: imgSolar, desc: 'Rooftop solar at design stage — maximising generation with smart panel placement.' },
      { icon: FaTh,        label: 'Heritage Flooring',     img: imgFloor, desc: 'Athangudi tiles, lime plaster, stone finishes — cool, beautiful, and rooted in culture.' },
      { icon: FaLightbulb, label: 'Smart Lighting',        img: imgLight, desc: 'Layered lighting — ambient, task, accent — planned during construction, not retrofitted.' },
      { icon: FaRecycle,   label: 'Waste Systems',         img: null,     desc: 'Composting zones, segregation areas, and waste chutes — sustainable living by design.' },
    ],
  },
  {
    id: 'pmc',
    index: '02',
    label: 'PMC Services',
    shortLabel: 'PMC',
    tag: 'Project Management',
    tagline: 'Expert oversight from groundbreaking to key handover.',
    body: 'Our Project Management Consultancy covers the full construction lifecycle — planning, procurement, supervision, and handover. We act as your trusted on-site representative so your project finishes on time, on budget, with zero compromise.',
    img: imgPmc,
    accent: '#4A7C6F',
    accentDark: '#2D5A4F',
    icon: MdOutlineEngineering,
    features: ['Budget & Timeline Management', 'Contractor Coordination', 'Quality Assurance', 'Risk Mitigation', 'Progress Reporting', 'Handover & Documentation'],
    subs: [
      { icon: FaLeaf,      label: 'Landscape Development',  img: imgLand,  desc: 'Native planting, green area planning, and garden layout coordinated within PMC.' },
      { icon: FaCloudRain, label: 'Rainwater Harvesting',   img: imgRain,  desc: 'Site-specific collection and recharge systems integrated from day one.' },
      { icon: FaSun,       label: 'Solar Energy Solutions', img: imgSolar, desc: 'Solar systems aligned with roof layout and energy goals — zero extra contracts.' },
      { icon: FaRecycle,   label: 'Waste Management',       img: null,     desc: 'Planned segregation, composting, and debris management within the project schedule.' },
      { icon: FaLightbulb, label: 'Smart Lighting',         img: imgLight, desc: 'LED and smart lighting planned during construction — efficient, elegant, right-sized.' },
      { icon: FaTh,        label: 'Traditional Flooring',   img: imgFloor, desc: 'Athangudi tiles, oxide flooring, stone — heritage underfoot, planned with your home.' },
    ],
  },
  {
    id: 'renovation',
    index: '03',
    label: 'Renovation',
    shortLabel: 'Renovation',
    tag: 'Transform & Renew',
    tagline: 'Breathe new life into every space you love.',
    body: "Whether it's a single room or a complete structural overhaul, our renovation service brings modern design, structural confidence, and Vastu-aligned redesigns — managed without disrupting your daily life.",
    img: imgReno,
    accent: '#7B6B9E',
    accentDark: '#544878',
    icon: MdArchitecture,
    features: ['Structural Upgrades', 'Interior Remodelling', 'Vastu Realignment', 'Kitchen & Bath Renovation', 'Flooring & Facade Upgrades', 'Phase-Wise Delivery'],
    subs: [
      { icon: MdArchitecture, label: 'Interior Remodelling', img: imgConst, desc: 'Walls, ceilings, openings — completely reimagined with modern spatial planning.' },
      { icon: FaTh,           label: 'Flooring & Tiling',   img: imgFloor, desc: 'Heritage tiles, porcelain, hardwood — selection and installation under one roof.' },
      { icon: FaLightbulb,    label: 'Lighting Overhaul',   img: imgLight, desc: 'New circuits, smart controls, and layered lighting for fully transformed ambience.' },
      { icon: FaCloudRain,    label: 'Plumbing Revamp',     img: imgRain,  desc: 'Full plumbing replacement, leak-proofing, and rainwater integration in renovations.' },
      { icon: FaSun,          label: 'Solar Add-On',        img: imgSolar, desc: 'Retrofit solar panels to existing structures — maximising savings without full rebuild.' },
      { icon: FaLeaf,         label: 'Garden Makeover',     img: imgLand,  desc: 'New planting, pathways, water features, and green design for revived outdoor areas.' },
    ],
  },
  {
    id: 'sustainable',
    index: '04',
    label: 'Sustainable Solutions',
    shortLabel: 'Sustainable',
    tag: 'Green Building',
    tagline: 'Building responsibly for the next generation.',
    body: 'Sustainability is woven into every Karrcholai project — not offered as an add-on. From solar and rainwater to native landscaping and zero-waste construction, we build homes that tread lightly and last longer.',
    img: imgSolar,
    accent: '#4E8B5F',
    accentDark: '#2D6040',
    icon: TbLeaf,
    features: ['Solar Panel Systems', 'Rainwater Harvesting', 'Waste Segregation Design', 'Energy-Efficient Lighting', 'Native Landscaping', 'Green Material Selection'],
    subs: [
      { icon: MdSolarPower, label: 'Solar Energy Systems',    img: imgSolar, desc: 'Full rooftop solar design — grid-tied or off-grid — planned at construction or retrofitted.' },
      { icon: TbDroplet,    label: 'Rainwater Harvesting',    img: imgRain,  desc: 'Collection, filtration, and groundwater recharge tailored to your site and usage.' },
      { icon: FaLeaf,       label: 'Native Landscaping',      img: imgLand,  desc: 'Drought-resistant plants, permeable surfaces, and biodiversity-led garden design.' },
      { icon: FaRecycle,    label: 'Waste Zero Systems',      img: null,     desc: 'Composting units, biogas connections, and construction debris management plans.' },
      { icon: FaLightbulb,  label: 'Energy Efficient Design', img: imgLight, desc: 'Passive cooling, cross-ventilation, insulation, and LED systems cut lifetime energy costs.' },
      { icon: FaTh,         label: 'Green Materials',         img: imgFloor, desc: 'Locally sourced stone, lime plaster, recycled aggregates — lower carbon, higher quality.' },
    ],
  },
]

const ease = [0.22, 1, 0.36, 1]

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.75, ease },
}

// ─── Parallax Hero BG ─────────────────────────────────────────────────────────
function HeroBg() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <img src={imgHero} alt="" className="w-full h-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/55 to-[#0a0a0a]" />
    </div>
  )
}

// ─── Sub-service card ──────────────────────────────────────────────────────────
function SubCard({ icon: Icon, label, desc, img, accent, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: i * 0.07, ease }}
      className="group bg-white rounded-[22px] overflow-hidden border border-black/[0.05] shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5"
    >
      <div className="h-44 overflow-hidden relative bg-[#f5f4f0]">
        {img ? (
          <img src={img} alt={label} loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ background: `${accent}10` }}>
            <Icon style={{ color: accent, fontSize: '3.5rem', opacity: 0.25 }} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
        <div className="absolute bottom-3 left-4 w-9 h-9 rounded-xl bg-white shadow-md flex items-center justify-center" style={{ color: accent }}>
          <Icon size={15} />
        </div>
      </div>
      <div className="p-5">
        <h4 className="text-[14px] font-bold text-[#111] mb-1.5 tracking-tight">{label}</h4>
        <div className="w-7 h-[2px] rounded-full mb-3" style={{ background: accent }} />
        <p className="text-[12px] text-black/38 leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Services() {
  const [active, setActive] = useState('residential')
  const tabRef  = useRef(null)
  const detailRef = useRef(null)

  const svc  = SERVICES.find(s => s.id === active)
  const Icon = svc.icon

  const goTo = (id) => {
    setActive(id)
    setTimeout(() => detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 40)
  }

  return (
    <div className="bg-[#f8f7f3] min-h-screen overflow-x-hidden font-sans">
      <Helmet>
        <title>Construction Services Tamil Nadu | Karrcholai Construction</title>
        <meta name="description" content="Karrcholai offers residential construction, PMC, renovation, and sustainable building in Tamil Nadu." />
        <link rel="canonical" href="https://karrcholai.com/services" />
      </Helmet>

      <Navbar />

      {/* ══════════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden bg-[#0a0a0a]">
        <HeroBg />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-14
          pb-[clamp(56px,9vw,96px)] pt-[clamp(140px,22vh,200px)]">

          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="inline-flex items-center gap-2.5 mb-8">
            <span className="block w-7 h-[1.5px] bg-[#C17B3E]" />
            <span className="text-[10px] font-black tracking-[0.35em] uppercase text-white/45">What We Deliver</span>
          </motion.div>

          <div className="overflow-hidden mb-3">
            <motion.h1 initial={{ y: '105%' }} animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.28, ease }}
              className="text-[clamp(3.2rem,8.5vw,8rem)] font-black text-white leading-[0.93] tracking-tighter">
              Services That
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-9">
            <motion.h1 initial={{ y: '105%' }} animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease }}
              className="text-[clamp(3.2rem,8.5vw,8rem)] font-black leading-[0.93] tracking-tighter text-transparent"
              style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.16)' }}>
              Build Legacies.
            </motion.h1>
          </div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.62, duration: 0.9 }}
            className="text-white/32 text-[15px] md:text-lg font-light leading-relaxed max-w-lg mb-12">
            Four service pillars covering every stage — from first pour to final handover.
          </motion.p>

          {/* 4 mini nav cards */}
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.78, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-14 max-w-2xl">
            {SERVICES.map((s) => {
              const SI = s.icon
              const isA = active === s.id
              return (
                <motion.button key={s.id} onClick={() => goTo(s.id)}
                  whileHover={{ y: -4 }} whileTap={{ scale: 0.97 }}
                  className="text-left px-4 py-4 rounded-2xl border transition-all duration-300 cursor-pointer"
                  style={{
                    background: isA ? `${s.accent}1a` : 'rgba(255,255,255,0.04)',
                    borderColor: isA ? `${s.accent}55` : 'rgba(255,255,255,0.07)',
                    backdropFilter: 'blur(16px)',
                  }}>
                  <SI size={17} className="mb-2.5" style={{ color: isA ? s.accent : 'rgba(255,255,255,0.28)' }} />
                  <p className="text-white text-[11px] font-bold leading-snug mb-0.5">{s.shortLabel}</p>
                  <p className="text-white/22 text-[9px] font-light">{s.tag}</p>
                </motion.button>
              )
            })}
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex gap-8 md:gap-16 flex-wrap pt-7 border-t border-white/[0.07]">
            {[['12+', 'Years on Site'], ['200+', 'Projects Delivered'], ['100%', 'Client-Owned Designs'], ['4', 'Service Pillars']].map(([v, l]) => (
              <div key={l}>
                <p className="text-[clamp(1.6rem,3vw,2.4rem)] font-black text-white leading-none tracking-tighter">{v}</p>
                <p className="text-[9px] text-white/20 mt-1.5 uppercase tracking-[0.18em]">{l}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div animate={{ y: [0, 9, 0] }} transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          className="absolute bottom-9 left-1/2 -translate-x-1/2 z-20 hidden md:block">
          <FiChevronDown size={18} className="text-white/22" />
        </motion.div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════════
          STICKY TAB STRIP
      ══════════════════════════════════════════════════════════════════════ */}
      <div ref={tabRef} className="sticky top-[72px] z-[90] bg-[#f8f7f3]/95 backdrop-blur-xl border-b border-black/[0.06] shadow-[0_2px_24px_rgba(0,0,0,0.06)]">
        <div className="max-w-7xl mx-auto px-6 md:px-14">
          <div className="flex items-stretch overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            {SERVICES.map((s) => {
              const SI = s.icon
              const isA = active === s.id
              return (
                <button key={s.id} onClick={() => goTo(s.id)}
                  className="flex-shrink-0 flex items-center gap-2.5 px-6 py-5 relative cursor-pointer border-none bg-transparent transition-all duration-200 group"
                  style={{ minWidth: 0 }}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 flex-shrink-0"
                    style={{
                      background: isA ? `${s.accent}18` : 'transparent',
                      color: isA ? s.accent : 'rgba(0,0,0,0.28)',
                    }}>
                    <SI size={13} />
                  </div>
                  <div className="text-left">
                    <p className="text-[11px] font-black tracking-wide whitespace-nowrap transition-colors duration-200"
                      style={{ color: isA ? '#111' : 'rgba(0,0,0,0.38)' }}>
                      {s.shortLabel}
                    </p>
                    <p className="text-[9px] tracking-wide whitespace-nowrap hidden md:block transition-colors duration-200"
                      style={{ color: isA ? `${s.accent}bb` : 'rgba(0,0,0,0.22)' }}>
                      {s.tag}
                    </p>
                  </div>
                  {isA && (
                    <motion.span layoutId="tab-bar"
                      className="absolute bottom-0 left-3 right-3 h-[2.5px] rounded-t-full"
                      style={{ background: s.accent }} />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>


      {/* ══════════════════════════════════════════════════════════════════════
          SERVICE DETAIL — full width
      ══════════════════════════════════════════════════════════════════════ */}
      <div ref={detailRef}>
        <AnimatePresence mode="wait">
          <motion.div key={svc.id}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}>

            {/* ── SPLIT HERO: image left, content right ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[560px]">
              {/* Image panel */}
              <div className="relative overflow-hidden bg-[#111] lg:min-h-[560px] h-[320px] lg:h-auto">
                <motion.img
                  key={svc.id + '-img'}
                  src={svc.img} alt={svc.label} loading="lazy"
                  initial={{ scale: 1.06, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.9, ease }}
                  className="w-full h-full object-cover absolute inset-0"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Index badge */}
                <div className="absolute top-6 left-6 text-[clamp(5rem,11vw,9rem)] font-black leading-none tracking-tighter pointer-events-none select-none"
                  style={{ color: 'rgba(255,255,255,0.06)' }}>
                  {svc.index}
                </div>

                {/* Tag pill */}
                <div className="absolute bottom-6 left-6">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black tracking-[0.28em] uppercase backdrop-blur-md"
                    style={{ background: `${svc.accent}28`, color: svc.accent, border: `1px solid ${svc.accent}45` }}>
                    <Icon size={11} /> {svc.tag}
                  </span>
                </div>
              </div>

              {/* Content panel */}
              <div className="bg-white flex flex-col justify-center px-8 md:px-12 lg:px-14 py-14">
                <motion.p
                  key={svc.id + '-eyebrow'}
                  initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                  className="text-[9px] font-black tracking-[0.32em] uppercase mb-5 flex items-center gap-2"
                  style={{ color: svc.accent }}>
                  <span className="w-6 h-[1.5px] inline-block" style={{ background: svc.accent }} />
                  {svc.tag}
                </motion.p>

                <motion.h2
                  key={svc.id + '-h2'}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1, ease }}
                  className="text-[clamp(2rem,4vw,3.4rem)] font-black text-[#111] leading-[1.02] tracking-tighter mb-4">
                  {svc.label}
                </motion.h2>

                <motion.p
                  key={svc.id + '-tagline'}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 0.18 }}
                  className="text-[15px] font-light italic mb-5 leading-snug"
                  style={{ color: `${svc.accent}cc` }}>
                  "{svc.tagline}"
                </motion.p>

                <motion.p
                  key={svc.id + '-body'}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 0.24 }}
                  className="text-[14px] text-black/45 font-light leading-relaxed mb-8 max-w-[52ch]">
                  {svc.body}
                </motion.p>

                {/* Feature pills */}
                <motion.div
                  key={svc.id + '-features'}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.32 }}
                  className="flex flex-wrap gap-2 mb-8">
                  {svc.features.map((f, i) => (
                    <span key={i}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-semibold"
                      style={{ background: `${svc.accent}0d`, color: `${svc.accent}dd`, border: `1px solid ${svc.accent}25` }}>
                      <FiCheck size={9} strokeWidth={3} style={{ color: svc.accent }} />
                      {f}
                    </span>
                  ))}
                </motion.div>

                {/* CTAs */}
                <motion.div
                  key={svc.id + '-ctas'}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex gap-3 flex-wrap">
                  <Link to="/contact"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white text-[11px] font-black tracking-widest uppercase transition-all hover:opacity-85 hover:-translate-y-0.5"
                    style={{ background: svc.accent, boxShadow: `0 10px 28px ${svc.accent}38` }}>
                    Get Free Quote <FiArrowRight size={12} />
                  </Link>
                  <a href="tel:+916385062939"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-[11px] font-bold tracking-widest uppercase border border-black/[0.1] text-[#333] transition-all hover:bg-[#111] hover:text-white hover:border-transparent">
                    <FiPhone size={12} /> Call Now
                  </a>
                </motion.div>
              </div>
            </div>

            {/* ── INCLUDED SERVICES ── */}
            <section className="bg-[#f8f7f3] py-[clamp(56px,8vw,96px)] px-6 md:px-14">
              <div className="max-w-7xl mx-auto">

                {/* Section header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-[clamp(2rem,4vw,3.5rem)]">
                  <div>
                    <motion.p {...fadeUp}
                      className="text-[9px] font-black tracking-[0.32em] uppercase mb-3 flex items-center gap-2"
                      style={{ color: svc.accent }}>
                      <span className="w-6 h-[1.5px] inline-block" style={{ background: svc.accent }} />
                      Everything Under One Roof
                    </motion.p>
                    <motion.h3 {...fadeUp} transition={{ duration: 0.7, delay: 0.08 }}
                      className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-black text-[#111] tracking-tighter leading-[1.05]">
                      Included Services
                    </motion.h3>
                  </div>
                  <motion.p {...fadeUp} transition={{ duration: 0.65, delay: 0.14 }}
                    className="text-[13px] text-black/38 font-light leading-relaxed max-w-[38ch]">
                    All managed in-house — planned, executed, and quality-checked by our team.
                  </motion.p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {svc.subs.map((sub, i) => (
                    <SubCard key={i} {...sub} accent={svc.accent} i={i} />
                  ))}
                </div>
              </div>
            </section>

            {/* ── CTA BANNER ── */}
            <section className="px-6 md:px-14 pb-[clamp(56px,8vw,96px)] bg-[#f8f7f3]">
              <div className="max-w-7xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.65 }}
                  className="relative rounded-[28px] overflow-hidden p-[clamp(2rem,5vw,3.5rem)]"
                  style={{ background: 'linear-gradient(130deg, #0f0f0f 0%, #1a1a1a 100%)' }}>
                  {/* Glows */}
                  <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full blur-[100px] opacity-20"
                    style={{ background: svc.accent }} />
                  <div className="absolute -left-10 -bottom-10 w-60 h-60 rounded-full blur-[80px] opacity-10"
                    style={{ background: svc.accentDark }} />

                  <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-7">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                      style={{ background: `${svc.accent}22`, color: svc.accent }}>
                      <Icon />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-[clamp(1.1rem,2vw,1.4rem)] font-black tracking-tight leading-snug mb-2">
                        One team. One contract. All delivered.
                      </p>
                      <p className="text-white/32 text-[13px] font-light leading-relaxed max-w-xl">
                        Karrcholai coordinates every aspect — design to handover — so nothing falls through the cracks.
                      </p>
                    </div>
                    <Link to="/contact"
                      className="flex-shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-white text-[11px] font-black tracking-widest uppercase transition-all hover:opacity-85"
                      style={{ background: svc.accent, boxShadow: `0 8px 30px ${svc.accent}45` }}>
                      Start a Project <FiArrowRight size={11} />
                    </Link>
                  </div>
                </motion.div>
              </div>
            </section>

          </motion.div>
        </AnimatePresence>
      </div>


      {/* ══════════════════════════════════════════════════════════════════════
          ALL 4 SERVICES — dark overview strip
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-[clamp(64px,9vw,120px)] px-6 md:px-14 bg-[#0d0d0d] relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[160px] opacity-[0.05]"
          style={{ background: '#C17B3E' }} />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] opacity-[0.04]"
          style={{ background: '#4E8B5F' }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-[clamp(3rem,5vw,5rem)]">
            <div>
              <motion.p {...fadeUp}
                className="text-[9px] font-black tracking-[0.35em] uppercase text-[#C17B3E] mb-3 flex items-center gap-2">
                <span className="w-6 h-[1.5px] bg-[#C17B3E] inline-block" />
                Our Four Pillars
              </motion.p>
              <motion.h2 {...fadeUp} transition={{ duration: 0.7, delay: 0.1 }}
                className="text-[clamp(2rem,4.5vw,3.8rem)] font-black text-white tracking-tighter leading-[1.05] max-w-md">
                Every Stage of Your Project, Covered.
              </motion.h2>
            </div>
            <motion.p {...fadeUp} transition={{ duration: 0.65, delay: 0.15 }}
              className="text-[13px] text-white/28 font-light leading-relaxed max-w-[34ch] md:text-right">
              From foundation to handover — residential, managed, renovated, or green.
            </motion.p>
          </div>

          {/* 4 cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICES.map((s, i) => {
              const SI = s.icon
              const isA = active === s.id
              return (
                <motion.div key={s.id}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.09, ease }}
                  whileHover={{ y: -8, transition: { duration: 0.25 } }}
                  onClick={() => goTo(s.id)}
                  className="cursor-pointer group rounded-[22px] overflow-hidden relative"
                  style={{
                    border: isA ? `1.5px solid ${s.accent}50` : '1.5px solid rgba(255,255,255,0.05)',
                    boxShadow: isA ? `0 20px 56px ${s.accent}20` : 'none',
                    background: '#161616',
                  }}>
                  {/* Active bar */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] transition-all duration-500"
                    style={{ background: isA ? s.accent : 'transparent' }} />

                  {/* Image */}
                  <div className="h-44 relative overflow-hidden">
                    <img src={s.img} alt={s.label} loading="lazy"
                      className="w-full h-full object-cover opacity-40 group-hover:opacity-55 group-hover:scale-105 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-[#161616]/20 to-transparent" />
                    <span className="absolute top-4 right-4 text-[10px] font-black tracking-widest"
                      style={{ color: `${s.accent}66` }}>{s.index}</span>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-2.5 mb-3.5">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                        style={{ background: isA ? `${s.accent}22` : 'rgba(255,255,255,0.06)', color: isA ? s.accent : 'rgba(255,255,255,0.28)' }}>
                        <SI size={14} />
                      </div>
                      <span className="text-[9px] font-black uppercase tracking-widest"
                        style={{ color: isA ? `${s.accent}88` : 'rgba(255,255,255,0.18)' }}>{s.tag}</span>
                    </div>
                    <h3 className="text-[14px] font-black text-white mb-1.5 tracking-tight leading-snug">{s.label}</h3>
                    <p className="text-[11px] text-white/28 font-light leading-relaxed mb-4 line-clamp-2">{s.tagline}</p>
                    <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest transition-all duration-300"
                      style={{ color: isA ? s.accent : 'rgba(255,255,255,0.22)' }}>
                      Explore <FiArrowRight size={10} />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-[clamp(72px,10vw,120px)] px-6 md:px-14 bg-[#f8f7f3]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, ease }}
            className="relative rounded-[2.5rem] overflow-hidden p-[clamp(2.5rem,6vw,5rem)] text-center"
            style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #111 100%)' }}>
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[130px] opacity-14"
              style={{ background: '#C17B3E' }} />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-[100px] opacity-7"
              style={{ background: '#4E8B5F' }} />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-[#C17B3E]/14 border border-[#C17B3E]/22 flex items-center justify-center mx-auto mb-7 text-[#C17B3E] text-xl">
                <BsBuilding />
              </div>
              <p className="text-[9px] font-black tracking-[0.35em] uppercase text-[#C17B3E] mb-4">Ready to Begin?</p>
              <h2 className="text-[clamp(2rem,4.5vw,3.8rem)] font-black text-white tracking-tighter leading-[1.05] mb-5">
                Let's build something<br />worth living in.
              </h2>
              <p className="text-white/32 text-[14px] font-light leading-relaxed max-w-md mx-auto mb-10">
                From first conversation to the day you get your keys — one team, no middlemen, no surprises.
              </p>
              <div className="flex gap-3 justify-center flex-wrap">
                <Link to="/contact"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-[#C17B3E] text-white text-[11px] font-black tracking-widest uppercase transition-all hover:opacity-85 hover:-translate-y-0.5 shadow-[0_14px_40px_rgba(193,123,62,0.36)]">
                  Start a Project <FiArrowRight size={12} />
                </Link>
                <Link to="/projects"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl border border-white/10 text-[11px] font-bold tracking-widest uppercase text-white/55 transition-all hover:border-white/22 hover:text-white">
                  View Our Work <BsArrowRight size={12} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════════════════════════════ */}
      <FAQSection
        dark={false}
        accent="#C17B3E"
        subtitle="Common Questions"
        title="Everything You Need to Know About Our Services"
        faqs={[
          { q: 'Do you provide house construction from foundation to handover?', a: 'Yes. Karrcholai handles the complete construction lifecycle — from site analysis and foundation work through structural build, finishing, and final key handover. You get one team, one contract, and a single point of contact throughout.' },
          { q: 'What is PMC in construction?', a: 'PMC stands for Project Management Consultancy. We act as your on-site representative — managing contractors, budgets, timelines, material procurement, quality inspections, and documentation.' },
          { q: 'What does your renovation service cover?', a: 'Our renovation service covers structural upgrades, interior remodelling, Vastu realignment, kitchen and bathroom renovation, flooring replacement, facade work, and phase-wise expansion.' },
          { q: 'Are sustainable features like solar and rainwater harvesting included?', a: 'Sustainability is built into every Karrcholai project by default. Solar, rainwater, smart lighting, waste segregation, and native landscaping are planned at design stage — not retrofitted as extras.' },
          { q: 'Which areas of Tamil Nadu do you serve?', a: 'We serve Karur, Chennai, Coimbatore, Madurai, Trichy, Erode, and surrounding areas across Tamil Nadu.' },
          { q: 'Do you offer Vastu-compliant design?', a: 'Yes. Every residential layout is reviewed against Vastu Shastra and Manaiyadi Sastram principles — auspicious orientations, door placements, and dimensions alongside modern engineering.' },
          { q: 'How long does residential construction take?', a: 'A standard independent house typically takes 10–16 months from groundbreaking to handover. We provide a detailed milestone timeline at the start of every project.' },
        ]}
      />

      <UnifiedFooter />
    </div>
  )
}
