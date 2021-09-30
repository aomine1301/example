import React from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import * as yup from 'yup'
import NumberField from '@components/fields/NumberField/NumberField'
import SubmitButton from '@components/buttons/SubmitButton/SubmitButton'
import IpField from '@components/fields/IpField/IpField'
import ModalTitle from '@components/titles/ModalTitle/ModalTitle'
import { loadingListRipeAction } from '@state/ripe/ripeStateSlice'
import { apiConnectAxios } from '@utils/apiConnectAxios'

export interface IpFormValuesRipeInterface {
  network: string
  mask: number | string
}

const initialFromValues: IpFormValuesRipeInterface = {
  network: '',
  mask: '',
}

interface Props {
  title: string
  method?: 'post' | 'put'
  fromValues?: IpFormValuesRipeInterface
  id: string
  onCloseHandler: () => void
}

const RipeIpFrom: React.FC<Props> = ({ method = 'post', fromValues, title, id, onCloseHandler }: Props) => {
  const dispatch = useDispatch()

  const initialValues: IpFormValuesRipeInterface = fromValues ? fromValues : initialFromValues

  const onSubmitHandler = async ({ network, mask }: IpFormValuesRipeInterface, { setErrors }: FormikHelpers<IpFormValuesRipeInterface>) => {
    try {
      await apiConnectAxios(`ripe/IP/${id}`, method, { network, mask })
      onCloseHandler()
      dispatch(loadingListRipeAction())
    } catch (error) {
      setErrors(error?.response?.data)
    }
  }

  const { t: e } = useTranslation('error')

  const validationSchema = yup.object().shape({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    network: yup.string().required(e('required')).ipv4(e('ip-invalid'), e('ip-value')),
    mask: yup
      .number()
      .required(e('required'))
      .max(32, `${e('value-more')} 32`),
  })

  const { t } = useTranslation('common')
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmitHandler} validationSchema={validationSchema}>
      <Form className='direction_column' autoComplete='off'>
        <ModalTitle title={title} />
        <Field name='network' label={t('network')} component={IpField} />
        <Field name='mask' label={t('mask')} component={NumberField} maxLength={2} />
        <SubmitButton buttonTitle={t(method === 'post' ? 'create' : 'edit')} />
      </Form>
    </Formik>
  )
}

export default RipeIpFrom
