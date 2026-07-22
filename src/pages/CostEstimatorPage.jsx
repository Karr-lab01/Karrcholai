import Navbar from '../components/Navbar'
import UnifiedFooter from '../components/UnifiedFooter'
import CostEstimator from '../components/CostEstimator'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export default function CostEstimatorPage() {
  return (
    <div className="bg-[#fdfbf7] min-h-screen text-dark overflow-x-hidden">
      <Helmet>
        <title>Construction Cost Estimator | Karrcholai</title>
        <meta name="description"
          content="Free instant construction cost estimator for Tamil Nadu homes. Get a detailed ₹ estimate by plot size, floors, finish quality and city — 2025 rates. No sign-up required." />
        <link rel="canonical" href="https://karrcholai-sepia.vercel.app/cost-estimator" />
        <meta property="og:title" content="Construction Cost Estimator | Karrcholai" />
        <meta property="og:description" content="Free instant construction cost estimator for Tamil Nadu homes. Get a detailed ₹ estimate by plot size, floors, finish quality and city — 2025 rates. No sign-up required." />
        <meta property="og:url" content="https://karrcholai-sepia.vercel.app/cost-estimator" />
      </Helmet>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-16 px-6 overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #1a2e20 0%, #2D4B37 60%, #1a1a1a 100%)' }}>
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-secondary/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-white/5 blur-[80px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-secondary font-black tracking-[0.5em] text-[10px] uppercase mb-4">Free Tool</p>
            <h1 className="text-4xl md:text-7xl font-black text-white leading-tight md:leading-none tracking-tighter mb-5">
              Construction<br />
              <span className="text-secondary">Cost Estimator</span>
            </h1>
            <p className="text-white/50 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed mb-6">
              Get an instant ₹ estimate for your home in Tamil Nadu — based on plot size, floors, finish quality and your city. No sign-up needed.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest">
              {['Tamil Nadu Rates', '2025 Updated', 'Instant Results', 'Free'].map(tag => (
                <span key={tag} className="bg-white/10 text-white/70 px-4 py-1.5 rounded-full">{tag}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Estimator */}
      <section className="py-12 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <CostEstimator />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-secondary font-black tracking-widest text-[10px] uppercase mb-3">Next Step</p>
          <h2 className="text-3xl md:text-5xl font-black text-dark leading-tight tracking-tighter mb-5">
            Need a precise quote?
          </h2>
          <p className="text-dark/50 text-base font-light mb-8 leading-relaxed">
            Our estimator gives you a ballpark. Our team gives you an exact number — with a detailed BOQ, timeline, and zero hidden costs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact"
              className="inline-flex items-center gap-2 bg-secondary text-white font-black px-8 py-4 rounded-sm hover:bg-dark transition-colors text-sm uppercase tracking-wider">
              Book Free Consultation <FiArrowRight />
            </Link>
            <Link to="/services"
              className="inline-flex items-center gap-2 border-2 border-dark text-dark font-black px-8 py-4 rounded-sm hover:bg-dark hover:text-white transition-all text-sm uppercase tracking-wider">
              View Our Services
            </Link>
          </div>
        </div>
      </section>

      <UnifiedFooter />
    </div>
  )
}
