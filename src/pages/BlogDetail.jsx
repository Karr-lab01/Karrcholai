import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import UnifiedFooter from '../components/UnifiedFooter';
import { blogPosts } from '../data/blogData.jsx';
import ComicSection from '../components/ComicSection.jsx';

/* Site palette */
const FOREST  = '#2D4B37';
const TERRA   = '#B85C38';
const CREAM   = '#FAF9F6';
const INK     = '#1A1A1A';

/* ═══════════════════════════════════════════════════════════════
   BLOG DETAIL PAGE
═══════════════════════════════════════════════════════════════ */
const BlogDetail = () => {
  const { id }  = useParams();
  const post    = blogPosts.find(p => p.id === parseInt(id));
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY  = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const heroOp = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  if (!post) return (
    <div style={{ minHeight: '100vh', background: CREAM, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', padding: 24, textAlign: 'center' }}>
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.4em', textTransform: 'uppercase',
        opacity: 0.25, marginBottom: 16 }}>Story not found</p>
      <Link to="/blog" style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.4em',
        textTransform: 'uppercase', color: INK, borderBottom: '1px solid ' + INK,
        paddingBottom: 2, textDecoration: 'none' }}>← Return to Journal</Link>
    </div>
  );

  const isArunStory = post.heroType === 'arun-story';

  const pageTitle = isArunStory
    ? `How Arun Built His Dream Home — A Client Story | Karrcholai`
    : `${post.title} | Karrcholai Journal`
  const pageDesc = post.excerpt || `Read this article from the Karrcholai construction journal — engineering insights, client stories and building knowledge from Tamil Nadu.`
  const canonicalId = post.id

  return (
    <div style={{ background: CREAM, minHeight: '100vh', color: INK, fontFamily: 'Barlow, sans-serif', overflowX: 'hidden' }}>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={`https://karrcholai-sepia.vercel.app/blog/${canonicalId}`} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:url" content={`https://karrcholai-sepia.vercel.app/blog/${canonicalId}`} />
        {post.image && <meta property="og:image" content={post.image} />}
      </Helmet>
      <Navbar />
      <main>

        {/* ── Standard image hero (post 601) ── */}
        {post.id === 601 && (
          <motion.div ref={heroRef}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
            style={{ width: '100%', height: '65vh', position: 'relative', overflow: 'hidden', background: '#111' }}>
            <motion.div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${post.image})`,
              backgroundSize: 'cover', backgroundPosition: 'center', y: heroY, opacity: heroOp }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.45), rgba(0,0,0,0.25))' }} />
          </motion.div>
        )}

        {/* ── Arun story hero ── */}
        {isArunStory && (
          <div ref={heroRef} style={{ background: INK, position: 'relative', overflow: 'hidden',
            borderBottom: `3px solid ${TERRA}` }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.03,
              backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
              backgroundSize: '12px 12px', pointerEvents: 'none' }} />
            <motion.div style={{ y: heroY, opacity: heroOp, position: 'relative', zIndex: 1,
              padding: 'clamp(60px,10vw,100px) 24px clamp(36px,6vw,56px)', textAlign: 'center' }}>
              <motion.p
                initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{ color: TERRA, fontSize: 10, fontWeight: 900, letterSpacing: '0.55em',
                  textTransform: 'uppercase', marginBottom: 16 }}>
                Client Stories · Karrcholai
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.7 }}
                style={{ color: '#fff', fontSize: 'clamp(2rem,7vw,4.5rem)', fontWeight: 900,
                  lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 18px',
                  maxWidth: 700, marginLeft: 'auto', marginRight: 'auto' }}>
                How Arun Built His<br />Dream Home
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
                style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, fontWeight: 600,
                  letterSpacing: '0.25em', textTransform: 'uppercase' }}>
                The Full Story · March – November 2024
              </motion.p>
            </motion.div>
          </div>
        )}

        {/* ── Post header ── */}
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px 24px 0', textAlign: 'center' }}>
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            style={{ color: TERRA, fontSize: 9, fontWeight: 900, letterSpacing: '0.5em',
              textTransform: 'uppercase', display: 'block', marginBottom: 14 }}>
            {post.category}
          </motion.span>
          {!isArunStory && (
            <motion.h1 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ fontSize: 'clamp(1.8rem,5vw,3.5rem)', textTransform: 'uppercase',
                letterSpacing: '-0.02em', lineHeight: 1.1, color: INK, margin: '0 auto 20px', maxWidth: 700 }}>
              {post.title}
            </motion.h1>
          )}
          {isArunStory && (
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              style={{ fontSize: 15, color: 'rgba(0,0,0,0.5)', lineHeight: 1.7, maxWidth: 560,
                margin: '0 auto 20px', fontWeight: 400 }}>
              {post.excerpt}
            </motion.p>
          )}
          <div style={{ width: 40, height: 1, background: 'rgba(0,0,0,0.1)', margin: '0 auto 40px' }} />
        </div>

        {/* ── Gallery content ── */}
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px 80px' }}>
          {post.gallery && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: isArunStory ? 0 : 72 }}>
              {post.gallery.map((item, idx) => {
                if (item.type === 'single') return (
                  <motion.div key={idx} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                    viewport={{ once: true }} transition={{ duration: 0.8 }}
                    style={{ width: '100%', aspectRatio: '21/9', overflow: 'hidden' }}>
                    <img src={item.image} alt="Karrcholai construction project photo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </motion.div>
                );
                if (item.type === 'double') return (
                  <motion.div key={idx} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                    viewport={{ once: true }} transition={{ duration: 0.8 }}
                    style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    {item.images.map((img, i) => (
                      <div key={i} style={{ aspectRatio: '3/2', overflow: 'hidden' }}>
                        <img src={img} alt={`Sir M. Visvesvaraya — engineering heritage photo ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    ))}
                  </motion.div>
                );
                if (item.type === 'html') return (
                  <article key={idx} style={{ maxWidth: 680, margin: '0 auto' }}>
                    <div className="prose prose-lg max-w-none" style={{ color: 'rgba(0,0,0,0.68)' }}
                      dangerouslySetInnerHTML={{ __html: item.content }} />
                  </article>
                );
                if (item.type === 'arun-story') return (
                  <div key={idx}><ComicSection /></div>
                );
                return null;
              })}
            </div>
          )}
        </div>

        {/* ── Back to journal ── */}
        <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)', padding: '56px 24px',
          textAlign: 'center' }}>
          <Link to="/blog"
            style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.5em',
              textTransform: 'uppercase', color: 'rgba(0,0,0,0.25)', textDecoration: 'none' }}
            onMouseEnter={e => e.currentTarget.style.color = INK}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(0,0,0,0.25)'}>
            ← Back to the Journal
          </Link>
        </div>
      </main>
      <UnifiedFooter />
    </div>
  );
};

export default BlogDetail;
