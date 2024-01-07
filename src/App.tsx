import { useState } from 'react'
import LoadingScreen from './components/Animations/LoadingScreen'
import Navbar from './components/Navbar/Navbar'
import ExperienceSection from './components/Sections/ExperienceSection'
import IntroSection from './components/Sections/IntroSection'
import ProjectsSection from './components/Sections/ProjectsSection'
import './styles/styles.scss'
import DetailsSection from './components/Sections/DetailsSection'
import CustomCursor from './components/Common/CustomCursor'

function App() {
  const [started, onStarted] = useState<boolean>(false)
  const [loadingDisapear, setLoadingDisapear] = useState<boolean>(false)

  return (
    <div className="main-container">
      {!loadingDisapear && (
        <LoadingScreen
          setStarted={onStarted}
          setLoadingDisapear={setLoadingDisapear}
        />
      )}{' '}
      {started && (
        <>
          <Navbar />
          <IntroSection />
          <ExperienceSection />
          <ProjectsSection />
          <DetailsSection />
          <CustomCursor />
        </>
      )}
    </div>
  )
}

export default App
