import { useEffect } from 'react'
import './App.css'
import Hero from './sections/Hero.jsx'
import About from './sections/About.jsx'
import Education from './sections/Education.jsx'
import Skills from './sections/Skills.jsx'
import Experience from './sections/Experience.jsx'
import Projects from './sections/Projects.jsx'
import MoreWork from './sections/MoreWork.jsx'
import Contact from './sections/Contact.jsx'

function App() {
  // Scroll reveal: elements with data-reveal fade/slide in the first time they enter the viewport
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        // A data attribute rather than a class: React rewrites className on re-render (e.g. opening an experience card) and would drop it
        entry.target.setAttribute('data-revealed', '')
        observer.unobserve(entry.target)
      })
    }, { rootMargin: '0px 0px -10% 0px' })

    document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <main>
      <Hero />
      <About />
      <Education />
      <Skills />
      <Experience />
      <Projects />
      <MoreWork />
      <Contact />
    </main>
  )
}

export default App
