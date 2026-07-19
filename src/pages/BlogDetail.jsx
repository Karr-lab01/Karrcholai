import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from '../components/Navbar';
import UnifiedFooter from '../components/UnifiedFooter';
import { blogPosts } from '../data/blogData.jsx';
import ComicSection from '../components/ComicSection.jsx';

/* ═══════════════════════════════════════════════════════════════
   WHATSAPP STORY RENDERER
   Renders a real WhatsApp-style 1:1 conversation thread
═══════════════════════════════════════════════════════════════ */

/* Site palette */
const FOREST  = '#2D4B37';
const TERRA   = '#B85C38';
const CREAM   = '#FAF9F6';
const INK     = '#1A1A1A';

/* ── Tick / read receipt ── */
const Ticks = ({ read }) => (
  <span style={{ fontSize: 11, color: read ? '#53bdeb' : 'rgba(0,0,0,0.35)', marginLeft: 4, flexShrink: 0 }}>
    {read ? '✓✓' : '✓✓'}
  </span>
);

/* ── Single chat bubble ── */
const Msg = ({ msg, delay = 0 }) => {
  const isClient   = msg.type === 'client';
  const isEngineer = msg.type === 'engineer';
  if (!isClient && !isEngineer) return null;

  const bubbleBg  = isClient   ? '#fff'    : '#DCF8C6';
  const align     = isClient   ? 'flex-start' : 'flex-end';
  const radius    = isClient   ? '0 18px 18px 18px' : '18px 0 18px 18px';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ display: 'flex', justifyContent: align, paddingLeft: isClient ? 0 : 40, paddingRight: isClient ? 40 : 0 }}
    >
      <div style={{
        background: bubbleBg,
        borderRadius: radius,
        padding: '10px 14px 8px',
        maxWidth: '78%',
        boxShadow: '0 1px 2px rgba(0,0,0,0.12)',
        position: 'relative',
      }}>
        {/* Text — preserve line breaks */}
        {msg.text.split('\n').map((line, i, arr) => (
          <React.Fragment key={i}>
            <span style={{ fontSize: 14, color: INK, lineHeight: 1.55, whiteSpace: 'pre-wrap' }}>{line}</span>
            {i < arr.length - 1 && <br />}
          </React.Fragment>
        ))}
        {/* Time + ticks */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 2, marginTop: 4 }}>
          <span style={{ fontSize: 10, color: 'rgba(0,0,0,0.38)', whiteSpace: 'nowrap' }}>{msg.time}</span>
          {isEngineer && <Ticks read />}
        </div>
      </div>
    </motion.div>
  );
};

/* ── Date divider ── */
const DateDivider = ({ text }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '8px 0' }}>
    <span style={{
      background: 'rgba(255,255,255,0.85)', color: 'rgba(0,0,0,0.45)',
      fontSize: 11, fontWeight: 600, padding: '3px 12px', borderRadius: 8,
      boxShadow: '0 1px 2px rgba(0,0,0,0.08)', letterSpacing: '0.02em',
    }}>{text}</span>
  </div>
);

/* ── Milestone card (inline in chat) ── */
const MilestoneCard = ({ msg, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.94 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: '-20px' }}
    transition={{ duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] }}
    style={{ display: 'flex', justifyContent: 'center', margin: '6px 0' }}
  >
    <div style={{
      background: msg.color || FOREST,
      borderRadius: 12,
      padding: '14px 20px',
      maxWidth: '85%',
      textAlign: 'center',
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    }}>
      <div style={{ fontSize: 26, marginBottom: 6 }}>{msg.icon}</div>
      <p style={{ color: '#fff', fontWeight: 800, fontSize: 14, margin: '0 0 4px', letterSpacing: '0.01em' }}>{msg.title}</p>
      <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, margin: 0, lineHeight: 1.5 }}>{msg.sub}</p>
    </div>
  </motion.div>
);

