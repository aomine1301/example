import React, { FC } from 'react'
import { FieldInputProps, FormikProps, useField } from 'formik'
import { Input } from 'antd'
import OnCancel from '@svg/cancel1.svg'
import { IoMdMail } from 'react-icons/io'
import classNames from 'classnames/bind'
import styles from '@page/WorkersPage/WorkersForms/WorkersForm.scss'
const cx = classNames.bind(styles)

interface Props {
  field: FieldInputProps<any>
  form: FormikProps<any>
  label: string
  width?: string
}

const EmailInput: FC<Props> = ({ field: { name, value, onBlur }, form: { touched, errors }, label }: Props) => {
  const [{}, {}, { setValue }] = useField<string>(name)
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.validity?.valid) setValue(event?.target?.value)
  }
  return (
    <div className={cx('flex-form')}>
      <div className={cx('label-input')}>
        <label htmlFor={name}>{label}</label>
        <Input
          name={name}
          type={'text'}
          onBlur={onBlur}
          value={value}
          onChange={onChangeHandler}
          prefix={<IoMdMail size={25} />}
          suffix={touched[name] && errors[name] ? <OnCancel /> : null}
          pattern='[a-z,0-9,@,.,a-z]*'
        />
      </div>
      <div className={touched[name] && errors[name] ? cx('error') : cx('error-none')}>{errors[name]}</div>
    </div>
  )
}

export default EmailInput
