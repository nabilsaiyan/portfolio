export function S4() {
  const FRONTEND = ['React', 'Angular', 'TypeScript', 'Three.js', 'SCSS', 'Next.js', 'Framer Motion', 'RxJS', 'HTML5', 'Storybook']
  const BACKEND = ['Java', 'Spring Boot', 'Node.js', 'NestJS', 'PostgreSQL', 'Elasticsearch', 'Docker', 'RabbitMQ', 'Keycloak', 'Jenkins']
  const AI = ['Claude API', 'GitHub Copilot', 'Cursor', 'ChatGPT', 'LangChain', 'Anthropic SDK', 'AI-assisted dev', 'Prompt Engineering']

  const pill = (text: string, color: string, bg: string) => (
    <span key={text} style={{ display: 'inline-block', padding: '4px 14px', margin: '0 8px', borderRadius: '3px', background: bg, color, border: `1px solid ${color}44`, fontSize: 'clamp(9px, 1vw, 13px)', whiteSpace: 'nowrap', fontFamily: "'Inconsolata', monospace" }}>
      {text}
    </span>
  )

  const row = (items: string[], color: string, bg: string, duration: string, reverse: boolean) => {
    const doubled = [...items, ...items]
    return (
      <div style={{ overflow: 'hidden', marginBottom: '1rem', padding: '4px 0' }}>
        <div style={{ display: 'flex', animation: `marquee${reverse ? 'R' : ''} ${duration} linear infinite`, width: 'max-content' }}>
          {doubled.map((t, i) => pill(t + (i >= items.length ? '' : ''), color, bg))}
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: '#050505', height: '100%', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '1.5rem', boxSizing: 'border-box', backgroundImage: "linear-gradient(rgba(52,152,219,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(52,152,219,0.06) 1px, transparent 1px)", backgroundSize: '40px 40px', overflow: 'hidden' }}>
      <style>{`
        @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes marqueeR { from { transform: translateX(-50%) } to { transform: translateX(0) } }
      `}</style>
      <div style={{ fontFamily: "'Inconsolata', monospace", color: '#3498db', fontSize: 'clamp(8px, 0.8vw, 11px)', marginBottom: '1.2rem', letterSpacing: '0.2em' }}>STACK // SKILLS // TOOLS</div>
      {row(FRONTEND, '#3498db', 'rgba(52,152,219,0.08)', '25s', false)}
      {row(BACKEND, '#2ecc71', 'rgba(46,204,113,0.08)', '20s', true)}
      {row(AI, '#ff00ff', 'rgba(255,0,255,0.1)', '18s', false)}
    </div>
  )
}
