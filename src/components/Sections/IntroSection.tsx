import '../../styles/components/IntroSection.scss'
import TextSpan from '../Common/TextSpan'
import { AvatarCanvas } from '../Canvas/AvatarCanvas'
import { motion } from 'framer-motion'
import Reveal from '../Animations/Reveal'
import RolesAnimation from '../Animations/RolesAnimation'

function IntroSection() {
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
        <motion.div className="roles-wrapper">
          <div className="plus">+</div>
          <RolesAnimation />
        </motion.div>
      </div>
    </section>
  )
}

export default IntroSection
