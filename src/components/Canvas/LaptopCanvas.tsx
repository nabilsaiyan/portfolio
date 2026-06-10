import { Canvas, useFrame, useThree } from '@react-three/fiber'
import '../../styles/components/LaptopCanvas.scss'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Environment, OrbitControls, useGLTF } from '@react-three/drei'
import { useScroll, useSpring, useTransform } from 'framer-motion'
import { motion } from 'framer-motion-3d'
import { Vector3, Mesh, MeshStandardMaterial, SRGBColorSpace, Color, LinearFilter, LinearMipmapLinearFilter, TextureLoader, Group } from 'three'

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
        <sphereGeometry args={[10, 8, 8]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      {children}
    </group>
  )
}

function MacbookScreen({ imageUrl, scene }: { imageUrl: string; scene: Group }) {
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

function LaptopCanvas({ imageUrl = '/images/series-finder.jpg' }: { imageUrl?: string }) {
  const sceneRef = useRef(null)
  const { scene: gltfScene } = useGLTF('./models/macbook/scene.gltf')

  const clonedScene = useMemo(() => gltfScene.clone(true), [gltfScene])

  const ref = useRef<HTMLCanvasElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
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
      <MacbookScreen imageUrl={imageUrl} scene={clonedScene} />
      <FloatWrapper>
        <DragWrapper>
        <motion.primitive
          object={clonedScene}
          position={laptopPosition}
          scale={scale}
          rotation-x={rotateX}
          receiveShadow
          ref={sceneRef}
          rotation-y={rotateY}
        />
        </DragWrapper>
      </FloatWrapper>
      <OrbitControls enableZoom={false} position={[2, 0.5, 0]} enabled={false} />
    </Canvas>
  )
}

export default LaptopCanvas

useGLTF.preload('./models/macbook/scene.gltf')
