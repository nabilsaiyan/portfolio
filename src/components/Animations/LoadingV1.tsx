import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

interface Props { progress: number }

const NAME1 = 'NABIL'
const NAME2 = 'AMHAOUCH'

export function LoadingV1({ progress }: Props) {
  const total = NAME1.length + NAME2.length
  const visibleCount = Math.ceil((progress / 100) * total)
  const [glitchSet, setGlitchSet] = useState<Set<number>>(new Set())

  useEffect(() => {
    const id = setInterval(() => {
      const s = new Set<number>()
      for (let i = 0; i < 2; i++) {
        if (Math.random() > 0.5 && visibleCount > 0)
          s.add(Math.floor(Math.random() * visibleCount))
      }
      setGlitchSet(s)
      setTimeout(() => setGlitchSet(new Set()), 80)
    }, 280)
    return () => clearInterval(id)
  }, [visibleCount])

  const bars = Math.floor(progress / 5)
  const bar = '█'.repeat(bars) + '░'.repeat(20 - bars)

  const renderLine = (chars: string, offset: number) => (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {Array.from(chars).map((ch, i) => {
        const gi = offset + i
        const vis = gi < visibleCount
        const gl = glitchSet.has(gi)
        return (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
            animate={vis ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: -20, filter: 'blur(8px)' }}
            transition={{ duration: 0.12 }}
            style={{
              display: 'inline-block',
              fontFamily: "'Courier New', monospace",
              fontSize: 'clamp(22px, 3vw, 40px)',
              fontWeight: 900,
              letterSpacing: '0.25em',
              color: gl ? '#0ff' : '#fff',
              textShadow: gl
                ? '4px 0 #f0f, -4px 0 #0ff, 0 0 20px #fff'
                : '0 0 15px rgba(255,255,255,0.35)',
              transform: gl ? 'skewX(-8deg) translateX(3px)' : 'none',
            }}
          >
            {ch}
          </motion.span>
        )
      })}
    </div>
  )

  return (
    <div style={{
      background: '#080808', width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      gap: '0.3rem', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.18) 2px, rgba(0,0,0,0.18) 4px)',
        pointerEvents: 'none', zIndex: 1,
      }} />
      <div style={{ zIndex: 2, display: 'flex', flexDirection: 'column', gap: '0.4rem', alignItems: 'center' }}>
        {renderLine(NAME1, 0)}
        {renderLine(NAME2, NAME1.length)}
      </div>
      <div style={{
        zIndex: 2, marginTop: '2rem',
        fontFamily: "'Courier New', monospace",
        color: '#3498db', fontSize: 'clamp(9px, 1vw, 13px)',
        letterSpacing: '0.1em', textShadow: '0 0 8px #3498db',
      }}>
        [{bar}] {Math.floor(progress).toString().padStart(3, ' ')}%
      </div>
    </div>
  )
}
