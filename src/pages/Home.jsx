import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import WelcomeSection from '../components/WelcomeSection'
import StatsSection from '../components/StatsSection'
import KarrHomeSection from '../components/KarrHomeSection'
import CholaiHomeSection from '../components/CholaiHomeSection'
import WhyChooseUs from '../components/WhyChooseUs'
import HomeBlogSection from '../components/HomeBlogSection'
import HomeManaiadiSection from '../components/HomeManaiadiSection'
import HomeCostEstimatorSection from '../components/HomeCostEstimatorSection'
import FootprintMapSection from '../components/FootprintMapSection'
import HomeProjectsSection from '../components/HomeProjectsSection'
import UnifiedFooter from '../components/UnifiedFooter'
import { Helmet } from 'react-helmet-async'

const Home = () => {
 return (
 <div className="font-sans text-dark min-h-screen overflow-x-hidden">
 <Helmet>
 <title>Karrcholai | Residential Construction Company &amp; PMC in Tamil Nadu</title>
 <meta name="description" content="Karrcholai Construction — residential construction company &amp; PMC in Tamil Nadu. Custom homes, renovation, landscape, solar energy &amp; rainwater harvesting. Free Vastu compass &amp; Manaiyadi Sastram tools. Serving Chennai, Karur, Coimbatore, Madurai." />
 <link rel="canonical" href="https://karrcholai.com/" />
 <meta property="og:title" content="Karrcholai | Residential Construction Company &amp; PMC in Tamil Nadu" />
 <meta property="og:description" content="Full-service residential construction &amp; PMC in Tamil Nadu — custom homes, renovation, landscape, solar energy, rainwater harvesting. Plus free Vastu compass &amp; Manaiyadi Sastram calculator." />
 <meta property="og:url" content="https://karrcholai.com/" />
 </Helmet>
 <Navbar />

 {/* ── Hero ── */}
 <section id="home">
 <HeroSection />
 </section>

 {/* ── Stats ── */}
 <section id="stats">
 <StatsSection />
 </section>


 {/* ── Welcome / About intro ── */}
 <section id="about">
 <WelcomeSection />
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

 {/* ── Cost Estimator ── */}
 <section id="cost-estimator">
 <HomeCostEstimatorSection />
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
