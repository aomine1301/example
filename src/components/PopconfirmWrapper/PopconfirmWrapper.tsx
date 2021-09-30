import Popconfirm from 'antd/lib/popconfirm'
import React from 'react'
import classNames from 'classnames/bind'
import styles from './PopconfirmWrapper.scss'
import { useTranslation } from 'react-i18next'

const cx = classNames.bind(styles)

interface Props {
  title: string
  children: React.ReactNode
  onConfirm: () => void
}
const style = { fontSize: 17, marginLeft: 12, height: '100%', padding: '0 10px' }
const PopconfirmWrapper: React.FC<Props> = ({ title = 'элемент', onConfirm, children }: Props) => {
  const { t } = useTranslation('common')
  return (
    <Popconfirm
      className={cx('popover-wrapper')}
      placement='topRight'
      title={`${t('delete-item')} ${title}`}
      onConfirm={onConfirm}
      okText={t('yes')}
      cancelText={t('no')}
      cancelButtonProps={{ style }}
      okButtonProps={{ style }}
    >
      <span>{children}</span>
    </Popconfirm>
  )
}

export default PopconfirmWrapper
