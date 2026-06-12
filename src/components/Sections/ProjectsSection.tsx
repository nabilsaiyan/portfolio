import { lazy, Suspense, useState } from 'react'
import '../../styles/components/ProjectsSection.scss'
import Reveal from '../Animations/Reveal'
import { useLang } from '../../context/LanguageContext'
import { translations } from '../../i18n/translations'
import ProjectDetailModal from './ProjectDetailModal'

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

const CartelloCanvas = lazy(() => import('../Canvas/CartelloCanvas'))
const LaptopCanvas = lazy(() => import('../Canvas/LaptopCanvas'))
const PhonesCanvas = lazy(() => import('../Canvas/PhonesCanvas'))
const NexaBarV1cCanvas = lazy(() => import('../Canvas/NexaBarV1cCanvas'))

type ProjectKey = 'p1' | 'p2' | 'p3' | 'p4'

function ProjectsSection() {
  const { lang } = useLang()
  const t = translations[lang].projects
  const [openProject, setOpenProject] = useState<ProjectKey | null>(null)

  return (
    <section id="projects" className="projects-section">
      <Reveal styles={{ display: 'flex', alignSelf: 'flex-start' }}>
        <h1 className="title-section">{t.title}</h1>
      </Reveal>

      {/* ── 01 Cartello ───────────────────────────────────── */}
      <div className="part-one">
        <div className="text-iphone t1" style={{ position: 'relative', zIndex: 1 }}>
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
          <div className="view-button-row">
            <span className="view-button" onClick={() => setOpenProject('p1')} data-text={t.viewProject}>
              <a>{t.viewProject}</a>
              <span className="view-button__arrow">→</span>
            </span>
            <div className="drag-hint">
              <span className="drag-hint__card" aria-hidden />
              <span>drag card to rotate</span>
              <span className="drag-hint__arrow" aria-hidden />
            </div>
          </div>
        </div>
        <div className="background-canvas" style={{ zIndex: 0 }}>
          <Suspense fallback={null}>
            <CartelloCanvas
              frontUrl="/images/cartello-card-front.png"
              backUrl="/images/cartello-card-back.png"
            />
          </Suspense>
        </div>

      </div>

      {/* ── 02 Nexametrics ────────────────────────────────── */}
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
          <div className="view-button-row">
            <span className="view-button" onClick={() => setOpenProject('p2')} data-text={t.viewProject}>
              <a>{t.viewProject}</a>
              <span className="view-button__arrow">→</span>
            </span>
          </div>
        </div>
        <div className="background-canvas">
          <Suspense fallback={null}>
            <NexaBarV1cCanvas />
          </Suspense>
        </div>
      </div>

      {/* ── 03 Series Finder ──────────────────────────────── */}
      <div className="part-three">
        <div className="text-iphone t3">
          <Reveal>
            <div className="divider">
              <p>03</p>
              <hr />
            </div>
          </Reveal>
          <Reveal>
            <h1>{t.p3.title}</h1>
          </Reveal>
          <ul>
            {t.p3.features.map((feature, i) => (
              <li key={i}>
                <Reveal>
                  <div>{feature}</div>
                </Reveal>
              </li>
            ))}
          </ul>
          <Reveal>
            <div className="project-techs">
              {t.p3.technologies.map((tech: string) => (
                <span key={tech} className="project-tech-tag" style={{
                  color: getTechColor(tech),
                  borderColor: `${getTechColor(tech)}44`,
                  background: `${getTechColor(tech)}0d`,
                }}>{tech}</span>
              ))}
            </div>
          </Reveal>
          <div className="view-button-row">
            <span className="view-button" onClick={() => setOpenProject('p3')} data-text={t.viewProject}>
              <a>{t.viewProject}</a>
              <span className="view-button__arrow">→</span>
            </span>
          </div>
        </div>
        <div className="background-canvas">
          <Suspense fallback={null}>
            <LaptopCanvas imageUrl="/images/series-finder.jpg" />
          </Suspense>
        </div>
      </div>

      {/* ── 04 Mobile App ─────────────────────────────────── */}
      <div className="part-four">
        <div className="text-iphone t4">
          <Reveal>
            <div className="divider">
              <p>04</p>
              <hr />
            </div>
          </Reveal>
          <Reveal>
            <h1>{t.p4.title}</h1>
          </Reveal>
          <ul>
            {t.p4.features.map((feature, i) => (
              <li key={i}>
                <Reveal>
                  <div>{feature}</div>
                </Reveal>
              </li>
            ))}
          </ul>
          <Reveal>
            <div className="project-techs">
              {t.p4.technologies.map((tech: string) => (
                <span key={tech} className="project-tech-tag" style={{
                  color: getTechColor(tech),
                  borderColor: `${getTechColor(tech)}44`,
                  background: `${getTechColor(tech)}0d`,
                }}>{tech}</span>
              ))}
            </div>
          </Reveal>
          <div className="view-button-row">
            <span className="view-button" onClick={() => setOpenProject('p4')} data-text={t.viewProject}>
              <a>{t.viewProject}</a>
              <span className="view-button__arrow">→</span>
            </span>
          </div>
        </div>
        <div className="background-canvas">
          <Suspense fallback={null}>
            <PhonesCanvas />
          </Suspense>
        </div>
      </div>

      <ProjectDetailModal
        projectKey={openProject}
        onClose={() => setOpenProject(null)}
      />
    </section>
  )
}

export default ProjectsSection
