import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaTimes, FaPaperPlane } from 'react-icons/fa';

// ─── Lead conversation steps ──────────────────────────────────────────────────
const STEPS = [
  {
    id: 'name',
    question: '1️⃣ பெயர் / Name\nஉங்கள் பெயரை தெரிவிக்கவும் / Please enter your name:',
    placeholder: 'Your name…',
    validate: (v) => v.trim().length >= 2,
    errorMsg: 'Please enter a valid name (at least 2 characters).',
  },
  {
    id: 'mobile',
    question: '2️⃣ மொபைல் எண் / Mobile Number\nதொடர்பு எண்ணை உள்ளிடவும்:',
    placeholder: '10-digit mobile number…',
    validate: (v) => /^[6-9]\d{9}$/.test(v.trim()),
    errorMsg: 'Please enter a valid 10-digit Indian mobile number.',
  },
  {
    id: 'location',
    question: '3️⃣ திட்டம் நடைபெறும் இடம் / Project Location\nதிட்டம் எந்த இடத்தில் உள்ளது?',
    placeholder: 'City / Area / District…',
    validate: (v) => v.trim().length >= 2,
    errorMsg: 'Please enter the project location.',
  },
  {
    id: 'service',
    question: '4️⃣ தேவையான சேவை / Required Service\nகீழ்க்காணும் சேவைகளில் எது தேவை?\n\n🏠 Residential Construction\n📋 PMC (Project Management)\n🔨 Renovation & Remodelling\n📐 Architectural Planning\n🧭 Vasthu Consultation\n🌿 Landscaping',
    placeholder: 'Type your required service…',
    validate: (v) => v.trim().length >= 2,
    errorMsg: 'Please specify the service you need.',
    quickReplies: [
      'Residential Construction',
      'PMC',
      'Renovation',
      'Architectural Planning',
      'Vasthu Consultation',
      'Landscaping',
    ],
  },
  {
    id: 'plotSize',
    question: '5️⃣ நிலத்தின் அளவு / Plot Size\nநிலத்தின் அளவை குறிப்பிடவும் (sq.ft / cents / grounds):',
    placeholder: 'e.g. 1200 sq.ft or 3 cents…',
    validate: (v) => v.trim().length >= 1,
    errorMsg: 'Please enter the plot size.',
  },
  {
    id: 'stage',
    question: '6️⃣ திட்ட நிலை / Project Stage\nதிட்டம் தற்போது எந்த நிலையில் உள்ளது?',
    placeholder: 'Planning / Construction / Renovation…',
    validate: (v) => v.trim().length >= 2,
    errorMsg: 'Please enter the project stage.',
    quickReplies: ['Planning', 'Under Construction', 'Renovation'],
  },
  {
    id: 'budget',
    question: '7️⃣ எதிர்பார்க்கும் பட்ஜெட் / Expected Budget (Optional)\nதேரிவுசெய்யவும் அல்லது "Skip" என்று தட்டவும்:',
    placeholder: 'e.g. 25 Lakhs or Skip…',
    validate: () => true, // optional
    errorMsg: '',
    quickReplies: ['Below 15L', '15L – 30L', '30L – 50L', '50L – 1Cr', 'Above 1Cr', 'Skip'],
  },
  {
    id: 'preferredTime',
    question: '8️⃣ தொடர்பு கொள்ள வசதியான நேரம் / Preferred Time to Contact:',
    placeholder: 'e.g. Morning 9–11 AM…',
    validate: (v) => v.trim().length >= 2,
    errorMsg: 'Please enter a preferred contact time.',
    quickReplies: ['Morning (9–11 AM)', 'Afternoon (1–3 PM)', 'Evening (5–7 PM)', 'Anytime'],
  },
];

const PHONE = '919741416747'; // WhatsApp number with country code (no +)

// Build the final WhatsApp message from collected answers
function buildWhatsAppMessage(answers) {
  return (
    `🏗️ *New Lead – KARRCHOLAI CONSTRUCTION*\n` +
    `──────────────────────────\n` +
    `1️⃣ *Name:* ${answers.name}\n` +
    `2️⃣ *Mobile:* ${answers.mobile}\n` +
    `3️⃣ *Location:* ${answers.location}\n` +
    `4️⃣ *Service:* ${answers.service}\n` +
    `5️⃣ *Plot Size:* ${answers.plotSize}\n` +
    `6️⃣ *Stage:* ${answers.stage}\n` +
    `7️⃣ *Budget:* ${answers.budget || 'Not specified'}\n` +
    `8️⃣ *Preferred Time:* ${answers.preferredTime}\n` +
    `──────────────────────────\n` +
    `_Submitted via KARRCHOLAI website_`
  );
}

