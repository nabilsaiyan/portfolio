import { motion, useAnimation, useInView } from 'framer-motion'
import { ReactNode, useEffect, useRef } from 'react'

interface RevealProps {
  children: ReactNode
  width?: string
  background?: string
  animations?: string[]
}

function Reveal({
  children,
  width = 'fit-content',
  background = '#13efff',
  animations = ['move', 'reveal'],
}: RevealProps) {
  const ref = useRef(null)
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
    <div ref={ref} style={{ position: 'relative', width, overflow: 'hidden' }}>
      {animations.includes('move') ? (
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 75 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={mainControls}
          transition={{ duration: 0.75, delay: 0.15 }}
        >
          {children}
        </motion.div>
      ) : (
        children
      )}

      {animations.includes('reveal') ? (
        <motion.div
          variants={{
            hidden: { left: 0 },
            visible: { left: '100%' },
          }}
          initial="hidden"
          animate={slideControls}
          transition={{ duration: 0.75, delay: 0.15, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: 4,
            bottom: 0,
            left: 0,
            right: 0,
            background: background,
            zIndex: 20,
          }}
        />
      ) : null}
    </div>
  )
}

export default Reveal
