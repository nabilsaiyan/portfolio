import { motion, useInView } from 'framer-motion'
import { CSSProperties, useEffect, useRef, useState } from 'react'
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

  // Wait for page to be fully ready before allowing reveals to fire.
  // Prevents janky animations during the expensive cold-start window.
  const [pageReady, setPageReady] = useState(false)
  useEffect(() => {
    const id = setTimeout(() => setPageReady(true), 300)
    return () => clearTimeout(id)
  }, [])

  // amount: 0.2 — element must be 20% in view before triggering,
  // giving the browser time to be idle before committing to the animation.
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const shouldAnimate = pageReady && isInView

  return (
    <div
      ref={ref}
      style={{ position: 'relative', width, overflow: 'hidden', ...styles }}
    >
      <motion.div
        className="reveal-container"
        initial={{ opacity: 0, y: 40 }}
        animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.45, delay: 0.1, ease: 'easeOut' }}
        style={{ willChange: 'transform, opacity' }}
      >
        {children}
      </motion.div>

      <motion.div
        initial={{ x: 0 }}
        animate={shouldAnimate ? { x: '101%' } : { x: 0 }}
        transition={{ duration: 0.45, ease: 'easeIn' }}
        style={{
          position: 'absolute',
          top: 4,
          bottom: 4,
          left: 0,
          right: 0,
          background,
          zIndex: 20,
          willChange: 'transform',
        }}
      />
    </div>
  )
}

export default Reveal
