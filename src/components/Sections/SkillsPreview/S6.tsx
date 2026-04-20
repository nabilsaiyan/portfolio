import { useEffect, useState } from 'react'

const PACKAGES = [
  { name: 'react@18.3.1', type: 'dep' },
  { name: 'angular@20.0.0', type: 'dep' },
  { name: 'spring-boot@3.3.0', type: 'dep' },
  { name: 'typescript@5.8.0', type: 'dep' },
  { name: 'three@0.158.0', type: 'dep' },
  { name: 'postgresql@15.4.0', type: 'dep' },
  { name: 'docker@24.0.0', type: 'dep' },
  { name: '@anthropic/claude@latest', type: 'ai' },
  { name: 'github-copilot@1.200.0', type: 'ai' },
  { name: 'cursor@latest', type: 'ai' },
]

const SPINNER = ['⠋','⠙','⠹','⠸','⠼','⠴','⠦','⠧','⠇','⠏']

export function S6() {
  const [installed, setInstalled] = useState(0)
  const [spin, setSpin] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (done) return
    const spinId = setInterval(() => setSpin(s => (s + 1) % SPINNER.length), 80)
    const installId = setInterval(() => {
      setInstalled(prev => {
        if (prev >= PACKAGES.length) { setDone(true); clearInterval(installId); return prev }
        return prev + 1
      })
    }, 400)
    return () => { clearInterval(spinId); clearInterval(installId) }
  }, [done])

  // Loop
  useEffect(() => {
    if (done) {
      const id = setTimeout(() => { setInstalled(0); setDone(false) }, 3000)
      return () => clearTimeout(id)
    }
  }, [done])

  return (
    <div style={{ background: '#050505', height: '100%', width: '100%', padding: '1.5rem', fontFamily: "'Inconsolata', monospace", overflowY: 'auto', boxSizing: 'border-box', backgroundImage: "linear-gradient(rgba(52,152,219,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(52,152,219,0.06) 1px, transparent 1px)", backgroundSize: '40px 40px' }}>
      <div style={{ color: '#888', fontSize: 'clamp(9px, 1vw, 13px)', marginBottom: '1rem' }}>$ npm install --save skills</div>
      {PACKAGES.slice(0, installed).map((pkg, i) => (
        <div key={pkg.name} style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.2rem', fontSize: 'clamp(8px, 0.9vw, 12px)', alignItems: 'center' }}>
          <span style={{ color: '#2ecc71' }}>+</span>
          <span style={{ color: pkg.type === 'ai' ? '#ff79c6' : '#ccc' }}>{pkg.name}</span>
          {pkg.type === 'ai' && <span style={{ color: '#ff00ff', fontSize: '0.75em', border: '1px solid #ff00ff44', padding: '0 4px', borderRadius: '2px' }}>AI</span>}
        </div>
      ))}
      {!done && installed < PACKAGES.length && (
        <div style={{ color: '#3498db', fontSize: 'clamp(8px, 0.9vw, 12px)', marginTop: '0.3rem' }}>
          {SPINNER[spin]} installing {PACKAGES[installed]?.name}...
        </div>
      )}
      {done && (
        <div style={{ color: '#2ecc71', fontSize: 'clamp(8px, 0.9vw, 12px)', marginTop: '0.8rem' }}>
          added {PACKAGES.length} packages in 3.2s
        </div>
      )}
    </div>
  )
}
