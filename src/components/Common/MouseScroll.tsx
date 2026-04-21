import '../../styles/components/MouseScroll.scss'

type Variant = 'classic' | 'swipe' | 'bounce' | 'reveal'

function MouseScroll({ variant = 'classic' }: { variant?: Variant }) {

  /* ── CLASSIC: mouse + wheel scrolling down + cascading arrows ── */
  if (variant === 'classic') return (
    <div className="ms-classic">
      <span className="ms-classic__label">scroll</span>
      <div className="ms-classic__mouse">
        <div className="ms-classic__wheel" />
      </div>
      <svg className="ms-classic__arrows" viewBox="0 0 20 28" fill="none">
        <polyline className="ms-classic__v ms-classic__v--1" points="2,2 10,9 18,2"  stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline className="ms-classic__v ms-classic__v--2" points="2,10 10,17 18,10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline className="ms-classic__v ms-classic__v--3" points="2,18 10,25 18,18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  )

  /* ── SWIPE: finger swiping down with motion trail ── */
  if (variant === 'swipe') return (
    <div className="ms-swipe">
      <svg className="ms-swipe__finger" viewBox="0 0 28 52" fill="none">
        <rect x="9" y="2" width="10" height="20" rx="5" stroke="currentColor" strokeWidth="1.6" fill="rgba(0,212,255,0.05)"/>
        <path d="M4 18 Q3 13 9 13 L19 13 Q25 13 24 18 L23 38 Q22 46 14 46 Q6 46 5 38 Z" stroke="currentColor" strokeWidth="1.6" fill="rgba(0,212,255,0.05)"/>
      </svg>
      <div className="ms-swipe__trail">
        <div className="ms-swipe__drop ms-swipe__drop--1"/>
        <div className="ms-swipe__drop ms-swipe__drop--2"/>
        <div className="ms-swipe__drop ms-swipe__drop--3"/>
      </div>
    </div>
  )

  /* ── BOUNCE: mouse with big bouncing arrow, very readable ── */
  if (variant === 'bounce') return (
    <div className="ms-bounce">
      <div className="ms-bounce__mouse">
        <div className="ms-bounce__wheel" />
      </div>
      <svg className="ms-bounce__arrow" viewBox="0 0 28 20" fill="none">
        <polyline points="2,2 14,16 26,2" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  )

  /* ── REVEAL: typewriter "scroll ↓" with mouse above ── */
  return (
    <div className="ms-reveal">
      <div className="ms-reveal__mouse">
        <div className="ms-reveal__wheel" />
      </div>
      <div className="ms-reveal__text">
        <span className="ms-reveal__char ms-reveal__char--s">s</span>
        <span className="ms-reveal__char ms-reveal__char--c">c</span>
        <span className="ms-reveal__char ms-reveal__char--r">r</span>
        <span className="ms-reveal__char ms-reveal__char--o">o</span>
        <span className="ms-reveal__char ms-reveal__char--l">l</span>
        <span className="ms-reveal__char ms-reveal__char--l2">l</span>
        <span className="ms-reveal__char ms-reveal__char--arr"> ↓</span>
      </div>
    </div>
  )
}

export default MouseScroll
