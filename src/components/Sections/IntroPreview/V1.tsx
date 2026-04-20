import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const ROLES = ['Full Stack Developer', 'Mobile Developer', 'Design Enthusiast', 'AI Enthusiast']
const G = '#00ff88'

export function V1() {
  const [phase, setPhase] = useState(0)
  const [roleText, setRoleText] = useState('')
  const [roleIdx, setRoleIdx] = useState(0)
  const [cursor, setCursor] = useState(true)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 300)
    const t2 = setTimeout(() => setPhase(2), 800)
    const t3 = setTimeout(() => setPhase(3), 1300)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  useEffect(() => {
    if (phase < 3) return
    let cancelled = false
    const role = ROLES[roleIdx]
    const type = (i: number) => {
      if (cancelled) return
      setRoleText(role.slice(0, i))
      if (i <= role.length) setTimeout(() => type(i + 1), 36)
      else setTimeout(() => erase(role.length), 1300)
    }
    const erase = (i: number) => {
      if (cancelled) return
      setRoleText(role.slice(0, i))
      if (i > 0) setTimeout(() => erase(i - 1), 22)
      else setRoleIdx(p => (p + 1) % ROLES.length)
    }
    type(0)
    return () => { cancelled = true }
  }, [phase, roleIdx])

  useEffect(() => {
    const id = setInterval(() => setCursor(c => !c), 530)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{ width: '100%', height: '100%', background: '#070c07', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', padding: '0 1.2rem', boxSizing: 'border-box', fontFamily: "'Inconsolata', monospace", gap: '0.2em' }}>
      <div style={{ fontSize: 8, color: '#333' }}><span style={{ color: G }}>$</span> whoami</div>
      {phase >= 1 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ fontSize: 'clamp(14px, 1.9vw, 26px)', fontWeight: 900, color: '#fff', letterSpacing: '0.12em', marginBottom: '0.3em' }}>
          NABIL AMHAOUCH
        </motion.div>
      )}
      {phase >= 1 && <div style={{ fontSize: 8, color: '#333' }}><span style={{ color: G }}>$</span> echo $TITLE</div>}
      {phase >= 2 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ fontSize: 'clamp(8px, 1vw, 12px)', color: '#aaa', letterSpacing: '0.1em', marginBottom: '0.3em' }}>
          Software Engineer
        </motion.div>
      )}
      {phase >= 2 && <div style={{ fontSize: 8, color: '#333' }}><span style={{ color: G }}>$</span> echo $ROLE</div>}
      {phase >= 3 && (
        <div style={{ fontSize: 'clamp(9px, 1.1vw, 15px)', color: G, minHeight: '1.4em' }}>
          {roleText}
          <span style={{ display: 'inline-block', width: 7, height: '0.85em', background: cursor ? G : 'transparent', marginLeft: 1, verticalAlign: 'middle' }} />
        </div>
      )}
    </div>
  )
}
