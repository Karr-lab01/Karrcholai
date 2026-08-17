import React from 'react';
import { motion } from 'framer-motion';

/* ─── Design tokens ─────────────────────────────────── */
const G   = '#2D4B37';
const T   = '#B85C38';
const BG  = '#F7F6F2';
const W   = '#FFFFFF';
const INK = '#18181B';

/* ─── Smooth reveal ─────────────────────────────────── */
function Up({ children, d = 0, style = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: d, ease: [0.16, 1, 0.3, 1] }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ─── Clean modern panel card ───────────────────────── */
function Card({ children, style = {} }) {
  return (
    <div style={{ background: W, borderRadius: 20, boxShadow: '0 2px 20px rgba(0,0,0,0.07)', overflow: 'hidden', ...style }}>
      {children}
    </div>
  );
}

/* ─── Panel header strip ────────────────────────────── */
function PanelHeader({ n, tag, title, color = G }) {
  return (
    <Up>
      <div style={{ background: color, borderRadius: 20, padding: '22px 28px', display: 'flex', alignItems: 'center', gap: 20, boxShadow: `0 4px 24px ${color}44` }}>
        <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '2px solid rgba(255,255,255,0.35)' }}>
          <span style={{ fontSize: 22, fontWeight: 900, color: W, lineHeight: 1 }}>{n}</span>
        </div>
        <div>
          <p style={{ fontSize: 9, fontWeight: 800, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.42em', textTransform: 'uppercase', margin: '0 0 3px' }}>{tag}</p>
          <h3 style={{ fontSize: 'clamp(1rem,2.2vw,1.4rem)', fontWeight: 900, color: W, margin: 0, lineHeight: 1.2 }}>{title}</h3>
        </div>
      </div>
    </Up>
  );
}

/* ─── Narrative caption ─────────────────────────────── */
function Caption({ text, color = G, d = 0 }) {
  return (
    <Up d={d}>
      <div style={{ display: 'inline-block', background: color, borderRadius: 10, padding: '8px 16px', boxShadow: `0 4px 16px ${color}33` }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: W, margin: 0, lineHeight: 1.55, fontStyle: 'italic' }}>{text}</p>
      </div>
    </Up>
  );
}

/* ─── Modern speech bubble ──────────────────────────── */
function Bubble({ side = 'left', name, role, bg, text, d = 0 }) {
  const R = side === 'right';
  return (
    <Up d={d}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: R ? 'flex-end' : 'flex-start', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexDirection: R ? 'row-reverse' : 'row' }}>
          <div style={{ width: 38, height: 38, borderRadius: '50%', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 15, color: W, flexShrink: 0, boxShadow: `0 2px 10px ${bg}55` }}>{name[0]}</div>
          <div style={{ textAlign: R ? 'right' : 'left' }}>
            <p style={{ fontSize: 12, fontWeight: 800, color: INK, margin: 0 }}>{name}</p>
            <p style={{ fontSize: 9, fontWeight: 700, color: T, margin: 0, textTransform: 'uppercase', letterSpacing: '0.18em' }}>{role}</p>
          </div>
        </div>
        <div style={{ position: 'relative', maxWidth: '84%' }}>
          <div style={{ position: 'absolute', top: 12, [R ? 'right' : 'left']: -7, width: 0, height: 0, borderTop: '7px solid transparent', borderBottom: '7px solid transparent', [R ? 'borderLeft' : 'borderRight']: `8px solid ${R ? '#F0EFF9' : W}`, filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.08))' }} />
          <div style={{ background: R ? '#F0EFF9' : W, borderRadius: R ? '18px 4px 18px 18px' : '4px 18px 18px 18px', padding: '12px 16px', boxShadow: '0 2px 16px rgba(0,0,0,0.08)' }}>
            <p style={{ fontSize: 13.5, color: INK, lineHeight: 1.65, margin: 0, fontWeight: 500 }}>"{text}"</p>
          </div>
        </div>
      </div>
    </Up>
  );
}

