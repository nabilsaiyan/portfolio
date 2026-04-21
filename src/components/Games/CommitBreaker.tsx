import { useRef, useEffect, useState, useCallback } from 'react'
import { useLang } from '../../context/LanguageContext'
import { translations } from '../../i18n/translations'

const W = 600; const H = 600
const COLS = 8; const ROWS = 4
const BW = Math.floor(W / COLS) - 3
const BH = 26
const PAD_W = 64; const PAD_H = 8
const BALL_R = 7
const LABELS = ['Angular', 'React', 'TypeScript', 'Java', 'Spring', 'Nest.js', 'RxJS', 'Nx', 'PostgreSQL', 'MongoDB', 'Hibernate', 'TypeORM', 'Docker', 'RabbitMQ', 'Keycloak', 'Elastic', 'GitLab', 'CI/CD', 'Jest', 'Cypress', 'SonarQube', 'JUnit', 'Mockito', 'Postman', 'Figma', 'Jira', 'Sass', 'HTML5', 'Storybook', 'React Native', 'DBeaver', 'pgcrypto']
const ROW_COLORS = ['#3498db', '#9b59b6', '#00d4ff', '#2ecc71']

interface Brick { x: number; y: number; alive: boolean; label: string; color: string }

function initBricks(): Brick[] {
  const bricks: Brick[] = []
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++)
      bricks.push({ x: c * (BW + 3) + 4, y: 28 + r * (BH + 4), alive: true, label: LABELS[r * COLS + c] || '??', color: ROW_COLORS[r] })
  return bricks
}

