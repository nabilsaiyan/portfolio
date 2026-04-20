import { motion } from 'framer-motion'
import { useRef } from 'react'

interface Props { progress: number }

const NAME = 'NABIL AMHAOUCH'

export function LoadingG3({ progress }: Props) {
  const startPos = useRef(
    Array.from(NAME).map(() => ({
      x: (Math.random() - 0.5) * 600,
      y: (Math.random() - 0.5) * 500,
      rotate: (Math.random() - 0.5) * 720,
      scale: 0.2 + Math.random() * 1.8,
    }))
  )

  const bars = Math.floor(progress / 5)

  return (
    <div style={{
      background: '#07070f', width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ display: 'flex', position: 'relative' }}>
        {Array.from(NAME).map((ch, i) => {
          const sp = startPos.current[i]
          const assembled = progress > (i / NAME.length) * 88

          return (
            <motion.span key={i}
              initial={{ x: sp.x, y: sp.y, rotate: sp.rotate, scale: sp.scale, opacity: 0 }}
              animate={assembled
                ? { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }
                : { x: sp.x, y: sp.y, rotate: sp.rotate, scale: sp.scale, opacity: 0.15 }}
              transition={assembled
                ? { type: 'spring', stiffness: 70, damping: 14, mass: 1 }
                : { duration: 0 }}
              style={{
                display: 'inline-block',
                fontFamily: "'Inconsolata', monospace",
                fontSize: 'clamp(14px, 2vw, 28px)',
                fontWeight: 900,
                letterSpacing: '0.25em',
                color: '#ffffff',
                textShadow: assembled
                  ? '0 0 25px rgba(255,255,255,0.7), 0 0 8px rgba(100,180,255,0.5)'
                  : '0 0 4px rgba(255,255,255,0.2)',
              }}
            >
              {ch === ' ' ? '\u00A0' : ch}
            </motion.span>
          )
        })}
      </div>
      <div style={{
        marginTop: '2rem',
        fontFamily: "'Inconsolata', monospace",
        color: '#333', fontSize: 'clamp(8px, 0.9vw, 11px)',
      }}>
        [{'█'.repeat(bars)}{'░'.repeat(20 - bars)}] {Math.floor(progress)}%
      </div>
    </div>
  )
}
