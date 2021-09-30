import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal } from 'antd'
import AddIconButton from '@components/iconButtons/AddIconButton/AddIconButton'
import RipeIpFrom from '@page/RipePage/ripeForm/RipeIpFrom/RipeIpFrom'
import { useModalVisibleHook } from '@hooks/useModalVisibleHook'

interface Props {
  id: string
}

const RipeIpAddIconButton: React.FC<Props> = ({ id }: Props) => {
  const { isModalVisible, onCloseHandler, onOpenHandler } = useModalVisibleHook()

  const { t } = useTranslation('common')
  return (
    <>
      <AddIconButton onClick={onOpenHandler} tooltipTitle={`${t('add')} ${t('ip')}`} />
      <Modal visible={isModalVisible} onCancel={onCloseHandler} centered mask footer={null}>
        <RipeIpFrom title={`${t('add')} ${t('ip')}`} onCloseHandler={onCloseHandler} id={id} />
      </Modal>
    </>
  )
}

export default memo(RipeIpAddIconButton)
