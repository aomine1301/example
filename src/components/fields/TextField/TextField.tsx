import React from 'react'
import { Input } from 'antd'
import { FieldInputProps, FormikProps } from 'formik'
import classNames from 'classnames/bind'
import styles from '../fieldStyle.scss'

const cx = classNames.bind(styles)

interface Props {
  field: FieldInputProps<any>
  form: FormikProps<any>
  label: string
  type?: 'text' | string
  maxLength?: number
}

const TextField: React.FC<Props> = ({ field: { name, value, onChange, onBlur }, form: { touched, errors }, label, type = 'text', maxLength }: Props) => (
  <label className={cx('field-container')}>
    <h3 className={cx('title')}>{label}</h3>
    <Input name={name} value={value} onChange={onChange} onBlur={onBlur} type={type} maxLength={maxLength} />
    <span className={cx('error')}>{touched[name] && errors[name] && errors[name]}</span>
  </label>
)

export default TextField
