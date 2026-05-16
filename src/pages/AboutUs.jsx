import React, { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import Navbar from '../components/Navbar'
import UnifiedFooter from '../components/UnifiedFooter'
import { FaHardHat, FaClock, FaDollarSign, FaShieldAlt, FaQuoteLeft, FaPlay, FaProjectDiagram, FaHandHoldingUsd } from 'react-icons/fa'

// Images from the root assets folder
import founderImg from '../../assets/Founder.jpeg'
import aboutBg from '../../assets/pic7.png' 
import testimonialVid from '../../assets/VID.mp4'
import constructionVid from '../../assets/Karcholai Construction.mp4'
import courtyardImg from '../../assets/img1.jpg'

import { Helmet } from 'react-helmet-async'

const AboutUs = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const y1 = useTransform(scrollYProgress, [0, 0.5], [0, 300])
  const y2 = useTransform(scrollYProgress, [0, 0.5], [0, -150])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2])

  const expertise = [
    { 
      icon: <FaHardHat />, 
      title: "Plan Effectively", 
      desc: "Meticulous project planning ensuring every detail is accounted for before the first stone is laid." 
    },
    { 
      icon: <FaDollarSign />, 
      title: "Control Costs", 
      desc: "Professional cost management to prevent budget overruns and ensure maximum value." 
    },
    { 
      icon: <FaShieldAlt />, 
      title: "Quality Control", 
      desc: "Rigorous quality checks at every stage to maintain the highest standards of excellence." 
    },
    { 
      icon: <FaClock />, 
      title: "On-Time Delivery", 
      desc: "Disciplined management to ensure your dream home is ready exactly when promised." 
    }
  ]

  const brandVideoRef = useRef(null)
  const isVideoInView = useInView(brandVideoRef, { amount: 0.3 })

  useEffect(() => {
    if (brandVideoRef.current) {
      if (isVideoInView) {
        brandVideoRef.current.play().catch(e => {
          console.log("Autoplay check:", e)
        })
      } else {
        brandVideoRef.current.pause()
      }
    }
  }, [isVideoInView])

  return (
    <div ref={containerRef} className="bg-cream min-h-screen text-dark selection:bg-secondary selection:text-white overflow-x-hidden">
      <Helmet>
        <title>About Us | Karrcholai Construction</title>
        <meta name="description" content="Learn about Karrcholai Construction, a premier residential builder in Tamil Nadu. Led by Saravanakumar B., we focus on strength, sustainability, and peaceful living." />
        <link rel="canonical" href="https://karrcholai.com/about" />
      </Helmet>
      <Navbar />

      <main>
        {/* --- 1. MODERN HERO SECTION --- */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
          <motion.div 
            style={{ y: y1, scale, opacity }}
            className="absolute inset-0 z-0"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${aboutBg})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
          </motion.div>

          <div className="relative z-10 text-center px-4 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <h2 className="text-secondary font-bold tracking-[0.4em] md:tracking-[0.6em] uppercase text-[10px] md:text-sm mb-4 md:mb-6 block">Building Excellence</h2>
              <h1 className="text-5xl md:text-9xl font-black text-white uppercase tracking-tighter leading-tight md:leading-none mb-6 md:mb-8">
                ABOUT <span className="text-transparent stroke-text italic inline-block ml-2">US</span>
              </h1>
              <div className="flex items-center justify-center gap-3 md:gap-4 mb-8">
                <div className="h-[1px] w-8 md:w-12 bg-secondary/50" />
                <p className="text-white/60 text-[10px] md:text-lg font-light tracking-[0.2em] md:tracking-[0.3em] uppercase max-w-[200px] md:max-w-none mx-auto">
                  A Legacy of Strength & Sustainability
                </p>
                <div className="h-[1px] w-8 md:w-12 bg-secondary/50" />
              </div>
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <motion.div 
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
          >
            <span className="text-white/30 text-[10px] uppercase tracking-[0.4em] rotate-90 mb-8">Scroll</span>
            <div className="w-[1px] h-20 bg-gradient-to-b from-secondary to-transparent" />
          </motion.div>
        </section>

        {/* --- 2. THE STORY / FOUNDER --- */}
        <section className="py-20 md:py-32 px-6 bg-[#fcfbfa] paper-texture">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-start">
              {/* Sleek Image Reveal */}
              <div className="w-full md:w-4/12 relative">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="aspect-[4/5] overflow-hidden relative group rounded-[1.5rem] shadow-xl mb-6"
                >
                  <motion.img 
                    initial={{ scale: 1.1 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    src={founderImg} 
                    alt="Founder" 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/5 transition-opacity duration-700 group-hover:bg-black/10" />
                </motion.div>
                
                {/* Founder Details Below Image */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-left"
                >
                  <h3 className="text-2xl md:text-[28px] font-semibold text-[#4a3b32] tracking-tight mb-3">Saravanakumar B.</h3>
                  <p className="text-[15px] text-[#4a3b32]/80 font-medium leading-relaxed">
                    BE Civil Engineer | Founder - Karrcholai Construction
                  </p>
                </motion.div>
              </div>

              {/* Compact Typography */}
              <div className="w-full md:w-8/12 md:pl-6 md:pt-4">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <h2 className="text-3xl md:text-[42px] font-semibold text-[#4a3b32] mb-10 tracking-tight">
                    Meet the Founder
                  </h2>
                  <div className="space-y-7 text-[15px] md:text-[17px] text-[#4a3b32]/80 font-medium leading-[1.8]">
                    <p>
                      Hello, I'm <strong className="text-[#4a3b32] font-bold">Saravanakumar B.</strong>, a BE Civil Engineer and the founder of <strong className="text-[#4a3b32] font-bold">Karrcholai Construction.</strong> With more than 12 years of experience in residential construction, my journey has been build through practical site knowledge, disciplined execution, and a strong belief in honest building practices.
                    </p>
                    <p>
                      For me, construction is not only about creating structures — it is about creating spaces for life. A home must be strong in its foundation, clear in planning, practical in execution, and peaceful for the people who live in it. This belief became the reason for starting <span className="text-[#C9754A]">Karrcholai Construction.</span>
                    </p>
                    <p>
                      The name Karrcholai comes from two ideas — <strong className="text-[#4a3b32] font-bold">Karr</strong>, meaning stone, and <strong className="text-[#4a3b32] font-bold">Cholai</strong>, meaning oasis. Together, they represent my vision: <strong className="text-[#4a3b32] font-bold">strong construction with peaceful living.</strong> Through my work, I aim to combine engineering knowledge, traditional values, and systematic project management to create homes that are durable, functional.
                    </p>
                    <p>
                      My focus is on custom residential construction, project management consultancy, and responsible building practices that give long-term value to the client.
                    </p>
                    <div className="pt-4 space-y-1">
                      <p className="text-[#4a3b32]/80">With regards,</p>
                      <p className="font-bold text-[#4a3b32] text-lg">Saravanakumar B.</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* --- 2.2 MY THOUGHT ON CONSTRUCTION --- */}
        <section className="py-20 md:py-32 px-6 bg-[#fcfbfa] paper-texture">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col-reverse md:flex-row gap-12 md:gap-20 items-center">
              
              {/* Compact Typography */}
              <div className="w-full md:w-6/12 md:pr-6 md:py-4">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <h2 className="text-3xl md:text-[42px] font-semibold text-[#4a3b32] mb-10 tracking-tight">
                    My Thought on Construction
                  </h2>
                  <div className="space-y-7 text-[15px] md:text-[17px] text-[#4a3b32]/80 font-medium leading-[1.8]">
                    <p>
                      Construction is not just about building a structure.<br className="hidden md:block" />
                      It is about creating a space where life happens.
                    </p>
                    <p>
                      A good house should not depend only on design.<br className="hidden md:block" />
                      It must have a strong foundation, proper planning,<br className="hidden md:block" />
                      correct materials, and disciplined execution.
                    </p>
                    <p>
                      Through my experience in residential construction, I have learned<br className="hidden md:block" />
                      that most problems come from poor planning and lack of supervision.<br className="hidden md:block" />
                      Because of that, I always follow a systematic approach in every project.
                    </p>
                    <p>
                      I believe in practical buildings rather than decorative buildings.<br className="hidden md:block" />
                      A home should be strong, functional, comfortable,<br className="hidden md:block" />
                      and peaceful for the people who live in it.
                    </p>
                    <p>
                      My goal in every project is simple —<br className="hidden md:block" />
                      to build with responsibility, clarity, and long-term thinking.
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Sleek Image Reveal */}
              <div className="w-full md:w-6/12 relative">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="aspect-[4/5] md:aspect-square overflow-hidden relative group rounded-[1.5rem] border border-[#4a3b32]/10 shadow-xl mb-8 md:mb-0"
                >
                  <motion.img 
                    initial={{ scale: 1.1 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    src={courtyardImg} 
                    alt="Courtyard Construction" 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/5 transition-opacity duration-700 group-hover:bg-black/10" />
                </motion.div>
              </div>

            </div>
          </div>
        </section>
        
        {/* --- 2.5 SLEEK IMMERSIVE VIDEO --- */}
        <section className="py-16 md:py-32 bg-white overflow-hidden border-t border-dark/5">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            
            {/* Professional Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 md:w-10 h-[1px] bg-secondary" />
                  <span className="text-secondary font-bold text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] uppercase">Cinematic Showcase</span>
                </div>
                <h3 className="text-2xl md:text-4xl font-light text-dark tracking-tighter leading-tight">
                  Crafting <span className="font-medium">Excellence</span> <br /> 
                  <span className="text-dark/20 italic">In every detail.</span>
                </h3>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-xs text-left md:text-right"
              >
                <p className="text-dark/40 text-[9px] md:text-[10px] leading-relaxed uppercase tracking-widest font-medium">
                  A visual journey through our construction process, highlighting structural integrity and architectural precision.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-video md:aspect-[21/9] rounded-lg md:rounded-2xl overflow-hidden shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] bg-black group"
            >
              <video
                ref={brandVideoRef}
                src={constructionVid}
                className="w-full h-full object-cover"
                autoPlay
                loop
                playsInline
              />
              
              {/* Sleek Minimalist Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Bottom Label */}
              <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8">
                <p className="text-white/60 text-[8px] md:text-[9px] uppercase tracking-[0.3em] md:tracking-[0.4em] font-medium mb-1">Legacy Division</p>
                <div className="flex items-center gap-3 md:gap-4">
                  <h4 className="text-white text-xs md:text-base font-light tracking-wide">Karrcholai Showcase 2024</h4>
                  <div className="w-[1px] h-3 md:h-4 bg-white/20" />
                  <span className="text-white/30 text-[8px] md:text-[9px] font-bold">4K HDR</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- 3. STATS STRIP --- */}
        <section className="py-12 md:py-16 bg-dark text-white border-y border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
          <div className="container mx-auto px-6 max-w-6xl relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-8 divide-x-0 md:divide-x divide-white/10">
              {[
                { number: "12+", label: "Years Experience" },
                { number: "150+", label: "Projects Completed" },
                { number: "100%", label: "Client Satisfaction" },
                { number: "24/7", label: "Project Support" }
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="text-center md:text-left pl-0 md:pl-10 first:pl-0 flex flex-col items-center md:items-start"
                >
                  <div className="text-3xl md:text-5xl font-light text-secondary mb-2 md:mb-3 tracking-tighter">{stat.number}</div>
                  <div className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-white/50 font-semibold">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- 4. CORE PHILOSOPHY (SLEEK GRID) --- */}
        <section className="py-24 md:py-32 px-6 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div>
                <p className="text-secondary text-xs font-bold uppercase tracking-[0.3em] mb-4 flex items-center gap-4">
                  <span className="w-6 h-[1px] bg-secondary" />
                  How We Operate
                </p>
                <h3 className="text-3xl md:text-5xl font-light text-dark tracking-tight">
                  Our Core <span className="font-medium">Philosophy</span>
                </h3>
              </div>
              <p className="text-dark/40 text-xs uppercase tracking-widest font-semibold">Excellence by design</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { icon: <FaHardHat size={24} />, title: "Meticulous Planning", desc: "Every successful build starts long before the foundation is poured. We focus heavily on pre-construction analysis and precise blueprint execution." },
                { icon: <FaShieldAlt size={24} />, title: "Uncompromising Quality", desc: "We implement rigorous, multi-stage quality control checks throughout the lifecycle of the project to ensure structural and aesthetic perfection." },
                { icon: <FaDollarSign size={24} />, title: "Transparent Value", desc: "Cost control is paramount. We provide clear, detailed financial oversight to prevent budget overruns without sacrificing the integrity of the build." }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="group relative p-8 border border-dark/5 hover:border-secondary/30 transition-colors duration-500 bg-[#fafafa] hover:bg-white"
                >
                  <div className="text-secondary mb-8 transition-transform duration-500 group-hover:-translate-y-2">
                    {item.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-dark mb-4 tracking-wide">{item.title}</h4>
                  <p className="text-sm text-dark/60 leading-relaxed font-light">
                    {item.desc}
                  </p>
                  
                  {/* Subtle hover line */}
                  <div className="absolute bottom-0 left-0 h-[2px] bg-secondary w-0 group-hover:w-full transition-all duration-700 ease-out" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- 4.5 COMPACT EXPERTISE IMPACT --- */}
        <section className="py-20 md:py-28 px-6 bg-[#0a0a0a] text-white relative overflow-hidden">
          {/* Subtle Background Accent */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
            <motion.div 
              animate={{ opacity: [0.05, 0.1, 0.05] }}
              transition={{ duration: 10, repeat: Infinity }}
              className="absolute -top-1/4 -right-1/4 w-[60vw] h-[60vw] bg-secondary/10 rounded-full blur-[120px] pointer-events-none"
            />
          </div>

          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Side: Compact Statement */}
              <div className="lg:col-span-5">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-[1px] bg-secondary" />
                    <span className="text-secondary text-[9px] font-black uppercase tracking-[0.4em]">The Advantage</span>
                  </div>
                  
                  <h3 className="text-4xl md:text-5xl font-light leading-[1.1] mb-8 tracking-tighter">
                    Expertise that <br/>
                    <span className="font-bold italic text-white">empowers</span> <br/>
                    <span className="text-secondary italic">your vision.</span>
                  </h3>
                  
                  <div className="p-6 bg-white/[0.02] border-l border-secondary/40 backdrop-blur-md rounded-r-xl">
                    <p className="text-sm md:text-base text-white/50 font-light leading-relaxed">
                      We fuse technical mastery with disciplined oversight to transform blueprints into architectural reality.
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Right Side: Compact Grid */}
              <div className="lg:col-span-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                  {[
                    { title: "Plan Effectively", icon: <FaProjectDiagram />, delay: 0 },
                    { title: "Control Costs", icon: <FaHandHoldingUsd />, delay: 0.1 },
                    { title: "Maintain Quality", icon: <FaShieldAlt />, delay: 0.2 },
                    { title: "Complete On Time", icon: <FaClock />, delay: 0.3 }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: item.delay, duration: 0.6 }}
                      className="group relative p-6 bg-white/[0.03] border border-white/5 rounded-2xl hover:bg-white/[0.07] hover:border-secondary/20 transition-all duration-300"
                    >
                      <div className="flex items-center gap-5">
                        <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-300 text-xl">
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="text-base font-semibold text-white tracking-tight group-hover:text-secondary transition-colors duration-300">
                            {item.title}
                          </h4>
                          <div className="h-[1px] w-0 group-hover:w-full bg-secondary/30 transition-all duration-500 mt-1" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Additional context line */}
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 text-[9px] uppercase tracking-[0.5em] text-white/20 text-center lg:text-left"
                >
                  Disciplined Execution • 12+ Years Experience
                </motion.p>
              </div>
              
            </div>
          </div>
        </section>

        {/* --- 5. THE PROCESS (VERTICAL TIMELINE) --- */}
        <section className="py-24 md:py-32 px-6 bg-[#fafafa] overflow-hidden">
          <div className="container mx-auto max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-24"
            >
              <p className="text-secondary text-xs font-bold uppercase tracking-[0.3em] mb-4 justify-center flex items-center gap-4">
                <span className="w-8 h-[1px] bg-secondary" />
                Our Methodology
                <span className="w-8 h-[1px] bg-secondary" />
              </p>
              <h3 className="text-3xl md:text-5xl font-light text-dark tracking-tight">
                The Journey to <span className="font-medium">Completion</span>
              </h3>
            </motion.div>

            <div className="relative">
              {/* Center Line Track */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-dark/5 -translate-x-1/2" />
              
              {/* Animated Center Line Fill */}
              <motion.div 
                initial={{ height: 0 }}
                whileInView={{ height: '100%' }}
                transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, margin: "-20%" }}
                className="absolute left-8 md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-secondary to-primary -translate-x-1/2 origin-top"
              />

              {[
                { step: "01", title: "Consultation & Scope", desc: "Understanding your vision, lifestyle needs, and project constraints to build a solid foundation of expectations." },
                { step: "02", title: "Design & Engineering", desc: "Collaborating with top-tier architects to finalize structurally sound, aesthetically brilliant blueprints." },
                { step: "03", title: "Site Preparation", desc: "Meticulous clearing, excavating, and laying the groundwork with precise geographical measurements." },
                { step: "04", title: "Construction Phase", desc: "Executing the build with strict adherence to timelines, safety protocols, and unyielding quality standards." },
                { step: "05", title: "Final Handover", desc: "A comprehensive walk-through and inspection ensuring every single detail exceeds your expectations." }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50, y: 30 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.8, delay: 0.1, type: "spring", bounce: 0.4 }}
                  className={`relative flex items-center justify-between mb-24 last:mb-0 group ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="hidden md:block w-5/12" />
                  
                  {/* Animated Node */}
                  <div className="absolute left-8 md:left-1/2 w-12 h-12 bg-[#fafafa] border-4 border-white rounded-full flex items-center justify-center -translate-x-1/2 z-10 shadow-xl group-hover:scale-125 transition-transform duration-500">
                    <div className="w-full h-full rounded-full border-2 border-secondary/30 flex items-center justify-center group-hover:border-secondary transition-colors duration-500">
                      <motion.div 
                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="w-3 h-3 bg-secondary rounded-full" 
                      />
                    </div>
                  </div>

                  <div className="w-full pl-24 md:pl-0 md:w-5/12">
                    {/* Sleek Premium Card */}
                    <motion.div 
                      whileHover={{ y: -10 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="relative p-8 md:p-10 bg-white border border-dark/5 rounded-[2rem] shadow-sm hover:shadow-2xl transition-shadow duration-500 overflow-hidden text-left"
                    >
                      {/* Decorative Background Blob */}
                      <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                      
                      <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-6">
                          <span className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-dark/10 to-dark/5 group-hover:from-secondary/30 group-hover:to-primary/30 transition-all duration-500">
                            {item.step}
                          </span>
                          <h4 className="text-xl md:text-2xl font-semibold text-dark tracking-wide">{item.title}</h4>
                        </div>
                        <p className="text-sm md:text-base text-dark/60 font-light leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                      
                      {/* Hover Line Overlay */}
                      <div className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-secondary to-primary w-0 group-hover:w-full transition-all duration-700 ease-in-out" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- 5.5 VIDEO TESTIMONIALS (GRID) --- */}
        <section className="py-24 md:py-32 px-6 bg-[#fdfdfd] overflow-hidden">
          <div className="container mx-auto max-w-6xl">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <p className="text-secondary text-xs font-bold uppercase tracking-[0.3em] mb-4 justify-center flex items-center gap-4">
                <span className="w-6 h-[1px] bg-secondary" />
                Client Stories
                <span className="w-6 h-[1px] bg-secondary" />
              </p>
              <h3 className="text-3xl md:text-5xl font-light text-dark tracking-tight">
                Don't just take our word for it. <br/>
                <span className="font-medium italic text-secondary">Hear from our homeowners.</span>
              </h3>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {[
                { name: "The Sharma Family", project: "Custom Luxury Villa", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", delay: 0 },
                { name: "Mr. & Mrs. Patel", project: "Modern Minimalist Home", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", delay: 0.2 },
                { name: "Arora Residence", project: "Architectural Renovation", img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", delay: 0.4 },
                { name: "Dr. Singh", project: "Eco-Friendly Estate", img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", delay: 0.6 }
              ].map((vid, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9, y: 50 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.8, delay: vid.delay, type: "spring", bounce: 0.3 }}
                  className="group relative aspect-[16/9] md:aspect-[4/3] lg:aspect-[16/9] rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
                >
                  {/* Placeholder Background */}
                  <img src={vid.img} alt={vid.project} className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110" />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                  
                  {/* Play Button */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-md border border-white/40 rounded-full flex items-center justify-center group-hover:bg-secondary group-hover:border-secondary transition-all duration-500 shadow-[0_0_0_0_rgba(255,255,255,0.4)] group-hover:shadow-[0_0_0_15px_rgba(255,165,0,0.2)]">
                    <FaPlay className="text-white text-xl md:text-2xl ml-1 group-hover:scale-110 transition-transform duration-500" />
                  </div>

                  {/* Text Content */}
                  <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="w-2 h-2 rounded-full bg-secondary" />
                      <p className="text-white/80 text-[10px] uppercase tracking-[0.3em] font-bold">
                        {vid.project}
                      </p>
                    </div>
                    <h4 className="text-white text-2xl md:text-3xl font-light tracking-wide group-hover:text-secondary transition-colors duration-500">
                      {vid.name}
                    </h4>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* View More Button */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mt-16 text-center"
            >
              <button className="text-xs uppercase tracking-[0.2em] font-bold text-dark/60 hover:text-secondary transition-colors pb-1 border-b border-dark/20 hover:border-secondary">
                View All Testimonials
              </button>
            </motion.div>
          </div>
        </section>

        {/* --- 6. SLEEK CTA --- */}
        <section className="py-24 md:py-32 bg-dark text-white text-center px-6 border-t border-white/10 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          
          <div className="container mx-auto max-w-2xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-3xl md:text-5xl font-light mb-6 tracking-tight">
                Ready to begin your <br />
                <span className="font-medium italic text-secondary">architectural journey?</span>
              </h3>
              <p className="text-sm md:text-base text-white/50 font-light mb-12 max-w-lg mx-auto leading-relaxed">
                Schedule a consultation with our experts and take the first step towards realizing your vision with precision and elegance.
              </p>
              
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative overflow-hidden inline-flex items-center gap-4 bg-white text-dark px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:text-white transition-colors duration-500 rounded-sm"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Start the Conversation
                  <div className="w-4 h-[1px] bg-dark group-hover:bg-white group-hover:w-6 transition-all duration-300" />
                </span>
                <div className="absolute inset-0 bg-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              </motion.button>
            </motion.div>
          </div>
        </section>
      </main>

      <UnifiedFooter />
    </div>
  )
}

export default AboutUs


