import { Canvas, useFrame, useThree } from '@react-three/fiber'
import '../../styles/components/PhonesCanvas.scss'
import { useEffect, useRef, useState } from 'react'
import { Environment, OrbitControls, useGLTF } from '@react-three/drei'
import { useScroll, useSpring, useTransform } from 'framer-motion'
import { motion } from 'framer-motion-3d'
import { Vector3, Group } from 'three'

function FloatWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef<Group>(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.elapsedTime
    ref.current.position.y = Math.sin(t * 0.55) * 0.15
    ref.current.position.x = Math.sin(t * 0.28) * 0.06
    ref.current.rotation.z = Math.sin(t * 0.38) * 0.04
  })
  return <group ref={ref}>{children}</group>
}

function DragWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef<Group>(null)
  const { gl } = useThree()
  const isDragging = useRef(false)
  const prevXY = useRef({ x: 0, y: 0 })
  const dragOffset = useRef({ y: 0, x: 0 })

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!isDragging.current) return
      dragOffset.current.y += (e.clientX - prevXY.current.x) * 0.007
      dragOffset.current.x += (e.clientY - prevXY.current.y) * 0.005
      prevXY.current = { x: e.clientX, y: e.clientY }
    }
    const onUp = () => {
      isDragging.current = false
      gl.domElement.style.cursor = ''
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [gl])

  useFrame(() => {
    if (!ref.current) return
    if (!isDragging.current) {
      dragOffset.current.y *= 0.95
      dragOffset.current.x *= 0.95
    }
    ref.current.rotation.y = dragOffset.current.y
    ref.current.rotation.x = dragOffset.current.x
  })

  const onPointerDown = (e: { clientX: number; clientY: number; stopPropagation: () => void }) => {
    isDragging.current = true
    dragOffset.current.y = ref.current?.rotation.y ?? 0
    dragOffset.current.x = ref.current?.rotation.x ?? 0
    prevXY.current = { x: e.clientX, y: e.clientY }
    gl.domElement.style.cursor = 'grabbing'
    e.stopPropagation()
  }

  return (
    <group ref={ref}>
      <mesh
        onPointerDown={onPointerDown}
        onPointerEnter={() => { gl.domElement.style.cursor = 'grab' }}
        onPointerLeave={() => { if (!isDragging.current) gl.domElement.style.cursor = '' }}
      >
        <sphereGeometry args={[1.5, 8, 8]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      {children}
    </group>
  )
}

function PhonesCanvas() {
  const firstRef = useRef(null)
  const { scene: scene1 } = useGLTF('./models/phone2/scene.gltf')
  const { scene: scene2 } = useGLTF('./models/phone1/scene.gltf')

  const ref = useRef<HTMLCanvasElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const rotateYSmooth = useSpring(scrollYProgress)

  const firstRotateY = useTransform(rotateYSmooth, [0, 1], [4.5, 6.6])
  const firstRotateX = useTransform(rotateYSmooth, [0, 1], [0.1, 0.4])

  const firstScale = useTransform(rotateYSmooth, [0, 1], [0.04, 0.11])

  const [firstPhonePosition, setFirstPhonePosition] = useState<Vector3>(
    new Vector3(0.8, -0.4, 0),
  )
  const [secondPhonePosition, setSecondPhonePosition] = useState<Vector3>(
    new Vector3(1.2, -0.4, 0),
  )

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth
      if (screenWidth < 1280 && screenWidth > 768) {
        setFirstPhonePosition(new Vector3(0, -0.4, 0))
        setSecondPhonePosition(new Vector3(0.4, -0.4, 0))
      } else if (screenWidth < 768 && screenWidth > 450) {
        setFirstPhonePosition(new Vector3(0, -0.4, 0))
        setSecondPhonePosition(new Vector3(0.4, -0.4, 0))
      } else if (screenWidth < 450) {
        setFirstPhonePosition(new Vector3(0, -0.4, 0))
        setSecondPhonePosition(new Vector3(0.4, -0.4, 0))
      } else {
        setFirstPhonePosition(new Vector3(0.8, -0.4, 0))
        setSecondPhonePosition(new Vector3(1.2, -0.4, 0))
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <Canvas
      className="canvas"
      shadows
      ref={ref}
      camera={{
        position: [0, 0, 2],
        rotation: [0, 0, 0],
        fov: 60,
      }}
    >
      <ambientLight intensity={3} />
      <Environment preset="sunset" />
      <FloatWrapper>
        <DragWrapper>
          <motion.primitive
            ref={firstRef}
            y
            object={scene1}
            position={firstPhonePosition}
            scale={firstScale}
            receiveShadow
            rotation-x={firstRotateX}
            rotation-y={firstRotateY}
          />
        </DragWrapper>
      </FloatWrapper>
      {/* <motion.primitive
        object={scene2}
        position={secondPhonePosition}
        scale={8}
        receiveShadow
        rotation-y={firstRotateY}
        rotation-x={firstRotateX}
      /> */}
    </Canvas>
  )
}

export default PhonesCanvas

useGLTF.preload('./models/phone1/scene.gltf')
useGLTF.preload('./models/phone2/scene.gltf')
