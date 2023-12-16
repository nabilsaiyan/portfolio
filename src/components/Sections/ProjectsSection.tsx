import '../../styles/components/ProjectsSection.scss'
import { IphoneCanvas } from './IphoneCanvas'
import { LaptopCanvas } from './LaptopCanvas'

function ProjectsSection() {
  // const gltf = useLoader(GLTFLoader, './models/laptop2/scene.gltf')

  return (
    <section id="projects" className="projects-section">
      <div className="part-one">
        <h1 className="title-section">Projects.</h1>
        <div className="background-canvas">{/* <LaptopCanvas /> */}</div>
        <div className="text-iphone t1">
          <div className="divider">
            <hr />
            <p>01</p>
          </div>

          <h1>A web application for finding TV series.</h1>
          <ul>
            <li>Development of the frontend using React and Typescript.</li>
            <li>Leverages the TMDB API for series data.</li>
          </ul>
          <span className="view-button">
            <a>View Project</a>
            <span className="material-symbols-outlined">north_east</span>
          </span>
        </div>
      </div>
      <div className="part-two">
        <div className="background-canvas">{/* <IphoneCanvas /> */}</div>
        <div className="text-iphone t2">
          <div className="divider">
            <hr />
            <p>02</p>
          </div>

          <h1>A hybrid mobile application for route management.</h1>
          <ul>
            <li>Design and development of the App using React Native.</li>
            <li>Works on both Android and IOS devices.</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
