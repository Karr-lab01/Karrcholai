import React from 'react'
import { motion } from 'framer-motion'
import founderImg from '../../assets/Founder.jpeg'
import courtyardImg from '../../assets/img1.jpg'

const HomeFounderSection = () => {
  return (
    <div className="bg-[#fcfbfa] paper-texture">
      
      {/* ── 1. MEET THE FOUNDER ── */}
      <section className="py-20 md:py-32 px-6">
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

            {/* Typography */}
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
                    For me, construction is not only about creating structures — it is about creating spaces for life. A home must be strong in its foundation, clear in planning, practical in execution, and peaceful for the people who live in it. This belief became the reason for starting <span className="text-secondary">Karrcholai Construction.</span>
                  </p>
                  <p>
                    The name Karrcholai comes from two ideas — <strong className="text-[#4a3b32] font-bold">Karr</strong>, meaning stone, and <strong className="text-[#4a3b32] font-bold">Cholai</strong>, meaning oasis. Together, they represent my vision: <strong className="text-[#4a3b32] font-bold">strong construction with peaceful living.</strong>
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. MY THOUGHT ON CONSTRUCTION ── */}
      <section className="py-20 md:py-32 px-6 border-t border-dark/5">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col-reverse md:flex-row gap-12 md:gap-20 items-center">
            
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
                    Construction is not just about building a structure. It is about creating a space where life happens. A good house should not depend only on design.
                  </p>
                  <p>
                    It must have a strong foundation, proper planning, correct materials, and disciplined execution. I believe in practical buildings rather than decorative buildings.
                  </p>
                  <p>
                    My goal in every project is simple — to build with responsibility, clarity, and long-term thinking for the families that trust us.
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="w-full md:w-6/12 relative">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="aspect-[4/5] md:aspect-square overflow-hidden relative group rounded-[1.5rem] border border-[#4a3b32]/10 shadow-xl"
              >
                <img 
                  src={courtyardImg} 
                  alt="Courtyard Construction" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </motion.div>
            </div>

          </div>
        </div>
      </section>



    </div>
  )
}

export default HomeFounderSection
