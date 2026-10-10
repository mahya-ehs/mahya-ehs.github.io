import { useEffect, useRef, useState } from 'react'
import { imageUrl } from '../data/projects.js'

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Gallery images live in public/projects/ unless given as a full URL
const resolveSrc = (src) => (/^(https?:)?\//.test(src) ? src : imageUrl(src))
const isVideo = (src) => /\.(mp4|webm)$/i.test(src)
// Demo videos can be loud, so they start below full volume
const VIDEO_START_VOLUME = 0.4

function Section({ title, children }) {
    return (
        <section className="project-dialog-section">
            <h4>{title}</h4>
            {children}
        </section>
    )
}

function Gallery({ images }) {
    const [index, setIndex] = useState(0)
    const image = images[index]
    const step = (delta) => setIndex((current) => (current + delta + images.length) % images.length)

    return (
        <figure className="project-dialog-gallery" aria-roledescription="carousel" aria-label="Project images">
            <div className={`project-dialog-gallery-frame${image.portrait ? ' project-dialog-gallery-frame--portrait' : ''}`}>
                {isVideo(image.src) ? (
                    <video
                        key={image.src}
                        src={resolveSrc(image.src)}
                        aria-label={image.alt}
                        controls
                        playsInline
                        preload="metadata"
                        onLoadedMetadata={(event) => { event.currentTarget.volume = VIDEO_START_VOLUME }}
                    />
                ) : (
                    <img key={image.src} src={resolveSrc(image.src)} alt={image.alt ?? ''} loading="lazy" decoding="async" />
                )}
                {images.length > 1 && (
                    <>
                        <button type="button" className="project-dialog-gallery-arrow project-dialog-gallery-prev" onClick={() => step(-1)} aria-label="Previous image">‹</button>
                        <button type="button" className="project-dialog-gallery-arrow project-dialog-gallery-next" onClick={() => step(1)} aria-label="Next image">›</button>
                    </>
                )}
            </div>
            {images.length > 1 && (
                <div className="project-dialog-gallery-dots">
                    {images.map((item, i) => (
                        <button
                            type="button"
                            key={item.src}
                            className={`projects-slider-dot${i === index ? ' projects-slider-dot--active' : ''}`}
                            onClick={() => setIndex(i)}
                            aria-label={`Show image ${i + 1} of ${images.length}`}
                            aria-current={i === index}
                        />
                    ))}
                </div>
            )}
        </figure>
    )
}

function ProjectLink({ link }) {
    const content = (
        <>
            <span>{link.label}</span>
            {link.note && <span className="project-dialog-link-note">{link.note}</span>}
        </>
    )

    if (!link.url) return <span className="project-dialog-link project-dialog-link--disabled">{content}</span>

    return (
        <a className="project-dialog-link" href={link.url} target="_blank" rel="noreferrer">
            {content}
            <span aria-hidden="true">↗</span>
        </a>
    )
}

export default function ProjectDialog({ project, onClose }) {
    const dialogRef = useRef(null)
    const returnFocusRef = useRef(null)
    const closeRef = useRef(null)
    const [closing, setClosing] = useState(false)

    useEffect(() => {
        const dialog = dialogRef.current
        if (project && !dialog.open) {
            returnFocusRef.current = document.activeElement
            dialog.showModal()
            closeRef.current?.focus()
        }
        if (!project && dialog.open) dialog.close()
    }, [project])

    // Every close path ends in dialog.close(), which fires the native close event handled below
    const requestClose = () => {
        if (closing) return
        if (prefersReducedMotion()) dialogRef.current.close()
        else setClosing(true)
    }

    const handleAnimationEnd = (event) => {
        if (closing && event.target === dialogRef.current) dialogRef.current.close()
    }

    const handleNativeClose = () => {
        setClosing(false)
        returnFocusRef.current?.focus()
        returnFocusRef.current = null
        onClose()
    }

    // Esc fires cancel first; take it over so the close animation can play
    const handleCancel = (event) => {
        event.preventDefault()
        requestClose()
    }

    // Clicks on the backdrop land on the <dialog> itself; clicks inside land on its children
    const handleClick = (event) => {
        if (event.target === dialogRef.current) requestClose()
    }

    const results = project?.results ?? []
    const stats = results.filter((result) => typeof result === 'object')
    const notes = results.filter((result) => typeof result === 'string')

    return (
        <dialog
            ref={dialogRef}
            className="project-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dialog-title"
            data-closing={closing || undefined}
            onCancel={handleCancel}
            onClose={handleNativeClose}
            onClick={handleClick}
            onAnimationEnd={handleAnimationEnd}
        >
            {project && (
                <div className="project-dialog-body">
                    <div className="project-dialog-toolbar">
                        <button type="button" className="project-dialog-close" ref={closeRef} onClick={requestClose} aria-label="Close">×</button>
                    </div>

                    {project.images?.length > 0 && <Gallery key={project.title} images={project.images} />}

                    <div className="project-dialog-content">
                        <header className="project-dialog-header">
                            <h3 className="project-dialog-title" id="project-dialog-title">{project.title}</h3>
                            {project.summary && <p className="project-dialog-summary">{project.summary}</p>}
                        </header>

                        {project.links?.length > 0 && (
                            <div className="project-dialog-links">
                                {project.links.map((link) => <ProjectLink key={link.label} link={link} />)}
                            </div>
                        )}

                        {project.problem && (
                            <Section title="Problem">
                                <p>{project.problem}</p>
                            </Section>
                        )}

                        {project.approach?.length > 0 && (
                            <Section title="Approach">
                                <ol className="project-dialog-steps">
                                    {project.approach.map((step) => <li key={step}>{step}</li>)}
                                </ol>
                            </Section>
                        )}

                        {results.length > 0 && (
                            <Section title="Results">
                                <div className="project-dialog-results">
                                    {stats.length > 0 && (
                                        <table>
                                            <tbody>
                                                {stats.map((stat) => (
                                                    <tr key={stat.label}>
                                                        <th scope="row">{stat.label}</th>
                                                        <td>{stat.value}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                    {notes.length > 0 && (
                                        <ul>
                                            {notes.map((note) => <li key={note}>{note}</li>)}
                                        </ul>
                                    )}
                                </div>
                            </Section>
                        )}

                        {project.learned?.length > 0 && (
                            <Section title="What I learned">
                                <ul className="project-dialog-bullets">
                                    {project.learned.map((lesson) => <li key={lesson}>{lesson}</li>)}
                                </ul>
                            </Section>
                        )}

                        {project.role && (
                            <p className="project-dialog-role">
                                <strong>My role:</strong> {project.role}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </dialog>
    )
}
