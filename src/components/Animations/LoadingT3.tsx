import { motion, AnimatePresence } from 'framer-motion'

interface Props { progress: number }

const LINES = [
  { left: 'PORTFOLIO BIOS', right: 'v2.0.26', type: 'header' },
  { left: '─'.repeat(44), right: '', type: 'divider' },
  { left: 'CPU', right: 'Nabil Amhaouch  —  Full Stack Developer', type: 'spec' },
  { left: 'COMPANY', right: 'Klee Group  ·  Java / React / Angular', type: 'spec' },
  { left: '', right: '', type: 'empty' },
  { left: 'EXPERIENCE', right: '3 years ....................................... OK', type: 'check' },
  { left: 'FRONTEND', right: 'React · Three.js · Angular ................. OK', type: 'check' },
  { left: 'BACKEND', right: 'Java · Spring · Node.js ..................... OK', type: 'check' },
  { left: 'RENDER', right: 'WebGL · GLSL · drei ......................... OK', type: 'check' },
  { left: 'NETWORK', right: 'nabilamhaouch.dev ........................... OK', type: 'check' },
  { left: '', right: '', type: 'empty' },
  { left: 'BOOT', right: 'Loading portfolio...', type: 'boot' },
]

export function LoadingT3({ progress }: Props) {
  const visible = Math.ceil((progress / 100) * LINES.length)
  const bars = Math.floor(progress / 5)

  const getColor = (type: string) => {
    if (type === 'header') return '#ffffff'
    if (type === 'divider') return '#333'
    if (type === 'spec') return '#bbbbbb'
    if (type === 'check') return '#888'
    if (type === 'boot') return '#fff'
    return 'transparent'
  }

  return (
    <div style={{
      background: '#000', width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '1.5rem', boxSizing: 'border-box',
    }}>
      <div style={{
        fontFamily: "'Courier New', monospace",
        fontSize: 'clamp(7px, 0.9vw, 11px)',
        width: '100%', maxWidth: '480px',
      }}>
        <AnimatePresence>
          {LINES.slice(0, visible).map((line, i) => (
            <motion.div key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.06 }}
              style={{
                color: getColor(line.type),
                marginBottom: line.type === 'empty' ? '0.6rem' : '0.25rem',
                letterSpacing: '0.02em',
                minHeight: line.type === 'empty' ? '0.6rem' : undefined,
              }}
            >
              {line.type === 'header' && (
                <span>{line.left}<span style={{ float: 'right', color: '#555' }}>{line.right}</span></span>
              )}
              {line.type === 'divider' && <span>{line.left}</span>}
              {(line.type === 'spec' || line.type === 'check') && (
                <span>
                  <span style={{ color: '#555', display: 'inline-block', minWidth: '10ch' }}>{line.left}</span>
                  <span> {line.right}</span>
                </span>
              )}
              {line.type === 'boot' && (
                <span style={{ color: '#fff' }}>
                  <span style={{ color: '#555' }}>{line.left}</span>
                  {' '}{line.right}
                </span>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        <div style={{
          marginTop: '0.8rem', color: '#444',
          fontSize: 'clamp(7px, 0.85vw, 10px)', letterSpacing: '0.04em',
        }}>
          [{'█'.repeat(bars)}{'░'.repeat(20 - bars)}] {Math.floor(progress)}%
        </div>
      </div>
    </div>
  )
}
