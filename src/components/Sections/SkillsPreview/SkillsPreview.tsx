import { S1 } from './S1'
import { S2 } from './S2'
import { S3 } from './S3'
import { S4 } from './S4'
import { S5 } from './S5'
import { S6 } from './S6'

const LABELS = ['S1 — TERMINAL ls', 'S2 — PACKAGE.JSON', 'S3 — GIT LOG', 'S4 — MARQUEE TICKER', 'S5 — VSCODE EXPLORER', 'S6 — NPM INSTALL']
const COMPONENTS = [<S1 />, <S2 />, <S3 />, <S4 />, <S5 />, <S6 />]

export function SkillsPreview() {
  const label: React.CSSProperties = {
    position: 'absolute', top: '10px', left: '50%',
    transform: 'translateX(-50%)',
    color: '#444', fontFamily: "'Inconsolata', monospace",
    fontSize: '9px', letterSpacing: '0.18em', zIndex: 100,
    background: 'rgba(0,0,0,0.85)', padding: '2px 8px',
    borderRadius: '3px', whiteSpace: 'nowrap', border: '1px solid #222',
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gridTemplateRows: '1fr 1fr',
      overflow: 'hidden', background: '#000',
    }}>
      {COMPONENTS.map((comp, i) => (
        <div key={i} style={{ position: 'relative', outline: '1px solid #111', overflow: 'hidden' }}>
          <div style={label}>{LABELS[i]}</div>
          {comp}
        </div>
      ))}
    </div>
  )
}
