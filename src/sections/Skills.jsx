import { useState } from 'react'

const skillsData = [
    {
        title: 'Programming Languages',
        content: 'Python, Java, C, JavaScript, MATLAB, Kotlin, R, SQL',
    },
    {
        title: 'ML & Data Science',
        content: 'PyTorch, Scikit-learn, OpenCV, Pandas, NumPy, Matplotlib',
    },
    {
        title: 'App Development',
        content: 'Jetpack Compose, JavaFX',
    },
    {
        title: 'Web Development',
        content: 'HTML, CSS, Bootstrap, MySQL, React.js, Figma',
    },
    {
        title: 'Tools',
        content: 'Git, Postman, Docker, AWS (learning), Dagster, Linux, Selenium, Robot Framework',
    },
    {
        title: 'Languages',
        content: 'English (C1, 113/120 in TOEFL iBT), Finnish (A2, currently learning), Persian (Native)',
    },
]

function Skills() {
    const [openIndex, setOpenIndex] = useState(0)

    const toggleRow = (index) => {
        setOpenIndex((current) => (current === index ? null : index))
    }

    return (
        <section className="skills-section" id="skills">
            <h2 className="skills-title" data-reveal>My Skills</h2>
            <div className="skills-accordion" data-reveal style={{ '--reveal-delay': '120ms' }}>
                {skillsData.map((item, index) => {
                    const isOpen = openIndex === index
                    return (
                        <div className={`skills-row${isOpen ? ' skills-row--open' : ''}`} key={item.title}>
                            <button
                                type="button"
                                className="skills-row-header"
                                onClick={() => toggleRow(index)}
                                aria-expanded={isOpen}
                            >
                                <span>{item.title}</span>
                                <svg className="skills-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <div className="skills-row-line" />
                            <div className="skills-row-body-wrap">
                                <p className="skills-row-body">{item.content}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default Skills
