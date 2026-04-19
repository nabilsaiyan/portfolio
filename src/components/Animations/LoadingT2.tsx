import { motion, AnimatePresence } from 'framer-motion'

interface Props { progress: number }

const LINES: Array<Array<{ text: string; color: string }>> = [
  [{ text: '// portfolio.config.ts', color: '#6A9955' }],
  [{ text: '', color: '#fff' }],
  [
    { text: 'import ', color: '#569cd6' },
    { text: '{ Developer }', color: '#9cdcfe' },
    { text: ' from ', color: '#569cd6' },
    { text: "'./types'", color: '#ce9178' },
  ],
  [{ text: '', color: '#fff' }],
  [
    { text: 'const ', color: '#569cd6' },
    { text: 'Nabil', color: '#4fc1ff' },
    { text: ': Developer = {', color: '#d4d4d4' },
  ],
  [
    { text: '  name: ', color: '#9cdcfe' },
    { text: "'Nabil Amhaouch'", color: '#ce9178' },
    { text: ',', color: '#d4d4d4' },
  ],
  [
    { text: '  role: ', color: '#9cdcfe' },
    { text: "'Full Stack Developer'", color: '#ce9178' },
    { text: ',', color: '#d4d4d4' },
  ],
  [
    { text: '  stack: ', color: '#9cdcfe' },
    { text: "['React', 'Three.js', 'Node']", color: '#ce9178' },
    { text: ',', color: '#d4d4d4' },
  ],
  [
    { text: '  years: ', color: '#9cdcfe' },
    { text: '3', color: '#b5cea8' },
    { text: ',', color: '#d4d4d4' },
  ],
  [
    { text: '  status: ', color: '#9cdcfe' },
    { text: "'Building great things'", color: '#ce9178' },
  ],
  [{ text: '}', color: '#d4d4d4' }],
]

export function LoadingT2({ progress }: Props) {
  const visible = Math.ceil((progress / 100) * LINES.length)
  const bars = Math.floor(progress / 5)

  return (
    <div style={{
      background: '#1e1e1e', width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Tab bar */}
      <div style={{
        background: '#2d2d2d', borderBottom: '1px solid #404040',
        padding: '5px 12px',
        fontFamily: "'Courier New', monospace",
        fontSize: 'clamp(7px, 0.8vw, 10px)',
        color: '#ccc', letterSpacing: '0.04em',
        flexShrink: 0, display: 'flex', alignItems: 'center', gap: '6px',
      }}>
        <span style={{ color: '#569cd6' }}>TS</span>
        <span>portfolio.config.ts</span>
      </div>
      {/* Editor body */}
      <div style={{
        flex: 1, display: 'flex', overflowY: 'hidden',
        fontFamily: "'Courier New', monospace",
        fontSize: 'clamp(8px, 0.95vw, 12px)',
        padding: '0.4rem 0',
      }}>
        {/* Line numbers */}
        <div style={{
          color: '#4a4a4a', textAlign: 'right',
          paddingRight: '0.8rem', paddingLeft: '0.5rem',
          userSelect: 'none', minWidth: '2rem', flexShrink: 0,
        }}>
          {LINES.slice(0, visible).map((_, i) => (
            <div key={i} style={{ lineHeight: '1.65' }}>{i + 1}</div>
          ))}
        </div>
        {/* Code */}
        <div style={{ flex: 1 }}>
          <AnimatePresence>
            {LINES.slice(0, visible).map((line, i) => (
              <motion.div key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.08 }}
                style={{ lineHeight: '1.65', minHeight: '1.65em' }}
              >
                {line.map((part, j) => (
                  <span key={j} style={{ color: part.color }}>{part.text}</span>
                ))}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      {/* Status bar */}
      <div style={{
        background: '#007acc', padding: '2px 10px',
        fontFamily: "'Courier New', monospace",
        fontSize: 'clamp(7px, 0.75vw, 9px)',
        color: '#fff', display: 'flex', justifyContent: 'space-between',
        flexShrink: 0, alignItems: 'center',
      }}>
        <span>TypeScript</span>
        <span>[{'█'.repeat(bars)}{'░'.repeat(20 - bars)}] {Math.floor(progress)}%</span>
      </div>
    </div>
  )
}
