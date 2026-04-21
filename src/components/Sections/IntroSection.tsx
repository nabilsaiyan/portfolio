import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import '../../styles/components/IntroSection.scss'
import { AvatarCanvas } from '../Canvas/AvatarCanvas'
import MouseScroll from '../Common/MouseScroll'
import GlitchName from '../Common/GlitchName'
import { useLang } from '../../context/LanguageContext'
import { translations } from '../../i18n/translations'

const C = '#00d4ff'

function IntroSection() {
  const { lang } = useLang()
  const t = translations[lang].intro
  const [phase, setPhase] = useState(0)
  const [selectedIdx, setSelectedIdx] = useState(0)


  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 300)
    const t2 = setTimeout(() => setPhase(2), 1000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  useEffect(() => {
    if (phase < 2) return
    const id = setInterval(() => setSelectedIdx(i => (i + 1) % t.roles.length), 1800)
    return () => clearInterval(id)
  }, [phase, t.roles.length])

  return (
    <section id="intro" className="intro-section">
      <div className="background-canvas">
        <AvatarCanvas />
      </div>

      <div className="intro-content">
        <motion.div
          className="intro-prompt"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 1 ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <span style={{ color: C }}>$</span> {t.prompt}
        </motion.div>

        <AnimatePresence>
          {phase >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="intro-name-block"
            >
              <GlitchName />
              <div className="intro-title">{t.role.toUpperCase()}</div>
            </motion.div>
          )}
        </AnimatePresence>

        {phase >= 2 && (
          <motion.div
            className="intro-roles"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
          >
            {t.roles.map((role, i) => {
              const active = selectedIdx === i
              return (
                <div key={role} className="intro-roles__item">
                  <motion.span
                    className="intro-roles__cursor"
                    animate={{ opacity: active ? 1 : 0, x: active ? 0 : -6 }}
                    transition={{ duration: 0.15 }}
                    style={{ color: C }}
                  >
                    ❯
                  </motion.span>
                  <span
                    className={`intro-roles__label${active ? ' intro-roles__label--active' : ''}`}
                  >
                    {role}
                  </span>
                </div>
              )
            })}
          </motion.div>
        )}
      </div>

      <div className="mouse-scroll">
        <MouseScroll variant="classic" />
      </div>
    </section>
  )
}

export default IntroSection
