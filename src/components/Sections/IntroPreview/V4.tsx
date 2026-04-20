import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const ROLES = ['Full Stack Developer', 'Mobile Developer', 'Design Enthusiast', 'AI Enthusiast']
const LINE_H = 22

export function V4() {
  const [started, setStarted] = useState(false)
  const [offsetY, setOffsetY] = useState(0)
  const rafRef = useRef<number>()
  const startTimeRef = useRef<number>(0)

  useEffect(() => {
    const t = setTimeout(() => {
      setStarted(true)
      startTimeRef.current = performance.now()
      const step = (now: number) => {
        const elapsed = now - startTimeRef.current
        setOffsetY((elapsed * 0.022) % LINE_H)
        rafRef.current = requestAnimationFrame(step)
      }
      rafRef.current = requestAnimationFrame(step)
    }, 600)
    return () => { clearTimeout(t); if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [])

  const extendedRoles = [...ROLES, ...ROLES, ...ROLES]

  return (
    <div style={{ width: '100%', height: '100%', background: '#06070c', display: 'flex', flexDirection: 'column', padding: '0 1.2rem', boxSizing: 'border-box', fontFamily: "'Inconsolata', monospace", justifyContent: 'center', gap: '0.4em' }}>
      {/* Name block */}
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div style={{ fontSize: 8, color: '#555', letterSpacing: '0.2em', marginBottom: 3 }}>
          <span style={{ color: '#9b59b6' }}>$</span> describe nabil --roles
        </div>
        <div style={{ fontSize: 'clamp(14px, 1.9vw, 26px)', fontWeight: 900, color: '#fff', letterSpacing: '0.12em' }}>
          NABIL AMHAOUCH
        </div>
        <div style={{ fontSize: 'clamp(7px, 0.8vw, 10px)', color: '#555', letterSpacing: '0.22em', marginTop: 2 }}>
          SOFTWARE ENGINEER
        </div>
      </motion.div>

      {/* Ticker separator */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, #9b59b6, transparent)' }} />

      {/* Scrolling roles */}
      <div style={{ height: LINE_H * 3, overflow: 'hidden', position: 'relative' }}>
        {/* Fade masks */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: LINE_H, background: 'linear-gradient(#06070c, transparent)', zIndex: 2, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: LINE_H, background: 'linear-gradient(transparent, #06070c)', zIndex: 2, pointerEvents: 'none' }} />

        <div style={{ transform: `translateY(-${offsetY}px)`, willChange: 'transform' }}>
          {extendedRoles.map((role, i) => (
            <div key={i} style={{
              height: LINE_H, display: 'flex', alignItems: 'center', gap: '0.5em',
              fontSize: 'clamp(8px, 1vw, 13px)',
            }}>
              <span style={{ color: '#9b59b6', fontSize: 8 }}>›</span>
              <span style={{ color: '#ccc' }}>{role}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
