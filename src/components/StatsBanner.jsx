import { motion } from 'framer-motion'

const stats = [
  { value: '12+', label: 'Years Experience' },
  { value: '40+', label: 'Projects Completed' },
  { value: '100%', label: 'Client Satisfaction' },
  { value: '24/7', label: 'Project Support' },
]

const StatsBanner = () => {
  return (
    <section className="bg-[#F5F2EC] py-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="max-w-4xl mx-auto bg-white rounded-xl shadow-md px-6 py-8 grid grid-cols-2 sm:grid-cols-4 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-gray-100"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
            className="flex flex-col items-center justify-center text-center py-4 sm:py-0 px-4"
          >
            <span className="text-3xl sm:text-4xl font-black text-[#1a1a1a] tracking-tight leading-none">
              {stat.value}
            </span>
            <span className="mt-1.5 text-[10px] sm:text-[11px] font-bold tracking-[0.18em] uppercase text-gray-400">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export default StatsBanner
