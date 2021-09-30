import React, { memo } from 'react'
import { Button } from 'antd'
import classNames from 'classnames/bind'
import styles from './SubmitButton.scss'

const cx = classNames.bind(styles)

interface Props {
  buttonTitle: string
}

const SubmitButton: React.FC<Props> = ({ buttonTitle }: Props) => (
  <Button className={cx('button')} htmlType='submit' type='primary'>
    {buttonTitle}
  </Button>
)

export default memo(SubmitButton)
