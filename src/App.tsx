import Navbar from './components/Navbar/Navbar'
import ExperienceSection from './components/Sections/ExperienceSection'
import IntroSection from './components/Sections/IntroSection'
import ProjectsSection from './components/Sections/ProjectsSection'
import './styles/styles.scss'

function App() {
  return (
    <div className="main-container">
      <Navbar />
      <IntroSection />
      <ProjectsSection />
      <ExperienceSection />
    </div>
  )
}

export default App
