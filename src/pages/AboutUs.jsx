import React, { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import Navbar from '../components/Navbar'
import UnifiedFooter from '../components/UnifiedFooter'
import { FaHardHat, FaClock, FaDollarSign, FaShieldAlt, FaQuoteLeft, FaPlay, FaProjectDiagram, FaHandHoldingUsd, FaStar } from 'react-icons/fa'

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
              <p className="text-dark/40 text-xs uppercase tracking-widest font-semibold">Three principles we stand by</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { icon: <FaHardHat size={24} />, title: "Structured Planning", desc: "Every successful project begins with thorough pre-construction planning. We review drawings, budgets, and timelines with you before work begins — ensuring clarity and alignment from the start." },
                { icon: <FaShieldAlt size={24} />, title: "Stage-wise Quality Control", desc: "Quality is verified at each critical stage — foundation, structure, roofing, and finishing. Our team maintains on-site supervision to ensure materials and workmanship meet agreed standards." },
                { icon: <FaDollarSign size={24} />, title: "Transparent Cost Management", desc: "We provide detailed cost breakdowns and proactive updates on any variations. Our clients always know where their investment is going, with no unexpected charges mid-project." }
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
                    Engineering expertise <br />
                    <span className="font-bold italic text-white">you can trust</span> <br />
                    <span className="text-secondary italic">from day one.</span>
                  </h3>

                  <div className="p-6 bg-white/[0.02] border-l border-secondary/40 backdrop-blur-md rounded-r-xl">
                    <p className="text-sm md:text-base text-white/50 font-light leading-relaxed">
                      Karrcholai was built on the belief that residential construction requires engineering discipline and consistent site supervision. With over 12 years of experience, we deliver structured project management, transparent communication, and quality execution at every stage.
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Right Side: Compact Grid */}
              <div className="lg:col-span-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                  {[
                    { title: "Structured Planning", icon: <FaProjectDiagram />, delay: 0 },
                    { title: "Cost Transparency", icon: <FaHandHoldingUsd />, delay: 0.1 },
                    { title: "Quality Supervision", icon: <FaShieldAlt />, delay: 0.2 },
                    { title: "Timely Delivery", icon: <FaClock />, delay: 0.3 }
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
                  Engineering-led execution • 12+ years in residential construction
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
                From Consultation to <span className="font-medium">Handover</span>
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
                { step: "01", title: "Consultation & Scope", desc: "We begin by understanding your requirements, budget, and timeline. This initial consultation establishes a clear project scope and sets realistic expectations for all parties involved." },
                { step: "02", title: "Design & Engineering", desc: "We develop or review structural drawings and coordinate with your architect to ensure the design is practical, structurally sound, and ready for execution on site." },
                { step: "03", title: "Site Preparation", desc: "The site is cleared, surveyed, and prepared for foundation work. Soil assessment and levelling are completed to ensure a stable and reliable base for construction." },
                { step: "04", title: "Construction Phase", desc: "Construction proceeds through defined stages — foundation, structure, roofing, and finishes — with consistent site supervision and regular progress updates throughout." },
                { step: "05", title: "Final Handover", desc: "Upon completion, we conduct a detailed walkthrough with you, address any remaining items, and hand over your home only when all agreed quality standards are fully met." }
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

        {/* --- 5.5 CLIENT FEEDBACK (HORIZONTAL ROW) --- */}
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
                Client Testimonials
                <span className="w-6 h-[1px] bg-secondary" />
              </p>
              <h3 className="text-3xl md:text-5xl font-light text-dark tracking-tight">
                Don't just take our word for it. <br />
                <span className="font-medium italic text-secondary">Hear from our homeowners.</span>
              </h3>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-14 pt-16">
              {[
                {
                  name: "Mrs. Elumalai Mohanavalli",
                  role: "Homeowner",
                  image: "https://tse2.mm.bing.net/th/id/OIP.oN5gaQN8Pd_4NoZg7iL7MgHaEJ?pid=Api&h=220&P=0",
                  feedback: "The KARRCHOLAI team impressed with their professionalism and dedication. From the initial planning stages to the ongoing execution, they have demonstrated a keen eye for detail and a commitment to excellence.",
                  delay: 0
                },
                {
                  name: "Mrs. Naatrayan Karthiga Devi",
                  role: "Homeowner",
                  image: "https://i.pinimg.com/736x/6e/66/1e/6e661e53b43de79c1d26485ca386f6bd.jpg",
                  feedback: "We entrusted KARRCHOLAI with The team's dedication to quality craftsmanship and attention to detail truly shines through in every corner of our home. Thank you for turning our house into a haven!",
                  delay: 0.2
                },
                {
                  name: "Mrs. Mohanraj Priya",
                  role: "Homeowner",
                  image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=150&h=150&q=80",
                  feedback: "Choosing KARRCHOLAI for our building renovation was the best decision we made! With their expertise in Vastu alterations and their commitment to quality. Thank you for giving our building a new lease on life!",
                  delay: 0.4
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.8, delay: item.delay, type: "spring", bounce: 0.2 }}
                  className="group relative p-8 md:p-10 pt-16 bg-white border border-dark/5 rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-between text-center mt-8"
                >
                  {/* Circular Avatar sitting at top center, slightly overlapping card border */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-4 border-white shadow-md overflow-hidden bg-cream group-hover:scale-105 group-hover:border-secondary transition-all duration-500 z-20">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Decorative Background Blob */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />

                  <div className="relative z-10 flex flex-col items-center">
                    {/* Star Ratings */}
                    <div className="flex items-center gap-1 mb-4 text-[#FFB01F] text-sm">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </div>

                    <FaQuoteLeft className="text-secondary/15 text-3xl mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:text-secondary/30" />

                    <p className="text-sm md:text-[15px] text-dark/70 font-light leading-relaxed mb-6 italic">
                      "{item.feedback}"
                    </p>
                  </div>

                  <div className="relative z-10 mt-auto pt-5 border-t border-dark/5 w-full">
                    <h4 className="text-base md:text-lg font-bold text-dark tracking-tight transition-colors duration-300 group-hover:text-secondary">
                      {item.name}
                    </h4>
                    <p className="text-xs text-dark/40 font-semibold uppercase tracking-wider mt-1">
                      {item.role}
                    </p>
                  </div>

                  {/* Bottom Clip Container for Hover Line */}
                  <div className="absolute inset-x-0 bottom-0 h-[10px] rounded-b-[2rem] overflow-hidden pointer-events-none">
                    <div className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-secondary to-primary w-0 group-hover:w-full transition-all duration-700 ease-in-out" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- 6. ULTRA PREMIUM CTA --- */}
        <section className="relative py-40 overflow-hidden bg-[#FAF8F5]">
          {/* Elegant Light Background */}
          <div className="absolute inset-0 z-0">
             <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/dark-matter.png")' }} />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-[1px] w-12 bg-[#B85C38]/40" />
                <span className="text-[9px] font-black tracking-[0.5em] uppercase text-[#B85C38]">
                  Initiate Project
                </span>
                <div className="h-[1px] w-12 bg-[#B85C38]/40" />
              </div>

              <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-[#2A2A28] leading-[0.9] mb-8 tracking-tighter uppercase">
                Design Your <br />
                <span className="text-[#B85C38] italic font-serif lowercase tracking-normal">legacy.</span>
              </h2>

              <p className="text-sm md:text-lg font-medium leading-relaxed mb-14 text-[#2A2A28]/60 max-w-2xl mx-auto">
                Commission a bespoke architectural masterpiece. Consult with our leadership to define the contours of your future estate.
              </p>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative overflow-hidden inline-flex items-center justify-center px-12 py-5 transition-colors duration-500 rounded-full bg-[#B85C38] shadow-xl hover:shadow-2xl"
              >
                <div className="absolute inset-0 bg-[#2A2A28] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-700 ease-[0.16,1,0.3,1]" />
                <span className="relative z-10 flex items-center gap-4 text-xs font-bold uppercase tracking-[0.3em] text-white transition-colors duration-500">
                  Request Consultation
                  <div className="w-6 h-[1px] bg-white transition-colors duration-500" />
                </span>
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


