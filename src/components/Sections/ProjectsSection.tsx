import '../../styles/components/ProjectsSection.scss'
import Reveal from '../Animations/Reveal'
import LaptopCanvas from '../Canvas/LaptopCanvas'
import PhonesCanvas from '../Canvas/PhonesCanvas'
import { useLang } from '../../context/LanguageContext'
import { translations } from '../../i18n/translations'

function ProjectsSection() {
  const { lang } = useLang()
  const t = translations[lang].projects

  const goToGitHubProject = () => {
    window.open(
      'https://github.com/nabilsaiyan/series-finder-frontend',
      '_blank',
      'noopener noreferrer',
    )
  }

  return (
    <section id="projects" className="projects-section">
      <Reveal styles={{ display: 'flex', alignSelf: 'flex-start' }}>
        <h1 className="title-section">{t.title}</h1>
      </Reveal>

      <div className="part-one">
        <div className="text-iphone t1">
          <Reveal>
            <div className="divider">
              <hr />
              <p>01</p>
            </div>
          </Reveal>

          <Reveal>
            <h1>{t.p1.title}</h1>
          </Reveal>

          <ul>
            {t.p1.features.map((feature, i) => (
              <li key={i}>
                <Reveal>
                  <div>{feature}</div>
                </Reveal>
              </li>
            ))}
          </ul>
          <span className="view-button" onClick={goToGitHubProject}>
            <a>{t.viewProject}</a>
            <span className="material-symbols-outlined">north_east</span>
          </span>
        </div>
        <div className="background-canvas">
          <LaptopCanvas />
        </div>
      </div>
      <div className="part-two">
        <div className="text-iphone t2">
          <Reveal>
            <div className="divider">
              <hr />
              <p>02</p>
            </div>
          </Reveal>

          <Reveal>
            <h1>{t.p2.title}</h1>
          </Reveal>

          <ul>
            {t.p2.features.map((feature, i) => (
              <li key={i}>
                <Reveal>
                  <div>{feature}</div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
        <div className="background-canvas">
          <PhonesCanvas />
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
