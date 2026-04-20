import { V1 } from './V1'
import { V2 } from './V2'
import { V3 } from './V3'
import { V4 } from './V4'
import { V5 } from './V5'
import { V6 } from './V6'

const LABELS = ['V1 — BASH ECHO', 'V2 — BOOT [ OK ]', 'V3 — TAB COMPLETE', 'V4 — TICKER SCROLL', 'V5 — CURSOR SELECT', 'V6 — ARROW MENU']
const VARIANTS = [V1, V2, V3, V4, V5, V6]

export function IntroPreview() {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gridTemplateRows: '1fr 1fr',
      overflow: 'hidden',
      background: '#111111',
    }}>
      {VARIANTS.map((Comp, i) => (
        <div key={i} style={{ position: 'relative', outline: '1px solid #1a1a1a', overflow: 'hidden' }}>
          {/* Variant content in left 55%, right stays dark like the real page */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '55%', height: '100%' }}>
            <Comp />
          </div>
          <div style={{
            position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)',
            color: '#444', fontFamily: "'Inconsolata',monospace",
            fontSize: 8, letterSpacing: '0.15em', zIndex: 100,
            background: 'rgba(0,0,0,0.9)', padding: '2px 8px',
            borderRadius: 3, whiteSpace: 'nowrap', border: '1px solid #222',
          }}>
            {LABELS[i]}
          </div>
        </div>
      ))}
    </div>
  )
}
