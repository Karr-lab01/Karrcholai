import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  FiMapPin, FiCalendar, FiMaximize, FiUser, FiArrowRight, 
  FiCheckCircle, FiShield, FiCpu, FiSun, FiDroplet, FiZap, FiActivity, FiCompass 
} from 'react-icons/fi'
import { FaStar, FaQuoteLeft } from 'react-icons/fa'
import Navbar from '../components/Navbar'
import UnifiedFooter from '../components/UnifiedFooter'
import FootprintMapSection from '../components/FootprintMapSection'
import { Helmet } from 'react-helmet-async'

// Image imports from root assets
import prj11 from '../../assets/prj11.jpeg'
import prj20 from '../../assets/prj20.jpeg'
import prj23 from '../../assets/prj23.jpeg'
import prj6 from '../../assets/prj6.jpeg'
import prj2 from '../../assets/prj2.jpeg'
import prj8 from '../../assets/prj8.jpeg'
import prj5 from '../../assets/prj5.jpeg'

import prj24 from '../../assets/prj24.jpeg'
import prj25 from '../../assets/prj25.jpeg'
import prj26 from '../../assets/prj26.jpeg'
import heroImg from '../../assets/img1.jpg'

// Bright Luxury Color Palette
const CREAM = '#fdfbf7'      // Alabaster Cream
const CARD_BG = '#F6F3EC'    // Light Linen Cream
const SAGE = '#2D4B37'       // Sage green highlight
const TERRA = '#B85C38'      // Terracotta highlight
const BRONZE = '#2A2A28'     // Premium dark-bronze text
const MUTED = '#7C7C79'      // Muted text
const BRASS = '#C5A880'      // Brass highlights
const BORDER_COLOR = 'rgba(58,58,56,0.06)' // Soft elegant borders

