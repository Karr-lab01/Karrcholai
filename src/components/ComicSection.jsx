import React from 'react';
import { motion } from 'framer-motion';

var FOREST = '#2D4B37';
var TERRA = '#B85C38';
var CREAM = '#FAF9F6';
var INK = '#1A1A1A';

function Reveal(p) {
  return React.createElement(motion.div, {
    initial: { opacity: 0, y: p.y || 26 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0.6, delay: p.delay || 0, ease: [0.16, 1, 0.3, 1] },
    style: p.style || {}
  }, p.children);
}

function Avatar(p) {
  var sz = p.size || 44;
  return React.createElement('div', {
    style: {
      width: sz, height: sz, borderRadius: '50%', background: p.bg, flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontWeight: 900, fontSize: Math.round(sz * 0.38), color: '#fff',
      fontFamily: 'Barlow, sans-serif'
    }
  }, p.init);
}

function Talk(p) {
  var isRight = p.side === 'right';
  return React.createElement(Reveal, { delay: p.delay || 0 },
    React.createElement('div', {
      style: { display: 'flex', flexDirection: 'column', alignItems: isRight ? 'flex-end' : 'flex-start', gap: 8 }
    },
      React.createElement('div', {
        style: { display: 'flex', alignItems: 'center', gap: 10, flexDirection: isRight ? 'row-reverse' : 'row' }
      },
        React.createElement(Avatar, { init: p.name[0], bg: p.bg, size: 44 }),
        React.createElement('div', { style: { textAlign: isRight ? 'right' : 'left' } },
          React.createElement('p', { style: { fontSize: 13, fontWeight: 800, color: INK, margin: 0, lineHeight: 1 } }, p.name),
          React.createElement('p', { style: { fontSize: 9, fontWeight: 700, color: TERRA, margin: '3px 0 0', textTransform: 'uppercase', letterSpacing: '0.2em' } }, p.role)
        )
      ),
      React.createElement('div', {
        style: {
          background: '#fff', border: '1.5px solid rgba(0,0,0,0.08)',
          borderRadius: isRight ? '18px 4px 18px 18px' : '4px 18px 18px 18px',
          padding: '14px 18px', maxWidth: '85%', boxShadow: '0 2px 12px rgba(0,0,0,0.05)'
        }
      },
        React.createElement('p', { style: { fontSize: 14, color: INK, lineHeight: 1.65, margin: 0, fontStyle: 'italic', opacity: 0.8 } }, '"' + p.text + '"')
      )
    )
  );
}

