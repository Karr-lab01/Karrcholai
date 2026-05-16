import { motion } from 'framer-motion'
import { FiPhoneCall, FiMail, FiMapPin } from 'react-icons/fi'

const ContactStrip = () => {
  const contacts = [
    { icon: <FiPhoneCall />, text: 'Call Us', subtext: '+91 98765 43210' },
    { icon: <FiMail />, text: 'Email Us', subtext: 'info@karrcholai.com' },
    { icon: <FiMapPin />, text: 'Our Location', subtext: 'Chennai, Tamil Nadu' },
  ]

  return (
    <div className="bg-[#2b4c3b] text-white py-20 relative overflow-hidden border-t border-white/10">
      {/* Subtle stone texture */}
      <div className="absolute inset-0 opacity-10 mix-blend-overlay stone-texture pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/20">
          {contacts.map((contact, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              whileHover={{ y: -10, backgroundColor: "rgba(255,255,255,0.05)" }}
              className="flex flex-col items-center justify-center py-10 px-8 group cursor-pointer transition-all duration-500"
            >
              <div className="text-secondary mb-5 text-4xl group-hover:scale-110 transition-transform duration-300">
                {contact.icon}
              </div>
              <h3 className="text-2xl font-bold mb-2 tracking-wide group-hover:text-secondary transition-colors">
                {contact.text}
              </h3>
              <p className="text-white/60 font-light tracking-widest text-sm uppercase">
                {contact.subtext}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ContactStrip