export default function Projects() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  // Interactive Gallery States
  const [activeImgP1, setActiveImgP1] = useState(0)
  const [activeTabP1, setActiveTabP1] = useState('vision')

  const [activeImgP2, setActiveImgP2] = useState(0)
  const [activeTabP2, setActiveTabP2] = useState('vision')

  const p1Images = [prj11, prj20, prj23, prj6, prj2, prj8]
  const p1Captions = [
    "01 / Front Elevation",
    "02 / Structural Columns",
    "03 / Double-Height Living Area",
    "04 / Granite Masonry Work",
    "05 / Internal Structural Layout",
    "06 / Courtyard Structure"
  ]

  const p2Images = [prj24, prj25, prj26]
  const p2Captions = [
    "01 / Front Facade",
    "02 / Open Interior Spaces",
    "03 / Rainwater Harvesting Courtyard"
  ]

  return (
    <div ref={containerRef} className="min-h-screen overflow-x-hidden font-sans select-none" style={{ background: CREAM, color: BRONZE }}>
      <Helmet>
        <title>Our Projects | Karrcholai Construction</title>
        <meta name="description" content="Explore completed residential projects by Karrcholai — independent homes and villas across Tamil Nadu, built with structural integrity and disciplined execution." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;600;900&family=Oswald:wght@300;400;600;700&family=Space+Grotesk:wght@300;400;600;700&display=swap" rel="stylesheet" />
        <link rel="canonical" href="https://karrcholai.com/projects" />
      </Helmet>

      {/* Luxury Progress Scroll Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[4px] z-[200] origin-left"
        style={{ scaleX, background: `linear-gradient(90deg, ${SAGE}, ${BRASS}, ${TERRA})` }}
      />

      <Navbar />

      {/* ── CINEMATIC FULL-WIDTH DARK HERO (Consistent with Karr / Cholai Screens) ── */}
      <section className="relative w-full h-[75vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-[#1a1a1a]">
        
        {/* Background Visual Frame */}
        <div className="absolute inset-0 z-0">
          <motion.img 
            src={heroImg}
            alt="Karrcholai Construction Signature Landmarks"
            className="w-full h-full object-cover opacity-85"
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
          />
          {/* Sophisticated site-wide multi-layered overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/40 via-transparent to-[#1a1a1a]/70" />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(135deg, rgba(45,75,55,0.08) 0%, transparent 60%, rgba(184,92,56,0.06) 100%)'
          }} />
        </div>

        {/* Centered Premium Title Branding Block */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          >
            <h1 
              className="text-5xl md:text-8xl font-bold text-white leading-none tracking-tighter mb-8 drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Our <span className="text-white/40 italic">Projects.</span>
            </h1>
            <p 
              className="text-white/90 text-sm md:text-lg max-w-xl mx-auto font-normal leading-relaxed border-t border-white/20 pt-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Residential projects across Tamil Nadu — built with strong structure, careful planning, and quality execution.
            </p>
          </motion.div>
        </div>

        {/* Downward Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 hidden md:block">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-[1px] h-12 bg-gradient-to-b from-[#B85C38] to-transparent"
          />
        </div>
      </section>

      {/* ── PROJECT 01: THE MOHANAVALLI RESIDENCE (ERODE) ── */}
      <section className="py-16 sm:py-28 md:py-40 border-b relative" style={{ borderColor: BORDER_COLOR }}>
        
        {/* Decorative Grid coordinate marker */}
        <div className="absolute right-12 top-12 text-[10px] font-black text-dark/15 tracking-widest uppercase hidden md:block" style={{ fontFamily: "'Outfit', sans-serif" }}>
          LATITUDE 11.34° N // LONGITUDE 77.71° E // ERODE, TN
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Headline block */}
          <div className="mb-10 sm:mb-14">
            <span 
              className="text-[10px] font-black tracking-[0.35em] uppercase" 
              style={{ color: TERRA, fontFamily: "'Outfit', sans-serif" }}
            >
              Case Study 01 // Residential Construction
            </span>
            <h2 
              className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight mt-2 leading-none" 
              style={{ color: BRONZE, fontFamily: "'Oswald', sans-serif" }}
            >
              ECR Residence
            </h2>
            <div className="w-16 h-[2px] mt-4" style={{ background: TERRA }} />
          </div>

          {/* LUXURY METRICS DASHBOARD */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl sm:rounded-3xl border shadow-sm mb-10 sm:mb-16 bg-white" style={{ borderColor: BORDER_COLOR }}>
            {[
              { icon: FiMaximize, label: "Total Built Space", value: "17k Sq.Ft", accent: TERRA },
              { icon: FiMapPin, label: "Geographic Site", value: "Chennai ECR", accent: TERRA },
              { icon: FiCalendar, label: "Year Completed", value: "2026", accent: TERRA }
            ].map((spec, idx) => (
              <div key={idx} className="p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-dark/[0.02] bg-[#FCFBF9] flex items-center gap-3 sm:gap-4 hover:border-dark/10 transition-all duration-300">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${spec.accent}08` }}>
                  <spec.icon className="text-sm sm:text-base" style={{ color: spec.accent }} />
                </div>
                <div>
                  <p className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-dark/35 mb-0.5" style={{ fontFamily: "'Outfit', sans-serif" }}>{spec.label}</p>
                  <p className="text-xs sm:text-sm font-black text-dark/95 leading-none" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{spec.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* MAIN ALIGNED 2-COLUMN GRID (Images and Content Perfectly Aligned Side-by-Side) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-stretch">
            
            {/* Left Panel: Cinematic Image Gallery with Dynamic Thumbnail Selection (7/12 Width) */}
            <div className="lg:col-span-7 flex flex-col justify-between self-stretch gap-5 sm:gap-6">
              
              {/* Primary Active Showcase Frame */}
              <div className="overflow-hidden rounded-2xl sm:rounded-[28px] shadow-lg aspect-[16/10] group relative bg-stone-100 border border-dark/5 flex-1 flex items-stretch">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImgP1}
                    src={p1Images[activeImgP1]}
                    alt={p1Captions[activeImgP1]}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-103"
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                  />
                </AnimatePresence>
                {/* Active Caption Badge */}
                <div 
                  className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5 bg-[#fdfbf7]/95 backdrop-blur-md text-dark text-[8px] sm:text-[9px] uppercase tracking-widest px-3 sm:px-4 py-1.5 sm:py-2 rounded-md font-black border border-dark/5 shadow-sm"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {p1Captions[activeImgP1]}
                </div>
              </div>

              {/* Symmetrical Row of Interactive Thumbnails (Updated to grid-cols-6 with responsive touch swiping) */}
              <div className="flex overflow-x-auto lg:grid lg:grid-cols-6 gap-3 flex-shrink-0 pb-2 lg:pb-0 hide-scrollbar snap-x">
                {p1Images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgP1(idx)}
                    className={`overflow-hidden rounded-xl sm:rounded-2xl shadow-sm aspect-[4/3] relative bg-stone-100 border transition-all duration-300 flex-shrink-0 w-16 sm:w-20 lg:w-auto snap-center ${
                      activeImgP1 === idx ? 'border-[#B85C38] scale-103 ring-2 ring-[#B85C38]/20' : 'border-dark/5 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Panel: Advanced Project Storytelling Tabs Deck & Testimonial (5/12 Width) */}
            <div className="lg:col-span-5 flex flex-col justify-between self-stretch gap-6">
              
              {/* Architectural Storytelling deck */}
              <div className="p-5 sm:p-8 rounded-[20px] sm:rounded-3xl bg-white border shadow-sm flex-1 flex flex-col justify-between" style={{ borderColor: BORDER_COLOR }}>
                <div>
                  
                  {/* Visual Spec Tabs */}
                  <div className="flex border-b pb-3 sm:pb-4 mb-5 sm:mb-6 gap-3 overflow-x-auto hide-scrollbar" style={{ borderColor: 'rgba(58,58,56,0.06)' }}>
                    {[
                      { id: 'vision', label: '01 / Vision' },
                      { id: 'structural', label: '02 / Structure' },
                      { id: 'material', label: '03 / Materiality' },
                      { id: 'timeline', label: '04 / Timeline' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTabP1(tab.id)}
                        className={`text-[9px] font-bold uppercase tracking-wider pb-1.5 border-b-2 transition-all duration-300 flex-shrink-0 ${
                          activeTabP1 === tab.id ? 'border-[#B85C38] text-dark' : 'border-transparent text-dark/40 hover:text-dark/70'
                        }`}
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Dynamic Tab Contents */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTabP1}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4 text-xs sm:text-sm font-light text-dark/75 leading-relaxed"
                    >
                      {activeTabP1 === 'vision' && (
                        <>
                          <h4 className="font-bold text-sm sm:text-base text-dark/95 mb-2" style={{ fontFamily: "'Oswald', sans-serif" }}>Design Concept</h4>
                          <p>
                            The ECR Residence is a large-scale independent home designed for open living, structural strength, and long-term durability along Chennai's East Coast Road.
                          </p>
                          <p>
                            The layout connects indoor living areas with outdoor spaces including the pool zone, while addressing ventilation and thermal comfort for the coastal climate.
                          </p>
                        </>
                      )}

                      {activeTabP1 === 'structural' && (
                        <>
                          <h4 className="font-bold text-sm sm:text-base text-dark/95 mb-2" style={{ fontFamily: "'Oswald', sans-serif" }}>Structural & Engineering</h4>
                          <p>
                            The structure uses post-tensioned slab technology to achieve wide, column-free spans in the main living area — allowing flexible interior planning without compromising load-bearing capacity.
                          </p>
                          <p className="font-bold border-l-2 pl-3 border-[#B85C38]" style={{ color: BRONZE }}>
                            Foundation and reinforcement designed with Fe-550 grade steel for seismic resilience.
                          </p>
                        </>
                      )}

                      {activeTabP1 === 'material' && (
                        <>
                          <h4 className="font-bold text-sm sm:text-base text-dark/95 mb-2" style={{ fontFamily: "'Oswald', sans-serif" }}>Materials & Finishes</h4>
                          <p>
                            External walls use high-density local granite cavity construction, providing natural thermal insulation and reducing peak indoor temperatures during summer.
                          </p>
                          <p>
                            Interiors feature premium marble flooring, with integrated systems for HVAC, lighting, and security — planned and executed to client specifications.
                          </p>
                        </>
                      )}

                      {activeTabP1 === 'timeline' && (
                        <>
                          <h4 className="font-bold text-sm sm:text-base text-dark/95 mb-2" style={{ fontFamily: "'Oswald', sans-serif" }}>Construction Timeline</h4>
                          <ul className="space-y-2 text-xs">
                            <li className="flex justify-between border-b pb-1" style={{ borderColor: 'rgba(58,58,56,0.04)' }}>
                              <span><strong>Phase 1:</strong> Planning & Excavation</span>
                              <span>Month 1–3</span>
                            </li>
                            <li className="flex justify-between border-b pb-1" style={{ borderColor: 'rgba(58,58,56,0.04)' }}>
                              <span><strong>Phase 2:</strong> Substructure & Post-Tensioning</span>
                              <span>Month 4–8</span>
                            </li>
                            <li className="flex justify-between border-b pb-1" style={{ borderColor: 'rgba(58,58,56,0.04)' }}>
                              <span><strong>Phase 3:</strong> Masonry & Wall Systems</span>
                              <span>Month 9–12</span>
                            </li>
                            <li className="flex justify-between" style={{ borderColor: 'rgba(58,58,56,0.04)' }}>
                              <span><strong>Phase 4:</strong> Finishing & Handover</span>
                              <span>Month 13–16</span>
                            </li>
                          </ul>
                        </>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="h-[1px] w-full bg-gradient-to-r from-[#B85C38]/20 to-transparent mt-5 sm:mt-6" />
              </div>

              {/* Bright Testimonial Panel */}
              <div className="p-5 sm:p-8 rounded-[20px] sm:rounded-3xl border shadow-sm flex-shrink-0 flex flex-col justify-between relative overflow-hidden bg-white" style={{ borderColor: BORDER_COLOR }}>
                <div className="absolute top-4 right-4 text-dark/[0.02] text-7xl pointer-events-none font-serif leading-none">“</div>
                
                <div className="relative z-10">
                  {/* Star Ratings */}
                  <div className="flex items-center gap-1 text-xs text-amber-500 mb-4">
                    {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                  </div>

                  <p className="text-xs sm:text-sm font-light italic leading-relaxed text-dark/80 mb-6">
                    "The KARRCHOLAI team impressed with their professionalism and dedication. From the initial planning stages to the ongoing execution, they have demonstrated a keen eye for detail and a commitment to excellence."
                  </p>
                </div>

                <div className="pt-4 border-t flex items-center justify-between gap-4" style={{ borderColor: 'rgba(58,58,56,0.05)' }}>
                  <div>
                    <h4 className="font-bold text-xs tracking-wide" style={{ color: BRONZE }}>Mrs. Elumalai Mohanavalli</h4>
                    <p className="text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-dark/45 mt-0.5" style={{ fontFamily: "'Outfit', sans-serif" }}>Homeowner Client — Erode</p>
                  </div>
                  <div className="flex flex-col items-end flex-shrink-0">
                    <span className="text-[8px] sm:text-[9px] font-black px-2.5 py-1 rounded bg-[#B85C38]/08 text-[#B85C38] uppercase tracking-wider" style={{ fontFamily: "'Outfit', sans-serif" }}>Verified Review</span>
                    <span className="text-[8px] text-dark/30 mt-1 uppercase font-bold tracking-widest">12-Mo Evaluation</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ── PROJECT 02: THE KARTHIGA DEVI RESIDENCE (COIMBATORE) ── */}
      <section className="py-16 sm:py-28 md:py-40 relative" style={{ background: '#FAF8F5' }}>
        
        {/* Decorative Grid coordinate marker */}
        <div className="absolute right-12 top-12 text-[10px] font-black text-dark/15 tracking-widest uppercase hidden md:block" style={{ fontFamily: "'Outfit', sans-serif" }}>
          LATITUDE 11.01° N // LONGITUDE 76.95° E // COIMBATORE, TN
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Section Case Header */}
          <div className="mb-10 sm:mb-14">
            <span 
              className="text-[9px] font-bold tracking-[0.35em] uppercase" 
              style={{ color: SAGE, fontFamily: "'Outfit', sans-serif" }}
            >
              Case Study 02 // Sustainable Design
            </span>
            <h2 
              className="text-3xl sm:text-5xl font-bold tracking-tight mt-1" 
              style={{ color: BRONZE, fontFamily: "'Oswald', sans-serif" }}
            >
              The Karthiga Devi Residence
            </h2>
            <div className="w-16 h-[2px] mt-4" style={{ background: SAGE }} />
          </div>

          {/* BRIGHT LUXURY METRICS ACCORDION */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl sm:rounded-3xl border shadow-sm mb-10 sm:mb-16 bg-white" style={{ borderColor: BORDER_COLOR }}>
            {[
              { icon: FiMaximize, label: "Total Built Space", value: "5,100 Sq.Ft", accent: SAGE },
              { icon: FiMapPin, label: "Geographic Site", value: "Coimbatore, TN", accent: SAGE },
              { icon: FiCalendar, label: "Year Completed", value: "2024", accent: SAGE }
            ].map((spec, idx) => (
              <div key={idx} className="p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-dark/[0.02] bg-[#FCFBF9] flex items-center gap-3 sm:gap-4 hover:border-dark/10 transition-all duration-300">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${spec.accent}08` }}>
                  <spec.icon className="text-sm sm:text-base" style={{ color: spec.accent }} />
                </div>
                <div>
                  <p className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-dark/35 mb-0.5" style={{ fontFamily: "'Outfit', sans-serif" }}>{spec.label}</p>
                  <p className="text-xs sm:text-sm font-black text-dark/95 leading-none" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{spec.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* MAIN ALIGNED 2-COLUMN GRID (Images and Content Perfectly Aligned Side-by-Side) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-stretch">
            
            {/* Left Panel: Symmetrical Image Gallery with Interactive Thumbnails (7/12 Width) */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5">
              {/* Primary Active Showcase Frame */}
              <div className="overflow-hidden rounded-2xl shadow-sm aspect-[16/10] group relative bg-stone-100 border border-dark/5">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImgP2}
                    src={p2Images[activeImgP2]}
                    alt={p2Captions[activeImgP2]}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-103"
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                  />
                </AnimatePresence>
                <div 
                  className="absolute bottom-4 left-4 bg-[#fdfbf7]/95 backdrop-blur-md text-dark text-[8px] sm:text-[9px] uppercase tracking-widest px-3 py-1.5 rounded font-black border border-dark/5 shadow-sm"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {p2Captions[activeImgP2]}
                </div>
              </div>

              {/* Symmetrical Row of 3 Interactive Thumbnails (with mobile horizontal touch scrolling) */}
              <div className="flex overflow-x-auto lg:grid lg:grid-cols-3 gap-3 sm:gap-5 pb-2 lg:pb-0 hide-scrollbar snap-x">
                {p2Images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgP2(idx)}
                    className={`overflow-hidden rounded-xl shadow-sm aspect-[3/2] relative bg-stone-100 border transition-all duration-300 flex-shrink-0 w-24 sm:w-32 lg:w-auto snap-center ${
                      activeImgP2 === idx ? 'border-[#2D4B37] scale-103 ring-2 ring-[#2D4B37]/20' : 'border-dark/5 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Panel: Aligned structured specifications & Review (5/12 Width) */}
            <div className="lg:col-span-5 flex flex-col justify-between self-stretch gap-6">
              
              {/* Architectural Storytelling deck */}
              <div className="p-5 sm:p-8 rounded-[20px] sm:rounded-3xl bg-white border shadow-sm flex-1 flex flex-col justify-between" style={{ borderColor: BORDER_COLOR }}>
                <div>
                  
                  {/* Visual Spec Tabs */}
                  <div className="flex border-b pb-3 sm:pb-4 mb-5 sm:mb-6 gap-3 overflow-x-auto hide-scrollbar" style={{ borderColor: 'rgba(58,58,56,0.06)' }}>
                    {[
                      { id: 'vision', label: '01 / Vision' },
                      { id: 'structural', label: '02 / Systems' },
                      { id: 'material', label: '03 / Materials' },
                      { id: 'timeline', label: '04 / Timeline' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTabP2(tab.id)}
                        className={`text-[9px] font-bold uppercase tracking-wider pb-1.5 border-b-2 transition-all duration-300 flex-shrink-0 ${
                          activeTabP2 === tab.id ? 'border-[#2D4B37] text-dark' : 'border-transparent text-dark/40 hover:text-dark/70'
                        }`}
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Dynamic Tab Contents */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTabP2}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4 text-xs sm:text-sm font-light text-dark/75 leading-relaxed"
                    >
                      {activeTabP2 === 'vision' && (
                        <>
                          <h4 className="font-bold text-sm sm:text-base text-dark/95 mb-2" style={{ fontFamily: "'Oswald', sans-serif" }}>Design Concept</h4>
                          <p>
                            The Karthiga Devi Residence in Coimbatore was designed as a sustainable home that balances comfortable living with responsible resource use.
                          </p>
                          <p>
                            The plan integrates natural ventilation, solar energy, and rainwater harvesting — demonstrating that practical eco-friendly design can work well for modern residential living.
                          </p>
                        </>
                      )}

                      {activeTabP2 === 'structural' && (
                        <>
                          <h4 className="font-bold text-sm sm:text-base text-dark/95 mb-2" style={{ fontFamily: "'Oswald', sans-serif" }}>Sustainable Systems</h4>
                          <p>
                            Roof-integrated monocrystalline solar panels with battery storage (12.5 kWp) supply a significant portion of daily household electricity needs.
                          </p>
                          <p>
                            A rainwater harvesting system collects and filters monsoon runoff through a three-stage process into a 50,000-litre underground storage tank for reuse.
                          </p>
                        </>
                      )}

                      {activeTabP2 === 'material' && (
                        <>
                          <h4 className="font-bold text-sm sm:text-base text-dark/95 mb-2" style={{ fontFamily: "'Oswald', sans-serif" }}>Materials & Ventilation</h4>
                          <p>
                            The build uses compressed stabilised earth blocks (CSEBs) and bamboo structural elements where appropriate — reducing embodied carbon while maintaining strength.
                          </p>
                          <p>
                            The layout follows natural wind paths, with double-height ventilation shafts and native planting to improve cross-ventilation and reduce dependence on mechanical cooling.
                          </p>
                        </>
                      )}

                      {activeTabP2 === 'timeline' && (
                        <>
                          <h4 className="font-bold text-sm sm:text-base text-dark/95 mb-2" style={{ fontFamily: "'Oswald', sans-serif" }}>Construction Timeline</h4>
                          <ul className="space-y-2 text-xs">
                            <li className="flex justify-between border-b pb-1" style={{ borderColor: 'rgba(58,58,56,0.04)' }}>
                              <span><strong>Phase 1:</strong> Site Planning & Orientation</span>
                              <span>Month 1–2</span>
                            </li>
                            <li className="flex justify-between border-b pb-1" style={{ borderColor: 'rgba(58,58,56,0.04)' }}>
                              <span><strong>Phase 2:</strong> Rainwater System Installation</span>
                              <span>Month 3–6</span>
                            </li>
                            <li className="flex justify-between border-b pb-1" style={{ borderColor: 'rgba(58,58,56,0.04)' }}>
                              <span><strong>Phase 3:</strong> CSEB Masonry Work</span>
                              <span>Month 7–11</span>
                            </li>
                            <li className="flex justify-between" style={{ borderColor: 'rgba(58,58,56,0.04)' }}>
                              <span><strong>Phase 4:</strong> Solar Integration & Handover</span>
                              <span>Month 12–14</span>
                            </li>
                          </ul>
                        </>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="h-[1px] w-full bg-gradient-to-r from-[#2D4B37]/20 to-transparent mt-5 sm:mt-6" />
              </div>

              {/* Bright Testimonial Panel */}
              <div className="p-5 sm:p-8 rounded-[20px] sm:rounded-3xl border shadow-sm flex-shrink-0 flex flex-col justify-between relative overflow-hidden bg-white" style={{ borderColor: BORDER_COLOR }}>
                <div className="absolute top-4 right-4 text-dark/[0.02] text-7xl pointer-events-none font-serif leading-none">“</div>
                
                <div className="relative z-10">
                  {/* Star Ratings */}
                  <div className="flex items-center gap-1 text-xs text-amber-500 mb-4">
                    {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                  </div>

                  <p className="text-xs sm:text-sm font-light italic leading-relaxed text-dark/85 mb-6">
                    "We entrusted KARRCHOLAI with our home. The team's dedication to quality craftsmanship and attention to detail truly shines through in every corner of our home. Thank you for turning our house into a haven!"
                  </p>
                </div>

                <div className="pt-4 border-t flex items-center justify-between gap-4" style={{ borderColor: 'rgba(58,58,56,0.05)' }}>
                  <div>
                    <h4 className="font-bold text-xs tracking-wide" style={{ color: BRONZE }}>Mrs. Naatrayan Karthiga Devi</h4>
                    <p className="text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-dark/45 mt-0.5" style={{ fontFamily: "'Outfit', sans-serif" }}>Homeowner Client — Coimbatore</p>
                  </div>
                  <div className="flex flex-col items-end flex-shrink-0">
                    <span className="text-[8px] sm:text-[9px] font-black px-2.5 py-1 rounded bg-[#2D4B37]/08 text-[#2D4B37] uppercase tracking-wider" style={{ fontFamily: "'Outfit', sans-serif" }}>Verified Review</span>
                    <span className="text-[8px] text-dark/30 mt-1 uppercase font-bold tracking-widest">12-Mo Evaluation</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ── GEOGRAPHIC FOOTPRINT MAP SECTION ── */}
      <FootprintMapSection />


      {/* ── CALL TO ACTION ── */}
      <section className="relative py-32 overflow-hidden" style={{ background: SAGE }}>
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/dark-matter.png")' }}
        />
        <div className="absolute inset-0"
          style={{ background: `radial-gradient(ellipse at 65% 50%, ${TERRA}25 0%, transparent 65%)` }}
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span className="text-[20vw] font-black opacity-[0.03] select-none whitespace-nowrap text-white">
            BUILD
          </span>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-px w-10 bg-white/40" />
            <span className="text-[11px] font-black tracking-[0.4em] uppercase text-white/80" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Let's Build Together
            </span>
            <div className="h-px w-10 bg-white/40" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl font-black leading-tight text-white mb-6"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            Have a Project<br />
            <span style={{ color: BRASS, fontStyle: 'italic' }}>in Mind?</span>
          </motion.h2>

          <p 
            className="text-xs md:text-base font-light leading-relaxed mb-12 text-white/70 max-w-xl mx-auto"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Let's turn your project into a home built with clarity, structure, and care — from initial planning through to handover.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto btn-primary bg-white text-[#1c1c1a] hover:bg-[#B85C38] hover:text-white text-xs tracking-[0.18em] uppercase flex items-center justify-center gap-2 px-8 py-4 rounded-sm transition-all duration-300 font-bold"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Start Your Project <FiArrowRight />
              </motion.button>
            </Link>
            <Link to="/services">
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto border border-white/25 hover:border-white text-white hover:bg-white/10 text-xs tracking-[0.18em] uppercase flex items-center justify-center px-8 py-4 rounded-sm transition-all duration-300 font-bold bg-transparent"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                View Our Services
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <UnifiedFooter />
    </div>
  )
}


