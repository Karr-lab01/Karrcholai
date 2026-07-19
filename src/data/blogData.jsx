import React from 'react';
import { motion } from 'framer-motion';
import visvesvarayaImage from '../../assets/visvesvaraya.webp';
import vis2 from '../../assets/vis2.jpg';
import vis3 from '../../assets/vis3.webp';
import vis4 from '../../assets/vis4.webp';

/* ─── Shared helpers ─────────────────────────────────────────────────────── */
const Halftone = ({ op=0.06, c='#000', s=6 }) => (
  <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:0,
    backgroundImage:`radial-gradient(circle, ${c} 1px, transparent 1px)`,
    backgroundSize:`${s}px ${s}px`, opacity:op }}/>
);
const Hatch = ({ op=0.05 }) => (
  <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:0, opacity:op,
    backgroundImage:'repeating-linear-gradient(45deg,#000 0,#000 1px,transparent 0,transparent 50%)',
    backgroundSize:'8px 8px' }}/>
);

/* ─── Bubble ─────────────────────────────────────────────────────────────── */
const B = ({ text, dir='down-left', color='#fff', tc='#111', type='say', mw=220 }) => {
  const br = type==='think'?'50%':type==='shout'?'6px':'20px 20px 20px 4px';
  const bd = type==='shout'?'3px solid #111':type==='think'?'2.5px dashed rgba(0,0,0,0.3)':'2.5px solid #111';
  return (
    <div style={{ position:'relative', display:'inline-block', maxWidth:mw }}>
      <div style={{ background:color, border:bd, borderRadius:br, padding:'10px 16px',
        boxShadow: type==='think'?'none':'3px 3px 0 #111' }}>
        <p style={{ color:tc, fontSize:13, fontWeight:700, lineHeight:1.45, margin:0 }}>{text}</p>
      </div>
      {type!=='think' && dir==='down-left' && <div style={{ position:'absolute',bottom:-13,left:18,width:0,height:0,borderLeft:'8px solid transparent',borderRight:'6px solid transparent',borderTop:`14px solid ${color}`,filter:'drop-shadow(1px 2px 0 #111)' }}/>}
      {type!=='think' && dir==='down-right' && <div style={{ position:'absolute',bottom:-13,right:18,width:0,height:0,borderLeft:'6px solid transparent',borderRight:'8px solid transparent',borderTop:`14px solid ${color}`,filter:'drop-shadow(-1px 2px 0 #111)' }}/>}
      {type!=='think' && dir==='up-left' && <div style={{ position:'absolute',top:-13,left:18,width:0,height:0,borderLeft:'8px solid transparent',borderRight:'6px solid transparent',borderBottom:`14px solid ${color}`,filter:'drop-shadow(1px -2px 0 #111)' }}/>}
      {type!=='think' && dir==='right' && <div style={{ position:'absolute',top:'50%',right:-13,transform:'translateY(-50%)',width:0,height:0,borderTop:'7px solid transparent',borderBottom:'7px solid transparent',borderLeft:`14px solid ${color}` }}/>}
      {type!=='think' && dir==='left' && <div style={{ position:'absolute',top:'50%',left:-13,transform:'translateY(-50%)',width:0,height:0,borderTop:'7px solid transparent',borderBottom:'7px solid transparent',borderRight:`14px solid ${color}` }}/>}
      {type==='think' && <><div style={{ position:'absolute',bottom:-7,left:22,width:10,height:10,borderRadius:'50%',background:color,border:'2px dashed rgba(0,0,0,0.3)' }}/><div style={{ position:'absolute',bottom:-15,left:13,width:7,height:7,borderRadius:'50%',background:color,border:'2px dashed rgba(0,0,0,0.3)' }}/></>}
    </div>
  );
};

