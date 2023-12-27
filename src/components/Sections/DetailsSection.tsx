import '../../styles/components/DetailsSection.scss'
import Reveal from '../Animations/Reveal'

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
          <p>
            Passionate about crafting innovative web and mobile user
            experiences. Thrives in dynamic teams, excelling in autonomy and
            adaptability for project success. Known for redefining standards and
            delivering impactful solutions.
          </p>
          <p>
            In my spare time, I enjoy football, video games, Photoshop, and
            exploring new places through travel.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

export default DetailsSection
