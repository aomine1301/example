import { put, takeLatest, all, call } from 'redux-saga/effects'
import { loadingListVlanAction, loadingListVlanSuccess } from './vlanStateSlice'
import { apiConnectAxios } from '@utils/apiConnectAxios'
import { AxiosResponse } from 'axios'

function* loadingListVlanSaga() {
  try {
    const { data }: AxiosResponse = yield call(apiConnectAxios, 'vlans')
    yield put(loadingListVlanSuccess({ vlanList: data }))
  } catch (error) {
    // console.log(error) //!! выход из системы
    // yield put(fetchQuestionsFail({ name: '' }))
  }
}

export default function* vlanRootSaga() {
  yield all([takeLatest(loadingListVlanAction.type, loadingListVlanSaga)])
}
