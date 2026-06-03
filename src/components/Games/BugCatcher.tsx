import { useState, useEffect, useRef, useCallback } from 'react'
import { useLang } from '../../context/LanguageContext'
import { translations } from '../../i18n/translations'
import { motion, AnimatePresence } from 'framer-motion'

const COLS = 7
const ROWS = 7
const TOTAL = COLS * ROWS
const CELL = 84
const BUG_LIFETIME = 1400
const SPAWN_INTERVAL = 650

const STACK = ['Angular', 'React', 'TypeScript', 'Java', 'Spring', 'Nest.js', 'RxJS', 'PostgreSQL', 'Docker', 'Hibernate', 'Keycloak', 'GitLab', 'Jest', 'Cypress', 'SonarQube', 'RabbitMQ', 'Figma', 'Sass', 'TypeORM', 'Nx', 'CI/CD', 'JUnit', 'Storybook', 'Mockito', 'Postman']
const STACK_COLORS: Record<string, string> = {
  Angular: '#dd0031', React: '#61dafb', TypeScript: '#3178c6', Java: '#f89820',
  Spring: '#6db33f', 'Nest.js': '#ea2845', RxJS: '#b7178c', PostgreSQL: '#336791',
  Docker: '#2496ed', Hibernate: '#59666c', Keycloak: '#00b8e3', GitLab: '#fc6d26',
  Jest: '#c21325', Cypress: '#69d3a7', SonarQube: '#4e9bcd', RabbitMQ: '#ff6600',
  Figma: '#a259ff', Sass: '#cc6699', TypeORM: '#e83524', Nx: '#143055',
  'CI/CD': '#00d4ff', JUnit: '#25a162', Storybook: '#ff4785', Mockito: '#78c257', Postman: '#ff6c37',
}

interface Bug { id: number; born: number; label: string }

