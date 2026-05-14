import React, { useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { FiArrowLeft, FiMapPin, FiCalendar, FiMaximize, FiTag, FiClock, FiCheckCircle } from 'react-icons/fi'
import Navbar from '../components/Navbar'
import UnifiedFooter from '../components/UnifiedFooter'

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
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
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
  },
  {
    id: 'heritage-duplex',
    title: 'Heritage Duplex',
    subtitle: 'Timeless Twin Home',
    location: 'Coimbatore, TN',
    year: '2022',
    size: '3,200 Sq.Ft',
    category: 'Construction',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    description: 'Timeless duplex design honoring traditional Tamil architecture with modern comforts. A perfect blend of heritage aesthetics and contemporary utility.',
    fullStory: `The Heritage Duplex is a tribute to the rich architectural legacy of Tamil Nadu, reimagined for a modern family. The design features a central courtyard (Muttram) that provides natural ventilation and a focal point for family gatherings.

    We used traditional materials like Athangudi tiles and reclaimed teak wood, while integrating a state-of-the-art kitchen and modern insulation. The biggest challenge was sourcing master craftsmen who could execute the intricate wood carvings on the main entrance.

    This project stands as a testament to our ability to preserve cultural identity while delivering a home that meets the highest standards of 21st-century construction.`,
    features: ['Traditional Courtyard', 'Athangudi Tiling', 'Eco-friendly Materials', 'Handcrafted Woodwork'],
    stats: [
      { label: 'Completion Time', value: '11 Months' },
      { label: 'Tile Area', value: '2,400 Sq.Ft' },
      { label: 'Craftsmen', value: '15 Master Artists' }
    ]
  },
  {
    id: 'eco-living-hub',
    title: 'Eco-Living Hub',
    subtitle: 'Net-Zero Home',
    location: 'Madurai, TN',
    year: '2024',
    size: '5,100 Sq.Ft',
    category: 'Sustainable',
    image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    description: 'Net-zero energy home with solar integration and rainwater harvesting systems. Our most ambitious sustainable project to date.',
    fullStory: `The Eco-Living Hub is more than just a house; it's a statement on the future of sustainable habitation. Designed to produce more energy than it consumes, this 5,100 sq.ft estate utilizes a massive rooftop solar array and a sophisticated battery storage system.

    The building envelope is constructed using high-thermal-mass materials that naturally regulate temperature, drastically reducing the need for artificial cooling. Rainwater is harvested from 100% of the roof area and stored in a 50,000-liter underground tank.

    Every material was chosen for its low carbon footprint, from the recycled steel structure to the VOC-free paints. It represents the pinnacle of Karrcholai's Cholai division expertise.`,
    features: ['15kW Solar Array', '50kL Rainwater Tank', 'Passive Solar Design', 'Recycled Steel Structure'],
    stats: [
      { label: 'Energy Savings', value: '95%' },
      { label: 'Water Recycled', value: '100%' },
      { label: 'Carbon Saved', value: '12 Tons/Year' }
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
      <div className="fixed top-24 left-6 md:left-12 z-50">
        <Link to="/">
          <motion.button
            whileHover={{ x: -5 }}
            className="flex items-center gap-2 text-[10px] font-black tracking-[0.3em] uppercase text-dark/40 hover:text-dark transition-colors"
          >
            <FiArrowLeft /> Back to Home
          </motion.button>
        </Link>
      </div>

      <main>
        {/* Cinematic Hero */}
        <section className="relative h-[80vh] md:h-screen overflow-hidden bg-dark">
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#F5F2EC]" />
          </motion.div>

          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-24">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="max-w-5xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 bg-dark text-white text-[9px] font-black tracking-widest uppercase rounded-sm">
                  {project.category}
                </span>
                <span className="text-dark/40 text-[9px] font-black tracking-widest uppercase">
                  Project Ref: {project.id.slice(0, 4).toUpperCase()}-2024
                </span>
              </div>
              <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black text-dark leading-[0.8] tracking-tighter mb-8 font-sans">
                {project.title.split(' ')[0]} <br />
                <span className="text-transparent italic" style={{ WebkitTextStroke: '1px rgba(28,28,26,0.2)' }}>
                  {project.title.split(' ')[1]}
                </span>
              </h1>
              <p className="text-xl md:text-2xl font-light text-dark/60 max-w-2xl leading-relaxed italic">
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
                Engineering <span className="text-dark/20">meets</span> architectural <span className="italic font-serif text-[#C9754A]">poetry.</span>
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

        {/* Call to Action */}
        <section className="py-24 bg-[#1C1C1A] text-white overflow-hidden relative">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none flex items-center justify-center">
            <span className="text-[30vw] font-black uppercase tracking-tighter">PROJECT</span>
          </div>
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 leading-none tracking-tighter">
              Inspired by this <br />
              <span className="text-[#C9754A] italic font-serif">Structure?</span>
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
