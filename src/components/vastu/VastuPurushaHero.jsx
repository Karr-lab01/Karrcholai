/**
 * VastuPurushaHero.jsx
 * Uses the actual Vastu Bhagavan image (vastu bagavan .png)
 * overlaid on the 3×3 Vastu Mandala zone grid.
 */

import { motion, useReducedMotion } from 'framer-motion'
import vastuBhagavanImg from '../../../assets/vastu bagavan .png'

const DEITY_PILLS = [
  { dir:'NE', deity:'Shiva',   element:'Space',  color:'#818CF8' },
  { dir:'N',  deity:'Kubera',  element:'Water',  color:'#3B82F6' },
  { dir:'E',  deity:'Indra',   element:'Air',    color:'#F59E0B' },
  { dir:'SE', deity:'Agni',    element:'Fire',   color:'#EF4444' },
  { dir:'S',  deity:'Yama',    element:'Earth',  color:'#8B5CF6' },
  { dir:'SW', deity:'Nirriti', element:'Earth',  color:'#B45309' },
  { dir:'W',  deity:'Varuna',  element:'Water',  color:'#0EA5E9' },
  { dir:'NW', deity:'Vayu',    element:'Air',    color:'#10B981' },
]

const ZONES = [
  {col:0,row:0,id:'NW',b:'#10B981',d:'Vayu',    s:'💨'},
  {col:1,row:0,id:'N', b:'#3B82F6',d:'Kubera',  s:'💰'},
  {col:2,row:0,id:'NE',b:'#818CF8',d:'Shiva',   s:'🔱'},
  {col:0,row:1,id:'W', b:'#0EA5E9',d:'Varuna',  s:'🌊'},
  {col:1,row:1,id:'C', b:'#F59E0B',d:'Brahma',  s:'🪷'},
  {col:2,row:1,id:'E', b:'#F59E0B',d:'Indra',   s:'⚡'},
  {col:0,row:2,id:'SW',b:'#B45309',d:'Nirriti', s:'⛰️'},
  {col:1,row:2,id:'S', b:'#8B5CF6',d:'Yama',    s:'⚖️'},
  {col:2,row:2,id:'SE',b:'#EF4444',d:'Agni',    s:'🔥'},
]

