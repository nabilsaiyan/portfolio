import '../../styles/components/ProgressBar.scss'
import { motion } from 'framer-motion'

interface ProgressBarProps {
  value: number
}

function ProgressBar({ value }: ProgressBarProps) {
  return (
    <div className="progressbar-container">
      <div className="progressbar">
        <motion.div
          className="bar"
          animate={{
            width: `${value}%`,
          }}
          transition={{
            duration: 0.5,
            ease: 'easeInOut',
          }}
        />
      </div>
    </div>
  )
}

export default ProgressBar
