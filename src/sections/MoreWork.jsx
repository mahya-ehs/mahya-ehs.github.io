import { useEffect, useRef, useState } from 'react'
import arrowLeft from '../assets/arrowl.png'
import arrowRight from '../assets/arrowr.png'
import tabBorder from '../assets/border5-tab.png'
import ProjectDialog from '../components/ProjectDialog.jsx'
import { categories, fallbackToOriginal, projectsData, thumbUrl } from '../data/projects.js'

// Featured projects already have their own slider in My Projects
const moreWorkProjects = projectsData.filter((project) => !project.featured)

function MoreWork() {
    const [activeCategory, setActiveCategory] = useState(categories[0])
    const [canScrollPrev, setCanScrollPrev] = useState(false)
    const [canScrollNext, setCanScrollNext] = useState(false)
    const [selectedProject, setSelectedProject] = useState(null)
    // Cards only animate after a tab switch, not on first render (the scroll reveal covers that)
    const [hasSwitchedTab, setHasSwitchedTab] = useState(false)
    const rowRef = useRef(null)

    const visibleProjects = moreWorkProjects.filter((project) => project.category === activeCategory)
    const showArrows = visibleProjects.length > 5

    const updateScrollState = () => {
        const el = rowRef.current
        if (!el) return
        setCanScrollPrev(el.scrollLeft > 4)
        setCanScrollNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
    }

    useEffect(() => {
        const el = rowRef.current
        if (!el) return
        el.scrollTo({ left: 0 })
        updateScrollState()
        el.addEventListener('scroll', updateScrollState)
        window.addEventListener('resize', updateScrollState)
        return () => {
            el.removeEventListener('scroll', updateScrollState)
            window.removeEventListener('resize', updateScrollState)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeCategory])

    const scrollNext = () => {
        rowRef.current?.scrollBy({ left: 320, behavior: 'smooth' })
    }

    const scrollPrev = () => {
        rowRef.current?.scrollBy({ left: -320, behavior: 'smooth' })
    }

    return (
        <section className="more-work-section" id="more-work">
            <h2 className="projects-title" data-reveal>More work</h2>

            <div className="projects-tabs" data-reveal style={{ '--reveal-delay': '120ms' }}>
                {categories.map((category) => (
                    <button
                        type="button"
                        key={category}
                        className={`projects-tab${category === activeCategory ? ' projects-tab--active' : ''}`}
                        onClick={() => {
                            setActiveCategory(category)
                            setHasSwitchedTab(true)
                        }}
                    >
                        <img className="projects-tab-border" src={tabBorder} alt="" aria-hidden="true" />
                        <span>{category}</span>
                    </button>
                ))}
            </div>

            <div className="projects-row-wrap" data-reveal style={{ '--reveal-delay': '240ms' }}>
                {showArrows && canScrollPrev && (
                    <button type="button" className="projects-arrow projects-prev" onClick={scrollPrev} aria-label="Previous projects">
                        <img src={arrowLeft} alt="" aria-hidden="true" />
                    </button>
                )}
                <div className="projects-row" ref={rowRef} key={activeCategory}>
                    {visibleProjects.map((project, index) => (
                        <button
                            type="button"
                            className={`project-card${hasSwitchedTab ? ' project-card--enter' : ''}`}
                            style={{ '--i': index }}
                            key={project.title}
                            onClick={() => setSelectedProject(project)}
                        >
                            <span className="project-card-image">
                                {project.image && (
                                    <img src={thumbUrl(project.image)} alt="" loading="lazy" onError={fallbackToOriginal(project.image)} />
                                )}
                                <span className="project-card-title">{project.title}</span>
                            </span>
                        </button>
                    ))}
                </div>
                {showArrows && canScrollNext && (
                    <button type="button" className="projects-arrow projects-next" onClick={scrollNext} aria-label="Next projects">
                        <img src={arrowRight} alt="" aria-hidden="true" />
                    </button>
                )}
            </div>

            <ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)} />
        </section>
    )
}

export default MoreWork
