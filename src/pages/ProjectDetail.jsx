import React, { useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { FiArrowLeft, FiMapPin, FiCalendar, FiMaximize, FiTag, FiClock, FiCheckCircle } from 'react-icons/fi'
import Navbar from '../components/Navbar'
import UnifiedFooter from '../components/UnifiedFooter'
import pr_1 from '../assets/pr_1.jpeg'
import pr_2 from '../assets/pr_2.jpeg'
import pr_3 from '../assets/pr_3.jpeg'

// Sample data (in a real app, this would come from a central data file or API)
const PROJECTS_DATA = [
  {
    id: 'modern-villa',
    title: 'Modern Villa',
    subtitle: 'Stone Grove Residence',
    location: 'Chennai, TN',
    year: '2023',
    size: '4,500 Sq.Ft',
    category: 'Residential',
    image: pr_1,
    gallery: [pr_1, pr_2, pr_3],
    description: 'A sleek contemporary villa blending open-plan living with lush landscaping and smart home systems. This project highlights our commitment to architectural brilliance and structural integrity.',
    fullStory: `The Modern Villa project was conceived as a sanctuary that balances the raw beauty of natural stone with the precision of modern engineering. Located in the heart of Chennai, this 4,500 sq.ft residence features expansive glass facades that invite natural light into every corner.

    Our team worked closely with the clients to ensure every detail reflected their vision of a "breathable home." From the hand-picked Italian marble flooring to the custom-designed smart lighting system, no element was left to chance. 

    The structural challenge was to create wide, column-free spans in the living area, which we achieved using advanced post-tensioned slabs. This allows for a seamless flow between the interior and the outdoor infinity pool deck.`,
    features: ['Smart Home Automation', 'Custom Landscape Design', 'Energy Efficient Glazing', 'Premium Stone Finishes'],
    stats: [
      { label: 'Completion Time', value: '14 Months' },
      { label: 'Concrete Used', value: '850 m³' },
      { label: 'Workforce', value: '120+' }
    ]
  }
]

const ProjectDetail = () => {
  const { id } = useParams()
  const project = PROJECTS_DATA.find(p => p.id === id) || PROJECTS_DATA[0]
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  return (
    <div ref={containerRef} className="bg-[#F5F2EC] min-h-screen text-[#1C1C1A] selection:bg-[#C9754A] selection:text-white font-sans overflow-x-hidden">
      <Navbar />

      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-[#C9754A] z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Back Button */}
      <div className="fixed top-24 left-6 md:left-12 z-[999]">
        <Link to="/">
          <motion.button
            whileHover={{ x: -5 }}
            className="flex items-center gap-2 px-4 py-2 bg-black/20 backdrop-blur-md rounded-full text-[10px] font-black tracking-[0.3em] uppercase text-white hover:bg-black/40 transition-all border border-white/10"
          >
            <FiArrowLeft /> Back to Home
          </motion.button>
        </Link>
      </div>

      <main>
        {/* Cinematic Hero */}
        <section className="relative h-[80vh] md:h-screen overflow-hidden bg-[#1C1C1A]">
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1A]/90 via-[#1C1C1A]/20 to-transparent" />
            <div className="absolute inset-0 bg-black/10" />
          </motion.div>

          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="max-w-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-[#C9754A] text-white text-[9px] font-black tracking-widest uppercase rounded-full shadow-lg">
                  {project.category}
                </span>
                <span className="text-white/80 text-[9px] font-bold tracking-widest uppercase bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
                  Ref: {project.id.slice(0, 4).toUpperCase()}-2024
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-2 drop-shadow-md">
                {project.title}
              </h1>
              <p className="text-sm md:text-base font-light text-white/70 italic drop-shadow-sm">
                {project.subtitle}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Project Overview Grid */}
        <section className="py-24 px-6 md:px-24">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
            
            {/* Left: Metadata */}
            <div className="lg:col-span-4 space-y-12">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-[10px] font-black text-dark/30 tracking-widest uppercase mb-2 flex items-center gap-2">
                    <FiMapPin className="text-[#C9754A]" /> Location
                  </p>
                  <p className="text-lg font-bold">{project.location}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-dark/30 tracking-widest uppercase mb-2 flex items-center gap-2">
                    <FiCalendar className="text-[#C9754A]" /> Completed
                  </p>
                  <p className="text-lg font-bold">{project.year}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-dark/30 tracking-widest uppercase mb-2 flex items-center gap-2">
                    <FiMaximize className="text-[#C9754A]" /> Footprint
                  </p>
                  <p className="text-lg font-bold">{project.size}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-dark/30 tracking-widest uppercase mb-2 flex items-center gap-2">
                    <FiTag className="text-[#C9754A]" /> Sector
                  </p>
                  <p className="text-lg font-bold">{project.category}</p>
                </div>
              </div>

              <div className="pt-12 border-t border-dark/5">
                <h3 className="text-sm font-black tracking-widest uppercase mb-8">Technical Highlights</h3>
                <div className="space-y-6">
                  {project.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-4 text-dark/60 group">
                      <FiCheckCircle className="text-[#C9754A] transition-transform group-hover:scale-125" />
                      <span className="text-sm font-medium tracking-wide">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: The Story */}
            <div className="lg:col-span-8">
              <div className="flex items-center gap-4 mb-8">
                <span className="w-12 h-px bg-[#C9754A]" />
                <span className="text-[#C9754A] font-black text-[10px] tracking-[0.4em] uppercase">The Narrative</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-12 leading-tight">
                Engineering <span className="text-dark/20">meets</span> architectural <span className="italic text-[#C9754A]">poetry.</span>
              </h2>
              
              <div className="prose prose-lg max-w-none">
                {project.fullStory.split('\n\n').map((para, i) => (
                  <p key={i} className="text-dark/70 text-lg leading-relaxed font-light mb-8 first-letter:text-5xl first-letter:font-black first-letter:text-[#C9754A] first-letter:mr-3 first-letter:float-left">
                    {para.trim()}
                  </p>
                ))}
              </div>

              {/* Stats Bar */}
              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 p-8 md:p-12 bg-dark rounded-[2rem] text-white">
                {project.stats.map((stat, i) => (
                  <div key={i} className="text-center md:text-left">
                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 mb-2">{stat.label}</p>
                    <p className="text-3xl font-black tracking-tighter" style={{ color: '#C9754A' }}>{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* Visual Showcase */}
        {project.gallery && (
          <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
              <div className="flex items-center gap-4 mb-12">
                <span className="w-12 h-px bg-[#C9754A]" />
                <span className="text-[#C9754A] font-black text-[10px] tracking-[0.4em] uppercase">Visual Showcase</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {project.gallery.map((img, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2, duration: 0.8 }}
                    className={`relative overflow-hidden rounded-[2rem] shadow-xl ${i === 0 ? 'md:col-span-2 md:row-span-2 aspect-video' : 'aspect-square'}`}
                  >
                    <img src={img} alt={`Gallery image ${i + 1}`} className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105" />
                    <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors duration-500" />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Call to Action */}
        <section className="py-24 bg-[#1C1C1A] text-white overflow-hidden relative">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none flex items-center justify-center">
            <span className="text-[30vw] font-black uppercase tracking-tighter">PROJECT</span>
          </div>
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 leading-none tracking-tighter">
              Inspired by this <br />
              <span className="text-[#C9754A] italic">Structure?</span>
            </h2>
            <p className="text-white/50 text-lg font-light mb-12 max-w-2xl mx-auto">
              Every project starts with a single conversation. Let's discuss how we can bring 
              this level of craftsmanship to your next venture.
            </p>
            <Link to="/contact">
              <button className="px-12 py-6 bg-white text-dark text-[11px] font-black tracking-[0.3em] uppercase hover:bg-[#C9754A] hover:text-white transition-all duration-500 rounded-full">
                Start Your Story
              </button>
            </Link>
          </div>
        </section>
      </main>

      <UnifiedFooter />
    </div>
  )
}

export default ProjectDetail
