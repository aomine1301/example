import { all } from 'redux-saga/effects'
import employeeRootSaga from '@state/workers/workersSaga'
import vlanRootSaga from '@state/vlan/vlanSaga'
import ripeRootSaga from '@state/ripe/ripeSaga'

export default function* rootSaga() {
  yield all([employeeRootSaga(), vlanRootSaga(), ripeRootSaga()])
}
