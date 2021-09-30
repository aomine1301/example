import React, { FC } from 'react'
import { Checkbox } from 'antd'
import { FieldInputProps, FormikProps } from 'formik'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames/bind'
import styles from '@page/WorkersPage/WorkersForms/WorkersForm.scss'

const cx = classNames.bind(styles)

interface Props {
  field: FieldInputProps<any>
  form: FormikProps<any>
}

const CheckboxForFormik: FC<Props> = ({ field: { name, value, onChange, onBlur }, form: { touched, errors } }: Props) => {
  const { t: em } = useTranslation('employee')
  return (
    <div className={cx('flex-form-check-box')}>
      <Checkbox name={name} checked={value} onClick={onBlur} className={cx('checkbox', 'ant-checkbox')} onChange={onChange}>
        {em('worker-is-active')}
      </Checkbox>
      <div className={touched[name] && errors[name] ? cx('error-checkbox') : cx('error-none')}>{errors[name]}</div>
    </div>
  )
}

export default CheckboxForFormik