function Scene(p) {
  return React.createElement(Reveal, { delay: p.delay || 0 },
    React.createElement('div', {
      style: { borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 3px 20px rgba(0,0,0,0.06)' }
    },
      React.createElement('div', {
        style: {
          background: p.gradient, padding: '32px 24px 24px', position: 'relative',
          minHeight: 120, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 6
        }
      },
        React.createElement('div', {
          style: { position: 'absolute', top: -8, right: 20, fontSize: 88, opacity: 0.1, lineHeight: 1, userSelect: 'none' }
        }, p.icon),
        React.createElement('span', {
          style: { fontSize: 9, fontWeight: 900, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }
        }, p.label),
        React.createElement('h3', {
          style: { fontSize: 'clamp(1.2rem,2.8vw,1.8rem)', fontWeight: 900, color: '#fff', margin: 0, lineHeight: 1.15 }
        }, p.title)
      ),
      React.createElement('div', { style: { background: '#fff', padding: '18px 22px' } },
        React.createElement('p', { style: { fontSize: 14, color: INK, opacity: 0.62, lineHeight: 1.75, margin: 0 } }, p.body)
      )
    )
  );
}

function Chapter(p) {
  return React.createElement(Reveal, { delay: p.delay || 0 },
    React.createElement('div', null,
      React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', gap: 18 } },
        React.createElement('div', {
          style: {
            width: 52, height: 52, borderRadius: '50%', background: FOREST, flexShrink: 0,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
          }
        },
          React.createElement('span', { style: { fontSize: 7, fontWeight: 900, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.15em' } }, 'CH'),
          React.createElement('span', { style: { fontSize: 17, fontWeight: 900, color: '#fff', lineHeight: 1 } }, p.n)
        ),
        React.createElement('div', { style: { paddingTop: 4 } },
          React.createElement('p', { style: { fontSize: 9, fontWeight: 700, color: TERRA, textTransform: 'uppercase', letterSpacing: '0.35em', margin: '0 0 4px' } }, p.sub),
          React.createElement('h2', { style: { fontSize: 'clamp(1.3rem,3.2vw,2rem)', fontWeight: 900, color: INK, margin: 0, lineHeight: 1.1, letterSpacing: '-0.02em' } }, p.title)
        )
      ),
      React.createElement('div', { style: { height: 1, background: 'rgba(0,0,0,0.07)', margin: '20px 0' } })
    )
  );
}

function StatBar(p) {
  return React.createElement(Reveal, { delay: p.delay || 0 },
    React.createElement('div', {
      style: {
        display: 'grid', gridTemplateColumns: 'repeat(' + p.items.length + ',1fr)',
        gap: 1, background: 'rgba(0,0,0,0.06)', borderRadius: 10,
        overflow: 'hidden', border: '1px solid rgba(0,0,0,0.06)', marginBottom: 12
      }
    }, p.items.map(function(s, i) {
      return React.createElement('div', { key: i, style: { background: CREAM, padding: '14px 8px', textAlign: 'center' } },
        React.createElement('p', { style: { fontSize: 9, fontWeight: 700, color: 'rgba(0,0,0,0.38)', textTransform: 'uppercase', letterSpacing: '0.22em', margin: '0 0 4px' } }, s.label),
        React.createElement('p', { style: { fontSize: 15, fontWeight: 900, color: FOREST, margin: 0 } }, s.value)
      );
    }))
  );
}

function Connector() {
  return React.createElement('div', {
    style: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '4px 0', gap: 4 }
  }, [0.15,0.28,0.4,0.52,0.64].map(function(op, i) {
    return React.createElement('div', { key: i, style: { width: 2, height: 7, borderRadius: 2, background: 'rgba(45,75,55,' + op + ')' } });
  }));
}

function Dialogs(p) {
  return React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 18, marginTop: 20 } },
    p.items.map(function(item, i) {
      return React.createElement(Talk, { key: i, name: item.name, role: item.role, bg: item.bg, text: item.text, side: item.side, delay: (i + 1) * 0.06 });
    })
  );
}

