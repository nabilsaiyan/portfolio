import { Canvas, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import '../../styles/components/LaptopCanvas.scss'
import { useEffect, useRef, useState } from 'react'
import { Environment, OrbitControls } from '@react-three/drei'
import { useScroll, useSpring, useTransform } from 'framer-motion'
import { motion } from 'framer-motion-3d'
import { Vector3 } from 'three'

function LaptopCanvas() {
  const sceneRef = useRef(null)
  const gltf = useLoader(GLTFLoader, './models/macbook/scene.gltf')

  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ['start end', 'end start'],
  })

  const rotateYSmooth = useSpring(scrollYProgress)

  const rotateY = useTransform(rotateYSmooth, [0, 1], [-1, 0])
  const rotateX = useTransform(rotateYSmooth, [0, 1], [0.3, 0.7])

  const scale = useTransform(rotateYSmooth, [0, 1], [6, 15])

  const [laptopPosition, setLaptopPosition] = useState<Vector3>(
    new Vector3(2, -1.2, -2),
  )

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth
      if (screenWidth < 1280 && screenWidth > 768) {
        setLaptopPosition(new Vector3(0, -0.9, -1.2))
      } else if (screenWidth < 768 && screenWidth > 450) {
        setLaptopPosition(new Vector3(0, -1.2, -2))
      } else if (screenWidth < 450) {
        setLaptopPosition(new Vector3(0, -1.2, -3))
      } else {
        setLaptopPosition(new Vector3(2, -1.2, -2))
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
      camera={{ rotation: [0, -0.5, 0], fov: 50 }}
    >
      <Environment preset="sunset" />
      <motion.primitive
        object={gltf.scene}
        position={laptopPosition}
        scale={scale}
        rotation-x={rotateX}
        receiveShadow
        ref={sceneRef}
        rotation-y={rotateY}
      />
      <OrbitControls enableZoom={false} position={[2, 0.5, 0]} />
    </Canvas>
  )
}

export default LaptopCanvas
