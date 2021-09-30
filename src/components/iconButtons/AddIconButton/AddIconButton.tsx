import React from 'react'
import { Tooltip } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import classNames from 'classnames/bind'
import styles from '../iconButton.scss'

const cx = classNames.bind(styles)

interface Props {
  tooltipTitle: string
  onClick: () => void
  bigSize?: boolean
}

const AddIconButton: React.FC<Props> = ({ onClick, tooltipTitle, bigSize }: Props) => (
  <Tooltip title={tooltipTitle}>
    <button className={cx('button', 'inline-flex')} type='button' onClick={onClick}>
      <PlusOutlined className={cx('icon')} style={{ fontSize: bigSize ? '24px' : '' }} />
    </button>
  </Tooltip>
)

export default AddIconButton
