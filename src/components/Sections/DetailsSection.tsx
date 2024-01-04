import '../../styles/components/DetailsSection.scss'
import Reveal from '../Animations/Reveal'
import { AvatarCanvas } from '../Canvas/AvatarCanvas'

function DetailsSection() {
  const goTo = (url: string) => {
    window.open(url, '_blank', 'noopener noreferrer')
  }

  return (
    <section id="details" className="details-section">
      <div>
        <Reveal>
          <h1 className="title-section">Details</h1>
        </Reveal>
        <div className="details-text">
          <Reveal>
            <p>
              I'm Nabil, 23, currently based in Paris, holding a Master's in
              Software Engineering from the{' '}
              <a
                onClick={() =>
                  goTo('https://www.univ-lorraine.fr/en/univ-lorraine/')
                }
              >
                University of Lorraine
              </a>
              .
            </p>
          </Reveal>
          <Reveal>
            <p>
              Passionate about crafting innovative web and mobile user
              experiences. Thrives in dynamic teams, excelling in autonomy and
              adaptability for project success. Known for redefining standards
              and delivering impactful solutions.
            </p>
          </Reveal>
          <Reveal>
            <p>
              In my spare time, I enjoy football, video games, Photoshop, and
              exploring new places through travel.
            </p>
          </Reveal>
        </div>

        <div className="details-contact">
          <Reveal>
            <p>
              Feel free to reach out to me through the email provided below.
              Additionally, you can connect with me on{' '}
              <a
                onClick={() =>
                  goTo('https://www.linkedin.com/in/nabil-amhaouch')
                }
              >
                LinkedIn
              </a>{' '}
              and explore my projects on{' '}
              <a onClick={() => goTo('https://github.com/nabilsaiyan')}>
                GitHub
              </a>
              .
            </p>
          </Reveal>
          <Reveal>
            <div className="details-email">
              <i className="fa-solid fa-envelope"></i>{' '}
              <a href="mailto:nabil.amhaouch1@gmail.com">
                nabil.amhaouch1@gmail.com
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default DetailsSection
