import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import '../../styles/components/IphoneCanvas.scss'
import { OrbitControls, useGLTF } from '@react-three/drei'

function IphoneCanvas() {
  const gltf2 = useLoader(GLTFLoader, './models/iphone2/scene.gltf')

  return (
    <div className="canvas-container">
      <Canvas className="canvas" camera={{ position: [0, 0, -2], fov: 60 }}>
        <OrbitControls enableZoom={false} />
        {/* Main directional light */}
        <directionalLight
          intensity={Math.PI * 3}
          color="white"
          position={[0, 1, 0]} // Adjust position to highlight top corners
          castShadow
        />
        {/* Secondary lights */}
        <pointLight
          intensity={Math.PI * 3}
          color="white"
          position={[1, -1, 1]} // Adjusted position
        />
        <pointLight
          intensity={Math.PI * 3}
          color="white"
          position={[-1, -1, -1]} // Adjusted position
        />
        <primitive
          object={gltf2.scene.clone()}
          position={[0.5, -2.3, 0]}
          scale={4}
          rotation={[0, 0.4, -0.05]}
        />
        <primitive
          object={gltf2.scene.clone()}
          position={[0.45, -2.5, -0.2]}
          scale={4}
          children-0-castShadow
          rotation={[0, 0.4, 0.03]}
        />
        {/* <axesHelper /> */}
      </Canvas>
    </div>
  )
}

export { IphoneCanvas }
