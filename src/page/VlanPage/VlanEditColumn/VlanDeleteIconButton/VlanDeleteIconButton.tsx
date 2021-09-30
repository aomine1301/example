import React, { memo } from 'react'
import { useDispatch } from 'react-redux'
import DeleteIconButton from '@components/iconButtons/DeleteIconButton/DeleteIconButton'
import { loadingListVlanAction } from '@state/vlan/vlanStateSlice'
import { apiConnectAxios } from '@utils/apiConnectAxios'

interface Props {
  id: string
}

const VlanDeleteIconButton: React.FC<Props> = ({ id }: Props) => {
  const dispatch = useDispatch()

  const deleteItemVlanHandler = async () => {
    try {
      await apiConnectAxios(`vlans/${id}`, 'delete')
      dispatch(loadingListVlanAction())
    } catch (e) {}
  }

  return <DeleteIconButton onConfirm={deleteItemVlanHandler} popconfirmTitle='VLAN' />
}

export default memo(VlanDeleteIconButton)
