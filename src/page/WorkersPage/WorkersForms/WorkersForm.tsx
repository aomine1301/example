import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { apiConnectAxios } from '@utils/apiConnectAxios'
import { useTranslation } from 'react-i18next'
import { DepartmentWorkersInterface, FormValuesWorkersInterface } from '@state/workers/workersStateInterfaces'
import { loadingListWorkersAction } from '@state/workers/workersStateSlice'
import { TextInput } from '@components/employeeForm/TextInput/TextInput'
import { NumberInput } from '@components/employeeForm/NumberInput/NumberInput'
import EmailInput from '@components/employeeForm/EmailInput/EmailInput'
import { PasswordInput } from '@components/employeeForm/PasswordInput/PasswordInput'
import CheckboxForFormik from '@components/employeeForm/CheckboxComponent/CheckboxComponent'
import SelectForFormik from '@components/employeeForm/SelectForFormik/SelectForFormik'
import CalendarForm from '@components/employeeForm/CalendarForm/CalendarForm'
import { UploadImageInput } from '@components/employeeForm/UploadImageInput/UploadImageInput'
import { minFieldLength } from '@utils/fieldVariables'
import { Button } from 'antd'
import SubmitButton from '@components/buttons/SubmitButton/SubmitButton'

import styles from '@page/WorkersPage/WorkersForms/WorkersForm.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface Props {
  title: string
  method: 'post' | 'put'
  onCancel: () => void
  id?: number
  initialValues: FormValuesWorkersInterface
  department: DepartmentWorkersInterface[]
}

export const WorkersForm: FC<Props> = ({ method = 'put', initialValues, title, id, department, onCancel }: Props) => {
  const dispatch = useDispatch()

  const onSubmitHandler = async (fieldValues: FormValuesWorkersInterface, { setErrors, resetForm }: FormikHelpers<FormValuesWorkersInterface>) => {
    try {
      if (method == 'put') {
        await apiConnectAxios(`employee/${id}`, method, fieldValues)
        dispatch(loadingListWorkersAction())
        onCancel()
      } else {
        await apiConnectAxios('employee', method, fieldValues)
        dispatch(loadingListWorkersAction())
        resetForm()
        onCancel()
      }
    } catch (error) {
      console.log('error', error?.response?.data?.message, error?.response?.data, error?.response)
      setErrors(error?.response?.data)
      resetForm()
    }
  }
  const { t } = useTranslation('common')
  const { t: em } = useTranslation('employee')
  const { t: e } = useTranslation('error')

  const validateSchemaEmployeeUpdate = Yup.object().shape({
    active: Yup.boolean().required(`${e('required')}`),
    name: Yup.string()
      .required(`${e('required')}`)
      .min(minFieldLength, `${e('length-less')} 4`)
      .max(12, `${e('length-more')} 12`),
    surname: Yup.string()
      .required(`${e('required')}`)
      .min(minFieldLength, `${e('length-less')} 4`)
      .max(15, `${e('length-more')} 15`),
    lastname: Yup.string()
      .required(`${e('required')}`)
      .min(minFieldLength, `${e('length-less')} 4`)
      .max(15, `${e('length-more')} 15`),
    departament_id: Yup.number().required(`${e('required')}`),
    email: Yup.string()
      .email(e('email - invalid'))
      .required(`${e('required')}`),
    login: Yup.string()
      .required(`${e('required')}`)
      .max(8, `${e('length-more')} 8`),
    birth_date: Yup.string().required(`${e('required')}`),
    personal_phone: Yup.string().required(`${e('required')}`),
    corporate_phone: Yup.string().required(`${e('required')}`),
    local_phone: Yup.string().required(`${e('required')}`),
    role: Yup.string().required(`${e('required')}`),
    avatar: Yup.string().required(`${e('required')}`),
  })

  const passwordSchema = Yup.object().shape({
    password: Yup.string()
      .required(`${e('required')}`)
      .min(8, `${e('length-less')} 8`),
  })
  const schemaValidate = method === 'post' ? validateSchemaEmployeeUpdate.concat(passwordSchema) : validateSchemaEmployeeUpdate

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmitHandler} validationSchema={schemaValidate}>
      <Form>
        <h2 className={cx('title-style')}>{title}</h2>
        <div className={cx('container')}>
          <h2>{em('employee-information')}</h2>
          <hr />
          <div className={cx('field-group-container')}>
            <Field name='name' label={t('name')} component={TextInput} />
            <Field name='surname' label={t('surname')} component={TextInput} />
            <Field name='lastname' label={t('middle name')} component={TextInput} />
          </div>
          <h2>{em('numbers-information')}</h2>
          <hr />
          <div className={cx('field-group-container')}>
            <Field name='personal_phone' label={em('personal-phone')} mask='+3(999)999-99-99' component={NumberInput} />
            <Field name='corporate_phone' label={em('corporate-phone-number')} mask='+3(999)999-99-99' component={NumberInput} />
            <Field name='local_phone' label={em('pbx-number')} mask='999' component={NumberInput} />
          </div>
          <h2>{em('login-information')}</h2>
          <hr />
          <div className={cx('field-group-container')}>
            <Field name='email' label={t('email')} component={EmailInput} />
            <Field name='login' label={t('login')} component={TextInput} />
            <Field name='password' label={t('password')} component={PasswordInput} />
          </div>
          <div>
            <Field name='active' component={CheckboxForFormik} />
          </div>
          <h2>{em('position-information')}</h2>
          <hr />
          <div className={cx('field-group-container')}>
            <Field name='departament_id' department={department} component={SelectForFormik} />
            <Field name='role' label={t('position')} component={TextInput} />
          </div>
          <h2>{em('photos-and-date')}</h2>
          <hr />
          <div className={cx('upload-container')}>
            <Field name='birth_date' label={em('date-of-birth')} component={CalendarForm} />
            <Field name='avatar' multiple={false} label={em('upload-avatar')} component={UploadImageInput} />
            <Field name='pics' multiple={true} label={em('upload-photo')} component={UploadImageInput} />
          </div>
          <div className={cx('button-container')}>
            {method === 'post' && (
              <Button className={cx('reset-button')} danger htmlType={'reset'}>
                {t('reset')}
              </Button>
            )}
            <SubmitButton buttonTitle={t('submit')} />
          </div>
        </div>
      </Form>
    </Formik>
  )
}