function BugCatcher() {
  const { lang } = useLang()
  const t = translations[lang].games
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'over'>('idle')
  const [cells, setCells] = useState<(Bug | null)[]>(Array(TOTAL).fill(null))
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [squashed, setSquashed] = useState<number[]>([])
  const [best, setBest] = useState(() => parseInt(localStorage.getItem('bugcatcher_best') || '0', 10))
  const [newBest, setNewBest] = useState(false)

  const scoreRef = useRef(0)
  const stateRef = useRef<'idle' | 'playing' | 'over'>('idle')
  const bugIdRef = useRef(0)
  const spawnRef = useRef<ReturnType<typeof setInterval>>()
  const timerRef = useRef<ReturnType<typeof setInterval>>()
  const cleanRef = useRef<ReturnType<typeof setInterval>>()

  const endGame = useCallback(() => {
    stateRef.current = 'over'; setGameState('over')
    clearInterval(spawnRef.current); clearInterval(timerRef.current); clearInterval(cleanRef.current)
    const s = scoreRef.current
    setBest(p => { if (s > p) { localStorage.setItem('bugcatcher_best', String(s)); setNewBest(true); return s } return p })
  }, [])

  const start = useCallback(() => {
    scoreRef.current = 0; stateRef.current = 'playing'
    setScore(0); setTimeLeft(30); setNewBest(false)
    setCells(Array(TOTAL).fill(null)); setSquashed([])
    setGameState('playing')

    clearInterval(spawnRef.current); clearInterval(timerRef.current); clearInterval(cleanRef.current)

    spawnRef.current = setInterval(() => {
      if (stateRef.current !== 'playing') return
      setCells(prev => {
        const empty = prev.map((c, i) => c === null ? i : -1).filter(i => i >= 0)
        if (empty.length === 0) return prev
        const idx = empty[Math.floor(Math.random() * empty.length)]
        const next = [...prev]
        next[idx] = { id: bugIdRef.current++, born: Date.now(), label: STACK[Math.floor(Math.random() * STACK.length)] }
        return next
      })
    }, SPAWN_INTERVAL)

    cleanRef.current = setInterval(() => {
      if (stateRef.current !== 'playing') return
      const now = Date.now()
      setCells(prev => prev.map(c => c && now - c.born > BUG_LIFETIME ? null : c))
    }, 100)

    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { endGame(); return 0 }
        return t - 1
      })
    }, 1000)
  }, [endGame])

  const squash = useCallback((idx: number) => {
    if (stateRef.current !== 'playing') return
    setCells(prev => {
      if (!prev[idx]) return prev
      const next = [...prev]; next[idx] = null; return next
    })
    scoreRef.current += 10; setScore(scoreRef.current)
    setSquashed(s => [...s, idx])
    setTimeout(() => setSquashed(s => s.filter(i => i !== idx)), 300)
  }, [])

  useEffect(() => () => { clearInterval(spawnRef.current); clearInterval(timerRef.current); clearInterval(cleanRef.current) }, [])

  const C = '#ff4455'
  const btn: React.CSSProperties = { background: 'transparent', border: `1px solid ${C}`, color: C, fontFamily: "'Inconsolata',monospace", fontSize: '0.85rem', padding: '0.5rem 1.8rem', letterSpacing: '0.2em', cursor: 'pointer' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.7rem', fontFamily: "'Inconsolata',monospace" }}>
      <div style={{ display: 'flex', gap: '2rem', fontSize: '0.75rem', color: '#555', letterSpacing: '0.2em' }}>
        <span>SCORE <span style={{ color: C }}>{String(score).padStart(4, '0')}</span></span>
        <span>TIME <span style={{ color: timeLeft <= 5 ? C : '#f0c040' }}>{String(timeLeft).padStart(2, '0')}s</span></span>
        <span>BEST <span style={{ color: '#f0c040' }}>{String(best).padStart(4, '0')}</span></span>
      </div>

      {/* Controls hint top */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', fontSize: '0.6rem', color: '#7a3a3a', letterSpacing: '0.15em' }}>
        <span style={{ border: '1px solid #5a2a2a', padding: '0.1rem 0.4rem', borderRadius: 2 }}>🖱</span>
        <span>{t.stackCatcher.hint}</span>
        <span style={{ color: '#4a2020' }}>·</span>
        <span>{t.stackCatcher.hintTimer}</span>
      </div>

      <div style={{ position: 'relative', border: '1px solid rgba(255,68,85,0.12)', background: '#080404' }}>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${COLS}, ${CELL}px)`, gridTemplateRows: `repeat(${ROWS}, ${CELL}px)`, gap: 2, background: '#0f0505', padding: 0 }}>
          {Array(TOTAL).fill(null).map((_, i) => {
            const bug = cells[i]
            const isSquashed = squashed.includes(i)
            const age = bug ? (Date.now() - bug.born) / BUG_LIFETIME : 0
            return (
              <div key={i} onClick={() => bug && squash(i)}
                style={{ width: CELL, height: CELL, background: '#06030a', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: bug ? 'pointer' : 'default', position: 'relative', overflow: 'hidden', borderRadius: 2 }}>
                {/* Grid lines */}
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,68,85,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,68,85,0.04) 1px, transparent 1px)', backgroundSize: '12px 12px' }} />

                <AnimatePresence>
                  {bug && !isSquashed && (
                    <motion.div key={bug.id}
                      initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 20 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      style={{ opacity: Math.max(0.4, 1 - age * 0.4), zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3 }}
                    >
                      <div style={{
                        border: `1px solid ${STACK_COLORS[bug.label] || '#ff4455'}`,
                        color: STACK_COLORS[bug.label] || '#ff4455',
                        background: `${STACK_COLORS[bug.label] || '#ff4455'}18`,
                        fontFamily: "'Inconsolata',monospace",
                        fontSize: bug.label.length > 7 ? '0.55rem' : '0.7rem',
                        fontWeight: 700,
                        letterSpacing: '0.05em',
                        padding: '0.25rem 0.4rem',
                        borderRadius: 3,
                        textAlign: 'center',
                        boxShadow: `0 0 8px ${STACK_COLORS[bug.label] || '#ff4455'}44`,
                        whiteSpace: 'nowrap',
                        maxWidth: CELL - 8,
                        overflow: 'hidden',
                      }}>
                        {bug.label}
                      </div>
                    </motion.div>
                  )}
                  {isSquashed && (
                    <motion.div key={`sq-${i}`}
                      initial={{ scale: 1.5, opacity: 1 }} animate={{ scale: 0.5, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      style={{ fontSize: 26, zIndex: 1 }}
                    >
                      💥
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        {gameState === 'idle' && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(8,4,4,0.92)', gap: '1rem' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: C, textShadow: `0 0 20px ${C}`, letterSpacing: '0.15em' }}>STACK CATCHER</div>
            <div style={{ fontSize: '0.6rem', color: '#5a2020', letterSpacing: '0.2em' }}>{t.stackCatcher.subtitle}</div>
            <button style={btn} onClick={start} onMouseEnter={e => (e.currentTarget.style.background = `${C}18`)} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>{t.pressStart}</button>
          </div>
        )}
        {gameState === 'over' && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(8,4,4,0.92)', gap: '1rem' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 900, color: C, letterSpacing: '0.15em' }}>{t.stackCatcher.timeUp}</div>
            <div style={{ fontSize: '0.75rem', color: '#888' }}>{score} pts</div>
            {newBest && <div style={{ fontSize: '0.65rem', color: '#f0c040' }}>{t.newBest}</div>}
            <button style={btn} onClick={start} onMouseEnter={e => (e.currentTarget.style.background = `${C}18`)} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>{t.retry}</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default BugCatcher
