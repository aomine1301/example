import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal } from 'antd'
import AddIconButton from '@components/iconButtons/AddIconButton/AddIconButton'
import VlanIpFrom from '@page/VlanPage/vlanForm/VlanIpFrom/VlanIpFrom'
import { useModalVisibleHook } from '@hooks/useModalVisibleHook'

interface Props {
  id: string
}

const VlanIpAddIconButton: React.FC<Props> = ({ id }: Props) => {
  const { isModalVisible, onCloseHandler, onOpenHandler } = useModalVisibleHook()

  const { t } = useTranslation('common')
  return (
    <>
      <AddIconButton onClick={onOpenHandler} tooltipTitle={`${t('add')} ${t('ip')}`} />
      <Modal visible={isModalVisible} onCancel={onCloseHandler} centered mask footer={null}>
        <VlanIpFrom title={`${t('add')} ${t('ip')}`} onCloseHandler={onCloseHandler} id={id} />
      </Modal>
    </>
  )
}

export default memo(VlanIpAddIconButton)
