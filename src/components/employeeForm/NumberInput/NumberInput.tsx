import React, { FC } from 'react'
import InputMask from 'react-input-mask'
import { FieldInputProps, FormikProps, useField } from 'formik'
import { Input } from 'antd'
import { ImPhone } from 'react-icons/im'
import OnCancel from '@svg/cancel1.svg'

import classNames from 'classnames/bind'
import styles from '@page/WorkersPage/WorkersForms/WorkersForm.scss'

const cx = classNames.bind(styles)

interface Props {
  field: FieldInputProps<any>
  form: FormikProps<any>
  label: string
  width?: string
  mask: string
}

export const NumberInput: FC<Props> = ({ field: { name, value, onBlur }, form: { touched, errors }, label, width, mask }: Props) => {
  const [{}, {}, { setValue }] = useField<string>(name)
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.validity?.valid) {
      const valueInputNumber = event.target.value.replace(/[()]/g, '').replace(/[+]/g, '').replace(/[-]/g, '')
      setValue(valueInputNumber)
    }
  }
  return (
    <div className={cx('flex-form')}>
      <div className={cx('label-input')}>
        <label htmlFor={name}>
          <span>{label}</span>
          <InputMask name={name} mask={mask} width={width} value={value} onBlur={onBlur} onChange={onChangeHandler}>
            {(inputProps: any) => <Input {...inputProps} prefix={<ImPhone size={25} />} suffix={touched[name] && errors[name] ? <OnCancel /> : null} />}
          </InputMask>
          <div className={touched[name] && errors[name] ? cx('error') : cx('error-none')}>{errors[name]}</div>
        </label>
      </div>
    </div>
  )
}
