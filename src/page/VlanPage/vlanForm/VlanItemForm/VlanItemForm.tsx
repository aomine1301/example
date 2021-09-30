import React from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import * as yup from 'yup'
import TextField from '@components/fields/TextField/TextField'
import NumberField from '@components/fields/NumberField/NumberField'
import SelectField from '@components/fields/SelectField/SelectField'
import SubmitButton from '@components/buttons/SubmitButton/SubmitButton'
import ModalTitle from '@components/titles/ModalTitle/ModalTitle'
import { loadingListRipeAction } from '@state/ripe/ripeStateSlice'
import { loadingListVlanAction } from '@state/vlan/vlanStateSlice'
import { apiConnectAxios } from '@utils/apiConnectAxios'
import { minFieldLength } from '@utils/fieldVariables'
import classNames from 'classnames/bind'
import styles from './VlanItemForm.scss'

const cx = classNames.bind(styles)

export interface FormValuesVlanInterface {
  name: string
  description: string
  tag: number | string
  routerMAC: string
  vlanType: 'DHCP' | 'STATIC' | 'SYSTEM'
}

interface Props {
  title: string
  method?: 'post' | 'put'
  fromValues?: FormValuesVlanInterface
  id?: string
  onCloseHandler: () => void
  isRipeFrom?: boolean
}

const initialFromValues: FormValuesVlanInterface = {
  name: '',
  description: '',
  tag: '',
  routerMAC: '',
  vlanType: 'DHCP',
}

const VlanItemForm: React.FC<Props> = ({ title, method = 'post', fromValues, id, onCloseHandler, isRipeFrom }: Props) => {
  const dispatch = useDispatch()

  const initialValues: FormValuesVlanInterface = fromValues ? fromValues : initialFromValues

  const onSubmitHandler = async (fieldValues: FormValuesVlanInterface, { setErrors }: FormikHelpers<FormValuesVlanInterface>) => {
    try {
      if (!isRipeFrom) {
        const functionName = id ? `vlans/${id}` : 'vlans'
        await apiConnectAxios(functionName, method, fieldValues)
        onCloseHandler()
        dispatch(loadingListVlanAction())
      } else {
        const functionName = id ? `ripe/${id}` : 'ripe'
        await apiConnectAxios(functionName, method, fieldValues)
        onCloseHandler()
        dispatch(loadingListRipeAction())
      }
    } catch (error) {
      setErrors(error?.response?.data)
    }
  }

  const { t: e } = useTranslation('error')
  const validationSchema = yup.object().shape({
    name: yup.string().required(e('required')).min(minFieldLength, e('length-less-4')),
    description: yup.string(),
    vlanType: yup.string(),
    tag: yup.number().lessThan(4097, `${e('value-less')} 4097`),
    routerMAC: yup.string().min(12, `${e('length-less')} 12`),
  })

  const { t } = useTranslation('common')
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmitHandler} validationSchema={validationSchema}>
      <Form className={cx('direction_column')} autoComplete='off'>
        <ModalTitle title={title} />
        <Field name='name' label={t('name')} component={TextField} />
        <Field name='description' label={t('description')} component={TextField} />
        <div className={cx('field-wrapper')}>
          <Field name='tag' label={t('tag')} component={NumberField} maxLength={4} />
          <Field name='vlanType' label={`VLAN ${t('tag')}`} optionList={['DHCP', 'STATIC', 'SYSTEM']} component={SelectField} />
        </div>
        <Field name='routerMAC' label={t('router-mac')} component={TextField} maxLength={12} />
        <SubmitButton buttonTitle={t(method === 'post' ? 'create' : 'edit')} />
      </Form>
    </Formik>
  )
}

export default VlanItemForm
