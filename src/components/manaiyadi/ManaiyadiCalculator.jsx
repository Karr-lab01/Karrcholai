import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSliders, FiActivity, FiShield, FiTrendingUp, FiMapPin, FiClock, FiCheckCircle, FiXCircle } from 'react-icons/fi'
import { measurementEffects } from '../../data/manaiyadiData'

const ManaiyadiCalculator = () => {
  const [length, setLength] = useState(21)
  const [width, setWidth] = useState(16)
  const [results, setResults] = useState(null)

  const calculateSastram = () => {
    const area = length * width
    const ayam = (area * 8) % 12
    const vyayam = (area * 9) % 10
    const yoni = (area * 3) % 8
    const nakshatraNum = (area * 8) % 27
    const aayul = (area * 8) % 120
    const vaaram = (area * 9) % 7
    const amsham = (area * 4) % 9

    const naksatras = [
      "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashirsha", "Ardra", "Punarvasu", "Pushya", "Ashlesha",
      "Magha", "Purva Phalguni", "Uttara Phalguni", "Hasta", "Chitra", "Svati", "Vishakha", "Anuradha", "Jyeshtha",
      "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"
    ]
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const yonis = ["Kaka (NE)", "Garuda (East)", "Dhuma (SE)", "Simha (South)", "Shwana (SW)", "Vrisha (West)", "Khara (NW)", "Gaja (North)"]

    setResults({
      area,
      ayam: ayam === 0 ? 12 : ayam,
      vyayam: vyayam === 0 ? 10 : vyayam,
      yoni: yonis[yoni],
      nakshatra: naksatras[nakshatraNum],
      aayul: aayul === 0 ? 120 : aayul,
      vaaram: weekdays[vaaram],
      amsham: amsham === 0 ? 9 : amsham,
      isAuspicious: ayam > vyayam && [1, 3, 5, 7].includes(yoni),
      lengthEffect: measurementEffects[length] || { effect: "Neutral Influence", status: "neutral" },
      widthEffect: measurementEffects[width] || { effect: "Neutral Influence", status: "neutral" }
    })
  }

  useEffect(() => {
    calculateSastram()
  }, [length, width])

  return (
    <div className="relative group">
      {/* Decorative backdrop glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-75 transition duration-1000"></div>
      
      <div className="relative bg-white/80 backdrop-blur-2xl rounded-[2.5rem] md:rounded-[3rem] border border-white p-6 md:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden grain">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Controls - Left side (4 cols) */}
          <div className="lg:col-span-5 space-y-10">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-dark flex items-center justify-center text-white">
                <FiSliders size={18} />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-black text-dark tracking-tight uppercase">Configuration</h3>
                <p className="text-[9px] md:text-[10px] font-bold text-dark/30 tracking-[0.2em] uppercase">Set your dimensions</p>
              </div>
            </div>

            <div className="space-y-12">
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <label className="text-[11px] font-black uppercase tracking-widest text-dark/40">Length Dimension</label>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-dark leading-none">{length}</span>
                    <span className="text-xs font-bold text-dark/20 uppercase tracking-tighter">Feet</span>
                  </div>
                </div>
                <div className="relative h-1.5 w-full bg-dark/5 rounded-full overflow-hidden">
                  <motion.div 
                    className="absolute h-full bg-secondary"
                    initial={{ width: 0 }}
                    animate={{ width: `${(length / 100) * 100}%` }}
                    transition={{ type: "spring", stiffness: 100 }}
                  />
                  <input 
                    type="range" min="6" max="100" value={length} 
                    onChange={(e) => setLength(parseInt(e.target.value))}
                    className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <label className="text-[11px] font-black uppercase tracking-widest text-dark/40">Width Dimension</label>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-dark leading-none">{width}</span>
                    <span className="text-xs font-bold text-dark/20 uppercase tracking-tighter">Feet</span>
                  </div>
                </div>
                <div className="relative h-1.5 w-full bg-dark/5 rounded-full overflow-hidden">
                  <motion.div 
                    className="absolute h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${(width / 100) * 100}%` }}
                    transition={{ type: "spring", stiffness: 100 }}
                  />
                  <input 
                    type="range" min="6" max="100" value={width} 
                    onChange={(e) => setWidth(parseInt(e.target.value))}
                    className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
                  />
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-dark/5">
              <div className="flex items-start gap-4 p-6 bg-dark/[0.02] rounded-3xl border border-dark/5">
                <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                  <FiActivity size={16} />
                </div>
                <p className="text-[11px] text-dark/50 leading-relaxed font-medium">
                  Manaiyadi calculations compare <span className="text-dark font-black">Ayam (income)</span> and <span className="text-dark font-black">Vyayam (expense)</span>. A favourable result typically means Ayam is greater than Vyayam.
                </p>
              </div>
            </div>
          </div>

          {/* Visualization - Right side (7 cols) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {results && (
                <motion.div 
                  key={`${length}-${width}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="h-full flex flex-col"
                >
                  {/* Result Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="px-6 py-2 bg-dark rounded-full">
                      <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">{results.area} SQ.FT TOTAL</span>
                    </div>
                    <div className={`flex items-center gap-2 ${results.isAuspicious ? 'text-primary' : 'text-secondary'}`}>
                      <FiShield size={18} />
                      <span className="text-[11px] font-black uppercase tracking-[0.3em]">{results.isAuspicious ? 'Favourable Result' : 'Review Recommended'}</span>
                    </div>
                  </div>

                  {/* Main Metrics Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <div className="p-6 md:p-8 bg-cream/50 rounded-[2rem] md:rounded-[2.5rem] border border-dark/5 group/card hover:bg-primary transition-all duration-500">
                      <p className="text-[9px] font-black text-dark/30 uppercase tracking-widest mb-3 md:mb-4 group-hover/card:text-white/40">Ayam (Income)</p>
                      <div className="text-4xl md:text-5xl font-black text-primary group-hover/card:text-white transition-colors">{results.ayam}</div>
                      <div className="mt-4 w-8 h-1 bg-primary group-hover/card:bg-white transition-all"></div>
                    </div>
                    <div className="p-6 md:p-8 bg-cream/50 rounded-[2rem] md:rounded-[2.5rem] border border-dark/5 group/card hover:bg-secondary transition-all duration-500">
                      <p className="text-[9px] font-black text-dark/30 uppercase tracking-widest mb-3 md:mb-4 group-hover/card:text-white/40">Vyayam (Expense)</p>
                      <div className="text-4xl md:text-5xl font-black text-secondary group-hover/card:text-white transition-colors">{results.vyayam}</div>
                      <div className="mt-4 w-8 h-1 bg-secondary group-hover/card:bg-white transition-all"></div>
                    </div>
                  </div>

                  {/* Secondary Details */}
                  <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                    {[
                      { label: 'Direction', val: results.yoni, icon: <FiMapPin /> },
                      { label: 'Nakshatra', val: results.nakshatra, icon: <FiTrendingUp /> },
                      { label: 'Aayul', val: `${results.aayul} yrs`, icon: <FiClock /> },
                      { label: 'Amsham', val: results.amsham, icon: <FiShield /> }
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col items-center justify-center p-6 bg-white border border-dark/5 rounded-[2rem] hover:shadow-xl transition-all duration-300">
                        <div className="text-dark/20 mb-3">{item.icon}</div>
                        <p className="text-[8px] font-black uppercase tracking-widest text-dark/30 mb-1">{item.label}</p>
                        <p className="text-[11px] font-black text-dark uppercase tracking-tighter text-center">{item.val}</p>
                      </div>
                    ))}
                  </div>

                  {/* Effects Summary */}
                  <div className="space-y-4">
                    <div className={`p-4 rounded-2xl border flex items-center gap-4 ${results.lengthEffect.status === 'favorable' ? 'bg-primary/5 border-primary/20 text-primary' : results.lengthEffect.status === 'unfavorable' ? 'bg-secondary/5 border-secondary/20 text-secondary' : 'bg-dark/5 border-dark/10 text-dark/60'}`}>
                      {results.lengthEffect.status === 'favorable' ? <FiCheckCircle size={14}/> : results.lengthEffect.status === 'unfavorable' ? <FiXCircle size={14}/> : <FiActivity size={14}/>}
                      <p className="text-[10px] font-bold uppercase tracking-wider">Length ({length}ft): {results.lengthEffect.effect}</p>
                    </div>
                    <div className={`p-4 rounded-2xl border flex items-center gap-4 ${results.widthEffect.status === 'favorable' ? 'bg-primary/5 border-primary/20 text-primary' : results.widthEffect.status === 'unfavorable' ? 'bg-secondary/5 border-secondary/20 text-secondary' : 'bg-dark/5 border-dark/10 text-dark/60'}`}>
                      {results.widthEffect.status === 'favorable' ? <FiCheckCircle size={14}/> : results.widthEffect.status === 'unfavorable' ? <FiXCircle size={14}/> : <FiActivity size={14}/>}
                      <p className="text-[10px] font-bold uppercase tracking-wider">Width ({width}ft): {results.widthEffect.effect}</p>
                    </div>
                  </div>

                  {/* Bottom Message */}
                  <div className="mt-8 text-center">
                    <p className="text-[9px] font-bold text-dark/20 uppercase tracking-[0.4em]">Based on traditional Manaiyadi formulas</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManaiyadiCalculator
