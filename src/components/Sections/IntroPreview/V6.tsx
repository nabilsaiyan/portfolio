import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ROLES = ['Full Stack Developer', 'Mobile Developer', 'Design Enthusiast', 'AI Enthusiast']
const C = '#00d4ff'

export function V6() {
  const [phase, setPhase] = useState(0)
  const [selectedIdx, setSelectedIdx] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 300)
    const t2 = setTimeout(() => setPhase(2), 900)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  useEffect(() => {
    if (phase < 2) return
    const id = setInterval(() => setSelectedIdx(i => (i + 1) % ROLES.length), 1600)
    return () => clearInterval(id)
  }, [phase])

  return (
    <div style={{ width: '100%', height: '100%', background: '#040c0f', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', padding: '0 1.2rem', boxSizing: 'border-box', fontFamily: "'Inconsolata', monospace" }}>
      {/* Prompt */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: phase >= 1 ? 1 : 0 }}
        style={{ fontSize: 8, color: '#333', marginBottom: '0.4em' }}>
        <span style={{ color: C }}>❯</span> select role
      </motion.div>

      {/* Name */}
      <AnimatePresence>
        {phase >= 1 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            style={{ marginBottom: '0.55em' }}>
            <div style={{ fontSize: 'clamp(14px, 1.9vw, 26px)', fontWeight: 900, color: '#fff', letterSpacing: '0.12em' }}>
              NABIL AMHAOUCH
            </div>
            <div style={{ fontSize: 'clamp(7px, 0.8vw, 10px)', color: '#555', letterSpacing: '0.22em', marginTop: 2 }}>
              SOFTWARE ENGINEER
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selection list */}
      {phase >= 2 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '0.28em', paddingLeft: '0.2em' }}>
          {ROLES.map((role, i) => {
            const active = selectedIdx === i
            return (
              <div key={role} style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
                <motion.span
                  animate={{ opacity: active ? 1 : 0, x: active ? 0 : -4 }}
                  transition={{ duration: 0.15 }}
                  style={{ color: C, fontSize: 10, width: 10, flexShrink: 0 }}
                >
                  ❯
                </motion.span>
                <span style={{
                  fontSize: 'clamp(8px, 1vw, 13px)',
                  color: active ? '#fff' : '#3a4a50',
                  textShadow: active ? `0 0 12px ${C}66` : 'none',
                  transition: 'color 0.15s, text-shadow 0.15s',
                  letterSpacing: '0.05em',
                  background: active ? `${C}0e` : 'transparent',
                  padding: '1px 5px', borderRadius: 2,
                }}>
                  {role}
                </span>
              </div>
            )
          })}
        </motion.div>
      )}
    </div>
  )
}
