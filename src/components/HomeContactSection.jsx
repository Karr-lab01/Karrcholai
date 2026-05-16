import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPhone, FiMail, FiMapPin, FiClock, FiSend, FiArrowRight } from 'react-icons/fi'

const FOREST = '#3F5F4A'
const TERRA = '#C9754A'
const CREAM = '#F5F2EC'
const DARK = '#1C1C1A'

const inpClass = `w-full px-5 py-4 rounded-2xl text-sm font-medium outline-none transition-all duration-300 border-2 border-transparent bg-white focus:bg-white focus:border-[#C9754A] shadow-sm`

const Field = ({ label, children }) => (
  <div className="flex flex-col gap-2">
    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-dark/40 ml-1">{label}</label>
    {children}
  </div>
)

const HomeContactSection = () => {
  const [sent, setSent] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section className="py-24 md:py-32 bg-[#F5F2EC] relative overflow-hidden">
      {/* Decorative background text */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 opacity-[0.02] pointer-events-none select-none hidden lg:block">
        <span className="text-[15rem] font-black uppercase tracking-tighter leading-none -rotate-90 origin-center">TALK</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-start">
          
          {/* Left Side: Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 bg-white/40 backdrop-blur-md p-8 md:p-12 rounded-[3rem] border border-white/50 shadow-xl"
          >
            <div className="mb-10">
              <div className="flex items-center gap-4 mb-4">
                <span className="w-12 h-px bg-secondary" />
                <span className="text-secondary font-black text-[10px] tracking-[0.4em] uppercase">Connect With Us</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-dark leading-tight">
                Let's <span className="italic text-secondary">Collaborate</span> On Your Vision.
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="Full Name">
                  <input type="text" placeholder="John Doe" className={inpClass} required />
                </Field>
                <Field label="Email Address">
                  <input type="email" placeholder="john@example.com" className={inpClass} required />
                </Field>
                <Field label="Phone Number">
                  <input type="tel" placeholder="+91 98765 43210" className={inpClass} />
                </Field>
                <Field label="Project Type">
                  <select className={inpClass} style={{ appearance: 'none' }}>
                    <option>Residential Construction</option>
                    <option>Project Management</option>
                    <option>Sustainable Design</option>
                    <option>Renovation</option>
                  </select>
                </Field>
              </div>
              <Field label="Message">
                <textarea rows={4} placeholder="Tell us about your project..." className={inpClass + ' resize-none'} required />
              </Field>
              
              <motion.button 
                type="submit" 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
                className="w-full py-5 rounded-2xl font-black text-xs tracking-[0.3em] uppercase text-white flex items-center justify-center gap-3 transition-all duration-500 shadow-lg"
                style={{ 
                  background: sent ? '#3F5F4A' : `linear-gradient(135deg, ${TERRA}, ${FOREST})`,
                  boxShadow: `0 10px 30px ${sent ? 'rgba(63,95,74,0.3)' : 'rgba(201,117,74,0.3)'}` 
                }}
              >
                {sent ? (
                  <span className="flex items-center gap-2">Message Sent Successfully <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}>✓</motion.span></span>
                ) : (
                  <><FiSend size={16} /> Send Inquiry</>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Right Side: Info */}
          <div className="lg:col-span-5 space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-[10px] font-black tracking-[0.4em] uppercase text-dark/40 mb-8 ml-1">Contact Details</h3>
              <div className="space-y-8">
                {[
                  { icon: FiPhone, label: 'Call Us', value: '+91 97414 16747', color: TERRA },
                  { icon: FiMail, label: 'Email Us', value: 'karrcholai@gmail.com', color: FOREST },
                  { icon: FiMapPin, label: 'Visit Us', value: '5/20, Puliyampatti, Karur - 639 206', color: '#8B7355' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-500 group-hover:scale-110"
                      style={{ background: `${item.color}10`, border: `1px solid ${item.color}20` }}>
                      <item.icon size={20} style={{ color: item.color }} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black tracking-[0.2em] uppercase text-dark/30 mb-1">{item.label}</p>
                      <p className="text-lg font-bold text-dark">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-dark p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <FiClock size={80} />
              </div>
              <div className="relative z-10">
                <h4 className="text-xs font-black tracking-[0.3em] uppercase text-secondary mb-6">Office Hours</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <span className="text-sm font-light text-white/50">Mon – Fri</span>
                    <span className="text-sm font-bold">9:00 AM – 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <span className="text-sm font-light text-white/50">Sat</span>
                    <span className="text-sm font-bold">10:00 AM – 4:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-light text-white/50">Sun</span>
                    <span className="text-sm font-bold text-secondary/50">Closed</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default HomeContactSection
