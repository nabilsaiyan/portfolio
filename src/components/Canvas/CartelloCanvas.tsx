import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { CanvasTexture, Group, SRGBColorSpace, Texture, TextureLoader, Vector3 } from 'three'
import { useScroll, useSpring, useTransform } from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import '../../styles/components/CartelloCanvas.scss'

const CARD_W = 3.2
const CARD_H = 2.02

// ── Fallback canvas texture ──────────────────────────────────────────────────

function buildFallbackTexture(): CanvasTexture {
  const W = 1024, H = 646
  const cv = document.createElement('canvas')
  cv.width = W; cv.height = H
  const ctx = cv.getContext('2d')!
  const bg = ctx.createLinearGradient(0, 0, W, H)
  bg.addColorStop(0, '#060d1c'); bg.addColorStop(0.5, '#090818'); bg.addColorStop(1, '#0c0618')
  ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H)
  ctx.globalAlpha = 0.022; ctx.strokeStyle = '#13efff'; ctx.lineWidth = 0.8
  for (let i = -H; i < W + H; i += 48) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i + H, H); ctx.stroke() }
  ctx.globalAlpha = 1
  ctx.font = 'bold 48px monospace'; ctx.fillStyle = 'rgba(255,255,255,0.96)'; ctx.fillText('CARTELLO', 58, 90)
  ctx.font = '15px monospace'; ctx.fillStyle = 'rgba(19,239,255,0.58)'; ctx.fillText('premium e-commerce', 60, 118)
  ctx.font = '29px monospace'; ctx.fillStyle = 'rgba(235,235,255,0.82)'; ctx.fillText('●●●●  ●●●●  ●●●●  4242', 58, 386)
  ctx.font = '11px monospace'; ctx.fillStyle = 'rgba(190,190,215,0.45)'; ctx.fillText('VALID THRU', 58, 444)
  ctx.font = '20px monospace'; ctx.fillStyle = 'rgba(215,215,240,0.72)'; ctx.fillText('12/27', 58, 470)
  ctx.font = '18px monospace'; ctx.fillStyle = 'rgba(190,190,215,0.60)'; ctx.fillText('NABIL AMHAOUCH', 58, 524)
  ctx.globalAlpha = 0.9
  ctx.fillStyle = '#13efff'; ctx.beginPath(); ctx.arc(904, 514, 30, 0, Math.PI * 2); ctx.fill()
  ctx.fillStyle = '#a448e5'; ctx.beginPath(); ctx.arc(942, 514, 30, 0, Math.PI * 2); ctx.fill()
  ctx.globalAlpha = 1
  return new CanvasTexture(cv)
}

// ── Imperative texture loader ────────────────────────────────────────────────

function useLoadedTexture(url?: string): Texture | null {
  const [tex, setTex] = useState<Texture | null>(null)
  useEffect(() => {
    if (!url) return
    let alive = true
    new TextureLoader().load(url,
      (t) => { if (!alive) return; t.colorSpace = SRGBColorSpace; setTex(t) },
      undefined,
      (err) => console.warn('[CartelloCanvas] texture error', err),
    )
    return () => { alive = false }
  }, [url])
  useEffect(() => () => { tex?.dispose() }, [tex])
  return tex
}

// ── Card mesh with drag-in-place rotation ────────────────────────────────────

interface CardMeshProps {
  frontUrl?:       string
  backUrl?:        string
  scrollYProgress: MotionValue<number>
  pos:             Vector3
  wrapRef:         React.RefObject<HTMLDivElement>
}

