import { motion, useAnimation, useInView } from 'framer-motion'
import { CSSProperties, useEffect, useRef } from 'react'
import '../../styles/components/RevealAnimation.scss'

interface RevealProps {
  children: JSX.Element
  width?: string
  background?: string
  styles?: CSSProperties
}

function Reveal({
  children,
  width = 'fit-content',
  background = '#13efff',
  styles,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const mainControls = useAnimation()
  const slideControls = useAnimation()

  useEffect(() => {
    if (isInView) {
      mainControls.start('visible')
      slideControls.start('visible')
    }
  }, [isInView])

  return (
    <div
      ref={ref}
      style={{ position: 'relative', width, overflow: 'hidden', ...styles }}
    >
      <motion.div
        className="reveal-container"
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        {children}
      </motion.div>

      <motion.div
        variants={{
          hidden: { left: 0 },
          visible: { left: '100%' },
        }}
        initial="hidden"
        animate={slideControls}
        transition={{ duration: 0.5, ease: 'easeIn' }}
        style={{
          position: 'absolute',
          top: 4,
          bottom: 4,
          left: 0,
          right: 0,
          background: background,
          zIndex: 20,
        }}
      />
    </div>
  )
}

export default Reveal
