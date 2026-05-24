import React, { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'
import UnifiedFooter from '../components/UnifiedFooter'
import { FaLeaf, FaCloudRain, FaSun, FaRecycle, FaArrowRight } from 'react-icons/fa'

// Images from the assets folder
import landscapeImg from '../assets/cholai/landscape.png'
import landscape1 from '../assets/cholai/landscape_1.jpg'
import landscape3 from '../assets/cholai/landscape_3.jpg'
import rainwaterImg from '../assets/cholai/rainwater.png'
import rainwater1 from '../assets/cholai/rainwater_1.jpg'
import rainwater2 from '../assets/cholai/rainwater_2.jpg'
import solarImg from '../assets/cholai/solar.png'
import solar1 from '../assets/cholai/solar_image.jpg'
import wasteImg from '../assets/cholai/waste.png'
import cholaiVideo from '../assets/cholai/cholai_video.mp4'
import { Helmet } from 'react-helmet-async'

const Cholai = () => {
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const [landscapeIdx, setLandscapeIdx] = useState(0)
  const [rainwaterIdx, setRainwaterIdx] = useState(0)
  const [solarIdx, setSolarIdx] = useState(0)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5
    }
    const interval = setInterval(() => {
      setLandscapeIdx(prev => (prev + 1) % 3)
      setRainwaterIdx(prev => (prev + 1) % 3)
      setSolarIdx(prev => (prev + 1) % 2)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const y1 = useTransform(scrollYProgress, [0, 0.5], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  const services = [
    {
      id: "landscape",
      title: "Landscape Development",
      subtitle: "Integrated Outdoor Design",
      description: "We plan and develop outdoor spaces that improve the appearance and environmental value of residential properties — combining practical layout with native planting and green area planning.",
      images: [landscapeImg, landscape1, landscape3],
      items: ["Garden Planning & Development", "Landscape Design", "Green Space Planning"],
      icon: <FaLeaf />,
      color: "from-green-500/20 to-emerald-500/20"
    },
    {
      id: "rainwater",
      title: "Rainwater Harvesting",
      subtitle: "Water Conservation Systems",
      description: "Rainwater harvesting reduces water dependency and supports groundwater recharge. We design and install collection systems suited to your site layout and water requirements.",
      images: [rainwaterImg, rainwater1, rainwater2],
      items: ["Rainwater Collection Systems", "Groundwater Recharge Solutions", "Water Conservation Planning"],
      icon: <FaCloudRain />,
      color: "from-blue-500/20 to-cyan-500/20"
    },
    {
      id: "solar",
      title: "Solar Energy Solutions",
      subtitle: "Renewable Energy for Homes",
      description: "Solar installations help homeowners reduce electricity costs and dependence on grid power. We plan and integrate solar systems based on your roof layout and energy needs.",
      images: [solarImg, solar1],
      items: ["Solar Panel Installation", "System Planning & Design", "Renewable Energy Integration"],
      icon: <FaSun />,
      color: "from-yellow-500/20 to-orange-500/20"
    },
    {
      id: "waste",
      title: "Waste Management",
      subtitle: "Responsible Waste Systems",
      description: "Proper waste management keeps homes cleaner and reduces environmental impact. We design segregation and composting systems suited to residential use and local requirements.",
      image: wasteImg,
      items: ["Waste Segregation Systems", "Composting Solutions", "Sustainable Waste Planning"],
      icon: <FaRecycle />,
      color: "from-brown-500/20 to-stone-500/20"
    }
  ]

  return (
    <div ref={containerRef} className="bg-[#fcfcf9] min-h-screen text-dark selection:bg-secondary selection:text-white overflow-x-hidden">
      <Helmet>
        <title>Cholai | Sustainable Home Solutions in Tamil Nadu</title>
        <meta name="description" content="Cholai is the sustainability division of Karrcholai — landscape development, rainwater harvesting, solar energy, and waste management for residential properties." />
        <link rel="canonical" href="https://karrcholai.com/cholai" />
      </Helmet>
      <Navbar />

      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-secondary z-[100] origin-left"
        style={{ scaleX }}
      />

      <main>
        {/* --- HERO SECTION --- */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-dark">
          <motion.div 
            style={{ y: y1, opacity }}
            className="absolute inset-0 z-0"
          >
            <video 
              ref={videoRef}
              autoPlay 
              loop 
              muted 
              playsInline 
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={cholaiVideo} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-dark" />
          </motion.div>

          <div className="relative z-10 text-center px-4 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <h2 className="text-secondary font-black tracking-[0.4em] uppercase text-[10px] md:text-sm mb-4 md:mb-6 block">Sustainable Living</h2>
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-[0.95] mb-6 md:mb-8">
                CHOLAI <br className="md:hidden" /> <span className="text-transparent stroke-text italic">Solutions</span>
              </h1>
              <div className="flex items-center justify-center gap-3 md:gap-4 mb-6 md:mb-8">
                <div className="h-[1px] w-8 md:w-12 bg-secondary/50" />
                <p className="text-white/70 text-[10px] md:text-lg font-light tracking-[0.2em] uppercase max-w-[250px] md:max-w-2xl">
                  Sustainable solutions for homes — landscape, water, energy, and waste management across Tamil Nadu
                </p>
                <div className="h-[1px] w-8 md:w-12 bg-secondary/50" />
              </div>
            </motion.div>
          </div>

          {/* Decorative Scroll Indicator */}
          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          >
            <span className="text-white/30 text-[9px] uppercase tracking-[0.4em] font-bold">Discover</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-secondary to-transparent" />
          </motion.div>
        </section>

        {/* --- INTRODUCTION --- */}
        <section className="py-24 px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-secondary text-[11px] font-black uppercase tracking-[0.4em] mb-6 flex items-center justify-center gap-4">
                <span className="w-8 h-[1px] bg-secondary" />
                Our Mission
                <span className="w-8 h-[1px] bg-secondary" />
              </p>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-dark leading-[1.2] md:leading-[1.1] mb-8 italic max-w-5xl mx-auto">
                The Cholai division delivers
                <span className="text-primary not-italic"> practical, environmentally responsible </span>
                <span className="text-primary/40 not-italic">solutions for residential properties.</span>
              </h2>
              <p className="text-dark/60 text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto mb-8">
                From outdoor landscaping and rainwater systems to solar energy and waste management — we help homeowners build and maintain homes that are functional, sustainable, and suited to Tamil Nadu's climate.
              </p>
              <div className="w-20 h-1 bg-secondary/20 mx-auto" />
            </motion.div>
          </div>
        </section>

        {/* --- SERVICES SECTIONS --- */}
        <div className="space-y-0">
          {services.map((service, index) => (
            <section 
              key={service.id}
              id={service.id}
              className={`py-24 md:py-40 px-6 relative overflow-hidden ${index % 2 === 1 ? 'bg-white' : 'bg-[#fafafa]'}`}
            >
              <div className="container mx-auto max-w-7xl">
                <div className={`flex flex-col-reverse ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-24`}>
                  
                  {/* Content Side */}
                  <div className="w-full md:w-1/2">
                    <motion.div
                      initial={{ opacity: 0, x: index % 2 === 1 ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                          {service.icon}
                        </div>
                        <span className="text-secondary font-black text-[10px] tracking-[0.4em] uppercase">{service.subtitle}</span>
                      </div>

                      <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-dark leading-[0.95] mb-6 md:mb-8">
                        {service.title.split(' ')[0]} <br className="hidden md:block" />
                        <span className="text-primary/40">{service.title.split(' ').slice(1).join(' ')}</span>
                      </h3>
                      
                      <p className="text-dark/60 text-lg font-light leading-relaxed mb-10 max-w-xl">
                        {service.description}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                        {service.items.map((item, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                            <span className="text-[10px] font-black text-dark/40 tracking-[0.2em] uppercase">{item}</span>
                          </div>
                        ))}
                      </div>

                      <motion.button
                        whileHover={{ x: 10 }}
                        className="group flex items-center gap-4 text-dark font-bold text-xs tracking-[0.2em] uppercase"
                      >
                        Learn More <FaArrowRight className="text-secondary group-hover:translate-x-2 transition-transform" />
                      </motion.button>
                    </motion.div>
                  </div>

                  {/* Image Side */}
                  <div className="w-full md:w-1/2">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="relative group"
                    >
                      {/* Decorative Background Shape */}
                      <div className={`absolute -inset-4 bg-gradient-to-br ${service.color} rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                      
                      <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-dark/5 bg-white">
                        <AnimatePresence>
                          <motion.img 
                            key={
                              service.id === 'landscape' ? `img-l-${landscapeIdx}` : 
                              service.id === 'rainwater' ? `img-r-${rainwaterIdx}` : 
                              service.id === 'solar' ? `img-s-${solarIdx}` : 
                              'static'
                            }
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            src={
                              service.id === 'landscape' ? service.images[landscapeIdx] : 
                              service.id === 'rainwater' ? service.images[rainwaterIdx] : 
                              service.id === 'solar' ? service.images[solarIdx] : 
                              service.image
                            } 
                            alt={service.title} 
                            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                          />
                        </AnimatePresence>
                        <div className="absolute inset-0 bg-dark/5 group-hover:bg-transparent transition-colors duration-700" />
                      </div>

                      {/* Floating Badge */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="absolute -bottom-6 -right-6 md:right-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-dark/5 hidden sm:block"
                      >
                        <p className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] mb-1">Impact</p>
                        <p className="text-sm font-bold text-dark uppercase tracking-widest">Eco-Conscious Design</p>
                      </motion.div>
                    </motion.div>
                  </div>

                </div>
              </div>

              {/* Background Text Accent */}
              {service.id !== 'landscape' && service.id !== 'rainwater' && (
                <div className={`absolute top-1/2 -translate-y-1/2 ${index % 2 === 1 ? 'left-10' : 'right-10'} opacity-[0.03] pointer-events-none hidden lg:block`}>
                  <span className="text-[15rem] font-black uppercase tracking-tighter text-dark select-none">
                    {service.id.slice(0, 4)}
                  </span>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* --- CALL TO ACTION --- */}
        <section className="py-24 md:py-40 bg-dark text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
          
          {/* Animated Background Orbs */}
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-secondary/10 blur-[150px] rounded-full pointer-events-none"
          />
          <motion.div 
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none"
          />

          <div className="container mx-auto max-w-4xl px-6 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-3xl md:text-5xl lg:text-7xl font-black mb-10 leading-[1.1] md:leading-[0.95] tracking-tighter">
                Ready to upgrade <br className="hidden md:block" />
                your home with <br className="hidden md:block" />
                <span className="font-black italic text-secondary">sustainable solutions?</span>
              </h3>
              
              <p className="text-white/50 text-lg font-light mb-12 max-w-2xl mx-auto leading-relaxed">
                Whether you are building new or improving an existing property, we will assess your site and recommend practical solutions for landscape, water, energy, and waste management.
              </p>

              <div className="flex flex-wrap justify-center gap-6">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-secondary text-white px-10 py-5 text-xs font-black uppercase tracking-[0.2em] rounded-sm shadow-xl hover:bg-white hover:text-dark transition-all duration-300"
                >
                  Book a Consultation
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border border-white/20 text-white px-10 py-5 text-xs font-black uppercase tracking-[0.2em] rounded-sm hover:bg-white/5 transition-all duration-300"
                >
                  View Case Studies
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <UnifiedFooter />

    </div>
  )
}

export default Cholai
