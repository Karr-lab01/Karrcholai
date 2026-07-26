import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FOREST = '#2D4B37';
const TERRA  = '#B85C38';
const CREAM  = '#FAF9F6';
const INK    = '#1A1A1A';
const GOLD   = '#C9A84C';

/* ── Fade-up reveal wrapper ── */
function FadeUp({ children, delay = 0, style = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ── Section label ── */
function Label({ text, color = TERRA }) {
  return (
    <p style={{
      fontSize: 9, fontWeight: 900, letterSpacing: '0.5em',
      textTransform: 'uppercase', color, margin: '0 0 10px'
    }}>{text}</p>
  );
}

/* ── Chat bubble ── */
function Bubble({ side, name, role, bg, text, delay = 0 }) {
  const isRight = side === 'right';
  return (
    <motion.div
      initial={{ opacity: 0, x: isRight ? 30 : -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'flex', flexDirection: 'column',
        alignItems: isRight ? 'flex-end' : 'flex-start', gap: 8
      }}
    >
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        flexDirection: isRight ? 'row-reverse' : 'row'
      }}>
        <div style={{
          width: 40, height: 40, borderRadius: '50%', background: bg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 900, fontSize: 15, color: '#fff', flexShrink: 0
        }}>{name[0]}</div>
        <div style={{ textAlign: isRight ? 'right' : 'left' }}>
          <p style={{ fontSize: 12, fontWeight: 800, color: INK, margin: 0 }}>{name}</p>
          <p style={{ fontSize: 8, fontWeight: 700, color: TERRA, margin: '2px 0 0', textTransform: 'uppercase', letterSpacing: '0.18em' }}>{role}</p>
        </div>
      </div>
      <div style={{
        maxWidth: '82%',
        background: isRight ? FOREST : '#fff',
        border: isRight ? 'none' : '1.5px solid rgba(0,0,0,0.07)',
        borderRadius: isRight ? '18px 4px 18px 18px' : '4px 18px 18px 18px',
        padding: '13px 18px',
        boxShadow: isRight ? '0 4px 20px rgba(45,75,55,0.18)' : '0 2px 14px rgba(0,0,0,0.06)'
      }}>
        <p style={{
          fontSize: 13.5, lineHeight: 1.7, margin: 0,
          color: isRight ? 'rgba(255,255,255,0.92)' : 'rgba(0,0,0,0.75)',
          fontStyle: 'italic'
        }}>{'\u201C'}{text}{'\u201D'}</p>
      </div>
    </motion.div>
  );
}

/* ── Step card with icon + gradient header ── */
function StepCard({ step, icon, label, title, gradient, body, children, delay = 0 }) {
  return (
    <FadeUp delay={delay}>
      <div style={{
        borderRadius: 16, overflow: 'hidden',
        border: '1px solid rgba(0,0,0,0.07)',
        boxShadow: '0 8px 40px rgba(0,0,0,0.08)'
      }}>
        {/* gradient header */}
        <div style={{
          background: gradient, padding: '28px 28px 22px',
          position: 'relative', overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute', top: -10, right: 18,
            fontSize: 96, opacity: 0.1, lineHeight: 1, userSelect: 'none', pointerEvents: 'none'
          }}>{icon}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, position: 'relative', zIndex: 1 }}>
            <div style={{
              width: 46, height: 46, borderRadius: '50%',
              background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, border: '1.5px solid rgba(255,255,255,0.25)'
            }}>
              <span style={{ fontSize: 7, fontWeight: 900, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>STEP</span>
              <span style={{ fontSize: 16, fontWeight: 900, color: '#fff', lineHeight: 1 }}>{step}</span>
            </div>
            <div>
              <p style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.35em', margin: '0 0 4px' }}>{label}</p>
              <h3 style={{ fontSize: 'clamp(1rem,2.5vw,1.45rem)', fontWeight: 900, color: '#fff', margin: 0, lineHeight: 1.2 }}>{title}</h3>
            </div>
          </div>
        </div>
        {/* white body */}
        <div style={{ background: '#fff', padding: '22px 28px' }}>
          {body && <p style={{ fontSize: 14, color: 'rgba(0,0,0,0.6)', lineHeight: 1.8, margin: '0 0 20px' }}>{body}</p>}
          {children}
        </div>
      </div>
    </FadeUp>
  );
}

