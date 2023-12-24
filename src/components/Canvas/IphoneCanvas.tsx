import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import '../../styles/components/IphoneCanvas.scss'
import { useCallback, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from '@react-three/drei'

function IphoneModel() {
  const ref = useRef<THREE.Group>()
  const gltf2 = useLoader(GLTFLoader, './models/phone1/scene.gltf')

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

  return (
    <primitive
      object={gltf2.scene.clone()}
      position={[2, -6.5, 0]}
      scale={10}
      rotation={[0, 0.5, 0]}
      receiveShadow
      ref={ref}
    />
  )
}

function IphoneCanvas() {
  return (
    <div className="canvas-container">
      <Canvas className="canvas" camera={{ position: [0, 0, -3], fov: 60 }}>
        <IphoneModel />
      </Canvas>
    </div>
  )
}

export { IphoneCanvas }
