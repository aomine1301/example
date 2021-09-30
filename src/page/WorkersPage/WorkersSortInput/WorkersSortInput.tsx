import React from 'react'
import { Select } from 'antd'
const { Option } = Select
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { OptionSelectTableWorkersInterface, ValueSortSelectedWorkersType } from '@state/workers/workersStateInterfaces'
import { changeValueSelectedWorkersAction } from '@state/workers/workersStateSlice'

import classNames from 'classnames/bind'
import styles from '@page/WorkersPage/WorkersSortInput/WorkersSortInput.scss'

const cx = classNames.bind(styles)

const WorkersSortInput = () => {
  const { t } = useTranslation('common')

  const options: OptionSelectTableWorkersInterface[] = [
    { title: t('name'), value: 'name', id: 1 },
    { title: t('surname'), value: 'surname', id: 2 },
    { title: t('department'), value: 'depName', id: 3 },
    { title: t('date-of-birth'), value: 'birth_date', id: 4 },
  ]
  const dispatch = useDispatch()
  const setValueHandler = (e: ValueSortSelectedWorkersType) => {
    dispatch(changeValueSelectedWorkersAction({ sortWorkersSelectedValue: e }))
  }
  return (
    <div className={cx('sorting-select')}>
      <Select placeholder={t('sorting')} defaultValue={'name'} className={cx('input-select')} onChange={setValueHandler}>
        {options.map(({ value, id, title }: OptionSelectTableWorkersInterface) => (
          <Option value={value} key={id}>
            {title}
          </Option>
        ))}
      </Select>
    </div>
  )
}
export default WorkersSortInput