/* ─── SFX ────────────────────────────────────────────────────────────────── */
const SFX = ({ text, size=88, color='#FFD700', tc='#111', rotate=0 }) => (
  <div style={{ position:'relative',width:size,height:size,transform:`rotate(${rotate}deg)`,flexShrink:0 }}>
    <svg viewBox="0 0 100 100" style={{ position:'absolute',inset:0,width:'100%',height:'100%' }}>
      <polygon points="50,0 63,34 98,34 70,55 81,90 50,68 19,90 30,55 2,34 37,34" fill={color} stroke="#111" strokeWidth="2.5" strokeLinejoin="round"/>
    </svg>
    <span style={{ position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',color:tc,fontWeight:900,fontSize:size*0.19,textAlign:'center',lineHeight:1.1,padding:4 }}>{text}</span>
  </div>
);

/* ─── Animated Panel ─────────────────────────────────────────────────────── */
const P = ({ children, bg='#fff', bc='#111', accent, label, from='bottom', delay=0, className='' }) => {
  const initMap = { bottom:{opacity:0,y:70}, left:{opacity:0,x:-90}, right:{opacity:0,x:90}, top:{opacity:0,y:-60}, pop:{opacity:0,scale:0.75} };
  return (
    <motion.div initial={initMap[from]||initMap.bottom}
      whileInView={{ opacity:1,y:0,x:0,scale:1 }} viewport={{ once:true,margin:'-40px' }}
      transition={{ duration:0.65,delay,ease:[0.16,1,0.3,1] }} className={className}
      style={{ background:bg,border:`3px solid ${bc}`,borderRadius:6,
        boxShadow:`6px 6px 0 ${bc}`,position:'relative',overflow:'hidden' }}>
      {accent && <div style={{ height:5,background:accent,borderBottom:`2px solid ${bc}` }}/>}
      {label && <div style={{ position:'absolute',top:10,left:12,zIndex:20,background:bc,color:bg,fontSize:9,fontWeight:900,letterSpacing:'0.35em',textTransform:'uppercase',padding:'3px 9px',borderRadius:3 }}>{label}</div>}
      {children}
    </motion.div>
  );
};

/* ─── Animated Bar ───────────────────────────────────────────────────────── */
const Bar = ({ label, pct, color='#DB7F50' }) => (
  <div style={{ marginBottom:10 }}>
    <div style={{ display:'flex',justifyContent:'space-between',marginBottom:4 }}>
      <span style={{ fontSize:11,fontWeight:800,textTransform:'uppercase',letterSpacing:'0.1em' }}>{label}</span>
      <span style={{ fontSize:11,fontWeight:900,color }}>{pct}%</span>
    </div>
    <div style={{ height:14,background:'#eee',border:'2px solid #111',borderRadius:20,overflow:'hidden',boxShadow:'2px 2px 0 #111' }}>
      <motion.div initial={{ width:0 }} whileInView={{ width:`${pct}%` }} viewport={{ once:true }}
        transition={{ duration:1.2,delay:0.3,ease:'easeOut' }}
        style={{ height:'100%',background:color,borderRadius:20 }}/>
    </div>
  </div>
);

/* ─── Floating character wrapper ─────────────────────────────────────────── */
const Float = ({ children, y=8, dur=2.2, delay=0, rotate=0 }) => (
  <motion.div animate={{ y:[0,-y,0], rotate:[rotate-1,rotate+1,rotate-1] }}
    transition={{ duration:dur,repeat:Infinity,ease:'easeInOut',delay }}>
    {children}
  </motion.div>
);

/* ════════════════════════════════════════════════════════════════════════════
   THE COMIC STORY — Arun's Dream Home (9 chapters, full comic format)
════════════════════════════════════════════════════════════════════════════ */

/* Chapter colour palette */
const TERRA='#DB7F50', FOREST='#2D4B37', GOLD='#F5C518', PLUM='#7B2D8B', INK='#111';

const panel1 = (
  <P key="p1" bg="#FFFDF0" accent={GOLD} label="Chapter 01 · The Problem" from="left" delay={0}>
    <Halftone op={0.05}/>
    <div style={{ position:'relative',zIndex:1,padding:'48px 28px 28px',display:'flex',flexWrap:'wrap',gap:24,alignItems:'center' }}>
      {/* Left — character */}
      <div style={{ flex:'0 0 auto',display:'flex',flexDirection:'column',alignItems:'center',gap:14 }}>
        <Float y={10} dur={2.4}>
          <div style={{ fontSize:100,lineHeight:1,filter:'drop-shadow(3px 6px 0 rgba(0,0,0,0.18))' }}>😩</div>
        </Float>
        <B text="10 years of renting… will I EVER get my own home?!" dir="up-left" color="#fff" mw={200}/>
        <p style={{ fontSize:10,fontWeight:900,letterSpacing:'0.25em',textTransform:'uppercase',color:TERRA,marginTop:4 }}>— Arun Kumar, 34</p>
      </div>
      {/* Right — narrative */}
      <div style={{ flex:'1 1 260px' }}>
        <div style={{ fontSize:'clamp(2.2rem,6vw,3.8rem)',fontWeight:900,lineHeight:0.95,color:INK,marginBottom:16 }}>
          The<br/><span style={{ color:TERRA,WebkitTextStroke:`1px ${INK}` }}>Renting</span><br/>Nightmare
        </div>
        <p style={{ fontSize:14,color:INK,opacity:0.6,lineHeight:1.7,marginBottom:16 }}>
          Arun is a <strong>software engineer from Erode</strong>. Every contractor he called gave either sky-high quotes or zero transparency. He felt trapped.
        </p>
        <div style={{ display:'flex',flexWrap:'wrap',gap:8 }}>
          {['💸 Crazy Quotes','😤 No Transparency','📋 Zero Planning','🕐 10 Years Waiting'].map(t=>(
            <span key={t} style={{ fontSize:11,fontWeight:700,background:INK,color:'#fff',padding:'4px 12px',borderRadius:20 }}>{t}</span>
          ))}
        </div>
      </div>
      {/* House silhouette */}
      <div style={{ flex:'0 0 auto',display:'flex',flexDirection:'column',alignItems:'center',gap:6,opacity:0.35 }}>
        <motion.div animate={{ opacity:[0.25,0.6,0.25] }} transition={{ duration:2.5,repeat:Infinity,ease:'easeInOut' }}>
          <div style={{ fontSize:80,lineHeight:1 }}>🏚️</div>
        </motion.div>
        <span style={{ fontSize:9,fontWeight:900,letterSpacing:'0.3em',textTransform:'uppercase' }}>His dream</span>
      </div>
    </div>
  </P>
);

const panel2 = (
  <P key="p2" bg={INK} bc={TERRA} accent={TERRA} label="Chapter 02 · The Discovery" from="right" delay={0.04}>
    <Halftone c="#fff" op={0.035} s={9}/>
    <div style={{ position:'relative',zIndex:1,padding:'48px 28px 28px',display:'flex',flexWrap:'wrap',gap:24,alignItems:'center' }}>
      <div style={{ flex:'1 1 260px',display:'flex',flexDirection:'column',gap:16 }}>
        <div style={{ fontSize:'clamp(2rem,5vw,3.2rem)',fontWeight:900,color:'#fff',lineHeight:1,
          textShadow:`4px 4px 0 ${TERRA}` }}>A Friend's<br/>Tip Changed<br/>Everything</div>
        <div style={{ background:'rgba(219,127,80,0.15)',border:`2px solid ${TERRA}`,borderRadius:8,padding:'16px 18px' }}>
          <p style={{ color:'#fff',opacity:0.9,fontSize:13,lineHeight:1.65,fontStyle:'italic',margin:'0 0 8px' }}>
            "Bro, call <strong style={{color:TERRA}}>Karrcholai</strong>! My cousin built in Karur — transparent pricing, weekly WhatsApp updates, full Vastu. Zero drama!"
          </p>
          <p style={{ color:TERRA,fontSize:10,fontWeight:900,letterSpacing:'0.25em',textTransform:'uppercase',margin:0 }}>— Ravi, Arun's colleague</p>
        </div>
        <div style={{ display:'flex',gap:12,alignItems:'center',flexWrap:'wrap' }}>
          <SFX text="💡" size={64} color={GOLD} tc={INK}/>
          <SFX text="AHA!" size={80} color={TERRA} tc="#fff" rotate={-5}/>
          <SFX text="WOW!" size={72} color={FOREST} tc="#fff" rotate={4}/>
        </div>
      </div>
      <div style={{ flex:'0 0 auto',display:'flex',flexDirection:'column',alignItems:'center',gap:14 }}>
        <Float y={12} dur={2} delay={0.3}>
          <div style={{ fontSize:96,lineHeight:1,filter:'drop-shadow(3px 6px 0 rgba(219,127,80,0.5))' }}>🤯</div>
        </Float>
        <B text="Wait — Vastu consultation AND daily photo updates?! Sign me up!!" dir="up-left" color={GOLD} tc={INK} mw={210}/>
      </div>
    </div>
  </P>
);

const panel3 = (
  <P key="p3" bg="#F0FAF2" accent={FOREST} label="Chapter 03 · First Meeting" from="bottom" delay={0.04}>
    <Hatch op={0.04}/>
    <div style={{ position:'relative',zIndex:1,padding:'48px 28px 28px' }}>
      <div style={{ display:'grid',gridTemplateColumns:'1fr auto 1fr',gap:20,alignItems:'end' }}>
        {/* Arun */}
        <div style={{ display:'flex',flexDirection:'column',alignItems:'center',gap:12 }}>
          <Float y={8} dur={2.6}>
            <div style={{ fontSize:90,lineHeight:1,filter:'drop-shadow(2px 5px 0 rgba(0,0,0,0.15))' }}>🙋</div>
          </Float>
          <B text="Tell me EVERYTHING! Budget? Timeline? Vastu check?" dir="up-left" color="#fff" mw={185}/>
          <p style={{ fontSize:10,fontWeight:900,color:FOREST,letterSpacing:'0.25em',textTransform:'uppercase' }}>Arun</p>
        </div>
        {/* Center */}
        <div style={{ textAlign:'center' }}>
          <div style={{ fontSize:'clamp(1.8rem,4vw,2.8rem)',fontWeight:900,color:FOREST,lineHeight:1.1,marginBottom:12 }}>
            Meet<br/>Karthik!
          </div>
          <p style={{ fontSize:12,color:INK,opacity:0.55,lineHeight:1.6,maxWidth:200,margin:'0 auto 16px' }}>
            Karrcholai's site engineer arrived with blueprints, a smile, and <strong>zero hidden fees</strong>.
          </p>
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,maxWidth:220,margin:'0 auto' }}>
            {[['Site Visit','FREE 🎉'],['Estimate','Same Day ⚡'],['Vastu','Included ✅'],['Timeline','Transparent 📋']].map(([k,v])=>(
              <div key={k} style={{ background:FOREST,padding:'8px 10px',borderRadius:6,border:`2px solid ${INK}`,boxShadow:`2px 2px 0 ${INK}` }}>
                <p style={{ fontSize:8,color:'rgba(255,255,255,0.55)',fontWeight:700,letterSpacing:'0.2em',textTransform:'uppercase',margin:'0 0 2px' }}>{k}</p>
                <p style={{ fontSize:12,color:GOLD,fontWeight:900,margin:0 }}>{v}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Engineer */}
        <div style={{ display:'flex',flexDirection:'column',alignItems:'center',gap:12 }}>
          <Float y={7} dur={2.2} delay={0.4}>
            <div style={{ fontSize:90,lineHeight:1,filter:'drop-shadow(2px 5px 0 rgba(0,0,0,0.15))' }}>👷</div>
          </Float>
          <B text="1800 sq.ft · 2 floors · Vastu-aligned · ₹42L all-in. No surprises. Ever." dir="up-right" color={GOLD} tc={INK} mw={200}/>
          <p style={{ fontSize:10,fontWeight:900,color:FOREST,letterSpacing:'0.25em',textTransform:'uppercase' }}>Karthik · Engineer</p>
        </div>
      </div>
    </div>
  </P>
);

const panel4 = (
  <P key="p4" bg="#FDF5FF" bc={PLUM} accent={PLUM} label="Chapter 04 · The Wife's Checklist" from="left" delay={0.04}>
    <Halftone c={PLUM} op={0.04} s={7}/>
    <div style={{ position:'relative',zIndex:1,padding:'48px 28px 28px',display:'flex',flexWrap:'wrap',gap:24,alignItems:'flex-start' }}>
      <div style={{ flex:'0 0 auto',display:'flex',flexDirection:'column',alignItems:'center',gap:14 }}>
        <Float y={9} dur={2.3} delay={0.2}>
          <div style={{ fontSize:96,lineHeight:1,filter:'drop-shadow(2px 5px 0 rgba(123,45,139,0.3))' }}>👩</div>
        </Float>
        <B text="I have 47 requirements and a colour-coded spreadsheet 🗂️" dir="down-right" color={PLUM} tc="#fff" mw={195}/>
        <p style={{ fontSize:10,fontWeight:900,color:PLUM,letterSpacing:'0.25em',textTransform:'uppercase' }}>Priya · Arun's Wife</p>
      </div>
      <div style={{ flex:'1 1 260px' }}>
        <div style={{ fontSize:'clamp(1.8rem,5vw,3rem)',fontWeight:900,color:INK,lineHeight:1.05,marginBottom:16 }}>
          Priya's<br/><span style={{ color:PLUM }}>Grand Plan</span>
        </div>
        <div style={{ display:'flex',flexDirection:'column',gap:8 }}>
          {[
            {icon:'🕌',text:'Pooja room — East facing (Vastu)',done:true},
            {icon:'🍳',text:'Kitchen — South-East corner',done:true},
            {icon:'🛏️',text:'Master bedroom — South-West',done:true},
            {icon:'🌿',text:'Garden + rainwater harvesting',done:true},
            {icon:'☀️',text:'Solar panels on terrace',done:true},
            {icon:'☕',text:'Wide verandah for morning chai',done:true},
          ].map((r,i)=>(
            <motion.div key={i} style={{ display:'flex',alignItems:'center',gap:10 }}
              initial={{ opacity:0,x:-24 }} whileInView={{ opacity:1,x:0 }}
              viewport={{ once:true }} transition={{ delay:0.1*i,duration:0.45 }}>
              <div style={{ width:26,height:26,borderRadius:'50%',flexShrink:0,
                background:r.done?FOREST:'#eee',border:`2.5px solid ${INK}`,
                display:'flex',alignItems:'center',justifyContent:'center',
                boxShadow:`2px 2px 0 ${INK}`,fontSize:12 }}>
                {r.done ? '✓' : '?'}
              </div>
              <span style={{ fontSize:13,fontWeight:600,color:INK }}>{r.icon} {r.text}</span>
            </motion.div>
          ))}
        </div>
        <div style={{ marginTop:16,display:'flex',alignItems:'center',gap:12 }}>
          <span style={{ fontSize:40 }}>👷</span>
          <B text="Every. Single. Item — DONE. Karrcholai promise!" dir="left" color={GOLD} tc={INK} mw={220}/>
        </div>
      </div>
    </div>
  </P>
);

const panel5 = (
  <P key="p5" bg="#FFFBEC" accent={GOLD} label="Chapter 05 · Construction Begins!" from="bottom" delay={0.04}>
    <Hatch op={0.04}/>
    <div style={{ position:'relative',zIndex:1,padding:'48px 28px 28px',display:'flex',flexWrap:'wrap',gap:28,alignItems:'center' }}>
      <div style={{ flex:'1 1 240px' }}>
        <div style={{ fontSize:'clamp(1.8rem,5vw,3rem)',fontWeight:900,color:INK,lineHeight:1.05,marginBottom:16 }}>
          Construction<br/><span style={{ color:TERRA }}>By The Numbers</span>
        </div>
        <Bar label="Foundation & Footings" pct={100} color={FOREST}/>
        <Bar label="Ground Floor Structure" pct={100} color={FOREST}/>
        <Bar label="First Floor & Roof" pct={100} color={TERRA}/>
        <Bar label="Plumbing & Electrical" pct={100} color={PLUM}/>
        <Bar label="Tile · Paint · Finish" pct={100} color={GOLD}/>
        <div style={{ marginTop:16,display:'flex',flexWrap:'wrap',gap:8 }}>
          {['⏱ 8 Months','📐 1800 sq.ft','🏠 2 Floors','💰 ₹42 Lakhs'].map(t=>(
            <span key={t} style={{ fontSize:12,fontWeight:900,background:INK,color:'#fff',
              padding:'5px 13px',borderRadius:4,border:`2px solid ${INK}`,boxShadow:`2px 2px 0 ${TERRA}` }}>{t}</span>
          ))}
        </div>
      </div>
      <div style={{ flex:'0 0 auto',display:'flex',flexDirection:'column',alignItems:'center',gap:16 }}>
        <motion.div animate={{ y:[0,-12,0],scale:[1,1.06,1] }} transition={{ duration:2.6,repeat:Infinity,ease:'easeInOut' }}>
          <div style={{ fontSize:110,lineHeight:1,filter:'drop-shadow(4px 8px 0 rgba(0,0,0,0.2))' }}>🏗️</div>
        </motion.div>
        <div style={{ display:'flex',alignItems:'center',gap:12 }}>
          <span style={{ fontSize:48 }}>🙋</span>
          <B text="WhatsApp photo album every Sunday morning! I felt ON the site 🙌" dir="left" color="#fff" tc={INK} mw={210}/>
        </div>
      </div>
    </div>
  </P>
);

const panel6 = (
  <P key="p6" bg={INK} bc={GOLD} accent={GOLD} label="Chapter 06 · The 8-Month Timeline" from="right" delay={0.04}>
    <Halftone c="#fff" op={0.03} s={10}/>
    <div style={{ position:'relative',zIndex:1,padding:'48px 28px 28px' }}>
      <div style={{ textAlign:'center',marginBottom:24 }}>
        <div style={{ fontSize:'clamp(2rem,5vw,3.5rem)',fontWeight:900,color:'#fff',
          textShadow:`4px 4px 0 ${GOLD}`,lineHeight:1.05 }}>
          8 Months. Zero Drama. ⚡
        </div>
      </div>
      {/* Timeline row */}
      <div style={{ display:'flex',alignItems:'center',overflowX:'auto',paddingBottom:8,gap:0 }} className="hide-scrollbar">
        {[
          {mo:'M1',label:'Site Survey\n& Design',icon:'📐'},
          {mo:'M2',label:'Foundation\nWork',icon:'⛏️'},
          {mo:'M3',label:'Ground Floor\nComplete',icon:'🧱'},
          {mo:'M4',label:'First Floor\nStructure',icon:'🏗️'},
          {mo:'M5',label:'Roofing\n& Brickwork',icon:'🏠'},
          {mo:'M6',label:'Plaster\n& Wiring',icon:'🔌'},
          {mo:'M7',label:'Tile, Paint\n& Finishing',icon:'🎨'},
          {mo:'M8',label:'Key\nHandover 🎉',icon:'🔑'},
        ].map((t,i)=>(
          <React.Fragment key={i}>
            <motion.div style={{ display:'flex',flexDirection:'column',alignItems:'center',gap:6,flexShrink:0,minWidth:72 }}
              initial={{ opacity:0,y:24 }} whileInView={{ opacity:1,y:0 }}
              viewport={{ once:true }} transition={{ delay:i*0.09,duration:0.45 }}>
              <div style={{ width:52,height:52,borderRadius:'50%',background:FOREST,
                border:`3px solid ${GOLD}`,display:'flex',flexDirection:'column',
                alignItems:'center',justifyContent:'center',
                boxShadow:`3px 3px 0 ${GOLD}`,fontSize:20 }}>{t.icon}</div>
              <span style={{ fontSize:8,fontWeight:700,color:'rgba(255,255,255,0.55)',
                letterSpacing:'0.05em',textTransform:'uppercase',textAlign:'center',
                whiteSpace:'pre-line',maxWidth:60,lineHeight:1.4 }}>{t.label}</span>
            </motion.div>
            {i<7 && <div style={{ flex:1,height:2,background:`rgba(245,197,24,0.25)`,minWidth:8,borderRadius:2 }}/>}
          </React.Fragment>
        ))}
      </div>
      {/* SFX row */}
      <div style={{ display:'flex',justifyContent:'center',gap:20,marginTop:28,flexWrap:'wrap' }}>
        <SFX text={'ON\nTIME'} size={90} color={FOREST} tc="#fff" rotate={-4}/>
        <SFX text={'ON\nBUDGET'} size={100} color={TERRA} tc="#fff" rotate={0}/>
        <SFX text={'VASTU\n✅'} size={90} color={GOLD} tc={INK} rotate={4}/>
      </div>
    </div>
  </P>
);

const panel7 = (
  <P key="p7" bg="#FDFBF7" accent={FOREST} label="Chapter 07 · Memories During the Build" from="left" delay={0.04}>
    <Hatch op={0.035}/>
    <div style={{ position:'relative',zIndex:1,padding:'48px 28px 28px' }}>
      <div style={{ textAlign:'center',marginBottom:24 }}>
        <div style={{ fontSize:'clamp(1.8rem,5vw,2.8rem)',fontWeight:900,color:INK,lineHeight:1.1 }}>
          Moments That Made<br/><span style={{ color:FOREST }}>the Journey Special</span>
        </div>
      </div>
      <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:14 }}>
        {[
          {emoji:'🧱',title:'First Brick Day',text:"Arun and Priya laid the first brick together. Karthik said: 'This is your home's heartbeat beginning to beat.' Tears were shed. Happy ones.",color:'#FFFBEC',ac:GOLD},
          {emoji:'📱',title:'Sunday Photo Updates',text:"Every Sunday morning — a WhatsApp album of the week's progress. Arun shared it with his parents in Chennai. They cried happy tears every week.",color:'#F0FAF2',ac:FOREST},
          {emoji:'🧭',title:'Vastu Alignment Day',text:"Consultant confirmed: Pooja room East ✅, Kitchen South-East ✅, Bedroom South-West ✅. Priya checked all 47 items off her spreadsheet.",color:'#FDF5FF',ac:PLUM},
        ].map((m,i)=>(
          <motion.div key={i}
            initial={{ opacity:0,y:28,rotate:i%2===0?-1.5:1.5 }}
            whileInView={{ opacity:1,y:0,rotate:0 }}
            viewport={{ once:true }} transition={{ delay:0.12*i,duration:0.55 }}
            style={{ background:m.color,border:`2.5px solid ${INK}`,borderRadius:6,
              padding:'20px 16px',boxShadow:`5px 5px 0 ${INK}` }}>
            <div style={{ fontSize:42,marginBottom:10,lineHeight:1 }}>{m.emoji}</div>
            <div style={{ width:32,height:4,background:m.ac,borderRadius:2,marginBottom:10 }}/>
            <p style={{ fontSize:14,fontWeight:900,color:INK,margin:'0 0 8px' }}>{m.title}</p>
            <p style={{ fontSize:12,color:INK,opacity:0.6,lineHeight:1.65,margin:0 }}>{m.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </P>
);

const panel8 = (
  <P key="p8" bg={FOREST} bc={GOLD} accent={GOLD} label="Chapter 08 · The Grand Handover 🎉" from="bottom" delay={0.04}>
    <Hatch op={0.08}/>
    <div style={{ position:'relative',zIndex:1,padding:'48px 28px 32px',display:'flex',flexWrap:'wrap',gap:28,alignItems:'center' }}>
      <div style={{ flex:'1 1 240px',display:'flex',flexDirection:'column',gap:14 }}>
        <div style={{ fontSize:'clamp(2.4rem,6vw,4.5rem)',fontWeight:900,color:'#fff',lineHeight:0.95,
          textShadow:`5px 5px 0 ${GOLD}` }}>Key<br/>Handover<br/>Day!</div>
        <p style={{ fontSize:14,color:'rgba(255,255,255,0.75)',lineHeight:1.7,maxWidth:380 }}>
          8 months after the ground-breaking, Karthik handed Arun the keys to his brand-new, Vastu-aligned, 1800 sq.ft dream home — <strong style={{color:GOLD}}>on time, on budget.</strong>
        </p>
        <div style={{ display:'flex',flexWrap:'wrap',gap:8 }}>
          {['✅ On Time','✅ On Budget','✅ Vastu Certified','✅ Solar Ready','✅ Rainwater Harvesting'].map(t=>(
            <span key={t} style={{ fontSize:11,fontWeight:700,color:GOLD,
              background:'rgba(245,197,24,0.12)',border:`1.5px solid ${GOLD}`,
              padding:'4px 12px',borderRadius:20 }}>{t}</span>
          ))}
        </div>
      </div>
      <div style={{ flex:'0 0 auto',display:'flex',flexDirection:'column',alignItems:'center',gap:16 }}>
        <div style={{ display:'flex',gap:20,alignItems:'flex-end' }}>
          <div style={{ display:'flex',flexDirection:'column',alignItems:'center',gap:10 }}>
            <Float y={12} dur={1.6}>
              <div style={{ fontSize:88,lineHeight:1,filter:'drop-shadow(3px 6px 0 rgba(245,197,24,0.5))' }}>🥳</div>
            </Float>
            <B text="Finally… this is OURS! 🥹" dir="up-left" color={GOLD} tc={INK} mw={160}/>
            <span style={{ fontSize:10,fontWeight:900,color:'rgba(255,255,255,0.6)',letterSpacing:'0.3em',textTransform:'uppercase' }}>Arun</span>
          </div>
          <div style={{ display:'flex',flexDirection:'column',alignItems:'center',gap:10 }}>
            <Float y={10} dur={2} delay={0.4}>
              <div style={{ fontSize:88,lineHeight:1,filter:'drop-shadow(3px 6px 0 rgba(123,45,139,0.4))' }}>😍</div>
            </Float>
            <B text="Every detail exactly as I imagined. Pure magic! 💜" dir="up-right" color={PLUM} tc="#fff" mw={175}/>
            <span style={{ fontSize:10,fontWeight:900,color:'rgba(255,255,255,0.6)',letterSpacing:'0.3em',textTransform:'uppercase' }}>Priya</span>
          </div>
        </div>
        <motion.div animate={{ scale:[1,1.1,1],rotate:[0,2,-2,0] }} transition={{ duration:2.2,repeat:Infinity,ease:'easeInOut' }}>
          <div style={{ fontSize:100,lineHeight:1,filter:'drop-shadow(4px 8px 0 rgba(245,197,24,0.5))' }}>🏠</div>
        </motion.div>
      </div>
    </div>
  </P>
);

const panel9 = (
  <P key="p9" bg="#FDFBF7" accent={TERRA} label="Chapter 09 · Arun's Verdict" from="top" delay={0.04}>
    <Halftone op={0.05}/>
    <div style={{ position:'relative',zIndex:1,padding:'48px 28px 28px' }}>
      <div style={{ textAlign:'center',marginBottom:24 }}>
        <div style={{ fontSize:'clamp(1.8rem,5vw,3rem)',fontWeight:900,color:INK,lineHeight:1.1 }}>
          What Arun Says<br/><span style={{ color:TERRA }}>Now</span>
        </div>
      </div>
      <div style={{ display:'flex',flexDirection:'column',gap:14,maxWidth:680,margin:'0 auto' }}>
        {[
          {q:'How was the overall experience?', a:"Honestly? Stress-free — and I've NEVER said that about construction. Not once.", icon:'😌',c:'#FFFBEC'},
          {q:'What surprised you most?',        a:"The Sunday WhatsApp photo updates. I felt like I was on the site even when I was in the office 200km away.",icon:'📲',c:'#F0FAF2'},
          {q:'Was the Vastu alignment worth it?',a:"Priya would have never let us move in otherwise 😂 But genuinely — the house has incredible flow and energy.",icon:'🧭',c:'#FDF5FF'},
          {q:'Would you recommend Karrcholai?', a:"Already have — three colleagues have reached out. The answer is always YES. Without hesitation.",icon:'🙌',c:'#FFF5E6'},
        ].map((qa,i)=>(
          <motion.div key={i}
            initial={{ opacity:0,x:i%2===0?-40:40 }} whileInView={{ opacity:1,x:0 }}
            viewport={{ once:true }} transition={{ delay:0.12*i,duration:0.55 }}
            style={{ background:qa.c,border:`2.5px solid ${INK}`,borderRadius:6,
              padding:'16px 18px',boxShadow:`4px 4px 0 ${INK}`,display:'flex',gap:14,alignItems:'flex-start' }}>
            <span style={{ fontSize:32,flexShrink:0,lineHeight:1 }}>{qa.icon}</span>
            <div>
              <p style={{ fontSize:9,fontWeight:900,color:TERRA,letterSpacing:'0.25em',textTransform:'uppercase',margin:'0 0 5px' }}>Q: {qa.q}</p>
              <p style={{ fontSize:13,color:INK,opacity:0.72,lineHeight:1.65,fontStyle:'italic',margin:0 }}>"{qa.a}"</p>
            </div>
          </motion.div>
        ))}
      </div>
      {/* Final call-out */}
      <div style={{ display:'flex',flexDirection:'column',alignItems:'center',gap:14,marginTop:28 }}>
        <Float y={10} dur={2.5}>
          <div style={{ fontSize:80,lineHeight:1 }}>🙋</div>
        </Float>
        <div style={{ background:TERRA,border:`3px solid ${INK}`,borderRadius:6,padding:'14px 24px',
          boxShadow:`5px 5px 0 ${INK}`,maxWidth:480,textAlign:'center' }}>
          <p style={{ color:'#fff',fontSize:15,fontWeight:700,lineHeight:1.55,margin:0 }}>
            "10 years of renting → 1 phone call → 8 months → <strong style={{color:GOLD}}>Dream Home.</strong> Thank you, Karrcholai! 🏠✨"
          </p>
        </div>
        <p style={{ fontSize:11,fontWeight:900,color:TERRA,letterSpacing:'0.3em',textTransform:'uppercase' }}>— Arun Kumar, Erode, Tamil Nadu</p>
      </div>
    </div>
  </P>
);

/* ── Story definition ── */
const arunStory = {
  title: "Arun's Dream Home",
  subtitle: 'From 10 Years of Renting to a Dream Home in 8 Months',
  endingText: 'Home Sweet Home! 🏠',
  endingSubtext: 'Built by Karrcholai — Stone · Grove · Living',
  quote: "I didn't just get a house. I got my dream, brick by brick.",
  quoteAuthor: 'Arun Kumar, Erode',
  tags: ['10 Years of Renting', '8 Months Build', 'Vastu Compliant', '₹42 Lakhs', '5.0 ⭐'],
  characters: [
    { name: 'Arun Kumar', role: 'Our Hero', emoji: '🙋' },
    { name: 'Priya',      role: "Arun's Wife", emoji: '👩' },
    { name: 'Karthik',    role: 'Site Engineer', emoji: '👷' },
    { name: 'Dream Home', role: 'The Goal',       emoji: '🏠' },
  ],
  panels: [panel1, panel2, panel3, panel4, panel5, panel6, panel7, panel8, panel9],
};

/* ════════════════════════════════════════════════════════════════
   EXPORTS
════════════════════════════════════════════════════════════════ */
export const blogPosts = [
  {
    id: 601,
    title: "Sir M. Visvesvaraya — India's Engineering Pioneer",
    category: 'Engineering Legends',
    date: 'May 17, 2024',
    image: visvesvarayaImage,
    author: 'Karrcholai Team',
    excerpt: "How Sir M. Visvesvaraya's discipline, planning, and engineering excellence continue to guide modern residential construction in India.",
    gallery: [
      { type:'html', content:`<h2 class="text-3xl font-bold mt-10 mb-6">Sir M. Visvesvaraya — The Engineer Who Built Modern India</h2><h3 class="text-2xl font-semibold mt-8 mb-4">Introduction</h3><p class="mb-4 text-lg leading-relaxed opacity-80">India's progress in engineering and infrastructure owes much to leaders who turned careful planning into lasting public works. Sir Mokshagundam Visvesvaraya remains one of the most respected civil engineers and nation-builders in the country's history.</p><p class="mb-4 text-lg leading-relaxed opacity-80">For anyone involved in residential construction, project management, or infrastructure development, his career offers lessons that are still relevant — quality, discipline, and long-term thinking.</p><h3 class="text-2xl font-semibold mt-8 mb-4">Who Was Sir M. Visvesvaraya?</h3><p class="mb-4 text-lg leading-relaxed opacity-80">Born on September 15, 1861, in Karnataka, Sir Visvesvaraya was a civil engineer, administrator, and planner who helped shape modern India's infrastructure. His work earned him the Bharat Ratna — India's highest civilian honour.</p>` },
      { type:'single', image:vis2 },
      { type:'html', content:`<h3 class="text-2xl font-semibold mt-8 mb-4">Engineering Work That Changed the Country</h3><p class="mb-4 text-lg leading-relaxed opacity-80">Sir Visvesvaraya led several landmark projects in water management, irrigation, and urban planning — including the Krishna Raja Sagara Dam in Karnataka.</p><h3 class="text-2xl font-semibold mt-8 mb-4">Lessons for Construction Today</h3><p class="mb-4 text-lg leading-relaxed opacity-80">Quality construction, proper planning, sustainable development, and professional discipline — values Sir Visvesvaraya represented, applied now to independent houses and villas across Tamil Nadu.</p><p class="mb-4 text-lg leading-relaxed opacity-80">At Karrcholai, we draw on that same commitment — structured planning, on-site supervision, and homes built to last.</p>` },
      { type:'double', images:[vis3, vis4] },
    ],
  },
  {
    id: 602,
    title: "Arun's Dream Home — A Comic Story",
    category: 'Client Stories',
    date: 'July 2026',
    image: null,
    heroType: 'comic-cover',
    author: 'Karrcholai Team',
    excerpt: 'From 10 years of renting to a Vastu-compliant dream home in 8 months — Arun Kumar\'s journey with Karrcholai, told in comic-book style.',
    gallery: [
      { type: 'comic', story: arunStory },
    ],
  },
];

export const categories = [
  'All Insights',
  'Engineering Legends',
  'Construction Tips',
  'Client Stories',
  'Land and Plot Tips',
];