export default function ComicSection() {
  return React.createElement('div', { style: { fontFamily: 'Barlow,sans-serif', marginTop: 72 } },

    // Header
    React.createElement(Reveal, null,
      React.createElement('div', { style: { textAlign: 'center', marginBottom: 48 } },
        React.createElement('div', { style: { display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 12 } },
          React.createElement('div', { style: { height: 1, width: 32, background: TERRA } }),
          React.createElement('span', { style: { fontSize: 9, fontWeight: 900, color: TERRA, letterSpacing: '0.45em', textTransform: 'uppercase' } }, 'The Full Story'),
          React.createElement('div', { style: { height: 1, width: 32, background: TERRA } })
        ),
        React.createElement('h2', { style: { fontSize: 'clamp(1.7rem,4vw,2.8rem)', fontWeight: 900, color: INK, letterSpacing: '-0.02em', lineHeight: 1.1, margin: '0 0 12px' } }, 'From Empty Plot to Dream Home'),
        React.createElement('p', { style: { fontSize: 14, color: 'rgba(0,0,0,0.42)', maxWidth: 420, margin: '0 auto', lineHeight: 1.7 } }, 'Every person involved. Every conversation that mattered. The complete story of how Arun built his home with Karrcholai.')
      )
    ),

    // Cast
    React.createElement(Reveal, { delay: 0.06 },
      React.createElement('p', { style: { fontSize: 9, fontWeight: 900, color: 'rgba(0,0,0,0.28)', letterSpacing: '0.4em', textTransform: 'uppercase', textAlign: 'center', marginBottom: 14 } }, 'Characters'),
      React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginBottom: 48 } },
        [
          { name: 'Arun Kumar', role: 'Client', bg: '#3a5a8a', note: 'Dreamed of owning a home for 10 years.' },
          { name: 'Priya', role: "Arun's Wife", bg: '#7B2D8B', note: 'Had 47 specific Vastu and design requirements.' },
          { name: 'Karthik', role: 'Engineer · Karrcholai', bg: FOREST, note: 'Transparent, reliable, zero drama.' },
          { name: 'Pandit Rajan', role: 'Vastu Consultant', bg: '#8B6830', note: 'Aligned every room to sacred directions.' },
        ].map(function(c, i) {
          return React.createElement(motion.div, {
            key: i,
            initial: { opacity: 0, y: 14 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { delay: i * 0.07, duration: 0.45 },
            style: { background: '#fff', border: '1.5px solid rgba(0,0,0,0.08)', borderRadius: 10, padding: '12px 14px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: 11, flex: '1 1 190px', maxWidth: 270 }
          },
            React.createElement(Avatar, { init: c.name[0], bg: c.bg, size: 40 }),
            React.createElement('div', null,
              React.createElement('p', { style: { fontSize: 12, fontWeight: 800, color: INK, margin: '0 0 2px' } }, c.name),
              React.createElement('p', { style: { fontSize: 8, fontWeight: 700, color: TERRA, textTransform: 'uppercase', letterSpacing: '0.2em', margin: '0 0 4px' } }, c.role),
              React.createElement('p', { style: { fontSize: 11, color: 'rgba(0,0,0,0.48)', margin: 0, lineHeight: 1.4 } }, c.note)
            )
          );
        })
      )
    ),

    // Chapters
    React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 44 } },

      // Chapter 1
      React.createElement('div', null,
        React.createElement(Chapter, { n: '01', sub: 'The Problem', title: '10 Years of Renting and Zero Answers' }),
        React.createElement(Scene, {
          icon: '\uD83C\uDFDA', label: 'March 2024 \u00B7 Erode', title: 'An Empty Plot. A Frustrated Man.',
          body: 'Arun Kumar, 34, owned a plot in Erode for three years. Every contractor he called vanished after the site visit or gave a quote with no breakdown. One said Rs.55L, another Rs.62L, neither could explain why. His wife Priya had 47 requirements including Vastu alignment, specific room orientations, and a garden with rainwater harvesting. Nobody was interested in the details.',
          gradient: 'linear-gradient(135deg,#1a2a3a,#2a3a4a)', delay: 0.05
        }),
        React.createElement(Dialogs, { items: [
          { name: 'Arun Kumar', role: 'Client', bg: '#3a5a8a', side: 'left', text: 'Every contractor quoted a huge number but could not explain where the money was going. No timeline, no breakdown, nothing. My wife had specific Vastu requirements and they just nodded without understanding any of it.' },
          { name: 'Priya', role: "Arun's Wife", bg: '#7B2D8B', side: 'right', text: 'I had 47 points on my list. Pooja room East, kitchen South-East, master bedroom South-West, a proper verandah, rainwater harvesting, solar panels. It was our life savings and we deserved real answers.' }
        ]})
      ),

      React.createElement(Connector),

      // Chapter 2
      React.createElement('div', null,
        React.createElement(Chapter, { n: '02', sub: 'The Discovery', title: 'One Phone Call Changed Everything' }),
        React.createElement(Scene, {
          icon: '\uD83D\uDCDE', label: 'March 4, 2024', title: "Ravi's Recommendation",
          body: "Arun's colleague Ravi mentioned his cousin had just completed a house in Karur through Karrcholai, on time, on budget, with weekly WhatsApp photo updates and Vastu consultation included. No surprises. Arun was sceptical but he made the call.",
          gradient: 'linear-gradient(135deg,' + FOREST + ',#1a3a28)', delay: 0.05
        }),
        React.createElement(Dialogs, { items: [
          { name: 'Ravi', role: "Arun's Colleague", bg: '#2a6a4a', side: 'left', text: 'Call Karrcholai. My cousin built in Karur. Fixed price contract, weekly site photos on WhatsApp, Vastu consultation included. He paid exactly what was quoted. Zero drama.' },
          { name: 'Karthik', role: 'Engineer · Karrcholai', bg: FOREST, side: 'right', text: 'We do a free site visit, assess your plot, and give you a same-day itemised estimate with no hidden charges. If you decide not to proceed there is zero obligation. Would Thursday work?' },
          { name: 'Arun Kumar', role: 'Client', bg: '#3a5a8a', side: 'left', text: 'Vastu consultation is included? And I get weekly photo updates? Thursday works.' }
        ]})
      ),

      React.createElement(Connector),

      // Chapter 3
      React.createElement('div', null,
        React.createElement(Chapter, { n: '03', sub: 'The Site Visit', title: 'Four People. One Plot. One Fixed-Price Contract.' }),
        React.createElement(StatBar, { items: [ { label: 'Plot Size', value: '1800 sq.ft' }, { label: 'Floors', value: '2' }, { label: 'Fixed Quote', value: 'Rs.42L' }, { label: 'Timeline', value: '8 Months' } ], delay: 0.04 }),
        React.createElement(Scene, {
          icon: '\uD83E\uDDED', label: 'March 7, 2024 \u00B7 Site Visit', title: 'Blueprints, a Compass, and Zero Hidden Charges',
          body: 'Karthik arrived at 10 AM with Vastu consultant Pandit Rajan. In two hours the plot was measured, soil tested, and every one of Priya\'s 47 requirements mapped against the design. Karthik presented a Rs.42 lakh fixed-price quote itemised line by line and signed it as a contract.',
          gradient: 'linear-gradient(135deg,#c8a060,#a07840)', delay: 0.1
        }),
        React.createElement(Dialogs, { items: [
          { name: 'Pandit Rajan', role: 'Vastu Consultant', bg: '#8B6830', side: 'left', text: 'Main door East. Pooja room North-East. Kitchen South-East for fire energy. Master bedroom South-West for stability. This plot has excellent Vastu potential.' },
          { name: 'Karthik', role: 'Engineer · Karrcholai', bg: FOREST, side: 'right', text: 'Foundation, brickwork, plumbing, electrical, finishing, all on this one sheet. Rs.42 lakhs fixed. If costs go over due to our error we absorb it, not you.' },
          { name: 'Priya', role: "Arun's Wife", bg: '#7B2D8B', side: 'left', text: 'Kitchen South-East confirmed. Verandah facing the garden. Rainwater harvesting in the design. What about the pooja room ceiling height?' },
          { name: 'Karthik', role: 'Engineer · Karrcholai', bg: FOREST, side: 'right', text: '12 feet, vaulted. We will add it to the drawing tonight and share the updated plan by tomorrow morning.' }
        ]})
      ),


      React.createElement(Connector),

      // Chapter 4
      React.createElement('div', null,
        React.createElement(Chapter, { n: '04', sub: 'The Build', title: '8 Months. Every Sunday, a Photo Update.' }),
        React.createElement(Scene, {
          icon: '\uD83C\uDFD7\uFE0F', label: 'April \u2013 October 2024', title: 'Structure, Walls, Roof, Week by Week',
          body: 'Construction began April 2, 2024. Every Sunday at 9 AM Arun received a WhatsApp album with photos, a written summary, and next week\'s plan. When Priya requested the kitchen ceiling raised to 11 feet in Month 4, Karthik revised the drawing within 24 hours at no extra cost. Structure completed Month 5, tiling and finishing through Month 7.',
          gradient: 'linear-gradient(135deg,#2a3a28,' + FOREST + ')', delay: 0.05
        }),
        React.createElement(Dialogs, { items: [
          { name: 'Karthik', role: 'Engineer · Karrcholai', bg: FOREST, side: 'right', text: 'Month 3 complete. Ground floor slab done. All columns tested, Grade A concrete. First floor columns start Monday. Photos and next week\'s schedule attached.' },
          { name: 'Priya', role: "Arun's Wife", bg: '#7B2D8B', side: 'left', text: 'One request, can the kitchen ceiling go to 11 feet? Better ventilation and it feels more open.' },
          { name: 'Karthik', role: 'Engineer · Karrcholai', bg: FOREST, side: 'right', text: 'Yes, 11 feet, no structural issue, within scope, no extra cost. Updated drawing by tomorrow morning.' },
          { name: 'Arun Kumar', role: 'Client', bg: '#3a5a8a', side: 'left', text: 'This is exactly what was missing with every other contractor. They treated changes as an excuse to add fees. Karthik just solved it.' }
        ]})
      ),

      React.createElement(Connector),

      // Chapter 5
      React.createElement('div', null,
        React.createElement(Chapter, { n: '05', sub: 'The Handover', title: 'November 16. The Keys Changed Hands.' }),
        React.createElement(StatBar, { items: [ { label: 'Delivered', value: 'On Time' }, { label: 'Final Cost', value: 'Rs.42L' }, { label: 'Vastu Items', value: '47 / 47' }, { label: 'Rating', value: '5.0' } ], delay: 0.05 }),
        React.createElement(Scene, {
          icon: '\uD83D\uDD11', label: 'November 16, 2024', title: 'Home. On Time. On Budget. On Every Detail.',
          body: '8 months from ground-breaking. Karthik handed Arun the keys at 11 AM. Solar panels live. Rainwater harvesting tested. Pooja room faced East. Every one of Priya\'s 47 items was checked off. The final bill matched the contract exactly at Rs.42 lakhs, not a rupee more.',
          gradient: 'linear-gradient(135deg,' + FOREST + ',#1a4a28)', delay: 0.1
        }),
        React.createElement(Dialogs, { items: [
          { name: 'Karthik', role: 'Engineer · Karrcholai', bg: FOREST, side: 'right', text: 'All punch list items cleared. Solar live, rainwater tested, every Vastu item confirmed. Your home is ready, Arun. Congratulations.' },
          { name: 'Arun Kumar', role: 'Client', bg: '#3a5a8a', side: 'left', text: 'I have been waiting 10 years to say this. We are home. Built exactly as we asked, by people who never once let us down.' },
          { name: 'Priya', role: "Arun's Wife", bg: '#7B2D8B', side: 'right', text: 'The pooja room is perfect. The kitchen ceiling is perfect. The garden is perfect. Every single item on that list, done. I cried when we walked in.' },
          { name: 'Pandit Rajan', role: 'Vastu Consultant', bg: '#8B6830', side: 'left', text: 'The energy in this house is exactly right. Every direction, every room, it flows. This family will prosper here for generations.' }
        ]})
      )

    ),

    // Final quote
    React.createElement(Reveal, { delay: 0.1, style: { marginTop: 56 } },
      React.createElement('div', {
        style: { background: FOREST, borderRadius: 12, padding: '40px 28px', textAlign: 'center', boxShadow: '0 6px 32px rgba(45,75,55,0.18)' }
      },
        React.createElement('p', { style: { fontSize: 9, fontWeight: 900, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.5em', textTransform: 'uppercase', marginBottom: 18 } }, 'Verified Client \u00B7 Erode, Tamil Nadu'),
        React.createElement('p', { style: { fontSize: 'clamp(1rem,2.8vw,1.5rem)', color: '#fff', lineHeight: 1.75, fontStyle: 'italic', maxWidth: 500, margin: '0 auto 20px', fontWeight: 400 } },
          '"10 years of renting. One call. Eight months. And now every morning I wake up in a house that is completely, entirely, perfectly ours."'
        ),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'center', gap: 4, marginBottom: 12 } },
          [1,2,3,4,5].map(function(s) {
            return React.createElement(motion.span, {
              key: s,
              initial: { scale: 0 },
              whileInView: { scale: 1 },
              viewport: { once: true },
              transition: { delay: 0.3 + s * 0.06, type: 'spring', stiffness: 300 },
              style: { fontSize: 18, color: '#F5C518' }
            }, '\u2605');
          })
        ),
        React.createElement('p', { style: { fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.3em', textTransform: 'uppercase', margin: '0 0 24px' } }, '\u2014 Arun Kumar'),
        React.createElement('a', {
          href: '/contact',
          style: { display: 'inline-block', background: TERRA, color: '#fff', fontSize: 11, fontWeight: 900, letterSpacing: '0.25em', textTransform: 'uppercase', padding: '13px 28px', borderRadius: 6, textDecoration: 'none', boxShadow: '0 4px 16px rgba(184,92,56,0.35)' }
        }, 'Start Your Story')
      )
    )

  );
}

