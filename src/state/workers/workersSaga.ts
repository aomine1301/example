import { put, takeLatest, all, call } from 'redux-saga/effects'
import { AxiosResponse } from 'axios'
import { apiConnectAxios } from '@utils/apiConnectAxios'
import {
  loadingListDepartmentWorkersAction,
  loadingListWorkersAction,
  loadingListDepartmentsWorkersSuccess,
  loadingListWorkersSuccess,
} from '@state/workers/workersStateSlice'

function* loadingListWorkersSaga() {
  try {
    const { data }: AxiosResponse = yield call(apiConnectAxios, 'employee')
    yield put(loadingListWorkersSuccess({ workersList: data.data }))
  } catch (error) {
    console.log(error)
  }
}

function* loadingListDepartmentsWorkersSaga() {
  try {
    const { data }: AxiosResponse = yield call(apiConnectAxios, 'departament/')
    yield put(loadingListDepartmentsWorkersSuccess({ departmentList: data }))
  } catch (error) {
    console.log(error)
  }
}

export default function* employeeRootSaga() {
  yield all([takeLatest(loadingListWorkersAction.type, loadingListWorkersSaga)])
  yield all([takeLatest(loadingListDepartmentWorkersAction.type, loadingListDepartmentsWorkersSaga)])
}
