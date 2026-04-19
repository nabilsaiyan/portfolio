import '../../styles/components/IntroSection.scss'
import TextSpan from '../Common/TextSpan'
import { AvatarCanvas } from '../Canvas/AvatarCanvas'
import { motion } from 'framer-motion'
import Reveal from '../Animations/Reveal'
import RolesAnimation from '../Animations/RolesAnimation'
import MouseScroll from '../Common/MouseScroll'
import { useLang } from '../../context/LanguageContext'
import { translations } from '../../i18n/translations'
import GlitchName from '../Common/GlitchName'

function IntroSection() {
  const { lang } = useLang()
  const role = translations[lang].intro.role

  return (
    <section id="intro" className="intro-section">
      <div className="background-canvas">
        <AvatarCanvas />
      </div>
      <div>
        <Reveal>
          <GlitchName />
        </Reveal>
        <Reveal>
          <motion.div className="role-text">
            {Array.from(role).map((letter, index) => (
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
      <div className="mouse-scroll">
        <MouseScroll />
      </div>
    </section>
  )
}

export default IntroSection
