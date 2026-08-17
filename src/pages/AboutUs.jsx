import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Navbar from '../components/Navbar'
import UnifiedFooter from '../components/UnifiedFooter'
import {
  FaHardHat, FaClock, FaDollarSign, FaShieldAlt, FaQuoteLeft,
  FaProjectDiagram, FaHandHoldingUsd, FaStar, FaLeaf, FaHome,
  FaTools, FaClipboardCheck, FaHandshake, FaBuilding, FaLayerGroup,
  FaBriefcase, FaChartLine
} from 'react-icons/fa'

import founderImg from '../../assets/Founder.jpeg'
import aboutBg from '../../assets/pic7.png'
import courtyardImg from '../../assets/img1.jpg'

import { Helmet } from 'react-helmet-async'

/* ─── Section ID anchors for nav ────────────────────────────── */
const SECTIONS = {
  story: 'our-story',
  founder: 'founder-thoughts',
  experience: 'our-experience',
  process: 'our-process',
}

const AboutUs = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  /* ── Experience items from the document ── */
  const experienceItems = [
    { icon: <FaHome />, label: 'Residential Building Construction' },
    { icon: <FaBuilding />, label: 'New Home Construction' },
    { icon: <FaTools />, label: 'Renovation & Alteration Work' },
    { icon: <FaLayerGroup />, label: 'Structural & Civil Works' },
    { icon: <FaClipboardCheck />, label: 'Project Planning & Execution' },
    { icon: <FaChartLine />, label: 'Quantity & Material Management' },
    { icon: <FaShieldAlt />, label: 'Quality Inspection & Control' },
    { icon: <FaHandshake />, label: 'Contractor & Team Coordination' },
    { icon: <FaDollarSign />, label: 'Budget-Conscious Construction' },
    { icon: <FaBriefcase />, label: 'Client Coordination & Communication' },
    { icon: <FaHardHat />, label: 'Finishing & Handover' },
    { icon: <FaLeaf />, label: 'Post-Construction Support & Maintenance' },
  ]

  /* ── Process steps from the document ── */
  const processSteps = [
    {
      step: '01',
      title: 'Enquiry & Initial Discussion',
      desc: 'Every project starts with a conversation. We understand your basic requirements, site details, expectations, budget considerations and the type of home you want to create. We listen before we build.',
    },
    {
      step: '02',
      title: 'Requirement & Site Understanding',
      desc: 'We study your requirements and understand the site conditions. This helps us identify the practical considerations that may affect planning, construction, cost and execution.',
    },
    {
      step: '03',
      title: 'Planning & Design Coordination',
      desc: 'Based on your requirements, we coordinate the planning process and work towards developing a practical solution for your home — considering functionality, space utilisation, construction feasibility, budget and your preferences.',
    },
    {
      step: '04',
      title: 'Estimation & Project Planning',
      desc: 'Before construction begins, we work towards establishing a clear understanding of the project scope, quantities, materials and expected costs. Proper planning at this stage helps minimise unexpected issues and material wastage.',
    },
    {
      step: '05',
      title: 'Agreement & Project Start',
      desc: 'Once the scope, responsibilities and project requirements are understood and agreed upon, we prepare for execution. The project is scheduled according to the agreed plan and the client\'s convenient timeline.',
    },
    {
      step: '06',
      title: 'Construction & Execution',
      desc: 'This is where the plan becomes reality. We coordinate the required teams, materials and activities at the site and execute the work through the different stages of construction — from foundation to finishing.',
    },
    {
      step: '07',
      title: 'Quality & Progress Monitoring',
      desc: 'Construction is continuously monitored to maintain the required quality and workmanship. We focus on proper execution, material usage, site coordination and progress, while keeping the client informed about important stages.',
    },
    {
      step: '08',
      title: 'Finishing & Handover',
      desc: 'Once construction is completed, finishing works and final checks are carried out. After ensuring that the agreed work has been completed, the home is prepared for handover. Your dream home is ready to become your living space.',
    },
  ]

  return (
    <div ref={containerRef} className="bg-cream min-h-screen text-dark selection:bg-secondary selection:text-white overflow-x-hidden">
      <Helmet>
        <title>About Us | Civil Engineers Tamil Nadu | Karrcholai Construction</title>
        <meta name="description" content="Meet Saravanakumar B., BE Civil Engineer and founder of Karrcholai Construction. 12+ years of residential construction and PMC in Tamil Nadu — built on strength, transparency, and sustainable living." />
        <link rel="canonical" href="https://karrcholai.com/about" />
        <meta property="og:title" content="About Karrcholai | Founder &amp; Our Story | Tamil Nadu Construction" />
        <meta property="og:description" content="Meet Saravanakumar B., founder of Karrcholai Construction. 12+ years of residential construction in Tamil Nadu — built on strength, transparency, and sustainable living." />
        <meta property="og:url" content="https://karrcholai.com/about" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://karrcholai.com/' },
            { '@type': 'ListItem', position: 2, name: 'About Us', item: 'https://karrcholai.com/about' },
          ],
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'About Karrcholai Construction',
          url: 'https://karrcholai.com/about',
          description: 'About Karrcholai Construction — founded by Saravanakumar B., BE Civil Engineer, with 12+ years of residential construction and PMC experience in Tamil Nadu.',
          mainEntity: {
            '@type': 'Person',
            name: 'Saravanakumar B.',
            jobTitle: 'Founder & Civil Engineer',
            worksFor: { '@type': 'Organization', name: 'Karrcholai Construction', url: 'https://karrcholai.com' },
          },
        })}</script>
      </Helmet>

      <Navbar />

      <main>
        {/* ══════════════════════════════════════════
            1. HERO
        ══════════════════════════════════════════ */}
        <section
          className="relative flex items-center justify-center overflow-hidden"
          style={{
            minHeight: '100svh',
            backgroundImage: `url(${aboutBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#000',
          }}
        >
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80 pointer-events-none" />

          <div className="relative z-10 text-center px-4 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            >
              <p className="text-secondary font-bold tracking-[0.4em] md:tracking-[0.6em] uppercase text-[10px] md:text-sm mb-4 md:mb-6 block">
                Building Excellence
              </p>
              <h1 className="text-5xl md:text-9xl font-black text-white uppercase tracking-tighter leading-tight md:leading-none mb-6 md:mb-8">
                ABOUT <span className="text-transparent stroke-text inline-block ml-2">US</span>
              </h1>
              <div className="flex items-center justify-center gap-3 md:gap-4 mb-8">
                <div className="h-[1px] w-8 md:w-12 bg-secondary/50" />
                <p className="text-white/60 text-[10px] md:text-lg font-light tracking-[0.2em] md:tracking-[0.3em] uppercase max-w-[200px] md:max-w-none mx-auto">
                  A Legacy of Strength &amp; Sustainability
                </p>
                <div className="h-[1px] w-8 md:w-12 bg-secondary/50" />
              </div>
            </motion.div>
          </div>

          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
          >
            <span className="text-white/30 text-[10px] uppercase tracking-[0.4em] rotate-90 mb-8">Scroll</span>
            <div className="w-[1px] h-20 bg-gradient-to-b from-secondary to-transparent" />
          </motion.div>
        </section>

        {/* ══════════════════════════════════════════
            2. OUR STORY
        ══════════════════════════════════════════ */}
        <section id={SECTIONS.story} className="py-24 md:py-36 px-6 bg-[#fcfbfa]">
          <div className="container mx-auto max-w-6xl">

            {/* Section label */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-16 md:mb-20"
            >
              <p className="text-secondary text-xs font-bold uppercase tracking-[0.35em] flex items-center gap-3 mb-4">
                <span className="w-6 h-[1px] bg-secondary" />
                Our Story
              </p>
              <h2 className="text-3xl md:text-5xl font-light text-dark tracking-tight max-w-2xl">
                From Stone to <span className="font-semibold">Oasis</span>
              </h2>
            </motion.div>

            {/* Split layout: quote left, text right */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">

              {/* Left — Manifesto quote block */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9 }}
                className="sticky top-32"
              >
                <div className="relative p-10 md:p-12 bg-dark text-white rounded-[2rem] overflow-hidden">
                  {/* decorative blob */}
                  <div className="absolute -top-12 -right-12 w-48 h-48 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />
                  <FaQuoteLeft className="text-secondary/30 text-5xl mb-6" />
                  <p className="text-xl md:text-2xl font-light leading-[1.7] text-white/85 mb-8">
                    Every home begins with a dream. But turning that dream into a beautiful, strong and comfortable home requires more than bricks and drawings.{' '}
                    <span className="text-secondary font-semibold">It requires trust.</span>
                  </p>
                  <div className="flex gap-6 mt-8 pt-8 border-t border-white/10">
                    <div>
                      <div className="text-3xl font-black text-secondary">12+</div>
                      <div className="text-[10px] uppercase tracking-[0.25em] text-white/40 mt-1">Years Professional Experience</div>
                    </div>
                    <div className="w-[1px] bg-white/10" />
                    <div>
                      <div className="text-3xl font-black text-secondary">40+</div>
                      <div className="text-[10px] uppercase tracking-[0.25em] text-white/40 mt-1">Projects Completed</div>
                    </div>
                  </div>
                </div>

                {/* Karr + Cholai etymology */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  {[
                    { word: 'Karr', meaning: 'Stone' },
                    { word: 'Cholai', meaning: 'Oasis' },
                  ].map((item) => (
                    <motion.div
                      key={item.word}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="p-5 bg-white border border-dark/5 rounded-2xl"
                    >
                      <div className="text-2xl font-black text-secondary mb-1">{item.word}</div>
                      <div className="text-xs font-bold uppercase tracking-widest text-dark/40">{item.meaning}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Right — Story body */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.15 }}
                className="space-y-7 text-[15px] md:text-[17px] text-dark/75 font-medium leading-[1.85]"
              >
                <p>
                  Building a dream home should be exciting, not overwhelming. With over <strong className="text-dark">12 years of experience in MNCs and private construction firms</strong>, our founder saw the constant struggles homeowners face: budget overruns, material waste, poor quality control, and chaotic vendor coordination.
                </p>
                <p>
                  We knew there had to be a better way. In 2021, we founded <strong className="text-[#C9754A]">KARRCHOLAI</strong> to bring structure, transparency, and peace of mind to residential construction.
                </p>

                {/* What We Do */}
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.35em] text-secondary mb-3">What We Do</p>
                  <p>
                    We offer end-to-end <strong className="text-dark">Residential Construction and Project Management Consultancy</strong>, guiding you from initial design to final handover with clear processes and smart cost management.
                  </p>
                </div>

                {/* KARR + CHOLAI meaning */}
                <div className="space-y-3">
                  <p>
                    <strong className="text-dark">KARR (Strength &amp; Structure):</strong> Uncompromising construction quality, tight project management, and solid execution.
                  </p>
                  <p>
                    <strong className="text-dark">CHOLAI (Greenery &amp; Sustainability):</strong> Eco-friendly solutions that turn houses into lasting, responsible homes.
                  </p>
                </div>

                {/* CHOLAI Approach */}
                <div className="mt-2 p-7 border-l-2 border-secondary bg-secondary/5 rounded-r-2xl space-y-3">
                  <p className="text-[11px] font-black uppercase tracking-[0.35em] text-secondary">The CHOLAI Approach</p>
                  <p className="text-base text-dark/75 leading-relaxed">
                    We help you build smarter for the future by seamlessly integrating sustainable features into your home:
                  </p>
                  <ul className="space-y-1 text-sm text-dark/70">
                    <li className="flex items-start gap-2"><span className="text-secondary mt-1">›</span> Landscaping &amp; Greenery for healthier living spaces</li>
                    <li className="flex items-start gap-2"><span className="text-secondary mt-1">›</span> Rainwater Harvesting to secure water independence</li>
                    <li className="flex items-start gap-2"><span className="text-secondary mt-1">›</span> Solar Energy Integration to slash energy bills</li>
                    <li className="flex items-start gap-2"><span className="text-secondary mt-1">›</span> Waste Management to minimize build-site impact</li>
                  </ul>
                </div>

                {/* Tag line */}
                <div className="pt-4 space-y-1">
                  <p className="text-xs text-dark/40 uppercase tracking-widest">From Stone to Oasis — We Build Better Living.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            3. FOUNDER — MY THOUGHTS
        ══════════════════════════════════════════ */}
        <section id={SECTIONS.founder} className="py-24 md:py-36 px-6 bg-white">
          <div className="container mx-auto max-w-6xl">

            {/* Section label */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-16 md:mb-20"
            >
              <p className="text-secondary text-xs font-bold uppercase tracking-[0.35em] flex items-center gap-3 mb-4">
                <span className="w-6 h-[1px] bg-secondary" />
                Founder
              </p>
              <h2 className="text-3xl md:text-5xl font-light text-dark tracking-tight">
                Founder's <span className="font-semibold">Message</span>
              </h2>
            </motion.div>

            {/* ── Founder identity row ── */}
            <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-start mb-24">

              {/* Photo + credentials */}
              <div className="w-full md:w-5/12">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, ease: 'easeOut' }}
                  className="aspect-[4/5] overflow-hidden relative group rounded-[2rem] shadow-2xl"
                >
                  <motion.img
                    initial={{ scale: 1.08 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    src={founderImg}
                    alt="Saravanakumar B., founder of Karrcholai Construction"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="text-2xl font-bold text-white mb-1">Saravanakumar B.</h3>
                    <p className="text-sm text-white/70 font-medium">BE Civil Engineer · Founder, Karrcholai Construction</p>
                  </div>
                </motion.div>
              </div>

              {/* Founder intro letter */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.2 }}
                className="w-full md:w-7/12 space-y-6 text-[15px] md:text-[17px] text-dark/75 font-medium leading-[1.85]"
              >
                <p>
                  Hello, I'm <strong className="text-dark">Saravanakumar B.</strong>, a BE Civil Engineer and the founder of <strong className="text-dark">Karrcholai Construction.</strong>
                </p>
                <p>
                  With more than <strong className="text-dark">12 years of professional experience</strong> in the construction industry, my journey has been shaped by practical site experience, disciplined project execution and a strong belief in honest and responsible building practices. I have also gained valuable exposure working with <strong className="text-dark">MNC and Private Limited companies</strong>, where I was involved in structured project environments, quality standards, and large-scale execution processes. In addition, my experience with an <strong className="text-dark">Architectural firm</strong> helped me develop a stronger understanding of design intent, space planning, aesthetics, and the importance of integrating architecture with practical construction.
                </p>
                <p>
                  For me, construction is not simply about creating structures — it is about creating spaces for life.
                </p>
                <p>
                  A good home should have a strong foundation, thoughtful planning, practical execution and a comfortable environment for the people who live in it. This belief became the foundation for starting{' '}
                  <span className="text-[#C9754A] font-semibold">Karrcholai Construction in 2021.</span>
                </p>
                <p>The name <strong className="text-dark">KARRCHOLAI</strong> comes from two ideas:</p>
                <ul className="space-y-1 pl-1">
                  <li className="flex items-start gap-2"><span className="text-secondary mt-1">›</span><span><strong className="text-dark">KARR</strong> — representing stone, strength and construction.</span></li>
                  <li className="flex items-start gap-2"><span className="text-secondary mt-1">›</span><span><strong className="text-dark">CHOLAI</strong> — representing an oasis, greenery and peaceful living.</span></li>
                </ul>
                <p>
                  Together, <strong className="text-dark">KARRCHOLAI</strong> represents my vision of combining strong construction with better and more responsible living.
                </p>
                <p>
                  My focus is on custom residential construction, <strong className="text-dark">Project Management Consultancy</strong> and responsible building practices, with an emphasis on quality, transparency, cost-conscious planning and long-term value for every client.
                </p>
                <div className="mt-2 p-6 border-l-2 border-secondary bg-secondary/5 rounded-r-2xl">
                  <p className="text-base text-dark/80 leading-relaxed">
                    At Karrcholai, our goal is not simply to build a house. Our goal is to help create a <strong className="text-dark">well-planned home</strong> that people can confidently live in for years to come.
                  </p>
                </div>
                <div className="pt-4 space-y-1">
                  <p className="text-dark/50">With regards,</p>
                  <p className="font-bold text-dark text-lg">Saravanakumar B.</p>
                  <p className="text-sm text-dark/50">Founder &amp; Civil Engineer</p>
                  <p className="text-sm text-dark/50">Karrcholai Construction</p>
                </div>
              </motion.div>
            </div>

            {/* ── Founder — My Thoughts on Construction ── */}
            <div className="relative rounded-[2.5rem] overflow-hidden bg-[#fcfbfa] border border-dark/5 flex flex-col md:flex-row">
              {/* Accent stripe */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary via-primary to-secondary z-10" />

              {/* Left: image — fills full height via background-image */}
              <div
                className="w-full md:w-1/2 min-h-[300px] shrink-0"
                style={{
                  backgroundImage: `url(${courtyardImg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />

              {/* Right: text */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.2 }}
                className="w-full md:w-1/2 p-10 md:p-14 flex flex-col justify-center"
              >
                <p className="text-secondary text-xs font-bold uppercase tracking-[0.35em] flex items-center gap-3 mb-5">
                  <span className="w-5 h-[1px] bg-secondary" />
                  My Thoughts on Construction
                </p>
                <div className="space-y-5 text-[15px] md:text-[16px] text-dark/75 font-medium leading-[1.85]">
                  <p>
                    Construction is not just about building a structure. It is about creating a space where life happens.
                  </p>
                  <p>
                    A good house should not depend only on design. It must have a <strong className="text-dark">strong foundation, proper planning, correct materials, and disciplined execution.</strong>
                  </p>
                  <p>
                    Through my experience in residential construction, I have learned that most problems come from poor planning and lack of supervision. Because of that, I always follow a systematic approach in every project.
                  </p>
                  <p>
                    I believe in <strong className="text-dark">practical buildings</strong> rather than decorative buildings. A home should be strong, functional, comfortable and peaceful for the people who live in it.
                  </p>
                  <div className="pt-3 border-t border-dark/10">
                    <p className="text-sm font-semibold text-secondary">
                      My goal in every project — build with responsibility, clarity, and long-term thinking.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            4. STATS STRIP
        ══════════════════════════════════════════ */}
        <section className="py-12 md:py-16 bg-dark text-white border-y border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
          <div className="container mx-auto px-6 max-w-6xl relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x divide-white/10">
              {[
                { number: '12+', label: 'Years Professional Experience' },
                { number: '40+', label: 'Projects Completed' },
                { number: '100%', label: 'Client Satisfaction' },
                { number: '24/7', label: 'Project Support' },
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

        {/* ══════════════════════════════════════════
            5. OUR EXPERIENCE
        ══════════════════════════════════════════ */}
        <section id={SECTIONS.experience} className="py-24 md:py-36 px-6 bg-[#fafafa]">
          <div className="container mx-auto max-w-6xl">

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-16 md:mb-20"
            >
              <p className="text-secondary text-xs font-bold uppercase tracking-[0.35em] flex items-center gap-3 mb-4">
                <span className="w-6 h-[1px] bg-secondary" />
                Our Experience
              </p>
              <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-16">
                <h2 className="text-3xl md:text-5xl font-light text-dark tracking-tight">
                  12+ Years of <span className="font-semibold">Residential Construction</span>
                </h2>
                <p className="text-dark/40 text-xs uppercase tracking-widest font-semibold md:mb-2">
                  Built on Practical Knowledge
                </p>
              </div>
            </motion.div>

            {/* Intro body */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-6 text-[15px] md:text-[17px] text-dark/70 font-medium leading-[1.85] mb-16 md:mb-20"
            >
              <p>
                Building a home is a responsibility that requires experience, attention to detail and disciplined execution at every stage.
              </p>
              <p>
                With more than <strong className="text-dark">12 years of professional experience</strong> in the construction industry, our founder has developed practical knowledge of the residential construction process — from planning and initial groundwork to structural execution, finishing and final handover.
              </p>
              <p>
                Over the years, we have experienced the real challenges that come with building a home — understanding client requirements, coordinating different teams and professionals, controlling material usage, maintaining quality, managing budgets and ensuring that work progresses according to plan.
              </p>
              <p>
                Our experience has taught us that a successful project is not simply about completing construction. It is about <strong className="text-dark">planning carefully before execution</strong>, identifying potential problems early, using materials responsibly and maintaining quality throughout every stage of the project.
              </p>
              <p>
                Our professional experience across <strong className="text-dark">MNCs, private limited companies and architectural environments</strong>, together with hands-on residential construction experience, has helped us develop a practical understanding of both technical requirements and real-world project execution.
              </p>
              <p>
                That is why our approach combines technical knowledge, practical site experience and project management to help homeowners make informed decisions and manage their projects more effectively.
              </p>

              {/* Closing belief strip */}
              <div className="mt-4 p-7 border-l-2 border-secondary bg-secondary/5 rounded-r-2xl space-y-3">
                <p>
                  Every project adds to our experience. Every challenge improves our approach. Every completed home strengthens our commitment to building better.
                </p>
                <p className="text-base font-semibold text-dark">
                  At Karrcholai, we believe that experience is not just measured in years — it is measured by what we learn, how we solve problems and the value we create for every client.
                </p>
              </div>
            </motion.div>

            {/* Experience grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {experienceItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="group flex items-center gap-4 p-5 bg-white border border-dark/5 rounded-2xl hover:border-secondary/30 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-300 shrink-0 text-[15px]">
                    {item.icon}
                  </div>
                  <span className="text-sm font-semibold text-dark/75 group-hover:text-dark leading-snug transition-colors duration-300">
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Commitment tagline */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="mt-14 text-center"
            >
              <p className="text-secondary text-xs font-black uppercase tracking-[0.4em]">
                12+ Years of Experience. One Commitment — Better Living.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            6. OUR PROCESS
        ══════════════════════════════════════════ */}
        <section id={SECTIONS.process} className="py-24 md:py-36 px-6 bg-white overflow-hidden">
          <div className="container mx-auto max-w-5xl">

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-20 md:mb-24"
            >
              <p className="text-secondary text-xs font-bold uppercase tracking-[0.35em] flex items-center gap-3 mb-4">
                <span className="w-6 h-[1px] bg-secondary" />
                Our Process
              </p>
              <div className="flex flex-col md:flex-row md:items-end gap-6">
                <h2 className="text-3xl md:text-5xl font-light text-dark tracking-tight">
                  From Your Dream <span className="font-semibold">to Your Home</span>
                </h2>
              </div>
              <p className="mt-5 text-dark/50 text-base md:text-lg font-light max-w-xl leading-relaxed">
                Building a home should be an organised and transparent journey — not a confusing one. We follow a systematic process to understand your requirements, plan carefully, execute responsibly and deliver a home that meets your expectations.
              </p>

              {/* Flow strip */}
              <div className="mt-8 flex flex-wrap gap-2 items-center text-[11px] font-semibold uppercase tracking-widest text-dark/40">
                {['Listen', 'Plan', 'Execute', 'Monitor', 'Deliver'].map((word, i, arr) => (
                  <React.Fragment key={word}>
                    <span className="text-secondary">{word}</span>
                    {i < arr.length - 1 && <span className="text-dark/20">→</span>}
                  </React.Fragment>
                ))}
              </div>
            </motion.div>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-dark/5 -translate-x-1/2" />
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: '100%' }}
                transition={{ duration: 3.5, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, margin: '-20%' }}
                className="absolute left-8 md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-secondary to-primary -translate-x-1/2 origin-top"
              />

              {processSteps.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{ duration: 0.7, delay: 0.08, type: 'spring', bounce: 0.3 }}
                  className={`relative flex items-center justify-between mb-16 md:mb-20 last:mb-0 group ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="hidden md:block w-5/12" />

                  {/* Node */}
                  <div className="absolute left-8 md:left-1/2 w-12 h-12 bg-white border-4 border-[#fafafa] rounded-full flex items-center justify-center -translate-x-1/2 z-10 shadow-xl group-hover:scale-125 transition-transform duration-500">
                    <div className="w-full h-full rounded-full border-2 border-secondary/30 flex items-center justify-center group-hover:border-secondary transition-colors duration-500">
                      <motion.div
                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                        className="w-3 h-3 bg-secondary rounded-full"
                      />
                    </div>
                  </div>

                  {/* Card */}
                  <div className="w-full pl-24 md:pl-0 md:w-5/12">
                    <motion.div
                      whileHover={{ y: -8 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="relative p-8 md:p-10 bg-[#fafafa] border border-dark/5 rounded-[2rem] shadow-sm hover:shadow-xl transition-shadow duration-500 overflow-hidden"
                    >
                      <div className="absolute -top-8 -right-8 w-28 h-28 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                      <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-5">
                          <span className="text-4xl md:text-5xl font-black text-secondary/15 group-hover:text-secondary/30 transition-colors duration-500 select-none">
                            {item.step}
                          </span>
                          <h4 className="text-lg md:text-xl font-semibold text-dark tracking-wide leading-snug">{item.title}</h4>
                        </div>
                        <p className="text-sm md:text-[15px] text-dark/60 font-light leading-relaxed">{item.desc}</p>
                      </div>
                      <div className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-secondary to-primary w-0 group-hover:w-full transition-all duration-700 ease-in-out" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Approach tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="mt-20 text-center"
            >
              <p className="text-xs text-dark/30 uppercase tracking-[0.4em] font-semibold">
                From the First Conversation to the Final Handover
              </p>
              <p className="mt-2 text-sm font-bold text-secondary uppercase tracking-[0.25em]">
                KARRCHOLAI — From Stone to Oasis, We Build Better Living.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            7. CORE PHILOSOPHY (SLEEK GRID) — unchanged
        ══════════════════════════════════════════ */}
        <section className="py-24 md:py-32 px-6 bg-[#fafafa]">
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
                { icon: <FaHardHat size={24} />, title: 'Structured Planning', desc: 'Every successful project begins with thorough pre-construction planning. We review drawings, budgets, and timelines with you before work begins — ensuring clarity and alignment from the start.' },
                { icon: <FaShieldAlt size={24} />, title: 'Stage-wise Quality Control', desc: 'Quality is verified at each critical stage — foundation, structure, roofing, and finishing. Our team maintains on-site supervision to ensure materials and workmanship meet agreed standards.' },
                { icon: <FaDollarSign size={24} />, title: 'Transparent Cost Management', desc: 'We provide detailed cost breakdowns and proactive updates on any variations. Our clients always know where their investment is going, with no unexpected charges mid-project.' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="group relative p-8 border border-dark/5 hover:border-secondary/30 transition-colors duration-500 bg-white hover:bg-white"
                >
                  <div className="text-secondary mb-8 transition-transform duration-500 group-hover:-translate-y-2">{item.icon}</div>
                  <h4 className="text-lg font-semibold text-dark mb-4 tracking-wide">{item.title}</h4>
                  <p className="text-sm text-dark/60 leading-relaxed font-light">{item.desc}</p>
                  <div className="absolute bottom-0 left-0 h-[2px] bg-secondary w-0 group-hover:w-full transition-all duration-700 ease-out" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            8. EXPERTISE IMPACT — unchanged
        ══════════════════════════════════════════ */}
        <section className="py-20 md:py-28 px-6 bg-[#0a0a0a] text-white relative overflow-hidden">
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
                    <span className="font-bold text-white">you can trust</span> <br />
                    <span className="text-secondary">from day one.</span>
                  </h3>
                  <div className="p-6 bg-white/[0.02] border-l border-secondary/40 backdrop-blur-md rounded-r-xl">
                    <p className="text-sm md:text-base text-white/50 font-light leading-relaxed">
                      Karrcholai was built on the belief that residential construction requires engineering discipline and consistent site supervision. With over 12 years of experience, we deliver structured project management, transparent communication, and quality execution at every stage.
                    </p>
                  </div>
                </motion.div>
              </div>

              <div className="lg:col-span-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                  {[
                    { title: 'Structured Planning', icon: <FaProjectDiagram />, delay: 0 },
                    { title: 'Cost Transparency', icon: <FaHandHoldingUsd />, delay: 0.1 },
                    { title: 'Quality Supervision', icon: <FaShieldAlt />, delay: 0.2 },
                    { title: 'Timely Delivery', icon: <FaClock />, delay: 0.3 },
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

        {/* ══════════════════════════════════════════
            9. CLIENT TESTIMONIALS — unchanged
        ══════════════════════════════════════════ */}
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
                <span className="font-medium text-secondary">Hear from our homeowners.</span>
              </h3>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-14 pt-16">
              {[
                {
                  name: 'Mrs. Elumalai Mohanavalli',
                  role: 'Homeowner',
                  image: 'https://ui-avatars.com/api/?name=Mohanavalli&background=2D4B37&color=ffffff&size=150&bold=true',
                  feedback: 'The KARRCHOLAI team impressed with their professionalism and dedication. From the initial planning stages to the ongoing execution, they have demonstrated a keen eye for detail and a commitment to excellence.',
                  delay: 0,
                },
                {
                  name: 'Mrs. Naatrayan Karthiga Devi',
                  role: 'Homeowner',
                  image: 'https://ui-avatars.com/api/?name=Karthiga+Devi&background=B85C38&color=ffffff&size=150&bold=true',
                  feedback: "We entrusted KARRCHOLAI with the team's dedication to quality craftsmanship and attention to detail truly shines through in every corner of our home. Thank you for turning our house into a haven!",
                  delay: 0.2,
                },
                {
                  name: 'Mrs. Mohanraj Priya',
                  role: 'Homeowner',
                  image: 'https://ui-avatars.com/api/?name=Mohanraj+Priya&background=4A7B5E&color=ffffff&size=150&bold=true',
                  feedback: 'Choosing KARRCHOLAI for our building renovation was the best decision we made! With their expertise in Vastu alterations and their commitment to quality. Thank you for giving our building a new lease on life!',
                  delay: 0.4,
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{ duration: 0.8, delay: item.delay, type: 'spring', bounce: 0.2 }}
                  className="group relative p-8 md:p-10 pt-16 bg-white border border-dark/5 rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-between text-center mt-8"
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-4 border-white shadow-md overflow-hidden bg-cream group-hover:scale-105 group-hover:border-secondary transition-all duration-500 z-20">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="flex items-center gap-1 mb-4 text-[#FFB01F] text-sm">
                      {[...Array(5)].map((_, j) => <FaStar key={j} />)}
                    </div>
                    <FaQuoteLeft className="text-secondary/15 text-3xl mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:text-secondary/30" />
                    <p className="text-sm md:text-[15px] text-dark/70 font-light leading-relaxed mb-6">"{item.feedback}"</p>
                  </div>
                  <div className="relative z-10 mt-auto pt-5 border-t border-dark/5 w-full">
                    <h4 className="text-base md:text-lg font-bold text-dark tracking-tight transition-colors duration-300 group-hover:text-secondary">{item.name}</h4>
                    <p className="text-xs text-dark/40 font-semibold uppercase tracking-wider mt-1">{item.role}</p>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-[10px] rounded-b-[2rem] overflow-hidden pointer-events-none">
                    <div className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-secondary to-primary w-0 group-hover:w-full transition-all duration-700 ease-in-out" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            10. CTA — unchanged
        ══════════════════════════════════════════ */}
        <section className="relative py-40 overflow-hidden bg-[#FAF8F5]">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/dark-matter.png")' }} />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            >
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-[1px] w-12 bg-[#B85C38]/40" />
                <span className="text-[9px] font-black tracking-[0.5em] uppercase text-[#B85C38]">Initiate Project</span>
                <div className="h-[1px] w-12 bg-[#B85C38]/40" />
              </div>

              <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-[#2A2A28] leading-[0.9] mb-8 tracking-tighter uppercase">
                Design Your <br />
                <span className="text-[#B85C38] lowercase tracking-normal">legacy.</span>
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
