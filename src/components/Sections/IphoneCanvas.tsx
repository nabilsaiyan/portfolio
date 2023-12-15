import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import '../../styles/components/IphoneCanvas.scss'
import { useRef } from 'react'
import * as THREE from 'three'

function IphoneModel() {
  const ref = useRef<THREE.Group>()
  const gltf2 = useLoader(GLTFLoader, './models/iphone2/scene.gltf')

  const directionalLight = new THREE.DirectionalLight(0xffffff, Math.PI * 3)
  directionalLight.position.set(0, 1, 0)
  directionalLight.castShadow = true

  const pointLight1 = new THREE.PointLight(0xffffff, Math.PI * 3)
  pointLight1.position.set(1, -1, 1)

  const pointLight2 = new THREE.PointLight(0xffffff, Math.PI * 3)
  pointLight2.position.set(-1, -1, -1)

  gltf2.scene.add(directionalLight)
  gltf2.scene.add(pointLight1)
  gltf2.scene.add(pointLight2)

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.003
    }
  })

  useFrame(({ mouse }) => {
    if (ref.current) {
      const { x, y } = mouse
      ref.current.rotation.y = (x * Math.PI) / -3
    }
  })

  return (
    <primitive
      object={gltf2.scene.clone()}
      position={[0.5, -2.3, 0]}
      scale={4}
      rotation={[0, 0.4, -0.05]}
      receiveShadow
      ref={ref}
    />
  )
}

function IphoneCanvas() {
  return (
    <div className="canvas-container">
      <Canvas className="canvas" camera={{ position: [0, 0, -2], fov: 60 }}>
        <IphoneModel />
      </Canvas>
    </div>
  )
}

export { IphoneCanvas }
