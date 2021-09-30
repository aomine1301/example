import React, { memo } from 'react'
import classNames from 'classnames/bind'
import styles from './ModalTitle.scss'

const cx = classNames.bind(styles)

interface Props {
  title: string
}

const ModalTitle: React.FC<Props> = ({ title }: Props) => (
  <>
    <h2 className={cx('title')}>{title}</h2>
  </>
)

export default memo(ModalTitle)
