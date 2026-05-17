import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiArrowRight, FiFacebook, FiTwitter, FiInstagram, FiMail } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import UnifiedFooter from '../components/UnifiedFooter';
import { blogPosts } from '../data/blogData';

const BlogDetail = () => {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl uppercase tracking-widest mb-6 opacity-30">Story not found</h1>
        <Link to="/blog" className="text-[#1a1a1a] font-black tracking-[0.4em] uppercase text-[10px] border-b border-[#1a1a1a] pb-1">
          Return to Journal
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen text-[#1a1a1a] font-sans selection:bg-[#B85C38] selection:text-white overflow-x-hidden">
      <Navbar />

      <main className="pt-24 pb-20">
        
        {/* ── HERO SECTION ── */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-full h-[60vh] md:h-[80vh] relative mb-16 md:mb-24 overflow-hidden bg-[#1a1a1a]"
        >
          {/* Blurred Background for Professional Framing */}
          <div 
             className="absolute inset-0 bg-cover bg-center blur-3xl opacity-40 scale-110" 
             style={{ backgroundImage: `url(${post.image})` }} 
          />
          {/* Fully Visible Main Image */}
          <img 
             src={post.image} 
             alt={post.title} 
             className="w-full h-full object-contain relative z-10 py-4 md:py-8" 
          />
        </motion.div>

        <div className="max-w-6xl mx-auto px-6">
          
          {/* ── POST HEADER ── */}
          <div className="text-center mb-16 md:mb-24">
             <span className="text-[#B85C38] text-[10px] font-black tracking-[0.4em] uppercase mb-6 block">
                {post.category}
             </span>
             <h1 className="text-3xl md:text-5xl lg:text-6xl uppercase tracking-tight leading-tight max-w-4xl mx-auto text-[#1a1a1a]">
                {post.title}
             </h1>
             <div className="w-12 h-[1px] bg-[#1a1a1a]/10 mx-auto mt-10" />
          </div>

          {/* ── DYNAMIC GALLERY LAYOUT ── */}
          {post.gallery ? (
            <div className="space-y-16 md:space-y-24">
              {post.gallery.map((item, idx) => {
                if (item.type === 'single') {
                  return (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1 }}
                      className="w-full aspect-video md:aspect-[21/9] overflow-hidden bg-gray-50 border border-[#1a1a1a]/5"
                    >
                      <img src={item.image} alt="" className="w-full h-full object-cover" />
                    </motion.div>
                  );
                }
                
                if (item.type === 'double') {
                  return (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1 }}
                      className="grid grid-cols-2 gap-2 md:gap-4"
                    >
                      {item.images.map((img, i) => (
                        <div key={i} className="aspect-[3/2] overflow-hidden bg-gray-50 border border-[#1a1a1a]/5">
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </motion.div>
                  );
                }

                if (item.type === 'text') {
                  return (
                    <div key={idx} className="max-w-5xl mx-auto py-4">
                      {item.title && (
                        <h3 className="text-center text-xs font-black tracking-[0.5em] uppercase mb-10 text-[#1a1a1a]">
                          {item.title}
                        </h3>
                      )}
                      <p className="text-[#1a1a1a]/75 text-[18px] leading-[2.1] text-left font-light">
                        {item.content}
                      </p>
                    </div>
                  );
                }

                if (item.type === 'html') {
                  return (
                    <article key={idx} className="max-w-5xl mx-auto py-4">
                      {item.title && (
                        <h3 className="text-center text-xs font-black tracking-[0.5em] uppercase mb-10 text-[#1a1a1a]">
                          {item.title}
                        </h3>
                      )}
                      <div className="prose prose-lg max-w-none text-[#1a1a1a]/70" dangerouslySetInnerHTML={{ __html: item.content }} />
                    </article>
                  );
                }
                
                return null;
              })}
            </div>
          ) : (
            <article className="max-w-5xl mx-auto py-8">
              <div className="prose prose-lg max-w-none text-[#1a1a1a]/70" dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>
          )}

        </div>

        {/* ── FOOTER NAVIGATION ── */}
        <div className="mt-32 py-20 border-t border-[#1a1a1a]/5 text-center">
           <Link to="/blog" className="text-[10px] font-black tracking-[0.6em] uppercase text-[#1a1a1a]/30 hover:text-[#1a1a1a] transition-all">
             Back to the Journal Index
           </Link>
        </div>
      </main>

      <UnifiedFooter />
    </div>
  );
};

export default BlogDetail;
