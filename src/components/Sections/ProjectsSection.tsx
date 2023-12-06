import { Canvas, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import { OrbitControls } from '@react-three/drei'
import '../../styles/components/ProjectsSection.scss'
import { useEffect, useRef } from 'react'

function ProjectsSection() {
  const gltf = useLoader(GLTFLoader, './models/laptop2/scene.gltf')

  return (
    <section id="projects" className="projects-section">
      <Canvas shadows camera={{ position: [0.5, 0.3, 0.5] }}>
        {/* Directional Lights */}
        <directionalLight
          intensity={Math.PI * 2}
          color="white"
          position={[0, 0.4, 0.6]}
          castShadow
        />
        <spotLight intensity={Math.PI * 3} />
        <ambientLight intensity={Math.PI * 3} position={[0, 0.4, 0.6]} />
        <ambientLight intensity={Math.PI * 3} position={[0, -0.4, -0.6]} />
        {/* Your GLTF Model */}
        <primitive
          object={gltf.scene}
          position={[0.6, 0.05, 0.15]}
          children-0-castShadow
        />

        {/* Lights */}

        {/* Hemisphere Light */}
        <hemisphereLight intensity={5} args={['#b1e1ff', '#fff']} />
        <axesHelper />
        {/* Controls */}
        <OrbitControls enableZoom={false} target={[0.3, 0.05, 0.15]} />
      </Canvas>
    </section>
  )
}

export default ProjectsSection
