import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowUpRight, FiMapPin } from 'react-icons/fi'
import pr1 from '../assets/pr1.jpeg'

const SAMPLE_PROJECTS = [
  {
    id: 'modern-villa',
    title: 'Modern Villa',
    location: 'Chennai, TN',
    tag: 'Residential',
    image: pr1,
    color: '#3F5F4A'
  }
]

const HomeProjectsSection = () => {
  return (
    <section className="py-24 md:py-40 bg-white overflow-hidden">
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
              <span className="w-10 h-px bg-[#C9754A]" />
              <span className="text-[#C9754A] font-black text-[10px] tracking-[0.4em] uppercase">The Portfolio</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-black text-dark leading-none tracking-tighter"
            >
              CRAFTING <br />
              <span className="text-dark/20 italic font-serif">Benchmarks.</span>
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
              A selection of our recently delivered masterpieces, defined by structural integrity and aesthetic precision.
            </p>
            <Link to="/projects">
              <button className="group flex items-center gap-3 text-dark font-black text-[10px] tracking-[0.3em] uppercase ml-auto">
                Full Portfolio <FiArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Cinematic Grid */}
        <div className="grid grid-cols-1 max-w-md mx-auto gap-8 md:gap-12">
          {SAMPLE_PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="group relative"
            >
              {/* Image Container */}
              <Link to={`/projects/${project.id}`} className="block relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-gray-100 mb-8 cursor-pointer group-hover:shadow-2xl transition-all duration-500">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                />
                
                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `${project.color}33` }} />
                
                {/* Floating Meta */}
                <div className="absolute top-6 left-6">
                  <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[9px] font-black tracking-widest uppercase rounded-full">
                    {project.tag}
                  </span>
                </div>
                
                <div className="absolute bottom-8 left-8 right-8">
                  <h3 className="text-3xl font-black text-white font-serif mb-2 leading-none">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 text-white/50 text-[10px] font-bold tracking-widest uppercase">
                    <FiMapPin size={10} /> {project.location}
                  </div>
                </div>
              </Link>
              
              {/* Content & Button */}
              <div className="px-2">
                <p className="text-dark/40 text-sm font-light leading-relaxed mb-8 line-clamp-2">
                  Exploring the boundary between structural rigidity and architectural flow in this landmark {project.tag.toLowerCase()} project.
                </p>
                <Link to={`/projects/${project.id}`}>
                  <button className="relative w-full py-4 border border-dark/10 rounded-full text-[10px] font-black tracking-[0.3em] uppercase overflow-hidden group/btn transition-colors hover:text-white">
                    <span className="relative z-10 transition-colors duration-500 group-hover/btn:text-white">Learn More</span>
                    <div className="absolute inset-0 bg-dark translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Mobile Call to Action */}
        <div className="mt-16 md:hidden text-center">
          <Link to="/projects">
            <button className="text-dark/40 font-black text-[10px] tracking-[0.3em] uppercase">
              View All Projects
            </button>
          </Link>
        </div>

      </div>
    </section>
  )
}

export default HomeProjectsSection
