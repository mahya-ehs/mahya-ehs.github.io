import { useState } from 'react'
import arrowLeft from '../assets/arrowl.png'
import arrowRight from '../assets/arrowr.png'
import stardust from '../assets/overlay3-web.jpg'
import ProjectDialog from '../components/ProjectDialog.jsx'
import { fallbackToOriginal, largeUrl, projectsData } from '../data/projects.js'

const featuredProjects = projectsData.filter((project) => project.featured)

function Projects() {
    const [selectedProject, setSelectedProject] = useState(null)
    const [activeIndex, setActiveIndex] = useState(0)

    const goToPrevious = () => {
        setActiveIndex((current) => (current === 0 ? featuredProjects.length - 1 : current - 1))
    }

    const goToNext = () => {
        setActiveIndex((current) => (current === featuredProjects.length - 1 ? 0 : current + 1))
    }

    return (
        <section className="projects-section" id="projects">
            <div className="projects-texture" style={{ backgroundImage: `url(${stardust})` }} aria-hidden="true" />
            <h2 className="projects-title" data-reveal>My Projects</h2>
            <p className="projects-hint" data-reveal style={{ '--reveal-delay': '60ms' }}>Click on each project for more info</p>

            {featuredProjects.length > 0 && (
                <div className="projects-slider" aria-label="Featured projects slider" data-reveal style={{ '--reveal-delay': '120ms' }}>
                    <button type="button" className="projects-arrow projects-prev" onClick={goToPrevious} aria-label="Previous project">
                        <img src={arrowLeft} alt="" aria-hidden="true" />
                    </button>

                    <div className="projects-slider-window">
                        <div
                            className="projects-slider-track"
                            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                        >
                            {featuredProjects.map((project) => (
                                <article className="featured-card" key={project.title}>
                                    <button type="button" className="featured-card-button" onClick={() => setSelectedProject(project)}>
                                        <span className="featured-card-image">
                                            {project.image && <img src={largeUrl(project.image)} alt="" loading="lazy" onError={fallbackToOriginal(project.image)} />}
                                        </span>
                                        <span className="featured-card-content">
                                            <span className="featured-card-category">{project.category}</span>
                                            <span className="featured-card-title">{project.title}</span>
                                            {project.summary && <span className="featured-card-summary">{project.summary}</span>}
                                            {project.stack?.length > 0 && (
                                                <span className="featured-card-tech">
                                                    {project.stack.map((tech) => <span key={tech}>{tech}</span>)}
                                                </span>
                                            )}
                                        </span>
                                    </button>
                                </article>
                            ))}
                        </div>
                    </div>

                    <button type="button" className="projects-arrow projects-next" onClick={goToNext} aria-label="Next project">
                        <img src={arrowRight} alt="" aria-hidden="true" />
                    </button>
                </div>
            )}

            <div className="projects-slider-dots" aria-label="Project slide indicators" data-reveal style={{ '--reveal-delay': '240ms' }}>
                {featuredProjects.map((project, index) => (
                    <button
                        key={project.title}
                        type="button"
                        className={`projects-slider-dot${index === activeIndex ? ' projects-slider-dot--active' : ''}`}
                        aria-label={`Go to project ${index + 1}`}
                        onClick={() => setActiveIndex(index)}
                    />
                ))}
            </div>

            <ProjectDialog
                project={selectedProject}
                projects={featuredProjects}
                onNavigate={setSelectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </section>
    )
}

export default Projects
