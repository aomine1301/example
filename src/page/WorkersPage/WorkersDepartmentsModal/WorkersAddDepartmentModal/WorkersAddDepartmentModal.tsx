import React, { FC } from 'react'
import { Modal } from 'antd'
import { WorkersAddDepartmentForm } from '@page/WorkersPage/WorkersForms/WorkersAddDepartmentForm'

interface Props {
  visible: boolean
  onClose: () => void
  title: () => void
}

const WorkersAddDepartmentModal: FC<Props> = ({ visible, title, onClose }: Props) => (
  <Modal key='modal' visible={visible} width={600} footer={false} onOk={onClose} onCancel={onClose}>
    <WorkersAddDepartmentForm onCancel={onClose} method='post' functionName='departament/' initialValues={{ name: '' }} title={title} />
  </Modal>
)

export default WorkersAddDepartmentModal
