import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiActivity, FiShield, FiTrendingUp, FiMapPin, FiClock,
  FiCheckCircle, FiXCircle, FiPlus, FiMinus, FiStar, FiInfo
} from 'react-icons/fi'
import { measurementEffects, yogaCombinations } from '../../data/manaiyadiData'

const NAKSATRAS = [
  "Ashwini","Bharani","Krittika","Rohini","Mrigashirsha","Ardra",
  "Punarvasu","Pushya","Ashlesha","Magha","Purva Phalguni","Uttara Phalguni",
  "Hasta","Chitra","Svati","Vishakha","Anuradha","Jyeshtha",
  "Mula","Purva Ashadha","Uttara Ashadha","Shravana","Dhanishta",
  "Shatabhisha","Purva Bhadrapada","Uttara Bhadrapada","Revati"
]
const AUSPICIOUS_NAKSHATRAS = new Set([
  "Ashwini","Rohini","Mrigashirsha","Punarvasu","Pushya",
  "Uttara Phalguni","Hasta","Chitra","Svati","Anuradha",
  "Uttara Ashadha","Shravana","Dhanishta","Uttara Bhadrapada","Revati"
])
const WEEKDAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
const AUSPICIOUS_DAYS = new Set(["Sunday","Wednesday","Thursday","Friday"])
const YONI_DATA = [
  { name: "Kaka (NE)",   quality: "unfavorable" },
  { name: "Garuda (E)",  quality: "favorable"   },
  { name: "Dhuma (SE)",  quality: "unfavorable" },
  { name: "Simha (S)",   quality: "favorable"   },
  { name: "Shwana (SW)", quality: "unfavorable" },
  { name: "Vrisha (W)",  quality: "neutral"     },
  { name: "Khara (NW)",  quality: "unfavorable" },
  { name: "Gaja (N)",    quality: "favorable"   },
]
const PRESETS = [
  { label: 'Small Room',   sub: '12×10', length: 12, width: 10 },
  { label: 'Bedroom',      sub: '15×12', length: 15, width: 12 },
  { label: 'Master Bed',   sub: '18×15', length: 18, width: 15 },
  { label: 'Living Room',  sub: '20×16', length: 20, width: 16 },
  { label: 'Hall',         sub: '24×18', length: 24, width: 18 },
  { label: 'Plot',         sub: '30×20', length: 30, width: 20 },
]
const GRADE = {
  Excellent:    { bg:'bg-emerald-500', emoji:'🌟', msg:'Highly auspicious! Great choice.' },
  Good:         { bg:'bg-yellow-500',  emoji:'👍', msg:'Good dimensions. Solid choice.' },
  Moderate:     { bg:'bg-orange-400',  emoji:'⚠️', msg:'Adjust by 1–2 ft for better results.' },
  Unfavourable: { bg:'bg-rose-500',    emoji:'🔄', msg:'Try a different dimension.' },
}

function statusScore(s) { return s==='favorable'?1:s==='neutral'?0.5:0 }

