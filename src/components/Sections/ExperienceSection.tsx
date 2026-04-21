import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import '../../styles/components/ExperienceSection.scss'
import { experiences } from '../../data/experiences'
import { motion } from 'framer-motion'
import Reveal from '../Animations/Reveal'
import { useLang } from '../../context/LanguageContext'
import { translations } from '../../i18n/translations'

function computeDuration(startDate: string, lang: string): string {
  const [sy, sm] = startDate.split('-').map(Number)
  const now = new Date()
  let months = (now.getFullYear() - sy) * 12 + (now.getMonth() + 1 - sm)
  if (months < 1) months = 1
  const years = Math.floor(months / 12)
  const rem = months % 12
  if (lang === 'fr') {
    if (years === 0) return `${rem} mois`
    if (rem === 0) return years === 1 ? '1 an' : `${years} ans`
    return `${years} ${years === 1 ? 'an' : 'ans'} ${rem} mois`
  }
  if (years === 0) return `${rem} month${rem > 1 ? 's' : ''}`
  if (rem === 0) return `${years} year${years > 1 ? 's' : ''}`
  return `${years} year${years > 1 ? 's' : ''} ${rem} month${rem > 1 ? 's' : ''}`
}

function ExperienceSection() {
  const { lang } = useLang()
  const t = translations[lang].experience

  function getRandomColor() {
    const colors = [
      '#FF5733', '#33FFA8', '#3366FF', '#FF33A8', '#33FF33', '#FFD700',
      '#FF1493', '#00CED1', '#FF4500', '#7FFF00', '#FF6347', '#20B2AA',
      '#FF69B4', '#FF8C00', '#ac3c63', '#a448e5',
    ]
    const prevColor = localStorage.getItem('prevColor')
    const filteredColors = colors.filter((color) => color !== prevColor)
    const randomIndex = Math.floor(Math.random() * filteredColors.length)
    const selectedColor = filteredColors[randomIndex]
    localStorage.setItem('prevColor', selectedColor)
    return selectedColor
  }

  return (
    <motion.section id="experience" className="experience-section">
      <Reveal>
        <h1>{t.title}</h1>
      </Reveal>

      <VerticalTimeline className="vertical-timeline">
        {experiences.map((experience: any, index: number) => (
          <VerticalTimelineElement
            className="timeline-card"
            key={index}
            date={experience.date[lang]}
            iconStyle={{ background: '#1c1c1d', color: '#fff' }}
            icon={
              <div className="company-icon">
                {experience.company_logo ? (
                  <img
                    src={experience.company_logo}
                    alt={experience.company}
                    onError={(e) => {
                      const target = e.currentTarget
                      target.style.display = 'none'
                      const parent = target.parentElement
                      if (parent) {
                        const span = document.createElement('span')
                        span.className = 'company-initials'
                        span.textContent = experience.company
                          .split(' ')
                          .map((w: string) => w[0])
                          .join('')
                          .slice(0, 2)
                        parent.appendChild(span)
                      }
                    }}
                  />
                ) : (
                  <span className="company-initials">
                    {experience.company
                      .split(' ')
                      .map((w: string) => w[0])
                      .join('')
                      .slice(0, 2)}
                  </span>
                )}
              </div>
            }
            contentStyle={{ background: '#1c1c1d' }}
          >
            <Reveal>
              <h3 className="vertical-timeline-element-title">
                {experience.position[lang]}
              </h3>
            </Reveal>
            <Reveal>
              <h4 className="vertical-timeline-element-subtitle">
                {experience.company} — {experience.location}
              </h4>
            </Reveal>

            {experience.subProjects ? (
              <div className="sub-projects">
                {experience.subProjects.map((sub: any, subIndex: number) => (
                  <div key={subIndex} className="sub-project">
                    <Reveal>
                      <h5 className="sub-project-name">🚩 {sub.name[lang]}</h5>
                    </Reveal>
                    <Reveal>
                      <span className="sub-project-date">
                        {sub.date[lang]} · {sub.startDate ? computeDuration(sub.startDate, lang) : sub.duration[lang]}
                      </span>
                    </Reveal>
                    <ul>
                      {sub.responsibilities[lang].map(
                        (responsibility: string, rIndex: number) => (
                          <li className="responsibility-item" key={rIndex}>
                            <Reveal>
                              <div>{responsibility}</div>
                            </Reveal>
                          </li>
                        ),
                      )}
                    </ul>
                    <Reveal>
                      <div className="techs">
                        {sub.technologies.map((tech: string, tIndex: number) => (
                          <span key={tIndex} style={{ color: getRandomColor() }}>
                            #{tech}
                          </span>
                        ))}
                      </div>
                    </Reveal>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <Reveal>
                  <h5>{experience.project[lang]}</h5>
                </Reveal>
                <ul>
                  {experience.responsibilities[lang].map(
                    (responsibility: string, rIndex: number) => (
                      <li className="responsibility-item" key={rIndex}>
                        <Reveal>
                          <div>{responsibility}</div>
                        </Reveal>
                      </li>
                    ),
                  )}
                </ul>
                <Reveal>
                  <div className="techs">
                    {experience.technologies.map(
                      (tech: string, tIndex: number) => (
                        <span key={tIndex} style={{ color: getRandomColor() }}>
                          #{tech}
                        </span>
                      ),
                    )}
                  </div>
                </Reveal>
              </>
            )}
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </motion.section>
  )
}

export default ExperienceSection
