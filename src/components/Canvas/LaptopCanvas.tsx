import { Canvas, useFrame, useThree } from '@react-three/fiber'
import '../../styles/components/LaptopCanvas.scss'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Environment, OrbitControls, useGLTF } from '@react-three/drei'
import { useScroll, useSpring, useTransform } from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import { motion } from 'framer-motion-3d'
import {
  Vector3,
  Mesh,
  MeshStandardMaterial,
  SRGBColorSpace,
  Color,
  LinearFilter,
  LinearMipmapLinearFilter,
  TextureLoader,
  Group,
} from 'three'

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
    ref.current.position.y = Math.sin(t * 0.55) * 0.25
    ref.current.position.x = Math.sin(t * 0.28) * 0.12
    ref.current.rotation.z = Math.sin(t * 0.38) * 0.03
  })
  return <group ref={ref}>{children}</group>
}

function MacbookScreen({
  imageUrl,
  scene,
}: {
  imageUrl: string
  scene: Group
}) {
  const { gl } = useThree()

  useEffect(() => {
    const loader = new TextureLoader()
    loader.load(imageUrl, (screenshot) => {
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
    })
  }, [scene, gl, imageUrl])

  return null
}

function LaptopCanvas({
  imageUrl = '/images/series-finder.jpg',
}: {
  imageUrl?: string
}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef(null)
  const { scene: gltfScene } = useGLTF('./models/macbook/scene.gltf')
  const clonedScene = useMemo(() => gltfScene.clone(true), [gltfScene])

  const { scrollYProgress } = useScroll({
    target: wrapRef,
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
  const [phoneScale, setPhoneScale] = useState(() =>
    window.innerWidth < 768 ? 1.3 : 1,
  )

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth
      if (w < 450) setLaptopPosition(new Vector3(0, -1.2, -3))
      else if (w < 768) setLaptopPosition(new Vector3(0, -1.2, -2))
      else if (w < 1280) setLaptopPosition(new Vector3(0, -0.9, -1.2))
      else setLaptopPosition(new Vector3(2, -1.2, -2))
      setPhoneScale(w < 768 ? 1.5 : 1)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div ref={wrapRef} style={{ width: '100%', height: '100%' }}>
      <Canvas
        className="canvas"
        shadows
        camera={{ rotation: [0, -0.5, 0], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <Environment preset="sunset" />
        <MacbookScreen imageUrl={imageUrl} scene={clonedScene} />
        <ScaleIn scrollYProgress={scrollYProgress}>
          <FloatWrapper>
            <group scale={phoneScale}>
              <motion.primitive
                object={clonedScene}
                position={laptopPosition}
                scale={scale}
                rotation-x={rotateX}
                receiveShadow
                ref={sceneRef}
                rotation-y={rotateY}
              />
            </group>
          </FloatWrapper>
        </ScaleIn>
        <OrbitControls
          enableZoom={false}
          position={[2, 0.5, 0]}
          enabled={false}
        />
      </Canvas>
    </div>
  )
}

export default LaptopCanvas

useGLTF.preload('./models/macbook/scene.gltf')
