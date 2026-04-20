import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TREE = [
  { folder: 'frontend/', color: '#3498db', open: true, files: ['React.tsx', 'Angular.ts', 'TypeScript.ts', 'Three.js', 'SCSS', 'Next.tsx'] },
  { folder: 'backend/', color: '#2ecc71', open: true, files: ['Java.java', 'SpringBoot.java', 'NodeJS.js', 'NestJS.ts', 'PostgreSQL.sql'] },
  { folder: 'devops/', color: '#9b59b6', open: false, files: ['Docker', 'GitLabCI.yml', 'Jenkins', 'RabbitMQ', 'Keycloak'] },
  { folder: 'ai-tools/', color: '#ff00ff', open: true, files: ['ClaudeAPI.ts', 'GitHubCopilot', 'Cursor', 'ChatGPT', 'Anthropic.sdk'] },
]

export function S5() {
  const [open, setOpen] = useState<Record<string, boolean>>(() => Object.fromEntries(TREE.map(t => [t.folder, t.open])))

  return (
    <div style={{ background: '#1e1e1e', height: '100%', width: '100%', display: 'flex', flexDirection: 'column', fontFamily: "'Inconsolata', monospace", overflowY: 'auto', boxSizing: 'border-box' }}>
      <div style={{ background: '#2d2d2d', padding: '8px 12px', fontSize: 'clamp(8px, 0.8vw, 11px)', color: '#888', letterSpacing: '0.1em', flexShrink: 0 }}>EXPLORER — SKILLS</div>
      <div style={{ padding: '0.5rem 0', flex: 1 }}>
        {TREE.map(({ folder, color, files }) => (
          <div key={folder}>
            <div onClick={() => setOpen(p => ({ ...p, [folder]: !p[folder] }))}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '3px 12px', cursor: 'pointer', fontSize: 'clamp(9px, 0.95vw, 12px)', color: folder === 'ai-tools/' ? '#ff79c6' : '#ccc' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#2a2d2e')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <span style={{ color: '#c09553', fontSize: '0.8em' }}>{open[folder] ? '▾' : '▸'}</span>
              <span style={{ color }}>{folder}</span>
            </div>
            <AnimatePresence>
              {open[folder] && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.15 }}>
                  {files.map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '2px 12px 2px 28px', fontSize: 'clamp(8px, 0.85vw, 11px)', color: folder === 'ai-tools/' ? '#ff79c6' : '#9a9a9a' }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#2a2d2e')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: color, display: 'inline-block', flexShrink: 0 }} />
                      {f}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  )
}
