import { forwardRef, useEffect, useRef, useState } from 'react'
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

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" aria-hidden>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  )
}

function ExternalLinkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13" aria-hidden>
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  )
}

function ExpandIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13" aria-hidden>
      <polyline points="15 3 21 3 21 9"/>
      <polyline points="9 21 3 21 3 15"/>
      <line x1="21" y1="3" x2="14" y2="10"/>
      <line x1="3" y1="21" x2="10" y2="14"/>
    </svg>
  )
}

function CollapseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13" aria-hidden>
      <polyline points="4 14 10 14 10 20"/>
      <polyline points="20 10 14 10 14 4"/>
      <line x1="10" y1="14" x2="3" y2="21"/>
      <line x1="21" y1="3" x2="14" y2="10"/>
    </svg>
  )
}

const MediaPlayer = forwardRef<HTMLVideoElement, { src: string }>(({ src }, ref) => {
  const ext = src.split('.').pop()?.toLowerCase() ?? ''
  if (['mp4', 'mov', 'webm'].includes(ext)) {
    return (
      <video
        ref={ref}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className="pdm-media-content"
      />
    )
  }
  return <img src={src} alt="demo" className="pdm-media-content" />
})
MediaPlayer.displayName = 'MediaPlayer'

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

  const browserVideoRef = useRef<HTMLVideoElement>(null)
  const phoneVideoRef = useRef<HTMLVideoElement>(null)
  const [fsActive, setFsActive] = useState<string | null>(null)

  useEffect(() => {
    const onChange = () => {
      const el = document.fullscreenElement || (document as any).webkitFullscreenElement
      if (!el) {
        if (browserVideoRef.current) browserVideoRef.current.controls = false
        if (phoneVideoRef.current) phoneVideoRef.current.controls = false
        setFsActive(null)
      } else if (el === browserVideoRef.current) {
        setFsActive('browser')
      } else if (el === phoneVideoRef.current) {
        setFsActive('phone')
      }
    }
    document.addEventListener('fullscreenchange', onChange)
    document.addEventListener('webkitfullscreenchange', onChange)
    return () => {
      document.removeEventListener('fullscreenchange', onChange)
      document.removeEventListener('webkitfullscreenchange', onChange)
    }
  }, [])

  const toggleFs = (videoRef: React.RefObject<HTMLVideoElement>) => {
    const v = videoRef.current
    if (!v) return
    const isFs = !!(document.fullscreenElement || (document as any).webkitFullscreenElement)
    if (isFs) {
      ;(document.exitFullscreen ?? (document as any).webkitExitFullscreen)?.call(document)
    } else {
      v.controls = true
      v.muted = false
      const req = v.requestFullscreen?.bind(v) ?? (v as any).webkitRequestFullscreen?.bind(v)
      req?.()
    }
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isFs = !!(document.fullscreenElement || (document as any).webkitFullscreenElement)
      if (e.key === 'Escape' && !isFs) onClose()
    }
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
          ? meta.live.replace(/^https?:\/\//, '').replace(/\/$/, '')
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
                <div className="pdm-header-right">
                  {meta.github && (
                    <a
                      href={meta.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pdm-action-btn"
                    >
                      <GitHubIcon />
                      <span className="pdm-btn-label">GitHub</span>
                    </a>
                  )}
                  {meta.live && (
                    <a
                      href={meta.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pdm-action-btn pdm-action-btn--live"
                    >
                      <ExternalLinkIcon />
                      <span className="pdm-btn-label">Live Demo</span>
                    </a>
                  )}
                  <button className="pdm-close-btn" onClick={onClose}>
                    <span className="pdm-esc">ESC</span>
                    <span className="pdm-x">×</span>
                  </button>
                </div>
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
                        <button
                          className="pdm-fs-btn"
                          onClick={() => toggleFs(browserVideoRef)}
                          title="Fullscreen"
                        >
                          {fsActive === 'browser' ? <CollapseIcon /> : <ExpandIcon />}
                        </button>
                      </div>
                      <MediaPlayer ref={browserVideoRef} src={meta.demoDesktop} />
                    </div>
                  )}

                  {meta.demoMobile && (
                    <div className="pdm-phone-frame">
                      <div className="pdm-phone-notch" />
                      <button
                        className="pdm-phone-fs-btn"
                        onClick={() => toggleFs(phoneVideoRef)}
                        title="Fullscreen"
                      >
                        {fsActive === 'phone' ? <CollapseIcon /> : <ExpandIcon />}
                      </button>
                      <MediaPlayer ref={phoneVideoRef} src={meta.demoMobile} />
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