/* ── Bullet list ── */
function BulletList({ items, color = FOREST }) {
  return (
    <ul style={{ margin: '12px 0 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
          <span style={{ color, fontSize: 14, marginTop: 1, flexShrink: 0 }}>→</span>
          <span style={{ fontSize: 13.5, color: 'rgba(0,0,0,0.65)', lineHeight: 1.6 }}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/* ── Design Thought callout ── */
function DesignThought({ text }) {
  return (
    <FadeUp delay={0.05}>
      <div style={{
        background: `linear-gradient(135deg, ${GOLD}18, ${TERRA}12)`,
        border: `1.5px solid ${GOLD}44`,
        borderRadius: 12, padding: '18px 22px',
        display: 'flex', gap: 14, alignItems: 'flex-start'
      }}>
        <span style={{ fontSize: 22, flexShrink: 0 }}>💡</span>
        <p style={{ fontSize: 13.5, color: INK, lineHeight: 1.7, margin: 0, fontWeight: 600 }}>{text}</p>
      </div>
    </FadeUp>
  );
}

/* ── Dot connector ── */
function Connector() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, padding: '6px 0' }}>
      {[0.1, 0.22, 0.38, 0.54, 0.7].map((op, i) => (
        <div key={i} style={{ width: 2, height: 8, borderRadius: 2, background: `rgba(45,75,55,${op})` }} />
      ))}
    </div>
  );
}

/* ── Room table ── */
function RoomTable() {
  const rows = [
    { space: 'Portico',          size: "15'-9\" × 17'-6\"",  verdict: 'Very spacious',            ok: true },
    { space: 'Hall',             size: "15'-10\" × 16'-0\"", verdict: 'Excellent',                ok: true },
    { space: 'Kitchen + Dining', size: "10'-0\" × 16'-0\"",  verdict: 'Adequate, but compact',    ok: true },
    { space: 'Master Bedroom',   size: "10'-0\" × 16'-0\"",  verdict: 'Good',                     ok: true },
    { space: 'Dressing',         size: "4'-2\" × 5'-0\"",    verdict: 'Very compact',             ok: false },
    { space: 'Toilet',           size: "4'-2\" × 6'-0\"",    verdict: 'Usable but narrow',        ok: false },
    { space: 'Self / Utility',   size: "4'-2\" × 4'-0\"",    verdict: 'Very small',               ok: false },
    { space: 'Bedroom 2',        size: "10'-0\" × 10'-0\"",  verdict: 'Minimum practical size',   ok: false },
    { space: 'Toilet 2',         size: "4'-0\" × 6'-9\" approx.", verdict: 'Usable',             ok: true },
    { space: 'Staircase',        size: 'Front / right side', verdict: 'Good for future floor',    ok: true },
  ];
  return (
    <FadeUp delay={0.05}>
      <div style={{ overflowX: 'auto', borderRadius: 12, border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: FOREST }}>
              {['Space', 'Size', 'Assessment'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: '#fff', fontWeight: 900, fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <motion.tr
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                style={{ background: i % 2 === 0 ? CREAM : '#fff', borderBottom: '1px solid rgba(0,0,0,0.04)' }}
              >
                <td style={{ padding: '11px 16px', fontWeight: 700, color: INK }}>{r.space}</td>
                <td style={{ padding: '11px 16px', color: 'rgba(0,0,0,0.55)', fontFamily: 'monospace', fontSize: 12 }}>{r.size}</td>
                <td style={{ padding: '11px 16px' }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    fontSize: 12, fontWeight: 700,
                    color: r.ok ? FOREST : TERRA,
                    background: r.ok ? `${FOREST}12` : `${TERRA}12`,
                    padding: '3px 10px', borderRadius: 20,
                    border: `1px solid ${r.ok ? FOREST : TERRA}28`
                  }}>
                    {r.ok ? '✅' : '⚠️'} {r.verdict}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </FadeUp>
  );
}

/* ── Plot Overview Bar ── */
function PlotBar() {
  const stats = [
    { label: 'Site',        value: "30' × 65'" },
    { label: 'Road',        value: 'North Side' },
    { label: 'North Width', value: "27'-3\"" },
    { label: 'South Width', value: "22'-3\"" },
    { label: 'Depth',       value: "51'-9\"" },
    { label: 'Front Open',  value: "10'-9\"" },
  ];
  return (
    <FadeUp delay={0.04}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 2, background: 'rgba(0,0,0,0.06)',
        borderRadius: 14, overflow: 'hidden',
        border: '1px solid rgba(0,0,0,0.06)',
        marginBottom: 32
      }}>
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.45 }}
            style={{ background: CREAM, padding: '16px 10px', textAlign: 'center' }}
          >
            <p style={{ fontSize: 8, fontWeight: 700, color: 'rgba(0,0,0,0.35)', textTransform: 'uppercase', letterSpacing: '0.25em', margin: '0 0 5px' }}>{s.label}</p>
            <p style={{ fontSize: 16, fontWeight: 900, color: FOREST, margin: 0, letterSpacing: '-0.01em' }}>{s.value}</p>
          </motion.div>
        ))}
      </div>
    </FadeUp>
  );
}

