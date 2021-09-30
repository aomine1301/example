import React from 'react'
import { useTranslation } from 'react-i18next'
import { Modal } from 'antd'
import AddIconButton from '@components/iconButtons/AddIconButton/AddIconButton'
import VlanItemForm from '@page/VlanPage/vlanForm/VlanItemForm/VlanItemForm'
import { useModalVisibleHook } from '@hooks/useModalVisibleHook'

const RipeItemAddButton: React.FC = () => {
  const { isModalVisible, onCloseHandler, onOpenHandler } = useModalVisibleHook()

  const { t } = useTranslation('common')
  return (
    <>
      <AddIconButton onClick={onOpenHandler} tooltipTitle={`${t('create')} RIPE`} bigSize />
      <Modal visible={isModalVisible} onCancel={onCloseHandler} centered mask footer={null}>
        <VlanItemForm title={`${t('create')} RIPE`} onCloseHandler={onCloseHandler} isRipeFrom />
      </Modal>
    </>
  )
}

export default RipeItemAddButton
