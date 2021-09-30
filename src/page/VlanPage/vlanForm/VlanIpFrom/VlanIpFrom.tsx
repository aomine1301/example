import React from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import * as yup from 'yup'
import NumberField from '@components/fields/NumberField/NumberField'
import SubmitButton from '@components/buttons/SubmitButton/SubmitButton'
import IpField from '@components/fields/IpField/IpField'
import ModalTitle from '@components/titles/ModalTitle/ModalTitle'
import { loadingListVlanAction } from '@state/vlan/vlanStateSlice'
import { apiConnectAxios } from '@utils/apiConnectAxios'

export interface IpFormValuesVlanInterface {
  network: string
  mask: number | string
  gateway: string
}

const initialFromValues: IpFormValuesVlanInterface = {
  network: '',
  mask: '',
  gateway: '',
}

interface Props {
  title: string
  method?: 'post' | 'put'
  fromValues?: IpFormValuesVlanInterface
  id: string
  onCloseHandler: () => void
}

const VlanIpFrom: React.FC<Props> = ({ method = 'post', fromValues, title, id, onCloseHandler }: Props) => {
  const dispatch = useDispatch()

  const initialValues: IpFormValuesVlanInterface = fromValues ? fromValues : initialFromValues

  const onSubmitHandler = async ({ network, mask, gateway }: IpFormValuesVlanInterface, { setErrors }: FormikHelpers<IpFormValuesVlanInterface>) => {
    try {
      await apiConnectAxios(`vlans/IP/${id}`, method, { network, mask, gateway })
      onCloseHandler()
      dispatch(loadingListVlanAction())
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    gateway: yup.string().ipv4(e('ip-invalid'), e('ip-value')),
  })

  const { t } = useTranslation('common')
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmitHandler} validationSchema={validationSchema}>
      <Form className='direction_column' autoComplete='off'>
        <ModalTitle title={title} />
        <Field name='network' label={t('network')} component={IpField} />
        <Field name='mask' label={t('mask')} component={NumberField} maxLength={2} />
        <Field name='gateway' label={t('gateway')} component={IpField} />
        <SubmitButton buttonTitle={t(method === 'post' ? 'create' : 'edit')} />
      </Form>
    </Formik>
  )
}

export default VlanIpFrom
