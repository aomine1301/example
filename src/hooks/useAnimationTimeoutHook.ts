import { useEffect, useRef, useState } from 'react'

export const useAnimationTimeoutHook = (isLoading: boolean) => {
  const [isShow, setShow] = useState<boolean>(false)
  const [isAnimation, setAnimation] = useState<boolean>(false)

  const animationTimeout = useRef<NodeJS.Timeout | null>(null)
  useEffect(() => {
    if (isLoading) {
      if (animationTimeout.current) clearTimeout(animationTimeout.current)
      setShow(true)
      animationTimeout.current = setTimeout(() => {
        setAnimation(true)
      }, 20)
    } else {
      if (animationTimeout.current) clearTimeout(animationTimeout.current)
      setAnimation(false)
      animationTimeout.current = setTimeout(() => {
        setShow(false)
      }, 300)
    }
    return () => {
      if (animationTimeout.current) clearTimeout(animationTimeout.current)
    }
  }, [setShow, setAnimation, isLoading])

  return { isShow, isAnimation }
}
