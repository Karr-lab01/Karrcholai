import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView, useScroll, useTransform, useSpring } from 'framer-motion'
import { FiPhone, FiMail, FiMapPin, FiClock, FiSend, FiArrowRight, FiNavigation, FiChevronDown, FiInstagram, FiFacebook } from 'react-icons/fi'
import Navbar from '../components/Navbar'
import UnifiedFooter from '../components/UnifiedFooter'
import heroBg from '../../assets/Exterior of modern luxury house with garden and beautiful sky.jpg'
import heroVid from '../../assets/contact1.jpg'
import img1 from '../../assets/img1.jpg'
import img5 from '../../assets/img5.jpg'
import img9 from '../../assets/img9.jpg'
import img3 from '../../assets/img3.jpg'
import modernHouse from '../../assets/MORDEN HOUSE.jpg'

const FOREST = '#3F5F4A'
const TERRA = '#C9754A'
const CREAM = '#F5F2EC'
const DARK = '#1C1C1A'

const inp = `w-full px-4 py-2.5 rounded-xl text-sm font-medium outline-none transition-all duration-300 border-2 border-transparent bg-[#F5F2EC] focus:bg-white focus:border-[#C9754A]`

// ── Parallax word (same as Projects) ─────────────────────────────────────────
function PWord({ children, delay = 0 }) {
  return (
    <motion.span initial={{ y: 110, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
      className="inline-block" style={{ paddingBottom: '0.15em', marginBottom: '-0.15em' }}>
      {children}
    </motion.span>
  )
}

// ── Animated form field ───────────────────────────────────────────────────────
function Field({ label, children }) {
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.5 }} className="flex flex-col gap-1">
      <label className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: `${DARK}55` }}>{label}</label>
      {children}
    </motion.div>
  )
}

// ── FAQ accordion ─────────────────────────────────────────────────────────────
const faqs = [
  { q: 'How long does a typical residential project take?', a: 'Most residential projects take 8–18 months depending on size and complexity. We provide a detailed timeline during the initial consultation.' },
  { q: 'Do you offer free consultations?', a: "Yes — our first consultation is completely free. We'll walk you through the entire process, cost estimates, and design possibilities." },
  { q: 'What areas do you serve?', a: 'We primarily serve Chennai, Coimbatore, Madurai, Trichy, and surrounding areas across Tamil Nadu.' },
  { q: 'Can I track my project progress?', a: 'Absolutely. We provide weekly progress reports, site photos, and a dedicated project manager as your single point of contact.' },
  { q: 'Do you handle permits and approvals?', a: 'Yes, we manage all government approvals, CMDA/DTCP permits, and legal documentation on your behalf.' },
]

function FAQ({ q, a, i }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ delay: i * 0.08 }}
      className="border-b last:border-0 cursor-pointer" style={{ borderColor: `${DARK}10` }}
      onClick={() => setOpen(v => !v)}>
      <div className="flex items-center justify-between py-5 gap-4">
        <span className="text-sm font-bold" style={{ color: DARK }}>{q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }} className="flex-shrink-0">
          <FiChevronDown size={16} style={{ color: TERRA }} />
        </motion.div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }}
            className="overflow-hidden text-sm font-light leading-relaxed pb-5" style={{ color: `${DARK}65` }}>
            {a}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ── FAQ Dark variant ─────────────────────────────────────────────────────────
