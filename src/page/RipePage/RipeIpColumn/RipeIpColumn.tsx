import React from 'react'
import { useDispatch } from 'react-redux'
import EditIconButton from '@components/iconButtons/EditIconButton/EditIconButton'
import { changeIpsModalRipeAction, IpRipeInterface } from '@state/ripe/ripeStateSlice'
import classNames from 'classnames/bind'
import styles from './RipeIpColumn.scss'
import { useTranslation } from 'react-i18next'

const cx = classNames.bind(styles)

interface Props {
  ips: IpRipeInterface[] | []
  ripeItemId: string
}

const RipeIpColumn: React.FC<Props> = ({ ips, ripeItemId }: Props) => {
  const dispatch = useDispatch()
  const onOpenListHandler = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(changeIpsModalRipeAction({ isIpsModal: true, ripeItemId }))
  }

  const { t } = useTranslation('common')
  return (
    <>
      {ips?.length > 0 && (
        <div className='flex'>
          <div className='direction_column'>
            {ips?.map(({ id, network, mask }: IpRipeInterface) => (
              <div key={id}>{`${network}/${mask}`}</div>
            ))}
          </div>
          <div className={cx('button-wrapper')}>
            <EditIconButton onClick={onOpenListHandler} tooltipTitle={`${t('edit')} ${t('ips')}`} />
          </div>
        </div>
      )}
    </>
  )
}

export default RipeIpColumn
