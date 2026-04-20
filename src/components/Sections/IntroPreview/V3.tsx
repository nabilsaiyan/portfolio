import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ROLES = ['Full Stack Developer', 'Mobile Developer', 'Design Enthusiast', 'AI Enthusiast']
const C = '#3498db'

export function V3() {
  const [phase, setPhase] = useState(0)
  const [partial, setPartial] = useState('')
  const [showTab, setShowTab] = useState(false)
  const [roleIdx, setRoleIdx] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 300)
    const t2 = setTimeout(() => setPhase(2), 900)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  useEffect(() => {
    if (phase < 2) return
    let cancelled = false
    const role = ROLES[roleIdx]
    const partial_text = role.slice(0, Math.floor(role.length * 0.45))

    setPartial('')
    setShowTab(false)

    let i = 0
    const typePartial = () => {
      if (cancelled) return
      i++
      setPartial(partial_text.slice(0, i))
      if (i < partial_text.length) setTimeout(typePartial, 42)
      else {
        setTimeout(() => {
          if (cancelled) return
          setShowTab(true)
          setTimeout(() => {
            if (cancelled) return
            setShowTab(false)
            setPartial(role)
            setTimeout(() => {
              if (cancelled) return
              setRoleIdx(p => (p + 1) % ROLES.length)
            }, 1400)
          }, 500)
        }, 300)
      }
    }
    typePartial()
    return () => { cancelled = true }
  }, [phase, roleIdx])

  return (
    <div style={{ width: '100%', height: '100%', background: '#06090f', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', padding: '0 1.2rem', boxSizing: 'border-box', fontFamily: "'Inconsolata', monospace", gap: '0.25em' }}>
      {/* Prompt */}
      <div style={{ fontSize: 8, color: '#444', marginBottom: '0.1em' }}>
        <span style={{ color: C }}>nabil</span>
        <span style={{ color: '#555' }}>@portfolio</span>
        <span style={{ color: '#444' }}>:~</span>
        <span style={{ color: '#fff' }}>$</span>
      </div>

      {/* Name */}
      {phase >= 1 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ fontSize: 'clamp(14px, 1.9vw, 26px)', fontWeight: 900, color: '#fff', letterSpacing: '0.12em', marginBottom: '0.25em' }}>
          NABIL AMHAOUCH
        </motion.div>
      )}

      {phase >= 1 && (
        <div style={{ fontSize: 'clamp(7px, 0.8vw, 11px)', color: '#666', letterSpacing: '0.2em', marginBottom: '0.4em' }}>
          Software Engineer
        </div>
      )}

      {/* Autocomplete line */}
      {phase >= 2 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4em', fontSize: 'clamp(8px, 1vw, 13px)' }}>
          <span style={{ color: '#555', fontSize: 8 }}>role=</span>
          <span style={{ color: C }}>{partial}</span>
          <AnimatePresence>
            {showTab && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                style={{ fontSize: 7, background: '#1a2a3a', color: C, padding: '1px 5px', borderRadius: 3, border: `1px solid ${C}44` }}
              >
                TAB
              </motion.span>
            )}
          </AnimatePresence>
          {partial === ROLES[roleIdx] && (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{ fontSize: 8, color: '#00c853' }}>✓</motion.span>
          )}
        </div>
      )}
    </div>
  )
}