function CardMesh({ frontUrl, backUrl, scrollYProgress, pos, wrapRef }: CardMeshProps) {
  const groupRef   = useRef<Group>(null)
  const { pointer } = useThree()

  const cardScale       = useTransform(scrollYProgress, [0, 0.4], [0.1, 1.0])
  const cardScaleSpring = useSpring(cardScale, { stiffness: 120, damping: 20 })

  // Drag state — all refs, no re-renders
  const dragging   = useRef(false)
  const prevXY     = useRef({ x: 0, y: 0 })
  const dragOffset = useRef({ y: 0, x: 0 })

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return
      dragOffset.current.y += (e.clientX - prevXY.current.x) * 0.007
      dragOffset.current.x += (e.clientY - prevXY.current.y) * 0.005
      prevXY.current = { x: e.clientX, y: e.clientY }
    }
    const onUp = () => {
      dragging.current = false
      if (wrapRef.current) wrapRef.current.style.cursor = ''
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup',   onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup',   onUp)
    }
  }, [wrapRef])

  const frontTex  = useLoadedTexture(frontUrl)
  const backTex   = useLoadedTexture(backUrl)
  const canvasTex = useMemo(() => buildFallbackTexture(), [])
  useEffect(() => () => { canvasTex.dispose() }, [canvasTex])
  const activeFront = frontTex ?? canvasTex

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t      = clock.elapsedTime
    const scroll = scrollYProgress.get()

    const s = cardScaleSpring.get()
    groupRef.current.scale.set(s, s, s)

    // Float
    groupRef.current.position.y = Math.sin(t * 0.55) * 0.09

    // Idle targets
    const idleY = -0.50 + Math.sin(t * 0.22) * 0.20 - pointer.x * 0.18 - (scroll - 0.5) * 0.55
    const idleX =  Math.sin(t * 0.38) * 0.04 + pointer.y * 0.16 + (scroll - 0.5) * 0.20

    if (!dragging.current) {
      // Decay drag offset → idle gradually resumes
      dragOffset.current.y *= 0.95
      dragOffset.current.x *= 0.95
    }

    groupRef.current.rotation.y = idleY + dragOffset.current.y
    groupRef.current.rotation.x = idleX + dragOffset.current.x
    groupRef.current.rotation.z = Math.sin(t * 0.29) * 0.016
  })

  const onPointerDown = (e: { clientX: number; clientY: number; stopPropagation: () => void }) => {
    dragging.current = true
    // Seed drag offset from current rotation so there's no snap
    if (groupRef.current) {
      dragOffset.current.y = groupRef.current.rotation.y - (Math.sin(0) * 0.20)
      dragOffset.current.x = groupRef.current.rotation.x - (Math.sin(0) * 0.04)
    }
    prevXY.current = { x: e.clientX, y: e.clientY }
    if (wrapRef.current) wrapRef.current.style.cursor = 'grabbing'
    e.stopPropagation()
  }

  return (
    <group position={pos}>
      <group ref={groupRef}>
        <mesh position={[0, 0, 0.002]} onPointerDown={onPointerDown}>
          <planeGeometry args={[CARD_W, CARD_H]} />
          <meshStandardMaterial map={activeFront} roughness={0.78} metalness={0} envMapIntensity={0} transparent />
        </mesh>
        {backTex && (
          <mesh position={[0, 0, -0.002]} rotation-y={Math.PI} onPointerDown={onPointerDown}>
            <planeGeometry args={[CARD_W, CARD_H]} />
            <meshStandardMaterial map={backTex} roughness={0.78} metalness={0} envMapIntensity={0} transparent />
          </mesh>
        )}
      </group>
    </group>
  )
}

// ── Responsive position ──────────────────────────────────────────────────────

function getPos(w: number): Vector3 {
  // Camera is at X=0 looking forward; card at X=1.8 projects into the right portion of canvas
  return w >= 1280 ? new Vector3(1.8, -0.1, 0) : new Vector3(0, 0, 0)
}

// ── Canvas wrapper ───────────────────────────────────────────────────────────

interface Props { frontUrl?: string; backUrl?: string }

function CartelloCanvas({ frontUrl, backUrl }: Props = {}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState<Vector3>(() => getPos(window.innerWidth))

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  useEffect(() => {
    const onResize = () => setPos(getPos(window.innerWidth))
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <div ref={containerRef} className="cartello-canvas-wrap">
      <Canvas
        camera={{ position: [0, 0.2, 7], fov: 40 }}
        dpr={[1, 2]}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6}  color="#e8eeff" />
          <directionalLight position={[-3,  3, 6]} intensity={1.8} color="#d6e8ff" />
          <directionalLight position={[ 4, -1, 3]} intensity={0.8} color="#ffe0c0" />
          <CardMesh
            frontUrl={frontUrl}
            backUrl={backUrl}
            scrollYProgress={scrollYProgress}
            pos={pos}
            wrapRef={containerRef}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default CartelloCanvas
