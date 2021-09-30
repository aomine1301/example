import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import '../../i18n/config'
import Header from '../Header/Header'
import MainMenu from '../MainMenu/MainMenu'
import VlanPage from 'page/VlanPage/VlanPage'
import MainPage from '@page/MainPage/MainPage'
import RipePage from '@page/RipePage/RipePage'
import ipv4YupAddMethod from '@utils/ipv4YupAddMethod'
import { getToken } from '@utils/getToken'
import 'antd/dist/antd.less'
import './reset.css'
import classNames from 'classnames/bind'
import styles from './globalStyle.scss'
import WorkersPage from '@page/WorkersPage/WorkersPage'

const cx = classNames.bind(styles)

const Root: React.FC = () => {
  getToken()
  ipv4YupAddMethod
  return (
    <>
      <Header />
      <div className={cx('menu-wrapper')}>
        <MainMenu />
        <Switch>
          <Route path='/vlan' component={VlanPage} />
          <Route path='/ip-ripe' component={RipePage} />
          <Route path='/workers' component={WorkersPage} />
          <Route exact path='/' component={MainPage} />
          <Redirect to='/' />
        </Switch>
      </div>
    </>
  )
}

export default Root
