import React, { FC } from 'react'

import { FieldInputProps, FormikProps, useField } from 'formik'
import { Input } from 'antd'
import { encode as base64_encode, decode as base64_decode } from 'base-64'
import { FaLock } from 'react-icons/fa'
import OnCancel from '@svg/cancel1.svg'
import classNames from 'classnames/bind'
import styles from '@page/WorkersPage/WorkersForms/WorkersForm.scss'

const cx = classNames.bind(styles)

interface Props {
  field: FieldInputProps<any>
  form: FormikProps<any>
  label: string
}

export const PasswordInput: FC<Props> = ({ field: { name, value, onBlur }, form: { touched, errors }, label }: Props) => {
  const [{}, {}, { setValue }] = useField<string>(name)
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(base64_encode(e.currentTarget.value))
  }
  return (
    <div className={cx('flex-form')}>
      <div className={cx('label-input')}>
        <label htmlFor={name}>{label}</label>
        <Input.Password
          name={name}
          value={base64_decode(value)}
          onChange={onChangeHandler}
          onBlur={onBlur}
          prefix={<FaLock size={25} />}
          suffix={touched[name] && errors[name] ? <OnCancel /> : null}
        />
      </div>
      <div className={touched[name] && errors[name] ? cx('error') : cx('error-none')}>{errors[name]}</div>
    </div>
  )
}
