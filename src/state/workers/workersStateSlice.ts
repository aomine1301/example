import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DepartmentWorkersInterface, StateWorkersInterface, ValueSortSelectedWorkersType, ItemWorkersInterface } from './workersStateInterfaces'

const initialEmployeeState: StateWorkersInterface = {
  isEmployeeLoading: true,
  isDepartmentLoading: true,
  department: [],
  workers: [],
  isHaveFirstLoading: false,
  valueSelected: 'name',
}
const workersStateSlice = createSlice({
  name: 'workersSlice',
  initialState: initialEmployeeState,
  reducers: {
    //for SortingSelected
    changeValueSelectedWorkersAction(
      state,
      { payload: { sortWorkersSelectedValue } }: PayloadAction<{ sortWorkersSelectedValue: ValueSortSelectedWorkersType }>
    ) {
      state.valueSelected = sortWorkersSelectedValue
    },
    //for saga Employee loading
    loadingListWorkersAction(state) {
      state.isEmployeeLoading = true
    },
    //for saga Department loading
    loadingListDepartmentWorkersAction(state) {
      state.isDepartmentLoading = true
    },
    //action Workers loading
    loadingListWorkersSuccess(state, { payload: { workersList } }: PayloadAction<{ workersList: ItemWorkersInterface[] }>) {
      state.workers = workersList
      state.isEmployeeLoading = false
      state.isHaveFirstLoading = true
    },
    //action Department loading
    loadingListDepartmentsWorkersSuccess(state, { payload: { departmentList } }: PayloadAction<{ departmentList: DepartmentWorkersInterface[] }>) {
      state.department = departmentList
      state.isDepartmentLoading = false
    },
  },
})
export default workersStateSlice.reducer
export const {
  loadingListWorkersSuccess,
  loadingListDepartmentsWorkersSuccess,
  loadingListWorkersAction,
  loadingListDepartmentWorkersAction,
  changeValueSelectedWorkersAction,
} = workersStateSlice.actions
