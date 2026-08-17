import Navbar from '../components/Navbar'
import UnifiedFooter from '../components/UnifiedFooter'
import CostEstimator from '../components/CostEstimator'
import FAQSection from '../components/FAQSection'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export default function CostEstimatorPage() {
  return (
    <div className="bg-[#fdfbf7] min-h-screen text-dark overflow-x-hidden">
      <Helmet>
        <title>Free Construction Cost Estimator Tamil Nadu | Karrcholai Construction</title>
        <meta name="description"
          content="Free instant construction cost estimator for Tamil Nadu homes. Get a detailed ₹ estimate by plot size, floors, finish quality and city — 2026 rates. Covers Karur, Chennai, Coimbatore, Madurai, Trichy, Erode. No sign-up required." />
        <link rel="canonical" href="https://karrcholai.com/cost-estimator" />
        <meta property="og:title" content="Free Construction Cost Estimator Tamil Nadu 2026 | Karrcholai" />
        <meta property="og:description" content="Free instant construction cost estimator for Tamil Nadu homes. Get a ₹ estimate by plot size, floors, finish quality and city — 2026 rates. No sign-up required." />
        <meta property="og:url" content="https://karrcholai.com/cost-estimator" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://karrcholai.com/" },
            { "@type": "ListItem", "position": 2, "name": "Construction Cost Estimator", "item": "https://karrcholai.com/cost-estimator" }
          ]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Karrcholai Construction Cost Estimator",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "Web",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
          "description": "Free instant construction cost estimator for Tamil Nadu homes. Calculate ₹ estimates by plot size, number of floors, finish quality and city using 2026 construction rates.",
          "provider": { "@type": "Organization", "name": "Karrcholai Construction", "url": "https://karrcholai.com" },
          "url": "https://karrcholai.com/cost-estimator"
        })}</script>
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
            {/* Visually-hidden SEO H1 */}
            <h1 className="sr-only">Free Construction Cost Estimator for Tamil Nadu Homes — 2026 Rates</h1>
            <p aria-hidden="true" className="text-4xl md:text-7xl font-black text-white leading-tight md:leading-none tracking-tighter mb-5">
              Construction<br />
              <span className="text-secondary">Cost Estimator</span>
            </p>
            <p className="text-white/50 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed mb-6">
              Get an instant ₹ estimate for your home in Tamil Nadu — based on plot size, floors, finish quality and your city. No sign-up needed.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest">
              {['Tamil Nadu Rates', '2026 Updated', 'Instant Results', 'Free'].map(tag => (
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

      {/* Topical cluster: Cost Estimator → Residential Construction → Projects → Contact */}
      <section className="py-12 px-6 bg-[#faf9f6] border-t border-black/5">
        <div className="max-w-4xl mx-auto">
          <p className="text-[9px] font-black tracking-[0.5em] uppercase text-dark/25 mb-5">Continue Your Planning Journey</p>
          <div className="flex flex-wrap items-center gap-3">
            {[
              { to: '/karr',          emoji: '🏗️', label: 'Residential Construction', title: 'Karr Division',       bg: 'linear-gradient(135deg, #2D4B37, #1a2e1a)', accent: '#B85C38' },
              { to: '/projects',      emoji: '🏠', label: 'Our Portfolio',             title: 'View Projects',       bg: 'linear-gradient(135deg, #2a2a2a, #1a1a1a)', accent: 'rgba(255,255,255,0.4)' },
              { to: '/vastu-compass', emoji: '🧭', label: 'Free Tool',                 title: 'Vastu Compass',       bg: 'linear-gradient(135deg, #1a2e1a, #0d1a0d)', accent: '#d4af37' },
              { to: '/contact',       emoji: '📞', label: 'Free Consultation',          title: 'Talk to Karrcholai', bg: '#1A1A1A', accent: 'rgba(255,255,255,0.35)' },
            ].map((cl, idx, arr) => (
              <span key={cl.to} className="flex items-center gap-3">
                <Link to={cl.to}
                  className="flex items-center gap-3 no-underline rounded-xl px-4 py-3 transition-opacity hover:opacity-80"
                  style={{ background: cl.bg, textDecoration: 'none' }}>
                  <span className="text-lg">{cl.emoji}</span>
                  <span>
                    <span className="block text-[7px] font-black tracking-[0.35em] uppercase mb-0.5" style={{ color: cl.accent }}>{cl.label}</span>
                    <span className="block text-[12px] font-bold text-white whitespace-nowrap">{cl.title}</span>
                  </span>
                </Link>
                {idx < arr.length - 1 && <span className="text-dark/20 font-black text-xs">→</span>}
              </span>
            ))}
          </div>
        </div>
      </section>

      <FAQSection
        accent="#2D4B37"
        subtitle="Cost FAQ"
        title="Your Construction Cost Questions, Answered"
        faqs={[
          {
            q: 'How much does it cost to construct a house in Tamil Nadu?',
            a: 'Construction costs in Tamil Nadu typically range from ₹1,800 to ₹3,500+ per sq ft depending on location, finish quality, and design complexity. A standard finish in Karur or Trichy may cost ₹1,800–₹2,200/sqft, while premium finishes in Chennai or Coimbatore can reach ₹2,800–₹3,500+/sqft. Use our estimator above for a quick personalised ballpark.',
          },
          {
            q: 'What is included in the per-square-foot cost?',
            a: 'The per-sqft rate typically covers structural work (foundation, columns, beams, roof slab), brickwork, plastering, flooring, basic electrical and plumbing, doors and windows, and standard interior finishes. Items like landscaping, solar panels, modular kitchen, and premium fittings are usually priced separately.',
          },
          {
            q: 'Does the estimate include GST and approval fees?',
            a: 'Our estimator gives a construction cost estimate. Government approval fees (CMDA/DTCP/panchayat), architect fees, soil testing, and GST on materials are separate and vary by location. We include these in the detailed BOQ we prepare during consultation.',
          },
          {
            q: 'How accurate is the online estimator?',
            a: 'The estimator provides a reliable ±15% ballpark based on current 2026 Tamil Nadu market rates. For a precise quote with a full Bill of Quantities (BOQ) and milestone payment schedule, book a free consultation with our team.',
          },
          {
            q: 'Can I reduce construction costs without compromising quality?',
            a: 'Yes. Smart choices in material sourcing, phased construction, and early planning significantly reduce costs. Our PMC service specifically helps clients optimise budgets through transparent contractor rates, bulk material procurement, and tight quality supervision.',
          },
          {
            q: 'Do construction costs vary between cities in Tamil Nadu?',
            a: 'Yes. Chennai and Coimbatore typically cost 10–20% more than Karur, Trichy, or Erode due to higher labour and logistics costs. Our estimator adjusts rates by city — select your location for a more accurate figure.',
          },
        ]}
      />

      <UnifiedFooter />
    </div>
  )
}
