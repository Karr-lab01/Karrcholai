import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import UnifiedFooter from '../components/UnifiedFooter';

/* ═══════════════════════════════════════════════════════════════════
   DESIGN TOKENS
═══════════════════════════════════════════════════════════════════ */
const INK    = '#0D0D0D';
const PAPER  = '#FFF8F0';
const TERRA  = '#D4622A';
const GOLD   = '#F5C518';
const GREEN  = '#2D5A3D';
const PLUM   = '#6B21A8';
const CREAM  = '#FEF3C7';
const PANEL_BORDER = '3px solid ' + INK;
const SHADOW = '6px 6px 0 ' + INK;

/* free architecture images from Unsplash (stable CDN links) */
const IMG = {
  skyline:  'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80&auto=format',
  rental:   'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=900&q=80&auto=format',
  meeting:  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80&auto=format',
  blueprint:'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=80&auto=format',
  construct:'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80&auto=format',
  keys:     'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80&auto=format',
  family:   'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=900&q=80&auto=format',
  house:    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80&auto=format',
};

/* ═══════════════════════════════════════════════════════════════════
   ATOMS
═══════════════════════════════════════════════════════════════════ */

/* Halftone dot overlay */
const Dots = ({ color = INK, opacity = 0.06, size = 5 }) => (
  <div style={{
    position: 'absolute', inset: 0, pointerEvents: 'none',
    backgroundImage: `radial-gradient(circle, ${color} 1.2px, transparent 1.2px)`,
    backgroundSize: `${size}px ${size}px`, opacity, zIndex: 1,
  }} />
);

/* Speed-line radiating background */
const SpeedLines = ({ color = 'rgba(212,98,42,0.08)', count = 20 }) => (
  <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
    {[...Array(count)].map((_, i) => (
      <div key={i} style={{
        position: 'absolute', left: '50%', top: '50%',
        width: 3, height: '200%',
        background: color,
        transform: `rotate(${(360 / count) * i}deg)`,
        transformOrigin: '0 0',
      }} />
    ))}
  </div>
);

