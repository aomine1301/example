import React, { memo } from 'react'
import PageTitle from './PageTitle/PageTitle'
import classNames from 'classnames/bind'
import styles from './PageWrapper.scss'

const cx = classNames.bind(styles)

interface Props {
  title: string
  children: React.ReactNode
  titleButtonsComponent?: React.ReactNode
}

const PageWrapper: React.FC<Props> = ({ title, children, titleButtonsComponent }: Props) => (
  <div className={cx('vlan-wrapper')}>
    <PageTitle title={title} titleButtonsComponent={titleButtonsComponent} />
    {children}
  </div>
)

export default memo(PageWrapper)
