import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { id: 1, value: "12+", label: "Years Experience" },
  { id: 2, value: "40+", label: "Projects Completed" },
  { id: 3, value: "100%", label: "Client Satisfaction" },
  { id: 4, value: "24/7", label: "Project Support" }
];

const StatsSection = () => {
  return (
    <section className="relative z-20 max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-16">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-white/80 backdrop-blur-lg border border-white/50 rounded-2xl shadow-[0_15px_35px_-10px_rgba(0,0,0,0.1)] overflow-hidden"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 divide-x-0 md:divide-x divide-black/5">
          {stats.map((stat, index) => (
            <div 
              key={stat.id}
              className="py-6 md:py-8 px-4 flex flex-col items-center justify-center text-center group hover:bg-white/40 transition-colors duration-500"
            >
              <div className="text-3xl md:text-4xl font-black text-[#1a1a1a] mb-1 tracking-tight group-hover:text-[#B85C38] transition-colors duration-500">
                {stat.value}
              </div>
              <div className="text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase text-[#1a1a1a]/50 group-hover:text-[#1a1a1a]/80 transition-colors duration-500">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default StatsSection;
