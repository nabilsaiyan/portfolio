import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import '../../styles/components/CustomCursor.scss'

function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [showCursor, setShowCursor] = useState(false)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX - 8, y: e.clientY - 8 })
      setShowCursor(true)
    }

    window.addEventListener('mousemove', moveCursor)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
    }
  }, [])

  return (
    <AnimatePresence>
      {showCursor && (
        <motion.div
          className={'custom-cursor'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, ease: 'easeInOut' }}
          exit={{ opacity: 0 }}
          style={{
            translateX: position.x,
            translateY: position.y,
          }}
        />
      )}
    </AnimatePresence>
  )
}

export default CustomCursor
