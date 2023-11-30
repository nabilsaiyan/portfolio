import '../../styles/components/Navbar.scss'

function Navbar() {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="navbar">
      <ul>
        <div className="logo-wrapper">
          <li className="special">
            <a onClick={() => scrollToSection('intro')}>N</a>
          </li>
        </div>
        <div className="nav-sections">
          <li>
            <a onClick={() => scrollToSection('intro')}>Intro</a>
          </li>
          <li>
            <a onClick={() => scrollToSection('projects')}>Projects</a>
          </li>
          <li>
            <a onClick={() => scrollToSection('contact')}>Contact</a>
          </li>
        </div>
        <div className="nav-icons">
          <li>
            <a
              href="https://github.com/nabilsaiyan"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-github"></i>
            </a>
          </li>

          <li>
            <a
              href="https://www.linkedin.com/in/nabil-amhaouch/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin"></i>{' '}
            </a>
          </li>
        </div>
      </ul>
    </nav>
  )
}

export default Navbar
