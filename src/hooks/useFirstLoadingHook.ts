import { useEffect, useRef, useState } from 'react'

export const useFirstLoadingHook = (isHaveFirstLoading?: boolean) => {
  const [isComponentHide, setComponentHide] = useState<boolean>(false)

  const timeout = useRef<NodeJS.Timeout | null>(null)
  useEffect(() => {
    if (isHaveFirstLoading && !isComponentHide) {
      timeout.current = setTimeout(() => {
        setComponentHide(true)
      }, 300)
    }
    return () => {
      if (timeout.current) clearTimeout(timeout.current)
    }
  }, [isHaveFirstLoading, setComponentHide, isComponentHide])

  return { isComponentHide }
}