/* Ink-stamp chapter badge */
const Chapter = ({ num, title, color = TERRA }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
    whileInView={{ opacity: 1, scale: 1, rotate: -2 }}
    viewport={{ once: true }}
    transition={{ type: 'spring', stiffness: 180, damping: 14 }}
    style={{
      display: 'inline-flex', flexDirection: 'column', alignItems: 'center',
      background: color, border: `3px solid ${INK}`, borderRadius: 6,
      padding: '6px 18px', boxShadow: `4px 4px 0 ${INK}`,
      transform: 'rotate(-2deg)', marginBottom: 12,
    }}
  >
    <span style={{ fontSize: 8, fontWeight: 900, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.4em', textTransform: 'uppercase' }}>
      Chapter {num}
    </span>
    <span style={{ fontSize: 13, fontWeight: 900, color: '#fff', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
      {title}
    </span>
  </motion.div>
);

/* SFX starburst */
const SFX = ({ text, size = 96, bg = GOLD, tc = INK, rot = 0 }) => (
  <div style={{ position: 'relative', width: size, height: size, flexShrink: 0, transform: `rotate(${rot}deg)` }}>
    <svg viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      <polygon points="50,0 61,33 96,33 68,54 79,88 50,67 21,88 32,54 4,33 39,33"
        fill={bg} stroke={INK} strokeWidth="2.5" />
    </svg>
    <span style={{
      position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.19, fontWeight: 900, color: tc, textAlign: 'center',
      lineHeight: 1.1, padding: '8px',
    }}>{text}</span>
  </div>
);

/* Speech bubble */
const Say = ({ text, from = 'bl', bg = '#fff', tc = INK, maxW = 240, type = 'normal', fontSize = 14 }) => {
  const tails = {
    bl: { bottom: -14, left: 20, borderLeft: '9px solid transparent', borderRight: '7px solid transparent', borderTop: `15px solid ${bg}` },
    br: { bottom: -14, right: 20, borderLeft: '7px solid transparent', borderRight: '9px solid transparent', borderTop: `15px solid ${bg}` },
    tl: { top: -14, left: 20, borderLeft: '9px solid transparent', borderRight: '7px solid transparent', borderBottom: `15px solid ${bg}` },
    tr: { top: -14, right: 20, borderLeft: '7px solid transparent', borderRight: '9px solid transparent', borderBottom: `15px solid ${bg}` },
    l:  { top: '50%', left: -14, marginTop: -8, borderTop: '8px solid transparent', borderBottom: '8px solid transparent', borderRight: `15px solid ${bg}` },
    r:  { top: '50%', right: -14, marginTop: -8, borderTop: '8px solid transparent', borderBottom: '8px solid transparent', borderLeft: `15px solid ${bg}` },
  };
  const br = type === 'shout' ? 4 : type === 'think' ? 999 : '18px 18px 18px 4px';
  const bdr = type === 'shout' ? `3px solid ${INK}` : type === 'think' ? `2.5px dashed rgba(0,0,0,0.3)` : `2.5px solid ${INK}`;
  const tail = tails[from];
  return (
    <div style={{ position: 'relative', display: 'inline-block', maxWidth: maxW }}>
      <div style={{ background: bg, border: bdr, borderRadius: br, padding: '11px 18px', boxShadow: type !== 'think' ? `3px 3px 0 ${INK}` : 'none' }}>
        <p style={{ color: tc, fontSize, fontWeight: 700, lineHeight: 1.4, margin: 0 }}>{text}</p>
      </div>
      {type !== 'think' && tail && (
        <div style={{ position: 'absolute', width: 0, height: 0, ...tail }} />
      )}
      {type === 'think' && (
        <>
          <div style={{ position:'absolute', bottom:-8, left:24, width:11, height:11, borderRadius:'50%', background:bg, border:`2px dashed rgba(0,0,0,0.3)` }}/>
          <div style={{ position:'absolute', bottom:-17, left:14, width:7, height:7, borderRadius:'50%', background:bg, border:`2px dashed rgba(0,0,0,0.3)` }}/>
        </>
      )}
    </div>
  );
};

/* Animated progress bar */
const ProgressBar = ({ label, pct, color = TERRA, delay = 0 }) => (
  <div style={{ marginBottom: 14 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
      <span style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: INK }}>{label}</span>
      <span style={{ fontSize: 11, fontWeight: 900, color }}>{pct}%</span>
    </div>
    <div style={{ height: 16, background: 'rgba(0,0,0,0.08)', border: `2.5px solid ${INK}`, borderRadius: 20, overflow: 'hidden', boxShadow: `2px 2px 0 ${INK}` }}>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${pct}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, delay, ease: [0.22, 1, 0.36, 1] }}
        style={{ height: '100%', background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 20 }}
      />
    </div>
  </div>
);

/* Scene panel — image with overlay + content on top */
const Scene = ({ img, overlay = 'rgba(0,0,0,0.55)', children, h = 340, style = {} }) => (
  <div style={{ position: 'relative', width: '100%', height: h, overflow: 'hidden', borderRadius: 4, ...style }}>
    <img src={img} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
    <div style={{ position: 'absolute', inset: 0, background: overlay }} />
    <Dots color="#fff" opacity={0.04} size={7} />
    <div style={{ position: 'relative', zIndex: 2, height: '100%' }}>{children}</div>
  </div>
);

/* Floating animated wrapper */
const Float = ({ children, y = 8, dur = 2.4, delay = 0 }) => (
  <motion.div
    animate={{ y: [0, -y, 0] }}
    transition={{ duration: dur, repeat: Infinity, ease: 'easeInOut', delay }}
  >{children}</motion.div>
);

/* Panel entry animation */
const Reveal = ({ children, from = 'bottom', delay = 0, className = '', style = {} }) => {
  const init = { bottom: { y: 80, opacity: 0 }, top: { y: -80, opacity: 0 }, left: { x: -100, opacity: 0 }, right: { x: 100, opacity: 0 }, scale: { scale: 0.75, opacity: 0 } };
  return (
    <motion.div
      initial={init[from] || init.bottom}
      whileInView={{ y: 0, x: 0, scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className} style={style}
    >{children}</motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   RICH CHARACTER SVGs  — Chibi-cartoon style, expressive, detailed
═══════════════════════════════════════════════════════════════════ */

/* Arun — male character, various moods */
const Arun = ({ mood = 'happy', size = 160 }) => {
  const eyes = {
    happy:    <><circle cx="38" cy="54" r="5" fill={INK}/><circle cx="62" cy="54" r="5" fill={INK}/><circle cx="40" cy="52" r="2" fill="#fff"/><circle cx="64" cy="52" r="2" fill="#fff"/></>,
    worried:  <><path d="M33 52 Q38 48 43 52" fill="none" stroke={INK} strokeWidth="2.5"/><path d="M57 52 Q62 48 67 52" fill="none" stroke={INK} strokeWidth="2.5"/><circle cx="38" cy="53" r="4" fill={INK}/><circle cx="62" cy="53" r="4" fill={INK}/></>,
    shocked:  <><circle cx="38" cy="54" r="7" fill={INK}/><circle cx="62" cy="54" r="7" fill={INK}/><circle cx="40" cy="52" r="2.5" fill="#fff"/><circle cx="64" cy="52" r="2.5" fill="#fff"/></>,
    excited:  <><path d="M33 55 Q38 48 43 55" fill={INK}/><path d="M57 55 Q62 48 67 55" fill={INK}/></>,
    proud:    <><path d="M33 56 Q38 50 43 56" fill={INK}/><path d="M57 56 Q62 50 67 56" fill={INK}/></>,
    happy2:   <><circle cx="38" cy="54" r="5.5" fill={INK}/><circle cx="62" cy="54" r="5.5" fill={INK}/><circle cx="40" cy="52" r="2" fill="#fff"/><circle cx="64" cy="52" r="2" fill="#fff"/></>,
  };
  const mouth = {
    happy:    <path d="M36 68 Q50 78 64 68" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round"/>,
    worried:  <path d="M36 72 Q50 64 64 72" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round"/>,
    shocked:  <ellipse cx="50" cy="72" rx="8" ry="6" fill={INK}/>,
    excited:  <path d="M34 68 Q50 80 66 68" fill="none" stroke={INK} strokeWidth="3.5" strokeLinecap="round"/>,
    proud:    <path d="M36 68 Q50 76 64 68" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round"/>,
    happy2:   <path d="M35 68 Q50 79 65 68" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round"/>,
  };
  const brow = {
    worried: <><path d="M30 45 Q38 40 44 46" fill="none" stroke={INK} strokeWidth="2.5"/><path d="M56 46 Q62 40 70 45" fill="none" stroke={INK} strokeWidth="2.5"/></>,
    shocked: <><path d="M30 44 Q38 38 44 44" fill="none" stroke={INK} strokeWidth="2.5"/><path d="M56 44 Q62 38 70 44" fill="none" stroke={INK} strokeWidth="2.5"/></>,
  };
  return (
    <svg viewBox="0 0 100 180" width={size} height={size * 1.8} xmlns="http://www.w3.org/2000/svg">
      {/* Shadow */}
      <ellipse cx="50" cy="175" rx="28" ry="5" fill="rgba(0,0,0,0.12)"/>
      {/* Legs */}
      <rect x="32" y="130" width="14" height="44" rx="7" fill="#2D5A3D" stroke={INK} strokeWidth="2"/>
      <rect x="54" y="130" width="14" height="44" rx="7" fill="#2D5A3D" stroke={INK} strokeWidth="2"/>
      {/* Shoes */}
      <ellipse cx="39" cy="174" rx="11" ry="6" fill={INK}/>
      <ellipse cx="61" cy="174" rx="11" ry="6" fill={INK}/>
      {/* Body */}
      <rect x="22" y="82" width="56" height="54" rx="14" fill="#DB7F50" stroke={INK} strokeWidth="2.5"/>
      {/* Shirt collar */}
      <path d="M42 82 L50 94 L58 82" fill={PAPER} stroke={INK} strokeWidth="1.5"/>
      {/* Left arm */}
      <rect x="4" y="84" width="18" height="34" rx="9" fill="#DB7F50" stroke={INK} strokeWidth="2.5"/>
      {/* Right arm */}
      <rect x="78" y="84" width="18" height="34" rx="9" fill="#DB7F50" stroke={INK} strokeWidth="2.5"/>
      {/* Hands */}
      <circle cx="13" cy="120" r="8" fill="#F4C08A" stroke={INK} strokeWidth="2"/>
      <circle cx="87" cy="120" r="8" fill="#F4C08A" stroke={INK} strokeWidth="2"/>
      {/* Neck */}
      <rect x="40" y="76" width="20" height="14" rx="6" fill="#F4C08A" stroke={INK} strokeWidth="2"/>
      {/* Head */}
      <ellipse cx="50" cy="44" rx="34" ry="36" fill="#F4C08A" stroke={INK} strokeWidth="2.5"/>
      {/* Hair */}
      <path d="M16 38 Q18 8 50 10 Q82 8 84 38 Q76 18 50 20 Q24 18 16 38Z" fill={INK}/>
      {/* Ear L */}
      <ellipse cx="16" cy="46" rx="6" ry="8" fill="#F4C08A" stroke={INK} strokeWidth="2"/>
      {/* Ear R */}
      <ellipse cx="84" cy="46" rx="6" ry="8" fill="#F4C08A" stroke={INK} strokeWidth="2"/>
      {/* Eyebrows */}
      {brow[mood] || <><rect x="30" y="41" width="18" height="4" rx="2" fill={INK}/><rect x="52" y="41" width="18" height="4" rx="2" fill={INK}/></>}
      {/* Eyes */}
      {eyes[mood] || eyes.happy}
      {/* Mouth */}
      {mouth[mood] || mouth.happy}
      {/* Cheeks */}
      <circle cx="28" cy="66" r="8" fill="rgba(255,160,120,0.35)"/>
      <circle cx="72" cy="66" r="8" fill="rgba(255,160,120,0.35)"/>
    </svg>
  );
};

/* Priya — female character */
const Priya = ({ size = 160 }) => (
  <svg viewBox="0 0 100 180" width={size} height={size * 1.8} xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="50" cy="175" rx="28" ry="5" fill="rgba(0,0,0,0.12)"/>
    <rect x="32" y="130" width="36" height="46" rx="4" fill="#A855F7" stroke={INK} strokeWidth="2.5"/>
    {/* Saree/skirt detail */}
    <path d="M32 155 Q50 162 68 155 L68 176 Q50 170 32 176Z" fill="#7B21A8" stroke={INK} strokeWidth="1.5"/>
    <rect x="22" y="82" width="56" height="54" rx="14" fill="#C084FC" stroke={INK} strokeWidth="2.5"/>
    <path d="M42 82 L50 94 L58 82" fill="#E9D5FF" stroke={INK} strokeWidth="1.5"/>
    <rect x="4" y="84" width="18" height="30" rx="9" fill="#C084FC" stroke={INK} strokeWidth="2.5"/>
    <rect x="78" y="84" width="18" height="30" rx="9" fill="#C084FC" stroke={INK} strokeWidth="2.5"/>
    <circle cx="13" cy="116" r="8" fill="#F4C08A" stroke={INK} strokeWidth="2"/>
    <circle cx="87" cy="116" r="8" fill="#F4C08A" stroke={INK} strokeWidth="2"/>
    <rect x="40" y="76" width="20" height="14" rx="6" fill="#F4C08A" stroke={INK} strokeWidth="2"/>
    <ellipse cx="50" cy="44" rx="34" ry="36" fill="#F4C08A" stroke={INK} strokeWidth="2.5"/>
    {/* Long hair */}
    <path d="M16 32 Q12 6 50 8 Q88 6 84 32 Q82 18 50 18 Q18 18 16 32Z" fill={INK}/>
    <path d="M16 32 Q8 50 12 74 Q18 56 22 44Z" fill={INK}/>
    <path d="M84 32 Q92 50 88 74 Q82 56 78 44Z" fill={INK}/>
    <path d="M14 64 Q12 80 16 92 Q22 78 18 66Z" fill={INK}/>
    <path d="M86 64 Q88 80 84 92 Q78 78 82 66Z" fill={INK}/>
    <ellipse cx="16" cy="46" rx="6" ry="8" fill="#F4C08A" stroke={INK} strokeWidth="2"/>
    <ellipse cx="84" cy="46" rx="6" ry="8" fill="#F4C08A" stroke={INK} strokeWidth="2"/>
    {/* Bindi */}
    <circle cx="50" cy="28" r="3" fill="#DC2626"/>
    {/* Eyes with lashes */}
    <circle cx="38" cy="52" r="5.5" fill={INK}/>
    <circle cx="62" cy="52" r="5.5" fill={INK}/>
    <circle cx="40" cy="50" r="2" fill="#fff"/>
    <circle cx="64" cy="50" r="2" fill="#fff"/>
    <path d="M32 46 Q38 41 44 46" fill="none" stroke={INK} strokeWidth="2"/>
    <path d="M56 46 Q62 41 68 46" fill="none" stroke={INK} strokeWidth="2"/>
    <path d="M36 62 Q50 72 64 62" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round"/>
    <circle cx="28" cy="62" r="8" fill="rgba(255,150,150,0.4)"/>
    <circle cx="72" cy="62" r="8" fill="rgba(255,150,150,0.4)"/>
    {/* Earrings */}
    <circle cx="16" cy="52" r="3" fill={GOLD} stroke={INK} strokeWidth="1"/>
    <circle cx="84" cy="52" r="3" fill={GOLD} stroke={INK} strokeWidth="1"/>
  </svg>
);

/* Karthik — engineer with hard hat */
const Karthik = ({ size = 160 }) => (
  <svg viewBox="0 0 100 180" width={size} height={size * 1.8} xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="50" cy="175" rx="28" ry="5" fill="rgba(0,0,0,0.12)"/>
    <rect x="32" y="130" width="14" height="44" rx="7" fill={INK} stroke={INK} strokeWidth="2"/>
    <rect x="54" y="130" width="14" height="44" rx="7" fill={INK} stroke={INK} strokeWidth="2"/>
    <ellipse cx="39" cy="174" rx="11" ry="6" fill="#3D3D3D"/>
    <ellipse cx="61" cy="174" rx="11" ry="6" fill="#3D3D3D"/>
    {/* Hi-vis vest */}
    <rect x="22" y="82" width="56" height="54" rx="14" fill={GOLD} stroke={INK} strokeWidth="2.5"/>
    <rect x="22" y="100" width="56" height="6" rx="2" fill="#FB923C" stroke={INK} strokeWidth="1.5"/>
    <rect x="22" y="114" width="56" height="6" rx="2" fill="#FB923C" stroke={INK} strokeWidth="1.5"/>
    {/* Chest pocket */}
    <rect x="54" y="86" width="18" height="12" rx="3" fill="rgba(0,0,0,0.15)" stroke={INK} strokeWidth="1.5"/>
    <rect x="4" y="84" width="18" height="34" rx="9" fill={GOLD} stroke={INK} strokeWidth="2.5"/>
    <rect x="78" y="84" width="18" height="34" rx="9" fill={GOLD} stroke={INK} strokeWidth="2.5"/>
    {/* Clipboard */}
    <rect x="78" y="86" width="20" height="26" rx="3" fill="#fff" stroke={INK} strokeWidth="2"/>
    <rect x="83" y="80" width="10" height="7" rx="2" fill="#999" stroke={INK} strokeWidth="1.5"/>
    <line x1="82" y1="96" x2="94" y2="96" stroke={INK} strokeWidth="1.5"/>
    <line x1="82" y1="101" x2="94" y2="101" stroke={INK} strokeWidth="1.5"/>
    <line x1="82" y1="106" x2="94" y2="106" stroke={INK} strokeWidth="1.5"/>
    <circle cx="13" cy="120" r="8" fill="#F4C08A" stroke={INK} strokeWidth="2"/>
    <rect x="40" y="76" width="20" height="14" rx="6" fill="#F4C08A" stroke={INK} strokeWidth="2"/>
    <ellipse cx="50" cy="44" rx="34" ry="36" fill="#F4C08A" stroke={INK} strokeWidth="2.5"/>
    {/* Hard hat */}
    <ellipse cx="50" cy="18" rx="38" ry="14" fill={GOLD} stroke={INK} strokeWidth="2.5"/>
    <rect x="12" y="22" width="76" height="10" rx="3" fill={GOLD} stroke={INK} strokeWidth="2"/>
    {/* Hard hat brim */}
    <rect x="8" y="28" width="84" height="6" rx="3" fill="#E5A800" stroke={INK} strokeWidth="1.5"/>
    <ellipse cx="16" cy="46" rx="6" ry="8" fill="#F4C08A" stroke={INK} strokeWidth="2"/>
    <ellipse cx="84" cy="46" rx="6" ry="8" fill="#F4C08A" stroke={INK} strokeWidth="2"/>
    {/* Glasses */}
    <circle cx="37" cy="52" r="8" fill="none" stroke={INK} strokeWidth="2"/>
    <circle cx="63" cy="52" r="8" fill="none" stroke={INK} strokeWidth="2"/>
    <line x1="45" y1="52" x2="55" y2="52" stroke={INK} strokeWidth="2"/>
    <line x1="14" y1="52" x2="29" y2="52" stroke={INK} strokeWidth="2"/>
    <line x1="71" y1="52" x2="86" y2="52" stroke={INK} strokeWidth="2"/>
    <circle cx="37" cy="52" r="4" fill={INK}/>
    <circle cx="63" cy="52" r="4" fill={INK}/>
    <circle cx="38.5" cy="50.5" r="1.5" fill="#fff"/>
    <circle cx="64.5" cy="50.5" r="1.5" fill="#fff"/>
    <path d="M36 64 Q50 72 64 64" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round"/>
    <circle cx="30" cy="62" r="7" fill="rgba(255,160,120,0.3)"/>
    <circle cx="70" cy="62" r="7" fill="rgba(255,160,120,0.3)"/>
  </svg>
);

/* ═══════════════════════════════════════════════════════════════════
   COMIC STORY PAGE
═══════════════════════════════════════════════════════════════════ */
export default function ComicStory() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY  = useTransform(heroScroll, [0, 1], ['0%', '35%']);
  const heroOp = useTransform(heroScroll, [0, 0.8], [1, 0]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={{ background: INK, minHeight: '100vh', overflowX: 'hidden', fontFamily: 'Barlow, sans-serif' }}>
      <Navbar />

      {/* ════════════════════════════════════════════
          HERO — Full-screen cinematic comic cover
      ════════════════════════════════════════════ */}
      <div ref={heroRef} style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
        {/* Parallax background */}
        <motion.div style={{ position: 'absolute', inset: 0, y: heroY }}>
          <img src={IMG.house} alt="" style={{ width: '100%', height: '115%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(13,13,13,0.6) 50%, rgba(0,0,0,0.8) 100%)' }} />
        </motion.div>
        {/* Halftone over hero */}
        <Dots color="#fff" opacity={0.03} size={8} />
        {/* Speed lines burst from centre */}
        <SpeedLines color="rgba(212,98,42,0.06)" count={24} />
        {/* Colour bar top — comic magazine stripe */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 7, zIndex: 10,
          background: `repeating-linear-gradient(90deg,${TERRA} 0,${TERRA} 60px,${GOLD} 60px,${GOLD} 120px,${GREEN} 120px,${GREEN} 180px,${INK} 180px,${INK} 240px)` }} />

        <motion.div style={{ position: 'relative', zIndex: 5, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 24px 48px', opacity: heroOp }}>
          {/* Issue badge */}
          <motion.div initial={{ rotate: -12, scale: 0, opacity: 0 }} animate={{ rotate: -12, scale: 1, opacity: 1 }} transition={{ delay: 0.3, type: 'spring', stiffness: 180 }}
            style={{ background: TERRA, border: `3px solid ${GOLD}`, borderRadius: 6, padding: '8px 20px', boxShadow: `4px 4px 0 ${GOLD}`, marginBottom: 28, transform: 'rotate(-12deg)' }}>
            <p style={{ color: '#fff', fontSize: 11, fontWeight: 900, letterSpacing: '0.4em', textTransform: 'uppercase', margin: 0 }}>✦ True Story · Issue #001 ✦</p>
          </motion.div>

          <motion.p initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            style={{ color: TERRA, fontSize: 12, fontWeight: 900, letterSpacing: '0.7em', textTransform: 'uppercase', marginBottom: 16 }}>
            KARRCHOLAI PRESENTS
          </motion.p>

          <motion.h1 initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7, type: 'spring', stiffness: 120 }}
            style={{ fontSize: 'clamp(3.5rem, 12vw, 8rem)', fontWeight: 900, color: '#fff', lineHeight: 0.9, textAlign: 'center',
              textShadow: `6px 6px 0 ${TERRA}, 12px 12px 0 rgba(212,98,42,0.3)`, letterSpacing: '-0.03em', marginBottom: 24 }}>
            ARUN'S<br/><span style={{ color: GOLD, WebkitTextStroke: `2px ${INK}` }}>DREAM</span><br/>HOME
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 600, letterSpacing: '0.5em', textTransform: 'uppercase', marginBottom: 32 }}>
            A Comic Story · 9 Chapters · Erode, Tamil Nadu
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}
            style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            {['😤 10 Years Renting', '🏗️ 8 Months Building', '🏠 1 Dream Fulfilled', '⭐ 5.0 Rating'].map(t => (
              <span key={t} style={{ fontSize: 12, fontWeight: 700, color: GOLD, background: 'rgba(245,197,24,0.1)', border: `1.5px solid rgba(245,197,24,0.4)`, padding: '6px 16px', borderRadius: 20 }}>{t}</span>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
          style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', zIndex: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.4, repeat: Infinity }}
            style={{ width: 28, height: 44, border: '2px solid rgba(255,255,255,0.3)', borderRadius: 14, display: 'flex', justifyContent: 'center', paddingTop: 6 }}>
            <div style={{ width: 4, height: 10, background: 'rgba(255,255,255,0.5)', borderRadius: 2 }} />
          </motion.div>
          <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.3em', textTransform: 'uppercase' }}>scroll</span>
        </motion.div>
      </div>

      {/* ════════════════════════════════════════════
          CAST INTRO — dark full-width
      ════════════════════════════════════════════ */}
      <div style={{ background: '#141414', borderTop: `4px solid ${TERRA}`, borderBottom: `4px solid ${TERRA}`, padding: '60px 24px', position: 'relative', overflow: 'hidden' }}>
        <Dots color="#fff" opacity={0.025} size={8} />
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <Reveal from="top">
            <p style={{ textAlign: 'center', color: TERRA, fontSize: 10, fontWeight: 900, letterSpacing: '0.6em', textTransform: 'uppercase', marginBottom: 8 }}>✦ Meet the Cast ✦</p>
            <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: 12, fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 40 }}>The Characters of This Story</p>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
            {[
              { char: <Arun mood="excited" size={100}/>, name: 'Arun Kumar', role: 'Our Hero', desc: '34 · Software Engineer · Erode', color: TERRA },
              { char: <Priya size={100}/>, name: 'Priya', role: "Arun's Wife", desc: 'The visionary with 47 requirements', color: PLUM },
              { char: <Karthik size={100}/>, name: 'Karthik', role: 'Site Engineer', desc: 'Karrcholai · The man with a plan', color: GREEN },
            ].map((c, i) => (
              <Reveal key={i} from="bottom" delay={i * 0.15}>
                <motion.div whileHover={{ y: -6, boxShadow: `8px 8px 0 ${c.color}` }}
                  transition={{ duration: 0.25 }}
                  style={{ background: '#1E1E1E', border: `3px solid ${c.color}`, borderRadius: 8, padding: '24px 16px', textAlign: 'center', boxShadow: `5px 5px 0 ${c.color}` }}>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
                    <Float y={6} dur={2.2 + i * 0.3}>{c.char}</Float>
                  </div>
                  <p style={{ color: '#fff', fontWeight: 900, fontSize: 16, margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{c.name}</p>
                  <p style={{ color: c.color, fontWeight: 700, fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.4em', margin: '0 0 6px' }}>{c.role}</p>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: 500, margin: 0, lineHeight: 1.4 }}>{c.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════
          COMIC PANELS WRAPPER
      ════════════════════════════════════════════ */}
      <div style={{ background: '#0A0A0A', padding: '60px 16px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 4 }}>

          {/* Panel gutter — like real comic printing */}
          <style>{`
            .comic-grid { display: grid; gap: 4px; }
            .comic-grid-2 { grid-template-columns: 1fr 1fr; }
            .comic-grid-3 { grid-template-columns: 1.5fr 1fr; }
            .comic-grid-4 { grid-template-columns: 1fr 1.6fr; }
            @media (max-width: 640px) {
              .comic-grid-2, .comic-grid-3, .comic-grid-4 { grid-template-columns: 1fr; }
            }
            .comic-panel { border: 3px solid #0D0D0D; overflow: hidden; position: relative; }
          `}</style>

          {/* ─── CH1: Wide full panel — The Problem ─── */}
          <Reveal from="left">
            <div className="comic-panel" style={{ background: PAPER, minHeight: 340 }}>
              <Dots opacity={0.05} />
              <Chapter num="01" title="The Renting Nightmare" color={TERRA} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', minHeight: 340, position: 'relative', zIndex: 2 }}>
                {/* Left: scene image */}
                <div style={{ position: 'relative', overflow: 'hidden', minHeight: 280 }}>
                  <img src={IMG.rental} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(0.6) contrast(1.1)' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 60%, ' + PAPER + ')' }} />
                  <div style={{ position: 'absolute', bottom: 20, left: 20 }}>
                    <Float y={8} dur={2.4}><Arun mood="worried" size={120} /></Float>
                  </div>
                  <div style={{ position: 'absolute', bottom: 165, left: 100 }}>
                    <Say text="10 years of renting... WHEN will I ever own a home?!" from="br" bg="#fff" maxW={210} fontSize={13} />
                  </div>
                </div>
                {/* Right: story */}
                <div style={{ padding: '60px 32px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 16 }}>
                  <div style={{ fontSize: 'clamp(2.2rem,5vw,3.6rem)', fontWeight: 900, lineHeight: 0.95, color: INK }}>
                    The<br /><span style={{ color: TERRA, WebkitTextStroke: '1px ' + INK }}>Renting</span><br />Nightmare
                  </div>
                  <p style={{ fontSize: 14, color: INK, opacity: 0.65, lineHeight: 1.75, maxWidth: 360 }}>
                    <strong>Arun Kumar, 34</strong>, a software engineer from Erode, had one dream bigger than any sprint deadline — his own home. But every contractor he called gave sky-high quotes with zero transparency.
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {['💸 Sky-high Quotes', '😤 Zero Transparency', '📋 No Clear Plan', '🕐 10 Years Waiting'].map(t => (
                      <span key={t} style={{ fontSize: 11, fontWeight: 700, background: INK, color: '#fff', padding: '5px 12px', borderRadius: 20 }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ─── CH2: Two-panel row ─── */}
          <div className="comic-grid comic-grid-3">
            {/* Left: dark discovery panel */}
            <Reveal from="left" delay={0.05}>
              <div className="comic-panel" style={{ background: '#111', minHeight: 400, position: 'relative' }}>
                <Dots color="#fff" opacity={0.03} size={9} />
                <Chapter num="02" title="The Discovery" color={TERRA} />
                <div style={{ padding: '60px 28px 28px', position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 900, color: '#fff', lineHeight: 1, textShadow: `4px 4px 0 ${TERRA}`, marginBottom: 20 }}>
                      A Friend's<br />Tip Changed<br />Everything
                    </div>
                    <div style={{ background: 'rgba(212,98,42,0.15)', border: `2px solid ${TERRA}`, borderRadius: 8, padding: '16px 18px', marginBottom: 16 }}>
                      <p style={{ color: '#fff', opacity: 0.9, fontSize: 13, lineHeight: 1.65, fontStyle: 'italic', margin: '0 0 8px' }}>
                        "Bro, call <strong style={{ color: TERRA }}>Karrcholai!</strong> My cousin built in Karur — transparent pricing, weekly photos, full Vastu. Zero drama. Seriously."
                      </p>
                      <p style={{ color: TERRA, fontSize: 9, fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase', margin: 0 }}>— Ravi, Arun's colleague</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                    <SFX text={'💡'} size={60} bg={GOLD} tc={INK} rot={-5} />
                    <SFX text={'AHA!'} size={80} bg={TERRA} tc="#fff" rot={0} />
                    <SFX text={'WOW!'} size={68} bg={GREEN} tc="#fff" rot={6} />
                  </div>
                </div>
              </div>
            </Reveal>
            {/* Right: character reaction */}
            <Reveal from="right" delay={0.1}>
              <div className="comic-panel" style={{ background: '#1A1A2E', minHeight: 400, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 24px 28px', gap: 20 }}>
                <Dots color="#fff" opacity={0.03} size={7} />
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <Float y={14} dur={2.2}>
                    <Arun mood="shocked" size={150} />
                  </Float>
                </div>
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <Say text="Wait — VASTU consultation AND weekly photo updates?! Sign. Me. Up!!" from="tl" bg={GOLD} tc={INK} maxW={230} fontSize={13} />
                </div>
              </div>
            </Reveal>
          </div>

          {/* ─── CH3: First meeting — 3-column ─── */}
          <Reveal from="bottom" delay={0.05}>
            <div className="comic-panel" style={{ background: '#F0FAF2', minHeight: 420 }}>
              <Dots color={GREEN} opacity={0.04} size={7} />
              <Chapter num="03" title="First Meeting" color={GREEN} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 1fr', gap: 0, position: 'relative', zIndex: 2, padding: '60px 0 0' }}>
                {/* Arun col */}
                <div style={{ padding: '20px 24px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', gap: 14, borderRight: `3px solid ${INK}` }}>
                  <Float y={8} dur={2.5}><Arun mood="excited" size={130} /></Float>
                  <Say text="Tell me EVERYTHING — budget, timeline, Vastu!" from="tl" bg="#fff" maxW={190} fontSize={12} />
                  <p style={{ fontSize: 10, fontWeight: 900, color: GREEN, letterSpacing: '0.3em', textTransform: 'uppercase', marginTop: 4 }}>Arun · The Client</p>
                </div>
                {/* Centre col */}
                <div style={{ padding: '24px 28px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, borderRight: `3px solid ${INK}` }}>
                  <div style={{ fontSize: 'clamp(1.6rem,3vw,2.2rem)', fontWeight: 900, color: GREEN, textAlign: 'center', lineHeight: 1.05, marginBottom: 4 }}>Karrcholai<br />Promises</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, width: '100%' }}>
                    {[['🏗️ Site Visit', 'FREE'], ['⚡ Estimate', 'Same Day'], ['🧭 Vastu', 'Included'], ['📋 Timeline', 'Transparent'], ['📸 Updates', 'Weekly'], ['💰 Pricing', 'No Surprises']].map(([k, v]) => (
                      <div key={k} style={{ background: GREEN, padding: '8px 10px', borderRadius: 6, border: `2px solid ${INK}`, boxShadow: `2px 2px 0 ${INK}` }}>
                        <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.6)', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0 0 2px' }}>{k}</p>
                        <p style={{ fontSize: 12, color: GOLD, fontWeight: 900, margin: 0 }}>{v}</p>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Karthik col */}
                <div style={{ padding: '20px 24px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', gap: 14 }}>
                  <Float y={7} dur={2.1} delay={0.4}><Karthik size={130} /></Float>
                  <Say text="1800 sq.ft · 2 floors · Vastu-aligned · ₹42L all-in. Zero surprises. My word." from="tr" bg={GOLD} tc={INK} maxW={200} fontSize={12} />
                  <p style={{ fontSize: 10, fontWeight: 900, color: GREEN, letterSpacing: '0.3em', textTransform: 'uppercase', marginTop: 4 }}>Karthik · Engineer</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ─── CH4: Wife's checklist — scene + character ─── */}
          <div className="comic-grid comic-grid-4">
            <Reveal from="left" delay={0.05}>
              <div className="comic-panel" style={{ minHeight: 440, position: 'relative', overflow: 'hidden' }}>
                <img src={IMG.blueprint} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(0.5)' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(107,33,168,0.9), rgba(107,33,168,0.75))' }} />
                <Dots color="#fff" opacity={0.04} size={6} />
                <div style={{ position: 'relative', zIndex: 2, padding: '56px 28px 28px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <Chapter num="04" title="Priya's Grand Plan" color={GOLD} />
                    <div style={{ fontSize: 'clamp(1.8rem,4vw,2.6rem)', fontWeight: 900, color: '#fff', lineHeight: 1, marginTop: 16, marginBottom: 20, textShadow: `3px 3px 0 ${PLUM}` }}>
                      47 Requirements.<br /><span style={{ color: GOLD }}>All Delivered.</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {[
                        { icon: '🕌', text: 'Pooja room — East facing' },
                        { icon: '🍳', text: 'Kitchen — South-East (Vastu)' },
                        { icon: '🛏️', text: 'Master bedroom — South-West' },
                        { icon: '🌿', text: 'Garden + Rainwater harvesting' },
                        { icon: '☀️', text: 'Solar panels on terrace' },
                        { icon: '☕', text: 'Wide verandah for morning chai' },
                      ].map((r, i) => (
                        <motion.div key={i} initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }} transition={{ delay: 0.1 * i, duration: 0.45 }}
                          style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ width: 24, height: 24, borderRadius: '50%', background: GREEN, border: `2.5px solid ${GOLD}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 11, color: '#fff', fontWeight: 900, boxShadow: `2px 2px 0 ${INK}` }}>✓</div>
                          <span style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{r.icon} {r.text}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal from="right" delay={0.1}>
              <div className="comic-panel" style={{ background: '#FAF0FF', minHeight: 440, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '56px 24px 28px', gap: 20 }}>
                <Float y={10} dur={2.3}><Priya size={155} /></Float>
                <Say text="I have a colour-coded spreadsheet and I will not compromise on a SINGLE item! 📊" from="tl" bg={PLUM} tc="#fff" maxW={240} fontSize={13} />
                <div style={{ marginTop: 8 }}>
                  <Say text="All 47 items — consider them done! ✅" from="bl" bg={GOLD} tc={INK} maxW={220} fontSize={12} />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8, marginRight: 16 }}>
                    <Float y={5} dur={1.8} delay={0.5}><Karthik size={80} /></Float>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ─── CH5: Construction — scene bg + progress ─── */}
          <Reveal from="bottom" delay={0.05}>
            <div className="comic-panel" style={{ minHeight: 420, position: 'relative', overflow: 'hidden' }}>
              <img src={IMG.construct} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(13,13,13,0.95) 0%, rgba(13,13,13,0.75) 60%, rgba(13,13,13,0.5) 100%)' }} />
              <Dots color="#fff" opacity={0.03} size={8} />
              <div style={{ position: 'relative', zIndex: 2, padding: '60px 32px 32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, alignItems: 'center' }}>
                <div>
                  <Chapter num="05" title="Construction Begins!" color={GOLD} />
                  <div style={{ fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 900, color: '#fff', lineHeight: 1, marginBottom: 24, textShadow: `4px 4px 0 ${TERRA}` }}>
                    Built by the<br /><span style={{ color: GOLD }}>Numbers</span>
                  </div>
                  <ProgressBar label="Foundation & Footings" pct={100} color={GREEN} delay={0} />
                  <ProgressBar label="Ground Floor Structure" pct={100} color={GREEN} delay={0.1} />
                  <ProgressBar label="First Floor & Roof" pct={100} color={TERRA} delay={0.2} />
                  <ProgressBar label="Plumbing & Electrical" pct={100} color={PLUM} delay={0.3} />
                  <ProgressBar label="Tile · Paint · Finishing" pct={100} color={GOLD} delay={0.4} />
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
                    {['⏱ 8 Months', '📐 1800 sq.ft', '🏠 2 Floors', '💰 ₹42 Lakhs'].map(t => (
                      <span key={t} style={{ fontSize: 12, fontWeight: 900, background: '#fff', color: INK, padding: '5px 13px', borderRadius: 4, border: `2px solid ${INK}`, boxShadow: `2px 2px 0 ${TERRA}` }}>{t}</span>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
                  <motion.div animate={{ y: [0, -14, 0], scale: [1, 1.06, 1] }} transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}>
                    <div style={{ fontSize: 120, lineHeight: 1, filter: 'drop-shadow(4px 8px 0 rgba(212,98,42,0.4))' }}>🏗️</div>
                  </motion.div>
                  <Say text="Every Sunday morning — WhatsApp photo album! I felt ON-SITE from 200km away 🙌" from="tl" bg="#fff" tc={INK} maxW={240} fontSize={13} />
                  <p style={{ fontSize: 10, fontWeight: 900, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.3em', textTransform: 'uppercase' }}>— Arun, Client</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ─── CH6: Timeline — full dark panel ─── */}
          <Reveal from="right" delay={0.05}>
            <div className="comic-panel" style={{ background: '#0D0D0D', minHeight: 360, position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(ellipse at 50% 0%, rgba(245,197,24,0.08) 0%, transparent 60%)` }} />
              <Dots color={GOLD} opacity={0.025} size={10} />
              <div style={{ position: 'relative', zIndex: 2, padding: '60px 32px 40px' }}>
                <Chapter num="06" title="8 Months · Zero Drama" color={GOLD} />
                <div style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 900, color: '#fff', textAlign: 'center', textShadow: `5px 5px 0 ${GOLD}`, marginBottom: 32, lineHeight: 1 }}>
                  ⚡ Timeline of a Dream ⚡
                </div>
                {/* Timeline */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0, overflowX: 'auto', paddingBottom: 8 }} className="hide-scrollbar">
                  {[
                    { mo: 'M1', icon: '📐', label: 'Site Survey\n& Design' },
                    { mo: 'M2', icon: '⛏️', label: 'Foundation\nWork' },
                    { mo: 'M3', icon: '🧱', label: 'Ground Floor\nComplete' },
                    { mo: 'M4', icon: '🏗️', label: 'First Floor\nStructure' },
                    { mo: 'M5', icon: '🏠', label: 'Roofing\n& Brickwork' },
                    { mo: 'M6', icon: '🔌', label: 'Plaster\n& Wiring' },
                    { mo: 'M7', icon: '🎨', label: 'Tile, Paint\n& Finishing' },
                    { mo: 'M8', icon: '🔑', label: 'Key\nHandover 🎉' },
                  ].map((t, i) => (
                    <React.Fragment key={i}>
                      <motion.div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flexShrink: 0, minWidth: 80 }}
                        initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} transition={{ delay: i * 0.09, duration: 0.45 }}>
                        <div style={{ width: 56, height: 56, borderRadius: '50%', background: GREEN, border: `3px solid ${GOLD}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, boxShadow: `3px 3px 0 ${GOLD}` }}>{t.icon}</div>
                        <span style={{ fontSize: 8, fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', textAlign: 'center', whiteSpace: 'pre-line', maxWidth: 68, lineHeight: 1.4 }}>{t.label}</span>
                      </motion.div>
                      {i < 7 && <div style={{ flex: 1, height: 3, background: `rgba(245,197,24,0.2)`, minWidth: 12, borderRadius: 2, marginTop: 26, flexShrink: 1 }} />}
                    </React.Fragment>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 32, flexWrap: 'wrap' }}>
                  <SFX text={'ON\nTIME'} size={96} bg={GREEN} tc="#fff" rot={-4} />
                  <SFX text={'ON\nBUDGET'} size={108} bg={TERRA} tc="#fff" rot={0} />
                  <SFX text={'VASTU\n✅'} size={96} bg={GOLD} tc={INK} rot={4} />
                </div>
              </div>
            </div>
          </Reveal>

          {/* ─── CH7: Key moments ─── */}
          <Reveal from="left" delay={0.05}>
            <div className="comic-panel" style={{ background: PAPER, minHeight: 360 }}>
              <Dots opacity={0.05} />
              <div style={{ position: 'relative', zIndex: 2, padding: '60px 28px 32px' }}>
                <Chapter num="07" title="Memories Made" color={GREEN} />
                <div style={{ fontSize: 'clamp(1.8rem,4vw,2.6rem)', fontWeight: 900, color: INK, textAlign: 'center', marginBottom: 28, lineHeight: 1.1 }}>
                  The Moments That Made<br /><span style={{ color: GREEN }}>the Journey Special</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
                  {[
                    { emoji: '🧱', title: 'First Brick Day', text: "Arun and Priya laid the first brick together. Karthik said: 'This is your home's heartbeat beginning to beat.' Happy tears from both.", bg: CREAM, ac: GOLD },
                    { emoji: '📱', title: 'Sunday Photo Albums', text: "Every Sunday morning — a WhatsApp album of the week's progress. Arun shared it with his parents in Chennai. They cried every week.", bg: '#F0FAF2', ac: GREEN },
                    { emoji: '🧭', title: 'Vastu Certification Day', text: "The Vastu consultant confirmed perfect alignment: Pooja East ✅, Kitchen South-East ✅, Bedroom South-West ✅. Priya's spreadsheet — fully checked.", bg: '#FAF0FF', ac: PLUM },
                  ].map((m, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, y: 30, rotate: i % 2 === 0 ? -2 : 2 }}
                      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                      viewport={{ once: true }} transition={{ delay: 0.12 * i, duration: 0.55 }}
                      style={{ background: m.bg, border: `2.5px solid ${INK}`, borderRadius: 6, padding: '20px 18px', boxShadow: `5px 5px 0 ${INK}` }}>
                      <div style={{ fontSize: 44, marginBottom: 10, lineHeight: 1 }}>{m.emoji}</div>
                      <div style={{ width: 32, height: 4, background: m.ac, borderRadius: 2, marginBottom: 10 }} />
                      <p style={{ fontSize: 14, fontWeight: 900, color: INK, margin: '0 0 8px' }}>{m.title}</p>
                      <p style={{ fontSize: 12, color: INK, opacity: 0.62, lineHeight: 1.65, margin: 0 }}>{m.text}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* ─── CH8: The Grand Handover — cinematic full panel ─── */}
          <Reveal from="bottom" delay={0.05}>
            <div className="comic-panel" style={{ minHeight: 480, position: 'relative', overflow: 'hidden' }}>
              <img src={IMG.house} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(45,90,61,0.96) 0%, rgba(45,90,61,0.8) 50%, rgba(45,90,61,0.55) 100%)' }} />
              <Dots color="#fff" opacity={0.03} size={9} />
              <div style={{ position: 'relative', zIndex: 2, padding: '60px 32px 32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'center', minHeight: 420 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <Chapter num="08" title="The Grand Handover 🎉" color={GOLD} />
                  <div style={{ fontSize: 'clamp(2.5rem,6vw,4.5rem)', fontWeight: 900, color: '#fff', lineHeight: 0.9, textShadow: `6px 6px 0 ${GOLD}` }}>
                    Key<br />Handover<br />Day!
                  </div>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', lineHeight: 1.75, maxWidth: 380 }}>
                    8 months after the ground-breaking, Karthik handed Arun the keys to his brand-new, Vastu-aligned, 1800 sq.ft dream home — <strong style={{ color: GOLD }}>on time and on budget.</strong>
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {['✅ On Time', '✅ On Budget', '✅ Vastu Certified', '✅ Solar Ready', '✅ Rainwater Harvesting'].map(t => (
                      <span key={t} style={{ fontSize: 11, fontWeight: 700, color: GOLD, background: 'rgba(245,197,24,0.12)', border: `1.5px solid ${GOLD}`, padding: '4px 12px', borderRadius: 20 }}>{t}</span>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
                  <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                      <Float y={14} dur={1.8}><Arun mood="proud" size={130} /></Float>
                      <Say text="Finally… this is OURS! 🥹" from="tl" bg={GOLD} tc={INK} maxW={155} fontSize={12} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                      <Float y={10} dur={2.1} delay={0.4}><Priya size={130} /></Float>
                      <Say text="Every detail — exactly as I imagined 💜" from="tr" bg="#C084FC" tc="#fff" maxW={175} fontSize={12} />
                    </div>
                  </div>
                  <motion.div animate={{ scale: [1, 1.12, 1], rotate: [0, 2, -2, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}>
                    <div style={{ fontSize: 96, lineHeight: 1, filter: 'drop-shadow(5px 8px 0 rgba(245,197,24,0.5))' }}>🏠</div>
                  </motion.div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ─── CH9: Verdict — Q&A cards ─── */}
          <Reveal from="top" delay={0.05}>
            <div className="comic-panel" style={{ background: PAPER, minHeight: 420 }}>
              <Dots opacity={0.05} />
              <div style={{ position: 'relative', zIndex: 2, padding: '60px 28px 40px' }}>
                <Chapter num="09" title="Arun's Verdict" color={TERRA} />
                <div style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 900, color: INK, textAlign: 'center', marginBottom: 28, lineHeight: 1.1 }}>
                  What Arun Says<br /><span style={{ color: TERRA }}>Today</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 740, margin: '0 auto' }}>
                  {[
                    { q: 'How was the overall experience?', a: "Honestly? Stress-free — and I've NEVER said that about a construction project. Not once.", icon: '😌', c: CREAM },
                    { q: 'What surprised you most?', a: "The Sunday WhatsApp photo albums. I felt like I was on-site even when I was in my Bengaluru office.", icon: '📲', c: '#F0FAF2' },
                    { q: 'Was the Vastu alignment worth it?', a: "Priya would have never let us move in without it 😂 Genuinely though — the house has incredible flow. Every room feels right.", icon: '🧭', c: '#FAF0FF' },
                    { q: 'Would you recommend Karrcholai?', a: "Already did — three colleagues have reached out. I give the same answer every time: call them first, before anyone else.", icon: '🙌', c: '#FFF8EC' },
                  ].map((qa, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                      transition={{ delay: 0.12 * i, duration: 0.55 }}
                      style={{ background: qa.c, border: `2.5px solid ${INK}`, borderRadius: 6, padding: '16px 20px', boxShadow: `4px 4px 0 ${INK}`, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                      <span style={{ fontSize: 34, flexShrink: 0, lineHeight: 1 }}>{qa.icon}</span>
                      <div>
                        <p style={{ fontSize: 9, fontWeight: 900, color: TERRA, letterSpacing: '0.25em', textTransform: 'uppercase', margin: '0 0 5px' }}>Q: {qa.q}</p>
                        <p style={{ fontSize: 14, color: INK, opacity: 0.72, lineHeight: 1.65, fontStyle: 'italic', margin: 0 }}>"{qa.a}"</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                {/* Big final quote */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, marginTop: 36 }}>
                  <Float y={10} dur={2.5}><Arun mood="happy2" size={100} /></Float>
                  <div style={{ background: TERRA, border: `3px solid ${INK}`, borderRadius: 6, padding: '16px 28px', maxWidth: 500, textAlign: 'center', boxShadow: `6px 6px 0 ${INK}` }}>
                    <p style={{ color: '#fff', fontSize: 16, fontWeight: 700, lineHeight: 1.6, margin: 0 }}>
                      "10 years of renting → 1 phone call → 8 months → <strong style={{ color: GOLD }}>Dream Home.</strong><br />Thank you, Karrcholai! 🏠✨"
                    </p>
                  </div>
                  <p style={{ fontSize: 11, fontWeight: 900, color: TERRA, letterSpacing: '0.3em', textTransform: 'uppercase' }}>— Arun Kumar · Erode, Tamil Nadu</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ════════════════════════════════════════════
          FINALE — dark cinematic closing
      ════════════════════════════════════════════ */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <img src={IMG.family} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(13,13,13,0.97), rgba(13,13,13,0.85), rgba(13,13,13,0.97))' }} />
        <Dots color="#fff" opacity={0.025} size={8} />
        <div style={{ position: 'relative', zIndex: 2, padding: '80px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          {/* THE END badge */}
          <motion.div initial={{ scale: 0, rotate: -15 }} whileInView={{ scale: 1, rotate: -4 }}
            viewport={{ once: true }} transition={{ type: 'spring', stiffness: 160, damping: 12 }}
            style={{ background: GREEN, border: `4px solid ${GOLD}`, borderRadius: 8, padding: '14px 36px', boxShadow: `8px 8px 0 ${INK}`, transform: 'rotate(-4deg)' }}>
            <p style={{ color: GOLD, fontSize: 10, fontWeight: 900, letterSpacing: '0.7em', textTransform: 'uppercase', margin: '0 0 4px', textAlign: 'center' }}>✦ THE END ✦</p>
            <p style={{ color: '#fff', fontSize: 'clamp(2rem,6vw,3.5rem)', fontWeight: 900, lineHeight: 1, margin: '0 0 4px', textAlign: 'center', letterSpacing: '-0.02em' }}>Home Sweet Home! 🏠</p>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: 600, letterSpacing: '0.35em', textTransform: 'uppercase', margin: 0, textAlign: 'center' }}>Built by Karrcholai — Stone · Grove · Living</p>
          </motion.div>

          {/* Rating */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <p style={{ fontSize: 9, fontWeight: 900, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>Verified Client Rating</p>
            <div style={{ display: 'flex', gap: 10 }}>
              {[1, 2, 3, 4, 5].map(s => (
                <motion.span key={s} initial={{ scale: 0 }} whileInView={{ scale: 1 }}
                  viewport={{ once: true }} transition={{ delay: 0.4 + s * 0.1, type: 'spring', stiffness: 300 }}
                  style={{ fontSize: 32 }}>⭐</motion.span>
              ))}
            </div>
            <p style={{ fontSize: 15, fontStyle: 'italic', color: 'rgba(255,255,255,0.55)', maxWidth: 480, textAlign: 'center', lineHeight: 1.6 }}>
              "I didn't just get a house. I got my dream, brick by brick."
            </p>
            <p style={{ fontSize: 11, fontWeight: 900, color: TERRA, letterSpacing: '0.3em', textTransform: 'uppercase' }}>— Arun Kumar, Erode</p>
          </div>

          {/* CTA */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.7 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, marginTop: 12 }}>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase' }}>Ready to write YOUR story?</p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link to="/contact" style={{ textDecoration: 'none' }}>
                <motion.button whileHover={{ scale: 1.05, boxShadow: `6px 6px 0 ${GOLD}` }} whileTap={{ scale: 0.97 }}
                  style={{ background: TERRA, color: '#fff', border: `3px solid ${INK}`, borderRadius: 4, padding: '14px 32px', fontSize: 13, fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer', boxShadow: `4px 4px 0 ${INK}` }}>
                  🏠 Start My Dream Home →
                </motion.button>
              </Link>
              <Link to="/blog" style={{ textDecoration: 'none' }}>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                  style={{ background: 'transparent', color: '#fff', border: `2px solid rgba(255,255,255,0.25)`, borderRadius: 4, padding: '14px 28px', fontSize: 13, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer' }}>
                  ← More Stories
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <UnifiedFooter />
    </div>
  );
}
