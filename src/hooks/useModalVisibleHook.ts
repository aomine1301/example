import { useState } from 'react'

export const useModalVisibleHook = () => {
  const [isModalVisible, setModalVisible] = useState<boolean>(false)

  const onCloseHandler = () => setModalVisible(false)
  const onOpenHandler = () => setModalVisible(true)

  return { isModalVisible, onCloseHandler, onOpenHandler }
}
