import { useProgress } from '@react-three/drei'
import '../../styles/components/LoadingScreen.scss'
import { useEffect, useState } from 'react'
import ProgressBar from '../Common/ProgressBar'

interface LoadingScreenProps {
  setStarted: React.Dispatch<React.SetStateAction<boolean>>
  setLoadingDisapear: React.Dispatch<React.SetStateAction<boolean>>
}

function LoadingScreen({ setStarted, setLoadingDisapear }: LoadingScreenProps) {
  const { progress, total, loaded, item } = useProgress()
  const [progressPercent, setProgressPercent] = useState<number>(0)

  useEffect(() => {
    setProgressPercent(progress)
    if (progress === 100) {
      setStarted(true)
      setTimeout(() => {
        setLoadingDisapear(true)
      }, 1250)
    }
  }, [progress, total, loaded, item])

  return (
    <div className="loading-overlay">
      <div className="loading-container">
        <img src="./icon.png" alt="loading-icon" />
        <ProgressBar value={progressPercent} />
      </div>
    </div>
  )
}

export default LoadingScreen
