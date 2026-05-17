import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import pr_1 from '../assets/pr_1.jpeg'

const HomeProjectsSection = () => {
  return (
    <section className="py-20 md:py-32 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Content */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="w-10 h-px bg-[#B85C38]" />
                <span className="text-[#B85C38] font-bold text-sm tracking-widest uppercase">The Portfolio</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark leading-tight mb-6">
                Signature <br/>
                <span className="font-light italic text-dark/70">Works</span>
              </h2>
              
              <p className="text-dark/60 text-lg leading-relaxed mb-8 max-w-lg">
                Where engineering meets art. Discover our curated selection of residential and commercial landmarks built to stand the test of time.
              </p>

              <div className="flex items-center gap-6">
                <Link to="/projects">
                  <button className="flex items-center gap-3 px-8 py-4 bg-[#B85C38] text-white rounded-full font-bold text-sm uppercase tracking-wider hover:bg-dark transition-colors shadow-lg hover:shadow-xl">
                    View Projects <FiArrowRight className="text-lg" />
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right Image */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl group"
            >
              <div className="aspect-[4/3] w-full">
                <img 
                  src={pr_1} 
                  alt="Featured Project" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              
              {/* Simple subtle overlay info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                 <h4 className="text-xl font-bold mb-1">The Vertex Residence</h4>
                 <p className="text-sm text-white/70">Chennai, Tamil Nadu</p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default HomeProjectsSection
