import React, { FC } from 'react'
import { Calendar, Modal } from 'antd'
import { useTranslation } from 'react-i18next'
import { ImCalendar } from 'react-icons/im'
import moment, { Moment } from 'moment'
import { FieldInputProps, FormikProps, useField } from 'formik'
import { DateToMySQL } from '@utils/convertDateToBackend'

import styles from '@page/WorkersPage/WorkersForms/WorkersForm.scss'
import classNames from 'classnames/bind'
import { useModalVisibleHook } from '@hooks/useModalVisibleHook'

const cx = classNames.bind(styles)

interface Props {
  field: FieldInputProps<any>
  form: FormikProps<any>
  label: string
}

const CalendarForm: FC<Props> = ({ field: { name, value }, form: { touched, errors }, label }: Props) => {
  const { isModalVisible, onOpenHandler, onCloseHandler } = useModalVisibleHook()
  const [, , { setValue, setTouched }] = useField<string>(name)
  const okHandler = () => {
    if (value) {
      onCloseHandler()
    }
  }

  const onChangeMomentHandler = (moment: Moment) => {
    setTouched(true)
    setValue(DateToMySQL(moment.toDate()))
  }

  const { t } = useTranslation('common')
  return (
    <div className={cx('dropzone-container')}>
      <label className={cx('calendar-label')} htmlFor={label}>
        {label}
      </label>
      <button type='button' className={cx('calendar-button')} onClick={onOpenHandler}>
        <ImCalendar size={30} />
        {touched[name] && errors[name] ? <div className={touched[name] && errors[name] ? cx('error-calendar') : cx('error-none')}>{errors[name]}</div> : null}
      </button>
      <Modal visible={isModalVisible} width={400} centered={true} onCancel={onCloseHandler} cancelText={t('cancel')} okText={t('add')} onOk={okHandler}>
        <Calendar
          className={cx('calendar-container')}
          style={{ marginTop: '20px' }}
          fullscreen={false}
          validRange={[moment('1970', 'YYYY'), moment('2030', 'YYYY')]}
          onChange={onChangeMomentHandler}
        />
      </Modal>
    </div>
  )
}

export default CalendarForm
