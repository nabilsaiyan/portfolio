import { Suspense } from 'react'
import Avatar from './components/Avatars/Avatar'
import Navbar from './components/Navbar/Navbar'
import ExperienceSection from './components/Sections/ExperienceSection'
import IntroSection from './components/Sections/IntroSection'
import ProjectsSection from './components/Sections/ProjectsSection'
import './styles/styles.scss'
import { Canvas } from '@react-three/fiber'
import { AvatarCanvas } from './components/Canvas/AvatarCanvas'

function App() {
  return (
    <div className="main-container">
      <Navbar />
      <IntroSection />
      <ExperienceSection />
      <ProjectsSection />
    </div>
  )
}

export default App
