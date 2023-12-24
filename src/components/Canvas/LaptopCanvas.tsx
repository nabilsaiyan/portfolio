import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import '../../styles/components/LaptopCanvas.scss'
import { useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from '@react-three/drei'

function LaptopModel() {
  const ref = useRef<THREE.Group>()
  const gltf2 = useLoader(GLTFLoader, './models/phone1/scene.gltf')

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5)
  directionalLight.position.set(-5, 5, 5)
  directionalLight.castShadow = true

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)

  gltf2.scene.add(ambientLight)
  gltf2.scene.add(directionalLight)

  return (
    <primitive
      object={gltf2.scene.clone()}
      position={[-8, -4, -12]}
      scale={2.5}
      rotation={[0, -1, 0]}
      receiveShadow
      ref={ref}
    />
  )
}

function LaptopCanvas() {
  return (
    <div className="canvas-container">
      <Canvas className="canvas" camera={{ position: [15, 7, 0], fov: 60 }}>
        <LaptopModel />
        <OrbitControls enableZoom={false} position={[15, 7, 0]} />
        {/* <Intro /> */}
      </Canvas>
    </div>
  )
}

function Intro() {
  const [vec] = useState(() => new THREE.Vector3())
  return useFrame((state) => {
    state.camera.position.lerp(
      vec.set(state.mouse.x * 5, 3 + state.mouse.y * 2, 14),
      0.05,
    )
    state.camera.lookAt(0, 0, 0)
  })
}
export { LaptopCanvas }
