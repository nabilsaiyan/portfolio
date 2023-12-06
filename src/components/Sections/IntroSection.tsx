import { useEffect, useState } from 'react'
import '../../styles/components/IntroSection.scss'
import AbstractShapeCanvas from './AbstractShapeCanvas'

const roles = [
  'Full Stack Developer',
  'Frontend Developer',
  'Backend Developer',
  'Design Enthusiast',
]

function IntroSection() {
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prevIndex) => (prevIndex + 1) % roles.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section id="intro" className="intro-section">
      <div className="background-canvas">
        <AbstractShapeCanvas />
      </div>
      <h1>NABIL AMHAOUCH</h1>
      {/* <span className="role-text">Software Engineer</span> */}
      <span className="role-text">
        {Array.from('Software Engineer').map((letter, index) => (
          <span key={index} className="animated-letter">
            {letter}
          </span>
        ))}
      </span>
      <div className="roles-wrapper">
        <div className="plus">+</div>
        <div className="roles-container">
          {roles.map((role, index) => (
            <div key={index} className={index === roleIndex ? 'active' : ''}>
              {role}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default IntroSection
