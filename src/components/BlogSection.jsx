import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { blogPosts } from '../data/blogData';

const BlogSection = () => {
  const displayPosts = blogPosts.slice(0, 3);
  return (
    <section id="insights" className="py-24 md:py-32 bg-[#FAF6F0] relative overflow-hidden">
      {/* Decorative Watermark */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none select-none hidden lg:block">
        <span className="text-[200px] font-black uppercase rotate-90 inline-block">Journal</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-8"
            >
              <span className="w-12 h-[1px] bg-secondary" />
              <span className="text-secondary font-black text-[10px] tracking-[0.6em] uppercase">The Karrcholai Journal</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl font-black text-dark uppercase tracking-tight leading-[0.95]"
            >
              Insights & <br />
              <span className="italic font-light text-secondary/40">Architectural Lore.</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link to="/blog" className="group flex items-center gap-6 text-dark hover:text-secondary transition-all py-2">
              <span className="text-[10px] font-black tracking-[0.4em] uppercase">Enter Journal</span>
              <div className="w-12 h-12 rounded-full border border-dark/10 flex items-center justify-center group-hover:border-secondary group-hover:bg-secondary/5 transition-all">
                <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                  <path d="M1 13L13 1M13 1H1M13 1V13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {displayPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group cursor-pointer flex flex-col"
            >
              {/* Image Container */}
              <Link to={`/blog/${post.id}`} className="relative aspect-[4/5] overflow-hidden mb-10 rounded-sm shadow-sm">
                <motion.img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-700" />
              </Link>

              {/* Content */}
              <div className="flex flex-col flex-grow">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-secondary font-bold text-[9px] tracking-[0.3em] uppercase">{post.category}</span>
                  <div className="w-1 h-1 rounded-full bg-dark/10" />
                  <span className="text-dark/30 text-[9px] font-bold tracking-widest uppercase">{post.date}</span>
                </div>

                <Link to={`/blog/${post.id}`}>
                  <h3 className="text-2xl font-black text-dark group-hover:text-secondary transition-colors duration-500 leading-tight mb-6 uppercase tracking-tight line-clamp-2">
                    {post.title}
                  </h3>
                </Link>

                <p className="text-dark/50 text-sm font-light leading-relaxed mb-8 line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="mt-auto">
                  <Link 
                    to={`/blog/${post.id}`}
                    className="inline-flex items-center gap-4 text-[9px] font-black tracking-[0.4em] uppercase text-dark/40 group-hover:text-secondary transition-all"
                  >
                    Read Story
                    <FiArrowRight className="transform transition-transform group-hover:translate-x-2 text-secondary" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BlogSection;
