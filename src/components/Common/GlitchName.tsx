import { useEffect, useState } from 'react'

const NAME = 'NABIL AMHAOUCH'

function GlitchName() {
  const [glitch, setGlitch] = useState<Set<number>>(new Set())

  useEffect(() => {
    const id = setInterval(() => {
      const s = new Set<number>()
      for (let k = 0; k < 2; k++)
        if (Math.random() > 0.4)
          s.add(Math.floor(Math.random() * NAME.length))
      setGlitch(s)
      setTimeout(() => setGlitch(new Set()), 70)
    }, 220)
    return () => clearInterval(id)
  }, [])

  return (
    <h1 className="glitch-name">
      {Array.from(NAME).map((ch, i) => {
        const gl = glitch.has(i)
        return (
          <span key={i} className={gl ? 'glitch-name__letter glitch-name__letter--active' : 'glitch-name__letter'}>
            {ch === ' ' ? '\u00A0' : ch}
          </span>
        )
      })}
    </h1>
  )
}

export default GlitchName
