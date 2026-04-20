export function S1() {
  const SKILLS = [
    { name: 'React / Next.js',      cat: 'frontend', years: '3yr', level: 90 },
    { name: 'Angular 18-20',        cat: 'frontend', years: '3yr', level: 85 },
    { name: 'Java / Spring Boot',   cat: 'backend',  years: '3yr', level: 88 },
    { name: 'TypeScript',           cat: 'frontend', years: '3yr', level: 87 },
    { name: 'Three.js / WebGL',     cat: '3d',       years: '2yr', level: 78 },
    { name: 'PostgreSQL / Elastic', cat: 'db',       years: '2yr', level: 80 },
    { name: 'Docker / GitLab CI',   cat: 'devops',   years: '2yr', level: 82 },
    { name: 'Claude API',           cat: 'ai',       years: '6mo', level: 75 },
    { name: 'GitHub Copilot',       cat: 'ai',       years: '1yr', level: 88 },
    { name: 'Cursor',               cat: 'ai',       years: '6mo', level: 80 },
  ]

  const catColor = (c: string) => ({ frontend: '#3498db', backend: '#2ecc71', db: '#e67e22', devops: '#9b59b6', ai: '#ff00ff', '3d': '#00ffff' }[c] || '#fff')

  return (
    <div style={{ background: '#050505', height: '100%', width: '100%', padding: '1.5rem', fontFamily: "'Inconsolata', monospace", overflowY: 'auto', boxSizing: 'border-box', backgroundImage: "linear-gradient(rgba(52,152,219,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(52,152,219,0.06) 1px, transparent 1px)", backgroundSize: '40px 40px' }}>
      <div style={{ color: '#00cc33', marginBottom: '0.5rem', fontSize: 'clamp(9px, 1vw, 13px)' }}>nabil@portfolio:~$ ls -la ./skills</div>
      <div style={{ color: '#333', fontSize: 'clamp(8px, 0.8vw, 11px)', marginBottom: '0.5rem' }}>total {SKILLS.length} packages installed</div>
      {SKILLS.map((s, i) => (
        <div key={i} style={{ display: 'flex', gap: '0.8rem', marginBottom: '0.25rem', fontSize: 'clamp(8px, 0.9vw, 12px)', alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ color: '#2a4a2a' }}>-rwxr-xr-x</span>
          <span style={{ color: '#444', minWidth: '3ch' }}>{s.years}</span>
          <span style={{ color: catColor(s.cat), minWidth: '24ch', fontWeight: s.cat === 'ai' ? 700 : 400 }}>{s.cat === 'ai' ? '[AI] ' : ''}{s.name}</span>
          <span style={{ color: '#1a7a1a', letterSpacing: '-1px' }}>{'█'.repeat(Math.round(s.level / 10))}{'░'.repeat(10 - Math.round(s.level / 10))}</span>
          <span style={{ color: '#444', fontSize: '0.75em' }}>{s.level}%</span>
        </div>
      ))}
      <div style={{ color: '#333', fontSize: 'clamp(8px, 0.8vw, 11px)', marginTop: '0.8rem' }}>nabil@portfolio:~$ _</div>
    </div>
  )
}
