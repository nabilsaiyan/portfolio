import { useRef, useEffect, useState, useCallback } from 'react'
import { useLang } from '../../context/LanguageContext'
import { translations } from '../../i18n/translations'

const GRID = 20
const CELL = 30
const SIZE = GRID * CELL
const SPEED = 140

type Dir = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'
type Pos = { x: number; y: number }
type GameState = 'idle' | 'playing' | 'over'

const OPPOSITE: Record<Dir, Dir> = { UP: 'DOWN', DOWN: 'UP', LEFT: 'RIGHT', RIGHT: 'LEFT' }
const FOODS = [
  { label: 'TS',  url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
  { label: 'NG',  url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg' },
  { label: 'SB',  url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg' },
  { label: 'PG',  url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
  { label: 'DK',  url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
  { label: 'JV',  url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
  { label: 'MG',  url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
  { label: 'NJ',  url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg' },
  { label: 'RE',  url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
  { label: 'GL',  url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gitlab/gitlab-original.svg' },
]
const C = '#00d4ff'
const GOLD = '#f0c040'

function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const snakeRef = useRef<Pos[]>([{ x: 9, y: 9 }])
  const dirRef = useRef<Dir>('RIGHT')
  const nextDirRef = useRef<Dir>('RIGHT')
  const foodRef = useRef<Pos>({ x: 4, y: 9 })
  const foodIdxRef = useRef(0)
  const intervalRef = useRef<ReturnType<typeof setInterval>>()
  const scoreRef = useRef(0)
  const foodImgsRef = useRef<(HTMLImageElement | null)[]>(FOODS.map(() => null))
  const eatenFoodsRef = useRef<number[]>([])

  const [gameState, setGameState] = useState<GameState>('idle')
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(() => {
    const saved = localStorage.getItem('snake_best')
    return saved ? parseInt(saved, 10) : 0
  })
  const [newBest, setNewBest] = useState(false)

  const placeFood = useCallback(() => {
    const occupied = new Set(snakeRef.current.map(p => `${p.x},${p.y}`))
    let pos: Pos
    do { pos = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) } }
    while (occupied.has(`${pos.x},${pos.y}`))
    foodRef.current = pos
    foodIdxRef.current = (foodIdxRef.current + 1) % FOODS.length
  }, [])

  useEffect(() => {
    FOODS.forEach((food, i) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.src = food.url
      img.onload = () => { foodImgsRef.current[i] = img }
    })
  }, [])

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    ctx.fillStyle = '#04080c'
    ctx.fillRect(0, 0, SIZE, SIZE)

    ctx.strokeStyle = 'rgba(0,212,255,0.04)'
    ctx.lineWidth = 0.5
    for (let i = 0; i <= GRID; i++) {
      ctx.beginPath(); ctx.moveTo(i * CELL, 0); ctx.lineTo(i * CELL, SIZE); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(0, i * CELL); ctx.lineTo(SIZE, i * CELL); ctx.stroke()
    }

    // Food
    const f = foodRef.current
    const idx = foodIdxRef.current
    const img = foodImgsRef.current[idx]
    if (img) {
      const pad = 3
      ctx.drawImage(img, f.x * CELL + pad, f.y * CELL + pad, CELL - pad * 2, CELL - pad * 2)
    } else {
      ctx.fillStyle = GOLD
      ctx.font = `bold 11px Inconsolata, monospace`
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
      ctx.fillText(FOODS[idx].label, f.x * CELL + CELL / 2, f.y * CELL + CELL / 2 + 1)
    }

    // Snake body
    snakeRef.current.forEach((seg, i) => {
      const head = i === 0
      const alpha = head ? 1 : Math.max(0.25, 1 - i * 0.045)
      ctx.fillStyle = `rgba(0,212,255,${alpha})`
      ctx.shadowColor = C; ctx.shadowBlur = head ? 14 : 0
      const pad = head ? 0 : 1
      ctx.fillRect(seg.x * CELL + pad, seg.y * CELL + pad, CELL - pad * 2, CELL - pad * 2)
    })
    ctx.shadowBlur = 0

    // Tech logos accumulated in snake belly (skip head at i=0)
    snakeRef.current.forEach((seg, i) => {
      if (i === 0) return
      const foodIdx = eatenFoodsRef.current[i - 1]
      if (foodIdx == null) return
      const logo = foodImgsRef.current[foodIdx]
      if (!logo) return
      const pad = 4
      ctx.globalAlpha = 0.5
      ctx.drawImage(logo, seg.x * CELL + pad, seg.y * CELL + pad, CELL - pad * 2, CELL - pad * 2)
      ctx.globalAlpha = 1
    })
  }, [])

  const endGame = useCallback(() => {
    clearInterval(intervalRef.current)
    const s = scoreRef.current
    setBest(prev => {
      if (s > prev) {
        setNewBest(true)
        localStorage.setItem('snake_best', String(s))
        return s
      }
      return prev
    })
    setGameState('over')
  }, [])

  const step = useCallback(() => {
    dirRef.current = nextDirRef.current
    const head = snakeRef.current[0]
    const nh: Pos = {
      UP:    { x: head.x, y: head.y - 1 },
      DOWN:  { x: head.x, y: head.y + 1 },
      LEFT:  { x: head.x - 1, y: head.y },
      RIGHT: { x: head.x + 1, y: head.y },
    }[dirRef.current]

    if (nh.x < 0 || nh.x >= GRID || nh.y < 0 || nh.y >= GRID) { endGame(); return }
    if (snakeRef.current.some(s => s.x === nh.x && s.y === nh.y)) { endGame(); return }

    const newSnake = [nh, ...snakeRef.current]
    if (nh.x === foodRef.current.x && nh.y === foodRef.current.y) {
      eatenFoodsRef.current = [...eatenFoodsRef.current, foodIdxRef.current]
      scoreRef.current += 10
      setScore(scoreRef.current)
      placeFood()
    } else {
      newSnake.pop()
    }
    snakeRef.current = newSnake
    draw()
  }, [draw, placeFood, endGame])

  const startGame = useCallback(() => {
    snakeRef.current = [{ x: 9, y: 9 }, { x: 8, y: 9 }, { x: 7, y: 9 }]
    eatenFoodsRef.current = []
    dirRef.current = 'RIGHT'; nextDirRef.current = 'RIGHT'
    scoreRef.current = 0; setScore(0); setNewBest(false)
    placeFood(); draw()
    setGameState('playing')
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(step, SPEED)
  }, [draw, placeFood, step])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return
      const map: Record<string, Dir> = {
        ArrowUp: 'UP', ArrowDown: 'DOWN', ArrowLeft: 'LEFT', ArrowRight: 'RIGHT',
        w: 'UP', s: 'DOWN', a: 'LEFT', d: 'RIGHT',
      }
      const d = map[e.key]
      if (d && d !== OPPOSITE[dirRef.current]) { nextDirRef.current = d; e.preventDefault() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [gameState])

  useEffect(() => { draw() }, [draw])
  useEffect(() => () => clearInterval(intervalRef.current), [])

  const { lang } = useLang()
  const t = translations[lang].games

  const btnDir = (d: Dir) => {
    if (gameState !== 'playing') return
    if (d !== OPPOSITE[dirRef.current]) nextDirRef.current = d
  }

  const overlayStyle: React.CSSProperties = {
    position: 'absolute', inset: 0,
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    background: 'rgba(4,8,12,0.9)', gap: '1.2rem',
    fontFamily: "'Inconsolata', monospace",
  }

  const startBtnStyle: React.CSSProperties = {
    background: 'transparent', border: `1px solid ${C}`,
    color: C, fontFamily: "'Inconsolata', monospace",
    fontSize: '0.9rem', padding: '0.55rem 2rem',
    letterSpacing: '0.2em', cursor: 'pointer',
    transition: 'background 0.2s',
  }

  const arrowBtnStyle: React.CSSProperties = {
    background: 'transparent', border: '1px solid #2a5a6a',
    color: '#5a9aaa', fontSize: '0.8rem', cursor: 'pointer',
    width: '2.2rem', height: '2.2rem', borderRadius: 3,
    fontFamily: 'monospace',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem', fontFamily: "'Inconsolata', monospace" }}>
      {/* Scores */}
      <div style={{ display: 'flex', gap: '2.5rem', fontSize: '0.8rem', color: '#555', letterSpacing: '0.2em' }}>
        <span>SCORE <span style={{ color: C }}>{String(score).padStart(4, '0')}</span></span>
        <span>BEST <span style={{ color: GOLD }}>{String(best).padStart(4, '0')}</span></span>
      </div>

      {/* Controls hint top */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.6rem', color: '#3a6a7a', letterSpacing: '0.15em' }}>
        {['▲','▼','◄','►'].map(k => <span key={k} style={{ border: '1px solid #2a4a5a', padding: '0.1rem 0.3rem', borderRadius: 2 }}>{k}</span>)}
        <span style={{ color: '#1a3a4a', margin: '0 0.3rem' }}>·</span>
        <span>WASD</span>
        <span style={{ color: '#1a3a4a', margin: '0 0.3rem' }}>·</span>
        <span>{t.snake.hint}</span>
      </div>

      {/* Canvas */}
      <div style={{ position: 'relative', border: '1px solid rgba(0,212,255,0.12)' }}>
        <canvas ref={canvasRef} width={SIZE} height={SIZE} style={{ display: 'block' }} />

        {gameState === 'idle' && (
          <div style={overlayStyle}>
            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: C, textShadow: `0 0 22px ${C}`, letterSpacing: '0.15em' }}>
              SNAKE.EXE
            </div>
            <div style={{ fontSize: '0.65rem', color: '#3a4a50', letterSpacing: '0.25em' }}>
              {t.snake.subtitle}
            </div>
            <button style={startBtnStyle} onClick={startGame}
              onMouseEnter={e => (e.currentTarget.style.background = `${C}18`)}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              {t.pressStart}
            </button>
            <div style={{ fontSize: '0.6rem', color: '#222', letterSpacing: '0.15em' }}>{t.snake.hintKeys}</div>
          </div>
        )}

        {gameState === 'over' && (
          <div style={overlayStyle}>
            <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#ff4455', letterSpacing: '0.15em', textShadow: '0 0 16px #ff4455' }}>
              {t.snake.gameOver}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#888', letterSpacing: '0.1em' }}>
              {score} pts
            </div>
            {newBest && (
              <div style={{ fontSize: '0.7rem', color: GOLD, letterSpacing: '0.15em' }}>{t.newBest}</div>
            )}
            <button style={startBtnStyle} onClick={startGame}
              onMouseEnter={e => (e.currentTarget.style.background = `${C}18`)}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              {t.retry}
            </button>
          </div>
        )}
      </div>

    </div>
  )
}

export default SnakeGame
