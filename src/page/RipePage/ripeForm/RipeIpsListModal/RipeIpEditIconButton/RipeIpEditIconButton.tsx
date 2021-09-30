import React from 'react'
import { useTranslation } from 'react-i18next'
import { Modal } from 'antd'
import EditIconButton from '@components/iconButtons/EditIconButton/EditIconButton'
import RipeIpFrom, { IpFormValuesRipeInterface } from '../../RipeIpFrom/RipeIpFrom'
import { useModalVisibleHook } from '@hooks/useModalVisibleHook'

interface Props {
  id: string
  fromValues: IpFormValuesRipeInterface
}

const RipeIpEditIconButton: React.FC<Props> = ({ id, fromValues }: Props) => {
  const { isModalVisible, onCloseHandler, onOpenHandler } = useModalVisibleHook()

  const { t } = useTranslation('common')
  return (
    <>
      <EditIconButton onClick={onOpenHandler} tooltipTitle={`${t('edit')} ${t('ip')}`} />
      <Modal visible={isModalVisible} onCancel={onCloseHandler} centered mask footer={null}>
        <RipeIpFrom title={`${t('edit')} ${t('ip')}`} onCloseHandler={onCloseHandler} id={id} fromValues={fromValues} method='put' />
      </Modal>
    </>
  )
}

export default RipeIpEditIconButton
