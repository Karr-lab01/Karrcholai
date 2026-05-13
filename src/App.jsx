import { useState, lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import ScrollToTop from './components/ScrollToTop'
import WhatsAppButton from './components/WhatsAppButton'
import Preloader from './components/Preloader'

// Lazy-load all pages — only Home loads eagerly
import Home from './pages/Home'
const AboutUs   = lazy(() => import('./pages/AboutUs'))
const ContactUs = lazy(() => import('./pages/ContactUs'))
const Services  = lazy(() => import('./pages/Services'))
const Karr      = lazy(() => import('./pages/Karr'))
const Projects  = lazy(() => import('./pages/Projects'))
const Cholai    = lazy(() => import('./pages/Cholai'))
const Blog      = lazy(() => import('./pages/Blog'))
const BlogDetail = lazy(() => import('./pages/BlogDetail'))
const Manaiyadi  = lazy(() => import('./pages/Manaiyadi'))

// Minimal fallback while lazy page loads
const PageFallback = () => (
  <div className="min-h-screen flex items-center justify-center" style={{ background: '#F5F2EC' }}>
    <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: '#C9754A', borderTopColor: 'transparent' }} />
  </div>
)

function App() {
  const [loading, setLoading] = useState(true)

  return (
    <Router>
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <ScrollToTop />
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/"        element={<Home />} />
              <Route path="/about"   element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/services"element={<Services />} />
              <Route path="/karr"    element={<Karr />} />
              <Route path="/projects"element={<Projects />} />
              <Route path="/cholai"  element={<Cholai />} />
              <Route path="/blog"    element={<Blog />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/manaiyadi" element={<Manaiyadi />} />
            </Routes>
          </Suspense>
          <WhatsAppButton />
        </>
      )}
    </Router>
  )
}

export default App
