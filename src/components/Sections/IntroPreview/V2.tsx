import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const ROLES = ['Full Stack Developer', 'Mobile Developer', 'Design Enthusiast', 'AI Enthusiast']

export function V2() {
  const [loadCount, setLoadCount] = useState(0)
  const [activeIdx, setActiveIdx] = useState(-1)

  useEffect(() => {
    let i = 0
    const next = () => {
      i++
      setLoadCount(i)
      if (i < ROLES.length) setTimeout(next, 320)
      else {
        setTimeout(() => {
          setActiveIdx(0)
          let r = 0
          setInterval(() => { r = (r + 1) % ROLES.length; setActiveIdx(r) }, 1800)
        }, 400)
      }
    }
    setTimeout(next, 500)
  }, [])

  return (
    <div style={{ width: '100%', height: '100%', background: '#050508', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 1rem', boxSizing: 'border-box', fontFamily: "'Inconsolata', monospace" }}>
      {/* Name */}
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        style={{ marginBottom: '0.15em' }}>
        <div style={{ fontSize: 'clamp(14px, 1.9vw, 26px)', fontWeight: 900, color: '#fff', letterSpacing: '0.12em' }}>
          NABIL AMHAOUCH
        </div>
        <div style={{ fontSize: 'clamp(7px, 0.8vw, 10px)', color: '#666', letterSpacing: '0.25em', marginTop: 2 }}>
          SOFTWARE ENGINEER
        </div>
      </motion.div>

      <div style={{ height: 1, background: '#1a1a2a', margin: '0.5em 0' }} />

      {/* Roles loading */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3em' }}>
        {ROLES.slice(0, loadCount).map((role, i) => {
          const active = activeIdx === i
          return (
            <motion.div key={role}
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.18 }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.55em' }}
            >
              <span style={{
                fontSize: 7, padding: '0 4px', borderRadius: 2, fontWeight: 700,
                background: active ? '#00c853' : 'transparent',
                color: active ? '#000' : '#00c853',
                border: `1px solid ${active ? '#00c853' : '#1a3a1a'}`,
                transition: 'all 0.2s', letterSpacing: '0.05em', flexShrink: 0,
              }}>
                OK
              </span>
              <span style={{ fontSize: 'clamp(8px, 1vw, 13px)', color: active ? '#fff' : '#555', transition: 'color 0.2s', letterSpacing: '0.05em' }}>
                {role}
              </span>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
