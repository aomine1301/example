import React, { FC, memo } from 'react'
import { Modal } from 'antd'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { AppStateInterface } from '@state/_store/createRootReducer'
import { WorkersForm } from '../WorkersForms/WorkersForm'

interface Props {
  onCancel: () => void
  visible: boolean
}

const WorkersModalAddEmployee: FC<Props> = ({ visible, onCancel }: Props) => {
  const { department } = useSelector((state: AppStateInterface) => state.workers)

  const { t: em } = useTranslation('employee')
  return (
    <Modal visible={visible} width={1000} onCancel={onCancel} onOk={onCancel} footer={null}>
      <WorkersForm
        title={em('adding-a-new-worker')}
        method='post'
        onCancel={onCancel}
        department={department}
        initialValues={{
          name: '',
          surname: '',
          lastname: '',
          birth_date: '',
          departament_id: 0,
          email: '',
          password: '',
          login: '',
          avatar: '',
          pics: [],
          corporate_phone: '',
          local_phone: '',
          personal_phone: '',
          role: '',
          active: false,
        }}
      />
    </Modal>
  )
}
export default memo(WorkersModalAddEmployee)
