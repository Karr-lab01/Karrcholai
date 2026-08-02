import React from 'react';
import { motion } from 'framer-motion';

const TERRA  = '#B85C38';
const FOREST = '#2D4B37';
const GOLD   = '#c9a84c';
const INK    = '#1A1A1A';
const CREAM  = '#FAF9F6';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay },
});

/* ── Eight directional lords ── */
const DIRECTIONS = [
  { dir: 'N',  symbol: '↑', lord: 'Kubera',   gift: 'Wealth & Prosperity' },
  { dir: 'NE', symbol: '↗', lord: 'Ishanya',  gift: 'Wisdom & Clarity' },
  { dir: 'E',  symbol: '→', lord: 'Indra',    gift: 'Power & Success' },
  { dir: 'SE', symbol: '↘', lord: 'Agni',     gift: 'Energy & Health' },
  { dir: 'S',  symbol: '↓', lord: 'Yama',     gift: 'Discipline & Order' },
  { dir: 'SW', symbol: '↙', lord: 'Niruthi',  gift: 'Stability & Strength' },
  { dir: 'W',  symbol: '←', lord: 'Varuna',   gift: 'Flow & Creativity' },
  { dir: 'NW', symbol: '↖', lord: 'Vayu',     gift: 'Air & Vitality' },
];

