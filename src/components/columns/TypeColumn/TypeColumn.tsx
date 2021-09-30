import React from 'react'
import classNames from 'classnames/bind'
import styles from './TypeColumn.scss'

const cx = classNames.bind(styles)

interface Props {
  title: string
  titleNamesArr: string[]
}

const TypeColumn: React.FC<Props> = ({ title, titleNamesArr }: Props) => {
  return (
    <div
      className={cx('column', {
        column_red: titleNamesArr?.[0] === title,
        column_green: titleNamesArr?.[1] === title,
        column_blue: titleNamesArr?.[2] === title,
      })}
    >
      {title}
    </div>
  )
}

export default TypeColumn
