import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Environment } from '@react-three/drei'
import Setup from '../Avatars/Setup'

function AvatarCanvas() {
  return (
    <Canvas shadows camera={{ position: [-3, 3.8, -17], fov: 60 }}>
      <ambientLight />
      <Environment preset="sunset" />
      <Suspense fallback={null}>
        <Setup position={[-5, 2, 0]} rotation={[-0.4, -1, 0]} scale={0.7} />
      </Suspense>
    </Canvas>
  )
}

export { AvatarCanvas }
