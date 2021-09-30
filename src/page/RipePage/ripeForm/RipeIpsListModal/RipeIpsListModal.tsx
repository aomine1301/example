import React, { memo, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Modal } from 'antd'
import ModalTitle from '@components/titles/ModalTitle/ModalTitle'
import DeleteIconButton from '@components/iconButtons/DeleteIconButton/DeleteIconButton'
import TableLoadingSpin from '@components/spins/TableLoadingSpin/TableLoadingSpin'
import RipeIpEditIconButton from './RipeIpEditIconButton/RipeIpEditIconButton'
import VlanIpAddIconButton from '@page/VlanPage/VlanEditColumn/VlanIpAddIconButton/VlanIpAddIconButton'
import { changeIpsModalRipeAction, IpRipeInterface, ItemRipeInterface, loadingListRipeAction } from '@state/ripe/ripeStateSlice'
import { AppStateInterface } from '@state/_store/createRootReducer'
import { apiConnectAxios } from '@utils/apiConnectAxios'
import classNames from 'classnames/bind'
import styles from './RipeIpsListModal.scss'

const cx = classNames.bind(styles)

const RipeIpsListModal: React.FC = () => {
  const dispatch = useDispatch()
  const { vlanList, vlanItemId, isIpsListModal, isVlanLoading } = useSelector((state: AppStateInterface) => state.vlan)

  const closeIpsListModal = () => {
    dispatch(changeIpsModalRipeAction({ isIpsListModal: false }))
  }

  const deleteIpHandler = (deleteId: string) => async () => {
    try {
      await apiConnectAxios(`ripe/IP/${deleteId}`, 'delete')
      dispatch(loadingListRipeAction())
    } catch (error) {}
  }

  const { t } = useTranslation('common')

  const ipsListIndex = useMemo(() => {
    if (vlanItemId) return vlanList.findIndex((i: ItemRipeInterface) => i.id === vlanItemId)
  }, [vlanItemId, vlanList])

  if (!vlanItemId || ipsListIndex === undefined) return null

  return (
    <Modal visible={isIpsListModal} centered mask onCancel={closeIpsListModal} footer={null}>
      <TableLoadingSpin isLoading={isVlanLoading} />
      <ModalTitle title={`${t('list')} ${t('ips_')}`} />
      <div className={cx('direction-column_center')}>
        <VlanIpAddIconButton id={vlanItemId} />
        {vlanList[ipsListIndex]?.ips?.map(({ network, mask, id }: IpRipeInterface) => (
          <div className={cx('ip-container')} key={id}>
            <span className={cx('ip')}>{`${network}/${mask}`}</span>
            <RipeIpEditIconButton id={id} fromValues={{ network, mask }} />
            <DeleteIconButton onConfirm={deleteIpHandler(id)} popconfirmTitle='IP' />
          </div>
        ))}
      </div>
    </Modal>
  )
}

export default memo(RipeIpsListModal)
