import React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './Header.scss'
import logo from '@img/logo.png'

const cx = classNames.bind(styles)

const Header: React.FC = () => (
  <header className={cx('header')}>
    <Link to='/'>
      <img className={cx('logo')} src={logo} alt='' />
    </Link>
  </header>
)

export default Header
