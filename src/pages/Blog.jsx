import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import UnifiedFooter from '../components/UnifiedFooter';
import { blogPosts, categories } from '../data/blogData';
import { Helmet } from 'react-helmet-async';

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All Insights");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === "All Insights" || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <motion.div className="bg-white min-h-screen text-[#1a1a1a] font-sans selection:bg-[#B85C38] selection:text-white">
      <Helmet>
        <title>The Journal | Karrcholai Construction Blog</title>
        <meta name="description" content="Read engineering stories, construction insights, and building knowledge from Karrcholai — residential construction specialists in Tamil Nadu." />
        <link rel="canonical" href="https://karrcholai.com/blog" />
      </Helmet>
      <Navbar />

      <main className="pt-32 pb-20">
        <div className="border-b border-[#1a1a1a]/10 pb-12 mb-12">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl uppercase tracking-[0.2em] mb-4">The Journal</h1>
            <p className="text-[10px] md:text-[11px] font-bold tracking-[0.4em] uppercase text-[#1a1a1a]/50">
              Engineering stories, construction knowledge & building insights
            </p>
          </div>
        </div>

        <nav className="max-w-7xl mx-auto px-6 mb-16">
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 border-b border-[#1a1a1a]/5 pb-8">
            {categories.map((category, i) => (
              <button 
                key={i} 
                onClick={() => setActiveCategory(category)}
                className={`text-[9px] font-black tracking-[0.3em] uppercase transition-all duration-300 ${
                  activeCategory === category 
                  ? "text-[#1a1a1a] border-b border-[#1a1a1a]" 
                  : "text-[#1a1a1a]/30 hover:text-[#1a1a1a]"
                } pb-2`}
              >
                {category}
              </button>
            ))}
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-6">
          {filteredPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24 md:py-32"
            >
              <p className="text-[10px] font-black tracking-[0.4em] uppercase text-[#1a1a1a]/30 mb-4">Coming Soon</p>
              <p className="text-lg md:text-xl text-[#1a1a1a]/50 font-light max-w-md mx-auto leading-relaxed">
                Articles in this category are on the way. Browse Engineering Legends or check back soon.
              </p>
            </motion.div>
          ) : (
            <div className={`grid grid-cols-1 gap-x-12 gap-y-20 ${filteredPosts.length === 1 ? 'md:max-w-lg md:mx-auto' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
              {filteredPosts.map((post) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="flex flex-col group cursor-pointer"
                >
                  <Link to={`/blog/${post.id}`} className="block relative aspect-[4/5] overflow-hidden mb-8 border border-[#1a1a1a]/5">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.02] transition-all" />
                  </Link>
                  
                  <div className="flex flex-col items-center text-center">
                    <span className="text-[#B85C38] text-[9px] font-black tracking-[0.4em] uppercase mb-4">
                      {post.category}
                    </span>
                    <Link to={`/blog/${post.id}`}>
                      <h3 className="text-xl md:text-2xl uppercase tracking-tight leading-tight mb-6 group-hover:opacity-60 transition-opacity">
                        {post.title}
                      </h3>
                    </Link>
                    <div className="w-8 h-[1px] bg-[#1a1a1a]/10 mb-6" />
                    <Link to={`/blog/${post.id}`} className="text-[10px] font-black tracking-[0.4em] uppercase text-[#1a1a1a]/30 hover:text-[#1a1a1a] transition-all">
                      Read Article
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>

        <div className="mt-32 pt-20 border-t border-[#1a1a1a]/5 px-6">
          <div className="max-w-md mx-auto flex flex-col items-center gap-8">
            <h4 className="text-[10px] font-black tracking-[0.4em] uppercase text-[#1a1a1a]/30">Looking for something specific?</h4>
            <div className="w-full relative">
              <input 
                type="text" 
                placeholder="SEARCH THE JOURNAL" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-b border-[#1a1a1a]/10 py-4 text-[11px] font-bold tracking-[0.2em] uppercase outline-none focus:border-[#1a1a1a] transition-all text-center"
              />
              <FiSearch className="absolute right-0 top-1/2 -translate-y-1/2 text-[#1a1a1a]/20" />
            </div>
          </div>
        </div>
      </main>

      <UnifiedFooter />
    </motion.div>
  );
};

export default Blog;
