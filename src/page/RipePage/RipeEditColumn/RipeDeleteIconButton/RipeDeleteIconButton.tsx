import React, { memo } from 'react'
import { useDispatch } from 'react-redux'
import DeleteIconButton from '@components/iconButtons/DeleteIconButton/DeleteIconButton'
import { loadingListRipeAction } from '@state/ripe/ripeStateSlice'
import { apiConnectAxios } from '@utils/apiConnectAxios'

interface Props {
  id: string
}

const RipeDeleteIconButton: React.FC<Props> = ({ id }: Props) => {
  const dispatch = useDispatch()

  const deleteItemVlanHandler = async () => {
    try {
      await apiConnectAxios(`ripe/${id}`, 'delete')
      dispatch(loadingListRipeAction())
    } catch (e) {}
  }

  return <DeleteIconButton onConfirm={deleteItemVlanHandler} popconfirmTitle='RIPE' />
}

export default memo(RipeDeleteIconButton)
