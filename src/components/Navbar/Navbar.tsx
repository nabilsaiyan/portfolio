import { useState } from 'react'
import '../../styles/components/Navbar.scss'

function Navbar() {
  const [showMenu, setShowMenu] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      const yOffset = -140
      const element = document.getElementById(sectionId)
      const y =
        element?.getBoundingClientRect()?.top &&
        element.getBoundingClientRect().top + window.pageYOffset + yOffset

      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  const handleMenuToggle = () => {
    setShowMenu(!showMenu)
  }

  return (
    <nav className="navbar">
      <ul>
        <div className="logo-wrapper">
          <li className="special">
            <a onClick={() => scrollToSection('intro')}>N</a>
          </li>
        </div>
        <div className={`nav-sections ${showMenu ? 'show' : ''}`}>
          <li>
            <a onClick={() => scrollToSection('experience')}>Experience</a>
          </li>
          <li>
            <a onClick={() => scrollToSection('projects')}>Projects</a>
          </li>
          <li>
            <a onClick={() => scrollToSection('details')}>Details</a>
          </li>
        </div>
        <div className={`nav-icons ${showMenu ? 'show' : ''}`}>
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
        <div className={`menu-icon ${showMenu ? 'hide' : ''}`}>
          <a className="fas fa-bars menu-icon-a" onClick={handleMenuToggle}></a>
        </div>
        <div className={`menu-icon-close ${showMenu ? 'show' : ''}`}>
          <i
            className="fa-solid fa-xmark menu-icon-a"
            onClick={handleMenuToggle}
          ></i>
        </div>
      </ul>
    </nav>
  )
}

export default Navbar
