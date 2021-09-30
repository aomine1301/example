import React from 'react'
import { useDispatch } from 'react-redux'
import EditIconButton from '@components/iconButtons/EditIconButton/EditIconButton'
import { changeIpsModalVlanAction, IpVlanInterface } from '@state/vlan/vlanStateSlice'
import classNames from 'classnames/bind'
import styles from './VlanIpColumn.scss'
import { useTranslation } from 'react-i18next'

const cx = classNames.bind(styles)

interface Props {
  ips: IpVlanInterface[] | []
  vlanItemId: string
}

const VlanIpColumn: React.FC<Props> = ({ ips, vlanItemId }: Props) => {
  const dispatch = useDispatch()
  const onOpenListHandler = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(changeIpsModalVlanAction({ isIpsModal: true, vlanItemId }))
  }

  const { t } = useTranslation('common')
  return (
    <>
      {ips?.length > 0 && (
        <div className='flex'>
          <div className='direction_column'>
            {ips?.map(({ id, network, mask, gateway }: IpVlanInterface) => (
              <div key={id}>{`${network}/${mask} ${gateway ? `gw: ${gateway}` : ''}`}</div>
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

export default VlanIpColumn
