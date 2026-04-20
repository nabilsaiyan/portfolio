import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Props { progress: number }

const LINES = [
  '> Initializing portfolio...',
  '> Loading 3D models...',
  '> Compiling work experience...',
  '> Building project showcase...',
  '> Calibrating particle engine...',
  '> All systems online.',
]

export function LoadingV3({ progress }: Props) {
  const visibleLines = Math.ceil((progress / 100) * LINES.length)
  const [blink, setBlink] = useState(true)

  useEffect(() => {
    const id = setInterval(() => setBlink(b => !b), 500)
    return () => clearInterval(id)
  }, [])

  const bars = Math.floor(progress / 5)
  const bar = '█'.repeat(bars) + '░'.repeat(20 - bars)

  return (
    <div style={{
      background: '#050505', width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '2rem', boxSizing: 'border-box', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,255,65,0.03) 1px, rgba(0,255,65,0.03) 2px)',
        pointerEvents: 'none',
      }} />
      <div style={{
        fontFamily: "'Inconsolata', monospace",
        fontSize: 'clamp(9px, 1.1vw, 13px)',
        width: '100%', maxWidth: '420px', position: 'relative', zIndex: 1,
      }}>
        <AnimatePresence>
          {LINES.slice(0, visibleLines).map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              style={{
                marginBottom: '0.6rem',
                color: i === visibleLines - 1 && progress >= 100 ? '#00ff41' : '#00cc33',
                textShadow: '0 0 8px rgba(0,255,65,0.55)',
              }}
            >
              {line}
              {i === visibleLines - 1 && (
                <span style={{
                  display: 'inline-block', width: '7px', height: '1em',
                  background: '#00ff41', marginLeft: '3px',
                  verticalAlign: 'text-bottom',
                  opacity: blink ? 1 : 0,
                  boxShadow: '0 0 6px #00ff41',
                  transition: 'opacity 0.08s',
                }} />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        <div style={{
          marginTop: '1.5rem', color: '#009922',
          textShadow: '0 0 6px rgba(0,180,50,0.4)',
          letterSpacing: '0.04em',
        }}>
          [{bar}] {Math.floor(progress).toString().padStart(3, ' ')}%
        </div>
      </div>
    </div>
  )
}
