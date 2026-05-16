import React from 'react'
import { motion } from 'framer-motion'
import { FiStar, FiGrid, FiArrowRight, FiInfo, FiHome, FiSmile, FiCoffee, FiMoon, FiBriefcase, FiHeart } from 'react-icons/fi'
import { yogaCombinations, roomRecommendations } from '../../data/manaiyadiData'
import vastuDetail from '../../assets/vastu_detail.png'
import relatableArch from '../../assets/blog/gen/blog_architecture_1777306041771.png'

const YogaAndRooms = () => {
  const getRoomIcon = (room) => {
    switch (room) {
      case 'Master Bedroom': return <FiMoon size={24} />;
      case 'Children Room': return <FiSmile size={24} />;
      case 'Living Room': return <FiCoffee size={24} />;
      case 'Kitchen': return <FiHeart size={24} />;
      case 'Puja Room': return <FiHome size={24} />;
      case 'Home Office': return <FiBriefcase size={24} />;
      default: return <FiGrid size={24} />;
    }
  }

  return (
    <div className="space-y-12 md:space-y-48">
      {/* Yoga Collection - SPLIT SCREEN FOR MAXIMUM CLARITY */}
      <section className="bg-[#fdfbf7] border-y border-dark/5 overflow-hidden rounded-[4rem]">
        <div className="flex flex-col lg:flex-row">
          {/* Left: Atmospheric Image Panel */}
          <div className="lg:w-1/3 h-[300px] md:h-[500px] lg:h-auto relative overflow-hidden">
             <img src={vastuDetail} alt="Structural Synergetic" className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-dark/20"></div>
             <div className="absolute top-8 left-8 right-6 md:top-12 md:left-12">
                <h3 className="text-white font-black tracking-[0.5em] uppercase text-[10px] mb-4 px-1">Synergetic</h3>
                <p className="text-white text-3xl md:text-4xl font-black tracking-tighter uppercase leading-none">The Yoga <br/> <span className="italic">Unions.</span></p>
             </div>
          </div>

          {/* Right: Clean, Readable Grid */}
          <div className="lg:w-2/3 py-12 md:py-24 px-6 md:px-16 bg-[#fdfbf7]">
             <div className="max-w-4xl mx-auto">
                <div className="mb-12 md:mb-16">
                  <h3 className="text-secondary font-black tracking-[0.5em] uppercase text-[10px] mb-4 md:mb-6">Synergetic Ratios</h3>
                  <h2 className="text-3xl md:text-6xl font-black text-dark leading-[0.95] tracking-tighter uppercase mb-6">
                    Harmonic <span className="text-primary italic">Pairings.</span>
                  </h2>
                  <p className="text-dark/40 text-base md:text-lg font-light leading-relaxed max-w-xl">
                    For maximum prosperity, both length and width must align. These specific combinations create powerful positive energy fields.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
                  {yogaCombinations.map((yoga, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                      className="bg-white p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-dark/5 hover:border-primary hover:shadow-xl transition-all duration-500 text-center group"
                    >
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary mx-auto mb-4 md:mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                        <FiStar size={16} />
                      </div>
                      <h3 className="text-lg md:text-xl font-black text-dark mb-1 md:mb-2 tracking-tighter group-hover:text-primary transition-colors">{yoga}</h3>
                      <p className="text-[7px] md:text-[8px] font-black uppercase tracking-[0.2em] text-dark/20 group-hover:text-dark/40 transition-colors">Vibrational Union</p>
                    </motion.div>
                  ))}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* REDESIGNED: Modern Room Archetypes - SPLIT SCREEN FOR CONSISTENCY */}
      <section className="bg-white border-y border-dark/5 overflow-hidden rounded-[4rem]">
        <div className="flex flex-col lg:flex-row">
          {/* Left: Cinematic Panel with RELATABLE Architectural Image */}
          <div className="lg:w-1/3 h-[250px] md:h-[600px] lg:h-auto relative overflow-hidden">
             <img src={relatableArch} alt="Home Archetype" className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-dark/20"></div>
             <div className="absolute bottom-8 left-8 right-6 md:bottom-16 md:left-12">
                <h3 className="text-white font-black tracking-[0.5em] uppercase text-[10px] mb-4">Archetypes</h3>
                <p className="text-white text-3xl md:text-4xl font-black tracking-tighter uppercase leading-none break-words">Optimal <br/> <span className="italic">Proportions.</span></p>
             </div>
          </div>

          {/* Right: Clean, High-Contrast Grid */}
          <div className="lg:w-2/3 py-16 md:py-32 px-6 md:px-20 bg-[#fdfbf7]">
             <div className="max-w-5xl mx-auto">
                <div className="mb-12 md:mb-20">
                  <h3 className="text-secondary font-black tracking-[0.5em] uppercase text-[10px] mb-4 md:mb-6">Structural Wisdom</h3>
                  <h2 className="text-3xl md:text-6xl font-black text-dark leading-tight uppercase mb-6 md:mb-8">
                    Space <span className="text-primary italic">Archetypes.</span>
                  </h2>
                  <p className="text-dark/40 text-base md:text-lg font-light leading-relaxed max-w-2xl italic">
                    Specific dimensional pairings curated for individual sanctuary types to maximize energy flow and purpose.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                  {roomRecommendations.map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="p-8 md:p-10 bg-white border border-dark/5 rounded-[2rem] md:rounded-[3rem] hover:shadow-2xl hover:border-primary/20 transition-all duration-500 group relative"
                    >
                      <div className="flex justify-between items-start mb-8 md:mb-10">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-dark text-white flex items-center justify-center group-hover:bg-primary transition-colors duration-500">
                          {getRoomIcon(item.room)}
                        </div>
                        <h4 className="text-secondary font-black uppercase tracking-[0.3em] text-[8px] md:text-[9px] mt-2">{item.room}</h4>
                      </div>
                      
                      <div className="space-y-4 mb-8 md:mb-10">
                        {item.sizes.map((size, si) => (
                          <div key={si} className="text-2xl md:text-3xl font-black text-dark flex items-center justify-between group-hover:text-primary transition-colors tracking-tighter">
                            {size}
                            <FiArrowRight className="text-dark/10 group-hover:text-primary/40 transition-all translate-x-0 group-hover:translate-x-2" size={18} />
                          </div>
                        ))}
                      </div>

                      <div className="pt-6 border-t border-dark/5">
                        <p className="text-sm font-bold text-dark/60 italic leading-snug">
                            "{item.benefit}"
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Important Footnote */}
                <div className="mt-12 md:mt-20 p-8 md:p-10 bg-white border border-dark/5 rounded-[2.5rem] md:rounded-[3rem] flex flex-col md:flex-row items-center gap-8 md:gap-10 shadow-xl">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <FiInfo size={24} />
                  </div>
                  <div className="text-center md:text-left">
                    <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-2 md:mb-3">Measurement Rule</h5>
                    <p className="text-dark/60 font-light text-sm md:text-base leading-relaxed">
                      Measure <span className="font-bold text-dark">internal dimensions only</span>. No living space should be under 6 feet.
                    </p>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default YogaAndRooms
