import React, { useState } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { Input, Tooltip } from 'antd'
const { Search } = Input
import CloseIconButton from '../CloseIconButton/CloseIconButton'
import classNames from 'classnames/bind'
import styles from './SearchIconButton.scss'
import { useTranslation } from 'react-i18next'

const cx = classNames.bind(styles)

interface Props {
  onClick?: () => void
}

const SearchIconButton: React.FC<Props> = ({ onClick }: Props) => {
  const [isSearchShow, setSearchShow] = useState<boolean>(false)

  const showSearchHandler = () => {
    setSearchShow(true)
  }

  const hideSearchHandler = () => {
    setSearchShow(false)
  }

  const { t } = useTranslation('common')
  return (
    <>
      <button className={cx('button', 'inline-flex')} type='button' onClick={onClick}>
        {!isSearchShow && (
          <Tooltip title={t('open-search')}>
            <SearchOutlined className={cx('icon')} onClick={showSearchHandler} />
          </Tooltip>
        )}
      </button>
      {isSearchShow && (
        <div className={cx('align-items_center')}>
          <Search placeholder='search...' className={cx('search-input')} enterButton />
          <CloseIconButton onClick={hideSearchHandler} tooltipTitle={t('close-search')} />
        </div>
      )}
    </>
  )
}

export default SearchIconButton
