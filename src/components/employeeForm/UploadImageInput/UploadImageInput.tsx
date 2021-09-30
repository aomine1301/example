import React, { FC } from 'react'
import Dropzone from 'react-dropzone'
import { FiUpload } from 'react-icons/fi'
import { IconContext } from 'react-icons'
import { FieldInputProps, FormikProps, useField } from 'formik'
import styles from '@page/WorkersPage/WorkersForms/WorkersForm.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface Props {
  field: FieldInputProps<any>
  form: FormikProps<any>
  multiple: boolean
  label: string
}

export const UploadImageInput: FC<Props> = ({ field: { name, onBlur }, form: { touched, errors }, label, multiple }: Props) => {
  const [, meta, { setValue, setTouched }] = useField<File[] | string>(name)
  const arr: File[] | string = []
  const loadFile = (files: File[]) => {
    files.map((file: File) => {
      const fr = new FileReader()
      fr.onload = (e: ProgressEvent<FileReader>) => {
        const image: FileReader | any = e?.currentTarget
        arr.push(image?.result)
        setValue([...arr])
        if (arr.length === 1) {
          const [value] = arr
          return setValue(value.toString())
        }
      }
      fr.readAsDataURL(file)
      return null
    })
  }
  const changeSetTouchedHandler = () => {
    setTouched((meta.touched = true))
  }
  return (
    <div className={cx('dropzone-container')}>
      <label htmlFor={label}>{label}</label>
      <Dropzone accept='image/*' onDrop={(acceptedFiles) => loadFile(acceptedFiles)} onDragEnter={changeSetTouchedHandler}>
        {({ getRootProps, getInputProps, acceptedFiles }) => (
          <>
            <div {...getRootProps({ className: 'dropzone' })}>
              <IconContext.Provider value={{ className: cx('img-upload') }}>
                <div className={cx('img-avatar-upload')}>
                  <FiUpload size={30} />
                </div>
              </IconContext.Provider>
              <input name={name} {...getInputProps()} multiple={multiple} onBlur={onBlur} />
            </div>
            {acceptedFiles.length > 0 ? null : (
              <div
                className={
                  touched[name] && errors[name]
                    ? cx({ 'error-upload': multiple || name === 'avatar' }, { 'error-upload-multiple': multiple || name === 'pics' })
                    : cx('error-none')
                }
              >
                {errors[name]}
              </div>
            )}
            <div className={cx(multiple ? 'avatar-block' : 'avatar-block-multiple')}>
              <ul className={cx(multiple ? 'pics-upload-container' : 'avatar-upload-container')}>
                {acceptedFiles.map((file: File) => (
                  <li key={file?.lastModified}>{file?.name}</li>
                ))}
              </ul>
            </div>
          </>
        )}
      </Dropzone>
    </div>
  )
}
