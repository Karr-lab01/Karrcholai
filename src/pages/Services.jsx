import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  FiHome, FiCheckCircle, FiShield, FiBriefcase, 
  FiTool, FiSearch, FiArrowRight, FiActivity,
  FiZap, FiAward, FiClock, FiDollarSign, FiUsers
} from 'react-icons/fi'
import Navbar from '../components/Navbar'
import UnifiedFooter from '../components/UnifiedFooter'

// Assets - using relative paths from src/pages/ to assets/
import servicesVideo from '../../assets/Karcholai Construction Quality Showcase.mp4'
import imgRes from '../../assets/Residential_construction.jpg'
import imgPmc from '../../assets/Projectmanagemnt.png'
import imgReno from '../../assets/img3.jpg'
import imgPlan from '../../assets/construction.jpg'
import imgSuper from '../../assets/site.jpg'

import { Helmet } from 'react-helmet-async'

const Services = () => {
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.6
    }
  }, [])

  const mainServices = [
    {
      id: "residential",
      icon: <FiHome />,
      title: 'Residential Construction',
      tagline: 'Building Your Vision',
      desc: 'We specialize in high-quality residential construction, from independent houses to luxury villas. Our team ensures that every project is built with durable materials and superior craftsmanship.',
      image: imgRes,
      features: ['Luxury Villas', 'Independent Houses', 'Structural Integrity', 'Premium Finishing']
    },
    {
      id: "planning",
      icon: <FiActivity />,
      title: 'Planning & Consultant',
      tagline: 'Expert Guidance',
      desc: 'Expert guidance from concept to completion. We manage permits, approvals, timelines and budgets so you can focus on your vision.',
      image: imgPlan,
      features: ['Detailed Costing', 'Material Estimation', 'Project Scheduling', 'Feasibility Studies']
    },
    {
      id: "renovation",
      icon: <FiTool />,
      title: 'Renovation',
      tagline: 'Revitalize Your Space',
      desc: 'Complete home renovation services — structural changes, modern finishes, and Vastu-compliant redesigns that breathe new life into your space.',
      image: imgReno,
      features: ['Room Extensions', 'Interior Remodeling', 'Structural Repairs', 'Modern Upgrades']
    },
    {
      id: "architect",
      icon: <FiBriefcase />,
      title: 'Architect Design',
      tagline: 'Designing with Nature',
      desc: 'Blending traditional Tamil architecture with contemporary design principles to create homes that are both timeless and functional.',
      image: imgPmc,
      features: ['Custom Home Design', 'Traditional Tamil Architecture', 'Modern Aesthetics', 'Vastu Integration']
    },
    {
      id: "landscape",
      icon: <FiSearch />,
      title: 'Landscape',
      tagline: 'Outdoor Excellence',
      desc: 'Thoughtfully designed outdoor spaces that complement your home\'s architecture while thriving in Tamil Nadu\'s climate.',
      image: imgSuper,
      features: ['Garden Planning', 'Native Flora', 'Aesthetic Hardscaping', 'Sustainable Maintenance']
    }
  ]

  const whyChoose = [
    { icon: <FiAward />, title: '12+ Years Experience', desc: 'A decade of excellence in residential construction.' },
    { icon: <FiShield />, title: 'Professional Expertise', desc: 'Managed by project management specialists.' },
    { icon: <FiDollarSign />, title: 'Transparent Pricing', desc: 'Clear planning with no hidden costs.' },
    { icon: <FiCheckCircle />, title: 'Quality Workmanship', desc: 'Uncompromising use of materials and skills.' },
    { icon: <FiClock />, title: 'Reliable Supervision', desc: 'Dedicated site monitoring for peace of mind.' },
    { icon: <FiUsers />, title: 'Client-Focused', desc: 'Building long-term trust with every project.' },
  ]

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
  }

  return (
    <div className="bg-[#fdfbf7] min-h-screen text-dark selection:bg-secondary selection:text-white font-sans overflow-x-hidden">
      <Helmet>
        <title>Our Services | Karrcholai Construction</title>
        <meta name="description" content="Karrcholai provides premium residential construction services in Tamil Nadu, including custom home building, renovation, landscape design, and architectural planning." />
        <link rel="canonical" href="https://karrcholai.com/services" />
      </Helmet>
      <Navbar />

      <main>
        {/* 1. HERO SECTION */}
        <section className="relative h-screen flex items-center justify-center bg-black overflow-hidden">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 z-0"
          >
            <video 
              ref={videoRef}
              autoPlay 
              loop 
              muted 
              playsInline 
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={servicesVideo} type="video/mp4" />
            </video>
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/60"></div>
          
          <div className="relative z-10 container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <h2 className="text-secondary font-black tracking-[0.5em] uppercase text-xs md:text-sm mb-6">Our Expertise</h2>
              <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.95] md:leading-none tracking-tighter mb-8 uppercase">
                Building <br /> <span className="text-transparent stroke-text italic">Excellence.</span>
              </h1>
              <p className="text-white/60 text-base md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
                We provide comprehensive support throughout the entire construction process, making it smooth, transparent, and stress-free.
              </p>
            </motion.div>
          </div>
        </section>

        {/* 2. SERVICES INTRO */}
        <section className="py-24 px-6 bg-[#fdfbf7]">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div {...fadeInUp}>
              <h2 className="text-3xl md:text-5xl font-black text-dark mb-6 md:mb-8 leading-tight">
                Comprehensive solutions <br className="hidden md:block" />
                for every <span className="text-primary">milestone.</span>
              </h2>
              <div className="w-20 h-1 bg-secondary mx-auto mb-12"></div>
            </motion.div>
          </div>
        </section>

        {/* 3. DETAILED SERVICES GRID */}
        <section className="pb-24 px-6 bg-[#fdfbf7]">
          <div className="container mx-auto max-w-7xl">
            <div className="space-y-32 md:space-y-48">
              {mainServices.map((service, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className={`flex flex-col-reverse ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-24 items-center`}
                >
                  <div className="w-full md:w-1/2">
                    <div className="text-6xl md:text-9xl text-primary/5 mb-[-30px] md:mb-[-60px] font-black italic select-none">0{idx + 1}</div>
                    <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                      <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                        {React.cloneElement(service.icon, { size: 18 })}
                      </div>
                      <span className="text-secondary font-black text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] uppercase">{service.tagline}</span>
                    </div>
                    <h3 className="text-3xl md:text-5xl font-black text-dark mb-6 md:mb-8 leading-tight">{service.title}</h3>
                    <p className="text-dark/60 text-base md:text-lg font-light leading-relaxed mb-8 md:mb-10 max-w-xl">
                      {service.desc}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                      {service.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                          <span className="text-[9px] font-black text-dark/40 tracking-[0.15em] md:tracking-[0.2em] uppercase">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="w-full md:w-1/2">
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.6 }}
                      className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-dark/5"
                    >
                      <img 
                        src={service.image} 
                        alt={service.title} 
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-dark/10"></div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. WHY CHOOSE US - REDESIGNED STYLE */}
        <section className="py-24 md:py-48 bg-white relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none select-none">
            <span className="text-[20rem] md:text-[40rem] font-black uppercase tracking-tighter leading-none">VALUES</span>
          </div>

          <div className="container mx-auto px-6 max-w-7xl relative z-10">
            <div className="text-center mb-20 md:mb-32">
              <motion.div {...fadeInUp}>
                <h2 className="text-secondary font-black tracking-[0.6em] uppercase text-[10px] md:text-xs mb-6">Our Commitment</h2>
                <h3 className="text-4xl md:text-7xl font-black text-dark leading-[1.1] md:leading-none tracking-tighter mb-8">
                  Why Choose <br /> <span className="text-primary italic">Karrcholai.</span>
                </h3>
                <p className="text-dark/40 text-base md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
                  We are committed to delivering high-quality construction while building long-term trust with our clients through excellence and transparency.
                </p>
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {whyChoose.map((item, i) => (
                <motion.article
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group flex flex-col p-6 md:p-10 bg-[#fdfbf7] rounded-[24px] md:rounded-[40px] border border-dark/5 hover:bg-primary transition-all duration-500 shadow-sm hover:shadow-2xl relative overflow-hidden"
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white flex items-center justify-center text-secondary mb-8 md:mb-10 shadow-sm group-hover:scale-110 transition-transform duration-500">
                    {React.cloneElement(item.icon, { size: 24 })}
                  </div>
                  
                  <div className="flex flex-col flex-grow">
                    <h4 className="text-xl md:text-2xl font-black text-primary group-hover:text-white transition-colors leading-tight mb-4 md:mb-6 tracking-tight">
                      {item.title}
                    </h4>
                    <div className="w-10 h-1 bg-secondary mb-6 md:mb-8 group-hover:bg-white/30 transition-all duration-500" />
                    <p className="text-dark/40 group-hover:text-white/80 text-sm md:text-base font-light leading-relaxed transition-colors">
                      {item.desc}
                    </p>
                  </div>
                  
                  {/* Subtle decorative background icon for blog-like feel */}
                  <div className="absolute -bottom-4 -right-4 text-primary/5 group-hover:text-white/5 transition-colors duration-500 transform -rotate-12">
                    {React.cloneElement(item.icon, { size: 120 })}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* 5. CALL TO ACTION */}
        <section className="py-24 md:py-40 bg-white">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h3 className="text-3xl md:text-7xl font-black text-dark mb-8 md:mb-10 tracking-tighter leading-[1.1] md:leading-none">
                Ready to make your <br /> <span className="text-primary">vision a reality?</span>
              </h3>
              <p className="text-dark/40 text-base md:text-xl font-light mb-10 md:mb-12 italic leading-relaxed">
                Our team is ready to make your construction process smooth, transparent, and stress-free.
              </p>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-secondary text-white px-10 md:px-12 py-4 md:py-5 text-[10px] md:text-sm font-black uppercase tracking-[0.3em] rounded-sm shadow-2xl hover:bg-dark transition-all duration-300"
              >
                Request a Consultation
              </motion.button>
            </motion.div>
          </div>
        </section>
      </main>

      <UnifiedFooter />

    </div>
  )
}

export default Services
