import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import welcomeImg from '../../assets/pic3.png'
import pic5 from '../../assets/pic5.png'

const Counter = ({ to, suffix = '' }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = Math.ceil(to / 60)
    const t = setInterval(() => {
      start += step
      if (start >= to) { setCount(to); clearInterval(t) }
      else setCount(start)
    }, 20)
    return () => clearInterval(t)
  }, [inView, to])
  return <span ref={ref}>{count}{suffix}</span>
}

const WelcomeSection = () => {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100])

  return (
    <section ref={sectionRef} className="relative py-16 md:py-32 bg-[#faf6f0] overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px]" />
      
      {/* Geometric Accents */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-white/40 skew-x-[-15deg] translate-x-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* ── Left Content (Text) ── */}
          <div className="lg:col-span-6 space-y-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="w-12 h-[2px] bg-secondary" />
                <span className="text-secondary font-black text-[11px] tracking-[0.4em] uppercase">The Karrcholai Story</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-dark leading-[0.95] mb-6 md:mb-8 italic">
                Crafting <span className="text-primary not-italic">Exceptional</span> <br/>
                Living <span className="text-primary/40 not-italic">Spaces.</span>
              </h2>

              <p className="text-dark/70 text-base md:text-xl font-light leading-relaxed max-w-xl">
                We don't just build structures; we orchestrate environments where memories are made. 
                Based in <span className="text-primary font-bold">Tamil Nadu</span>, our architectural philosophy 
                merges modern discipline with timeless aesthetics.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="grid grid-cols-2 gap-8"
            >
              <div className="border-l-4 border-primary pl-6 py-2">
                <h4 className="text-3xl font-black text-primary mb-1">
                  <Counter to={12} suffix="+" />
                </h4>
                <p className="text-[10px] text-dark/40 font-black tracking-widest uppercase">Years of mastery</p>
              </div>
              <div className="border-l-4 border-secondary pl-6 py-2">
                <h4 className="text-3xl font-black text-secondary mb-1">
                  <Counter to={150} suffix="+" />
                </h4>
                <p className="text-[10px] text-dark/40 font-black tracking-widest uppercase">Visions Realized</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
            >
              <Link to="/about" className="inline-block group">
                <div className="relative flex items-center gap-6 bg-dark text-white px-10 py-5 rounded-full overflow-hidden transition-all duration-500 hover:pr-14">
                  <span className="relative z-10 font-bold tracking-widest uppercase text-xs">Learn More</span>
                  <div className="absolute right-0 top-0 h-full w-0 bg-secondary group-hover:w-full transition-all duration-500" />
                  <svg className="relative z-10 w-5 h-5 transition-transform duration-500 group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* ── Right Content (Interactive Visuals) ── */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] md:aspect-[3/4]">
              {/* Main Image with Parallax */}
              <motion.div 
                style={{ y: y1 }}
                className="absolute inset-0 z-10 rounded-2xl overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)]"
              >
                <img src={welcomeImg} className="w-full h-full object-cover scale-110" alt="Architecture" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
              </motion.div>

              {/* Floating Secondary Image — hidden on small mobile */}
              <motion.div 
                style={{ y: y2 }}
                className="hidden sm:block absolute -right-4 md:-right-10 top-1/2 -translate-y-1/2 w-1/2 aspect-square z-20 rounded-2xl overflow-hidden shadow-2xl border-[8px] md:border-[12px] border-white"
              >
                <img src={pic5} className="w-full h-full object-cover" alt="Detail" />
              </motion.div>

              {/* Rotating Experience Badge */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="hidden sm:flex absolute -left-6 md:-left-12 -bottom-6 md:-bottom-12 z-30 w-28 md:w-40 h-28 md:h-40 items-center justify-center"
              >
                <svg className="w-full h-full text-primary fill-current opacity-90" viewBox="0 0 100 100">
                  <path id="circlePath" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="transparent" />
                  <text className="text-[9.5px] font-black tracking-[3px] uppercase">
                    <textPath xlinkHref="#circlePath">
                      ✦ DISCIPLINE ✦ DESIGN ✦ CONSTRUCTION ✦
                    </textPath>
                  </text>
                </svg>
                <div className="absolute flex flex-col items-center justify-center bg-white w-20 h-20 rounded-full shadow-xl">
                  <span className="text-2xl font-black text-secondary">12</span>
                  <span className="text-[8px] font-black uppercase tracking-tighter">Years</span>
                </div>
              </motion.div>
            </div>

            {/* Decorative background number */}
            <div className="absolute -top-10 -right-10 text-[200px] font-black text-dark/5 select-none pointer-events-none">
              EST.
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default WelcomeSection