/* ── Photo bubble ── */
const PhotoMsg = ({ msg, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-20px' }}
    transition={{ duration: 0.4, delay }}
    style={{ display: 'flex', justifyContent: 'flex-end' }}
  >
    <div style={{
      background: '#DCF8C6', borderRadius: '18px 0 18px 18px',
      padding: '8px 10px 8px', maxWidth: '65%',
      boxShadow: '0 1px 2px rgba(0,0,0,0.12)',
    }}>
      {/* Photo placeholder with emoji */}
      <div style={{
        background: `linear-gradient(135deg, ${FOREST}22, ${FOREST}44)`,
        borderRadius: 10, padding: '24px 16px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        border: `1px solid ${FOREST}33`, marginBottom: 6,
      }}>
        <span style={{ fontSize: 32 }}>{msg.emoji}</span>
        <span style={{ fontSize: 11, color: FOREST, fontWeight: 600, textAlign: 'center' }}>Site Update Photo</span>
      </div>
      <p style={{ fontSize: 12, color: INK, margin: '0 0 4px', lineHeight: 1.4, opacity: 0.75 }}>{msg.caption}</p>
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2 }}>
        <span style={{ fontSize: 10, color: 'rgba(0,0,0,0.35)' }}>{msg.time}</span>
        <Ticks read />
      </div>
    </div>
  </motion.div>
);

/* ── Voice note bubble ── */
const VoiceMsg = ({ msg, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-20px' }}
    transition={{ duration: 0.4, delay }}
    style={{ display: 'flex', justifyContent: 'flex-end' }}
  >
    <div style={{
      background: '#DCF8C6', borderRadius: '18px 0 18px 18px',
      padding: '10px 14px 8px', maxWidth: '70%',
      boxShadow: '0 1px 2px rgba(0,0,0,0.12)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
        {/* Play button */}
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: FOREST,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ color: '#fff', fontSize: 12, marginLeft: 2 }}>▶</span>
        </div>
        {/* Waveform */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
          {[4,8,12,6,14,10,5,9,13,7,11,6,8,10,5,12,9,7,11,8].map((h, i) => (
            <div key={i} style={{ width: 2.5, height: h, background: `${FOREST}88`, borderRadius: 2 }} />
          ))}
        </div>
        <span style={{ fontSize: 11, color: 'rgba(0,0,0,0.4)', flexShrink: 0 }}>{msg.duration}</span>
      </div>
      <p style={{ fontSize: 11, color: 'rgba(0,0,0,0.5)', margin: '0 0 3px', fontStyle: 'italic' }}>{msg.label}</p>
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2 }}>
        <span style={{ fontSize: 10, color: 'rgba(0,0,0,0.35)' }}>{msg.time}</span>
        <Ticks read />
      </div>
    </div>
  </motion.div>
);

