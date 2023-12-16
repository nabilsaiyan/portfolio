import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'
import { useRef } from 'react'
import '../../styles/components/AbstractShapeCanvas.scss'

function RotatingModel() {
  const modelRef = useRef<THREE.Group>()
  const gltf = useLoader(GLTFLoader, './models/abstractshape1/scene.gltf')

  const directionalLightOne = new THREE.DirectionalLight(0x13efff, 5)
  directionalLightOne.position.set(-10, 10, -10)
  const directionalLightTwo = new THREE.DirectionalLight(0x4872ef, 5)
  directionalLightTwo.position.set(10, 5, 10)

  gltf.scene.add(directionalLightOne)
  gltf.scene.add(directionalLightTwo)

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.003
    }
  })

  return (
    <primitive
      object={gltf.scene}
      position={[2, 0, 0]}
      scale={2}
      ref={modelRef}
    />
  )
}

function AbstractShapeCanvas() {
  return (
    <div className="canvas-container">
      <Canvas className="canvas">
        <RotatingModel />
      </Canvas>
    </div>
  )
}

export default AbstractShapeCanvas
