import { motion } from 'framer-motion'

const COMMITS = [
  { hash: 'a3f2b1c', msg: 'feat(ai): integrate Cursor + Claude API daily workflow', date: '2024-12', branch: 'main', ai: true },
  { hash: '8d4e9f2', msg: 'feat(ai): adopt GitHub Copilot for pair programming', date: '2024-06', branch: 'main', ai: true },
  { hash: 'f1c3a8e', msg: 'feat: Angular 18-20 + DSFR component library', date: '2024-03', branch: 'feature/klee', ai: false },
  { hash: '2c7a1b3', msg: 'feat: Spring Boot 3 microservices + Keycloak SSO', date: '2024-01', branch: 'feature/klee', ai: false },
  { hash: 'b9e4d71', msg: 'feat: Elasticsearch + RabbitMQ event-driven arch', date: '2023-09', branch: 'feature/capgemini', ai: false },
  { hash: '5f8d3e1', msg: 'feat: Three.js WebGL 3D portfolio rendering', date: '2023-06', branch: 'feature/perso', ai: false },
  { hash: '3a2c9f4', msg: 'feat: React 17-18 + NestJS + Docker full-stack', date: '2023-04', branch: 'feature/capgemini', ai: false },
  { hash: '1a9c4d7', msg: 'init: Angular 12 + Java Spring Boot foundation', date: '2022-03', branch: 'feature/ibiteam', ai: false },
]

export function S3() {
  return (
    <div style={{ background: '#0d1117', height: '100%', width: '100%', padding: '1.5rem', fontFamily: "'Inconsolata', monospace", overflowY: 'auto', boxSizing: 'border-box', backgroundImage: "linear-gradient(rgba(52,152,219,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(52,152,219,0.04) 1px, transparent 1px)", backgroundSize: '40px 40px' }}>
      <div style={{ color: '#8b949e', fontSize: 'clamp(8px, 0.8vw, 11px)', marginBottom: '1rem' }}>$ git log --oneline --graph skills/</div>
      {COMMITS.map((c, i) => (
        <motion.div key={c.hash} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
          style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.5rem', fontSize: 'clamp(7px, 0.85vw, 11px)', alignItems: 'flex-start' }}>
          <span style={{ color: c.ai ? '#ff00ff' : '#3498db', flexShrink: 0 }}>{'*'}</span>
          <span style={{ color: '#f0883e', flexShrink: 0 }}>{c.hash}</span>
          <span style={{ color: c.ai ? '#ff79c6' : '#e6edf3', flex: 1 }}>{c.msg}</span>
          <span style={{ color: '#444', flexShrink: 0, fontSize: '0.85em' }}>{c.date}</span>
        </motion.div>
      ))}
    </div>
  )
}
