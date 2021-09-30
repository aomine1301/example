import React, { FC, memo } from 'react'
import { Modal, Button, Table } from 'antd'
const { Column } = Table
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { DepartmentWorkersInterface } from '@state/workers/workersStateInterfaces'
import { AppStateInterface } from '@state/_store/createRootReducer'
import { DepartmentItem } from '@page/WorkersPage/WorkersDepartmentsModal/WorkersDepartmentItem/WorkersDepartmentItem'
import WorkersAddDepartmentModal from '@page/WorkersPage/WorkersDepartmentsModal/WorkersAddDepartmentModal/WorkersAddDepartmentModal'
import { useModalVisibleHook } from '@hooks/useModalVisibleHook'
import TableLoadingSpin from '@components/spins/TableLoadingSpin/TableLoadingSpin'
import groupImg from '@img/group.png'

import style from './WorkersDepartmentsModal.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(style)

interface Props {
  onCancel: () => void
  visible: boolean
}

const WorkersDepartmentsModal: FC<Props> = ({ visible, onCancel }: Props) => {
  const { isModalVisible, onCloseHandler, onOpenHandler } = useModalVisibleHook()

  const { department, isDepartmentLoading } = useSelector((state: AppStateInterface) => state.workers)
  const { t } = useTranslation('common')
  const { t: em } = useTranslation('employee')
  return (
    <>
      <Modal
        visible={visible}
        width={800}
        title={em('list-department')}
        onCancel={onCancel}
        onOk={onCancel}
        footer={[
          <Button key='add' type='primary' onClick={onOpenHandler}>
            {t('add')}
          </Button>,
          <WorkersAddDepartmentModal visible={isModalVisible} title={em('adding-a-new-department')} onClose={onCloseHandler} key='modalDep' />,
          <Button key='cancel' className={cx('department-button')} onClick={onCancel}>
            {t('close')}
          </Button>,
        ]}
      >
        <TableLoadingSpin isLoading={isDepartmentLoading} />
        <Table rowKey='id' size='small' pagination={{ defaultPageSize: 10, hideOnSinglePage: true }} dataSource={department}>
          <Column title={t('avatar')} key='avatar' width={50} render={() => <img className={cx('avatar-department-column')} src={groupImg} alt='img' />} />
          <Column
            title={`${t('name')} ${t('and')} ${t('actions')}`}
            key='action'
            render={(item: DepartmentWorkersInterface) => <DepartmentItem item={item} />}
          />
        </Table>
      </Modal>
    </>
  )
}
export default memo(WorkersDepartmentsModal)
