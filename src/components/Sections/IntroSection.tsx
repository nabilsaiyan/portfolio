import { useEffect, useState } from 'react'
import '../../styles/components/IntroSection.scss'
import TextSpan from '../Common/TextSpan'
import { AvatarCanvas } from '../Canvas/AvatarCanvas'
import { motion } from 'framer-motion'
import Reveal from '../Animations/Reveal'
import RevealRole from '../Animations/RevealRole'

const roles = ['Web Developer', 'Mobile Developer', 'Design Enthusiast']

function IntroSection() {
  const [roleIndex, setRoleIndex] = useState(0)

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setRoleIndex((prevIndex) => (prevIndex + 1) % roles.length)
  //   }, 3000)

  //   return () => clearInterval(interval)
  // }, [])

  return (
    <section id="intro" className="intro-section">
      <div className="background-canvas">
        <AvatarCanvas />
      </div>

      <div>
        <Reveal>
          <h1>NABIL AMHAOUCH</h1>
        </Reveal>
        <Reveal>
          <motion.div className="role-text">
            {Array.from('Software Engineer').map((letter, index) => (
              <TextSpan key={index}>
                {letter === ' ' ? '\u00A0' : letter}
              </TextSpan>
            ))}
          </motion.div>
        </Reveal>
        {/* <Reveal width="100%"> */}
        <motion.div className="roles-wrapper">
          <div className="plus">+</div>
          <div className="roles-container">
            {/* {roles.map((role, index) => (
              <div key={index} className={index === roleIndex ? 'active' : ''}>
                {role}
              </div> */}
            {/* ))} */}
            <RevealRole>
              <span className="additional-role">Web Developer</span>
            </RevealRole>
          </div>
        </motion.div>
        {/* </Reveal> */}
      </div>
    </section>
  )
}

export default IntroSection
