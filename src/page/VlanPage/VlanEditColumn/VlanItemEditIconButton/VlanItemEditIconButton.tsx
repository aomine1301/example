import React from 'react'
import { useTranslation } from 'react-i18next'
import { Modal } from 'antd'
import EditIconButton from '@components/iconButtons/EditIconButton/EditIconButton'
import VlanItemForm, { FormValuesVlanInterface } from '@page/VlanPage/vlanForm/VlanItemForm/VlanItemForm'
import { useModalVisibleHook } from '@hooks/useModalVisibleHook'

interface Props {
  fromValues: FormValuesVlanInterface
  id: string
}

const VlanItemEditIconButton: React.FC<Props> = ({ fromValues, id }: Props) => {
  const { isModalVisible, onCloseHandler, onOpenHandler } = useModalVisibleHook()

  const { t } = useTranslation('common')
  return (
    <>
      <EditIconButton onClick={onOpenHandler} tooltipTitle={`${t('edit')} VLAN`} />
      <Modal visible={isModalVisible} onCancel={onCloseHandler} centered mask footer={null}>
        <VlanItemForm title={`${t('edit')} VLAN`} onCloseHandler={onCloseHandler} method='put' fromValues={fromValues} id={id} />
      </Modal>
    </>
  )
}

export default VlanItemEditIconButton