/* ─── Insight callout ───────────────────────────────── */
function Tip({ text, d = 0 }) {
  return (
    <Up d={d}>
      <div style={{ background: 'linear-gradient(135deg, #FFF8EE, #FFF3E0)', border: '1.5px solid #F5C97844', borderLeft: '4px solid #F5C978', borderRadius: 12, padding: '12px 16px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        <span style={{ fontSize: 16, flexShrink: 0 }}>💡</span>
        <p style={{ fontSize: 13, color: INK, lineHeight: 1.65, margin: 0, fontWeight: 600 }}>{text}</p>
      </div>
    </Up>
  );
}

/* ─── Bullet list ───────────────────────────────────── */
function Dots({ items, color = G }) {
  return (
    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: color, flexShrink: 0, marginTop: 6 }} />
          <span style={{ fontSize: 13, color: 'rgba(0,0,0,0.65)', lineHeight: 1.55 }}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/* ─── Mini divider ──────────────────────────────────── */
function Divider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '4px 0' }}>
      <div style={{ flex: 1, height: 1, background: 'rgba(0,0,0,0.07)' }} />
      <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(0,0,0,0.15)' }} />
      <div style={{ flex: 1, height: 1, background: 'rgba(0,0,0,0.07)' }} />
    </div>
  );
}

/* ─── Two-col info block ────────────────────────────── */
function TwoCol({ left, right }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'rgba(0,0,0,0.05)', borderRadius: 14, overflow: 'hidden' }}>
      <div style={{ background: W, padding: '16px 18px' }}>
        <p style={{ fontSize: 9, fontWeight: 800, color: T, letterSpacing: '0.38em', textTransform: 'uppercase', margin: '0 0 10px' }}>{left.label}</p>
        <Dots items={left.items} color={T} />
      </div>
      <div style={{ background: BG, padding: '16px 18px' }}>
        <p style={{ fontSize: 9, fontWeight: 800, color: G, letterSpacing: '0.38em', textTransform: 'uppercase', margin: '0 0 10px' }}>{right.label}</p>
        <Dots items={right.items} color={G} />
      </div>
    </div>
  );
}

/* ─── Assessment pill ───────────────────────────────── */
function Pill({ text }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 700, color: G, background: `${G}12`, borderRadius: 20, padding: '3px 11px', border: `1px solid ${G}28` }}>
      ✓ {text}
    </span>
  );
}

/* ─── Transition marker ─────────────────────────────── */
function Next() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 6px' }}>
      <svg width="24" height="32" viewBox="0 0 24 32" fill="none">
        <path d="M12 0 L12 28 M5 21 L12 30 L19 21" stroke={G} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/* ─── Room size table ───────────────────────────────── */
