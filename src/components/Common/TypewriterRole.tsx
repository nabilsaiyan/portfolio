import { useEffect, useRef, useState } from 'react'

interface Props { text: string }

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$'
const rand = () => CHARS[Math.floor(Math.random() * CHARS.length)]

function TypewriterRole({ text }: Props) {
  const [locked, setLocked] = useState(0)
  const [cycle, setCycle] = useState<string[]>([])
  const [blink, setBlink] = useState(true)
  const lockRef = useRef<ReturnType<typeof setTimeout>>()

  // Reset and re-reveal whenever text changes
  useEffect(() => {
    setLocked(0)
    setCycle(Array.from(text).map(c => (c === ' ' ? ' ' : rand())))

    let count = 0
    const lockNext = () => {
      count++
      setLocked(count)
      if (count < text.length) lockRef.current = setTimeout(lockNext, 48)
    }
    lockRef.current = setTimeout(lockNext, 80)
    return () => clearTimeout(lockRef.current)
  }, [text])

  // Keep unlocked chars cycling
  useEffect(() => {
    const id = setInterval(() => {
      setCycle(prev =>
        prev.map((_, i) =>
          i < locked || text[i] === ' ' ? text[i] : rand()
        )
      )
    }, 65)
    return () => clearInterval(id)
  }, [text, locked])

  // Cursor blink
  useEffect(() => {
    const id = setInterval(() => setBlink(b => !b), 530)
    return () => clearInterval(id)
  }, [])

  const done = locked >= text.length

  return (
    <div className="role-text">
      {cycle.map((ch, i) => {
        const isLocked = i < locked
        return (
          <span key={i} style={{
            display: 'inline-block',
            color: isLocked ? '#fff' : '#3498db',
            textShadow: isLocked
              ? '0 0 12px rgba(255,255,255,0.25)'
              : '0 0 8px #3498db',
          }}>
            {ch}
          </span>
        )
      })}
      <span style={{
        display: 'inline-block',
        width: '4px',
        height: '0.75em',
        background: '#3498db',
        marginLeft: '6px',
        verticalAlign: 'middle',
        opacity: done ? (blink ? 1 : 0) : 1,
        boxShadow: '0 0 10px #3498db',
        transition: 'opacity 0.1s',
      }} />
    </div>
  )
}

export default TypewriterRole