function CommitBreaker() {
  const { lang } = useLang()
  const t = translations[lang].games
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const padXRef = useRef(W / 2 - PAD_W / 2)
  const ballRef = useRef({ x: W / 2, y: H - 60, vx: 2.8, vy: -3.2 })
  const bricksRef = useRef<Brick[]>(initBricks())
  const stateRef = useRef<'idle' | 'playing' | 'over' | 'win'>('idle')
  const scoreRef = useRef(0)
  const livesRef = useRef(3)
  const rafRef = useRef<number>()

  const [gameState, setGameState] = useState<'idle' | 'playing' | 'over' | 'win'>('idle')
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [best, setBest] = useState(() => parseInt(localStorage.getItem('commitbreaker_best') || '0', 10))

  const draw = useCallback(() => {
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return
    ctx.fillStyle = '#040610'; ctx.fillRect(0, 0, W, H)
    ctx.strokeStyle = 'rgba(52,152,219,0.04)'; ctx.lineWidth = 0.5
    for (let i = 0; i < W; i += 28) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, H); ctx.stroke() }
    for (let i = 0; i < H; i += 28) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(W, i); ctx.stroke() }

    bricksRef.current.filter(b => b.alive).forEach(b => {
      ctx.fillStyle = b.color + '22'
      ctx.strokeStyle = b.color; ctx.lineWidth = 1
      ctx.fillRect(b.x, b.y, BW, BH)
      ctx.strokeRect(b.x, b.y, BW, BH)
      ctx.fillStyle = b.color; ctx.shadowColor = b.color; ctx.shadowBlur = 4
      ctx.font = `bold 11px Inconsolata, monospace`
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
      ctx.fillText(b.label, b.x + BW / 2, b.y + BH / 2)
      ctx.shadowBlur = 0
    })

    const px = padXRef.current
    ctx.fillStyle = '#00d4ff33'; ctx.strokeStyle = '#00d4ff'; ctx.lineWidth = 1.5
    ctx.shadowColor = '#00d4ff'; ctx.shadowBlur = 8
    ctx.fillRect(px, H - 16, PAD_W, PAD_H)
    ctx.strokeRect(px, H - 16, PAD_W, PAD_H)
    ctx.shadowBlur = 0

    const b = ballRef.current
    ctx.fillStyle = '#fff'; ctx.shadowColor = '#00d4ff'; ctx.shadowBlur = 12
    ctx.beginPath(); ctx.arc(b.x, b.y, BALL_R, 0, Math.PI * 2); ctx.fill()
    ctx.shadowBlur = 0
  }, [])

  const endGame = useCallback((result: 'over' | 'win') => {
    stateRef.current = result; setGameState(result)
    cancelAnimationFrame(rafRef.current!)
    const s = scoreRef.current
    setBest(p => { if (s > p) { localStorage.setItem('commitbreaker_best', String(s)); return s } return p })
  }, [])

  const loop = useCallback(() => {
    if (stateRef.current !== 'playing') return
    const b = ballRef.current
    b.x += b.vx; b.y += b.vy

    if (b.x - BALL_R < 0) { b.x = BALL_R; b.vx = Math.abs(b.vx) }
    if (b.x + BALL_R > W) { b.x = W - BALL_R; b.vx = -Math.abs(b.vx) }
    if (b.y - BALL_R < 0) { b.y = BALL_R; b.vy = Math.abs(b.vy) }

    const px = padXRef.current
    if (b.y + BALL_R >= H - 16 && b.y + BALL_R <= H - 16 + PAD_H + 4 && b.x >= px - 4 && b.x <= px + PAD_W + 4) {
      b.vy = -Math.abs(b.vy)
      const rel = (b.x - (px + PAD_W / 2)) / (PAD_W / 2)
      b.vx = rel * 4.5
    }

    if (b.y > H + 10) {
      livesRef.current--; setLives(livesRef.current)
      if (livesRef.current <= 0) { endGame('over'); return }
      b.x = W / 2; b.y = H - 60; b.vx = 2.8; b.vy = -3.2
    }

    let hit = false
    bricksRef.current.forEach(br => {
      if (!br.alive || hit) return
      if (b.x + BALL_R > br.x && b.x - BALL_R < br.x + BW && b.y + BALL_R > br.y && b.y - BALL_R < br.y + BH) {
        br.alive = false; hit = true; b.vy *= -1
        scoreRef.current += 10; setScore(scoreRef.current)
      }
    })

    if (bricksRef.current.every(b => !b.alive)) { endGame('win'); return }
    draw()
    rafRef.current = requestAnimationFrame(loop)
  }, [draw, endGame])

  const start = useCallback(() => {
    bricksRef.current = initBricks()
    ballRef.current = { x: W / 2, y: H - 60, vx: 2.8, vy: -3.2 }
    padXRef.current = W / 2 - PAD_W / 2
    scoreRef.current = 0; livesRef.current = 3
    setScore(0); setLives(3)
    stateRef.current = 'playing'; setGameState('playing')
    cancelAnimationFrame(rafRef.current!)
    rafRef.current = requestAnimationFrame(loop)
  }, [loop])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect()
      if (!rect) return
      padXRef.current = Math.max(0, Math.min(W - PAD_W, e.clientX - rect.left - PAD_W / 2))
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') padXRef.current = Math.max(0, padXRef.current - 16)
      if (e.key === 'ArrowRight') padXRef.current = Math.min(W - PAD_W, padXRef.current + 16)
    }
    canvasRef.current?.addEventListener('mousemove', onMove)
    window.addEventListener('keydown', onKey)
    return () => { canvasRef.current?.removeEventListener('mousemove', onMove); window.removeEventListener('keydown', onKey) }
  }, [])

  useEffect(() => { draw() }, [draw])
  useEffect(() => () => cancelAnimationFrame(rafRef.current!), [])

  const C = '#3498db'
  const overlay: React.CSSProperties = { position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(4,6,16,0.9)', gap: '1rem', fontFamily: "'Inconsolata',monospace" }
  const btn: React.CSSProperties = { background: 'transparent', border: `1px solid ${C}`, color: C, fontFamily: "'Inconsolata',monospace", fontSize: '0.85rem', padding: '0.5rem 1.8rem', letterSpacing: '0.2em', cursor: 'pointer' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem', fontFamily: "'Inconsolata',monospace" }}>
      <div style={{ display: 'flex', gap: '2rem', fontSize: '0.75rem', color: '#555', letterSpacing: '0.2em' }}>
        <span>SCORE <span style={{ color: C }}>{String(score).padStart(4, '0')}</span></span>
        <span>{'❤'.repeat(lives)}{'🖤'.repeat(3 - lives)}</span>
        <span>BEST <span style={{ color: '#f0c040' }}>{String(best).padStart(4, '0')}</span></span>
      </div>
      {/* Controls hint top */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.6rem', color: '#3a6a8a', letterSpacing: '0.15em' }}>
        <span style={{ border: '1px solid #2a5a7a', padding: '0.1rem 0.4rem', borderRadius: 2 }}>🖱</span>
        <span>{t.commitBreaker.hint}</span>
        <span style={{ color: '#1a3a4a' }}>·</span>
        {['◄','►'].map(k => <span key={k} style={{ border: '1px solid #2a5a7a', padding: '0.1rem 0.3rem', borderRadius: 2 }}>{k}</span>)}
        <span>{t.commitBreaker.hintArrows}</span>
        <span style={{ color: '#1a3a4a' }}>·</span>
        <span>{t.commitBreaker.hintBreak}</span>
      </div>

      <div style={{ position: 'relative', border: '1px solid rgba(52,152,219,0.15)', cursor: 'none' }}>
        <canvas ref={canvasRef} width={W} height={H} style={{ display: 'block' }} />
        {gameState === 'idle' && (
          <div style={overlay}>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: C, textShadow: `0 0 20px ${C}`, letterSpacing: '0.1em' }}>COMMIT BREAKER</div>
            <div style={{ fontSize: '0.6rem', color: '#1a2a4a', letterSpacing: '0.2em' }}>{t.commitBreaker.subtitle}</div>
            <button style={btn} onClick={start} onMouseEnter={e => (e.currentTarget.style.background = `${C}18`)} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>{t.pressStart}</button>
            <div style={{ fontSize: '0.6rem', color: '#222', letterSpacing: '0.12em' }}>{t.commitBreaker.hintControls}</div>
          </div>
        )}
        {gameState === 'over' && (
          <div style={overlay}>
            <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#ff4455', letterSpacing: '0.15em' }}>{t.commitBreaker.gameOver}</div>
            <div style={{ fontSize: '0.75rem', color: '#888' }}>{score} pts</div>
            <button style={btn} onClick={start} onMouseEnter={e => (e.currentTarget.style.background = `${C}18`)} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>{t.retry}</button>
          </div>
        )}
        {gameState === 'win' && (
          <div style={overlay}>
            <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#2ecc71', letterSpacing: '0.1em', textShadow: '0 0 20px #2ecc71' }}>{t.commitBreaker.win}</div>
            <div style={{ fontSize: '0.75rem', color: '#888' }}>{score} pts</div>
            <button style={{ ...btn, borderColor: '#2ecc71', color: '#2ecc71' }} onClick={start}>{t.nextLevel}</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CommitBreaker
