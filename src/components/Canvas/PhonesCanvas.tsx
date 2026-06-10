import { Canvas, useFrame } from '@react-three/fiber'
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
