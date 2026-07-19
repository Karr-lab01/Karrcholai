import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FiStar } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import UnifiedFooter from '../components/UnifiedFooter';
import { blogPosts } from '../data/blogData.jsx';

/* ════════════════════════════════════════════════════════════════
   COMIC COMPONENTS — used by ComicStoryRenderer
════════════════════════════════════════════════════════════════ */

/* ── Speech Bubble ── */
const Bubble = ({ text, dir = 'down-left', color = '#fff', tc = '#111', type = 'say', maxW = 230 }) => {
  const isShout = type === 'shout';
  const isThink = type === 'think';
  const br = isThink ? '50%' : isShout ? '6px' : '20px 20px 20px 4px';
  const bdr = isShout
    ? '3px solid #111'
    : isThink
    ? '2.5px dashed rgba(0,0,0,0.35)'
    : '2.5px solid #111';
  return (
    <div className="relative inline-block" style={{ maxWidth: maxW }}>
      <div style={{
        background: color, border: bdr, borderRadius: br,
        padding: '10px 16px', boxShadow: isThink ? 'none' : '3px 3px 0 #111',
        position: 'relative',
      }}>
        <p style={{ color: tc, fontSize: 13, fontWeight: 700, lineHeight: 1.45, margin: 0 }}>{text}</p>
      </div>
      {/* Tail */}
      {!isThink && dir === 'down-left' && (
        <div style={{ position:'absolute', bottom:-13, left:18,
          width:0, height:0, borderLeft:'8px solid transparent',
          borderRight:'6px solid transparent', borderTop:`14px solid ${color}`,
          filter: 'drop-shadow(1px 2px 0 #111)' }} />
      )}
      {!isThink && dir === 'down-right' && (
        <div style={{ position:'absolute', bottom:-13, right:18,
          width:0, height:0, borderLeft:'6px solid transparent',
          borderRight:'8px solid transparent', borderTop:`14px solid ${color}`,
          filter: 'drop-shadow(-1px 2px 0 #111)' }} />
      )}
      {!isThink && dir === 'up-left' && (
        <div style={{ position:'absolute', top:-13, left:18,
          width:0, height:0, borderLeft:'8px solid transparent',
          borderRight:'6px solid transparent', borderBottom:`14px solid ${color}`,
          filter: 'drop-shadow(1px -2px 0 #111)' }} />
      )}
      {!isThink && dir === 'right' && (
        <div style={{ position:'absolute', top:'50%', right:-13, transform:'translateY(-50%)',
          width:0, height:0, borderTop:'7px solid transparent',
          borderBottom:'7px solid transparent', borderLeft:`14px solid ${color}` }} />
      )}
      {!isThink && dir === 'left' && (
        <div style={{ position:'absolute', top:'50%', left:-13, transform:'translateY(-50%)',
          width:0, height:0, borderTop:'7px solid transparent',
          borderBottom:'7px solid transparent', borderRight:`14px solid ${color}` }} />
      )}
      {isThink && (
        <>
          <div style={{ position:'absolute', bottom:-6, left:22, width:10, height:10, borderRadius:'50%', background:color, border:'2px dashed rgba(0,0,0,0.35)' }}/>
          <div style={{ position:'absolute', bottom:-14, left:14, width:7, height:7, borderRadius:'50%', background:color, border:'2px dashed rgba(0,0,0,0.35)' }}/>
        </>
      )}
    </div>
  );
};

/* ── SFX Star Burst ── */
const SFX = ({ text, size = 90, color = '#FFD700', tc = '#111', rotate = 0 }) => (
  <div style={{ position:'relative', width:size, height:size, transform:`rotate(${rotate}deg)`, flexShrink:0 }}>
    <svg viewBox="0 0 100 100" style={{ position:'absolute', inset:0, width:'100%', height:'100%' }}>
      <polygon points="50,0 63,34 98,34 70,55 81,90 50,68 19,90 30,55 2,34 37,34"
        fill={color} stroke="#111" strokeWidth="2.5" strokeLinejoin="round"/>
    </svg>
    <span style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center',
      color:tc, fontWeight:900, fontSize:size*0.2, textAlign:'center', lineHeight:1.1, padding:2 }}>{text}</span>
  </div>
);

/* ── Halftone overlay ── */
const Halftone = ({ opacity = 0.07, color = '#000', size = 6 }) => (
  <div style={{
    position:'absolute', inset:0, pointerEvents:'none', zIndex:0,
    backgroundImage:`radial-gradient(circle, ${color} 1px, transparent 1px)`,
    backgroundSize:`${size}px ${size}px`, opacity,
  }}/>
);

