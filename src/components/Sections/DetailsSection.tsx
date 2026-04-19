import '../../styles/components/DetailsSection.scss'
import Reveal from '../Animations/Reveal'
import { AvatarCanvas } from '../Canvas/AvatarCanvas'
import { useLang } from '../../context/LanguageContext'
import { translations } from '../../i18n/translations'

function DetailsSection() {
  const { lang } = useLang()
  const t = translations[lang].details

  const goTo = (url: string) => {
    window.open(url, '_blank', 'noopener noreferrer')
  }

  return (
    <section id="details" className="details-section">
      <div>
        <Reveal>
          <h1 className="title-section">{t.title}</h1>
        </Reveal>
        <div className="details-text">
          <Reveal>
            <p>
              {t.bio1}{' '}
              <a
                onClick={() =>
                  goTo('https://www.univ-lorraine.fr/en/univ-lorraine/')
                }
              >
                {t.bio1_uni}
              </a>
              {t.bio1_end}
            </p>
          </Reveal>
          <Reveal>
            <p>{t.bio2}</p>
          </Reveal>
          <Reveal>
            <p>{t.bio3}</p>
          </Reveal>
        </div>

        <div className="details-contact">
          <Reveal>
            <p>
              {t.contact}{' '}
              <a
                onClick={() =>
                  goTo('https://www.linkedin.com/in/nabil-amhaouch')
                }
              >
                LinkedIn
              </a>{' '}
              {t.contact_and}{' '}
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
