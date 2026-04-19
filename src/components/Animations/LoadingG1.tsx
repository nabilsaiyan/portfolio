import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Props { progress: number }

const NAME = 'NABIL AMHAOUCH'
const SUBTITLE = 'FULL STACK DEVELOPER'

export function LoadingG1({ progress }: Props) {
  const vis = Math.ceil((progress / 100) * NAME.length)
  const [glitch, setGlitch] = useState<Set<number>>(new Set())

  useEffect(() => {
    const id = setInterval(() => {
      const s = new Set<number>()
      for (let k = 0; k < 2; k++)
        if (Math.random() > 0.4 && vis > 0)
          s.add(Math.floor(Math.random() * vis))
      setGlitch(s)
      setTimeout(() => setGlitch(new Set()), 70)
    }, 220)
    return () => clearInterval(id)
  }, [vis])

  const bars = Math.floor(progress / 5)

  return (
    <div style={{
      background: '#060a12', width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden', gap: '0.4rem',
    }}>
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.12,
        backgroundImage: `linear-gradient(rgba(52,152,219,0.6) 1px, transparent 1px),
          linear-gradient(90deg, rgba(52,152,219,0.6) 1px, transparent 1px)`,
        backgroundSize: '40px 40px', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.18) 2px, rgba(0,0,0,0.18) 4px)',
        pointerEvents: 'none', zIndex: 2,
      }} />
      <div style={{ zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'flex' }}>
          {Array.from(NAME).map((ch, i) => {
            const gl = glitch.has(i)
            return (
              <motion.span key={i}
                initial={{ opacity: 0, y: -25, filter: 'blur(8px)' }}
                animate={i < vis
                  ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                  : { opacity: 0, y: -25, filter: 'blur(8px)' }}
                transition={{ duration: 0.1 }}
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: 'clamp(14px, 2vw, 28px)',
                  fontWeight: 900, letterSpacing: '0.25em',
                  color: gl ? '#0ff' : '#ddeeff',
                  textShadow: gl
                    ? '5px 0 #f0f, -5px 0 #0ff, 0 0 20px #fff'
                    : '0 0 18px rgba(52,152,219,0.9)',
                  transform: gl
                    ? `skewX(${i % 2 === 0 ? -10 : 10}deg) translateX(${i % 2 === 0 ? 4 : -4}px)`
                    : 'none',
                  display: 'inline-block',
                }}
              >
                {ch === ' ' ? '\u00A0' : ch}
              </motion.span>
            )
          })}
        </div>
        <motion.div
          initial={{ opacity: 0, letterSpacing: '0.8em' }}
          animate={progress >= 88 ? { opacity: 0.55, letterSpacing: '0.35em' } : { opacity: 0 }}
          transition={{ duration: 0.7 }}
          style={{
            fontFamily: "'Courier New', monospace",
            fontSize: 'clamp(6px, 0.85vw, 10px)',
            color: '#3498db', marginTop: '0.5rem',
          }}
        >
          {SUBTITLE}
        </motion.div>
      </div>
      <div style={{
        zIndex: 3, marginTop: '1.5rem',
        fontFamily: "'Courier New', monospace",
        color: '#3498db', fontSize: 'clamp(8px, 0.9vw, 11px)',
        letterSpacing: '0.08em', textShadow: '0 0 8px #3498db',
      }}>
        [{'█'.repeat(bars)}{'░'.repeat(20 - bars)}] {Math.floor(progress)}%
      </div>
    </div>
  )
}
