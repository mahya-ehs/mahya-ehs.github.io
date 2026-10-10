import { useState } from 'react'

function Navbar() {
	const [isOpen, setIsOpen] = useState(false)

	const closeMenu = () => setIsOpen(false)

	return (
		<nav className="navbar" aria-label="Main navigation">
			<a className="brand" href="#top" aria-label="Maya home">Maya Ehsanimehr<span>.</span></a>

			<button
				type="button"
				className={`nav-toggle${isOpen ? ' nav-toggle--open' : ''}`}
				aria-label="Toggle menu"
				aria-expanded={isOpen}
				onClick={() => setIsOpen((open) => !open)}
			>
				<span />
				<span />
				<span />
			</button>

			<div className={`nav-links${isOpen ? ' nav-links--open' : ''}`}>
				<a href="#top" onClick={closeMenu}>Home</a>
				<a href="#about" onClick={closeMenu}>About</a>
				<a href="#projects" onClick={closeMenu}>Projects</a>
				<a href="#contact" onClick={closeMenu}>Contact</a>
			</div>
		</nav>
	)
}

export default Navbar
