import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import '../../styles/components/RevealAnimation.scss'
import { useLang } from '../../context/LanguageContext'
import { translations } from '../../i18n/translations'

function RolesAnimation() {
  const { lang } = useLang()
  const roles = translations[lang].intro.roles
  const [index, setIndex] = useState(0)

  useEffect(() => {
    setIndex(0)
  }, [lang])

  useEffect(() => {
    if (roles.length > 1) {
      const interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % roles.length)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [roles.length])

  const itemVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  }

  return (
    <div>
      <AnimatePresence mode="wait">
        {roles.map(
          (role, i) =>
            i === index && (
              <motion.div
                className="additional-role"
                key={`${lang}-${role}`}
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
