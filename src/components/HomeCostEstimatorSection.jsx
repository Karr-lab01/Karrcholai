import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiZap } from 'react-icons/fi'
import CostEstimator from './CostEstimator'

export default function HomeCostEstimatorSection() {
  return (
    <section className="py-20 md:py-32 px-4 md:px-6 bg-[#fdfbf7] overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/3 blur-[100px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary font-black text-[10px] uppercase tracking-widest px-4 py-2 rounded-full mb-5">
            <FiZap size={12} />
            Free Tool — No Sign-up
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-dark leading-tight tracking-tighter mb-4">
            How much will your<br />
            <span className="text-primary">home cost to build?</span>
          </h2>
          <p className="text-dark/50 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed">
            Get an instant ₹ estimate tailored to Tamil Nadu — adjust your plot size, floors, finish and city to see a live cost breakdown.
          </p>
        </motion.div>

        {/* Estimator */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <CostEstimator compact />
        </motion.div>

        {/* Footer link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-8"
        >
          <Link to="/cost-estimator"
            className="inline-flex items-center gap-2 text-secondary font-black text-sm uppercase tracking-wider hover:gap-3 transition-all">
            Open full estimator with detailed breakdown
            <FiArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
