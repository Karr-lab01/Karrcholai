import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { blogPosts } from '../data/blogData';

const HomeBlogSection = () => {
  // Show only 2 blogs as requested
  const displayPosts = blogPosts.slice(0, 2);

  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Decorative text background */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 opacity-[0.02] pointer-events-none select-none">
        <span className="text-[20rem] font-black uppercase tracking-tighter leading-none">BLOGS</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="w-12 h-[1px] bg-secondary" />
              <span className="text-secondary font-black text-[10px] tracking-[0.4em] uppercase">Latest Stories</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-7xl font-black text-dark leading-[0.9] tracking-tighter uppercase"
            >
              The <br />
              <span className="text-secondary italic font-light">Journal.</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="hidden md:block text-right"
          >
            <p className="text-dark/40 text-sm font-light max-w-xs">
              Stay updated with the latest trends in construction, sustainable living, and architectural excellence.
            </p>
          </motion.div>
        </div>

        {/* Blog Grid - 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {displayPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group cursor-pointer"
            >
              <Link to={`/blog/${post.id}`}>
                <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] mb-8 shadow-sm">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/10 transition-colors duration-700" />
                  <div className="absolute top-6 left-6">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-dark text-[9px] font-black tracking-widest uppercase rounded-sm shadow-sm">
                      {post.category}
                    </span>
                  </div>
                </div>
              </Link>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 text-dark/30 text-[10px] font-bold tracking-widest uppercase">
                  <span>{post.date}</span>
                  <span className="w-1 h-1 rounded-full bg-dark/10" />
                  <span>5 Min Read</span>
                </div>

                <Link to={`/blog/${post.id}`}>
                  <h3 className="text-3xl font-black text-dark group-hover:text-secondary transition-colors duration-500 leading-tight uppercase tracking-tight line-clamp-2">
                    {post.title}
                  </h3>
                </Link>

                <p className="text-dark/50 text-base font-light leading-relaxed mb-6 line-clamp-2">
                  {post.excerpt}
                </p>

                <Link 
                  to={`/blog/${post.id}`}
                  className="inline-flex items-center gap-4 text-[10px] font-black tracking-[0.4em] uppercase text-dark/40 group-hover:text-secondary transition-all"
                >
                  Read Story <FiArrowRight className="text-secondary transform transition-transform group-hover:translate-x-2" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
        
        {/* View All Button Below Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 md:mt-24 flex justify-center"
        >
          <Link to="/blog">
            <button className="group flex items-center gap-6 bg-dark text-white px-10 py-5 rounded-full text-[11px] font-black tracking-[0.4em] uppercase hover:bg-secondary hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
              Explore All Journal Entries 
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-dark transition-all duration-500">
                <FiArrowRight className="transform transition-transform group-hover:translate-x-1" />
              </div>
            </button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default HomeBlogSection;