function RoomTable() {
  const rows = [
    { space: 'Portico',          size: "15'-9\" × 17'-6\"",       verdict: 'Very spacious' },
    { space: 'Hall',             size: "15'-10\" × 16'-0\"",      verdict: 'Excellent' },
    { space: 'Kitchen + Dining', size: "10'-0\" × 16'-0\"",       verdict: 'Adequate, but compact' },
    { space: 'Master Bedroom',   size: "10'-0\" × 16'-0\"",       verdict: 'Good' },
    { space: 'Dressing',         size: "4'-2\" × 5'-0\"",         verdict: 'Compact' },
    { space: 'Toilet',           size: "4'-2\" × 6'-0\"",         verdict: 'Usably compact' },
    { space: 'Self / Utility',   size: "4'-2\" × 4'-0\"",         verdict: 'Small' },
    { space: 'Bedroom 2',        size: "10'-0\" × 10'-0\"",       verdict: 'Practical size' },
    { space: 'Toilet 2',         size: "4'-0\" × 6'-9\" approx.", verdict: 'Usable' },
    { space: 'Staircase',        size: 'Front / right side',      verdict: 'Good for future floor' },
  ];
  return (
    <Up d={0.05}>
      <Card>
        <div style={{ background: G, padding: '12px 20px' }}>
          <p style={{ fontSize: 9, fontWeight: 800, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.42em', textTransform: 'uppercase', margin: 0 }}>Approximate Room Sizes</p>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: BG }}>
              {['Space', 'Size', 'Assessment'].map(h => (
                <th key={h} style={{ padding: '10px 18px', textAlign: 'left', fontWeight: 800, fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <motion.tr key={i} initial={{ opacity: 0, x: -6 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04, duration: 0.4 }} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                <td style={{ padding: '11px 18px', fontWeight: 700, color: INK, fontSize: 13 }}>{r.space}</td>
                <td style={{ padding: '11px 18px', color: 'rgba(0,0,0,0.45)', fontFamily: 'monospace', fontSize: 12 }}>{r.size}</td>
                <td style={{ padding: '11px 18px' }}><Pill text={r.verdict} /></td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </Card>
    </Up>
  );
}

/* ─── Plot stat strip ───────────────────────────────── */
function PlotStats() {
  const stats = [
    { label: 'Site',       value: "30' × 65'" },
    { label: 'Road',       value: 'North' },
    { label: 'N Width',    value: "27'-3\"" },
    { label: 'S Width',    value: "22'-3\"" },
    { label: 'Depth',      value: "51'-9\"" },
    { label: 'Front Open', value: "10'-9\"" },
  ];
  return (
    <Up d={0.04}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2, background: 'rgba(0,0,0,0.04)', borderRadius: 18, overflow: 'hidden' }}>
        {stats.map((s, i) => (
          <div key={i} style={{ background: i % 2 === 0 ? W : BG, padding: '14px 10px', textAlign: 'center' }}>
            <p style={{ fontSize: 8, fontWeight: 700, color: 'rgba(0,0,0,0.35)', textTransform: 'uppercase', letterSpacing: '0.28em', margin: '0 0 4px' }}>{s.label}</p>
            <p style={{ fontSize: 17, fontWeight: 900, color: G, margin: 0 }}>{s.value}</p>
          </div>
        ))}
      </div>
    </Up>
  );
}

/* ─── Verdict grid ──────────────────────────────────── */
function VerdictGrid() {
  const pros = ['A spacious living hall', 'A comfortable master bedroom', 'Practical kitchen and dining space', 'Large parking area', 'Future staircase provision', 'Efficient use of the plot'];
  const cons = ['Second bedroom size', 'Dressing area', 'Toilet width', 'Utility space', 'Privacy planning', 'Ventilation review', 'Structural coordination'];
  return (
    <Up d={0.05}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <Card>
          <div style={{ background: G, padding: '12px 18px' }}>
            <p style={{ fontSize: 9, fontWeight: 800, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.42em', textTransform: 'uppercase', margin: 0 }}>Strengths</p>
          </div>
          <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 9 }}>
            {pros.map((p, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
                <span style={{ width: 18, height: 18, borderRadius: '50%', background: `${G}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                  <span style={{ fontSize: 10 }}>✓</span>
                </span>
                <span style={{ fontSize: 12.5, color: INK, fontWeight: 600, lineHeight: 1.45 }}>{p}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <div style={{ background: G, padding: '12px 18px' }}>
            <p style={{ fontSize: 9, fontWeight: 800, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.42em', textTransform: 'uppercase', margin: 0 }}>Can Improve</p>
          </div>
          <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 9 }}>
            {cons.map((c, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
                <span style={{ width: 18, height: 18, borderRadius: '50%', background: `${G}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                  <span style={{ fontSize: 10 }}>✓</span>
                </span>
                <span style={{ fontSize: 12.5, color: INK, fontWeight: 600, lineHeight: 1.45 }}>{c}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Up>
  );
}

/* ════════════════════════════════════════════════════════
   MAIN EXPORT
════════════════════════════════════════════════════════ */
export default function FirstStoneSection() {
  return (
    <div style={{ fontFamily: 'Barlow, sans-serif', background: BG, padding: '0 0 60px' }}>

      {/* ── HERO COVER ─────────────────────────────────────── */}
      <Up>
        <div style={{ background: `linear-gradient(135deg, ${G} 0%, #1e3828 100%)`, borderRadius: 24, overflow: 'hidden', marginBottom: 40, boxShadow: '0 8px 40px rgba(45,75,55,0.25)', position: 'relative' }}>
          <div style={{ position: 'absolute', bottom: -60, right: -60, width: 220, height: 220, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: -40, left: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />
          <div style={{ padding: '10px 24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 9, fontWeight: 800, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.45em', textTransform: 'uppercase' }}>Karrcholai · The Journal</span>
            <span style={{ fontSize: 9, fontWeight: 800, color: T, letterSpacing: '0.3em', textTransform: 'uppercase' }}>July 2026</span>
          </div>
          <div style={{ padding: '28px 32px 36px', textAlign: 'center', position: 'relative' }}>
            <div style={{ marginBottom: 10 }}>
              <span style={{ fontSize: 9, fontWeight: 800, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.5em', textTransform: 'uppercase' }}>Plan Review — Issue 001</span>
            </div>
            <h1 style={{ fontSize: 'clamp(1.8rem,5vw,3rem)', fontWeight: 900, color: W, margin: '0 0 8px', lineHeight: 1.05, letterSpacing: '-0.02em' }}>The First Stone</h1>
            <p style={{ fontSize: 'clamp(0.95rem,2vw,1.2rem)', fontWeight: 600, color: 'rgba(255,255,255,0.65)', margin: '0 0 20px', lineHeight: 1.5 }}>Is This House Plan Right for My Family?</p>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 8 }}>
              {["30′ × 65′ Plot", "2 Bedrooms", "North Facing", "Ground Floor"].map((tag, i) => (
                <span key={i} style={{ fontSize: 10, fontWeight: 700, color: W, background: 'rgba(255,255,255,0.12)', borderRadius: 20, padding: '4px 12px', letterSpacing: '0.08em', border: '1px solid rgba(255,255,255,0.2)' }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </Up>

      {/* ── STORY CHARACTERS ──────────────────────────────── */}
      <Up d={0.05}>
        <div style={{ marginBottom: 36 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(0,0,0,0.08)' }} />
            <span style={{ fontSize: 9, fontWeight: 900, color: T, letterSpacing: '0.48em', textTransform: 'uppercase' }}>The Story</span>
            <div style={{ flex: 1, height: 1, background: 'rgba(0,0,0,0.08)' }} />
          </div>
          <p style={{ fontSize: 13, color: 'rgba(0,0,0,0.45)', textAlign: 'center', margin: '0 0 20px', lineHeight: 1.6 }}>
            A real family brought their contractor's plan to Karrcholai before breaking ground.<br />This is how that conversation went.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>

            {/* Client card */}
            <motion.div
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.06, ease: [0.16,1,0.3,1] }}
              style={{ background: W, border: '1.5px solid rgba(58,110,165,0.18)', borderRadius: 20, padding: '22px 18px 18px', boxShadow: '0 3px 18px rgba(58,110,165,0.09)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, position: 'relative', overflow: 'hidden' }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: '#3A6EA5', borderRadius: '20px 20px 0 0' }} />
              <div style={{ width: 74, height: 74, borderRadius: '50%', background: 'linear-gradient(135deg, #3A6EA5, #1d4a80)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 34, boxShadow: '0 4px 18px rgba(58,110,165,0.3)', border: '3px solid rgba(255,255,255,0.9)' }}>👨‍👩‍👧</div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: 15, fontWeight: 900, color: INK, margin: '0 0 3px', letterSpacing: '-0.01em' }}>The Client</p>
                <p style={{ fontSize: 9, fontWeight: 800, color: '#3A6EA5', textTransform: 'uppercase', letterSpacing: '0.3em', margin: '0 0 10px' }}>Plot Owner · Homebuilder</p>
                <p style={{ fontSize: 12, color: 'rgba(0,0,0,0.52)', lineHeight: 1.6, margin: 0 }}>A family with a 30′×65′ plot, a contractor's plan, and one big question before they commit their life savings.</p>
              </div>
              <div style={{ background: 'rgba(58,110,165,0.07)', border: '1px solid rgba(58,110,165,0.18)', borderRadius: '4px 14px 14px 14px', padding: '10px 14px', width: '100%' }}>
                <p style={{ fontSize: 12, color: '#1d4a80', fontStyle: 'italic', margin: 0, lineHeight: 1.55 }}>"Is this plan truly good enough for my family?"</p>
              </div>
            </motion.div>

            {/* Engineer card */}
            <motion.div
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.13, ease: [0.16,1,0.3,1] }}
              style={{ background: W, border: `1.5px solid ${G}28`, borderRadius: 20, padding: '22px 18px 18px', boxShadow: `0 3px 18px ${G}12`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, position: 'relative', overflow: 'hidden' }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: G, borderRadius: '20px 20px 0 0' }} />
              <div style={{ width: 74, height: 74, borderRadius: '50%', background: `linear-gradient(135deg, ${G}, #1e3828)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 34, boxShadow: `0 4px 18px ${G}44`, border: '3px solid rgba(255,255,255,0.9)' }}>👷</div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: 15, fontWeight: 900, color: INK, margin: '0 0 3px', letterSpacing: '-0.01em' }}>Karrcholai Engineer</p>
                <p style={{ fontSize: 9, fontWeight: 800, color: G, textTransform: 'uppercase', letterSpacing: '0.3em', margin: '0 0 10px' }}>Design Consultant · Karrcholai</p>
                <p style={{ fontSize: 12, color: 'rgba(0,0,0,0.52)', lineHeight: 1.6, margin: 0 }}>A Karrcholai design engineer who walks through every room — honest, detailed, no agenda except getting it right.</p>
              </div>
              <div style={{ background: `${G}0d`, border: `1px solid ${G}28`, borderRadius: '4px 14px 14px 14px', padding: '10px 14px', width: '100%' }}>
                <p style={{ fontSize: 12, color: G, fontStyle: 'italic', margin: 0, lineHeight: 1.55 }}>"Let's walk through every space together — what works, what can be better."</p>
              </div>
            </motion.div>

          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '20px 0 0' }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(0,0,0,0.07)' }} />
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: BG, border: '1.5px solid rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 900, color: 'rgba(0,0,0,0.3)', letterSpacing: '0.05em' }}>VS</div>
            <div style={{ flex: 1, height: 1, background: 'rgba(0,0,0,0.07)' }} />
          </div>
        </div>
      </Up>

      {/* ── OPENING SCENE ─────────────────────────────────── */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ marginBottom: 14 }}>
          <Caption text="A family arrives at Karrcholai's office with a house plan. One question on their mind." color={T} d={0.04} />
        </div>
        <Card>
          <div style={{ padding: '24px 24px', display: 'flex', flexDirection: 'column', gap: 18 }}>
            <Bubble side="left" name="Client" role="30′ × 65′ Plot Owner" bg="#3A6EA5"
              text="I have a plan ready. My contractor says it's fine. But before we break ground — I want your honest review. Is this plan truly good enough for my family?" d={0.05} />
            <Divider />
            <Bubble side="right" name="Karrcholai" role="Design Consultant" bg={G}
              text="A good plan isn't just about fitting rooms inside a plot. Let's walk through every space together — what works, what can be better, and most importantly, why." d={0.1} />
          </div>
        </Card>
      </div>

      {/* ── PLOT STATS ────────────────────────────────────── */}
      <div style={{ marginBottom: 10 }}>
        <Caption text="The Plot — 30 feet wide. 65 deep. Road faces North. Built-up area starts 10′-9″ from the front." color={G} d={0.04} />
      </div>
      <div style={{ marginBottom: 10 }}><PlotStats /></div>
      <div style={{ marginBottom: 8, marginTop: 28 }}>
        <Caption text="Room by room. Let's read what's on paper." d={0.04} />
      </div>
      <div style={{ marginBottom: 36 }}><RoomTable /></div>

      <Next />

      {/* ══ PANEL 1 — FRONT OPEN SPACE ══ */}
      <div style={{ marginBottom: 36 }}>
        <PanelHeader n="1" tag="Understanding the Plot" title="Why Front Open Space Is Essential" color={G} />
        <Up d={0.06}>
          <Card style={{ marginTop: 14 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, background: 'rgba(0,0,0,0.04)' }}>
              <div style={{ background: W, padding: '20px 20px' }}>
                <p style={{ fontSize: 13, color: 'rgba(0,0,0,0.62)', lineHeight: 1.78, margin: 0 }}>The 10′-9″ front space is not wasted land. It holds parking, the entry zone, natural light, ventilation, future landscaping, and critical services like the septic tank.</p>
              </div>
              <div style={{ background: BG, padding: '20px 20px' }}>
                <p style={{ fontSize: 9, fontWeight: 800, color: G, letterSpacing: '0.38em', textTransform: 'uppercase', margin: '0 0 10px' }}>This space gives you</p>
                <Dots items={['Car parking', 'Entry room & approach', 'Natural light & ventilation', 'Landscaping potential', 'Septic & service access']} color={G} />
              </div>
            </div>
          </Card>
        </Up>
        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Bubble side="left" name="Client" role="Plot Owner" bg="#3A6EA5" text="Why do we need open space in front? Why not build right up to the road?" d={0.05} />
          <Bubble side="right" name="Karrcholai" role="Design Consultant" bg={G} text="Because a house that breathes from the front stays comfortable for decades. You can close walls. You can never add light after the walls go up." d={0.1} />
        </div>
      </div>

      <Next />

      {/* ══ PANEL 2 — PORTICO ══ */}
      <div style={{ marginBottom: 36 }}>
        <PanelHeader n="2" tag="The Front Portico" title="15′-9″ × 17′-6″ — Generous Entry" color={T} />
        <Up d={0.06}>
          <Card style={{ marginTop: 14 }}>
            <div style={{ padding: '22px 22px' }}>
              <p style={{ fontSize: 13, color: 'rgba(0,0,0,0.62)', lineHeight: 1.78, margin: '0 0 16px' }}>A generous portico — great for comfortable car parking, a strong first impression, and family arrivals. Whether this size is right depends entirely on your priorities.</p>
              <Tip text="If parking isn't your priority, this area could become a sit-out, garden, or an extended living edge — adding real daily value." d={0} />
            </div>
          </Card>
        </Up>
        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Bubble side="left" name="Client" role="Plot Owner" bg="#3A6EA5" text="The portico seems quite large. Is this really the right use of the space?" d={0.05} />
          <Bubble side="right" name="Karrcholai" role="Design Consultant" bg={G} text="If two cars and a grand entry fits your lifestyle — absolutely yes. If not, this is prime real estate we can redesign as a garden or sit-out before you finalise." d={0.1} />
        </div>
      </div>

      <Next />

      {/* ══ PANEL 3 — HALL ══ */}
      <div style={{ marginBottom: 36 }}>
        <PanelHeader n="3" tag="The Heart of the Home" title="Hall — 15′-10″ × 16′ — Excellent" color={G} />
        <Up d={0.06}>
          <Card style={{ marginTop: 14 }}>
            <div style={{ padding: '20px 22px 16px' }}>
              <p style={{ fontSize: 13, color: 'rgba(0,0,0,0.62)', lineHeight: 1.78, margin: '0 0 16px' }}>The living hall is the strongest feature of this plan. Spacious enough for full sofa seating, a TV unit, family gatherings, and easy movement. Door positions and circulation must be carefully planned to maintain privacy between spaces.</p>
              <TwoCol
                left={{ label: 'Fits Comfortably', items: ['Full sofa set', 'TV unit & shelving', 'Dining table nearby', 'Family of 6+'] }}
                right={{ label: 'Review These', items: ['Door swing directions', 'Privacy from entry', 'Natural light source', 'Ceiling fan positions'] }}
              />
            </div>
          </Card>
        </Up>
        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Bubble side="left" name="Client" role="Plot Owner" bg="#3A6EA5" text="The hall looks big. Is there a concern?" d={0.05} />
          <Bubble side="right" name="Karrcholai" role="Design Consultant" bg={G} text="No concern with the size — it's excellent. The question is how we connect it to the bedrooms and kitchen without letting every hall conversation reach every bedroom." d={0.1} />
        </div>
      </div>

      <Next />

      {/* ══ PANEL 4 — KITCHEN ══ */}
      <div style={{ marginBottom: 36 }}>
        <PanelHeader n="4" tag="Kitchen and Dining" title="10′ × 16′ — Adequate. Plan It Well." color={T} />
        <Up d={0.06}>
          <Card style={{ marginTop: 14 }}>
            <div style={{ padding: '20px 22px 16px' }}>
              <TwoCol
                left={{ label: 'Flow', items: ['Cooking → Dining', 'Dining → Living', 'Easy family movement'] }}
                right={{ label: 'Must Plan', items: ['Natural ventilation', 'Exhaust + window', 'Counter space', 'Fridge position'] }}
              />
              <div style={{ marginTop: 14 }}>
                <Tip text="A compact kitchen with good ventilation, well-placed windows, and a smart counter layout will outperform a large kitchen that's badly planned." d={0} />
              </div>
            </div>
          </Card>
        </Up>
        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Bubble side="left" name="Client" role="Plot Owner" bg="#3A6EA5" text="The kitchen looks tight. Can it actually be comfortable to cook in every day?" d={0.05} />
          <Bubble side="right" name="Karrcholai" role="Design Consultant" bg={G} text="With the right platform layout, storage, and exhaust positioning — yes. We've built smaller kitchens that work far better than larger ones designed without thought." d={0.1} />
        </div>
      </div>

      <Next />

      {/* ══ PANEL 5 — MASTER BEDROOM ══ */}
      <div style={{ marginBottom: 36 }}>
        <PanelHeader n="5" tag="The Master Bedroom" title="10′ × 16′ — Good. Dressing & Toilet Attached." color={G} />
        <Up d={0.06}>
          <Card style={{ marginTop: 14 }}>
            <div style={{ padding: '20px 22px' }}>
              <p style={{ fontSize: 13, color: 'rgba(0,0,0,0.62)', lineHeight: 1.78, margin: '0 0 14px' }}>Comfortable bed, wardrobe, side tables, and extra furniture all fit here. The attached dressing area and toilet are functional — but the dressing space is compact. Study the wardrobe layout before walls go up.</p>
              <Dots items={['King-size bed with room to walk', 'Full wardrobe on one wall', 'Side tables both sides', 'Attached toilet + dressing confirmed']} color={G} />
            </div>
          </Card>
        </Up>
        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Bubble side="left" name="Client" role="Plot Owner" bg="#3A6EA5" text="My wife is worried about the dressing area. 4′-2″ × 5′ seems very narrow for daily use." d={0.05} />
          <Bubble side="right" name="Karrcholai" role="Design Consultant" bg={G} text="It is compact — but a sliding wardrobe door, a wall-mounted mirror, and an outward toilet swing door solves it completely. The dimensions are workable with the right fittings." d={0.1} />
        </div>
      </div>

      <Next />

      {/* ══ PANEL 6 — BEDROOM 2 ══ */}
      <div style={{ marginBottom: 36 }}>
        <PanelHeader n="6" tag="The Second Bedroom" title="10′ × 10′ — Practical. Room to Grow." color={T} />
        <Up d={0.06}>
          <Card style={{ marginTop: 14 }}>
            <div style={{ padding: '20px 22px 16px' }}>
              <TwoCol
                left={{ label: 'Works well for', items: ["Single bed + wardrobe", "Children's room", "Guest bedroom", "Home office"] }}
                right={{ label: '+1 or +2 ft gives you', items: ['Double bed option', 'Better furniture layout', 'More walking space', 'Future flexibility'] }}
              />
              <div style={{ marginTop: 14 }}>
                <Tip text="Small change. Big difference. Adding 1 foot before construction costs almost nothing. After construction, it costs a demolition." d={0} />
              </div>
            </div>
          </Card>
        </Up>
        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Bubble side="left" name="Client" role="Plot Owner" bg="#3A6EA5" text="10 × 10 for a bedroom — is that really enough for a family?" d={0.05} />
          <Bubble side="right" name="Karrcholai" role="Design Consultant" bg={G} text="It works today. But if you can spare one extra foot from the hall or utility side, your family will thank you five years from now when the children need more space." d={0.1} />
        </div>
      </div>

      <Next />

      {/* ══ PANEL 7 — TOILETS ══ */}
      <div style={{ marginBottom: 36 }}>
        <PanelHeader n="7" tag="Toilets and Dressing Areas" title="Every Inch Matters in a Small Space" color={G} />
        <Up d={0.06}>
          <Card style={{ marginTop: 14 }}>
            <div style={{ padding: '20px 22px' }}>
              <p style={{ fontSize: 13, color: 'rgba(0,0,0,0.62)', lineHeight: 1.78, margin: '0 0 16px' }}>Comfort in these spaces depends on more than dimensions. WC position, wash basin placement, shower area, door swing, and ventilation all must be resolved at drawing stage — not mid-construction.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
                {['Room width', 'Door swing', 'WC position', 'Basin placement', 'Shower zone', 'Ventilation'].map((item, i) => (
                  <div key={i} style={{ background: BG, borderRadius: 10, padding: '10px 12px', textAlign: 'center' }}>
                    <p style={{ fontSize: 12, fontWeight: 700, color: INK, margin: 0 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </Up>
        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Bubble side="left" name="Client" role="Plot Owner" bg="#3A6EA5" text="Why do small spaces like toilets need so much planning attention?" d={0.05} />
          <Bubble side="right" name="Karrcholai" role="Design Consultant" bg={G} text="Because you use a toilet at 3 AM in the dark. It must be ventilated, clean, and every fitting reachable without bumping a wall. It's not about luxury — it's about daily life." d={0.1} />
        </div>
      </div>

      <Next />

      {/* ══ PANEL 8 — STAIRCASE ══ */}
      <div style={{ marginBottom: 36 }}>
        <PanelHeader n="8" tag="Planning for the Future" title="The Staircase Plans Tomorrow." color={T} />
        <Up d={0.06}>
          <Card style={{ marginTop: 14 }}>
            <div style={{ padding: '20px 22px' }}>
              <p style={{ fontSize: 13, color: 'rgba(0,0,0,0.62)', lineHeight: 1.78, margin: '0 0 14px' }}>The staircase is positioned front-right — allowing first-floor expansion in the future without demolishing anything built today. Your family's needs will change. The staircase is the door to that future.</p>
              <Dots items={['First-floor addition possible anytime', 'Independent entry for rental or family', 'No structural rework needed later', 'Clockwise rise with odd step count recommended']} color={G} />
            </div>
          </Card>
        </Up>
        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Bubble side="left" name="Client" role="Plot Owner" bg="#3A6EA5" text="We're only building the ground floor now. Why think so carefully about the staircase position?" d={0.05} />
          <Bubble side="right" name="Karrcholai" role="Design Consultant" bg={G} text="Put it in the wrong place now and you either block the future forever or pay to break walls. Put it right — and the first floor is always an option, not a problem." d={0.1} />
        </div>
      </div>

      <Next />

      {/* ══ PANEL 9 — LIGHT & VENTILATION ══ */}
      <div style={{ marginBottom: 36 }}>
        <PanelHeader n="9" tag="Light and Ventilation" title="A Good Home Breathes Without AC" color={G} />
        <Up d={0.06}>
          <Card style={{ marginTop: 14 }}>
            <div style={{ padding: '20px 22px 16px' }}>
              <p style={{ fontSize: 13, color: 'rgba(0,0,0,0.62)', lineHeight: 1.78, margin: '0 0 16px' }}>Before finalising the plan, every opening is reviewed — where light enters, how air moves, and whether every room stays comfortable on a 35°C Tamil Nadu afternoon without depending entirely on AC.</p>
              <TwoCol
                left={{ label: 'Check every room', items: ['Window position & size', 'Cross ventilation path', 'Kitchen exhaust direction', 'Toilet vent shaft'] }}
                right={{ label: 'Privacy layer', items: ['No window facing neighbour', 'Toilet not visible from hall', 'Bedroom door not at entry', 'Landing privacy on staircase'] }}
              />
            </div>
          </Card>
        </Up>
        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Bubble side="left" name="Client" role="Plot Owner" bg="#3A6EA5" text="The plan looks fine on paper. How do we know it will actually feel good to live in?" d={0.05} />
          <Bubble side="right" name="Karrcholai" role="Design Consultant" bg={G} text="That's exactly why we review the plan from the point of view of a person waking up in the morning, cooking lunch, and coming home at night — not just as a drawing on paper." d={0.1} />
        </div>
      </div>

      <Next />

      {/* ══ PANEL 10 — STRUCTURAL COORDINATION ══ */}
      <div style={{ marginBottom: 40 }}>
        <PanelHeader n="10" tag="Architectural + Structural" title="Changes on Paper Cost Nothing." color={T} />
        <Up d={0.06}>
          <Card style={{ marginTop: 14 }}>
            <div style={{ padding: '20px 22px' }}>
              <p style={{ fontSize: 13, color: 'rgba(0,0,0,0.62)', lineHeight: 1.78, margin: '0 0 14px' }}>A house plan is not complete with room sizes alone. The architectural plan must coordinate with the structural design before construction begins — columns, beams, slab spans, staircase, and future expansion all must align now.</p>
              <div style={{ background: `linear-gradient(135deg, ${G}, #1e3828)`, borderRadius: 14, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14, boxShadow: `0 4px 20px ${G}33` }}>
                <span style={{ fontSize: 28, flexShrink: 0 }}>🧱</span>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 900, color: W, margin: '0 0 4px' }}>The Rule We Follow at Karrcholai</p>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: 1.55, fontStyle: 'italic' }}>"Review everything on paper. Change nothing after the first stone is placed."</p>
                </div>
              </div>
            </div>
          </Card>
        </Up>
        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Bubble side="left" name="Client" role="Plot Owner" bg="#3A6EA5" text="So all of this — rooms, structure, light, ventilation, Vastu — must all be decided before construction starts?" d={0.05} />
          <Bubble side="right" name="Karrcholai" role="Design Consultant" bg={G} text="Yes. That is exactly what the First Stone review is for. When you place the first stone, everything is already decided. No surprises. No rework. No regrets." d={0.1} />
        </div>
      </div>

      {/* ══ VERDICT ══ */}
      <div style={{ marginBottom: 14 }}>
        <Caption text="The Verdict — A good starting point. A few areas deserve a closer look before the first stone." color={G} d={0.04} />
      </div>
      <div style={{ marginBottom: 40 }}>
        <VerdictGrid />
      </div>

      {/* ══ FINAL CTA PANEL ══ */}
      <Up d={0.08}>
        <div style={{ background: `linear-gradient(135deg, ${G} 0%, #1e3828 100%)`, borderRadius: 24, overflow: 'hidden', boxShadow: `0 8px 40px ${G}33`, position: 'relative' }}>
          <div style={{ position: 'absolute', bottom: -50, right: -50, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: -30, left: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />
          <div style={{ padding: '36px 28px', textAlign: 'center', position: 'relative' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 14, background: 'rgba(255,255,255,0.1)', borderRadius: 20, padding: '4px 14px' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#6EE7A0', display: 'inline-block' }} />
              <span style={{ fontSize: 9, fontWeight: 800, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.42em', textTransform: 'uppercase' }}>Final Word</span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.15rem,2.8vw,1.7rem)', fontWeight: 900, color: W, margin: '0 0 10px', lineHeight: 1.25 }}>A Good Starting Point.<br />Some Areas Can Be Better.</h2>
            <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.58)', lineHeight: 1.75, maxWidth: 460, margin: '0 auto 28px' }}>This 2-bedroom plan is a solid foundation for a comfortable family home — with specific areas that deserve a closer look before construction begins.</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: T, color: W, fontSize: 12, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '13px 26px', borderRadius: 12, textDecoration: 'none', boxShadow: `0 4px 20px ${T}55` }}>
                🏗️ Get Your Plan Reviewed
              </a>
            </div>
            <p style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.25)', margin: '24px 0 0', letterSpacing: '0.3em', textTransform: 'uppercase' }}>Karrcholai Construction · Tamil Nadu · Stone · Grove · Living</p>
          </div>
        </div>
      </Up>

    </div>
  );
}
