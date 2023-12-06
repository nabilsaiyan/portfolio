import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'
import { useRef } from 'react'
import '../../styles/components/AbstractShapeCanvas.scss'

const directionalLightOne = new THREE.DirectionalLight(0x13efff, 5)
directionalLightOne.position.set(-10, 10, -10)
const directionalLightTwo = new THREE.DirectionalLight(0x4872ef, 5)
directionalLightTwo.position.set(10, 5, 10)

function RotatingModel() {
  const modelRef = useRef<THREE.Group>()
  const { size } = useThree() // Access canvas size

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.003
    }
  })

  const gltf = useLoader(GLTFLoader, './models/abstractshape1/scene.gltf')
  // Adjust model position
  if (gltf.scene) {
    gltf.scene.position.x = size.width / 800
    gltf.scene.position.z = 2.3
  }
  // Add lights to the gltf scene
  gltf.scene.add(directionalLightOne)
  gltf.scene.add(directionalLightTwo)

  return <primitive object={gltf.scene} ref={modelRef} />
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
