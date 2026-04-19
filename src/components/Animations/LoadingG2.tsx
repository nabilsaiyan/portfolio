import { useEffect, useState } from 'react'

interface Props { progress: number }

const NAME = 'NABIL AMHAOUCH'
const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$@%!&*'

const randChar = () => CHARSET[Math.floor(Math.random() * CHARSET.length)]

export function LoadingG2({ progress }: Props) {
  const [chars, setChars] = useState<string[]>(() =>
    Array.from(NAME).map(c => (c === ' ' ? ' ' : randChar()))
  )

  useEffect(() => {
    const id = setInterval(() => {
      setChars(Array.from(NAME).map((target, i) => {
        if (target === ' ') return ' '
        const lockAt = (i / NAME.length) * 75
        if (progress >= lockAt + 12) return target
        if (progress >= lockAt)
          return Math.random() > (progress - lockAt) / 12 ? randChar() : target
        return randChar()
      }))
    }, 70)
    return () => clearInterval(id)
  }, [progress])

  const isLocked = (i: number) => {
    if (NAME[i] === ' ') return true
    return progress >= (i / NAME.length) * 75 + 12
  }

  const bars = Math.floor(progress / 5)

  return (
    <div style={{
      background: '#000a00', width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,255,65,0.03) 1px, rgba(0,255,65,0.03) 2px)',
        pointerEvents: 'none',
      }} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem', zIndex: 1 }}>
        <div style={{ display: 'flex', letterSpacing: '0.2em' }}>
          {chars.map((ch, i) => {
            const locked = isLocked(i)
            return (
              <span key={i} style={{
                fontFamily: "'Courier New', monospace",
                fontSize: 'clamp(14px, 2vw, 28px)',
                fontWeight: 900,
                color: locked ? '#ffffff' : '#00881a',
                textShadow: locked
                  ? '0 0 20px #fff, 0 0 40px rgba(100,200,255,0.4)'
                  : '0 0 5px #00ff41',
                display: 'inline-block',
                minWidth: '0.7em', textAlign: 'center',
                transition: locked ? 'color 0.1s, text-shadow 0.1s' : 'none',
              }}>
                {ch}
              </span>
            )
          })}
        </div>
        <div style={{
          fontFamily: "'Courier New', monospace",
          color: '#003308', fontSize: 'clamp(7px, 0.8vw, 9px)',
          letterSpacing: '0.3em',
        }}>
          DECRYPTING IDENTITY...
        </div>
      </div>
      <div style={{
        zIndex: 1, marginTop: '2rem',
        fontFamily: "'Courier New', monospace",
        color: '#006614', fontSize: 'clamp(8px, 0.9vw, 11px)',
        textShadow: '0 0 6px #00ff41',
      }}>
        [{'█'.repeat(bars)}{'░'.repeat(20 - bars)}] {Math.floor(progress)}%
      </div>
    </div>
  )
}
