import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import '../../styles/components/RevealAnimation.scss'

const roles = ['Web Developer', 'Mobile Developer', 'Design Enthusiast']

function RolesAnimation() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (roles.length > 1) {
      const interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % roles.length)
      }, 3000)

      return () => clearInterval(interval)
    }
  }, [])

  const itemVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  }

  return (
    <div>
      <AnimatePresence exitBeforeEnter={false} mode="wait">
        {roles.length > 0 &&
          roles.map(
            (role, i) =>
              i === index && (
                <motion.div
                  className="additional-role"
                  key={role}
                  variants={itemVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.5 }}
                >
                  {role}
                </motion.div>
              ),
          )}
      </AnimatePresence>
    </div>
  )
}

export default RolesAnimation
