import { Canvas, useFrame } from '@react-three/fiber'
import '../../styles/components/PhonesCanvas.scss'
import { useEffect, useRef, useState } from 'react'
import { Environment, useGLTF } from '@react-three/drei'
import { useScroll, useSpring, useTransform } from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import { motion } from 'framer-motion-3d'
import { Vector3, Group } from 'three'

function ScaleIn({ children, scrollYProgress }: { children: React.ReactNode; scrollYProgress: MotionValue<number> }) {
  const ref = useRef<Group>(null)
  const rawScale = useTransform(scrollYProgress, [0, 0.35], [0, 1])
  const springScale = useSpring(rawScale, { stiffness: 120, damping: 20 })
  useFrame(() => {
    if (!ref.current) return
    const s = springScale.get()
    ref.current.scale.set(s, s, s)
  })
  return <group ref={ref}>{children}</group>
}

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

function PhonesCanvas() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const firstRef = useRef(null)
  const { scene: scene1 } = useGLTF('./models/phone2/scene.gltf')

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start end', 'end start'],
  })

  const rotateYSmooth = useSpring(scrollYProgress)
  const firstRotateY = useTransform(rotateYSmooth, [0, 1], [4.5, 6.6])
  const firstRotateX = useTransform(rotateYSmooth, [0, 1], [0.1, 0.4])
  const firstScale = useTransform(rotateYSmooth, [0, 1], [0.04, 0.11])

  const [firstPhonePosition, setFirstPhonePosition] = useState<Vector3>(new Vector3(0.8, -0.4, 0))

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth
      setFirstPhonePosition(w >= 1280 ? new Vector3(0.8, -0.4, 0) : new Vector3(0, -0.4, 0))
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div ref={wrapRef} style={{ width: '100%', height: '100%' }}>
      <Canvas
        className="canvas"
        shadows
        camera={{ position: [0, 0, 2], rotation: [0, 0, 0], fov: 60 }}
      >
        <ambientLight intensity={3} />
        <Environment preset="sunset" />
        <ScaleIn scrollYProgress={scrollYProgress}>
          <FloatWrapper>
            <motion.primitive
              ref={firstRef}
              object={scene1}
              position={firstPhonePosition}
              scale={firstScale}
              receiveShadow
              rotation-x={firstRotateX}
              rotation-y={firstRotateY}
            />
          </FloatWrapper>
        </ScaleIn>
      </Canvas>
    </div>
  )
}

export default PhonesCanvas

useGLTF.preload('./models/phone1/scene.gltf')
useGLTF.preload('./models/phone2/scene.gltf')
