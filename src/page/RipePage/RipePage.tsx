import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Table } from 'antd'
const { Column } = Table
import LoadingSpin from '@components/spins/LoadingSpin/LoadingSpin'
import TableLoadingSpin from '@components/spins/TableLoadingSpin/TableLoadingSpin'
import PageWrapper from '@components/wrappes/PageWrapper/PageWrapper'
import RipeEditColumn from './RipeEditColumn/RipeEditColumn'
import RipeItemAddButton from './RipeItemAddButton/RipeItemAddButton'
import VlanIpsListModal from './ripeForm/RipeIpsListModal/RipeIpsListModal'
import { AppStateInterface } from '@state/_store/createRootReducer'
import { IpRipeInterface, ItemRipeInterface, loadingListRipeAction } from '@state/ripe/ripeStateSlice'

import RipeIpColumn from './RipeIpColumn/RipeIpColumn'

const RipePage: React.FC = () => {
  const dispatch = useDispatch()
  const { ripeList, isRipeLoading, isHaveFirstLoading } = useSelector((state: AppStateInterface) => state.ripe)

  useEffect(() => {
    dispatch(loadingListRipeAction())
  }, [dispatch])

  const { t: r } = useTranslation('ripe')
  const { t } = useTranslation('common')
  return (
    <PageWrapper title={r('ripe-title')} titleButtonsComponent={<RipeItemAddButton />}>
      <div className='position_relative'>
        {<LoadingSpin isLoading={isRipeLoading} top={150} isHaveFirstLoading={isHaveFirstLoading} />}
        {isHaveFirstLoading && (
          <>
            <TableLoadingSpin isLoading={isRipeLoading} />
            <Table pagination={{ defaultPageSize: 20, hideOnSinglePage: true }} rowKey='id' dataSource={ripeList}>
              <Column title={t('network')} dataIndex='network' />
              <Column title={t('mask')} dataIndex='mask' />
              <Column title={t('description')} dataIndex='description' />
              <Column title={`${t('free_are')} ${t('ips')}`} dataIndex='freeIPs' />
              <Column
                title='IPS'
                dataIndex='ips'
                render={(tags: undefined, { ips, id }: { ips: IpRipeInterface[]; id: string }) => <RipeIpColumn ips={ips} ripeItemId={id} />}
              />
              <Column
                title={`${t('edit')} Vlan`}
                dataIndex='editVlan'
                render={(tags: undefined, { id, name, description, tag, routerMAC, vlanType }: ItemRipeInterface) => (
                  <RipeEditColumn fromValues={{ name, description, tag, routerMAC, vlanType }} id={id} />
                )}
              />
            </Table>
            <VlanIpsListModal />
          </>
        )}
      </div>
    </PageWrapper>
  )
}

export default RipePage
