import React, { FC } from 'react'

import { FieldInputProps, FormikProps } from 'formik'
import { Input } from 'antd'
import { BsFillPersonFill } from 'react-icons/bs'
import OnCancel from '@svg/cancel1.svg'
import classNames from 'classnames/bind'
import styles from '@page/WorkersPage/WorkersForms/WorkersForm.scss'

const cx = classNames.bind(styles)

interface Props {
  field: FieldInputProps<any>
  form: FormikProps<any>
  label: string
  type: string
}

export const TextInput: FC<Props> = ({ field: { name, value, onChange, onBlur }, form: { touched, errors }, label, type = 'text' }: Props) => {
  return (
    <div className={cx('flex-form')}>
      <div className={cx('label-input')}>
        <label htmlFor={name}>{label}</label>
        <Input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          prefix={<BsFillPersonFill size={25} />}
          suffix={touched[name] && errors[name] ? <OnCancel /> : null}
        />
      </div>
      <div className={touched[name] && errors[name] ? cx('error') : cx('error-none')}>{errors[name]}</div>
    </div>
  )
}
