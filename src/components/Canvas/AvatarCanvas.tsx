import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useEffect, useState, useRef } from 'react'
import { Environment } from '@react-three/drei'
import Setup from '../Avatars/Setup'
import { Vector3, Group } from 'three'
import { useScroll } from 'framer-motion'

function ScrollRotation({ children }: { children: React.ReactNode }) {
  const ref = useRef<Group>(null)
  const { scrollYProgress } = useScroll()
  useFrame(() => {
    if (ref.current) ref.current.rotation.y = scrollYProgress.get() * 1.8
  })
  return <group ref={ref}>{children}</group>
}

function AvatarCanvas() {
  const [cameraPosition, setCameraPosition] = useState<Vector3>(
    new Vector3(-3, 3.8, -17),
  )
  const [setupPosition, setSetupPosition] = useState<Vector3>(
    new Vector3(-5, 2, 0),
  )

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
        <ScrollRotation>
          <Setup position={setupPosition} rotation={[-0.4, -1, 0]} scale={0.7} />
        </ScrollRotation>
      </Suspense>
    </Canvas>
  )
}

export { AvatarCanvas }