function computeAccuracy(length, width) {
  const area=length*width, ayam=((area*8)%12)||12, vyayam=((area*9)%10)||10
  const yoni=YONI_DATA[(area*3)%8], nakshatra=NAKSATRAS[(area*8)%27]
  const day=WEEKDAYS[(area*9)%7], amsham=((area*4)%9)||9, aayul=((area*8)%120)||120
  const lengthEff=measurementEffects[length]||{effect:"Neutral Influence",status:"neutral"}
  const widthEff=measurementEffects[width]||{effect:"Neutral Influence",status:"neutral"}
  const isYoga=yogaCombinations.includes(`${length} ft x ${width} ft`)
  let score=0; const breakdown=[]
  const ayamWins=ayam>vyayam; const f1=ayamWins?30:0; score+=f1
  breakdown.push({label:'Ayam vs Vyayam',earned:f1,max:30,pass:ayamWins})
  const surplus=ayamWins?(ayam-vyayam)/ayam:0; const f2=Math.round(surplus*10); score+=f2
  breakdown.push({label:'Income Surplus',earned:f2,max:10,pass:f2>=5})
  const f3=Math.round(statusScore(lengthEff.status)*15); score+=f3
  breakdown.push({label:'Length Dimension',earned:f3,max:15,pass:lengthEff.status==='favorable'})
  const f4=Math.round(statusScore(widthEff.status)*15); score+=f4
  breakdown.push({label:'Width Dimension',earned:f4,max:15,pass:widthEff.status==='favorable'})
  const f5=Math.round(statusScore(yoni.quality)*10); score+=f5
  breakdown.push({label:'Yoni (Direction)',earned:f5,max:10,pass:yoni.quality==='favorable'})
  const nakPass=AUSPICIOUS_NAKSHATRAS.has(nakshatra); const f6=nakPass?8:0; score+=f6
  breakdown.push({label:'Nakshatra',earned:f6,max:8,pass:nakPass})
  const dayPass=AUSPICIOUS_DAYS.has(day); const f7=dayPass?7:0; score+=f7
  breakdown.push({label:'Vaaram (Day)',earned:f7,max:7,pass:dayPass})
  const amPass=[1,2,3,5,6,7].includes(amsham); const f8=amPass?5:0; score+=f8
  breakdown.push({label:'Amsham',earned:f8,max:5,pass:amPass})
  const yogaBonus=isYoga?5:0
  const accuracy=Math.min(Math.round((score+yogaBonus)/(100+yogaBonus)*100),100)
  const grade=accuracy>=80?'Excellent':accuracy>=60?'Good':accuracy>=40?'Moderate':'Unfavourable'
  return {area,ayam,vyayam,aayul,yoni:yoni.name,yoniQuality:yoni.quality,
    nakshatra,vaaram:day,amsham,isAuspicious:ayamWins&&yoni.quality==='favorable',
    lengthEffect:lengthEff,widthEffect:widthEff,accuracy,grade,breakdown,isYoga}
}

const CounterBtn = ({ onClick, icon, disabled }) => (
  <button onClick={onClick} disabled={disabled}
    className="w-11 h-11 rounded-2xl bg-white border-2 border-dark/10 flex items-center justify-center text-dark/60
               hover:bg-dark hover:text-white hover:border-dark active:scale-90
               disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-150 shadow-sm select-none">
    {icon}
  </button>
)

