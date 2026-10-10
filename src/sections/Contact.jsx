import contactImage from '../assets/contact.png'

function Contact() {
    return (
        <section className="contact-section" id="contact">
            <div className="contact-row">
                <div className="contact-visual" data-reveal>
                    <img className="contact-photo" src={contactImage} alt="Illustrated cutout of Maya" />
                </div>

                <div className="contact-content" data-reveal style={{ '--reveal-delay': '150ms' }}>
                    <h2 className="contact-title">I would like to hear from you!</h2>
                    <div className="contact-socials">
                        <a
                            className="contact-social"
                            href="https://github.com/mahya-ehs"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="GitHub"
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.04-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.74.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.48.11-3.08 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.6.24 2.79.12 3.08.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.27 5.69.42.36.78 1.08.78 2.18 0 1.57-.01 2.84-.01 3.23 0 .3.2.66.79.55A10.51 10.51 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5Z" />
                            </svg>
                        </a>
                        <a
                            className="contact-social"
                            href="mailto:mahya.ehsanimehr@gmail.com"
                            aria-label="Email"
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <rect x="2.5" y="4.5" width="19" height="15" rx="2" stroke="currentColor" strokeWidth="1.6" />
                                <path d="M3.5 6l8.5 6.5L20.5 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                        <a
                            className="contact-social"
                            href="https://www.linkedin.com/in/mahya-ehsanimehr/"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="LinkedIn"
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM2.5 9.5h5V21h-5V9.5ZM9.5 9.5h4.8v1.57h.07c.67-1.18 2.3-2.42 4.73-2.42 5.06 0 6 3 6 6.9V21h-5v-5.3c0-1.26-.02-2.87-1.75-2.87-1.75 0-2.02 1.37-2.02 2.78V21h-5V9.5Z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact
