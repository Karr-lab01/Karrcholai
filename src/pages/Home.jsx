import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import WelcomeSection from '../components/WelcomeSection'
import HomeFounderSection from '../components/HomeFounderSection'
import KarrCholaiSection from '../components/KarrCholaiSection'
import ServicesSection from '../components/ServicesSection'
import WhyChooseUs from '../components/WhyChooseUs'
import HighlightsSection from '../components/HighlightsSection'
import BlogSection from '../components/BlogSection'
import VideoShowcase from '../components/VideoShowcase'
import QualityShowcase from '../components/QualityShowcase'
import FootprintMapSection from '../components/FootprintMapSection'
import UnifiedFooter from '../components/UnifiedFooter'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'


const Home = () => {
  return (
    <div className="font-sans text-dark min-h-screen overflow-x-hidden">
      <Navbar />

      {/* ── Hero ── */}
      <section id="home">
        <HeroSection />
      </section>


      {/* ── Welcome / About intro ── */}
      <section id="about">
        <WelcomeSection />
        <HomeFounderSection />
      </section>

      {/* ── Video Showcase ── */}
      <VideoShowcase />

      {/* ── Services ── */}
      <section id="services">
        <ServicesSection />
      </section>

      {/* ── Karr & Cholai split ── */}
      <section id="karr-cholai">
        <KarrCholaiSection />
      </section>

      <FootprintMapSection />

      {/* ── Why Choose Us ── */}
      <section id="why-us">
        <WhyChooseUs />
      </section>

      {/* ── Quality Showcase Video ── */}
      <QualityShowcase />

      {/* ── Highlights ── */}
      <section id="projects">
        <HighlightsSection />
      </section>

      {/* ── Blog / Insights ── */}
      <BlogSection />

      {/* ── Compact Sleek CTA ── */}
      <section className="bg-white py-20 border-y border-dark/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 lg:gap-24">
            
            {/* Left: Content */}
            <div className="max-w-xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 mb-6"
              >
                <span className="w-10 h-[1px] bg-secondary" />
                <span className="text-secondary font-black text-[10px] tracking-[0.4em] uppercase">Let's Collaborate</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl md:text-4xl font-bold text-dark font-serif leading-tight mb-4"
              >
                Ready to build your <span className="italic text-primary">vision?</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-dark/50 text-sm md:text-base font-light leading-relaxed"
              >
                Transforming complex ideas into structured reality. Join us for a 
                strategic consultation to map out your project's future.
              </motion.p>
            </div>

            {/* Right: Actions */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-6"
            >
              <Link to="/contact">
                <button className="px-8 py-4 bg-dark text-white text-[11px] font-black tracking-[0.2em] uppercase hover:bg-secondary transition-all duration-300">
                  Book Consultation
                </button>
              </Link>
              
              <Link to="/services">
                <button className="group flex items-center gap-4 text-dark hover:text-secondary transition-colors py-2">
                  <span className="text-[11px] font-black tracking-[0.2em] uppercase">Our Approach</span>
                  <div className="w-10 h-10 rounded-full border border-dark/10 flex items-center justify-center group-hover:border-secondary group-hover:bg-secondary/5 transition-all">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M1 13L13 1M13 1H1M13 1V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </button>
              </Link>
            </motion.div>

          </div>
        </div>
      </section>

      <UnifiedFooter />

      {/* ── Decorative gradient orbs ── */}
      <div className="fixed bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="fixed top-[20%] left-[-10%] w-[400px] h-[400px] bg-primary/5 blur-[100px] rounded-full pointer-events-none -z-10" />
    </div>
  )
}

export default Home