const ManaiyadiCalculator = () => {
  const [length, setLength] = useState(20)
  const [width,  setWidth]  = useState(16)
  const [results, setResults] = useState(null)
  const [activePreset, setActivePreset] = useState('Living Room')
  const [showBreakdown, setShowBreakdown] = useState(false)

  useEffect(() => { setResults(computeAccuracy(length, width)) }, [length, width])

  const applyPreset = (p) => { setLength(p.length); setWidth(p.width); setActivePreset(p.label); setShowBreakdown(false) }
  const gc   = results ? GRADE[results.grade] : null
  const ring = 2 * Math.PI * 40

  return (
    /* ── outer wrapper: two cols on lg+ ── */
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

      {/* ══ LEFT COLUMN: inputs ══ */}
      <div className="space-y-4">

        {/* Preset pills */}
        <div className="bg-white rounded-3xl border border-dark/8 shadow-sm p-5">
          <p className="text-[10px] font-black uppercase tracking-widest text-dark/30 mb-1">Room Type</p>
          <p className="text-sm font-black text-dark mb-4">Pick a preset or adjust below</p>
          <div className="grid grid-cols-3 gap-2">
            {PRESETS.map((p) => (
              <button key={p.label} onClick={() => applyPreset(p)}
                className={`flex flex-col items-start px-3 py-2.5 rounded-2xl border-2 text-left transition-all duration-200 active:scale-95 ${
                  activePreset===p.label ? 'border-dark bg-dark text-white' : 'border-dark/8 bg-[#fafaf9] text-dark hover:border-dark/25 hover:bg-white'}`}>
                <span className="text-[11px] font-black leading-tight">{p.label}</span>
                <span className={`text-[9px] font-bold mt-0.5 ${activePreset===p.label?'text-white/50':'text-dark/35'}`}>{p.sub} ft</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dimension steppers */}
        <div className="bg-white rounded-3xl border border-dark/8 shadow-sm p-5">
          <p className="text-[10px] font-black uppercase tracking-widest text-dark/30 mb-1">Dimensions</p>
          <p className="text-sm font-black text-dark mb-5">Fine-tune length &amp; width</p>
          <div className="grid grid-cols-2 gap-4">
            {/* Length */}
            <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-[#fafaf9] border border-dark/5">
              <p className="text-[9px] font-black uppercase tracking-widest text-dark/35">Length</p>
              <CounterBtn onClick={() => { setLength(l=>Math.max(6,l-1)); setActivePreset(null) }} icon={<FiMinus size={15}/>} disabled={length<=6}/>
              <div className="text-center py-1">
                <motion.p key={length} initial={{scale:0.7,opacity:0}} animate={{scale:1,opacity:1}} transition={{type:'spring',stiffness:400,damping:20}}
                  className="text-4xl font-black text-dark leading-none">{length}</motion.p>
                <p className="text-[9px] font-bold text-dark/30 uppercase tracking-widest mt-1">feet</p>
              </div>
              <CounterBtn onClick={() => { setLength(l=>Math.min(100,l+1)); setActivePreset(null) }} icon={<FiPlus size={15}/>} disabled={length>=100}/>
              <div className="w-full h-1.5 bg-dark/5 rounded-full overflow-hidden mt-1">
                <motion.div className="h-full bg-secondary rounded-full" animate={{width:`${((length-6)/94)*100}%`}} transition={{type:'spring',stiffness:120}}/>
              </div>
            </div>
            {/* Width */}
            <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-[#fafaf9] border border-dark/5">
              <p className="text-[9px] font-black uppercase tracking-widest text-dark/35">Width</p>
              <CounterBtn onClick={() => { setWidth(w=>Math.max(6,w-1)); setActivePreset(null) }} icon={<FiMinus size={15}/>} disabled={width<=6}/>
              <div className="text-center py-1">
                <motion.p key={width} initial={{scale:0.7,opacity:0}} animate={{scale:1,opacity:1}} transition={{type:'spring',stiffness:400,damping:20}}
                  className="text-4xl font-black text-dark leading-none">{width}</motion.p>
                <p className="text-[9px] font-bold text-dark/30 uppercase tracking-widest mt-1">feet</p>
              </div>
              <CounterBtn onClick={() => { setWidth(w=>Math.min(100,w+1)); setActivePreset(null) }} icon={<FiPlus size={15}/>} disabled={width>=100}/>
              <div className="w-full h-1.5 bg-dark/5 rounded-full overflow-hidden mt-1">
                <motion.div className="h-full bg-primary rounded-full" animate={{width:`${((width-6)/94)*100}%`}} transition={{type:'spring',stiffness:120}}/>
              </div>
            </div>
          </div>
          {results && (
            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="text-[10px] text-dark/35 font-bold uppercase tracking-wider">Total area</span>
              <motion.span key={results.area} initial={{opacity:0,y:-4}} animate={{opacity:1,y:0}}
                className="px-3 py-1 bg-dark text-white rounded-full text-[10px] font-black uppercase tracking-wider">
                {results.area} sq.ft
              </motion.span>
            </div>
          )}
        </div>

        {/* Inline tip */}
        <div className="flex items-start gap-3 px-4 py-3 bg-white rounded-2xl border border-dark/8 shadow-sm">
          <FiInfo size={13} className="text-dark/25 mt-0.5 shrink-0"/>
          <p className="text-[10px] text-dark/40 font-medium leading-relaxed">
            Manaiyadi compares <span className="text-dark font-black">Ayam (income)</span> vs <span className="text-dark font-black">Vyayam (expense)</span>. Higher Ayam = auspicious.
          </p>
        </div>
      </div>

      {/* ══ RIGHT COLUMN: results ══ */}
      <div>
        <AnimatePresence mode="wait">
          {results && gc && (
            <motion.div key={`${length}-${width}`} initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-10}} transition={{duration:0.3}} className="space-y-4">

              {/* Score hero */}
              <div className={`relative rounded-3xl p-6 overflow-hidden ${gc.bg}`}>
                <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-white/10 pointer-events-none"/>
                <div className="relative flex items-center gap-5">
                  <div className="relative w-20 h-20 shrink-0">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="white" strokeOpacity="0.2" strokeWidth="10"/>
                      <motion.circle cx="50" cy="50" r="40" fill="none" stroke="white" strokeWidth="10" strokeLinecap="round"
                        strokeDasharray={ring} initial={{strokeDashoffset:ring}}
                        animate={{strokeDashoffset:ring*(1-results.accuracy/100)}}
                        transition={{type:'spring',stiffness:60,damping:20,delay:0.1}}/>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-xl font-black text-white leading-none">{results.accuracy}</span>
                      <span className="text-[8px] text-white/50 font-bold">/100</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-2xl">{gc.emoji}</span>
                      <span className="text-2xl font-black text-white uppercase tracking-tight">{results.grade}</span>
                      {results.isYoga && <span className="text-[9px] font-black bg-white/20 text-white px-2 py-0.5 rounded-full">✦ Yoga</span>}
                    </div>
                    <p className="text-white/70 text-xs font-medium leading-snug">{gc.msg}</p>
                    <div className="mt-3 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/15 w-fit">
                      <FiShield size={10} className="text-white/70"/>
                      <span className="text-[9px] font-black text-white/80 uppercase tracking-wider">
                        {results.isAuspicious ? '✓ Favourable' : '⚠ Review recommended'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ayam / Vyayam */}
              <div className="grid grid-cols-2 gap-3">
                <div className={`rounded-2xl border-2 p-4 ${results.ayam>results.vyayam?'border-emerald-200 bg-emerald-50':'border-dark/8 bg-white'}`}>
                  <div className="flex items-center gap-1.5 mb-2">
                    <FiTrendingUp size={12} className={results.ayam>results.vyayam?'text-emerald-500':'text-dark/30'}/>
                    <p className="text-[9px] font-black uppercase tracking-wider text-dark/40">Income (Ayam)</p>
                  </div>
                  <p className={`text-4xl font-black leading-none ${results.ayam>results.vyayam?'text-emerald-600':'text-dark'}`}>{results.ayam}</p>
                </div>
                <div className={`rounded-2xl border-2 p-4 ${results.vyayam>=results.ayam?'border-rose-200 bg-rose-50':'border-dark/8 bg-white'}`}>
                  <div className="flex items-center gap-1.5 mb-2">
                    <FiActivity size={12} className={results.vyayam>=results.ayam?'text-rose-500':'text-dark/30'}/>
                    <p className="text-[9px] font-black uppercase tracking-wider text-dark/40">Expense (Vyayam)</p>
                  </div>
                  <p className={`text-4xl font-black leading-none ${results.vyayam>=results.ayam?'text-rose-500':'text-dark'}`}>{results.vyayam}</p>
                </div>
              </div>

              {/* Plain language verdict */}
              <div className="flex items-start gap-3 px-4 py-3 bg-white rounded-2xl border border-dark/8">
                <FiInfo size={13} className="text-dark/25 mt-0.5 shrink-0"/>
                <p className="text-[11px] text-dark/50 font-medium leading-relaxed">
                  {results.ayam>results.vyayam
                    ? `Income (${results.ayam}) beats Expense (${results.vyayam}) — primary indicator of auspicious dimensions.`
                    : `Income (${results.ayam}) doesn't beat Expense (${results.vyayam}). Try adjusting by 1–2 feet.`}
                </p>
              </div>

              {/* Dimension effects */}
              <div className="space-y-2">
                {[{label:`Length — ${length} ft`,eff:results.lengthEffect},{label:`Width — ${width} ft`,eff:results.widthEffect}].map(({label,eff},i)=>(
                  <div key={i} className={`flex items-center gap-3 px-4 py-3 rounded-2xl border text-[11px] font-bold ${
                    eff.status==='favorable'?'bg-emerald-50 border-emerald-200 text-emerald-700':
                    eff.status==='unfavorable'?'bg-rose-50 border-rose-200 text-rose-600':
                    'bg-dark/[0.03] border-dark/8 text-dark/50'}`}>
                    {eff.status==='favorable'?<FiCheckCircle size={13}/>:eff.status==='unfavorable'?<FiXCircle size={13}/>:<FiActivity size={13}/>}
                    <span className="flex-1">{label}</span>
                    <span className="text-[9px] opacity-60 text-right">{eff.effect}</span>
                  </div>
                ))}
              </div>

              {/* Detail chips 2×2 */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  {label:'Direction',val:results.yoni,      icon:<FiMapPin size={12}/>},
                  {label:'Nakshatra',val:results.nakshatra,  icon:<FiStar size={12}/>},
                  {label:'Life (Aayul)',val:`${results.aayul} yrs`,icon:<FiClock size={12}/>},
                  {label:'Amsham',   val:results.amsham,    icon:<FiShield size={12}/>},
                ].map((item,i)=>(
                  <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-dark/8">
                    <div className="w-7 h-7 rounded-xl bg-dark/5 flex items-center justify-center text-dark/30 shrink-0">{item.icon}</div>
                    <div className="min-w-0">
                      <p className="text-[8px] font-black uppercase tracking-widest text-dark/25 leading-none mb-0.5">{item.label}</p>
                      <p className="text-[11px] font-black text-dark leading-none truncate">{item.val}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Score breakdown accordion */}
              <div className="bg-white rounded-2xl border border-dark/8 overflow-hidden">
                <button onClick={()=>setShowBreakdown(b=>!b)}
                  className="w-full flex items-center justify-between px-5 py-4 hover:bg-dark/[0.02] transition-colors">
                  <div className="flex items-center gap-2">
                    <FiActivity size={12} className="text-dark/30"/>
                    <span className="text-[10px] font-black uppercase tracking-widest text-dark/40">Score Breakdown</span>
                  </div>
                  <motion.span animate={{rotate:showBreakdown?180:0}} transition={{duration:0.2}} className="text-dark/30 text-sm">▾</motion.span>
                </button>
                <AnimatePresence>
                  {showBreakdown && (
                    <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}} className="overflow-hidden border-t border-dark/5">
                      <div className="px-5 py-4 space-y-3">
                        {results.breakdown.map((item,i)=>(
                          <div key={i} className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${item.pass?'bg-emerald-100':'bg-rose-100'}`}>
                              {item.pass?<FiCheckCircle size={10} className="text-emerald-600"/>:<FiXCircle size={10} className="text-rose-500"/>}
                            </div>
                            <span className="text-[10px] font-bold text-dark/50 flex-1">{item.label}</span>
                            <span className={`text-[10px] font-black ${item.pass?'text-emerald-600':'text-rose-500'}`}>{item.earned}/{item.max}</span>
                            <div className="w-14 h-1.5 bg-dark/5 rounded-full overflow-hidden">
                              <div className={`h-full rounded-full ${item.pass?'bg-emerald-400':'bg-rose-300'}`} style={{width:`${(item.earned/item.max)*100}%`}}/>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <p className="text-center text-[9px] font-bold text-dark/20 uppercase tracking-[0.4em]">Based on traditional Manaiyadi Sastram</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ManaiyadiCalculator
