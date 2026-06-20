import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiActivity, FiShield, FiTrendingUp, FiMapPin, FiClock,
  FiCheckCircle, FiXCircle, FiPlus, FiMinus, FiStar, FiInfo,
  FiSearch, FiZap, FiHome, FiSun, FiMoon, FiGrid, FiArrowRight,
  FiAlertTriangle, FiRotateCcw, FiMaximize2, FiLayers
} from 'react-icons/fi'
import { measurementEffects, wallHeightEffects, yogaCombinations, roomRecommendations } from '../../data/manaiyadiData'

// ── Constants ─────────────────────────────────────────────────────────────────
const NAKSATRAS = [
  "Ashwini","Bharani","Krittika","Rohini","Mrigashirsha","Ardra","Punarvasu",
  "Pushya","Ashlesha","Magha","Purva Phalguni","Uttara Phalguni","Hasta",
  "Chitra","Svati","Vishakha","Anuradha","Jyeshtha","Mula","Purva Ashadha",
  "Uttara Ashadha","Shravana","Dhanishta","Shatabhisha","Purva Bhadrapada",
  "Uttara Bhadrapada","Revati"
]
const AUSPICIOUS_NAKSHATRAS = new Set([
  "Ashwini","Rohini","Mrigashirsha","Punarvasu","Pushya","Uttara Phalguni",
  "Hasta","Chitra","Svati","Anuradha","Uttara Ashadha","Shravana",
  "Dhanishta","Uttara Bhadrapada","Revati"
])
const WEEKDAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
const AUSPICIOUS_DAYS = new Set(["Sunday","Wednesday","Thursday","Friday"])

// Ayadi Shadvarga: 8 Yonis based on (perimeter*3)%8
const YONI_DATA = [
  { name:"Dhwaja",   dir:"East",      symbol:"🏳️", quality:"favorable",   meaning:"Flag — Fame, Victory" },
  { name:"Vrishabha",dir:"South-East",symbol:"🐂", quality:"favorable",   meaning:"Bull — Wealth, Strength" },
  { name:"Simha",    dir:"South",     symbol:"🦁", quality:"favorable",   meaning:"Lion — Royalty, Power" },
  { name:"Shwana",   dir:"South-West",symbol:"🐕", quality:"unfavorable", meaning:"Dog — Poverty, Worry" },
  { name:"Vrisha",   dir:"West",      symbol:"🐂", quality:"neutral",     meaning:"Bull — Moderate Fortune" },
  { name:"Khara",    dir:"North-West",symbol:"🫏", quality:"unfavorable", meaning:"Donkey — Hardship, Loss" },
  { name:"Gaja",     dir:"North",     symbol:"🐘", quality:"favorable",   meaning:"Elephant — Prosperity, Luck" },
  { name:"Dhuma",    dir:"North-East",symbol:"💨", quality:"unfavorable", meaning:"Smoke — Illness, Confusion" },
]

// Tithi (lunar day) names based on (perimeter*9)%30
const TITHI_NAMES = [
  "Pratipad","Dwitiya","Tritiya","Chaturthi","Panchami","Shashthi","Saptami",
  "Ashtami","Navami","Dashami","Ekadashi","Dwadashi","Trayodashi","Chaturdashi",
  "Purnima","Pratipad","Dwitiya","Tritiya","Chaturthi","Panchami","Shashthi",
  "Saptami","Ashtami","Navami","Dashami","Ekadashi","Dwadashi","Trayodashi",
  "Chaturdashi","Amavasya"
]
const AUSPICIOUS_TITHIS = new Set([1,2,3,5,7,10,11,12,13,15])

const PRESETS = [
  {label:'Puja Room',  sub:'6×8',   length:6,  width:8},
  {label:'Small Room', sub:'12×10', length:12, width:10},
  {label:'Bedroom',    sub:'15×12', length:15, width:12},
  {label:'Master Bed', sub:'18×15', length:18, width:15},
  {label:'Living Room',sub:'20×16', length:20, width:16},
  {label:'Hall',       sub:'24×18', length:24, width:18},
  {label:'Home Office',sub:'16×10', length:16, width:10},
  {label:'Plot',       sub:'30×20', length:30, width:20},
]

const GRADE = {
  Excellent:    { bg:'bg-emerald-500', ring:'#10b981', emoji:'🌟', msg:'Highly auspicious — cosmic energies aligned.' },
  Good:         { bg:'bg-yellow-500',  ring:'#eab308', emoji:'👍', msg:'Good dimensions. A solid, stable choice.' },
  Moderate:     { bg:'bg-orange-400',  ring:'#f97316', emoji:'⚠️', msg:'Adjust by 1–2 ft for better resonance.' },
  Unfavourable: { bg:'bg-rose-500',    ring:'#f43f5e', emoji:'🔄', msg:'Consider different dimensions.' },
}

// Nakshatra → birth star category for compatibility
const NAKSHATRA_RASI = {
  "Ashwini":"Mesha","Bharani":"Mesha","Krittika":"Mesha",
  "Rohini":"Vrishabha","Mrigashirsha":"Vrishabha","Ardra":"Mithuna",
  "Punarvasu":"Mithuna","Pushya":"Karka","Ashlesha":"Karka",
  "Magha":"Simha","Purva Phalguni":"Simha","Uttara Phalguni":"Simha",
  "Hasta":"Kanya","Chitra":"Kanya","Svati":"Tula",
  "Vishakha":"Tula","Anuradha":"Vrishchika","Jyeshtha":"Vrishchika",
  "Mula":"Dhanu","Purva Ashadha":"Dhanu","Uttara Ashadha":"Dhanu",
  "Shravana":"Makara","Dhanishta":"Makara","Shatabhisha":"Kumbha",
  "Purva Bhadrapada":"Kumbha","Uttara Bhadrapada":"Meena","Revati":"Meena"
}

// Vastu zones (simplified 3×3 grid)
const VASTU_ZONES = [
  { pos:[0,0], dir:"NW", deity:"Vayu",    element:"Air",    color:"bg-sky-100 border-sky-200",    text:"text-sky-700",   ideal:"Children Rm" },
  { pos:[0,1], dir:"N",  deity:"Kubera",  element:"Water",  color:"bg-blue-100 border-blue-200",   text:"text-blue-700",  ideal:"Pooja / Safe" },
  { pos:[0,2], dir:"NE", deity:"Ishanya", element:"Water",  color:"bg-indigo-100 border-indigo-200",text:"text-indigo-700",ideal:"Pooja Room" },
  { pos:[1,0], dir:"W",  deity:"Varuna",  element:"Water",  color:"bg-cyan-100 border-cyan-200",   text:"text-cyan-700",  ideal:"Dining Room" },
  { pos:[1,1], dir:"C",  deity:"Brahma",  element:"Space",  color:"bg-amber-100 border-amber-200", text:"text-amber-700", ideal:"Brahmasthan (Open)" },
  { pos:[1,2], dir:"E",  deity:"Indra",   element:"Fire",   color:"bg-orange-100 border-orange-200",text:"text-orange-700",ideal:"Living Room" },
  { pos:[2,0], dir:"SW", deity:"Nirriti", element:"Earth",  color:"bg-stone-200 border-stone-300", text:"text-stone-700", ideal:"Master Bed" },
  { pos:[2,1], dir:"S",  deity:"Yama",    element:"Earth",  color:"bg-red-100 border-red-200",     text:"text-red-700",   ideal:"Avoid Rooms" },
  { pos:[2,2], dir:"SE", deity:"Agni",    element:"Fire",   color:"bg-rose-100 border-rose-200",   text:"text-rose-700",  ideal:"Kitchen" },
]

// Tab definitions
const TABS = [
  { id:'calculator', label:'Calculator',    icon:<FiActivity size={13}/> },
  { id:'shadvarga',  label:'6 Formulas',    icon:<FiLayers size={13}/> },
  { id:'optimizer',  label:'Find Best Fit', icon:<FiSearch size={13}/> },
  { id:'vastu',      label:'Vastu Zones',   icon:<FiGrid size={13}/> },
  { id:'height',     label:'Wall Height',   icon:<FiMaximize2 size={13}/> },
  { id:'birthstar',  label:'Birth Star',    icon:<FiStar size={13}/> },
]

// ── Core calculation engine ───────────────────────────────────────────────────
function statusScore(s){ return s==='favorable'?1:s==='neutral'?0.5:0 }

function computeAyadi(length, width) {
  const area      = length * width
  const perimeter = 2 * (length + width)

  // Classic Ayadi Shadvarga — all from PERIMETER
  const ayaRaw    = (perimeter * 8) % 12
  const aya       = ayaRaw === 0 ? 12 : ayaRaw          // Income (Ayam)
  const vyayaRaw  = (perimeter * 9) % 10
  const vyaya     = vyayaRaw === 0 ? 10 : vyayaRaw       // Expenditure (Vyayam)
  const yoniIdx   = Math.floor((perimeter * 3) % 8)
  const yoni      = YONI_DATA[yoniIdx]                   // Direction / Yoni
  const rikshaRaw = Math.floor((perimeter * 8) % 27)
  const nakshatra = NAKSATRAS[rikshaRaw]                 // Birth star / Riksha
  const varaRaw   = Math.floor((perimeter * 9) % 7)
  const vara      = WEEKDAYS[varaRaw]                    // Day / Vara
  const tithiRaw  = Math.floor((perimeter * 9) % 30)
  const tithi     = TITHI_NAMES[tithiRaw]                // Lunar day / Tithi
  const tithiNum  = tithiRaw + 1

  // Area-based (Manaiyadi Shastram tradition)
  const amshRaw   = (area * 4) % 9
  const amsham    = amshRaw === 0 ? 9 : amshRaw          // Division / Amsham
  const aayulRaw  = (area * 8) % 120
  const aayul     = aayulRaw === 0 ? 120 : aayulRaw      // Longevity / Aayul

  // Dimension effects
  const le = measurementEffects[length]  || measurementEffects[Math.round(length)]  || { effect:'Neutral Influence', status:'neutral' }
  const we = measurementEffects[width]   || measurementEffects[Math.round(width)]   || { effect:'Neutral Influence', status:'neutral' }

  // Yoga check
  const isYoga = yogaCombinations.includes(`${length} ft x ${width} ft`)

  // Ratio checks
  const ayaWins   = aya > vyaya
  const ratio     = length / width
  const goodRatio = ratio >= 1.2 && ratio <= 1.8   // classical 1:1.5 preference

  // Score
  let score = 0; const bd = []
  const f1 = ayaWins ? 25 : 0;                    score+=f1; bd.push({label:'Aya > Vyaya (Income)',    earned:f1,max:25,pass:ayaWins,formula:`Perimeter=${perimeter}, Aya=${aya}, Vyaya=${vyaya}`})
  const f2 = ayaWins ? Math.round(((aya-vyaya)/aya)*10) : 0; score+=f2; bd.push({label:'Income Surplus Margin', earned:f2,max:10,pass:f2>=5,formula:`(${aya}-${vyaya})/${aya}`})
  const f3 = Math.round(statusScore(yoni.quality)*12); score+=f3; bd.push({label:'Yoni (Direction)',           earned:f3,max:12,pass:yoni.quality==='favorable',formula:`(P×3)%8 = ${yoniIdx}`})
  const f4 = AUSPICIOUS_NAKSHATRAS.has(nakshatra)?10:0; score+=f4; bd.push({label:'Riksha (Nakshatra)',        earned:f4,max:10,pass:AUSPICIOUS_NAKSHATRAS.has(nakshatra),formula:`(P×8)%27 = ${rikshaRaw}`})
  const f5 = AUSPICIOUS_DAYS.has(vara)?8:0;        score+=f5; bd.push({label:'Vara (Weekday)',                earned:f5,max:8, pass:AUSPICIOUS_DAYS.has(vara),formula:`(P×9)%7 = ${varaRaw}`})
  const f6 = AUSPICIOUS_TITHIS.has(tithiNum)?7:0;  score+=f6; bd.push({label:'Tithi (Lunar Day)',             earned:f6,max:7, pass:AUSPICIOUS_TITHIS.has(tithiNum),formula:`(P×9)%30 = ${tithiRaw}`})
  const f7 = Math.round(statusScore(le.status)*10); score+=f7; bd.push({label:'Length Dimension',              earned:f7,max:10,pass:le.status==='favorable',formula:`${length}ft effect`})
  const f8 = Math.round(statusScore(we.status)*10); score+=f8; bd.push({label:'Width Dimension',               earned:f8,max:10,pass:we.status==='favorable',formula:`${width}ft effect`})
  const f9 = goodRatio?5:0;                         score+=f9; bd.push({label:'L:W Ratio (1:1.2–1.8)',         earned:f9,max:5, pass:goodRatio,formula:`${ratio.toFixed(2)}`})
  const yb = isYoga?3:0
  const acc = Math.min(Math.round((score+yb)/97*100),100)
  const grade = acc>=80?'Excellent':acc>=60?'Good':acc>=40?'Moderate':'Unfavourable'

  return {
    area, perimeter, aya, vyaya, yoni, nakshatra, vara, tithi, tithiNum,
    amsham, aayul, le, we, isYoga, ayaWins, ratio, accuracy:acc, grade, breakdown:bd,
    isAuspicious: ayaWins && yoni.quality==='favorable'
  }
}

// Find nearest auspicious dimensions around a target
function findNearby(length, width, range=5) {
  const candidates = []
  for (let l = Math.max(6, Math.round(length)-range); l <= Math.round(length)+range; l++) {
    for (let w = Math.max(6, Math.round(width)-range); w <= Math.round(width)+range; w++) {
      const r = computeAyadi(l, w)
      if (r.accuracy >= 60) candidates.push({ l, w, ...r })
    }
  }
  return candidates.sort((a,b) => b.accuracy - a.accuracy).slice(0, 6)
}

// ── Reusable NumericInput ─────────────────────────────────────────────────────
function NumericInput({ forceValue, onCommit, min=6, max=100, barColor, label }) {
  const liveRef  = useRef(forceValue)
  const inputRef = useRef(null)
  const [inputVal, setInputVal] = useState(String(forceValue))
  const [editing,  setEditing]  = useState(false)
  const [display,  setDisplay]  = useState(forceValue)

  useEffect(() => {
    liveRef.current = forceValue
    setInputVal(String(forceValue))
    setDisplay(forceValue)
    setEditing(false)
  }, [forceValue])

  useEffect(() => { if (editing) { inputRef.current?.focus(); inputRef.current?.select() } }, [editing])

  const open = () => { liveRef.current = display; setInputVal(String(display)); setEditing(true) }

  const handleChange = (e) => {
    const raw = e.target.value
    if (/^-?\d*\.?\d*$/.test(raw)) { setInputVal(raw); liveRef.current = raw }
  }

  const save = () => {
    const n = parseFloat(liveRef.current)
    if (!isNaN(n) && n >= min && n <= max) {
      const rounded = Math.round(n * 10) / 10
      setDisplay(rounded); onCommit(rounded)
    } else { setInputVal(String(display)) }
    setEditing(false)
  }

  const cancel = () => { setInputVal(String(display)); setEditing(false) }

  const step = (delta) => {
    const next = Math.round((Math.min(max, Math.max(min, display + delta))) * 10) / 10
    liveRef.current = next; setDisplay(next); setInputVal(String(next)); onCommit(next)
  }

  const btnCls = "w-11 h-11 rounded-2xl bg-white border-2 border-dark/10 flex items-center justify-center text-dark/60 hover:bg-dark hover:text-white hover:border-dark active:scale-90 disabled:opacity-25 transition-all shadow-sm select-none"

  return (
    <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-[#fafaf9] border border-dark/5">
      <button onMouseDown={e=>e.preventDefault()} onClick={()=>step(-1)} disabled={display<=min} className={btnCls}><FiMinus size={15}/></button>
      <div className="text-center py-1 min-h-[64px] flex flex-col items-center justify-center">
        {editing ? (
          <input ref={inputRef} type="text" inputMode="decimal" value={inputVal}
            onChange={handleChange} onBlur={save}
            onKeyDown={e=>{ if(e.key==='Enter'){e.preventDefault();save()} if(e.key==='Escape'){e.preventDefault();cancel()} }}
            className="w-24 text-center text-4xl font-black leading-none bg-transparent border-b-2 border-primary outline-none text-primary caret-primary"
          />
        ) : (
          <p onClick={open} className="text-4xl font-black leading-none cursor-text text-dark hover:text-primary transition-colors">{display}</p>
        )}
        <p className="text-[9px] font-bold text-dark/25 uppercase tracking-widest mt-1">{editing?'Enter ✓  Esc ✗':'feet · click to edit'}</p>
      </div>
      <button onMouseDown={e=>e.preventDefault()} onClick={()=>step(1)} disabled={display>=max} className={btnCls}><FiPlus size={15}/></button>
      <div className="w-full h-1.5 bg-dark/5 rounded-full overflow-hidden mt-1">
        <motion.div className={`h-full rounded-full ${barColor}`}
          animate={{ width:`${((display-min)/(max-min))*100}%` }}
          transition={{ type:'spring', stiffness:120 }}/>
      </div>
    </div>
  )
}

// ── Tab: Main Calculator ──────────────────────────────────────────────────────
function TabCalculator({ length, width, lenForce, widForce, setLength, setWidth, setLenForce, setWidForce, activePreset, setActivePreset, results }) {
  const gc   = GRADE[results.grade]
  const ring = 2 * Math.PI * 40
  const [showBreakdown, setShowBreakdown] = useState(false)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* LEFT */}
      <div className="space-y-4">
        {/* Presets */}
        <div className="bg-white rounded-3xl border border-dark/8 shadow-sm p-5">
          <p className="text-[10px] font-black uppercase tracking-widest text-dark/30 mb-1">Room Type</p>
          <p className="text-sm font-black text-dark mb-4">Pick a preset or adjust below</p>
          <div className="grid grid-cols-4 gap-2">
            {PRESETS.map(p=>(
              <button key={p.label} onClick={()=>{ setLength(p.length);setWidth(p.width);setLenForce(p.length);setWidForce(p.width);setActivePreset(p.label) }}
                className={`flex flex-col items-start px-2.5 py-2 rounded-2xl border-2 text-left transition-all duration-200 active:scale-95 ${activePreset===p.label?'border-dark bg-dark text-white':'border-dark/8 bg-[#fafaf9] text-dark hover:border-dark/25 hover:bg-white'}`}>
                <span className="text-[10px] font-black leading-tight">{p.label}</span>
                <span className={`text-[8px] font-bold mt-0.5 ${activePreset===p.label?'text-white/50':'text-dark/35'}`}>{p.sub} ft</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dimension inputs */}
        <div className="bg-white rounded-3xl border border-dark/8 shadow-sm p-5">
          <p className="text-[10px] font-black uppercase tracking-widest text-dark/30 mb-1">Dimensions</p>
          <p className="text-sm font-black text-dark mb-4">Use +/− or click the number to type</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-dark/35 text-center mb-1">Length</p>
              <NumericInput forceValue={lenForce} onCommit={v=>{setLength(v);setActivePreset(null)}} barColor="bg-secondary"/>
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-dark/35 text-center mb-1">Width</p>
              <NumericInput forceValue={widForce} onCommit={v=>{setWidth(v);setActivePreset(null)}} barColor="bg-primary"/>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            {[
              {label:'Area',    val:`${results.area} sq.ft`},
              {label:'Perimeter',val:`${results.perimeter} ft`},
              {label:'Ratio',   val:`1 : ${results.ratio.toFixed(2)}`},
            ].map(item=>(
              <div key={item.label} className="px-2 py-2 bg-[#fafaf9] rounded-xl border border-dark/5">
                <p className="text-[8px] text-dark/30 font-bold uppercase tracking-wider">{item.label}</p>
                <p className="text-xs font-black text-dark mt-0.5">{item.val}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Yoga badge */}
        {results.isYoga && (
          <div className="flex items-center gap-3 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-2xl">
            <FiStar size={14} className="text-emerald-600 shrink-0"/>
            <p className="text-[11px] font-black text-emerald-700">✦ Yoga Combination — {length} ft × {width} ft creates powerful harmonic energy</p>
          </div>
        )}

        <div className="flex items-start gap-3 px-4 py-3 bg-white rounded-2xl border border-dark/8 shadow-sm">
          <FiInfo size={13} className="text-dark/25 mt-0.5 shrink-0"/>
          <p className="text-[10px] text-dark/40 font-medium leading-relaxed">
            Manaiyadi compares <span className="text-dark font-black">Aya (income)</span> vs <span className="text-dark font-black">Vyaya (expense)</span> derived from the perimeter. All 6 Shadvarga formulas are shown in the <span className="text-dark font-black">6 Formulas</span> tab.
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="space-y-4">
        {/* Score card */}
        <div className={`relative rounded-3xl p-6 overflow-hidden ${gc.bg}`}>
          <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-white/10 pointer-events-none"/>
          <div className="relative flex items-center gap-5">
            <div className="relative w-20 h-20 shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="white" strokeOpacity="0.2" strokeWidth="10"/>
                <motion.circle cx="50" cy="50" r="40" fill="none" stroke="white" strokeWidth="10" strokeLinecap="round"
                  strokeDasharray={ring} animate={{strokeDashoffset:ring*(1-results.accuracy/100)}}
                  transition={{type:'spring',stiffness:80,damping:20}}/>
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
                {results.isYoga&&<span className="text-[9px] font-black bg-white/20 text-white px-2 py-0.5 rounded-full">✦ Yoga</span>}
              </div>
              <p className="text-white/70 text-xs font-medium leading-snug">{gc.msg}</p>
              <div className="mt-3 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/15 w-fit">
                <FiShield size={10} className="text-white/70"/>
                <span className="text-[9px] font-black text-white/80 uppercase tracking-wider">
                  {results.isAuspicious?'✓ Auspicious':'⚠ Review recommended'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Aya / Vyaya */}
        <div className="grid grid-cols-2 gap-3">
          {[
            {label:'Aya (Income)',    val:results.aya,   good:results.ayaWins,   icon:<FiTrendingUp size={12}/>, pos:true},
            {label:'Vyaya (Expense)', val:results.vyaya, good:!results.ayaWins,  icon:<FiActivity size={12}/>,   pos:false},
          ].map((item,i)=>(
            <div key={i} className={`rounded-2xl border-2 p-4 ${item.good&&item.pos?'border-emerald-200 bg-emerald-50':item.good&&!item.pos?'border-rose-200 bg-rose-50':'border-dark/8 bg-white'}`}>
              <div className="flex items-center gap-1.5 mb-2">
                <span className={item.good&&item.pos?'text-emerald-500':item.good&&!item.pos?'text-rose-500':'text-dark/30'}>{item.icon}</span>
                <p className="text-[9px] font-black uppercase tracking-wider text-dark/40">{item.label}</p>
              </div>
              <p className={`text-4xl font-black leading-none ${item.good&&item.pos?'text-emerald-600':item.good&&!item.pos?'text-rose-500':'text-dark'}`}>{item.val}</p>
            </div>
          ))}
        </div>

        {/* Dimension effects */}
        <div className="space-y-2">
          {[{label:`Length ${length} ft`,eff:results.le},{label:`Width ${width} ft`,eff:results.we}].map(({label,eff},i)=>(
            <div key={i} className={`flex items-center gap-3 px-4 py-3 rounded-2xl border text-[11px] font-bold ${eff.status==='favorable'?'bg-emerald-50 border-emerald-200 text-emerald-700':eff.status==='unfavorable'?'bg-rose-50 border-rose-200 text-rose-600':'bg-dark/[0.03] border-dark/8 text-dark/50'}`}>
              {eff.status==='favorable'?<FiCheckCircle size={13}/>:eff.status==='unfavorable'?<FiXCircle size={13}/>:<FiActivity size={13}/>}
              <span className="flex-1">{label}</span>
              <span className="text-[9px] opacity-60 text-right leading-snug max-w-[120px]">{eff.effect}</span>
            </div>
          ))}
        </div>

        {/* Quick info grid */}
        <div className="grid grid-cols-2 gap-2">
          {[
            {label:'Yoni',     val:`${results.yoni.name} (${results.yoni.dir})`, icon:<FiMapPin size={12}/>},
            {label:'Nakshatra',val:results.nakshatra,                             icon:<FiStar size={12}/>},
            {label:'Vara',     val:results.vara,                                  icon:<FiSun size={12}/>},
            {label:'Tithi',    val:results.tithi,                                 icon:<FiMoon size={12}/>},
            {label:'Aayul',    val:`${results.aayul} yrs`,                        icon:<FiClock size={12}/>},
            {label:'Amsham',   val:results.amsham,                                icon:<FiShield size={12}/>},
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

        {/* Score breakdown */}
        <div className="bg-white rounded-2xl border border-dark/8 overflow-hidden">
          <button onClick={()=>setShowBreakdown(b=>!b)} className="w-full flex items-center justify-between px-5 py-4 hover:bg-dark/[0.02] transition-colors">
            <div className="flex items-center gap-2">
              <FiActivity size={12} className="text-dark/30"/>
              <span className="text-[10px] font-black uppercase tracking-widest text-dark/40">Score Breakdown</span>
            </div>
            <motion.span animate={{rotate:showBreakdown?180:0}} transition={{duration:0.2}} className="text-dark/30 text-sm">▾</motion.span>
          </button>
          <AnimatePresence>
            {showBreakdown&&(
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
      </div>
    </div>
  )
}

// ── Tab: Ayadi Shadvarga (6 Formulas) ────────────────────────────────────────
function TabShadvarga({ results, length, width }) {
  const shadvarga = [
    {
      num:'01', name:'Aya', tamil:'ஆய', sanskrit:'आय',
      label:'Income / Gain',
      formula:`(Perimeter × 8) mod 12`,
      value: results.aya,
      range:'1–12',
      pass: results.ayaWins,
      detail: `Aya = ${results.aya} — ${results.ayaWins?'Aya exceeds Vyaya — auspicious':'Aya is less than Vyaya — unfavourable'}`,
      meaning:'Represents financial income and prosperity entering the structure.',
      icon:<FiTrendingUp size={16}/>,
      color: results.ayaWins ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-rose-200 bg-rose-50 text-rose-600'
    },
    {
      num:'02', name:'Vyaya', tamil:'வியய', sanskrit:'व्यय',
      label:'Expenditure / Loss',
      formula:`(Perimeter × 9) mod 10`,
      value: results.vyaya,
      range:'1–10',
      pass: results.aya > results.vyaya,
      detail:`Vyaya = ${results.vyaya} — Must be less than Aya for auspiciousness`,
      meaning:'Represents financial outflow. Should always be lower than Aya.',
      icon:<FiActivity size={16}/>,
      color: results.aya > results.vyaya ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-rose-200 bg-rose-50 text-rose-600'
    },
    {
      num:'03', name:'Yoni', tamil:'யோனி', sanskrit:'योनि',
      label:`Direction · ${results.yoni.name}`,
      formula:`(Perimeter × 3) mod 8`,
      value: results.yoni.name,
      range:'8 Directions',
      pass: results.yoni.quality==='favorable',
      detail:`${results.yoni.name} (${results.yoni.dir}) — ${results.yoni.meaning}`,
      meaning:'The directional energy of the space. Dhwaja, Vrishabha, Simha, Gaja are auspicious.',
      icon:<FiMapPin size={16}/>,
      color: results.yoni.quality==='favorable'?'border-emerald-200 bg-emerald-50 text-emerald-700':results.yoni.quality==='neutral'?'border-amber-200 bg-amber-50 text-amber-700':'border-rose-200 bg-rose-50 text-rose-600'
    },
    {
      num:'04', name:'Riksha', tamil:'ரிக்ஷா', sanskrit:'ऋक्ष',
      label:`Nakshatra · ${results.nakshatra}`,
      formula:`(Perimeter × 8) mod 27`,
      value: results.nakshatra,
      range:'27 Nakshatras',
      pass: AUSPICIOUS_NAKSHATRAS.has(results.nakshatra),
      detail:`${results.nakshatra} — ${AUSPICIOUS_NAKSHATRAS.has(results.nakshatra)?'Auspicious birth star':'Unfavourable star for construction'}`,
      meaning:'The lunar mansion associated with the structure. 15 nakshatras are auspicious for building.',
      icon:<FiStar size={16}/>,
      color: AUSPICIOUS_NAKSHATRAS.has(results.nakshatra)?'border-emerald-200 bg-emerald-50 text-emerald-700':'border-rose-200 bg-rose-50 text-rose-600'
    },
    {
      num:'05', name:'Vara', tamil:'வார', sanskrit:'वार',
      label:`Weekday · ${results.vara}`,
      formula:`(Perimeter × 9) mod 7`,
      value: results.vara,
      range:'7 Days',
      pass: AUSPICIOUS_DAYS.has(results.vara),
      detail:`${results.vara} — ${AUSPICIOUS_DAYS.has(results.vara)?'Auspicious day':'Less favourable day for construction'}`,
      meaning:'The day of the week the structure resonates with. Sun, Wed, Thu, Fri are auspicious.',
      icon:<FiSun size={16}/>,
      color: AUSPICIOUS_DAYS.has(results.vara)?'border-emerald-200 bg-emerald-50 text-emerald-700':'border-rose-200 bg-rose-50 text-rose-600'
    },
    {
      num:'06', name:'Tithi', tamil:'திதி', sanskrit:'तिथि',
      label:`Lunar Day · ${results.tithi}`,
      formula:`(Perimeter × 9) mod 30`,
      value: results.tithi,
      range:'30 Tithis',
      pass: AUSPICIOUS_TITHIS.has(results.tithiNum),
      detail:`${results.tithi} (${results.tithiNum}) — ${AUSPICIOUS_TITHIS.has(results.tithiNum)?'Auspicious lunar day':'Inauspicious lunar day'}`,
      meaning:'Lunar day associated with the dimensions. Odd tithis (1,3,5,7,10,11,12,13) are preferred.',
      icon:<FiMoon size={16}/>,
      color: AUSPICIOUS_TITHIS.has(results.tithiNum)?'border-emerald-200 bg-emerald-50 text-emerald-700':'border-rose-200 bg-rose-50 text-rose-600'
    },
  ]

  const passCount = shadvarga.filter(s=>s.pass).length

  return (
    <div className="space-y-5">
      <div className="bg-dark rounded-3xl p-5 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Ayadi Shadvarga</p>
          <p className="text-xl font-black text-white">6 Sacred Formulas</p>
          <p className="text-[11px] text-white/50 mt-1">Perimeter = {results.perimeter} ft · {length} × {width}</p>
        </div>
        <div className="text-right">
          <div className="text-4xl font-black text-white">{passCount}<span className="text-white/30 text-xl">/6</span></div>
          <p className="text-[9px] text-white/40 uppercase tracking-widest">Passed</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {shadvarga.map(s=>(
          <div key={s.num} className={`rounded-2xl border-2 p-4 ${s.color}`}>
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                {s.icon}
                <span className="text-[9px] font-black uppercase tracking-widest opacity-60">{s.num} · {s.sanskrit}</span>
              </div>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center ${s.pass?'bg-emerald-200':'bg-rose-200'}`}>
                {s.pass?<FiCheckCircle size={11} className="text-emerald-700"/>:<FiXCircle size={11} className="text-rose-600"/>}
              </div>
            </div>
            <h4 className="text-base font-black leading-tight mb-0.5">{s.name}</h4>
            <p className="text-[9px] font-bold uppercase tracking-wider opacity-60 mb-2">{s.label}</p>
            <div className="bg-white/50 rounded-xl px-3 py-2 mb-2">
              <p className="text-[9px] font-black uppercase tracking-wider opacity-50 mb-0.5">Formula</p>
              <p className="text-[10px] font-bold font-mono">{s.formula} = <strong>{s.value}</strong></p>
            </div>
            <p className="text-[10px] leading-relaxed opacity-70">{s.detail}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-dark/8 p-4">
        <p className="text-[10px] font-black uppercase tracking-widest text-dark/30 mb-3">How Shadvarga Works</p>
        <p className="text-[11px] text-dark/50 leading-relaxed">
          The Ayadi Shadvarga (six-fold measurement system) derives from classical Vastu Shastra texts like Manasara and Mayamata.
          All 6 values are calculated from the <strong className="text-dark">perimeter</strong> of the structure ({results.perimeter} ft).
          When Aya &gt; Vyaya and the Yoni is auspicious, the structure is considered to be in cosmic harmony.
        </p>
      </div>
    </div>
  )
}

// ── Tab: Optimal Dimension Finder ────────────────────────────────────────────
function TabOptimizer({ length, width }) {
  const [targetL, setTargetL] = useState(length)
  const [targetW, setTargetW] = useState(width)
  const [candidates, setCandidates] = useState([])
  const [searched, setSearched] = useState(false)

  const search = () => { setCandidates(findNearby(targetL, targetW, 6)); setSearched(true) }

  useEffect(() => { setTargetL(length); setTargetW(width) }, [length, width])

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-3xl border border-dark/8 shadow-sm p-5">
        <p className="text-[10px] font-black uppercase tracking-widest text-dark/30 mb-1">Optimal Finder</p>
        <p className="text-sm font-black text-dark mb-4">Enter your target size — find the nearest auspicious dimensions</p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-dark/35 mb-1">Target Length (ft)</p>
            <input type="number" value={targetL} onChange={e=>setTargetL(parseFloat(e.target.value)||length)}
              className="w-full px-4 py-3 rounded-2xl border-2 border-dark/10 bg-[#fafaf9] text-dark font-black text-lg outline-none focus:border-primary transition-colors"/>
          </div>
          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-dark/35 mb-1">Target Width (ft)</p>
            <input type="number" value={targetW} onChange={e=>setTargetW(parseFloat(e.target.value)||width)}
              className="w-full px-4 py-3 rounded-2xl border-2 border-dark/10 bg-[#fafaf9] text-dark font-black text-lg outline-none focus:border-primary transition-colors"/>
          </div>
        </div>
        <button onClick={search}
          className="w-full py-3 bg-dark text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-primary transition-colors active:scale-95 flex items-center justify-center gap-2">
          <FiSearch size={13}/> Find Auspicious Dimensions
        </button>
      </div>

      {searched && (
        <div className="space-y-3">
          <p className="text-[10px] font-black uppercase tracking-widest text-dark/30 px-1">
            {candidates.length > 0 ? `${candidates.length} auspicious dimensions near ${Math.round(targetL)}×${Math.round(targetW)}` : 'No auspicious dimensions found in range — try a wider search'}
          </p>
          {candidates.map((c,i)=>{
            const gc2 = GRADE[c.grade]
            return (
              <div key={i} className={`flex items-center gap-4 p-4 rounded-2xl border-2 bg-white ${i===0?'border-primary':'border-dark/8'}`}>
                {i===0&&<span className="text-lg">🥇</span>}
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xl font-black text-dark">{c.l} × {c.w} ft</span>
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-full text-white ${gc2.bg}`}>{c.grade}</span>
                    {c.isYoga&&<span className="text-[9px] font-black bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">✦ Yoga</span>}
                  </div>
                  <p className="text-[10px] text-dark/40 mt-0.5">
                    Area: {c.area} sq.ft · P: {c.perimeter} ft · Aya: {c.aya} Vyaya: {c.vyaya} · {c.yoni.name}
                  </p>
                </div>
                <div className="text-2xl font-black text-dark">{c.accuracy}<span className="text-dark/30 text-sm">/100</span></div>
              </div>
            )
          })}
        </div>
      )}

      {!searched && (
        <div className="flex items-start gap-3 px-4 py-3 bg-white rounded-2xl border border-dark/8">
          <FiZap size={13} className="text-dark/25 mt-0.5 shrink-0"/>
          <p className="text-[11px] text-dark/40 leading-relaxed">
            This tool searches ±6 ft around your target and surfaces only Good (60+) or Excellent (80+) dimensions ranked by auspiciousness score.
          </p>
        </div>
      )}
    </div>
  )
}

// ── Tab: Vastu Zones ──────────────────────────────────────────────────────────
function TabVastu({ length, width }) {
  const [activeZone, setActiveZone] = useState(null)
  const zone = activeZone !== null ? VASTU_ZONES[activeZone] : null

  return (
    <div className="space-y-5">
      <div className="bg-dark rounded-3xl p-5">
        <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Vastu Purusha Mandala</p>
        <p className="text-sm font-black text-white">Room placement guide · {length} × {width} ft</p>
        <p className="text-[10px] text-white/40 mt-1">Tap a zone to learn more</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* 3×3 Vastu Grid */}
        <div className="bg-white rounded-3xl border border-dark/8 p-4">
          <p className="text-[9px] font-black uppercase tracking-widest text-dark/30 mb-3 text-center">↑ North</p>
          <div className="grid grid-cols-3 gap-1.5">
            {VASTU_ZONES.map((z,i)=>(
              <button key={i} onClick={()=>setActiveZone(activeZone===i?null:i)}
                className={`${z.color} border-2 rounded-xl p-2 text-center transition-all active:scale-95 ${activeZone===i?'ring-2 ring-offset-1 ring-dark scale-105':''}`}>
                <p className="text-[8px] font-black">{z.dir}</p>
                <p className="text-[9px] font-black leading-tight mt-0.5">{z.deity}</p>
              </button>
            ))}
          </div>
          <p className="text-[9px] font-black uppercase tracking-widest text-dark/30 mt-3 text-center">↓ South</p>
        </div>

        {/* Zone detail */}
        <div className="space-y-3">
          {zone ? (
            <AnimatePresence mode="wait">
              <motion.div key={activeZone} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}} className={`${zone.color} rounded-2xl border-2 p-4`}>
                <div className="flex items-center gap-2 mb-2">
                  <p className={`text-xl font-black ${zone.text}`}>{zone.dir}</p>
                  <span className="text-[9px] font-black bg-white/60 px-2 py-0.5 rounded-full">{zone.element}</span>
                </div>
                <p className={`text-[10px] font-black uppercase tracking-wider opacity-60 mb-1`}>Ruling Deity</p>
                <p className={`text-base font-black ${zone.text} mb-3`}>{zone.deity}</p>
                <div className="bg-white/50 rounded-xl p-3">
                  <p className="text-[9px] font-black uppercase tracking-wider text-dark/40 mb-1">Ideal Placement</p>
                  <p className="text-[12px] font-black text-dark">{zone.ideal}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="bg-[#fafaf9] rounded-2xl border border-dark/5 p-4 h-full flex flex-col items-center justify-center text-center gap-2">
              <FiGrid size={20} className="text-dark/20"/>
              <p className="text-[11px] text-dark/30 font-bold">Select a zone on the grid to see placement guidance</p>
            </div>
          )}

          {/* Brahmasthan note */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3">
            <p className="text-[9px] font-black uppercase tracking-wider text-amber-700 mb-1">⚡ Brahmasthan</p>
            <p className="text-[10px] text-amber-700/70 leading-relaxed">The central zone must remain open and unobstructed. No columns, toilets, or kitchens here.</p>
          </div>
        </div>
      </div>

      {/* Room recommendations */}
      <div className="bg-white rounded-3xl border border-dark/8 p-5">
        <p className="text-[10px] font-black uppercase tracking-widest text-dark/30 mb-3">Recommended Room Sizes</p>
        <div className="grid grid-cols-2 gap-2">
          {roomRecommendations.map((r,i)=>(
            <div key={i} className="p-3 bg-[#fafaf9] rounded-2xl border border-dark/5">
              <p className="text-[9px] font-black uppercase tracking-wider text-dark/30 mb-1">{r.room}</p>
              <div className="space-y-0.5">
                {r.sizes.map((s,si)=><p key={si} className="text-xs font-black text-dark">{s}</p>)}
              </div>
              <p className="text-[9px] text-dark/40 mt-1 italic">{r.benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Tab: Wall Height ──────────────────────────────────────────────────────────
function TabHeight() {
  const [height, setHeight] = useState(10)
  const he = wallHeightEffects[height] || { effect:'No data for this height', status:'neutral' }
  const heightKeys = Object.keys(wallHeightEffects).map(Number)

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-3xl border border-dark/8 shadow-sm p-5">
        <p className="text-[10px] font-black uppercase tracking-widest text-dark/30 mb-1">Wall Height Checker</p>
        <p className="text-sm font-black text-dark mb-4">Select or enter ceiling height (feet)</p>

        <div className="flex gap-3 mb-4">
          <input type="number" value={height} min={6} max={30}
            onChange={e=>{ const v=parseInt(e.target.value); if(!isNaN(v)&&v>=6&&v<=30) setHeight(v) }}
            className="w-24 px-4 py-3 rounded-2xl border-2 border-dark/10 bg-[#fafaf9] text-dark font-black text-2xl outline-none focus:border-primary transition-colors text-center"/>
          <div className={`flex-1 flex items-center gap-3 px-4 py-3 rounded-2xl border-2 ${he.status==='favorable'?'border-emerald-200 bg-emerald-50 text-emerald-700':he.status==='unfavorable'?'border-rose-200 bg-rose-50 text-rose-600':'border-dark/8 bg-[#fafaf9] text-dark/50'}`}>
            {he.status==='favorable'?<FiCheckCircle size={16}/>:he.status==='unfavorable'?<FiXCircle size={16}/>:<FiActivity size={16}/>}
            <div>
              <p className="text-[9px] font-black uppercase tracking-wider opacity-60">{he.status}</p>
              <p className="text-[11px] font-bold leading-snug">{he.effect}</p>
            </div>
          </div>
        </div>

        {/* Quick-pick buttons */}
        <div className="flex flex-wrap gap-2">
          {heightKeys.map(h=>(
            <button key={h} onClick={()=>setHeight(h)}
              className={`w-10 h-10 rounded-xl text-[11px] font-black border-2 transition-all active:scale-90 ${height===h?'bg-dark text-white border-dark':wallHeightEffects[h].status==='favorable'?'border-emerald-200 bg-emerald-50 text-emerald-700 hover:border-emerald-400':wallHeightEffects[h].status==='unfavorable'?'border-rose-200 bg-rose-50 text-rose-600 hover:border-rose-400':'border-dark/8 bg-[#fafaf9] text-dark/50 hover:border-dark/20'}`}>
              {h}
            </button>
          ))}
        </div>
      </div>

      {/* All heights quick overview */}
      <div className="bg-white rounded-3xl border border-dark/8 p-5">
        <p className="text-[10px] font-black uppercase tracking-widest text-dark/30 mb-3">All Heights Overview</p>
        <div className="grid grid-cols-2 gap-2">
          {heightKeys.map(h=>{
            const e = wallHeightEffects[h]
            return (
              <button key={h} onClick={()=>setHeight(h)}
                className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all hover:shadow-md ${height===h?'border-dark bg-dark text-white':'border-dark/5 bg-[#fafaf9]'}`}>
                <span className={`text-lg font-black w-6 text-center ${height===h?'text-white':e.status==='favorable'?'text-emerald-600':e.status==='unfavorable'?'text-rose-500':'text-dark/40'}`}>{h}</span>
                <div className="flex-1 min-w-0">
                  <p className={`text-[8px] font-black uppercase tracking-wider mb-0.5 ${height===h?'text-white/50':e.status==='favorable'?'text-emerald-500':e.status==='unfavorable'?'text-rose-400':'text-dark/25'}`}>{e.status}</p>
                  <p className={`text-[9px] font-bold truncate ${height===h?'text-white/80':'text-dark/50'}`}>{e.effect}</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
          <p className="text-[9px] font-black uppercase tracking-widest text-emerald-600 mb-1">✓ Recommended</p>
          <p className="text-[11px] text-emerald-700 font-bold">8, 10, 11, 16, 17, 20–22, 27–30 ft are considered auspicious for ceilings.</p>
        </div>
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4">
          <p className="text-[9px] font-black uppercase tracking-widest text-rose-600 mb-1">✗ Avoid</p>
          <p className="text-[11px] text-rose-700 font-bold">7, 9, 15, 18, 19, 23, 24, 26 ft bring unfavourable outcomes.</p>
        </div>
      </div>
    </div>
  )
}

// ── Tab: Birth Star Compatibility ─────────────────────────────────────────────
function TabBirthStar({ results }) {
  const [birthStar, setBirthStar] = useState('')
  const [checked, setChecked] = useState(false)

  const structureNakshatra = results.nakshatra
  const structureRasi      = NAKSHATRA_RASI[structureNakshatra] || 'Unknown'

  const compatibilityCheck = () => { if (birthStar) setChecked(true) }

  const getCompatibility = (bStar, sNak) => {
    if (!bStar) return null
    const bRasi = NAKSHATRA_RASI[bStar]
    const sRasi = NAKSHATRA_RASI[sNak]
    // Simple rule: same rasi = excellent, neighbouring = good, others vary
    if (bStar === sNak) return { level:'Excellent', msg:'Your birth star matches the structure — maximum cosmic alignment.', color:'bg-emerald-50 border-emerald-200 text-emerald-700' }
    if (bRasi === sRasi) return { level:'Very Good', msg:'Same zodiac sign — strong resonance between you and the structure.', color:'bg-emerald-50 border-emerald-200 text-emerald-700' }
    if (AUSPICIOUS_NAKSHATRAS.has(bStar) && AUSPICIOUS_NAKSHATRAS.has(sNak))
      return { level:'Good', msg:'Both stars are inherently auspicious — favourable compatibility.', color:'bg-yellow-50 border-yellow-200 text-yellow-700' }
    if (AUSPICIOUS_NAKSHATRAS.has(bStar) || AUSPICIOUS_NAKSHATRAS.has(sNak))
      return { level:'Moderate', msg:'One auspicious star — partially compatible. Consider adjusting dimensions.', color:'bg-orange-50 border-orange-200 text-orange-700' }
    return { level:'Needs Review', msg:'Both stars may create conflicting energies. Consult a Vastu expert.', color:'bg-rose-50 border-rose-200 text-rose-600' }
  }

  const compat = checked && birthStar ? getCompatibility(birthStar, structureNakshatra) : null

  return (
    <div className="space-y-5">
      {/* Structure nakshatra info */}
      <div className="bg-dark rounded-3xl p-5">
        <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Structure Nakshatra</p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-black text-white">{structureNakshatra}</p>
            <p className="text-[11px] text-white/50 mt-0.5">Rasi: {structureRasi} · {AUSPICIOUS_NAKSHATRAS.has(structureNakshatra)?'✓ Auspicious':'⚠ Inauspicious'}</p>
          </div>
          <FiStar size={28} className="text-white/20"/>
        </div>
      </div>

      {/* Birth star selector */}
      <div className="bg-white rounded-3xl border border-dark/8 shadow-sm p-5">
        <p className="text-[10px] font-black uppercase tracking-widest text-dark/30 mb-1">Your Birth Star</p>
        <p className="text-sm font-black text-dark mb-4">Select your Janma Nakshatra for compatibility check</p>
        <select value={birthStar} onChange={e=>{setBirthStar(e.target.value);setChecked(false)}}
          className="w-full px-4 py-3 rounded-2xl border-2 border-dark/10 bg-[#fafaf9] text-dark font-bold outline-none focus:border-primary transition-colors mb-3 appearance-none">
          <option value="">-- Select your Nakshatra --</option>
          {NAKSATRAS.map(n=>(
            <option key={n} value={n}>{n}{AUSPICIOUS_NAKSHATRAS.has(n)?' ✓':''}</option>
          ))}
        </select>
        <button onClick={compatibilityCheck} disabled={!birthStar}
          className="w-full py-3 bg-dark text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-primary transition-colors active:scale-95 disabled:opacity-30 flex items-center justify-center gap-2">
          <FiShield size={13}/> Check Compatibility
        </button>
      </div>

      {/* Compatibility result */}
      {compat && (
        <AnimatePresence>
          <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}
            className={`rounded-2xl border-2 p-5 ${compat.color}`}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xl font-black">{compat.level}</p>
              <span className="text-lg">{compat.level==='Excellent'?'🌟':compat.level==='Very Good'?'✨':compat.level==='Good'?'👍':compat.level==='Moderate'?'⚠️':'🔄'}</span>
            </div>
            <p className="text-[9px] font-black uppercase tracking-wider opacity-60 mb-1">{birthStar} ↔ {structureNakshatra}</p>
            <p className="text-[11px] leading-relaxed">{compat.msg}</p>
          </motion.div>
        </AnimatePresence>
      )}

      {/* All 27 nakshatras grid */}
      <div className="bg-white rounded-3xl border border-dark/8 p-5">
        <p className="text-[10px] font-black uppercase tracking-widest text-dark/30 mb-3">All 27 Nakshatras</p>
        <div className="grid grid-cols-3 gap-1.5">
          {NAKSATRAS.map((n,i)=>(
            <button key={n} onClick={()=>{setBirthStar(n);setChecked(false)}}
              className={`text-left px-2.5 py-2 rounded-xl border text-[9px] font-bold transition-all ${birthStar===n?'bg-dark text-white border-dark':AUSPICIOUS_NAKSHATRAS.has(n)?'bg-emerald-50 border-emerald-200 text-emerald-700 hover:border-emerald-400':'bg-[#fafaf9] border-dark/5 text-dark/50 hover:border-dark/15'}`}>
              <span className="text-[7px] opacity-40 block">{String(i+1).padStart(2,'0')}</span>
              {n}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 mt-3">
          <div className="w-3 h-3 rounded-full bg-emerald-200 border border-emerald-300"/>
          <p className="text-[9px] text-dark/30 font-bold">= Auspicious for construction</p>
        </div>
      </div>
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────
const ManaiyadiCalculator = () => {
  const [length,      setLength]      = useState(20)
  const [width,       setWidth]       = useState(16)
  const [lenForce,    setLenForce]    = useState(20)
  const [widForce,    setWidForce]    = useState(16)
  const [activePreset,setActivePreset]= useState('Living Room')
  const [activeTab,   setActiveTab]   = useState('calculator')

  const results = computeAyadi(length, width)
  const gc = GRADE[results.grade]

  return (
    <div className="w-full space-y-4">
      {/* Top summary bar */}
      <div className={`rounded-3xl p-4 ${gc.bg} flex items-center justify-between gap-4 flex-wrap`}>
        <div className="flex items-center gap-3">
          <span className="text-2xl">{gc.emoji}</span>
          <div>
            <p className="text-white font-black text-lg leading-none">{length} × {width} ft · {results.grade}</p>
            <p className="text-white/60 text-[10px] font-bold mt-0.5">
              Area {results.area} sq.ft · P={results.perimeter} ft · Aya {results.aya} vs Vyaya {results.vyaya}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-right mr-2">
            <span className="text-3xl font-black text-white">{results.accuracy}</span>
            <span className="text-white/40 text-sm">/100</span>
          </div>
          {results.isYoga && <span className="text-[9px] font-black bg-white/20 text-white px-2 py-1 rounded-full">✦ Yoga</span>}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-1.5 pb-1 no-scrollbar">
        {TABS.map(t=>(
          <button key={t.id} onClick={()=>setActiveTab(t.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider whitespace-nowrap transition-all border ${activeTab===t.id?'bg-dark text-white border-dark':'bg-white text-dark/50 border-dark/8 hover:border-dark/20 hover:text-dark'}`}>
            {t.icon}{t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div key={activeTab} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:0.18}}>
          {activeTab==='calculator' && (
            <TabCalculator
              length={length} width={width}
              lenForce={lenForce} widForce={widForce}
              setLength={setLength} setWidth={setWidth}
              setLenForce={setLenForce} setWidForce={setWidForce}
              activePreset={activePreset} setActivePreset={setActivePreset}
              results={results}
            />
          )}
          {activeTab==='shadvarga'  && <TabShadvarga  results={results} length={length} width={width}/>}
          {activeTab==='optimizer'  && <TabOptimizer  length={length} width={width}/>}
          {activeTab==='vastu'      && <TabVastu      length={length} width={width}/>}
          {activeTab==='height'     && <TabHeight/>}
          {activeTab==='birthstar'  && <TabBirthStar  results={results}/>}
        </motion.div>
      </AnimatePresence>

      <p className="text-center text-[9px] font-bold text-dark/20 uppercase tracking-[0.4em] pb-2">
        Based on Manaiyadi Shastram · Ayadi Shadvarga · Vastu Purusha Mandala
      </p>
    </div>
  )
}

export default ManaiyadiCalculator
