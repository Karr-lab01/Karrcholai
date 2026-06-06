import { useState, lazy, Suspense, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import ScrollToTop from './components/ScrollToTop'
import WhatsAppButton from './components/WhatsAppButton'
import Preloader from './components/Preloader'
import { usePageTracking } from './hooks/usePageTracking'

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
const ManaiyadiCalculatorPage = lazy(() => import('./pages/ManaiyadiCalculatorPage'))
const ManaiyadiDimensionGuide = lazy(() => import('./pages/ManaiyadiDimensionGuide'))
const ManaiyadiIntroduction   = lazy(() => import('./pages/ManaiyadiIntroduction'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const NotFound   = lazy(() => import('./pages/NotFound'))

// Minimal fallback while lazy page loads
const PageFallback = () => (
  <div className="min-h-screen flex items-center justify-center" style={{ background: '#F5F2EC' }}>
    <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: '#C9754A', borderTopColor: 'transparent' }} />
  </div>
)

// Inner component to access hooks
const AppContent = ({ loading, setLoading }) => {
  usePageTracking();
  
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black"
      >
        Skip to main content
      </a>

      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <ScrollToTop />
          <main id="main-content">
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
                <Route path="/manaiyadi/calculator"     element={<ManaiyadiCalculatorPage />} />
                <Route path="/manaiyadi/dimension-guide" element={<ManaiyadiDimensionGuide />} />
                <Route path="/manaiyadi/introduction"   element={<ManaiyadiIntroduction />} />
                <Route path="/projects/:id" element={<ProjectDetail />} />
                <Route path="*"        element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <WhatsAppButton />
        </>
      )}
    </>
  )
}

function App() {
  const [loading, setLoading] = useState(true)

  return (
    <Router>
      <AppContent loading={loading} setLoading={setLoading} />
    </Router>
  )
}

export default App
