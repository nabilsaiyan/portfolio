import '../../styles/components/DetailsSection.scss'
import Reveal from '../Animations/Reveal'
import { useLang } from '../../context/LanguageContext'
import { translations } from '../../i18n/translations'
import { useState } from 'react'
import SnakeGame from '../Games/SnakeGame'
import TypeRush from '../Games/TypeRush'
import BugCatcher from '../Games/BugCatcher'
import CommitBreaker from '../Games/CommitBreaker'

function DetailsSection() {
  const { lang } = useLang()
  const t = translations[lang].details

  const [activeGame, setActiveGame] = useState(0)

  const GAMES = [
    { label: 'SNAKE', node: <SnakeGame /> },
    { label: 'TYPE RUSH', node: <TypeRush /> },
    { label: 'STACK CATCHER', node: <BugCatcher /> },
    { label: 'COMMIT BREAKER', node: <CommitBreaker /> },
  ]

  const goTo = (url: string) => {
    window.open(url, '_blank', 'noopener noreferrer')
  }

  return (
    <section id="details" className="details-section">
      <div className="details-left">
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

      <div className="details-right">
        <div className="game-selector">
          <div className="game-selector__tabs">
            {GAMES.map((g, i) => (
              <button
                key={g.label}
                className={`game-selector__tab${activeGame === i ? ' game-selector__tab--active' : ''}`}
                onClick={() => setActiveGame(i)}
              >
                {g.label}
              </button>
            ))}
          </div>
          <div className="game-selector__content">
            {GAMES[activeGame].node}
          </div>
        </div>
      </div>
    </section>
  )
}

export default DetailsSection
