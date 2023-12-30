import '../../styles/components/ProjectsSection.scss'
import Reveal from '../Animations/Reveal'
import { IphoneCanvas } from '../Canvas/IphoneCanvas'
import { LaptopCanvas } from '../Canvas/LaptopCanvas'

function ProjectsSection() {
  const goToGitHubProject = () => {
    window.open(
      'https://github.com/nabilsaiyan/series-finder-frontend',
      '_blank',
      'noopener noreferrer',
    )
  }

  return (
    <section id="projects" className="projects-section">
      <Reveal>
        <h1 className="title-section">Projects</h1>
      </Reveal>
      <div className="part-one">
        <div className="background-canvas">{/* <LaptopCanvas /> */}</div>

        <div className="text-iphone t1">
          <Reveal>
            <div className="divider">
              <hr />
              <p>01</p>
            </div>
          </Reveal>

          <Reveal>
            <h1>A web application for finding TV series.</h1>
          </Reveal>

          <ul>
            <Reveal>
              <li>Development of the frontend using React and Typescript.</li>
            </Reveal>
            <Reveal>
              <li>Leverages the TMDB API for series data.</li>
            </Reveal>
          </ul>
          <span className="view-button" onClick={goToGitHubProject}>
            <a>View Project</a>
            <span className="material-symbols-outlined">north_east</span>
          </span>
        </div>
      </div>
      <div className="part-two">
        <div className="background-canvas">{/* <IphoneCanvas /> */}</div>
        <div className="text-iphone t2">
          <Reveal>
            <div className="divider">
              <hr />
              <p>02</p>
            </div>
          </Reveal>

          <Reveal>
            <h1>A hybrid mobile application for route management.</h1>
          </Reveal>

          <ul>
            <Reveal>
              <li>Design and development of the App using React Native.</li>
            </Reveal>
            <Reveal>
              <li>Works on both Android and IOS devices.</li>
            </Reveal>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
