import React, { Dispatch, FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Modal } from 'antd'
import { loadingListWorkersAction } from '@state/workers/workersStateSlice'
import { AppStateInterface } from '@state/_store/createRootReducer'
import { ItemWorkersInterface } from '@state/workers/workersStateInterfaces'
import { apiConnectAxios } from '@utils/apiConnectAxios'
import { useModalVisibleHook } from '@hooks/useModalVisibleHook'
import { WorkersForm } from '../WorkersForms/WorkersForm'
import EditIconButton from '@components/iconButtons/EditIconButton/EditIconButton'
import DeleteIconButton from '@components/iconButtons/DeleteIconButton/DeleteIconButton'

interface Props {
  item: ItemWorkersInterface
}

const WorkersMakeButtons: FC<Props> = ({ item }: Props) => {
  const { isModalVisible, onCloseHandler, onOpenHandler } = useModalVisibleHook()
  const { department } = useSelector((state: AppStateInterface) => state.workers)
  const dispatch: Dispatch<{ type: string }> = useDispatch()
  const deleteWorkerHandler = (item: ItemWorkersInterface) => async () => {
    await apiConnectAxios(`employee/${item?.id}`, 'delete')
    dispatch(loadingListWorkersAction())
  }
  const { t: em } = useTranslation('employee')
  return (
    <>
      <div>
        <EditIconButton tooltipTitle={em('update-worker')} onClick={onOpenHandler} />
        <Modal width='auto' visible={isModalVisible} centered={true} onCancel={onCloseHandler} footer={null}>
          <WorkersForm
            initialValues={{ ...item, password: '' }}
            title={em('update-worker')}
            onCancel={onCloseHandler}
            id={item?.id}
            department={department}
            method='put'
          />
        </Modal>
        <DeleteIconButton onConfirm={deleteWorkerHandler(item)} popconfirmTitle={`${item?.name} ${item?.surname}?`} />
      </div>
    </>
  )
}

export default WorkersMakeButtons
