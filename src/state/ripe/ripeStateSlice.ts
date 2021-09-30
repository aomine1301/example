import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IpRipeInterface {
  id: string
  network: string
  mask: number | string
}

export interface ItemRipeInterface {
  id: string
  name: string
  description: string
  tag: number | string
  routerMAC: string
  vlanType: 'DHCP' | 'STATIC' | 'SYSTEM'
  ips: IpRipeInterface[] | []
}

export interface StateRipeInterface {
  isRipeLoading: boolean
  isHaveFirstLoading: boolean
  ripeList: ItemRipeInterface[]
  ripeItemId: string | undefined
  isIpsListModal: boolean
}

const initialRipeState: StateRipeInterface = {
  isRipeLoading: true,
  isHaveFirstLoading: false,
  ripeList: [],
  // TODO: удалить после того как будет работать запрос ripe
  // ripeList: [
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
  //       },
  //       {
  //         id: '2',
  //         network: '2',
  //         mask: '2',
  //       },
  //       {
  //         id: '3',
  //         network: '3',
  //         mask: '3',
  //       },
  //     ],
  //   },
  // ],
  ripeItemId: undefined,
  isIpsListModal: false,
}

const vlanState = createSlice({
  name: 'vlan',
  initialState: initialRipeState,
  reducers: {
    loadingListRipeAction(state) {
      state.isRipeLoading = true
    },
    loadingListRipeSuccess(state, { payload: { ripeList } }: PayloadAction<{ ripeList: ItemRipeInterface[] }>) {
      state.ripeList = ripeList
      state.isRipeLoading = false
      state.isHaveFirstLoading = true
    },
    changeIpsModalRipeAction(state, { payload: { isIpsListModal, ripeItemId } }: PayloadAction<{ isIpsListModal: boolean; ripeItemId?: string | undefined }>) {
      state.isIpsListModal = isIpsListModal
      state.ripeItemId = ripeItemId
    },
  },
})

export const { loadingListRipeAction, loadingListRipeSuccess, changeIpsModalRipeAction } = vlanState.actions

export default vlanState.reducer
