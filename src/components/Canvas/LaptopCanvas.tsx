import { Canvas, useThree } from '@react-three/fiber'
import '../../styles/components/LaptopCanvas.scss'
import { useEffect, useRef, useState } from 'react'
import { Environment, OrbitControls, useGLTF, useTexture } from '@react-three/drei'
import { useScroll, useSpring, useTransform } from 'framer-motion'
import { motion } from 'framer-motion-3d'
import { Vector3, Mesh, MeshStandardMaterial, SRGBColorSpace, Color, LinearFilter, LinearMipmapLinearFilter } from 'three'

function MacbookScreen() {
  const { scene } = useGLTF('./models/macbook/scene.gltf')
  const screenshot = useTexture('./images/series-finder.jpg')
  const { gl } = useThree()

  useEffect(() => {
    screenshot.colorSpace = SRGBColorSpace
    screenshot.flipY = true
    screenshot.generateMipmaps = true
    screenshot.minFilter = LinearMipmapLinearFilter
    screenshot.magFilter = LinearFilter
    screenshot.anisotropy = gl.capabilities.getMaxAnisotropy()
    screenshot.needsUpdate = true

    scene.traverse((child) => {
      if (child instanceof Mesh) {
        const mat = child.material as MeshStandardMaterial
        if (mat?.name === 'VNZklasZKSWjWUk') {
          mat.emissiveMap = screenshot
          mat.emissive = new Color(1, 1, 1)
          mat.emissiveIntensity = 2
          mat.needsUpdate = true
        }
      }
    })
  }, [scene, screenshot, gl])

  return null
}

function LaptopCanvas() {
  const sceneRef = useRef(null)
  const { scene: gltfScene } = useGLTF('./models/macbook/scene.gltf')

  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ['start end', 'end start'],
  })

  const rotateYSmooth = useSpring(scrollYProgress)
  const rotateY = useTransform(rotateYSmooth, [0, 1], [-1, 0])
  const rotateX = useTransform(rotateYSmooth, [0, 1], [0.3, 0.7])
  const scale = useTransform(rotateYSmooth, [0, 1], [6, 15])

  const [laptopPosition, setLaptopPosition] = useState<Vector3>(() => {
    const w = window.innerWidth
    if (w < 450) return new Vector3(0, -1.2, -3)
    if (w < 768) return new Vector3(0, -1.2, -2)
    if (w < 1280) return new Vector3(0, -0.9, -1.2)
    return new Vector3(2, -1.2, -2)
  })

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth
      if (w < 450) setLaptopPosition(new Vector3(0, -1.2, -3))
      else if (w < 768) setLaptopPosition(new Vector3(0, -1.2, -2))
      else if (w < 1280) setLaptopPosition(new Vector3(0, -0.9, -1.2))
      else setLaptopPosition(new Vector3(2, -1.2, -2))
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Canvas
      className="canvas"
      shadows
      ref={ref}
      camera={{ rotation: [0, -0.5, 0], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
    >
      <Environment preset="sunset" />
      <MacbookScreen />
      <motion.primitive
        object={gltfScene}
        position={laptopPosition}
        scale={scale}
        rotation-x={rotateX}
        receiveShadow
        ref={sceneRef}
        rotation-y={rotateY}
      />
      <OrbitControls enableZoom={false} position={[2, 0.5, 0]} enabled={false} />
    </Canvas>
  )
}

export default LaptopCanvas

useGLTF.preload('./models/macbook/scene.gltf')
