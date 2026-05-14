import React from 'react'
import { motion } from 'framer-motion'
import { FiBookOpen, FiCompass, FiShield, FiAlertTriangle, FiCheckCircle, FiInfo, FiLayers, FiMaximize } from 'react-icons/fi'
import Navbar from '../components/Navbar'
import UnifiedFooter from '../components/UnifiedFooter'
import ManaiyadiCalculator from '../components/manaiyadi/ManaiyadiCalculator'
import MeasurementTable from '../components/manaiyadi/MeasurementTable'


// Assets
import heroBg from '../assets/manaiyadi_hero.png'
import vastuDetail from '../assets/vastu_detail.png'
import staircase from '../assets/minimalist_luxury_staircase.png'

const Manaiyadi = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
  }

  return (
    <div className="bg-[#fdfbf7] min-h-screen text-dark selection:bg-secondary selection:text-white font-sans overflow-x-hidden">
      <Navbar />

      <main>
        {/* 1. CINEMATIC HERO */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <motion.div 
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute inset-0 z-0"
          >
            <img 
              src={heroBg} 
              alt="Luxury Architecture" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80"></div>
          </motion.div>

          <div className="relative z-10 container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-16"
            >
              <h2 className="text-white font-black tracking-[0.5em] md:tracking-[0.8em] uppercase text-[10px] md:text-xs mb-6 md:mb-8">Architectural Wisdom</h2>
              <h1 className="text-4xl md:text-7xl lg:text-8xl font-black text-white leading-[0.85] tracking-tighter mb-8 md:mb-12 uppercase mix-blend-difference whitespace-normal md:whitespace-nowrap">
                Manaiyadi <br className="md:hidden" /> <span className="text-transparent stroke-text-white italic font-serif">Sastram.</span>
              </h1>
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <div className="w-[1px] h-20 bg-white/20 hidden md:block"></div>
                <p className="text-white font-medium text-sm md:text-lg max-w-xl font-light leading-relaxed tracking-wide drop-shadow-md">
                  The ancient Tamil science of vibrational measurement for modern dwellings.
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
          >
            <span className="text-[9px] font-black text-dark/40 uppercase tracking-[0.4em]">Discover</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-dark/40 to-transparent"></div>
          </motion.div>
        </section>

        {/* 2. BRIEF INTRODUCTION */}
        <section className="py-16 md:py-32 px-6 bg-[#fdfbf7] relative">
          <div className="mx-auto max-w-7xl">
            <motion.div 
              {...fadeInUp}
              className="flex flex-col md:flex-row items-start gap-8 md:gap-24"
            >
              <div className="md:w-1/3">
                <h3 className="text-secondary font-black uppercase tracking-[0.4em] text-[10px] mb-4 md:mb-6 flex items-center gap-4">
                  <span className="w-8 h-[1px] bg-secondary"></span> Introduction
                </h3>
                <h2 className="text-4xl md:text-6xl font-black text-dark leading-tight tracking-tighter">
                  Ancient <br /> <span className="text-primary italic font-serif">Heritage.</span>
                </h2>
              </div>
              <div className="md:w-2/3">
                <p className="text-lg md:text-2xl font-light text-dark/70 leading-relaxed mb-6 md:mb-8">
                  <span className="text-dark font-black">Manaiyadi Sastram (மனையடி சாஸ்திரம்)</span> is a profound Tamil architectural science that governs how building dimensions influence human life. 
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-dark/50 text-xs md:text-sm leading-relaxed">
                  <p>
                    Practiced for over a millennium, it prescribes specific measurements for rooms and wall heights to ensure prosperity, health, and happiness. It is based on the principle that dimensions carry vibrational frequencies that interact with cosmic energy.
                  </p>
                  <p>
                    By selecting favorable measurements, we harmonize the dwelling with the residents' well-being, transforming a simple structure into a sanctuary of positive energy and success.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 3. CORE CONTEXT - WITH IMAGE */}
        <section className="py-24 md:py-48 px-6 bg-white border-y border-dark/5 relative overflow-hidden">
           <div className="absolute top-0 right-0 text-[10rem] md:text-[20rem] font-black text-dark/[0.02] select-none pointer-events-none translate-x-1/4 -translate-y-1/4 uppercase">Wisdom</div>
           <div className="mx-auto max-w-7xl relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                 {/* Left Column: Atmospheric Image & Cards */}
                 <div className="space-y-8 lg:space-y-12">
                    <motion.div 
                      {...fadeInUp}
                      className="relative h-[300px] md:h-[400px] rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-2xl group"
                    >
                      <img src={vastuDetail} alt="Vastu Architecture" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent"></div>
                      <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
                        <p className="text-white font-black uppercase tracking-[0.3em] text-[9px] mb-2 opacity-60">Visual Harmony</p>
                        <p className="text-white text-xl md:text-2xl font-black tracking-tighter uppercase italic font-serif leading-tight">Structural <br/> Divinity.</p>
                      </div>
                    </motion.div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                      <div className="p-8 md:p-10 bg-[#fdfbf7] border border-dark/5 rounded-[2.5rem] md:rounded-[3rem] shadow-xl grain">
                         <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-4">Historical Precision</h4>
                         <p className="text-xs md:text-sm text-dark/60 leading-relaxed italic">
                           Roots in ancient Tamil texts like <span className="font-bold">Manasara</span>. Precision applied to your home.
                         </p>
                      </div>
                      <div className="p-8 md:p-10 bg-dark text-white rounded-[2.5rem] md:rounded-[3rem] shadow-2xl relative overflow-hidden">
                         <div className="absolute -bottom-10 -right-10 opacity-5"><FiCompass size={160}/></div>
                         <h4 className="text-[10px] font-black uppercase tracking-widest text-secondary mb-4">Cultural Excellence</h4>
                         <p className="text-xs md:text-sm text-white/60 leading-relaxed font-light">
                           Traditionally consulted before construction, ensuring sanctuaries of wealth and growth.
                         </p>
                      </div>
                    </div>
                 </div>

                 {/* Right Column: Philosophy Text */}
                 <motion.div {...fadeInUp} className="lg:pl-12">
                    <h3 className="text-secondary font-black uppercase tracking-[0.4em] text-[10px] mb-6 md:mb-8">The Philosophy</h3>
                    <h2 className="text-3xl md:text-7xl font-black text-dark mb-6 md:mb-10 tracking-tighter uppercase leading-none">Vibrational <br/> <span className="text-primary italic font-serif">Synchronicity.</span></h2>
                    <p className="text-dark/40 text-base md:text-lg font-light leading-relaxed mb-6 md:mb-8">
                       Every dimension—width, length, or height—carries a specific vibrational frequency that interacts with cosmic energies. 
                    </p>
                    <div className="w-12 h-px bg-dark/10 mb-8"></div>
                    <p className="text-dark/60 text-sm italic font-serif">
                       "Architecture is the reach for truth, and Manaiyadi Sastram is the mathematical path to it."
                    </p>
                 </motion.div>
              </div>
           </div>
        </section>

        {/* 4. THE CALCULATOR */}
        <section id="calculator" className="py-24 md:py-48 px-4 md:px-6 bg-[#fdfbf7] relative overflow-hidden">
          <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[15rem] md:text-[30rem] font-black text-dark/[0.02] select-none pointer-events-none tracking-tighter">
            CALC
          </div>
          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="text-center mb-16 md:mb-24">
              <motion.div {...fadeInUp}>
                <h3 className="text-secondary font-black tracking-[0.3em] md:tracking-[0.5em] uppercase text-[10px] mb-4 md:mb-6">Precision Tooling</h3>
                <h2 className="text-4xl md:text-8xl font-black text-dark mb-6 md:mb-8 tracking-tighter uppercase">Algorithm <br className="md:hidden" /> <span className="text-primary italic font-serif">Engine.</span></h2>
                <div className="w-12 h-1 bg-primary mx-auto mb-10"></div>
              </motion.div>
            </div>
            <ManaiyadiCalculator />
          </div>
        </section>



        {/* 6. REFERENCE TABLES */}
        <section className="py-24 md:py-48 px-4 md:px-6 bg-[#fdfbf7] border-t border-dark/5">
          <div className="mx-auto max-w-7xl">
            <MeasurementTable />
          </div>
        </section>



        {/* 8. COMMON MISTAKES & PERSPECTIVE */}
        <section className="py-24 md:py-48 px-6 bg-[#fdfbf7]">
           <div className="mx-auto max-w-7xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                 <div className="p-8 md:p-16 bg-secondary/5 border border-secondary/10 rounded-[3rem] md:rounded-[4rem] relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 text-secondary/10"><FiAlertTriangle size={80}/></div>
                    <h3 className="text-secondary font-black uppercase tracking-[0.4em] text-[10px] mb-8 md:mb-10">Pitfalls to Avoid</h3>
                    <h2 className="text-3xl md:text-4xl font-black text-dark mb-8 md:mb-12 tracking-tight uppercase leading-none">Common <br/> <span className="italic font-serif">Mistakes.</span></h2>
                    <ul className="space-y-6 md:space-y-8">
                       {[
                         "Including Wall Thickness in calculations",
                         "Mixing favorable and unfavorable pairs",
                         "Ignoring the importance of ceiling height",
                         "Focusing only on plot size rather than rooms"
                       ].map((item, i) => (
                         <li key={i} className="flex items-start gap-4 md:gap-6 text-[10px] md:text-sm font-bold text-dark/60 uppercase tracking-widest leading-tight">
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1 flex-shrink-0"></span>
                            {item}
                         </li>
                       ))}
                    </ul>
                 </div>
                 <div className="p-8 md:p-16 bg-primary/5 border border-primary/10 rounded-[3rem] md:rounded-[4rem] relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 text-primary/10"><FiCheckCircle size={80}/></div>
                    <h3 className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-8 md:mb-10">Scientific Perspective</h3>
                    <h2 className="text-3xl md:text-4xl font-black text-dark mb-8 md:mb-12 tracking-tight uppercase leading-none">Cultural <br/> <span className="italic font-serif">Confidence.</span></h2>
                    <p className="text-xs md:text-sm text-dark/40 leading-relaxed font-light mb-6 md:mb-8">
                       While rooted in traditional beliefs, Manaiyadi Sastram represents a sophisticated system of architectural planning that has stood the test of time.
                    </p>
                    <p className="text-xs md:text-sm text-dark/40 leading-relaxed font-light">
                       The psychological comfort and cultural confidence that auspicious measurements provide translate into real benefits for mental well-being and family harmony.
                    </p>
                 </div>
              </div>
           </div>
        </section>

        {/* 9. CALL TO ACTION */}
        <section className="py-12 md:py-24 px-4 md:px-6 bg-white">
          <div className="mx-auto max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-dark rounded-[2.5rem] md:rounded-[4rem] px-6 py-16 md:p-20 text-center text-white shadow-2xl relative overflow-hidden grain"
            >
              <div className="absolute inset-0 opacity-[0.07]">
                <img src={heroBg} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl md:text-6xl font-black mb-6 tracking-tighter uppercase leading-[1.1]">
                  Begin Your <br className="sm:hidden" /> <span className="text-secondary italic font-serif">Auspicious</span> <br className="sm:hidden" /> Journey.
                </h2>
                <p className="text-white/40 text-xs md:text-base mb-10 max-w-lg mx-auto font-light leading-relaxed">
                  Our master planners are ready to harmonize your vision with ancient structural integrity.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: '#ffffff', color: '#1a1a1a' }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 md:px-16 py-5 md:py-6 border border-white/20 rounded-full font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-[10px] md:text-xs transition-all duration-500"
                >
                  Book a Consultation
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <UnifiedFooter />

      <style jsx>{`
        .stroke-text-white {
          -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.4);
          color: transparent;
        }
        .stroke-text-dark {
          -webkit-text-stroke: 1.5px rgba(26, 26, 26, 0.2);
          color: transparent;
        }
      `}</style>
    </div>
  )
}

export default Manaiyadi
