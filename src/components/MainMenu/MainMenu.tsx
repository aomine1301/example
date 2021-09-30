import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Location } from 'history'
import { AiOutlineSetting, AiFillFile } from 'react-icons/ai'
import { FaMapMarkedAlt } from 'react-icons/fa'
import { Menu } from 'antd'
const { SubMenu } = Menu
import DeviceIcon from '@svg/device.svg'
import classNames from 'classnames/bind'
import styles from './MainMenu.scss'

const cx = classNames.bind(styles)

const MainMenu: React.FC = () => {
  const { pathname } = useLocation<Location>()

  return (
    <Menu className={cx('main-menu')} style={{ width: 55 }} mode='vertical' selectedKeys={[pathname]}>
      <SubMenu key='map' icon={<FaMapMarkedAlt className={cx('map-icon')} size={32} />} />
      <SubMenu key='file' icon={<AiFillFile className={cx('file-icon')} size={32} />} />
      <SubMenu key='device' icon={<DeviceIcon className={cx('device-icon')} />} />
      <SubMenu key='setting' icon={<AiOutlineSetting className={cx('setting-icon')} size={33} />}>
        <Menu.Item key='setting-workers'>
          <Link to={'/workers'}>Работники</Link>
        </Menu.Item>
        <Menu.Item key='/ip-ripe'>
          <Link to={'/ip-ripe'}> IP в RIPE</Link>
        </Menu.Item>
        <Menu.Item key='/vlan'>
          <Link to='/vlan'>VLAN</Link>
        </Menu.Item>
        <Menu.Item key='setting-equipment '>Оборудование</Menu.Item>
      </SubMenu>
    </Menu>
  )
}

export default MainMenu
