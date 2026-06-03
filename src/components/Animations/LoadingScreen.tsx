import { useProgress } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import { LoadingG1 } from './LoadingG1'

interface LoadingScreenProps {
  setStarted: React.Dispatch<React.SetStateAction<boolean>>
  setLoadingDisapear: React.Dispatch<React.SetStateAction<boolean>>
}

function LoadingScreen({ setStarted, setLoadingDisapear }: LoadingScreenProps) {
  const { progress } = useProgress()
  const [displayProgress, setDisplayProgress] = useState(0)
  const doneRef = useRef(false)

  // Only move forward — never reset backwards when new assets register
  useEffect(() => {
    setDisplayProgress(prev => Math.max(prev, progress))
  }, [progress])

  useEffect(() => {
    if (displayProgress >= 100 && !doneRef.current) {
      doneRef.current = true
      setTimeout(() => {
        setStarted(true)
        setTimeout(() => setLoadingDisapear(true), 1000)
      }, 2000)
    }
  }, [displayProgress])

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999 }}>
      <LoadingG1 progress={displayProgress} />
    </div>
  )
}

export default LoadingScreen
