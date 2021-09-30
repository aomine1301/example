import React from 'react'
import EditIcon from '@svg/edit.svg'
import classNames from 'classnames/bind'
import styles from '../iconButton.scss'
import { Tooltip } from 'antd'

const cx = classNames.bind(styles)

interface Props {
  tooltipTitle: string
  onClick: () => void
}

const EditIconButton: React.FC<Props> = ({ onClick, tooltipTitle }: Props) => (
  <Tooltip title={tooltipTitle}>
    <button className={cx('button', 'inline-flex')} type='button' onClick={onClick}>
      <EditIcon style={{ with: '15px', height: '15px' }} />
    </button>
  </Tooltip>
)

export default EditIconButton
