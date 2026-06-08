import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLang } from '../../context/LanguageContext'
import { translations } from '../../i18n/translations'
import { projectsMeta } from '../../data/projects'
import '../../styles/components/ProjectDetailModal.scss'

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

const PROJECT_NAMES: Record<string, string> = { p1: 'Cartello', p2: 'Series Finder', p3: 'Mobile App' }
const PROJECT_NUMBERS: Record<string, string> = { p1: '01', p2: '02', p3: '03' }

function MediaPlayer({ src }: { src: string }) {
  const ext = src.split('.').pop()?.toLowerCase() ?? ''
  if (['mp4', 'mov', 'webm'].includes(ext)) {
    return <video src={src} autoPlay loop muted playsInline className="pdm-media-content" />
  }
  return <img src={src} alt="demo" className="pdm-media-content" />
}

interface Props {
  projectKey: 'p1' | 'p2' | 'p3' | null
  onClose: () => void
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.35 + i * 0.09, duration: 0.45, ease: 'easeOut' },
  }),
}

export default function ProjectDetailModal({ projectKey, onClose }: Props) {
  const { lang } = useLang()
  const t = translations[lang].projects

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  useEffect(() => {
    if (projectKey) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [projectKey])

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  return (
    <AnimatePresence>
      {projectKey && (() => {
        const project = t[projectKey]
        const meta = projectsMeta[projectKey]
        const num = PROJECT_NUMBERS[projectKey]
        const name = PROJECT_NAMES[projectKey]
        const hasMedia = !!(meta.demoDesktop || meta.demoMobile)
        const browserUrl = meta.live
          ? meta.live.replace(/^https?:\/\//, '')
          : `${name.toLowerCase().replace(' ', '-')}.local`

        return (
          <motion.div
            key={projectKey}
            className="pdm-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="pdm-backdrop" onClick={onClose} />

            <motion.div
              className="pdm-panel"
              initial={isMobile ? { y: '100%' } : { x: '100%' }}
              animate={isMobile ? { y: 0 } : { x: 0 }}
              exit={isMobile ? { y: '100%' } : { x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 220 }}
            >
              {/* Scan line sweep */}
              <motion.div
                className="pdm-scan-line"
                initial={{ top: 0, opacity: 1 }}
                animate={{ top: '100%', opacity: 0 }}
                transition={{ duration: 0.75, ease: 'linear' }}
              />

              {/* Header */}
              <div className="pdm-header">
                <div className="pdm-project-tag">
                  <span className="pdm-bracket">&lt;</span>
                  <span className="pdm-num">{num}</span>
                  <span className="pdm-name">{name}</span>
                  <span className="pdm-bracket">/&gt;</span>
                </div>
                <button className="pdm-close-btn" onClick={onClose}>
                  <span className="pdm-esc">ESC</span>
                  <span className="pdm-x">×</span>
                </button>
              </div>

              {/* Body */}
              <div className="pdm-body">

                {/* Left: info */}
                <div className="pdm-info">
                  <motion.h2
                    className="pdm-title"
                    custom={0}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {project.title}
                  </motion.h2>

                  <motion.ul
                    className="pdm-features"
                    custom={1}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {project.features.map((f, i) => <li key={i}>{f}</li>)}
                  </motion.ul>

                  <motion.div
                    className="pdm-techs"
                    custom={2}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="pdm-tech-tag"
                        style={{
                          color: getTechColor(tech),
                          borderColor: `${getTechColor(tech)}44`,
                          background: `${getTechColor(tech)}0d`,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </motion.div>

                  <motion.div
                    className="pdm-actions"
                    custom={3}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {meta.github && (
                      <a
                        href={meta.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pdm-action-btn"
                      >
                        GitHub <span className="pdm-arrow">→</span>
                      </a>
                    )}
                    {meta.live && (
                      <a
                        href={meta.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pdm-action-btn pdm-action-btn--live"
                      >
                        Live Demo <span className="pdm-arrow">→</span>
                      </a>
                    )}
                  </motion.div>
                </div>

                {/* Right: media */}
                <motion.div
                  className="pdm-media"
                  custom={2}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {meta.demoDesktop && (
                    <div className="pdm-browser-frame">
                      <div className="pdm-browser-chrome">
                        <div className="pdm-browser-dots">
                          <span /><span /><span />
                        </div>
                        <div className="pdm-browser-url">{browserUrl}</div>
                      </div>
                      <MediaPlayer src={meta.demoDesktop} />
                    </div>
                  )}

                  {meta.demoMobile && (
                    <div className={`pdm-phone-frame${meta.demoDesktop ? ' pdm-phone-frame--compact' : ''}`}>
                      <div className="pdm-phone-notch" />
                      <MediaPlayer src={meta.demoMobile} />
                      <div className="pdm-phone-home" />
                    </div>
                  )}

                  {!hasMedia && (
                    <div className="pdm-placeholder">
                      <div className="pdm-placeholder-inner">
                        <span className="pdm-cursor">_</span>
                        <p>demo coming soon</p>
                      </div>
                    </div>
                  )}
                </motion.div>

              </div>
            </motion.div>
          </motion.div>
        )
      })()}
    </AnimatePresence>
  )
}
