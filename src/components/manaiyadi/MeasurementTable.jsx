import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSearch, FiCheck, FiX, FiMinus, FiArrowRight, FiActivity, FiArrowUp, FiInfo } from 'react-icons/fi'
import { measurementEffects, wallHeightEffects } from '../../data/manaiyadiData'
import staircase from '../../assets/minimalist_luxury_staircase.png'

const MeasurementTable = () => {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [activeHeight, setActiveHeight] = useState(10)
  const [showAllCards, setShowAllCards] = useState(false)

  const measurements = Object.entries(measurementEffects).map(([ft, data]) => ({
    ft: parseInt(ft),
    ...data
  }))

  const filteredMeasurements = measurements.filter(m => {
    const matchesSearch = m.ft.toString().includes(search)
    const matchesFilter = filter === 'all' || m.status === filter
    return matchesSearch && matchesFilter
  })

  const StatusIcon = ({ status }) => {
    if (status === 'favorable') return <FiCheck className="text-primary" />
    if (status === 'unfavorable') return <FiX className="text-secondary" />
    return <FiMinus className="text-dark/20" />
  }

  return (
    <div className="space-y-24 md:space-y-48">
      {/* 01. Comprehensive Dimension Guide */}
      <section className="px-0 sm:px-4">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end gap-12 mb-12 md:mb-16 px-6 sm:px-0">
          <div className="max-w-xl text-center lg:text-left">
            <h3 className="text-secondary font-black tracking-[0.5em] uppercase text-[10px] mb-4">Reference 01</h3>
            <h2 className="text-4xl md:text-7xl font-black text-dark leading-[0.9] tracking-tighter uppercase">
              Dimension <br /> <span className="text-transparent stroke-text-dark italic">Guide.</span>
            </h2>
          </div>

          <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-4">
             <div className="relative group">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/20 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Find feet..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12 pr-6 py-4 bg-white border border-dark/5 rounded-full text-sm focus:outline-none focus:border-primary w-full sm:w-64 transition-all shadow-sm"
              />
            </div>
            <div className="flex flex-wrap justify-center lg:justify-start bg-white p-1.5 rounded-[2rem] sm:rounded-full border border-dark/5 shadow-sm">
              {['all', 'favorable', 'unfavorable'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`flex-1 sm:flex-none px-4 md:px-6 py-2.5 md:py-3 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all ${filter === f ? 'bg-dark text-white shadow-lg' : 'text-dark/40 hover:text-dark'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* MOBILE VIEW: Card List (More User Friendly) */}
        <div className="block md:hidden space-y-4 px-6">
           <AnimatePresence mode="popLayout">
              {filteredMeasurements.slice(0, showAllCards ? undefined : 6).map((item) => (
                 <motion.div
                    key={item.ft}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white p-5 rounded-[1.5rem] border border-dark/5 shadow-md relative overflow-hidden"
                 >
                    <div className={`absolute top-0 right-0 w-1.5 h-full ${item.status === 'favorable' ? 'bg-primary/20' : item.status === 'unfavorable' ? 'bg-secondary/20' : 'bg-dark/5'}`} />
                    <div className="flex items-center justify-between mb-3">
                       <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-black text-dark">{item.ft}</span>
                          <span className="text-[9px] font-bold text-dark/20 uppercase">ft</span>
                       </div>
                       <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[8px] font-black uppercase tracking-widest ${item.status === 'favorable' ? 'bg-primary/5 border-primary/20 text-primary' : item.status === 'unfavorable' ? 'bg-secondary/5 border-secondary/20 text-secondary' : 'bg-dark/5 border-dark/10 text-dark/40'}`}>
                          <StatusIcon status={item.status} />
                          {item.status}
                       </div>
                    </div>
                    <p className="text-xs font-medium text-dark/60 leading-relaxed italic">
                       "{item.effect}"
                    </p>
                 </motion.div>
              ))}
           </AnimatePresence>

           {!showAllCards && filteredMeasurements.length > 6 && (
              <button 
                onClick={() => setShowAllCards(true)}
                className="w-full py-4 mt-4 bg-dark text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg flex items-center justify-center gap-3 active:scale-95 transition-transform"
              >
                Show All Measurements ({filteredMeasurements.length} items)
                <FiArrowRight />
              </button>
           )}
        </div>

        {/* DESKTOP VIEW: Professional Table */}
        <div className="hidden md:block bg-white rounded-[3rem] border border-dark/5 shadow-2xl overflow-hidden">
          <div className="max-h-[600px] overflow-y-auto hide-scrollbar">
            <table className="w-full border-collapse">
              <thead className="sticky top-0 z-10 bg-dark text-white">
                <tr>
                  <th className="px-10 py-6 text-left text-[10px] font-black uppercase tracking-[0.3em]">Dimension</th>
                  <th className="px-10 py-6 text-left text-[10px] font-black uppercase tracking-[0.3em]">Effect / Result</th>
                  <th className="px-10 py-6 text-right text-[10px] font-black uppercase tracking-[0.3em]">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark/5">
                <AnimatePresence mode="popLayout">
                  {filteredMeasurements.map((item) => (
                    <motion.tr 
                      key={item.ft}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="group hover:bg-cream/50 transition-colors"
                    >
                      <td className="px-10 py-8">
                        <span className="text-3xl font-black text-dark group-hover:text-primary transition-colors">{item.ft}<span className="text-sm ml-1 text-dark/20 group-hover:text-primary/30">ft</span></span>
                      </td>
                      <td className="px-10 py-8">
                        <p className="text-sm font-medium text-dark/60 leading-relaxed max-w-md">{item.effect}</p>
                      </td>
                      <td className="px-10 py-8 text-right">
                        <div className={`inline-flex items-center gap-3 px-6 py-2 rounded-full border ${item.status === 'favorable' ? 'bg-primary/5 border-primary/20 text-primary' : item.status === 'unfavorable' ? 'bg-secondary/5 border-secondary/20 text-secondary' : 'bg-dark/5 border-dark/10 text-dark/40'}`}>
                          <StatusIcon status={item.status} />
                          <span className="text-[10px] font-black uppercase tracking-widest">{item.status}</span>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 02. Interactive Vertical Elevation */}
      <section className="relative px-6 py-24 md:py-32 overflow-hidden rounded-[3rem] md:rounded-[4rem]">
        {/* Atmospheric Background Image */}
        <div className="absolute inset-0 z-0">
           <img src={staircase} alt="" className="w-full h-full object-cover opacity-10 blur-xl" />
           <div className="absolute inset-0 bg-gradient-to-b from-[#fdfbf7] via-transparent to-[#fdfbf7]"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 md:mb-20">
             <h3 className="text-secondary font-black tracking-[0.5em] uppercase text-[10px] mb-4">Reference 02</h3>
             <h2 className="text-4xl md:text-7xl font-black text-dark tracking-tighter uppercase leading-none">
                Wall <span className="text-primary italic">Height.</span>
             </h2>
             <p className="mt-6 text-dark/40 text-base md:text-lg font-light max-w-2xl mx-auto italic">
                Recommended ceiling heights according to traditional Manaiyadi practice.
             </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            {/* SELECTOR: Horizontal Swipe Ruler */}
            <div className="lg:hidden flex overflow-x-auto gap-3 pb-4 no-scrollbar -mx-6 px-6">
               {Object.keys(wallHeightEffects).map((ft) => (
                  <button
                     key={ft}
                     onClick={() => {
                        setActiveHeight(ft);
                        document.getElementById('result-view')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                     }}
                     className={`flex-shrink-0 w-14 h-14 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 border ${activeHeight == ft ? 'bg-dark border-dark text-white shadow-xl scale-105' : 'bg-white border-dark/5 text-dark/40'}`}
                  >
                     <span className="text-base font-black">{ft}</span>
                     <span className="text-[7px] font-bold uppercase">Feet</span>
                  </button>
               ))}
            </div>

            {/* DESKTOP SELECTOR: Ruler */}
            <div className="hidden lg:col-span-4 lg:flex bg-dark rounded-[3rem] p-10 flex-col justify-between relative overflow-hidden grain shadow-2xl">
              <div className="relative z-10">
                <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] mb-12">Height Selector</h4>
                <div className="flex flex-wrap gap-3">
                  {Object.keys(wallHeightEffects).map((ft) => (
                    <button
                      key={ft}
                      onMouseEnter={() => setActiveHeight(ft)}
                      onClick={() => setActiveHeight(ft)}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-black transition-all duration-300 border ${activeHeight == ft ? 'bg-primary border-primary text-white scale-110 shadow-lg shadow-primary/20' : 'bg-white/5 border-white/10 text-white/40 hover:border-white/30 hover:text-white'}`}
                    >
                      {ft}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mt-16 relative z-10 pt-12 border-t border-white/5">
                <div className="flex items-center gap-4 text-white/20 mb-6">
                   <FiActivity size={24} />
                   <span className="text-[9px] font-black uppercase tracking-[0.3em]">Height Guidelines</span>
                </div>
                <p className="text-white/60 text-sm font-light leading-relaxed">
                  Wall height is an important factor in Manaiyadi calculations. Selecting a recommended height supports favourable outcomes for the household.
                </p>
              </div>
              <div className="absolute bottom-0 right-0 p-12 opacity-5 text-white"><FiArrowUp size={200} /></div>
            </div>

            <div id="result-view" className="lg:col-span-8 space-y-4">
               {/* Result Card */}
               <div className="bg-white rounded-[2rem] md:rounded-[3rem] border border-dark/5 p-6 md:p-12 shadow-xl relative overflow-hidden group">
                  <div className={`absolute top-0 right-0 w-64 h-64 -mr-32 -mt-32 rounded-full blur-[100px] opacity-10 transition-colors duration-1000 ${wallHeightEffects[activeHeight].status === 'favorable' ? 'bg-primary' : wallHeightEffects[activeHeight].status === 'unfavorable' ? 'bg-secondary' : 'bg-dark'}`} />
                  
                  <div className="relative z-10">
                     <div className={`inline-flex items-center gap-3 px-6 py-2 rounded-full border mb-4 md:mb-8 ${wallHeightEffects[activeHeight].status === 'favorable' ? 'bg-primary/5 border-primary/20 text-primary' : wallHeightEffects[activeHeight].status === 'unfavorable' ? 'bg-secondary/5 border-secondary/20 text-secondary' : 'bg-dark/5 border-dark/10 text-dark/40'}`}>
                        <StatusIcon status={wallHeightEffects[activeHeight].status} />
                        <span className="text-[10px] font-black uppercase tracking-widest">{wallHeightEffects[activeHeight].status}</span>
                     </div>
                     <h3 className="text-3xl md:text-6xl font-black text-dark tracking-tighter uppercase mb-4 md:mb-6">{activeHeight} Feet <span className="text-primary italic">Height.</span></h3>
                     <p className="text-lg md:text-xl text-dark/60 font-light leading-relaxed max-w-xl italic">
                       "{wallHeightEffects[activeHeight].effect}"
                     </p>
                  </div>
               </div>

               {/* Quick Info Grid */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Warning Card */}
                  <div className="bg-secondary/5 border border-secondary/10 rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between text-secondary">
                    <div className="flex justify-between items-start mb-6">
                       <span className="text-3xl font-black tracking-tighter italic uppercase">Warning.</span>
                       <FiX size={24} />
                    </div>
                    <p className="text-xs font-bold leading-relaxed opacity-80">
                      Heights of 7, 9, 15, 18, 19, 23, 24, and 26 feet are traditionally considered unfavourable for residential buildings.
                    </p>
                  </div>

                  {/* Pro Tip Card */}
                  <div className="bg-primary/5 border border-primary/10 rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between text-primary">
                    <div className="flex justify-between items-start mb-6">
                       <span className="text-3xl font-black tracking-tighter italic uppercase">Pro Tip.</span>
                       <FiCheck size={24} />
                    </div>
                    <p className="text-xs font-bold leading-relaxed opacity-80">
                      A 10-foot ceiling is widely recommended for residential homes — balancing comfort, proportion, and traditional practice.
                    </p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default MeasurementTable
