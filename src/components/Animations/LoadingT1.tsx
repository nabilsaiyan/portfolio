import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Props { progress: number }

const LINES = [
  { text: '$ git clone github.com/nabilsaiyan/portfolio', color: '#a8d8a8' },
  { text: "  Cloning into 'portfolio'...", color: '#4a7a4a' },
  { text: '$ npm install', color: '#a8d8a8' },
  { text: '  Added 847 packages in 3.2s', color: '#4a7a4a' },
  { text: '$ npm run build', color: '#a8d8a8' },
  { text: '  Compiling TypeScript...', color: '#4a7a4a' },
  { text: '  Bundling 3D models & assets...', color: '#4a7a4a' },
  { text: '  [OK] Build complete  dist/', color: '#00ff41' },
  { text: '$ deploy --target nabilamhaouch.dev', color: '#a8d8a8' },
  { text: '  [OK] Live at nabilamhaouch.dev', color: '#00ff41' },
]

export function LoadingT1({ progress }: Props) {
  const visible = Math.ceil((progress / 100) * LINES.length)
  const [blink, setBlink] = useState(true)

  useEffect(() => {
    const id = setInterval(() => setBlink(b => !b), 500)
    return () => clearInterval(id)
  }, [])

  const bars = Math.floor(progress / 5)

  return (
    <div style={{
      background: '#050505', width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column',
      justifyContent: 'center', padding: '1.2rem',
      boxSizing: 'border-box', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,255,65,0.025) 1px, rgba(0,255,65,0.025) 2px)',
        pointerEvents: 'none',
      }} />
      <div style={{
        fontFamily: "'Inconsolata', monospace",
        color: '#1a4a1a', fontSize: 'clamp(7px, 0.75vw, 9px)',
        marginBottom: '0.7rem', letterSpacing: '0.08em',
      }}>
        nabil@portfolio:~
      </div>
      <div style={{ fontFamily: "'Inconsolata', monospace", fontSize: 'clamp(8px, 0.9vw, 11px)' }}>
        <AnimatePresence>
          {LINES.slice(0, visible).map((line, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.1 }}
              style={{
                marginBottom: '0.3rem', color: line.color,
                textShadow: `0 0 5px ${line.color}44`,
              }}
            >
              {line.text}
              {i === visible - 1 && (
                <span style={{
                  display: 'inline-block', width: '6px', height: '0.9em',
                  background: '#00ff41', marginLeft: '2px',
                  verticalAlign: 'text-bottom',
                  opacity: blink ? 1 : 0,
                  boxShadow: '0 0 5px #00ff41',
                }} />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        <div style={{ marginTop: '0.8rem', color: '#1a5a1a', fontSize: 'clamp(8px, 0.85vw, 10px)' }}>
          [{'█'.repeat(bars)}{'░'.repeat(20 - bars)}] {Math.floor(progress)}%
        </div>
      </div>
    </div>
  )
}
