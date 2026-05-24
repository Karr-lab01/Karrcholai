import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { 
  FiHome, FiBriefcase, FiRefreshCw, FiEdit3, 
  FiCheckCircle, FiTool, FiLayout, FiDollarSign, 
  FiUserCheck, FiSearch, FiArrowRight 
} from 'react-icons/fi';
import Navbar from '../components/Navbar';
import UnifiedFooter from '../components/UnifiedFooter';

// Asset placeholders (using existing images from the project if possible)
import karVideo from '../../assets/kar1.mp4';
import kar2 from '../../assets/kar2.avif';
import img1 from '../../assets/img1.jpg'; // Used in Services
import { Helmet } from 'react-helmet-async';

const Karr = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    whileInView: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    },
    viewport: { once: true }
  };

  const floatingAnim = {
    animate: {
      y: [0, -8, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const residentialServices = [
    { title: "Turnkey Home Construction", icon: FiHome },
    { title: "Structural Construction Work", icon: FiLayout },
    { title: "Finishing Works", icon: FiEdit3 },
    { title: "Renovation & House Extensions", icon: FiRefreshCw },
    { title: "Site Execution & Supervision", icon: FiUserCheck },
    { title: "Quality Control & Inspection", icon: FiCheckCircle }
  ];

  const pmcServices = [
    { title: "Project Planning & Scheduling", icon: FiLayout },
    { title: "Construction Cost Estimation", icon: FiDollarSign },
    { title: "Contractor Coordination", icon: FiUserCheck },
    { title: "Material Planning & Procurement", icon: FiBriefcase },
    { title: "Site Supervision & Inspection", icon: FiSearch },
    { title: "Quality Control", icon: FiCheckCircle },
    { title: "Progress Monitoring & Reporting", icon: FiEdit3 }
  ];

  return (
    <div ref={containerRef} className="bg-[#fdfbf7] min-h-screen text-[#1a1a1a] selection:bg-[#B85C38] selection:text-white overflow-x-hidden font-sans">
      <Helmet>
        <title>Karr | Residential Construction & Project Management</title>
        <meta name="description" content="Karr is the construction division of Karrcholai — residential building, renovation, project management, and cost estimation across Tamil Nadu." />
        <link rel="canonical" href="https://karrcholai.com/karr" />
      </Helmet>
      <Navbar />

      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-[#B85C38] z-[100] origin-left"
        style={{ scaleX }}
      />

      <main>
        {/* ── HERO SECTION ── */}
        <section className="relative w-full h-[75vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-[#1a1a1a]">
          <motion.div 
            style={{ y: heroY, opacity: heroOpacity }}
            className="absolute inset-0 z-0"
          >
            <video 
              autoPlay 
              muted 
              loop 
              playsInline
              className="w-full h-full object-cover opacity-50"
            >
              <source src={karVideo} type="video/mp4" />
            </video>
            {/* Sophisticated multi-layered overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/60 via-transparent to-[#1a1a1a]/80" />
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(135deg, rgba(45,75,55,0.15) 0%, transparent 60%, rgba(184,92,56,0.1) 100%)'
            }} />
          </motion.div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            >
              <span className="text-[#B85C38] font-bold tracking-[0.6em] uppercase text-xs md:text-sm mb-6 block">
                Division of Karrcholai
              </span>
              <h1 className="text-5xl md:text-8xl font-bold text-white leading-none tracking-tighter mb-8">
                Karr<br />
                <span className="text-white/30 italic">Construction.</span>
              </h1>
              <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
                The Karr division delivers residential construction and project management services — built on structural integrity, transparent planning, and disciplined site execution across Tamil Nadu.
              </p>
            </motion.div>
          </div>
          
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 hidden md:block">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-[1px] h-12 bg-gradient-to-b from-[#B85C38] to-transparent"
            />
          </div>
        </section>

        {/* ── SECTION 1: RESIDENTIAL CONSTRUCTION ── */}
        <section className="py-16 md:py-24 px-6 bg-[#fdfbf7]">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 md:mb-16 flex flex-col md:flex-row justify-between items-end gap-8">
              <motion.div {...fadeInUp} className="max-w-xl">
                <span className="text-[#B85C38] font-bold tracking-[0.6em] uppercase text-xs md:text-sm mb-4 block">Residential Construction</span>
                <h2 className="text-4xl md:text-6xl font-bold leading-none tracking-tight">
                  Building Strong <br />
                  <span className="text-[#1a1a1a]/20 italic">Residential Homes.</span>
                </h2>
              </motion.div>
              <motion.p 
                {...fadeInUp}
                transition={{ delay: 0.2 }}
                className="text-[#1a1a1a]/50 text-base max-w-xs font-light border-l border-[#B85C38]/30 pl-8"
              >
                We handle complete construction for independent houses and villas — from foundation to finishing. Every project is managed with verified structural work, quality materials, and consistent on-site supervision.
              </motion.p>
            </div>

            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {residentialServices.map((service, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="group p-6 md:p-10 bg-white rounded-[24px] md:rounded-[32px] border border-[#1a1a1a]/5 hover:border-[#B85C38]/40 transition-all duration-500 shadow-sm hover:shadow-xl hover:-translate-y-2"
                >
                  <motion.div 
                    variants={floatingAnim}
                    animate="animate"
                    className="w-14 h-14 rounded-full bg-[#fdfbf7] flex items-center justify-center text-[#1a1a1a]/30 mb-8 group-hover:bg-[#B85C38] group-hover:text-white transition-all duration-500"
                  >
                    <service.icon size={24} />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-4 text-[#2D4B37] group-hover:text-[#B85C38] transition-colors">{service.title}</h3>
                  <div className="flex items-center gap-2 text-[9px] font-black tracking-widest uppercase text-[#1a1a1a]/20 group-hover:text-[#1a1a1a] transition-all">
                    View Details <FiArrowRight className="text-[#B85C38] group-hover:translate-x-2 transition-transform" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 2: PMC ── */}
        <section className="py-16 md:py-24 px-6 bg-[#1a1a1a] text-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <motion.div {...fadeInUp}>
                <span className="text-[#B85C38] font-bold tracking-[0.6em] uppercase text-xs md:text-sm mb-4 block">Project Management Consultancy (PMC)</span>
                <h2 className="text-4xl md:text-7xl font-bold leading-none tracking-tight mb-8">
                  Professional Project <br />
                  <span className="text-white/30 italic">Management.</span>
                </h2>
                <p className="text-white/40 text-lg font-light leading-relaxed mb-12 max-w-lg">
                  Our Project Management Consultancy (PMC) provides expert oversight for homeowners who need structured planning, cost control, and quality supervision — without managing the build day to day themselves.
                </p>
                
                <div className="space-y-6">
                  {[
                    "Structured timelines and progress tracking",
                    "Transparent cost monitoring",
                    "Rigorous quality supervision"
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-4 text-white/80 group">
                      <div className="w-2 h-2 rounded-full bg-[#B85C38] group-hover:scale-150 transition-transform" />
                      <span className="text-base font-bold tracking-wide">{text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                variants={staggerContainer}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {pmcServices.map((service, i) => (
                  <motion.div
                    key={i}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                    className="p-6 md:p-8 bg-white/5 backdrop-blur-sm rounded-[20px] md:rounded-[24px] border border-white/10 flex flex-col items-start gap-4 transition-all duration-300"
                  >
                    <motion.div
                      variants={floatingAnim}
                      animate="animate"
                    >
                      <service.icon size={20} className="text-[#B85C38]" />
                    </motion.div>
                    <span className="text-xs font-bold tracking-wider uppercase leading-snug">{service.title}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── SECTION 3: RENOVATION ── */}
        <section className="py-16 md:py-24 px-6 bg-[#fdfbf7] relative overflow-hidden">
          {/* Decorative Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none paper-texture" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
              <motion.div {...fadeInUp} className="w-full lg:w-1/2">
                <div className="relative rounded-[40px] overflow-hidden aspect-[4/3] shadow-2xl">
                  <motion.img 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                    src={kar2} 
                    alt="Renovation" 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/40 to-transparent" />
                </div>
              </motion.div>
              
              <motion.div {...fadeInUp} transition={{ delay: 0.3 }} className="w-full lg:w-1/2">
                <span className="text-[#B85C38] font-bold tracking-[0.6em] uppercase text-xs md:text-sm mb-4 block">Renovation & Remodelling</span>
                <h2 className="text-4xl md:text-6xl font-bold leading-none tracking-tight mb-8">
                  Renovation & <br />
                  <span className="text-[#1a1a1a]/20 italic">Remodelling Services.</span>
                </h2>
                <p className="text-[#1a1a1a]/50 text-lg font-light leading-relaxed mb-12">
                  We upgrade and extend existing homes — improving layout, repairing structure, and updating interiors while maintaining the integrity of the building.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {[
                    { title: "House Renovation", icon: FiHome },
                    { title: "Structural Repair", icon: FiTool },
                    { title: "Interior Works", icon: FiLayout },
                    { title: "House Extensions", icon: FiRefreshCw }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="mt-1 text-[#B85C38]"><item.icon size={18} /></div>
                      <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-[#2D4B37]">{item.title}</h4>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="mt-16 px-10 py-5 bg-[#1a1a1a] text-white text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-[#B85C38] transition-all duration-500 rounded-full w-full sm:w-auto">
                  Start Your Project
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── SECTION 4: ESTIMATION ── */}
        <section className="py-16 md:py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <motion.div {...fadeInUp}>
                <span className="text-[#B85C38] font-bold tracking-[0.6em] uppercase text-xs md:text-sm mb-4 block text-center">Planning & Estimation</span>
                <h2 className="text-4xl md:text-7xl font-bold leading-none tracking-tighter">
                  Planning & <br />
                  <span className="text-[#1a1a1a]/20 italic text-center">Budget Clarity.</span>
                </h2>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div 
                {...fadeInUp}
                className="p-8 md:p-12 bg-[#fdfbf7] rounded-[30px] md:rounded-[40px] border border-[#1a1a1a]/5 relative group"
              >
                <div className="absolute top-10 right-10 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity">
                  <FiDollarSign size={120} />
                </div>
                <h3 className="text-2xl font-bold mb-6">Construction Cost Estimation</h3>
                <p className="text-[#1a1a1a]/50 font-light leading-relaxed mb-10 max-w-sm">
                  Accurate estimation is the foundation of every successful build. We prepare detailed cost breakdowns so you can plan your investment with confidence before construction begins.
                </p>
                <ul className="space-y-6">
                  {[
                    "Itemised construction cost estimation",
                    "Project planning and scheduling",
                    "Material quantity assessment",
                    "Budget planning and cost control"
                  ].map((text, i) => (
                    <li key={i} className="flex items-center gap-4 text-sm font-bold text-[#2D4B37]">
                      <FiCheckCircle className="text-[#B85C38]" />
                      {text}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div 
                {...fadeInUp}
                transition={{ delay: 0.2 }}
                className="flex flex-col justify-center p-8 md:p-12 bg-[#2D4B37] text-white rounded-[30px] md:rounded-[40px] shadow-2xl relative overflow-hidden"
              >
                <div className="absolute inset-0 stone-texture opacity-10" />
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold mb-6 leading-tight">Ready to begin <br /> your project?</h3>
                  <p className="text-white/60 font-light mb-12">
                    Schedule a consultation and site visit. We will review your requirements and provide an initial scope and cost estimate.
                  </p>
                  <button className="w-full py-5 bg-white text-[#1a1a1a] text-[10px] font-bold tracking-[0.4em] uppercase hover:bg-[#B85C38] hover:text-white transition-all duration-500 rounded-full">
                    Book Consultation
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <UnifiedFooter />
    </div>
  );
};

export default Karr;
