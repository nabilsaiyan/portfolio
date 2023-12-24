import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Environment } from '@react-three/drei'
import Setup from '../Avatars/Setup'

function AvatarCanvas() {
  return (
    <Canvas shadows camera={{ position: [-2, 2, -17], fov: 60 }}>
      <ambientLight />
      <Environment preset="sunset" />
      <Suspense fallback={null}>
        <Setup position={[-3, 0, 0]} rotation={[-0.5, -1, 0]} />
      </Suspense>
    </Canvas>
  )
}

export { AvatarCanvas }
