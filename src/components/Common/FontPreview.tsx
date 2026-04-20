const FONTS = [
  { name: 'Ubuntu Mono (actuel)', family: "'Inconsolata', monospace" },
  { name: 'Hack', family: "'Hack', monospace" },
  { name: 'Inconsolata', family: "'Inconsolata', monospace" },
  { name: 'Anonymous Pro', family: "'Anonymous Pro', monospace" },
  { name: 'Fira Mono', family: "'Fira Mono', monospace" },
  { name: 'Roboto Mono', family: "'Roboto Mono', monospace" },
]

function FontPreview() {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gridTemplateRows: '1fr 1fr',
      background: '#111',
    }}>
      {FONTS.map(({ name, family }) => (
        <div key={name} style={{
          outline: '1px solid #1a1a1a',
          display: 'flex', flexDirection: 'column',
          alignItems: 'flex-start', justifyContent: 'center',
          padding: '0 2rem', gap: '0.6rem',
          backgroundImage: `linear-gradient(rgba(52,152,219,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(52,152,219,0.07) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          position: 'relative',
        }}>
          <div style={{
            fontFamily: family,
            fontSize: 'clamp(14px, 1.8vw, 26px)',
            fontWeight: 700,
            letterSpacing: '0.15em',
            color: '#ddeeff',
            textShadow: '0 0 18px rgba(52,152,219,0.9)',
          }}>
            NABIL AMHAOUCH
          </div>
          <div style={{
            fontFamily: family,
            fontSize: 'clamp(10px, 1.2vw, 18px)',
            color: '#fff', opacity: 0.85,
          }}>
            Full Stack Developer
          </div>
          <div style={{
            fontFamily: family,
            fontSize: 'clamp(8px, 0.85vw, 13px)',
            color: '#3498db',
          }}>
            $ npm run portfolio
          </div>
          <div style={{
            position: 'absolute', bottom: '12px', left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: "'Inconsolata', monospace",
            fontSize: '9px', color: '#444',
            letterSpacing: '0.15em', whiteSpace: 'nowrap',
          }}>
            {name.toUpperCase()}
          </div>
        </div>
      ))}
    </div>
  )
}

export default FontPreview