function FAQDark({ q, a, i, inView }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.2 + i * 0.08, duration: 0.6 }}
      className="border-b cursor-pointer group"
      style={{ borderColor: 'rgba(255,255,255,0.07)' }}
      onClick={() => setOpen(v => !v)}
    >
      <div className="flex items-center gap-4 py-5">
        {/* Number */}
        <span className="text-[11px] font-black tabular-nums flex-shrink-0 w-6"
          style={{ color: open ? TERRA : 'rgba(255,255,255,0.2)' }}>
          {String(i + 1).padStart(2, '0')}
        </span>
        <span className="flex-1 text-sm font-bold transition-colors duration-300"
          style={{ color: open ? '#fff' : 'rgba(232,229,223,0.7)' }}>{q}</span>
        <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3 }}
          className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
          style={{ background: open ? TERRA : 'rgba(255,255,255,0.06)', border: `1px solid ${open ? TERRA : 'rgba(255,255,255,0.1)'}` }}>
          <span className="text-white text-sm font-black leading-none">+</span>
        </motion.div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }}
            className="overflow-hidden pl-10 pb-5">
            <p className="text-sm font-light leading-relaxed" style={{ color: 'rgba(232,229,223,0.55)' }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

import { Helmet } from 'react-helmet-async'

export default function ContactUs() {
  const [sent, setSent] = useState(false)
  const heroRef = useRef(null)
  const introRef = useRef(null)
  const formRef = useRef(null)
  const howRef = useRef(null)
  const mapRef = useRef(null)
  const faqRef = useRef(null)

  const introInView = useInView(introRef, { once: true, amount: 0.15 })
  const formInView = useInView(formRef, { once: true, amount: 0.1 })
  const howInView = useInView(howRef, { once: true, amount: 0.1 })
  const mapInView = useInView(mapRef, { once: true, amount: 0.2 })
  const faqInView = useInView(faqRef, { once: true, amount: 0.1 })

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(heroScroll, [0, 1], ['0%', '28%'])

  const handleSubmit = (e) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 4000) }

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: CREAM, color: DARK }}>
      <Helmet>
        <title>Contact Us | Karrcholai Construction</title>
        <meta name="description" content="Get in touch with Karrcholai Construction for premium residential projects in Tamil Nadu. Schedule a free consultation for your dream home." />
        <link rel="canonical" href="https://karrcholai.com/contact" />
      </Helmet>

      {/* ── Scroll progress bar ── */}
      <motion.div className="fixed top-0 left-0 right-0 h-[3px] z-[200] origin-left"
        style={{ scaleX, background: `linear-gradient(90deg, ${FOREST}, ${TERRA})` }} />


      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative flex items-center justify-center overflow-hidden"
        style={{ height: 'clamp(420px, 65vw, 600px)' }}>

        {/* Background — image with slow Ken Burns zoom + parallax */}
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
          <motion.img
            src={heroVid}
            alt="Contact Us Background"
            className="absolute inset-0 w-full h-full object-cover object-center"
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ scale: 1.08, opacity: 1 }}
            transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
        </motion.div>
        {/* Ambient orbs */}
        <motion.div className="absolute w-96 h-96 rounded-full blur-3xl pointer-events-none"
          style={{ background: TERRA, right: '5%', top: '10%', opacity: 0.07 }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.12, 0.05] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="absolute w-72 h-72 rounded-full blur-3xl pointer-events-none"
          style={{ background: FOREST, left: '3%', bottom: '15%', opacity: 0.07 }}
          animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 9, repeat: Infinity, delay: 2 }} />

        <div className="relative z-10 text-center px-4 sm:px-6" style={{ paddingTop: '90px' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            {/* Label */}
            <p className="font-black tracking-[0.4em] uppercase text-xs sm:text-sm mb-6"
              style={{ color: TERRA }}>
              Karrcholai · Stone Grove
            </p>

            {/* Heading — Cholai style */}
            <div style={{ paddingBottom: '0.2em' }}>
              <h1 className="font-black text-white uppercase tracking-tighter leading-[0.95] mb-8"
                style={{ fontSize: 'clamp(2.8rem, 12vw, 8rem)' }}>
                <PWord delay={0.1}>CONTACT&nbsp;</PWord>
                <PWord delay={0.22}>
                  <span className="italic" style={{
                    color: 'transparent',
                    WebkitTextStroke: `2px ${TERRA}`,
                    textShadow: `0 0 40px ${TERRA}66`
                  }}>US</span>
                </PWord>
              </h1>
            </div>

            {/* Subtitle — Cholai style with lines */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-12" style={{ background: `${TERRA}60` }} />
              <p className="text-white/70 text-xs sm:text-sm font-light tracking-[0.2em] uppercase max-w-lg">
                From Stone to Oasis — We Build Better Living
              </p>
              <div className="h-px w-12" style={{ background: `${TERRA}60` }} />
            </div>


          </motion.div>
        </div>

        {/* Scroll indicator — Cholai style */}
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
        >
          <span className="text-white/30 text-[9px] uppercase tracking-[0.4em] font-bold">Scroll</span>
          <div className="w-px h-12" style={{ background: `linear-gradient(to bottom, ${TERRA}, transparent)` }} />
        </motion.div>
      </section>

      {/* ── INTRO: content + image collage ───────────────────────────────── */}
      <section ref={introRef} className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <motion.div initial={{ opacity: 0, x: -24 }} animate={introInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }} className="flex items-center gap-3 mb-6">
              <motion.span className="h-[2px] rounded-full" style={{ background: TERRA }}
                initial={{ width: 0 }} animate={introInView ? { width: 40 } : { width: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }} />
              <span className="text-[11px] font-black tracking-[0.4em] uppercase" style={{ color: TERRA }}>Get In Touch</span>
            </motion.div>

            <div className="overflow-hidden mb-6">
              <motion.h2 initial={{ y: 60, opacity: 0 }} animate={introInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight" style={{ color: DARK }}>
                If you are planning to<br />
                <span style={{ color: TERRA, fontStyle: 'italic' }}>build a house</span> or require<br />
                professional support
              </motion.h2>
            </div>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={introInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="text-base font-light leading-relaxed mb-10" style={{ color: `${DARK}70` }}>
              Karrcholai Construction is ready to assist you. From the first brick to the final finish,
              we bring discipline, transparency, and craftsmanship to every project.
            </motion.p>

            {/* Contact rows */}
            <div className="space-y-4">
              {[
                { Icon: FiPhone, label: 'Phone', value: '+91 97414 16747', href: 'tel:+919741416747', color: TERRA },
                { Icon: FiMail, label: 'Email', value: 'karrcholai@gmail.com', href: 'mailto:karrcholai@gmail.com', color: FOREST },
                { Icon: FiMapPin, label: 'Location', value: 'Karur, Tamil Nadu', href: 'https://maps.google.com/?q=5/20,+PULIYAMPATTI,+CV+PALAYAM+(PO),+PUGALUR+(TALUK),+THENNILAI+(WEST),+KARUR(DT)+-+639+206', color: '#8B7355' },
              ].map((item, i) => (
                <motion.a key={i} href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }} animate={introInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.35 + i * 0.1, duration: 0.6 }}
                  whileHover={{ x: 6, transition: { duration: 0.2 } }}
                  className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{ background: `${item.color}15`, border: `1px solid ${item.color}35` }}>
                    <item.Icon size={17} style={{ color: item.color }} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black tracking-[0.25em] uppercase" style={{ color: `${DARK}45` }}>{item.label}</p>
                    <p className="text-sm font-bold group-hover:underline" style={{ color: DARK }}>{item.value}</p>
                  </div>
                  <FiArrowRight size={13} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: item.color }} />
                </motion.a>
              ))}
            </div>


          </div>

          {/* Image collage */}
          <div className="relative h-[380px] sm:h-[480px]">
            <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={introInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl">
              <img src={img1} alt="Karrcholai" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${FOREST}22, transparent)` }} />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30, y: -20 }} animate={introInView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute -top-4 -right-4 sm:-right-8 w-36 sm:w-44 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img src={img5} alt="" className="w-full h-28 sm:h-36 object-cover" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -30, y: 20 }} animate={introInView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.65 }}
              className="absolute -bottom-4 -left-4 sm:-left-8 w-40 sm:w-52 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img src={img9} alt="" className="w-full h-24 sm:h-32 object-cover" />
              <div className="p-3" style={{ background: DARK }}>
                <p className="text-[9px] font-black tracking-widest uppercase" style={{ color: TERRA }}>Tamil Nadu</p>
                <p className="text-xs font-bold text-white">Premium Construction</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── CONTACT SECTION ────────────────────────────────────────── */}
      <section ref={formRef} className="py-12 md:py-16" style={{ background: DARK }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={formInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }} className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="w-8 h-px" style={{ background: TERRA }} />
              <span className="text-[10px] font-black tracking-[0.4em] uppercase" style={{ color: TERRA }}>Simple Process</span>
              <span className="w-8 h-px" style={{ background: TERRA }} />
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white">How to Reach Us</h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={formInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-3 rounded-[2rem] p-5 sm:p-6 flex flex-col" style={{ background: CREAM }}>
              <div className="mb-3">
                <h3 className="text-xl font-black mb-0.5" style={{ color: DARK }}>Get in Touch</h3>
                <p className="text-[11px] font-light" style={{ color: `${DARK}60` }}>We'll get back to you shortly.</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                  <Field label="Full Name"><input type="text" placeholder="Your name" className={inp} required /></Field>
                  <Field label="Email Address"><input type="email" placeholder="you@email.com" className={inp} required /></Field>
                  <Field label="Phone Number"><input type="tel" placeholder="+91 98765 43210" className={inp} /></Field>
                  <Field label="Service Needed">
                    <select className={inp} style={{ appearance: 'none' }}>
                      <option>General Inquiry</option>
                      <option>Residential Construction</option>
                      <option>Project Management</option>
                      <option>Sustainable Design</option>
                      <option>Renovation</option>
                    </select>
                  </Field>
                  <div className="sm:col-span-2">
                    <Field label="Budget Range">
                      <select className={inp} style={{ appearance: 'none' }}>
                        <option>Under ₹30 Lakhs</option>
                        <option>₹30 – ₹60 Lakhs</option>
                        <option>₹60 Lakhs – ₹1 Crore</option>
                        <option>Above ₹1 Crore</option>
                      </select>
                    </Field>
                  </div>
                </div>
                <Field label="Your Message">
                  <textarea rows={3} placeholder="Tell us about your project, location, and timeline..." className={inp + ' resize-none'} required />
                </Field>
                <div className="pt-2">
                  <motion.button type="submit" whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.97 }}
                    className="w-full py-4 rounded-xl font-black text-sm tracking-[0.2em] uppercase text-white flex items-center justify-center gap-2"
                    style={{ background: sent ? FOREST : `linear-gradient(135deg, ${TERRA}, ${FOREST})`, boxShadow: `0 8px 24px ${TERRA}40` }}>
                    {sent ? <><span>Sent!</span><motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}>✓</motion.span></> : <><FiSend size={14} />Send Message</>}
                  </motion.button>
                </div>
              </form>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={formInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 }} className="lg:col-span-2 flex flex-col gap-5">

              <div className="rounded-3xl p-6" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="flex items-center gap-3 mb-4">
                  <FiClock size={15} style={{ color: TERRA }} />
                  <h3 className="font-black text-sm tracking-[0.25em] uppercase text-white">Office Hours</h3>
                </div>
                {[
                  { day: 'Monday – Friday', time: '9:00 AM – 6:00 PM', open: true },
                  { day: 'Saturday', time: '10:00 AM – 4:00 PM', open: true },
                  { day: 'Sunday', time: 'Closed', open: false },
                ].map((row, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 10 }} animate={formInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex justify-between items-center py-2.5 border-b last:border-0" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                    <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.45)' }}>{row.day}</span>
                    <span className="text-xs font-bold" style={{ color: row.open ? TERRA : 'rgba(255,255,255,0.2)' }}>{row.time}</span>
                  </motion.div>
                ))}
                <div className="mt-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>Currently Open</span>
                </div>
              </div>

              {/* Added: Important Direct Contact Card */}
              <div className="rounded-3xl p-6" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${TERRA}20` }}>
                      <FiPhone size={14} style={{ color: TERRA }} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black tracking-widest uppercase text-white/30">Direct Call</p>
                      <p className="text-sm font-bold text-white">+91 97414 16747</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${FOREST}20` }}>
                      <FiMail size={14} style={{ color: FOREST }} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black tracking-widest uppercase text-white/30">Official Email</p>
                      <p className="text-sm font-bold text-white">karrcholai@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FAQ & MAP UNIFIED ────────────────────────────────────────── */}
      <section ref={faqRef} className="py-20 md:py-28 relative overflow-hidden" style={{ background: DARK }}>
        {/* Ambient glows */}
        <motion.div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none"
          style={{ background: TERRA, opacity: 0.04 }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.07, 0.03] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Left: FAQ */}
            <div ref={faqRef}>
              <motion.div initial={{ opacity: 0, y: 30 }} animate={faqInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }} className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <motion.div className="h-[2px] rounded-full" style={{ background: TERRA }}
                    initial={{ width: 0 }} animate={faqInView ? { width: 32 } : { width: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }} />
                  <span className="text-[10px] font-black tracking-[0.45em] uppercase" style={{ color: TERRA }}>Common Questions</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                  Got Questions? We've Got <span style={{ color: TERRA, fontStyle: 'italic' }}>Answers.</span>
                </h2>
              </motion.div>

              <div className="space-y-1">
                {faqs.map((f, i) => (
                  <FAQDark key={i} q={f.q} a={f.a} i={i} inView={faqInView} />
                ))}
              </div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={faqInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 }}
                className="mt-10 p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
                <p className="text-xs font-bold text-white mb-1">Still have questions?</p>
                <p className="text-[11px] font-light text-white/40">Our team is ready to help you plan your project. Contact us via email or phone.</p>
              </motion.div>
            </div>

            {/* Right: MAP */}
            <div ref={mapRef} className="lg:sticky lg:top-32">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={faqInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative rounded-3xl overflow-hidden aspect-[4/5] lg:aspect-auto lg:h-[580px] group shadow-2xl border border-white/10">

                {/* Map iframe */}
                <iframe src="https://maps.google.com/maps?q=5/20,+PULIYAMPATTI,+CV+PALAYAM+(PO),+PUGALUR+(TALUK),+THENNILAI+(WEST),+KARUR(DT)+-+639+206&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  width="100%" height="100%" style={{ border: 0, filter: 'saturate(0.8) contrast(1.1) invert(0.1) hue-rotate(180deg)' }}
                  allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />

                {/* Map Clickable Overlay */}
                <a href="https://maps.google.com/?q=5/20,+PULIYAMPATTI,+CV+PALAYAM+(PO),+PUGALUR+(TALUK),+THENNILAI+(WEST),+KARUR(DT)+-+639+206" 
                   target="_blank" rel="noopener noreferrer" 
                   className="absolute inset-0 z-10 block cursor-pointer" aria-label="Open location in Google Maps">
                </a>

                {/* Info Card Overlay */}
                <div className="absolute bottom-6 left-6 right-6 z-20 pointer-events-none">
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={mapInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="pointer-events-auto rounded-2xl p-5"
                    style={{ background: 'rgba(22,20,16,0.92)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)' }}>

                    <div className="flex flex-col gap-4">
                      <div>
                        <h3 className="text-xl font-black text-white">Find Us</h3>
                        <p className="text-[10px] font-light text-white/40 mt-1 leading-relaxed">5/20, PULIYAMPATTI, CV PALAYAM (PO), PUGALUR (TALUK), THENNILAI (WEST), KARUR(DT) - 639 206</p>
                      </div>

                      <div className="flex flex-col gap-2.5">
                        {[
                          { Icon: FiMapPin, v: 'Thennilai (West), Karur', c: TERRA },
                          { Icon: FiPhone, v: '+91 97414 16747', c: FOREST },
                        ].map((row, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                              style={{ background: `${row.c}20`, border: `1px solid ${row.c}30` }}>
                              <row.Icon size={10} style={{ color: row.c }} />
                            </div>
                            <span className="text-[11px] font-medium text-white/60">{row.v}</span>
                          </div>
                        ))}
                      </div>

                      <motion.a href="https://maps.google.com/?q=5/20,+PULIYAMPATTI,+CV+PALAYAM+(PO),+PUGALUR+(TALUK),+THENNILAI+(WEST),+KARUR(DT)+-+639+206" target="_blank" rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-dark text-[10px] font-black uppercase tracking-widest transition-all">
                        <FiNavigation size={12} /> Get Directions
                      </motion.a>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>
      <UnifiedFooter />
    </div>
  )
}
