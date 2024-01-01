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
      <Reveal styles={{ display: 'flex', alignSelf: 'flex-start' }}>
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
            <li>
              <Reveal>
                <div>
                  Development of the frontend using React and Typescript.
                </div>
              </Reveal>
            </li>
            <li>
              <Reveal>
                <div>Leverages the TMDB API for series data.</div>
              </Reveal>
            </li>
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
            <li>
              <Reveal>
                <div>Design and development of the App using React Native.</div>
              </Reveal>
            </li>
            <li>
              <Reveal>
                <div>Works on both Android and IOS devices.</div>
              </Reveal>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
