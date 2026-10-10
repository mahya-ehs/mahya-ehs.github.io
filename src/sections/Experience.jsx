import { useState } from 'react'
import borderImage from '../assets/border4.png'
import texture from '../assets/overlay2-web.jpg'

const experienceData = [
    {
        role: 'Laravel Intern',
        place: 'Pasavan Team',
        years: 'Oct. 2020 - Feb. 2021',
        points: [
            'Built and maintained the admin dashboard of an e-commerce platform using Laravel and MVC architecture.',
        ],
    },
    {
        role: 'Computer Networks Intern',
        place: 'Part Software Group',
        years: 'Apr. 2022 - Jul. 2022',
        points: [
            'Gained a deeper understanding of computer network concepts based on **CCNA** through practical projects.',
            'Ranked **2nd** out of 20 interns based on final internship project performance.',
        ],
    },
    {
        role: 'Teaching Assistant',
        place: 'Ferdowsi University of Mashhad',
        years: 'Sep. 2022 – May. 2023',
        points: [
            'Designed and graded quizzes, assignments, and projects for 100+ students in **Operating Systems** and **Computer Networks** courses.',
            'Developed a socket programming project in Java and Python, improving students’ understanding of client-server architecture.',
            'Received positive feedback and recommendation letters from professors for the quality of designed materials.',
        ],
    },
    {
        role: 'Computer Vision Intern',
        place: 'Veerasense Company',
        years: 'Summer 2023',
        points: [
            'Designed and implemented a **PyTorch** model to estimate cattle Body Condition Score (BCS) from real-world farm images.',
            'Created a custom annotated dataset of cattle.',
            'Achieved accurate segmentation using SAM and Detectron2, significantly boosting detection performance.',
        ],
    },
    {
        role: 'Research Intern',
        place: 'University of Oulu',
        years: 'June 2025 – Jul. 2025',
        points: [
            'Conducting research on **vision‑language models** and transformer architectures for emotion understanding.',
            'Exploring large‑scale models such as CLIP, BLIP2, InternVL to extract semantic information from images and videos.',
        ],
    },
    {
        role: 'Teaching Assistant - Mobile Computing',
        place: 'University of Oulu',
        years: 'Dec. 2025 - Feb. 2026',
        points: [
            'Held weekly exercise sessions and assisted students with course-related issues.',
            'Graded assignments for over 60 students.',
        ],
    },

    {
        role: 'Thesis Worker',
        place: 'SR-Instruments',
        years: 'Dec. 2025 - Jun. 2026',
        points: [
            'Researching deep learning for steel surface defect detection under small-dataset constraints, working with multi-channel image data.',
            'Benchmarking CNN-based classification, object detection, and anomaly detection pipelines, applying transfer learning, domain adaptation, and Grad-CAM for model explainability.'    
        ],
    },
]

// Text wrapped in **double asterisks** is shown in bold
function formatPoint(text) {
    return text.split(/\*\*(.+?)\*\*/g).map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part))
}

function Experience() {
    const [openIndex, setOpenIndex] = useState(null)

    const toggle = (index) => setOpenIndex((current) => (current === index ? null : index))

    return (
        <section className="exp-section" id="experience">
            <div className="exp-texture" style={{ backgroundImage: `url(${texture})` }} aria-hidden="true" />
            <h2 className="exp-title" data-reveal>My Experience</h2>
            <div className="exp-timeline">
                {experienceData.map((item, index) => {
                    const side = index % 2 === 0 ? 'left' : 'right'
                    const isOpen = openIndex === index
                    const detailsId = `exp-details-${index}`
                    return (
                        <div className={`exp-row exp-row--${side}${isOpen ? ' exp-row--open' : ''}`} key={item.role} data-reveal>
                            <div className="exp-card-wrap">
                                <button
                                    type="button"
                                    className="exp-card"
                                    onClick={() => toggle(index)}
                                    aria-expanded={isOpen}
                                    aria-controls={detailsId}
                                >
                                    <img className="exp-card-border" src={borderImage} alt="" aria-hidden="true" />
                                    {item.years && <span className="exp-years">{item.years}</span>}
                                    <span className="exp-role">{item.role}</span>
                                    <span className="exp-place">{item.place}</span>
                                    <span className="exp-chevron" aria-hidden="true" />
                                </button>
                                {/* Always rendered so it can animate open; inert keeps it out of tab order and screen readers while closed */}
                                <div className="exp-details" id={detailsId} inert={!isOpen}>
                                    <div className="exp-details-inner">
                                        {item.points.length > 1 ? (
                                            <ul className="exp-desc-list">
                                                {item.points.map((point) => (
                                                    <li key={point}>{formatPoint(point)}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="exp-desc">{formatPoint(item.points[0])}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default Experience
