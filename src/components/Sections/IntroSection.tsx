import { useEffect, useState } from 'react'
import '../../styles/components/IntroSection.scss'
import TextSpan from './TextSpan'
import { AvatarCanvas } from '../Canvas/AvatarCanvas'
import { motion } from 'framer-motion'

const roles = [
  'Full Stack Developer',
  'Frontend Developer',
  'Backend Developer',
  'Design Enthusiast',
]

function IntroSection() {
  const [roleIndex, setRoleIndex] = useState(0)
  const delay = 2

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prevIndex) => (prevIndex + 1) % roles.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section id="intro" className="intro-section">
      <div className="background-canvas">
        <AvatarCanvas />
      </div>
      <motion.h1
        initial={{
          opacity: 0,
        }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: delay * 0.5 }}
      >
        NABIL AMHAOUCH
      </motion.h1>
      <motion.div
        className="role-text"
        initial={{
          opacity: 0,
        }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: delay * 1.5 }}
      >
        {Array.from('Software Engineer').map((letter, index) => (
          <TextSpan key={index}>{letter === ' ' ? '\u00A0' : letter}</TextSpan>
        ))}
      </motion.div>
      <motion.div
        className="roles-wrapper"
        initial={{
          opacity: 0,
        }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: delay * 2 }}
      >
        <div className="plus">+</div>
        <div className="roles-container">
          {roles.map((role, index) => (
            <div key={index} className={index === roleIndex ? 'active' : ''}>
              {role}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default IntroSection