/* ── Comic Panel wrapper ── */
const Panel = ({ children, bg='#fff', outlineColor='#111', accent, label, from='bottom', delay=0, className='' }) => {
  const initMap = {
    bottom: { opacity:0, y:60 },
    left:   { opacity:0, x:-80 },
    right:  { opacity:0, x:80 },
    top:    { opacity:0, y:-60 },
    scale:  { opacity:0, scale:0.8 },
  };
  return (
    <motion.div
      initial={initMap[from] || initMap.bottom}
      whileInView={{ opacity:1, y:0, x:0, scale:1 }}
      viewport={{ once:true, margin:'-50px' }}
      transition={{ duration:0.65, delay, ease:[0.16,1,0.3,1] }}
      className={`relative overflow-hidden ${className}`}
      style={{ background:bg, border:`3px solid ${outlineColor}`, borderRadius:6,
        boxShadow:`6px 6px 0 ${outlineColor}` }}
    >
      {accent && <div style={{ height:5, background:accent, borderBottom:`2px solid ${outlineColor}` }}/>}
      {label && (
        <div style={{ position:'absolute', top:10, left:12, zIndex:20,
          background:outlineColor, color:bg, fontSize:9, fontWeight:900,
          letterSpacing:'0.35em', textTransform:'uppercase', padding:'3px 8px', borderRadius:3 }}>
          {label}
        </div>
      )}
      {children}
    </motion.div>
  );
};

/* ── Animated progress bar ── */
const Bar = ({ label, pct, color='#DB7F50' }) => (
  <div style={{ marginBottom:10 }}>
    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
      <span style={{ fontSize:11, fontWeight:800, textTransform:'uppercase', letterSpacing:'0.1em' }}>{label}</span>
      <span style={{ fontSize:11, fontWeight:900, color }}>{pct}%</span>
    </div>
    <div style={{ height:14, background:'#eee', border:'2px solid #111', borderRadius:20,
      overflow:'hidden', boxShadow:'2px 2px 0 #111' }}>
      <motion.div
        initial={{ width:0 }} whileInView={{ width:`${pct}%` }} viewport={{ once:true }}
        transition={{ duration:1.2, delay:0.3, ease:'easeOut' }}
        style={{ height:'100%', background:color, borderRadius:20 }}
      />
    </div>
  </div>
);

