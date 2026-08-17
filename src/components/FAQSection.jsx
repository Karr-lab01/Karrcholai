/**
 * FAQSection — reusable, animated accordion FAQ block
 *
 * Props:
 *  faqs        — [{ q, a }]  (required)
 *  title       — section heading  (default: "Frequently Asked Questions")
 *  subtitle    — small label above title (default: "FAQ")
 *  accent      — hex accent colour (default: #B85C38)
 *  dark        — boolean — use dark bg variant (default: false)
 *  schema      — boolean — inject FAQ schema into Helmet (default: true)
 *  className   — extra wrapper classes
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'

const DEFAULT_ACCENT = '#B85C38'

// ── Individual item ──────────────────────────────────────────────────────────
function FAQItem({ q, a, accent, dark, index }) {
  const [open, setOpen] = useState(false)

  const borderClr  = dark ? 'rgba(255,255,255,0.07)' : 'rgba(26,26,26,0.07)'
  const questionClr = dark
    ? open ? '#ffffff' : 'rgba(232,229,223,0.75)'
    : open ? '#1a1a1a' : 'rgba(26,26,26,0.75)'
  const answerClr  = dark ? 'rgba(232,229,223,0.5)' : 'rgba(26,26,26,0.5)'
  const numClr     = open ? accent : dark ? 'rgba(255,255,255,0.18)' : 'rgba(26,26,26,0.2)'

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="border-b last:border-0 cursor-pointer select-none"
      style={{ borderColor: borderClr }}
      onClick={() => setOpen(v => !v)}
    >
      {/* Question row */}
      <div className="flex items-center gap-4 py-5">
        {/* Number */}
        <span
          className="text-[11px] font-black tabular-nums flex-shrink-0 w-6 transition-colors duration-300"
          style={{ color: numClr }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Question */}
        <span
          className="flex-1 text-sm font-bold leading-snug transition-colors duration-300"
          style={{ color: questionClr }}
        >
          {q}
        </span>

        {/* Toggle button */}
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.28 }}
          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
          style={{
            background: open ? accent : dark ? 'rgba(255,255,255,0.06)' : 'rgba(26,26,26,0.06)',
            border: `1px solid ${open ? accent : dark ? 'rgba(255,255,255,0.1)' : 'rgba(26,26,26,0.1)'}`,
          }}
        >
          <span
            className="text-sm font-black leading-none"
            style={{ color: open ? '#fff' : dark ? 'rgba(255,255,255,0.6)' : 'rgba(26,26,26,0.5)' }}
          >
            +
          </span>
        </motion.div>
      </div>

      {/* Answer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p
              className="text-sm font-light leading-relaxed pb-5 pl-10"
              style={{ color: answerClr }}
            >
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ── Main export ──────────────────────────────────────────────────────────────
export default function FAQSection({
  faqs = [],
  title = 'Frequently Asked Questions',
  subtitle = 'FAQ',
  accent = DEFAULT_ACCENT,
  dark = false,
  schema = true,
  className = '',
}) {
  const bg      = dark ? '#1a1a1a' : '#ffffff'
  const headClr = dark ? '#ffffff' : '#1a1a1a'

  return (
    <>
      {/* FAQ JSON-LD schema */}
      {schema && faqs.length > 0 && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map(({ q, a }) => ({
              '@type': 'Question',
              name: q,
              acceptedAnswer: { '@type': 'Answer', text: a },
            })),
          })}</script>
        </Helmet>
      )}

      <section
        className={`py-20 md:py-28 px-6 md:px-12 ${className}`}
        style={{ background: bg }}
        aria-label="Frequently Asked Questions"
      >
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-12 md:mb-16"
          >
            <div className="flex items-center gap-3 mb-4">
              <span
                className="h-[2px] w-8 rounded-full"
                style={{ background: accent }}
              />
              <span
                className="text-[10px] font-black tracking-[0.38em] uppercase"
                style={{ color: accent }}
              >
                {subtitle}
              </span>
            </div>
            <h2
              className="text-3xl md:text-5xl font-black leading-tight tracking-tighter"
              style={{ color: headClr }}
            >
              {title}
            </h2>
          </motion.div>

          {/* Items */}
          <div>
            {faqs.map((item, i) => (
              <FAQItem
                key={i}
                q={item.q}
                a={item.a}
                accent={accent}
                dark={dark}
                index={i}
              />
            ))}
          </div>

          {/* Footer note */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-10 p-5 rounded-2xl"
            style={{
              background: dark ? 'rgba(255,255,255,0.04)' : `${accent}08`,
              border: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : `${accent}18`}`,
            }}
          >
            <p
              className="text-xs font-bold mb-1"
              style={{ color: dark ? 'rgba(255,255,255,0.7)' : '#1a1a1a' }}
            >
              Still have questions?
            </p>
            <p
              className="text-[11px] font-light leading-relaxed"
              style={{ color: dark ? 'rgba(255,255,255,0.35)' : 'rgba(26,26,26,0.45)' }}
            >
              Call us at{' '}
              <a
                href="tel:+919741416747"
                className="font-bold underline"
                style={{ color: accent }}
              >
                +91 97414 16747
              </a>{' '}
              or email{' '}
              <a
                href="mailto:karrcholai@gmail.com"
                className="font-bold underline"
                style={{ color: accent }}
              >
                karrcholai@gmail.com
              </a>
              . Our team is happy to help.
            </p>
          </motion.div>

        </div>
      </section>
    </>
  )
}
