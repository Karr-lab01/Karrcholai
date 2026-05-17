import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import WelcomeSection from '../components/WelcomeSection'
import KarrHomeSection from '../components/KarrHomeSection'
import CholaiHomeSection from '../components/CholaiHomeSection'
import ServicesSection from '../components/ServicesSection'
import WhyChooseUs from '../components/WhyChooseUs'

import HomeBlogSection from '../components/HomeBlogSection'
import HomeManaiadiSection from '../components/HomeManaiadiSection'
import FootprintMapSection from '../components/FootprintMapSection'
import HomeProjectsSection from '../components/HomeProjectsSection'
import UnifiedFooter from '../components/UnifiedFooter'
import { Helmet } from 'react-helmet-async'

const Home = () => {
  return (
    <div className="font-sans text-dark min-h-screen overflow-x-hidden">
      <Helmet>
        <title>Karrcholai | Premium Residential Construction in Tamil Nadu</title>
        <meta name="description" content="Karrcholai is a premier residential construction company in Tamil Nadu. We specialise in custom home building, renovation, interior design, and sustainable building." />
        <link rel="canonical" href="https://karrcholai.com/" />
      </Helmet>
      <Navbar />

      {/* ── Hero ── */}
      <section id="home">
        <HeroSection />
      </section>


      {/* ── Welcome / About intro ── */}
      <section id="about">
        <WelcomeSection />
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




      <UnifiedFooter />

      {/* ── Decorative gradient orbs ── */}
      <div className="fixed bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="fixed top-[20%] left-[-10%] w-[400px] h-[400px] bg-primary/5 blur-[100px] rounded-full pointer-events-none -z-10" />
    </div>
  )
}

export default Home
