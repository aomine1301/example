import React, { FC } from 'react'
import { Formik, Form, FormikHelpers, Field } from 'formik'
import * as Yup from 'yup'
import classNames from 'classnames/bind'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { loadingListDepartmentWorkersAction } from '@state/workers/workersStateSlice'
import { minFieldLength } from '@utils/fieldVariables'
import { apiConnectAxios } from '@utils/apiConnectAxios'
import TextField from '@components/fields/TextField/TextField'
import SubmitButton from '@components/buttons/SubmitButton/SubmitButton'

import styles from '@page/WorkersPage/WorkersForms/WorkersForm.scss'
const cx = classNames.bind(styles)

interface FormValuesInterface {
  name: string
}
interface Props {
  title: () => void
  functionName: string
  method: 'post' | 'put'
  initialValues: FormValuesInterface
  onCancel: () => void
}

export const WorkersAddDepartmentForm: FC<Props> = ({ method, initialValues, title, functionName, onCancel }: Props) => {
  const dispatch = useDispatch()
  const { t } = useTranslation('common')
  const { t: e } = useTranslation('error')

  const onSubmitHandler = async ({ name }: FormValuesInterface, { setErrors }: FormikHelpers<FormValuesInterface>) => {
    try {
      await apiConnectAxios(functionName, method, { name })
      dispatch(loadingListDepartmentWorkersAction())
      onCancel()
    } catch (error) {
      console.log('error', error?.response?.data?.message, error?.response?.data, error?.response)
      setErrors(error?.response?.data)
    }
  }

  const validateSchemaDepartment = Yup.object().shape({
    name: Yup.string()
      .required(`${e('required')}`)
      .min(minFieldLength, `${e('length-less')} 4`)
      .max(12, `${e('length-more')} 12`),
  })

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmitHandler} validationSchema={validateSchemaDepartment}>
      <Form>
        <div>
          <h2 className={cx('title-style')}>{title}</h2>
          <div>
            <Field name='name' label={t('name')} component={TextField} />
          </div>
          <SubmitButton buttonTitle={t('submit')} />
        </div>
      </Form>
    </Formik>
  )
}
