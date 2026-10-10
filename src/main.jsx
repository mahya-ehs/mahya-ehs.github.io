import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Hold the hero entrance until the web fonts are in, so the title doesn't swap fonts mid-animation.
// The timeout is a fallback for slow connections.
const markFontsReady = () => document.documentElement.classList.add('fonts-ready')
document.fonts.ready.then(markFontsReady)
setTimeout(markFontsReady, 1500)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
