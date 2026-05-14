import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import WelcomeSection from '../components/WelcomeSection'
import HomeFounderSection from '../components/HomeFounderSection'
import KarrHomeSection from '../components/KarrHomeSection'
import CholaiHomeSection from '../components/CholaiHomeSection'
import ServicesSection from '../components/ServicesSection'
import WhyChooseUs from '../components/WhyChooseUs'

import HomeBlogSection from '../components/HomeBlogSection'
import HomeManaiadiSection from '../components/HomeManaiadiSection'
import FootprintMapSection from '../components/FootprintMapSection'
import HomeProjectsSection from '../components/HomeProjectsSection'
import HomeContactSection from '../components/HomeContactSection'
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

      {/* ── Services ── */}
      <section id="services">
        <ServicesSection />
      </section>

      {/* ── Divisions ── */}
      <section id="divisions">
        <KarrHomeSection />
        <CholaiHomeSection />
      </section>

      <FootprintMapSection />

      {/* ── Projects ── */}
      <section id="projects">
        <HomeProjectsSection />
      </section>

      {/* ── Why Choose Us ── */}
      <section id="why-us">
        <WhyChooseUs />
      </section>

      {/* ── Manaiyadi Section ── */}
      <section id="manaiyadi">
        <HomeManaiadiSection />
      </section>

      {/* ── Blog / Insights ── */}
      <section id="blog">
        <HomeBlogSection />
      </section>



      {/* ── Contact Section ── */}
      <section id="contact">
        <HomeContactSection />
      </section>

      <UnifiedFooter />

      {/* ── Decorative gradient orbs ── */}
      <div className="fixed bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="fixed top-[20%] left-[-10%] w-[400px] h-[400px] bg-primary/5 blur-[100px] rounded-full pointer-events-none -z-10" />
    </div>
  )
}

export default Home
