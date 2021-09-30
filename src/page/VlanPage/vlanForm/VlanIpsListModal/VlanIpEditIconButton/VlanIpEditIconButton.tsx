import React from 'react'
import { useTranslation } from 'react-i18next'
import { Modal } from 'antd'
import EditIconButton from '@components/iconButtons/EditIconButton/EditIconButton'
import VlanIpFrom, { IpFormValuesVlanInterface } from '@page/VlanPage/vlanForm/VlanIpFrom/VlanIpFrom'
import { useModalVisibleHook } from '@hooks/useModalVisibleHook'

interface Props {
  id: string
  fromValues: IpFormValuesVlanInterface
}

const VlanIpEditIconButton: React.FC<Props> = ({ id, fromValues }: Props) => {
  const { isModalVisible, onCloseHandler, onOpenHandler } = useModalVisibleHook()

  const { t } = useTranslation('common')
  return (
    <>
      <EditIconButton onClick={onOpenHandler} tooltipTitle={`${t('edit')} ${t('ip')}`} />
      <Modal visible={isModalVisible} onCancel={onCloseHandler} centered mask footer={null}>
        <VlanIpFrom title={`${t('edit')} ${t('ip')}`} onCloseHandler={onCloseHandler} id={id} fromValues={fromValues} method='put' />
      </Modal>
    </>
  )
}

export default VlanIpEditIconButton
