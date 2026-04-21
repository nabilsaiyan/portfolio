import { useRef, useEffect, useState, useCallback } from 'react'
import { useLang } from '../../context/LanguageContext'
import { translations } from '../../i18n/translations'

const WORDS = ['Angular', 'React', 'TypeScript', 'Java', 'Spring', 'Nest.js', 'RxJS', 'PostgreSQL', 'MongoDB', 'Docker', 'Hibernate', 'Keycloak', 'GitLab', 'Jest', 'Cypress', 'SonarQube', 'RabbitMQ', 'Figma', 'Sass', 'TypeORM', 'Nx', 'CI/CD', 'JUnit', 'Storybook', 'Mockito']

const W = 600
const H = 600
const G = '#00ff88'

interface FWord { id: number; text: string; x: number; y: number; speed: number; hit: boolean; hitFrame: number }

function TypeRush() {
  const { lang } = useLang()
  const t = translations[lang].games
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const wordsRef = useRef<FWord[]>([])
  const idRef = useRef(0)
  const scoreRef = useRef(0)
  const livesRef = useRef(3)
  const stateRef = useRef<'idle' | 'playing' | 'over'>('idle')
  const rafRef = useRef<number>()
  const spawnRef = useRef<ReturnType<typeof setInterval>>()

  const [gameState, setGameState] = useState<'idle' | 'playing' | 'over'>('idle')
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [inputVal, setInputVal] = useState('')
  const [best, setBest] = useState(() => parseInt(localStorage.getItem('typerush_best') || '0', 10))

  const draw = useCallback(() => {
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return
    ctx.fillStyle = '#020a04'; ctx.fillRect(0, 0, W, H)
    ctx.strokeStyle = 'rgba(0,255,136,0.04)'; ctx.lineWidth = 0.5
    for (let i = 0; i < W; i += 28) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, H); ctx.stroke() }
    for (let i = 0; i < H; i += 28) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(W, i); ctx.stroke() }
    ctx.strokeStyle = 'rgba(255,68,68,0.15)'; ctx.lineWidth = 1
    ctx.beginPath(); ctx.moveTo(0, H - 36); ctx.lineTo(W, H - 36); ctx.stroke()

    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    wordsRef.current.forEach(w => {
      if (w.hit) {
        const p = w.hitFrame / 10
        ctx.globalAlpha = 1 - p
        ctx.fillStyle = '#fff'; ctx.shadowColor = G; ctx.shadowBlur = 24
        ctx.font = `bold 15px Inconsolata, monospace`
        ctx.fillText(w.text, w.x, w.y - p * 22)
        ctx.globalAlpha = 1; ctx.shadowBlur = 0
        w.hitFrame++
      } else {
        const danger = w.y > H - 55
        ctx.fillStyle = danger ? '#ff4455' : G
        ctx.shadowColor = danger ? '#ff4455' : G; ctx.shadowBlur = 5
        ctx.font = `bold 15px Inconsolata, monospace`
        ctx.fillText(w.text, w.x, w.y)
        ctx.shadowBlur = 0
      }
    })
  }, [])

  const endGame = useCallback(() => {
    stateRef.current = 'over'; setGameState('over')
    cancelAnimationFrame(rafRef.current!); clearInterval(spawnRef.current)
    const s = scoreRef.current
    setBest(p => { if (s > p) { localStorage.setItem('typerush_best', String(s)); return s } return p })
  }, [])

  const loop = useCallback(() => {
    if (stateRef.current !== 'playing') return
    wordsRef.current = wordsRef.current.filter(w => {
      if (w.hit) return w.hitFrame < 10
      w.y += w.speed
      if (w.y > H - 20) {
        livesRef.current--; setLives(livesRef.current)
        if (livesRef.current <= 0) { endGame(); return false }
        return false
      }
      return true
    })
    draw()
    rafRef.current = requestAnimationFrame(loop)
  }, [draw, endGame])

  const spawn = useCallback(() => {
    if (stateRef.current !== 'playing') return
    const used = new Set(wordsRef.current.map(w => w.text))
    const pool = WORDS.filter(w => !used.has(w))
    if (!pool.length) return
    const text = pool[Math.floor(Math.random() * pool.length)]
    const speed = 0.45 + Math.random() * 0.5 + scoreRef.current * 0.0008
    wordsRef.current.push({ id: idRef.current++, text, speed, x: 36 + Math.random() * (W - 72), y: -14, hit: false, hitFrame: 0 })
  }, [])

  const start = useCallback(() => {
    wordsRef.current = []; scoreRef.current = 0; livesRef.current = 3
    setScore(0); setLives(3); setInputVal('')
    stateRef.current = 'playing'; setGameState('playing')
    cancelAnimationFrame(rafRef.current!); clearInterval(spawnRef.current)
    spawn(); spawnRef.current = setInterval(spawn, 1700)
    rafRef.current = requestAnimationFrame(loop)
    setTimeout(() => inputRef.current?.focus(), 60)
  }, [spawn, loop])

  const handleInput = useCallback((val: string) => {
    setInputVal(val)
    const match = wordsRef.current.find(w => !w.hit && w.text.toLowerCase() === val.toLowerCase())
    if (match) {
      match.hit = true; match.hitFrame = 0
      scoreRef.current += 10 + match.text.length; setScore(scoreRef.current)
      setInputVal('')
    }
  }, [])

  useEffect(() => { draw() }, [draw])
  useEffect(() => () => { cancelAnimationFrame(rafRef.current!); clearInterval(spawnRef.current) }, [])

  const overlay: React.CSSProperties = { position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(2,10,4,0.88)', gap: '1rem', fontFamily: "'Inconsolata',monospace" }
  const btn: React.CSSProperties = { background: 'transparent', border: `1px solid ${G}`, color: G, fontFamily: "'Inconsolata',monospace", fontSize: '0.85rem', padding: '0.5rem 1.8rem', letterSpacing: '0.2em', cursor: 'pointer' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem', fontFamily: "'Inconsolata',monospace" }}>
      <div style={{ display: 'flex', gap: '2rem', fontSize: '0.75rem', color: '#555', letterSpacing: '0.2em' }}>
        <span>SCORE <span style={{ color: G }}>{String(score).padStart(4, '0')}</span></span>
        <span>{'❤'.repeat(lives)}{'🖤'.repeat(3 - lives)}</span>
        <span>BEST <span style={{ color: '#f0c040' }}>{String(best).padStart(4, '0')}</span></span>
      </div>
      {/* Controls hint top */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', fontSize: '0.6rem', color: '#3a6a4a', letterSpacing: '0.15em' }}>
        <span style={{ border: '1px solid #2a5a3a', padding: '0.1rem 0.4rem', borderRadius: 2 }}>⌨</span>
        <span>{t.typeRush.hint}</span>
        <span style={{ color: '#1a3a2a' }}>·</span>
        <span>{t.typeRush.hintEnter}</span>
      </div>

      <div style={{ position: 'relative', border: '1px solid rgba(0,255,136,0.1)' }}>
        <canvas ref={canvasRef} width={W} height={H} style={{ display: 'block' }} />
        {gameState === 'idle' && (
          <div style={overlay}>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: G, textShadow: `0 0 20px ${G}`, letterSpacing: '0.15em' }}>TYPE RUSH</div>
            <div style={{ fontSize: '0.6rem', color: '#3a5a3a', letterSpacing: '0.2em' }}>{t.typeRush.subtitle}</div>
            <button style={btn} onClick={start} onMouseEnter={e => (e.currentTarget.style.background = `${G}18`)} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>{t.pressStart}</button>
          </div>
        )}
        {gameState === 'over' && (
          <div style={overlay}>
            <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#ff4455', letterSpacing: '0.15em' }}>{t.typeRush.gameOver}</div>
            <div style={{ fontSize: '0.75rem', color: '#888' }}>{score} pts</div>
            {score === best && score > 0 && <div style={{ fontSize: '0.65rem', color: '#f0c040' }}>{t.newBest}</div>}
            <button style={btn} onClick={start} onMouseEnter={e => (e.currentTarget.style.background = `${G}18`)} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>{t.retry}</button>
          </div>
        )}
      </div>
      {gameState === 'playing' && (
        <input ref={inputRef} value={inputVal} onChange={e => handleInput(e.target.value)}
          placeholder={t.typeRush.placeholder} autoComplete="off" autoCorrect="off" spellCheck={false}
          style={{ background: 'transparent', border: '1px solid #1a3a1a', borderBottom: `1px solid ${G}`, color: G, fontFamily: "'Inconsolata',monospace", fontSize: '0.9rem', padding: '0.4rem 0.8rem', outline: 'none', width: W - 22, letterSpacing: '0.1em', textAlign: 'center' }}
        />
      )}
    </div>
  )
}

export default TypeRush
