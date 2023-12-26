import { useProgress } from '@react-three/drei'
import '../../styles/components/LoadingScreen.scss'
import { useEffect } from 'react'

interface LoadingScreenProps {
  setStarted: React.Dispatch<React.SetStateAction<boolean>>
  setLoadingDisapear: React.Dispatch<React.SetStateAction<boolean>>
}

function LoadingScreen({ setStarted, setLoadingDisapear }: LoadingScreenProps) {
  const { progress, total, loaded, item } = useProgress()

  useEffect(() => {
    if (progress === 100) {
      setStarted(true)
      setTimeout(() => {
        setLoadingDisapear(true)
      }, 1000)
    }
  }, [progress, total, loaded, item])

  return (
    <div className="loading-overlay">
      <img src="./icon.png" alt="loading-icon" />
    </div>
  )
}

export default LoadingScreen
