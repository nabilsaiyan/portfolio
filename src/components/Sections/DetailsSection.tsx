import '../../styles/components/DetailsSection.scss'
import Reveal from '../Animations/Reveal'
import { useLang } from '../../context/LanguageContext'
import { translations } from '../../i18n/translations'
import { useState, useEffect } from 'react'
import SnakeGame from '../Games/SnakeGame'
import TypeRush from '../Games/TypeRush'
import BugCatcher from '../Games/BugCatcher'
import CommitBreaker from '../Games/CommitBreaker'

const STACK_CATCHER_IDX = 2
const GAME_HEIGHT = 700

function DetailsSection() {
  const { lang } = useLang()
  const t = translations[lang].details

  const [activeGame, setActiveGame] = useState(0)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768)
  const [scale, setScale] = useState(() => {
    if (window.innerWidth > 768) return 1
    return Math.min(1, (window.innerWidth - 32) / 600)
  })

  useEffect(() => {
    const update = () => {
      const mobile = window.innerWidth <= 768
      setIsMobile(mobile)
      if (mobile) {
        setActiveGame(STACK_CATCHER_IDX)
        setScale(Math.min(1, (window.innerWidth - 32) / 600))
      } else {
        setScale(1)
      }
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const GAME_LABELS = ['SNAKE', 'TYPE RUSH', 'STACK CATCHER', 'COMMIT BREAKER']

  const visibleLabels = isMobile
    ? [GAME_LABELS[STACK_CATCHER_IDX]]
    : GAME_LABELS

  const renderActiveGame = () => {
    switch (activeGame) {
      case 0: return <SnakeGame />
      case 1: return <TypeRush />
      case 2: return <BugCatcher />
      case 3: return <CommitBreaker />
      default: return null
    }
  }

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
              <a onClick={() => goTo('https://www.univ-lorraine.fr/en/univ-lorraine/')} data-text={t.bio1_uni}>
                {t.bio1_uni}
              </a>
              {t.bio1_end}
            </p>
          </Reveal>
          <Reveal><p>{t.bio2}</p></Reveal>
          <Reveal><p>{t.bio3}</p></Reveal>
        </div>

        <div className="details-contact">
          <Reveal>
            <p>
              {t.contact}{' '}
              <a onClick={() => goTo('https://www.linkedin.com/in/nabil-amhaouch')} data-text="LinkedIn">LinkedIn</a>{' '}
              {t.contact_and}{' '}
              <a onClick={() => goTo('https://github.com/nabilsaiyan')} data-text="GitHub">GitHub</a>.
            </p>
          </Reveal>
          <Reveal>
            <div className="details-email">
              <i className="fa-solid fa-envelope"></i>{' '}
              <a href="mailto:nabil.amhaouch.dev@gmail.com" data-text="nabil.amhaouch.dev@gmail.com">nabil.amhaouch.dev@gmail.com</a>
            </div>
          </Reveal>
        </div>

        {!isMobile && (
          <Reveal>
            <p className="details-game-hint">{t.game_hint}</p>
          </Reveal>
        )}
      </div>

      {isMobile && (
        <Reveal>
          <p className="details-game-hint details-game-hint--mobile">{t.game_hint_mobile}</p>
        </Reveal>
      )}

      <div className="details-right">
        <div className="game-selector">
          <div className="game-selector__tabs">
            {visibleLabels.map((label) => {
              const i = GAME_LABELS.indexOf(label)
              return (
                <button
                  key={label}
                  className={`game-selector__tab${activeGame === i ? ' game-selector__tab--active' : ''}`}
                  onClick={() => setActiveGame(i)}
                >
                  {label}
                </button>
              )
            })}
          </div>

          <div
            className="game-selector__content"
            style={scale < 1 ? {
              height: `${GAME_HEIGHT * scale}px`,
              overflow: 'hidden',
              display: 'flex',
              justifyContent: 'center',
            } : undefined}
          >
            <div style={scale < 1 ? {
              transform: `scale(${scale})`,
              transformOrigin: 'top center',
              flexShrink: 0,
            } : undefined}>
              {renderActiveGame()}
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}

export default DetailsSection