// ─── Component ─────────────────────────────────────────────────────────────────
export default function WhatsAppLeadBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [stepIndex, setStepIndex] = useState(-1); // -1 = welcome screen
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [answers, setAnswers] = useState({});
  const [validationError, setValidationError] = useState('');
  const [done, setDone] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when step changes
  useEffect(() => {
    if (isOpen && stepIndex >= 0 && !done) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [stepIndex, isOpen, done]);

  // Show tooltip hint after 8s
  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => setShowTooltip(true), 8000);
      return () => clearTimeout(t);
    }
    setShowTooltip(false);
  }, [isOpen]);

  const addBotMsg = (text) =>
    setMessages((prev) => [...prev, { from: 'bot', text }]);

  const addUserMsg = (text) =>
    setMessages((prev) => [...prev, { from: 'user', text }]);

  // Start the conversation
  const handleOpen = () => {
    setIsOpen(true);
    if (messages.length === 0) {
      setMessages([
        {
          from: 'bot',
          text:
            '🙏 *வணக்கம்! Welcome to KARRCHOLAI CONSTRUCTION!*\n\n' +
            'We specialize in:\n' +
            '✅ Residential Construction\n' +
            '✅ PMC\n' +
            '✅ Renovation & Remodelling\n' +
            '✅ Architectural Planning\n' +
            '✅ Vasthu Consultation\n' +
            '✅ Landscaping\n\n' +
            'To serve you better, I\'ll ask a few quick questions. Tap below to begin! 👇',
        },
      ]);
    }
  };

  const handleStart = () => {
    setStepIndex(0);
    addBotMsg(STEPS[0].question);
  };

  const handleSend = (value) => {
    const text = (value ?? input).trim();
    if (!text) return;

    const currentStep = STEPS[stepIndex];
    if (!currentStep.validate(text)) {
      setValidationError(currentStep.errorMsg);
      return;
    }
    setValidationError('');

    // Record answer
    const newAnswers = { ...answers, [currentStep.id]: text };
    setAnswers(newAnswers);
    addUserMsg(text);
    setInput('');

    const nextIndex = stepIndex + 1;

    if (nextIndex < STEPS.length) {
      setStepIndex(nextIndex);
      setTimeout(() => addBotMsg(STEPS[nextIndex].question), 400);
    } else {
      // All done
      setDone(true);
      setTimeout(() => {
        addBotMsg(
          '✅ *நன்றி! Thank you!*\n\n' +
            'உங்கள் விவரங்கள் பெறப்பட்டன.\n' +
            'எங்கள் குழு விரைவில் தொடர்புகொள்ளும்.\n\n' +
            'Click below to send your details directly on WhatsApp 👇'
        );
      }, 400);

      // Pre-build the WA link with all answers
      const waMsg = buildWhatsAppMessage(newAnswers);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { from: 'bot', text: '__WA_BUTTON__', waUrl: `https://wa.me/${PHONE}?text=${encodeURIComponent(waMsg)}` },
        ]);
      }, 900);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleRestart = () => {
    setStepIndex(-1);
    setMessages([]);
    setAnswers({});
    setInput('');
    setDone(false);
    setValidationError('');
    setTimeout(handleOpen, 50);
  };

  const currentStep = stepIndex >= 0 && stepIndex < STEPS.length ? STEPS[stepIndex] : null;

  return (
    <>
      {/* ── Floating WhatsApp button ── */}
      <div className="fixed bottom-8 right-8 z-[99] flex flex-col items-end gap-3">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="w-[340px] sm:w-[380px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col"
              style={{ maxHeight: '80vh' }}
            >
              {/* Header */}
              <div className="bg-[#075e54] px-4 py-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center shrink-0">
                  <FaWhatsapp className="text-white text-xl" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-sm leading-tight truncate">KARRCHOLAI CONSTRUCTION</p>
                  <p className="text-[#b2dfdb] text-xs">Typically replies instantly</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/70 hover:text-white transition-colors"
                  aria-label="Close chat"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Chat area */}
              <div
                className="flex-1 overflow-y-auto p-3 space-y-2"
                style={{
                  background: '#e5ddd5 url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23cccccc\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                  minHeight: '260px',
                  maxHeight: '340px',
                }}
              >
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.text === '__WA_BUTTON__' ? (
                      <a
                        href={msg.waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-[#25D366] text-white font-bold px-5 py-3 rounded-xl shadow-md hover:bg-[#1ebe57] transition-colors text-sm"
                      >
                        <FaWhatsapp className="text-lg" />
                        Send on WhatsApp
                      </a>
                    ) : (
                      <div
                        className={`max-w-[80%] px-3 py-2 rounded-xl text-sm shadow-sm whitespace-pre-wrap leading-relaxed ${
                          msg.from === 'user'
                            ? 'bg-[#dcf8c6] text-gray-900 rounded-tr-none'
                            : 'bg-white text-gray-800 rounded-tl-none'
                        }`}
                      >
                        {msg.text}
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick replies */}
              {!done && currentStep?.quickReplies && (
                <div className="px-3 py-2 flex flex-wrap gap-2 border-t border-gray-100 bg-gray-50">
                  {currentStep.quickReplies.map((r) => (
                    <button
                      key={r}
                      onClick={() => handleSend(r)}
                      className="text-xs bg-white border border-[#25D366] text-[#075e54] font-medium px-3 py-1.5 rounded-full hover:bg-[#25D366] hover:text-white transition-colors"
                    >
                      {r}
                    </button>
                  ))}
                </div>
              )}

              {/* Start button (welcome state) */}
              {stepIndex === -1 && (
                <div className="p-3 border-t border-gray-100 bg-white">
                  <button
                    onClick={handleStart}
                    className="w-full bg-[#25D366] text-white font-bold py-3 rounded-xl hover:bg-[#1ebe57] transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    <FaWhatsapp className="text-base" />
                    Start — Get a Free Consultation
                  </button>
                </div>
              )}

              {/* Input (question steps) */}
              {stepIndex >= 0 && !done && (
                <div className="p-3 border-t border-gray-100 bg-white">
                  {validationError && (
                    <p className="text-red-500 text-xs mb-1.5 px-1">{validationError}</p>
                  )}
                  <div className="flex items-center gap-2">
                    <input
                      ref={inputRef}
                      type={currentStep?.id === 'mobile' ? 'tel' : 'text'}
                      value={input}
                      onChange={(e) => { setInput(e.target.value); setValidationError(''); }}
                      onKeyDown={handleKeyDown}
                      placeholder={currentStep?.placeholder || 'Type here…'}
                      className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366] text-gray-800"
                      maxLength={currentStep?.id === 'mobile' ? 10 : 200}
                    />
                    <button
                      onClick={() => handleSend()}
                      disabled={!input.trim()}
                      className="w-9 h-9 bg-[#25D366] text-white rounded-full flex items-center justify-center hover:bg-[#1ebe57] disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
                      aria-label="Send"
                    >
                      <FaPaperPlane className="text-sm" />
                    </button>
                  </div>
                  <p className="text-[10px] text-gray-400 text-center mt-2">
                    Step {stepIndex + 1} of {STEPS.length}
                  </p>
                </div>
              )}

              {/* Done — restart option */}
              {done && (
                <div className="p-3 border-t border-gray-100 bg-white text-center">
                  <button
                    onClick={handleRestart}
                    className="text-xs text-[#075e54] underline hover:no-underline"
                  >
                    Start over / Submit another inquiry
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-16 right-0 bg-white text-gray-800 text-xs font-semibold px-4 py-2 rounded-xl shadow-xl border border-gray-100 whitespace-nowrap"
            >
              💬 Free Consultation? Chat now!
              <span className="absolute -bottom-2 right-5 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main FAB */}
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={isOpen ? () => setIsOpen(false) : handleOpen}
          className="relative w-14 h-14 md:w-16 md:h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:shadow-[0_0_30px_rgba(37,211,102,0.5)] transition-all duration-300"
          aria-label={isOpen ? 'Close chat' : 'Open WhatsApp chat'}
        >
          {/* Ping animation when closed */}
          {!isOpen && (
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
          )}
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <FaTimes className="text-2xl" />
              </motion.span>
            ) : (
              <motion.span key="wa" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                <FaWhatsapp className="text-2xl md:text-3xl" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  );
}
