import React, { FC, memo } from 'react'
import { Tag } from 'antd'
import { useTranslation } from 'react-i18next'
import { AiOutlineMail } from 'react-icons/ai'
import { IoMdPhonePortrait } from 'react-icons/io'
import { ImPhone } from 'react-icons/im'
import { DepartmentWorkersInterface } from '@state/workers/workersStateInterfaces'
import LoginIcon from '@svg/login.svg'
import PhoneHomeIcon from '@svg/phone-home.svg'
import UserIcon from '@img/user.png'

import classNames from 'classnames/bind'
import styles from '@page/WorkersPage/WorkersPage.scss'

const cx = classNames.bind(styles)

interface AvatarInterface {
  avatar: string | null
}
interface NameFieldInterface {
  name: string
  surname: string
  lastname: string
  department: DepartmentWorkersInterface
}
interface LoginEmailTableTitleInterface {
  login: string
  email: string
  active: boolean
}
interface TelInterface {
  corporate_phone: string
  local_phone: string
  personal_phone: string
}

const WorkersNameFieldColumn: FC<NameFieldInterface> = ({ name, surname, lastname, department }: NameFieldInterface) => (
  <>
    <div className={classNames(cx('name-field'))}>{`${name} ${surname} ${lastname}`}</div>
    <div>{department?.name}</div>
  </>
)

const WorkersAvatarColumn: FC<AvatarInterface> = ({ avatar }: AvatarInterface) => (
  <div className={cx('column-container')}>
    <img className={cx('avatar-image')} src={avatar ? avatar : UserIcon} alt='avatar' />
  </div>
)
const WorkersLoginEmailColumn: FC<LoginEmailTableTitleInterface> = ({ active, email, login }: LoginEmailTableTitleInterface) => (
  <>
    <div className={cx('column-container')}>
      <LoginIcon />
      {active ? (
        <Tag className={cx('margin-field')} color='green'>
          {login}
        </Tag>
      ) : (
        <Tag className={cx('margin-field')} color='red'>
          {login}
        </Tag>
      )}
    </div>
    <div className={cx('column-container')}>
      <AiOutlineMail size={20} />
      <div className={cx('margin-field')}>{email}</div>
    </div>
  </>
)

const WorkersTelColumn: FC<TelInterface> = ({ personal_phone, corporate_phone, local_phone }: TelInterface) => {
  const { t } = useTranslation('common')
  return (
    <>
      <div className={cx('column-container')}>
        <IoMdPhonePortrait size={20} />
        <div className={classNames(cx('tel-style-cursive', 'margin-field'))}>{personal_phone ? personal_phone : t('not indicated')}</div>
      </div>
      <div className={cx('column-container')}>
        <PhoneHomeIcon size={20} />
        <div className={classNames(cx('tel-style-cursive', 'margin-field'))}>{corporate_phone ? corporate_phone : t('not indicated')}</div>
      </div>
      <div className={cx('column-container')}>
        <ImPhone size={20} />
        <div className={classNames(cx('tel-style-cursive', 'margin-field'))}>{local_phone ? local_phone : t('not indicated')}</div>
      </div>
    </>
  )
}
const WorkersNameFieldColumnMemo = memo(WorkersNameFieldColumn)
const WorkersAvatarColumnMemo = memo(WorkersAvatarColumn)
const WorkersLoginEmailColumnMemo = memo(WorkersLoginEmailColumn)
const WorkersTelColumnMemo = memo(WorkersTelColumn)

export { WorkersNameFieldColumnMemo, WorkersAvatarColumnMemo, WorkersLoginEmailColumnMemo, WorkersTelColumnMemo }
