import React from 'react'
import { Helmet } from 'react-helmet-async'
import classNames from 'classnames/bind'
import styles from './MainPage.scss'

const cx = classNames.bind(styles)

const MainPage: React.FC = () => (
  <>
    <Helmet>
      <title>Основная рабочая панель</title>
    </Helmet>
    <h1 className={cx('title')}>Основная рабочая панел</h1>
  </>
)

export default MainPage