export default function VastuArticle() {
  return (
    <div style={{ fontFamily: 'Barlow, sans-serif', color: INK }}>

      {/* ── SECTION 1 — Opening pull quote ── */}
      <motion.div {...fadeUp(0)} style={{
        borderLeft: `3px solid ${GOLD}`,
        paddingLeft: 28,
        margin: '48px 0 56px',
      }}>
        <p style={{
          fontSize: 'clamp(1.1rem, 2.5vw, 1.45rem)',
          fontWeight: 500,
          lineHeight: 1.7,
          color: INK,
          fontStyle: 'italic',
          margin: 0,
        }}>
          "It is due to the movement of stars and planets. Our ancestors — the wise and the ascetics — discovered that this magnetic power causes harm to humans, and they created these scriptures to save humanity from its impact."
        </p>
        <p style={{ marginTop: 14, fontSize: 11, fontWeight: 900, letterSpacing: '0.35em', textTransform: 'uppercase', color: TERRA }}>
          Ancient Vastu Scripture
        </p>
      </motion.div>

      {/* ── SECTION 2 — Cosmic origin ── */}
      <motion.div {...fadeUp(0.05)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
          <span style={{ fontSize: 22, lineHeight: 1 }}>✦</span>
          <p style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.5em', textTransform: 'uppercase', color: TERRA, margin: 0 }}>
            The Cosmic Origin
          </p>
        </div>
        <p style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)', lineHeight: 1.85, color: 'rgba(26,26,26,0.72)', marginBottom: 18 }}>
          The great sages observed that the universe is not static. The constant motion of celestial bodies generates invisible forces — magnetic in nature — that permeate every corner of the Earth, including the spaces where humans live, work, and rest.
        </p>
        <p style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)', lineHeight: 1.85, color: 'rgba(26,26,26,0.72)', marginBottom: 0 }}>
          Rather than accept this influence as fate, they sought to understand it, master it, and codify a way to live in harmony with it. The result was the Vastu Shastras — an ancient science encoded into scripture.
        </p>
      </motion.div>

      {/* ── DIVIDER ── */}
      <motion.div {...fadeUp(0.05)} style={{ margin: '52px 0', display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ flex: 1, height: 1, background: 'rgba(26,26,26,0.08)' }} />
        <span style={{ color: GOLD, fontSize: 16 }}>◈</span>
        <div style={{ flex: 1, height: 1, background: 'rgba(26,26,26,0.08)' }} />
      </motion.div>

      {/* ── SECTION 3 — Dark callout: The Shield ── */}
      <motion.div {...fadeUp(0.05)} style={{
        background: INK,
        borderRadius: 4,
        padding: 'clamp(32px, 5vw, 52px)',
        margin: '0 0 52px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* subtle dot grid */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: '16px 16px', pointerEvents: 'none' }} />
        <p style={{ fontSize: 9, fontWeight: 900, letterSpacing: '0.5em', textTransform: 'uppercase', color: TERRA, marginBottom: 18, position: 'relative' }}>
          Why Were the Vastu Shastras Written?
        </p>
        <p style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.35rem)', fontWeight: 700, color: '#fff', lineHeight: 1.55, marginBottom: 20, position: 'relative' }}>
          They were not written as architectural guidelines.<br />They were written as a shield.
        </p>
        <p style={{ fontSize: 'clamp(0.9rem, 1.6vw, 1rem)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.85, margin: 0, position: 'relative' }}>
          The sages understood that unaligned structures would place families in the path of harmful cosmic forces. By aligning a home according to the scriptures, those forces could be redirected into sources of peace and prosperity — and every room, every door, every direction carries that responsibility.
        </p>
      </motion.div>

      {/* ── SECTION 4 — Magnet principle ── */}
      <motion.div {...fadeUp(0.05)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
          <span style={{ fontSize: 22, lineHeight: 1 }}>✦</span>
          <p style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.5em', textTransform: 'uppercase', color: TERRA, margin: 0 }}>
            The Magnet Principle
          </p>
        </div>
      </motion.div>

      {/* Two-column highlight */}
      <motion.div {...fadeUp(0.07)} style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 2,
        margin: '0 0 52px',
      }}>
        {[
          { icon: '🧲', label: 'The Law', text: 'No matter how many pieces a magnet is broken into, each small part retains the full nature of the original magnet.' },
          { icon: '🏠', label: 'The Truth', text: 'A small home built correctly carries the same completeness and blessing as a large one. Size does not determine goodness — alignment does.' },
        ].map((card, i) => (
          <div key={i} style={{
            background: i === 0 ? `${FOREST}10` : `${TERRA}0d`,
            border: `1px solid ${i === 0 ? FOREST : TERRA}22`,
            padding: 28,
          }}>
            <span style={{ fontSize: 28, display: 'block', marginBottom: 14 }}>{card.icon}</span>
            <p style={{ fontSize: 9, fontWeight: 900, letterSpacing: '0.4em', textTransform: 'uppercase', color: i === 0 ? FOREST : TERRA, marginBottom: 10 }}>{card.label}</p>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.75, color: 'rgba(26,26,26,0.7)', margin: 0 }}>{card.text}</p>
          </div>
        ))}
      </motion.div>

      {/* ── DIVIDER ── */}
      <motion.div {...fadeUp(0.05)} style={{ margin: '0 0 52px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ flex: 1, height: 1, background: 'rgba(26,26,26,0.08)' }} />
        <span style={{ color: GOLD, fontSize: 16 }}>◈</span>
        <div style={{ flex: 1, height: 1, background: 'rgba(26,26,26,0.08)' }} />
      </motion.div>

      {/* ── SECTION 5 — Eight directions grid ── */}
      <motion.div {...fadeUp(0.05)} style={{ marginBottom: 36 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
          <span style={{ fontSize: 22, lineHeight: 1 }}>✦</span>
          <p style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.5em', textTransform: 'uppercase', color: TERRA, margin: 0 }}>
            The Eight Directions &amp; Their Lords
          </p>
        </div>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: 'rgba(26,26,26,0.65)', margin: '14px 0 28px' }}>
          Vastu recognises eight directional forces — each presided over by a divine lord. When a home is built in harmony with these directions, it invites their blessings from all eight quarters.
        </p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, marginBottom: 52 }}>
        {DIRECTIONS.map((d, i) => (
          <motion.div
            key={d.dir}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            style={{
              background: '#fff',
              border: '1px solid rgba(26,26,26,0.07)',
              padding: '20px 16px',
              textAlign: 'center',
            }}
          >
            <p style={{ fontSize: 20, fontWeight: 900, color: GOLD, margin: '0 0 4px', lineHeight: 1 }}>{d.symbol}</p>
            <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.2em', color: INK, margin: '0 0 6px' }}>{d.dir}</p>
            <p style={{ fontSize: 11, fontWeight: 700, color: FOREST, margin: '0 0 6px' }}>{d.lord}</p>
            <p style={{ fontSize: 10, color: 'rgba(26,26,26,0.45)', margin: 0, lineHeight: 1.4 }}>{d.gift}</p>
          </motion.div>
        ))}
      </div>

      {/* ── SECTION 6 — Gold full-bleed closing callout ── */}
      <motion.div {...fadeUp(0.05)} style={{
        background: `linear-gradient(135deg, ${FOREST} 0%, #1a3322 100%)`,
        borderRadius: 4,
        padding: 'clamp(36px, 6vw, 60px)',
        margin: '0 0 8px',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.05,
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(255,255,255,0.15) 8px, rgba(255,255,255,0.15) 9px)`,
          pointerEvents: 'none' }} />
        <p style={{ fontSize: 9, fontWeight: 900, letterSpacing: '0.5em', textTransform: 'uppercase', color: GOLD, marginBottom: 18, position: 'relative' }}>
          What This Means For Your Plot
        </p>
        <p style={{ fontSize: 'clamp(1rem, 2.2vw, 1.25rem)', color: '#fff', lineHeight: 1.7, maxWidth: 520, margin: '0 auto 24px', fontWeight: 400, position: 'relative' }}>
          Before you build, understand your land. The shape of the plot, its direction relative to roads, the slope of the terrain — all of these are Vastu considerations that the ancient scriptures address in detail.
        </p>
        <div style={{ width: 40, height: 1, background: `${GOLD}60`, margin: '0 auto 24px', position: 'relative' }} />
        <p style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.05rem)', color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, maxWidth: 480, margin: '0 auto', position: 'relative' }}>
          At Karrcholai, our Vastu consultant integrates these principles from the very first design stage — not as an afterthought, but as the foundation of the plan itself. Because a home built with the stars in its favour is not just a structure.
        </p>
        <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', fontWeight: 700, color: GOLD, marginTop: 20, position: 'relative' }}>
          It is a blessing.
        </p>
      </motion.div>

    </div>
  );
}
