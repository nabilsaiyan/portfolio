import { useState, lazy, Suspense } from 'react'
import LoadingScreen from './components/Animations/LoadingScreen'
import Navbar from './components/Navbar/Navbar'
import IntroSection from './components/Sections/IntroSection'
import './styles/styles.scss'
import CustomCursor from './components/Common/CustomCursor'
import { LanguageProvider } from './context/LanguageContext'

const ExperienceSection = lazy(() => import('./components/Sections/ExperienceSection'))
const ProjectsSection = lazy(() => import('./components/Sections/ProjectsSection'))
const DetailsSection = lazy(() => import('./components/Sections/DetailsSection'))

function App() {
  const [started, onStarted] = useState<boolean>(false)
  const [loadingDisapear, setLoadingDisapear] = useState<boolean>(false)

  return (
    <LanguageProvider>
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
            <Suspense fallback={null}>
              <ExperienceSection />
              <ProjectsSection />
              <DetailsSection />
            </Suspense>
            <CustomCursor />
          </>
        )}
      </div>
    </LanguageProvider>
  )
}

export default App