/* ── Document bubble ── */
const DocMsg = ({ msg, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-20px' }}
    transition={{ duration: 0.4, delay }}
    style={{ display: 'flex', justifyContent: 'flex-end' }}
  >
    <div style={{
      background: '#DCF8C6', borderRadius: '18px 0 18px 18px',
      padding: '10px 14px 8px', maxWidth: '75%',
      boxShadow: '0 1px 2px rgba(0,0,0,0.12)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
        <div style={{ width: 40, height: 48, background: '#fff', borderRadius: 6,
          border: '1px solid rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ fontSize: 10, fontWeight: 800, color: TERRA, lineHeight: 1 }}>PDF</span>
        </div>
        <div>
          <p style={{ fontSize: 12, fontWeight: 600, color: INK, margin: '0 0 2px', lineHeight: 1.3, wordBreak: 'break-word' }}>{msg.label}</p>
          <p style={{ fontSize: 11, color: 'rgba(0,0,0,0.4)', margin: 0 }}>{msg.size}</p>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2 }}>
        <span style={{ fontSize: 10, color: 'rgba(0,0,0,0.35)' }}>{msg.time}</span>
        <Ticks read />
      </div>
    </div>
  </motion.div>
);

/* ── Full WhatsApp Story Renderer ── */
const WhatsAppStory = ({ story }) => {
  const { conversation, projectSummary, clientName, engineerName, rating, quote } = story;

  return (
    <div style={{ fontFamily: 'Barlow, sans-serif', maxWidth: 680, margin: '0 auto' }}>

      {/* ── Project stats bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
          gap: 1, background: 'rgba(0,0,0,0.06)', borderRadius: 12,
          overflow: 'hidden', marginBottom: 32, border: '1px solid rgba(0,0,0,0.07)',
        }}
      >
        {[
          { label: 'Project Size',  value: projectSummary.sqft + ' sq.ft' },
          { label: 'Floors',        value: projectSummary.floors + ' Floors' },
          { label: 'Budget',        value: projectSummary.budget },
          { label: 'Duration',      value: projectSummary.duration },
          { label: 'Location',      value: projectSummary.city.split(',')[0] },
        ].map((s, i) => (
          <div key={i} style={{ background: CREAM, padding: '14px 12px', textAlign: 'center' }}>
            <p style={{ fontSize: 9, fontWeight: 700, color: 'rgba(0,0,0,0.4)', textTransform: 'uppercase',
              letterSpacing: '0.25em', margin: '0 0 4px' }}>{s.label}</p>
            <p style={{ fontSize: 15, fontWeight: 800, color: FOREST, margin: 0 }}>{s.value}</p>
          </div>
        ))}
      </motion.div>

      {/* ── Phone frame with chat ── */}
      <div style={{ position: 'relative' }}>

        {/* Chat container — looks like a phone screen */}
        <div style={{
          background: '#E5DDD5',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000' fill-opacity='0.015' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          borderRadius: 16, overflow: 'hidden',
          boxShadow: '0 4px 40px rgba(0,0,0,0.12)',
          border: '1px solid rgba(0,0,0,0.08)',
        }}>

          {/* WhatsApp header bar */}
          <div style={{
            background: FOREST, padding: '12px 16px',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            {/* Avatar */}
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
              👷
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ color: '#fff', fontWeight: 700, fontSize: 15, margin: '0 0 1px', lineHeight: 1 }}>{engineerName}</p>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 11, margin: 0 }}>Karrcholai Construction · Online</p>
            </div>
            {/* Icons */}
            <div style={{ display: 'flex', gap: 16 }}>
              {['📞', '⋮'].map((ic, i) => <span key={i} style={{ color: 'rgba(255,255,255,0.8)', fontSize: 18, cursor: 'pointer' }}>{ic}</span>)}
            </div>
          </div>

          {/* Messages area */}
          <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 4 }}>
            {conversation.map((msg, i) => {
              const delay = 0;
              if (msg.type === 'date')      return <DateDivider key={i} text={msg.text} />;
              if (msg.type === 'milestone') return <MilestoneCard key={i} msg={msg} delay={delay} />;
              if (msg.type === 'photo')     return <PhotoMsg key={i} msg={msg} delay={delay} />;
              if (msg.type === 'voice')     return <VoiceMsg key={i} msg={msg} delay={delay} />;
              if (msg.type === 'docs')      return <DocMsg key={i} msg={msg} delay={delay} />;
              return <Msg key={i} msg={msg} delay={delay} />;
            })}
          </div>

          {/* Input bar (non-functional, visual only) */}
          <div style={{ background: '#F0F0F0', padding: '8px 12px',
            display: 'flex', alignItems: 'center', gap: 10, borderTop: '1px solid rgba(0,0,0,0.08)' }}>
            <div style={{ flex: 1, background: '#fff', borderRadius: 24, padding: '8px 16px',
              fontSize: 13, color: 'rgba(0,0,0,0.35)' }}>Type a message</div>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: FOREST,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ color: '#fff', fontSize: 16 }}>🎤</span>
            </div>
          </div>
        </div>

        {/* Subtle "scrolled on phone" label */}
        <p style={{ textAlign: 'center', fontSize: 10, color: 'rgba(0,0,0,0.25)', fontWeight: 600,
          letterSpacing: '0.25em', textTransform: 'uppercase', marginTop: 12 }}>
          Real client story · Shared with permission
        </p>
      </div>

      {/* ── Outcome cards ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{ marginTop: 40, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 12 }}
      >
        {[
          { icon: '⏱', label: 'Delivered', value: 'On Time' },
          { icon: '💰', label: 'Budget', value: 'On Budget' },
          { icon: '🧭', label: 'Vastu', value: 'Certified' },
          { icon: '📱', label: 'Updates', value: 'Every Week' },
          { icon: '⭐', label: 'Rating', value: '5.0 / 5.0' },
        ].map((c, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.07 * i, duration: 0.45 }}
            style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 10,
              padding: '16px 12px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: 22, marginBottom: 6 }}>{c.icon}</div>
            <p style={{ fontSize: 9, fontWeight: 700, color: 'rgba(0,0,0,0.4)', textTransform: 'uppercase',
              letterSpacing: '0.25em', margin: '0 0 3px' }}>{c.label}</p>
            <p style={{ fontSize: 15, fontWeight: 800, color: FOREST, margin: 0 }}>{c.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Quote ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        style={{ marginTop: 40, padding: '32px 28px', background: FOREST, borderRadius: 12,
          textAlign: 'center', boxShadow: '0 4px 24px rgba(45,75,55,0.18)' }}
      >
        <p style={{ fontSize: 22, color: 'rgba(255,255,255,0.25)', fontWeight: 900, lineHeight: 1, marginBottom: 12 }}>"</p>
        <p style={{ fontSize: 17, color: '#fff', lineHeight: 1.7, fontStyle: 'italic',
          maxWidth: 500, margin: '0 auto 16px', fontWeight: 500 }}>
          {quote}
        </p>
        <div style={{ width: 32, height: 2, background: TERRA, borderRadius: 2, margin: '0 auto 12px' }} />
        <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.55)',
          letterSpacing: '0.3em', textTransform: 'uppercase', margin: 0 }}>
          — {clientName} · {projectSummary.city}
        </p>
        {/* Stars */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginTop: 12 }}>
          {[1,2,3,4,5].map(s => (
            <motion.span key={s} initial={{ scale: 0 }} whileInView={{ scale: 1 }}
              viewport={{ once: true }} transition={{ delay: 0.3 + s * 0.06, type: 'spring', stiffness: 300 }}
              style={{ fontSize: 18, color: '#F5C518' }}>★</motion.span>
          ))}
        </div>
      </motion.div>

      {/* ── Comic Section ── */}
      <ComicSection />

    </div>
  );
};

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

  const isWA = post.heroType === 'whatsapp-story';

  return (
    <div style={{ background: CREAM, minHeight: '100vh', color: INK, fontFamily: 'Barlow, sans-serif', overflowX: 'hidden' }}>
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

        {/* ── WhatsApp story hero ── */}
        {isWA && (
          <div ref={heroRef} style={{ background: INK, position: 'relative', overflow: 'hidden',
            borderBottom: `3px solid ${TERRA}` }}>
            {/* Subtle texture */}
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
                The Build Journey · March – November 2024
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
          {!isWA && (
            <motion.h1 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ fontSize: 'clamp(1.8rem,5vw,3.5rem)', textTransform: 'uppercase',
                letterSpacing: '-0.02em', lineHeight: 1.1, color: INK, margin: '0 auto 20px', maxWidth: 700 }}>
              {post.title}
            </motion.h1>
          )}
          {isWA && (
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: isWA ? 0 : 72 }}>
              {post.gallery.map((item, idx) => {
                if (item.type === 'single') return (
                  <motion.div key={idx} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                    viewport={{ once: true }} transition={{ duration: 0.8 }}
                    style={{ width: '100%', aspectRatio: '21/9', overflow: 'hidden' }}>
                    <img src={item.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </motion.div>
                );
                if (item.type === 'double') return (
                  <motion.div key={idx} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                    viewport={{ once: true }} transition={{ duration: 0.8 }}
                    style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    {item.images.map((img, i) => (
                      <div key={i} style={{ aspectRatio: '3/2', overflow: 'hidden' }}>
                        <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
                if (item.type === 'whatsapp') return (
                  <div key={idx}><WhatsAppStory story={item.story} /></div>
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
