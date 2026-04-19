import { useEffect, useRef } from 'react'

interface Props { progress: number }

interface Pt {
  angle: number; radius: number; speed: number
  hue: number; size: number
  tx: number[]; ty: number[]
}

export function LoadingV2({ progress }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const progressRef = useRef(progress)
  const rafRef = useRef<number>()
  const pts = useRef<Pt[]>([])

  progressRef.current = progress

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!

    const init = () => {
      canvas.width = canvas.offsetWidth || Math.floor(window.innerWidth / 3)
      canvas.height = canvas.offsetHeight || window.innerHeight
      const N = 90
      pts.current = Array.from({ length: N }, (_, i) => ({
        angle: (i / N) * Math.PI * 2,
        radius: 80 + Math.random() * 100,
        speed: 0.008 + Math.random() * 0.015,
        hue: (i / N) * 360,
        size: 1.5 + Math.random() * 2.5,
        tx: [], ty: [],
      }))
    }

    const TRAIL = 10
    const animate = () => {
      const p = progressRef.current
      const cx = canvas.width / 2
      const cy = canvas.height / 2

      ctx.fillStyle = 'rgba(8,8,8,0.22)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const targetR = 22 + (1 - p / 100) * 130

      pts.current.forEach((pt) => {
        pt.angle += pt.speed * (1 + p / 180)
        pt.radius += (targetR - pt.radius) * 0.04
        const x = cx + Math.cos(pt.angle) * pt.radius
        const y = cy + Math.sin(pt.angle) * pt.radius
        pt.tx.push(x); pt.ty.push(y)
        if (pt.tx.length > TRAIL) { pt.tx.shift(); pt.ty.shift() }

        for (let t = 1; t < pt.tx.length; t++) {
          const op = t / pt.tx.length
          ctx.shadowBlur = 5
          ctx.shadowColor = `hsl(${pt.hue},100%,60%)`
          ctx.strokeStyle = `hsla(${pt.hue},100%,65%,${op * 0.5})`
          ctx.lineWidth = pt.size * op
          ctx.lineCap = 'round'
          ctx.beginPath()
          ctx.moveTo(pt.tx[t - 1], pt.ty[t - 1])
          ctx.lineTo(pt.tx[t], pt.ty[t])
          ctx.stroke()
        }

        ctx.shadowBlur = 14
        ctx.shadowColor = `hsl(${pt.hue},100%,60%)`
        ctx.fillStyle = `hsl(${pt.hue},100%,75%)`
        ctx.beginPath()
        ctx.arc(x, y, pt.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
        pt.hue = (pt.hue + 0.2) % 360
      })

      const fs = Math.floor(canvas.width * 0.11)
      ctx.font = `900 ${fs}px 'Courier New',monospace`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.shadowBlur = 25
      ctx.shadowColor = '#fff'
      ctx.fillStyle = 'rgba(255,255,255,0.9)'
      ctx.fillText(`${Math.floor(p)}%`, cx, cy)
      ctx.shadowBlur = 0

      rafRef.current = requestAnimationFrame(animate)
    }

    requestAnimationFrame(() => { init(); animate() })
    return () => cancelAnimationFrame(rafRef.current!)
  }, [])

  return (
    <div style={{ background: '#080808', width: '100%', height: '100%' }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
    </div>
  )
}
