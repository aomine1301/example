import React, { FC } from 'react'
import classNames from 'classnames/bind'
import styles from '../iconButton.scss'
import { Tooltip } from 'antd'
import { HiUserGroup } from 'react-icons/hi'

const cx = classNames.bind(styles)

interface Props {
  tooltipTitle: string
  onClick: () => void
  bigSize?: boolean
}

const DepartmentButton: FC<Props> = ({ onClick, tooltipTitle, bigSize }: Props) => {
  return (
    <Tooltip title={tooltipTitle}>
      <button className={cx('button', 'inline-flex')} type='button' onClick={onClick}>
        <HiUserGroup className={cx('icon')} style={{ fontSize: bigSize ? '24px' : '' }} />
      </button>
    </Tooltip>
  )
}

export default DepartmentButton
