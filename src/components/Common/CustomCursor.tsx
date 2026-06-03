import { useEffect, useRef } from 'react'
import '../../styles/components/CustomCursor.scss'

const isTouchDevice = () =>
  window.matchMedia('(hover: none) and (pointer: coarse)').matches

const TRAIL_MS = 380

interface PathPoint {
  x: number
  y: number
  t: number
}

function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>()
  const hueRef = useRef(0)
  const pathPts = useRef<PathPoint[]>([])

  useEffect(() => {
    if (isTouchDevice()) return

    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const dot = dotRef.current!

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()

    let mouseX = 0, mouseY = 0
    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      hueRef.current = (hueRef.current + 2) % 360
      dot.style.opacity = '1'
      pathPts.current.push({ x: e.clientX, y: e.clientY, t: performance.now() })
    }

    const animate = () => {
      dot.style.transform = `translate(${mouseX - 8}px, ${mouseY - 8}px)`
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const now = performance.now()
      const pts = pathPts.current

      let startIdx = 0
      while (startIdx < pts.length - 1 && now - pts[startIdx].t > TRAIL_MS) {
        startIdx++
      }

      const endIdx = pts.length - 1
      const visibleLen = endIdx - startIdx

      if (visibleLen > 0) {
        const tStart = pts[startIdx].t
        const tSpan = Math.max(pts[endIdx].t - tStart, 1)

        for (let i = startIdx; i < endIdx; i++) {
          const progress = (pts[i].t - tStart) / tSpan
          const opacity = 0.08 + progress * 0.92
          const lineWidth = 0.6 + progress * 3.2
          const hue = (hueRef.current + (endIdx - i) * 5) % 360

          ctx.shadowBlur = 16
          ctx.shadowColor = `hsl(${hue}, 100%, 60%)`
          ctx.strokeStyle = `hsla(${hue}, 100%, 68%, ${opacity})`
          ctx.lineWidth = lineWidth
          ctx.lineCap = 'round'
          ctx.lineJoin = 'round'
          ctx.beginPath()
          ctx.moveTo(pts[i].x, pts[i].y)
          ctx.lineTo(pts[i + 1].x, pts[i + 1].y)
          ctx.stroke()
        }
        ctx.shadowBlur = 0
      }

      if (startIdx > 300) {
        pathPts.current.splice(0, startIdx)
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('resize', resize)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafRef.current!)
      pathPts.current = []
    }
  }, [])

  if (isTouchDevice()) return null

  return (
    <>
      <canvas ref={canvasRef} className="cursor-canvas" />
      <div ref={dotRef} className="cursor-dot" />
    </>
  )
}

export default CustomCursor
