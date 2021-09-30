import React, { memo } from 'react'
import { Helmet } from 'react-helmet-async'
import classNames from 'classnames/bind'
import styles from './PageTitle.scss'

const cx = classNames.bind(styles)

interface Props {
  title: string
  titleButtonsComponent?: React.ReactNode
}

const PageTitle: React.FC<Props> = ({ title, titleButtonsComponent }: Props) => (
  <>
    <Helmet>
      <title>{title}</title>
    </Helmet>
    <div className={cx('align-items_center')}>
      <h1 className={cx('title')}>{title}</h1>
      {titleButtonsComponent}
    </div>
  </>
)

export default memo(PageTitle)
