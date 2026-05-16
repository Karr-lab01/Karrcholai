import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowUpRight, FiLayers } from 'react-icons/fi'
import pr_1 from '../assets/pr_1.jpeg'

const HomeProjectsSection = () => {
  return (
    <section className="py-24 md:py-40 bg-[#FAF9F6] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 md:mb-24 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-10 h-px bg-[#B85C38]" />
              <span className="text-[#B85C38] font-black text-[10px] tracking-[0.4em] uppercase">The Portfolio</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-black text-dark leading-none tracking-tighter"
            >
              CRAFTING <br />
              <span className="text-dark/20 italic">Benchmarks.</span>
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="hidden md:block text-right"
          >
            <p className="text-dark/40 text-sm font-light max-w-xs mb-8">
              A comprehensive body of work across residential and commercial sectors, defined by structural integrity.
            </p>
          </motion.div>
        </div>

        {/* Cinematic Showcase Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-[500px] md:h-[650px] rounded-[3rem] overflow-hidden group shadow-2xl"
        >
          {/* Background Image */}
          <img 
            src={pr_1} 
            alt="Karrcholai Projects" 
            className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105"
          />
          
          {/* Overlays */}
          <div className="absolute inset-0 bg-dark/40 group-hover:bg-dark/30 transition-colors duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/20 to-transparent" />
          
          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="max-w-3xl"
            >
              <div className="flex justify-center mb-8">
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white text-2xl">
                  <FiLayers />
                </div>
              </div>
              
              <h3 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter mb-8 leading-[0.9]">
                Our <span className="text-transparent stroke-text-white italic">Portfolio</span> <br /> 
                Showcase.
              </h3>
              
              <p className="text-white/60 text-sm md:text-xl font-light leading-relaxed mb-12 max-w-xl mx-auto">
                Discover a legacy of residential excellence. From modern villas to sustainable sanctuaries, explore how we turn blueprints into architectural landmarks.
              </p>
              
              <Link to="/projects">
                <motion.button
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 md:px-16 py-6 bg-white text-dark rounded-full text-[10px] md:text-[11px] font-black tracking-[0.4em] uppercase shadow-2xl hover:bg-[#B85C38] hover:text-white transition-all duration-500"
                >
                  View All Projects
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* Floating Accents */}
          <div className="absolute bottom-12 left-12 right-12 flex justify-between items-center text-white/20">
            <div className="flex items-center gap-4">
              <span className="text-[9px] font-black tracking-[0.4em] uppercase">Est. 2024</span>
              <div className="w-12 h-px bg-white/10" />
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="w-12 h-px bg-white/10" />
              <span className="text-[9px] font-black tracking-[0.4em] uppercase">Built with Integrity</span>
            </div>
          </div>
        </motion.div>


      </div>
    </section>
  )
}

export default HomeProjectsSection
