import React from 'react'
import { CloseOutlined } from '@ant-design/icons'
import PopconfirmWrapper from '@components/PopconfirmWrapper/PopconfirmWrapper'
import classNames from 'classnames/bind'
import styles from '../iconButton.scss'

const cx = classNames.bind(styles)

interface Props {
  onConfirm: () => void
  popconfirmTitle: string
}

const DeleteIconButton: React.FC<Props> = ({ onConfirm, popconfirmTitle }: Props) => (
  <PopconfirmWrapper onConfirm={onConfirm} title={popconfirmTitle}>
    <button className={cx('button', 'inline-flex')} type='button'>
      <CloseOutlined className={cx('icon')} style={{ color: '#F44336' }} />
    </button>
  </PopconfirmWrapper>
)

export default DeleteIconButton
