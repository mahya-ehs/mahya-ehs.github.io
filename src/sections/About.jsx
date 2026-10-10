import aboutImage from '../assets/about.jpg'
import borderImage from '../assets/border3.png'

function About() {
    return (
        <section className="about-section" id="about">
            <div className="about-row">
                <div className="about-image" data-reveal>
                    <div className="about-frame">
                        <img className="about-photo" src={aboutImage} alt="Maya Ehsanimehr" />
                        <img className="about-frame-border" src={borderImage} alt="" aria-hidden="true" />
                    </div>
                </div>

                <div className="about-content" data-reveal style={{ '--reveal-delay': '150ms' }}>
                    <h2 className="about-title">About Maya</h2>
                    <div className="about-text">
                        <p>
                            I’m a recent Computer Science & Engineering graduate with a focus on AI. During my studies, I worked mostly with deep learning, computer vision, and data. My master’s thesis focused on detecting steel defects with limited data, exploring classification, Faster R-CNN, and anomaly detection.
                        </p>
                        <p>
                            I also have experience with mobile development and worked as a teaching assistant for a mobile computing course. Right now, I’m interested in the data side of AI and learning more about cloud technologies.
                        </p>
                        <p>
                            Outside of tech, I love art and concept design. I’d love to combine these interests in games or interactive apps someday. I’m based in Oulu, open to relocating, and learning Finnish!
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
