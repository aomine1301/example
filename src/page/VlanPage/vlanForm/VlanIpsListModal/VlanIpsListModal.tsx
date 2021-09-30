import React, { memo, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Modal } from 'antd'
import ModalTitle from '@components/titles/ModalTitle/ModalTitle'
import DeleteIconButton from '@components/iconButtons/DeleteIconButton/DeleteIconButton'
import TableLoadingSpin from '@components/spins/TableLoadingSpin/TableLoadingSpin'
import VlanIpEditIconButton from './VlanIpEditIconButton/VlanIpEditIconButton'
import VlanIpAddIconButton from '@page/VlanPage/VlanEditColumn/VlanIpAddIconButton/VlanIpAddIconButton'
import { changeIpsModalVlanAction, IpVlanInterface, ItemVlanInterface, loadingListVlanAction } from '@state/vlan/vlanStateSlice'
import { AppStateInterface } from '@state/_store/createRootReducer'
import { apiConnectAxios } from '@utils/apiConnectAxios'
import classNames from 'classnames/bind'
import styles from './VlanIpsListModal.scss'

const cx = classNames.bind(styles)

const VlanIpsListModal: React.FC = () => {
  const dispatch = useDispatch()
  const { vlanList, vlanItemId, isIpsListModal, isVlanLoading } = useSelector((state: AppStateInterface) => state.vlan)

  const closeIpsListModal = () => {
    dispatch(changeIpsModalVlanAction({ isIpsListModal: false }))
  }

  const deleteIpHandler = (deleteId: string) => async () => {
    try {
      await apiConnectAxios(`vlans/IP/${deleteId}`, 'delete')
      dispatch(loadingListVlanAction())
    } catch (error) {}
  }

  const { t } = useTranslation('common')

  const ipsListIndex = useMemo(() => {
    if (vlanItemId) return vlanList.findIndex((i: ItemVlanInterface) => i.id === vlanItemId)
  }, [vlanItemId, vlanList])

  if (!vlanItemId || ipsListIndex === undefined) return null

  return (
    <Modal visible={isIpsListModal} centered mask onCancel={closeIpsListModal} footer={null}>
      <TableLoadingSpin isLoading={isVlanLoading} />
      <ModalTitle title={`${t('list')} ${t('ips_')}`} />
      <div className={cx('direction-column_center')}>
        <VlanIpAddIconButton id={vlanItemId} />
        {vlanList[ipsListIndex]?.ips?.map(({ network, mask, gateway, id }: IpVlanInterface) => (
          <div className={cx('ip-container')} key={id}>
            <span className={cx('ip')}>{`${network}/${mask} ${gateway ? `gw: ${gateway}` : null}`}</span>
            <VlanIpEditIconButton id={id} fromValues={{ network, mask, gateway }} />
            <DeleteIconButton onConfirm={deleteIpHandler(id)} popconfirmTitle='IP' />
          </div>
        ))}
      </div>
    </Modal>
  )
}

export default memo(VlanIpsListModal)
