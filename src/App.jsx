import { useState, lazy, Suspense, createContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import WhatsAppButton from './components/WhatsAppButton'
import LogoVideoModal from './components/LogoVideoModal'
import Preloader from './components/Preloader'
import { usePageTracking } from './hooks/usePageTracking'

export const LogoVideoContext = createContext({ openLogoVideo: () => {} })

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
const AppContent = ({ videoOpen, setVideoOpen }) => {
  usePageTracking();

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black"
      >
        Skip to main content
      </a>

      <LogoVideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />

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
  )
}

function App() {
  const [videoOpen, setVideoOpen] = useState(false)
  const [preloaderDone, setPreloaderDone] = useState(false)

  return (
    <LogoVideoContext.Provider value={{ openLogoVideo: () => setVideoOpen(true) }}>
      {!preloaderDone && <Preloader onComplete={() => setPreloaderDone(true)} />}
      <Router>
        <AppContent videoOpen={videoOpen} setVideoOpen={setVideoOpen} />
      </Router>
    </LogoVideoContext.Provider>
  )
}

export default App
