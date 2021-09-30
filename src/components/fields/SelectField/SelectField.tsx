import React from 'react'
import { Select } from 'antd'
const { Option } = Select
import { FieldInputProps, FormikProps, useField } from 'formik'
import classNames from 'classnames/bind'
import styles from '../fieldStyle.scss'

const cx = classNames.bind(styles)

interface Props {
  field: FieldInputProps<any>
  form: FormikProps<any>
  label: string
  optionList: string[]
}

const SelectField: React.FC<Props> = ({ field: { name, value, onBlur }, form: { touched, errors }, label, optionList }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [field, meta, helpers] = useField(name)
  const { setValue } = helpers

  const changeSelectHandler = (selectValue: string) => {
    setValue(selectValue)
  }

  return (
    <label className={cx('field-container')}>
      <h3 className={cx('title')}>{label}</h3>
      <Select value={value} defaultValue={optionList?.[0]} onChange={changeSelectHandler} onBlur={onBlur}>
        {optionList?.length > 0 &&
          optionList.map((option: string) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
      </Select>
      <span className={cx('error')}>{touched[name] && errors[name] && errors[name]}</span>
    </label>
  )
}

export default SelectField