/* ── Final verdict checklist ── */
function VerdictGrid() {
  const pros = [
    'A spacious living hall',
    'A comfortable master bedroom',
    'Practical kitchen and dining space',
    'Large parking area',
    'Future staircase provision',
    'Efficient use of the plot',
  ];
  const cons = [
    'Second bedroom size',
    'Dressing area',
    'Toilet width',
    'Utility space',
    'Privacy planning',
    'Ventilation review',
    'Structural coordination',
  ];
  return (
    <FadeUp delay={0.06}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Strengths */}
        <div style={{ background: `${FOREST}0e`, border: `1.5px solid ${FOREST}28`, borderRadius: 14, padding: '20px 22px' }}>
          <p style={{ fontSize: 9, fontWeight: 900, color: FOREST, letterSpacing: '0.4em', textTransform: 'uppercase', margin: '0 0 14px' }}>Strengths</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {pros.map((p, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                <span style={{ fontSize: 13, flexShrink: 0, marginTop: 1 }}>✅</span>
                <span style={{ fontSize: 12.5, color: 'rgba(0,0,0,0.7)', fontWeight: 600, lineHeight: 1.4 }}>{p}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Improvements */}
        <div style={{ background: `${TERRA}0d`, border: `1.5px solid ${TERRA}28`, borderRadius: 14, padding: '20px 22px' }}>
          <p style={{ fontSize: 9, fontWeight: 900, color: TERRA, letterSpacing: '0.4em', textTransform: 'uppercase', margin: '0 0 14px' }}>Can Improve</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {cons.map((c, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                <span style={{ fontSize: 13, flexShrink: 0, marginTop: 1 }}>⚠️</span>
                <span style={{ fontSize: 12.5, color: 'rgba(0,0,0,0.7)', fontWeight: 600, lineHeight: 1.4 }}>{c}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </FadeUp>
  );
}

/* ════════════════════════════════════════════════════════════════
   MAIN EXPORT
════════════════════════════════════════════════════════════════ */
export default function FirstStoneSection() {
  return (
    <div style={{ fontFamily: 'Barlow, sans-serif' }}>

      {/* ── Page intro ── */}
      <FadeUp>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <div style={{ height: 1, width: 40, background: TERRA }} />
            <span style={{ fontSize: 9, fontWeight: 900, color: TERRA, letterSpacing: '0.5em', textTransform: 'uppercase' }}>
              Professional Plan Analysis · Karrcholai
            </span>
            <div style={{ height: 1, width: 40, background: TERRA }} />
          </div>
          <h2 style={{ fontSize: 'clamp(1.1rem,2.5vw,1.6rem)', fontWeight: 400, color: 'rgba(0,0,0,0.45)', margin: '0 auto 16px', maxWidth: 620, lineHeight: 1.7 }}>
            We reviewed the proposed ground-floor plan. The drawing shows a{' '}
            <strong style={{ color: FOREST }}>30′ × 65′ site</strong>, road on the North, with a
            built-up area of <strong style={{ color: FOREST }}>27′-3″ × 51′-9″</strong> (North) and{' '}
            <strong style={{ color: FOREST }}>22′-3″ × 51′-9″</strong> (South), leaving{' '}
            <strong style={{ color: FOREST }}>10′-9″</strong> of front open space for landscaping and services.
          </h2>
          <p style={{ fontSize: 13, color: 'rgba(0,0,0,0.35)', lineHeight: 1.6 }}>
            A compact 2-bedroom residence: portico · hall · kitchen/dining · master bedroom · dressing · toilet · utility · staircase · second bedroom
          </p>
        </div>
      </FadeUp>

      {/* ── Plot stat bar ── */}
      <PlotBar />

      {/* ── Room size table ── */}
      <FadeUp delay={0.04}>
        <div style={{ marginBottom: 20 }}>
          <Label text="Approximate Room Sizes" color={FOREST} />
        </div>
      </FadeUp>
      <RoomTable />

      {/* ── Opening dialogue ── */}
      <FadeUp delay={0.05} style={{ margin: '48px 0 0' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <Label text="Is This House Plan Right for My Family?" />
          <h3 style={{ fontSize: 'clamp(1.4rem,3.5vw,2.2rem)', fontWeight: 900, color: INK, letterSpacing: '-0.02em', lineHeight: 1.2, margin: 0 }}>
            A Client Story by Karrcholai
          </h3>
        </div>
      </FadeUp>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 48 }}>
        <Bubble side="left" name="Client" role="30′ × 65′ Plot Owner" bg="#3a5a8a" delay={0.06}
          text="I have a 30′ × 65′ plot. I want a comfortable home for my family. Is this plan good enough?" />
        <Bubble side="right" name="Karrcholai" role="Design Consultant" bg={FOREST} delay={0.12}
          text="Yes. But a good plan is not just about fitting rooms inside a plot. We need to ask an important question: Will this home be comfortable to live in every day?" />
      </div>

      {/* ════ STEPS ════ */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

        {/* Step 1 */}
        <StepCard step="1" icon="🏡" label="Understanding the Plot" title="Why Front Open Space Is Essential"
          gradient="linear-gradient(135deg, #1a3a28, #2D4B37)"
          body="The plot measures approximately 30 feet wide and 65 feet deep. The road is located at the front (North side), with open space provided before the house begins. This front space — 10′-9″ — is not wasted land. It holds parking, entry room, natural light, ventilation, future landscaping, and critical services like the septic tank."
          delay={0.04}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Bubble side="left" name="Client" role="Plot Owner" bg="#3a5a8a" delay={0.08}
              text="Why do we need open space in front of the house?" />
            <Bubble side="right" name="Karrcholai" role="Design Consultant" bg={FOREST} delay={0.14}
              text="The front open space provides room for parking, entry, light, ventilation, and a more comfortable approach to the home." />
          </div>
        </StepCard>

        <Connector />

        {/* Step 2 */}
        <StepCard step="2" icon="🚗" label="The Front Portico" title="15′-9″ × 17′-6″ — Very Spacious"
          gradient="linear-gradient(135deg, #7a4a20, #a06030)"
          body="The plan includes a spacious portico for vehicle parking. At 15′-9″ × 17′-6″ this is generous — comfortable for car parking and a strong entry impression. Whether this size is right depends entirely on the family's priorities."
          delay={0.04}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Bubble side="left" name="Client" role="Plot Owner" bg="#3a5a8a" delay={0.08}
              text="The portico looks quite large. Is that necessary?" />
            <Bubble side="right" name="Karrcholai" role="Design Consultant" bg={FOREST} delay={0.14}
              text="It depends on your family's needs. If you need comfortable car parking and additional entry space, it is useful. But if parking space is not a priority, part of this area could be redesigned as a garden, sit-out, or another useful space." />
          </div>
          <div style={{ marginTop: 20 }}>
            <DesignThought text="A good plan should be designed around the client's lifestyle, not just standard room sizes." />
          </div>
        </StepCard>

        <Connector />

        {/* Step 3 */}
        <StepCard step="3" icon="🛋️" label="The Heart of the Home" title="The Hall — 15′-10″ × 16′ — Excellent"
          gradient="linear-gradient(135deg, #1a2a3a, #2a4060)"
          body="The living hall is one of the strongest features of this plan. It is spacious enough for sofa seating, TV unit, family gatherings, and comfortable movement. However, the hall connects to several other spaces — door positions and circulation must be carefully planned to maintain privacy."
          delay={0.04}
        >
          <BulletList items={['Sofa seating', 'TV unit', 'Family gatherings', 'Comfortable movement']} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 20 }}>
            <Bubble side="left" name="Client" role="Plot Owner" bg="#3a5a8a" delay={0.08}
              text="Why is the hall important?" />
            <Bubble side="right" name="Karrcholai" role="Design Consultant" bg={FOREST} delay={0.14}
              text="Because the hall is where the family spends time together. A beautiful house is good, but a comfortable family space is even more important." />
          </div>
        </StepCard>

        <Connector />

        {/* Step 4 */}
        <StepCard step="4" icon="🍳" label="Kitchen and Dining" title="10′ × 16′ — Adequate, But Compact"
          gradient="linear-gradient(135deg, #8B3820, #B85C38)"
          body="The kitchen and dining area are planned together — a practical connection between cooking, dining, and family living. At 10′ × 16′ it is workable, but must be carefully planned to be truly comfortable."
          delay={0.04}
        >
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', marginBottom: 16 }}>
            <div>
              <p style={{ fontSize: 10, fontWeight: 700, color: TERRA, letterSpacing: '0.3em', textTransform: 'uppercase', margin: '0 0 8px' }}>Flow</p>
              <BulletList items={['Cooking → Dining → Family Living']} color={TERRA} />
            </div>
            <div>
              <p style={{ fontSize: 10, fontWeight: 700, color: FOREST, letterSpacing: '0.3em', textTransform: 'uppercase', margin: '0 0 8px' }}>Must Plan</p>
              <BulletList items={['Natural ventilation', 'Proper exhaust', 'Adequate counter space', 'Refrigerator placement', 'Easy movement']} />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Bubble side="left" name="Client" role="Plot Owner" bg="#3a5a8a" delay={0.08}
              text="Can the kitchen be comfortable even though the space is compact?" />
            <Bubble side="right" name="Karrcholai" role="Design Consultant" bg={FOREST} delay={0.14}
              text="Yes. With the right platform arrangement, storage planning, windows, and ventilation, even a compact kitchen can be highly functional." />
          </div>
        </StepCard>

        <Connector />

        {/* Step 5 */}
        <StepCard step="5" icon="🛏️" label="The Master Bedroom" title="10′ × 16′ — Good, With Dressing & Toilet"
          gradient="linear-gradient(135deg, #2a1a3a, #4a2a6a)"
          body="The master bedroom is approximately 10′ × 16′. This provides enough space for a comfortable bed, wardrobe, side tables, and additional furniture. The bedroom also includes an attached dressing area and toilet."
          delay={0.04}
        >
          <BulletList items={['A comfortable bed', 'Wardrobe', 'Side tables', 'Additional furniture']} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 20 }}>
            <Bubble side="left" name="Client" role="Plot Owner" bg="#3a5a8a" delay={0.08}
              text="Is the dressing area comfortable?" />
            <Bubble side="right" name="Karrcholai" role="Design Consultant" bg={FOREST} delay={0.14}
              text="It is functional, but we can study the space further and improve it if the family needs a larger wardrobe or dressing area. This is why plan review before construction is important." />
          </div>
        </StepCard>

        <Connector />

        {/* Step 6 */}
        <StepCard step="6" icon="🛌" label="The Second Bedroom" title="10′ × 10′ — Minimum Practical Size"
          gradient="linear-gradient(135deg, #1a2a4a, #253a60)"
          body="The second bedroom is approximately 10′ × 10′. After placing a bed, wardrobe, and other furniture, the room may feel compact. Increasing by just one or two feet makes a significant difference in daily living."
          delay={0.04}
        >
          <div style={{ marginBottom: 18 }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: GOLD, letterSpacing: '0.3em', textTransform: 'uppercase', margin: '0 0 8px' }}>Adding 1–2 feet improves:</p>
            <BulletList items={['Furniture arrangement', 'Walking space', 'Comfort', 'Future flexibility']} color={GOLD} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Bubble side="left" name="Client" role="Plot Owner" bg="#3a5a8a" delay={0.08}
              text="Is that enough space for a bedroom?" />
            <Bubble side="right" name="Karrcholai" role="Design Consultant" bg={FOREST} delay={0.14}
              text="It is usable, but we should always think about the future. After placing a bed, wardrobe, and other furniture, the room may feel compact." />
          </div>
          <div style={{ marginTop: 20 }}>
            <DesignThought text="Small Change. Big Difference. — Sometimes, changing a room by just 1 or 2 feet can significantly improve daily living." />
          </div>
        </StepCard>

        <Connector />

        {/* Step 7 */}
        <StepCard step="7" icon="🚿" label="Toilets and Dressing Areas" title="Every Inch Matters in a Small Space"
          gradient="linear-gradient(135deg, #1a3a3a, #2a5050)"
          body="The plan includes toilets and a dressing area. Comfort in these spaces depends on more than dimensions — WC position, wash basin placement, shower area, door swing, and ventilation all must be resolved at drawing stage."
          delay={0.04}
        >
          <BulletList items={['Room width', 'WC position', 'Wash basin placement', 'Shower area', 'Ventilation']} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 20 }}>
            <Bubble side="left" name="Client" role="Plot Owner" bg="#3a5a8a" delay={0.08}
              text="Why do small spaces need so much planning?" />
            <Bubble side="right" name="Karrcholai" role="Design Consultant" bg={FOREST} delay={0.14}
              text="Because every inch matters in a small space. A good toilet is not only about fitting sanitary fixtures — it should also be easy to use, clean, ventilated, and comfortable." />
          </div>
        </StepCard>

        <Connector />

        {/* Step 8 */}
        <StepCard step="8" icon="🪜" label="Planning for the Future" title="Build Today. Plan for Tomorrow."
          gradient="linear-gradient(135deg, #2D4B37, #1a4a28)"
          body="The staircase is positioned to allow the possibility of future construction on the first floor. Your family's needs will change — the staircase is the key to unlocking that future without tearing down what you built today."
          delay={0.04}
        >
          <BulletList items={['Future expansion', 'Independent first-floor access', 'Rental possibilities', 'Additional family space']} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 20 }}>
            <Bubble side="left" name="Client" role="Plot Owner" bg="#3a5a8a" delay={0.08}
              text="We are building only the ground floor now. Why should we think about the first floor?" />
            <Bubble side="right" name="Karrcholai" role="Design Consultant" bg={FOREST} delay={0.14}
              text="Because your family's needs may change in the future. A well-planned staircase can help with future expansion, independent first-floor access, rental possibilities, and additional family space." />
          </div>
          <FadeUp delay={0.2} style={{ marginTop: 18 }}>
            <div style={{
              background: FOREST, borderRadius: 10, padding: '16px 20px', textAlign: 'center',
              boxShadow: `0 4px 18px ${FOREST}30`
            }}>
              <p style={{ fontSize: 13, fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '0.05em' }}>
                🏗️ Build Today. Plan for Tomorrow.
              </p>
            </div>
          </FadeUp>
        </StepCard>

        <Connector />

        {/* Step 9 */}
        <StepCard step="9" icon="🌬️" label="Light and Ventilation" title="A Good Home Breathes Without AC"
          gradient="linear-gradient(135deg, #1a3a4a, #1e4a60)"
          body="A good home should not depend only on artificial lighting and air conditioning. Before finalising the plan, we review every opening — where light enters, how air moves, and whether every room can be comfortable on a warm day."
          delay={0.04}
        >
          <BulletList items={['Window positions', 'Natural light', 'Cross ventilation', 'Kitchen ventilation', 'Toilet ventilation', 'Privacy']} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 20 }}>
            <Bubble side="left" name="Client" role="Plot Owner" bg="#3a5a8a" delay={0.08}
              text="A plan looks good on paper. How do we know it will feel good in real life?" />
            <Bubble side="right" name="Karrcholai" role="Design Consultant" bg={FOREST} delay={0.14}
              text="That is exactly why we review the plan from the point of view of a person living inside the house." />
          </div>
        </StepCard>

        <Connector />

        {/* Step 10 */}
        <StepCard step="10" icon="🧱" label="Architectural Plan + Structural Plan" title="Changes on Paper Cost Nothing"
          gradient="linear-gradient(135deg, #1a1a2a, #28283a)"
          body="A house plan is not complete with room sizes alone. The architectural plan must work together with the structural design. Before construction, all elements must be coordinated — because changes after walls are built cost far more than changes on paper."
          delay={0.04}
        >
          <BulletList items={['Columns', 'Beams', 'Slab spans', 'Staircase', 'Portico structure', 'Future expansion']} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 20 }}>
            <Bubble side="left" name="Client" role="Plot Owner" bg="#3a5a8a" delay={0.08}
              text="So, the plan must be checked before construction?" />
            <Bubble side="right" name="Karrcholai" role="Design Consultant" bg={FOREST} delay={0.14}
              text="Absolutely. Changes are easier and more economical on paper than after construction begins." />
          </div>
        </StepCard>

      </div>{/* end steps */}


      {/* ── Final Conclusion ── */}
      <FadeUp delay={0.06} style={{ marginTop: 56 }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Label text="🎯 Final Conclusion" color={INK} />
          <h3 style={{ fontSize: 'clamp(1.3rem,3vw,2rem)', fontWeight: 900, color: INK, letterSpacing: '-0.02em', margin: '0 0 12px' }}>
            A Good Starting Point. Some Areas Can Be Better.
          </h3>
          <p style={{ fontSize: 14, color: 'rgba(0,0,0,0.45)', maxWidth: 540, margin: '0 auto', lineHeight: 1.7 }}>
            This 2-bedroom plan is a solid foundation for a comfortable family home — with specific areas that deserve a closer look before construction begins.
          </p>
        </div>
      </FadeUp>

      <VerdictGrid />

      {/* ── Belief Banner ── */}
      <FadeUp delay={0.08} style={{ marginTop: 40 }}>
        <div style={{
          background: `linear-gradient(135deg, ${FOREST}, #1a4a28)`,
          borderRadius: 16, padding: 'clamp(36px,5vw,52px) clamp(24px,5vw,48px)',
          textAlign: 'center', position: 'relative', overflow: 'hidden',
          boxShadow: `0 12px 48px ${FOREST}30`
        }}>
          {/* subtle grid pattern */}
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.04,
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '18px 18px', pointerEvents: 'none'
          }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <p style={{ fontSize: 9, fontWeight: 900, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.5em', textTransform: 'uppercase', marginBottom: 18 }}>
                🏠 Our Belief at Karrcholai
              </p>
              <p style={{
                fontSize: 'clamp(1rem,2.8vw,1.5rem)', color: '#fff', lineHeight: 1.85,
                fontStyle: 'italic', maxWidth: 560, margin: '0 auto 10px', fontWeight: 400
              }}>
                "A house plan should not simply fit inside a plot."
              </p>
              <p style={{
                fontSize: 'clamp(0.9rem,2.2vw,1.2rem)', color: 'rgba(255,255,255,0.75)', lineHeight: 1.75,
                maxWidth: 520, margin: '0 auto 26px', fontWeight: 400
              }}>
                It should fit the family's lifestyle, comfort, future needs, budget, and way of living. Because a well-planned home is the foundation of better living.
              </p>
              <div style={{ width: 48, height: 1, background: `${TERRA}80`, margin: '0 auto 22px' }} />
              <p style={{
                fontSize: 'clamp(0.85rem,2vw,1.05rem)', fontWeight: 700,
                color: 'rgba(255,255,255,0.55)', letterSpacing: '0.1em', marginBottom: 32
              }}>
                From Stone to Oasis — We Build Better Living.
              </p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.04, boxShadow: `0 8px 28px ${TERRA}55` }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-block', background: TERRA, color: '#fff',
                  fontSize: 11, fontWeight: 900, letterSpacing: '0.28em', textTransform: 'uppercase',
                  padding: '15px 36px', borderRadius: 8, textDecoration: 'none',
                  boxShadow: `0 4px 18px ${TERRA}40`, transition: 'box-shadow 0.3s'
                }}
              >
                Review My Plan with Karrcholai
              </motion.a>
            </motion.div>
          </div>
        </div>
      </FadeUp>

      {/* ── Belief Banner ── */}
      <FadeUp delay={0.08} style={{ marginTop: 40 }}>
        <div style={{
          background: `linear-gradient(135deg, ${FOREST}, #1a4a28)`,
          borderRadius: 16, padding: 'clamp(36px,5vw,52px) clamp(24px,5vw,48px)',
          textAlign: 'center', position: 'relative', overflow: 'hidden',
          boxShadow: `0 12px 48px ${FOREST}30`
        }}>
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.04,
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '18px 18px', pointerEvents: 'none'
          }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <p style={{ fontSize: 9, fontWeight: 900, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.5em', textTransform: 'uppercase', marginBottom: 18 }}>
                🏠 Our Belief at Karrcholai
              </p>
              <p style={{ fontSize: 'clamp(1rem,2.8vw,1.5rem)', color: '#fff', lineHeight: 1.85, fontStyle: 'italic', maxWidth: 560, margin: '0 auto 10px', fontWeight: 400 }}>
                "A house plan should not simply fit inside a plot."
              </p>
              <p style={{ fontSize: 'clamp(0.9rem,2.2vw,1.2rem)', color: 'rgba(255,255,255,0.75)', lineHeight: 1.75, maxWidth: 520, margin: '0 auto 26px', fontWeight: 400 }}>
                It should fit the family's lifestyle, comfort, future needs, budget, and way of living. Because a well-planned home is the foundation of better living.
              </p>
              <div style={{ width: 48, height: 1, background: `${TERRA}80`, margin: '0 auto 22px' }} />
              <p style={{ fontSize: 'clamp(0.85rem,2vw,1.05rem)', fontWeight: 700, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.1em', marginBottom: 32 }}>
                From Stone to Oasis — We Build Better Living.
              </p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.04, boxShadow: `0 8px 28px ${TERRA}55` }}
                whileTap={{ scale: 0.97 }}
                style={{ display: 'inline-block', background: TERRA, color: '#fff', fontSize: 11, fontWeight: 900, letterSpacing: '0.28em', textTransform: 'uppercase', padding: '15px 36px', borderRadius: 8, textDecoration: 'none', boxShadow: `0 4px 18px ${TERRA}40` }}
              >
                Review My Plan with Karrcholai
              </motion.a>
            </motion.div>
          </div>
        </div>
      </FadeUp>

      {/* ── End of Chapter 1 + Next Chapter ── */}
      <FadeUp delay={0.1} style={{ marginTop: 56 }}>
        <div style={{
          borderTop: '1px solid rgba(0,0,0,0.07)',
          paddingTop: 48, textAlign: 'center'
        }}>
          {/* chapter marker */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
            <div style={{ height: 1, width: 48, background: 'rgba(0,0,0,0.1)' }} />
            <span style={{ fontSize: 9, fontWeight: 900, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.25)' }}>
              End of Chapter 1
            </span>
            <div style={{ height: 1, width: 48, background: 'rgba(0,0,0,0.1)' }} />
          </div>

          {/* next chapter card */}
          <motion.a
            href="/blog/604"
            whileHover={{ y: -4, boxShadow: `0 16px 48px rgba(0,0,0,0.12)` }}
            whileTap={{ scale: 0.98 }}
            style={{
              display: 'inline-flex', flexDirection: 'column', alignItems: 'center',
              gap: 14, background: '#fff', border: '1.5px solid rgba(0,0,0,0.08)',
              borderRadius: 16, padding: '28px 40px', textDecoration: 'none',
              boxShadow: '0 4px 24px rgba(0,0,0,0.07)', cursor: 'pointer',
              transition: 'box-shadow 0.3s, transform 0.3s', maxWidth: 380
            }}
          >
            {/* coming soon badge */}
            <span style={{
              fontSize: 8, fontWeight: 900, letterSpacing: '0.4em', textTransform: 'uppercase',
              color: TERRA, background: `${TERRA}14`, border: `1px solid ${TERRA}30`,
              borderRadius: 20, padding: '4px 12px'
            }}>Coming Soon</span>

            <div>
              <p style={{ fontSize: 9, fontWeight: 700, color: 'rgba(0,0,0,0.3)', letterSpacing: '0.35em', textTransform: 'uppercase', margin: '0 0 6px' }}>
                Chapter 2 · Single Stone Stories
              </p>
              <p style={{ fontSize: 'clamp(1rem,2.5vw,1.3rem)', fontWeight: 900, color: INK, margin: '0 0 8px', lineHeight: 1.25, letterSpacing: '-0.01em' }}>
                The Second Stone
              </p>
              <p style={{ fontSize: 13, color: 'rgba(0,0,0,0.4)', lineHeight: 1.6, margin: 0 }}>
                From approved plan to ground-breaking — the decisions that happen before the first shovel hits the earth.
              </p>
            </div>

            {/* arrow */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase', color: FOREST }}>Read Next</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                style={{ fontSize: 16, color: FOREST }}
              >→</motion.span>
            </div>
          </motion.a>
        </div>
      </FadeUp>

    </div>
  );
}
