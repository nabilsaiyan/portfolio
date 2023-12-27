import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import '../../styles/components/ExperienceSection.scss'
import { experiences } from '../../data/experiences'
import { motion } from 'framer-motion'
import Reveal from '../Animations/Reveal'

function ExperienceSection() {
  function getRandomColor() {
    const colors = [
      '#FF5733',
      '#33FFA8',
      '#3366FF',
      '#FF33A8',
      '#33FF33',
      '#FFD700',
      '#FF1493',
      '#00CED1',
      '#FF4500',
      '#7FFF00',
      '#FF6347',
      '#20B2AA',
      '#FF69B4',
      '#FF8C00',
      '#ac3c63',
      '#a448e5',
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
        <h1>Experience</h1>
      </Reveal>

      <VerticalTimeline className="vertical-timeline">
        {experiences.map((experience, index) => (
          <VerticalTimelineElement
            className="timeline-card"
            key={index}
            date={experience.date}
            iconStyle={{ background: '#1c1c1d', color: '#fff' }}
            icon={
              <div className="company-icon">
                <img
                  src={experience.company_logo}
                  alt={experience.company_logo}
                />
              </div>
            }
            contentStyle={{ background: '#1c1c1d' }}
          >
            <Reveal>
              <h3 className="vertical-timeline-element-title">
                {experience.position}
              </h3>
            </Reveal>
            <Reveal>
              <h4 className="vertical-timeline-element-subtitle">
                {experience.company} - {experience.location}
              </h4>
            </Reveal>
            <Reveal>
              <h5>{experience.project}</h5>
            </Reveal>

            <ul>
              {experience.responsibilities.map((responsibility, index) => (
                <Reveal key={index}>
                  <li key={index}>{responsibility}</li>
                </Reveal>
              ))}
            </ul>
            <Reveal>
              <div className="techs">
                {experience.technologies.map((tech, index) => (
                  <span
                    key={index}
                    style={{
                      color: getRandomColor(),
                    }}
                  >
                    #{tech}
                  </span>
                ))}
              </div>
            </Reveal>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </motion.section>
  )
}

export default ExperienceSection
