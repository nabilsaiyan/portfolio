import { useState } from 'react'
import '../../styles/components/Navbar.scss'
import { useLang } from '../../context/LanguageContext'
import { translations } from '../../i18n/translations'

function Navbar() {
  const [showMenu, setShowMenu] = useState(false)
  const { lang, setLang } = useLang()
  const t = translations[lang].nav

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      let yOffset = 0
      if (sectionId === 'intro') yOffset = -140
      else if (sectionId !== 'Details') yOffset = -100
      const element = document.getElementById(sectionId)
      const y =
        element?.getBoundingClientRect()?.top &&
        element.getBoundingClientRect().top + window.pageYOffset + yOffset

      window.scrollTo({ top: y, behavior: 'smooth' })
    }
    setShowMenu(false)
  }

  const handleMenuToggle = () => {
    setShowMenu(!showMenu)
  }

  return (
    <nav className={`navbar ${showMenu ? 'show' : ''}`}>
      <ul>
        <div className="logo-wrapper">
          <li className="special">
            <a onClick={() => scrollToSection('intro')}>N</a>
          </li>
        </div>
        <div className={`nav-sections ${showMenu ? 'show' : ''}`}>
          <li>
            <a onClick={() => scrollToSection('experience')}>{t.experience}</a>
          </li>
          <li>
            <a onClick={() => scrollToSection('projects')}>{t.projects}</a>
          </li>
          <li>
            <a onClick={() => scrollToSection('details')}>{t.details}</a>
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
              <i className="fab fa-linkedin"></i>
            </a>
          </li>
          <li className="lang-toggle">
            <button
              className={lang === 'fr' ? 'active' : ''}
              onClick={() => setLang('fr')}
            >
              FR
            </button>
            <span className="lang-sep">|</span>
            <button
              className={lang === 'en' ? 'active' : ''}
              onClick={() => setLang('en')}
            >
              EN
            </button>
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
