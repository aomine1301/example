import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Table } from 'antd'
const { Column } = Table
import LoadingSpin from '@components/spins/LoadingSpin/LoadingSpin'
import TableLoadingSpin from '@components/spins/TableLoadingSpin/TableLoadingSpin'
import PageWrapper from '@components/wrappes/PageWrapper/PageWrapper'
import VlanEditColumn from './VlanEditColumn/VlanEditColumn'
import VlanIpColumn from './VlanIpColumn/VlanIpColumn'
import VlanIpsListModal from './vlanForm/VlanIpsListModal/VlanIpsListModal'
import VlanTitleButtons from './VlanTitleButtons/VlanTitleButtons'
import TypeColumn from '@components/columns/TypeColumn/TypeColumn'
import { AppStateInterface } from '@state/_store/createRootReducer'
import { IpVlanInterface, ItemVlanInterface, loadingListVlanAction } from '@state/vlan/vlanStateSlice'

const VlanPage: React.FC = () => {
  const dispatch = useDispatch()
  const { vlanList, isVlanLoading, isHaveFirstLoading } = useSelector((state: AppStateInterface) => state.vlan)

  useEffect(() => {
    dispatch(loadingListVlanAction())
  }, [dispatch])

  const { t } = useTranslation('common')
  return (
    <PageWrapper title={`${t('virtual-networks')} VLAN`} titleButtonsComponent={<VlanTitleButtons />}>
      <div className='position_relative'>
        {<LoadingSpin isLoading={isVlanLoading} top={150} isHaveFirstLoading={isHaveFirstLoading} />}
        {isHaveFirstLoading && (
          <>
            <TableLoadingSpin isLoading={isVlanLoading} />
            <Table pagination={{ defaultPageSize: 20, hideOnSinglePage: true }} rowKey='id' dataSource={vlanList}>
              <Column title={t('name')} dataIndex='name' />
              <Column title={t('description')} dataIndex='description' />
              <Column title={t('tag')} dataIndex='tag' />
              <Column title={t('router-mac')} dataIndex='routerMAC' />
              <Column
                title={`VLAN ${t('type')}`}
                key='vlanType'
                render={({ vlanType }: { vlanType: 'DHCP' | 'STATIC' | 'SYSTEM' }) => (
                  <TypeColumn titleNamesArr={['DHCP', 'STATIC', 'SYSTEM']} title={vlanType} />
                )}
              />
              <Column title={t('ips')} key='ips' render={({ ips, id }: { ips: IpVlanInterface[]; id: string }) => <VlanIpColumn ips={ips} vlanItemId={id} />} />
              <Column
                title={t('action')}
                key='editVlan'
                render={({ id, name, description, tag, routerMAC, vlanType }: ItemVlanInterface) => (
                  <VlanEditColumn fromValues={{ name, description, tag, routerMAC, vlanType }} id={id} />
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

export default VlanPage
