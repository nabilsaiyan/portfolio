import { lazy, Suspense } from 'react'
import '../../styles/components/ProjectsSection.scss'
import Reveal from '../Animations/Reveal'
import { useLang } from '../../context/LanguageContext'
import { translations } from '../../i18n/translations'

const TECH_COLORS = [
  '#FF5733', '#33FFA8', '#3366FF', '#FF33A8', '#33FF33', '#FFD700',
  '#FF1493', '#00CED1', '#FF4500', '#7FFF00', '#FF6347', '#20B2AA',
  '#FF69B4', '#FF8C00', '#ac3c63', '#a448e5',
]
const getTechColor = (tech: string) => {
  let hash = 0
  for (let i = 0; i < tech.length; i++) hash = tech.charCodeAt(i) + ((hash << 5) - hash)
  return TECH_COLORS[Math.abs(hash) % TECH_COLORS.length]
}

const LaptopCanvas = lazy(() => import('../Canvas/LaptopCanvas'))
const PhonesCanvas = lazy(() => import('../Canvas/PhonesCanvas'))

function ProjectsSection() {
  const { lang } = useLang()
  const t = translations[lang].projects

  const goToGitHubProject = () => {
    window.open(
      'https://github.com/nabilsaiyan/series-finder',
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
              <p>01</p>
              <hr />
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
          <Reveal>
            <div className="project-techs">
              {t.p1.technologies.map((tech: string) => (
                <span key={tech} className="project-tech-tag" style={{
                  color: getTechColor(tech),
                  borderColor: `${getTechColor(tech)}44`,
                  background: `${getTechColor(tech)}0d`,
                }}>{tech}</span>
              ))}
            </div>
          </Reveal>
          <span className="view-button" onClick={goToGitHubProject} data-text={t.viewProject}>
            <a>{t.viewProject}</a>
            <span className="view-button__arrow">→</span>
          </span>
        </div>
        <div className="background-canvas">
          <Suspense fallback={null}>
            <LaptopCanvas />
          </Suspense>
        </div>
      </div>
      <div className="part-two">
        <div className="text-iphone t2">
          <Reveal>
            <div className="divider">
              <p>02</p>
              <hr />
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
          <Reveal>
            <div className="project-techs">
              {t.p2.technologies.map((tech: string) => (
                <span key={tech} className="project-tech-tag" style={{
                  color: getTechColor(tech),
                  borderColor: `${getTechColor(tech)}44`,
                  background: `${getTechColor(tech)}0d`,
                }}>{tech}</span>
              ))}
            </div>
          </Reveal>
        </div>
        <div className="background-canvas">
          <Suspense fallback={null}>
            <PhonesCanvas />
          </Suspense>
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
