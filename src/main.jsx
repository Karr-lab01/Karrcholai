import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import './index.css'
import './styles/global.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
)

// After React mounts, hide the SEO shell via CSS class (not JS display:none)
// Crawlers that don't run JS will always see the full SEO shell content.
requestAnimationFrame(() => {
  document.documentElement.classList.add('react-ready')
})