// ── Mandala panel: real image over the 3×3 grid ───────────────────────────────
function VastuBhagavanPanel() {
  return (
    <div style={{ position:'relative', width:'100%', maxWidth:'540px' }}>

      {/* Spinning ring ornaments */}
      <motion.div
        animate={{ rotate:360 }}
        transition={{ duration:90, repeat:Infinity, ease:'linear' }}
        style={{
          position:'absolute', inset:'-18px', borderRadius:'20px',
          border:'1px solid transparent',
          borderTopColor:'rgba(201,117,74,0.5)',
          borderBottomColor:'rgba(201,117,74,0.1)',
          pointerEvents:'none',
        }}
      />
      <motion.div
        animate={{ rotate:-360 }}
        transition={{ duration:130, repeat:Infinity, ease:'linear' }}
        style={{
          position:'absolute', inset:'-38px', borderRadius:'26px',
          border:'1px dashed rgba(201,117,74,0.07)',
          borderLeftColor:'rgba(201,117,74,0.2)',
          pointerEvents:'none',
        }}
      />

      {/* Mandala grid + image */}
      <div style={{
        position:'relative', borderRadius:'16px', overflow:'hidden',
        border:'2px solid rgba(201,117,74,0.45)',
        boxShadow:'0 0 60px rgba(201,117,74,0.14), 0 0 120px rgba(79,70,229,0.08)',
      }}>

        {/* 3×3 zone grid */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', width:'100%' }}>
          {ZONES.map(z => (
            <div key={z.id} style={{
              aspectRatio:'1',
              background:`${z.b}18`,
              border:`1px solid ${z.b}28`,
              display:'flex', flexDirection:'column',
              alignItems:'center', justifyContent:'center',
              gap:'2px', padding:'6px',
            }}>
              <span style={{ fontSize:'15px', lineHeight:1 }}>{z.s}</span>
              <span style={{
                fontSize:'9px', fontWeight:900, color:z.b,
                fontFamily:'Georgia,serif', letterSpacing:'0.05em',
              }}>{z.id}</span>
              <span style={{
                fontSize:'7px', color:'rgba(255,255,255,0.38)',
                fontFamily:'Georgia,serif',
              }}>{z.d}</span>
            </div>
          ))}
        </div>

        {/* Real Vastu Bhagavan image — centred over the grid */}
        <div style={{
          position:'absolute', inset:0,
          display:'flex', alignItems:'center', justifyContent:'center',
          pointerEvents:'none',
        }}>
          {/* Golden aura glow behind deity */}
          <div style={{
            position:'absolute', width:'65%', height:'65%',
            background:'radial-gradient(ellipse,rgba(240,192,64,0.2) 0%,transparent 70%)',
            borderRadius:'50%',
          }}/>
          <img
            src={vastuBhagavanImg}
            alt="Sree Vastu Bhagwan — presiding deity of Vastu Shastra"
            style={{
              position:'relative', zIndex:2,
              width:'88%', height:'88%',
              objectFit:'contain',
              filter:'drop-shadow(0 0 28px rgba(240,192,64,0.4)) drop-shadow(0 0 10px rgba(201,117,74,0.45))',
            }}
          />
        </div>

        {/* Grid overlay lines */}
        <div style={{
          position:'absolute', inset:0, pointerEvents:'none', zIndex:3,
          backgroundImage:`
            linear-gradient(to right, rgba(201,117,74,0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(201,117,74,0.2) 1px, transparent 1px)
          `,
          backgroundSize:'33.333% 33.333%',
        }}/>
      </div>

      {/* Caption */}
      <p style={{
        textAlign:'center', marginTop:'12px',
        fontSize:'9px', letterSpacing:'0.2em',
        color:'rgba(201,117,74,0.4)',
        fontFamily:'Georgia,serif', fontWeight:600,
      }}>
        SREE VASTU BHAGWAN · VASTU PURUSHA MANDALA · 9×9 PARAMASAYIKA GRID
      </p>
    </div>
  )
}

// ── Floating particle ─────────────────────────────────────────────────────────
function Particle({ x, y, sz, delay }) {
  return (
    <motion.div
      style={{
        position:'absolute', left:`${x}%`, top:`${y}%`,
        width:sz, height:sz, borderRadius:'50%',
        background:'rgba(201,117,74,0.45)', pointerEvents:'none',
      }}
      animate={{ y:[0,-20,0], opacity:[0.2,0.7,0.2] }}
      transition={{ duration:3+delay, repeat:Infinity, delay, ease:'easeInOut' }}
    />
  )
}


// ── Main hero section ─────────────────────────────────────────────────────────
export default function VastuPurushaHero() {
  const prefersReduced = useReducedMotion()
  const particles = [
    {x:6, y:22,sz:3,delay:0},   {x:14,y:68,sz:2,delay:1.2},
    {x:22,y:42,sz:4,delay:0.5}, {x:76,y:20,sz:3,delay:1.8},
    {x:88,y:72,sz:2,delay:0.8}, {x:93,y:44,sz:3,delay:2.1},
    {x:50,y:8, sz:2,delay:1.5}, {x:62,y:90,sz:3,delay:0.3},
  ]

  return (
    <section style={{
      background:'radial-gradient(ellipse at 50% 0%,#1a1208 0%,#0E0C08 60%)',
      minHeight:'100vh', paddingTop:'100px',
      position:'relative', overflow:'hidden',
    }}>
      {/* Grain */}
      <div style={{position:'absolute',inset:0,opacity:0.04,pointerEvents:'none',
        backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`}}/>
      {/* Ambient glows */}
      <div style={{position:'absolute',top:'-10%',left:'50%',transform:'translateX(-50%)',
        width:'600px',height:'400px',
        background:'radial-gradient(ellipse,rgba(201,117,74,0.09) 0%,transparent 70%)',pointerEvents:'none'}}/>
      <div style={{position:'absolute',bottom:'5%',right:'-5%',width:'400px',height:'400px',
        background:'radial-gradient(ellipse,rgba(79,70,229,0.06) 0%,transparent 70%)',pointerEvents:'none'}}/>

      {/* Particles */}
      {!prefersReduced && particles.map((p,i)=>(
        <Particle key={i} x={p.x} y={p.y} sz={p.sz} delay={p.delay}/>
      ))}

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── LEFT: Text content ── */}
          <div>
            <motion.p
              initial={prefersReduced?{}:{opacity:0,y:20}} animate={{opacity:1,y:0}}
              transition={{duration:0.8,ease:[0.22,1,0.36,1]}}
              className="text-xs font-black tracking-[0.5em] uppercase mb-5"
              style={{color:'#B85C38'}}>
              Vedic Architecture · Vastu Shastra
            </motion.p>

            <motion.h1
              initial={prefersReduced?{}:{opacity:0,y:30}} animate={{opacity:1,y:0}}
              transition={{duration:0.9,delay:0.1,ease:[0.22,1,0.36,1]}}
              className="font-black tracking-tighter leading-none mb-6"
              style={{fontSize:'clamp(2.8rem,6vw,5.5rem)',color:'#FAF9F6'}}>
              Sree Vastu<br/>
              <span style={{WebkitTextStroke:'1.5px rgba(201,117,74,0.85)',color:'transparent'}}>
                Bhagwan
              </span>
            </motion.h1>

            <motion.div
              initial={prefersReduced?{}:{scaleX:0}} animate={{scaleX:1}}
              transition={{duration:0.8,delay:0.3,ease:[0.22,1,0.36,1]}}
              style={{width:'48px',height:'2px',
                background:'linear-gradient(90deg,#C9754A,#F59E0B)',
                transformOrigin:'left',marginBottom:'1.5rem'}}/>

            <motion.p
              initial={prefersReduced?{}:{opacity:0,y:20}} animate={{opacity:1,y:0}}
              transition={{duration:0.9,delay:0.35}}
              className="text-sm md:text-base leading-relaxed mb-8 max-w-md"
              style={{color:'rgba(250,249,246,0.5)',fontWeight:300}}>
              The presiding deity of every structure — born from the sweat of Lord Shiva,
              pinned face-down by Brahma and 45 Devatas. His body forms the sacred cosmic
              grid that governs every room, every wall, every threshold.
            </motion.p>

            <motion.div
              initial={prefersReduced?{}:{opacity:0,y:20}} animate={{opacity:1,y:0}}
              transition={{duration:0.9,delay:0.45}}
              className="space-y-3 mb-10">
              {[
                {icon:'🔱', text:'Head at NE (Ishan / Shiva) — highest spiritual zone'},
                {icon:'⛰️', text:'Feet at SW (Nairuta) — heavy, stable earth energy'},
                {icon:'🪷', text:'Navel at Brahmasthan (centre) — must remain open'},
                {icon:'45', text:'45 Devatas occupy zones of his body and bless the house'},
              ].map((item,i)=>(
                <div key={i} className="flex items-start gap-3">
                  <span
                    className="shrink-0 mt-0.5"
                    style={item.icon==='45'
                      ?{fontSize:'10px',fontWeight:900,color:'#C9754A',width:'16px',textAlign:'center'}
                      :{fontSize:'16px'}}>
                    {item.icon}
                  </span>
                  <p className="text-xs font-medium" style={{color:'rgba(250,249,246,0.5)'}}>
                    {item.text}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Deity direction pills */}
            <motion.div
              initial={prefersReduced?{}:{opacity:0,y:20}} animate={{opacity:1,y:0}}
              transition={{duration:0.9,delay:0.55}}
              className="flex flex-wrap gap-2 mb-8">
              {DEITY_PILLS.map(p=>(
                <div key={p.dir}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                  style={{background:`${p.color}18`,border:`1px solid ${p.color}35`}}>
                  <span className="text-[10px] font-black tracking-wider" style={{color:p.color}}>
                    {p.dir}
                  </span>
                  <span className="text-[10px]" style={{color:'rgba(255,255,255,0.38)'}}>
                    {p.deity} · {p.element}
                  </span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={prefersReduced?{}:{opacity:0,y:20}} animate={{opacity:1,y:0}}
              transition={{duration:0.9,delay:0.65}}>
              <a
                href="#compass-tool"
                onClick={e=>{
                  e.preventDefault()
                  window.scrollBy({top:window.innerHeight*0.92,behavior:'smooth'})
                }}
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-sm text-xs font-black tracking-[0.2em] uppercase transition-all duration-300"
                style={{background:'#B85C38',color:'#FAF9F6',boxShadow:'0 0 32px rgba(184,92,56,0.3)'}}>
                Check Your Home's Vastu
                <span style={{fontSize:'16px'}}>→</span>
              </a>
            </motion.div>
          </div>

          {/* ── RIGHT: Vastu Bhagavan on the Mandala grid ── */}
          <motion.div
            initial={prefersReduced?{}:{opacity:0,scale:0.88,rotate:-4}}
            animate={{opacity:1,scale:1,rotate:0}}
            transition={{duration:1.4,delay:0.2,ease:[0.22,1,0.36,1]}}
            style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <VastuBhagavanPanel/>
          </motion.div>

        </div>

        {/* Scroll hint */}
        <motion.div
          initial={prefersReduced?{}:{opacity:0}} animate={{opacity:1}}
          transition={{duration:1,delay:1.2}}
          className="flex flex-col items-center mt-16 gap-2">
          <p className="text-[10px] tracking-[0.3em] uppercase font-medium"
            style={{color:'rgba(255,255,255,0.18)'}}>
            Use the Compass Tool
          </p>
          <motion.div
            animate={prefersReduced?{}:{y:[0,8,0]}}
            transition={{duration:1.8,repeat:Infinity,ease:'easeInOut'}}
            style={{width:'1px',height:'36px',
              background:'linear-gradient(to bottom,rgba(201,117,74,0.5),transparent)'}}/>
        </motion.div>
      </div>
    </section>
  )
}
