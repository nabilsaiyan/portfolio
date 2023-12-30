import { motion, useAnimation, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

interface RevealProps {
  children: JSX.Element
  width?: string
  background?: string
}

const roles = [
  'Full Stack Developer',
  'Frontend Developer',
  'Backend Developer',
  'Design Enthusiast',
]

function RevealRole({
  children,
  width = 'fit-content',
  background = '#5a5a5a',
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [roleIndex, setRoleIndex] = useState(0)

  const [loopCount, setLoopCount] = useState(0)

  const onAnimationCycleComplete = () => {
    // Increase the loop counter when the animation cycle completes
    setLoopCount((prevCount) => prevCount + 1)

    // Perform actions at the end of a loop cycle
    console.log('Animation cycle completed:', loopCount)
  }

  useEffect(() => {
    // Update loopCount when it reaches a specific count
    // Reset it to zero or perform other actions
    if (loopCount === 5) {
      console.log('Reached 5 animation cycles, resetting...')
      setLoopCount(0) // Reset the loop count or perform other actions
    }
  }, [loopCount])

  return (
    <div ref={ref} style={{ position: 'relative', width, overflow: 'hidden' }}>
      <motion.div>{children}</motion.div>

      <motion.div
        variants={{
          hidden: { left: 0 },
          visible: { left: '100%' },
        }}
        initial="hidden"
        animate="visible"
        transition={{
          duration: 0.5,
          ease: 'easeIn',
          repeat: Infinity,
          repeatDelay: 2,
        }}
        onAnimationComplete={onAnimationCycleComplete}
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

export default RevealRole
