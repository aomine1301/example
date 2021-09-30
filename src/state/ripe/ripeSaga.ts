import { put, takeLatest, all, call } from 'redux-saga/effects'
import { loadingListRipeAction, loadingListRipeSuccess } from './ripeStateSlice'
import { apiConnectAxios } from '@utils/apiConnectAxios'
import { AxiosResponse } from 'axios'

function* loadingListVlanSaga() {
  try {
    const { data }: AxiosResponse = yield call(apiConnectAxios, 'ripe')
    yield put(loadingListRipeSuccess({ ripeList: data }))
  } catch (error) {
    // console.log(error) // TODO: выход из системы
    // yield put(fetchQuestionsFail({ name: '' }))
  }
}

export default function* ripeRootSaga() {
  yield all([takeLatest(loadingListRipeAction.type, loadingListVlanSaga)])
}
