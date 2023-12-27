import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Environment } from '@react-three/drei'
import Setup from '../Avatars/Setup'

function AvatarCanvas() {
  return (
    <Canvas shadows camera={{ position: [-2, 3.5, -17], fov: 60 }}>
      <ambientLight />
      <Environment preset="sunset" />
      <Suspense fallback={null}>
        <Setup position={[-4, 1.7, 0]} rotation={[-0.4, -1, 0]} scale={0.8} />
      </Suspense>
    </Canvas>
  )
}

export { AvatarCanvas }
