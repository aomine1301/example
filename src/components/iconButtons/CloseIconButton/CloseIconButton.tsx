import React from 'react'
import { Tooltip } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import classNames from 'classnames/bind'
import styles from '../iconButton.scss'

const cx = classNames.bind(styles)

interface Props {
  tooltipTitle: string
  onClick: () => void
}

const CloseIconButton: React.FC<Props> = ({ tooltipTitle, onClick }: Props) => (
  <Tooltip title={tooltipTitle}>
    <button className={cx('button', 'inline-flex')} type='button' onClick={onClick}>
      <CloseOutlined className={cx('icon')} />
    </button>
  </Tooltip>
)

export default CloseIconButton
