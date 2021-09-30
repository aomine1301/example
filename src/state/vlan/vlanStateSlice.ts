import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IpVlanInterface {
  id: string
  network: string
  mask: number | string
  gateway: string
}

export interface ItemVlanInterface {
  id: string
  name: string
  description: string
  tag: number | string
  routerMAC: string
  vlanType: 'DHCP' | 'STATIC' | 'SYSTEM'
  ips: IpVlanInterface[] | []
}

export interface StateVlanInterface {
  isVlanLoading: boolean
  isHaveFirstLoading: boolean
  vlanList: ItemVlanInterface[]
  vlanItemId: string | undefined
  isIpsListModal: boolean
}

const initialVlanState: StateVlanInterface = {
  isVlanLoading: true,
  isHaveFirstLoading: false,
  vlanList: [],
  // vlanList: [
  //   {
  //     id: '1',
  //     name: '1',
  //     description: '1',
  //     tag: '1',
  //     routerMAC: '1',
  //     vlanType: 'DHCP',
  //     ips: [
  //       {
  //         id: '1',
  //         network: '1',
  //         mask: '1',
  //         gateway: '1',
  //       },
  //       {
  //         id: '2',
  //         network: '2',
  //         mask: '2',
  //         gateway: '2',
  //       },
  //       {
  //         id: '3',
  //         network: '3',
  //         mask: '3',
  //         gateway: '3',
  //       },
  //     ],
  //   },
  // ],
  vlanItemId: undefined,
  isIpsListModal: false,
}

const vlanState = createSlice({
  name: 'vlan',
  initialState: initialVlanState,
  reducers: {
    loadingListVlanAction(state) {
      state.isVlanLoading = true
    },
    loadingListVlanSuccess(state, { payload: { vlanList } }: PayloadAction<{ vlanList: ItemVlanInterface[] }>) {
      state.vlanList = vlanList
      state.isVlanLoading = false
      state.isHaveFirstLoading = true
    },
    changeIpsModalVlanAction(state, { payload: { isIpsListModal, vlanItemId } }: PayloadAction<{ isIpsListModal: boolean; vlanItemId?: string | undefined }>) {
      state.isIpsListModal = isIpsListModal
      state.vlanItemId = vlanItemId
    },
  },
})

export const { loadingListVlanAction, loadingListVlanSuccess, changeIpsModalVlanAction } = vlanState.actions

export default vlanState.reducer
