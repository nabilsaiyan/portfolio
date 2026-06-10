import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Suspense, useRef, useState, useEffect } from 'react'
import { Environment, Grid } from '@react-three/drei'
import { useScroll, useSpring, useTransform } from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import { Group, Mesh } from 'three'

// ── Bar data ──────────────────────────────────────────────────────────────────

const BARS = [
  { x: -1.5, h: 1.4 }, { x: -1.0, h: 2.1 }, { x: -0.5, h: 1.7 },
  { x:  0.0, h: 2.6 }, { x:  0.5, h: 1.2 }, { x:  1.0, h: 2.3 }, { x:  1.5, h: 1.9 },
]

const BAR_COLOR = (i: number) => i % 2 === 0 ? '#00d4ff' : '#a448e5'

// ── Float group ───────────────────────────────────────────────────────────────

function FloatGroup({ children, baseX }: { children: React.ReactNode; baseX: number }) {
  const ref = useRef<Group>(null)
  const { gl } = useThree()
  const isDragging = useRef(false)
  const prevXY = useRef({ x: 0, y: 0 })
  const dragOffset = useRef({ y: 0, x: 0 })

  useEffect(() => {
    const canvas = gl.domElement
    canvas.style.cursor = 'grab'
    const onDown = (e: PointerEvent) => {
      isDragging.current = true
      dragOffset.current.y = (ref.current?.rotation.y ?? 0) - (-0.25)
      dragOffset.current.x = ref.current?.rotation.x ?? 0
      prevXY.current = { x: e.clientX, y: e.clientY }
      canvas.style.cursor = 'grabbing'
    }
    const onMove = (e: PointerEvent) => {
      if (!isDragging.current) return
      // negate x-drag to compensate for scale.x=-1 flip
      dragOffset.current.y -= (e.clientX - prevXY.current.x) * 0.007
      dragOffset.current.x += (e.clientY - prevXY.current.y) * 0.005
      prevXY.current = { x: e.clientX, y: e.clientY }
    }
    const onUp = () => {
      isDragging.current = false
      canvas.style.cursor = 'grab'
    }
    canvas.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => {
      canvas.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      canvas.style.cursor = ''
    }
  }, [gl])

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.elapsedTime
    if (!isDragging.current) {
      dragOffset.current.y *= 0.95
      dragOffset.current.x *= 0.95
    }
    ref.current.position.y = -0.8 + Math.sin(t * 0.55) * 0.2
    ref.current.position.x = baseX + Math.sin(t * 0.28) * 0.1
    ref.current.rotation.z = Math.sin(t * 0.38) * 0.025
    ref.current.rotation.y = -0.25 + Math.sin(t * 0.18) * 0.08 + dragOffset.current.y
    ref.current.rotation.x = dragOffset.current.x
  })

  return <group ref={ref} scale={[-1, 1, 1]}>{children}</group>
}

// ── Individual Bar ────────────────────────────────────────────────────────────

interface BarProps {
  scrollY: MotionValue<number>
  delay: number
  h: number
  color: string
  x: number
}

function Bar({ scrollY, delay, h, color, x }: BarProps) {
  const meshRef = useRef<Mesh>(null)

  const rawScale = useTransform(scrollY, [delay, delay + 0.35], [0, 1])
  const springScale = useSpring(rawScale, { stiffness: 80, damping: 16 })

  useFrame(() => {
    if (!meshRef.current) return
    const s = Math.max(0.0001, springScale.get())
    meshRef.current.scale.y = s
    meshRef.current.position.y = (h * s) / 2
  })

  return (
    <mesh ref={meshRef} position={[x, h / 2, 0]} castShadow>
      <boxGeometry args={[0.38, h, 0.38]} />
      <meshPhysicalMaterial
        color="#0a1825"
        metalness={0.9}
        roughness={0.05}
        iridescence={1.0}
        iridescenceIOR={1.85}
        clearcoat={1.0}
        clearcoatRoughness={0.04}
        emissive={color}
        emissiveIntensity={0.1}
      />
    </mesh>
  )
}

// ── Scene ─────────────────────────────────────────────────────────────────────

interface SceneProps {
  scrollYProgress: MotionValue<number>
  baseX: number
}

function Scene({ scrollYProgress, baseX }: SceneProps) {
  return (
    <FloatGroup baseX={baseX}>
      {/* Grid floor */}
      <Grid
        position={[0, 0, 0]}
        args={[12, 12]}
        cellSize={0.4}
        cellThickness={0.4}
        cellColor="#00d4ff"
        sectionSize={2}
        sectionThickness={0.8}
        sectionColor="#a448e5"
        fadeDistance={7}
        fadeStrength={1.8}
        followCamera={false}
        infiniteGrid={false}
      />

      {/* Bars */}
      {BARS.map((bar, i) => (
        <Bar
          key={i}
          scrollY={scrollYProgress}
          delay={0.05 + i * 0.06}
          h={bar.h}
          color={BAR_COLOR(i)}
          x={bar.x}
        />
      ))}
    </FloatGroup>
  )
}

// ── Canvas wrapper ─────────────────────────────────────────────────────────────

function NexaBarV1cCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [baseX, setBaseX] = useState(() => window.innerWidth >= 1280 ? 1.8 : 0)

  useEffect(() => {
    const onResize = () => setBaseX(window.innerWidth >= 1280 ? 1.8 : 0)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [2, 3.5, 8], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        shadows
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} color="#c0d8ff" />
          <directionalLight
            position={[-3, 5, 6]}
            intensity={3.0}
            color="#ffffff"
            castShadow
          />
          <directionalLight position={[4, 2, -3]} intensity={2.5} color="#ffe0ff" />
          <directionalLight position={[0, -2, 8]} intensity={1.5} color="#c0ffee" />
          <pointLight position={[0, 5, 3]} intensity={5} color="#a0c0ff" distance={16} />
          <Environment preset="sunset" />
          <Scene scrollYProgress={scrollYProgress} baseX={baseX} />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default NexaBarV1cCanvas
