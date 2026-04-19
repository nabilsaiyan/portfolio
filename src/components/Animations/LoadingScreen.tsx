import { useProgress } from '@react-three/drei'
import { useEffect } from 'react'
import { LoadingG1 } from './LoadingG1'

interface LoadingScreenProps {
  setStarted: React.Dispatch<React.SetStateAction<boolean>>
  setLoadingDisapear: React.Dispatch<React.SetStateAction<boolean>>
}

function LoadingScreen({ setStarted, setLoadingDisapear }: LoadingScreenProps) {
  const { progress } = useProgress()

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setStarted(true)
        setTimeout(() => setLoadingDisapear(true), 1000)
      }, 2000)
    }
  }, [progress])

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999 }}>
      <LoadingG1 progress={progress} />
    </div>
  )
}

export default LoadingScreen
