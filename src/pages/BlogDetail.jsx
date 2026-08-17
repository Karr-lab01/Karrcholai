import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import UnifiedFooter from '../components/UnifiedFooter';
import { blogPosts } from '../data/blogData.jsx';
import ComicSection from '../components/ComicSection.jsx';
import FirstStoneSection from '../components/FirstStoneSection.jsx';
import VastuArticle from '../components/vastu/VastuArticle.jsx';

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

  const isArunStory    = post.heroType === 'arun-story';
  const isFirstStone   = post.heroType === 'first-stone';
  const isVastu        = post.heroType === 'vastu';

  const pageTitle = isArunStory
    ? `How Arun Built His Dream Home — A Client Story | Karrcholai Construction`
    : isFirstStone
    ? `The First Stone — Professional Plan Analysis | Karrcholai Construction`
    : isVastu
    ? `What Was the Purpose Behind the Creation of the Vastu Shastras? | Karrcholai Construction`
    : `${post.title} | Karrcholai Construction`
  const pageDesc = post.excerpt || `Read this article from the Karrcholai construction journal — engineering insights, client stories and building knowledge from Tamil Nadu.`
  const canonicalId = post.id

  return (
    <div style={{ background: CREAM, minHeight: '100vh', color: INK, fontFamily: 'Barlow, sans-serif', overflowX: 'hidden' }}>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={`https://karrcholai.com/blog/${canonicalId}`} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:url" content={`https://karrcholai.com/blog/${canonicalId}`} />
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

        {/* ── First Stone hero ── */}
        {isFirstStone && (
          <div ref={heroRef} style={{ background: '#0f1a0f', position: 'relative', overflow: 'hidden',
            borderBottom: `3px solid ${TERRA}` }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.06,
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(255,255,255,0.04) 30px, rgba(255,255,255,0.04) 31px),
                                repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(255,255,255,0.04) 30px, rgba(255,255,255,0.04) 31px)`,
              pointerEvents: 'none' }} />
            <motion.div style={{ y: heroY, opacity: heroOp, position: 'relative', zIndex: 1,
              padding: 'clamp(60px,10vw,100px) 24px clamp(36px,6vw,56px)', textAlign: 'center' }}>
              {/* Chapter badge */}
              <motion.div
                initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <div style={{ height: 1, width: 32, background: `${TERRA}60` }} />
                <span style={{
                  fontSize: 9, fontWeight: 900, letterSpacing: '0.5em', textTransform: 'uppercase',
                  color: TERRA, background: `${TERRA}18`, border: `1px solid ${TERRA}40`,
                  borderRadius: 20, padding: '5px 14px'
                }}>Chapter 1</span>
                <div style={{ height: 1, width: 32, background: `${TERRA}60` }} />
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                style={{ color: 'rgba(255,255,255,0.35)', fontSize: 10, fontWeight: 900, letterSpacing: '0.55em',
                  textTransform: 'uppercase', marginBottom: 14 }}>
                Single Stone Stories · Karrcholai
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.7 }}
                style={{ color: '#fff', fontSize: 'clamp(2rem,7vw,4.5rem)', fontWeight: 900,
                  lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 18px',
                  maxWidth: 760, marginLeft: 'auto', marginRight: 'auto' }}>
                The First Stone
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
                style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(0.85rem,2vw,1.1rem)',
                  fontWeight: 400, maxWidth: 520, marginLeft: 'auto', marginRight: 'auto',
                  lineHeight: 1.7, marginBottom: 22 }}>
                Is this 30′ × 65′ plan right for your family? A room-by-room review before the first column is cast.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
                style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, fontWeight: 700,
                  letterSpacing: '0.3em', textTransform: 'uppercase' }}>
                2 BHK · Ground Floor · 30′ × 65′ Site
              </motion.p>
            </motion.div>
          </div>
        )}

        {/* ── Vastu Shastras hero ── */}
        {isVastu && (
          <div ref={heroRef} style={{ position: 'relative', overflow: 'hidden',
            background: 'linear-gradient(135deg, #1a2e1a 0%, #0d1a0d 60%, #1a0d00 100%)',
            borderBottom: `3px solid ${TERRA}` }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.07,
              backgroundImage: 'radial-gradient(circle, #d4af37 1px, transparent 1px)',
              backgroundSize: '18px 18px', pointerEvents: 'none' }} />
            <motion.div style={{ y: heroY, opacity: heroOp, position: 'relative', zIndex: 1,
              padding: 'clamp(70px,11vw,110px) 24px clamp(42px,7vw,62px)', textAlign: 'center' }}>
              <motion.p
                initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{ color: TERRA, fontSize: 10, fontWeight: 900, letterSpacing: '0.55em',
                  textTransform: 'uppercase', marginBottom: 14 }}>
                Land and Plot Tips · Karrcholai
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                style={{ color: '#d4af37', fontSize: 'clamp(0.9rem,2vw,1.1rem)', fontWeight: 900,
                  letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>
                Vastu Shastras
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                style={{ color: '#fff', fontSize: 'clamp(1.6rem,5vw,3.5rem)', fontWeight: 900,
                  lineHeight: 1.1, letterSpacing: '-0.02em', margin: '0 0 20px',
                  maxWidth: 720, marginLeft: 'auto', marginRight: 'auto' }}>
                What Was the Purpose Behind the<br />Creation of the Vastu Shastras?
              </motion.h1>
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
          {!isArunStory && !isFirstStone && !isVastu && (
            <motion.h1 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ fontSize: 'clamp(1.8rem,5vw,3.5rem)', textTransform: 'uppercase',
                letterSpacing: '-0.02em', lineHeight: 1.1, color: INK, margin: '0 auto 20px', maxWidth: 700 }}>
              {post.title}
            </motion.h1>
          )}
          {(isArunStory || isFirstStone || isVastu) && (
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
                if (item.type === 'first-stone') return (
                  <div key={idx}><FirstStoneSection /></div>
                );
                if (item.type === 'vastu-article') return (
                  <div key={idx}><VastuArticle /></div>
                );
                return null;
              })}
            </div>
          )}
        </div>

        {/* ── Internal linking: Topical cluster chains ── */}
        {(() => {
          const relatedPosts = blogPosts
            .filter(p => p.id !== post.id && p.category === post.category)
            .slice(0, 2)
          const otherPosts = blogPosts
            .filter(p => p.id !== post.id && p.category !== post.category)
            .slice(0, 2 - relatedPosts.length)
          const suggested = [...relatedPosts, ...otherPosts].slice(0, 2)

          // Per-article topical cluster chains
          // Vastu article (701): Vastu Compass → Manaiyadi Calculator → Construction → Contact
          // First Stone / Single Stone Stories (603): Cost Estimator → Residential Construction → Projects → Contact
          // Engineering Legends (601): Construction Services → Projects → Contact
          // Construction Tips: Cost Estimator → Residential Construction → Projects → Contact
          // Land and Plot Tips (generic): Vastu Compass → Manaiyadi Calculator → Construction → Contact

          const isVastuCluster   = post.id === 701 || post.category === 'Land and Plot Tips'
          const isCostCluster    = post.id === 603 || post.category === 'Construction Tips' || post.category === 'Single Stone Stories'
          const isEngineerCluster = post.category === 'Engineering Legends'

          const clusterLinks = isVastuCluster ? [
            { to: '/vastu-compass',         emoji: '🧭', label: 'Free Tool',              title: 'Vastu Compass',           bg: 'linear-gradient(135deg, #1a2e1a, #0d1a0d)',       accent: '#d4af37' },
            { to: '/manaiyadi/calculator',  emoji: '📐', label: 'Free Tool',              title: 'Manaiyadi Calculator',    bg: 'linear-gradient(135deg, #2D4B37, #1a2e1a)',       accent: '#B85C38' },
            { to: '/karr',                  emoji: '🏗️', label: 'Residential Construction', title: 'Karr Division',         bg: 'linear-gradient(135deg, #3a2010, #1a1a1a)',       accent: 'rgba(255,255,255,0.45)' },
            { to: '/projects',              emoji: '🏠', label: 'Our Work',               title: 'View Projects',           bg: 'linear-gradient(135deg, #2a2a2a, #1a1a1a)',       accent: 'rgba(255,255,255,0.35)' },
            { to: '/contact',               emoji: '📞', label: 'Free Consultation',       title: 'Talk to Karrcholai',     bg: '#1A1A1A',                                          accent: 'rgba(255,255,255,0.35)' },
          ] : isCostCluster ? [
            { to: '/cost-estimator',        emoji: '🏗️', label: 'Free Tool',              title: 'Cost Estimator',          bg: 'linear-gradient(135deg, #B85C38, #8B3A20)',       accent: 'rgba(255,255,255,0.6)' },
            { to: '/karr',                  emoji: '🏠', label: 'Residential Construction', title: 'Karr Division',         bg: 'linear-gradient(135deg, #2D4B37, #1a2e1a)',       accent: '#B85C38' },
            { to: '/projects',              emoji: '📸', label: 'Portfolio',               title: 'View Projects',           bg: 'linear-gradient(135deg, #2a2a2a, #1a1a1a)',       accent: 'rgba(255,255,255,0.35)' },
            { to: '/contact',               emoji: '📞', label: 'Free Consultation',       title: 'Talk to Karrcholai',     bg: '#1A1A1A',                                          accent: 'rgba(255,255,255,0.35)' },
          ] : isEngineerCluster ? [
            { to: '/karr',                  emoji: '🏗️', label: 'Residential Construction', title: 'Karr Division',         bg: 'linear-gradient(135deg, #2D4B37, #1a2e1a)',       accent: '#B85C38' },
            { to: '/cost-estimator',        emoji: '₹',  label: 'Free Tool',              title: 'Cost Estimator',          bg: 'linear-gradient(135deg, #B85C38, #8B3A20)',       accent: 'rgba(255,255,255,0.6)' },
            { to: '/projects',              emoji: '🏠', label: 'Portfolio',               title: 'View Projects',           bg: 'linear-gradient(135deg, #2a2a2a, #1a1a1a)',       accent: 'rgba(255,255,255,0.35)' },
            { to: '/contact',               emoji: '📞', label: 'Free Consultation',       title: 'Talk to Karrcholai',     bg: '#1A1A1A',                                          accent: 'rgba(255,255,255,0.35)' },
          ] : [
            { to: '/cost-estimator',        emoji: '🏗️', label: 'Free Tool',              title: 'Cost Estimator',          bg: 'linear-gradient(135deg, #B85C38, #8B3A20)',       accent: 'rgba(255,255,255,0.6)' },
            { to: '/karr',                  emoji: '🏠', label: 'Residential Construction', title: 'Karr Division',         bg: 'linear-gradient(135deg, #2D4B37, #1a2e1a)',       accent: '#B85C38' },
            { to: '/projects',              emoji: '📸', label: 'Portfolio',               title: 'View Projects',           bg: 'linear-gradient(135deg, #2a2a2a, #1a1a1a)',       accent: 'rgba(255,255,255,0.35)' },
            { to: '/contact',               emoji: '📞', label: 'Free Consultation',       title: 'Talk to Karrcholai',     bg: '#1A1A1A',                                          accent: 'rgba(255,255,255,0.35)' },
          ]

          return (
            <section style={{ borderTop: '1px solid rgba(0,0,0,0.06)', padding: '56px 24px', background: '#FAF9F6' }}>
              <div style={{ maxWidth: 720, margin: '0 auto' }}>

                {/* Related posts */}
                {suggested.length > 0 && (
                  <div style={{ marginBottom: 48 }}>
                    <p style={{ fontSize: 9, fontWeight: 900, letterSpacing: '0.5em', textTransform: 'uppercase',
                      color: 'rgba(0,0,0,0.25)', marginBottom: 24 }}>Continue Reading</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
                      {suggested.map(related => (
                        <Link key={related.id} to={`/blog/${related.id}`}
                          style={{ display: 'block', padding: '20px 24px', background: '#fff',
                            border: '1px solid rgba(0,0,0,0.06)', borderRadius: 16, textDecoration: 'none',
                            transition: 'border-color 0.2s, box-shadow 0.2s' }}
                          onMouseEnter={e => { e.currentTarget.style.borderColor = '#B85C38'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(184,92,56,0.08)' }}
                          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)'; e.currentTarget.style.boxShadow = 'none' }}>
                          <span style={{ fontSize: 8, fontWeight: 900, letterSpacing: '0.4em', textTransform: 'uppercase',
                            color: '#B85C38', display: 'block', marginBottom: 8 }}>{related.category}</span>
                          <span style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A', lineHeight: 1.4,
                            display: 'block' }}>{related.title}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Topical cluster label */}
                <p style={{ fontSize: 9, fontWeight: 900, letterSpacing: '0.5em', textTransform: 'uppercase',
                  color: 'rgba(0,0,0,0.25)', marginBottom: 16 }}>Explore This Topic</p>

                {/* Cluster chain — visual flow strip */}
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, marginBottom: 24 }}>
                  {clusterLinks.map((cl, idx) => (
                    <React.Fragment key={cl.to}>
                      <Link to={cl.to}
                        style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 18px',
                          background: cl.bg, borderRadius: 12, textDecoration: 'none', flexShrink: 0 }}>
                        <span style={{ fontSize: 18 }}>{cl.emoji}</span>
                        <div>
                          <span style={{ fontSize: 7, fontWeight: 900, letterSpacing: '0.35em', textTransform: 'uppercase',
                            color: cl.accent, display: 'block', marginBottom: 2 }}>{cl.label}</span>
                          <span style={{ fontSize: 12, fontWeight: 700, color: '#fff', whiteSpace: 'nowrap' }}>{cl.title}</span>
                        </div>
                      </Link>
                      {idx < clusterLinks.length - 1 && (
                        <span style={{ fontSize: 10, color: 'rgba(0,0,0,0.2)', fontWeight: 900, flexShrink: 0 }}>→</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </section>
          )
        })()}

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
