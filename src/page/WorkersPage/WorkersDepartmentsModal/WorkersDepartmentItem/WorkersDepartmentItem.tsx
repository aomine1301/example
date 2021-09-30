import React, { FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Input } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { loadingListDepartmentWorkersAction } from '@state/workers/workersStateSlice'
import { DepartmentWorkersInterface } from '@state/workers/workersStateInterfaces'
import EditIconButton from '@components/iconButtons/EditIconButton/EditIconButton'
import DeleteIconButton from '@components/iconButtons/DeleteIconButton/DeleteIconButton'
import { apiConnectAxios } from '@utils/apiConnectAxios'
import classNames from 'classnames/bind'

import styles from './WorkersDepartmentItem.scss'
const cx = classNames.bind(styles)

interface Props {
  item: DepartmentWorkersInterface
  afterDelete?: (item: DepartmentWorkersInterface) => void
}

export const DepartmentItem: FC<Props> = ({ item }: Props) => {
  const dispatch = useDispatch()
  const [editing, setEditing] = useState(false)
  const [inputValue, setInputValue] = useState<string>(item?.name)

  function cancelChangesHandler() {
    setInputValue(item?.name)
    setEditing(false)
  }
  const deleteDepartmentHandler = (id: number) => async () => {
    try {
      await apiConnectAxios(`departament/${id}`, 'delete')
      dispatch(loadingListDepartmentWorkersAction())
    } catch (e) {
      console.log(e)
    }
  }
  const commitChangesHandler = (id: number) => async () => {
    try {
      const name = inputValue
      await apiConnectAxios(`departament/${id}`, 'put', { name })
      dispatch(loadingListDepartmentWorkersAction())
      setEditing(false)
    } catch (e) {
      console.log(e)
    }
  }
  const activeEditingInputHandler = () => {
    setEditing(true)
  }
  const onChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e?.target?.value)
  }
  const { t: em } = useTranslation('employee')
  return (
    <div className={cx('container')}>
      <div className={cx('input-container')}>
        {editing ? <Input placeholder={em('name-department')} value={inputValue} onChange={onChangeInputHandler} /> : item?.name}
      </div>
      {editing ? (
        <div>
          <CheckOutlined className={cx('icon_check')} onClick={commitChangesHandler(item?.id)} />
          <CloseOutlined className={cx('icon_close')} onClick={cancelChangesHandler} />
        </div>
      ) : (
        <div>
          <EditIconButton tooltipTitle={em('update-department')} onClick={activeEditingInputHandler} />
          <DeleteIconButton onConfirm={deleteDepartmentHandler(item?.id)} popconfirmTitle={`${item?.name}?`} />
        </div>
      )}
    </div>
  )
}
