import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Suspense, useEffect, useState, useRef } from 'react'
import { Environment } from '@react-three/drei'
import Setup from '../Avatars/Setup'
import { Vector3, Group } from 'three'
import { useScroll, useSpring } from 'framer-motion'

function ScrollRotation({ children, ready }: { children: React.ReactNode; ready: boolean }) {
  const ref = useRef<Group>(null)
  const { scrollYProgress } = useScroll()
  const appearScale = useSpring(0, { stiffness: 60, damping: 18 })
  const { gl } = useThree()

  useEffect(() => {
    if (ready) appearScale.set(1)
  }, [ready, appearScale])

  const isDragging = useRef(false)
  const prevXY = useRef({ x: 0, y: 0 })
  const dragOffset = useRef({ y: 0, x: 0 })

  useEffect(() => {
    const canvas = gl.domElement
    canvas.style.cursor = 'grab'
    const onDown = (e: PointerEvent) => {
      isDragging.current = true
      dragOffset.current.y = (ref.current?.rotation.y ?? 0) - scrollYProgress.get() * 1.8
      dragOffset.current.x = ref.current?.rotation.x ?? 0
      prevXY.current = { x: e.clientX, y: e.clientY }
      canvas.style.cursor = 'grabbing'
    }
    const onMove = (e: PointerEvent) => {
      if (!isDragging.current) return
      dragOffset.current.y += (e.clientX - prevXY.current.x) * 0.007
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
  }, [gl, scrollYProgress])

  useFrame(({ clock }) => {
    if (!ref.current) return
    const scroll = scrollYProgress.get()
    const t = clock.elapsedTime
    if (!isDragging.current) {
      dragOffset.current.y *= 0.95
      dragOffset.current.x *= 0.95
    }
    ref.current.rotation.y = scroll * 1.8 + dragOffset.current.y
    ref.current.rotation.x = dragOffset.current.x
    const s = appearScale.get() * (1 + scroll * 0.5)
    ref.current.scale.set(s, s, s)
    ref.current.position.y = -scroll * 2 + Math.sin(t * 0.55) * 0.28
    ref.current.position.x = Math.sin(t * 0.28) * 0.15
    ref.current.rotation.z = Math.sin(t * 0.38) * 0.025
  })
  return <group ref={ref}>{children}</group>
}

function AvatarCanvas({ ready = false }: { ready?: boolean }) {
  const [cameraPosition, setCameraPosition] = useState<Vector3>(() => {
    const w = window.innerWidth
    if (w < 450) return new Vector3(2, 3.8, -17)
    if (w < 1000) return new Vector3(0, 3.8, -17)
    return new Vector3(-3, 3.8, -17)
  })
  const [setupPosition, setSetupPosition] = useState<Vector3>(() => {
    const w = window.innerWidth
    if (w < 450) return new Vector3(0, 2, 0)
    if (w < 1000) return new Vector3(-2, 2, 0)
    return new Vector3(-5, 2, 0)
  })

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth
      if (screenWidth < 1000) {
        if (screenWidth < 450) {
          setCameraPosition(new Vector3(2, 3.8, -17))
          setSetupPosition(new Vector3(0, 2, 0))
        } else {
          setCameraPosition(new Vector3(0, 3.8, -17))
          setSetupPosition(new Vector3(-2, 2, 0))
        }
      } else {
        setCameraPosition(new Vector3(-3, 3.8, -17))
        setSetupPosition(new Vector3(-5, 2, 0))
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <Canvas shadows camera={{ position: cameraPosition, fov: 60 }}>
      <ambientLight />
      <Environment preset="sunset" />
      <Suspense fallback={null}>
        <ScrollRotation ready={ready}>
          <Setup position={setupPosition} rotation={[-0.4, -1, 0]} scale={0.7} />
        </ScrollRotation>
      </Suspense>
    </Canvas>
  )
}

export { AvatarCanvas }
