import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Select } from 'antd'
const { Option } = Select
import { FieldInputProps, FormikProps, useField } from 'formik'
import { DepartmentWorkersInterface } from '@state/workers/workersStateInterfaces'
import classNames from 'classnames/bind'
import styles from '@page/WorkersPage/WorkersForms/WorkersForm.scss'

const cx = classNames.bind(styles)

interface Props {
  field: FieldInputProps<any>
  form: FormikProps<any>
  department: Array<DepartmentWorkersInterface>
}

const SelectForFormik: FC<Props> = ({ field: { name, onBlur }, form: { touched, errors }, department }: Props) => {
  const [, , { setValue }] = useField<number>(name)
  const { t } = useTranslation('common')

  const changeSelectHandler = (selectValue: number) => {
    setValue(selectValue)
  }
  const nameDep = department?.[0]?.name
  const idDep = department?.[0]?.id
  return (
    <div className={cx('flex-form')}>
      <label className={cx('label-select')} htmlFor='department'>
        {t('department')}
      </label>
      <Select
        onBlur={onBlur}
        className={cx('select')}
        defaultActiveFirstOption={true}
        placeholder={nameDep}
        defaultValue={idDep}
        onChange={changeSelectHandler}
      >
        {department.map(({ id, name }: DepartmentWorkersInterface) => {
          return (
            <Option value={id} key={id}>
              {name}
            </Option>
          )
        })}
      </Select>
      <div className={touched[name] && errors[name] ? cx('error-upload') : cx('error-none')}>{errors[name]}</div>
    </div>
  )
}

export default SelectForFormik
