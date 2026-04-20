import { motion } from 'framer-motion'

const DEPS: Record<string, string> = {
  '"react"': '"^18.3.1"',
  '"angular"': '"^20.0.0"',
  '"spring-boot"': '"^3.3.0"',
  '"typescript"': '"^5.8.0"',
  '"three"': '"^0.158.0"',
  '"postgresql"': '"^15.4.0"',
  '"docker"': '"^24.0.0"',
  '"gitlab-ci"': '"^16.0.0"',
}

const AI_DEPS: Record<string, string> = {
  '"@anthropic/claude"': '"latest"',
  '"github-copilot"': '"^1.200.0"',
  '"cursor"': '"latest"',
  '"chatgpt"': '"^4.0.0"',
}

export function S2() {
  const line = (key: string, val: string, color: string, delay: number) => (
    <motion.div key={key} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay, duration: 0.15 }}
      style={{ fontSize: 'clamp(8px, 0.9vw, 12px)', marginBottom: '0.15rem' }}>
      <span style={{ color: '#9cdcfe' }}>{key}</span>
      <span style={{ color: '#d4d4d4' }}>: </span>
      <span style={{ color }}>{val}</span>
      <span style={{ color: '#d4d4d4' }}>,</span>
    </motion.div>
  )

  return (
    <div style={{ background: '#1e1e1e', height: '100%', width: '100%', padding: '1.5rem', fontFamily: "'Inconsolata', monospace", overflowY: 'auto', boxSizing: 'border-box' }}>
      <div style={{ color: '#569cd6', fontSize: 'clamp(8px, 0.9vw, 12px)', marginBottom: '0.5rem' }}>// package.json</div>
      <div style={{ color: '#d4d4d4', fontSize: 'clamp(8px, 0.9vw, 12px)' }}>{'{'}</div>
      {[
        ['"name"', '"nabil-amhaouch"', '#ce9178', 0.1],
        ['"version"', '"3.0.0"', '#b5cea8', 0.2],
        ['"role"', '"Full Stack Developer"', '#ce9178', 0.3],
      ].map(([k, v, c, d]) => line(k as string, v as string, c as string, d as number))}
      <div style={{ color: '#9cdcfe', fontSize: 'clamp(8px, 0.9vw, 12px)', marginTop: '0.4rem' }}>"dependencies": {'{'}</div>
      {Object.entries(DEPS).map(([k, v], i) => line(k, v, '#ce9178', 0.4 + i * 0.07))}
      <div style={{ color: '#9cdcfe', fontSize: 'clamp(8px, 0.9vw, 12px)', marginTop: '0.4rem' }}>{'}'}, "ai-tools": {'{'}</div>
      {Object.entries(AI_DEPS).map(([k, v], i) => line(k, v, '#ff79c6', 0.9 + i * 0.07))}
      <div style={{ color: '#d4d4d4', fontSize: 'clamp(8px, 0.9vw, 12px)' }}>{'}'}</div>
      <div style={{ color: '#d4d4d4', fontSize: 'clamp(8px, 0.9vw, 12px)' }}>{'}'}</div>
    </div>
  )
}
