import React, { memo } from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { useAnimationTimeoutHook } from '@hooks/useAnimationTimeoutHook'
import classNames from 'classnames/bind'
import styles from './LoadingShadowSpin.scss'
const cx = classNames.bind(styles)

interface ComponentsProps {
  isLoading: boolean
  fontSize: number
}

const LoadingShadowSpin: React.FC<ComponentsProps> = ({ isLoading, fontSize = 68 }) => {
  const { isShow, isAnimation } = useAnimationTimeoutHook(isLoading)

  return (
    <div className={cx('spin-container', { 'spin-container__show': isShow, 'spin-container__animation': isAnimation })}>
      <Spin indicator={<LoadingOutlined style={{ fontSize }} spin />} />
    </div>
  )
}

export default memo(LoadingShadowSpin)
