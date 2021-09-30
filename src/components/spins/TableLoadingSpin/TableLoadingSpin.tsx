import React, { memo } from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { useAnimationTimeoutHook } from '@hooks/useAnimationTimeoutHook'
import classNames from 'classnames/bind'
import styles from './TableLoadingSpin.scss'
const cx = classNames.bind(styles)

interface Props {
  isLoading: boolean
  fontSize?: number
}

const TableLoadingSpin: React.FC<Props> = ({ isLoading, fontSize = 60 }: Props) => {
  const { isShow, isAnimation } = useAnimationTimeoutHook(isLoading)
  return (
    <div className={cx('spin-container', { 'spin-container_show': isShow, 'spin-container_animation': isAnimation })}>
      <Spin indicator={<LoadingOutlined style={{ fontSize }} spin />} />
    </div>
  )
}

export default memo(TableLoadingSpin)
