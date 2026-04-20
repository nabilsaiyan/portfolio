import { useEffect, useState } from 'react'
import { LoadingG1 } from './LoadingG1'
import { LoadingG2 } from './LoadingG2'
import { LoadingG3 } from './LoadingG3'
import { LoadingT1 } from './LoadingT1'
import { LoadingT2 } from './LoadingT2'
import { LoadingT3 } from './LoadingT3'

export function LoadingPreview() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let p = 0
    const id = setInterval(() => {
      p = p >= 100 ? 0 : p + 1
      setProgress(p)
    }, 60)
    return () => clearInterval(id)
  }, [])

  const cell: React.CSSProperties = {
    position: 'relative', overflow: 'hidden',
    outline: '1px solid #111',
  }
  const labelStyle: React.CSSProperties = {
    position: 'absolute', top: '10px', left: '50%',
    transform: 'translateX(-50%)',
    color: '#555', fontFamily: "'Inconsolata', monospace",
    fontSize: '10px', letterSpacing: '0.18em', zIndex: 100,
    background: 'rgba(0,0,0,0.85)', padding: '2px 8px',
    borderRadius: '3px', whiteSpace: 'nowrap', border: '1px solid #222',
  }

  const variants = [
    { id: 'G1', label: 'G1 — GLITCH+', node: <LoadingG1 progress={progress} /> },
    { id: 'G2', label: 'G2 — MATRIX CIPHER', node: <LoadingG2 progress={progress} /> },
    { id: 'G3', label: 'G3 — FRAGMENTS', node: <LoadingG3 progress={progress} /> },
    { id: 'T1', label: 'T1 — TERMINAL+', node: <LoadingT1 progress={progress} /> },
    { id: 'T2', label: 'T2 — CODE EDITOR', node: <LoadingT2 progress={progress} /> },
    { id: 'T3', label: 'T3 — BIOS BOOT', node: <LoadingT3 progress={progress} /> },
  ]

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gridTemplateRows: '1fr 1fr',
      width: '100vw', height: '100vh',
      overflow: 'hidden', background: '#000',
    }}>
      {variants.map(({ id, label, node }) => (
        <div key={id} style={cell}>
          <div style={labelStyle}>{label}</div>
          {node}
        </div>
      ))}
    </div>
  )
}