/* ── Comic Story Renderer ── */
const ComicStoryRenderer = ({ story }) => (
  <div style={{ fontFamily:'Barlow, sans-serif' }}>
    {/* Title banner */}
    <motion.div initial={{ opacity:0, scale:0.9 }} whileInView={{ opacity:1, scale:1 }}
      viewport={{ once:true }} transition={{ duration:0.7, type:'spring', stiffness:120 }}
      style={{ background:'#111', border:'4px solid #111', borderRadius:6,
        boxShadow:'10px 10px 0 #DB7F50', marginBottom:32, overflow:'hidden', position:'relative' }}>
      <Halftone color="#fff" opacity={0.04} size={8}/>
      {/* Comic page rips top */}
      <div style={{ position:'absolute', top:0, left:0, right:0, height:6,
        background:'repeating-linear-gradient(90deg,#DB7F50 0,#DB7F50 18px,#f5c518 18px,#f5c518 36px,#2D4B37 36px,#2D4B37 54px)' }}/>
      <div style={{ padding:'40px 24px 32px', textAlign:'center', position:'relative', zIndex:1 }}>
        <motion.p style={{ color:'#DB7F50', fontSize:10, fontWeight:900, letterSpacing:'0.6em',
          textTransform:'uppercase', marginBottom:10 }}
          initial={{ opacity:0, y:-10 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          transition={{ delay:0.2 }}>
          ✦ Karrcholai Presents ✦
        </motion.p>
        <motion.h2 style={{ color:'#fff', fontSize:'clamp(2.5rem,8vw,5rem)', fontWeight:900,
          lineHeight:1, letterSpacing:'-0.02em', textShadow:'5px 5px 0 #DB7F50', margin:'0 0 12px' }}
          initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          transition={{ delay:0.3 }}>
          {story.title}
        </motion.h2>
        <p style={{ color:'rgba(255,255,255,0.5)', fontSize:13, fontWeight:600,
          letterSpacing:'0.3em', textTransform:'uppercase' }}>{story.subtitle}</p>
        <div style={{ display:'flex', justifyContent:'center', gap:8, marginTop:18, flexWrap:'wrap' }}>
          {story.tags?.map(t => (
            <span key={t} style={{ fontSize:10, fontWeight:700, color:'#DB7F50',
              border:'1.5px solid rgba(219,127,80,0.4)', padding:'3px 12px', borderRadius:20,
              background:'rgba(219,127,80,0.1)' }}>{t}</span>
          ))}
        </div>
      </div>
      {/* Decorative corner stars */}
      {[['top-3','left-4'],['top-3','right-4'],['bottom-3','left-4'],['bottom-3','right-4']].map(([v,h],i)=>
        <span key={i} style={{ position:'absolute', [v]:12, [h]:16, color:'#f5c518', fontSize:20 }}>✦</span>
      )}
    </motion.div>

    {/* Cast cards */}
    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))', gap:12, marginBottom:36 }}>
      {story.characters.map((c, i) => (
        <motion.div key={i}
          initial={{ opacity:0, y:30, rotate: i%2===0 ? -2 : 2 }}
          whileInView={{ opacity:1, y:0, rotate:0 }}
          viewport={{ once:true }} transition={{ delay:i*0.1, duration:0.5 }}
          style={{ background:'#fdfbf7', border:'3px solid #111', borderRadius:6,
            boxShadow:'4px 4px 0 #111', padding:'16px 12px', textAlign:'center' }}>
          <div style={{ fontSize:52, lineHeight:1, marginBottom:8 }}>{c.emoji}</div>
          <p style={{ fontWeight:900, fontSize:13, color:'#111', textTransform:'uppercase', letterSpacing:'0.05em' }}>{c.name}</p>
          <p style={{ fontWeight:700, fontSize:9, color:'#DB7F50', textTransform:'uppercase',
            letterSpacing:'0.3em', marginTop:2 }}>{c.role}</p>
        </motion.div>
      ))}
    </div>

    {/* Panels */}
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
      {story.panels.map((panel, i) => <div key={i}>{panel}</div>)}
    </div>

    {/* Ending */}
    <motion.div initial={{ scale:0, rotate:-8 }} whileInView={{ scale:1, rotate:0 }}
      viewport={{ once:true }} transition={{ type:'spring', stiffness:150, damping:12, delay:0.1 }}
      style={{ textAlign:'center', marginTop:48 }}>
      <div style={{ display:'inline-block', background:'#2D4B37', border:'4px solid #111',
        borderRadius:6, boxShadow:'10px 10px 0 #111', padding:'32px 48px', position:'relative' }}>
        <p style={{ color:'#f5c518', fontSize:10, fontWeight:900, letterSpacing:'0.5em',
          textTransform:'uppercase', marginBottom:6 }}>✦ The End ✦</p>
        <p style={{ color:'#fff', fontSize:'clamp(1.6rem,5vw,2.8rem)', fontWeight:900,
          letterSpacing:'-0.01em', margin:'0 0 4px' }}>{story.endingText}</p>
        <p style={{ color:'rgba(255,255,255,0.5)', fontSize:11, fontWeight:600,
          letterSpacing:'0.3em', textTransform:'uppercase' }}>{story.endingSubtext}</p>
        <span style={{ position:'absolute', top:-14, right:-14, fontSize:32 }}>🏠</span>
      </div>
    </motion.div>

    {/* Star rating */}
    <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
      transition={{ delay:0.4 }}
      style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:10, marginTop:32, paddingBottom:16 }}>
      <p style={{ fontSize:9, fontWeight:900, letterSpacing:'0.5em', textTransform:'uppercase', color:'rgba(0,0,0,0.3)' }}>Client Rating</p>
      <div style={{ display:'flex', gap:8 }}>
        {[1,2,3,4,5].map(s => (
          <motion.span key={s} initial={{ scale:0 }} whileInView={{ scale:1 }}
            viewport={{ once:true }} transition={{ delay:0.5+s*0.08, type:'spring', stiffness:300 }}
            style={{ fontSize:28 }}>⭐</motion.span>
        ))}
      </div>
      <p style={{ fontSize:14, fontStyle:'italic', color:'rgba(0,0,0,0.5)', maxWidth:400, textAlign:'center' }}>
        "{story.quote}"
      </p>
      <p style={{ fontSize:11, fontWeight:900, color:'#DB7F50', letterSpacing:'0.3em', textTransform:'uppercase' }}>
        — {story.quoteAuthor}
      </p>
    </motion.div>
  </div>
);

