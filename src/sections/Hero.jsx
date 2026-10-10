import Navbar from '../components/Navbar'
// Web copy: 1920px, metadata stripped. Photo by Nicolas J Leclercq on Unsplash; the full-size original is kept outside the project.
import bgImage from '../assets/hero-aurora-web.jpg'
import overlayImage from '../assets/overlay2-web.jpg'
import '../App.css'

function Hero() {
  return (
    <section className="hero-section" id="top" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-overlay" aria-hidden="true" style={{ backgroundImage: `url(${overlayImage})` }} />

      <Navbar />

      <div className="hero-content" >
        <h1>Portfolio</h1>
      </div>

    </section>
  )
}

export default Hero