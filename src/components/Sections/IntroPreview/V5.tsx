import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const ROLES = ['Full Stack Developer', 'Mobile Developer', 'Design Enthusiast', 'AI Enthusiast']
const COLORS = ['#3498db', '#9b59b6', '#e67e22', '#2ecc71']

export function V5() {
  const [visibleCount, setVisibleCount] = useState(0)
  const [activeIdx, setActiveIdx] = useState(-1)

  useEffect(() => {
    let i = 0
    const next = () => {
      i++
      setVisibleCount(i)
      if (i < ROLES.length) setTimeout(next, 260)
      else {
        setTimeout(() => {
          setActiveIdx(0)
          let r = 0
          setInterval(() => { r = (r + 1) % ROLES.length; setActiveIdx(r) }, 1800)
        }, 300)
      }
    }
    setTimeout(next, 600)
  }, [])

  return (
    <div style={{ width: '100%', height: '100%', background: '#060a0c', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', padding: '0 1.2rem', boxSizing: 'border-box', fontFamily: "'Inconsolata', monospace" }}>
      {/* Command line */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        style={{ fontSize: 8, color: '#444', marginBottom: '0.5em' }}>
        <span style={{ color: '#3498db' }}>$</span> nabil --describe
      </motion.div>

      {/* Name */}
      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}
        style={{ marginBottom: '0.55em' }}>
        <div style={{ fontSize: 'clamp(14px, 1.9vw, 26px)', fontWeight: 900, color: '#fff', letterSpacing: '0.12em' }}>
          NABIL AMHAOUCH
        </div>
        <div style={{ fontSize: 'clamp(7px, 0.8vw, 10px)', color: '#666', letterSpacing: '0.22em', marginTop: 2 }}>
          SOFTWARE ENGINEER
        </div>
      </motion.div>

      {/* Roles output */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3em' }}>
        {ROLES.slice(0, visibleCount).map((role, i) => {
          const active = activeIdx === i
          return (
            <motion.div key={role}
              initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.15 }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}
            >
              <span style={{
                fontSize: 9, color: active ? COLORS[i] : '#333',
                transition: 'color 0.2s',
              }}>
                {active ? '❯' : '·'}
              </span>
              <span style={{
                fontSize: 'clamp(8px, 1vw, 12px)',
                color: active ? '#fff' : '#555',
                textShadow: active ? `0 0 10px ${COLORS[i]}88` : 'none',
                transition: 'color 0.2s, text-shadow 0.2s',
                letterSpacing: '0.05em',
              }}>
                {role}
              </span>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