/* ════════════════════════════════════════════════════════════════
   BLOG DETAIL PAGE
════════════════════════════════════════════════════════════════ */
const BlogDetail = () => {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === parseInt(id));
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset:['start start','end start'] });
  const heroY   = useTransform(scrollYProgress, [0,1], ['0%','30%']);
  const heroOp  = useTransform(scrollYProgress, [0,0.7], [1, 0]);

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  if (!post) return (
    <div style={{ minHeight:'100vh', background:'#fff', display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center', padding:24, textAlign:'center' }}>
      <h1 style={{ fontSize:28, textTransform:'uppercase', letterSpacing:'0.2em', opacity:0.25, marginBottom:24 }}>Story not found</h1>
      <Link to="/blog" style={{ fontSize:10, fontWeight:900, letterSpacing:'0.4em', textTransform:'uppercase',
        color:'#111', borderBottom:'1px solid #111', paddingBottom:2, textDecoration:'none' }}>
        Return to Journal
      </Link>
    </div>
  );

  return (
    <div style={{ background:'#fff', minHeight:'100vh', color:'#111', fontFamily:'Barlow,sans-serif', overflowX:'hidden' }}>
      <Navbar />
      <main>

        {/* ── Regular post hero ── */}
        {post.id === 601 && (
          <motion.div ref={heroRef}
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:1 }}
            style={{ width:'100%', height:'70vh', position:'relative', overflow:'hidden',
              background:'#111', marginBottom:0 }}>
            <motion.div style={{ position:'absolute', inset:0, backgroundImage:`url(${post.image})`,
              backgroundSize:'cover', backgroundPosition:'center', y:heroY, opacity:heroOp }}/>
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom,rgba(0,0,0,0.5),rgba(0,0,0,0.3))' }}/>
          </motion.div>
        )}

        {/* ── Comic post hero ── */}
        {post.heroType === 'comic-cover' && (
          <div ref={heroRef} style={{ position:'relative', overflow:'hidden',
            background:'#111', borderBottom:'4px solid #DB7F50' }}>
            <Halftone color="#fff" opacity={0.035} size={9}/>
            {/* Animated comic speed lines */}
            <div style={{ position:'absolute', inset:0, overflow:'hidden', zIndex:0 }}>
              {[...Array(12)].map((_,i) => (
                <motion.div key={i}
                  animate={{ opacity:[0,0.15,0], scaleY:[0.5,1,0.5] }}
                  transition={{ duration:2.5+i*0.3, repeat:Infinity, delay:i*0.2, ease:'easeInOut' }}
                  style={{ position:'absolute', left:`${i*8.5}%`, top:0, bottom:0, width:2,
                    background:'linear-gradient(to bottom, transparent, rgba(219,127,80,0.6), transparent)',
                    transformOrigin:'center' }}/>
              ))}
            </div>
            <motion.div style={{ y:heroY, opacity:heroOp, position:'relative', zIndex:1,
              padding:'80px 24px 48px', textAlign:'center' }}>
              <motion.p initial={{ opacity:0, y:-16 }} animate={{ opacity:1, y:0 }}
                transition={{ delay:0.3 }}
                style={{ color:'#DB7F50', fontSize:10, fontWeight:900, letterSpacing:'0.6em',
                  textTransform:'uppercase', marginBottom:16 }}>
                ✦ Karrcholai Client Stories ✦
              </motion.p>
              <motion.h1 initial={{ opacity:0, scale:0.85 }} animate={{ opacity:1, scale:1 }}
                transition={{ delay:0.5, type:'spring', stiffness:130 }}
                style={{ color:'#fff', fontSize:'clamp(3rem,10vw,6.5rem)', fontWeight:900,
                  lineHeight:0.95, textShadow:'6px 6px 0 #DB7F50', letterSpacing:'-0.02em',
                  margin:'0 0 20px' }}>
                Arun's<br/>Dream Home
              </motion.h1>
              <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.8 }}
                style={{ color:'rgba(255,255,255,0.45)', fontSize:12, fontWeight:700,
                  letterSpacing:'0.4em', textTransform:'uppercase', marginBottom:24 }}>
                A Comic Story · 9 Chapters · True Story · Erode, Tamil Nadu
              </motion.p>
              <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
                transition={{ delay:1 }}
                style={{ display:'flex', justifyContent:'center', gap:10, flexWrap:'wrap' }}>
                {['10 Years of Renting 😤','8 Months of Building 🏗️','1 Dream Fulfilled 🏠','5 Stars ⭐'].map(t=>(
                  <span key={t} style={{ fontSize:11, fontWeight:700, color:'#DB7F50',
                    background:'rgba(219,127,80,0.12)', border:'1.5px solid rgba(219,127,80,0.4)',
                    padding:'5px 14px', borderRadius:20 }}>{t}</span>
                ))}
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.2 }}
              style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:6,
                padding:'14px 24px', borderTop:'1px solid rgba(255,255,255,0.07)',
                position:'relative', zIndex:1 }}>
              <span style={{ fontSize:14 }}>⭐⭐⭐⭐⭐</span>
              <span style={{ color:'rgba(255,255,255,0.35)', fontSize:11, fontWeight:700, marginLeft:6 }}>
                5.0 Rating · Verified Client · Erode
              </span>
            </motion.div>
          </div>
        )}

        {/* ── Post header ── */}
        <div style={{ maxWidth:900, margin:'0 auto', padding:'48px 24px 0', textAlign:'center' }}>
          <motion.span initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
            style={{ color:'#B85C38', fontSize:9, fontWeight:900, letterSpacing:'0.5em',
              textTransform:'uppercase', display:'block', marginBottom:16 }}>
            {post.category}
          </motion.span>
          {!post.heroType && (
            <motion.h1 initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}
              style={{ fontSize:'clamp(2rem,6vw,4rem)', textTransform:'uppercase',
                letterSpacing:'-0.02em', lineHeight:1.1, color:'#111', margin:'0 auto 24px',
                maxWidth:800 }}>
              {post.title}
            </motion.h1>
          )}
          <div style={{ width:48, height:1, background:'rgba(0,0,0,0.08)', margin:'0 auto 48px' }}/>
        </div>

        {/* ── Gallery ── */}
        <div style={{ maxWidth: post.heroType === 'comic-cover' ? 1000 : 900, margin:'0 auto', padding:'0 24px 80px' }}>
          {post.gallery ? (
            <div style={{ display:'flex', flexDirection:'column', gap: post.heroType === 'comic-cover' ? 20 : 80 }}>
              {post.gallery.map((item, idx) => {
                if (item.type === 'single') return (
                  <motion.div key={idx} initial={{ opacity:0 }} whileInView={{ opacity:1 }}
                    viewport={{ once:true }} transition={{ duration:1 }}
                    style={{ width:'100%', aspectRatio:'21/9', overflow:'hidden',
                      border:'1px solid rgba(0,0,0,0.05)', background:'#f5f5f5' }}>
                    <img src={item.image} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                  </motion.div>
                );
                if (item.type === 'double') return (
                  <motion.div key={idx} initial={{ opacity:0 }} whileInView={{ opacity:1 }}
                    viewport={{ once:true }} transition={{ duration:1 }}
                    style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
                    {item.images.map((img,i) => (
                      <div key={i} style={{ aspectRatio:'3/2', overflow:'hidden', border:'1px solid rgba(0,0,0,0.05)' }}>
                        <img src={img} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                      </div>
                    ))}
                  </motion.div>
                );
                if (item.type === 'html') return (
                  <article key={idx} style={{ maxWidth:800, margin:'0 auto', padding:'16px 0' }}>
                    <div className="prose prose-lg max-w-none" style={{ color:'rgba(0,0,0,0.7)' }}
                      dangerouslySetInnerHTML={{ __html: item.content }}/>
                  </article>
                );
                if (item.type === 'comic') return (
                  <div key={idx} style={{ padding:'8px 0' }}>
                    <ComicStoryRenderer story={item.story}/>
                  </div>
                );
                return null;
              })}
            </div>
          ) : (
            <article style={{ maxWidth:800, margin:'0 auto' }}>
              <div className="prose prose-lg max-w-none" style={{ color:'rgba(0,0,0,0.7)' }}
                dangerouslySetInnerHTML={{ __html: post.content }}/>
            </article>
          )}
        </div>

        {/* Back link */}
        <div style={{ borderTop:'1px solid rgba(0,0,0,0.05)', padding:'64px 24px',
          textAlign:'center', marginTop:16 }}>
          <Link to="/blog" style={{ fontSize:10, fontWeight:900, letterSpacing:'0.6em',
            textTransform:'uppercase', color:'rgba(0,0,0,0.25)', textDecoration:'none',
            transition:'color 0.3s' }}
            onMouseEnter={e=>e.target.style.color='#111'}
            onMouseLeave={e=>e.target.style.color='rgba(0,0,0,0.25)'}>
            ← Back to the Journal Index
          </Link>
        </div>
      </main>
      <UnifiedFooter/>
    </div>
  );
};

export default BlogDetail;
